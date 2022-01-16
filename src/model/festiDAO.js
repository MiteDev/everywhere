const db = require('../config/dbConn');

const festi_insert = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO festival SET ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const get_festi = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM festival WHERE DATE_FORMAT(start, '%Y-%m-%d') >= '${parameters}' ORDER BY start ASC LIMIT 5`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    festi_insert,
    get_festi
}