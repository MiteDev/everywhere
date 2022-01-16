const db = require('../config/dbConn');

const register = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO user SET ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const login = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user WHERE id = ? && pw = ?`, [parameters.id, parameters.pw], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const deleteUser = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM user WHERE ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);    
            } else {
                resolve(db_data);
            }
        })
    })
}

const userUpdate = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE user SET pw = ? WHERE id = ?`, [parameters.pw, parameters.id], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
} 

const pwCheck = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT pw FROM user WHERE id = ? && pw = ?`, [parameters.id, parameters.pw], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


module.exports = {
    register,
    login,
    deleteUser,
    userUpdate,
    pwCheck
}