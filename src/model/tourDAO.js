const db = require('../config/dbConn');

const test = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM map WHERE city LIKE '%서울%' `, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const insert_info = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO tourist_dest SET ?`, parameters, (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const insert_city = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO map SET ?`, parameters, (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve("완료");
            }
        })
    })
}

const get_near_city = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT *,
        (6371*acos(cos(radians('${parameters.latitude}'))*cos(radians(latitude))*cos(radians(longitude)-radians('${parameters.longitude}'))+sin(radians('${parameters.latitude}'))*sin(radians(latitude)))) 
        AS distance 
        FROM map 
        HAVING distance < '${parameters.distance}'
        order by distance DESC;`, (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const get_city_tour = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT t_name, addr, type, wheelchair, dog, guide, stroller, nursing_room, latitude, longitude, firstimage, views FROM tourist_dest WHERE addr LIKE ?`, '%' + parameters + '%', (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const get_best_five = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM tourist_dest ORDER BY views DESC LIMIT 5`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const get_prefer = () => {    
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM preference`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        }) 
    })
}

const tour_with = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT t_name, addr, type, wheelchair, dog, guide, stroller, nursing_room, latitude, longitude, firstimage, views FROM tourist_dest WHERE addr LIKE ? AND ${parameters.condition} ORDER BY views DESC LIMIT 10`, '%' + parameters.city + '%', (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    insert_info,
    insert_city,
    get_near_city,
    get_city_tour,
    get_best_five,
    get_prefer,
    tour_with,
    test
}
