import { removeReaction } from "../functions/starboard.js";
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageReactionRemove",

  run: async (client, reaction, user) => {
    // code

  //  console.log("Reac")

  return removeReaction(reaction, user);
    
  },
};