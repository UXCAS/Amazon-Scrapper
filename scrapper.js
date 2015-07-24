
var request = require('request'),
    cheerio = require('cheerio');
    fs = require('fs');
    readlineSync = require('readline-sync');
    wordfreq = require('wordfreq');
    sentiment = require('sentiment');

    var ASIN;
    var PRODUCT_NAME;
    var MAX_NO_PAGES = 25;
    var FILE_TYPE = "csv";






     ASIN = readlineSync.question('Enter ASIN NUMBER \n');

     PRODUCT_NAME = readlineSync.question('Enter File Name \n');

    MAX_NO_PAGES = readlineSync.question('How many pages do you want to scrape?\n');

     FILE_TYPE = readlineSync.question('What kind of file would you like? (txt or csv)\n');

    if(FILE_TYPE === "csv"  ){

    fs.appendFile(PRODUCT_NAME+'review.csv', 'Title,Author,Stars,Review,Sentiment', function (err) {
       if (err) throw err;
       console.log('It\'s saved! in same location.');
   });

   fs.appendFile(PRODUCT_NAME+'review.csv','\n', function (err) {
      if (err) throw err;
  });

    var percentagecomplete = 0;
     for(var i=1;i<=MAX_NO_PAGES;i++){
          console.log("Scraping Page Number: " + i);
          request('http://www.amazon.com/Apple-iPhone-Silver-16-Unlocked/product-reviews/'+ASIN+'/ref=cm_cr_pr_btm_link_2?ie=UTF8&showViewpoints=2&sortBy=recent&reviewerType=all_reviews&formatType=all_formats&filterByStar=all_stars&pageNumber='+i, function(error, response, body) {
            // Hand the HTML response off to Cheerio and assign that to
            //  a local $ variable to provide familiar jQuery syntax.
            var $ = cheerio.load(body);

            // Exactly the same code that we used in the browser before:
            // console.log($('#cm_cr-review_list'));
            $('#cm_cr-review_list').children('div').each(function(){
                // console.log($(this).find('.a-icon-alt').text());
                var starRating = $(this).find('.a-icon-alt').text();
                var title = $(this).find('.review-title').text();
                var author = $(this).find('.author').text();
                var reviewText = $(this).find('.review-text').text().trim();
                var tone = sentiment(reviewText).score;
                if(reviewText != ""){
                  fs.appendFile(PRODUCT_NAME+'review.csv',title+','+author+','+starRating+','+reviewText+','+tone, function (err) {
                     if (err) throw err;
                 });
                 fs.appendFile(PRODUCT_NAME+'review.csv','\n', function (err) {
                    if (err) throw err;
                });
              }
          });
          percentagecomplete ++;
          console.log("Writing a very large file. Percentage Complete = "+ parseInt(((percentagecomplete/MAX_NO_PAGES) *100))+"%");
        });
    }
  }


  if(FILE_TYPE === "txt" ){
    var percentagecomplete = 0;
    var alltext;
    var wordcloudPrinted = false;
     for(var i=1;i<=MAX_NO_PAGES;i++){
          console.log("Scraping Page Number: " + i);
          request('http://www.amazon.com/Apple-iPhone-Silver-16-Unlocked/product-reviews/'+ASIN+'/ref=cm_cr_pr_btm_link_2?ie=UTF8&showViewpoints=2&sortBy=recent&reviewerType=all_reviews&formatType=all_formats&filterByStar=all_stars&pageNumber='+i, function(error, response, body) {
            // Hand the HTML response off to Cheerio and assign that to
            //  a local $ variable to provide familiar jQuery syntax.
            var $ = cheerio.load(body);

            // Exactly the same code that we used in the browser before:
            // console.log($('#cm_cr-review_list'));
            $('#cm_cr-review_list').children('div').each(function(){
                // console.log($(this).find('.a-icon-alt').text());
                var starRating = $(this).find('.a-icon-alt').text();
                var title = $(this).find('.review-title').text();
                var author = $(this).find('.author').text();
                var reviewText = $(this).find('.review-text').text().trim();
                alltext = alltext + reviewText;
                if(reviewText != ""){
                  fs.appendFile(PRODUCT_NAME+'review.txt',reviewText, function (err) {
                     if (err) throw err;
                 });
              }
          });
          percentagecomplete ++;
          console.log("Writing a very large file. Percentage Complete = "+ parseInt(((percentagecomplete/MAX_NO_PAGES) *100))+"%");
          if(!wordcloudPrinted){
            console.log("Writing out word frequency");
            var list = wordfreq().process(alltext);
            for(var i=0;i<list.length;i++){
              fs.appendFile(PRODUCT_NAME+'worldcloud.txt',list[i][0]+","+list[i][1]+"\n", function (err) {
                 if (err) throw err;
             });
            }
            var happyList = sentiment(alltext).positive;
            var negativeList = sentiment(alltext).negative;

            fs.appendFile(PRODUCT_NAME+'sentiment.txt','Happy Words \n', function (err) {
               if (err) throw err;
           });
           for(var i =0;i<happyList.length;i++){
             fs.appendFile(PRODUCT_NAME+'sentiment.txt',happyList[i]+'\n', function (err) {
                if (err) throw err;
            });
           }

           fs.appendFile(PRODUCT_NAME+'sentiment.txt','Bad Words \n', function (err) {
              if (err) throw err;
          });
          for(var i =0;i<negativeList.length;i++){
            fs.appendFile(PRODUCT_NAME+'sentiment.txt',negativeList[i]+'\n', function (err) {
               if (err) throw err;
           });
          }

            console.log("The overall sentiment for the product is " + sentiment(alltext).score);
            wordcloudPrinted = true;
          }
        });
    }
  }
