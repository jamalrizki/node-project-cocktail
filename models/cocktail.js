const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cocktailSchema = new Schema({
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

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;