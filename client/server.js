var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , morgan = require('morgan')
  , bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var server = http.createServer(app);
server.listen(8000);

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
  }, 100);
  console.log('started client interval');
  ws.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
  });
});