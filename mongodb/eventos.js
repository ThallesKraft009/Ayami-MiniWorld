const { Schema, model } = require('mongoose');

const data = new Schema({
  festasJuninas_2024: {

    topo: { type: String }
    
  }
});

module.exports = model('Mw-Eventos', data);