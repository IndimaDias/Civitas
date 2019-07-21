
var apiKey = 'rvcfuidvogznrmzf';
var host = 'https://healthfinder.gov';
var path = '/api/v2/';
var file = 'TopicSearch.json';
//  var lang = getParameterByName('lang') ? getParameterByName('lang') : 'en';
var query = '?api_key=' + apiKey;
var apiUrl = host + path + file + query;
var apiDisplayResourceURL = 'apiDisplayResource.html' + query + '&';
var resources;
// var searchText;
let queryURL = "https://cors-anywhere.herokuapp.com/";

// export {getApiResult};

function getApiResult(txt) {
    var output = $.ajax({
                url: apiUrl + '&keyword=' + txt,
                type: 'GET',
                data: {},
                dataType: 'json',
                success: function (data){
                    console.log(data)
                    if (data.Result.Error == "True") {
                      // document.getElementById("articles").innerHTML = '<h3>' 
                      // + data.Result.Message + '</h3>';
                       $("#articlesH3").text(data.Result.Message);

                        content += "<ul>"
                        }
                    else {
                         var articlesList = $("#articleList");  
                         var $UL = $("<ul>");

                         var content = '';
                         resources = data.Result.Resources.Resource;
                         console.log(resources);

                        for (var i = 0; i < resources.length; i++) {
                          //   content += '<li><a href="' + apiDisplayResourceURL + resources[i].Type + 'Id=' + resources[i].Id + '" target="_blank">' + resources[i].Title + '</a></li>';
                           //   console.log(content) }
                           //   content += '</ul>';  
                            //   document.getElementById("articleList").innerHTML = content;
                           var li = $('<li />'),
                            a  = $('<a />',  {href : apiDisplayResourceURL + resources[i].Type});
                           // sp = $('<span />', {'class' : 'user-list', text : user});

                           a.text(resources[i].Title);
                           li.addClass("listItem");

                           $UL.append( li.append( a) );
                         }

                         articlesList.append($UL);
                    }
                }
            })
}