# IGN-CodeFoo
Hello my name is Jarrett Pon and this is my application to IGN's Code Foo 6. My application can also be viewed at http://www.jarrettpon.com/codefoo/public/ Below is my bio and additional explanations to the problems I completed for Code Foo.

# Bio
To supplement my video, I will extend my bio. I graduated May 2015 with a B.S. in chemical engineering at University of Missouri. Since graduating I have decided to pursue a career in tech industry. Even though my degree is in ChemE, I have always had interest in coding and computer science. On two occasions I seriously contemplated switching my degree to computer science but ended up sticking to my original degree. However during my time at college, I did study C and take a Matlab course. With Matlab, I created a vapor equilibrium calculator for specific three component systems in Matlab with a GUI. In addition, I have experience with working in teams, exposed me to project management skills, and presenting information. 

Since this past December, I have learned Python from a Coursera course and finished Harvard’s CS50x class short of the final project. In the CS50x course I learned C, HTML, CSS, PHP, and JavaScript. It has been a challenge working on Code Foo 6, however I enjoy problem solving and working on challenging problems. It was actually fun getting stuck in a problem but then being able to figure it out after spending time on it. Lastly, I also enjoy learning new languages and being able to apply them different problems.

# Scrabble
For the scrabble program I made two functions. One was check and the other was order. In scrabble.php, there is a loop to go through each word in the dictionary and run it through the check function. The check function (in helpers.php which is included by default) takes in the dictionary word and the letters the user inputted. It would first sort the dictionary word by letters. Then looping through the new sorted dictionary word, it would check if the letter existed in the letter. For dictionary words with reoccurring letters, it would also check for that by recording the last position it was in the word and checking for reoccurring letters it after that position. It would then return true if the letters could make up the dictionary word. 

The order function takes the array of picked letters and then finds out the point value of the word. It created an associative array with the key was the word and key was the point value of the word. It then sorted based on the value in descending value. From here the list of best scrabble word from list of letters is complete. 

# Front End
The front end problem was mostly done with JavaScript. The code is stored in script.js which is automatically included. 

I accessed the API via JSONP. Then I parsed through the json file through the objection notation in js. The site automatically loads the articles from the API first. For the articles, no URL was supplied but I realized that the articles URL have a certain format. The API gave information that could construct the format. With the necessary information extracted, each article link was appended in a loop. Initially, ten articles are displayed. An active id is attached to article as a tag. 

The remaining code checks if videos or articles is clicked. If so, it checks if active is assigned. If not, then it will empty the previous list and access the API and re-append like mentioned previously. 

At this point in time, clicking more videos or more articles adds the next 10 video/articles.

After everything was programmed, I just spent time figuring out the css to make it look as close to the IGN example as possible.

# Bonus
The bonus has many comments but I'll include my overall thoughts here to have it all in one place. First I created a card system, with an array of the card value, 1 to 13, and the card type, d-diamond, c-clubs, s-spades, h-hearts. Then I had a function that would shuffle the cards. After shuffling, the cards are "dealt." For every card there is an image, named in a similar convention to the card system. This makes accessing and displaying cards easy. The layout is in a grid system by bootstrap. Every ROUND is initialized by clicking bet. After the initialization tags would be set to true that would allow you the actions of the poker game (previously set to false). 

The fun part was coding the function to determine what the hand is for each player. I determined this by a point system. Working from lowest hand type (high card, then pair), to a royal flush, the points went from 0 to 90000. The point system is in the tens of thousands because that allows information for two cards to be stored. For example, if a pair is worth 10000 points. An ace pair is worth 10014 vs a ten pair 10010. With this point system you can tell who has the better hand. For two pairs, we need information about both pairs, in case the top pair is a tie for both players. When there is all 5 cards exposed, there are 21 different combinations that the player and AI can have. This is determined by looping all possibilities and ordering by point value.

Initially, I had the AI return a check/call every time and coded what would happen with each user response. The user is never allowed to re-raise and can only raise once on the beginning of their turn. After raising, the pot size increases and the points are taken away from both players. On a check, nothing happens but the next round. A fold gives the pot to the opponent and ends the round. All-in takes points equal to the player with the least amount of points, from both players and adds it to the pot. To know what round the game is in, there is a stage variable which increases accordingly. 

The last part is programming the AI. I could make the AI cheat and have it fold when it knows it’s going to lose from the beginning or raise/go all in/call when it knows it’s going to win. Of course that would be no fun, so the AI responds to only the cards it knows about, just like the player. The fun thing about the AI is that it is not predictable. I use a random number generator that gives a number from 1-100. Each decision the AI makes is by probability but not by certainty. Just because it has a "bad" or "good" hand it will be more likely to make a certain decision but it could still make a "bad" decision or have what I like to call a bluff chance. I created a separate point system for the initial two cards which evaluates the first two cards. The higher the points the better the first two cards. After the first three cards are shown, I just use the normal 5 card point system to make decisions. From here, the AI makes decisions based on chance which the chances are determined by what the AI has. The probability also change in between the stages for the same points because the cards are not all determined in the beginning. 

#Lego 
Most of the Lego problem is explained on the page. Basically I found the biggest Lego pieces for each part of the bridge. Then found the volume of the bridge and determine the pieces needed. Some parts I account for negative space.

#Backend - QWERTY

At this point I have finished part A of the backend. All the program does is take the input and has a case:switch that outputs a QWERTY key from the AZERTY keyboard position. I tackled the sticky h key and some keys that can't be made on AZERTY keyboard by my own "escape character" of +. I choose + because it is in the same spot on both keyboards.

#Backend - ISO 8601

For this program I decided to use regex. Even though I've been exposed to regex, I am not too familiar with using it. I still used regex so I could get practice on it and because it seemed like a simpler way to parse the date strings. Originally I was going to use regex on each individual scenario on the list of date strings given by IGN. However this seemed very inefficient, so I parsed by similar patterns and assigned the pattern values corresponding to the part of the date. At the end I would put the ISO 8601 string together with what I could parse out.
