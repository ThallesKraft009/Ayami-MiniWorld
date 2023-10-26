import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'
import tempo from "ms";
import { numero } from "../../../functions/numero.js"

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "daily",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: message.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: message.author.id })
      }

    let quantidade = getRandomNumberBetween(1000, 10000);

    if(Date.now() < userdb.economia.daily_time){
      const calc = userdb.economia.daily_time - Date.now()
      
         return message.reply({content: `🚫 | Você só pode pegar seu daily novamente em ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s !`, ephemeral: true})
     }  

    await db.updateOne({
         userID: message.author.id
     }, { $set: {
  "economia.moedas": userdb.economia.moedas + quantidade,
  "economia.daily_time": Date.now() + tempo("12h"),
     }
     })

    message.reply({
        content: `Você resgatou seu daily e ganhou **\`${numero(quantidade)}\`**  MiniMoedas!`
      })
  },
};

function getRandomNumberBetween(x, y) {
  if (x >= y) {
    throw new Error("O valor de 'x' deve ser menor que 'y'");
  }
  const randomNumber = Math.floor(Math.random() * (y - x + 1)) + x;
  return randomNumber;
}

      function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
           }