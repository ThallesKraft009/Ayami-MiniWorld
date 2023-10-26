
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "shardError",

  run: async (client, error, id) => {
    // code

    console.log(
      "\n Shard error: " + id + "\n",
      error
    );
  },
};