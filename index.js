// index.js
// where your node app starts

var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// ✅ Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  let date;

  if (!dateInput) {
    // No date provided, use current date
    date = new Date();
  } else if (!isNaN(dateInput)) {
    // If the input is a number (Unix timestamp)
    date = new Date(parseInt(dateInput));
  } else {
    // If it's a normal date string
    date = new Date(dateInput);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
