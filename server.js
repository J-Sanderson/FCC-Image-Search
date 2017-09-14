var express = require('express');
const controller = require('./controller');
var app = express();
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/search/:term", function(req, res) {
  res.send(controller.searchResults(req.params.term));
  //res.send(JSON.stringify({url: "tbd", snippet: "tbd", thumbnail: "tbd", context: "tbd"}));
})

app.get("/recent", function(req, res) {
  res.send("This will show the most recent searches");
})

app.listen(process.env.PORT,);