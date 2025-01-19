// src/dialogflowClient.js

const dialogflow = require('@google-cloud/dialogflow');
const path = require('path');

// 環境変数に合わせてJSONファイルパスを指定
require('dotenv').config();

const serviceAccountPath = path.join(__dirname, '..', process.env.SERVICE_ACCOUNT_PATH);
const projectId = process.env.GCP_PROJECT_ID; // GCPのプロジェクトID

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: serviceAccountPath
});

async function detectIntent(text, sessionId) {
  //テスト：
  console.log(text, sessionId);

  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'ja',
      },
    },
  };

  const [response] = await sessionClient.detectIntent(request);
  console.log(response);
  return response;
}

module.exports = {
  detectIntent
};