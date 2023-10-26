import { PermissionFlagsBits } from "discord.js";
import db from '../../../mongodb/user.js'
import { numero } from "../../../functions/numero.js"
/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "atm",
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
              "economia.moedas": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "economia.moedas": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.economia.mowdas === 0) {
           userPosition = rankedUsers.length + 1;
            }

    let msg;

    if (user.id === message.author.id){
      msg = `<:A_Mini_moeda:753596203190714399> | Você tem **${numero(userdb.economia.moedas)}** MiniMoedas e está na posição **#${userPosition}** no rank!`
    } else {
      msg = `<:A_Mini_moeda:753596203190714399> | ${user} tem **${numero(userdb.economia.moedas)}** MiniMoedas e está na posição **#${userPosition}** do rank!`
    };

   await message.reply({
      content: `${msg}`
    })
  },
};
           