var mongoose = require('mongoose');
var ShiftSchema = require('./shift.js')
var Schema = mongoose.Schema;




var WeekSchema = new Schema({

    sunday: {
        index: {
            type: Number,
            default: 1
        },
        shifts: [ShiftSchema.schema]
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
module.exports = mongoose.model('Week', WeekSchema);
