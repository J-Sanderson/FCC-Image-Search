var express = require('express');
const controller = require('./controller');
var app = express();
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/search/:term", function(req, res) {
  //paginate next 10 with ?offset=2
  controller.searchResults(req.params.term, req.query.offset, res);
})

app.get("/recent", function(req, res) {
  controller.savedSearches(res);
})

app.listen(process.env.PORT,);