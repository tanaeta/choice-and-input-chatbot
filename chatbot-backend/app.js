// app.js
const express = require('express');
const cors = require('cors');
const { detectIntent } = require('./src/dialogflowClient');

const app = express();
const port = process.env.PORT || 3001;

// 必要に応じてCORS設定
app.use(cors({
  origin: 'http://localhost:3000', // フロントエンドのURLを指定
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));
app.use(express.json());

// フロントエンドからの問い合わせを受け付けるエンドポイント
app.post('/api/dialogflow', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const sessionId = req.body.sessionId || 'default-session';

    // Dialogflowに問い合わせ
    const dialogflowResponse = await detectIntent(userMessage, sessionId);
    // Dialogflowのレスポンスから返すメッセージを抽出
    const result = dialogflowResponse.queryResult;
    const fulfillmentText = result.fulfillmentText;

    // 必要に応じて、レスポンスを加工
    // 例: テキストのみ返す
    res.json({
      reply: fulfillmentText
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
