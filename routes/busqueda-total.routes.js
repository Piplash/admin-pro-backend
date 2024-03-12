const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTodo, getPorColeccion } = require('../controllers/busqueda-total.controller');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:coleccion/:busqueda', validarJWT, getPorColeccion);

module.exports = router;