import db from "../functions/quickDb.mjs";

let teste = async() => {

  await db.set("teste", "testado!");

  
}

teste();