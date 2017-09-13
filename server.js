var express = require('express');
var app = express();
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/search/:term", function(req, res) {
  res.send("You searched for " + req.params.term);
})

app.get("/recent", function(req, res) {
  res.send("This will show the most recent searches");
})

app.listen(process.env.PORT,);