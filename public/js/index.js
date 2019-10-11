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
  // ----------------------------------------------------------------
  // End of question generation
  // ----------------------------------------------------------------

  // ----------------------------------------------------------------
  // This block starts the login functionality
  // ----------------------------------------------------------------
  $(document).on("click", "#submit", handleLogin);

  var name;
  var pass;
  // Function for finding ID of user by name/pass
  function handleLogin() {
    console.log("handle login");
    name = $("#name").val();
    pass = $("#password").val();
    $.ajax({
      url: "/api/users/" + name + "/" + pass,
      method: "GET"
    }).then(function(response) {
      window.location = "/login/user/" + response.id;
    });
  }
  // Timeout for login (used on survey page)
  function timing() {
    console.log("handle login");
    $.ajax({
      url: "/api/users/" + user + "/" + userPass,
      method: "GET"
    }).then(function(response) {
      window.location = "/login/user/" + response.id;
    });
  }
  // ----------------------------------------------------------------
  // End login page block
  // ----------------------------------------------------------------

  // ----------------------------------------------------------------
  // Block for survey page user create and find match
  // ----------------------------------------------------------------
  $(document).on("click", "#survey", handleSurvey);
  var user;
  var userEmail;
  var userPass;
  var score;
  // This function handles the matching and sends user to their page
  function handleSurvey() {
    score = $("#q1").val() + $("#q2").val() + $("#q3").val() + $("#q4").val();
    $.ajax({
      url: "/api/plants/" + score,
      method: "GET"
    }).then(function(response) {
      if (response === null) {
        $.ajax({
          url: "/api/plants",
          method: "GET"
        }).then(function(response) {
          var plants = response.length;
          var rand = Math.floor(Math.random() * plants + 1);
          plantId = rand;
          handleUser(plantId);
          setTimeout(timing, 1000);
        });
      } else {
        plantId = response.id;
        handleUser(plantId);
        setTimeout(timing, 1000);
      }
    });
  }
  // End matching code
  // Function for creating newUser on click
  function handleUser(plantId) {
    user = $("#user").val();
    userEmail = $("#email").val();
    userPass = $("#password").val();
    var newuser = {
      userName: user,
      userEmail: userEmail,
      userPass: userPass,
      score: score,
      plantId: plantId
    };
    $.ajax({
      url: "/api/users",
      method: "POST",
      data: newuser
    });
  }
  // Document Ready end
});
