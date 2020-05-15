Bienvenidos a Delilah Resto!

Para comenzar la experiencia Delilah, es necesario tener instaladas las siguientes cosas NodeJs, XAMPP, Postman.

Una vez tengamos descargado todo, utilizaremos la consola para instalar las dependecias, dentro de la carpeta en donde se encuentre el package.json pondremos

>> npm install

con lo cual nos traera las dependencias que necesitamos para correr el proyecto.-

una vez tengamos instaladas todas las dependecias, vamos a la carpeta app/db donde encontraremos el archivo db.js ahi podremos setear nuestra ruta de XAMPP,
luego ingresaremos a localhost/phpmyadmin donde importaremos el archivo DelilahResto.sql donde estan las tablas para poder correr la API, por otro lado si quereremos utilizar nuestra propia DB, tenemos el archivo querys.sql donde se encuentran las querys necesarias para crear las litas a las cual apuntan los endpoints.

Los endpoints son los siguientes:

/register > En este endpoint podremos registrar nuevos usuarios, por defectos los nuevos usuarios ingresan como usuarios sin privilegios.
/login > Aqui se verificara si el usuario es admin o no, y se devolvera un token con dichas credenciales
/products > En este endpoint se podran crear, actualizar, buscar o eliminar productos, esta ultima solo sera accesible con credenciales de administrador
/orders > Por ultimo pero no menos importante tenemos el endpoint de orders, en este se podran cargar, actualizar o buscar diferentes ordenes que hayan creado nuestros usuarios

Para utilizar los endpoints podemos importarlos a Postman mediante el archivo llamado DelilahResto.postman_collection.json, el cual tiene algunos ejemplos de que habría que enviar

El proceso para utilizar la base de datos sería, primero registrar un usuario nuevo, luego conectarse para obtener el token (no olvidarse que es importante aclarar si el usuario es administrador o no), luego vamos a crear un producto, lo cual solo se puede realizar como administrador para después finalmente crear una nueva orden.

