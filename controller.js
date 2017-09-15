
var Flickr = require("node-flickr");
var keys = {"api_key": process.env.KEY}

module.exports.searchResults = function(searchVal, res) {
  var flickr = new Flickr(keys);
  flickr.get("photos.search", {"tags": searchVal}, function(err, result){
    if (err) throw err;
    console.log(result.photos.photo);
    //create array to hold results to return
    var resList = [];
    //get first ten results
    for (var i = 0; i <10; i++) {
      resList.push({
        url: 'https://www.flickr.com/photos/' + result.photos.photo[i].owner + '/' + result.photos.photo[i].id,
        title: result.photos.photo[i].title
      })
    }
    //return array
    res.send(resList);
  });
}