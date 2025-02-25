from google import genai


def get_Gemini_key():
    #we should hide this using github secrets
    key = "AIzaSyDCOx-id2fqfy0tN954xUae15qkq0FCpqI"
    return key

#setup client
client = genai.Client(api_key=get_Gemini_key())

#globals
word = "elephant"
successfulGuess = False
numOfGuesses = 0

for i in range(3):
    prompt = input("ask a True or False question: ")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Answer only True or False to the following question/statement, do NOT say anything else {"+prompt+"}"
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
        


