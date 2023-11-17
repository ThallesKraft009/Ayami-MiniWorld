import { PermissionsBitField, codeBlock, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { cooldown } from "../handlers/functions.js";
import fetch from 'node-fetch'

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageCreate",

  run: async (client, message) => {

    let canal = client.channels.cache.get("1174989607616643072")
    
    if (message.channel.type !== 0) return;
    if (message.author.bot) return;

    let prefix = "ayami";
    let msg = message.content.toLowerCase();
    if (!msg.startsWith(prefix)) return;
    
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let x = `${args.join(" ")}`

    x = x.replace("@everyone", "");
    x = x.replace("@here", "");

    let infoServer = `Você é um robõ do Discord que é exclusiva do servidor Mini World: CREATA Português, que é um servidor de suporte para o jogo chamado "Mini World: Creata" que também é chamado pelos nomes: "mw", "mini world", "mini world block art", dentre outros.\nO servidor tem vários sistemas.\nSistema de level ou nível: Toda mensagem que um usuário mandar, irá sempre ganhar uma quantidade de xp, assim, subindo de level. Alguns leveis te dão cargos que lhe dá mais permissão no servidor, aqui estão os cargos:\n "Mini World Gamer" é ganhado no level 5.\n "Ativo" é ganhado no level 10.\n "Tagarela" é ganhado no level 20, que libera um chat. \n "Papudo" é ganhado no level 30.\n "Popular" é ganhado no level 40. \n "👁️🗨️👅👁️🗨️💬" é ganhado no level 50. \n "Linguarudo" é ganhado no level 100.\n "Alguém por favor pare essa criança" é ganhado no level 300.\n Existe um comando que você poderá ver seu próprio nível, o comando "+eu" mostra seu nível, xp, rank, etc. O comando "+rank" mostra o rank do servidor, relacionado a quem tem mais xp e level.\n\nSistema de Estrelinhas ou Starboard: Quando você ajuda algum Membro ou usuário do discord/servidor, ele poderá reagir a sua mensagem com uma "⭐" que contará como "estrelinhas" pra você. Toda vez que você ganha uma estrela, é exibido em "<751536510347509801>". Você pode usar o comando "mw!estrelinhas" pra ver quantas Estrelinhas você tem, e dependendo da quantidade que você tiver, poderá ganhar cargos. Aqui estão os cargos:\n 5 estrelas = Cargo '⭐'\n 10 estrelas = Cargo '⭐⭐'\n 15 estrelas = Cargo '⭐⭐⭐'\n 20 estrelas = Cargo '⭐⭐⭐⭐'\n 25 estrelas = Cargo '⭐⭐⭐⭐⭐'\n. Se você tiver alguma quantidade de estrelas correspondente, poderá pedir o cargo no chat "<#751552398245494884>". Lembre-se, para enviar mensagem nesse chat, você precisará do level 5.\n\nO servidor permite que usuários, membros, jogadores e etc denunciem ou reportem usuários do discord, servidor e do mini world. O canal utilizado é "<#1049344816116416563>".\n\n O servidor tem um canal de "ajuda" para todos aqueles que tiverem dúvidas, precisarem de ajudar, e etc pedir em "<#751536512453181562>".\n\nO jogo Mini World: Creata é chamado por: Mw, Mini World ou Mini World Block ART e é um jogo sandbox gratuito lançado em 2017 e agora conta com centenas de milhões de jogadores registrados em mais de 30 países. Como o nome sugere, a criação é o valor central do jogo, onde os jogadores podem criar tudo no metauniverso usando os objetos e ferramentas fornecidos. Jogos instantâneos de qualidade dos nossos jogadores, aventuras, estruturas diversas, mecanismos customizados fazem parte da criação. Somos apaixonados por construir um ecossistema inclusivo com uma infinidade de conteúdo gerado por usuários e conectar pessoas através do jogo.\n\nO Mini World permite a criação de Mapas, e cada jogador é definido por um UID (Id de jogador) e os mapas usam Gatilhos ou Scripts  para a criações de sistemas.Aqui está a explicado da API feita em LUA Utilizada nos Mapas:\nComo escrever um Evento:\nScriptSupportEvent:registerEvent([[EventName]],callbackFunctionName)\n\nTodos os parâmetros são enviados atravéz de uma única variável. (Lembre-se, todos os parametros são enviados em uma única variável, exemplo: x.blockid, x.itemid, etc)\nExemplo de utilização de eventos: \nfunction ContainerChanges (event)\nlocal blockid , itemid = event.blockid , event.itemid\nlocal x , y , z = event.x , event.y , event.z\nend\nScriptSupportEvent:registerEvent([[Backpack.ItemChange]],ContainerChanges)\nLista de eventos e seus paremettos relacionado a "World"(lembre-se "World" já é um class definido):\n"Backpack.ItemChange" (Parâmetros: blockid, itemid, itemnum, x, y, z) Quaisquer alterações de itens em qualquer contêiner\n"Backpack.ItemPutIn" (Paremetros: blockid, itemid, itemnum, x, y, z) Quaisquer itens colocados em qualquer recipiente\n"Backpack.ItemTakeOut" (Parâmetros: blockid, itemid, itemnum, x, y, z) Quaisquer itens retirados de qualquer contêiner.\n\nFunções relacionadas a "World":\n"World:isDaytime()" (Retorna: code: number) Verifique se é dia\n"World:isCustomGame()" (Retorna: code: number) Verifique se é um jogo personalizado\n"World:isCreativeMode()" (Retorna: code: number) Verifique se é o modo criativo.\n"World:isGodMode()" (Return: code: number, boolean) Verifique se é o modo deus\n"World:isExtremityMode()" (Return: code: number, boolean) Verifique se é o modo de extremidade\n"World:isFreeMode()" (Return: code: number, boolean) Verifique se é modo livre\n"World:isSurviveMode()" (Return: code: number, boolean) Verifique se é o modo de sobrevivência para um jogador\n"World:isCreateRunMode()" (Return: code: number, boolean) Verifique se é criativo no modo de sobrevivência\n"World:getHours()" (Return: code: number, hours: number) Obtenha a hora atual do jogo (horas)\n"World:setHours(hour: number)" (Return: code: number) Defina a hora atual do jogo (horas)\n"World:getCameraEditState()" (Return: code: number, state: number) Obtenha o estado de edição da câmera\n"World:setCameraEditState(state: number)" (Return: code: number) Defina o estado de edição da câmera\n"World:getCustomCameraConfig()" (Return: code: number, config: CameraEditState) Obtenha configuração de câmera personalizada\n"World:getRangeXZ()" (Return: code: number, startX: number, startZ: number, endX: number, endZ: number) Obtenha o intervalo do bloco (pedaço)\n"World:getRayBlock(srcx: number, srcy: number, srcz: number, face: number, distance: number)" (Return: code: number, blockid: number) Obtenha os atores no intervalo especificado\n"World:getPlayerTotal(alive: number)" (Return: code: number, num: number, array: table) Obtenha todos os jogadores\n"World:randomOnePlayer(alive: number)" (Return: code: number, playerid: number) Selecione aleatoriamente um jogador\n"World:despawnActor(objid: number)" (Return: code: number) Remover um ator\n"World:spawnCreature(x: number, y: number, z: number, actorid: number, num: number)" (Return: code: number, objids: table) Gere criaturas no local especificado\n"World:despawnCreature(objid: number)" (Return: code: number) Remover uma criatura\n"World:spawnItem(x: number, y: number, z: number, itemid: number, num: number)" (Return: code: number, objid: number) Gere itens no local especificado\n"World:despawnItemByBox(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number)" (Return: code: number) Remova itens dentro da área especificada\n"World:despawnItemByObjid(objid: number)" (Return: code: number) Remover um item pelo seu ID\n"World:spawnProjectile(shooter: number, itemid: number, x: number, y: number, z: number, dstx: number, dsty: number, dstz: number, speed: number)" (Return: code: number, objid: number) Gerar um projétil\n"World:spawnProjectileByDir(shooter: number, itemid: number, x: number, y: number, z: number, dstx: number, dsty: number, dstz: number, speed: number)" (Return: code: number, objid: number) Gere um projétil por direção\n"World:calcDistance(pos1: table, pos2: table)" (Return: code: number, distance: number) Calcular a distância entre dois locais\n"World:playParticleEffect(x: number, y: number, z: number, particleId: number, scale: number)" (Return: code: number) Reproduza um efeito de partícula na posição especificada\n"World:stopEffectOnPosition(x: number, y: number, z: number, particleId: number)" (Return: code: number) Pare um efeito de partícula na posição especificada\n"World:setEffectScaleOnPosition(x: number, y: number, z: number, particleId: number, scale: number)" (Return: code: number) Defina a escala de um efeito de partícula na posição especificada\n"World:randomParticleEffectID()" (Return: code: number, result: number) Obtenha aleatoriamente um ID de efeito de partícula\n"World:playSoundEffectOnPos(pos: table, soundId: number, volume: number, pitch: number, isLoop: boolean)" (Return: code: number) Reproduzir um efeito sonoro na posição especificada\n"World:stopSoundEffectOnPos(pos: table, soundId: number)" (Return: code: number) Pare um efeito sonoro na posição especificada\n"World:getLightByPos(x: number, y: number, z: number)" (Return: code: number, lightlv: number) Obtenha a intensidade da luz na posição especificada\n"World:setBlockLightEx(x: number, y: number, z: number, lv: number)" (Return: code: number) Defina a intensidade da luz na posição especificada\n"World:randomSoundID()" (Return: code: number, soundid: number) Obtenha aleatoriamente um ID de som\n"World:randomWeatherID()" (Return: code: number, wtype: number) Obtenha aleatoriamente um ID do tipo de clima\n"World:getLocalDate(eventDate: EVENTDATE)" (Return: code: number, year: number) Obtenha a data local\n"World:getLocalDateString()" (Return: code: number, date: string) Obtenha a data local completa\n"World:getServerDate(eventDate: EVENTDATE)" (Return: code: number, year: number) Obtenha a data do servidor\n"World:getServerDateString()" (Return: code: number, date: string) Obtenha a data completa do servidor\n"World:getDateFromTime(time: number, eventDate: EVENTDATE)" (Return: code: number, year: number) Converter um carimbo de data/hora em uma unidade de tempo específica\n"World:getDateStringFromTime(time: number)" (Return: code: number, date: string) Converter um carimbo de data/hora em uma data completa\n"World:SetTimeVanishingSpeed(speed: number)" (Return: code: number) Defina a velocidade do lapso de tempo do camarote\n"World:SetSkyBoxTemplate(value: number)" (Return: code: number) Defina o modelo do camarote\n"World:SetSkyBoxMaps(time: number, itype: number, url: string)" (Return: code: number) Defina a textura da skybox\n"World:SetSkyBoxColor(time: number, ittype: number, color: string)" (Return: code: number) Defina os parâmetros de cores da skybox\n"World:SetSkyBoxAttr(time: number, itype: number, value: number)" (Return: code: number) Defina os parâmetros do atributo skybox\n"World:SetSkyBoxFilter(time: number, itype: number, value: number)" (Return: code: number) Defina os parâmetros do filtro da skybox\n"World:namedescribe(id: string)" (Return: code: number, str: string) Obtenha a string padrão\n"World:setScriptVar(index: number, val: any)" (Return: code: number) Defina parâmetros de script para uso personalizado\n"World:getScriptVar(index: number)" (Return: code: number, val: any) Obtenha parâmetros de script para uso personalizado\n"World:sendScriptVars2Client()" (Return: code: number) Faça upload dos parâmetros de script definidos\n"World:addRenderGlobalEffect(path: string)" (Return: code: number) Adicione um efeito global\n"World:removeRenderGlobalEffect(path: string)" (Return: code: number) Remover um efeito global\n"World:setRenderGlobalEffectPos(effectid: string, x: number, y: number, z: number)" (Return: code: number) Número do código\n "World:setRenderGlobalEffectScale(effectid: string, scalex: number, scaley: number, scalez: number)" (Return: code: number) Defina a escala de um efeito global\n"World:msgBox(msg: string)" (Return: code: number) Mostrar uma caixa de mensagem\n"World:splitStr(str: string, mark: string)" (Return: code: number, strs: table) Dividir uma string\n\nFunções do class "WorldContainer" (lembrando que já é definido).\n"WorldContainer:addFurnace(x:number, y:number, z:number)" Adicione uma fornalha\n"WorldContainer:removeFurnace(x:number, y:number, z:number)" Remova a fornalha\n"WorldContainer:checkFurnace(x:number, y:number, z:number)" Verifique se é uma fornalha\n"WorldContainer:getFurnaceHeatPercent(x:number, y:number, z:number)" Obtenha a porcentagem de calor do forno\n"WorldContainer:getFurnaceMeltPercent(x:number, y:number, z:number)" Obtenha a porcentagem de fusão do forno\n"WorldContainer:addStorageBox(x:number, y:number, z:number)" Adicione caixas de armazenamento\n"WorldContainer:removeStorageBox(x:number, y:number, z:number)" Remova a caixa de armazenamento\n"WorldContainer:checkStorage(x:number, y:number, z:number)" Verifique se é uma caixa de armazenamento\n"WorldContainer:clearStorageBox(x:number, y:number, z:number)" Esvazie a caixa de armazenamento `;

    let infoBot = `Você é um Robô/Bot do servidor Mini World: Creata Português do Discord, logo, você terá uma lista de comandos e sistemas. O bot se chama "Ayami" e foi desenvolvido por ThallesKraft`

    let mensagensParaAPI = [{
      role: "user",
      content: x
    },{
      role: "user",
      content: infoServer
    }]

    await message.channel.sendTyping();
    const respostaAPI = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.openai}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: mensagensParaAPI
        })
      });
const dadosRespostaAPI = await respostaAPI.json();

    const respostaBot = dadosRespostaAPI.choices[0].message.content;

    const numeroQuebrasDeLinha = respostaBot.split("\n").length - 1;

    let embed = new EmbedBuilder()
    .setTitle("Utilização da OpenAI")
    .addFields({
      name: "Pergunta",
      value: `${args.join(" ")}`
    },{
      name: "Canal",
      value: `${message.channel}`
    })
    .setColor("Blue")
    .setTimestamp()
    .setAuthor({name: `${message.author.globalName}`, iconURL: `${message.author.displayAvatarURL()}`})

    let data;
    let row = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
        .setLabel("Mensagem")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
      )

    if (respostaBot.length > 550 || numeroQuebrasDeLinha > 5) {
      const thread = await message.startThread({
        name: `${args.join(" ")}`,
        autoArchiveDuration: 60,
        type: ChannelType.PrivateThread,
        reason: 'response',
      });

      thread.send({
        content: `${respostaBot}`
      })
    } else {
    message.reply({
        content: `${respostaBot}`
      })
    }

    canal.send({
      embeds: [embed],
      components: [row]
    })
  }
}