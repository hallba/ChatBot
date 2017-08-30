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

let bot: builder.UniversalBot
if (config.get('USE_CONSOLE') === '1') {
    // Create console bot
    let connector = new builder.ConsoleConnector().listen()
    bot = new builder.UniversalBot(connector)
} else {
    // Create server bot
    let connector = new builder.ChatConnector({
        appId: config.get<string>('APP_ID'),
        appPassword: config.get<string>('APP_PASSWORD')
    })
    bot = new builder.UniversalBot(connector)
    server.post('/api/messages', connector.listen())
}

bot.set("persistConversationData", "true") // this is false by default but we need to access data between unrelated dialogs
let modelStorage = new BlobModelStorage()
setupBot(bot, modelStorage)
