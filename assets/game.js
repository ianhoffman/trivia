//
// A list of questions which will be displayed. 
// Each question has a list of potential answers under the "choices" key and the correct answer under the 
// "answer" key. Later, we will check whether the user selected the correct answer by checking
// against "answer". We use the "choices" list to draw the choices.
//
var QUESTIONS = [
    {
        'question': 'What is the name of the man who launched eBay back in 1995?',
        'choices': [
            'Pierre Omidyar',
            'Jeff Bezos',
            'John Deer',
            'Bill Gates'
        ],
        'answer': 'Pierre Omidyar'
    },
    {
        'question': 'What was Twitter’s original name?',
        'choices': [
            'ShoutChamber',
            'twttr',
            'tweetz',
            'Birds Yelling'
        ],
        'answer': 'twttr'
    },
    {
        'question': 'What is meteorology the study of?',
        'choices': [
            'God',
            'Weather',
            'Rocks',
            'Asteroids'
        ],
        'answer': 'Weather'
    },
    {
        'question': 'Which planet is the hottest in the solar system?',
        'choices': [
            'Your An...',
            'Uranus',
            'Mars',
            'Saturn'
        ],
        'answer': 'Mars'
    },
    {
        'question': 'What year was the very first model of the iPhone released?',
        'choices': [
            '1992',
            '2006',
            '2009',
            '2007'
        ],
        'answer': '2007'
    }
];

//
// A container for the questions
//
var $questionContainer = $('#questions');

//
// Draw the list of questions one at a time, with their choices.
//
function drawQuestions() {
    for (var i = 0; i < QUESTIONS.length; i++) {
        var question = QUESTIONS[i];  // The question being drawn

        // Create the question div
        var $question = $('<div></div>', {
            'class': 'question'
        });

        // Append the question's text
        $question.append($('<div></div>', {
            'text': question.question,
            'class': 'question-text'
        }))

        // Append the choices
        var $choices = $('<ul></ul>', {
            'class': 'choices'
        });

        for (var j = 0; j < question.choices.length; j++) {
            var choice = question.choices[j];

            //
            // Create a unique id for this choice consisting of the question number
            // (e.g., 3) and the choice number (e.g., 4). So the 4th choice for the 3rd
            // question would have unique id "3-4".
            //
            var choiceId = i + '-' + j;

            var $choice = $('<li></li>', {
                'class': 'choice'
            });

            var $input = $('<input></input>', {
                'type': 'radio',
                'name': i,
                'id': choiceId,
                'value': choice,
            });
            $choice.append($input);

            if (j === 0) {
                // Select the first choice by default
                $input.prop('checked', true);
            }

            $choice.append($('<label></label>', {
                'for': choiceId,
                'text': choice,
            }));

            $choices.append($choice);
        }

        $question.append($choices);  // Append the $choices to the $question.

        $questionContainer.append($question);
    }
}

//
// Draw the submit button and bind it to handle the submit event.
//
function drawSubmitButton() {
    // Append and initialize the submit button too
    var $submitButton = $('<button></button>', {
        'id': 'submit',
        'text': 'SUBMIT'
    });
    $questionContainer.append($submitButton);
    $submitButton.on('click', handleSubmit);
}

//
// Handle the submit event by stopping the timer and checking the answers.
//
function handleSubmit() {
    event.preventDefault();

    stopTimer();

    var correctAnswers = 0;

    for (var i = 0; i < QUESTIONS.length; i++) {

        // Get the ith question
        $question = $questionContainer.find('.question').eq(i);

        // What was selected here?
        $selectedChoice = $question.find('input:checked');

        // What was its value?
        selectedChoice = $selectedChoice.val();

        // Is it the right value?
        if (selectedChoice === QUESTIONS[i].answer) {
            correctAnswers++;
        } 
    }

    $questionContainer.empty();
    $questionContainer.append($('<p></p>', {
        'text': 'Correct Answers: ' + correctAnswers
    }));
    $questionContainer.append($('<p></p>', {
        'text': 'Incorrect Answers: ' + (QUESTIONS.length - correctAnswers)
    }));
}

//
// Time left in the game.
//
var timeLeft = 60;

//
// A handle which can be used to pause the timer.
// Set by `setInterval`.
//
var tickHandle =  null;

//
// Draw the timer.
//
function drawTimer() {
    $('#instructions').append($('<p></p>', {
        'id': 'timerText', 
        'text': 'Timer: ' + timeLeft
    }));
}

//
// Start the timer.
//
function startTimer() {
    tickHandle = setInterval(function () {
        if (timeLeft <= 0) {
            stopTimer();
            $questionContainer.empty();
            alert('You lose!');
        } else {
            timeLeft--;
            $('#timerText').text('Timer: ' + timeLeft);
        }
    }, 1000);
}

//
// Stop the timer.
//
function stopTimer() {
    if (tickHandle !== null) {
        clearInterval(tickHandle);
        tickHandle = null;
    }
}

//
// Bind the start button so that the game starts when it is clicked.
//

var $startButton = $('#start');
$startButton.on('click', function (event) {

    // Don't do any of the default stuff (if there was anything).
    event.preventDefault();

    // Fade out the start button and remove it from the DOM once we're done.
    //
    // The anonymous function provided as the 3rd argument to `animate` will be invoked
    // once the animation is complete.
    //
    $startButton.animate({opacity: 0}, 600, function () {
        $startButton.remove();

        drawTimer();
        drawQuestions();
        drawSubmitButton();
        startTimer();
    });
});