import { Schema, model } from "mongoose";

const msg = new Schema({
  msgID: { type: String },
  msg_bot_id: { type: String },
  reactions: { type: Number, default: 0 },
  estrutura: { type: Array }
})

export default model("Mw-Messages-Estrelas", msg);