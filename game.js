buttonColours = ["red", "blue", "green", "yellow"];

gamePattern=[];
userClickedPattern=[];

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randNumber = Math.floor(Math.random()*4);
  //console.log(randNumber);
  var randomChosenColour = buttonColours[randNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  userClickedPattern = [];

}

$(".btn").click(function() {
  //console.log(this);
  var userChosenColour = $(this).attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);

});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

var start = false;
var level = 0;
var gameOver = false;
$(document).keydown(function() {

  if(start===false){
    start = true;
    $("h1").text("Level " + level);
    nextSequence();

  }
  if(gameOver === true){
    level = 0;
    $("h1").text("Level " + level);
    gamePattern = [];
    gameOver = false;
    nextSequence();
  }

});


function checkAnswer(currentLevel) {
  // console.log(userClickedPattern);
// console.log(gamePattern);
// console.log(userClickedPattern[currentLevel]);
// console.log(gamePattern[currentLevel]);
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over. Press any key to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameOver = true;
    //console.log("wrong");
  }
}
