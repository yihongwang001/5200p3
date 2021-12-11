// Create a structure that lets you get all the tweets for an specific user.
const { createClient } = require("redis");
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function getDetails() {
  const clientMongo = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await clientMongo.connect();
    const db = clientMongo.db("Arts");
    const artworkCollection = db.collection("artwork3");
    // I chose to query "user.screen_name": "sgeoviz"
    const query = {};
    // query the tweets collection in Mongo
    const result = await artworkCollection.find(query).toArray();
    const clientRedis = createClient();
    clientRedis.on("error", (err) => console.log("Redis Client Error", err));

    await clientRedis.connect();
    console.log("connected");
    const artworkLength = result.length;
    for (let i = 0; i < artworkLength; i++) {
      // a list with key tweets:sgeoviz that points to a list of all the tweet ids for tweets:sgeoviz
      await clientRedis.LPUSH("artwork", `artwork:${result[i].artworkID}`);
      console.log(result[i].name);
      // a hash that links from tweetid to the tweet information
      // I chose only 5 fields for tweet information
      await clientRedis.HSET(`artwork:${result[i].artworkID}`, {
        ["artworkID"]: result[i].artworkID,
        ["name"]: result[i].name,
        ["year"]: result[i].year,
        ["movement"]: result[i].movementName,
        ["status"]: result[i].status,
      });
    }
    console.log("Got all artworks");
    clientMongo.close();
  } catch (err) {
    console.log("error", err);
  }
}
getDetails();
