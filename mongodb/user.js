const { Schema, model } = require('mongoose');


const userset = new Schema({
  userID: { type: String },
  uid: { type: String, default: "Não definido" },
  estrelas: { type: Number, default: 0 },
  msg: {
    de_2024: { type: Number, default: 0 }
  },
  
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

    blocos: {
      madeira: { type: Number, default: 0 },
      pedra: { type: Number, default: 0 },
      cobre: { type: Number, default: 0 },
      ferro: { type: Number, default: 0 }
    },

    itens: {
      gravetos: { type: Number, default: 0 },
      fornalha: { type: String, default: "sem"}
    },

    picaretas: {
      pedra: { type: Array },
      cobre: { type: Array },
      ferro: { type: Array }
    },

    ingotes: {
        carvao: { type: Number, default: 0 },
        cobre: { type: Number, default: 0 },
        ferro: { type: Number, default: 0 }
    }
  }
  
});


module.exports = model("Mw-Usuarios", userset); 