from google import genai
import datetime

def get_Gemini_key():
    #we should hide this using github secrets
    key = "AIzaSyDCOx-id2fqfy0tN954xUae15qkq0FCpqI"
    return key




"""
backend helper functions 
that will be called by the front-end through endpoints
"""

def get_AI_Response(prompt):
    #setup client
    client = genai.Client(api_key=get_Gemini_key())
    
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="For context, word that is being guessed is:"+get_word()+" ... Answer only True or False to the following question/statement, do NOT say anything else {"+prompt+"}"
    )
    
    #just keep the actual text response,
    #dont need other metadata
    response = str(response.candidates[0].content.parts[0].text)
    
    print("ai_response: "+response)
    
    return response

#returns word of the day
def get_word():
    
    #get current day, modulus, index workbank
    current_day = datetime.datetime.now().day
    
    #word bank
    wordBank = ['APPLE', 'BALL', 'CAR', 'DOG',
                'ELEPHANT','FLOWER','GARDEN','HOUSE','ISLAND',
                'JACKET','KEY','LAMP','MOUNTAIN','NOTEBOOK',
                'ORANGE','PENCIL','QUEEN','RIVER','SCHOOL','TABLE',
                'UMBRELLA','TIGER','WINDOW','CHAIR','TREE']
    
    word = wordBank[current_day%len(wordBank)]
    
    return str(word)



"""
#terminal implementation...


#globals
word = "lion"
successfulGuess = False
numOfGuesses = 0


# 3 true or false guesses
for i in range(3):
    prompt = input("ask a True or False question: ")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="For context, word that is being guessed is:"+word+" ... Answer only True or False to the following question/statement, do NOT say anything else {"+prompt+"}"
    )
    print(response.text)
    prompt = input("Guess the word: ")
    numOfGuesses += 1
    if(prompt.lower() == word.lower()):
        successfulGuess = True
        print("correct!")
        break
    else:
        successfulGuess = False
        print("incorrect!")
"""
        


