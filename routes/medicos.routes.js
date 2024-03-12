const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.controller');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/', 
            [
                validarJWT,
                check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
                check('hospital', 'ID Hospital no válido').isMongoId(),
                validarCampos
            ],
            crearMedico);

router.put('/:id',
            [
                
            ], 
            actualizarMedico);

router.put('/eliminar/:id', borrarMedico);


module.exports = router;