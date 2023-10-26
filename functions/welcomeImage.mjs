import Canvas from "canvas";
import fs from "fs";
import { client } from "../index.js";
import { AttachmentBuilder } from "discord.js";

async function createWelcomeImage(data) {
  console.log(data)
  const canvas = Canvas.createCanvas(1024, 500);
  const ctx = canvas.getContext('2d');
  ctx.font = '72px Montserrat';
  ctx.fillStyle = '#ffffff';

  const background = await Canvas.loadImage("image/welcome.png");
  ctx.drawImage(background, 0, 0, 1024, 500);

  ctx.beginPath();
  ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();

  ctx.font = '42px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${data.name}`, 512, 410);

  ctx.font = '32px Arial';
  ctx.fillText(`Você é o membro ${data.memberCount}`, 512, 455);

  ctx.beginPath();
  ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatarImage = await Canvas.loadImage(data.avatar);
  ctx.drawImage(avatarImage, 393, 47, 238, 238);

  let channel = client.channels.cache.get(data.channelId);

  let file = new AttachmentBuilder(
      canvas.toBuffer(), {
      name: "welcome.png"
    })

  channel.send({
    content: `<@${data.userId}>`,
    files: [file]
  })
}

export { createWelcomeImage };