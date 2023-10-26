import { ActivityType } from "discord.js";
import { connect } from "mongoose"
import c from "colors"
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "shardReady",

  run: async (client, shardId) => {

    console.log(c.cyan(`Shard ${shardId} ready`));

  },
};