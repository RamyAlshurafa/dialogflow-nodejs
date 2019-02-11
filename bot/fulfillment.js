const { WebhookClient } = require("dialogflow-fulfillment");

welcomeFulfillment = (agent) => {
  console.log(4444444444444,agent.session);
  
  agent.add("this message sent by webhooks for Welcome intent")
  agent.add("this is another message also")
}

historyBad = (agent) => {
  console.log(22222222,agent.session);

  agent.add("this message sent by webhooks for History bad intent")
  agent.add("this is another message also")
}

module.exports = (req, res) => {
  console.log("33333333333");
  
  const agent = new WebhookClient({ request: req, response: res });
  let intentMap = new Map(); 
  intentMap.set('Welcome', welcomeFulfillment);
  intentMap.set("welcome - yes - good - friends - yes - history no", historyBad);
  agent.handleRequest(intentMap);
}

