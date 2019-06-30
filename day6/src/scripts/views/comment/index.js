

import './index.scss';
import {Head} from "~/components/head";
import { Content } from "~/components/content";
import axios from "@/utils/axios"
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import {connect} from "react-redux"
import { getMyComment } from "~/redux/actions";


@connect(
    state=>{
        //console.log(state)
        return {
            ...state.data
            //通过容器组件获取数据
        }
    }
)
export  class Comment extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         comments:[],
    //         show:false,
    //         UserName:{},
    //     }
    // }

    componentWillMount(){
        const {dispatch}=this.props;
        var UserName = sessionStorage.username;
        console.log(UserName);
        if(UserName!=undefined){
            var result = JSON.parse(UserName);
            var username = result.name;
            console.log(username);
            dispatch(getMyComment({
                url:'/react/getMyComment',
                params:{
                    username,
                },
                cb(){}
            }))
        }
    }

    render(){
        const {
            comments,
            UserName
        } = this.props
        console.log(this.props);
        if(comments.length>=1){
            // 通过this.refs.值.style.属性可以修改页面的样式.
            this.refs.context.style.display='none';
        }
        return(
            <div id='commentBox'>
                <Head title='评论' show={true}></Head>
                <div id='box'>
                    <div ref='context'>
                        <div id="toast">
                            你的评论页面空空如也,请评论后再来浏览
                        </div>
                    </div>
                    {   
                        comments&&
                        comments.map((comment,i)=>{
                            return (
                                <div key={i} ref='commentContent'>
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
            </div>
        )
    }

    // 更新组件
    // componentDidUpdate(){
    //     console.log('你会吃吗');
    //     const {dispatch}=this.props;
    //     var UserName = sessionStorage.username;
    //     console.log(UserName);
    //     if(UserName!=undefined){
    //         var result = JSON.parse(UserName);
    //         var username = result.name;
    //         console.log(username);
    //         dispatch(getMyComment({
    //             url:'/react/getMyComment',
    //             params:{
    //                 username,
    //             },
    //             cb(){}
    //         }))
    //     }
    // }
}