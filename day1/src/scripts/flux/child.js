
import {Button} from 'antd-mobile'

// import {addNewItem,descNewItem} from './actions' 

export class Child extends Component{
    change(){

    }
    render(){
        return(
            <div>
                <h2>child--child--子组件</h2>
                <Button type="warning" inline onClick={this.change}> New Item </Button>
                <Button type="primary" inline onClick={()=>descNewItem()}> New Item desc</Button>
            </div>
        )
    }
}