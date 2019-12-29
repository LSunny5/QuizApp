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
                <p class="quizQuestionNo"><span>${questionNo+1}</span> out of ${STORE.length}</p>
                <p class="question" aria-labelledby="Quiz Question">${STORE[questionNo].question}</p>
                <section class="answerResponse"></section>
                <section class="buttonChoices"></section>
                <p class="scoreText">Score: <span class="userScore">${score}</span> out of ${STORE.length}</p>
                <button type="button" class="submitAnswer">Submit</button>
            </fieldset>
        </form>`

    $('.questionPage').append(createQuestion); 

    //create radio buttons for quiz
    STORE[questionNo].answers.forEach(function (answerValue, answerIndex) {
        $(`<input type="radio" class="choice" name="qChoices" id="${answerValue}" value="${answerValue}" required>
        <label for="${answerValue}" class="labelDesign" aria-labelledby="${answerValue}" role="choices">${answerValue}</label>
        `).appendTo('.buttonChoices');
    });  
    return checkAnswer();
}

//check if answer is right after submitting
function checkAnswer(){
    $('.submitAnswer').on('click', function(event) {
        event.preventDefault();
        let picked = $('input:checked');
                
        if (!picked.val()) {
            event.preventDefault();
            alert('Please choose one answer!');
            //make sure user selects one button
            } else {
                let userAnswer = picked.val();
                let correctChoice = STORE[qNumber].correct;
                //user makes the correct choice
                $('.submitAnswer').hide();
                if (userAnswer === correctChoice) {
                    score++;
                    $('.userScore').text(score);
                    $('.answerResponse').html(
                        `<section class="responseMessage">
                        <p class="rightMessage">CORRECT!</p>
                        <p>Nice Job!</p></section>`);
                    
                        

                    $('.nextPage').html(`<button type="submit" class="nextButton">Next</button>`);
                    
                } else {
                    //user makes the incorrect choice
                    $('.answerResponse').html(
                        `<section class="responseMessage">
                        <p class="wrongMessage">Sorry that is wrong!</p>
                        <p>The correct answer is ${STORE[qNumber].correct}</p>
                        </section>`);
                    
                    $('.wrongMessage').css("background", "red");
                    $('.nextPage').html(`<button type="submit" class="nextButton">Next</button>`);
                };
                $('.choice').attr('disabled', true);
                $('.labelDesign').addClass('noeffects');


                return next();
            }
    });
    
}

//go to next question
function next() {
    $('.nextPage').one('click', '.nextButton', function (event){
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
        "Next time you will do better!"
    ];
    const bad = [
        "Oh no...",
        "images/Failimage.jpg",
        "Evil Ursula",
        "Be careful, Ursula is out to get you...quick try again!"
    ];
    let fResult=[];

    //change score numbers for shorter quiz
    if (score >= 11) {
        fResult=win;
    }else if (score<11 && score >=5) {
        fResult=ok;
    }else {
        fResult=bad;
    }

    $('.finalPage').html(
        `<h2>${score} out of ${STORE.length}!</h2>
        <img src="${fResult[1]}" alt="${fResult[2]}" class= "resultImage">
        <h3>${fResult[0]}</h3>
        <p>${fResult[3]}</p>
        <p class="thanks">Thanks for playing!</p>
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