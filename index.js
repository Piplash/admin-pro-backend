//Importaciones
require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

//Base de datos
dbConnection(process.env.DB_CNN);

//Declaraciones
const puerto = process.env.PORT;

//Rutas
app.get('/', (request, response) =>{
    let respuesta = { ok: true, msg: 'Hola Mundo' }
    response.json(respuesta);
});

//Correr el servidor
app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto ' + puerto)
});