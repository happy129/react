

import "./index.scss"
import { Item } from "../item";
import {PullToRefresh} from "antd-mobile";
import axios from  "@/utils/axios"
export class List extends Component{

    state = {
        refreshing:false,
        down:true,  // 下拉 
        data:[],
        count:1901
    }

    

    componentDidMount(){
        const {type,allMenu} =this.props;
        if(allMenu){
            var data =  allMenu.filter(g=>g.type.value==type.value);
            this.setState({
                data
            })
        }
        
    }

    render(){
        const {
            menus,
            changeallMenu,
            type
        } = this.props;
        const {
            data 
        } = this.state;
        return (
            <div>
                <ul>
                    <PullToRefresh
                        damping={50}
                        ref={() =>"loadmore"}
                        indicator={  { deactivate: '下拉刷新' }}
                        direction={  'down' }
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }); // 正在刷新
                            setTimeout(() => {
                              changeallMenu()
                            //   axios.get("/vue/getmenuByType",{
                            //       params:{
                            //           type:type.value
                            //       }
                            //   }).then(res=>{
                            //       console.log(res);
                            //       var data =  res.data.result;
                            //       data.reverse();
                            //       this.setState({
                            //           data:data,
                            //           count:++this.state.count
                            //       })
                            //       console.log(this.state.data);
                            //       this.setState({ refreshing: false });  // 刷新结束 
                            //   })

                            this.setState({ refreshing: false });  // 刷新结束 
                            }, 1000);
                          }}
                    >
                        {
                            menus.map((menu,i)=>{
                                return (
                                    <li key={i}>
                                        <Item menu={menu}/>
                                    </li>
                                )
                            })
                        }
                    </PullToRefresh>
                </ul>
            </div>
        )
    }
}