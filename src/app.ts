// Copyright (c) Microsoft Research 2016
// License: MIT. See LICENSE

/*
 * The main entry point of the application.
 * Note that in unit tests a custom entry point is used.
 */

import * as builder from 'botbuilder'
import * as express from 'express'
import * as cors from 'cors'
import * as config from 'config'
import { BlobModelStorage } from './ModelStorage'
import { setup as setupBot } from './bot'
import * as azure from 'botbuilder-azure'

let port = config.get('PORT')
console.log('starting server on port:', port)

let server = express()
server.listen(port)

// in development, static files are served directly via express (instead of IIS)
if (config.get('SERVE_STATIC_VIA_EXPRESS') === '1') {
    // enable CORS so that the BMA tool can open our tutorial model URLs
    server.use(cors())
    console.log('serving static files via express')
    server.use('/static', express.static('public'))
}

function storage() {
    if (config.get('AZURE_COSMOSDB_URL') == null) {
        console.log('Conversations stored in memory')
        return new builder.MemoryBotStorage()
    } else {
        console.log('Conversations stored in cosmos db')
        var documentDbOptions = {
            host: config.get<string>('AZURE_COSMOSDB_URL'), 
            masterKey: config.get<string>('AZURE_COSMOSDB_KEY'), 
            database: 'botdocs',   
            collection: 'botdata'
        };
        var docDbClient = new azure.DocumentDbClient(documentDbOptions);
        var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);
        return cosmosStorage
    }
} 

let bot: builder.UniversalBot
if (config.get('USE_CONSOLE') === '1') {
    // Create console bot
    var store = storage();    
    let connector = new builder.ConsoleConnector().listen()
    bot = new builder.UniversalBot(connector,{storage:store});
} else {
    var store = storage();
    // Create server bot
    let connector = new builder.ChatConnector({
        appId: config.get<string>('APP_ID'),
        appPassword: config.get<string>('APP_PASSWORD')
    })
    bot = new builder.UniversalBot(connector,{storage:store});
    server.post('/api/messages', connector.listen())
}

bot.set("persistConversationData", "true") // this is false by default but we need to access data between unrelated dialogs
let modelStorage = new BlobModelStorage()

setupBot(bot, modelStorage)
