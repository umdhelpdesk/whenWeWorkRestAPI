var mongoose = require('mongoose');
var ShiftSchema = require('./shift.js');
var WeekSchema = require('./week.js')
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
      name:{
          type:String,
          required: true,
          unique: true
      },
      availability:{
           type:[WeekSchema.Week]
      }
      //work: WeekSchema.Week
});


module.exports =  mongoose.model('Schedule', scheduleSchema);


