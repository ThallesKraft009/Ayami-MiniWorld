const db = require("../../mongodb/user.js")
const DiscordRequest = require("../../settings/request.js")
const channel = "1195332672935960586";
let guild = `1088390786690846752`;
const MemberUpdate = async function(data){

  if (true) return;
  //console.log(data.d)
  let i = data.d;

  let userdb = await db.findOne({
        userID: i.user.id
      })

      if (!userdb){
        let newuser = new db({
          userID: i.user.id
        });

        await newuser.save();

        userdb = await db.findOne({
        userID: i.user.id
      })
      }
  console.log(i.communication_disabled_until)

      if (!userdb.timeout) return;

       // if (!userdb.timeout) return;
        console.log(userdb.timeout)

        

        let user = await DiscordRequest(`/guilds/${guild}/members/${i.user.id}`,{
    method: "GET"
  });

        user = await user.json();

              let embed = {
        title: "Aprendeu a falar (novamente)! 💬",
        description: `<@${user.user.id}> foi retirado do silenciamento!
        
**Por:** Ayami
        
**Motivo:** Após muito tempo silenciado... o usuário finalmente aprendeu a falar novamente! Espero que dessa vez ele fale coisas interessantes e legais para que não seja silenciado de novo!`,
        author: {
          name: `${user.user.username}`,
          icon_url: `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
        },
        thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
        },
        footer: {
          text: `ID do Usuário: ${user.user.id}`
        },
        color: 65535,
        image: {
          url: "https://cdn.discordapp.com/emojis/757249316518756435.gif?v=1"
        }
              }

        userdb.timeout = false;
        await userdb.save();

        await DiscordRequest(`/channels/${channel}/messages`, {
        method: "POST",
        body: {
          content: `<@${user.user.id}>`,
          embeds: [embed]
        }
      })
      
}


module.exports = { MemberUpdate }