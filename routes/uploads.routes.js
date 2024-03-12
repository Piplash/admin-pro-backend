const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { fileUpload, obtenerImagen } = require('../controllers/uploads.controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.use(expressFileUpload());

router.put('/:coleccion/:id', validarJWT, fileUpload);
router.get('/:coleccion/:img', validarJWT, obtenerImagen);

module.exports = router;