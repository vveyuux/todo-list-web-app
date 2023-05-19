const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const port = 3000;

let lists = ["home", "works"];

let items = [
  "Coding the final project",
  "Learning about API",
  "Reading ML Book",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

app.get("/", (req, res) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let taskNum = items.length;

  let today = new Date();
  let weekday = today.getDay();
  weekday = weekdays[weekday];
  let day = today.getDate();
  let month = today.getMonth();
  month = months[month];
  // console.log([weekday, day, year]);
  // day = today.toLocaleDateString("en-UK", options);

  res.render("list", {
    weekday: weekday,
    day: day,
    month: month,
    todo: items,
    taskNum: taskNum,
    lists: lists[0],
  });
});

app.post("/", (req, res) => {
  let lists = req.body.lists;
  let item = req.body.newItem;
  let del = req.body.delete;
  // console.log(req.body);

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
  // console.log(items);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
