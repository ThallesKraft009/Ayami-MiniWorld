import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'
import { Profile } from "../../../functions/profileImage.mjs";
import Collector from '../../../functions/collector.js';

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

    let msg = Profile(user, message, userdb, false)

    let data = []
        
    
    Collector(async function(i){
      if (i.isStringSelectMenu()){
        if (i.customId === "mapas"){
          if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

        if (true) return i.reply({content:"ainda não está disponível...", ephemeral: true})

          let value = i.values[0];

          if (value === "0"){
            client.MapaBuilder.newMap(msg, false, user.id, userdb.uid)
          }
        }
      }
    })
  },
};
