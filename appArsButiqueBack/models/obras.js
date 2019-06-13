const db = require('../db');


let getAllObras = () => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM obras', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
};

let getObraById = (idObra) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM obras WHERE id_obra= ?', [idObra], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
};

let insertObra = (values) => {
    console.log(values)
    return new Promise((resolve, reject) => {
        db.get().query('INSERT INTO obras (titulo, ano_creacion, descripcion, precio, imagen1, imagen2, imagen3, imagen4, imagen5, fk_id_autor) VALUES(?,?,?,?,?,?,?,?,?,?)', [values.titulo, values.ano_creacion, values.descripcion, values.precio, values.imagen1, values.imagen2, values.imagen3, values.imagen4, values.imagen5, values.fk_id_autor], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

let editObra = (values) => {
    return new Promise((resolve, reject) => {
        db.get().query('UPDATE `obras` SET `titulo`= ?,`ano_creacion`= ?,`descripcion`= ?,`precio`= ?,`imagen1`= ?,`imagen2`= ?,`imagen3`= ?,`imagen4`= ?,`imagen5`= ? WHERE id_obra= ?', [values.titulo, values.ano_creacion, values.descripcion, values.precio, values.imagen1, values.imagen2, values.imagen3, values.imagen4, values.imagen5, values.idObra], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

let searchbarFinder = () => {
    /* NO TENGO NI IDEA DE COMO HACER UNA BUSQUEDA COMPLEJA */
    return new Promise((resolve, reject) => {
        db.get().query('SELECT usuarios.nombre, usuarios.apellidos, usuarios.alias, usuarios.pais FROM `usuarios` WHERE usuarios.nombre LIKE ' % lo % ' OR usuarios.apellidos LIKE ' % lo % '  OR usuarios.alias LIKE ' % lo % ' OR usuarios.pais LIKE ' % lo % ' UNION SELECT obras.title, obras.descripcion FROM `obras` WHERE obras.titulo LIKE ' % lo % ' OR obras.descripcion LIKE ' % lo % ';', [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = {
    getAllObras: getAllObras,
    getObraById: getObraById,
    insertObra: insertObra,
    editObra: editObra
}