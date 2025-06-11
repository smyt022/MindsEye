### PROJECT ###
Mind's Eye is a game where the player has 5 attemps to guess the hidden word.
Before each guess, the play can ask one True or False question to narrow down the possibilities.



## info/notes about the project ##
- front-end React.js was setup with Vite template

## front-end Development & Testing guide ##
- so far we have React.js that was setup with the basic 'Vite' template 
    - src/App.jsx – This is your main component. Start editing this file to implement your webpage. You can structure your UI here or break it down into smaller components.
    - src/main.jsx – This is where React is initialized and injected into the index.html file. You likely don’t need to edit this unless you want to configure a context provider or Redux store.
    -   index.html – The root HTML file where your React app gets mounted. You generally won’t need to modify this much, except for adding metadata or external scripts.
    -   src/assets/ – Store static files like images, fonts, and custom stylesheets here.

- To build/run the React.js front end server:
    1. cd into "front-end" folder
    2. run "npm run dev"

- dependencies:
    -   run "npm install axios"
    -   run "npm install 

## Backend Development & Testing guide ##

- to build/run the flask server back-end:
    1. cd into "/backend"
    2. run "python routes.py" 


### TASKS ###

## front-end ##
- setup react codebase (use vite or)    DONE
- successfull make API calls from backend, display on the page
- make the core game functionality work 

## back-end ##
- add api endppoints using flask    DONE

## infrastructure/devops ##
- deploy prototype on AWS
- automate deployment using terraform/github actions
## security ##
- make sure to sanatize all api endpoint inputs before releasing
- look around for other vulnerabilities
after cloning this repo
run:
pip install -r requirements.txt
