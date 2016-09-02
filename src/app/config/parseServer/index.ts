import * as path from 'path'
import * as models from '../../../models'
import * as lib from '../../../lib'

export function getParseServerDockerfile(g3Config: models.G3Config): string {
  return `FROM node:latest

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

## ENV
# Optional (default : '${g3Config.parse.appId}')
#ENV APP_ID
# Optional (default : '${g3Config.parse.masterKey}')
#ENV MASTER_KEY
# Optional (default : '${g3Config.parse.databaseURI}')
#ENV DATABASE_URI
# Optional (default : ${g3Config.parse.port})
#ENV PORT
# Optional (default : '/parse')
#ENV PARSE_MOUNT
# Optional (default : 'http://localhost:${g3Config.parse.port}/parse')
#ENV SERVER_URL
# Optional (default : '${g3Config.cloudCode}')
#ENV CLOUD_CODE
# Optional (default : ${g3Config.parse.dashboard})
#ENV DASHBOARD
# Optional (default : '${g3Config.parse.dashboardUser}')
#ENV DASHBOARD_USER
# Optional (default : '${g3Config.parse.dashboardPass}')
#ENV DASHBOARD_PASS

EXPOSE ${g3Config.parse.port}

CMD [ "node", "./server.js" ]`
}

export function getParseServerJs(g3Config: models.G3Config): string {
  let comments = 'node ./.g3/cli/parse/server.js'
  let cloud = path.resolve(g3Config._appPath, g3Config.cloudCode, 'main.js')
  if (g3Config._command === models.Const.COMMAND_BUILD) {
    comments = 'node ./server.js'
  }

  return `/* ${comments} */
var path = require('path')
var express = require('express');
var Parse = require('parse/node');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var appId = process.env.APP_ID || '${g3Config.parse.appId}';
var masterKey = process.env.MASTER_KEY || '${g3Config.parse.masterKey}';
var databaseURI = process.env.DATABASE_URI || '${g3Config.parse.databaseURI}';
var port = process.env.PORT || ${g3Config.parse.port};
var mountPath = process.env.PARSE_MOUNT || '/parse';
var serverURL = process.env.SERVER_URL || 'http://localhost:' + port + mountPath;
var cloudCode = process.env.CLOUD_CODE || '${g3Config.cloudCode}';
var cloud = ${(g3Config._command !== models.Const.COMMAND_BUILD) ? "'" + cloud + "'" : "path.resolve(__dirname, cloudCode, 'main.js')"};
var dashboard = process.env.DASHBOARD || ${g3Config.parse.dashboard};
const user = process.env.DASHBOARD_USER || '${g3Config.parse.dashboardUser}';
const pass = process.env.DASHBOARD_PASS || '${g3Config.parse.dashboardPass}';

Parse.initialize(appId);
Parse.serverURL = serverURL;
Parse.masterKey = masterKey;
Parse.Cloud.useMasterKey();

var server = express();

server.use(mountPath, new ParseServer({
  databaseURI: databaseURI,
  cloud: cloud,
  appId: appId,
  masterKey: masterKey,
  serverURL: serverURL,
}));

if (dashboard) {
  let users;
  if (user && pass) {
    users = [{user, pass}];
  }
  server.use('/dashboard', new ParseDashboard({
    apps: [{
      serverURL: '/parse',
      appId: appId,
      masterKey: masterKey,
      appName: appId
    }],
    users
  }, true));
  server.use('/', (req, res) => res.redirect('/dashboard'));
}

server.listen(port, function () {
  return console.log('Parse-Server running at ' + serverURL);
});
`
}
