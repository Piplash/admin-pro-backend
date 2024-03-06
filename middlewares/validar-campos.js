const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (request, response = response, next) => {
    const errores = validationResult( request );

    if(!errores.isEmpty()){
        return response.status(400).json({
            ok: false,
            msg: errores.mapped()
        })
    }

    next();
} 

module.exports = {
    validarCampos
}