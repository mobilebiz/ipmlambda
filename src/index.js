/**
 * Twilio IP Messaging on AWS Lambda sample.
 *
 */
var AWS = require('aws-sdk');

AWS.config.update({
  region: "ap-northeast-1"
});

var twilio = require('twilio')
  , _accountSid = 'Your Twilio Account SID'
  , _apiKey = 'Twilio API Key'
  , _apiSecret = 'Twilio API Secret'
  , _serviceSid = 'IP Messaging Service SID'
  , AccessToken = twilio.AccessToken
  , IpMessagingGrant = AccessToken.IpMessagingGrant
;

var randomUsername = require('./randos');

exports.handler = function(event, context) {
  console.log('Process start.');
  console.log("Received event:\n", JSON.stringify(event, null, 2));

  var appName = 'TwilioChatDemo';
  var identity = randomUsername();
  var deviceId = event.param.device || 'browser';

  // Create a unique ID for the client on their current device
  var endpointId = appName + ':' + identity + ':' + deviceId;

  // Create a "grant" which enables a client to use IPM as a given user,
  // on a given device
  var ipmGrant = new IpMessagingGrant({
      serviceSid: _serviceSid,
      endpointId: endpointId
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(
      _accountSid,
      _apiKey,
      _apiSecret
  );
  token.addGrant(ipmGrant);
  token.identity = identity;

  // Serialize the token to a JWT string and include it in a JSON response
  console.log('Process completed.');
  context.succeed({
      identity: identity,
      token: token.toJwt()
  });
};
