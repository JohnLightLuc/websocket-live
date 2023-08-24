const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
var cookieSession = require('cookie-session');
const logger = require("morgan");
var indexRouter = require('./routers/index');




require("dotenv").config();


// init the node js server
const app = express();
// const app = connect();

// app.use(cors(corsOptions));
app.use(cors());

// pass data on post url
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// anable proxy on the server for cookie storage
app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'session',
    keys: ['carpooling', 'wetrajet', 'position']
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    next();
});

// debug error in the server
app.use(logger("dev"));

// app.use("", express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(express.json());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;