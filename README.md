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
            color: 16766720,
            description: '**Cantidad:** 100 Robux\n' +
              '**Método:** gamepass\n' +
              '\n' +
              '🇦🇷 Argentina: 1280.00 ARS\n' +
              '🇺🇸 Estados Unidos: 0.83 USD\n' +
              '🇲🇽 México: 15.50 MXN\n' +
              '🇨🇴 Colombia: 3500.00 COP\n'
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
  url: 'https://discord.com/api/v10/interactions/1439310438662668480/aW50ZXJhY3Rpb246MTQzOTMxMDQzODY2MjY2ODQ4MDp3cUx6aFNHc3lhV0xGSXpjNkZ1aWVQMGprOE00c2ViV3VySHVsUWNrZ1VTaGJETFV5dTY3U09GYndZaVNmbWl2S0RXVlZXQTBLcWd1anhRY2g1b2VMMDRDd0ZFUEdUVEpLeFh4V2lReHlwa0NmNG9oZEx4S0MwaU5NZEFpN2dOZw/callback?with_response=false'
}

Node.js v24.11.1
