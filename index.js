//variables for the score and question number
let score=0;
let qNumber=0;

//initialize the quiz
function initializeQuiz() {
    $('.questionPage').hide();
    $('.finalPage').hide();
    score = 0;
    qNumber = 0;
}

//Function for when user clicks the start button
function startPage() {
    $('.startQuiz').on('click', '.startButton', function(event){
        $('.startQuiz').hide();
        $('.questionPage').show();
        return checkQuizNumber();
    });
}

//check to see if quiz is completed or continuing
function checkQuizNumber () {
    if (qNumber < STORE.length) {
        return questionForm(qNumber);   
    }else{
        return finalResult();
    };
}

//print out each question
function questionForm(questionNo) {
    let createQuestion = 
        `<form class="qForm">
            <fieldset>
                <legend>Question</legend>
                <p><span id="questionNumber">${questionNo+1}</span> out of ${STORE.length}</p>
                <p class="question">${STORE[questionNo].question}</p>
                <section class="buttonChoices"></section>
                <p class="scoreText">Score: <span class="userScore">${score}</span> out of ${STORE.length}</p>
                <button type="button" class="submitAnswer">Submit</button>
            </fieldset>
        </form>`

    $('.questionPage').append(createQuestion); 

    //create radio buttons for quiz
    STORE[questionNo].answers.forEach(function (answerValue, answerIndex) {
        $(`<label for="${answerIndex} class="result"></label>
        <input type="radio" class="choice" name="qChoices" id="${answerIndex}" value="${answerValue}" required>
        <span>${answerValue}</span>`).appendTo('.buttonChoices');
    });  
    return checkAnswer();
}

//check if answer is right after submitting
function checkAnswer(){
    $('.submitAnswer').on('click', function(event) {
        event.preventDefault(); 
        let picked = $('input:checked');
        let userAnswer = picked.val();
        let correctChoice = STORE[qNumber].correct;

        //make sure user selects one button
        if (!picked.val()) {
            event.preventDefault();
            alert('Please choose one answer!');
        } else {
            $('.submitAnswer').hide();
            if (userAnswer === correctChoice) {
                $('.answerResponse').html(
                    `<section class="responseMessage">
                    <h3>CORRECT!</h3>
                    <p>Nice Job!</p>
                    <button type="submit" class="nextButton">Next</button>
                    </section>`);
                score++;
                $('.userScore').text(score);
            } else {
                $('.answerResponse').html(
                    `<section class="responseMessage">
                    <h3>Sorry that is wrong!</h3>
                    <p>The correct answer is ${STORE[qNumber].correct}</p>
                    <button type="submit" class="nextButton">Next</button>
                    </section>`);
            };
        }
    });
    return next();
}

//go to next question
function next() {
    $('.answerResponse').one('click', '.nextButton', function (event){
        event.preventDefault();
        $('.nextButton').hide();
        $('.qForm').remove();
        $('.responseMessage').remove();
        qNumber++;
        return checkQuizNumber();
    })
}

function finalResult() {
    $('.startQuiz').hide();
    $('.questionPage').hide();
    $('.finalPage').show();
    const win = [
        "CONGRATULATIONS!",
        "images/WinImage.jpeg",
        "Disney castle with fireworks",
        "This calls for a celebration!"
    ];
    const ok = [
        "Not bad!  You did your best!", 
        "images/Passimage.jpeg",
        "Belle and Beast with flowers",
        "Next time you will get it!"
    ];
    const bad = [
        "Oh no...",
        "images/Failimage.jpg",
        "Evil Ursula",
        "Be careful, Ursula wants you...quick try again!"
    ];
    let fResult=[];


    if (score === 3) {
    //(score >= 11) {

        fResult=win;

    }else if (score === 2){
    
    //(score<11 && score >=5) {

        fResult=ok;

    }else {

        fResult=bad;
    }

    $('.finalPage').html(
        `<h1>Final score...</h1>
        <h3>${score} out of ${STORE.length}!</h3>
        <img src="${fResult[1]}" alt="${fResult[2]}" class=resultImage">
        <h3>${fResult[0]}</h3>
        <p>${fResult[3]}</p>
        <p>Thanks for playing!</p>
        <button type="button" class="restartButton">Try again?</button>`
    );
}

function restartQuiz() {
    $('.finalPage').on('click', '.restartButton', function (event){
        initializeQuiz();
        $('.startQuiz').show();
    });
}

//Javascript Functions to run
function begin() {
    initializeQuiz();
    startPage();
    restartQuiz();
}

$(begin);