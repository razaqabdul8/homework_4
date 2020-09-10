// HTML elements being documented via reference to element by ID so that it may be made usable by the .js file 
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Object designated as variable that contains quiz questions and answers
var quizQuestions = [{
    question: "What does ritenuto mean?",
    choiceA: "Speeding up",
    choiceB: "Holding back",
    choiceC: "Getting louder",
    choiceD: "Getting quieter",
    correctAnswer: "b"},
  {
    question: "Medieval music was roughly between which years?",
    choiceA: "500 BC - 500 AD",
    choiceB: "500 -1400 AD",
    choiceC: "1400 - 1750 AD",
    choiceD: "1750 - 1830 AD",
    correctAnswer: "b"},
   {
    question: "Which term means \"one single line of music\"?",
    choiceA: "Polyphonic",
    choiceB: "Homophonic",
    choiceC: "Stereophonic",
    choiceD: "Monophonic",
    correctAnswer: "d"},
    {
    question: "Another word for Gregorian Chant is:",
    choiceA: "Singsong",
    choiceB: "Ostinato",
    choiceC: "Plainsong",
    choiceD: "Cantata",
    correctAnswer: "c"},
    {
    question: "In Medieval music, the intervals most used for harmony were the:",
    choiceA: "Second and seventh",
    choiceB: "Third and sixth",
    choiceC: "Fifth and fourth",
    choiceD: "Second and fourth",
    correctAnswer: "c"},  
    {
    question: "A single melodic line with other voice parts added for decoration was called:",
    choiceA: "Organum",
    choiceB: "Oregano",
    choiceC: "Origami",
    choiceD: "Organic",
    correctAnswer: "a"},
    {
    question: "During the Renaissance, which interval became widely used in harmony?",
    choiceA: "Augmented third",
    choiceB: "Major third",
    choiceC: "Augmented fourth",
    choiceD: "Minor seventh",
    correctAnswer: "b"},
        
    
    ];
// Gobal-scope variables because they are declared outside of, or do not belong to any function. 
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 56; 
var timerInterval;
var score = 0;
var correct;

// A function that cycles/loops through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// Function that is responsible for the end page that displays your score after either completeing the quiz or upon timer running out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Upon the clicking of the submit button, we run the highscore function that saves and converts into a string the array of high scores already saved in local storage
// The new user name and score are also pushed into the array we are saving in local storage. The function is then run to display the high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
// This fulfills the function of the "Clear Highscores" button found on the homepage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages. 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// A button meant for beginning the quiz upon wish of the user. 
startQuizButton.addEventListener("click",startQuiz);