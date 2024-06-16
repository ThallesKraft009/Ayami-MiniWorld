const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js");
const FestasJuninasEconomy = require("../../../functions/festasJuninasEconomy.js");

module.exports = {
  data: {
  name: "pontos",
  description: "Grupo de Comandos",
  type: 1,
  options: [{
    //------------ OBTIDOS
    name: "obtidos",
    description: "Grupo de comandos",
    type: 2,
    options: [{
        name: "ver",
        description: "Veja quantos pontos você tem atualmente",
        type: 1,
        options: [{
         name: "membro",
         description: "Mencione um membro",
         type: 6,
         required: false
       }],
      },{
      name: "rank",
      description: "Veja o rank de pontos",
      type: 1
      }],
  },{
    //------------ GASTOS
    name: "gastos",
    description: "Grupo de Comandos",
    type: 2,
    options: [{
        name: "ver",
        description: "Veja quantos pontos você gastou",
        type: 1,
      options: [{
        name: "membro",
        description: "Mencione um membro",
        type: 6,
        required: false
      }],
      },{
      name: "rank",
      description: "Veja o top 10 gastadores de pontos",
      type: 1
      }],
  },{
    name: "loja",
    description: "Veja a loja existente",
    type: 1
  }],
  },
  run: async(interaction)=>{
    //FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);
    
    let subCmd = interaction.data.options[0];

    if (subCmd.name === "loja"){

      let userdb = await db.findOne({
        userID: interaction.member.user.id
      });

      if (!userdb){
        let newuser = new db({
          userID: interaction.member.user.id
        })

        await newuser.save();

        userdb = await db.findOne({
        userID: interaction.member.user.id
      });
      }

      
      let pipocaStatus = 'Bloqueado';
      let maçaStatus = 'Bloqueado';
      let canjicaStatus = 'Bloqueado';
      let pamonhaStatus = 'Bloqueado';
      let boloStatus = 'Bloqueado';
      let cargoUm = 'Bloqueado';
      let cargoDois = 'Bloqueado';


let pipoca = userdb.saoJoao_loja_2024.pipoca;
      
      if (pipoca < 10) pipocaStatus = "Liberado";
      if (pipoca === 10) pipocaStatus = "Bloqueado";

let maça = userdb.saoJoao_loja_2024.macaDoAmor;
      if (pipoca === 10 & maça < 10) maçaStatus = "Liberado";
      if (maça === 10) maçaStatus = "Bloqueado";

let canjica = userdb.saoJoao_loja_2024.canjica;
      if (maça === 10 && canjica < 10) canjicaStatus = "Liberado";
      if (canjica === 10) canjicaStatus = "Bloqueado";

  let pamonha = userdb.saoJoao_loja_2024.pamonha;
      if (canjica === 10 && pamonha < 10) pamonhaStatus = "Liberado";
      if (pamonha === 10) pamonhaStatus = "Bloqueado";

let bolo = userdb.saoJoao_loja_2024.boloDeMilho;
      if (pamonha === 10) boloStatus = "Liberado";

      if (bolo > 10) {
        cargoUm = "Liberado";
        cargoDois = "Liberado";
      };



      let itensDeLoja = [];
      console.log(pipoca, maça, pamonha, canjica)

   //   pipoca--;
      
      if (pipoca < 11) itensDeLoja.push({
        "label": "Pipoca",
        "value": "pipoca",
        "description": "1000 pontos",
      })

      if (maça < 11 && pipoca === 10) itensDeLoja.push({
        "label": "Maçã do Amor",
        "value": "maça",
        "description": "2000 pontos",
      })

      if (canjica < 11 && maça === 10) itensDeLoja.push({
        "label": "Canjica",
        "value": "canjica",
        "description": "3000 pontos",
      })

      if (pamonha < 11 && canjica === 10) itensDeLoja.push({
        "label": "Pamonha",
        "value": "pamonha",
        "description": "4000 pontos",
      })

      if (pamonha === 10) itensDeLoja.push({
        "label": "Bolo de Milho",
        "value": "bolo",
        "description": "5000 pontos",
      })

      if (bolo > 10) itensDeLoja.push({
        "label": "Guardião das Festas",
        "value": "cargoUm",
        "description": "40000 pontos",
      },{
        "label": "Mestre da Fogueira",
        "description": "50000 pontos",
        "value": "cargoDois"
      })

      console.log(itensDeLoja)
      
let data = {
  "content": `<@${interaction.member.user.id}>`,
  "embeds": [{
    "title": "Barraca de Vendas",
    "thumbnail": {
      "url": "https://cdn.discordapp.com/icons/751534674723078174/124997158f53eaeb01643bb399f9e6c3.png"
    },
    "fields": [
      {
        "name": "Pipoca",
        "value": `1,000 pontos **\`(${pipocaStatus})\`**`,
        "inline": true
      },
      {
        "name": "Maçã do Amor",
        "value": `2,000 pontos **\`(${maçaStatus})\`**`,
        "inline": true
      },
      {
        "name": "Canjica",
        "value": `3,000 pontos **\`(${canjicaStatus})\`**`,
        "inline": true
      },
      {
        "name": "Pamonha",
        "value": `4,000 pontos **\`(${pamonhaStatus})\`**`,
        "inline": true
      },
      {
        "name": "Bolo de Milho",
        "value": `5,000 pontos **\`(${boloStatus})\`**`,
        "inline": true
      },
      {
        "name": "Cargo 'Guardião das Festas'",
        "value": `40,000 pontos **\`(${cargoUm}\`**`,
        "inline": true
      },
      {
        "name": "Cargo 'Mestre da Fogueira'",
        "value": `50,000 pontos **\`(${cargoDois})\`**`,
        "inline": true
      }
    ]
  }],
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 3,
                    "custom_id": "loja_" + interaction.member.user.id,
                    "options": itensDeLoja,
                    "placeholder": "Produtos"
                }
              ]
        }
      ]
  }

await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: data
           }
        })
      
    }

    if (subCmd.name === "gastos"){

      if (subCmd.options[0].name === "rank"){
              let userdb = await db.find({})

  userdb.sort((a,b) => (b.saojoao_pontosGastos_2024 + b.saojoao_pontosGastos_2024) - (a.saojoao_pontosGastos_2024 + a.saojoao_pontosGastos_2024))

      userdb = userdb.slice(0, 10);

      let embed = {
        title: "Rank de Pontos Gastados",
        description: `${userdb.map((user, i) => `#${i+1} | **${`<@${user.userID}>` || `sumido#0000`}** (${user.saojoao_pontosGastos_2024})`).join("\n ")}`,
        color: 16776960
      }

      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               embeds: [embed]
             }
           }
        })
      }
            if (subCmd.options[0].name === "ver"){
        
let cmd = subCmd.options;
          let userId;

        if (cmd[0].options.length === 0){

        userId = interaction.member.user.id;
        
      } else {
        userId = cmd[0].options[0].value;
        
        }

        let userdb = await db.findOne({
          userID: userId
        })

        if (!db) {
          let newUser = new db({
            userID: userId
          })

          await newUser.save();

          db = await db.findOne({
          userID: userId
        })
        }


        const rankedUsers = await db.find({
              "saojoao_pontosGastos_2024": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "saojoao_pontosGastos_2024": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.saojoao_pontosGastos_2024 === 0) {
           userPosition = rankedUsers.length + 1;
            }


      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `<@${userId}> tem ${userdb.saojoao_pontosGastos_2024} pontos juninos gastados e está na posição #${userPosition} do rank!`
             }
           }
        })
      }
  }
    
    if (subCmd.name === 'obtidos'){

            if (subCmd.options[0].name === "rank"){
              let userdb = await db.find({})

  userdb.sort((a,b) => (b.saojoao_pontos_2024 + b.saojoao_pontos_2024) - (a.saojoao_pontos_2024 + a.saojoao_pontos_2024))

      userdb = userdb.slice(0, 10);

      let embed = {
        title: "Rank de Pontos",
        description: `${userdb.map((user, i) => `#${i+1} | **${`<@${user.userID}>` || `sumido#0000`}** (${user.saojoao_pontos_2024})`).join("\n ")}`,
        color: 16776960
      }

      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               embeds: [embed]
             }
           }
        })
            }

      if (subCmd.options[0].name === "ver"){
        
let cmd = subCmd.options;
          let userId;

        if (cmd[0].options.length === 0){

        userId = interaction.member.user.id;
        
      } else {
        userId = cmd[0].options[0].value;
        
        }

        let userdb = await db.findOne({
          userID: userId
        })

        if (!db) {
          let newUser = new db({
            userID: userId
          })

          await newUser.save();

          db = await db.findOne({
          userID: userId
        })
        }


        const rankedUsers = await db.find({
              "saojoao_pontos_2024": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "saojoao_pontos_2024": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.saojoao_pontos_2024 === 0) {
           userPosition = rankedUsers.length + 1;
            }


      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `<@${userId}> tem ${userdb.saojoao_pontos_2024} pontos juninos e está na posição #${userPosition} do rank!`
             }
           }
        })
      }
  }
  }
}