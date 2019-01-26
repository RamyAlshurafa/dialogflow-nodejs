// Imports the Dialogflow client library
const dialogflow = require('dialogflow');


module.exports = async (req, res) => {
  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  const projectId = 'newagent-bd6dc';

  const sessionId = `12345`;
  const languageCode = 'BCP-47 language code, e.g. en-US';
  const query =  req.body.message;

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    queryParams: {
      sentimentAnalysisRequestConfig: {
        analyzeQueryTextSentiment: true,
      },
    },
  };
  

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  console.log(responses[0].queryResult.intent);

  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  if (result.sentimentAnalysisResult) {
    console.log(`Detected sentiment`);
    console.log(
      `  Score: ${result.sentimentAnalysisResult.queryTextSentiment.score}`
    );
    console.log(
      `  Magnitude: ${
      result.sentimentAnalysisResult.queryTextSentiment.magnitude
    }`
    );
  } else {
    console.log(`No sentiment Analysis Found`);
  }
  res.json(responses)
}