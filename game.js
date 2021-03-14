let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;

const playSound = (chosenColor) => {
  let audio = new Audio(`sounds/${chosenColor}.mp3`);
  audio.play();
};

const flashTile = (color) => {
  $(`#${color}`).fadeIn(100).fadeOut(100).fadeIn(100);
};

const animatePress = (color) => {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
};

let nextSequence = () => {
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  level += 1;
  flashTile(randomChosenColour);
  playSound(randomChosenColour);
  userClickedPattern = [];

  if (level > 0) {
    $("#level-title").text(`Level ${level}`);
  }
};

const checkPattern = (levelIteration) => {
  if (gamePattern[levelIteration] === userClickedPattern[levelIteration]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
};

$(".btn").click((e) => {
  let userChosenColor = e.target.id;
  console.log(e);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkPattern(userClickedPattern.length - 1);
});

const gameOver = () => {
  level = 0;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  gamePattern = [];
  $("#level-title").text("Game Over, Tap any key to play again");
};

const startgame = () => {
  if (!started) {
    $(document).keydown((e) => {
      started = true;
      console.log("started:" + started);
      nextSequence();
    });
  }
};

startgame();
