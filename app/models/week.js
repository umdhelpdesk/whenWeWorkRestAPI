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
        shifts: [ShiftSchema.schema]

    },
    tuesday: {
        index: {
            type: Number,
            default: 3
        },
        shifts: [ShiftSchema.schema]
    },
    wednesday: {
        index: {
            type: Number,
            default: 4
        },
        shifts: [ShiftSchema.schema]
    },
    thursday: {
        index: {
            type: Number,
            default: 5
        },
        shifts: [ShiftSchema.schema]

    },
    friday: {
        index: {
            type: Number,
            default: 6
        },
        shifts: [ShiftSchema.schema]
    },
    saturday: {
        index: {
            type: Number,
            default: 7
        },
        shifts: [ShiftSchema.schema]
    }

});
module.exports = mongoose.model('Week', WeekSchema);
