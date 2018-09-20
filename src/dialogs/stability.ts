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
    bot.dialog('/furtherTesting', [
        (session, args, next) => builder.Prompts.confirm(session, strings.STABILITY_INCONCLUSIVE),
        (session, results: builder.IPromptChoiceResult, next) => {
            if (results.response) {
                furtherTesting(session)
                session.send(strings.PROTOTYPE_INCOMPLETE)
                session.endDialog()
            } else {
                session.send(strings.OK)
                session.endDialog()
            }
        }
    ])
    bot.dialog('/stability', [
        //Add check for BMA API availability
        (session, args, next) => {
            session.send(strings.PROTOTYPE_WARNING)
            // check if JSON model has been uploaded already, otherwise prompt user
            if (!session.conversationData.bmaModel) {
                session.beginDialog('/checkModel')
                next()
            } else {
                next()
            }
        },
        (session, results, next) => {
            testStability(session)
            session.endDialog()
        }
    ])
}

function testStability (session: builder.Session) {
    // fetch some session state
    let bmaModel: BMA.ModelFile = session.conversationData.bmaModel

    BMAApi.runStabilityAnalysis(bmaModel.Model).then(response => {
    //console.log('Stability response :' + JSON.stringify(response))
    //session.send('The model is :' + response.Status)
    if (response.Status == "Stabilizing") {
        session.send(strings.STABILITY_PROVED)
    } else if (response.Status = "NotStabilizing") {
        session.beginDialog('/furtherTesting')
    } else {
        session.send(strings.BAD_RESULT)
    }

    })
    //session.send(strings.PROTOTYPE_INCOMPLETE)
}

function furtherTesting (session: builder.Session) {
    let bmaModel: BMA.ModelFile = session.conversationData.bmaModel

}