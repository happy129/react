

import ReactDOM, {render} from 'react-dom';    //ReactDOM.render
import {IndexView} from './views';
import {ReduxDemo} from './redux';
import store from './redux/store';

const rootEle = document.getElementById('app');

{/*const hotRouter=(CPT)=>{
    render(
        <CPT />,
        
        rootEle    
    )
}

hotRouter(ReduxDemo);*/}


{/* 删除上面的内容 将下面的内容取消 注释即可恢复原来的内容 */}

const hotRouter=()=>{
    render(
        <IndexView />,
        rootEle    
    )
}

hotRouter();
import  "./redux";



