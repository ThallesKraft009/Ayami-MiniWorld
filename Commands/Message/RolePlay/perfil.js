import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'
import { Profile } from "../../../functions/profileImage.mjs";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "perfil",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    let user;
    if (!message.mentions.users.first()){
      user = message.author;
    } else {
      user = message.mentions.users.first();
    };

    let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: user.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: user.id })
     }

    let i = Profile(user, message, userdb, false)
    
  },
};
