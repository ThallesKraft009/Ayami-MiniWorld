import { PermissionFlagsBits } from "discord.js";
import db from "../../../mongodb/user.js"
/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "salvar-uid",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let uid = args[0];
      uid = Number(`${uid}`);

      if (!uid) return message.reply({
           content: `${message.author} você precisa inserir o seu uid após o comando, exemplo: **\`mw!salvar uid [seu uid]\`**`
      });

    let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: message.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: message.author.id })
     }

     await db.updateOne({
         userID: message.author.id
     }, { $set: {
         "uid": uid
     }
     })

    await message.reply({
         content: `Seu uid foi salvo pra: **\`${uid}\`**.`
       })

  },
};
