import { Colors } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const settings = {
  TOKEN: process.env.token || "Bot_Token",
  PREFIX: "mw!",
  Owners: [""],
  hospedagem: {
    apiKey: process.env.apiKey || "",
    apiId: process.env.apiId || ""
  },
  Slash: {
    Global: true,
    GuildID: process.env.GuildID || "1134057488518500374",
  },
  embed: {
    color: Colors.Blurple,
    wrongColor: Colors.Red,
  },
  emoji: {
    success: "✅",
    error: "❌",
    fada_da_lua: "<:fadadalua:1147585547620057140>",
    kaka: "<:kaka:1147585577298972745>",
    lynn: "<:lynn:1147585604436099152>",
    misra: "<:misra:1147585636623196290>"
  },

  channels: {
    welcome: "751536504022630531"
  },

  staff: [
    "423095096897175552", 
    "1107374090119028808", 
    "831933304366301224",
    "639594268947906589",
    "1040802284306702367",
    "850134703473426493"
  ]
};

export default settings;
