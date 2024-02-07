const { Schema, model } = require('mongoose');


const userset = new Schema({
  userID: { type: String },
  dmChannelId: { type: String, default: null },
  uid: { type: String, default: "Não definido" },
  estrelas: { type: Number, default: 0 },
  timeout: { type: Boolean, default: false },
  msg: {
    de_2024: { type: Number, default: 0 }
  },
  carnaval_pontos_2024: { type: Number, default: 0 },
  
  pontuacao: { type: Number, default: 0 },
  jogos: { type: Array, default: [] },
  skin: { type: String, default: "<:kaka:1147585577298972745>"},
  pontos_natal: { type: Number, default: 0 },

  perfil: {
    sobremim: { type: String, default: "Mude seu sobremim utilizando mw!sobremim"},
    banner: { type: String, default: null },
    banners: { type: Array, default: [] },
    fundo: { type: String, default: "https://imgur.com/rz7Doar.png" }
  },

  mapas: { type: Array, default: [{
    label: "Enviar Mapa",
    description: "Clique para enviar seu mapa",
    value: "0"
  }]},

  pascoa: {
    ovo_azul: { type: Number, default: 0 },
    ovo_vermelho: { type: Number, default: 0 },
    ovo_verde: { type: Number, default: 0 },
    ovo_dourado: { type: Number, default: 0 },
    pontos: { type: Number, default: 0 },
    time: { type: Number, default: 0 }
  },
  
  economia: {
    moedas: {type: Number, default: 0},
    daily_time: {type: Number, default: 0}
  },

  configuration: {
    dm: { type: Boolean, default: true }
  },
  
  jogos_pontos: {
    snakegame: { type: Number, default: 0 }
  },

  conquistas: {
    snakegame: { type: Boolean, default: false },
    estrelinhas: { type: Boolean, default: false },
    rpg: {
      picareta: { type: Boolean, default: false },
      madeira: { type: Boolean, default: false }
    }
  },

  notificacoes: {
    conquistas: { type: Boolean, default: true }
  },

  rpg: {
    mundo: { type: String, default: null },
    vida: { type: Number, default: 100 },

    exploração_mundo: {
      tempo: { type: Number, default: 0 },
      terminou: { type: Boolean, default: false },
      biomas: { type: Array, default: [] },
      itens: { type: Array, default: []}
    },

    exploração_caverna: {
      tempo: { type: Number, default: 0 },
      terminou: { type: Boolean, default: false },
      minerios: { type: Array, default: [] }
    },

    blocos: {
      madeira: { type: Number, default: 0 },
      pedra: { type: Number, default: 0 },
      cobre: { type: Number, default: 0 },
      mithril: { type: Number, default: 0 }
    },

    itens: {
      gravetos: { type: Number, default: 0 },
      fornalha: { type: String, default: "sem"},
      tocha: { type: Number, default: 0 }
    },

    plantas: {
      fibras_vegetais: { type: Number, default: 0 }
    },

    picareta: {
      pedra: { type: Array },
      cobre: { type: Array },
      mithril: { type: Array }
    },

    ingotes: {
        carvao: { type: Number, default: 0 },
        cobre: { type: Number, default: 0 },
        mithril: { type: Number, default: 0 }
    }
  }
  
});


module.exports = model("Mw-Usuarios", userset); 