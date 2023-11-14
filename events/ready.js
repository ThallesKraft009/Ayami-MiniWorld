import { ActivityType } from "discord.js";
import { connect } from "mongoose"
import c from "colors"
import axios from "axios"
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "ready",

  run: async (client) => {
    console.log(c.green(`> ${client.user.tag} is Ready !!`));
    client.user.setActivity({
      name: `Mini World: CREATA`,
      type: ActivityType.Watching,
    });

   /* setInterval(() => {
      axios.post('https://testes-website.thalleskraft.repl.co/api/cluster', {
  "status": "Teste",
  "status_type": "Jogando",
  "cluster_0": "Online",
  "cluster_1": "Online",
  "cluster_2": "Online"
}, 15000)
    })*/

    connect(process.env.mongo)

  },
};