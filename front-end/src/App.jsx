import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  //globals
  const NUM_OF_QUESTIONS = 6

  //React variables/states
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);//stores past Q&A
  //const [response, setResponse] = useState(null);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [correctWord, setCorrectWord] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch word of the day when DOM reloads
  useEffect(() => {
    const fetchWord = async(attempt = 1) => {
      setLoading(true); // show loading state
      try{
        const res = await axios.get("http://127.0.0.1:5000/word_of_the_day");
        setCorrectWord(res.data.word.toUpperCase());//ensure uppercase for comparison
        setLoading(false);
      } catch(error){
        console.error("Error fetching word of the day:", error);

        if(attempt < 3){ //try making request 3 times
          setTimeout(() => fetchWord(attempt +1), 2000); //wait 2s, then retry
        }else{
          setLoading(false);
          alert("Failed to load word of the day. Please refresh the page.");
        }
      }
    };
    fetchWord();
  }, []);

  const askQuestion = async (attempt = 1) => {
    if (questions.length >= NUM_OF_QUESTIONS) return;

    setLoading(true); 
    try {
      const res = await axios.get(`http://127.0.0.1:5000/ai_response?prompt=${encodeURIComponent(question)}`);
      const aiResponse = res.data.response.trim(); // Ensure no leading/trailing whitespace
      setQuestions([...questions, {question, response: aiResponse }]);
      setQuestion("");
      setLoading(false);
    } catch (error) {
      console.error(`Attempt ${attempt}: Error fetching AI response:`, error);

      if(attempt < 3){//retry 3 times
        setTimeout(() => askQuestion(attempt +1), 2000);//wait 2s before retrying
      } else {
        setLoading(false);
        alert("AI is not responsive, please try again later");
      }
    }
  };

  const submitGuess = () => {
    setGameOver(true);
  };

  if (loading) return <h2>Loading word...</h2>

  return (
    <div className="pageContainer">
      <h1>Mind's Eye</h1>
      <p>word has {correctWord.length} letters</p>
      <p>you can ask {NUM_OF_QUESTIONS} True/False qustions</p>

      <ul>
        {questions.map((q,index) => (
          <li key={index}>
            <strong>{q.question}</strong>: {q.response}
          </li>
        ))}
      </ul>
      
      
      {questions.length < NUM_OF_QUESTIONS && !gameOver ? (
        <>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder = "Ask a true/false question..."
          />
          <button onClick={askQuestion}>Ask</button>
        </>
      ) : (
        !gameOver && <p>You have asked {NUM_OF_QUESTIONS} questions. Now make your guess!</p>
      )}

      {questions.length >= NUM_OF_QUESTIONS && !gameOver && (
        <>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess..."
          />
          <button onClick={submitGuess}>Submit Guess</button>
        </>
      )}

      {/* show if they guessed correct*/}
      {gameOver && (
        <h2>
          {guess.toUpperCase() === correctWord ? (
            <h3 className="correct">CORRECT</h3>
          ) : (
            <h3 className="incorrect">INCORRECT</h3>
          )}
        </h2>
      )}
      {gameOver && guess.toUpperCase() !== correctWord && <p>The word was: {correctWord}</p>}
    </div>
  );
}

export default App;
