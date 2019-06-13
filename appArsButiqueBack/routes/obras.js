var express = require('express');
var router = express.Router();
var obrasModule = require('../models/obras');

/* http://localhost:3000/usuarios */
router.get('/', (req, res) => {
    res.send('entra')
});


router.get('/all', (req, res) => {
    obrasModule.getAllObras().then((rows) => {
        res.json(rows)
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/:idObra', (req, res) => {
    obrasModule.getObraById(req.params.idObra).then((rows) => {
        res.json({
            usuario: rows[0]
        })
    }).catch((err) => {
        res.json({
            error: err
        })
    })
});

router.post('/new', (req, res) => {
    obrasModule.insertObra(req.body).then(result => {
        res.json(result);
    }).catch(err => {
        res.json({
            error: err
        })
    })
});

router.post('/edit', (req, res) => {
    obrasModule.editObra(req.body).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({
            error: err
        })
    })
})

module.exports = router;