var currentquestionindex = 0;
var time = questions.length * 15;
var timeId;


var clock = document.getElementById("clock");
var questionQuiz = document.getElementById("quiz");
var startBtn = document.getElementById("startQuiz");
var score = document.getElementById("score");
var questionSubmit = document.getElementById("results");

startBtn.addEventListener("click", function () {
   var timeId = setInterval(timer, 1000)
})

function timer() {
    time--;
    clock.textContent = time;

};



// whatTheUserClicked = a string ""
function nextQuestion(userChoice) {
    var correctText = questions[currentQuestionIndex].answer;
  
    if (userChoice === correctText) {
      console.log("Correct!");
      score++;
    }
    else {
      console.log("Wrong answer.");
    }
    currentQuestionIndex++;
    getNewQuestion(currentQuestionIndex);
  
  }


  function answerClicked() {
    var a = document.getElementById("choiceA");
    var b = document.getElementById("choiceB");
    var c = document.getElementById("choiceC");
    var d = document.getElementById("choiceD");
  
    a.addEventListener("click", function () { nextQuestion(a.innerText); });
    b.addEventListener("click", function () { nextQuestion(b.innerText); });
    c.addEventListener("click", function () { nextQuestion(c.innerText); });
    d.addEventListener("click", function () { nextQuestion(d.innerText); });
  }
  answerClicked();