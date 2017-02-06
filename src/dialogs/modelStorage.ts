// Copyright (c) Microsoft Research 2016
// License: MIT. See LICENSE

import * as builder from 'botbuilder'
import * as _ from 'underscore'
import {v4 as uuid} from 'node-uuid'
import {ModelStorage} from '../ModelStorage'
import {getBMAModelUrl} from '../util'
import {downloadAttachments} from '../attachments'
import * as BMA from '../BMA'
import * as strings from './strings'

/**
 * Registers dialogs related to managing the user uploaded model.
 */
export function registerModelStorageDialogs (bot: builder.UniversalBot, modelStorage: ModelStorage) {
    /*
     * Sends a message with a BMA UI link which opens the uploaded model of the user.
     */
    bot.dialog('/requestUploadedModel', (session, args, next) => {
        let modelId = session.conversationData.bmaModelId
        if (!modelId) {
            session.send(strings.NO_MODEL_FOUND)
            next()
            return
        }
        let url = getBMAModelUrl(modelStorage.getUserModelUrl(modelId))
        session.send(strings.HERE_IS_YOUR_UPLOADED_MODEL(url))
        next()
    })

    /*
     * Removes the user uploaded model from all storage, that is, conversation storage and blob storage.
     */
    bot.dialog('/removeUploadedModel', (session, args, next) => {
        let id = session.conversationData.bmaModelId
        if (!id) {
            session.send(strings.NO_MODEL_FOUND)
            next()
            return
        }
        delete session.conversationData.bmaModelId
        delete session.conversationData.bmaModel
        modelStorage.removeUserModel(id)
        session.send(strings.MODEL_REMOVED)
        next()
    })
}

/**
 * Downloads an attachment (which is given by URL) which is assumed to be an uploaded BMA model file,
 * and store it (in conversation storage and blob storage).
 * 
 * Note that no validation is done except checking if the uploaded file is a valid JSON file.
 * If the user uploads a JSON file that is not a BMA model, then subsequent errors will occur elsewhere.
 * 
 * TODO do more error checking on uploaded file
 */
export function receiveModelAttachmentStep (bot: builder.UniversalBot, modelStorage: ModelStorage, session: builder.Session, results, next) {
    // check and store attachment
    let attachments = session.message.attachments
    if (attachments.length > 1) {
        session.send(strings.TOO_MANY_FILES)
        return
    }
    downloadAttachments(bot.connector('*'), session.message, (err, buffers) => {
        if (err) {
            session.send(strings.HTTP_ERROR(err))
            return
        }
        // TODO handle more than one attachment
        let buf = buffers[0].toString()
        let model: BMA.ModelFile
        try {
            model = JSON.parse(buf)
        } catch (e) {
            session.send(strings.INVALID_JSON(e))
            return
        }
        let modelId = session.conversationData.bmaModelId || uuid()
        modelStorage.storeUserModel(modelId, model).then(() => {
            session.conversationData.bmaModel = model
            session.conversationData.bmaModelId = modelId
            session.save()
            session.send(strings.MODEL_RECEIVED(model.Model.Name))
            next()
        }).catch(e => {
            session.send(strings.HTTP_ERROR(e))
            session.endDialog()
        })
    })
}
