
import {Head} from "~/components/head";
import './index.scss';
import axios from "@/utils/axios"
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
export class MyFabu extends Component{


    constructor(props){
        super(props)
        this.state = {
            data:[],
        }
    }
      
      componentWillMount(){
        var UserName = sessionStorage.username;
        // 判断UserName为string类型  将其转换为JSON数据类型
        var result = JSON.parse(UserName);
        var username = result.name;
          axios.post('/react/getMyMenu',{
            username
          }).then(res=>{
              console.log(res);
              this.setState({
                data:res.data.result
            })
          })
      }


    render(){
        const {
            data ,
        } = this.state;

        if(data.length>=1){
            this.refs.context.style.display='none';
        }
        return(
            <div> 
                <Head title='我的菜谱' show={true}></Head>  
                
                <div id="box">
                    <div id='toast' ref='context'>
                        您还没有发布菜谱哦,请上传菜谱后再来浏览
                    </div>

                    {
                        this.state.data&&
                        this.state.data.map((items,i)=>{
                            return(
                                <WingBlank>
                                    <div id='myMenu' key={i}>
                                        <h2 id='title'>
                                            <p id='menuName'>菜谱名称:{items.menuName}</p>
                                        </h2>
                                        <h2 id='author'>
                                            <p id='username'>作者:{items.username}</p>
                                        </h2>
                                        
                                        <p id='foods'>食材:{items.foods}</p>
                                        <p id='describe'>描述:{items.describe}</p>
                                        <p id='time'>上传时间:{items.time}</p>
                                    </div>
                                    <WhiteSpace/>
                                </WingBlank>
                                
                            )
                        })

                    }

                </div>
            </div>
        )
    }
}