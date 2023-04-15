const { MongoClient } = require('mongodb');
//insert url from your atlas
const uri = "Your URL";
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
