//variables for the score and question number
let score=0;
let qNumber=0;



//Beginning of quiz
function startPage() {
    $('.startQuiz').on('click', '.startButton', function(event){
        //console.log("the button was clicked");
        $('.startQuiz').hide();
        $('.questionPage').removeClass('hide');
        showQuestion(STORE[qNumber]);

        
    });
}




//question layout
function showQuestion (questionObject) {
    console.log(questionObject.question);
    $('.question').text(questionObject.question);    



    //qNumber++;
}





//Javascript Functions to run
function begin() {
    startPage();
    

}

$(begin);