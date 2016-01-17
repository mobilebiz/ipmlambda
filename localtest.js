var event = {
  "param": {
    "device": "browser"
  }
};

//BUILD STAB OF context OBJECT.
var context = {
  invokeid: 'invokeid',
  done: function(err,message){
    return;
  },
  fail: function(message) {
    console.log('Test completed with error. '+message);
    return;
  },
  succeed: function(message) {
    console.log('Test completed with succeed. '+message.identity+', '+message.token);
  }
};


//RUN YOUR HANDLER
var lambda = require("./src/index");
lambda.handler(event, context);
