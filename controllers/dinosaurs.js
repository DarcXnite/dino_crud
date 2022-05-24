const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  let nameFilter = req.query.nameFilter;
  if (nameFilter) {
    dinoData = dinoData.filter(
      (dino) => dino.name.toLowerCase() === nameFilter.toLowerCase()
    );
  }

  res.render("dinosaurs/index.ejs", {
    myDinos: dinoData,
  });
});

router.get("/new", (req, res) => {
  res.render("dinosaurs/new.ejs");
});

router.get("/:id", (req, res) => {
  let dinoIndex = req.params.id;
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  res.render("dinosaurs/show.ejs", {
    myDino: dinoData[dinoIndex],
  });
});

router.post("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  dinoData.push(req.body);
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));

  res.redirect("/dinosaurs");
});

router.get("/edit/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  res.render("dinosaurs/edit.ejs", {
    dinoId: req.params.id,
    dino: dinoData[req.params.id],
  });

  res.redirect("/dinosaurs");
});

router.put("/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  console.log(req.params.id, req.body);

  dinoData[req.params.id].name = req.body.name;
  dinoData[req.params.id].type = req.body.type;

  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));

  res.redirect("/dinosaurs");
});

router.delete("/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  dinoData.splice(req.params.id, 1);

  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));

  res.redirect("/dinosaurs");
});

module.exports = router;
