// ----------------------------------------------------------------
// Question generation
// ----------------------------------------------------------------
var questionArr = [
  {
    number: 1,
    question: "PLACEHOLDER QUESTION!!!"
  },
  {
    number: 2,
    question: "PLACEHOLDER QUESTION!!!"
  },
  {
    number: 3,
    question: "PLACEHOLDER QUESTION!!!"
  },
  {
    number: 4,
    question: "PLACEHOLDER QUESTION!!!"
  }
];

var answersArr = [
  {
    number: 1,
    answer1: "testing answers"
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
    "<option value='2'>2</option>" +
    "<option value='3'>3</option>" +
    "<option value='4'>4</option>";
  var newDiv = $("<div>");
  $("#questionDiv")
    .append(newDiv)
    .append(questionNumber)
    .append(question)
    .append(answerOption);
}

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
    var newPlant = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    };

    var currentURL = window.location.origin;

    $.post(currentURL + "/api/plants", newPlant, function(data) {
      console.log(newPlant);
      $("#matchName").text(data.plantName);
      $("#matchImage").attr("src", data.plantPic);
    });
  }
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
