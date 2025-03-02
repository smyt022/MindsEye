from google import genai


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
        model="gemini-2.0-flash", contents="For context, word that is being guessed is:"+word+" ... Answer only True or False to the following question/statement, do NOT say anything else {"+prompt+"}"
    )
    return response

#returns word of the day
def get_word():
    return "lion"
#the number of guesses tracker will be kept in cookies



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
        


