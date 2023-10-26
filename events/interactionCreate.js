import { InteractionType, PermissionsBitField, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder } from "discord.js";
//import { db } from '../mongodb/guild.js';

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "interactionCreate",

  run: async (client, interaction) => {
    // code
    if (interaction.user.bot || !interaction.guild) return;
    if (interaction.type == InteractionType.ApplicationCommand) {
      const command = client.scommands.get(interaction.commandName);
      if (!command) {
        return client.send(interaction, {
          content: `\`${interaction.commandName}\` está inválido`,
          ephemeral: true,
        });
      } else {
        if (
          command.userPermissions &&
          !interaction.member.permissions.has(
            PermissionsBitField.resolve(command.userPermissions)
          )
        ) {
          return client.sendEmbed(
            interaction,
            `Você não tem a permissão necessária!`
          );
        } else if (
          command.botPermissions &&
          !interaction.guild.members.me.permissions.has(
            PermissionsBitField.resolve(command.botPermissions)
          )
        ) {
          return client.sendEmbed(
            interaction,
            `Eu não tenho permissão!`
          );
        } else {
          command.run(client, interaction);
        }
      }
    }
  },
};

function getByKeyName(array, keyName) {
   for (let i = 0; i < array.length; i++) {
      const obj = array[i];
      if (obj.hasOwnProperty(keyName)) {
         return obj[keyName];
      }
   }
   return undefined; // Se não encontrar a chave, retorna undefined
  }