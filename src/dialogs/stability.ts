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

export function registerStabilityDialog (bot: builder.UniversalBot, modelStorage: ModelStorage, skipBMAAPI: boolean) {
    bot.dialog('/stability', [
        //Add check for BMA API availability
        (session, args, next) => {
            session.send(strings.PROTOTYPE_WARNING)
            let text = args
            // check if JSON model has been uploaded already, otherwise prompt user
            if (!session.conversationData.bmaModel) {
                session.conversationData.lastMessageText = text
                session.save()
                builder.Prompts.attachment(session, strings.MODEL_SEND_PROMPT)
            } else {
                testStability(session, text, modelStorage)
                session.endDialog()
            }
        },
        (session, results, next) => receiveModelAttachmentStep(bot, modelStorage, session, results, next),
        (session, results, next) => {
            testStability(session, session.conversationData.lastMessageText, modelStorage)
            delete session.conversationData.lastMessageText
        }
    ])
}

function testStability (session: builder.Session, text: string, modelStorage: ModelStorage) {
    // fetch some session state
    let bmaModel: BMA.ModelFile = session.conversationData.bmaModel

    BMAApi.runStabilityAnalysis(bmaModel.Model).then(response => {
    //console.log('Stability response :' + JSON.stringify(response))
    //session.send('The model is :' + response.Status)
    if (response.Status == "Stabilizing") {
        session.send(strings.STABILITY_PROVED)
        session.endDialog()
    } else if (response.Status = "NotStabilizing") {
        session.send(strings.STABILITY_INCONCLUSIVE)
        //builder.Prompts.confirm(session, strings.STABILITY_INCONCLUSIVE)
        session.send(strings.PROTOTYPE_INCOMPLETE)
        session.endDialog()
    } else {
        session.send(strings.BAD_RESULT)
        session.endDialog()
    }

    })
    //session.send(strings.PROTOTYPE_INCOMPLETE)
}