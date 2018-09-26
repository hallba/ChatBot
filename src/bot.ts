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
import {registerStabilityDialog} from './dialogs/stability'
import {registerUtilityDialogs} from './dialogs/utility'

/** 
 * Registers all dialogs and middlewares onto the given bot instance.
 * 
 * @param skipBMAAPI If true, then the BMA backend is not used to test formulas that the user sends. 
 */
export function setup (bot: builder.UniversalBot, modelStorage: ModelStorage, skipBMAAPI = false) {
    registerMiddleware(bot)
    registerLUISDialog(bot, modelStorage)
    registerTutorialDialogs(bot)
    registerFormulaDialog(bot, modelStorage, skipBMAAPI)
    registerFormulaHistoryDialogs(bot)
    registerModelStorageDialogs(bot, modelStorage)
    registerUtilityDialogs(bot, modelStorage)
    registerStabilityDialog(bot, modelStorage, skipBMAAPI)
}
