const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  let preCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let preCreaturesData = JSON.parse(preCreatures);

  res.render("prehistoric_creatures/index.ejs", {
    preCreaturesData,
  });
});

router.get("/new", (req, res) => {
  res.render("prehistoric_creatures/new.ejs");
});

router.get("/:id", (req, res) => {
  let index = req.params.id;
  let preCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let preCreaturesData = JSON.parse(preCreatures);

  res.render("prehistoric_creatures/show.ejs", {
    preCreatures: preCreaturesData[index],
  });
});

router.post("/", (req, res) => {
  let preCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let preCreaturesData = JSON.parse(preCreatures);
  preCreaturesData.push(req.body);
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(preCreaturesData)
  );

  res.redirect("/prehistoric_creatures");
});

router.get("/edit/:id", (req, res) => {
  let preCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let preCreaturesData = JSON.parse(preCreatures);

  res.render("prehistoric_creatures/edit.ejs", {
    phcId: req.params.id,
    phc: preCreaturesData[req.params.id],
  });

  res.redirect("/prehistoric_creatures");
});

router.put("/:id", (req, res) => {
  let preCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let preCreaturesData = JSON.parse(preCreatures);

  // console.log(req.params.id, req.body);

  preCreaturesData[req.params.id].name = req.body.name;
  preCreaturesData[req.params.id].type = req.body.type;

  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(preCreaturesData)
  );

  res.redirect("/prehistoric_creatures");
});

router.delete("/:id", (req, res) => {
  let preCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let preCreaturesData = JSON.parse(preCreatures);

  preCreaturesData.splice(req.params.id, 1);

  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(preCreaturesData)
  );

  res.redirect("/prehistoric_creatures");
});

module.exports = router;
