const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
Priority : { type: String ,default: 'medium level'},
Task: { type: String ,required: true},
Workinghours: { type: Number, default: 0 },
}, { timestamps: true });


module.exports = mongoose.model('Item', ItemSchema);