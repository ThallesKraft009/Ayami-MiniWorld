import { config } from "dotenv";
config();
import { Bot } from "./handlers/Client.js";

export const client = new Bot();

// login bot
client.build(client.config.TOKEN);
//console.log(client.user)

process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
});

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Promessa não tratada:', reason);
});