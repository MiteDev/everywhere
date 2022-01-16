const pensionDAO = require('../model/pensionDAO');
const mapDAO = require('../model/mapDAO');

const insertPension = async (req, res) => {
    let parameters = {
        firstimage: req.body.firstimage,
        addr: req.body.addr,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        type: req.body.type,
        dog: req.body.dog
    }

    await pensionDAO.insert_pension(parameters)
        .catch((err) => {
            console.log(err);
            throw err;
        })

    res.sendStatus(200);
}

const showPension = async (req, res) => {
    let inputCity = req.body.addr;
    let isDog = req.body.isDog;

    const imsi = await mapDAO.get_map_data()
    const cityData = []; 

    imsi.forEach(data => {
        cityData.push(data.city);
    })

    const found = cityData.find(el => inputCity.includes(el)); 

    const data = await pensionDAO.recommend_pension(found);
    
    let pension = []
    if(isDog == 1) {
        data.forEach(el => {
            if(el.dog == isDog) {
                pension.push(el);
            }
        })
        res.status(200).send({"data": pension});
    } else {
        res.status(200).send({"data": data});
    }
}

module.exports = {
    insertPension,
    showPension
}