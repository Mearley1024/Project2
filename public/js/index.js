// Document ready
$(document).ready(function() {
  // ----------------------------------------------------------------
  // Question generation
  // ----------------------------------------------------------------
  var questionArr = [
    {
      number: 1,
      question: "Have you ever owned any plants before?"
    },
    {
      number: 2,
      question: "How much sunlight will your plants home be getting?"
    },
    {
      number: 3,
      question: "Which of these personality traits describes you best?"
    },
    {
      number: 4,
      question: "Which trait do you feel you can improve in the most?"
    }
  ];

  var answersArr = [
    {
      number: 1,
      answer1: "Once",
      answer2: "Never",
      answer3: "A few",
      answer4: "Call me a plant God!"
    },
    {
      number: 2,
      answer1: "A lot",
      answer2: "Somewhat",
      answer3: "A little",
      answer4: "None"
    },
    {
      number: 3,
      answer1: "Charming",
      answer2: "Independent",
      answer3: "Energetic & Witty",
      answer4: "Empathetic"
    },
    {
      number: 4,
      answer1: "Impulsiveness",
      answer2: "Laziness",
      answer3: "Optomism",
      answer4: "Temper"
    }
  ];

  for (let i = 0; i < questionArr.length; i++) {
    var questionNumber = "<h3> Question #" + questionArr[i].number + "</h3>";
    var question = "<h4>" + questionArr[i].question + "</h4>";
    var answerOption =
      "<select data-placeholder='' class='chosen-value' id=q" +
      questionArr[i].number +
      ">" +
      "<option value=''></option>" +
      "<option value='1'>" +
      answersArr[i].answer1 +
      "</option>" +
      "<option value='2'>" +
      answersArr[i].answer2 +
      "</option>" +
      "<option value='3'>" +
      answersArr[i].answer3 +
      "</option>" +
      "<option value='4'>" +
      answersArr[i].answer4 +
      "</option>";
    var newDiv = $("<div>");
    $("#questionDiv")
      .append(newDiv)
      .append(questionNumber)
      .append(question)
      .append(answerOption);
  }

  // This block starts a listener for the login page
  $(document).on("click", "#submit", handleLogin);

  var name;
  var pass;
  // Function for finding ID of user that logs in
  function handleLogin() {
    name = $("#name").val();
    pass = $("#password").val();
    $.ajax({
      url: "/api/users/" + name + "/" + pass,
      method: "GET"
    }).then(function(response) {
      window.location = "/login/user/" + response.id;
    });
  }
  // End login page block

  $(document).on("click", "#submit", function() {
    function validateForm() {
      var isValid = true;
      $(".form-control").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });

      $(".chosen-value").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });
      return isValid;
    }

    if (validateForm()) {
      var newUser = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val()]
      };

      // var currentURL = window.location.origin;

      $.post("/api/plants", newUser, function(data) {
        console.log(newUser);
        $("#matchName").text(data.plantName);
        $("#matchImage").attr("src", data.plantPic);
      });
    }
  });
});

// ----------------------------------------------------------------
// End of question generation
// ----------------------------------------------------------------
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
