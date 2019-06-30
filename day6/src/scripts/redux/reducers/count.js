import { COUNTDESC, INCREMENT, DECREMENT, CHANGECITY, CHANGEMSG, CHANGEWORD } from "../actions";

const defaultState = 2019;
export default (state=defaultState,action)=>{
    switch(action.type){

        case "COUNTADD":
        state++;
        console.log(state);
        return state;
        break;

        case COUNTDESC:
        state--
        return state;
        break;

        case INCREMENT:
        return state+=action.num;
        break;

        case DECREMENT:
        return state-=action.num;
        break;


        default:
        return state;
        break;
    }
}