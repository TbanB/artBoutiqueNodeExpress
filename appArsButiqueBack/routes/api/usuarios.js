let express = require('express');
let router = express.Router();
let usuariosModel = require('../../models/usuarios');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jwt-simple');

const config = require('../../config')

//localhost:3000/api/usuarios/:idUsuario
router.get('/:idUsuario', (req, res) => {
    usuariosModel.getById(req.params.idUsuario).then((rows) => {
        res.json({
            usuario: rows[0]
        })
    }).catch((err) => {
        res.json({
            error: err
        })
    })
});

// REGISTRO DE NUEVO USUARIO, LOGIN Y CREACIÓN DEL TOKEN //
router.post('/registro', (req, res) => {
    let passwordEnc = bcrypt.hashSync(req.body.password, 10);
    req.body.password = passwordEnc;
    usuariosModel.insertUsuario(req.body).then((rows) => {
        res.json(rows)
    }).catch((err) => {
        res.json(err)
    })
})

router.post('/login', async (req, res) => {
    let rows = await usuariosModel.getUsuarioByMail(req.body.email);
    if (rows.length != 1) {
        console.log({
            error: 'Usuario y/o contraseña erroneos'
        });

        res.json({
            token: 'ERROR'
        })

    } else {
        console.log(req.body);
        console.log(rows[0]);

        let iguales = bcrypt.compareSync(req.body.password, rows[0].password);
        console.log(rows)
        if (iguales) {
            res.json({
                token: crearToken(rows[0]),
                idUsuario: rows[0].id_usuario
            })
        } else {
            console.log({
                error: 'Se ha producido un error al intentar crear el TOKEN'
            })
        }
    }
});

let crearToken = (usuario) => {
    let payload = {
        user: usuario.id,
        create: moment().unix(),
        expire: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, config.SECRET_KEY)
}
////////////////

router.get('/', (req, res) => {
    usuariosModel.getAll().then((rows) =>
        res.json(rows)
    ).catch((err) =>
        ({
            error: err
        }))
});

router.get('/:idUsuario', (req, res) => {
    usuariosModel.getById(req.params.idUsuario).then((rows) => {
        res.json({
            usuario: rows[0]
        })
    }).catch((err) => {
        res.json({
            error: err
        })
    })
});



// router.use((req, res, next) => {
//     console.log(req.headers);
//     // con lo siguiente comprobaremos si existe o no el token
//     if (!req.headers.token) {
//         return res.json({
//             error: 'tienes que incluir la cabecera token'
//         })
//     }

//     let payload = jwt.decode(req.headers.token, config.SECRET_KEY);
//     // compruebo si el token ya ha expirado
//     if (moment().unix() > payload.expire) {
//         return res.json({
//             error: 'el token ha expirado'
//         })
//     }

//     next();
// })

router.put('/', (req, res) => {
    usuariosModel.editUsuario(req.body).then((rows) => {
        res.json(rows)
    }).catch((err) => {
        res.json(err)
    })
});

router.post('/delete/:idUsuario', (req, res) => {
    usuariosModel.deleteUserById(req.params.idUsuario).then((rows) => {
        console.log(rows)
        res.json(rows)
    }).catch((err) => {
        res.json(err)
    })
})





module.exports = router;