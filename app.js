import express from "express";
import bodyParser from "body-parser";
import { List, Item, cloudConnect, closeConnection } from "./dbconfig.js";

import { getDate, getDay, getMonth } from "./date.js";

import path from "path";
import { fileURLToPath } from "url";

cloudConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

let day = getDate();
let weekday = getDay();
let month = getMonth();

const item1 = new Item({
  name: "Welcome to your todolists!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "Hit this trash icon to delete -->",
});

const defaultItems = [item1, item2, item3];

let lists = ["Today", "Home", "Work"];

app.get("/", async (req, res) => {
  console.log("Log in!!");
  let taskNum = defaultItems.length;
  Item.find({})
    .then(async function (items) {
      if (items.length === 0) {
        await Item.insertMany(defaultItems)
          .then(function () {
            console.log("Insert default items successfully!");
          })
          .catch(function () {
            console.log("Failed to insert default items");
          });
        res.redirect("/today");
      } else {
        res.redirect("/today");
        console.log("Parse todolist items in templates succesfully");
      }
    })
    .catch(function () {
      console.log("Failed to parse todolist items in DB!");
    });
});

app.get("/:listName", async (req, res) => {
  console.log("Log in!!");
  let listName = req.params.listName;
  listName = listName.toLowerCase();
  await List.findOne({ name: listName })
    .then(async function (log) {
      if (log != null) {
        console.log("List is exist!");
        let taskNum = log.items.length;
        let title = listName.charAt(0).toUpperCase() + listName.slice(1);
        res.render("list", {
          weekday: title,
          day: weekday + " " + day,
          month: month,
          todo: log.items,
          taskNum: taskNum,
          listName: listName,
          lists: lists,
        });
        console.log("Parse todolist items in templates succesfully");
      } else {
        console.log("List is not exist!!");
        console.log(`Creating ${listName} list.`);
        const newList = new List({
          name: listName,
          items: defaultItems,
        });
        await List.create(newList);
        console.log(`${listName} list is Created!!`);
        res.redirect("/" + listName);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/", async (req, res) => {
  console.log("Log in!!");
  let listName = req.body.listName;
  let item = req.body.newItem;
  console.log(req.body);

  if (item != "") {
    const newItem = new Item({
      name: item,
    });
    await List.findOneAndUpdate(
      { name: listName },
      { $push: { items: newItem } }
    )
      .then(async function (log) {
        console.log(log.items);
        console.log("Already push");
        res.redirect("/" + listName);
      })
      .catch(function (err) {
        console.log("Something went wrong with creating new task!!");
        console.log(err);
      });
  }
});

app.post("/delete", async (req, res) => {
  console.log("Log in!!");
  let delID = req.body.delete;
  let listName = req.body.listName;
  console.log(req.body);
  if (delID != "") {
    await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: delID } } }
    )
      .then(async function (log) {
        console.log(log.items);
        console.log("Delete successfully");
        res.redirect("/" + listName);
      })
      .catch(function (err) {
        console.log("Something wrong with delete!!");
        console.log(err);
      });
  }
});

app.post("/:listName", async (req, res) => {
  console.log("List begin");
  const listName = req.params.listName.toLowerCase();
  res.redirect("/" + listName);
});

app.listen(port, () => {
  console.log(`App listening to port ${port}.`);
});
