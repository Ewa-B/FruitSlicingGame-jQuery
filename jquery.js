var playing  = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var step;
var action; //used by setInterval() function

$(function(){
//click on start/reset button
$("#startReset").click(function(){
//yes we are playing
    if(playing == true){
        //reload the page
        location.reload();
    }else{
        playing = true; // game initiated
        //set score to 0
        score = 0;
        $("#scoreValue").html(score);
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();
        $("#gameOver").hide();

        //change button text to reset game
        $("#startReset").html("Reset Game");

        //start sending fruits
        startAction();
    }
});
    $("#fruit1").mouseover(function(){
        //update score
        score++;
        $("#scoreValue").html(score);
        //play sound
        //document.getElementById("sliceSound").play();
        $("#sliceSound")[0].play();
        //stop fruit:
        clearInterval(action);

        //hide fruit ->hide function takes 2 parameters: type of animation and milliseconds
        //and we have to add jquery ui to index.html
        $("#fruit1").hide("explode", 500);
        //send new fruit (startAction) after animation is finished (500ms):
        setTimeout(startAction, 500);
    });
function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
       $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}
function startAction(){
dropFruit();
//Move fruit down by one step every 10ms
action = setInterval(function(){
    $("#fruit1").css('top', $("#fruit1").position().top + step);
    //check if fruit is to low
    if($("#fruit1").position().top > $("#fruitContainer").height()){
        //check if we have any trials left
        if(trialsLeft > 1){
            dropFruit();
            trialsLeft --;
            addHearts();
        }else{
            //game over
            playing = false;
            $("#satrtReset").html("Start Game");
            $("#gameOver").show();
            $("#gameOver").html('<p>game over!</p> <p>Your score is ' + score +'</p>');
            $("#trialsLeft").hide();
            stopAction();
        }
    }
    },10);
}

function chooseFruit(){
    $("#fruit1").attr('src', 'images/'+fruits[Math.round(Math.random()*8)]+'.png');
}
function moveFruit(){
    //two parameters: 'top' and new value of top which is the original value plus step
    $("#fruit1").css('top', $("#fruit1").position().top + step);
}
function dropFruit(){
    $("#fruit1").show();

    //choose a random fruit:
    chooseFruit();

    //this function will have two properties, left and top
    //left property: distance between left border of the fruit container and left border of our fruits
    //fruitContainer must have property position set to relative, and .fruit to absolute
    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});

    //random step
    step = 1 + Math.round(5 * Math.random()); //change step, nr between 1 to 6
}
//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});

