const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt.helper');


//Obtener Usuarios
const getUsuarios = async (request, response) =>{

    const desde = Number(request.query.desde)  || 0;
    let limit = 5;

    if( desde == 0 ){
        limit = 0
    }

    const [ usuarios, total ] = await Promise.all([
        Usuario.find( { vigente: true }, 'nombre email role google vigente img').skip( desde )
                                                                                .limit( limit ),
        Usuario.countDocuments()
    ])

    response.json({
        ok: true, 
        usuarios,
        total 
    });
}

//Creacr Usuarios
const crearUsuario = async(request, response = response) =>{

    const { email, password, nombre } = request.body;

    try{
        const existeEmail =  await Usuario.findOne({ email })

        if(existeEmail){
            return response.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        const usuario = new Usuario( request.body );

        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt);

        await usuario.save();
        const token = await generarJWT( usuario.id );
        
        response.json({
            ok: true, 
            usuario,
            token
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado - Creacion Usuario'
        })
    }    
}

const actualizarUsuario = async ( request, response = response ) => {
    const uid = request.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        console.log(usuarioDB);

        if( !usuarioDB ){
            return response.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        //Validar token, comprobar si es usuario correcto

        //Update
        const { password, google, ...campos } = request.body;

        if ( usuarioDB.email === request.body.email ){
            console.log("ENTRA EN MAIL")
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({ email: request.body.email });

            if( existeEmail ){
                return response.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });

        response.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado - Update Usuario'
        })
    }
}

const borrarUsuario = async ( request, response ) => {
    const uid = request.params.id;
    console.log(uid)

    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return response.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        const cambios = { vigente: false }
        
        const usuarioEliminado = await Usuario.findByIdAndUpdate( uid, cambios, { new: true} );

        response.json({
            ok: true,
            usuario: usuarioEliminado
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}