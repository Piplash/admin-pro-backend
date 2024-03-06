//Importaciones
require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

//Lectura y parseo body
app.use( express.json() );

//Base de datos
dbConnection(process.env.DB_CNN);

//Declaraciones
const puerto = process.env.PORT;

//Rutas
app.use('/api/usuarios' , require('./routes/usuarios.routes'));
app.use('/api/login'    , require('./routes/auth.routes'));


//Correr el servidor
app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto ' + puerto)
});