



// 每个Action都是一个对象，包含一个actionType属性（说明动作的类型）和一些其他属性（用来传递数据）。

import AppDispatch from "./dispatcher";  
// AppDispatch 发送 action dispatch

export const addNewItem = (text)=>{
    console.log("actions 002 " + text);
    AppDispatch.dispatch({
        actionType:"ADDNEWITEM",
        text
    })
}


export const descNewItem = ()=>{
    AppDispatch.dispatch({
        actionType:"DESCNEWITEM",
        
    })
}