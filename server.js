const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Core endpoint
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  // If no date is provided
  if (!dateString) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  // If date is a number (Unix timestamp)
  if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
