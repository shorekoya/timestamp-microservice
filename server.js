const express = require("express");
const app = express();

// Enable CORS for FCC testing
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Root route (home page)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // If no date is provided, use current date
  if (!date) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  // Check if date is a Unix timestamp (only digits)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Handle invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid timestamp
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
