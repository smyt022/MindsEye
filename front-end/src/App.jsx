import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const askQuestion = async () => {
    try {
      //assuming backend server is at 127...
      const res = await axios.get(`http://127.0.0.1:5000/ai_response?prompt=${encodeURIComponent(question)}`);
      const aiResponse = res.data.response.trim(); // Ensure no leading/trailing whitespace
      console.log("API response: ", aiResponse);//testing
      setResponse(aiResponse); // "True" or "False" (as string)
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div>
      <h1>Mind's Eye</h1>
      <p>word has 4 letters</p>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
      />
      <button onClick={askQuestion}>Ask</button>

      {/*Display AI's responses*/}
      <h2>Response: {response}</h2>
    </div>
  );
}

export default App;
