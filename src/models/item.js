const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
Name : { type: String ,default: null},
userId : { type: String ,default: null},
Priority : { type: String ,default: 'medium'},
Date : { type: String ,default: new Date()},
Task: { type: String ,required: true},
Workinghours: { type: Number, default: 0 },
}, { timestamps: true });


module.exports = mongoose.model('Item', ItemSchema);