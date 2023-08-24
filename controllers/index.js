const axios = require('axios');


exports.index = function(req, res, next) {
    res.render('index');
};

exports.position = async function(req, res, next) {
    const params = req.params.roomeName;
    let latitude = 5.36252499948608;
    let longitude = -4.0078527016481065;

    res.render('map', { routeName: params, latitude: latitude, longitude: longitude });
};

exports.stop = function(req, res, next) {
    res.render('error', { message: "L'utisateur a arrêté le partage de position." });
};