const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const thingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },  
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true 
});

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;