## Запуск приложения

Перейдите в каталог frontend и запустите:

### `npm i`

То же самое выполните в каталоге backend.

В каталоге backend создайте файл .env и добавте туда указанную
 строку:  

### `MYSQL_ROOT_PASSWORD=password`

Далее запустие команду по созданию сети:

### `docker network create todo-app`

Затем запустите команду:

### `docker run -d --network todo-app --network-alias mysql -v mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=todo mysql:8`

Перейдите в каталог backend и запустите команды:

### `docker build . -t backend`

### `docker run --network todo-app -p 5000:5000 backend`

Перейдите в каталог frontend и запустите команды:

### `docker build . -t frontend`

### `docker run --network todo-app -p 3000:3000 frontend`

Откройте [http://localhost:3000](http://localhost:3000)