// Copyright (c) Microsoft Research 2016
// License: MIT. See LICENSE

// General
export let OK = 'OK.'
export let LTL_DESCRIPTION = 'Linear Temporal Logic (LTL) is a modal temporal logic, and it helps us define an infinite sequence of states. It is useful within the BMA as it allows us to query paths, and how current paths may change or be affected in the future.'
export let UNKNOWN_INTENT = 'I did not understand you.'
export let UNKNOWN_LTL_QUERY = 'I did not understand your query.'
export let VARIABLES_CLAMPED = (text: string) => `Some of your variables were out of range, so I adjusted them. ${text}.` 
export let TRY_THIS_FORMULA = (formula: string) => `Try this: ${formula}`
export let OPEN_BMA_MODEL_LINK = (url: string) => `Open directly: ${url}`
export let MODEL_SEND_PROMPT = 'Please send me your model as a JSON file.'
export let INVALID_JSON = (msg: string) => `Your uploaded file is not valid JSON (Error: ${msg}).`
export let HTTP_ERROR = (msg: string) => `HTTP Error: ${msg}.`
export let TOO_MANY_FILES = 'Please upload exactly one JSON file.'
export let MODEL_RECEIVED = (name: string) => `I received your model titled ${name} and will use it from now on.`
export let TUTORIAL_INTRO = (title: string) => `Tutorial: ${title}`
export let TUTORIAL_SELECT_PROMPT = 'Which tutorial would you like to do?'
export let TUTORIAL_START_PROMPT = 'Would you like to start the tutorial?'
export let TUTORIAL_SELECT_CANCELLED = 'Tutorial selection cancelled.'
export let TUTORIAL_UNKNOWN_SELECT = 'Please input a tutorial number, or anything else to cancel.'
export let ABOUT_BOT = 'Hello, I am the BMA Bot and I will assist you in creating LTL formulas to query your model. To help you along the way, I will provide you with tutorials and examples. Ask me any questions you have about using LTL within the BMA and I will try to help you. Here are some example queries to get you started: ‘Show me the tutorials’, ‘Explain the implies operator’, ‘Show me an example for the until operator’, ‘Give me a simulation where x = 1 and y = 1’'
export let ABOUT_SIMULATIONS = 'LTL queries are used to find simulations of a given length that end in a loop (a fix point or cycle).'
export let SPELLCHECK_ASSUMPTION = (corrected: string) => `I assume you meant: "${corrected}".`
export let OPEN_BMA_URL = (url: string) => `Open in browser: ${url}`
export let HERE_IS_YOUR_UPLOADED_MODEL = (url: string) => `Here is the model you sent me: ${url}`
export let NO_MODEL_FOUND = 'I do not have a model from you.'
export let MODEL_REMOVED = 'I removed your model.'
export let FORMULA_SHORTCUT = (variableName: string) => `PRO TIP: You can also use the !formula shortcut to test a formula: "!formula ${variableName} is 1"`
export let FORMULA_COUNT_100 = 'Congratulations! This is your 100th formula! Keep going.'
export let PROTOTYPE_WARNING = 'Warning: this is a prototype feature and may be incomplete.'
export let PROTOTYPE_INCOMPLETE = 'This prototype feature is incomplete'
export let API_UNAVAILABLE = 'This analysis will not be run as the BMA API is disabled.'
export let BAD_RESULT = 'This analysis returned an unexpected response. Please retest in the BMA website and/or contact the developers.'

// Formula history
export let FORMULA_HISTORY = (formulas: string) => `I have the following formulas on record: \n\n ${formulas}`
export let FORMULA_HISTORY_EMPTY = 'I do not have any formulas on record.'
export let FORMULA_HISTORY_CLEARED = 'I forgot all formulas.'
export let FORMULA_REMOVED_FROM_HISTORY = (formula: string) => `I removed the following formula from my history: ${formula}`
export let FORMULA_RENAMED = (from: string, to: string) => `I renamed the "${from}" formula to "${to}".`
export let FORMULA_RENAME_TO_PROMPT = (from: string) => `I did not get the name you want to rename "${from}" to. Which one is it?`
export let FORMULA_RENAME_TO_EXISTS = (to: string) => `The formula name "${to}" exists already, please pick a different one.`
export let FORMULA_RENAME_NAME_EMPTY = 'Formulas can only be renamed to non-empty names.'
export let FORMULA_REFERENCE_INVALID = (formulas: string) => `I could not find the formula you referenced. Here is a list of all formulas I know: \n\n ${formulas}`
export let FORMULA_HISTORY_FIRST_NOTICE = 'I just remembered your first formula! You can recall and combine previous formulas. Try to ask me for all the formulas I remember.'
export let FORMULA_HISTORY_FULL = 'I already remembered too many formulas. Let me forget old ones if you want me to keep remembering new formulas.'
export let FORMULA_REMOVAL_WARNING = 'You are about to delete formula(s) from conversation memory. Confirm to proceed.'
export let FORMULA_MISSING = "I was expecting input to create a formula, but I cannot find any text. Please try again or contact the maintainers."

// Simulation outcomes
export let SIMULATION_DUALITY = (steps: number) => `I tested the formula with ${steps} steps. The formula is sometimes true and sometimes false.`
export let SIMULATION_ALWAYS_TRUE = (steps: number) => `I tested the formula with ${steps} steps. The formula is always true.`
export let SIMULATION_ALWAYS_FALSE = (steps: number) => `I tested the formula with ${steps} steps. The formula is always false.`
export let SIMULATION_PARTIAL_TRUE = (steps: number) => `I partially tested the formula with ${steps} steps. The formula is either always or just sometimes true. Please check the full results yourself using the link above.`
export let SIMULATION_PARTIAL_FALSE = (steps: number) => `I partially tested the formula with ${steps} steps. The formula is either always or just sometimes false. Please check the full results yourself using the link above.`
export let SIMULATION_CANCELLED = 'I tried to test the formula but it took too long so I cancelled it. Please check the results yourself using the link above.'

// Explanation for each operator 
export let EXPLAIN_AND = 'The AND operator returns a true value if both the expressions are true, and returns false otherwise.'
export let EXPLAIN_OR = 'The OR operator returns a true value if either one of the expressions are true, otherwise false is returned.'
export let EXPLAIN_IMPLIES = 'When two expressions are used with the IMPLIES operator, e.g. A IMPLIES B, it means that if A is true B must also be true. The IMPLIES operator returns a true value in this scenario.'
export let EXPLAIN_NOT = 'The NOT operator returns a true value if the expression is false, and returns false if it equals to true.'
export let EXPLAIN_NEXT = 'Within a state model, The NEXT operator returns true if the immediate state after holds a true value.'
export let EXPLAIN_ALWAYS = 'Within a state model, the ALWAYS operator returns true if all the states hold a true value.'
export let EXPLAIN_EVENTUALLY = 'Within a state model, the EVENTUALLY operator returns true if some state in the future holds a true value.'
export let EXPLAIN_UNTIL = 'Similar to the AND operator, the UNTIL operator requires two operands. For UNTIL, A until B, implies that A remains true until B becomes true.'
export let EXPLAIN_RELEASE = 'This operator requires two operands. In the scenario, A RELEASE B: B holds a true value until and including the point when A first becomes true. If A is never true, B will remain true.'
export let EXPLAIN_UPTO = 'This operator takes two operands. It is similar to UNTIL, except that A must hold in the simulation. It is equivalent to A AND NEXT A UNTIL B.'
export let EXPLAIN_WEAKUNTIL = 'Similar to the UNTIL operator, in the example A WEAKUNTIL B, A remains true until B holds a true value, however it does not require B to ever hold a true value, and therefore A always remains true.' 

// Operator examples
export let EXAMPLE_AND = 'In the example where A and B are equal to a value of 1, A AND B returns true for all traces where both states are 1.'
export let EXAMPLE_OR = 'In the example where A and B are equal to a value of 2, A OR B returns true for all traces where either one of the states is equal to 2.'
export let EXAMPLE_IMPLIES = 'In the example where A is equal to 1 and state B is equal to 2, A IMPLIES B returns true for traces where A is 1, and subsequently B is 2.'
export let EXAMPLE_NOT = 'In the example where A is equal to 5, NOT A would return true for all traces that return a value other than 5.'
export let EXAMPLE_NEXT = 'In the example where A is equal to 4, NEXT A returns true for the immediate state before a state where A is 4.'
export let EXAMPLE_ALWAYS = 'In the example where A is equal to 7, ALWAYS A would return true if all the tested traces have a value of 7 for A.'
export let EXAMPLE_EVENTUALLY = 'This works similar to the NEXT operator. For example if we have state A equal to 3, EVENTUALLY A would return true if future states hold a value of 3 for A.'
export let EXAMPLE_UNTIL = 'We have two states; A = 1 and B = 2. A UNTIL B returns true for traces where A holds the value of 1 up until B becomes 2. A need not occur.'
export let EXAMPLE_RELEASE = 'In the example A RELEASE B, where A is 1 and B is 2, B will stay true with a value 2 up until the trace where A is 1. So essentially, at one point both A and B are true, and if A is never 1, then B will hold the value of 2.'
export let EXAMPLE_UPTO = 'We have two states; A = 1 and B = 2. A UPTO B returns true for traces where A holds the value of 1 up until B becomes 2. A occurs at least once before B.'
export let EXAMPLE_WEAKUNTIL = 'With states; A = 1 and B = 3, A WEAKUNTIL B implies that A holds a value of 1 up until B is equal to 3, but if B is never 3 then A will remain as 1.'

// Operator interactions
export let ALWAYS_EVENTUALLY = 'ALWAYS EVENTUALLY implies that a state in the future will always remain true, essentially is returns the same output as the ALWAYS operator would.'
export let ALWAYS_NOT = 'ALWAYS NOT implies that it is always the case that the states value within the future will not be true, an example can be seen in the Ecoli tutorial.'
export let ALWAYS_NEXT = 'ALWAYS NEXT implies that the immediate state after is always true, essentially it returns a similar output to ALWAYS.'
export let EVENTUALLY_ALWAYS = 'EVENTUALLY ALWAYS implies that in some future states, the state value will remain constant.'
export let EVENTUALLY_NOT = 'EVENTUALLY NOT implies that in some future states, the defined state value will not be true.'
export let EVENTUALLY_NEXT = 'EVENTUALLY NEXT implies that in some future state, the following state will hold a true value. Essentially this returns a similar output to EVENTUALLY.'
export let NEXT_ALWAYS = 'NEXT ALWAYS implies after the succeeding state, the value will always remain true.'
export let NEXT_EVENTUALLY = 'NEXT EVENTUALLY implies that after the succeeding state, the state will eventually hold a true value in some future states.'
export let NEXT_NOT = 'NEXT NOT implies that after the succeeding state, the state values do not return a true value.'
export let NOT_EVENTUALLY = 'NOT EVENTUALLY implies that states in the future do not hold a true value.'
export let NOT_NEXT = 'NOT NEXT returns all cases that do not satisfy the results of the NEXT operator(immediate state after holding a true value).'
export let NOT_ALWAYS = 'NOT ALWAYS returns all cases that do not satisfy the results of the ALWAYS operator(all states holding a true value).'

// LTL Semantics 
export let OSCILLATIONS = 'An oscillation refers to a fluctuation between two things, this can occur between two states or values of a state. See an example in the ecoli tutorial.'
export let TRUE_STATE = 'This refers to a state where a true value holds.'
export let SELF_LOOP = 'A self loop refers to a fixed point in the network. A nice example can be seen in the ecoli tutorial.'
export let STEPS = 'The number of steps determines how long your query runs for, and a state value is given for each step with a simulation graph.'
export let DECREASE_STEPS = 'Decreasing the number of steps a query runs for can limit your results, as you only see a subsection of results which may or may not satisfy your query. The default of 10 steps is recommended.'
export let INCREASE_STEPS = 'Increasing the number of steps will give you a broader view of how the state values fluctuate over time, and may reveal several traces of your query being true.'

//Stability proof
export let STABILITY_PROVED = 'The model was proved to be stable.'
export let STABILITY_INCONCLUSIVE = 'The fast stability check was inconclusive. Would you like to perform further testing (slower)?'
export let FOUND_CYCLE = (steps:number) => `There is a cycle of length ${steps}.`
export let FOUND_BIFURCATION = 'There is a bifurcation.'
export let FURTHER_TESTING_TIMEOUT = "Further testing could not be completed before timeout occured."
