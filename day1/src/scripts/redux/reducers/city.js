import { COUNTDESC, INCREMENT, DECREMENT, CHANGECITY, CHANGEMSG, CHANGEWORD } from "../actions";


export default (state=['美丽武汉'],action)=>{
    switch(action.type){

        case CHANGECITY:
        return [action.city];
        break;

        default:
        return state;
        break;
    }
}