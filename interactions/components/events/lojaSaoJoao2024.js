//customId === loja

let cargoUm = "1246804243210436700";
let cargoDois = "1246804060338913320";
let guildId = "751534674723078174";

const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")
const FestasJuninasEconomy = require("../../../functions/festasJuninasEconomy.js");

module.exports = {
  customId: "loja_",
  run: async(interaction, id) => {
    let verf = id.replace("loja_", "");
    if (interaction.member.user.id !== verf){
     await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `Espere um minutinho... Você não é <@${verf}>! Sai daqui!`,
          flags: 64
        }
      }
      })
    }

    
    let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

    let value = interaction.data.values[0];

    

    if (value === "pipoca"){
      if (userdb.saojoao_pontos_2024 >= 1000){

        if (userdb.saoJoao_loja_2024.pipoca === 10) return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Este item foi bloqueado.",
             flags: 64
          }
        }
      })
        
        userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 1000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 1000;

        userdb.saoJoao_loja_2024.pipoca++;

        await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Item comprado!",
             flags: 64
          }
        }
      })
      } else {
        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 1000 pontos.",
             flags: 64
          }
        }
      })
      }
    }

    if (value === "maça"){
      if (userdb.saojoao_pontos_2024 >= 2000){

        if (userdb.saoJoao_loja_2024.macaDoAmor === 10) return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Este item foi bloqueado.",
             flags: 64
          }
        }
      })
        
        userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 2000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 2000;

        userdb.saoJoao_loja_2024.macaDoAmor++;

        await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Item comprado!",
             flags: 64
          }
        }
      })
      } else {
        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 2000 pontos.",
             flags: 64
          }
        }
      })
      }
    }

    if (value === "canjica"){
      if (userdb.saojoao_pontos_2024 >= 3000){

        if (userdb.saoJoao_loja_2024.canjica === 10) return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Este item foi bloqueado.",
             flags: 64
          }
        }
      })
        
        userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 3000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 3000;

        userdb.saoJoao_loja_2024.canjica++;

        await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Item comprado!",
             flags: 64
          }
        }
      })
      } else {
        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 3000 pontos.",
             flags: 64
          }
        }
      })
      }
    }


    if (value === "pamonha"){
      if (userdb.saojoao_pontos_2024 >= 4000){

        if (userdb.saoJoao_loja_2024.pamonha === 10) return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Este item foi bloqueado.",
             flags: 64
          }
        }
      })
        
        userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 4000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 4000;

        userdb.saoJoao_loja_2024.pamonha++;

        await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Item comprado!",
             flags: 64
          }
        }
      })
      } else {
        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 1000 pontos.",
             flags: 64
          }
        }
      })
      }
    }

    if (value === "bolo"){
      if (userdb.saojoao_pontos_2024 >= 5000){
        userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 5000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 5000;

        userdb.saoJoao_loja_2024.boloDeMilho++;

        await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Item comprado!",
             flags: 64
          }
        }
      })
      } else {
        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 5000 pontos.",
             flags: 64
          }
        }
      })
      }
    }

    if (value === "cargoUm"){
      if (userdb.saojoao_pontos_2024 >= 40000){

       let user = await DiscordRequest(`/guilds/${guildId}/members/${interaction.member.user.id}`,{
         method: "GET"
       });

        user = await user.json();
     //  console.log(user.roles)

        if (user.roles.includes(cargoUm)){
          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você já tem esse item.",
             flags: 64
          }
        }
      })
        } else {


          await DiscordRequest(`/guilds/${guildId}/members/${interaction.member.user.id}/roles/${cargoUm}`, {
            method: "PUT"
          })

          userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 40000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 40000;

      await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Cargo comprado e adicionado!",
             flags: 64
          }
        }
      })
        }
        } else {

        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 40000 pontos.",
             flags: 64
          }
        }
      })
        
        }
    }

      
    if (value === "cargoDois"){
      if (userdb.saojoao_pontos_2024 >= 50000){

       let user = await DiscordRequest(`/guilds/${guildId}/members/${interaction.member.user.id}`,{
         method: "GET"
       });

        user = await user.json();
     //  console.log(user.roles)

        if (user.roles.includes(cargoDois)){
          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você já tem esse item.",
             flags: 64
          }
        }
      })
        } else {


          await DiscordRequest(`/guilds/${guildId}/members/${interaction.member.user.id}/roles/${cargoDois}`, {
            method: "PUT"
          })

          userdb.saojoao_pontos_2024 = userdb.saojoao_pontos_2024 - 50000;

        userdb.saojoao_pontosGastos_2024 = userdb.saojoao_pontosGastos_2024 + 50000;

       await userdb.save();

        FestasJuninasEconomy.pointsUpdates(interaction.member.user.id);

          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Cargo comprado e adicionado!",
             flags: 64
          }
        }
      })
        }
        } else {

        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
             content: "Você não tem 50000 pontos.",
             flags: 64
          }
        }
      })
        
        }


      
        
      }
    }
  }
  