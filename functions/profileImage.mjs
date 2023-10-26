import Canvas from "canvas";
import { AttachmentBuilder } from "discord.js";

const Profile = async(member, msg, db, isInteraction) => {
  
  let user =  member;
  let avatarURL = member.avatarURL({ extension: 'png', dynamic: true, size: 2048 });
  
  let nome = member.globalName;
  let money = db.economia.moedas;
  let estrelinhas = db.estrelas;
  let min = db.perfil.sobremim;

let perfil1 = db.perfil.fundo;
if (perfil1 === undefined) perfil1 = 'https://imgur.com/rz7Doar.png' 



      const canvas = Canvas.createCanvas(850, 500);
      const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(perfil1); 


      ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 



      ctx.strokeStyle = '#0066FF'; 

      ctx.strokeRect(0, 0, canvas.width, canvas.height); 
 
      ctx.textAlign = "left"; 

      ctx.font = '40px arial'; 

      ctx.fillStyle = "rgb(253, 255, 252)"; 

      ctx.fillText(`${nome}`, 190, 60);

      ctx.textAlign = "left"; 

      ctx.font = '32px arial'; 

      ctx.fillStyle = "rgb(253, 255, 252)";


      ctx.fillText(`MiniMoedas: 
        ${money.toLocaleString()}`, 190, 100)

      ctx.textAlign = "left"; 

      ctx.font = '32px arial'; 

      ctx.fillStyle = "rgb(253, 255, 252)";

      ctx.fillText(`Estelinhas:
        ${estrelinhas}`, 550, 100)

      ctx.textAlign = "left"; 

      ctx.font = '32px arial'; 

      ctx.fillStyle = "rgb(253, 255, 252)"; 

      ctx.fillText(`${min}`, 10, 400); 



      ctx.arc(100, 80, 65, 0, Math.PI * 2, true); 

      ctx.strokeStyle = "#0066FF"; 

      ctx.lineWidth = 6; 

      ctx.stroke(); 

      ctx.closePath(); 

      ctx.clip(); 

      const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 15, 10, 175, 175); 
  
        const file = new AttachmentBuilder(
          canvas.toBuffer(), 
          {
            name: "perfil.png"
          }
        ); 

    
if (!isInteraction){
   return await msg.reply({
    content: `${msg.author}`,
    files: [file]
  })
} else {
  await msg.editReply({
    content: `${member}`,
    files: [file]
  })
}
}

export { Profile };