/**
 * ユーザーからのメッセージ入力を解析し、適切な ActionProvider のメソッドを呼び出す。
 */
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message.trim().length > 0) {
      // 何らかのキーワードで条件分岐可能
      // 例: 特定コマンドの場合に別の処理を呼び出す
      this.actionProvider.handleUserMessage(message);
    }
  }
}

export default MessageParser;
