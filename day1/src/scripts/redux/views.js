

import store from "./store";
import {Button} from "antd-mobile";
import {countDesc,increment} from './actions'

export class ViewDemo extends Component{
    render(){
        console.log(this.props);
        const {
            state,
            city,
            msg
        }=this.props;

        const {
            count
        }=store.getState();

        return (
            <div>
                <h2>view count Add 组件</h2>
                <h2>state / count =={state.count}</h2>
                <h2>store / count =={count}</h2>
                <h2>store / city =={city}</h2>
                <h2>store / msg =={msg}</h2>
                <hr/>
                <Button type="primary" inline onClick={()=>store.dispatch({type:"COUNTADD"})}>count add</Button>
                <Button type="warning" inline onClick={()=>store.dispatch({type:"countDesc"})}>count desc</Button>
                <Button type="warning" inline onClick={()=>store.dispatch({type:"increment"})}>add10</Button>
            </div>
        )
    }
}