from flask import Flask, request, jsonify
import backend

#name is set to __main__ if script is ran directly
#if imported as a module, __name__ is set to 'routes' (name of the file)
app = Flask(__name__)


@app.route('/')
def home():
    return "Hello, this is backend!"


#geting True/False ai response based on question
@app.route('/ai_response', methods=['GET'])
def ai_response():
    prompt = request.args.get('prompt')
    
    if not prompt:
        return (jsonify({"error":"Missing required prompt parameter"}), 400)
    
    response = backend.get_AI_Response(prompt);
    
    return (jsonify({"response":response}), 400)


#word of the day endpoint
@app.route('/word_of_the_day', methods=['GET'])
def word_of_the_day():
    word = backend.get_word()
    return (jsonify({"word":word}),400)

if __name__ == '__main__':
    #runs on http://127.0.0.1:5000 by default
    app.run(debug=True)


