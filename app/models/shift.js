var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShiftSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    startTime: {
          hrs:Number,
          mins: Number,

    },

    endTime: {
         hrs: Number,
         mins: Number,

    },

    day: Number
});

module.exports = mongoose.model('Shift', ShiftSchema);

