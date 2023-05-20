import express from "express";
import bodyParser from "body-parser";
import { getDate, getDay, getMonth } from "./date.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

let lists = ["home", "works"];

let items = [
  "Coding the final project",
  "Learning about API",
  "Reading ML Book",
];

app.get("/", async (req, res) => {
  let taskNum = items.length;
  let day = getDate();
  let weekday = getDay();
  let month = getMonth();

  res.render("list", {
    weekday: weekday,
    day: day,
    month: month,
    todo: items,
    taskNum: taskNum,
    lists: lists[0],
  });
});

app.post("/", async (req, res) => {
  let lists = req.body.lists;
  let item = req.body.newItem;
  let del = req.body.delete;

  if (del != "") {
    items.forEach((item) => {
      if (item === del) {
        const index = items.indexOf(del);
        items.splice(index, 1);
      }
    });
  }
  if (lists === "home" && item != "") {
    items.push(item);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening to port ${port}.`);
});
