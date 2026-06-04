const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://raksharthkohli145_db_user:AsRVQCHSF40a9zZS@ac-2wnq86m-shard-00-00.64tfbdz.mongodb.net:27017,ac-2wnq86m-shard-00-01.64tfbdz.mongodb.net:27017,ac-2wnq86m-shard-00-02.64tfbdz.mongodb.net:27017/?ssl=true&replicaSet=atlas-mg6fn6-shard-0&authSource=admin&appName=Cluster0');

async function run() {
  await client.connect();
  const db = client.db('educonnect');
  await db.collection('users').updateOne(
    { email: 'ping@gmail.com' },
    { $set: { name: 'Aryan Singh', image: 'https://randomuser.me/api/portraits/men/45.jpg' } }
  );
  console.log('Updated!');
  client.close();
}

run();