import { db } from "../mongodb/gatilhos.js";
import vm from "vm";
import { API } from "../functions/API.js";
import DB from "../mongodb/user.js";

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageCreate",

  run: async (client, message) => {
    // code
    let script = await db.findOne({
         guild: message.guild.id
     })
      
     if(!script){
         const newscript = new db({ guild: message.guild.id })
         await newscript.save();
         
         script = await db.findOne({ guild: message.guild.id })
      }

    const Evento = async(name, func) => {
      await func(message);
    }

    let data = script.sistema;

    data = data.filter(objeto => objeto.evento === 'messageCreate');

  //  console.log(data)

    data.forEach(objeto => {
       let contexto = {
         client, 
         message,
         Evento,
         API,
         DB
       }
      try {

      vm.createContext(contexto);
      vm.runInContext(objeto.codigo, contexto);

      } catch (err) {
        console.log(err)
      }
    })


  },
};