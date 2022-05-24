const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const methodOverride = require("method-override");

const app = express();
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/dinosaurs", require("./controllers/dinosaurs"));
app.use(
  "/prehistoric_creatures",
  require("./controllers/prehistoric_creatures")
);

app.listen(3000, () => {
  console.log("Server running on 3000");
});
