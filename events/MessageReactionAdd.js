import { addReaction } from "../functions/starboard.js";
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageReactionAdd",

  run: async (client, reaction, user) => {
    // code

 //   console.log("Evento Ativado.")

    return addReaction(reaction, user);
    
  },
};