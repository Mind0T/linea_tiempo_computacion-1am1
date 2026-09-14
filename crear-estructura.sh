#!/usr/bin/env bash
# ============================================================================
#  crear-estructura.sh
#  Crea de un jalón la estructura de carpetas del proyecto
#  "Línea de tiempo: Evolución de la Computación".
#
#  USO (en Git Bash):
#     bash crear-estructura.sh
#  o bien, dándole permisos:
#     chmod +x crear-estructura.sh && ./crear-estructura.sh
#
#  Resultado: una carpeta lista para (1) pegar el diseño de Claude Design,
#  (2) soltar tus imágenes en assets/img/hitos/ con el nombre correcto,
#  (3) subir a GitHub y (4) desplegar en Vercel.
# ============================================================================

set -euo pipefail

# --- Nombre de la carpeta raíz del proyecto (cámbialo si quieres) ------------
PROYECTO="linea-tiempo-computacion"

echo ""
echo ">> Creando estructura del proyecto: $PROYECTO"
echo ""

# --- 1) Carpetas -------------------------------------------------------------
mkdir -p "$PROYECTO"/{css,js,data,docs}
mkdir -p "$PROYECTO"/assets/img/{hitos,generaciones,ui,og}
mkdir -p "$PROYECTO"/assets/{icons,fonts}

# --- 2) .gitkeep para que Git conserve las carpetas vacías -------------------
#     (Git no versiona carpetas vacías; este archivo las mantiene en el repo)
for dir in \
  "$PROYECTO/css" \
  "$PROYECTO/js" \
  "$PROYECTO/data" \
  "$PROYECTO/docs" \
  "$PROYECTO/assets/img/generaciones" \
  "$PROYECTO/assets/img/ui" \
  "$PROYECTO/assets/img/og" \
  "$PROYECTO/assets/icons" \
  "$PROYECTO/assets/fonts"
do
  touch "$dir/.gitkeep"
done

# --- 3) Manifiesto de imágenes esperadas (nombres exactos) ------------------
#     Suelta aquí los archivos con EXACTAMENTE estos nombres (formato .webp,
#     o .jpg/.png si prefieres, ajustando la extensión en el diseño).
cat > "$PROYECTO/assets/img/hitos/_IMAGENES-ESPERADAS.txt" << 'EOF'
Imágenes esperadas para cada hito (carpeta: assets/img/hitos/)
Formato recomendado: .webp  (alternativas: .jpg / .png)

h01-turing.webp
h02-z3.webp
h03-colossus.webp
h04-eniac.webp
h05-lenguaje-maquina.webp
h06-transistor.webp
h07-manchester-baby.webp
h08-univac.webp
h09-ensamblador.webp
h10-tx0.webp
h11-fortran.webp
h12-circuito-integrado.webp
h13-cobol.webp
h14-algol.webp
h15-pdp1.webp
h16-system360.webp
h17-basic.webp
h18-ley-moore.webp
h19-unix.webp
h20-pdp11.webp
h21-intel4004.webp
h22-lenguaje-c.webp
h23-intel8080.webp
h24-altair.webp
h25-apple2.webp
h26-ibm-pc.webp
h27-python.webp
h28-32-64-bits.webp
h29-almacenamiento.webp
h30-internet-web.webp
EOF

# --- 4) .gitignore -----------------------------------------------------------
cat > "$PROYECTO/.gitignore" << 'EOF'
# Sistema
.DS_Store
Thumbs.db
desktop.ini

# Editores
.vscode/
.idea/

# Node (por si más adelante agregas herramientas)
node_modules/
npm-debug.log*

# Vercel
.vercel
EOF

# --- 5) vercel.json (opcional, para URLs limpias) ---------------------------
cat > "$PROYECTO/vercel.json" << 'EOF'
{
  "cleanUrls": true,
  "trailingSlash": false
}
EOF

# --- 6) README.md ------------------------------------------------------------
cat > "$PROYECTO/README.md" << 'EOF'
# Línea de tiempo: Evolución de la Computación y la Tecnología

Línea de tiempo interactiva (HTML / CSS / JS) sobre la evolución de las
generaciones de computadoras: hardware, arquitectura y programación.

## Estructura
- `index.html` — página principal (generada con Claude Design).
- `css/` — estilos.
- `js/` — lógica e interactividad.
- `data/` — datos de los hitos (p. ej. `hitos.json`).
- `assets/img/hitos/` — imágenes de cada hito (`h01-...` a `h30-...`).
- `assets/img/generaciones/` — recursos por generación (banners/divisores).
- `assets/img/ui/`, `assets/icons/`, `assets/fonts/` — recursos de interfaz.
- `assets/img/og/` — imagen para compartir en redes (Open Graph).
- `docs/` — documento de investigación (insumo de contenido).

## Cómo agregar imágenes
Coloca cada imagen en `assets/img/hitos/` con el nombre exacto indicado en
`assets/img/hitos/_IMAGENES-ESPERADAS.txt`. El diseño ya las llama por ese nombre.

## Despliegue
1. Sube el repositorio a GitHub.
2. Importa el repo en Vercel (framework: *Other* / static). Sin build.
3. Comparte la URL pública de Vercel.
EOF

# --- 7) Mensaje final --------------------------------------------------------
echo ">> Estructura creada:"
echo ""
if command -v find >/dev/null 2>&1; then
  find "$PROYECTO" -not -path '*/.*' -type d | sort | sed "s|^|   |"
fi
echo ""
echo ">> Siguientes pasos:"
echo "   1) Copia el documento de investigación a:  $PROYECTO/docs/"
echo "   2) Pega el diseño de Claude Design (index.html, css/, js/, data/)."
echo "   3) Suelta las imágenes en:  $PROYECTO/assets/img/hitos/"
echo "      (nombres en _IMAGENES-ESPERADAS.txt)"
echo "   4) Inicializa Git y sube a GitHub:"
echo "        cd $PROYECTO"
echo "        git init && git add . && git commit -m \"Estructura inicial\""
echo ""
echo ">> Listo."
