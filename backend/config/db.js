
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
      console.log('DB Connected!')
  }).catch((error) => {
      console.log(error);
  })

}
run().catch(console.dir);

