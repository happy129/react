

import './index.scss';
import {Head} from "~/components/head";
import { Content } from "~/components/content";
import axios from "@/utils/axios"
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
export  class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments:[],
            show:false,
        }
    }

    componentWillMount(){
        // 在页面渲染之前获取相关数据

         // sessionStorage中存储的信息
         var UserName = sessionStorage.username;
         // 判断UserName为string类型  将其转换为JSON数据类型
         var result = JSON.parse(UserName);
         console.log(result);
 
         var username = result.name;
         console.log(username);
        // 获取菜品数据
        axios.post("/react/getMyComment",{
            username,
        }).then(res=>{
            console.log(res);
            this.setState({
                comments:res.data.result
            })
        })
    }
    render(){
        const {
            comments,
        } = this.state;
        return(
            <div id='commentBox'>
                <Head title='评论' show={true}></Head>
                {
                    this.state.comments.map((comment,i)=>{
                        return (
                            <div key={i}>
                                <WingBlank>
                                        <li id='content' >
                                            <Content comment={comment}/>
                                        </li>
                                    <WhiteSpace/>
                                </WingBlank>
                            </div> 
                            
                        )
                    })
                } 
            </div>
        )
    }
}