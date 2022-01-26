const { Router } = require('express');
const { productosGet, productosGetByName } = require('../controllers/products');
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT
], productosGet)

router.get('/:name', [
    validarJWT
], productosGetByName)

module.exports = router;