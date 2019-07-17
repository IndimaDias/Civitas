$(function(){
    // console.log(window.location.search.substring(1));
    var searchStr = JSON.parse(localStorage.getItem('profile'))
    console.log(searchStr.firstName);
    $("#first").text(searchStr.firstName);
    $("#last").text(searchStr.lastName);
    $("#city").text(searchStr.city);
    $("#state").text(searchStr.state);
    $("#illness").text(searchStr.illness);
    
});

$.get("/api/illness", function(data) {
    for (var i = 0; i < data.length; i++) {
      var wellSection = $("<div>");
      wellSection.addClass("others");
      wellSection.attr("id", "others" + i);
      $("#others").append(wellSection);
      $("#others" + i).append("<h2>firstName" + data[i].firstName + "</h2>");
      $("#others" + i).append("<h3>lastName: " + data[i].lastName + "</h2>");
      $("#others" + i).append("<h3>city: " + data[i].city + "</h2>");
      $("#others" + i).append("<h3>state: " + data[i].state + "</h2>");
    }

});