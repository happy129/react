import { COUNTDESC, INCREMENT, DECREMENT, CHANGECITY, CHANGEMSG, CHANGEWORD } from "../actions";


const defaultState = {
    mv:[],
    types:[]
}

export default (state=defaultState,action)=>{
    switch(action.type){

        case "getMv":
        return {...state,mv:action.mv}
        break;

        case "getTypes":
        return {...state,types:action.types}
        break;

        default:
        return state;
        break;
    }
}