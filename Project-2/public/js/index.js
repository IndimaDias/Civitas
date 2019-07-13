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
  }
  // ,
  // getExamples: function() {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  // },
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }
};

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// this npm package will give the list of states in US
// var UsaStates = require('usa-states').UsaStates;

// var usStates = new UsaStates();

//handleCreateAccount is called when the create account link is clicked.
// This will poulate the form in the modal

var $createProfile = $("#createProfile");
var $btnSignUp = $("#btnSignUp");

// This function is called when the create account link is clicked
var handleCreateAccount = function() {
  $("#userProfile").show();
};

// this function is called when the Sign up button in the form is clicked
var handleSignUp = function(event) {
  event.preventDefault();

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

  API.saveProfile(profile);
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
$createProfile.on("click", handleCreateAccount);
$btnSignUp.on("click", handleSignUp);

$(function() {
  $("#userProfile").hide();
});
