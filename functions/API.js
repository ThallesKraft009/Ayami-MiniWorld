import { client } from "../index.js";
const GUILD = "";
import db from "../mongodb/user.js";
import database from "./quickDb.mjs";

let botPing = `${client.ws.ping}ms`;

/*let database = async(userId) => {
  let userdb = await db.findOne({
         userID: userId
     })
      
     if(!userdb){
         const newuser = new db({ userID: userId })
         await newuser.save();
         
         userdb = await db.findOne({ userID: userId })
     }

  return userdb;
}*/


async function getChannel(id){
  return client.channels.cache.get(`${id}`)
};

let API = {
  botPing,
  getChannel,
  database
}


export { API };