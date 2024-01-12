const DiscordRequest = require("../../settings/request.js");
const db = require("../../mongodb/user.js")
const channel = "1195375042901590177";
let guild = `751534674723078174`;

const MuralDaVergonha = async function (data) {
  let i = data.d;

  //console.log(i)

  if (i.action_type === 23){
              let author = await DiscordRequest(`/guilds/${guild}/members/${i.user_id}`,{
    method: "GET"
  });

      author = await author.json();

      let user = await DiscordRequest(`/users/${i.target_id}`,{
    method: "GET"
  });

      user = await user.json();

      
      let embed = {
        title: "**DESBANIDO(A)!!! 🕊️**",
        description: `<@${user.id}> foi desbanido!
        
**Por:** ${author.user.username}
        
**Motivo:** ${i.reason || "não definido."}`,
        author: {
          name: `${user.username}`,
          icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        },
        thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        },
        footer: {
          text: `ID do Usuário: ${user.id}`
        },
        image: {
          url: "https://cdn.discordapp.com/attachments/907396567496007691/1195371385770475651/tenor.gif?ex=65b3bf5b&is=65a14a5b&hm=813012aa3043ae30253e74e9aa0123fc54ceea81ba2c382e29ddeb5236401fc2&"
        },
        color: 65280
      }

      await DiscordRequest(`/channels/${channel}/messages`, {
        method: "POST",
        body: {
          content: `<@${user.id}>`,
          embeds: [embed]
        }
      })
  }

  if (i.action_type === 22){
    //console.log(i)

          let author = await DiscordRequest(`/guilds/${guild}/members/${i.user_id}`,{
    method: "GET"
  });

      author = await author.json();

      let user = await DiscordRequest(`/users/${i.target_id}`,{
    method: "GET"
  });

      user = await user.json();

      
      let embed = {
        title: "**🔨BANIDO(A)!!!🔨**",
        description: `<@${user.id}> foi banido!
        
**Por:** ${author.user.username}
        
**Motivo:** ${i.reason || "não definido."}`,
        author: {
          name: `${user.username}`,
          icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        },
        thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        },
        footer: {
          text: `ID do Usuário: ${user.id}`
        },
        image: {
          url: "https://cdn.discordapp.com/attachments/732339611493335060/779761553883791400/B_A_N_I_D_O_1280x720_378Mbps_2020-11-21_11-31-11.gif?ex=65ac0409&is=65998f09&hm=979e4cde2c506d30bac32813416f9632bcf7f2cf0b56028ce1ab70edf91a6d6e&"
        }
      }

      await DiscordRequest(`/channels/${channel}/messages`, {
        method: "POST",
        body: {
          content: `<@${user.id}>`,
          embeds: [embed]
        }
      })
  }

  if (i.action_type === 20){
 //   console.log(i)


      let author = await DiscordRequest(`/guilds/${guild}/members/${i.user_id}`,{
    method: "GET"
  });

      author = await author.json();

      let user = await DiscordRequest(`/users/${i.target_id}`,{
    method: "GET"
  });

      user = await user.json();

      
      let embed = {
        title: "Parece que alguém levou uma mordida do Misra.",
        description: `<@${user.id}> foi expulso!
        
**Por:** ${author.user.username}
        
**Motivo:** ${i.reason || "não definido."}`,
        author: {
          name: `${user.username}`,
          icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        },
        thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        },
        footer: {
          text: `ID do Usuário: ${user.id}`
        },
        color: 16711680
      }

      await DiscordRequest(`/channels/${channel}/messages`, {
        method: "POST",
        body: {
          content: `<@${user.id}>`,
          embeds: [embed]
        }
      })
          
  }
  if (i.action_type === 24) {
    if (i.changes[0].key !== "communication_disabled_until") return;

    const timestampStr = i.changes[0].new_value;

    
    const timestamp = new Date(timestampStr);

    
    const diferencaEmMilissegundos = timestamp.getTime() - Date.now();

    
    if (diferencaEmMilissegundos >= 0) {
      
      const dias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
   
      const horas = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60));
      const minutos = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60)) - 1;
      const segundos = Math.floor((diferencaEmMilissegundos % (1000 * 60)) / 1000);

      let tempo = ``;
      if (minutos !== 0) tempo = `${minutos} minutos`;
      if (horas !== 0) tempo = `${horas} horas`;
      if (dias !== 0) tempo = `${dias} dias`;

      let userdb = await db.findOne({
        userID: i.target_id
      })

      if (!userdb){
        let newuser = new db({
          userID: i.target_id
        });

        await newuser.save();

        userdb = await db.findOne({
        userID: i.target_id
      })
      }

      userdb.timeout = true;
      await userdb.save();

  let author = await DiscordRequest(`/guilds/${guild}/members/${i.user_id}`,{
    method: "GET"
  });

      author = await author.json();

      let user = await DiscordRequest(`/guilds/${guild}/members/${i.target_id}`,{
    method: "GET"
  });

      user = await user.json();

      
      let embed = {
        title: "Parece que alguém levou uma chinelada!! 👡",
        description: `<@${user.user.id}> foi silenciado!
        
**Por:** ${author.user.username}
        
**Motivo:** ${i.reason || "Não especificado."}
        
**Tempo:** ${tempo}`,
        author: {
          name: `${user.user.username}`,
          icon_url: `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
        },
        thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
        },
        footer: {
          text: `ID do Usuário: ${user.user.id}`
        },
        color: 16711680
      }

      await DiscordRequest(`/channels/${channel}/messages`, {
        method: "POST",
        body: {
          content: `<@${user.user.id}>`,
          embeds: [embed]
        }
      })
    
    }
  }
}

const AutoMod = async function(data){
  let i = data.d;

  if (i.action.type === 3){

          let user = await DiscordRequest(`/guilds/${guild}/members/${i.user_id}`,{
    method: "GET"
  });

      user = await user.json();

    let tempo;

    const {dias, horas, minutos, segundos} = converterSegundosParaDiasHorasMinutosSegundos(i.action.metadata.duration_seconds);

    if (minutos !== 0) tempo = `${minutos} minutos`;
    if (horas !== 0) tempo = `${horas} horas`;
    if (dias !== 0) tempo = `${dias} dias`
      
      let embed = {
        title: "Parece que alguém levou uma mordida do Misra.",
        description: `<@${user.user.id}> foi silenciado!
        
**Por:** AutoMod
        
**Tempo:** ${tempo}`,
        author: {
          name: `${user.user.username}`,
          icon_url: `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
        },
        thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
        },
        footer: {
          text: `ID do Usuário: ${user.user.id}`
        },
        color: 16711680
      }


    let userdb = await db.findOne({
        userID: i.user_id
      })

      if (!userdb){
        let newuser = new db({
          userID: i.user_id
        });

        await newuser.save();

        userdb = await db.findOne({
        userID: i.user_id
      })
      }

      userdb.timeout = true;
      await userdb.save();

      await DiscordRequest(`/channels/${channel}/messages`, {
        method: "POST",
        body: {
          content: `<@${user.user.id}>`,
          embeds: [embed]
        }
        
  })
}
  }

module.exports = { MuralDaVergonha, AutoMod };

  function converterSegundosParaDiasHorasMinutosSegundos(segundos) {
  const dias = Math.floor(segundos / (24 * 60 * 60));
  const horas = Math.floor((segundos % (24 * 60 * 60)) / (60 * 60));
  const minutos = Math.floor((segundos % (60 * 60)) / 60);
  const segundosRestantes = segundos % 60;

  return { dias, horas, minutos, segundos };
  }