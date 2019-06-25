
import { COUNTDESC,INCREMENT } from '../actions';

//reducer是一个函数
//定义默认组件状态 初始化的state
const defaultState={
    count:6666,
    city:"南京",
    msg:"菩提本无树,明镜亦非台."
}

//use by createStore
export const reducers =(state=defaultState,action)=>{
    console.log(action);

    switch(action.type){

        case "COUNTADD":
            state.count=state.count+1;
            console.log(state);
            return state;
            break;

        case 'countDesc':
            state.count--;
            return state;
            break;

        case 'increment':
        return {...state,...{count:state.count+10} };
        break;


        //初始化时会进入一下代码 
        default:
            return state;
            break;
    }
}