
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "shardDisconnect",

  run: async (client, event, id) => {
    // code

    console.log(
      "\n Shard Disconnected: " + id + "\n",
      event
    );
  },
};