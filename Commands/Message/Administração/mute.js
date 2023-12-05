import { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } from "discord.js";
import ms from "ms";

import Collector from "../../../functions/collector.js";
/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "mute",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let user;
    let author = message.guild.members.cache.get(message.author.id)

    if (!author.permissions.has([PermissionsBitField.Flags.ManageMessages])) return;

  //  await message.delete();
    
    if (!message.mentions.users.first()){
      user = args[0]
    } else {
      user = message.mentions.users.first();
    };

    if (!user) return message.reply({
      content: `Você precisa mencionar alguém para silenciar! Exemplo: \`mw!mute [@user | userId] [1m, 1h, 1d] [motivo | opcional]\``
    }).then(i => setTimeout(() => {i.delete()}, ms("20s")))

    user = message.guild.members.cache.get(user.id)

    let time = args[1];
    time = ms(`${time}`);

    if (!time) return message.reply({
      content: `Você precisa inserir o tempo para silenciar! Exemplo: \`mw!mute [@user | userId] [1m, 1h, 1d] [motivo | opcional]\``
    }).then(i => setTimeout(() => {i.delete()}, ms("20s")))

    let motivo = args.slice(2).join(" ") || "Não definido.";

    //await message.delete()

    let response = await message.reply({
      content: `Você realmente quer silenciar o usuário **\`${client.users.cache.get(user.id).globalName} (${user.id})\`** por **${args[1]}**?`,
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId("muteConfirmar")
          .setLabel("Confirmar")
          .setStyle(ButtonStyle.Success)
        )
      ]
    })

    Collector(async function(i){
      if (i.isButton()){
        if (i.customId === "muteConfirmar"){
          if (i.message.id !== response.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          await i.deferUpdate()
          

          i.editReply({
            content: `**\`${client.users.cache.get(user.id).globalName}\`** foi silenciado por ${i.user}.`,
            components: []
          })

          try {
           /* user.timeout({
              time: time,
              reason: `${motivo} - Silenciado por ${i.user.globalName}.`
            });*/

            user.timeout(time, `${motivo} - Silenciado por ${i.user.globalName}`)

            setTimeout(async() => {
              await message.delete()
              await response.delete()
            }, ms("10s"))

          } catch (err) {
            i.editReply({
              content: `Ocorreu um erro ao tentar silenciar **\`${user.globalName}\`**...\`\`\`js\n${err}\n\`\`\``
            })
          }
        }
      }
    })
  },
};

