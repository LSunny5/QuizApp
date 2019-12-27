//variables for the score and question number
let score=0;
let qNumber=0;



//Function for when user clicks the start button
function startPage() {
    $('.startQuiz').on('click', '.startButton', function(event){

        $('.startQuiz').hide();
        $('.questionPage').removeClass('hide');
        $('#questionNumber').html(++qNumber);
        $('#userScore').html(score);
        showQuestion(STORE[qNumber-1]);

        
    });
}

//Function for going to next question
//function for going to quiz completion page
//reset the quiz after button is pressed



//question layout
function showQuestion (questionObject) {
   // console.log(questionObject.question);
    $('.question').text(questionObject.question);  
    $('#choiceA').html(questionObject.answers[0]);  
    
    //$('#choiceA').text(questionObject.answers[0]);
    $('#choiceB').text(questionObject.answers[1]);
    $('#choiceC').text(questionObject.answers[2]);
    $('#choiceD').text(questionObject.answers[3]);
    

    //qNumber++;
}




//Javascript Functions to run
function begin() {
    startPage();
    

}

$(begin);