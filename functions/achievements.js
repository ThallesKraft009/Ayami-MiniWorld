const DiscordRequest = require("../settings/request.js");
const db = require("../mongodb/user.js")
const ms = require("ms");

const roles = require("../settings/cargos.json");
const types = ["message", "roles", "reaction"]

module.exports = class Achievements {
  constructor(){
    this.ygor = "850134703473426493";
    this.guaxir = "1133133684237680800";
    this.carlinhos = "235148962103951360";
    this.hea = "918652857044058193";
    this.miniCapitao = ["966648348964708392"];
    this.cris = "423095096897175552";

    this.recomende = "999046308478337045";
    this.emoji = "755041866222665778";


    this.reviverUsers = false;

    this.conquistas = {
      "05-001": "🤨 ┇ Me chamou de sus?!!",
      "05-002": "🐢 ┇ Te amo!",
      "05-003": "🍓 ┇ Uma reação de morango???",
      "05-004": "🧑‍🏫 ┇ Hey professor!",
      "05-005": "🧟 ┇ Aquele que trás os mortos pra vida!",
      "05-011": "😱 ┇ Menina, sua fofoqueira!",
      "05-012": "🐮 ┇ Sua vaca voadora!",
      "05-013": "🔺️ ┇ Recomende meu mapa!",
      "05-014": "😎 ┇ Criatividade para emojis!",
      "05-016": "❤️ ┇ obrigado pelo ❤️ !",

      //chat geral
      "04-001": "🤡 ┇ Eu ganhei o desafio do math?",
      "04-002": "👻 ┇ Me invocaram ...",
      "04-003": "🐢 ┇ Carlinhos quer me mutar! D:",
      "04-004": "🙋‍♂️ ┇ Olá mini jogador",

      //level
      "03-001": "🌟 ┇ Agora sou plus!",
      "03-002": "💬 ┇ Agora sou o mais ativo!",
      "03-003": "📣 ┇ Eis o tagarela!",
      "03-004": "🎷 ┇ Quer conversar comigo?",
      "03-005": "👑 ┇ It's me! The Popular!",
      "03-006": "🦜 ┇ Boca de papagaio!",
      "03-007": "👅 ┇ Eita linguarudo!",
      "03-008": "✋ ┇ Ninguém consegue me parar!",
      
    }

    this.allConquistas = [];
  }

  async getNameConquista(id){
    return this.conquistas[id];
  }
  
  async getAllConquistas(userId){
    let userdb = await db.findOne({
          userID: userId
        })

        if (!userdb){
          let newUser = new db({
            userID: userId
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: userId
        })
        }

    let conquistas = []
    //secretas
    if (userdb.conquistas.secretas["id_005-001"]) conquistas.push("005-001");

    if (userdb.conquistas.secretas["id_005-002"]) conquistas.push("005-002");

    if (userdb.conquistas.secretas["id_005-003"]) conquistas.push("005-003");

    if (userdb.conquistas.secretas["id_005-004"]) conquistas.push("005-004");

    if (userdb.conquistas.secretas["id_005-005"]) conquistas.push("005-005");

    //chat geral 
    if (userdb.conquistas.chat_geral["id_004-001"]) conquistas.push("004-001");

    if (userdb.conquistas.chat_geral["id_004-002"]) conquistas.push("004-002");

    if (userdb.conquistas.chat_geral["id_004-003"]) conquistas.push("004-003");

    if (userdb.conquistas.chat_geral["id_004-004"]) conquistas.push("004-004");

    //level
    if (userdb.conquistas.level["id_003-001"]) conquistas.push("003-001");

    if (userdb.conquistas.level["id_003-002"]) conquistas.push("003-002");

    if (userdb.conquistas.level["id_003-003"]) conquistas.push("003-003");

    if (userdb.conquistas.level["id_003-004"]) conquistas.push("003-004");

    if (userdb.conquistas.level["id_003-005"]) conquistas.push("003-005");

    if (userdb.conquistas.level["id_003-006"]) conquistas.push("003-006");

    if (userdb.conquistas.level["id_003-007"]) conquistas.push("003-007");

    if (userdb.conquistas.level["id_003-008"]) conquistas.push("003-008");


    this.allConquistas = conquistas;
    console.log(conquistas)
  }

  async level(data){

  //  console.log(data);
    let { roles, user } = data;

    let userdb = await db.findOne({
          userID: user.id
        })

        if (!userdb){
          let newUser = new db({
            userID: user.id
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: user.id
        })
        }

    if (roles.includes(roles.por_favor_parem_esta_crianca)){
      if (userdb.conquista.level["id_03-008"]) return;

            userdb.conquista.level["id_03-008"] = true;

            userdb.conquista.pontos += 800;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-008", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.linguarudo)){
      if (userdb.conquista.level["id_03-007"]) return;

            userdb.conquista.level["id_03-007"] = true;

            userdb.conquista.pontos += 600;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-007", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.olholinguaolhoconversa)){
      if (userdb.conquista.level["id_03-006"]) return;

            userdb.conquista.level["id_03-006"] = true;

            userdb.conquista.pontos += 500;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-006", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.popular)){
      if (userdb.conquista.level["id_03-005"]) return;

            userdb.conquista.level["id_03-005"] = true;

            userdb.conquista.pontos += 400;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-005", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.papudo)){
      if (userdb.conquista.level["id_03-004"]) return;

            userdb.conquista.level["id_03-004"] = true;

            userdb.conquista.pontos += 300;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-004", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.tagarela)){
      if (userdb.conquista.level["id_03-003"]) return;

            userdb.conquista.level["id_03-003"] = true;

            userdb.conquista.pontos += 200;

            let ultimoChannel = userdb.conquistas.ultimoChannel;

            this.notificar("03-003", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.ativo)){
      if (userdb.conquista.level["id_03-002"]) return;

            userdb.conquista.level["id_03-002"] = true;

            userdb.conquista.pontos += 100;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-002", ultimoChannel, user.id);

            await userdb.save()
    }

    if (roles.includes(roles.mini_worldplus)){
      if (userdb.conquista.level["id_03-001"]) return;

            userdb.conquista.level["id_03-001"] = true;

            userdb.conquista.pontos += 50;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("03-001", ultimoChannel, user.id);

            await userdb.save()
    }

    
  }

  async chat_geral(type, data){
    if (types[type] === "message"){

      let userdb = await db.findOne({
          userID: data.author.id
        })

        if (!userdb){
          let newUser = new db({
            userID: data.author.id
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: data.author.id
        })
        }

      let role = "1205222018002329710"


      let messageReference = data.message_reference;

        if (!messageReference) return;
        await DiscordRequest(`/channels/${data.channel_id}/messages/${messageReference.message_id}`,{
            method: "GET"
          }).then(async(msgData) => {
            let msg = await msgData.json();

            let userId = msg.author.id;

                 userdb = await db.findOne({
          userID: userId
        })

        if (!userdb){
          let newUser = new db({
            userID: userId
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: userId
        })
        }

          if (!this.miniCapitao.includes(data.author.id)) return;

            if (userdb.conquista.chat_geral["id_04-004"]) return;

            userdb.conquista.chat_geral["id_04-004"] = true;

            userdb.conquista.pontos += 1000;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            
            this.notificar("04-004", ultimoChannel, msg.author.id);

            await userdb.save()
        })

      let reviverChatTime = {};

      if (this.reviverUsers){
        console.log(true)
        if (userdb.conquista.chat_geral["id_04-002"]) return;

            userdb.conquista.chat_geral["id_04-002"] = true;

            userdb.conquista.pontos += 250;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("04-002", ultimoChannel, data.author.id);

            await userdb.save()
      }
      
      if (data.content.includes(roles.reviverchat)){
        this.reviverUsers = true;
        
        setTimeout(function(){
        this.reviverUsers = false;
      }, ms("1m"))
      }
    }
    if (types[type] === "roles"){
      let roleId = roles.desafiosdomath;

      let userdb = await db.findOne({
          userID: data.user.id
        })

        if (!userdb){
          let newUser = new db({
            userID: data.user.id
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: data.user.id
        })
        }

      let cargo = "1205222018002329710"

   if (data.roles.includes(roles.silenciado)){
        if (userdb.conquista.chat_geral["id_04-003"]) return;

            userdb.conquista.chat_geral["id_04-003"] = true;

            userdb.conquista.pontos += 350;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("04-001", ultimoChannel, data.user.id);

            await userdb.save()
        
   }

      if (data.roles.includes(roles.desafiosdomath)){
        if (userdb.conquista.chat_geral["id_04-001"]) return;

            userdb.conquista.chat_geral["id_04-001"] = true;

            userdb.conquista.pontos += 300;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("04-001", ultimoChannel, data.user.id);

            await userdb.save()
        
      }
      
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
      
    if (reaction.emoji.name === "❤️"){

    

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


      if (userdb.conquista.secretas["id_05-016"]) return;

userdb.conquista.secretas["id_05-016"] = true;

            userdb.conquista.pontos += 400;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            
            this.notificar("05-016", ultimoChannel, msg.author.id);

            await userdb.save()
                   
    })
    }


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

            if (userdb.conquista.secretas["id_05-003"]) return;

            userdb.conquista.secretas["id_05-003"] = true;

            userdb.conquista.pontos += 600;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            
            this.notificar("05-003", ultimoChannel, msg.author.id);

            await userdb.save()

          })
        }
      }
    }

    if (types[type] === "message"){

      if (data.author.bot) return;
      let cargo = "1205842003745841162";

      /*
      > # 🔺️┇Recomende meu mapa!
> ?????????????
> **ID:** 05-013
> **Pontuação:** 500
> 
> **como pegar:** ???????
> 
> ||Enviar uma imagem no chat #recomende meu mapa||*/
     // console.log(data)

            if (data.channel_id === this.emoji){
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

        if (userdb.conquistas.secretas["id_05-014"]) return;

        let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-014", ultimoChannel, userId);

            userdb.conquista.secretas["id_05-014"] = true;

            userdb.conquista.pontos += 300;

           await userdb.save();
            }

      if (data.channel_id === this.recomende){
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

        if (userdb.conquistas.secretas["id_05-013"]) return;

        let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-013", ultimoChannel, userId);

            userdb.conquista.secretas["id_05-013"] = true;

            userdb.conquista.pontos += 500;

           await userdb.save();
      }

            if (data.content.toLowerCase() === "vaca voadora"){
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

        if (userdb.conquista.secretas["id_05-012"]) return;

        let messageReference = data.message_reference;

        if (!messageReference) return;
        await DiscordRequest(`/channels/${data.channel_id}/messages/${messageReference.message_id}`,{
            method: "GET"
          }).then(async(msgData) => {
            let msg = await msgData.json();

            let userId = msg.author.id;

          if (userId === this.cris){

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-012", ultimoChannel, data.author.id);

            userdb.conquista.secretas["id_05-012"] = true;

            userdb.conquista.pontos += 500;

           await userdb.save();
          }
        })
            }

      if (data.content.toLowerCase() === "fofoqueira"){
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

        if (userdb.conquista.secretas["id_05-011"]) return;

        let messageReference = data.message_reference;

        if (!messageReference) return;
        await DiscordRequest(`/channels/${data.channel_id}/messages/${messageReference.message_id}`,{
            method: "GET"
          }).then(async(msgData) => {
            let msg = await msgData.json();

            let userId = msg.author.id;

          if (userId === this.hea){

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-011", ultimoChannel, data.author.id);

            userdb.conquista.secretas["id_05-011"] = true;

            userdb.conquista.pontos += 500;

           await userdb.save();
          }
        })
      }
 
      

/**
 * > # 🚨┇MODERADORESSS
> ??????????????
> **ID:** 05-006
> **Pontuação:** 800
> 
> **como pegar:** ???????????
> 
> || **explicação das conquista:**Marque o cargo moderadores ou moderadores em treinamento em casos de ultra emergência||*/
 

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

        
         /* > # 🧟┇Aquele que trás os mortos pra vida!
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

  if (userdb.conquista.secretas["id_05-005"]) return;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-005", ultimoChannel, data.author.id);

            userdb.conquista.secretas["id_05-005"] = true;

            userdb.conquista.pontos += 300;

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

  if (userdb.conquista.secretas["id_05-004"]) return;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-004", ultimoChannel, data.author.id);

            userdb.conquista.secretas["id_05-004"] = true;

            userdb.conquista.pontos += 300;

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

            if (userdb.conquista.secretas["id_05-002"]) return;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-002", ultimoChannel, data.author.id);

            userdb.conquista.secretas["id_05-002"] = true;

            userdb.conquista.pontos += 550;

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

            if (userdb.conquista.secretas["id_05-001"]) return;

            let ultimoChannel = userdb.conquista.ultimoChannel;

            this.notificar("05-001", ultimoChannel, userId);

            userdb.conquista.secretas["id_05-001"] = true;

            userdb.conquista.pontos += 550;

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