# J + L — Hasta el infinito 💫

Sitio web interactivo, un viaje cósmico contando la historia de Juan y Liz.

## Cómo personalizarlo

Todo lo editable está concentrado en **`js/main.js`**, arriba del todo, en el objeto `CONFIG`:

```js
const CONFIG = {
  startDate: new Date(2025, 7, 15, 0, 0, 0), // año, mes-1 (7 = agosto), día
  photos: [
    { src: 'fotos/foto1.jpg', caption: 'mi duende de ciudad' },
    ...
  ],
  hiddenPhrase: 'TE AMO LIZ, MI VIDA ENTERA'
};
```

### 1. Poner las fotos
Copiá tus fotos dentro de la carpeta `fotos/` con esos nombres exactos
(`foto1.jpg`, `foto2.jpg`, etc.) o cambiá el `src` en `CONFIG.photos` por el
nombre real de tu archivo. Si una foto no existe, el sitio no se rompe: muestra
un corazón con la frase en su lugar, así podés ver el diseño completo aunque
falten fotos.

Podés usar `.jpg`, `.png` o `.webp`. Para que cargue rápido, lo ideal es que
cada foto pese menos de 500kb (podés comprimirlas en https://squoosh.app).

### 2. Ajustar la fecha del contador
Cambiá `startDate` con la fecha que quieras (ya está puesta en el 15 de
agosto). El contador corre en vivo, en tiempo real, cada vez que alguien
abre el sitio.

### 3. Cambiar la frase secreta
`hiddenPhrase` es el mensaje que se arma tocando las estrellas en la escena
"Toca las estrellas que brillan". Podés poner la frase que quieras — se
reparte automáticamente entre tantas estrellas como palabras tenga.

### 4. Editar los textos
Los textos de cada escena están directo en `index.html`, en español y fáciles
de encontrar (buscá `<h2 class="scene-title">` o `<p class="scene-text">`).

## Cómo verlo en tu compu antes de subirlo

Con Python instalado, desde la carpeta del proyecto:

```bash
python3 -m http.server 8080
```

Después abrí `http://localhost:8080` en el navegador.

## Cómo subirlo a GitHub Pages

1. Creá un repositorio nuevo en GitHub (puede ser privado o público).
2. Subí todos estos archivos manteniendo la estructura de carpetas:
   ```
   index.html
   css/style.css
   js/stars.js
   js/main.js
   fotos/ (tus fotos)
   ```
3. En el repositorio: **Settings → Pages → Source** → elegí la rama `main`
   y la carpeta `/ (root)` → **Save**.
4. Esperá 1-2 minutos y tu sitio va a estar en:
   `https://tu-usuario.github.io/nombre-del-repo/`

## Estructura del sitio (las "escenas")

1. Apertura — encendido de estrella con los nombres
2. El origen — "big bang" del 15 de agosto
3. Dos locos — el texto sobre encontrarse
4. Constelación J + L dibujándose
5. Galería orbital de fotos (clic para agrandar)
6. Contador en vivo desde el 15 de agosto
7. Mensaje oculto — tocar estrellas para revelar una frase
8. Carta completa
9. Cierre final

## Notas técnicas

- Sin dependencias externas ni build: solo HTML, CSS y JS puro.
- Responsive, probado desde mobile hasta desktop.
- Respeta la preferencia de "reducir movimiento" del sistema operativo.
- El fondo de estrellas es un `<canvas>` animado con parallax al hacer scroll.
