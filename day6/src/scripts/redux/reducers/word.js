import { COUNTDESC, INCREMENT, DECREMENT, CHANGECITY, CHANGEMSG, CHANGEWORD } from "../actions";


export default (state="1901 daydayup  ",action)=>{
    switch(action.type){

        case CHANGEWORD:
        return action.word ;
        break;
        
        case "changeWordByWare":
        return action.word;
        break;

        default:
        return state;
        break;
    }
}