var request = require('request');

module.exports.searchResults = function(search) {
  var url = 'https://www.google.co.uk/search?q='
  + search
  + '&dcr=0&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjd0OCj9aTWAhXkCMAKHTTjDtUQ_AUICigB&biw=1280&bih=918'
  request(url, function(err, response, html) {
    if (err) throw err;
    //div id="rg" - contains results
    //div class="_aOd rg_ilm"
    html = html.split('<div id="search">')[1]// pull out the search results
    .split('<a href="/url?q'); //split results - first result is [1]
    console.log(html);
  });
}