MTQzODczOTEwNjY5N                 DY5NzE2Mg.GV89bb.cSrNl_F1        0e33wCKIR41oFyIctp                ffN7NiPkzA7Q

143 87391 06694 69 7 162

[dotenv@17.2.1] injecting env (0) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
Registrando comandos...
Error: Expected token to be set for this request, but none was present
    at _REST.resolveRequest (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1381:15)
    at _REST.queueRequest (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1341:46)
    at _REST.request (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1307:33)
    at _REST.put (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\@discordjs\rest\dist\index.js:1290:17)
    at C:\Users\Administrator\Desktop\InureStoreBotStaff-main\src\index.js:94:20
    at Object.<anonymous> (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\src\index.js:99:3)
    at Module._compile (node:internal/modules/cjs/loader:1761:14)
    at Object..js (node:internal/modules/cjs/loader:1893:10)
    at Module.load (node:internal/modules/cjs/loader:1481:32)
    at Module._load (node:internal/modules/cjs/loader:1300:12)
C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\discord.js\src\client\Client.js:217
    if (!token || typeof token !== 'string') throw new DiscordjsError(ErrorCodes.TokenInvalid);
                                                   ^

Error [TokenInvalid]: An invalid token was provided.
    at Client.login (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\node_modules\discord.js\src\client\Client.js:217:52)
    at Object.<anonymous> (C:\Users\Administrator\Desktop\InureStoreBotStaff-main\src\index.js:514:8)
    at Module._compile (node:internal/modules/cjs/loader:1761:14)
    at Object..js (node:internal/modules/cjs/loader:1893:10)
    at Module.load (node:internal/modules/cjs/loader:1481:32)
    at Module._load (node:internal/modules/cjs/loader:1300:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'TokenInvalid'
}

Node.js v24.11.1
