import { PermissionsBitField, codeBlock, ChannelType } from "discord.js";
import { cooldown } from "../handlers/functions.js";
import fetch from 'node-fetch'

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageCreate",

  run: async (client, message) => {


    // Verificações iniciais
    if (message.channel.type !== 0) return; // Verifica se o canal não é uma mensagem direta (DM).
    if (message.author.bot) return; // Ignora mensagens enviadas por outros bots.

    // Prefixo para ativar o bot
    let prefix = "ayami";
    let msg = message.content.toLowerCase();

    if (!msg.startsWith(prefix)) return; // Verifica se a mensagem começa com o prefixo.
    if (!message.guild) return; // Verifica se a mensagem pertence a um servidor do Discord.
    if (!message.member) message.member = await message.guild.fetchMember(message); // Obtém informações do autor da mensagem.

    // Separa os argumentos da mensagem
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    // Informações sobre o servidor do Discord
    const serverName = message.guild.name;
    const memberCount = message.guild.memberCount;
    const serverCreatedAt = message.guild.createdAt;

    // Informações sobre desenvolvedor e assistente
    const developerInfo = {
      desenvolvedor: "ThallesKraft",
      nomeAssistente: "Ayami",
    };

    // Informações sobre canais de texto do servidor
    const chatsDoServidor = {
      regras: `<#751536503322181732> - Este é o canal onde você pode encontrar todas as regras do servidor.`,
      cargos: `<#1111748847614570517> - Aqui estão informações sobre os cargos disponíveis no servidor.`,
      avisosENovidades: `<#752166980764696627> - Fique atualizado com os avisos e novidades do servidor neste canal.`,
      noticiasMWC: `<#751536505377521835> - Este canal é dedicado a notícias, atualizações e informações sobre o jogo Mini World Block ART.`,
      estrelinhas: `<#751536510347509801> - Registros do sistema de estrelinhas podem ser encontrados aqui.`,
      reportar: `<#1049344816116416563> - Use este canal para denunciar jogadores, membros do servidor ou relatar bugs.`,
      ajuda: `<#751536512453181562> - Precisa de suporte no servidor ou tem dúvidas? Este é o lugar para obtê-los.`,
      rpg: `<#1000553431381065798> - Participe do sistema de RPG no servidor neste canal.`,
      pedirCargos: `<#751552398245494884> - Se você deseja solicitar cargos no servidor, use este canal.`,
      gatilhosEScripts: `<#1049544680251072602> - Tire suas dúvidas sobre códigos e scripts de jogo neste canal.`,
      ideiasJogo: `<#751834779854438480> - Compartilhe suas ideias para o jogo neste canal.`,
      ideiasServer: `<#751867883528781864> - Sugira melhorias para o servidor aqui.`,
    };

    // Informações sobre comandos disponíveis
    const comandos = {
      criarMundo: "mw!criar-mundo - Use este comando para iniciar o jogo RPG criando um mundo.",
      coletarRecursos: "mw!coletar-madeira / mw!coletar-rochas - Colete madeira ou rochas para ferramentas.",
      minerar: "mw!minerar - Explore cavernas para encontrar minérios valiosos.",
      criarItens: "mw!criar - Crie itens, blocos, ferramentas e muito mais.",
      inventario: "mw!inventário - Verifique seu inventário para ver o que coletou até agora.",
      estrelinhas: "mw!estrelinhas - Descubra quantas estrelinhas você ou outros membros receberam.",
      estrelinhasRank: "mw!estrelinhas-rank - Veja quem tem mais estrelinhas no servidor.",
    };

    // Informações sobre sistemas do bot
    const sistemasBot = {
      sistemaEstrelinhas: "Sistema de Estrelinhas - Ajude outros membros fornecendo informações e receba uma estrela quando eles reagirem à sua mensagem com '⭐'.",
      recompensaEstrelas: "Recompensas por Estrelas:\n" +
        "5 estrelas = Cargo '⭐'\n" +
        "10 estrelas = Cargo '⭐⭐'\n" +
        "15 estrelas = Cargo '⭐⭐⭐'\n" +
        "20 estrelas = Cargo '⭐⭐⭐⭐'\n" +
        "25 estrelas = Cargo '⭐⭐⭐⭐⭐'",
    };

    // Combine todas as informações em uma única mensagem formatada
    const mensagemParaAPI = `
      **RPG Mini World Block ART**
      ${comandos.criarMundo}
      ${comandos.coletarRecursos}
      ${comandos.minerar}
      ${comandos.criarItens}
      ${comandos.inventario}

      **Sistemas do Bot**
      ${sistemasBot.sistemaEstrelinhas}
      ${sistemasBot.recompensaEstrelas}

      **Comandos Relacionados**
      ${comandos.estrelinhas}
      ${comandos.estrelinhasRank}

      **Chats do Servidor**
      ${chatsDoServidor.regras}
      ${chatsDoServidor.cargos}
      ${chatsDoServidor.avisosENovidades}
      ${chatsDoServidor.noticiasMWC}
      ${chatsDoServidor.estrelinhas}
      ${chatsDoServidor.reportar}
      ${chatsDoServidor.ajuda}
      ${chatsDoServidor.rpg}
      ${chatsDoServidor.pedirCargos}
      ${chatsDoServidor.gatilhosEScripts}
      ${chatsDoServidor.ideiasJogo}
      ${chatsDoServidor.ideiasServer}
    `;

    // Mensagem inicial para a API
    let x = `Instruções: Isso é uma pergunta de um usuário do Discord. Caso esteja perguntando algo relacionado a Código (scripts, discord.js, programação em geral), apenas diga que não pode enviar códigos.\nPergunta: "${args.join(" ")}"`;

    x = x.replace("@everyone", "");

    // Adicione informações do servidor, desenvolvedor, assistente, chats e comandos às mensagens enviadas à API
    const mensagensParaAPI = [
      {
        role: 'system',
        content: `Você é um assistente de conversação em ${serverName} com ${memberCount} membros. O servidor foi criado em ${serverCreatedAt.toDateString()}.`
      },
      {
        role: 'user',
        content: x
      },
      {
        role: 'assistant',
        content: `Desenvolvido por: ${developerInfo.desenvolvedor}\nNome do Assistente: ${developerInfo.nomeAssistente}\n\n${mensagemParaAPI}`
      }
    ];

    await message.channel.sendTyping();
    const respostaAPI = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.openai}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: mensagensParaAPI  // Envie as mensagens com informações do servidor, do desenvolvedor, do assistente, sobre chats e comandos para a API
        })
      });

    const dadosRespostaAPI = await respostaAPI.json();

    const respostaBot = dadosRespostaAPI.choices[0].message.content;

    const numeroQuebrasDeLinha = respostaBot.split("\n").length - 1;

    if (respostaBot.length > 550 || numeroQuebrasDeLinha > 5) {
      const thread = await message.startThread({
        name: `${args.join(" ")}`,
        autoArchiveDuration: 60,
        type: ChannelType.PrivateThread,
        reason: 'response',
      });

     /* client.config.staff.map(async(userId) => {
        await thread.members.add(`${userId}`);
      })*/

      thread.send({
        content: `${respostaBot}`
      })
    } else {
      message.reply({
        content: `${respostaBot}`
      })
    }
  },
};

function escapeRegex(newprefix) {
  return newprefix?.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }
    