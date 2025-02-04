import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

// Sample FAQ data (categories and their questions)
const faqCategories = [
  {
    title: '商品について',
    questions: [
      '商品の使用方法は？',
      '保証期間はどのくらいですか？'
    ]
  },
  {
    title: '注文・配送について',
    questions: [
      '注文のキャンセルは可能ですか？',
      '配送にどのくらいかかりますか？'
    ]
  },
  {
    title: 'その他',
    questions: [
      'アカウントの作成方法は？',
      'ログインできません'
    ]
  }
];

// A mock function simulating an external chat API call.
// In a real-world scenario, you would call fetch or axios here.
async function mockExternalChatAPI(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`<p>これは外部APIからの返答です。<br/>入力: ${query}</p>`);
    }, 1000);
  });
}

// Chat bubble component
function ChatBubble({ side = 'left', content, isHtml }) {
  const bubbleClass = side === 'right' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-[60%] rounded-2xl p-3 m-2 shadow ${bubbleClass}`}
    >
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <span>{content}</span>
      )}
    </motion.div>
  );
}

export default function ChatBotCanvas() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, activeQuestions]);

  // Handle sending user input to external API
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputText,
      isHtml: false,
      side: 'right'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate calling external chat API
    const responseHtml = await mockExternalChatAPI(inputText);
    const botMessage = {
      id: Date.now() + 1,
      role: 'bot',
      content: responseHtml,
      isHtml: true,
      side: 'left'
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  // Handle selecting an FAQ category
  const handleSelectCategory = (index) => {
    const category = faqCategories[index];
    // Add user bubble
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: category.title,
      isHtml: false,
      side: 'right'
    };
    setMessages((prev) => [...prev, userMessage]);

    setActiveCategoryIndex(index);
    setActiveQuestions(category.questions);
  };

  // Handle selecting a question under the chosen category
  const handleSelectQuestion = (question) => {
    // Add user bubble
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: question,
      isHtml: false,
      side: 'right'
    };
    setMessages((prev) => [...prev, userMessage]);

    // Here, you could fetch relevant FAQ answer or do something else.
    // For demonstration, let's just show that we picked a question.
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Main scrollable container */}
      <div className="flex-1 overflow-y-auto p-2" ref={chatContainerRef}>
        <div className="flex flex-col">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              side={msg.side}
              content={msg.content}
              isHtml={msg.isHtml}
            />
          ))}
          {/* FAQ Category list (only show if no category is active) */}
          {activeCategoryIndex === null && (
            <div className="my-4">
              <h2 className="text-lg font-bold mb-2">FAQカテゴリを選択してください</h2>
              <div className="grid grid-cols-2 gap-2">
                {faqCategories.map((cat, idx) => (
                  <Button key={cat.title} onClick={() => handleSelectCategory(idx)}>
                    {cat.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Question list for the active category */}
          {activeQuestions.length > 0 && (
            <div className="my-4">
              <h2 className="text-lg font-bold mb-2">質問を選択してください</h2>
              <div className="grid grid-cols-1 gap-2">
                {activeQuestions.map((q) => (
                  <Button key={q} onClick={() => handleSelectQuestion(q)}>
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <Card className="sticky bottom-0 w-full shadow-inner">
        <CardContent className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded p-2"
            placeholder="メッセージを入力..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleSendMessage} variant="default">
            送信
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
