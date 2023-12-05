import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "mensagens",
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
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: user.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: user.id })
    }

    
            const rankedUsers = await db.find({
              "msg.total": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "msg.total": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.estrelas === 0) {
           userPosition = rankedUsers.length + 1;
            }

    let msg;

    if (user.id === message.author.id){
      msg = `💬 | Você tem **${userdb.msg.total}** mensagens e está na posição **#${userPosition}** no rank!`
    } else {
      msg = `💬 | ${user} tem **${userdb.msg.total}** mensagens e está na posição **#${userPosition}** do rank!`
    };

   await message.reply({
      content: `${msg}`
    })
  },
};