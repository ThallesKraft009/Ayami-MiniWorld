module.exports = {

  /////////////// MESSAGE ////////////////

  message: {
    response: (channelId) => {
      return `/channels/${channelId}/messages`
    },

    reaction: {
      remove: (channelId, messageId, emoji) => {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`
      },

      add: (channelId, messageId, emoji) => {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`
      }
    }
  },

  //////////////// CHANNEL ///////////////
  channel: {
    getMessage: (channelId, messageId) => {
      return `/channels/${channelId}/messages/${messageId}`
    }
  },

  ////////////// USER /////////////////////
  user: {
    info: (userId) => {
      return `/users/${userId}`
    }
  },

  ///////////// GUILD ///////////////////
  guild: {
    get: (guildId) => {
      return `/guilds/${guildId}`
    },

    userGet: (guildId, userId) => {
      return `/guilds/${guildId}/members/${userId}`
    },

    rolesGet: (guildId) => {
      return `/guilds/${guildId}/roles`
    },

    roleGet: (guildId, roleId) => {
      return ``
    }
  },

   /////////////////// INTERACTION ////////

  interaction: {
    response: (interactionId, interactionToken) => {
      return `/interactions/${interactionId}/${interactionToken}/callback`
    },

    commands: (clientId) => {
      return `/applications/${clientId}/commands`
    },

    commandsDelete: (clientId, cmdId) => {
      return `/applications/${clientId}/commands/${cmdId}`
    }
  }


}