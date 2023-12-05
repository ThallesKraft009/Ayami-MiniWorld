import { Player } from "discord-music-player";

function PlayerMusic(client){
const player = new Player(client, {
  leaveOnEmpty: false,
})

  return player;
}

export { PlayerMusic } 