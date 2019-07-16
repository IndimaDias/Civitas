
// // The API object contains methods for each kind of request we'll make
var API = {
  saveProfile: function(profile) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/userProfile",
      data: JSON.stringify(profile),
      success: function(dbProfile){
        console.log(dbProfile);
        localStorage.setItem('profile', JSON.stringify(dbProfile));
        window.location.href = "../profile.html?";
      }
      
    });
  },

  getProfile: function(userName) {
    $.ajax({  
      type: 'GET',  
      dataType: 'json',
      url: '/api/userProfile/' + userName,
      data: { userName: userName },
      success: function(dbProfile) {
        if(isEmpty(dbProfile)){
          alert("User not found");
          return;
        }
        var profileData = {
          firstName: dbProfile.firstName,
          lastName: dbProfile.lastName, 
          illness: dbProfile.illness,
          city: dbProfile.city,
          state: dbProfile.state
        };

        console.log(profileData);
        localStorage.setItem('profile', JSON.stringify(profileData));      
        // console.log(JObject);
        window.location.href = "../profile.html?";
      }
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

function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
    }

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
    var errMsg = $("<p>");
    errMsg.css("color","red");
    var valid = true;

    if ($("#firstName").val() == ""){ 
      errMsg.text("First Name should be entered") ;
      valid = false;  
    }

    if ($("#lastName").val() ==""){
      errMsg.text("Last Name should be entered") ;
      valid = false;
    }

    if ($("#uName").val() ==""){
      errMsg.text("Username should be entered") ;
      valid = false;
    }

    if ($("#illness").val() ==""){
      errMsg.text("Illness should be entered") ;
      valid = false;
    }

    if ($("#city").val() ==""){
      errMsg.text("City should be entered") ;
      valid = false;
    }

    if ($("#state").val() ==""){
      errMsg.text("State should be entered") ;
      valid = false;
    }else{
      if($("#state").val().trim().lenth>2){
        errMsg.text("Use abbrivation for the state name") ;
        valid = false;
      }
    }
    console.log(valid);

    if(!valid){
      $("#divError").append(errMsg);
      $("#divError").show();
     
    }
    return valid;
  }
  // ^^^^^^^^^^^^^^^^End of helper function for validating form inputs^^^^^^^^^^^^^^^^^^^^^^^^
  
  var validForm = validateForm();
  console.log(validForm);
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
    console.log(profile);
    API.saveProfile(profile);
  };
};
// *****************************end of function handleSignUp**********************************



var handleLogIn = function(){
  event.preventDefault();
  
  var userName = $("#userName").val().trim();
 
  console.log(userName);
  API.getProfile(userName);
 
};

$createProfile.on("click",handleCreateAccount);
$btnSignUp.on("click",handleSignUp);
$btnLogIn.on("click",handleLogIn);

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

// document on load 
$(function() {
  $("#userProfile").hide();
  $("#divError").hide();



});
