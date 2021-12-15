const { createClient } = require("redis");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function loadData() {
  const clientMongo = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await clientMongo.connect();
    const db = clientMongo.db("artGallery");
    const artworkCollection = db.collection("artists");
    const result = await artworkCollection.find().toArray();
    const clientRedis = createClient();
    clientRedis.on("error", (err) => console.log("Redis Client Error", err));

    await clientRedis.connect();
    console.log("connected");
    const artistLength = result.length;
    for (let i = 0; i < artistLength; i++) {
      await clientRedis.LPUSH("artists", `artist:${result[i].name}`);
      console.log(result[i].name);
      await clientRedis.HSET(`artist:${result[i].name}`, {
        ["id"]: result[i]._id.toString(),
        ["name"]: result[i].name,
        ["birthYear"]: result[i].birthYear,
        ["deathYear"]: result[i].deathYear,
        ["nationality"]: result[i].nationality.name,
        ["region"]: result[i].nationality.region,
        ["description"]: result[i].description,
      });
    }
    console.log("Got all artworks");
    clientMongo.close();
  } catch (err) {
    console.log("error", err);
  }
}
loadData();
