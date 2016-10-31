"use strict";
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/database'); // get db config file
var User = require('../models/user'); // get the mongoose model
var Schedule = require('../models/schedule');
var Shift = require('../models/shift');
var Week = require('../models/week');
var jwt = require('jwt-simple');
//var ObjectID = require("mongodb").ObjectID;

var date = new Date();
var createSchedule = function (newName, start) {
    var week = new Week({

    });
    var schedule = new Schedule({
        name: newName,
    });
    schedule.availability.push(week);

    schedule.save();
}

//createSchedule("DevTest", "start");

var searchDay = function (day, id) {
    var filteredDay = [];

    for (var i = 0; i < day.length; i++) {
        if (id.equals(day[i].owner)) {
            var shift = {
                start: day[i].startTime,
                end: day[i].endTime,
                day: day[i].day
            }
            filteredDay.push(shift);
        }
    }

    return filteredDay;
}
var getAvailability = function (_id, res) {
    var scheduleQuery = Schedule.findOne({
        'name': 'DevTest'
    });

    var resWeek = {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    };
    scheduleQuery.exec(
        function (err, sched) {
            if (err) {
                console.log("sched querry err");
            } else {
                var week = sched.availability[0];

                //if undefined
                //console.log(week);
                for (var key in resWeek) {
                    var id = mongoose.mongo.ObjectId('58032bcfee0e82b857c91f83');
                    resWeek[key] = searchDay(week[key].shifts, id)
                }
                console.log("get Availability");
                //console.log(resWeek);
                res.json(resWeek);

            }
        }
    );
}

//var res = getAvailability(_id, day, res);


var createShift = function (userId, day, start, end) {
    var shift = new Shift({
        day: day,
        owner: userId,
        startTime: start,
        endTime: end
    });

    return shift;
}


var addAvailability = function (body, user_id) {

    var userId = user_id;
    var day = body.day;
    var start = body.start;

    var end = body.end;

    var shift = createShift(userId, day, start, end);
    console.log(shift);

    var scheduleQuery = Schedule.findOne({
        'name': 'DevTest'
    });
    scheduleQuery.exec(
        function (err, sched) {
            if (err) {
                console.log("sched querry err");
            } else {
                //shift.save();
                if (sched.availability.length === 0) {
                    var week = new Week({});
                    sched.availability.push(week);
                }


                if (day == 1) {
                    sched.availability[0].sunday.shifts.push(shift);
                } else if (day == 2) {
                    sched.availability[0].monday.shifts.push(shift);
                } else if (day == 3) {
                    sched.availability[0].tuesday.shifts.push(shift);
                } else if (day == 4) {
                    sched.availability[0].wednesday.shifts.push(shift);
                } else if (day == 5) {
                    sched.availability[0].thursday.shifts.push(shift);
                } else if (day == 6) {
                    sched.availability[0].friday.shifts.push(shift);
                } else if (day == 7) {
                    sched.availability[0].saturday.shifts.push(shift);
                }


                sched.markModified("availability.0"); //This line saved me
                console.log("done");
                sched.save(function (err) {
                    if (err) {
                        console.log("not saving");
                    } else {
                        console.log("success");
                    }
                });
            }
        }
    );

};

module.exports = {
    createSchedule: createSchedule,
    addAvailability: addAvailability,
    getAvailability: getAvailability
};
