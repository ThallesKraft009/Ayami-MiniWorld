import { client } from "../index.js";

let info = {};
info.emoji = "🔥";
info.channel =  "1174084824135376966"//"751536510347509801";

import db from "../mongodb/user.js";
import msgDB from "../mongodb/msg.js";

import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const addReaction = async(reaction, user) => {

  //console.log("Evento On.")
  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
  };

  if (reaction.message.author.bot) return;
  if (user.bot) return;
  

   if (reaction.emoji.name === info.emoji){

     let { message } = reaction;
     let msg = message;

     let msgdb = await msgDB.findOne({
         msgID: msg.id
     })
      
     if(!msgdb){
         const nova_msg = new msgDB({ msgID: msg.id })
         await nova_msg.save();
         
         msgdb = await msgDB.findOne({ msgID: msg.id })
     }


     let estrelinhas = msgdb.reactions;
     let reagiu = user;

     if (msgdb.reactions === 0) {

       let embed = [];

       const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Ir pra a mensagem')
					.setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)
			);

       let userdb = await db.findOne({
         userID: msg.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: msg.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: msg.author.id })
     }
       let uid = userdb.uid;
       if (
         uid === "Não definido." ||
         uid === null
       ) userdb.uid = "Ainda não definido."

       let embed_estrutura = new EmbedBuilder()
        .setColor("Yellow")
        .setAuthor({ name: `${msg.author.globalName}`, iconURL: `  ${msg.author.displayAvatarURL({ format: 'png' })}`})
    .setDescription(msg.content || null)
    .setFooter({text: `Uid do Membro: ${uid}`})


       let img = msg.attachments;

let chat_estrelinhas = info.channel;
       chat_estrelinhas = client.channels.cache.get(chat_estrelinhas);

       

       

if (msg.author.id !== reagiu.id){
     await db.updateOne({
         userID: msg.author.id
     }, { $set: {
         "estrelas": userdb.estrelas + 1
     }
     })
}
                let v = img.map(x => {
         if (!x.length) return false;

         return true;
       })

       client.logs.estrelinhas(0, msg.author.id, estrelinhas+1);

       if (v.length === 0 || v.length < 0) {

         embed.push(embed_estrutura);

        let msg_star = await chat_estrelinhas.send({
           content: `🌟 **${estrelinhas + 1} ** - ${msg.channel}`,
           embeds: embed,
          components: [row]
         });

         

    await msgDB.updateOne({
         msgID: msg.id
     }, { $set: {
         "msg_bot_id": msg_star.id,
         "reactions": 1,
         "estrutura": msg
     }
     })

       } else {
         
        img = msg.attachments;

         //console.log(img)
         
      // embed_estrutura.image = {};
         

       embed_estrutura.setImage(`${img.map(x => x.url)}`);
         
         //console.log(embed_estrutura)
         embed.push(embed_estrutura)

         let msg_star = await chat_estrelinhas.send({
           content: `🌟 **${estrelinhas + 1} ** - ${msg.channel}`,
           embeds: embed,
           components: [row]
         });



        

    await msgDB.updateOne({
         msgID: msg.id
     }, { $set: {
         "msg_bot_id": msg_star.id,
         "reactions": 1,
         "estrutura": msg
     }
     })

         
       }
     } else {

       

       let msg_bot_star = msgdb.msg_bot_id;

  client.channels.cache.get(info.channel).messages.fetch({ message: `${msg_bot_star}`, cache: false, force: true }).then(async(a) => {

      let get_star = msgdb.reactions;

             a.edit({
               content: `⭐ **${get_star + 1}** - ${msg.channel}`
             });

    await msgDB.updateOne({
         msgID: msg.id
     }, { $set: {
         "reactions": msgdb.reactions + 1,
     }
     })
        
       })
                    }

  
   }

}


const removeReaction = async(reaction, user) => {

 if (reaction.message.author.bot) return;
  if (user.bot) return;
//  if (reaction.message.author === user) return;

  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
  };

  if (reaction.emoji.name === info.emoji){
    let msg = reaction.message;
    

  let msgdb = await msgDB.findOne({
         msgID: msg.id
     })
      
     if(!msgdb){
         const nova_msg = new msgDB({ msgID: msg.id })
         await nova_msg.save();
         
         msgdb = await msgDB.findOne({ msgID: msg.id })
     }

  let reactions = msgdb.reactions - 1;
  let msg_bot_star = msgdb.msg_bot_id;

  let chat_estrelinhas = info.channel;
       chat_estrelinhas = client.channels.cache.get(chat_estrelinhas);

       let userdb = await db.findOne({
         userID: msg.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: msg.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: msg.author.id })
     }

  
  if (reactions === 0) {

    chat_estrelinhas.messages.fetch({ message: `${msg_bot_star}`, cache: false, force: true }).then(async(a) => {


      await a.delete();
      
      client.logs.estrelinhas(1, msg.author.id, userdb.estrelas-1)


      await db.updateOne({
         userID: msg.author.id
     }, { $set: {
         "estrelas": userdb.estrelas - 1
     }
     })

      await msgDB.updateOne({
         msgID: msg.id
     }, { $set: {
         "reactions": 0,
     }
     })
    });
  } else {

    chat_estrelinhas.messages.fetch({ message: `${msg_bot_star}`, cache: false, force: true }).then(async(a) => {

     await a.edit({
       content: `🌟 **${reactions} ** - ${msg.channel}`
     })

await msgDB.updateOne({
         msgID: msg.id
     }, { $set: {
         "reactions": msgdb.reactions - 1,
     }
     })
      
    })
    
  }

  }
}



  export { addReaction, removeReaction };