const db = require('../config/dbConn');

const insert_pension = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO pension SET ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const recommend_pension = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM pension WHERE addr LIKE ? `, '%' + parameters + '%', (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    insert_pension,
    recommend_pension
}