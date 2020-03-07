var currentQuestion = 0;
var initialsInput = $("#initials-text");
var initialsArray = [];
var secondsLeft = questions.length * 15;
var xInterval = null;
var newInitials = null;

// Start the timer and shows the content of the quiz

$(".start").click(function() {
  setTimer();
  $(".start").hide();
  $(".quiz").show();
  showQuestion();
});

// Timer function

function setTimer() {
  xInterval = setInterval(function() {
    $("#timer").html(secondsLeft);
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(xInterval);
      timeUp();
    }
  }, 1000);
};

//clicking on the start quiz button fires howQuestion() function

function showQuestion() {
  var choices = questions[currentQuestion].choices;
  var question = questions[currentQuestion].question;
  $(".quiz h2").text(question);
  $(".quiz ul").html("");
  for (var i = 0; i < parseInt(choices.length); i++) {
    var show = questions[currentQuestion].choices[i];
    $(".quiz ul").append(`<li class="button-select" id="${i}">${show}</li>`);
  };

  // comparing user's guests with correct answer with on-click if/else statement. Feedback is appended and styled.

  $("li").click(function() {
    var guessid = $(this).attr("id");
    var guess = questions[currentQuestion].choices[guessid];
    var answer = questions[currentQuestion].answer;

    // checking if user's guess matches correct answer

    if (answer === guess) {
      $(".feedback").fadeIn(200);
      $(".feedback")
        .html("<h4>Correct!<h4>")
        .fadeOut(900);
      $(".feedback").css({
        color: "green",
        "text-align": "center",
        "border-top": "lightgrey",
        "border-top-width": "1px",
        "border-top-style": "solid"
      });
      currentQuestion++;
      showScorePage();
    } else {
      $(".feedback").fadeIn(200);
      $(".feedback")
        .html("<h4>Wrong!<h4>")
        .fadeOut(900);
      $(".feedback").css({
        color: "red",
        "text-align": "center",
        "border-top": "grey",
        "border-top-width": "1px",
        "border-top-style": "solid"
      });

      // penalizes player by 10 seconds for each wrong answer

      secondsLeft = secondsLeft -= 10;
      currentQuestion++;
      showScorePage();
    }
  });
}

function showScorePage() {
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    $("#timer").remove();
    $(".quiz").hide();
    $(".scoreContainer").show();
    $("#scoreNumber").append(secondsLeft);
    clearInterval(xInterval);
  }
};

function timeUp() {
  $("#timer").text("expired!");
  $(".quiz").hide();
  $(".scoreContainer").show();
  $("#scoreNumber").append(secondsLeft);
  clearInterval(xInterval);
};

// Creates the 3 local storage functions

$("#submit-initials").click(function(e) {
  e.preventDefault();
  loadScores();
  saveScores();
  showScores();
  highScoresPage();
});

// 1 - Local storage for savin user init and score.

function saveScores() {
  var scoreName = initialsInput.val();
  var highScores = scoreName + " : " + secondsLeft;
  initialsArray.push(highScores);

  initialsArray.sort(function(a, b) {
    return b - a;
  });
  localStorage.setItem("listOfItems", JSON.stringify(initialsArray));
};

// 2 - second local storage

function loadScores() {
  var savedScores = localStorage.getItem("listOfItems");
  var allScores = JSON.parse(savedScores);

  // If score were retrieved from local storage we need to update initialsArray to it

  if (allScores != null) {
    initialsArray = allScores;
  }
};

//3 - For each new result submitted we create a new line and append that to ordered list on #highScorePage

function showScores() {
  for (i = 0; i < initialsArray.length; i++) {
    newInitials = $("<li></li>").append(initialsArray[i]);
    $("#scoreList").append(newInitials);
  }
};

// 4 - After all 3 local storage functions run show the new div

function highScoresPage() {
  $(".highScorePage").show();
  $("#initialsArray").hide();
};

// Function to see and hide highScorePage div

$("#view-highscores").click(function() {
  $(".highScorePage").toggle();
});

// functions for each of the "try again" and "clear highscores"

$("#go-back").click(function() {
  window.location.reload();
});

$("#clear").click(function(e) {
  e.preventDefault();
  $("#scoreList").css("display", "none");
  localStorage.clear();
});
