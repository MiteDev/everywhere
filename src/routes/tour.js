const express = require('express');
const router = express.Router();
// const haversine = require('haversine');
const tourCtrl = require('../controller/tourCtrl');

router.post('/postData', tourCtrl.getTourData);
router.post('/postCity', tourCtrl.getCityData);
router.post('/near-city', tourCtrl.getNearCity);
router.post('/best-five', tourCtrl.getBestFive);
router.post('/prefer', tourCtrl.getPrefer);
router.post('/with/:select', tourCtrl.tourWithBaby);
router.post('/picnic', tourCtrl.picnic);

router.get('/', tourCtrl.testing);


// router.get('/asd', () => {
//     // Latitude(1도) 1Km = 1 / 109.958489129649955 위도, 1km = 약 0.009위도
//     // Longitude(1도) 1Km = 1 / 88.74 경도, 1km = 약 0.011경도 
//     // Latitude(1도) = 110km
//     // Longitude(1도) = 88.74km

//     const start = {
//         latitude: 37.296956844471744,
//         longitude: 126.87304179583603
//     }

//     const end = {
//         latitude: 37.321478,
//         longitude: 126.828954
//     }

//     console.log(haversine(start, end))
//     console.log(haversine(start, end, { unit: 'meter' }) / 1000 + 'km');
// })

module.exports = router;