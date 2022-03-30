// Global Constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

// Global Variables
var pattern = [0, 0, 0, 0, 0, 0, 0, 0];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  // must be between 0.0 and 1.o
var guessCounter = 0;  // keep track of where the user is in the clue sequence
var clueHoldTime = 1000;  // how long to hold each clue's light/sound
var numMistake = 0;  // track the number of mistakes

var clock = document.getElementById("clock");
var start = clock.innerHTML;
var finish = "00:00:00:00";
var timer = null;

// Make the clock change every 100ms
function run() {
    timer = setInterval("onTimer()", 100);
}

function onTimer() {
    if (start === finish) {
        // time over, lose
        loseGame();
        // reset timer
        clearInterval(timer);
        start = "00:00:30:10";
        clock.innerHTML = start;
    }

    var hms = String(start).split(":");
    var ms = Number(hms[3]);
    var s = Number(hms[2]);
    var m = Number(hms[1]);
    var h = Number(hms[0]);

    ms = ms - 10;

    if (ms < 0) {
        ms = 90;
        s = s -1;
        if (s < 0) {
            s = 59;
            m = m - 1;
        }
        if (m < 0) {
            m = 59;
            h = h - 1;
        }
    }

    var ms = ms < 10 ? ("0" + ms) : ms;
    var ss = s < 10 ? ("0" + s) : s;
    var sm = m < 10 ? ("0" + m) : m;
    var sh = h < 10 ? ("0" + h) : h;
    start = sh + ":" + sm + ":" + ss + ":" + ms;
    clock.innerHTML = start;
}

// Randomly generate the pattern
function generatePattern() {
    for (let i=0, len=pattern.length; i<len; i++) {
        // reference: https://www.w3schools.com/js/js_math.asp
        pattern[i] = Math.floor((Math.random() * 5 + 1));
    }
}

// Start Functions
function startGame() {
    // initialize game variables
    progress = 0;
    gamePlaying = true;
    clueHoldTime = 1000;
    generatePattern();
    console.log("The pattern is ", pattern);
    numMistake = 0;
    // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    // play a sequence of clues
    playClueSequence();
}

// Stop Functions
function stopGame() {
    gamePlaying = false;
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
    // reset timer
    clearInterval(timer);
    start = "00:00:30:00";
    clock.innerHTML = start;
}

// Sound Synthesis Functions
const freqMap = {
    1: 261.626,
    2: 329.628,
    3: 466.2,
    4: 587.3,
    5: 784.0
}

function playTone(btn, len) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
    setTimeout(function() {
        stopTone()
    },len)
}

function startTone(btn){
    if (!tonePlaying){
        context.resume()
        o.frequency.value = freqMap[btn]
        g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
        context.resume()
        tonePlaying = true
    }
}

function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0,context.currentTime);
o.connect(g);
o.start(0);

// Lighting or clearing a button
function lightButton(btn) {
    document.getElementById("button"+btn).classList.add("lit");
}

function clearButton(btn) {
    document.getElementById("button"+btn).classList.remove("lit");
}

// Playing a single clue
function playSingleClue(btn) {
    if (gamePlaying) {
        lightButton(btn);
        playTone(btn, clueHoldTime);
        setTimeout(clearButton, clueHoldTime, btn);
    }
}

// Playing a sequence of clues
function playClueSequence() {
    // reset timer
    clearInterval(timer);
    start = "00:00:30:00";

    guessCounter = 0;  // reset counter to 0 when a new turn starts and computer plays the next new clue sequence
    let delay = nextClueWaitTime;  // set delay to initial wait time
    clueHoldTime = clueHoldTime - 100;
    console.log("clueHoldTime: ", clueHoldTime)
    console.log("progress: ", progress)
    console.log("guessCounter: ", guessCounter)
    for (let i=0; i<=progress; i++) {  // for each clue that is revealed so far
        console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
        setTimeout(playSingleClue, delay, pattern[i])  // set a timeout to play that clue
        delay += clueHoldTime;
        delay += cluePauseTime;
    }

    //
    run();
}

// Win/loss notifications
function loseGame() {
    stopGame();
    alert("Game Over. You lost.");
}

function winGame() {
    stopGame();
    alert("Game Over. You won!");
}

// Handling guesses
function guess(btn) {
    console.log("user guessed: " + btn);

    // run();

    if (!gamePlaying) {
        return;
    }

    if (pattern[guessCounter] === btn) {
        // Guess was correct!
        if (guessCounter === progress) {
            if (progress === pattern.length - 1) {
                // win!
                winGame();
            } else {
                //Pattern correct. Add next segment
                progress++;
                playClueSequence();
            }
        } else {
            // check the next guess
            guessCounter++;
        }
    } else {
        numMistake++;
        // Allow the user to make 2 mistakes before they lose the game
        if (numMistake > 2) {
            // lose
            loseGame();
        } else {
            // continue
            if (guessCounter === progress) {
                if (progress === pattern.length - 1) {
                    // win!
                    winGame();
                } else {
                    //Pattern correct. Add next segment
                    progress++;
                    playClueSequence();
                }
            } else {
                // check the next guess
                guessCounter++;
            }
        }
    }
}
