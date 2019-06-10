const db = require('../db');


let getAll = () => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

let getById = (idUsuario) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM usuario WHERE id_usuario= ?', [idUsuario], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })

}

module.exports = {
    getAll: getAll,
    getById: getById
}