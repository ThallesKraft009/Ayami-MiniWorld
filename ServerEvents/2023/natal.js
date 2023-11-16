class Natal {
  constructor(client){
    this.client = client;
    this.miniGames = ["Pergunta", "Quiz", "Labirinto"];
    this.miniGameEscolhido = null;

    this.msg = {};
    this.msg.totalMsg = 0;
    this.msg.Timeout = null;

    this.i;
    this.number_random;
    this.users = [];
  }

  async dataRestart(){
     this.i = 0;
     let min = 50;
     let max = 150;

const timerDuration = ms("50s");

this.number_random = Math.floor(Math.random() * (max - min + 1)) + min;
    
  }

  async runEvent(message){

    this.users[message.author.id] = {};
this.users[message.author.id] = setTimeout(function(){

  delete this.users[message.author.id];
  
    }, ms("3m"))

    this.i = this.i + 1;

    if (this.i === this.number_random){
      this.miniGameEscolhido = this.miniGames[Math.floor(Math.random() * this.miniGames.length)];

      this.dataRestart();

      if (this.miniGameEscolhido === "Pergunta"){}
    }
    
  }

  
}


export { Natal };