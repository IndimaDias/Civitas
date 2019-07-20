$(function(){
    
    var searchStr = JSON.parse(localStorage.getItem('profile'));
    console.log(searchStr.firstName);
    $("#first").text(searchStr.firstName);


    var userName = searchStr.userName;
    
    



var userIllness = searchStr.illness;



$(document).on("click", "#btnConnect",function() {
    console.log("email");
    window.location.href = "../email.html";
//    
});

// $.get("/api/illness/" + userIllness+"&"+userName, function(data) {

    $.ajax({  
        type: 'GET',  
        dataType: 'json',
        url: '/api/illness' ,
        data: { userIllness : userIllness, userName: userName },
        success: function(data) {
            console.log("test");
            console.log(data);
            var tableC = $("#contactsTbl");
            
        
            for (var i = 0; i < data.length; i++) {
        
                var tblRow = $("<tr>").append(
                    $("<td>").text(data[i].firstName),
                    $("<td>").text(data[i].lastName),
                    $("<td>").text(data[i].city),
                    $("<td>").text(data[i].state),
                    $("<button>").text("Connect").attr("id","btnConnect").addClass("btn")
                );
              
        
                tableC.append(tblRow);
        
            }
        }

 

});
$.get("api/about/"+userIllness,function(data){
    console.log(data);
    var url = $("#url")
    url.attr("href",data.replace(/'/g,""));
    url.text(userIllness);
  });

$("#articlHeading").text("Reaserch Articles on " + userIllness);
  getApiResult(userIllness);
});


