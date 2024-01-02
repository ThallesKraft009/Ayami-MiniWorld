const fs = require("fs");
const { userdb } = require("../../mongodb/user.js")
const CALLBACK = require("../../settings/callback.js");
const DiscordRequest = require("../../settings/request.js");
const components = [];
fs.readdirSync(`./interactions/components/`).forEach(dir => {
    const files = fs.readdirSync(`./interactions/components/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
        let i = require(`../../interactions/components/${dir}/${file}`)

        if (i) {
            components.push(i);
        }
    })
})

const modals = [];
fs.readdirSync(`./interactions/modals/`).forEach(dir => {
    const files = fs.readdirSync(`./interactions/modals/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
        let modal = require(`../../interactions/modals/${dir}/${file}`)

        if (modal) {
            modals.push(modal);
        }
    })
})


const Interaction = async (data, commands) => {

  //console.log(data.d.type)

    if (data.d.type === 3) {

        let id = data.d.data.custom_id;

        let component = components.find(i => id.startsWith(i.customId));

       component.run(data.d, id)

    } else if (data.d.type === 5){
      let id = data.d.data.custom_id;

      let modal = modals.find(i => id.startsWith(i.customId));

      modal.run(data.d, id)
    } else if (data.d.type === 2){

  //    console.log(data.d)

      
let cmd = commands[data.d.data.name];
let command = []
let options = []

try {
    cmd.run(data.d);
} catch (err) {
    console.log(err);
}
    } else if (data.d.type === 4){
      let valor = data.d.data.options[0].options[1].value;

      let choices = [{
        name: `${valor} minuto`,
        value: `${valor}m`
      },{
        name: `${valor} hora`,
        value: `${valor}h`
      },{
        name: `${valor} dia`,
        value: `${valor}d`
      }]

      await DiscordRequest(
        CALLBACK.interaction.response(
          data.d.id, data.d.token
        ), { 
      method: 'POST',
      body: {
        type: 8,
        data: {
        choices: choices
        }
      }
        })
    }
  
}


    module.exports = { Interaction };