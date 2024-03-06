const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt.helper');

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

module.exports = {
    login
}