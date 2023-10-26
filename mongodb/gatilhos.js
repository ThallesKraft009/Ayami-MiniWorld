import { Schema, model } from 'mongoose'

const GUILD = new Schema({
  
  guild: { type: String },
  sistema: { type: Array, default: [] },
  gatilhos: { type: Array, default: [] }
  
             
});


export const db = model("Mw-Guild", GUILD);