

// Action 是一个对象。其中的type属性是必须的

export const COUNTDESC  = "COUNTDESC3112312321";

export const countDesc = {
    type:COUNTDESC
}

export const INCREMENT = "increment"

// action creator    num为参数
export const increment = (num)=>{
    return {
        type:INCREMENT,
        num
    }
}
export const DECREMENT = "DECREMENT"
export function decrement(num){
    return {
        type:DECREMENT,
        num
    }
}
export const CHANGECITY = "changecity";

export const changeCity = city=> (
    {
        type:CHANGECITY,
        city
    }
)
export const CHANGEMSG = "CHANGEMSG"
export const changeMsgBy= msg=> (
    {
        type:CHANGEMSG,
        msg
    }
)

export const CHANGEWORD = "CHANGEWORD"
export  function changeWord(word){
    return {
        type:CHANGEWORD,
        word
    }
}

import axios from "@/utils/axios";

export const changeWordByWare =  ()=>{
    // a发出的是成功的action
    return axios.get("/react/index")
    .then(res=>{
        return {
            type:"changeWordByWare",
            word:res.data.msg
        }
    })
}

export const getMv = ()=> (
    axios.get("/vue/movie").then(res=>(
        {
            type:"getMv",
            mv:res.data.result
        }
    ))
)

export const getTypes =({url,params,cb})=> (
    axios.get(url,{params}).then(res=>{
        cb(res);
        return {
            type:"getTypes",
            types:res.data.result
        }
    })
)

// async await 

