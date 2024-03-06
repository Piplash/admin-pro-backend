const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT, getUsuarios);

router.post('/', 
            [
                check('nombre', 'Nombre es obligatorio').not().isEmpty(),
                check('password', 'Password es obligatoria').not().isEmpty(),
                check('email', 'Email es obligatorio y debe tener el formato adecuado').isEmail(),
                validarCampos,
            ],
            crearUsuario);

router.put('/:id',
            [
                validarJWT,
                check('nombre', 'Nombre es obligatorio').not().isEmpty(),
                check('email', 'Email es obligatorio y debe tener el formato adecuado').isEmail(),
                check('role', 'El rol es obligatorio').not().isEmpty(),
            ], 
            actualizarUsuario);

router.put('/eliminar/:id', validarJWT, borrarUsuario);


module.exports = router;