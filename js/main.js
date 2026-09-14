/* =============================================================
   Evolución de la Computación — lógica
   Vista principal: un CAMINO sinuoso (SVG) con los hitos como
   PINES DE MAPA alternando arriba/abajo, y una "cámara" que
   viaja por la ruta con el scroll.
   Todo el contenido viene de data/hitos.json. Sin localStorage.
   ============================================================= */
(() => {
'use strict';

/* ---------- Rango temporal y parámetros del camino ---------- */
const YMIN = 1936, YMAX = 2026;   // rango completo (gantt de bandas)
let RMAX = YMAX;                   // tope del CAMINO: último hito puntual + margen

// Desktop: el camino avanza por filas (izq→der, baja, der→izq…)
const D = { PX_YEAR:104, ROW_GAP:316, TOP:150, MARGIN:104, BULGE:74, WAVE:19, STEP:9, BOTTOM:190 };
// Móvil: "S" vertical suave con las tarjetas a la derecha
const M = { X:44, AMP:18, WAVE_L:300, TOP:158, GAP_MIN:112, GAP_MAX:196, PX_YEAR:13, STEP:7, BOTTOM:140, CARD_X:104 };

const CARD_W    = 186;  // ancho de tarjeta (coincide con .pin del CSS)
const PIN_LEN   = 22;   // del camino al centro de la cabeza del pin
const ANCHOR_UP = 34;   // del camino a la tarjeta, lado de arriba
const ANCHOR_DN = 58;   // lado de abajo: deja pasar las cintas
const MINGAP    = 206;  // separación mínima entre tarjetas del mismo lado
const RIB0      = 16;   // primera cinta paralela, medida desde el camino
const RIBG      = 11;   // separación entre cintas
const NEAR      = 760;  // radio de "foco" de la cámara, en px de camino

/* ---------- Estado de la sesión ---------- */
const S = {
  data:null, geom:null, mode:null, total:0,
  pins:[],                       // {id, L, el, pin}
  nav:[],                        // {id, L} — pines + bandas, para la burbuja y las flechas
  gens:new Set(), cats:new Set(), propias:false, q:'',
  activeId:null, lastTrigger:null,
  burbuja:null, burbujaId:null, avgGap:0,      // burbuja flotante que emerge al pasar el viajero
  burbujaManual:false, burbujaPos:null         // posición fijada por el usuario al arrastrarla
};

/* ---------- Iconografía por categoría ---------- */
const ICON = {
  cpu:'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
  code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  brain:'<path d="M12 5.5A2.5 2.5 0 0 0 7 5.5 2.5 2.5 0 0 0 4.5 8 2.5 2.5 0 0 0 3.5 10.5 2.5 2.5 0 0 0 4.5 13 2.5 2.5 0 0 0 7 18.5 2.5 2.5 0 0 0 12 18.5Z"/><path d="M12 5.5A2.5 2.5 0 0 1 17 5.5 2.5 2.5 0 0 1 19.5 8 2.5 2.5 0 0 1 20.5 10.5 2.5 2.5 0 0 1 19.5 13 2.5 2.5 0 0 1 17 18.5 2.5 2.5 0 0 1 12 18.5Z"/><path d="M12 5.5v13"/>',
  'hard-drive':'<path d="M22 12H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><path d="M6 16h.01M10 16h.01"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>',
  link:'<path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
  bot:'<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>',
  smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  cloud:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'
};
const svgIco = (name, cls) => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name] || ''}</svg>`;

/* ---------- Utilidades ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const r1 = n => Math.round(n * 10) / 10;
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** "1936–1943" | "1971–" | "1985–presente" → {ini, fin} */
function parseRango(r){
  const n = String(r).match(/\d{4}/g) || [];
  const ini = +n[0] || YMIN;
  const fin = n[1] ? +n[1] : (/[–-]/.test(r) ? YMAX : ini);
  return { ini, fin };
}

let GEN = {}, CAT = {}, ZONAS = [];

/* =============================================================
   1. CARGA DE DATOS
   ============================================================= */
async function init(){
  const estado = $('#estado');
  try{
    const res = await fetch('data/hitos.json', { cache:'no-cache' });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    S.data = await res.json();
  }catch(err){
    estado.className = 'estado estado--error';
    estado.textContent = 'No se pudieron cargar los datos (data/hitos.json). Revisa que el archivo exista y recarga la página.';
    console.error(err);
    return;
  }

  GEN = Object.fromEntries(S.data.generaciones.map(g => [g.id, g]));
  CAT = Object.fromEntries(S.data.categorias.map(c => [c.id, c]));
  S.data.hitos.sort((a, b) => a.anio - b.anio || a.id.localeCompare(b.id));

  // El camino termina donde termina el último evento puntual: sin cola vacía
  const ultimo = S.data.hitos.filter(h => h.tipo !== 'banda').reduce((m, h) => Math.max(m, h.anio), YMIN);
  RMAX = Math.min(YMAX, ultimo + 6);

  // Zonas del camino: cada generación ocupa de su año inicial al de la siguiente
  const ord = S.data.generaciones.map(g => ({ ...g, ini: parseRango(g.rango).ini }));
  ZONAS = ord.map((g, i) => ({ ...g, desde:g.ini, hasta: i < ord.length - 1 ? ord[i + 1].ini : RMAX }));

  renderMeta();
  renderCierre();
  renderLeyenda();
  renderFiltros();
  setupTema();
  setupPanel();
  setupTooltip();
  setupTeclado();
  crearBurbuja();

  dibujar();
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(dibujar, 220); });
  window.addEventListener('scroll', onScroll, { passive:true });
  estado.textContent = '';
}

function dibujar(){
  renderCamino();
  renderMinimapa();
  aplicarFiltros();
  observarReveal();
  S.avgGap = 0;   // se recalcula en el próximo scroll (S.total/S.pins pudo cambiar)
  onScroll();
}

/* =============================================================
   2. RENDER — portada, leyenda, controles
   ============================================================= */
function renderMeta(){
  const m = S.data.meta;
  $('#hero-titulo').textContent = m.titulo;
  $('#hero-credito').innerHTML = (m.creditos || []).map(t => `<span>${esc(t)}</span>`).join('');
  $('#hero-subtitulo').textContent = m.subtitulo;
  $('#hero-pregunta').textContent = m.preguntaGuia;
  $('#cierre-pregunta').textContent = m.preguntaGuia;
  document.title = `${m.titulo} — Línea de tiempo interactiva`;
}

/** Texto "enriquecido" seguro para bloques largos del cierre:
 *  escapa el texto y luego resalta años (mono) y **negrita** / _cursiva_ .
 *  El texto viene de nuestro propio hitos.json (no de un usuario), así
 *  que aplicar este pequeño formateo sobre la cadena ya escapada es seguro. */
function richText(raw){
  let s = esc(raw || '');
  s = s.replace(/\b(1[6-9]\d{2}|20\d{2})\b/g, y => `<span class="mono">${y}</span>`);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/_(.+?)_/g, '<em>$1</em>');
  return s;
}

function renderCierre(){
  const c = S.data.meta.cierre;
  if(!c) return;
  $('#cierre-label').textContent = c.label || '';
  $('#cierre-titulo').textContent = c.titulo || '';
  $('#cierre-tesis').innerHTML = richText(c.tesis);
  $('#cierre-evidencias').innerHTML = (c.evidencias || []).map(ev => `
    <li class="evidencia">
      <p class="evidencia__num mono">${esc(ev.num)}</p>
      <h3 class="evidencia__titulo">${esc(ev.titulo)}</h3>
      <p>${richText(ev.texto)}</p>
      ${ev.hitoId ? `<p class="evidencia__link"><a href="#" data-open-hito="${esc(ev.hitoId)}">${esc(ev.linkTexto || 'Ver el hito')} →</a></p>` : ''}
    </li>`).join('');
  $('#cierre-conclusion').innerHTML = richText(c.conclusion);
}

function renderLeyenda(){
  $('#leyenda-generaciones').innerHTML = S.data.generaciones.map(g => `
    <li class="leyenda__item" style="--c:${g.color}">
      <span class="leyenda__dot"></span>
      <span><span class="leyenda__nombre">${esc(g.nombre)}</span>
        <span class="leyenda__rango mono"> ${esc(g.rango)} · ${esc(g.tecnologia)}</span></span>
    </li>`).join('');

  $('#leyenda-categorias').innerHTML = S.data.categorias.map(c => `
    <li class="leyenda__item" style="--c:${c.color}">
      ${svgIco(c.icono, 'leyenda__ico')}<span class="leyenda__nombre">${esc(c.nombre)}</span>
    </li>`).join('');
}

function renderFiltros(){
  $('#filtro-generaciones').innerHTML = S.data.generaciones.map(g => `
    <button type="button" class="chip" data-gen="${g.id}" aria-pressed="false" style="--c:${g.color}">
      <span class="chip__dot"></span>${esc(g.nombre)}
    </button>`).join('');
  $('#filtro-categorias').innerHTML = S.data.categorias.map(c => `
    <button type="button" class="chip" data-cat="${c.id}" aria-pressed="false" style="--c:${c.color}">
      ${svgIco(c.icono, 'chip__ico')}${esc(c.nombre)}
    </button>`).join('');

  const toggleSet = (set, key, btn) => {
    set.has(key) ? set.delete(key) : set.add(key);
    btn.setAttribute('aria-pressed', String(set.has(key)));
    aplicarFiltros();
  };
  $$('#filtro-generaciones .chip').forEach(b => b.addEventListener('click', () => toggleSet(S.gens, b.dataset.gen, b)));
  $$('#filtro-categorias .chip').forEach(b => b.addEventListener('click', () => toggleSet(S.cats, b.dataset.cat, b)));

  // Menús desplegables de la barra flotante
  const menus = [['#btn-gen', '#pop-gen'], ['#btn-cat', '#pop-cat']];
  const cerrarPops = excepto => menus.forEach(([b, p]) => {
    if(p === excepto) return;
    $(p).hidden = true;
    $(b).setAttribute('aria-expanded', 'false');
  });
  menus.forEach(([b, p]) => $(b).addEventListener('click', e => {
    e.stopPropagation();
    const abrir = $(p).hidden;
    cerrarPops(abrir ? p : null);
    $(p).hidden = !abrir;
    $(b).setAttribute('aria-expanded', String(abrir));
  }));
  document.addEventListener('click', e => { if(!e.target.closest('.bar__menu')) cerrarPops(null); });
  document.addEventListener('keydown', e => {
    if(e.key !== 'Escape' || !$('#panel').hidden) return;   // con el panel abierto, Esc lo cierra
    if(menus.some(([, p]) => !$(p).hidden)){ cerrarPops(null); $('#btn-gen').focus(); }
  });

  const propias = $('#toggle-propias');
  propias.addEventListener('click', () => {
    S.propias = !S.propias;
    propias.setAttribute('aria-pressed', String(S.propias));
    aplicarFiltros();
  });
  $('#buscador').addEventListener('input', e => { S.q = e.target.value.trim().toLowerCase(); aplicarFiltros(); });
  $('#limpiar').addEventListener('click', () => {
    S.gens.clear(); S.cats.clear(); S.propias = false; S.q = '';
    $$('.chip').forEach(b => b.setAttribute('aria-pressed', 'false'));
    $('#toggle-propias').setAttribute('aria-pressed', 'false');
    $('#buscador').value = '';
    aplicarFiltros();
  });
}

/* =============================================================
   3. GEOMETRÍA DEL CAMINO
   Devuelve muestras {x, y, año, longitud acumulada, fila}.
   Con eso se ubica cualquier año, su normal (para los pines)
   y cualquier tramo de color (dasharray por zona).
   ============================================================= */
function buildDesktop(W, puntuales){
  const rowW = W - 2 * D.MARGIN;
  // Espaciado tipo roadmap: cada hito ocupa un "slot" casi uniforme (con leve
  // influencia del salto de años, acotada). Así los periodos vacíos NO generan
  // tramos enormes y ningún hito domina el recorrido.
  const DGMIN = 320, DGMAX = 580, SCALE = 44;
  const anchors = [];                       // {year, pos} posición efectiva en el camino
  let pos = 0;
  puntuales.forEach((h, i) => {
    if(i > 0) pos += clamp((h.anio - puntuales[i-1].anio) * SCALE, DGMIN, DGMAX);
    anchors.push({ year:h.anio, pos });
  });
  const tail = DGMIN;                        // espacio final hasta "presente"
  const totalPos = (anchors.length ? anchors[anchors.length - 1].pos : 0) + tail;
  const rows = Math.max(2, Math.ceil(totalPos / rowW));

  // Año en una posición efectiva q (interpola las anclas de los hitos)
  const yearAtPos = q => {
    if(!anchors.length) return YMIN;
    if(q <= anchors[0].pos) return anchors[0].year;
    for(let i = 1; i < anchors.length; i++){
      if(q <= anchors[i].pos){
        const a = anchors[i-1], b = anchors[i];
        return a.year + (b.year - a.year) * ((q - a.pos) / (b.pos - a.pos));
      }
    }
    const last = anchors[anchors.length - 1];
    return last.year + (RMAX - last.year) * clamp((q - last.pos) / tail, 0, 1);
  };

  const s = [];
  let len = 0, px = null, py = null;
  const push = (x, y, year, row, turn) => {
    if(px !== null) len += Math.hypot(x - px, y - py);
    s.push({ x, y, year, len, row, turn: !!turn });
    px = x; py = y;
  };

  for(let r = 0; r < rows; r++){
    const dir  = r % 2 === 0 ? 1 : -1;                 // sentido de avance
    const yRow = D.TOP + r * D.ROW_GAP;
    const n    = Math.ceil(rowW / D.STEP);
    for(let i = 0; i <= n; i++){
      const f = i / n;
      const x = dir > 0 ? D.MARGIN + f * rowW : D.MARGIN + rowW - f * rowW;
      // onda suave que se anula en los extremos (empalme limpio con la vuelta)
      const y = yRow + D.WAVE * Math.sin(f * Math.PI * 4) * Math.sin(f * Math.PI);
      push(x, y, yearAtPos((r + f) * rowW), r);
    }
    if(r < rows - 1){                                  // vuelta en U (bezier)
      const xe = dir > 0 ? D.MARGIN + rowW : D.MARGIN;
      const y0 = yRow, y1 = yRow + D.ROW_GAP;
      const cx = xe + dir * D.BULGE;
      const yEnd = yearAtPos((r + 1) * rowW);
      for(let i = 1; i <= 40; i++){       // muestreo fino: la curva paralela exterior se estira
        const t = i / 40, mt = 1 - t;
        const x = mt*mt*mt*xe + 3*mt*mt*t*cx + 3*mt*t*t*cx + t*t*t*xe;
        const y = mt*mt*mt*y0 + 3*mt*mt*t*(y0 + D.ROW_GAP*0.06) + 3*mt*t*t*(y1 - D.ROW_GAP*0.06) + t*t*t*y1;
        push(x, y, yEnd, r, true);      // tramo de giro
      }
    }
  }
  return { mode:'h', w:W, h: D.TOP + (rows - 1) * D.ROW_GAP + D.BOTTOM, samples:s, rows };
}

function buildMobile(W, puntuales){
  // Posiciones secuenciales: proporcional al salto de años, con topes
  const anchors = [];
  let y = M.TOP;
  puntuales.forEach((h, i) => {
    if(i > 0) y += clamp((h.anio - puntuales[i-1].anio) * M.PX_YEAR, M.GAP_MIN, M.GAP_MAX);
    anchors.push({ year:h.anio, y });
  });
  const H = (anchors.length ? anchors[anchors.length - 1].y : M.TOP) + M.BOTTOM;

  const yearAtY = yy => {
    if(!anchors.length) return YMIN;
    if(yy <= anchors[0].y) return YMIN + (anchors[0].year - YMIN) * (yy / Math.max(1, anchors[0].y));
    for(let i = 1; i < anchors.length; i++){
      if(yy <= anchors[i].y){
        const a = anchors[i-1], b = anchors[i];
        return a.year + (b.year - a.year) * ((yy - a.y) / (b.y - a.y));
      }
    }
    const last = anchors[anchors.length - 1];
    return last.year + (RMAX - last.year) * clamp((yy - last.y) / Math.max(1, H - last.y), 0, 1);
  };

  const s = [];
  let len = 0, px = null, py = null;
  for(let yy = 0; yy <= H; yy += M.STEP){
    const x = M.X + M.AMP * Math.sin(yy / M.WAVE_L * Math.PI * 2);
    if(px !== null) len += Math.hypot(x - px, yy - py);
    s.push({ x, y:yy, year:yearAtY(yy), len, row:0 });
    px = x; py = yy;
  }
  return { mode:'v', w:W, h:H, samples:s, anchors };
}

/** Longitud de camino correspondiente a un año */
function lenAtYear(g, year){
  const s = g.samples;
  if(year <= s[0].year) return s[0].len;
  for(let i = 1; i < s.length; i++){
    if(s[i].year >= year){
      const a = s[i-1], b = s[i];
      const t = (b.year - a.year) ? (year - a.year) / (b.year - a.year) : 0;
      return a.len + (b.len - a.len) * t;
    }
  }
  return s[s.length - 1].len;
}

/**
 * Normal continua respecto al SENTIDO DE AVANCE (no a la pantalla):
 * desktop = izquierda del avance, móvil = derecha.
 * Debe ser continua o la curva paralela cruzaría el camino en cada vuelta.
 */
function normalDe(g, tx, ty){
  return g.mode === 'h' ? { nx:-ty, ny:tx } : { nx:ty, ny:-tx };
}

/** Punto, año y normal en una longitud del camino */
function atLen(g, L){
  const s = g.samples, total = s[s.length - 1].len;
  L = clamp(L, 0, total);
  let i = 1;
  while(i < s.length - 1 && s[i].len < L) i++;
  const a = s[i-1], b = s[i];
  const t = (b.len - a.len) ? (L - a.len) / (b.len - a.len) : 0;
  let tx = b.x - a.x, ty = b.y - a.y;
  const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
  const n = normalDe(g, tx, ty);
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    year: a.year + (b.year - a.year) * t,
    nx:n.nx, ny:n.ny
  };
}

/** Normal continua en una muestra */
function normSample(g, i){
  const a = g.samples[Math.max(0, i - 1)], b = g.samples[Math.min(g.samples.length - 1, i + 1)];
  let tx = b.x - a.x, ty = b.y - a.y;
  const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
  return normalDe(g, tx, ty);
}

/** ¿Hay una vuelta en U entre dos longitudes del camino? */
function hayGiro(g, La, Lb){
  return g.samples.some(p => p.turn && p.len >= La && p.len <= Lb);
}

/** Curva paralela al camino entre dos longitudes, desplazada `off` px */
function ribbonPath(g, L1, L2, off){
  const pts = [];
  g.samples.forEach((p, i) => {
    if(p.len < L1 - 1 || p.len > L2 + 1) return;
    const n = normSample(g, i);
    pts.push(`${r1(p.x + n.nx * off)} ${r1(p.y + n.ny * off)}`);
  });
  return pts.length < 2 ? '' : 'M ' + pts.join(' L ');
}

const genDe = year => {
  let z = ZONAS[0];
  ZONAS.forEach(zz => { if(year >= zz.desde) z = zz; });
  return z;
};

/* =============================================================
   4. RENDER — el camino, sus zonas y sus pines
   ============================================================= */
function renderCamino(){
  const stage = $('#road-stage');
  const W = Math.max(320, stage.clientWidth);
  const puntuales = S.data.hitos.filter(h => h.tipo !== 'banda');

  const g = W >= 860 ? buildDesktop(W, puntuales) : buildMobile(W, puntuales);
  S.geom = g; S.mode = g.mode;
  const total = S.total = g.samples[g.samples.length - 1].len;
  stage.style.height = g.h + 'px';

  const d = 'M ' + g.samples.map(p => `${r1(p.x)} ${r1(p.y)}`).join(' L ');

  /* --- defs: un degradado por zona (progresión de generaciones) --- */
  let defs = '';
  const segs = [];
  ZONAS.forEach((z, i) => {
    const L1 = lenAtYear(g, z.desde), L2 = lenAtYear(g, z.hasta);
    if(L2 - L1 < 1) return;
    const p1 = atLen(g, L1), p2 = atLen(g, L2);
    const c2 = (ZONAS[i+1] || z).color;
    defs += `<linearGradient id="grad-${z.id}" gradientUnits="userSpaceOnUse"
      x1="${r1(p1.x)}" y1="${r1(p1.y)}" x2="${r1(p2.x)}" y2="${r1(p2.y)}">
      <stop offset="0" stop-color="${z.color}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
    segs.push({ z, L1, L2 });
  });
  defs += `<linearGradient id="grad-trans" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GEN.g1.color}"/><stop offset="1" stop-color="${GEN.g2.color}"/></linearGradient>`;

  const dash = (L1, L2) => `0 ${r1(L1)} ${r1(L2 - L1)} ${r1(total)}`;

  /* --- auras de zona + trazo del camino --- */
  let auras = '', road = '';
  segs.forEach(({ z, L1, L2 }) => {
    auras += `<path class="road-aura" d="${d}" stroke="${z.color}" stroke-dasharray="${dash(L1, L2)}"/>`;
    road  += `<path class="road-halo" d="${d}" stroke="url(#grad-${z.id})" stroke-dasharray="${dash(L1, L2)}"/>
              <path class="road-seg"  d="${d}" stroke="url(#grad-${z.id})" stroke-dasharray="${dash(L1, L2)}"/>`;
  });

  /* --- tramo de transición 1947 → 2ª generación (degradado destacado) --- */
  const tIni = parseRango(GEN.transicion.rango).ini, tFin = parseRango(GEN.g2.rango).ini;
  road += `<path class="road-trans" d="${d}" stroke="url(#grad-trans)" stroke-dasharray="${dash(lenAtYear(g, tIni), lenAtYear(g, tFin))}"/>`;

  /* --- marcas de año (solo desktop: en móvil manda la tarjeta) --- */
  const pinL = puntuales.map(h => lenAtYear(g, h.anio));
  let ticks = '';
  if(g.mode === 'h'){
    for(let y = 1940; y <= RMAX; y += 5){
      const L = lenAtYear(g, y), p = atLen(g, L);
      ticks += `<line class="road-tick" x1="${r1(p.x - p.nx*7)}" y1="${r1(p.y - p.ny*7)}"
        x2="${r1(p.x + p.nx*7)}" y2="${r1(p.y + p.ny*7)}"/>`;
      // etiqueta de década, si ningún pin la estorba
      if(y % 10 === 0 && !pinL.some(l => Math.abs(l - L) < 42)){
        ticks += `<text class="road-anio" x="${r1(p.x - p.nx*21)}" y="${r1(p.y - p.ny*21)}">${y}</text>`;
      }
    }
  }

  /* --- cintas paralelas: los procesos continuos (tipo "banda") --- */
  const bandas = S.data.hitos.filter(h => h.tipo === 'banda');
  const carril = [];                                  // último año ocupado por carril
  const ocupado = [];                                 // tramos ya usados por etiquetas
  let ribs = '', ribLabels = '';
  bandas.forEach(h => {
    const aFin = h.anioFin || h.anio;
    let lane = carril.findIndex(fin => h.anio >= fin);
    if(lane === -1){ lane = carril.length; carril.push(0); }
    carril[lane] = aFin;

    const off = RIB0 + lane * RIBG;
    const L1 = lenAtYear(g, h.anio), L2 = lenAtYear(g, Math.min(aFin, RMAX));
    const dRib = ribbonPath(g, L1, L2, off);
    if(!dRib) return;
    const color = CAT[h.categoria].color;
    const pe = atLen(g, L2);

    ribs += `<g class="rib" id="b-${h.id}" data-hito="${h.id}" data-abrir="${h.id}">
        <path class="rib__hit" d="${dRib}"/>
        <path class="rib__line" d="${dRib}" stroke="${color}"/>
        ${aFin > RMAX ? `<text class="rib__cap" x="${r1(pe.x + pe.nx*off)}" y="${r1(pe.y + pe.ny*off)}" fill="${color}">››</text>` : ''}
      </g>`;

    // Etiqueta de la cinta
    let lx, ly, back = false, pt;
    if(g.mode === 'h'){
      // ancho estimado de la píldora (nowrap, tope 360px por CSS)
      const wEst = Math.min(360, 100 + h.titulo.length * 6.2 + h.periodo.length * 5.4);
      const fin = Math.max(L1 + 13, L2 - 8);
      const rango = L => {                             // tramo de camino que ocupa la píldora
        const atras = atLen(g, L).nx > 0;              // la fila avanza der→izq
        return atras ? [L - wEst - 26, L + 26] : [L - 26, L + wEst + 26];
      };
      let Lm = null, libre = null;
      for(let L = L1 + 12; L < fin; L += 22){
        const [a, b] = rango(L);
        if(pinL.some(l => l > a && l < b)) continue;    // taparía un pin
        if(hayGiro(g, a, b)) continue;                 // cruzaría una vuelta
        if(libre === null) libre = L;                  // reserva, por si choca con otra etiqueta
        if(ocupado.some(([c, e]) => a < e + 20 && b > c - 20)) continue;
        Lm = L; break;
      }
      const Lfinal = Lm !== null ? Lm : (libre !== null ? libre : L1 + 12);
      ocupado.push(rango(Lfinal));
      pt = atLen(g, Lfinal);
      lx = pt.x + pt.nx * off; ly = pt.y + pt.ny * off;
      back = pt.nx > 0;
    }else{
      pt = atLen(g, Math.min(L2, L1 + 12));
      lx = M.CARD_X; ly = pt.y;
      let bd = 1e9;                                    // hueco libre entre tarjetas
      for(let i = 1; i < (g.anchors || []).length; i++){
        const mid = (g.anchors[i-1].y + g.anchors[i].y) / 2;
        if(Math.abs(mid - pt.y) < bd){ bd = Math.abs(mid - pt.y); ly = mid; }
      }
    }
    ribLabels += `<button type="button" class="rib-label reveal" id="l-${h.id}" data-hito="${h.id}" data-abrir="${h.id}"
        style="--c:${color}; left:${r1(lx)}px; top:${r1(ly)}px${back ? '; transform:translate(-100%,-50%)' : ''}">
        ${svgIco(CAT[h.categoria].icono, 'rib-label__ico')}
        <span class="rib-label__t">${esc(h.titulo)}</span>
        <span class="rib-label__p mono">${esc(h.periodo)}</span>
      </button>`;
  });

  /* --- pines (hitos puntuales) --- */
  let pinsSvg = '', stalks = '', cards = '';
  S.pins = [];
  const lastL = { '-1': -1e9, '1': -1e9 };
  // Separación mínima entre pines contiguos: evita que hitos del MISMO año
  // (o muy cercanos) caigan en el mismo punto del camino. En móvil equivale al
  // hueco ya reservado entre anclas; en escritorio, un valor fijo prudente.
  const PIN_SEP = g.mode === 'v' ? M.GAP_MIN : 60;
  let prevPinL = -1e9;

  puntuales.forEach((h, i) => {
    let L = lenAtYear(g, h.anio);
    L = Math.min(total, Math.max(L, prevPinL + PIN_SEP));   // separa hitos encimados
    prevPinL = L;
    const p = atLen(g, L);
    const cat = CAT[h.categoria], color = GEN[h.generacion].color;
    let side = 1, cardL = L;

    if(g.mode === 'h'){
      side = i % 2 === 0 ? -1 : 1;                     // alterna arriba / abajo
      // si el vecino del mismo lado queda muy cerca, la tarjeta avanza sobre el camino
      cardL = Math.min(total, Math.max(L, lastL[side] + MINGAP));
      lastL[side] = cardL;
    }
    const dx = p.nx * side, dy = p.ny * side;
    const headX = p.x + dx * PIN_LEN, headY = p.y + dy * PIN_LEN;
    const ang = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    const fill = h.generacion === 'transicion' ? 'url(#grad-trans)' : color;

    // ancla de la tarjeta (puede ir desplazada a lo largo del camino)
    const pc = g.mode === 'h' ? atLen(g, cardL) : p;
    const ancD = side < 0 ? ANCHOR_UP : ANCHOR_DN;
    const ax = pc.x + pc.nx * side * ancD, ay = pc.y + pc.ny * side * ancD;

    // Pin de mapa (gota con la punta sobre el camino) + ícono de categoría
    pinsSvg += `<g class="pin-g" id="p-${h.id}" data-hito="${h.id}" data-abrir="${h.id}">
        <g transform="translate(${r1(p.x)},${r1(p.y)}) rotate(${r1(ang)})">
          <path d="M0 0 C-3 -7 -7 -11 -8.6 -14.6 A11 11 0 1 1 8.6 -14.6 C7 -11 3 -7 0 0Z"
            fill="${fill}" stroke="${color}" stroke-width="1"/>
        </g>
        <g transform="translate(${r1(headX - 7)},${r1(headY - 7)}) scale(.583)" stroke="#fff" stroke-width="2.6" fill="none">${ICON[cat.icono]}</g>
        ${h.aportacionPropia ? `<circle cx="${r1(headX)}" cy="${r1(headY)}" r="13.6" fill="none" stroke="${GEN.transicion.color}" stroke-width="2"/>` : ''}
      </g>`;

    // Tallo del pin a su tarjeta
    const tx = g.mode === 'v' ? M.CARD_X : ax, ty = g.mode === 'v' ? p.y : ay;
    if(Math.hypot(tx - headX, ty - headY) > 8){
      stalks += `<line class="pin-stalk" stroke="${color}"
        x1="${r1(headX)}" y1="${r1(headY)}" x2="${r1(tx)}" y2="${r1(ty)}"/>`;
    }

    // Tarjeta del hito
    const left = g.mode === 'h' ? clamp(ax, CARD_W/2 + 8, W - CARD_W/2 - 8) : M.CARD_X;
    const top  = g.mode === 'h' ? ay : p.y;
    const sideAttr = g.mode === 'v' ? 'm' : (dy < 0 ? 'up' : 'down');
    cards += `<div class="pin reveal" id="n-${h.id}" data-hito="${h.id}" data-side="${sideAttr}"
        style="--c:${color}; left:${r1(left)}px; top:${r1(top)}px${g.mode === 'v' ? `; width:${W - M.CARD_X - 14}px` : ''}">
        <button type="button" class="pin__card" data-abrir="${h.id}">
          <span class="pin__top">
            <span class="pin__anio mono">${esc(h.periodo)}</span>
            ${h.aportacionPropia ? '<span class="pin__star" title="Aportación propia">⭐</span>' : ''}
            <span class="pin__cat">${esc(cat.nombre.split(' ')[0])}</span>
          </span>
          <span class="pin__titulo">${esc(h.titulo)}</span>
          ${h.generacion === 'transicion' ? `<span class="pin__badge">transición</span>
            <span class="pin__nota mono">${tFin - tIni} años hasta la 2ª generación</span>` : ''}
        </button>
      </div>`;

    S.pins.push({ id:h.id, L });
  });

  /* --- viajero (la cámara) + velo del tramo no recorrido --- */
  const viajero = `<g class="viajero" id="viajero">
      <circle class="viajero__halo" r="17"/><circle class="viajero__punto" r="6.5"/>
    </g>`;
  const veil = `<path class="road-veil" id="road-veil" d="${d}" stroke-dasharray="0 0 ${r1(total)} 0"/>`;

  const svg = $('#road-svg');
  svg.setAttribute('viewBox', `0 0 ${r1(W)} ${r1(g.h)}`);
  svg.innerHTML = `<defs>${defs}</defs>${auras}${road}${ticks}${veil}
    <g class="cintas">${ribs}</g>
    <g class="stalks">${stalks}</g><g class="pines">${pinsSvg}</g>${viajero}`;

  // Cierre del camino: enlaza con las bandas transversales
  const fin = g.samples[g.samples.length - 1];
  const finLado = g.mode === 'v' ? `left:${M.CARD_X}px; top:${r1(fin.y + 26)}px`
                                 : `left:${r1(fin.x)}px; top:${r1(fin.y + 34)}px; transform:translateX(-50%)`;
  cards += `<a class="pin-fin" href="#cierre" style="${finLado}">
      <span class="pin-fin__punto" aria-hidden="true"></span>
      <span class="pin-fin__txt">
        <b class="mono">PRESENTE</b>
        <span class="pin-fin__sub">Meta de la línea de tiempo · lee la conclusión →</span>
      </span></a>`;

  $('#road-pines').innerHTML = cards + ribLabels;
  $('#road-zonas').innerHTML = zonasHTML(g);

  // Referencias vivas para la cámara
  // El pill de cierre se reencuadra con su ancho real (evita que se salga del lienzo)
  const finEl = $('.pin-fin', $('#road-pines'));
  if(finEl && g.mode === 'h'){
    const fw = finEl.offsetWidth;
    finEl.style.left = r1(clamp(fin.x, fw / 2 + 10, W - fw / 2 - 10)) + 'px';
  }

  // Las etiquetas de cinta también se reencuadran dentro del lienzo
  const stRect = stage.getBoundingClientRect();
  $$('.rib-label', $('#road-pines')).forEach(el => {
    const r = el.getBoundingClientRect();
    const l = parseFloat(el.style.left);
    if(r.left < stRect.left + 4) el.style.left = r1(l + (stRect.left + 4 - r.left)) + 'px';
    else if(r.right > stRect.right - 4) el.style.left = r1(l - (r.right - stRect.right + 4)) + 'px';
  });

  S.veil = $('#road-veil');
  S.viajero = $('#viajero');
  S.pins.forEach(o => { o.el = document.getElementById('n-' + o.id); o.pin = document.getElementById('p-' + o.id); });

  // Lista de navegación de la burbuja: pines (posición fija) + bandas.
  // Cada banda recibe un punto de detección en el HUECO que sigue al último pin
  // de su año de inicio, para que caiga entre dos años distintos y tenga su
  // propia celda (p. ej. el almacenamiento no queda apretado entre los dos de 1956).
  S.nav = S.pins.map(o => ({ id:o.id, L:o.L }));
  bandas.forEach(h => {
    let i = -1;
    S.pins.forEach((o, k) => {
      const ph = S.data.hitos.find(x => x.id === o.id);
      if(ph && ph.anio <= h.anio) i = k;
    });
    const a = i >= 0 ? S.pins[i].L : 0;
    const b = (i + 1 < S.pins.length) ? S.pins[i + 1].L : total;
    S.nav.push({ id:h.id, L:(a + b) / 2 });
  });
  S.nav.sort((x, y) => x.L - y.L);

  $$('[data-abrir]', $('#road-stage')).forEach(el => {
    el.addEventListener('click', () => abrirPanel(el.dataset.abrir, el));
  });
}

/** Etiquetas suaves de generación a lo largo del camino */
function zonasHTML(g){
  if(g.mode === 'v'){
    return ZONAS.map(z => {
      const p = atLen(g, lenAtYear(g, z.desde));
      return `<div class="zona zona--movil" style="--c:${z.color}; left:${M.CARD_X}px; top:${r1(p.y - 30)}px">
        <b>${esc(z.nombre)}</b><span class="mono">${esc(z.rango)}</span></div>`;
    }).join('');
  }
  // 1) candidatas: cada zona, partida por la fila del camino que ocupa
  const cand = [];
  ZONAS.forEach(z => {
    const L1 = lenAtYear(g, z.desde), L2 = lenAtYear(g, z.hasta);
    const porFila = new Map();
    g.samples.forEach(p => {
      if(p.len < L1 || p.len > L2) return;
      if(!porFila.has(p.row)) porFila.set(p.row, []);
      porFila.get(p.row).push(p);
    });
    porFila.forEach((arr, row) => {
      const x1 = Math.min(...arr.map(p => p.x)), x2 = Math.max(...arr.map(p => p.x));
      const span = x2 - x1;
      if(span < 150) return;                                   // tramo demasiado corto
      const label = z.nombre.toUpperCase();
      const fs = clamp(span / (label.length * 0.66), 15, 34);   // tipografía que quepa
      const w = fs * label.length * 0.78;                      // ancho real (incluye tracking)
      cand.push({ z, row, label, fs, span, w, cx: clamp((x1 + x2) / 2, w / 2 + 6, g.w - w / 2 - 6) });
    });
  });

  // 2) máximo dos apariciones por generación (las de tramo más ancho)
  const usos = {};
  const cand2 = cand.slice().sort((a, b) => b.span - a.span).filter(c => {
    usos[c.z.id] = (usos[c.z.id] || 0) + 1;
    return usos[c.z.id] <= 2;
  });
  cand.length = 0; cand2.forEach(c => cand.push(c));

  // 3) por fila, de mayor a menor tramo, descartando las que se traslapen
  let out = '';
  const filas = new Map();
  cand.forEach(c => { if(!filas.has(c.row)) filas.set(c.row, []); filas.get(c.row).push(c); });
  filas.forEach(arr => {
    const puestas = [];
    arr.sort((a, b) => b.span - a.span).forEach(c => {
      if(puestas.some(p => Math.abs(p.cx - c.cx) < (p.w + c.w) / 2 + 24)) return;
      puestas.push(c);
      out += `<div class="zona" style="--c:${c.z.color}; left:${r1(c.cx)}px;
        top:${r1(D.TOP + c.row * D.ROW_GAP + D.ROW_GAP / 2)}px">
        <b style="font-size:${r1(c.fs)}px">${esc(c.label)}</b>
        <span style="font-size:${r1(c.fs * .42)}px">${esc(c.z.rango)}</span></div>`;
    });
  });
  return out;
}

/** Mini-mapa del recorrido: eras como tramos de color y un tick por hito */
function renderMinimapa(){
  const g = S.geom;
  const pct = L => clamp(L / S.total * 100, 0, 100);
  const tramos = ZONAS.map(z => {
    const a = pct(lenAtYear(g, z.desde)), b = pct(lenAtYear(g, z.hasta));
    return `${z.color} ${r1(a)}% ${r1(b)}%`;
  }).join(', ');
  $('#mapa-pista').style.background = `linear-gradient(90deg, ${tramos})`;

  $('#mapa-hitos').innerHTML = S.pins.map(o => {
    const h = S.data.hitos.find(x => x.id === o.id);
    return `<span class="mapa__hito${h && h.aportacionPropia ? ' mapa__hito--propia' : ''}"
      style="left:${r1(pct(o.L))}%"></span>`;
  }).join('');

  // Arrastrar el mini-mapa mueve el recorrido (y el scroll mueve el mini-mapa)
  const mapa = $('#mapa');
  if(!mapa.dataset.listo){
    mapa.dataset.listo = '1';
    mapa.addEventListener('input', () => {
      const t = +mapa.value / 1000;
      const r = $('#road-stage').getBoundingClientRect();
      S.arrastrando = true;
      window.scrollTo({ top: Math.max(0, r.top + window.scrollY - window.innerHeight * 0.5 + t * r.height) });
      setTimeout(() => { S.arrastrando = false; }, 80);
    });
  }
}

/* =============================================================
   5. LA CÁMARA: el scroll viaja por el camino
   ============================================================= */
let rafPend = false;
function onScroll(){
  if(rafPend) return;
  rafPend = true;
  requestAnimationFrame(() => {
    rafPend = false;
    if(!S.geom || !S.veil) return;
    const r = $('#road-stage').getBoundingClientRect();
    const t = clamp((window.innerHeight * 0.5 - r.top) / Math.max(1, r.height), 0, 1);
    const L = t * S.total;

    S.veil.setAttribute('stroke-dasharray', `0 ${r1(L)} ${r1(S.total - L)} 0`);
    const p = atLen(S.geom, L);
    S.viajero.setAttribute('transform', `translate(${r1(p.x)},${r1(p.y)})`);

    const z = genDe(p.year);
    $('#hud-anio').textContent = Math.round(p.year);
    $('#hud-gen').textContent = `${z.nombre} · ${z.tecnologia}`;
    if(!S.arrastrando) $('#mapa').value = Math.round(t * 1000);

    S.pins.forEach(o => {
      const near = Math.abs(o.L - L) < NEAR;
      if(o.el) o.el.classList.toggle('is-near', near);
    });

    // Burbuja flotante: mientras el viajero recorre el camino, muestra el hito más cercano
    const enRuta = r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5;
    actualizarBurbuja(enRuta, L, r.left + p.x, r.top + p.y);
  });
}

/* =============================================================
   6. FILTROS
   ============================================================= */
function pasa(h){
  if(S.gens.size && !S.gens.has(h.generacion)) return false;
  if(S.cats.size && !S.cats.has(h.categoria)) return false;
  if(S.propias && !h.aportacionPropia) return false;
  if(S.q){
    const heno = `${h.titulo} ${h.anio} ${h.periodo} ${h.innovacion} ${GEN[h.generacion].nombre} ${CAT[h.categoria].nombre}`.toLowerCase();
    if(!heno.includes(S.q)) return false;
  }
  return true;
}

function aplicarFiltros(){
  if(!S.data) return;
  let visibles = 0;
  S.data.hitos.forEach(h => {
    const ok = pasa(h);
    if(ok) visibles++;
    ['n-', 'p-', 'b-', 'l-'].forEach(pre => {
      const el = document.getElementById(pre + h.id);
      if(el) el.classList.toggle('is-dimmed', !ok);
    });
    const btn = document.querySelector(`#n-${h.id} [data-abrir]`) || document.getElementById('l-' + h.id);
    if(btn){ btn.tabIndex = ok ? 0 : -1; btn.setAttribute('aria-disabled', String(!ok)); }
  });
  const activo = S.gens.size || S.cats.size || S.propias || S.q;
  $('#conteo').textContent = `${visibles} de ${S.data.hitos.length} hitos`;
  $('#conteo').hidden = !activo;
  $('#limpiar').hidden = !activo;
  [['#cnt-gen', S.gens.size], ['#cnt-cat', S.cats.size]].forEach(([sel, n]) => {
    const b = $(sel); b.textContent = n; b.hidden = !n;
  });
  onScroll();   // reevaluar la burbuja si el hito activo quedó filtrado
}

function observarReveal(){
  const items = $$('.reveal');
  if(reduceMotion || !('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((ent, obs) => {
    ent.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-in'); obs.unobserve(e.target); } });
  }, { rootMargin:'120px', threshold:0.02 });
  items.forEach(el => io.observe(el));
}

/* =============================================================
   7. PANEL DE DETALLE
   ============================================================= */
const listaFiltrada = () => S.data.hitos.filter(pasa);

/** Encabezado (periodo + chips + título) de un hito, reutilizable en panel y burbuja */
function metaHTML(h, g, c){
  return `
    <div class="panel__kicker">
      <span class="panel__periodo">${esc(h.periodo)}</span>
      <span class="panel__chip" style="--c:${g.color}">${esc(g.nombre)}</span>
      <span class="panel__chip panel__chip--cat" style="--c:${c.color}">${svgIco(c.icono, '')}${esc(c.nombre)}</span>
      ${h.tipo === 'banda' ? '<span class="panel__chip mono" style="--c:var(--muted)">banda transversal</span>' : ''}
    </div>
    <h2 class="panel__titulo">${h.aportacionPropia ? '<span title="Aportación propia">⭐ </span>' : ''}${esc(h.titulo)}</h2>`;
}

/** Cuerpo (imagen + bloques + callouts + fuentes) de un hito, reutilizable */
function bodyHTML(h){
  const bloque = (label, texto) => texto
    ? `<div class="bloque"><p class="bloque__label">${label}</p><p class="bloque__texto">${esc(texto)}</p></div>` : '';
  return `
    <figure class="figura" data-figura>
      <img class="figura__img" src="${esc(h.imagen)}" alt="${esc(h.imagenAlt)}" loading="lazy" width="640" height="400">
      <figcaption class="figura__cap">${esc(h.imagenAlt)}</figcaption>
    </figure>
    ${bloque('¿Qué ocurrió?', h.queOcurrio)}
    ${bloque('Innovación', h.innovacion)}
    ${bloque('¿Por qué importó?', h.importancia)}
    ${bloque('¿Qué cambió?', h.queCambio)}
    ${bloque('Relación hardware ↔ software', h.relacionHwSw)}
    ${h.justificacionAportacion ? `<div class="callout callout--propia">
        <p class="callout__label">⭐ Decidimos incluir este hito por:</p>
        <p class="callout__texto">${esc(h.justificacionAportacion)}</p></div>` : ''}
    ${h.notaTransicion ? `<div class="callout callout--transicion">
        <p class="callout__label">Nota de transición</p>
        <p class="callout__texto">${esc(h.notaTransicion)}</p></div>` : ''}
    <div class="fuentes">
      <p class="fuentes__label">Fuentes</p>
      ${(h.fuentes || []).map(f => `<a class="fuente" href="${esc(f.url)}" target="_blank" rel="noopener noreferrer">
        ${esc(f.nombre)} ${svgIco('link', '')}</a>`).join('')}
    </div>`;
}

/** Enlaza el placeholder de imagen (404) dentro de un contenedor */
function montarFigura(scope, h, color, c){
  const img = scope.querySelector('img');
  if(!img) return;
  img.addEventListener('error', () => {
    const fig = img.closest('[data-figura]');
    if(fig) fig.innerHTML = `<div class="figura__ph" style="--c:${color}">
        ${svgIco(c.icono, '')}<b>Imagen pendiente</b><small>${esc(h.imagenAlt)}</small>
      </div><figcaption class="figura__cap mono">${esc(h.imagen)}</figcaption>`;
  }, { once:true });
}

function abrirPanel(id, trigger){
  const h = S.data.hitos.find(x => x.id === id);
  if(!h) return;
  S.activeId = id;
  S.lastTrigger = trigger || S.lastTrigger;

  const g = GEN[h.generacion], c = CAT[h.categoria];
  const color = h.tipo === 'banda' ? c.color : g.color;
  $('#panel').style.setProperty('--c', color);

  $('#panel-meta').innerHTML = metaHTML(h, g, c);
  const tit = $('#panel-meta .panel__titulo'); if(tit) tit.id = 'panel-titulo';
  $('#panel-body').innerHTML = bodyHTML(h);
  montarFigura($('#panel-body'), h, color, c);
  ocultarBurbuja();   // si el panel se abre, la burbuja se retira

  const lista = listaFiltrada();
  const i = lista.findIndex(x => x.id === id);
  $('#panel-pos').textContent = i >= 0 ? `${i + 1} / ${lista.length}` : h.id;
  $('#panel-prev').disabled = i <= 0;
  $('#panel-next').disabled = i < 0 || i >= lista.length - 1;

  $('#panel').hidden = false;
  $('#overlay').hidden = false;
  $('#panel-body').scrollTop = 0;
  $('#panel-close').focus();
}

function cerrarPanel(){
  $('#panel').hidden = true;
  $('#overlay').hidden = true;
  if(S.lastTrigger && document.contains(S.lastTrigger) && S.lastTrigger.focus) S.lastTrigger.focus();
  S.activeId = null;
  onScroll();   // reevaluar si debe reaparecer la burbuja del hito bajo el viajero
}

/* =============================================================
   7b. BURBUJA FLOTANTE — emerge sola al pasar el viajero por un hito
   ============================================================= */
function crearBurbuja(){
  if(S.burbuja) return;
  const b = document.createElement('aside');
  b.className = 'burbuja';
  b.id = 'burbuja';
  b.hidden = true;
  b.setAttribute('aria-hidden', 'true');
  b.innerHTML = `<div class="burbuja__asa" id="burbuja-asa" title="Arrastra para mover">
      <span class="burbuja__grip" aria-hidden="true"></span>
    </div>
    <div class="burbuja__meta" id="burbuja-meta"></div>
    <div class="burbuja__body" id="burbuja-body" tabindex="0"></div>
    <div class="burbuja__foot">
      <button type="button" class="burbuja__nav" data-bnav="-1" aria-label="Hito anterior">←</button>
      <button type="button" class="burbuja__mas">Ver completo</button>
      <button type="button" class="burbuja__nav" data-bnav="1" aria-label="Hito siguiente">→</button>
    </div>`;
  document.body.appendChild(b);
  S.burbuja = b;
  // "Ver completo" abre el panel del hito activo
  b.querySelector('.burbuja__mas').addEventListener('click', e => {
    e.stopPropagation();
    if(S.burbujaId){ centrar(S.burbujaId); abrirPanel(S.burbujaId, b); }
  });
  // Flechas: mueven el punto viajero al hito anterior / siguiente
  b.querySelectorAll('[data-bnav]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); burbujaNav(+btn.dataset.bnav); });
  });
  // Arrastre por el asa (dedo o mouse) — la burbuja se queda donde la sueltes
  const asa = b.querySelector('#burbuja-asa');
  let drag = false, sx = 0, sy = 0, sl = 0, st = 0;
  asa.addEventListener('pointerdown', e => {
    drag = true;
    try{ asa.setPointerCapture(e.pointerId); }catch(_){}
    const r = b.getBoundingClientRect();
    sx = e.clientX; sy = e.clientY; sl = r.left; st = r.top;
    b.classList.add('is-dragging');
    e.preventDefault();
  });
  asa.addEventListener('pointermove', e => {
    if(!drag) return;
    const vw = window.innerWidth, vh = window.innerHeight, bw = b.offsetWidth, bh = b.offsetHeight;
    const left = clamp(sl + (e.clientX - sx), 8, vw - bw - 8);
    const top  = clamp(st + (e.clientY - sy), 8, vh - bh - 8);
    b.style.left = left + 'px'; b.style.top = top + 'px';
    S.burbujaManual = true; S.burbujaPos = { left, top };
  });
  const finDrag = e => { if(drag){ drag = false; b.classList.remove('is-dragging'); try{ asa.releasePointerCapture(e.pointerId); }catch(_){} } };
  asa.addEventListener('pointerup', finDrag);
  asa.addEventListener('pointercancel', finDrag);
}

function mostrarBurbuja(){
  const b = S.burbuja;
  clearTimeout(S._bt);                 // cancela cualquier ocultamiento pendiente (evita parpadeo)
  b.hidden = false; b.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => b.classList.add('is-open'));
}

function ocultarBurbuja(){
  const b = S.burbuja;
  if(!b || b.hidden) return;
  b.classList.remove('is-open');
  S.burbujaId = null;
  S.burbujaManual = false; S.burbujaPos = null;   // al salir de la ruta vuelve a acomodarse sola
  clearTimeout(S._bt);
  S._bt = setTimeout(() => { b.hidden = true; b.setAttribute('aria-hidden', 'true'); }, 200);
}

function posBurbuja(dotX, dotY){
  const b = S.burbuja; if(!b || b.hidden) return;
  const vw = window.innerWidth, vh = window.innerHeight;
  const bw = b.offsetWidth, bh = b.offsetHeight;
  if(S.burbujaManual && S.burbujaPos){            // el usuario la arrastró: respeta su lugar
    b.style.left = r1(clamp(S.burbujaPos.left, 8, vw - bw - 8)) + 'px';
    b.style.top  = r1(clamp(S.burbujaPos.top,  8, vh - bh - 8)) + 'px';
    return;
  }
  let left, top;
  if(vw < 760){                                   // móvil: tarjeta flotante abajo
    left = clamp((vw - bw) / 2, 8, vw - bw - 8);
    top  = vh - bh - 14;
  }else{                                          // escritorio: al lado del punto
    const gap = 28;
    left = dotX < vw * 0.52 ? dotX + gap : dotX - gap - bw;
    left = clamp(left, 12, vw - bw - 12);
    top  = clamp(dotY - bh / 2, 12, vh - bh - 12);
  }
  b.style.left = r1(left) + 'px';
  b.style.top  = r1(top) + 'px';
}

/** Hitos navegables visibles (pines + bandas) en orden del camino */
function navVisibles(){
  return S.nav.filter(o => { const h = S.data.hitos.find(x => x.id === o.id); return h && pasa(h); });
}

/** Mientras el viajero recorre la ruta, la burbuja muestra SIEMPRE el hito más
 *  cercano (sin zonas muertas): así los hitos pegados y las bandas se aprecian
 *  todos y funciona igual al avanzar que al retroceder. */
function actualizarBurbuja(enRuta, L, dotX, dotY){
  if(!S.burbuja) return;
  if(!enRuta || !$('#panel').hidden || !S.nav.length){ ocultarBurbuja(); return; }

  const vis = navVisibles();
  if(!vis.length){ ocultarBurbuja(); return; }

  let best = null, bd = Infinity, idx = -1;
  vis.forEach((o, i) => { const d = Math.abs(o.L - L); if(d < bd){ bd = d; best = o; idx = i; } });

  if(S.burbujaId !== best.id){                     // reconstruir solo al cambiar de hito
    S.burbujaId = best.id;
    const h = S.data.hitos.find(x => x.id === best.id);
    const g = GEN[h.generacion], c = CAT[h.categoria];
    const color = h.tipo === 'banda' ? c.color : g.color;
    S.burbuja.style.setProperty('--c', color);
    $('#burbuja-meta').innerHTML = metaHTML(h, g, c);
    $('#burbuja-body').innerHTML = bodyHTML(h);
    montarFigura(S.burbuja, h, color, c);
    $('#burbuja-body').scrollTop = 0;
    S.burbuja.querySelector('[data-bnav="-1"]').disabled = idx <= 0;
    S.burbuja.querySelector('[data-bnav="1"]').disabled  = idx >= vis.length - 1;
    mostrarBurbuja();
  }
  posBurbuja(dotX, dotY);
}

/** Lleva el punto viajero exactamente sobre un hito o banda (scroll calculado) */
function irAHito(id){
  const o = S.nav.find(p => p.id === id);
  if(!o || !S.total) return;
  const r = $('#road-stage').getBoundingClientRect();
  const t = o.L / S.total;
  const target = (window.scrollY + r.top) - window.innerHeight * 0.5 + t * r.height;
  window.scrollTo({ top: Math.max(0, target), behavior: reduceMotion ? 'auto' : 'smooth' });
}

/** Flechas de la burbuja: salta el viajero al hito/banda anterior o siguiente */
function burbujaNav(delta){
  const vis = navVisibles();
  const i = vis.findIndex(o => o.id === S.burbujaId);
  const sig = vis[i + delta];
  if(sig) irAHito(sig.id);
}

function saltar(delta){
  if(!S.activeId) return;
  const lista = listaFiltrada();
  const i = lista.findIndex(x => x.id === S.activeId);
  const sig = lista[i + delta];
  if(!sig) return;
  centrar(sig.id);
  abrirPanel(sig.id, document.querySelector(`#n-${sig.id} [data-abrir]`));
}

/** Lleva el hito a la vista (sin usar scrollIntoView) */
function centrar(id){
  const el = document.getElementById('n-' + id) || document.getElementById('l-' + id);
  if(!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
  window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? 'auto' : 'smooth' });
}

function setupPanel(){
  $('#panel-close').addEventListener('click', cerrarPanel);
  $('#overlay').addEventListener('click', cerrarPanel);
  $('#panel-prev').addEventListener('click', () => saltar(-1));
  $('#panel-next').addEventListener('click', () => saltar(1));
  $$('[data-open-hito]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    centrar(a.dataset.openHito);
    abrirPanel(a.dataset.openHito, a);
  }));
}

/* =============================================================
   8. TOOLTIP, TEMA Y TECLADO
   ============================================================= */
function setupTooltip(){
  const tip = $('#tooltip');
  const mostrar = el => {
    const cont = el.closest('[data-hito]');
    if(!cont || cont.classList.contains('is-dimmed')) return;
    const h = S.data.hitos.find(x => x.id === cont.dataset.hito);
    if(!h) return;
    const c = CAT[h.categoria], g = GEN[h.generacion];
    tip.innerHTML = `<b>${esc(h.periodo)}</b> ${esc(h.titulo)}
      <span>${esc(c.nombre)} · ${esc(g.nombre)} — Enter para ver el detalle</span>`;
    const r = el.getBoundingClientRect();
    tip.style.left = clamp(r.left + r.width / 2, 16, window.innerWidth - 16) + 'px';
    tip.style.top = r.top + 'px';
    tip.dataset.show = 'true';
    tip.setAttribute('aria-hidden', 'false');
  };
  const ocultar = () => { tip.dataset.show = 'false'; tip.setAttribute('aria-hidden', 'true'); };

  document.addEventListener('mouseover', e => {
    const b = e.target.closest && e.target.closest('[data-abrir]');
    b ? mostrar(b) : ocultar();
  });
  document.addEventListener('focusin', e => {
    const b = e.target.closest && e.target.closest('[data-abrir]');
    b ? mostrar(b) : ocultar();
  });
  document.addEventListener('scroll', ocultar, { passive:true });
}

function setupTema(){
  const btn = $('#tema');
  const set = oscuro => {
    document.documentElement.dataset.theme = oscuro ? 'dark' : 'light';
    btn.setAttribute('aria-pressed', String(oscuro));
    btn.title = oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
  };
  set(window.matchMedia('(prefers-color-scheme: dark)').matches);
  btn.addEventListener('click', () => set(document.documentElement.dataset.theme !== 'dark'));
}

function setupTeclado(){
  document.addEventListener('keydown', e => {
    if($('#panel').hidden) return;
    if(e.key === 'Escape'){ cerrarPanel(); return; }
    if(e.target.closest('.panel__body') && ['ArrowLeft','ArrowRight'].includes(e.key)) return;
    if(e.key === 'ArrowLeft'){ e.preventDefault(); saltar(-1); }
    if(e.key === 'ArrowRight'){ e.preventDefault(); saltar(1); }
  });
}

/* ---------- Arranque ---------- */
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
})();
