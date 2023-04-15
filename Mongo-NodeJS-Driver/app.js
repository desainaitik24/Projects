const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://desainaitik24:naitik24@cluster0.eq6finc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('myFirstDatabase');
    const collection = db.collection('movies');

    //insert record
    const insert = await collection.insertOne({_id:4,name:"Pushpa",year:"2022"});
    console.log(insert);
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);              