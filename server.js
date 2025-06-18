const express = require("express");
const app = express();

// Enable CORS for FCC testing
const cors = require("cors");
app.use(cors());

// Serve static files (like index.html)
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  let date;

  // If no date provided, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // If input is a timestamp (only digits), convert to number
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return Unix (milliseconds) and UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port 3000
const listener = app.listen(3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
