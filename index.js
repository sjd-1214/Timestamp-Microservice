// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date_string", function (req, res) {
  let date_string = req.params.date_string;
   // Try to parse the date_string as a number first
   const timestamp = Number(date_string);
    
   // Check if it is a valid number and not NaN
   if (!isNaN(timestamp)) {
     date = new Date(timestamp);
   } else {
     date = new Date(date_string);
   }
  if (date_string.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
