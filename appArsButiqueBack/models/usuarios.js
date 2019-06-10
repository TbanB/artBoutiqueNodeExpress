const db = require('../db');


let getAll = () => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM usuarios', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
};

let getById = (idUsuario) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM usuarios WHERE id_usuario= ?', [idUsuario], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
};

let insertUsuario = (values) => {
    return new Promise((resolve, reject) => {
        db.get().query('INSERT INTO usuarios (nombre, apellidos, alias, email, password, pais, imagen_perfil, descripcion_usuario) VALUES(?,?,?,?,?,?,?,?)', [values.nombre, values.apellidos, values.alias, values.email, values.password, values.pais, values.imagen_perfil, values.descripcion_usuario], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

let editUsuario = (values) => {
    return new Promise((resolve, reject) => {
        db.get().query('UPDATE usuarios INTO UPDATE `usuarios` SET `nombre`= ?,`apellidos`= ?,`alias`= ?,`email`= ?,`password`= ?,`pais`= ?,`imagen_perfil`= ?,`descripcion_usuario`= ? WHERE id_usuario= ?', [values.nombre, values.apellidos, values.alias, values.email, values.password, values.pais, values.imagen_perfil, values.descripcion_usuario, values.idUsuario], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    getAll: getAll,
    getById: getById,
    insertUsuario: insertUsuario,
    editUsuario: editUsuario
}