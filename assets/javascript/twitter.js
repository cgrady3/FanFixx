// scrape setup
var cheerio = require("cheerio");
var axios = require("axios");

// scrape twitter info
function twitterInfo() {
    let twitterHandle = $(this).attr("data-twitter");
  
    axios.get("https://twitter.com/" + twitterHandle).then(function (response) {
   
      var $ = cheerio.load(response.data);
      var results = [];
  
      $("table.tweet").each(function (i, element) {
        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        let tweet = $(element).children().attr("div.tweet-text");
        let picText = $(element).children().attr("span.metadata").children().attr("a").text();
        let pic;
        if (picText === "View photo"){
          let pic = $(element).children().attr("span.metadata").children().attr("href")
        }
  
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          link: link,
          pic: pic,
        });
      });
  
      // Log the results once you've looped through each of the elements found with cheerio
      console.log(results);
    });
  }