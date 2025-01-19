/**
 * ユーザーが入力したメッセージがパーサーを通過した後に実行されるアクションを定義。
 * バックエンドの /api/dialogflow に問い合わせる関数などを作成。
 */
import axios from 'axios';
import Options from './Options';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage, stateRef, createCustomMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  setChatbotMessage(message) {
    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }

  async handleUserMessage(userMessage) {
    try {
      // Node.js のバックエンドに問い合わせ
      const response = await axios.post('http://localhost:3001/api/dialogflow', {
        message: userMessage,
        sessionId: 'some-session-id'
      });
      const botReply = response.data.reply;
      const botMessage = this.createChatBotMessage(botReply);
      this.setChatbotMessage(botMessage);
    } catch (error) {
      console.error(error);
      const errorMessage = this.createChatBotMessage("エラーが発生しました。");
      this.setChatbotMessage(errorMessage);
    }
  }

  handleOptionClick = (optionId) => {
    //ここでサーバーサイドにoptionIdを送信し、表示するテキストと選択肢のリストを受け取る。
    const nextText = "選ばれた選択肢は"+optionId+"です。次の選択肢を選んでください";
    const nextOptions = [
      { id: 4, text: 'Option 4' },
      { id: 5, text: 'Option 5' },
      { id: 6, text: 'Option 6' },
      { id: optionId, text: 'back' }
    ];

    const newMessage = this.createChatBotMessage(
      nextText, 
      {
        widget: "dynamicOptions",
      }
    );

    // メッセージと選択肢を更新（古いメッセージは残さない）
    this.setState((prevState) => ({
      ...prevState,
      options: nextOptions,
      messages: [newMessage],
    }));
  };
}

export default ActionProvider;