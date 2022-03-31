# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Zhaohui Wang**

Time spent: **4.5** hours spent in total

Link to project: (insert your link here, should start with https://glitch.com...)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:  

The gifs below show the optional features I implemented:  
* There are 5 buttons and each turn the clue playback will speed up. Every button also has its own backgroud image.   
![](https://s21.aconvert.com/convert/p3r68-cdx67/i1eek-9f8jc.gif)
* Randomly generate the pattern at the beginning of the game.   
![](https://s27.aconvert.com/convert/p3r68-cdx67/3fgq9-japdo.gif)
* Allow the user to make 2 mistakes before they lose the game. When the user makes a third mistake, the game fails.    
![](https://s19.aconvert.com/convert/p3r68-cdx67/zurx0-7ogaa.gif)
* There is a countdown clock here, players have 30s for each round.    
![](https://s17.aconvert.com/convert/p3r68-cdx67/hp8yg-llwit.gif)
* When the countdown is over, the game fails.    
![](https://s21.aconvert.com/convert/p3r68-cdx67/ughx4-zy8vy.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
[YOUR ANSWER HERE]
https://www.w3schools.com/js/js_math.asp   
https://developer.mozilla.org/en-US/docs/Web/API/setTimeout   
https://stackoverflow.com/questions/2738920/how-to-add-background-image-for-input-type-button    
https://stackoverflow.com/questions/22301555/left-and-right-align-on-same-line  
https://www.w3schools.com/howto/howto_js_countdown.asp
https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/  
https://dev.to/code_mystery/simple-countdown-timer-using-javascript-1jab  


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
[YOUR ANSWER HERE]

When I was writing the second optional function, at first I just followed the tips in the tutorial and just updated the clueHoldTime in playClueSequence. But I have a habit of testing code robustness in extreme cases. During testing, I found that if users click stop and then click Start, the playback speed would be very fast, and sometimes I could not even hear the sound playing. To locate and fix the problem, I used console.log to output the clueHoldTime for each round, and found that when a new round of the game started, the clueHoldTime would not change back to the initial 1000ms, but would continue to decrease from the previously updated one. So, I reinitialized the clueHoldTime in startGame, which solved the problem.  
This taught me three lessons. First, don't just follow the steps in the tutorial, but always keep thinking. Second, get into the habit of testing the feasibility of the code under special input and special interaction conditions, which can make the code more robust. Third, be good at using the console to monitor the intermediate results of the code, so that you can find and fix bugs faster.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[YOUR ANSWER HERE]

I know that in actual web development work, engineers use web frameworks to help them become more efficient and help other developers understand their code. So I am wondering what are the most commonly used web frameworks? How to choose the right web framework when web development? What are the latest web frameworks worth learning?   

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[YOUR ANSWER HERE]

I want to add a difficulty level option to this game so that users can customize the difficulty level of the game. The difficulty level can be changed in two ways.  
One is the number of buttons to memorize. I want the user to be able to choose the number of buttons to memorize, instead of the fixed 8. The other is to change the limit time of the game. I currently set the game time to 30s. I hope that users can adjust the limit time by themselves in the future.    
With these difficulty level settings, this game will be suitable for more users of different ages to play and will make users feel more challenging and accomplished.    

## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


