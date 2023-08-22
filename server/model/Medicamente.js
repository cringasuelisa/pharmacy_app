const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const medicamentSchema = new Schema({
    denumire: String,
    pret: Number,
    stoc: Number,
    descriere: String,
    keywords: String,
    reteta: Boolean,
    image: String
});

const Medicamente = model('Medicamente', medicamentSchema);

module.exports = Medicamente;