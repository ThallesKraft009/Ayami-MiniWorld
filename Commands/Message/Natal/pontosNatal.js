import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "pontos",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let user;
    let mention;

    if (!message.mentions.users.first()){
      user = message.author;
      mention = false;
    } else {
      user = message.mentions.users.first();
      mention = true;
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
              "pontos_natal": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "pontos_natal": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.pontos_natal === 0) {
           userPosition = rankedUsers.length + 1;
            }

    await message.reply({
      content: `${mention ? `🎄 | ${user} tem **\`${userdb.pontos_natal}\`** pontos de natal e está na posição **#${userPosition}** do rank!` : `🎄 | Você tem **\`${userdb.pontos_natal}\`** pontos de natal e está na posição **#${userPosition}** do rank!`}`
    });
  },
};
