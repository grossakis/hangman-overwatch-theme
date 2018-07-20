var possibleChoices = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
var playableWords = ["ana" , "bastion" , "brigitte" , "doomfist" , "dva" , "genji" , "hanzo" , "junkrat" , "lucio" , "mccree" , "mei" , "mercy" , "moira" , "orisa" , "pharah" , "reaper" , "reinhardt" , "roadhog" , "soldier76" , "sombra" , "symmetra" , "torbjorn" , "tracer" , "widowmaker" , "winston" , "zarya" , "zenyatta"]

var newGame = function(){
    //set number of guesses
    var guessCount = 5
    //pull a random word from the playableWords array
    playerWord = playableWords[Math.floor(Math.random() * playableWords.length)];
    // set the image to be used for the end of the game
    var gameoverImage = $('<img>').attr('src' , 'assets/images/'+playerWord+'.png').addClass('hero-image')
    // make an array out of the letters of the playWord
    var playerWordArray = playerWord.split('');
    console.log(playerWord);
    //set up elements for game display
    var gameSpace = $('#game-space');
    var activeGameDiv = $('<div>').addClass('active-game-div');
    var blankSpaceDiv = $('<div>').addClass('blank-space-div');
    var guessLetterHead = $('<h2>').text('incorrect guesses');
    var guessedLettersDiv = $('<div>').addClass('guessed-letters-div');
    var replayButton = $('<button>').text('play again').addClass('game-button');
    //set guesses to be its own variable within the guess header
    var guessCountText = $('<span>').html(guessCount);
    var guessCountHeader = $('<h2>').text(' guesses left');
    guessCountHeader.prepend(guessCountText);
    activeGameDiv.append(blankSpaceDiv , guessCountHeader , guessLetterHead , guessedLettersDiv);
    var winLossDiv = $('<div>').addClass('win-loss-div');
    gameSpace.append(activeGameDiv , winLossDiv);
    //set up an array for the blanks to be filled
    var blanksArray = [];
    //set up an array for the missed letters
    var missedLetters = [];
    //fill with the appropriate blanks spaces
    for(var i = 0; i<playerWordArray.length; i++){
        blanksArray.push(' _ ')
    }
    //create a function for writing out the blanks and letters for the word in play
    function blankSpaceWrite(){
        blankSpaceDiv.empty();
        for(var i = 0; i<blanksArray.length; i++){
            var blankSpan = $('<span>').text(blanksArray[i]);
            blankSpaceDiv.append(blankSpan);
        }
    }
    blankSpaceWrite();
    //replay button functionality
    replayButton.on('click' , function(){
        var gameSpace = $('#game-space')
        var newGameSpace = $('<div>').addClass("new-game-space")
        gameSpace.empty();
        gameSpace.append(newGameSpace);
        newGame();
    });
    // check for win/loss conditions
    function gameoverCheck(){
        if(guessCount < 1){
            //loss
            var lossText = $('<h2>').text('you lost! the hero is '+playerWord);
            winLossDiv.append(lossText , gameoverImage);
            activeGameDiv.append(replayButton);
            $(document).off('keyup');
        }else if(!blanksArray.includes(' _ ')){
            //win
            var winText = $('<h2>').text('you got it! the hero is '+playerWord);
            winLossDiv.append(winText , gameoverImage);
            activeGameDiv.append(replayButton);
            $(document).off('keyup');
        }
    }
    //keystroke to register guesses
    $(document).on('keyup' ,  function () {
        // sets keystrok to a variable
        var letterGuess = String.fromCharCode(event.keyCode).toLowerCase();
        // validates keystroke to include only letters and numbers
        if(possibleChoices.includes(letterGuess)){
            if(playerWordArray.includes(letterGuess)){
                // if the guess is correct...
                for(var i=0; i < playerWordArray.length; i++){
                    // replace it in the blanks array
                    if(letterGuess === playerWordArray[i]){
                        blanksArray[i] = letterGuess
                    }
                }
                // rewrite blanks to include correctly guessed letters
                blankSpaceWrite();
                // win/loss check
                gameoverCheck();
            }else{
                // if the guess is wrong...
                // checks to make sure it hasn't been guessed already
                if(missedLetters.includes(letterGuess)){
                    return
                }else{
                    // adds it to an array for validation purposes
                    missedLetters.push(letterGuess);
                    missDisplay = $('<span>').text(letterGuess)
                    guessedLettersDiv.append(missDisplay);
                    // lowers the amount of guesses left
                    guessCount--
                    guessCountText.text(guessCount);
                    // win/loss check
                    gameoverCheck();
                }
            }
        }else{
            return
        }
    })
}
// add functionality for the new game button
$('.game-button').on('click' , function(){
    var gameSpace = $('#game-space')
    var newGameSpace = $('<div>').addClass("new-game-space")
    gameSpace.empty();
    gameSpace.append(newGameSpace);
    newGame();
})