# Exclusión local de `sencha.downloads` (git sparse-checkout)

## Contexto / Problema

El repositorio clonado pesa varios GB y contiene, entre otras cosas, la carpeta
`sencha.downloads/` con frameworks (.zip / .rar) que no se necesitan
tener en el disco local, pero que **sí están trackeados en Git** (forman parte
del historial y del repo remoto).

Borrar la carpeta a mano y luego hacer `git add` + `commit` + `push` la hubiera
eliminado también del repositorio remoto y del historial para todo el equipo.
Lo que se necesitaba era: **que desaparezca del disco local, sin generar ningún
commit ni afectar el remoto.**

## Qué hicimos

Usamos `git sparse-checkout` en modo `no-cone`, que permite definir con patrones
tipo `.gitignore` qué archivos/carpetas se materializan en el working tree local,
sin tocar el índice de Git ni el historial.

Pasos aplicados:

```bash
# 1. Inicializar sparse-checkout en modo no-cone (permite patrones tipo gitignore)
git sparse-checkout init --no-cone
```

```bash
# 2. Definir el patrón: incluir todo, excluir sencha.downloads
# (se hizo editando directamente el archivo, porque Git Bash/MINGW64
# rompe el path al pasarlo como argumento por consola)
notepad .git/info/sparse-checkout
```

Contenido final de `.git/info/sparse-checkout`:

```
/*
!/sencha.downloads
```

```bash
# 3. Aplicar los cambios al working tree
git sparse-checkout reapply
```

Resultado: la carpeta `sencha.downloads/` desapareció físicamente del disco.
`git status` confirma que no hay nada pendiente de commit y que la rama sigue
sincronizada con `origin/master` — es decir, el cambio es 100% local.

## Por qué funciona

- `sparse-checkout` le dice a Git qué parte del árbol de archivos "materializar"
  en el disco, pero el objeto sigue existiendo en el repositorio (`.git/`) tal
  cual está en el remoto.
- No se generó ningún commit de eliminación, por lo tanto no hay nada que
  pushear ni riesgo de romper el repo para otros colaboradores.
- Es un ajuste que vive únicamente en la configuración local de este clone
  (`.git/info/sparse-checkout`), no se comparte ni se sube al remoto.

## Cómo revertirlo

Si en algún momento se necesita la carpeta de vuelta en el disco:

```bash
git sparse-checkout disable
```

Esto restaura el checkout completo (incluyendo `sencha.downloads/`) sin
necesidad de volver a clonar el repositorio.

También se puede verificar el estado del sparse-checkout en cualquier momento con:

```bash
git sparse-checkout list
```

## Nota importante

Esta solución **no reduce el peso real del repositorio** (`.git/`), porque los
objetos de `sencha.downloads` siguen versionados en el historial para todo el
equipo. Solo evita que ocupen espacio en el working tree de este clon local.

Si el objetivo a futuro es que esos archivos dejen de pesar en el repo para
todos (no solo localmente), sería necesario:
1. Agregar `sencha.downloads/` a `.gitignore` para que no se vuelva a trackear.
2. Opcionalmente, reescribir el historial con una herramienta como
   `git filter-repo` para eliminar los objetos ya versionados — esto reescribe
   el historial y debe coordinarse con todo el equipo antes de hacerlo.
