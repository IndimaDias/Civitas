$(function(){
    console.log(window.location.search.substring(1));
    var searchStr = JSON.parse(window.location.search.substring(1));
    console.log(searchStr);
});