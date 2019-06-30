



import {combineReducers} from "redux"

import data from "./data"
//Reducer 是一个函数，
//它接受 Action 和当前 State 作为参数，返回一个新的 State
export const reducers = combineReducers({
    data:data
})