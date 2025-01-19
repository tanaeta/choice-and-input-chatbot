/**
 * チャットボットの設定ファイルを定義。
 * initialMessages やコンポーネントの見た目などを設定。
 */
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import Options from "./Options";

var botName = "chatta";

const DEFAULT_OPTIONS = [
  { id: 1, text: "Option 1" },
  { id: 2, text: "Option 2" },
  { id: 3, text: "Option 3" },
];

const config = {
  // ボットの名前
  botName: botName,
  //初期メッセージ
  initialMessages: [
    createChatBotMessage(
      `こんにちは！ ${botName}です。何かご用件はありますか？`,
      {
        widget: "dynamicOptions",
      }
    )
  ],
  state: {
    options: [
      { id: 1, text: "Option 1" },
      { id: 2, text: "Option 2" },
      { id: 3, text: "Option 3" },
    ],
  },
  widgets: [
    {
      widgetName: "dynamicOptions",
      widgetFunc: (props) => <Options {...props} />,
      mapStateToProps: ['options'],
    },
  ],
  // チャットボットの見た目をカスタマイズ
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E"
    },
    chatButton: {
      backgroundColor: "#376B7E"
    }
  },
  // アバター画像を非表示にする設定
  customComponents: {
    header: (props) => null,
    botAvatar: (props) => null,
    userAvatar: (props) => null,
  },
  // ActionProvider と MessageParser を指定
  actionProvider: ActionProvider,
  messageParser: MessageParser
};

export default config;
