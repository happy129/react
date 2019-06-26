

import "./index.scss";
import  {Head} from "~/components/head"
import axios from "@/utils/axios"

import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { List } from "../../components/list";

export class Classify extends Component{

    state = {
        types:[],
        allMenu:[]
    }

    changeallMenu=()=>{
        this.state.allMenu.reverse();
        this.setState({
            allMenu:this.state.allMenu
        })
    }

    componentWillMount(){
        var that = this;
        axios.get("/react/getMenuTypes")
        .then(res=>{
            console.log(res);
            this.setState({
                types:res.data.result 
            })

            axios.get("/react/getMenuList")
            .then(res=>{
                that.setState({
                    allMenu:res.data.result 
                })
            })
        })

        
    }

    render(){
        const {types,allMenu} = this.state;
        let tabs = types.map((item)=>{
            item.title = item.text;
            return item;
        })
        return (
            <div>
                <Head title="分类" show={true}></Head>
                {
                    allMenu.length>0 && <Tabs style={{marginTop:'1rem'}}
                    tabs={tabs}
                    tabBarActiveTextColor="red"
                    tabBarUnderlineStyle={{borderColor:"red"}}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    {
                        tabs.map((item,i)=>{
                            return (
                                <List 
                                changeallMenu={this.changeallMenu}
                                key={i} 
                                type={item}
                                allMenu={allMenu}
                                menus={allMenu.filter((g)=>g.type.value==item.value)}
                                /> 
                            )
                        })
                    }
                </Tabs>
                }
            </div>
        )
    }
}