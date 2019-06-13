let express = require('express');
let router = express.Router();
let obrasModule = require('../../models/obras')


router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
    obrasModule.insertObra(req.body).then(result => {
        res.json(result);
    }).catch(err => {
        res.json({
            error: err
        })
    })
});

router.put('/', (req, res) => {
    obrasModule.editObra(req.body).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({
            error: err
        })
    })
})


module.exports = router;