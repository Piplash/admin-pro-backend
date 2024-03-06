
const jwt = require('jsonwebtoken');

const validarJWT = (request, response, next) =>{

    const token = request.header('x-token');

    if( !token ) {
        return response.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        request.uid = uid;

        next();

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
}

module.exports = {
    validarJWT
}