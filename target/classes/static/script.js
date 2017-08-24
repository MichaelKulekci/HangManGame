$(document).ready(function () {
    var wordArray = new Array();
    var maxGuesses = 5;
    var guesses = new Array();
    var currentGuesses = 0;
    var corrGuesses = new Array();
    var errorCount = 0;


    //run when startbutton is pushed
    function startGame() {
        $("#startGame").hide();
        $("#logo").fadeOut(500);
        $.ajax({
            url: "/GET",
            type: 'GET',
            success: function (response) {
                console.log(response);
                var wordBank = response;
                var rnd = Math.floor(Math.random() * wordBank.length); //choose random word from array
                var currentWord = wordBank[rnd];
                wordArray = currentWord.split(""); //make the letters in the word into an array
                var numberOfTiles = wordArray.length;
                console.log(wordArray);
                for (i = 0; i < numberOfTiles; i++) { //append to div # of boxes for letters
                    $('#word').append('<div class="tile" id=t' + i + '></div>').fadeIn(2000);
                }
            }
        });

    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // return true if guess is valid, else return false
    function checkGuessIsValid(input) {
        //user did not type in anything (truthy value of false)
        if (!input) {
            alert("Du måste skiva in en bokstav!");
            return false;
        }
        //user already made this guess before (incorrect guesses)
        if ($.inArray(input , guesses) >= 0){
            alert("Du har redan använt denna felaktiga gissning!");
            return false;
        }
        //user already made this guess before (correct guesses)
        if ($.inArray(input , corrGuesses) >= 0){
            alert("Du har redan använt denna korrekta gissning!");
            return false;
        }
        return true;
    }

    //function when letter input is recorded
    function guess(wordArray, currentGuesses) {
        var input = $("input").val(); //save input

        var isGuessValid = checkGuessIsValid(input);
        if ( isGuessValid ) {
            var isCorrectGuess = validateGuess(input);
            if (!isCorrectGuess){
                drawHangMan();
            }
        }
        finishGame();

        console.log("input: " + input);

        console.log("corrGuesses: " + corrGuesses);
    }

    //return true if guess is correct, else return false.
    //If guess is correct, update array 'corrGuesses'
    //If guess is incorrect, update array 'guesses' and increase 'errorCount'
    function validateGuess(input){
        //is user guess is correct?
        if ($.inArray(input , wordArray) >= 0){
            for (var i = 0; i<wordArray.length; i++){
                if(input == wordArray[i]) {
                    $('#t' + i).append(input);
                }
            }
            corrGuesses.push(input);
            return true;
        }
        else{
            errorCount++;
            guesses.push(input); // remember the input word even if it is correct
            $('#guesses').append(input);
            return false;
        }
    }


    function drawHangMan(){
        switch (errorCount) {
            case 1:
                drawRope();
                break;
            case 2:
                drawFace();
                break;
            case 3:
                drawBody();
                break;
            case 4:
                drawArm1();
                drawArm2();
                break;
        }
    }

    async function finishGame() {
        guesses = guesses.filter(function (el) {
            return corrGuesses.indexOf(el) < 0;
        });
        if (corrGuesses.length == wordArray.length) {
            console.log(corrGuesses);
            alert("You win!");
        }
        else if (guesses.length == maxGuesses) {
            await
            drawLeg1();
            await
            drawLeg2();
            await
            sleep(200);
            alert("Game over");
        }

    }

    $("input[name='Submit']").click(function () {
        guess(wordArray, currentGuesses);
        $('input:text').focus(
            function () {
                $(this).val('');
            });


    })

    $("input[name='Startgame']").click(function () {
        startGame();
    })

});
