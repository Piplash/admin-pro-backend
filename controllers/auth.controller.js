const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt.helper');
const { googleVerify } = require('../helpers/google-verify');

const login = async (request, response = response) => {

    const { email, password } = request.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        //Verifica usuario
        if ( !usuarioDB ){
            return response.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña inválidos'
            });
        }

        //Veririca password
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );

        if( !validPassword ){
            return response.status(400).json({
                ok: false,
                msg: 'usuario o Contraseña inválidos'
            })
        }

        //Generar token
        const token = await generarJWT( usuarioDB.id );

        response.json({
            ok: true,
            msg: token
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (request, response = response) => {

    try {

        const { email, name, picture } = await googleVerify( request.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if( !usuarioDB ){
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar usuario
        await usuario.save();

        //Generar token
        const token = await generarJWT( usuario.id );

        response.json({
            ok: true,
            email, name, picture, token
        });

    } catch(error) {
        console.log(error);
        response.status(400).json({
            ok: false,
            msg: 'Token de google inválido'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}