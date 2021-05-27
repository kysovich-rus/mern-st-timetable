const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref:'User'},
    beginDate: {type: Date, required:true},
    endDate: {type: Date, required:true},
    subject: {type: String, required: true},
    about: {type: String},
    location:{type: String},
    teacher: {type: String}
})

module.exports = model('Lesson', schema)