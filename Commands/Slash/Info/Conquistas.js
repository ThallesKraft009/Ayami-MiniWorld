const Achievements = require("../../../functions/achievements.js");
const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js");

const lista = {
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
  "03-008": "✋ ┇ Ninguém consegue me parar!"
}

module.exports = {
  data: {
    name: "conquistas",
    description: "Grupo de Comandos",
    type: 1,
    options: [{
      name: "ver",
      description: "Veja suas conquistas",
      type: 1
    },{
      name: "level-verificar",
      description: "Verifique suas conquistas de level",
      type: 1
    }],
  },
  run: async (interaction) => {
    const userId = interaction.member.user.id;
    const { roles } = interaction.member;
    const userdb = await db.findOne({ userID: userId });

    if (!userdb) {
      const newUser = new db({ userID: userId });
      await newUser.save();
      return console.log("Usuário criado no banco de dados.");
    }

    if (interaction.data.options[0].name === "ver"){
    let achievements = new Achievements();

    const conquistas = [];

    // Adicionar todas as conquistas secretas à lista de conquistas
    Object.keys(userdb.conquista.secretas).forEach(conquista => {
      if (userdb.conquista.secretas[conquista] === true) {
        conquistas.push(conquista);
      }
    });

    // Adicionar todas as conquistas do chat geral à lista de conquistas
    Object.keys(userdb.conquista.chat_geral).forEach(conquista => {
      if (userdb.conquista.chat_geral[conquista] === true) {
        conquistas.push(conquista);
      }
    });

    // Adicionar todas as conquistas de nível à lista de conquistas
    Object.keys(userdb.conquista.level).forEach(conquista => {
      if (userdb.conquista.level[conquista] === true) {
        conquistas.push(conquista);
      }
    });

    // Remover o prefixo "id_" de cada conquista na lista
    const conquistasFormatadas = conquistas.map(conquista => conquista.replace("id_", ""));

   // console.log("Conquistas do usuário:", conquistasFormatadas);

    console.log(conquistasFormatadas.map(c => lista[c]));

    let embed = {
      title: `Pontuação total: ${userdb.conquista.pontos}`,
      description: `**Conquistas**:\n${conquistasFormatadas.map(c => `${lista[c]}\n`)}`,
      color: 255
    }

    await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          embeds: [embed]
        }
      }
        })
  } else {


    let cargos = {
      "mini_worldplus": "845261672209448960",
  "ativo": "751536482052997282",
  "tagarela": "751536481272594463",
  "papudo": "755060148334100500",
  "popular": "755059493099929800",
  "olholinguaolhoconversa": "751536480182337627",
  "linguarudo": "763882244913102848",
  "por_favor_parem_esta_crianca": "773701595393294356",
    }

  if (roles.includes("845261672209448960")){

    userdb.conquista.level["id_03-001"] = true;

    await userdb.save();
    
  } else if (roles.includes("751536482052997282")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;
    
    await userdb.save();
  } else if (roles.includes("751536481272594463")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;

    userdb.conquista.level["id_03-003"] = true;
    
    await userdb.save();
  } else if (roles.includes("755060148334100500")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;

    userdb.conquista.level["id_03-003"] = true;

    userdb.conquista.level["id_03-004"] = true;
    
    await userdb.save();
  } else if (roles.includes("755059493099929800")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;

    userdb.conquista.level["id_03-003"] = true;

    userdb.conquista.level["id_03-004"] = true;

    userdb.conquista.level["id_03-005"] = true;
    
    await userdb.save();
  } else if (roles.includes("751536480182337627")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;

    userdb.conquista.level["id_03-003"] = true;

    userdb.conquista.level["id_03-004"] = true;

    userdb.conquista.level["id_03-005"] = true;

    userdb.conquista.level["id_03-006"] = true;
    
    await userdb.save();
      } else if (roles.includes("763882244913102848")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;

    userdb.conquista.level["id_03-003"] = true;

    userdb.conquista.level["id_03-004"] = true;

    userdb.conquista.level["id_03-005"] = true;

    userdb.conquista.level["id_03-006"] = true;

    userdb.conquista.level["id_03-007"] = true;
    
    await userdb.save();
            } else if (roles.includes("773701595393294356")){
    userdb.conquista.level["id_03-001"] = true;

    userdb.conquista.level["id_03-002"] = true;

    userdb.conquista.level["id_03-003"] = true;

    userdb.conquista.level["id_03-004"] = true;

    userdb.conquista.level["id_03-005"] = true;

    userdb.conquista.level["id_03-006"] = true;

    userdb.conquista.level["id_03-007"] = true;

    userdb.conquista.level["id_03-008"] = true;
    
    await userdb.save();
      }

      await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: "Verificado.",
          flags: 64
        }
      }
        })
    }
}
  }