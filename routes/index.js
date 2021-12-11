let express = require("express");
let router = express.Router();

const myDB = require("../db/artworkDB.js");
/* GET home page. */
router.get("/", async function (req, res) {
  const Arts = await myDB.getArts();
  res.render("index", { Arts: Arts });
});

/* GET art details. */
router.get("/Arts/:artworkID", async function (req, res) {
  console.log("Got art details");
  const artID = req.params.artworkID;
  console.log(artID);
  const a = await myDB.getArtDetails(artID);
  res.render("artworkDetail", { a: a });
});

/* POST update artworks. */
router.post("/Arts/update", async function (req, res) {
  const artwork = req.body;
  await myDB.updateArtwork(artwork);
  console.log("artworks update", artwork);
  const a = await myDB.getArtDetails(artwork.artworkID);
  res.render("artworkDetail", { a: a });
});

/* POST create Arts. */
router.post("/Arts/create", async function (req, res) {
  console.log("Got create Arts");
  const artwork = req.body;
  console.log("got create art", artwork);
  await myDB.createArtwork(artwork);
  console.log("Art created");
  res.redirect("/");
});

/* POST delete Arts. */
router.post("/Arts/delete", async function (req, res) {
  console.log("Got post delete Art");
  const artworkID = req.body.artworkID;
  console.log("got delete Art", artworkID);
  await myDB.deleteArt(artworkID);
  console.log("Art deleted");
  res.redirect("/");
});

module.exports = router;
