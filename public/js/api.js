var apiKey = "rvcfuidvogznrmzf";
var host = "https://healthfinder.gov";
var path = "/api/v2/";
var file = "TopicSearch.json";
//  var lang = getParameterByName('lang') ? getParameterByName('lang') : 'en';
var query = "?api_key=" + apiKey;
var apiUrl = host + path + file + query;
var apiDisplayResourceURL = "apiDisplayResource.html" + query + "&";
var resources;
// var searchText;
// let queryURL = "https://cors-anywhere.herokuapp.com/";

// export {getApiResult};

function getApiResult(txt) {
  var content = "";
  var output = $.ajax({
    url: apiUrl + "&keyword=" + txt,
    type: "GET",
    data: {},
    dataType: "json",
    success: function(data) {
      // console.log(data);
      if (data.Result.Error == "True") {
        $("#articlesH3").text(data.Result.Message);

        content += "<ul>";
      } else {
        var articlesList = $("#articleList");
        // articlesList.addClass("carousel");
        var articleCarousel = $("<div>").addClass("carousel");

        
        resources = data.Result.Resources.Resource;
        console.log(resources);

        for (var i = 0; i < resources.length; i++) {

          apiDisplayResourceURL = resources[i].AccessibleVersion;
            var carouselItem = $("<div />"),
            a = $("<a />", { href: apiDisplayResourceURL + resources[i].Type }),
            img = $("<img/>",{ src: resources[i].ImageUrl});
            // a.addClass("carousel-item");
            // a.append(img);
            

            a.text(resources[i].Title);
            carouselItem.attr("id","carouselItem");
            carouselItem.addClass("carousel-item")
            carouselItem.append(img,a);
            a.addClass("url text-center");
          // li.addClass("listItem");

          // $UL.append(li.append(a));
          // $UL.append(img);
          articleCarousel.append(carouselItem);
        }

        articlesList.append(articleCarousel);
        $('.carousel').carousel();
      }
    }
  });
}
