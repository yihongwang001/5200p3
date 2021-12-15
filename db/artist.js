const { ObjectId } = require("mongodb");
const { createClient } = require("redis");

async function getRConnection() {
  let rclient = createClient();
  rclient.on("error", (err) => console.log("Redis Client Error", err));
  await rclient.connect();
  console.log("redis connected");
  return rclient;
}

// Helper function for getArtists
async function getArtist(artistName) {
  let rclient;
  try {
    rclient = await getRConnection();
    return await rclient.hGetAll(`${artistName}`);
  } finally {
    rclient.quit();
  }
}

// List out all artist records
async function getArtists() {
  let rclient;
  try {
    rclient = await getRConnection();
    const artists = await rclient.lRange("artists", 0, -1);
    console.log("got artists", artists);
    const artistArray = [];
    for (let artistName of artists) {
      const each = await getArtist(artistName);
      artistArray.push(each);
    }
    return artistArray;
  } finally {
    rclient.quit();
  }
}

// Create an artist record
async function createArtist(newArtist) {
  let rclient;
  try {
    rclient = await getRConnection();

    const nextId = await rclient.incr("artistID");

    console.log("creating artist", newArtist.name, newArtist);

    await rclient.hSet(`artist:${newArtist.name}`, {
      ["id"]: nextId,
      ["name"]: newArtist.name,
      ["birthYear"]: newArtist.birthYear,
      ["deathYear"]: newArtist.deathYear,
      ["nationality"]: newArtist.nationality,
      ["region"]: newArtist.region,
      ["description"]: newArtist.description,
    });
    await rclient.LPUSH("artists", `artist:${newArtist.name}`);
  } finally {
    rclient.quit();
  }
}

// Update an artist record
async function updateArtist(newArtist) {
  let rclient;
  try {
    rclient = await getRConnection();

    console.log("updating artist", newArtist.name, newArtist);

    await rclient.hSet(`artist:${newArtist.name}`, {
      ["id"]: newArtist.id,
      ["name"]: newArtist.name,
      ["birthYear"]: newArtist.birthYear,
      ["deathYear"]: newArtist.deathYear,
      ["nationality"]: newArtist.nationality,
      ["region"]: newArtist.region,
      ["description"]: newArtist.description,
    });
  } finally {
    rclient.quit();
  }
}

// Get Artist Record by Name
async function getArtistByName(artistName) {
  let rclient;
  try {
    rclient = await getRConnection();
    console.log("get artist detail", artistName);
    const key = `artist:${artistName}`;
    return await rclient.hGetAll(key);
  } finally {
    rclient.quit();
  }
}

// Delete Artist Record
async function deleteArtist(artistToDelete) {
  let rclient;
  try {
    rclient = await getRConnection();
    console.log("To delete artist ", artistToDelete);
    const key = `artist:${artistToDelete}`;
    await rclient.lRem("artists", 0, key);
    await rclient.del(key);
  } finally {
    rclient.quit();
  }
}

module.exports.getArtists = getArtists;
module.exports.createArtist = createArtist;
module.exports.deleteArtist = deleteArtist;
module.exports.getArtistByName = getArtistByName;
module.exports.updateArtist = updateArtist;
