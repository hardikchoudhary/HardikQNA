var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
  appId: "8b4fdfdc-2001-4c88-8b5e-0dda932a63bd",
    appPassword:"fOz9i4CKJhWUov1Z8ufqd8h"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var recognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: 'f2bba394-7afd-4834-9921-ebaf51511bca', 
	subscriptionKey: '6fe63002a3484151b7174e065a4ec5e5',
	top: 3});
	
	var qnaMakerTools = new cognitiveservices.QnAMakerTools();
bot.library(qnaMakerTools.createLibrary());

var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
	recognizers: [recognizer],
	defaultMessage: 'No match! Try changing the query terms!',
	qnaThreshold: 0.3,
	feedbackLib: qnaMakerTools
});
	
// var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
	// recognizers: [recognizer],
	// defaultMessage: 'No match! Try changing the query terms!',
	// qnaThreshold: 0.3
// });

bot.dialog('/', basicQnAMakerDialog);
