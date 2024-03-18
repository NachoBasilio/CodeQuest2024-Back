# Backend para Sistema de Sorteos

Este backend está diseñado para un sistema de sorteos que verifica si un usuario está o no en un servidor de Discord.

## Configuración

Para configurar el entorno de la aplicación, necesitarás establecer las siguientes variables de entorno:

```env
CHANNEL_ID=1130900724499365958
CLIENT_ID=
CLIENT_SECRET=
TOKEN=
PORT=
JWT_SECRET=
```
## Instalación

Clona este repositorio en tu máquina local.
Navega hasta el directorio del proyecto.
Instala las dependencias con npm install.
Configura las variables de entorno como se describió anteriormente.
Inicia el servidor con npm start.
Ahora deberías tener el servidor corriendo en http://localhost:(Puerto que indiques).

## Uso


El backend expone las siguientes rutas:

GET /api/raffles: Obtiene todos los sorteos.
POST /api/raffles: Crea un nuevo sorteo.
DELETE /api/raffles/:idRaffle: Elimina un sorteo por su ID.
GET /api/raffles/:idRaffle: Obtiene un sorteo por su ID.
PUT /api/raffles/:idRaffle: Actualiza un sorteo por su ID.
POST /api/raffles/:idRaffle/participants: Agrega un participante a un sorteo.
DELETE /api/raffles/:idRaffle/participants/:participantId: Elimina un participante de un sorteo.
Además, el backend proporciona una ruta para autenticar con Discord:

GET /api/auth/discord/redirect/:id: Autentica a un usuario con Discord y redirige a /user.html.