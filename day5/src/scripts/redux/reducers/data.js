
const defaultState = {
    comments:[],
    upcomments:[],
    getMenuOne:null,
    getComment:[],
    myMenu:[],
}
//整个应用的初始状态，可以作为 State 的默认值
export default (state=defaultState,action)=>{
   // Reducer 是一个函数，它接受 Action 和当前 State 作为参数，
   //返回一个新的 State。
    //console.log(action);

    switch(action.type){
        case "updateComment":
        return {...state,upcomments:action.upcomments } 
        break;

        case "getMyComment":
        return {...state,comments:action.comments } 
        break;

        case "getMenuOne":
        return {...state,getMenuOne:action.getMenuOne } 
        break;

       case "getComment":
        return {...state,getComment:action.getComment } 
        break;

        case "uploadMenu":
        return {...state,uploadMenu:action.uploadMenu } 
        break;

        case "delComment":
        return {...state,delComment:action.delComment } 
        break;
        
        case "getReverseGood":
        return {...state,goods:state.goods.reverse() } 
        break;

        case "changeSelectTabs":
        return {...state,selectedTab:action.tab } 
        break;

        

        
        default:
        return state;
        break;
    }
}