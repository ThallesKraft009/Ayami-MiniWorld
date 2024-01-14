const db = require("../../../mongodb/user.js");
const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const TEMPO_MS = require("ms");
const { Mineração } = require("../../../functions/mineração.js");

module.exports = {
  data: {
    name: "rpg",
    description: "Comandos relacionados ao Rpg",
    type: 1,
    options: [{
      name: "criar",
      description: "Grupo de comandos",
      type: 2,
      options: [{
        name: "mundo",
        description: "Crie o seu próprio mundo no rpg!",
        type: 1,
        options: [{
          name: "nome",
          description: "Insira o nome do seu mundo!",
          type: 3,
          required: true
        }]
      },{
        name: "picareta",
        description: "Crie uma picareta no rpg",
        type: 1,
        options: [{
          name: "nome",
          description: "Qual picareta você quer criar?",
          type: 3,
          choices: [{
            name: "Picareta de Pedra",
            value: "pedra"
          },{
            name: "Picareta de Cobre",
            value: "cobre"
          },{
            name: "Picareta de Mithril",
            value: "mithril"
          }],
          required: true
        }]
      },{
        name: "fornalha",
        description: "Crie uma fornalha no rpg",
        type: 1,
        options: [{
          name: "escolha",
          description: "Escolha qual fornalha deseja criar",
          type: 3,
          choices: [{
            name: "Fornalha de Pedra",
            value: "pedra"
          },{
            name: "Fornalha de Cobre",
            value: "cobre"
          },{
            name: "Fornalha de Mithril",
            value: "mithril"
          }]
        }]
      }]
    },{
      name: "coletar",
      description: "Grupo de Comandos",
      type: 2,
      options: [{
        name: "madeira",
        description: "Colete madeiras em seu mundo!",
        type: 1
      },{
        name: "rochas",
        description: "Colete rochas que estão espalhados em seu mundo!",
        type: 1
      }]
    },{
      name: "explorar",
      description: "Grupo de Comandos",
      type: 2,
      options: [{
        name: "mundo",
        description: "Explore o seu mundo",
        type: 1,
        options: [{
          name: "tempo",
          description: "Por quanto tempo você quer explorar?",
          type: 3,
          choices: [{
            name: "1 Minuto",
            value: "1m"
          },{
            name: "5 Minutos",
            value: "5m"
          },{
            name: "10 Minutos",
            value: "10m"
          }],
          required: true
        }]
      },{
        name: "caverna",
        description: "Explore uma caverna",
        type: 1,
        options: [{
          name: "tempo",
          description: "Por quanto tempo você quer explorar?",
          type: 3,
          choices: [{
            name: "1 Minuto",
            value: "1m"
          },{
            name: "5 Minutos",
            value: "5m"
          },{
            name: "10 Minutos",
            value: "10m"
          }],
          required: true
        },{
          name: "picareta",
          description: "Escolha a picareta que você irá usar.",
          type: 3,
          choices: [{
            name: "Picareta de Pedra",
            value: "pedra"
          },{
            name: "Picareta de Cobre",
            value: "cobre"
          },{
            name: "Picaret de Mithril",
            value: "Mithril"
          }],
          required: true
        }]
      }]
    },{
      name: "membro",
      description: "Grupo de Comandos",
      type: 2,
      options: [{
        name: "inventário",
        description: "Veja seu inventário!",
        type: 1
      }]
    },{
      name: "usar",
      description: "Grupo de Comandos",
      type: 2,
      options: [{
        name: "fornalha",
        description: "Utilize sua fornalha pra fundir seus minérios",
        type: 1,
        options: [{
          name: "minério",
          description: "Qual minério você quer fundir?",
          type: 3,
          choices: [{
            name: "Minério de Cobre",
            value: "cobre"
          },{
            name: "Minério de Mithril",
            value: "mithril"
          }],
          required: true
        }]
      }]
    },{
      name: "vender",
      description: "Grupo de Comandos",
      type: 2,
      options: [{
        name: "madeira",
        description: "Venda todas as suas madeiras!",
        type: 1
      },{
        name: "pedras",
        description: "Venda todas as suas pedras!",
        type: 1
      },{
        name: "cobre",
        description: "Venda todos os seus cobres!",
        type: 1
      },{
        description: "Venda todos os seus mithril",
        name: "mithril",
        type: 1
      }]
    }]
  },

  run: async (interaction) => {
    let subCmd = interaction.data.options[0];

    if (subCmd.name === "vender"){
                        let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

      if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
      }

      let cmd = subCmd.options[0];
      if (cmd.name === "madeira"){
        if (userdb.rpg.blocos.madeira === 0){
          return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: "Você não tem nenhuma madeira pra vender.",
                flags: 64
              }
            }
          })
        } else {

          let money = userdb.rpg.blocos.madeira;

          userdb.economia.moedas += money;
          
          userdb.rpg.blocos.madeira -= userdb.rpg.blocos.madeira;

          await userdb.save();

          

          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você vendeu todas as suas madeiras e ganhou ${money} mini moedas!`
              }
            }
          })
        }
      }

            if (cmd.name === "pedra"){
        if (userdb.rpg.blocos.pedra === 0){
          return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: "Você não tem nenhuma pedra pra vender.",
                flags: 64
              }
            }
          })
        } else {

          let money = userdb.rpg.blocos.pedra;

          userdb.economia.moedas += money;
          
          userdb.rpg.blocos.pedra -= userdb.rpg.blocos.pedra;

          await userdb.save();

          

          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você vendeu todas as suas pedras e ganhou ${money} mini moedas!`
              }
            }
          })
        }
            }

            if (cmd.name === "cobre"){
        if (userdb.rpg.ingotes.cobre === 0){
          return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: "Você não tem nenhum cobre pra vender.",
                flags: 64
              }
            }
          })
        } else {

          let money = userdb.rpg.ingotes.cobre * 2;

          userdb.economia.moedas += money;
          
          userdb.rpg.ingotes.cobre -= userdb.rpg.ingotes.cobre;

          await userdb.save();

          

          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você vendeu todos os seus cobres e ganhou ${money} mini moedas!`
              }
            }
          })
        }
            }

            if (cmd.name === "mithril"){
        if (userdb.rpg.ingotes.mithril === 0){
          return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: "Você não tem nenhum mithril pra vender.",
                flags: 64
              }
            }
          })
        } else {

          let money = userdb.rpg.ingotes.mithril * 3;

          userdb.economia.moedas += money;
          
          userdb.rpg.ingotes.mithril -= userdb.rpg.ingotes.mithril;

          await userdb.save();

          

          await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você vendeu todos os seus mithril e ganhou ${money} mini moedas!`
              }
            }
          })
        }
            }
    }

    if (subCmd.name === "membro"){
      let cmd = subCmd.options[0];
      if (cmd.name === "inventário"){
                  let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

      if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
      }

        let embed = {
          title: "Inventário",
          description: `Clique no menu abaixo para ver seus itens!`,
          color: 255
        };

       // console.log(true)
        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              embeds: [embed],
              components: [{
                type: 1,
                components: [{
                  type: 3,
                  custom_id: `inventario_${interaction.member.user.id}`,
                  placeholder: "Inventário",
                  options: [{
                    label: "Blocos",
                    description: "Clique pra selecionar",
                    value: "0"
                  },{
                    label: "Minérios",
                    description: "Cliaue pra selecionar",
                    value: "1"
                  },{
                    label: "Itens",
                    description: "Clique pra selecionar",
                    value: "2"
                  }]
                }]
              }]
            }
          }
        })
      }
    }

    if (subCmd.name === "usar"){
      let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

      if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
      }

      let cmd = subCmd.options[0];

      if (cmd.name === "fornalha"){

        let fornalha = userdb.rpg.itens.fornalha;
        if (fornalha === "sem"){
          return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você não tem uma fornalha! Utilize o comando </rpg criar fornalha:12345> e faça sua fornalha.`,
                flags: 64
              }
            }
          })
        } else {

          let minerio = cmd.options[0].value;
          if (minerio === "cobre"){

            if (userdb.rpg.blocos.cobre === 0){
              return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você não tem nenhum cobre! Utilize o comando </rpg explorar caverna:12345>.`,
                flags: 64
              }
            }
          })
            } else {

            if (fornalha === "pedra" || fornalha === "cobre" || fornalha === "mithril"){

              userdb.rpg.ingotes.cobre += userdb.rpg.blocos.cobre;

              userdb.rpg.blocos.cobre -= userdb.rpg.blocos.cobre;

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você fundiu ${userdb.rpg.ingotes.cobre} cobres!`,
                flags: 64
              }
            }
          })

              await userdb.save();
              
            }
            }
          } else if (minerio === "mithril"){

            if (userdb.rpg.blocos.mithril === 0){
              return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você não tem nenhum Mithril! Utilize o comando </rpg explorar caverna:12345>.`,
                flags: 64
              }
            }
          })
            } else {
            if (fornalha === "cobre" || fornalha === "mithril"){
              userdb.rpg.ingotes.mithril += userdb.rpg.blocos.mithril;

              userdb.rpg.blocos.mithril -= userdb.rpg.blocos.mithril;

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você fundiu ${userdb.rpg.ingotes.mithril} mithril!`,
                flags: 64
              }
            }
          })

              await userdb.save();
            } else {

              await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
            method: "POST",
            body: {
              type: 4,
              data: {
                content: `Você não pode fundir mithril com uma fornalha de pedra!`,
                flags: 64
              }
            }
          })

            }
            }
          }
        }
      }
    }
    
    if (subCmd.name === "explorar"){
            let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

      if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
      }

            let cmd = subCmd.options[0];

      if (cmd.name === "caverna"){
        let tempo = cmd.options[0].value;
        let picareta = cmd.options[1].value;

      // userdb.rpg.exploração_caverna.tempo = 0
      //  console.log(userdb.rpg.exploração_caverna)
        
        if (Date.now() < userdb.rpg.exploração_caverna.tempo){
                const calc = userdb.rpg.exploração_caverna.tempo - Date.now()

          return await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `Você ainda tem uma exploração em andamento! Volte novamente em: **${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s **`,
          flags: 64
        }
      }
        })
        } else {

          let picaretas = {
            "pedra": () => {
              return userdb.rpg.picareta.pedra.length === 0
            },
            "cobre": () => {
              return userdb.rpg.picareta.cobre.length === 0
            },
            "mithril": () => {
              return userdb.rpg.picareta.mithril.length === 0
            }
          };

        //  console.log(cmd.options[1].value, await picaretas[picareta](), userdb.rpg.picareta)

          if (await picaretas[picareta]()){

            await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
              method: "POST",
              body: {
                type: 4,
                data: {
                  content: `Você não tem uma picareta de ${picareta}! Utilize o comando </rpg criar picareta:12345> para criar essa picareta.`,
                  flags: 64
                }
              }
            })
          } else {

  if (!userdb.rpg.exploração_caverna.terminou){
console.log("start")
    await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
              method: 'POST',
              body: {
                type: 4,
                data: {
                  content: "Exploração iniciada! Irei lhe avisar novamente quando sua exploração terminar."
                }
              }
            })

    console.log(tempo)
    
    userdb.rpg.exploração_caverna.tempo = Date.now() + TEMPO_MS(`${tempo}`)

    userdb.rpg.exploração_caverna.minerios = []

    console.log(userdb.rpg.exploração_caverna.tempo)
   await userdb.save();
  //  if(true)return;
    setTimeout(async() => {

      userdb = await db.findOne({ userID: interaction.member.user.id });

            new Mineração(userdb)
            .start(picareta, tempo)
            .then(async(data) => {
              console.log(data)

        //   console.log("\n")

              userdb = await db.findOne({ userID: interaction.member.user.id });

    
    console.log(userdb.rpg.exploração_caverna)
          // console.log(userdb.rpg.picareta)

                    await DiscordRequest("/users/@me/channels", {
        method: "POST",
        body: {
          recipient_id: interaction.member.user.id
        }
      }).then(async(x) => {
        let user = await x.json()

        //console.log(userdb.rpg.exploração_mundo.itens)

        await DiscordRequest(CALLBACK.message.response(user.id),{
          method: "POST",
          body: {
            embeds: [{
              title: "Exploração concluída!",
              description: `Você acaba de explorar uma caverna!\nUtilize o comando </rpg explorar caverna:12345> novamente pra resgatar seus rercusos obtidos!`,
              color: 8900331
            }],
            components: [{
              type: 1,
              components: [{
                type: 2,
                label: "Enviado por Mini World: CREATA Português",
                style: 3,
                custom_id: "mwc",
                disabled: true
              }]
            }]
          }
        })
      })
            
            })
    }, TEMPO_MS(tempo))
    
           } else {

    console.log(userdb.rpg.exploração_caverna)

    userdb.rpg.exploração_caverna.minerios.map((minerio) => {

      if (minerio.pedra !== null){
        userdb.rpg.blocos.pedra += minerio.pedra;
      }

      if (minerio.cobre !== null){
        userdb.rpg.blocos.cobre += minerio.cobre;
      }

      if (minerio.mithril !== null){
        userdb.rpg.blocos.mithril += minerio.mithril;
      }
    })

    userdb.rpg.exploração_caverna.terminou = false;

    userdb.rpg.exploração_caverna.minerios = [];

    await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
      method: "POST",
      body: {
        type: 4,
        data: {
          content: `Você resgatou tudo da mineração anterior!`,
          flags: 64
        }
      }
    })

    await userdb.save();
           }
          }
        }
      }

      if (cmd.name === "mundo"){

        if(Date.now() < userdb.rpg.exploração_mundo.tempo){
      const calc = userdb.rpg.exploração_mundo.tempo - Date.now()

          return await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `Você ainda tem uma exploração em andamento! Volte novamente em: **${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s **`,
          flags: 64
        }
      }
        })
        
        
        } else {

          if (!userdb.rpg.exploração_mundo.terminou){

            let time = cmd.options[0].value;

            time = TEMPO_MS(`${time}`);

            userdb.rpg.exploração_mundo.tempo = Date.now() + time;

            userdb.rpg.exploração_mundo.itens = [];
                

            await userdb.save();

            await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
              method: 'POST',
              body: {
                type: 4,
                data: {
                  content: "Exploração iniciada! Irei lhe avisar novamente quando sua exploração terminar."
                }
              }
            })

            setTimeout(async() => {

              userdb = await db.findOne({ userID: interaction.member.user.id });

              let itensData = [];

              console.log(time)

              if (time = TEMPO_MS("1m")){
                console.log("1m")

                
                  userdb.rpg.exploração_mundo.itens.push({
                  name: "rochas",
                  value: getRandomNumberBetween(1, 5)
                },{
                  name: "fibras_vegetais",
                  value: getRandomNumberBetween(1, 10)
                })

                await userdb.save();
              } else if (time === TEMPO_MS("5m")){
                  userdb.rpg.exploração_mundo.itens.push({
                  name: "rochas",
                  value: getRandomNumberBetween(10, 15),
                },{
                  name: "fibras_vegetais",
                  value: getRandomNumberBetween(15, 20)
                },{
                  name: "madeira",
                  value: getRandomNumberBetween(5, 10)
                })

                await userdb.save();
              } else if (time === TEMPO_MS("10m")){
                userdb.rpg.exploração_mundo.itens.push({
                  name: "rochas",
                  value: getRandomNumberBetween(20, 25),
                },{
                  name: "fibras_vegetais",
                  value: getRandomNumberBetween(20, 25)
                },{
                  name: "madeira",
                  value: getRandomNumberBetween(10, 20)
              })

                await userdb.save();
                }

              userdb = await db.findOne({ userID: interaction.member.user.id });
              
              userdb.rpg.exploração_mundo.terminou = true;

              await userdb.save();

                
      await DiscordRequest("/users/@me/channels", {
        method: "POST",
        body: {
          recipient_id: interaction.member.user.id
        }
      }).then(async(x) => {
        let user = await x.json()

        //console.log(userdb.rpg.exploração_mundo.itens)

        await DiscordRequest(CALLBACK.message.response(user.id),{
          method: "POST",
          body: {
            embeds: [{
              title: "Exploração concluída!",
              description: `Você explorou seu mundo e conseguiu:\n\n${userdb.rpg.exploração_mundo.itens.map((x) => `**__${x.name}__**: **\`${x.value}\`**`).join("\n")}\nResgate todos os seus itens utilizando novamente o comando </rpg explorar mundo:12345> no canal <#1000553431381065798>!`,
              color: 8900331
            }],
            components: [{
              type: 1,
              components: [{
                type: 2,
                label: "Enviado por Mini World: CREATA Português",
                style: 3,
                custom_id: "mwc",
                disabled: true
              }]
            }]
          }
        })
      })
              
            }, time)
          } else if (userdb.rpg.exploração_mundo.terminou){

            userdb = await db.findOne({ userID: interaction.member.user.id });
              
              userdb.rpg.exploração_mundo.terminou = false;

            userdb.rpg.exploração_mundo.itens.map((item) => {
              if (item.name === "rochas"){
                userdb.rpg.blocos.pedra =+ item.value;
              } else if(item.name === "fibras_vegetais"){
                userdb.rpg.plantas.fibras_vegetais =+ item.value;
              } else if (item.name === "madeira"){
                userdb.rpg.blocos.madeira =+ item.value;
              }
            })

            await userdb.save();

            await DiscordRequest(
              CALLBACK.interaction.response(
                interaction.id, interaction.token
              ),{
                method: "POST",
                body: {
                  type: 4,
                  data: {
                  content: `Você resgatou todos os itens de sua exploração anterior! Utilize o comando novamente pra iniciar uma nova exploração.`
                  }
                }
              }
            )
          }
        }
      }
    }
    if (subCmd.name === "coletar"){
      let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

      if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
      }
      let cmd = subCmd.options[0];
      if (cmd.name === "madeira"){

        await DiscordRequest(
          CALLBACK.interaction.response(
            interaction.id, interaction.token
          ),{
            method: "POST",
            body: {
            type: 4,
              data: {
              content: "Clique no botão pra coletar madeira!",
              components: [{
                type: 1,
                components: [{
                  type: 2,
                  label: "Coletar Madeira",
                  style: 3,
                  custom_id: `coletarMadeira_${interaction.member.user.id}`
                }]
              }]
            }
            }
          }
        )
      } else if (cmd.name === "rochas"){
                await DiscordRequest(
          CALLBACK.interaction.response(
            interaction.id, interaction.token
          ),{
            method: "POST",
            body: {
              type: 4,
              data: {
              content: "Clique no botão pra coletar rochas!",
              components: [{
                type: 1,
                components: [{
                  type: 2,
                  label: "Coletar Rochas",
                  style: 3,
                  custom_id: `coletarRochas_${interaction.member.user.id}`
                }]
              }]
            }
            }
          }
        )
      }
    }

    if (subCmd.name === "criar") {
      let cmd = subCmd.options[0];

      if (cmd.name === "mundo") {
        let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

        let mundo = cmd.options[0].value;

        userdb.rpg.mundo = mundo;
        await userdb.save();

        //console.log("ID = " + interaction.id + "\nTOKEN = " + interaction.token);

        await DiscordRequest(`/interactions/${interaction.id}/${interaction.token}/callback`, {
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `O mundo ${mundo} foi criado!`
            }
          }
        });
      } else if (cmd.name === "picareta"){
        let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

        if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
        }

        let picareta = cmd.options[0].value;

    // console.log(userdb.rpg.blocos)
        let picaretas = {
          "pedra": async() => {
            userdb.rpg.picareta.pedra.push({
              durabilidade: 80
            });

            userdb.rpg.blocos.pedra = userdb.rpg.blocos.pedra - 3;

            userdb.rpg.blocos.madeira = userdb.rpg.blocos.madeira - 3;

            await userdb.save();
          },
          "cobre": async() => {
            userdb.rpg.picareta.cobre.push({
              durabilidade: 120
            });

            userdb.rpg.ingotes.cobre = userdb.rpg.ingotes.cobre - 3;

            userdb.rpg.blocos.madeira = userdb.rpg.blocos.madeira - 3;
            
            await userdb.save();
          },
          "mithril": async() => {
            userdb.rpg.picareta.mithril.push({
              durabilidade: 200
            });

            userdb.rpg.ingotes.mithril = userdb.rpg.ingotes.mithril - 3;

            userdb.rpg.blocos.madeira = userdb.rpg.blocos.madeira - 3;
            await userdb.save();
          },
        };

        let minerios = {
          "pedra": async() => {
            return userdb.rpg.blocos.pedra < 3;
          },
          "cobre": async() => {
            return userdb.rpg.ingotes.cobre < 3;
          },
          "mithril": async() => {
            return userdb.rpg.ingotes.mithril < 3;
          },
        };

      // console.log(userdb.rpg.blocos, userdb.rpg.ingotes, minerios[picareta]())
        if (await minerios[picareta]()) {
          return await DiscordRequest(
          CALLBACK.interaction.response(interaction.id, interaction.token),{ method: "POST", body: {
            type: 4,
            data: {
              content: `Você precisa ter 3 ${picareta}s!`,
              flags: 64
            }
          }}
        )
        }

        if (userdb.rpg.blocos.madeira < 3) return await DiscordRequest(
          CALLBACK.interaction.response(interaction.id, interaction.token),{ method: "POST", body: {
            type: 4,
            data: {
              content: `Você precisa ter 3 madeiras!`,
              flags: 64
            }
          }})
        


        await picaretas[picareta]();
        
         await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `Você criou uma picareta de ${picareta}!`
             }
           }
         })
      } else if (cmd.name === "fornalha"){
                let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

        if (userdb.rpg.mundo === null){
        return await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `Você ainda não criou um mundo! Utilize o comando </rpg criar mundo:12345>.`,
              flags: 64
            }
          }
        })
        }

        let fornalha = cmd.options[0].value;

        let fornalhas = {
          "pedra": () => {
            return userdb.rpg.blocos.pedra < 9;
          },
          "cobre": () => {
            return userdb.rpg.ingotes.cobre < 9;
          },
          "mithril": () => {
            return userdb.rpg.ingotes.mithril < 9
          }
        }

        if (await fornalhas[fornalha]()){
          return await DiscordRequest(
          CALLBACK.interaction.response(interaction.id, interaction.token),{ method: "POST", body: {
            type: 4,
            data: {
              content: `Você precisa ter 9 ${fornalha}s!`,
              flags: 64
            }
          }}
        )
        } else {
          let save = {
            "pedra": async() => {
              userdb.rpg.itens.fornalha = "pedra";
              userdb.rpg.blocos.pedra -= 9;

              await userdb.save();
            },
            "cobre": async() => {
              userdb.rpg.itens.fornalha = "cobre";
              userdb.rpg.ingotes.cobre -= 9;

              await userdb.save();
            },
            "mithril": async() => {
              userdb.rpg.itens.fornalha = "mithril";
              userdb.rpg.ingotes.mithril -= 9;

              await userdb.save();
            }
          };

          await save[fornalha]();

          return await DiscordRequest(
          CALLBACK.interaction.response(interaction.id, interaction.token),{ method: "POST", body: {
            type: 4,
            data: {
              content: `Você criou uma fornalha de ${fornalha}!`
            }
          }}
        )
        }
      }
    }
  }
};


function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}

function getRandomNumberBetween(x, y) {
  if (x >= y) {
    throw new Error("O valor de 'x' deve ser menor que 'y'");
  }
  const randomNumber = Math.floor(Math.random() * (y - x + 1)) + x;
  return randomNumber;
}

function escolherItemAleatorio(itens) {
  const totalProbabilidades = itens.reduce((sum, item) => sum + item.probabilidade, 0);
  let numeroAleatorio = Math.random() * totalProbabilidades;

  for (const item of itens) {
    if (numeroAleatorio < item.probabilidade) {
      return item.nome;
    }
    numeroAleatorio -= item.probabilidade;
  }
}


function processarDurabilidadeNovaArray(objetos, durabilidadeMinima) {
  const novaArray = [];

  for (let i = 0; i < objetos.length; i++) {
    const objeto = objetos[i];

    if (objeto.durabilidade >= durabilidadeMinima) {
   
      novaArray.push({ ...objeto });
    } else {
    
      const objetoASomar = novaArray.find(obj => obj.durabilidade >= durabilidadeMinima);

      if (objetoASomar) {
        objetoASomar.durabilidade += objeto.durabilidade;
    } else {
        return true;
    }
  }

  return novaArray;
}

}