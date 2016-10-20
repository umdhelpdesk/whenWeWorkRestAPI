var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShiftSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    Day: Number
});

module.exports = mongoose.model('Shift', ShiftSchema);
