const db = require('../config/dbConn');

const get_map_data = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT city FROM map`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    get_map_data
}