const db = require('../db');


let getAllObras = () => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM obras ORDER BY RAND()', (err, rows) => {
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
    console.log({
        valoresInsert: values
    })
    return new Promise((resolve, reject) => {
        db.get().query('INSERT INTO obras (nombre, ano_creacion, descripcion, precio, fk_id_autor) VALUES(?,?,?,?,?)', [values.nombre, values.ano_creacion, values.descripcion, values.precio, values.fk_id_autor], (err, result) => {
            if (err) {
                console.log({
                    errorINSERT: err
                })
                reject(err)
            } else {
                console.log("RESULTADO CREACION DE LA OBRA: ", result)
                resolve(result)
            }
        })
    })
}

let insertObraPictures = (values) => {
    console.log({
        key: values,
        value: values
    })
    return new Promise((resolve, reject) => {
        db.get().query("INSERT INTO _ars_boutique_bd.obras_fotos ( `fk_id_obra`, `url_imagenes`) VALUES (?, ?)", [values[0], values[1]], (err, rows) => {
            if (err) {
                console.log('HAY UN ERROR AL INSERTAR LAS FOTOS', err)
                reject(err);
            } else {
                console.log('SE HAN INSERTADO LAS FOTOS!', rows)
                resolve(rows);
            }
        })
    })
}

let editObra = (values) => {
    return new Promise((resolve, reject) => {
        db.get().query('UPDATE `obras` SET `nombre`= ?,`ano_creacion`= ?,`descripcion`= ?,`precio`= ?,`imagen1`= ?,`imagen2`= ?,`imagen3`= ?,`imagen4`= ?,`imagen5`= ? WHERE id_obra= ?', [values.nombre, values.ano_creacion, values.descripcion, values.precio, values.imagen1, values.imagen2, values.imagen3, values.imagen4, values.imagen5, values.idObra], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

let searchbarFinder = (values) => {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM _ars_boutique_bd.obras, _ars_boutique_bd.usuarios WHERE (usuarios.nombre LIKE '%?%') OR (usuarios.apellidos LIKE '%?%') OR (usuarios.descripcion LIKE '%?%') OR (usuarios.alias LIKE '%?%') OR (obras.nombre LIKE '%?%') OR (obras.descripcion LIKE '%?%') OR (obras.etiquetas LIKE '%?%')", [values], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

let obrasCreadorById = (fk_id_autor) => {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM obras WHERE obras.fk_id_autor = ?;", [fk_id_autor], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows)
            }
        })
    })
}

let getObraPictures = (id_obra) => {
    console.log('ESTE ES EL MODEL', id_obra)
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM _ars_boutique_bd.obras_fotos WHERE obras_fotos.fk_id_obra = ?;", [id_obra], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows)
                resolve(rows)
            }
        })
    })
}


module.exports = {
    getAllObras: getAllObras,
    getObraById: getObraById,
    insertObra: insertObra,
    editObra: editObra,
    searchbarFinder: searchbarFinder,
    obrasCreadorById: obrasCreadorById,
    getObraPictures: getObraPictures,
    insertObraPictures: insertObraPictures
}