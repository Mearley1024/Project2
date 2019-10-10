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

  var newDiv = $("<div>");

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

  // $(document).on("click", "#submit", function() {
  //   function validateForm() {
  //     var isValid = true;
  //     $(".form-control").each(function() {
  //       if ($(this).val() === "") {
  //         isValid = false;
  //       }
  //     });

  //     $(".chosen-value").each(function() {
  //       if ($(this).val() === "") {
  //         isValid = false;
  //       }
  //     });
  //     return isValid;
  //   }

  //   if (validateForm()) {
  //     var newUser = {
  //       name: $("#name").val(),
  //       photo: $("#photo").val(),
  //       scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val()]
  //     };

  //     // var currentURL = window.location.origin;

  //     $.post("/api/plants", newUser, function(data) {
  //       console.log(newUser);
  //       $("#matchName").text(data.plantName);
  //       $("#matchImage").attr("src", data.plantPic);
  //     });
  //   }
  // });
});

// ----------------------------------------------------------------
// End of question generation
