const { WebSocketManager, WebSocketShardEvents } = require('@discordjs/ws');
const { REST } = require("@discordjs/rest")
const fs = require('fs');
const colors = require('colors');
const CONFIG = require('./settings/client.js');

const token = CONFIG.token;
const intents = CONFIG.intents

const rest = new REST().setToken(token);

const Ayami = async function(){
  
const manager = new WebSocketManager({
	token: token,
	intents: intents,
	rest,
});

manager.on(WebSocketShardEvents.Dispatch, (event) => {
	require("./events/index.js")(event.data);
  
});

await manager.connect();

}


Ayami()

process.on('uncaughtException', (err) => {
  console.error('Erro não capturado:', err);
  // Trate o erro ou encerre o processo, dependendo do caso.
})