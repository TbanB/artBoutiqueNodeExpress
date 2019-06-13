let express = require('express');
let router = express.Router();

let usuariosApiRouter = require('./api/usuarios');
let obrasRouter = require('./api/obras');

router.use('/usuarios', usuariosApiRouter);
router.use('/obras', obrasRouter);

module.exports = router;