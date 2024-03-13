const { response } = require('express');
const Medico =  require('../models/medico.model')

const getMedicos = async ( request, response = response ) =>{

    // Trae todos los datos
    //const medicos = await Medico.find( { vigente: true} ).populate(['usuario', 'hospital']);

    //Trae algunos datos
    const medicos = await Medico.find( { vigente: true} ).populate('usuario', 'nombre img vigente')
                                                        .populate('hospital', 'nombre img vigente');
    response.json({
        ok: true,
        msg: medicos
    });
}

const crearMedico = async ( request, response = response ) =>{

    const medico = new Medico( request.body );
    const uid = request.uid;
    medico.usuario = uid;

    console.log(medico);

    try {

        const medicoDB = await medico.save();

        response.json({
            ok: true,
            msg: medicoDB
        });
        
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error en la creación de médico'
        });
    }

}

const actualizarMedico = async ( request, response = response ) =>{

    const idMedico = request.params.id;
    const cambios = request.body;

    try {

        const medico = await Medico.findById(idMedico);
        medico.nombre = cambios.nombre;

        medico.save();

        response.json({
            ok: true,
            msg: 'Medico actualizado',
            medico
        });
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error al actualizar el médico'
        });
    }
}

const borrarMedico = async ( request, response = response ) =>{

    const idMedico = request.params.id;

    try {

        const medico = await Medico.findById(idMedico);
        medico.vigente = false;

        medico.save();

        response.json({
            ok: true,
            msg: 'Médico borrado con éxito'
        });
    } catch (error) {
        response.json({
            ok: false,
            msg: 'Error al borrar el médico'
        });
    }
}

module.exports = {
    getMedicos, crearMedico, actualizarMedico, borrarMedico
}