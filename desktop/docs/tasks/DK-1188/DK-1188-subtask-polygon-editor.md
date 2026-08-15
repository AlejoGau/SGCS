# DK-1188 · Subtarea: Editor de polígonos para puntos de control

## Contexto original

Tarea: Incorporar herramienta de dibujo de polígonos en el Administrador para puntos de control de cámaras
🎯 Objetivo

Permitir que, desde el módulo de Administración/Configuración, se pueda asignar un polígono de detección a cada punto de control de una cámara. Este polígono definirá visualmente la zona activa de detección asociada a la cámara.

📍 Alcance
1. Herramienta de dibujo de polígono

En la pantalla de configuración de puntos de control, agregar un modo para dibujar un polígono sobre la imagen asociada a la cámara.

Funcionalidades requeridas:

Añadir vértices con clic.

Cerrar el polígono.

Mover o eliminar vértices.

Resetear/limpiar el dibujo.

Mostrar sobre la imagen un overlay transparente donde se verá el polígono en tiempo real mientras se edita.

2. Imagen de referencia

Cada cámara debe tener asociada una imagen estática predeterminada (snapshot) para ser usada como fondo del editor.

Si no existe imagen cargada:

Mostrar un placeholder genérico (fondo gris).

Mantener igualmente habilitada la funcionalidad de dibujo sobre ese fondo.

3. Escalado y proporciones

La vista debe respetar la relación de aspecto original de la cámara (según su resolución nativa).

El polígono dibujado debe guardarse en coordenadas normalizadas (0 a 1) respecto al ancho y alto de la imagen.

Esto asegura que, al usarse en el pipeline de detección (que puede procesar la imagen en otra resolución), el polígono se adapte proporcionalmente.

Al cargar la configuración, la UI debe reconstruir el polígono desde esas coordenadas normalizadas y mostrarlo correctamente escalado sobre la imagen.

4. Persistencia y estandarización

El polígono se almacena como parte de la configuración del punto de control en la base de datos.

Formato recomendado (ejemplo JSON):

{
  "polygon": [
    [0.12, 0.30],
    [0.45, 0.30],
    [0.50, 0.60],
    [0.15, 0.60]
  ]
}


El backend del Administrador debe incluir este polígono en la respuesta del API cuando se consulte la configuración del punto de control.

✅ Resultado esperado

El administrador puede abrir la configuración de un punto de control de cámara, ver una imagen base (snapshot o placeholder) y dibujar un polígono que define la zona activa.

El polígono se guarda y se reconstruye respetando proporciones.

El pipeline de detección podrá luego usar estas coordenadas normalizadas sin depender de la resolución de análisis.

Nota adicional: aparte vamos a sacar de la configuración el cruce de líneas porque no tiene sentido.

## Resumen operativo de la subtarea

- Alcance: habilitar en Administrador > Configuración > puntos de control un editor de polígonos con imagen base o placeholder, guardando y cargando coordenadas normalizadas 0–1.
- Funcionalidades: permitir añadir, mover y eliminar vértices, cerrar y resetear el polígono, y mostrar un overlay interactivo durante la edición.
- Persistencia: ajustar API y modelo de datos para almacenar `polygon` en JSON, sirviéndolo en las consultas y normalizando coordenadas antes de guardar.
- Limpieza: retirar la configuración actual de cruce de líneas del módulo por quedar obsoleta frente al nuevo polígono.
- Criterios de aceptación: el usuario puede dibujar y guardar el polígono, se reconstruye correctamente al recargar, funciona con placeholder y el API refleja los cambios sin el campo de cruce.
