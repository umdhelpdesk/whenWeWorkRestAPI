var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database'); // get db config file
var User = require('./app/models/user'); // get the mongoose model
var Shift = require('./app/models/schedule');
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');
var SchedFunctions = require('./app/functions/scheduleFun.js');
// get our request parameters
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


// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();
var acc = require('./routes/accountRoutes')(apiRoutes);



//Schedule routes current*********************************************************************************
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

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

// connect the api routes under /api/*
app.use('/api', apiRoutes);

// Start the server
app.listen(port);
console.log('server running at : http://localhost:' + port);
