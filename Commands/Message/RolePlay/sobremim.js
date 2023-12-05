import { PermissionFlagsBits } from "discord.js";
import db from "../../../mongodb/user.js"
/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "sobremim",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let sobremim = args.join(" ")
    if (!sobremim) return message.reply({
      content: "Escreva seu sobremim após o comando."
    })

    let userdb = await db.findOne({ userID: message.author.id })

    if (!userdb){
      let newuser = new db({ userID: message.author.id })

      await newuser.save()
      userdb = await db.findOne({ userID: message.author.id })


    }

    userdb.perfil.sobremim = sobremim;

    message.reply({
      content: `Seu sobremim foi alterado!`
    })

    await userdb.save()
  },
};
