let express = require('express');
let router = express.Router();
let obrasModule = require('../../models/obras')


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
        console.log('COMIENZA PARA METER LAS FOTOS', req.body.url_imagenes.length)
        let imagenes = {};

        imagenes = JSON.stringify(req.body.url_imagenes);


        //console.log('estabannnnnnn', imagenes);
        let values = [result.insertId, imagenes];
        // console.log('variable VALUES para meter en sql', values)
        obrasModule.insertObraPictures(values).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
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

router.get('/:busqueda', (req, res) => {
    obrasModule.searchbarFinder(req.params.busqueda).then(rows => {
        res.json({
            resultados: rows
        })
    }).then(err => {
        res.json(err)
    })
})

router.post('/insertObraPictures', (req, res) => {
    obrasModule.insertObraPictures(req.body).then(rows => {
        res.json({
            resultado: rows
        }).then(err => {
            res.json(err)
        })
    })
})

router.get('/creador/:idCreador', (req, res) => {
    console.log(req.params)
    obrasModule.obrasCreadorById(req.params.idCreador).then(rows => {
        console.log(rows)
        res.json(rows)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/imagenes/:idObra', (req, res) => {
    console.log('POR AQUI ENTRA ---- API', req.params)
    obrasModule.getObraPictures(req.params.idObra).then(rows => {
        console.log(rows);
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
})


module.exports = router;