const DiscordRequest = require("../settings/request.js");
const CALLBACK = require("../settings/callback.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const mongodb = require("../mongodb/user.js");

module.exports = class ReactionEvent {
  constructor() {
    this.time = {};
    this.emoji = "";
    this.users = [];
    this.mensagens = 0;
    this.ms = 30000;
    this.i = 0;
  }

  async start() {
    this.i = Math.floor(Math.random() * 50) + 1;
    this.emoji = getRandomEmoji(this.i);
    this.time = {};
   // console.log("Precisa de:", this.i, " mensagens!");
  }

  async messageEvent(message) {

    let channels = ["798211985858756679", "767888039552352297", "1000553431381065798", "1099834072802537492", "1099841811322765442"];

    if (channels.includes(message.channel_id)) return;
    
    this.time = setTimeout(() => {
      this.users = [];
      this.mensagens = 0;
    }, this.ms);

    this.users[message.author.id] = true;
    this.mensagens++;

    if (this.mensagens === this.i) {
      //console.log("Total mensagens recebidas. Emoji:", this.emoji);

      await DiscordRequest(CALLBACK.message.reaction.add(message.channel_id, message.id, this.emoji), {
        method: "PUT"
      });

      await db.set(`msg_${message.channel_id}`, this.emoji);

      this.i = Math.floor(Math.random() * 50) + 1;
    this.emoji = getRandomEmoji(this.i);
    this.time = {};
      console.log(this);
    }

    clearTimeout(this.time);
  }

  async reaction(reaction) {
    if (reaction.member.user.bot) return;
    let userdb = await mongodb.findOne({
      userID: reaction.member.user.id
    });

  //  console.log(reaction)

    if (userdb) {
      const verification = reaction.member.user.bot || !this.users[reaction.member.user.id];

      if (this.users[reaction.member.user.id]) {
        switch (reaction.emoji.name) {
          case "💃":
            userdb.carnaval_pontos_2024 += 1;
            break;
          case "🪇":
            userdb.carnaval_pontos_2024 += 3;
            break;
          case "🎉":
            userdb.carnaval_pontos_2024 += 5;
            break;
          case "🎭":
            userdb.carnaval_pontos_2024 += 10;
            break;
          default:
            break;
        }

        await userdb.save();
        userdb = await mongodb.findOne({
      userID: reaction.member.user.id
    });
        
        
      }
    }
  }
};

function getRandomEmoji(randomNum) {
  if (randomNum < 20) {
    return '💃'; // 40% chance
  } else if (randomNum < 30) {
    return '🪇'; // 30% chance
  } else if (randomNum < 40) {
    return '🎉'; // 20% chance
  } else {
    return '🎭'; // 10% chance
  }
}
