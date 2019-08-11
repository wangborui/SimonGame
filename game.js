var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColor = buttonColours[randomNumber];
  gamePattern.push(buttonColor);

  //animate button push
  $("#" + buttonColor).fadeOut(100).fadeIn(100);

  //get Sound
  playSound(buttonColor);
  animatePress(buttonColor);

  //update h1 title text
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}

function animatePress(currentColour) {
  var button = $("#" + currentColour);
  button.addClass("pressed");
  setTimeout(function(){
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  console.log(userClickedPattern);
  console.log(gamePattern);

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = -1;
  gamePattern = [];
  userClickedPattern = [];
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


$(document).keydown(function(event) {
  if(level === -1) {
    nextSequence();
  }
});
