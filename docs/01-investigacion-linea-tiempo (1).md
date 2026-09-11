# Línea de Tiempo: Evolución de la Computación y la Tecnología
## Documento 01 — Investigación e insumo de contenido

> **Uso de este documento:** es el *insumo de contenido* para construir la línea de tiempo interactiva en Claude Design (HTML/CSS/JS). Cada hito ya trae la información resumida en formato de "tarjeta de línea de tiempo" y su **espacio de imagen prenombrado**, para que después solo cargues los archivos en la carpeta correcta y se llamen solos.

---

## 0. Convenciones (para no perder el hilo en los siguientes pasos)

**Sistema de ID:** cada hito tiene un código `H##` en orden cronológico de visualización.

**Nombre de imagen (ya reservado en cada tarjeta):**
```
assets/img/hitos/h##-slug.webp
```
- `##` = número del hito (dos dígitos).
- `slug` = nombre corto en minúsculas y con guiones.
- Formato sugerido: `.webp` (ligero para web); acepta también `.jpg`/`.png`.

**Tipos de entrada** (útil para el diseño interactivo):
- `Evento puntual` → se dibuja como un nodo/punto en un año concreto.
- `Banda / periodo` → se dibuja como una barra que abarca varios años (tecnologías que coexisten).

**Categorías (para color/ícono en la UI):**
- 🖥️ **Hardware** (máquinas, chips)
- ⌨️ **Programación** (lenguajes, sistemas operativos)
- 🧠 **Concepto/Arquitectura** (ideas fundacionales)
- 💾 **Almacenamiento**
- 🌐 **Redes / Web**

---

## 1. Antecedentes teóricos — *Aportación propia*

> **Aportación propia (confirmada).** Estas tres entradas — **Máquina de Turing (H01)**, **Z3 de Zuse (H02)** y **Ley de Moore (H18)** — son tus acontecimientos adicionales al listado obligatorio. Cada una incluye su justificación de por qué merece estar en la línea de tiempo. La actividad pedía al menos dos; incluimos tres para dar más profundidad al relato (teoría → primeras máquinas → ritmo de progreso).

### H01 · 1936 — Máquina de Turing (*On Computable Numbers*) 🧠 Concepto
- **Tipo:** Evento puntual
- **Generación:** Antecedente teórico (previo a la 1ª)
- **¿Qué ocurrió?** Alan Turing publica un modelo matemático abstracto —la "máquina de Turing"— que define formalmente qué significa "computar" y qué problemas son computables.
- **Innovación que representa:** la fundación teórica de la ciencia de la computación; la idea de una máquina universal capaz de ejecutar cualquier algoritmo.
- **¿Por qué fue importante?** Toda computadora moderna es, conceptualmente, una aproximación física a la máquina universal de Turing. Separó por primera vez el *qué se computa* del *cómo se construye la máquina*.
- **¿Qué cambió?** Antes no existía una definición rigurosa de "cálculo mecánico". Turing la aportó y con ella la noción de programa como secuencia de instrucciones.
- **Relación HW ↔ SW:** es el puente conceptual: justifica por qué una misma máquina (hardware) puede resolver problemas distintos según su programa (software).
- **Justificación como aportación propia:** conecta la teoría con toda la línea de tiempo; explica *por qué* fue posible que el hardware evolucionara sin reinventar la idea de "computar".
- **Imagen sugerida:** `assets/img/hitos/h01-turing.webp` — retrato de Alan Turing o esquema de una máquina de Turing (cinta + cabezal). *Alt:* "Alan Turing y el esquema de la máquina de Turing".
- **Fuente(s):** Turing, A. M. (1936), *On Computable Numbers…*; Encyclopædia Britannica – "Alan Turing"; Computer History Museum (computerhistory.org).

### H02 · 1941 — Z3 de Konrad Zuse 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Antecedente inmediato de la 1ª
- **¿Qué ocurrió?** El ingeniero alemán Konrad Zuse termina la **Z3**, considerada la primera computadora digital programable y totalmente automática (basada en relés electromecánicos, aritmética binaria de punto flotante).
- **Innovación que representa:** programabilidad automática mediante cinta perforada, antes que Colossus y ENIAC.
- **¿Por qué fue importante?** Demuestra que la historia de la computación no es una línea única anglosajona: hubo esfuerzos paralelos (Alemania, Reino Unido, EE.UU.) que coexistieron.
- **¿Qué cambió?** Frente a calculadoras mecánicas fijas, la Z3 podía ejecutar secuencias de instrucciones distintas sin rediseñar la máquina.
- **Relación HW ↔ SW:** primeros pasos de la programación como algo separable del cableado físico.
- **Justificación como aportación propia:** refuerza directamente la pregunta de reflexión: las "generaciones" no fueron rupturas limpias, sino desarrollos simultáneos y traslapados.
- **Imagen sugerida:** `assets/img/hitos/h02-z3.webp` — réplica de la Z3 (Deutsches Museum) o Konrad Zuse. *Alt:* "Réplica de la computadora Z3 de Konrad Zuse".
- **Fuente(s):** Deutsches Museum; Encyclopædia Britannica – "Konrad Zuse"; IEEE Annals of the History of Computing.

---

## 2. Primera generación (tubos de vacío, ~1940–1956)

### H03 · 1943 — Colossus 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Primera
- **¿Qué ocurrió?** En Bletchley Park (Reino Unido), Tommy Flowers y su equipo construyen **Colossus**, máquina electrónica para descifrar el cifrado alemán Lorenz durante la Segunda Guerra Mundial.
- **Innovación que representa:** primera computadora electrónica digital *programable* (mediante conmutadores y clavijas), con ~1,600–2,400 tubos de vacío.
- **¿Por qué fue importante?** Probó que la electrónica de tubos podía procesar información mucho más rápido que lo electromecánico. Su existencia fue secreta por décadas.
- **¿Qué cambió?** Aceleró el cómputo respecto a máquinas de relés; pasó de lo mecánico a lo puramente electrónico.
- **Relación HW ↔ SW:** aún no había "programa almacenado": se reconfiguraba físicamente para cada tarea.
- **Imagen sugerida:** `assets/img/hitos/h03-colossus.webp` — Colossus en Bletchley Park (réplica del The National Museum of Computing). *Alt:* "Computadora Colossus con tubos de vacío en Bletchley Park".
- **Fuente(s):** The National Museum of Computing (tnmoc.org); Encyclopædia Britannica – "Colossus".

### H04 · 1945 — ENIAC ⌨️/🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Primera
- **¿Qué ocurrió?** J. Presper Eckert y John Mauchly, en la Universidad de Pensilvania, terminan **ENIAC** (presentada en 1946): la primera computadora electrónica de propósito general de gran escala en EE.UU., con ~17,468 tubos de vacío.
- **Innovación que representa:** cómputo electrónico de propósito general (no dedicado a una sola tarea), aritmética decimal.
- **¿Por qué fue importante?** Marcó el inicio de la computación electrónica moderna a gran escala; su velocidad era miles de veces superior a la de las calculadoras electromecánicas.
- **¿Qué cambió?** Frente a Colossus (dedicada), ENIAC era reprogramable para múltiples problemas… pero reconfigurando cables y switches (días de trabajo).
- **Relación HW ↔ SW:** las "programadoras" de ENIAC (equipo pionero, en su mayoría mujeres) mostraron la programación como disciplina emergente antes de que existieran los lenguajes.
- **Imagen sugerida:** `assets/img/hitos/h04-eniac.webp` — ENIAC con operadoras reconectando paneles. *Alt:* "La computadora ENIAC y sus operadoras".
- **Fuente(s):** Computer History Museum; Encyclopædia Britannica – "ENIAC"; Penn Engineering.

### H05 · Década de 1940 — Programación en lenguaje máquina ⌨️ Programación
- **Tipo:** Banda / periodo (~1940–1955)
- **Generación:** Primera
- **¿Qué ocurrió?** Las primeras máquinas se "programaban" directamente en código binario (unos y ceros) o reconfigurando hardware; cada instrucción correspondía a operaciones específicas de esa máquina.
- **Innovación que representa:** el software en su forma más primitiva: instrucciones legibles solo por la máquina.
- **¿Por qué fue importante?** Estableció la idea de "instrucción" como unidad de cómputo, base de todo lo que vendría.
- **¿Qué cambió?** Nada aún abstracto: era lento, propenso a errores y no portable entre máquinas distintas.
- **Relación HW ↔ SW:** máxima dependencia: el programa estaba pegado al hardware concreto.
- **Imagen sugerida:** `assets/img/hitos/h05-lenguaje-maquina.webp` — tarjeta perforada o volcado de código binario. *Alt:* "Programación en lenguaje máquina: código binario y tarjeta perforada".
- **Fuente(s):** Computer History Museum; IEEE Computer Society – historia de los lenguajes.

### H06 · 1947 — Invención del transistor 🖥️ Hardware *(hito de transición)*
- **Tipo:** Evento puntual
- **Generación:** Puente entre 1ª y 2ª
- **¿Qué ocurrió?** En los Laboratorios Bell, John Bardeen, Walter Brattain y William Shockley inventan el **transistor** (de contacto de punto), premiado con el Nobel en 1956.
- **Innovación que representa:** un componente de estado sólido que amplifica y conmuta señales, sustituto del tubo de vacío.
- **¿Por qué fue importante?** Fue el habilitador físico de la segunda generación: más pequeño, frío, confiable y barato que el tubo.
- **¿Qué cambió?** Eliminó el calor, el tamaño y la fragilidad de los tubos, abriendo la puerta a la miniaturización.
- **⚠️ Nota de transición (respóndela en la UI):** el transistor se inventa en **1947**, *antes* que máquinas de 1ª generación como UNIVAC I (1951). ¿Por qué entonces define a la 2ª? Porque un invento de laboratorio tarda años en volverse fabricable, económico y confiable: la **adopción comercial** llegó a mediados de los 50. Por eso las máquinas de tubos siguieron construyéndose en paralelo. Es el mejor ejemplo de que las generaciones **se traslapan**, no se cortan de golpe.
- **Relación HW ↔ SW:** al hacer el hardware más denso y confiable, hizo viables programas y sistemas más complejos.
- **Imagen sugerida:** `assets/img/hitos/h06-transistor.webp` — primer transistor de Bell Labs. *Alt:* "El primer transistor de contacto de punto, Bell Labs 1947".
- **Fuente(s):** Nokia Bell Labs (bell-labs.com); Encyclopædia Britannica – "Transistor"; Computer History Museum.

### H07 · 1948 — Manchester Baby y el programa almacenado 🧠 Concepto
- **Tipo:** Evento puntual
- **Generación:** Primera
- **¿Qué ocurrió?** La **Small-Scale Experimental Machine ("Baby")** de la Universidad de Mánchester ejecuta, el 21 de junio de 1948, el primer programa almacenado en memoria electrónica (memoria de tubo Williams).
- **Innovación que representa:** la **arquitectura de programa almacenado** (línea de las ideas de von Neumann / informe EDVAC, 1945): programa y datos conviven en la misma memoria.
- **¿Por qué fue importante?** Es el modelo conceptual de *toda* computadora actual: cambiar de tarea = cargar otro programa, no recablear.
- **¿Qué cambió?** Frente a ENIAC/Colossus (recableado físico), ahora el "cambio de tarea" era cuestión de software.
- **Relación HW ↔ SW:** aquí nace la relación moderna: el software se vuelve el elemento flexible sobre un hardware fijo.
- **Imagen sugerida:** `assets/img/hitos/h07-manchester-baby.webp` — réplica del Manchester Baby. *Alt:* "Réplica del Manchester Baby, primera máquina de programa almacenado".
- **Fuente(s):** University of Manchester; Computer History Museum; Britannica.

### H08 · 1951 — UNIVAC I 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Primera
- **¿Qué ocurrió?** Eckert y Mauchly (bajo Remington Rand) entregan **UNIVAC I**, la primera computadora comercial de EE.UU.; célebre por predecir el resultado de la elección presidencial de 1952 en vivo por TV.
- **Innovación que representa:** el paso de la computadora de laboratorio a producto comercial; usaba cinta magnética en lugar de tarjetas.
- **¿Por qué fue importante?** Inauguró la computación como negocio y herramienta administrativa/estadística, no solo científica o militar.
- **¿Qué cambió?** Introdujo el almacenamiento en cinta magnética (más rápido y denso que las tarjetas perforadas).
- **Relación HW ↔ SW:** al venderse a empresas, empujó la necesidad de software más accesible (semilla de lenguajes de negocio como COBOL).
- **Imagen sugerida:** `assets/img/hitos/h08-univac.webp` — UNIVAC I con operadores. *Alt:* "La computadora comercial UNIVAC I, 1951".
- **Fuente(s):** Computer History Museum; Britannica – "UNIVAC".

---

## 3. Segunda generación (transistores, ~1956–1964)

### H09 · Década de 1950 — Lenguaje ensamblador ⌨️ Programación
- **Tipo:** Banda / periodo (~1949–1960s)
- **Generación:** Primera→Segunda
- **¿Qué ocurrió?** Aparecen los lenguajes ensambladores: **mnemónicos** (p. ej. `ADD`, `MOV`) que un "ensamblador" traduce a lenguaje máquina.
- **Innovación que representa:** la primera capa de abstracción sobre el binario.
- **¿Por qué fue importante?** Hizo la programación más legible y menos propensa a errores, sin perder control del hardware.
- **¿Qué cambió?** Frente al binario puro, introdujo nombres simbólicos; frente a los lenguajes de alto nivel, seguía siendo específico de cada máquina.
- **Relación HW ↔ SW:** abstracción mínima que aún refleja fielmente la arquitectura del procesador.
- **Imagen sugerida:** `assets/img/hitos/h09-ensamblador.webp` — fragmento de código ensamblador. *Alt:* "Ejemplo de código en lenguaje ensamblador".
- **Fuente(s):** IEEE Computer Society; Computer History Museum.

### H10 · 1956 — TX-0 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Segunda
- **¿Qué ocurrió?** El **TX-0** del MIT Lincoln Laboratory es una de las primeras computadoras *totalmente transistorizadas* y programables de propósito general.
- **Innovación que representa:** la transición práctica del tubo al transistor en una máquina completa e interactiva.
- **¿Por qué fue importante?** Demostró en la práctica las ventajas del transistor y fomentó una cultura de programación interactiva (antecesor del PDP-1 y de la cultura hacker del MIT).
- **¿Qué cambió?** Máquinas más pequeñas, confiables y con interacción más directa (pantalla, entrada en tiempo real).
- **Relación HW ↔ SW:** el hardware transistorizado habilitó estilos de programación más experimentales e interactivos.
- **Imagen sugerida:** `assets/img/hitos/h10-tx0.webp` — TX-0 del MIT. *Alt:* "Computadora transistorizada TX-0 del MIT".
- **Fuente(s):** MIT; Computer History Museum.

### H11 · 1957 — FORTRAN ⌨️ Programación
- **Tipo:** Evento puntual
- **Generación:** Segunda
- **¿Qué ocurrió?** IBM, con el equipo de John Backus, publica **FORTRAN** (FORmula TRANslation), el primer lenguaje de alto nivel de uso masivo.
- **Innovación que representa:** programar con fórmulas cercanas a las matemáticas, traducidas por un *compilador*.
- **¿Por qué fue importante?** Multiplicó la productividad científica e ingenieril; probó que un compilador podía generar código eficiente.
- **¿Qué cambió?** Frente al ensamblador, el mismo programa podía (en principio) portarse a distintas máquinas y ser escrito mucho más rápido.
- **Relación HW ↔ SW:** primer gran divorcio entre el programador y el hardware concreto.
- **Imagen sugerida:** `assets/img/hitos/h11-fortran.webp` — manual/portada de FORTRAN o tarjeta de código. *Alt:* "Primer manual del lenguaje FORTRAN de IBM".
- **Fuente(s):** IBM (ibm.com/history); Computer History Museum; Britannica.

### H12 · 1958–1959 — Circuito integrado 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Segunda→Tercera (habilitador)
- **¿Qué ocurrió?** Jack Kilby (Texas Instruments, 1958) y Robert Noyce (Fairchild, 1959) desarrollan el **circuito integrado**: múltiples transistores en una sola pieza de material semiconductor. Noyce aporta el proceso planar de silicio, clave para la fabricación en masa.
- **Innovación que representa:** integrar muchos componentes en un solo chip.
- **¿Por qué fue importante?** Es la base física de la tercera generación y de toda la microelectrónica posterior (incluido el microprocesador).
- **¿Qué cambió?** Frente a transistores sueltos soldados, permitió densidad, miniaturización y confiabilidad enormes.
- **Relación HW ↔ SW:** más transistores por área ⇒ máquinas más potentes ⇒ software más complejo posible.
- **Imagen sugerida:** `assets/img/hitos/h12-circuito-integrado.webp` — primer CI de Kilby. *Alt:* "El primer circuito integrado de Jack Kilby, 1958".
- **Fuente(s):** Texas Instruments; Intel; Computer History Museum; Britannica.

### H13 · 1959 — COBOL ⌨️ Programación
- **Tipo:** Evento puntual
- **Generación:** Segunda
- **¿Qué ocurrió?** El comité CODASYL (con influencia decisiva de Grace Hopper) define **COBOL** (Common Business-Oriented Language), lenguaje orientado a procesamiento de datos administrativos.
- **Innovación que representa:** un lenguaje legible, cercano al inglés, pensado para negocios y portable entre fabricantes.
- **¿Por qué fue importante?** Estandarizó el software empresarial; aún hoy corre en banca y gobierno.
- **¿Qué cambió?** Frente a FORTRAN (científico), atendió el mundo administrativo y priorizó la legibilidad.
- **Relación HW ↔ SW:** impulsó la idea de portabilidad entre hardware de distintos fabricantes.
- **Imagen sugerida:** `assets/img/hitos/h13-cobol.webp` — Grace Hopper o listado COBOL. *Alt:* "Grace Hopper y el lenguaje COBOL".
- **Fuente(s):** Computer History Museum; IEEE; Britannica – "Grace Hopper".

### H14 · 1960 — ALGOL 60 ⌨️ Programación
- **Tipo:** Evento puntual
- **Generación:** Segunda
- **¿Qué ocurrió?** Un comité internacional publica **ALGOL 60**, lenguaje algorítmico que introduce estructuras de bloques y se describe con la notación formal BNF.
- **Innovación que representa:** rigor formal en el diseño de lenguajes; base conceptual de la programación estructurada.
- **¿Por qué fue importante?** Influyó en casi todos los lenguajes posteriores (C, Pascal, Java…): el "abuelo" de la sintaxis moderna.
- **¿Qué cambió?** Aportó la estructura de bloques y el ámbito de variables, ausentes en FORTRAN temprano.
- **Relación HW ↔ SW:** consolidó la programación como disciplina teórica, no solo práctica.
- **Imagen sugerida:** `assets/img/hitos/h14-algol.webp` — reporte de ALGOL 60 o diagrama BNF. *Alt:* "Reporte del lenguaje ALGOL 60".
- **Fuente(s):** ACM; IEEE; Computer History Museum.

### H15 · 1960 — PDP-1 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Segunda
- **¿Qué ocurrió?** Digital Equipment Corporation (DEC) lanza la **PDP-1**, considerada la primera **minicomputadora** interactiva; en ella se creó *Spacewar!* (1962), de los primeros videojuegos.
- **Innovación que representa:** cómputo interactivo y "personal-institucional", más accesible que los mainframes gigantes.
- **¿Por qué fue importante?** Democratizó parcialmente el acceso: laboratorios y universidades podían tener su propia máquina.
- **¿Qué cambió?** Frente a los mainframes por lotes, ofreció interacción directa con pantalla y teclado.
- **Relación HW ↔ SW:** la interactividad impulsó nuevas formas de software (juegos, editores, cultura hacker).
- **Imagen sugerida:** `assets/img/hitos/h15-pdp1.webp` — PDP-1 con *Spacewar!*. *Alt:* "Minicomputadora PDP-1 ejecutando Spacewar!".
- **Fuente(s):** Computer History Museum; DEC (archivos).

---

## 4. Tercera generación (circuitos integrados, ~1964–1971)

### H16 · 1964 — IBM System/360 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Tercera
- **¿Qué ocurrió?** IBM lanza el **System/360**, una *familia* de computadoras compatibles entre sí que comparten la misma arquitectura de instrucciones (ISA), en distintos tamaños y precios.
- **Innovación que representa:** separar la **arquitectura** (el contrato de software) de la **implementación** (el hardware concreto); el byte de 8 bits se vuelve estándar.
- **¿Por qué fue importante?** El software escrito para un modelo corría en toda la familia: nace la compatibilidad y la idea de "plataforma".
- **¿Qué cambió?** Frente a máquinas incompatibles entre sí, permitió escalar sin reescribir todo el software.
- **Relación HW ↔ SW:** definió el concepto moderno de arquitectura como interfaz estable entre hardware y programas.
- **Imagen sugerida:** `assets/img/hitos/h16-system360.webp` — IBM System/360. *Alt:* "Mainframe IBM System/360".
- **Fuente(s):** IBM (ibm.com/history); Computer History Museum; Britannica.

### H17 · 1964 — BASIC ⌨️ Programación
- **Tipo:** Evento puntual
- **Generación:** Tercera
- **¿Qué ocurrió?** John Kemeny y Thomas Kurtz crean **BASIC** en Dartmouth, un lenguaje sencillo para enseñar programación en sistemas de tiempo compartido.
- **Innovación que representa:** accesibilidad: programar sin ser especialista.
- **¿Por qué fue importante?** Fue el lenguaje de entrada de millones de personas en los 70–80 (y clave en las primeras microcomputadoras, con Microsoft Altair BASIC).
- **¿Qué cambió?** Bajó drásticamente la barrera de entrada a la programación.
- **Relación HW ↔ SW:** ligado al tiempo compartido, permitió que muchos usuarios usaran una misma máquina a la vez.
- **Imagen sugerida:** `assets/img/hitos/h17-basic.webp` — terminal con código BASIC. *Alt:* "Programa en lenguaje BASIC en una terminal".
- **Fuente(s):** Dartmouth College; Computer History Museum.

### H18 · 1965 — Ley de Moore 🧠 Concepto *(Aportación propia)*
- **Tipo:** Evento puntual (con proyección a futuro)
- **Generación:** Tercera en adelante (marco transversal)
- **¿Qué ocurrió?** Gordon Moore observa que el número de transistores por chip se duplica aproximadamente cada 1–2 años (revisado en 1975), a costo decreciente.
- **Innovación que representa:** no es una ley física sino una tendencia económica-tecnológica que guió a la industria durante décadas.
- **¿Por qué fue importante?** Explica el ritmo sostenido del progreso: por qué las computadoras mejoraron de forma continua y predecible.
- **¿Qué cambió?** Convirtió la mejora en una expectativa planificable de la industria.
- **Justificación como aportación propia:** es **la mejor entrada para responder la pregunta de reflexión**: sostiene la tesis de la "evolución progresiva" frente a la de "rupturas".
- **Relación HW ↔ SW:** más transistores baratos ⇒ hardware más potente ⇒ software cada vez más ambicioso, sin cambiar el paradigma de golpe.
- **Imagen sugerida:** `assets/img/hitos/h18-ley-moore.webp` — gráfica de la Ley de Moore o retrato de Gordon Moore. *Alt:* "Gráfica de la Ley de Moore: transistores por chip en el tiempo".
- **Fuente(s):** Moore, G. (1965), *Electronics Magazine*; Intel; IEEE.

### H19 · 1969 — UNIX ⌨️ Programación / SO
- **Tipo:** Evento puntual
- **Generación:** Tercera
- **¿Qué ocurrió?** Ken Thompson y Dennis Ritchie, en Bell Labs, crean **UNIX**, un sistema operativo multitarea y multiusuario, portable y modular.
- **Innovación que representa:** un SO diseñado para ser simple, componible ("filosofía UNIX") y portable entre máquinas.
- **¿Por qué fue importante?** Es el ancestro directo de Linux, macOS, Android y de la infraestructura de Internet.
- **¿Qué cambió?** Frente a SO atados a un solo hardware, priorizó la portabilidad (potenciada al reescribirse en C).
- **Relación HW ↔ SW:** su portabilidad rompió la dependencia SO–hardware; un mismo sistema podía correr en máquinas distintas.
- **Imagen sugerida:** `assets/img/hitos/h19-unix.webp` — Thompson y Ritchie ante una PDP. *Alt:* "Ken Thompson y Dennis Ritchie con una computadora ejecutando UNIX".
- **Fuente(s):** Nokia Bell Labs; Computer History Museum; Britannica.

### H20 · 1970 — PDP-11 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Tercera
- **¿Qué ocurrió?** DEC lanza la **PDP-11**, una de las minicomputadoras más exitosas e influyentes de la historia.
- **Innovación que representa:** una arquitectura elegante y ortogonal que influyó en el diseño del lenguaje C y de procesadores posteriores.
- **¿Por qué fue importante?** Fue la plataforma donde maduraron UNIX y C; formó a una generación de ingenieros.
- **¿Qué cambió?** Ofreció mejor arquitectura y relación costo-desempeño que sus predecesoras.
- **Relación HW ↔ SW:** ejemplo claro de co-evolución: su hardware moldeó el software (C) y viceversa.
- **Imagen sugerida:** `assets/img/hitos/h20-pdp11.webp` — PDP-11. *Alt:* "Minicomputadora DEC PDP-11".
- **Fuente(s):** Computer History Museum; DEC (archivos).

---

## 5. Cuarta generación (microprocesadores, ~1971 en adelante)

### H21 · 1971 — Intel 4004 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Cuarta
- **¿Qué ocurrió?** Intel lanza el **4004**, el primer **microprocesador** comercial: una CPU completa de 4 bits en un solo chip (equipo de Federico Faggin, Ted Hoff, Stanley Mazor y Masatoshi Shima).
- **Innovación que representa:** integrar la unidad central de procesamiento en un único circuito.
- **¿Por qué fue importante?** Detonó la cuarta generación y, con ella, la computadora personal: la CPU se volvió un componente barato y masivo.
- **¿Qué cambió?** Frente a CPUs hechas de muchos chips, todo cupo en uno solo.
- **Relación HW ↔ SW:** el microprocesador convirtió el cómputo en algo integrable en cualquier producto (semilla del cómputo ubicuo).
- **Imagen sugerida:** `assets/img/hitos/h21-intel4004.webp` — chip Intel 4004. *Alt:* "El microprocesador Intel 4004, 1971".
- **Fuente(s):** Intel (intel.com/museum); Computer History Museum; Britannica.

### H22 · 1972 — Lenguaje C ⌨️ Programación
- **Tipo:** Evento puntual
- **Generación:** Cuarta
- **¿Qué ocurrió?** Dennis Ritchie desarrolla **C** en Bell Labs para reescribir UNIX; combina control de bajo nivel con portabilidad de alto nivel.
- **Innovación que representa:** un lenguaje "de sistemas" eficiente y portable a la vez.
- **¿Por qué fue importante?** Es la base de casi todo el software moderno de sistemas; influyó en C++, Java, C#, Python (implementación), etc.
- **¿Qué cambió?** Permitió escribir sistemas operativos portables sin renunciar al rendimiento del ensamblador.
- **Relación HW ↔ SW:** el puente definitivo entre "cerca del hardware" y "portable entre hardware".
- **Imagen sugerida:** `assets/img/hitos/h22-lenguaje-c.webp` — libro *The C Programming Language* (K&R) o código en C. *Alt:* "El lenguaje de programación C y el libro de Kernighan y Ritchie".
- **Fuente(s):** Nokia Bell Labs; Computer History Museum.

### H23 · 1974 — Intel 8080 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Cuarta
- **¿Qué ocurrió?** Intel lanza el **8080**, microprocesador de 8 bits mucho más capaz que el 4004.
- **Innovación que representa:** un micro suficientemente potente para construir computadoras de uso general.
- **¿Por qué fue importante?** Fue el "motor" del Altair 8800 y catalizador de la industria de la microcomputadora.
- **¿Qué cambió?** Mayor potencia, más memoria direccionable y un conjunto de instrucciones más rico.
- **Relación HW ↔ SW:** su capacidad hizo viable software real de propósito general en microcomputadoras.
- **Imagen sugerida:** `assets/img/hitos/h23-intel8080.webp` — chip Intel 8080. *Alt:* "Microprocesador Intel 8080, 1974".
- **Fuente(s):** Intel; Computer History Museum.

### H24 · 1975 — Altair 8800 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Cuarta
- **¿Qué ocurrió?** MITS lanza el **Altair 8800** (basado en el 8080), kit que suele señalarse como el detonante de la revolución de la computadora personal. Su primer software: **Altair BASIC**, primer producto de Microsoft.
- **Innovación que representa:** la computadora al alcance de aficionados, no solo de instituciones.
- **¿Por qué fue importante?** Encendió el movimiento hobbyista (Homebrew Computer Club) del que surgieron Apple, Microsoft y la industria del software personal.
- **¿Qué cambió?** Llevó el cómputo del laboratorio al escritorio del entusiasta.
- **Relación HW ↔ SW:** creó por primera vez un *mercado de software* para computadoras personales.
- **Imagen sugerida:** `assets/img/hitos/h24-altair.webp` — Altair 8800 con sus switches. *Alt:* "La microcomputadora Altair 8800, 1975".
- **Fuente(s):** Computer History Museum; Smithsonian.

### H25 · 1977 — Apple II 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Cuarta
- **¿Qué ocurrió?** Steve Wozniak y Steve Jobs lanzan la **Apple II**, una de las primeras computadoras personales de éxito masivo, con gráficos a color y lista para usar.
- **Innovación que representa:** la PC como producto de consumo terminado (no un kit).
- **¿Por qué fue importante?** Con la hoja de cálculo **VisiCalc** (1979), convirtió a la PC en herramienta de negocio: la "app que vendía la máquina".
- **¿Qué cambió?** Pasó del kit del aficionado al aparato listo para el hogar y la oficina.
- **Relación HW ↔ SW:** demostró que el *software* (VisiCalc) podía justificar la compra del hardware.
- **Imagen sugerida:** `assets/img/hitos/h25-apple2.webp` — Apple II. *Alt:* "La computadora personal Apple II, 1977".
- **Fuente(s):** Computer History Museum; Britannica – "Apple II".

### H26 · 1981 — IBM PC 🖥️ Hardware
- **Tipo:** Evento puntual
- **Generación:** Cuarta
- **¿Qué ocurrió?** IBM lanza el **IBM PC (modelo 5150)** con arquitectura abierta y MS-DOS de Microsoft.
- **Innovación que representa:** un estándar de industria abierto que otros fabricantes podían clonar.
- **¿Por qué fue importante?** Creó el ecosistema "PC compatible" que aún domina; consolidó a Microsoft e Intel ("Wintel").
- **¿Qué cambió?** Frente a plataformas cerradas, su apertura permitió un mercado gigantesco de clones y software.
- **Relación HW ↔ SW:** la separación entre fabricante de hardware y proveedor de SO definió el modelo de negocio de la era PC.
- **Imagen sugerida:** `assets/img/hitos/h26-ibm-pc.webp` — IBM PC 5150. *Alt:* "La IBM PC modelo 5150, 1981".
- **Fuente(s):** IBM (ibm.com/history); Computer History Museum.

### H27 · 1991 — Python ⌨️ Programación
- **Tipo:** Evento puntual
- **Generación:** Evolución posterior (post-generacional)
- **¿Qué ocurrió?** Guido van Rossum publica **Python**, un lenguaje de alto nivel que prioriza la legibilidad y la productividad.
- **Innovación que representa:** un lenguaje versátil, multiparadigma y de sintaxis clara.
- **¿Por qué fue importante?** Se volvió el idioma dominante de la ciencia de datos, la IA y la automatización (relevante para tu propia carrera).
- **¿Qué cambió?** Priorizó el tiempo del programador sobre el de la máquina: código legible y rápido de escribir.
- **Relación HW ↔ SW:** representa la etapa donde el hardware es tan potente que el foco se desplaza a la expresividad del software.
- **Imagen sugerida:** `assets/img/hitos/h27-python.webp` — logo de Python o Guido van Rossum. *Alt:* "El lenguaje de programación Python".
- **Fuente(s):** Python Software Foundation (python.org); *A Brief History of Python* (docs oficiales).

---

## 6. Ejes transversales (bandas que cruzan varias generaciones)

> Estos tres no son "puntos" en un año: son procesos continuos. En la UI conviene dibujarlos como **barras/bandas** que atraviesan la línea, reforzando visualmente la idea de *evolución progresiva*.

### H28 · ~1985–2003+ — Microprocesadores de 32 y 64 bits 🖥️ Hardware
- **Tipo:** Banda / periodo
- **¿Qué ocurrió?** Los micros pasan de 8/16 bits a **32 bits** (Intel 80386, 1985) y luego a **64 bits** (AMD64 / Opteron, 2003; también arquitecturas como ARM 64-bit), ampliando la memoria direccionable y el desempeño.
- **¿Por qué fue importante?** Habilitó memorias grandes, multitarea real y aplicaciones cada vez más exigentes; base de la computación actual.
- **¿Qué cambió?** Más bits = más memoria direccionable y cálculo más ancho, sin cambiar el paradigma de golpe (evolución continua).
- **Relación HW ↔ SW:** cada salto de bits obligó a sistemas operativos y software a adaptarse, mostrando co-evolución constante.
- **Imagen sugerida:** `assets/img/hitos/h28-32-64-bits.webp` — comparación de chips o oblea de silicio. *Alt:* "Evolución de los microprocesadores de 32 a 64 bits".
- **Fuente(s):** Intel; AMD; ARM; Computer History Museum.

### H29 · 1956–presente — Evolución del almacenamiento digital 💾 Almacenamiento
- **Tipo:** Banda / periodo
- **¿Qué ocurrió?** El almacenamiento evoluciona: tarjetas perforadas → cinta magnética → **disco duro (IBM RAMAC, 1956)** → disquete (1971) → CD/DVD → memoria flash y **SSD** → almacenamiento en la nube.
- **¿Por qué fue importante?** Cada salto multiplicó capacidad, velocidad y accesibilidad; sin almacenamiento barato no existirían el Big Data ni la ciencia de datos.
- **¿Qué cambió?** De kilobytes físicos y frágiles a terabytes en un chip o "en la nube".
- **Relación HW ↔ SW:** más y mejor almacenamiento habilitó bases de datos, sistemas operativos y aplicaciones cada vez mayores.
- **Imagen sugerida:** `assets/img/hitos/h29-almacenamiento.webp` — collage de medios (disquete, HDD, SSD, nube). *Alt:* "Evolución del almacenamiento: de la tarjeta perforada a la nube".
- **Fuente(s):** IBM; Computer History Museum; Britannica.

### H30 · 1969–presente — Expansión de Internet y la Web 🌐 Redes
- **Tipo:** Banda / periodo
- **¿Qué ocurrió?** **ARPANET (1969)** → estandarización de **TCP/IP (1983)** → **World Wide Web** de Tim Berners-Lee (propuesta 1989, pública 1991) → navegador **Mosaic (1993)** y masificación.
- **¿Por qué fue importante?** Convirtió computadoras aisladas en una red global; transformó comunicación, economía y acceso al conocimiento.
- **¿Qué cambió?** De máquinas independientes a un sistema interconectado; el dato deja de vivir en una sola computadora.
- **Relación HW ↔ SW:** exigió nuevos protocolos (software) y nueva infraestructura (hardware de red), otra co-evolución.
- **Imagen sugerida:** `assets/img/hitos/h30-internet-web.webp` — mapa de ARPANET o primer servidor web (NeXT de Berners-Lee). *Alt:* "Expansión de Internet y la World Wide Web".
- **Fuente(s):** CERN (home.cern); Internet Society (internetsociety.org); Computer History Museum.

---

## 7. Respuesta a la pregunta de reflexión (para la intro o el cierre de la línea de tiempo)

> **¿Los cambios entre generaciones ocurrieron como rupturas claras o como una evolución progresiva con tecnologías coexistiendo?**

**Tesis sugerida:** fue una **evolución progresiva con traslapes**, no una serie de cortes limpios. Evidencia que ya está en tus hitos:

1. **El transistor (1947) precede a máquinas de tubos como UNIVAC I (1951):** el invento existía años antes de reemplazar a la tecnología anterior. Las generaciones **coexistieron**.
2. **La Z3 (1941) y Colossus (1943) muestran desarrollos paralelos** en países distintos: no hubo un único punto de partida.
3. **La Ley de Moore (1965)** describe una mejora *continua y predecible*, no saltos abruptos.
4. **A partir de la 4ª generación, la periodización se difumina:** los "ejes transversales" (bits, almacenamiento, Internet) son bandas que cruzan décadas.
5. **Co-evolución HW ↔ SW:** cada avance de hardware habilitó nuevo software y viceversa (PDP-11 ↔ C ↔ UNIX), reforzando la continuidad.

**Conclusión:** las "generaciones" son una **periodización didáctica** útil para ordenar la historia, pero la realidad fue un continuo de innovaciones que se solaparon y se impulsaron mutuamente.

---

## 8. Fuentes verificadas por hito (enlaces en vivo)

> El rubro *Investigación y fuentes* pesa **20%**. Estos enlaces fueron **verificados** (existentes y activos al momento de armar el documento). Prioricé fuentes primarias/institucionales: Computer History Museum (CHM), Britannica, fabricantes (IBM, Intel, Nokia Bell Labs), CERN y museos oficiales. Buena práctica: al citar, anota **fecha de consulta**. Si algún enlace cambiara, la misma institución suele tener la página equivalente.

**Antecedentes / Aportación propia**
- **H01 – Turing (1936):** History of Information — https://www.historyofinformation.com/detail.php?id=619 · Texto original (LMS, PDF) — https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf
- **H02 – Z3 / Zuse (1941):** Britannica — https://www.britannica.com/technology/Zuse-computer · Britannica "Z3" — https://www.britannica.com/technology/Z3
- **H18 – Ley de Moore (1965):** CHM (Silicon Engine) — https://www.computerhistory.org/siliconengine/moores-law-predicts-the-future-of-integrated-circuits/ · Intel — https://www.intel.com/content/www/us/en/history/virtual-vault/articles/moores-law.html

**Primera generación**
- **H03 – Colossus (1943):** The National Museum of Computing — https://www.tnmoc.org/colossus
- **H04 – ENIAC (1945):** Britannica — https://www.britannica.com/technology/computer/ENIAC · CHM — https://www.computerhistory.org/revolution/birth-of-the-computer/4/78 · Penn Engineering — https://www.engineering.upenn.edu/about/history-heritage/eniac/
- **H05 – Lenguaje máquina (déc. 1940):** CHM Timeline — https://www.computerhistory.org/timeline/1948/
- **H06 – Transistor (1947):** CHM (Silicon Engine) — https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/ · Nokia Bell Labs — https://www.nokia.com/blog/the-transistor-75-years-since-the-famed-nokia-bell-labs-invention-changed-the-world/
- **H07 – Manchester Baby (1948):** CHM Timeline — https://www.computerhistory.org/timeline/1948/ · Univ. de Mánchester — https://www.scienceandindustrymuseum.org.uk/objects-and-stories/baby-and-modern-computing
- **H08 – UNIVAC I (1951):** CHM Timeline — https://www.computerhistory.org/timeline/1951/

**Segunda generación**
- **H09 – Lenguaje ensamblador (déc. 1950):** CHM Timeline — https://www.computerhistory.org/timeline/1950/
- **H10 – TX-0 (1956):** CHM Timeline — https://www.computerhistory.org/timeline/1956/
- **H11 – FORTRAN (1957):** CHM (Backus) — https://www.computerhistory.org/collections/catalog/102657970 · History of Information — https://www.historyofinformation.com/detail.php?entryid=968
- **H12 – Circuito integrado (1958–1959):** CHM Kilby 1958 — https://www.computerhistory.org/siliconengine/all-semiconductor-solid-circuit-is-demonstrated/ · CHM Noyce 1959 — https://www.computerhistory.org/siliconengine/practical-monolithic-integrated-circuit-concept-patented/
- **H13 – COBOL (1959):** CHM Timeline — https://www.computerhistory.org/timeline/1959/
- **H14 – ALGOL 60 (1960):** CHM Timeline — https://www.computerhistory.org/timeline/1960/
- **H15 – PDP-1 (1960):** CHM Timeline — https://www.computerhistory.org/timeline/1960/

**Tercera generación**
- **H16 – IBM System/360 (1964):** IBM — https://www.ibm.com/history/system-360 · CHM — https://www.computerhistory.org/revolution/mainframe-computers/7/161
- **H17 – BASIC (1964):** CHM Timeline — https://www.computerhistory.org/timeline/1964/
- **H19 – UNIX (1969):** National Inventors Hall of Fame — https://www.invent.org/inductees/dennis-ritchie · Bell Labs (Ritchie, PDF) — https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.pdf
- **H20 – PDP-11 (1970):** CHM Timeline — https://www.computerhistory.org/timeline/1970/

**Cuarta generación**
- **H21 – Intel 4004 (1971):** Intel — https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html · IEEE Spectrum — https://spectrum.ieee.org/chip-hall-of-fame-intel-4004-microprocessor
- **H22 – Lenguaje C (1972):** Britannica — https://www.britannica.com/technology/C-computer-programming-language · Bell Labs (Ritchie, PDF) — https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.pdf
- **H23 – Intel 8080 (1974):** CHM Timeline — https://www.computerhistory.org/timeline/1974/
- **H24 – Altair 8800 (1975):** CHM Timeline — https://www.computerhistory.org/timeline/1975/
- **H25 – Apple II (1977):** CHM Timeline — https://www.computerhistory.org/timeline/1977/
- **H26 – IBM PC (1981):** CHM Timeline — https://www.computerhistory.org/timeline/1981/

**Evolución posterior y ejes transversales**
- **H27 – Python (1991):** CHM (Guido van Rossum) — https://computerhistory.org/profile/guido-van-rossum/
- **H28 – Micros 32/64 bits (~1985–2003+):** CHM Timeline — https://www.computerhistory.org/timeline/1985/
- **H29 – Almacenamiento / IBM RAMAC (1956→):** CHM (Storage Engine) — https://www.computerhistory.org/storageengine/first-commercial-hard-disk-drive-shipped/
- **H30 – Internet y la Web (1969→):** CERN — https://home.cern/science/computing/the-birth-of-the-web/short-history-web/

> **Nota sobre las páginas del CHM Timeline** (`computerhistory.org/timeline/AÑO/`): son la ficha oficial de ese año e incluyen el hito correspondiente. Sirven como fuente confiable y, de paso, como referencia visual para tu propia línea de tiempo.

---

## 9. Resumen de decisiones pendientes (para el siguiente paso)

- [x] **Aportaciones propias definidas:** Turing (H01), Z3 (H02) y Ley de Moore (H18).
- [x] **Fuentes verificadas por hito** (sección 8).
- [ ] Confirmar si quieres incluir **los 30 hitos** o recortar algún eje transversal.
- [ ] (Opcional) Anotar la **fecha de consulta** junto a cada enlace citado.

**Siguiente documento (02):** especificaciones de diseño para Claude Design + sistema de carpetas/nombrado de imágenes (ya prealineado con los IDs `H##`, los nombres `h##-slug.webp` de este documento y la estructura que crea el script `crear-estructura.sh`).
