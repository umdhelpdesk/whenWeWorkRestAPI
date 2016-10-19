var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({

});


var ShiftSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    startTime: {
        type: Date
    },

    endTime: {
        type: Date
    },

    Day: Number
});

//var daySchema = new Schema({
//        number:Number,
//        shifts:[ShiftSchema]
//});

var ScheduleSchema = new Schema({

    sunday: {
        index: {
            type: Number,
            default: 1
        },
        shifts: [ShiftSchema]
    },
    monday: {
        index: {
            type: Number,
            default: 2
        },
        shifts: [ShiftSchema]
    },
    tuesday: {
        index: {
            type: Number,
            default: 3
        },
        shifts: [ShiftSchema]
    },
    wednesday: {
        index: {
            type: Number,
            default: 4
        },
        shifts: [ShiftSchema]
    },
    thursday: {
        index: {
            type: Number,
            default: 5
        },
        shifts: [ShiftSchema]
    },
    friday: {
        index: {
            type: Number,
            default: 6
        },
        shifts: [ShiftSchema]
    },
    saturday: {
        index: {
            type: Number,
            default: 7
        },
        shifts: [ShiftSchema]
    }

});


module.exports = mongoose.model('Shift', ShiftSchema);
module.exports = mongoose.model('Schedule',ScheduleSchema);
