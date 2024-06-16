const { connect } = require("mongoose");
const CALLBACK = require("../settings/callback.js");
const DiscordRequest = require("../settings/request.js");
const { mongo, clientId } = require("../settings/client.js");
const fs = require("fs")
const c = require("colors")
const { Message } = require("./GUILD/messageCreate.js");
const { Interaction } = require("./GUILD/interactionCreate.js");
const { MessageReactionAdd } = require("./GUILD/messageReactionAdd.js");
const { MessageReactionRemove } = require("./GUILD/messageReactionRemove.js");
const { MuralDaVergonha, AutoMod } = require("./GUILD/AuditLog.js")
const { MemberUpdate } = require("./GUILD/UserUpdate.js")
const ReactionEvent = require("../functions/reactionEvent.js");
const Achievements = require("../functions/achievements.js");
const commandsData = [];
const commandsJson = [];
const commands = []

fs.readdirSync(`./Commands/Slash/`).forEach(dir => {
    const files = fs.readdirSync(`./Commands/Slash/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
      let cmd = require(`../Commands/Slash/${dir}/${file}`);

        if (cmd) {
            commands[cmd.data.name] = cmd;
            commandsData.push(cmd.data);
        }
});
});

const isSameCommand = (cmd1, cmd2) => {
    // Lógica para verificar se dois comandos são iguais, considerando subcomandos e grupos
    return cmd1.name === cmd2.name &&
        cmd1.type === cmd2.type &&
        ((cmd1.options && cmd1.options.length > 0) ? JSON.stringify(cmd1.options) === JSON.stringify(cmd2.options) : true);
};

const Evento = new ReactionEvent();
Evento.start();

const Conquistas = new Achievements();

module.exports = async (data) => {
    let { t, d } = data;

    if (t === "READY") {
        console.log(c.cyan("Client está Online"));
        connect(mongo);

       let apiCommands = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
            method: "GET"
        });

        apiCommands = await apiCommands.json();

/*
        commandsData.map(async (localCommand) => {
            // Verifica se o comando já existe na API, considerando subcomandos e grupos
            if (!apiCommands.some(apiCommand => isSameCommand(apiCommand, localCommand))) {
                let cmdResponse = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
                    method: "POST",
                    body: localCommand
                });

                cmdResponse = await cmdResponse.json();*/
                commandsJson.push(apiCommands);
           
        

        
    } else if (t === "MESSAGE_CREATE") {
       Evento.messageEvent(data.d);

     Conquistas.secretas(0, data.d)
     Conquistas.chat_geral(0, data.d);
      
   //   console.log(data.d.author)
        return Message(data);
    } else if (t === "INTERACTION_CREATE") {
        return Interaction(data, commands);
    } else if (t === "MESSAGE_REACTION_ADD"){
    Conquistas.secretas(2, data.d)
       Evento.reaction(data.d);
       return MessageReactionAdd(data);
    } else if (t === "MESSAGE_REACTION_REMOVE"){
      return MessageReactionRemove(data);
    } else if (t === "GUILD_AUDIT_LOG_ENTRY_CREATE"){
    return MuralDaVergonha(data);
    } else if (t === "AUTO_MODERATION_ACTION_EXECUTION"){
     return AutoMod(data);
    } else if (t === "GUILD_MEMBER_UPDATE"){
      Conquistas.chat_geral(1, data.d)
      Conquistas.level(data.d)
      return MemberUpdate(data);
    } else {
     // console.log(t)
    }
};