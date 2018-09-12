// Copyright (c) Microsoft Research 2016
// License: MIT. See LICENSE

import * as builder from 'botbuilder'

import {registerMiddleware} from './middleware'
import {registerLUISDialog} from './dialogs/luis'
import {registerTutorialDialogs} from './dialogs/tutorials'
import {registerFormulaHistoryDialogs} from './dialogs/formulaHistory'
import {registerFormulaDialog} from './dialogs/formula'
import {registerModelStorageDialogs} from './dialogs/modelStorage'
import {ModelStorage} from './ModelStorage'

/** 
 * Registers all dialogs and middlewares onto the given bot instance.
 * 
 * @param skipBMAAPI If true, then the BMA backend is not used to test formulas that the user sends. 
 */
export function setup (bot: builder.UniversalBot, modelStorage: ModelStorage, skipBMAAPI = false) {
    console.log("Setup initialise")
    registerMiddleware(bot)
    console.log("Middleware registered")
    registerLUISDialog(bot, modelStorage)
    console.log("LUIS registered")
    registerTutorialDialogs(bot)
    console.log("Tutorials registered")
    registerFormulaDialog(bot, modelStorage, skipBMAAPI)
    console.log("Formula dialogs registered")
    registerFormulaHistoryDialogs(bot)
    console.log("Formula history registered")
    registerModelStorageDialogs(bot, modelStorage)
    console.log("Storage registered")
}
