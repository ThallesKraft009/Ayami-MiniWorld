// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs')
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async(readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const avatarData = 'avatar.gif';

        const avatargif = fs.readFileSync(avatarData);

        const avatar = Buffer.from(avatargif);



        await client.user.setAvatar(avatar);



})

  client.login(process.env.token_oficial);