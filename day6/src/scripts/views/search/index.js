

import "./index.scss"

import  {Head} from "~/components/head"
import {WingBlank,WhiteSpace,SearchBar} from  "antd-mobile";
import axios from "@/utils/axios"
import {List} from "~/components/list"
export class Search extends Component{

    state = {
        menus:[]
    }
    getSearch=(val)=>{
        console.log(this.refs.one.state.value);
        axios.get("/react/getMenuList",{
            params:{
                keyword:this.refs.one.state.value
            }
        }).then(res=>{
            this.setState({
                menus:res.data.result
            })
        })
    }

    changemenus=()=>{
        this.state.menus.reverse();
        this.setState({
            menus:this.state.menus
        })
    }

    render(){
        const {menus} = this.state;
        return (
            <div>
                <Head title="搜索" show={true} ></Head>
                <WingBlank>
                    <WhiteSpace />
                    <SearchBar ref="one" placeholder="Search" maxLength={8} onBlur={this.getSearch} />
                    <List 
                    menus={menus}  
                    changeAllmenus={this.changemenus}
                    >

                    </List>
                </WingBlank>
                
            </div>
        )
    }
}