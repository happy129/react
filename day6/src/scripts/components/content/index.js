import "./index.scss"

import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
const alert = Modal.alert;
const prompt = Modal.prompt;
import axios from "@/utils/axios"

import {connect} from "react-redux"
import history from "@/utils/history";
import { delComment,updateComment,getMyComment } from "~/redux/actions";

@connect(
    state=>{
        //console.log(state)
        return {
            ...state.data
            //通过容器组件获取数据
        }
    }
)

export class Content extends Component{

    update=()=>{
        var commentInfo=  this.refs.commentText.innerHTML;
        console.log(commentInfo)

    }   
    del=()=>{
        alert('要删除吗')
    }
    componentDidUpdate(){
        
    }

    render(){
        const {
            comment
        } = this.props;
        return (
            <div id='myComment'>   
                <h2 id='commentName'>评论人:{comment.username}</h2>
                <p>评论菜品:{comment.name}</p>
                <p id='commentText' ref='commentText'><span>评论内容:</span>{comment.commentInfo}</p>
                <p id='commentTime'>评论时间：
                    <span>{comment.time}</span>
                </p>
                <div id='operation'>
                    <Button id='update' onClick={() => prompt('修改评论', '你正在修改评论', [
                        { text: '取消' },
                        { text: '提交', onPress: value => {
                            console.log(`${value}`);
                            var commentInfo= value;
                            var id = comment._id;
                            console.log(commentInfo);
                            const {dispatch}=this.props;
                            dispatch(updateComment({
                                url:'/react/updateComment',
                                params:{
                                    commentInfo,
                                    id,
                                },
                                cb(){
                                    var UserName = sessionStorage.username;
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
                            }))
                        } 
                        },
                    ], 'default',comment.commentInfo )}
                    >修改</Button>

                    <Button id='del'
                    onClick={() =>
                      alert('删除', '你确定要删除用户'+comment.username+'的这条评论?', [
                        { text: '取消', onPress: () => {console.log(comment.commentInfo)} },
                        { text: '确定', onPress: () => {
                            console.log('确定');
                            var id = comment._id;
                            const {dispatch}=this.props;
                            dispatch(delComment({
                                url:'/react/delComment',
                                params:{
                                    id,
                                },
                                cb(){
                                    var UserName = sessionStorage.username;
                                    console.log(UserName);
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
                            }))

                            } 
                        },
                      ])
                    }
                  >
                    删除
                  </Button>
                    
                </div>
                
            </div>

        )
    }
}