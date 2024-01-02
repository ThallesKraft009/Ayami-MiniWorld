const { Schema, model } = require("mongoose");

const msg = new Schema({
  msgID: { type: String },
  msg_bot_id: { type: String },
  reactions: { type: Number, default: 0 },
  estrutura: { type: Array }
})

module.exports = model("Mw-Messages-Estrelas", msg);