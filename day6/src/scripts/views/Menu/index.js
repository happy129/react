


import  "./index.scss"
import {Head} from "~/components/head"
import axios from "@/utils/axios"
import {WingBlank,WhiteSpace,Card,Stepper,Button,TextareaItem,Toast } from "antd-mobile"
import { createForm } from 'rc-form';
import {connect} from "react-redux"
import { getMenuOne,getComment } from "~/redux/actions";

@connect(
    state=>{
        //console.log(state)
        return {
            ...state.data
            //通过容器组件获取数据
        }
    }
)

export class Menu extends Component{

    componentWillMount(){
        const {dispatch}=this.props;
        // 在页面渲染之前获取相关数据
        var menuId = this.props.match.params.menuId;
        console.log(menuId);
        // 获取菜品数据
        dispatch(getMenuOne({
            url:'/react/getMenuOne',
            params:{
                menuId,
            },
            cb(){}
        }))

        // 获取菜品评论数据
        dispatch(getComment({
            url:'/react/getComment',
            params:{
                menuId,
            },
            cd(){}
        }))

    }


    // 组件进行二次渲染
    componentDidUpdate(){
        // console.log(this.refs.commentText.state.value);
        this.refs.commentText.state.value='';
        var content =  this.refs.commentText.state.value;
        // 更新菜品评论数据   重新请求评论数据
      
    }
    
    // 提交评论数据至数据库
    subComment=()=>{
        const {history} = this.props;
        // 通过浏览器地址栏取到菜谱ID
        // 首先取到'?'之前的内容  
        var url = this.props.match.url;
        console.log(url);
        //获取最后一个'/'的下标
        var str = url.lastIndexOf('\/');
        console.log(str);
        // 获取菜品ID
        var menuId = url.substring(str+1,url.length);
        console.log(menuId);
        // sessionStorage中存储的信息
        var UserName = sessionStorage.username;
        // 判断UserName为string类型  将其转换为JSON数据类型
        var result = JSON.parse(UserName);
        console.log(result);

        var username = result.name;
        console.log(username);
        var commentInfo = this.refs.commentText.state.value;
        console.log(commentInfo);
        const params = new URLSearchParams(this.props.location.search);
        var menuName = params.get("name")
        console.log(menuName);

        if(UserName){
            if(commentInfo!=''){
                axios.post('/react/insertComment',{
                    commentInfo:this.refs.commentText.state.value,
                    username,
                    menuName,
                    menuId,
                }).then(res=>{
                    this.refs.commentText.state.value='';
                    var content =  this.refs.commentText.state.value;
                    const {dispatch}=this.props;
                    // 在页面渲染之前获取相关数据
                    var menuId = this.props.match.params.menuId;
                    console.log(menuId);
                    dispatch(getComment({
                        url:'/react/getComment',
                        params:{
                            menuId,
                        },
                        cb(){}
                    }))
                })
            }else{
                Toast.fail('您的评论内容为空,请输入评论后点击提交.', 3);
            }
        }else{
            Toast.fail('你还未登陆,请登录之后再进行评论', 3);
            setInterval(function(){
                history.push('/login');
            },2000)
        }
    }
    render(){
        const {
            location,
            match,
            getMenuOne,
            getComment,
        } = this.props 
        console.log(getMenuOne);
        console.log(getComment);

        return (
            <div className="box">
                <Head title={new URLSearchParams(location.search).get('name')} show={true}> </Head>
                {
                    getMenuOne &&  
                    <div id='itemInfo'>
                        <WingBlank>
                            <WhiteSpace/>
                            <Card>
                                <Card.Header
                                    title={getMenuOne.ways}
                                    thumb={getMenuOne.img}
                                    extra={<span>{getMenuOne.type.text}</span>}
                                />
                                 <Card.Body>
                                    <div id='goods'>
                                        <img src={getMenuOne.img} alt="" id='goodsImg'/>
                                        <div id="goodsInfo">
                                            <h2>
                                                <p className='goodsname'>菜名:{getMenuOne.name} </p>
                                                <p className='goodstype'>所属菜系:{getMenuOne.type.text}</p> 
                                            </h2>
                                            <p className='info' id='author'>
                                                <span>创作者:{getMenuOne.author}</span> 
                                            </p>
                                            <p className='info'>
                                                烹饪方式与口味:{getMenuOne.ways}
                                            </p>
                                            <p className='info'>
                                                烹饪步骤与耗时:{getMenuOne.time}
                                            </p>
                                            <p className='info'>
                                                菜品功效:{getMenuOne.effect}
                                                <span id='hot'>人气:{getMenuOne.hot}</span>
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer extra={ <span>评论:{getMenuOne.comment}</span>  } />
                            </Card>
                        </WingBlank>
                        <WhiteSpace/>
                    </div>
                }
                <WhiteSpace/>
                <WingBlank>
                    {/* 显示用户的评论数据   style={{display:show?'none':'block'}}*/}
                    {
                        getComment.map((comment,i)=>{
                            return(
                                <div id='commentList'  key={i} >   
                                    <h2 id='commentName'>{comment.username}的评论:</h2>
                                    <p id='commentText'>评论内容：{comment.commentInfo}</p>
                                    <p id='commentTime'>评论时间：
                                        <span>{comment.time}</span>
                                    </p>
                                </div>
                            )
                        })
                    }
                </WingBlank>
                <WhiteSpace/>

                <WingBlank>
                    <TextareaItem
                        title="评论:"
                        placeholder="请输入评论信息"
                        data-seed="logId"
                        autoHeight
                        ref='commentText'
                    />
                </WingBlank>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.subComment}>提交评论</Button><WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}
