import { EventEmitter } from 'events';

class Logs extends EventEmitter {
  constructor(client){
    super();
    
    this.client = client;
  }

  Estrelinhas(type, db, userId){

    let data = {
      author: this.client.users.cache.get(userId),
      database: db
    }

    if (type === 0){
      this.emit("EstrelinhasAdd", data)
    } else if (type === 1){
      this.emit("EstrelinhasRemove", data)
    }
  }
}


export { Logs };