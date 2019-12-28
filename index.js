//variables for the score and question number
let score=0;
let qNumber=0;


//initialize the quiz
function initializeQuiz() {
    $('.questionPage').hide();
    $('.finalPage').hide();
    let score = 0;
    let qNumber = 0;
}

//Function for when user clicks the start button
function startPage() {
    $('.startQuiz').on('click', '.startButton', function(event){
        $('.startQuiz').hide();
        $('.questionPage').show();
        checkQuizNumber();
    });
}

//check to see if quiz is completed or continuing
function checkQuizNumber () {
    if (qNumber < STORE.length) {
        return questionForm(qNumber);
    }else{
        console.log("quiz is done");







       // $('.questionPage').hide();
       // finalResult();
       // $('.qNumber').text(15);
    }
}

//print out each question
function questionForm(questionNo) {
    let createQuestion = 
        `<form>
            <fieldset>
                <legend>Question</legend>
                <p><span id="questionNumber">${questionNo+1}</span> out of 15</p>
                <p class="question">${STORE[questionNo].question}</p>
                <section class="buttonChoices"></section>
                <p class="scoreText">Score: <span id="userScore">${score}</span> out of 15</p>
                <button type="submit" id="submitQuestion">Submit</button>
            </fieldset>
        </form>`

    $('.questionPage').append(createQuestion); 

    STORE[questionNo].answers.forEach(function (answerValue, answerIndex) {
        $(`<label for="${answerIndex} class="result"></label>
        <input type="radio" class="choice" name="qChoices" id="${answerIndex}" value="${answerValue}" required>
        <span>${answerValue}</span>`).appendTo('.buttonChoices');
    });
    checkAnswer();
}

//check if answer is right after submitting
function checkAnswer(){
    $('#submitQuestion').on('click', function(event) {
        event.preventDefault();
        let picked = $('input:checked');
        let userAnswer = picked.val();
        let correctChoice = STORE[qNumber].correct;
        if (userAnswer === correctChoice) {
            console.log("correct");
        } else {
            console.log("wrong");
        };


    
    
    });

}














//Javascript Functions to run
function begin() {
    initializeQuiz();
    startPage();
    
 //   next();
 //   restartQuiz();
}

$(begin);