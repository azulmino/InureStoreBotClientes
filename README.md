node:events:486
      throw er; // Unhandled 'error' event
      ^

DiscordAPIError[10008]: Unknown Message
    at handleErrors (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:762:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async SequentialHandler.runRequest (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1163:23)
    at async SequentialHandler.queueRequest (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:994:14)
    at async _REST.request (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1307:22)
    at async GuildMessageManager.delete (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\discord.js\src\managers\MessageManager.js:334:5)
    at async Message.delete (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\discord.js\src\structures\Message.js:936:5)
    at async Client.<anonymous> (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\src\index.js:429:9)
Emitted 'error' event on Client instance at:
    at emitUnhandledRejectionOrErr (node:events:391:10)
    at process.processTicksAndRejections (node:internal/process/task_queues:91:21) {
  requestBody: { files: undefined, json: undefined },
  rawError: { message: 'Unknown Message', code: 10008 },
  code: 10008,
  status: 404,
  method: 'DELETE',
  url: 'https://discord.com/api/v10/channels/1439248135980454152/messages/1439249521782554745'
}
