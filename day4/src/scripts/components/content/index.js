import "./index.scss"

import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
const alert = Modal.alert;
const prompt = Modal.prompt;
import axios from "@/utils/axios"
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
                            axios.post('/react/updateComment',{
                                commentInfo,
                                id,
                            }).then(res=>{
                                console.log(res);
                                var UserName = sessionStorage.username;
                                // 判断UserName为string类型  将其转换为JSON数据类型
                                var result = JSON.parse(UserName);
                                console.log(result);
                        
                                var username = result.name;
                                console.log(username);

                                axios.post("/react/getMyComment",{
                                    username,
                                }).then(res=>{
                                    console.log(res);
                                    this.setState({
                                        comments:res.data.result
                                    })
                                })

                            })
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
                            axios.post('/react/delComment',{
                                id
                            }).then(res=>{
                                console.log(res);
                                axios.post("/react/getMyComment",{
                                    username,
                                }).then(res=>{
                                    console.log(res);
                                    this.setState({
                                        comments:res.data.result
                                    })
                                })
                            })
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

// <Button type="primary" size='small' id='update' inline style={{ marginRight: '4px' }} onClick={this.update}>修改</Button>

// <Button id='update' onClick={() => prompt('修改评论', '你正在修改评论', [
//     { text: '取消' },
//     { text: '提交', onPress: value => console.log(`${value}`) },
//   ], 'default',comment.commentInfo )}
//   >修改</Button>

// <Button type="warning" size='small' id='del' onClick={this.del}  inline style={{ marginRight: '4px' }} className="am-button-borderfix">删除</Button>