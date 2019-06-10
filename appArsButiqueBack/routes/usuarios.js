var express = require('express');
var router = express.Router();
var usuariosModule = require('../models/usuarios');

/* http://localhost:3000/usuarios */
router.get('/', (req, res) => {
    res.send('entra')
})


router.get('/todos', (req, res) => {
    usuariosModule.getAll().then((rows) => {
        res.json(rows)
    }).catch((err) => {
        res.json(err);
    })
})

router.get('/:idUsuario', (req, res) => {
    usuariosModule.getById(req.params.idUsuario).then((rows) => {
        res.json({
            usuario: rows[0]
        })
    }).catch((err) => {
        res.json({
            error: err
        })
    })
})

module.exports = router;