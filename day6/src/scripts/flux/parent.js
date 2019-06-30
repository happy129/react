


import {Child} from './child';
import {store} from './store';

export  class Parent extends Component{
    state = {
        items:store.getItems()
    }
    componentWillMount(){
        store.addListenerOnItems(()=>{
            this.setState({
                items:store.getItems()
            })
        })
    }

    render(){
        <div>
            <h2> parent--parent-父组件</h2>
            {
                this.state.items.map((item,i)=>{
                    return (
                        <h2 key={i}> {item } -- {i}</h2>
                    )
                })
            }
            <hr/>
            <Child/>
        </div>
    }
}