
var Flickr = require("node-flickr");
var mongoose = require('mongoose');
var keys = {"api_key": process.env.KEY}

mongoose.connect('mongodb://' + process.env.ID + ':' + process.env.PW + '@ds157233.mlab.com:57233/search');
var searchSchema = new mongoose.Schema({
  term: String,
  when: Object
});
var Searchmodel = mongoose.model('search', searchSchema);

module.exports.searchResults = function(searchVal, offset, res) {
  var flickr = new Flickr(keys);
  flickr.get("photos.search", {"tags": searchVal}, function(err, result){
    if (err) throw err;
    //console.log(result.photos.photo);
    //create array to hold results to return
    var resList = [];
    //default to 1st page if offset < 1 || undefined
    if (offset < 1 || typeof offset === 'undefined') {
      offset = 1
    };
    //get first ten results
    for (var i = 10 * (offset-1); i < 10 * offset; i++) {
      resList.push({
        url: 'https://www.flickr.com/photos/' + result.photos.photo[i].owner + '/' + result.photos.photo[i].id,
        title: result.photos.photo[i].title
      })
    }
    //add to database
    var now = new Date();
    var newSearch = Searchmodel({term: searchVal, when: now}).save(function(err, data) {
      if (err) throw err;
      //return array
      res.setHeader('Content-Type', 'application/json');
      res.send(resList);
    });
  });
}