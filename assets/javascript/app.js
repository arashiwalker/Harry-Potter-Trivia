var questions = [{
  question: "Harry Potter joined what house?",
  choices: ["Slytherin", "Gryffindor", "Hufflepuff", "Raveclaw"],
  answer: "Gryffindor",
  image: "assets/images/gryffindor.gif"
}, {
  question: "Who is Fluffy?",
  choices: ["Hermonie's cat", "Harry's owl", "A three headed dog", "Hagrids dragon"],
  answer: "A three headed dog",
  image: "assets/images/fluffy.gif"
}, {
  question: "What position does Harry Potter play on his quidditch team?",
  choices: ["Chaser", "Seeker", "Keeper", "Bludger"],
  answer: "Seeker",
  image: "assets/images/seeker.gif"
}, {
  question: "What is Harry's patronous?",
  choices: ["Stag", "Owl", "Rabbit", "Unicorn"],
  answer: "Stag",
  image: "assets/images/stag.gif"
}, {
  question: "How did moaning Myrtle die?",
  choices: ["A mountain troll", "The Whomping Willow", "The Basilisk", "The Killing Curse"],
  answer: "The Basilisk",
  image: "assets/images/basilisk.gif"
}, {
  question: "What type of dragon did Harry face in his first Tri-Wizard Tournament task",
  choices: ["Hungarian Horntail", "Chinese Fireball", "Swedish Shortsnout", "Welsh Green"],
  answer: "Hungarian Horntail",
  image: "assets/images/dragon.gif"
}, {
  question: "What does the spell Incendio do?",
  choices: ["Creates fire", "Hide memories", "Opens doors", "Vanish objects"],
  answer: "Creates fire",
  image: "assets/images/spells.gif"
}, {
  question: 'who is reffered to such expressions as "You-Know-Who", "He Who Must Not Be Named" or "the Dark Lord"?',
  choices: ["Ron Weasley", "Dumbledore", "Draco Malfoy", "Lord Voldemort"],
  answer: "Lord Voldemort",
  image: "assets/images/voldemort.gif"
}];

var timer;
var newQ;
var counter = 30;
var correctAnswers = 0;
var incorrectAnswers = 0;
var quizQ = 0;

function playAudio(){
    var audio = new Audio('../TriviaGame/assets/sounds/luck.mp3')
    audio.play()
}

function playAudio2(){
    var theme = new Audio('../TriviaGame/assets/sounds/HPtheme.mp3')
    theme.play()
}

function defaultPage(){
  $('.questionScreen').hide();
}

function startQuiz(){
  $('.main').fadeOut(900, function() {
        $('main').empty();
        $('.questionScreen').show();
        $('.main').addClass('.questionScreen');
             $('#timer').text("Time Remaining: " + counter)
             quizList();
             playAudio()
             playAudio2()
  })
}

function decreaseCounter(){ 
       counter--;
       $('#timer').html("Time Remaining: " + counter)
    if (counter == 0) {
        napTime();
  }
}

function quizList(){     
       timer = setInterval(decreaseCounter, 1*1000);
       clearInterval(newQ);
  $('#choices').html("<h2>" + questions[quizQ].question + "</h2>")
  for (i=0; i<questions[quizQ].choices.length; i++) {
              var button = $("<p id='button' value='" + questions[quizQ].choices[i] + "'>");
    button.text(questions[quizQ].choices[i]);
    $('#choices').append(button);
  }
}

function wellDone(){
       clearInterval(timer);
       correctAnswers++;
       $('#choices').html("<h2>Well Done Harry!</h2>");
       $('#choices').append("<img src='" + questions[quizQ].image + "'/>");
       if (quizQ === questions.length-1) {
              newQ = setInterval(reportCard, 4*1000);
       } else {
              newQ = setInterval(newQuestion, 4*1000);
       }
}

function payAttenion(){
       clearInterval(timer);
       incorrectAnswers++;
       $('#choices').html("<h2>Pay Attention!</h2>")
       $('#choices').append("<h3>The correct answer was: " + questions[quizQ].answer + "</h3>")
       $('#choices').append("<img src='" + questions[quizQ].image + "'/>");
       if (quizQ === questions.length-1) {
              newQ = setInterval(reportCard, 4*1000);
       } else {
              newQ = setInterval(newQuestion, 4*1000);
       }
}

function napTime(){
       clearInterval(timer);
       $('#choices').html("<h2>No time for napping!</h2>");
       $('#choices').append("<h3>The correct answer was: " + questions[quizQ].answer + "</h3>")
       $('#choices').append("<img src='" + questions[quizQ].image + "'/>");
       if (quizQ === questions.length-1) {
              newQ = setInterval(reportCard, 4*1000);
       } else {
              newQ = setInterval(newQuestion, 4*1000);
       }
}

function newQuestion(){
       counter = 30;
       $('#timer').text("Time Remaining: " + counter);       
       quizQ++;
       quizList();
}

function reportCard(){
       clearInterval(timer);
       $("#timer").hide();
       $('#choices').html("<h3 id='title'>Report Card</h3>")
       $('#choices').append("<h2 class='grade'> Correct answers: " + correctAnswers + "</h2>");
       $('#choices').append("<h2 class='grade'> Wrong answers: " + incorrectAnswers + "</h2>");
       $('#choices').append("<h2 class='grade'> Questions unanswered: " + (questions.length - (correctAnswers + incorrectAnswers)) + "</h2>");
       $('#choices').append("<p id='reset' type='submit' value='reset'>Play Again</p>")
}      

function reset(){
       counter = 30;
       correctAnswers = 0;
       incorrectAnswers = 0;
       quizQ = 0;
       $('#timer').text("Time Remaining: " + counter)
       quizList();
       $("#timer").show();
}

defaultPage();
$(document).on('click', '#button', function(event) {
       if ($(event.target).attr("value") === questions[quizQ].answer) {
              wellDone();
       } else {
              payAttenion();
       }
})

$(document).on('click', '#reset', function() {
       reset();
})
