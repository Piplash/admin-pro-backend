const path =  require('path');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const actualizarImagen = require("../helpers/actualizar-imagen");

const fileUpload = ( request, response = response ) => {

    const coleccion = request.params.coleccion;
    const id        = request.params.id;

    const coleccionesPermitidas = ['hospitales', 'medicos', 'usuarios'];

    //Valida que exista el archivo a subir
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send({ ok: false, msg: 'No hay archivos para subir.'});
    }

    //Valida que la tabla sea correcta
    if( !coleccionesPermitidas.includes(coleccion) ){
        return response.status(400).json({ ok: false, msg: coleccion + ' no es una colección permitida' });
    }

    const file = request.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    //Validación extensión
    if( !extensionesValidas.includes(extensionArchivo) ){
        return response.status(400).json({ ok: false, msg: 'La extensión ' + extensionArchivo + ' no es válida'});
    }

    //Generar nombre archivo
    const nombreArchivo = `${ uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${coleccion}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err){
            return response.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        actualizarImagen(coleccion, id, nombreArchivo);
        
        response.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const obtenerImagen = ( request, response ) => {
    const coleccion = request.params.coleccion;
    const imagen    = request.params.img;

    const pathImg = path.join( __dirname, `../uploads/${coleccion}/${imagen}`);

    response.sendFile(pathImg);

}

module.exports = {
    fileUpload, obtenerImagen
}