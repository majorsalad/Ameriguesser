// Static data, instead of storing in a database or a file and read it from a file, I decided to just make an array.
const statesArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa', 'Kansas', 'Kentucky', 'Louisiana','Maine',
'Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri', 'Montana', 'Nebraska','Nevada','New Hampshire',
'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico',
'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// An array that tracks the positions of the disabled inputs, so that the user's answers are updated to the right slots
// for each try
let guessesPositionArray = [];

// Used to track how many incorrect attempts the user has. This is important for indexing. If we know how many mistakes they have
// we know where they are in the array.
let numOfIncorrectAttempts = 0;
// The random state that we are defining so that multiple functions have access to it.
let randomState;


/**
 * Objective of this method is to do the initialization work for our game, by setting the randomState, displaying the image,
 * disabling the 3 input fields above the one we want the user to use, and to push those input elements in an array for global use.
 */
function initializeGame(){
    randomState = statesArray[Math.floor(Math.random()*statesArray.length)];
    console.log(randomState);
    document.querySelector(".state-image").setAttribute("src","./states/" + randomState + ".jpg");
    document.querySelector(".state-image").setAttribute("alt",randomState);
    initInputDisable();
    guessesPositionArray = initInputArray(guessesPositionArray);
}

/**
 * Disabling the text input fields
 */
function initInputDisable(){
    document.getElementById("guess1").disabled = true;
    document.getElementById("guess2").disabled = true;
    document.getElementById("guess3").disabled = true;
}

/**
 * Filling our inputArray with the 3 elements we will be populating to
 */
function initInputArray(inputArray){
    inputArray.push(document.getElementById("guess1"));
    inputArray.push(document.getElementById("guess2"));
    inputArray.push(document.getElementById("guess3"));

    return inputArray;
}

/**
 * Self explanatory
 */
function checkAnswer(guess){
    if(guess == randomState){
        displayCorrectMessage(guess);
    } else{
        displayIncorrectMessage(guess);
    }
}

function displayCorrectMessage(guess){
    //we first want to know our current position in the 3 guesses, so we check how many they have wrong
    let currentPosition = guessesPositionArray[numOfIncorrectAttempts];
    
    //if that number is greater than 0, than we hide the incorrect message alert that stays on screen when they made a mistake
    if(numOfIncorrectAttempts > 0){
        incorrectMessage.hidden = true;
    }

    let winningMessage = document.getElementsByClassName("winning-message")[0];
    currentPosition.value = guess;
    //We want to highlight the background of the slot where they put the right answer only. We do incorrect attempts + 1, b/c
    //incorrect attempts starts at 0 and they can get the first guess correct
    document.getElementById("guess" + (numOfIncorrectAttempts + 1)).style.backgroundColor = "#6BCB77";
    //displaying the winning message and restarting the game upon winning
    winningMessage.hidden = false;
    winningMessage.style.color = "green";
    restartGame();
}

function displayIncorrectMessage(guess){
    //Incrementing their mistake count
    numOfIncorrectAttempts++;
    losingMessage = document.getElementsByClassName("losing-message")[0];
    incorrectMessage = document.getElementsByClassName("incorrect-message")[0];
    //grabbing current position based on their mistakes - 1, opposite of previous function, b/c they can make a mistake on the
    //first one
    let currentPosition = guessesPositionArray[numOfIncorrectAttempts-1];
    document.getElementById("guess" + (numOfIncorrectAttempts)).style.backgroundColor = "#FD5D5D";
    //if they make 3 incorrect attempts the game is over 
    if(numOfIncorrectAttempts == 3){
        //updating their answers into the slot and displaying the relevant colors
        currentPosition.value = guess;
        incorrectMessage.hidden = true;
        losingMessage.hidden = false;
        losingMessage.style.color = "red";
        restartGame();
    } else { //otherwise, one of their guess slots is updated, and the incorrect message alert appears.
        currentPosition.value = guess;
        incorrectMessage.hidden = false;
        incorrectMessage.style.color = "#FDAF75";
    }
}

//A simple timeout that executes a location.reload causing the page to refresh after the time we set (3 seconds)
function restartGame(){
    setTimeout(() => {location.reload()}, 3000);
}