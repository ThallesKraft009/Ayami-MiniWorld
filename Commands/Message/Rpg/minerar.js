import { PermissionFlagsBits } from "discord.js";
import Collector from '../../../functions/collector.js';
import db from '../../../mongodb/user.js';

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "minerar",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    
  },
};