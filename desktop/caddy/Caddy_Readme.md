# #########################################################################
# ############# Pasos para correr caddy con sencha local ##################
# #########################################################################

- Dominio local: `gcs.softguard.com` (mapeado a `127.0.0.1` por el script).
- Frontend local: `sencha app watch` de la app en `softguard.workspace/apps/<app>`.
- Backend real: se configura mediante `.env`.

# Instalar Caddy

Usando caddy, el dominio de desarrollo es el mismo que espera el backend: `gcs.softguard.com`. Esto permite que sesiones y cookies funcionen correctamente.



- Instalar Chocolatey (PowerShell Admin):
  - `Set-ExecutionPolicy Bypass -Scope Process -Force`
  - `[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12`
  - `iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`
- Instalar dependencias con Chocolatey:
  - `choco install mkcert caddy -y`


# Correr Caddy con sencha
- Correr Caddy
 En la carpeta ./scripts se encuentra el archivo dev-proxy.ps1. 
 Ejecutar desde powershell como administrador el comando: ./dev-proxy.ps1
 Luego de correr ese script verificar con el comando "ping gcs.softguard.com" si responde desde 127.0.0.1, si responde, caddy está OK.
- Correr módulo local de sencha con "sencha app watch"
- En chrome loguearse con usuario de desktop para que quede el token en la cookie. Si se 
ejecutó, por ejemplo, el módulo webremoto con sencha app watch acceder con https://gcs.softguard.com/apps/webremoto/. Todo será redireccionado a la corrida local de sencha.

Nota: deshabilitar el cache de chrome desde herramientas de desarrollo para que los cambios
en los archivos de sencha se reflejen sin tener que borrar los archivos temporales del navegador.
Nota: no usar el launch de VS code.

# Detener Caddy

correr desde Desktop/ el comando: powershell -ExecutionPolicy Bypass -File scripts/dev-proxy.ps1 -Cleanup -EnvFile .env

Enjoy!!!