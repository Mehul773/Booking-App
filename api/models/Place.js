const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner : {type:mongoose.Schema.Types.ObjectId,ref : 'User'},
    title : String,
    address : String,
    photoes : [String],
    descreption : String,
    perks : [String],
    extraInfo : String,
    checkIn : Number,
    checkOut : Number,
})

const PlaceModel = mongoose.model('Place',placeSchema) 

module.exports = PlaceModel;