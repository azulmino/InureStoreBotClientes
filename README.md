node:events:486
      throw er; // Unhandled 'error' event
      ^

Error [InteractionAlreadyReplied]: The reply to this interaction has already been sent or deferred.
    at ChatInputCommandInteraction.reply (C:\Users\Administrator\Desktop\InureStoreBotClientes-main\InureStoreBotClientes-main\node_modules\discord.js\src\structures\interfaces\InteractionResponses.js:169:46)
    at Client.<anonymous> (C:\Users\Administrator\Desktop\InureStoreBotClientes-main\InureStoreBotClientes-main\src\index.js:172:26)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
Emitted 'error' event on Client instance at:
    at emitUnhandledRejectionOrErr (node:events:391:10)
    at process.processTicksAndRejections (node:internal/process/task_queues:91:21) {
  code: 'InteractionAlreadyReplied'
}

Node.js v24.11.1
