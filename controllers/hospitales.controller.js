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

const actualizarHospital = async ( request, response = response ) =>{

    
    const idHospital = request.params.id;
    const cambios = request.body;

    try {

        const hospital = await Hospital.findById(idHospital);
        hospital.nombre = cambios.nombre;
        hospital.save();

        response.json({
            ok: true,
            msg: 'Hospital Actualizado',
            hospital
        });
        
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Fallo al actualizar el hospital'
        });
    }
    
}

const borrarHospital = async ( request, response = response ) =>{

    const idHospital = request.params.id;

    try {

        const hospital = await Hospital.findById(idHospital);
        hospital.vigente = false;

        hospital.save();

        response.json({
            ok: true,
            msg: 'Hospital eliminado con éxito',
            hospital
        })
        
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error al borrar el hospital'
        })
    }
    
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}