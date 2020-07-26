let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

//generate a new random number between 0 and 3, and store it in a variable called randomNumber
function nextSequence() {
  level = level + 1;
  $("h1").html(`Level ${level}`)
  let randomNumber = Math.floor(Math.random()*4);
  // use the randomNumber from step 2 to select a random colour from the buttonColours array.
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  // Use jQuery to select the button with the same id and then animate
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  // use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
  // Use jQuery to detect when any of the buttons are clicked and trigger a handler function.

}

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  // if the Green button was clicked, userChosenColour will equal its id which is "green".
  userClickedPattern.push(userChosenColour);

  // Add Animations to User Clicks
  animatePress(userChosenColour);
  // Add Sounds to User Clicks
  playSound(userChosenColour);
  // check answer
  checkAnswer(userClickedPattern[userClickedPattern.length-1])
});

//when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
function playSound(name) {
  // Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function() {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if(gameStarted === false) {
    nextSequence();
    gameStarted = true;
  } else {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    nextSequence();
  }
})

function checkAnswer(currentLevel) {
  if(currentLevel === gamePattern[userClickedPattern.length-1]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      console.log("finished");
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    } else {
      console.log("continue clicking to finish this level");
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game Over, Press Any Key to Restart")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}
