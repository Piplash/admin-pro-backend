const fs = require('fs');

const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const actualizarImagen = async (coleccion, id, nombreArchivo) =>{

    switch( coleccion ){
        case 'medicos':
            const medico = await Medico.findById(id);

            if( !medico ){
                return false;
            }

            borrarImagen(coleccion, medico.img);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if( !hospital ){
                return false;
            }

            borrarImagen(coleccion, hospital.img);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            
            if( !usuario ){
                return false;
            }

            borrarImagen(coleccion, usuario.img);

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;
    }
}

const borrarImagen = ( coleccion, archivo ) => {
    const pathViejo = `./uploads/${coleccion}/${ archivo }`;

    if( fs.existsSync( pathViejo )){
        fs.unlinkSync( pathViejo );
    }
}

module.exports = actualizarImagen;