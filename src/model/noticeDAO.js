const db = require('../config/dbConn');

const show_Notice_List = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT n_seq, title, content, createAt FROM notice ORDER BY n_seq DESC`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const show_one_Notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM notice WHERE n_seq = ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create_Notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO notice SET ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const update_Notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE notice SET title = ?, content = ? WHERE n_seq = ?`, [parameters.title, parameters.content, parameters.n_seq], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const delete_Notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM notice WHERE ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    show_Notice_List,
    show_one_Notice,
    create_Notice,
    update_Notice,
    delete_Notice
}