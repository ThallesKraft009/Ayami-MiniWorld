const db = require("../../mongodb/user.js")


const Message = async(m) => {
 let message = m.d
  if (message.author.bot) return;
  if (message.channel_id === "767888039552352297") return;
  
  let userdb = await db.findOne({
    userID: message.author.id
  })
  
  if (!userdb){
    let newuser = new db({ userID: message.author.id })

    await newuser.save();

    userdb = await db.findOne({
    userID: message.author.id
  })
  }

  userdb.msg.de_2024 = userdb.msg.de_2024 + 1;
  userdb.conquista.ultimoChannel = message.channel_id;

  


  

       await userdb.save();
}

module.exports = { Message };