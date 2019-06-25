
//store就是存储数据的一个地方

import {createStore} from "redux";
import { reducers } from "./reducers";

const store =createStore(reducers);  //fn reducers
const state=store.getState();   //获取state

console.log(state);

export default store;

