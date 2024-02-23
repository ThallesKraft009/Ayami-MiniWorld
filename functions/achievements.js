const DiscordRequest = require("../settings/request.js");
const db = require("../mongodb/user.js")

const roles = require("../settings/cargos.json");
const types = ["message", "roles", "reaction"]

module.exports = class Achievements {
  constructor(){
    this.ygor = "890320875142930462";
    this.guaxir = "1133133684237680800";
    this.carlinhos = "890320875142930462";

    this.conquistas = {
      "05-001": "🤨 ┇ Me chamou de sus?!!",
      "05-002": "🐢 ┇ Te amo!",
      "05-003": "🍓 ┇ Uma reação de morango???",
      "05-004": "🧑‍🏫 ┇ Hey professor!",
      "05-005": "🧟 ┇ Aquele que trás os mortos pra vida!",
      "05-006": "🚨 ┇ MODERADORESSS"
    }
  }

  async secretas(type, data){

    if (types[type] === "reaction"){
      let reaction = data;

      /**
       * > # 🍓┇Uma reação de morango???
> ?????????????????????????
> **ID:** 05-003
> **Pontuação:** 600
> 
> **Como pegar:** ???????????????
> 
> ||**explicação da conquista:** para pegar esta conquista, precisa que o Guaxinim reaja a mensagem do membro com um morango 🍓 ||
       */

      if (reaction.emoji.name === "🍓"){

        if (reaction.member.user.id === this.guaxir){

          await DiscordRequest(`/channels/${reaction.channel_id}/messages/${reaction.message_id}`,{
      method: "GET"
    }).then(async(response) => {
      let msg = await response.json();

      if (msg.author.bot) return;

            let userdb = await db.findOne({
          userID: msg.author.id
        })

        if (!userdb){
          let newUser = new db({
            userID: msg.author.id
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: msg.author.id
        })
        }

            if (userdb.conquistas.secretas["id_05-003"]) return;

            userdb.conquistas.secretas["id_05-003"] = true;

            userdb.conquistas.pontos += 600;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            
            this.notificar("05-003", ultimoChannel, msg.author.id);

            await userdb.save()

          })
        }
      }
    }

    if (types[type] === "message"){

      if (data.author.bot) return;
      let cargo = "1205842003745841162";

/**
 * > # 🚨┇MODERADORESSS
> ??????????????
> **ID:** 05-006
> **Pontuação:** 800
> 
> **como pegar:** ???????????
> 
> || **explicação das conquista:**Marque o cargo moderadores ou moderadores em treinamento em casos de ultra emergência||
 */

      if (data.content.includes(roles.moderador) || data.content.includes(roles.moderador_em_treinamento)){
  let userdb = await db.findOne({
              userID: data.author.id
            })

            if (!userdb){
              let newuser = new db({
                userID: data.author.id
              })

              await newuser.save();

              userdb = await db.findOne({
              userID: data.author.id
            })
            }

  if (userdb.conquistas.secretas["id_05-006"]) return;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            this.notificar("05-006", ultimoChannel, data.author.id);

            userdb.conquistas.secretas["id_05-006"] = true;

            userdb.conquistas.pontos += 800;

           await userdb.save();
  
      }

        /**
         * > # 🧟┇Aquele que trás os mortos pra vida!
> ????????????????????
> **ID:** 05-005
> **Pontuação:** 300
> 
> **Como pegar:** ?????????
> 
> || **explicação da conquista:** marque o reviverchat||
         */

      if (data.content.includes(roles.reviverchat)){
  let userdb = await db.findOne({
              userID: data.author.id
            })

            if (!userdb){
              let newuser = new db({
                userID: data.author.id
              })

              await newuser.save();

              userdb = await db.findOne({
              userID: data.author.id
            })
            }

  if (userdb.conquistas.secretas["id_05-005"]) return;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            this.notificar("05-005", ultimoChannel, data.author.id);

            userdb.conquistas.secretas["id_05-005"] = true;

            userdb.conquistas.pontos += 300;

           await userdb.save();
  
      }
      
      /**
       * > # 🧑‍🏫┇Hey professor!
> ?????????????????????????
> **ID:** 05-004
> **Pontuação:** 300
> 
> **Como pegar:** ???????????????
> 
> ||**explicação da conquista:** para pegar esta conquista, o membro precisa marcar um professor! ||
       */
      

if (data.content.includes(roles.professor)){
  let userdb = await db.findOne({
              userID: data.author.id
            })

            if (!userdb){
              let newuser = new db({
                userID: data.author.id
              })

              await newuser.save();

              userdb = await db.findOne({
              userID: data.author.id
            })
            }

  if (userdb.conquistas.secretas["id_05-004"]) return;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            this.notificar("05-004", ultimoChannel, data.author.id);

            userdb.conquistas.secretas["id_05-004"] = true;

            userdb.conquistas.pontos += 300;

           await userdb.save();
  
}

//---------- Conquista "Te amo" ------------------
      /**
       * > # 🐢┇Te amo!
> ??????????????????????????????
> **ID:** 05-002
> **Pontuação:** 550
> 
> **Como pegar:** ?????????????
> 
> ||**Explicação da conquista:** Tem que responder o Carlinhos com as palavras "te amo"||
       */

      if (data.content.toLowerCase().includes("te amo")){

        let messageReference = data.message_reference;

        if (!messageReference) return;
        await DiscordRequest(`/channels/${data.channel_id}/messages/${messageReference.message_id}`,{
            method: "GET"
          }).then(async(msgData) => {
            let msg = await msgData.json();

            let userId = msg.author.id;

          

          if (userId === this.carlinhos){

            let userdb = await db.findOne({
              userID: data.author.id
            })

            if (!userdb){
              let newuser = new db({
                userID: data.author.id
              })

              await newuser.save();

              userdb = await db.findOne({
              userID: data.author.id
            })
            }

            if (userdb.conquistas.secretas["id_05-002"]) return;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            this.notificar("05-002", ultimoChannel, userId);

            userdb.conquistas.secretas["id_05-002"] = true;

            userdb.conquistas.pontos += 550;

           await userdb.save();
          }
        })
      }
 //----------Conquista "Chamou de Sus" ------------

      if (data.content.toLowerCase().includes("sus")){

        if (data.author.id === this.ygor){

          let messageReference = data.message_reference;

          if (!messageReference) return;

          await DiscordRequest(`/channels/${data.channel_id}/messages/${messageReference.message_id}`,{
            method: "GET"
          }).then(async(msgData) => {
            let msg = await msgData.json();

            let userId = msg.author.id;

            

            let userdb = await db.findOne({
              userID: userId
            })

            if (!userdb){
              let newuser = new db({
                userID: userId
              })

              await newuser.save();

              userdb = await db.findOne({
              userID: userId
            })
            }

            if (userdb.conquistas.secretas["id_05-001"]) return;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            this.notificar("05-001", ultimoChannel, userId);

            userdb.conquistas.secretas["id_05-001"] = true;

            userdb.conquistas.pontos += 550;

            await userdb.save();
          })
        }
      }
    }
  }

  async notificar(conquistaId, channelId, userId){
    let conquista = this.conquistas[conquistaId];

    await DiscordRequest(`/channels/${channelId}/messages`,{
      method: "POST",
      body: {
        content: `🎖️ | <@${userId}> você desbloqueou a conquista **\`${conquista}\`**!`
      }
    })
  }
}