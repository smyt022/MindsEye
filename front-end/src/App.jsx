import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);//stores past Q&A
  const [response, setResponse] = useState(null);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [correctWord, setCorrectWord] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch word of the day when DOM reloads
  useEffect(() => {
    const fetchWord = async() => {
      try{
        const res = await axios.get("http://127.0.0.1:5000/word_of_the_day");
        setCorrectWord(res.data.word.toUpperCase());//ensure uppercase for comparison
      } catch(error){
        console.error("Error fetching word of the day:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWord();
  }, []);

  const askQuestion = async () => {
    if (questions.length >= 5) return;

    try {
      const res = await axios.get(`http://127.0.0.1:5000/ai_response?prompt=${encodeURIComponent(question)}`);
      const aiResponse = res.data.response.trim(); // Ensure no leading/trailing whitespace
      setQuestions([...questions, {question, response: aiResponse }]);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
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

      <ul>
        {questions.map((q,index) => (
          <li key={index}>
            <strong>{q.question}</strong>: {q.response}
          </li>
        ))}
      </ul>
      
      
      {questions.length < 5 && !gameOver ? (
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
        !gameOver && <p>You have asked 5 questions. Now make your guess!</p>
      )}

      {questions.length >= 5 && !gameOver && (
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
