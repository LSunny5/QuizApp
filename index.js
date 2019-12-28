//variables for the score and question number
let score=0;
let qNumber=0;


//initialize the quiz
function initializeQuiz() {
    $('.questionPage').hide();
    $('.finalPage').hide();
    let score = 0;
    let qNumber = 0;
    console.log('initialize is run');
}

//Function for when user clicks the start button
function startPage() {
    console.log('startPage is run');
    $('.startQuiz').on('click', '.startButton', function(event){
        $('.startQuiz').hide();
        $('.questionPage').show();
        checkQuizNumber();
    });
}

//check to see if quiz is completed or continuing
function checkQuizNumber () {
    if (qNumber < STORE.length) {
        console.log('checkQuiz number run');
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
    console.log('questionForm is run');
    let createQuestion = 
        `<form class="qForm">
            <fieldset>
                <legend>Question</legend>
                <p><span id="questionNumber">${questionNo+1}</span> out of 15</p>
                <p class="question">${STORE[questionNo].question}</p>
                <section class="buttonChoices"></section>
                <p class="scoreText">Score: <span class="userScore">${score}</span> out of 15</p>
                <button type="button" class="submitAnswer">Submit</button>
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
    console.log("check answer is run");
    
    $('.submitAnswer').on('click', function(event) {
        //event.preventDefault();
        let picked = $('input:checked');
        let userAnswer = picked.val();
        let correctChoice = STORE[qNumber].correct;

        console.log('Correct choice is '+ correctChoice);
        console.log('user answer is' + userAnswer);

        $('.submitAnswer').hide();

        //FIGURE THIS OUT
        if (!picked.val()) {
            alert('Please choose one answer!');
            //figure out where is the next button

            
        } else {
            
            $('.nextButton').show();
            if (userAnswer === correctChoice) {
                


                console.log("correct");
                $('.answerResponse').html(
                    `<section class="rightOrWrong">
                    
                    <h3>CORRECT!</h3>
                    <p>Nice Job!</p>
                    <button class="nextButton">Next</button>
                    </section>`);

                score++;
                $('.userScore').text(score);
               
                
            } else {



                console.log("wrong");
                $('.answerResponse').html(
                    `<section class="rightOrWrong">
                    
                    <h3>Sorry that is wrong!</h3>
                    <p>The correct answer is ${STORE[qNumber].correct}</p>
                    <button class="nextButton">Next</button>
                    </section>`);
            };
       
    }
    
    });
    
    
    
    next();
}


//go to next question
function next() {
    console.log('next is run');
    $('.answerResponse').on('click', '.nextButton', function (event){
        
        console.log('The qNumber is ' + qNumber);
  
        

        $('.nextButton').remove();
        $('.qForm').remove();
        $('.rightOrWrong').remove();
        qNumber++;
        checkQuizNumber();
        //questionForm(qNumber);

    })
    
}












//Javascript Functions to run
function begin() {
    initializeQuiz();
    startPage();
    //next();
 //   next();
 //   restartQuiz();
}

$(begin);