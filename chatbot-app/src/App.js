import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./App.css";

import config from "./component/ChatbotConfig";
import ActionProvider from "./component/ActionProvider";
import MessageParser from "./component/MessageParser";

function App() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        placeholderText='質問を入力してください'
      />
    </div>
  );
}

export default App;