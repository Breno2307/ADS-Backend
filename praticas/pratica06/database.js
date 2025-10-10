const {MongoClient} = require("mongodb");

const url =
  "mongodb+srv://userTarefas:41526378@cluster0.qtcrg6x.mongodb.net/";

const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  return client.db("agenda");
}

module.exports = conectarDb ;
