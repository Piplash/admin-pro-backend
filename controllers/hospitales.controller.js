const { response } = require('express');

const Hospital = require('../models/hospital.model');
 

const getHospitales = async (request, response = response) =>{

    const hospitales = await Hospital.find( { vigente: true } ).populate('usuario', 'nombre img');

    response.json({
        ok: true,
        msg: hospitales
    });
}

const crearHospital = async( request, response = response ) =>{

    const hospital = new Hospital( request.body );
    const uid = request.uid;
    hospital.usuario = uid;

    try {

        const hospitalDB = await hospital.save();

        response.json({
            ok: true,
            msg: hospitalDB
        });
        
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }

    
}

const actualizarHospital = ( request, response = response ) =>{
    response.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = ( request, response = response ) =>{
    response.json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}