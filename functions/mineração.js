const ms = require("ms");

class Mineração {
  constructor(userdb) {
    this.data = {
      userdb: userdb
    };
  }

  durabilidadeTotal(name) {
    let total = 0;
    this.data.userdb.rpg.picareta[name].forEach((picareta) => {
      total += picareta.durabilidade;
    });

    return total;
  }

  gerarMinerios(blocosTotal, picareta) {
    let total = blocosTotal;
    let blocosMinerados = {};

    switch (picareta) {
      case "pedra":
        blocosMinerados.cobre = gerarNumeroAleatorio(0, 10)
        total -= blocosMinerados.cobre;
        break;

      case "cobre":
        blocosMinerados.cobre = gerarNumeroAleatorio(0, 20)
        blocosMinerados.mithril = gerarNumeroAleatorio(0, 5)
        total -= blocosMinerados.cobre + blocosMinerados.mithril;
        break;

      case "mithril":
        blocosMinerados.cobre = gerarNumeroAleatorio(0, 50)
        blocosMinerados.mithril = gerarNumeroAleatorio(0, 10)
        total -= blocosMinerados.cobre + blocosMinerados.mithril;
        break;
    }

    
    blocosMinerados.pedra = total;
    this.picaretaDurabilidade(blocosTotal, picareta)

    this.data.userdb.rpg.exploração_caverna.minerios.push({
      pedra: blocosMinerados.pedra,
      cobre: blocosMinerados.cobre,
      mithril: blocosMinerados.mithril
    })

    
    
    return {
      blocosMinerados,
      picareta: this.picaretaDurabilidade(blocosTotal, picareta)
    };
  }

  
      async picaretaDurabilidade(total, picareta) {
  let restante = total;

  for (let i = 0; i < this.data.userdb.rpg.picareta[picareta].length; i++) {
    const durabilidadeAtual = this.data.userdb.rpg.picareta[picareta][i].durabilidade;

    if (durabilidadeAtual <= restante) {
      
      restante -= durabilidadeAtual;
      this.data.userdb.rpg.picareta[picareta].splice(i, 1);
      i--; 
    } else {
      
      this.data.userdb.rpg.picareta[picareta][i].durabilidade -= restante;
      restante = 0;
    }

    if (restante === 0) {
      
      break;
    }
  }

        return this.data.userdb.rpg.picareta[picareta];

      }

  async saveDatabase(){
    await this.data.userdb.save();
  }
  

  async start(picareta, time) {
    let limiteDurabilidade = await this.durabilidadeTotal(picareta);

    const tempoSegundos = ms(time) / 1000;

    let limiteBlocos = limiteDurabilidade / 2;
    let blocosMinerados = limiteBlocos;

    if (tempoSegundos < limiteBlocos) {
      blocosMinerados = tempoSegundos;
    }

    let tempoTotalSegundos = blocosMinerados * tempoSegundos;

    console.log("Quantidade máxima de blocos:", Math.floor(limiteBlocos));
    console.log("Quantidade de blocos minerados:", Math.floor(blocosMinerados));
    console.log("Tempo total necessário em segundos:", Math.floor(tempoTotalSegundos));

    
    const data = this.gerarMinerios(Math.floor(blocosMinerados), picareta);
    
    this.data.userdb.rpg.exploração_caverna.terminou = true;

    await this.saveDatabase();
    return data;
  }
}

const userdb = {
  rpg: {
    picareta: {
      pedra: [
        { durabilidade: 170 }
      ]
    }
  }
};

function gerarNumeroAleatorio(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}


module.exports = { Mineração };