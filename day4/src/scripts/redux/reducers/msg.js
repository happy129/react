import { COUNTDESC, INCREMENT, DECREMENT, CHANGECITY, CHANGEMSG, CHANGEWORD } from "../actions";

export default (state="1901 努力为更好的 offer  ",action)=>{
    switch(action.type){

        case CHANGEMSG:
        return action.msg ;
        break;

        default:
        return state;
        break;
    }
}