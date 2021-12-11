const { createClient } = require("redis");
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function getDetails() {
  const clientMongo = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await clientMongo.connect();
    const db = clientMongo.db("artGallery");
    const artworkCollection = db.collection("artworks");
    const query = {};
    const result = await artworkCollection.find(query).toArray();
    const clientRedis = createClient();
    clientRedis.on("error", (err) => console.log("Redis Client Error", err));

    await clientRedis.connect();
    console.log("connected");
    const artworkLength = result.length;
    for (let i = 0; i < artworkLength; i++) {
      await clientRedis.LPUSH("artwork", `artwork:${result[i].artworkID}`);
      console.log(result[i].name);
      await clientRedis.HSET(`artwork:${result[i].artworkID}`, {
        ["artworkID"]: result[i].artworkID,
        ["artistID"]: result[i].artistID,
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
