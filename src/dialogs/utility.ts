// Copyright (c) Ben Hall 2018
// License: MIT. See LICENSE

import * as builder from 'botbuilder'
import * as _ from 'underscore'
import * as BMA from '../BMA'
import * as BMAApi from '../BMAApi'
import {ModelStorage} from '../ModelStorage'
import {getBMAModelUrl, LETTERS_F} from '../util'
import {receiveModelAttachmentStep} from './modelStorage'
import * as strings from './strings'

/* Utility dialogs
* Reusable dialogues that are common to multiple waterfalls
*
*/
export function registerUtilityDialogs (bot: builder.UniversalBot, modelStorage: ModelStorage) {
    bot.dialog('/checkModel', [
        (session, args, next) => {
            if (!session.conversationData.bmaModel) {
                builder.Prompts.attachment(session, strings.MODEL_SEND_PROMPT)
            } else {
                session.endDialog()
            }
        },
        (session, results, next) => receiveModelAttachmentStep(bot, modelStorage, session, results, next),
        (session, results, next) => session.endDialog()
    ])
}