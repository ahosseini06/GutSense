import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [prompt, setPrompt] = useState("");
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI("AIzaSyDYt_4TjjbqSGaSet4FGDJibrpOTNYM51Q");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const getResponse = async (prompt) => {
        setLoading(true);
        const result = await model.generateContent(prompt);
        setLoading(false);
        setResponse(result);
        console.log(result);
    }

  return (
    <div className="App">
        <input placeholder="Enter your prompt here"
        onChange={(e) => setPrompt(e.target.value)}
        style={{height: "50px", width: "200px"}}
        value={prompt}>
        </input>
        <div style={{height: "50px", width: "200px", backgroundColor: "grey"}}>
            {/*loading ? "Loading..." : response*/}
        </div>
        <button onClick={() => getResponse(prompt)}>Generate</button>
    </div>
  );
}

export default App;
