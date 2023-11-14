import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} from "discord.js";
import settings from "../settings/config.js";
import { ClusterClient, getInfo } from 'discord-hybrid-sharding'


export class Bot extends Client {
  constructor() {
    super({
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent
      ],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
      ],
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
      failIfNotExists: false,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        users: [],
        roles: [],
        repliedUser: false,
      },
    });

    this.cluster = new ClusterClient(this)
    this.config = settings;
    this.scommands = new Collection();
    this.mcommands = new Collection();
    this.cooldowns = new Collection();
    this.events = new Collection();
  }

  async build(token) {
    await loadHandlers(this);
    this.login(token);
  }

  async sendEmbed(interaction, data, ephemeral = false) {
    return await this.send(interaction, {
      embeds: [
        new EmbedBuilder()
          .setColor(this.config.embed.color)
          .setDescription(`${data.substring(0, 3000)}`),
      ],
      ephemeral: ephemeral,
    });
  }

  getFooter(user) {
    return {
      text: `Requested By ${user.username}`,
      iconURL: user.displayAvatarURL(),
    };
  }

  /**
   * @type {import("../index.js").send}
   */
  async send(interaction, data) {
    try {
      if (interaction.deferred || interaction.replied) {
        return await interaction.editReply(data);
      } else {
        return await interaction.reply(data);
      }
    } catch (error) {
      // console.error(error);
      await interaction.deferReply().catch((e) => {});
      return await interaction.editReply(data);
    }
  }
}

async function loadHandlers(client) {
  ["messageHandler", "slashHandler", "eventHandler"].forEach(async (file) => {
    let handler = await import(`./${file}.js`).then((r) => r.default);
    await handler(client);
  });
}