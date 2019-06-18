const db = require('../db');


let getAll = () => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM usuarios ORDER BY RAND()', (err, rows) => {
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
        db.get().query('INSERT INTO usuarios (nombre, apellidos, alias, email, password, pais, imagen_perfil, descripcion) VALUES(?,?,?,?,?,?,?,?)', [values.nombre, values.apellidos, values.alias, values.email, values.password, values.pais, values.imagen_perfil, values.descripcion], (err, result) => {
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
        db.get().query('UPDATE usuarios SET `nombre`= ?,`apellidos`= ?,`alias`= ?,`email`= ?,`password`= ?,`pais`= ?,`imagen_perfil`= ?,`descripcion`= ? WHERE id_usuario= ?', [values.nombre, values.apellidos, values.alias, values.email, values.password, values.pais, values.imagen_perfil, values.descripcion, values.id_usuario], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

let getUsuarioByMail = (email) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM usuarios WHERE email=?', [email], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows)
            }
        })
    })
}


let deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get().query('DELETE FROM `usuarios` WHERE `usuarios`.`id_usuario` =  ?', [id], (err, rows) => {
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
    getById: getById,
    insertUsuario: insertUsuario,
    editUsuario: editUsuario,
    getUsuarioByMail: getUsuarioByMail,
    deleteUserById: deleteUserById
}