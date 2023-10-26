import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "uid",
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

    let msg;

    if (user.id === message.author.id){
      msg = `Seu UID é **\`${userdb.uid}\`**!`
    } else {
      msg = `O UID de ${user} é **\`${userdb.uid}\`**`;
    };

    let response = await message.reply({
      content: `${msg}`
    })

    if (userdb.uid === "Não definido" || userdb.uid === null){
      await response.edit({
        content: `Uid não achado no meu banco de dados.. peça pra usar **\`mw!salvar-uid\`**!`
      })
    }
  },
};
              