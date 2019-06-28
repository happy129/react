

// Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store

import {createStore,applyMiddleware} from "redux";
import { reducers } from "./reducers";

// 中间件的用法 
import thunk from "redux-thunk";
import promise from "redux-promise"

const store = createStore(reducers,applyMiddleware(thunk,promise));     // fn reducers 

// const state = store.getState();  // 获取 state 
// console.log(state);  

export default store;