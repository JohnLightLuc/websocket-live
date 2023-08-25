const axios = require('axios');


exports.index = function(req, res, next) {
    res.render('index');
};

exports.position = async function(req, res, next) {
    const params = req.params.roomeName;
    let latitude = 5.355135316846879;
    let longitude = -4.099451746586401;

    res.render('map', { routeName: params, latitude: latitude, longitude: longitude });
};

exports.stop = function(req, res, next) {
    res.render('error', { message: "L'utisateur a arrêté le partage de position." });
};