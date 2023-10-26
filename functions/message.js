import { client } from "../index.js";

async function messageCollector(func){
  client.on("messageCreate", async(msg) => {
    try {
      await func(msg);
    } catch (err) {
      message.reply({
        content: `**Ocorreu um erro.**\`\`\`js\n${err}\n\`\`\``
      })
    }
  })
}

export { messageCollector };