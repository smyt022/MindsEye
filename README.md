### PROJECT ###
Mind's Eye is a game where the player has 10 attemps to guess the hidden word.
Before each guess, the play can ask one True or False question to narrow down the possibilities.

End Goal: accumulate a large player base, similar to wordle
"A Gale-published article even claims that "Wordle is less about winning and more about the friends we make along the way" due to the new ease of sharing. The game's player base rose greatly, from just 90 players on November 1, 2021, to over 300,000 by January 2, 2022, and more than 2 million a week later." - Wikipedia

An ENGAGING UI and aesthetic/feel of the guessing experience will play a large role in making it fun.
Ideas for UI:
- Logo: illuminati-like EYE with a magnifying glass hovering over it (make it a GIF)
- after each guess, show the player an estimate of how many word possibilities have been 'eliminated'
(how much their guess narrowed it down)
- HUGE use of that train-station-display style to display words. (add clicking sounds + train-station-display effect when waiting for gemini to respond 'True/false')

## info/notes about the project ##
- front-end React.js was setup with Vite template


### TASKS ###

## front-end ##
- setup react codebase (use vite or)
## back-end ##
- add api endppoints using flask
## infrastructure/devops ##
- deploy prototype on AWS
- automate deployment using terraform/github actions
## security ##
- make sure to sanatize all api endpoint inputs before releasing
- look around for other vulnerabilities
after cloning this repo
run:
pip install -r requirements.txt
