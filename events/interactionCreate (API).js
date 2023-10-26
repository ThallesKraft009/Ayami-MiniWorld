import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } from 'discord.js'


/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "interactionCreate",

  run: async (client, i) => {
    if (i.isButton()){
      if (i.customId === "aula-eventos"){
        let menu = new ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
			.setCustomId('event-list')
			.setPlaceholder('Selecione a Cartegoria')
			.addOptions(
        new StringSelectMenuOptionBuilder()
					.setLabel('')
					.setDescription('The dual-type Grass/Poison Seed Pokémon.')
					.setValue('bulbasaur'),
				
      )
			
        )
      }
    }
  },
};