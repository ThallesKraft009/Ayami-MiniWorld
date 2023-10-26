import { PermissionFlagsBits,PermissionsBitField, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { db } from "../../../mongodb/gatilhos.js";
import collector from "../../../functions/collector.js";
import DB from "../../../mongodb/user.js";


import Discord from "discord.js";

import vm from "vm";

import { API } from "../../../functions/API.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "criar-gatilho",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let member = message.guild.members.cache.get(message.author.id);
    
  if (!member.permissions.has([PermissionsBitField.Flags.BanMembers])){

    return message.reply({
      content: `Você não tem permissão de **\`Banir Membros\`** para utilizar esse comando.`
    })
  }
    
    let ver;
    let codigoEscolhido;

  let script = await db.findOne({
         guild: message.guild.id
     })
      
     if(!script){
         const newGuild = new db({ guild: message.guild.id })
         await newGuild.save();
         
         script = await db.findOne({ guild: message.guild.id })

       ver = false;
     } else {
       ver = true;
     } 

    let codigos = script.sistema;

    //console.log(script.sistema, script.gatilhos)

  //  let codigos = script.sistema;

    let components;

    if (ver === false) components = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
      .setCustomId("seletorScript")
      .setPlaceholder("Selecione seu Gatilho")
      .addOptions(
        new StringSelectMenuOptionBuilder()
        .setLabel("Criar Gatilho")
        .setValue("0")
        .setDescription("Selecione pra Criar")
        .setEmoji("📌")
      )
    );

    let menu = async(codigos_) => {
      
    let data = codigos_;

      let options = [];

      options.push({
        label: "Criar Gatilho",
        value: "0",
        description: "Selecione pra Criar",
        emoji: "📌"
      })

      let x = 0;

      data.forEach(function(i){
        x=x+1;
        options.push({
          label: i.name,
          description: "Clique pra Editar",
          value: `${x}`
        })
      })


      /*.forEach((getData)=>{
         codigos.push(getData)
      })*/

     // console.log(codigos)
      components = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("seletorScript")
        .setPlaceholder("Selecione seu Gatilho")
        .addOptions(options)
      )
    }

    if (ver) {
      menu(script.sistema);
    }

   // console.log(components)


    let botoes = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Deletar")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("scriptDeletar"),
      new ButtonBuilder()
      .setLabel("Editar")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("scriptEditar"),
      new ButtonBuilder()
      .setLabel("Salvar")
      .setStyle(ButtonStyle.Success)
      .setCustomId("scriptExecutar")
    );
    

   let msg = await message.reply({
      content: `${message.author} | Criador de Gatilhos`,
      components: [components]
    })

    async function salvar(dataToSave){
      await db.updateOne({
         guild: message.guild.id
     }, { $set: {
         "sistema": dataToSave
     }
     })
    }

      async function Evento(name, func){

        if (name === "messageCreate"){
          codigos[codigoEscolhido].evento = name;

          salvar(codigos);
          
        }
        
      }

    collector(async(interaction)=>{

      if (interaction.isStringSelectMenu()){
        if (interaction.customId === "seletorScript"){

          if (interaction.message.id !== msg.id) return;
          if (interaction.user.id !== message.author.id) return interaction.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
          
          let value = interaction.values[0];

          if (value === "0"){

            codigoEscolhido = codigos.length;

            let modal = new ModalBuilder()
            .setCustomId("editor")
            .setTitle("Editor")

            let name = new TextInputBuilder()
			.setCustomId('name')
			.setLabel("Insira o nome do Gatilho")
		  .setStyle(TextInputStyle.Short)
      .setMaxLength(15)

        name = new ActionRowBuilder()
          .addComponents(name);

            modal.addComponents(name);

            await interaction.showModal(modal);
            
            
          } else {

            value = Number(`${value}`)

           // console.log(value)

           //   if (value === 1) value = 2;

           // console.log(codigos, value)

            let escolha = codigos[value - 1];
            codigoEscolhido = value - 1;

          //  console.log("\n", escolha)
            

           // await interaction.deferUpdate();

            let embed = new EmbedBuilder()
            .setTitle(`${escolha.name}`)
            .setDescription(`Codigo: \`\`\`js\n${escolha.codigo}\n\`\`\``)
            .setColor("Blue")

            interaction.update({
              content: `${interaction.user}`,
              embeds: [embed],
              components: [botoes, components]
            })
          }
        }
          }

      if (interaction.isButton()){
        if (interaction.customId === "scriptEditar"){

          if (interaction.message.id !== msg.id) return;
          if (interaction.user.id !== message.author.id) return interaction.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          let modal = new ModalBuilder()
          	.setCustomId('enviarCodigo')
	      		.setTitle('Editor');

          let escolhido = codigos[codigoEscolhido]
          console.log(codigoEscolhido)

          let optionModal = new TextInputBuilder()
			.setCustomId('code')
			.setLabel("Faça seu código")
			.setStyle(TextInputStyle.Paragraph)
      .setValue(`${codigos[codigoEscolhido].codigo}`)

  optionModal = new ActionRowBuilder()
    .addComponents(optionModal);

          modal.addComponents(optionModal);

          await interaction.showModal(modal);
	
        }

        if (interaction.customId === "scriptExecutar"){

          if (interaction.message.id !== msg.id) return;
          if (interaction.user.id !== message.author.id) return interaction.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          let c = codigos[codigoEscolhido];

          
          let context = {
            client,
            API,
            Evento,
            DB
          };

          vm.createContext(context);
          vm.runInContext(c.codigo, context);

          await interaction.reply({
            content: `Certo, o código está sendo executado.`,
            ephemeral: true
          })
        }

        if (interaction.customId === "scriptDeletar"){

          if (interaction.message.id !== msg.id) return;
          if (interaction.user.id !== message.author.id) return interaction.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          //codigos = 
          codigos.splice(codigoEscolhido, 1);

          menu(codigos);
          salvar(codigos);

          await interaction.deferUpdate();

          interaction.editReply({
            content: "Gatilho deletado, use o comando novamente.",
            embeds: [],
            components: []
          })
        }
      }

        if (interaction.isModalSubmit()){
          if (interaction.customId === "enviarCodigo"){

    let recebido = interaction.fields.getTextInputValue("code");

            codigos[codigoEscolhido].codigo = `${recebido}`;

            salvar(codigos);

            let embed = new EmbedBuilder()
            .setTitle(`${codigos[codigoEscolhido].name}`)
            .setDescription(`Codigo: \`\`\`js\n${recebido}\n\`\`\``)
            .setColor("Blue")

            await interaction.deferUpdate();

            interaction.editReply({
              embeds: [embed]
            })
            
          }
          if (interaction.customId === "editor"){
              let name = interaction.fields.getTextInputValue("name");

            let embed = new EmbedBuilder()
            .setTitle(`${name}`)
            .setDescription(`Codigo:\n\`\`\`js\nnull\n\`\`\``)
            .setColor("Blue")

            

           /* script.sistema.push({
              name: name,
              codigo: `null`
            });
            */

           codigos.push({
              name: name,
              codigo: `null`,
              evento: "null"
            })

            menu(codigos);
            salvar(codigos);

            //console.log(script)
            
          await interaction.deferUpdate();

              interaction.editReply({
                content: `${interaction.user}`,
                embeds: [embed],
                components: [botoes, components]
              })
          }

          
        }
    })

  },
};
