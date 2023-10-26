import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "money",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    

   if (message.author.id !== "890320875142930462"){
      message.react("❌")
      return message.react("🍮")
   }

    let user = args[1];
    if (!user) return message.reply({
      content: `Especifique o usuário pelo ID`
    })
    user = client.users.cache.get(user);
    let escolha = args[0];
    if (!escolha) return message.reply({
      content: `Especifique se você quer adicionar ou remover moedas`
    })
    let quantidade = args[2];
    if (!quantidade) return message.reply({
      content: `Especifique quantas MiniMoedas que gerenciar`
    })

    let userdb = await db.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: user.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: user.id })
      }

    let texto;

    if (escolha === "add"){
      texto = `Foram adicionados **\`${quantidade}\`** MiniMoedas para ${user}!`;

      userdb.economia.moedas = userdb.economia.moedas + Number(`${quantidade}`);
    } else if (escolha === "remove"){
      texto = `Foram removidas **\`${quantidade}\`** MiniMoedas de ${user}!`;

      userdb.economia.moedas = userdb.economia.moedas - Number(`${quantidade}`);
    }

    await message.reply({
      content: `${texto}`
    });

      await db.updateOne({
         userID: user.id
     }, { $set: {
         "economia.moedas": userdb.economia.moedas
     }
     })
  },
};
