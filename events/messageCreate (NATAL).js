import ms from "ms";
import perguntas from "../settings/natal/perguntas.js"
import músicas from "../settings/natal/músicas.js"
import fetch from 'node-fetch'
import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, time, ButtonBuilder, ButtonStyle } from "discord.js"
import db from "../mongodb/user.js";
import Collector from "../functions/collector.js"
let data = {}
data.users = []
data.time = null
data.i = 0
data.number_random = 0
data.ocorrendo = false
data.channelMusic = "751536502244376648"
data.timestamp = null

export default {
  name: "messageCreate",
  run: async(client, message) => {

  if (message.author.bot) return;
    
    data.timestamp = new Date();



  let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: message.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: message.author.id })
  }

    if (data.number_random === 0)  {
      data.number_random = 50
      //Math.floor(Math.random() * (50 - 20 + 1)) + 20;

    // data.number_random = 5
      data.time = ms("5m")
   // console.log(data.number_random)
    }
    
    if (data.time === null){
      data.time = setTimeout(() => {
        data.time = null
        data.i = 0
        data.number_random = 0
        data.users = []
      }, ms('50s'))
    }


    clearTimeout(data.time)
    if (data.ocorrendo === false){
       data.i = data.i + 1
    }

  console.log(`MSG MÁXIMA = 50, TOTAL ATÉ AGORA = ${data.i}`);
    
 //   console.log("i = ", data.i)
    data.users[message.author.id] = true

  //  console.log(data)

 //   console.log(data.ocorrendo);
    if (data.i === data.number_random){

     /* let jogoEscolhido;
      if (!data.ocorrendo){
       let games = ["corrida", "pergunta", "música", "tesouro"];

     jogoEscolhido = games[Math.floor(Math.random() * games.length)];

        console.log(jogoEscolhido)

        data.ocorrendo = true
      };*/

      console.log("Antes da escolha do jogo:", data.ocorrendo, data.i, data.number_random);
let jogoEscolhido;
if (!data.ocorrendo) {
  let games = ["corrida", "música", "tesouro"];
  jogoEscolhido = games[Math.floor(Math.random() * games.length)];
  console.log("Jogo escolhido:", jogoEscolhido);
  data.ocorrendo = true;
};
console.log("Depois da escolha do jogo:", data.ocorrendo, data.i, data.number_random);
      

      ///////////// || CAÇA AO TESOURO || ///////

      if (jogoEscolhido === "tesouro"){
        data.ocorrendo = true

        let totalMsg = 5 //Math.floor(Math.random() * (20 - 10 + 1)) + 5;

      //  console.log(totalMsg)
        let messages = []
        let falta = totalMsg

        let collector = message.channel.createMessageCollector({
          time: ms("1m")
        })

        collector.on("collect", (m) => {

          if (m.author.bot) return;

          messages.push(m.id);
          falta = falta - 1

          //console.log(messages)

          if (falta === 0){

            let msgEscolhidaID = messages[Math.floor(Math.random() * messages.length)];

              collector.stop();

                let achou = false

      m.channel.messages.fetch({ message: `${msgEscolhidaID}`, cache: false, force: true }).then(async(messageEscolhida) =>{

        //    if (achou) return;
            achou = true

            messageEscolhida.react("🎁");

           messages = []

            let messageReaction = messageEscolhida.createReactionCollector({
              time: ms("1m")
            })

            message.channel.send({
              content: "Procurem a reação '🎁' pelo chat!"
            })

      messageReaction.on("collect", async(reaction, user) => {

        if (user.bot) return;

        if (reaction.emoji.name === "🎁"){

          if (reaction.message.id === messageEscolhida.id){

            data.ocorrendo = false
            data.i = 0
            data.number_random = 0

            messageReaction.stop()

            reaction.message.reply({
              content: `<@${user.id}> reagiu primeiro!`
            })

            data.ocorrendo = false
console.log("Caça ao tesouro acabou! ", data.ocorrendo, data.i, data.number_random)


let author = await db.findOne({
         userID: user.id
     })
      
     if(!author){
         const newuser = new db({ userID: user.id })
         await newuser.save();
         
         author = await db.findOne({ userID: user.id })
        }

    await db.updateOne({
      userID: user.id
    }, { $set: {
      "pontos_natal": author.pontos_natal + 1
    }})
          }
        }
        
      })

      })
          }
        })
      }

    ////////////// || CORRIDA || //////////////
      if (jogoEscolhido === "corrida"){

        let corrida = {
          players: [],
          dataPlayers: [],
          players_win: [],
          players_lose: [],
          mapa: [],
          players_total: 0,
          time: {},
          start: async function(response, data){

            await response.edit({
              content: "Carregando....",
              components: []
            })

            let emoji = [
              "🏃",
              "2️⃣",
              "3️⃣",
              "4️⃣",
              "5️⃣"
            ]

          //  console.log(data)

            for (let x = 0;x < data.players.length + 1; x++){

         //     console.log(emoji[x])
       //       console.log("x = ", x)

              await response.react(`${emoji[x]}`);

              continue;
              
            }

let mapa = [
    ["🛷", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "🟥"],
  ["🛷", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "🟥"],
  ["🛷", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "🟥"],
  ["🛷", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "🟥"],
  ["🛷", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "🟥"]
     ]

            let c = []
            let y = 0
            data.dataPlayers.map(userId => {
              c[userId] = {
                x: 0,
                y: y
              }

              y = y + 1
            })

            let mapGerar = async() => {

        let PlayerNumber = 1

            let players = ``
            data.dataPlayers.map(userId => {
              players = players + `${PlayerNumber}: <@${userId}>\n`

             PlayerNumber = PlayerNumber + 1
            })

      let embedGame = new EmbedBuilder()
            .setDescription(`${players}\n1️⃣${mapa[0].join("")}\n2️⃣${mapa[1].join("")}\n3️⃣${mapa[2].join("")}\n4️⃣${mapa[3].join("")}\n5️⃣${mapa[4].join("")}`)
              .setColor("White")
              .setTitle("Corrida de Trenós")
              .setTimestamp()

            await response.edit({
              embeds: [embedGame],
              content: "🛷 | Corrida de Trenó"
            })

   }

            mapGerar();

  let collector = response.createReactionCollector({ 
    time: ms("1m")
  });

collector.on("collect", async(reaction, user) => {
  if (reaction.message.id !== response.id) return;
  if (user.bot) return;
  
  if (!c[user.id]) return;
  c[user.id].x = c[user.id].x + 1
  mapa[c[user.id].y][c[user.id].x] = "🛷";
  mapa[c[user.id].y][c[user.id].x - 1] = "⬜"
  mapa[c[user.id].y][0] = "⬜"
  
  mapGerar();

  if (c[user.id].x === 10){

    await response.reply({
      content: `<@${user.id}> venceu a corrida de trenó!`
    })

  data.i = 0
  data.number_random = 0
  data.ocorrendo = false
    console.log("Corrida acabou!", data.ocorrendo, data.i, data.number_random)

    collector.stop()


    let author = await db.findOne({
         userID: user.id
     })

     if(!author){
         const newuser = new db({ userID: user.id })
         await newuser.save();

         author = await db.findOne({ userID: user.id })
     }

    await db.updateOne({
      userID: user.id
    }, { $set: {
      "pontos_natal": author.pontos_natal + 1
    },
       })

           data.ocorrendo = false;
           data.i = 0;
           data.number_random = 0;
                  
                      
  }
})


            
          }
        };

        let embed = new EmbedBuilder()
        .setTitle("Corrida de Trenós")
        .setDescription(`Explicação: Você deve reagir ao número de acordo com seu nome para o trenó andar, e assim, vencer.\n\nJogadores: ${corrida.players_total}/5`)
        .setColor("Yellow")
        .setTimestamp()
        .setFooter({ text: `Foram Enviadas ${data.i} mensagens até esse jogo!`, iconURL: `${message.author.displayAvatarURL()}`})

        data.ocorrendo = true
        data.i = 0
        data.number_random = 0

        let button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel("Entrar na Corrida")
          .setCustomId("JoinCorrida")
          .setStyle(ButtonStyle.Secondary)
        );

       let msg = await message.channel.send({
          embeds: [embed],
          components: [button]
        })

        let timeOn = false

        let tempo = setTimeout(() => {
          data.ocorrendo = false;
          data.i = 0;
          data.number_random = 0;

          msg.reply({
            content: "O tempo acabou! Tente novamente."
          })
        }, ms("2m"))
        Collector(async(i) => {
         if (i.isButton()){
           if (i.customId === "JoinCorrida"){

             if (corrida.players.length >= 5){
               i.reply({
                 content: "O limite de jogadores foi atingido!",
                 ephemeral: true
               })
           } else {

               i.reply({
                 content: "Você entrou na Corrida!",
                 ephemeral: true
               })

               corrida.players_total = corrida.players_total + 1

               if (corrida.players[i.user.id]){
                 return i.reply({
                   content: "Você já entrou!",
                   ephemeral: true
                 })
               }

               corrida.players[i.user.id] = true
               corrida.dataPlayers.push(i.user.id)

               embed = embed.setDescription(`Explicação: Você deve reagir ao número de acordo com seu nome para o trenó andar, e assim, vencer.

Jogadores: ${corrida.players_total}/5`)

               await msg.edit({
                 embeds: [embed]
               })

               //corrida.players_total = corrida.players_total + 1

              if (corrida.players_total === 2){
                
                corrida.time = setTimeout(() => {

                  corrida.start(msg, corrida);
                  
                  
                }, ms("30s"))

                await msg.reply({
                  content: "A corrida iniciará em 30 segundos."
                })

                clearTimeout(tempo)
              }
           }
         }
        }
        })
      }

  //////////////// || MÚSICA || /////////////
    if (jogoEscolhido === "música"){
      data.ocorrendo = true
      data.number_random = 0

      let channel = message.guild.channels.cache.get(data.channelMusic)
      
        let options = []
        músicas.map(music => {
          options.push({
            label: `${music.nome}`,
            description: "Clique pra Selecionar",
            value: `${music.nome}`
          })
        })
      

      let menu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
	   		.setCustomId('musica')
  			.setPlaceholder("Lista de Músicas")
        .addOptions(options)
      );

      let musicaEscolhida = músicas[Math.floor(Math.random() * músicas.length)];

      let embed = new EmbedBuilder()
      .setTitle("Adivinhe a música de Natal")
      .setDescription(`A música está tocando no canal ${channel}.\nSelecione no menu abaixo a música que estiver tocando.`)
      .setColor("Red")
      .setFooter({ text: `Foram enviados ${data.i} mensagens até esse jogo!`, iconURL: `${message.author.displayAvatarURL()}`})
      .setTimestamp()

        let queue = client.player.createQueue(message.guild.id);
        await queue.join(channel);

     // console.log(musicaEscolhida)

      let song = await queue.play(`${musicaEscolhida.nome} trilha sonora`)
        .catch(err => {
            console.log(err);
            if(!queue)
                queue.stop();
        });

      let msg = await message.channel.send({
        embeds: [embed],
        components: [menu]
      })

      let tempo = setTimeout(() => {
        data.ocorrendo = false
        data.i = 0
        data.number_random = 0


        queue.stop()
        msg.reply({
          content: "O tempo acabou! Continuem Conversando."
        })
      }, 600000)

        Collector(async(i) => {
          if (i.isStringSelectMenu()){
            if (i.customId === "musica"){
              if (i.message.id !== msg.id) return;

            /*  if (!data.users[i.user.id]) {
                return i.reply({
                  content: `Você não enviou uma mensagem nos últimos 50 segundos, então você não pode responder.`,
                  ephemeral: true
                })
              } else {*/

                let value = i.values[0];

                  if (value === musicaEscolhida.nome){

                    i.reply({
                      content: `${i.user} acertou!`
                    })

                data.ocorrendo = false
                   // console.log("Música acabou!" , data.ocorrendo, data.i, data.number_random)

          queue.stop();

                    clearTimeout(tempo)

                    await msg.edit({
                      components: []
                    })

                    let author = await db.findOne({
                         userID: i.user.id
                     })

                     if(!author){
                         const newuser = new db({ userID: i.user.id })
                         await newuser.save();

                         author = await db.findOne({ userID: i.user.id })
                     }

  //  userdb.pontos_natal = userdb.pontos_natal +1;

       await db.updateOne({
         userID: i.user.id
     }, { $set: {
         "pontos_natal": author.pontos_natal + 1
     }
     })

       data.ocorrendo = false;
       data.i = 0;
       data.number_random = 0;
                    console.log("Música acabou!", data.ocorrendo, data.i, data.number_random)
                  } else {

                    i.reply({
                      content: "A resposta não é essa.",
                      ephemeral: true
                    })
                  }
              
            }
          }
        })
    }

  //////////////// || PERGUNTA || /////////////
      if (jogoEscolhido === "pergunta"){

        data.ocorrendo = true
        data.number_random = 0
        let perguntaEscolhida = perguntas[Math.floor(Math.random() * perguntas.length)];

        console.log(perguntaEscolhida)


 // data.timestamp = data.timestamp.setMinutes(data.timestamp.getMinutes() + 2);

  //  data.timestamp = time(data.timestamp)
  //  let timestamp = time(data.timestamp, 'R');

        let embed = new EmbedBuilder()
        .setTitle("Pergunta de Natal")
        .setDescription(`**${perguntaEscolhida.pergunta}**`)
        .setColor("Red")
        .setTimestamp()
        .setFooter({ text: `Foram enviadas ${data.i} mensagens até esse jogo!`, iconURL: `${message.author.displayAvatarURL()}`})
        
        let msg = await message.channel.send({
          embeds: [embed]
        })

       data.i = 0

        let timePergunta = setTimeout(() => {
          data.ocorrendo = false
          data.i = 0
          data.number_random = 0
          message.channel.send({
            content: `O tempo acabou! Continuem conversando.`
          })
        }, ms("2m"))

        let collector = msg.channel.createMessageCollector({ time: ms("2m") });

        collector.on("collect", async(m) => {
                    if (m.author.bot) return;
          if (!data.users[m.author.id]) return;
          const respostaAPI = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.openai}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: "user",
            content: `Instrução: Responda 'true' se a resposta do usuário estiver correta em relação à pergunta fornecida, mesmo que a resposta do usuário seja incompleta. Responda 'false' se a resposta estiver incorreta.

Pergunta: '${perguntaEscolhida.pergunta}'
Resposta esperada: '${perguntaEscolhida.resposta}'
Resposta do usuário: '${m.content}'
`
          }]
        })
      });
const dadosRespostaAPI = await respostaAPI.json();

    const respostaBot = dadosRespostaAPI.choices[0].message.content;

          if (respostaBot === "true"){

            await message.channel.sendTyping()

            m.reply({
              content: `Parabens, ${m.author}! Você acertou a resposta \:D`
            })

            

       //   userdb.pontos_natal = userdb.pontos_natal + 1

            let author = await db.findOne({
                 userID: m.author.id
             })

             if(!author){
                 const newuser = new db({ userID: m.author.id })
                 await newuser.save();

                 author = await db.findOne({ userID: m.author.id })
             }

            await db.updateOne({
         userID: m.author.id
     }, { $set: {
  "pontos_natal": author.pontos_natal + 1
     }
     })

             await collector.stop();
             data.users = []
             clearTimeout(timePergunta)

            data.ocorrendo = false
            data.i = 0
        data.number_random = 0
            console.log("Pergunta acabou!", data.ocorrendo, data.i, data.number_random)
          }

  
        })
        
       // console.log(perguntaEscolhida)
      }
    }

    data.time = setTimeout(() => {
      data.time = null
      data.i = 0
      data.number_random = 0
      data.users = []
    }, ms("50s"))
  }
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
  }