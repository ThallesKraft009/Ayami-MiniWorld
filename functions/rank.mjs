import Discord from "discord.js"
import Canvas from "canvas"
import { registerFont } from "canvas"
/*import { join } from "path"

const path = join(__dirname, "..", "fonts", "oswald.ttf");*/
registerFont("fonts/oswald.ttf", { family: 'oswald' });
import User from '../mongodb/user.js'
let msg;

async function RankImage(client, {response, type, slice, edit, buttons, isInteraction }){

    let userdb = await User.find({});
  if (type === "money"){
    userdb.sort((a,b) => b.economia.moedas - a.economia.moedas)
  } else if (type === "estrelinhas"){
    userdb.sort((a, b) => b.estrelas - a.estrelas)
  } else if (type === "pontosNatal") {
    userdb.sort((a, b) => b.pontos_natal - a.pontos_natal)
  } else if (type === "mensagens"){
    userdb.sort((a, b) => b.msg.total - a.msg.total)
  }
    userdb = userdb.slice(slice.x, slice.y)
    
    const canvas = Canvas.createCanvas(800, 600)
    const ctx = canvas.getContext("2d")
        
    const serverIcon = await Canvas.loadImage(`https://cdn.discordapp.com/icons/${response.guild.id}/${response.guild.icon}.png?size=1024`)
    ctx.drawImage(serverIcon, 515, -102.5, 285, 285)
    
    const background = await Canvas.loadImage("https://i.imgur.com/wIiuWJP.png")
    ctx.drawImage(background, 0, 75, canvas.width, canvas.height)

    const layout = await Canvas.loadImage("https://i.imgur.com/RCBNEMa.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

    ctx.font = '33px oswald';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${response.guild.name}`, 265 - response.guild.name.length * 8, 50)
    
    for(let i = 0; i < userdb.length; i++){

    const user = await client.users.fetch(userdb[i].userID)

      let data = {
        nome: "",
        total: 0
      }

        if (type === "money"){
          data.nome = "MiniMoedas"
          data.total = userdb[i].economia.moedas
        } else if (type === "estrelinhas"){
          data.nome = "Estrelinhas"
          data.total = userdb[i].estrelas
        } else if (type === "pontosNatal"){
          data.nome = "Pontos de Natal"
          data.total = userdb[i].pontos_natal
        } else if (type === "mensagens"){
          data.nome = "Mensagens"
          data.total = userdb[i].msg.total
        }
     
    const cordenada = i * 105
    ctx.save()

    ctx.font = '40px oswald';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${user.username}`, 290, cordenada + 115)
    ctx.font = '32px oswald';
    ctx.fillText(`${data.total} ${data.nome}`, 300, cordenada + 150)
    ctx.font = '24px oswald';
    ctx.fillText(`ID: ${user.id}`, 310, cordenada + 175)
     
    ctx.beginPath(); 
    ctx.moveTo(0, cordenada + 75);
    ctx.lineTo(265, cordenada + 75);
    ctx.lineTo(285, cordenada + 180);
    ctx.lineTo(0, cordenada + 180);
    ctx.lineTo(0, cordenada + 75);
    ctx.closePath(); 
    ctx.clip();

    const userAvatar = await Canvas.loadImage(`${user.displayAvatarURL({ forceStatic:true, extension: "png", size: 1024})}`) 
    ctx.drawImage(userAvatar, 0, cordenada, 285, 285)
    ctx.restore()
     }
    
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'perfil.png'}) 
  
  //  interaction.editReply({ files: [attachment] })

  if (edit) {
       await response.editReply({
        files: [attachment]
      })
  } else {
    msg = await response.reply({
      files: [attachment],
      content: `${isInteraction ? `${response.user}` : `${response.author}`}`
    })

      return msg
  }
                           }

      export { RankImage }