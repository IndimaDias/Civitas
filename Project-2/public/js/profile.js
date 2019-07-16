$(function(){
    // console.log(window.location.search.substring(1));
    var searchStr = JSON.parse(localStorage.getItem('profile'))
    console.log(searchStr.firstName);
    $("#first").text(searchStr.firstName);
    $("#last").text(searchStr.lastName);
    $("#city").text(searchStr.city);
    $("#state").text(searchStr.state);
    $("#illness").text(searchStr.illness);
    last
});