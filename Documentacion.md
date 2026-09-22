# Los principios S.O.L.I.D

## S-Single Responsibility

Antes de la refactorización, los controladores tenian muchas resposabilidades como pueden ser recibir las peticiones, calcular el salario, capturar los errores y acceder a la base de datos de mongoose.

ahora con la refactorización cada capa tiene una unica resposabilidad:

_Routes_: Define los endpoint y mapealor a los controladores.
_Controllers_: Reciber las peticiones http y delegan la logica al servicio.
_Service_: Aplica las reglas de negocios(Calculo de salario final) y orquesta las operaciones.
_Repository_: Realiza la comunicacion con base de datos mediante mongoose
_Models_: define loe schema de los datos
_ErrorHandle_: Centraliza el manejo de errores en un solo lugar.

## O-Open/Close

No se precento la oportunidad de aplicar OCP explicitamente

## L-Liskov Substitution

No aplica porque no hay jerarquías de herencia en el proyecto.

## I-Interface Segregation

No aplica porque no se definieron interfaces segregadas en el proyecto.

## D-Dependency inversion

El proyecto no aplica DIP estrictamente porque el service instancia el repository directamente. Como mejora pendiente, se podría inyectar por constructor.

# Docker Compose

El archivo `docker-compose.yml` permite definir y ejecutar aplicaciones
formadas por varios contenedores de Docker al mismo tiempo, mediante un
único archivo de configuración en texto plano.

## Servicios configurados

El proyecto define los siguientes servicios:

_imagen_:mongo:8
_Nombre del contenedor_:empleados-mongodb
_Politica de reinicio_:unless-stopped esto indica que el contenedor se reinicia si ocurre alguna falla o si el sistema se reinicia
_Puertos:_ 27017:27017
_Volumen:_ monta el volumen nombrando `mongo_data`en la ruta `/data/db` del contenedor.

- **mongodb:** utiliza la imagen mongo:8, expone el puerto:27017:27017, y monta un volumen para persistir los datos en mongo_data:/data/db.

## Relación con la aplicación

El servicio `mongodb` levanta una instancia de MongoDB dentro de un
contenedor Docker. La aplicación Express se conecta a esa instancia a
través de la variable de entorno `MONGO_URI` definida en el archivo
`.env`, que apunta a `mongodb://localhost:27017/`.

De esta forma, la aplicación no necesita tener MongoDB instalado
directamente en la máquina: Docker se encarga de proveer la base de datos
de forma aislada y reproducible.

## Comando utiles

Iniciar los servicios en segundo plano:

    docker compose up -d

Ver los contenedores activos:

    docker ps

Detener los servicios:

    docker compose down

Detener los servicios y eliminar los volúmenes (borra los datos):

    docker compose down -v
