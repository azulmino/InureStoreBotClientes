TOKEN: MTQ0MT U4NjMx NTAx NDU 3 MDA4NQ. GE3l3N.QF- xYS5 V1 dGM6f  qeB5-cBv POu1jr0wm  sGEGPfM
CLIEND_ID: 144 15 8 6 3 150 14 570 085  
npm install discord.js dotenv @discordjs/rest @discordjs/builders

[dotenv@17.2.3] injecting env (2) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
Registrando comandos...
DiscordAPIError[50035]: Invalid Form Body
application_id[NUMBER_TYPE_COERCE]: Value "undefined" is not snowflake.
    at handleErrors (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:762:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async SequentialHandler.runRequest (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1163:23)
    at async SequentialHandler.queueRequest (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:994:14)
    at async _REST.request (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1307:22)
    at async C:\Users\Administrator\Desktop\InureStoreBotStaff-main\src\index.js:80:9 {
  requestBody: { files: undefined, json: [ [Object] ] },
  rawError: {
    message: 'Invalid Form Body',
    code: 50035,
    errors: { application_id: [Object] }
  },
  code: 50035,
  status: 400,
  method: 'PUT',
  url: 'https://discord.com/api/v10/applications/undefined/commands'
}
