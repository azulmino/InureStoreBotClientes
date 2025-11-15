node:events:486
      throw er; // Unhandled 'error' event
      ^

DiscordAPIError[10062]: Unknown interaction
    at handleErrors (C:\Users\Administrator\Desktop\InureStoreBotClientes-main\InureStoreBotClientes-main\node_modules\@discordjs\rest\dist\index.js:748:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async BurstHandler.runRequest (C:\Users\Administrator\Desktop\InureStoreBotClientes-main\InureStoreBotClientes-main\node_modules\@discordjs\rest\dist\index.js:852:23)
    at async _REST.request (C:\Users\Administrator\Desktop\InureStoreBotClientes-main\InureStoreBotClientes-main\node_modules\@discordjs\rest\dist\index.js:1293:22)
    at async ChatInputCommandInteraction.reply (C:\Users\Administrator\Desktop\InureStoreBotClientes-main\InureStoreBotClientes-main\node_modules\discord.js\src\structures\interfaces\InteractionResponses.js:200:22)
Emitted 'error' event on Client instance at:
    at emitUnhandledRejectionOrErr (node:events:391:10)
    at process.processTicksAndRejections (node:internal/process/task_queues:91:21) {
  requestBody: {
    files: [],
    json: {
      type: 4,
      data: {
        content: undefined,
        tts: false,
        nonce: undefined,
        enforce_nonce: false,
        embeds: [
          {
            title: '💰 Precio de Robux',
            description: '**Cantidad:** 1000 Robux\n' +
              '**Método:** Gamepass\n' +
              '\n' +
              '🇦🇷 Argentina 12800.00 ARS\n' +
              '🇺🇸 Estados Unidos 8.30 USD\n' +
              '🇲🇽 México 155.00 MXN\n' +
              '🇨🇴 Colombia 35000.00 COP\n',
            color: 16766720
          }
        ],
        components: undefined,
        username: undefined,
        avatar_url: undefined,
        allowed_mentions: undefined,
        flags: undefined,
        message_reference: undefined,
        attachments: undefined,
        sticker_ids: undefined,
        thread_name: undefined,
        applied_tags: undefined,
        poll: undefined
      }
    }
  },
  rawError: { message: 'Unknown interaction', code: 10062 },
  code: 10062,
  status: 404,
  method: 'POST',
  url: 'https://discord.com/api/v10/interactions/1439248388645195777/aW50ZXJhY3Rpb246MTQzOTI0ODM4ODY0NTE5NTc3Nzo5T3dkN0RmTmV1NEJXd1hGZDFxbVVNRWhVTVRNUlpnemRWWTRuYWlpZWxwVzEzSHZxaXN4ckRIMDdCNFdsQmdwVGh1SGVUb3E2a01EZENYN000QUNMZUpieG12eTNaRFh1WFRwdjNERTdQZHg4N1NnZ0FXczhiaUo0T093YXZ2cA/callback?with_response=false'
}

Node.js v24.11.1

