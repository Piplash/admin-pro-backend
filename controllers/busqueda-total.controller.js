const { response } = require('express');

const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');
const Usuario = require('../models/usuario.model');

const getTodo = async (request, response = response) =>{

    const busqueda = request.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [ hospitales, medicos, usuarios ] = await Promise.all([
        Hospital.find( {nombre: regex} ),
        Medico.find( {nombre: regex} ),
        Usuario.find( {nombre: regex} ),
    ])

    response.json({
        ok: true,
        hospitales,
        medicos,
        usuarios
    });
}

const getPorColeccion = async (request, response = response ) =>{
    const coleccion = request.params.coleccion;
    const busqueda  = request.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let resultado;

    switch ( coleccion ){
        case 'hospitales':
            resultado = await Hospital.find( {nombre: regex} ).populate('usuario', 'nombre img');;
            break;
        case 'usuarios':
            resultado = await Usuario.find( {nombre: regex} );
            break;
        case 'medicos':
            resultado = await Medico.find( {nombre: regex} ).populate('usuario', 'nombre img vigente')
                                                            .populate('hospital', 'nombre img vigente');;
            break;
        default:
            response.status(400).json({
                ok: false,
                msg: 'Las colecciones son hospitales/usuarios/medicos'
            })
    }

    response.json({
        ok: true,
        resultado
    });
}

module.exports = {
    getTodo,
    getPorColeccion
}