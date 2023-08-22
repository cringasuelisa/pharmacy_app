const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const comandaSchema = new Schema({
    nume: String,
    prenume: String,
    email: String,
    adresa: String,
    sumaPlata: Number,
    dataComanda: Date

});

const Comanda = model('Comanda', medicamentSchema);

module.exports = Comanda;