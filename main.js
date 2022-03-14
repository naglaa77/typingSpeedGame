// Array Of Words
const words = [
    "no",
    "yes",
    "Cod",
  ];
  //setting level
  const levels = {
      "Easy": 8,
      "Normal": 6,
      "hard": 3
  };

  //default levels
  let defaultLevel = "Normal";
  let defaultSeconds = levels[defaultLevel];

  //selector
let spanLevel = document.querySelector(".message .lvl");
let spanSeconds = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let textInput = document.querySelector(".input");
let wordShow = document.querySelector(".the-word");
let commingWords = document.querySelector(".upcoming-words");
let restTime = document.querySelector(".time span");
let recordScore = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
console.log(scoreTotal);
let messageFinish = document.querySelector(".finish");

// setting level names

spanLevel.innerHTML = defaultLevel;
spanSeconds.innerHTML = defaultSeconds;
restTime.innerHTML = defaultSeconds;
scoreTotal.innerHTML = words.length;

//disable paste event

textInput.onpaste = function () {
    return false;
}

//start game
startButton.onclick = function () {
    this.remove();
    textInput.focus();

    // generate word function
    generatWords ();
}

function generatWords () {

    //generate random word
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //get word index
    let randWordIndex = words.indexOf(randomWord);
    //remove this word from array of words
    words.splice(randWordIndex,1);
    //show the random word 
    wordShow.innerHTML = randomWord;
    //empty comming words befor i add new array of words without show word
    commingWords.innerHTML = '';
    //generate the wordes in comming-word every word in separete div
    for (let i= 0; i < words.length; i++) {

        //create div elemnt
        let div = document.createElement("div");
        let text = document.createTextNode(words[i]);
        div.appendChild(text);
        commingWords.appendChild(div);

    }
    //start play function
    start()
}

function start() {
    restTime.innerHTML = defaultSeconds;
    let startTime = setInterval(() => {

        restTime.innerHTML--;
        if (restTime.innerHTML === "0") {
            //stop time 
            clearInterval(startTime);
            if (wordShow.innerHTML.toLowerCase() === textInput.value.toLowerCase()) {
                //empty input 
                textInput.value = '';
                //increase score
                recordScore.innerHTML++;
                if (words.length > 0) {
                    //call generate functino
                    generatWords ();
                }else {
                    let span = document.createElement("span");
                    span.classList = 'good';
                    let spanText = document.createTextNode("congratulation");
                    span.appendChild(spanText);
                    messageFinish.appendChild(span);
                    //remove comming words 
                    commingWords.remove();
                }

            }else {
                let span = document.createElement("span"); 
                span.classList = 'bad';
                let spanText = document.createTextNode("game over");
                span.appendChild(spanText);
                messageFinish.appendChild(span);
            }

        }

    },1000);

}


