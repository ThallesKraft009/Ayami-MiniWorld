const { Schema, model } = require('mongoose');

const data = new Schema({
  userID: { type: String },
  ativado: { type: Boolean, default: false },
  tempo: { type: Number, default: 0 },
  channelID: { type: String },
  webhook: { type: String }
});

module.exports = model('Mod-Membro-Mw', data);