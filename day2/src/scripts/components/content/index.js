import "./index.scss"

import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';

const prompt = Modal.prompt;
export class Content extends Component{

    update=()=>{
        var commentInfo=  this.refs.commentText.innerHTML;
        console.log(commentInfo)

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
                <p id='commentText' ref='commentText'>{comment.commentInfo}</p>
                <p id='commentTime'>评论时间：
                    <span>{comment.time}</span>
                </p>
                <div id='operation'>
                    <Button type="primary" size='small' id='update' inline style={{ marginRight: '4px' }} onClick={this.update}>修改</Button>
                    <Button type="warning" size='small' id='del' inline style={{ marginRight: '4px' }} className="am-button-borderfix">删除</Button>
                </div>
                <Button  onClick={() => prompt('修改评论', '你正在修改评论', [
                    { text: '取消' },
                    { text: '提交', onPress: value => console.log(`输入的内容:${value}`) },
                  ], 'default', '菜')}
                  >修改</Button>
            </div>

        )
    }
}