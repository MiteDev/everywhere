const festiDAO = require('../model/festiDAO');
const moment = require('moment');

const insertFesti = async (req, res) => {
    let parameters = {
        f_name: req.body.f_name,
        addr: req.body.addr,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        firstimage: req.body.firstimage,
        start: req.body.start,
        end: req.body.end,
        views: req.body.views
    }
    
    await festiDAO.festi_insert(parameters)
        .catch((err) => {
            console.log("asd", err);
            throw err;
        })

    console.log(parameters);

    res.sendStatus(200);
}

const getFesti = async (req, res) => {
    const time = moment();
    const timeformat = time.format('YYYY-MM-DD');
    const data = await festiDAO.get_festi(timeformat);
    res.status(200).send({"data": data});
}

module.exports = {
    insertFesti,
    getFesti
}