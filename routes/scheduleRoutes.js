var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database'); // get db config file
var User = require('../app/models/user'); // get the mongoose model
var Shift = require('../app/models/schedule');
var jwt = require('jwt-simple');
var SchedFunctions = require('../app/functions/scheduleFun.js');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
    res.header("Access-Control-Allow-Methods", "POST");
    next();
});

module.exports = function (apiRoutes) {

    apiRoutes.options('/addAvailability', cors());
    apiRoutes.post('/addAvailability', passport.authenticate('jwt', {
        session: false
    }), function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                    _id: decoded._id
                }, function (err, user) {
                    if (err) throw err; // To be determined
                    if (!user) {
                        return res.status(403).send({
                            success: false,
                            msg: "User not found. add availability failed"
                        });
                    } else if (req.body) {
                        var body = req.body;
                        var check = body.hasOwnProperty("day") && body.hasOwnProperty("start") && body.hasOwnProperty("end");
                        if (check) {
                            var start = body.start;
                            var end = body.end;
                            //Check if req body has all properties
                            check = end.hasOwnProperty("hrs") && end.hasOwnProperty("mins") && start.hasOwnProperty("hrs") && start.hasOwnProperty("mins");

                            if (check) {
                                //Todo Validate types
                                SchedFunctions.addAvailability(req.body, user._id);
                                return res.status(200).send({
                                    success: true,
                                    msg: "Availability added"
                                });
                            }
                        }

                    }
                    return res.status(403).send({
                        success: false,
                        msg: "Request does not contain all params"
                    });

                }

            )
        }
    });
    apiRoutes.options('/getAvailability', cors());
    apiRoutes.get('/getAvailability', passport.authenticate('jwt', {
        session: false
    }), function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                _id: decoded._id
            }, function (err, user) {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({
                        success: false,
                        msg: 'Authentication failed. User not foun.'
                    });
                } else {
                    SchedFunctions.getAvailability(user._id, res);
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                msg: 'No token provided.'
            });
        }

    });
}
