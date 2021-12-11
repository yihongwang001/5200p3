const { createClient } = require("redis");

async function getRConnection() {
  let rclient = createClient();
  rclient.on("error", (err) => console.log("Redis Client Error", err));
  await rclient.connect();
  console.log("redis connected");
  return rclient;
}

async function getArt(artworkID) {
  let rclient;
  try {
    rclient = await getRConnection();
    return await rclient.hGetAll(`${artworkID}`);
  } finally {
    rclient.quit();
  }
}

async function getArts() {
  let rclient;
  try {
    rclient = await getRConnection();
    const tweetIds = await rclient.lRange("artwork", 0, 20);
    const tweets = [];
    for (let tId of tweetIds) {
      const tweet = await getArt(tId);
      tweets.push(tweet);
    }
    return tweets;
  } finally {
    rclient.quit();
  }
}

async function getArtDetails(artworkID) {
  let rclient;
  try {
    rclient = await getRConnection();
    console.log("get art detail", artworkID);
    const key = `artwork:${artworkID}`;
    return await rclient.hGetAll(key);
  } finally {
    rclient.quit();
  }
}

async function createArtwork(a) {
  let rclient;
  try {
    rclient = await getRConnection();
    const key = `artwork:${a.artworkID}`;
    await rclient.hSet(key, {
      ["name"]: a.name,
      ["year"]: a.year,
      ["movement"]: a.movementName,
      ["status"]: a.status,
      ["artworkID"]: a.artworkID,
      ["artistID"]: a.artistID,
    });
    await rclient.rPush("artwork", key);
  } finally {
    rclient.quit();
  }
}

async function deleteArt(artworkID) {
  let rclient;
  try {
    rclient = await getRConnection();
    const key = `artwork:${artworkID}`;
    await rclient.lRem("artwork", 0, key);
    await rclient.del(key);
  } finally {
    rclient.quit();
  }
}

async function updateArtwork(a) {
  let rclient;
  try {
    rclient = await getRConnection();
    const key = `artwork:${a.artworkID}`;
    await rclient.hSet(key, {
      ["artistID"]: a.artistID,
      ["name"]: a.name,
      ["year"]: a.year,
      ["movement"]: a.movementName,
      ["status"]: a.status,
      ["artworkID"]: a.artworkID,
      ["artistID"]: a.artistID,
    });
  } finally {
    rclient.quit();
  }
}

module.exports.getArtDetails = getArtDetails;
module.exports.updateArtwork = updateArtwork;
module.exports.createArtwork = createArtwork;
module.exports.getArts = getArts;
module.exports.getArt = getArt;
module.exports.deleteArt = deleteArt;
