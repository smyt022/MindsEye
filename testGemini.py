from google import genai


def get_Gemini_key():
    #we should hide this using github secrets
    key = "AIzaSyDCOx-id2fqfy0tN954xUae15qkq0FCpqI"
    return key

#setup client
client = genai.Client(api_key=get_Gemini_key())

prompt = input("Enter prompt: ")

response = client.models.generate_content(
    model="gemini-2.0-flash", contents="in 4 sentences..."+prompt
)
print(response.text)