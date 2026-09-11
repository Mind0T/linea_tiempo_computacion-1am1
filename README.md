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
