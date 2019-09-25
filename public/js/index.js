// // The API object contains methods for each kind of request we'll make
var API = {
  // method to save user entered data to create an account
  saveProfile: function(profile) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/userProfile",
      data: JSON.stringify(profile),

      success: function(dbProfile){
          // save profile details in local storage for reference
          localStorage.setItem('profile', JSON.stringify(dbProfile));
          window.location.href = "../profile.html?";               
      },
      error : function(xhr,status,errMsg){
        // if profile creation returns an error
        if(xhr.status&&xhr.status==500){          
           var errorM = xhr.responseText;          
           displayMessage(errorM);
         }else{
           displayMessage("Something went wrong");
         }
      }


    });
  },

  // method to get user details from the database when log in
  getProfile: function(userName) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/api/userProfile/" + userName,
      data: { userName: userName },
      success: function(dbProfile) {
        if (isEmpty(dbProfile)) {
          alert("User not found");
          return;
        }
        var profileData = {
          firstName: dbProfile.firstName,
          lastName: dbProfile.lastName, 
          illness: dbProfile.illness,
          city: dbProfile.city,
          state: dbProfile.state,
          userName : dbProfile.userName,
          email : dbProfile.email
        };

        // store data in local storage
        localStorage.setItem('profile', JSON.stringify(profileData));              
        window.location.href = "../profile.html?";
      }
    });
  },

  saveEmail: async function(emailData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/send",
      data: JSON.stringify(emailData)
  });
  
}
};

// this npm package will give the list of states in US
// var UsaStates = require('usa-states').UsaStates;

// var usStates = new UsaStates();

//handleCreateAccount is called when the create account link is clicked.
// This will poulate the form in the modal
// import  getApiResult from "./api.js"

var $createProfile = $("#createProfile");
var $btnSignUp = $("#btnSignUp");
var $btnLogIn = $("#btnLogIn");
var $btnSearch = $("#btnSearch");

// ********************function to check if the object is empty******************************
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
      }
  return true;
}

// ******************************************************************************************
// ******************************* This function will dynamically add the error message*******************
function displayMessage(errorMessage){
  
   var errMsg = $("<p>");
   errMsg.css("color","red");
   errMsg.text(errorMessage) ;
   $("#divError").append(errMsg);
   $("#divError").show();
}

// *********************************************************************************************

// This function is called when the create account link is clicked
var handleCreateAccount = function() {
  $("#userProfile").show();
};

// *********************function handleSignUp****************************************
// this function is called when the Sign up button in the form is clicked
var handleSignUp = function(event) {
  event.preventDefault();
  console.log("test");
  $("#divError").hide();
  // helper function ^^^^^^^^^^^^^^^^^^^^^^^^validateForm^^^^^^^^^^^^^^^^^^^^^^^^^^^
  function validateForm(){
    // This function will validate the form inputs
    errMsg = "";
    var valid = true;

    if ($("#firstName").val() == ""){ 
      errMsg ="First Name should be entered" ;
      valid = false;  
    }

    if ($("#lastName").val() ==""){
      errMsg = "Last Name should be entered" ;
      valid = false;
    }

    if ($("#uName").val() ==""){
      errMsg ="Username should be entered" ;
      valid = false;
    }

    if ($("#illness").val() ==""){
      errMsg = "Illness should be entered" ;
      valid = false;
    }

    if ($("#city").val() ==""){
      errMsg = "City should be entered" ;
      valid = false;
    }

    if ($("#state").val() ==""){
      errMsg = "State should be entered" ;
      valid = false;
    }else{
      if($("#state").val().trim().lenth>2){
        errMsg = "Use abbrivation for the state name" ;
        valid = false;
      }
    }
  

    if(!valid){
      displayMessage(errMsg);
     
    }
    return valid;
  }
  // ^^^^^^^^^^^^^^^^End of helper function for validating form inputs^^^^^^^^^^^^^^^^^^^^^^^^
  
  var validForm = validateForm();
  
  if (validForm){

    var profile = {
      firstName: $("#firstName")
        .val()
        .trim(),
      lastName: $("#lastName")
        .val()
        .trim(),
      userName: $("#uName")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      illness: $("#illness")
        .val()
        .trim(),
      city: $("#city")
        .val()
        .trim(),
      state: $("#state")
        .val()
        .trim()
    };
   
    API.saveProfile(profile);
    
  };
};
// *****************************end of function handleSignUp**********************************

var handleLogIn = function(){
  event.preventDefault();  
  var userName = $("#userName").val().trim();
  API.getProfile(userName);
};


// create account link
$createProfile.on("click",handleCreateAccount);
// signup button on the modal
$btnSignUp.on("click",handleSignUp);
// login button
$btnLogIn.on("click",handleLogIn);

$btnSearch.on("click",function(event) {
  event.preventDefault();
 //  var queryURL = buildQueryURL();         
  console.log('health');
  var search = $("#searchText").val().trim();
  $("#articlHeading").text("Reaserch Articles on " + search);

  $.get("api/about/"+search,function(data){
    console.log(data);
    var url = $("#url")
    url.attr("href",data.replace(/'/g,""));
    url.text(search);
    // url.text()
    // // window.location.href = "about.html";    
    console.log("get");
  });
  $("#articleList").empty();
  $("#communitDesc").empty();
  getApiResult(search);
  });

  // ___________________

  $("#emailSubmit").on("click",function(){
    event.preventDefault();
    var test = {
      to: $("#toEmail").val().trim(),
      from: $("#fromEmail").val().trim(),
      subject: $("#subject").val().trim(),
      message: $("#message").val().trim(),
    }
  
    API.saveEmail(test);
  
      $("#toEmail").val("")
      $("#fromEmail").val("")
      $("#subject").val("")
      $("#message").val("")
  
  });

// document on load

$(function() {
  // hide modal and error message
  $("#userProfile").hide();
  $("#divError").hide();
  $("#userProfile").modal({
    dismissible: true
  });
  getApiResult("*");
});
// *********** Code to make API call  to healthfider.gov to get articles related to certain search terms ***********

// $("#search").on("submit", function(event) {
//     event.preventDefault();
//    //  var queryURL = buildQueryURL();         
//     console.log('health');
//     var search = $("#term").val().trim();
//     getApiResult(search);
//     });