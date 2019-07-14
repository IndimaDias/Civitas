// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
var API = {
  saveProfile: function(profile) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/userProfile",
      data: JSON.stringify(profile)
    });
  },

  getProfile: function(userName) {
    console.log("rr" + userName);
    return $.ajax({
      type: "GET",
      url: "api/userProfile/" + userName,
      data: JSON.stringify(profile)
    });
  }

};


// this npm package will give the list of states in US
// var UsaStates = require('usa-states').UsaStates;

// var usStates = new UsaStates();

//handleCreateAccount is called when the create account link is clicked.
// This will poulate the form in the modal

var $createProfile = $("#createProfile");
var $btnSignUp = $("#btnSignUp");
var $btnLogIn = $("#btnLogIn");

// This function is called when the create account link is clicked
var handleCreateAccount = function() {
  $("#userProfile").show();
};

// this function is called when the Sign up button in the form is clicked
var handleSignUp = function(event) {
  event.preventDefault();

  API.saveProfile(profile);
};

var handleLogIn = function(){
  event.preventDefault();
  
  var userName = $("#userName").val().trim();
  console.log(userName);
  API.getProfile(userName)
};

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

 
// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
$createProfile.on("click",handleCreateAccount);
$btnSignUp.on("click",handleSignUp);
$btnLogIn.on("click",handleLogIn);

$(function() {
  $("#userProfile").hide();
});
