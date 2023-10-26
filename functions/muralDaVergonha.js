import { client } from "../index.js";
import { EmbedBuilder } from "discord.js";

async function timeout(data){
  
  if (data.communicationDisabledUntilTimestamp !== null){

const embed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle(`Parece que alguém ficou mutado🎙👨‍🎤`)
    .setDescription(`**🎣| Mutado(a):** ${data.user.globalName}\n**⌛| Tempo: **\`${data.communicationDisabledUntil}\`**`)
    .setAuthor({ name: `${data.user.globalName}`, iconURL: `${data.user.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({ text: `ID do Membro: ${data.user.id} `})
    .setThumbnail(`${data.user.displayAvatarURL()}`)
                          
    let channel = client.config.channels.mural;
    channel = client.channels.cache.get(channel);

    channel.send({
      embeds: [embed],
      content: `${data.user}`
    });
  }
}

async function ban(data){
  
}

async function kick(data){

}

export { timeout, ban, kick };