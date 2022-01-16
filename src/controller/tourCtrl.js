const tourDAO = require('../model/tourDAO');

const testing = async (req, res) => {
    const data = await tourDAO.test();
    console.log(data);
    res.send("asd");
}

const getTourData = async (req, res) => {
    let parameters = {
        t_name: req.body.t_name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        addr: req.body.addr,
        wheelchair: req.body.wheelchair,
        dog: req.body.dog,
        guide: req.body.guide,
        stroller: req.body.stroller,
        nursing_room: req.body.nursing_room,
        type: req.body.type,
        summary: req.body.summary,
        firstimage: req.body.firstimage,
        contentid: req.body.contentid,
        views: req.body.views
    }

    await tourDAO.insert_info(parameters)
        .catch((err) => {
            console.log("asd", err);
            throw err;
        })

    res.sendStatus(200);
}

const getCityData = (req, res) => {
    let parameters = {
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }
    res.sendStatus(200);

    tourDAO.insert_city(parameters)
        .then((db_data) => {
            console.log(db_data);
        })
        .catch((err) => {
            throw err;
        })
}

const getNearCity = async (req, res) => {
    let data = req.body.data;
    const age = ["ten", "twenty", "thirty", "forty", "fifty", "sixty"];
    let isAge = [];

    let parameters = {
        latitude: data.lat,
        longitude: data.lng,
        distance: data.dist
    }

    let result = [];

    const nearCity = await tourDAO.get_near_city(parameters)
    for (let i in nearCity) {
        let getTour = await tourDAO.get_city_tour(nearCity[i].city)
        getTour.forEach(data => {
            result.push(data);
        })
    }

    let condi = {
        isDog: data.isDog,
        isBlind: data.isBlind,
        isNursing_room: data.isNursing_room,
        isStroller: data.isStroller,
        isHandi: data.isHandi
    }

    let condition = [];

    if (condi.isDog == 1) condition.push("dog");
    if (condi.isBlind == 1) condition.push("guide");
    if (condi.isStroller == 1) condition.push("stroller");
    if (condi.isNursing_room == 1) condition.push("nursing_room");
    if (condi.isHandi == 1) condition.push("wheelchair");

    let b = [];
    result.forEach(asd => {
        let con = [];
        for (let i in condition) {
            con[i] = condition[i];
        }
        if (a(asd, con) != undefined)
            b.push(a(asd, con));
    })

    age.forEach(asd => {
        if (data[asd] == 1) {
            isAge.push(asd);
        }
    })

    const getP = await getPrefer(isAge);

    let sortData = getP.sort((a, b) => {
        return b.value - a.value;
    })

    let slice = sortData.slice(0, 4);

    let resp = [];

    for (let i = 0; i < 4; i++) {
        let cnt = 0;
        for (let j = 0; j < b.length; j++) {
            if (b[j]['type'] == slice[i]['mCAT'] && cnt < 4) {
                resp.push(b[j]);
                cnt++;
            } else {
                continue;
            }
        }
    }

    res.status(200).send({ "data": resp });
}

function a(data, conn) {
    if (conn.length == 0) return data;
    else {
        if (data[conn[0]] == 1) {
            conn.shift();
            return a(data, conn);
        }
        return;
    }
}

async function getPrefer(parameters) {
    // let age = req.body.age;  // [ 'ten', 'twenty' ]
    let age = parameters;
    // console.log(age);

    const data = await tourDAO.get_prefer();
    //--------------------------------------------
    //영재1
    //[ {mCat:관광자원, value: ~}]
    // const result = data.map(item => {
    //     let sum = 0;
    //     age.forEach(val=> {
    //         sum += item[val];
    //     });
    //     return {
    //         mCat: item.mCAT,
    //         value: sum
    //     }
    // });
    // console.log(result);
    //영재 2
    // const result = data.map(item => {
    //     return {
    //         mCat: item.mCAT,
    //         value: age.reduce((a, b)=>{ return item[a] + item[b] })
    //     }
    // });
    // console.log(result);
    //-------------------------------------------------
    let result = [];

    age.forEach(function (item) {
        data.forEach((el) => {
            let output = {}
            output.mCAT = el['mCAT'];
            output.value = el[item];
            result.push(output);
        })
    })

    let resultArr = [];

    for (let i = 0; i < result.length; i++) {
        let idx = getKeyIndex(resultArr, result[i]);
        if (idx > -1) {
            resultArr[idx].value += result[i].value
        } else {
            resultArr.push(result[i])
        }
    }

    return resultArr;
}

function getKeyIndex(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].mCAT === obj.mCAT) {
            return i;
        }
    }
    return -1;
}

const getBestFive = (req, res) => {
    tourDAO.get_best_five()
        .then((db_data) => {
            console.log(db_data);
            res.send(db_data);
        })
        .catch((err) => {
            throw err;
        })
}

const tourWithBaby = async (req, res) => {
    let data = req.body.data;
    let select = req.params;
    let condi;

    let parameters = {
        latitude: data.lat,
        longitude: data.lng,
        distance: 50
    }

    if (select.select == 'baby') {
        condi = "(stroller = 1 || nursing_room = 1)";
        let result = [];

        const nearCity = await tourDAO.get_near_city(parameters)
        for (let i in nearCity) {
            let data = {
                city: nearCity[i].city,
                condition: condi
            }
            let getTour = await tourDAO.tour_with(data);
            getTour.forEach(data => {
                result.push(data);
            })
        }
        res.status(200).send({"data" : result});
    } else if (select.select == 'dog') {
        condi = "dog = 1"
        let result = [];

        const nearCity = await tourDAO.get_near_city(parameters)
        for (let i in nearCity) {
            let data = {
                city: nearCity[i].city,
                condition: condi
            }
            let getTour = await tourDAO.tour_with(data);
            getTour.forEach(data => {
                result.push(data);
            })
        }
        res.status(200).send({"data": result});
    } else if (select.select == 'old') {
        const age = await tourDAO.get_prefer();
        let result = [];

        const nearCity = await tourDAO.get_near_city(parameters)
        for (let i in nearCity) {
            let getTour = await tourDAO.get_city_tour(nearCity[i].city)
            getTour.forEach(data => {
                result.push(data);
            })
        }

        let sixty = [];
        age.forEach((el) => {
            let output = {}
            output.mCAT = el['mCAT'];
            output.value = el['sixty'];
            sixty.push(output);
        })

        let sortAge = sixty.sort((a, b) => {
            return b.value - a.value;
        })

        let slice = sortAge.slice(0, 4);

        let resp = [];

        for (let i = 0; i < slice.length; i++) {
            let cnt = 0;
            for (let j = 0; j < result.length; j++) {
                if (result[j]['type'] == slice[i]['mCAT'] && cnt < 4) {
                    resp.push(result[j]);
                    cnt++;
                } else {
                    continue;
                }
            }
        }
        res.status(200).send({"data":resp});
    }
}

const picnic = async (req, res) => {
    let data = req.body.data;

    let parameters = {
        latitude: data.lat,
        longitude: data.lng,
        distance: 20
    }
    let result = [];
    const nearCity = await tourDAO.get_near_city(parameters)
    for (let i in nearCity) {
        let data = nearCity[i].city
        let getTour = await tourDAO.get_city_tour(data);

        getTour.forEach(data => {
            result.push(data);
        })
    }

    result.sort(function(a, b) { // 내림차순
        return b.views - a.views;
    });

    let best_five = []

    for(i = 0; i < 5; i++) {
        best_five.push(result[i]);
    }

    res.status(200).send({"data" : best_five});
}

module.exports = {
    getTourData,
    getCityData,
    getNearCity,
    getBestFive,
    getPrefer,
    tourWithBaby,
    testing,
    picnic
}