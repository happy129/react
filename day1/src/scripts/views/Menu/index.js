



import  "./index.scss"
import {Head} from "~/components/head"
import axios from "@/utils/axios"
import {WingBlank,WhiteSpace,Card,Stepper,Button,TextareaItem,Toast } from "antd-mobile"
import { createForm } from 'rc-form';
export class Menu extends Component{

    constructor(props){
        super(props)
        this.state = {
            data:null,
            dataComment:[],
            show:false,
        }
    }

    componentWillMount(){
        // 在页面渲染之前获取相关数据
        console.log(this.props.match.params.menuId);
        // 获取菜品数据
        axios.get("/react/getMenuOne",{
            params:{
                menuId:this.props.match.params.menuId
            }
        }).then(res=>{
            console.log(res);
            this.setState({
                data:res.data.result
            })
        })

        // 获取菜品评论数据
        axios.get("/react/getComment",{
            params:{
                menuId:this.props.match.params.menuId
            }
        }).then(res=>{
            console.log(res);
            this.setState({
                dataComment:res.data.result
            })
        })

    }
    componentDidMount(){
     
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

            })
            }else{
                Toast.fail('您的评论内容为空,请输入评论后点击提交.', 3);
            }
        }else{
            Toast.fail('你还未登陆,请登录之后再进行评论', 3);
            setInterval(function(){
                history.push('/login');
            },2000)
            // 13129922452
        }
    }
    render(){
        const {
            location,
            match,
        } = this.props 
        const {
            data ,
            dataComment,
            count
        } = this.state;
        return (
            <div className="box">
                <Head title={new URLSearchParams(location.search).get('name')} show={true}> </Head>
                {
                    this.state.data &&  <div>
                        <WingBlank>
                            <WhiteSpace/>
                            <Card>
                                <Card.Header
                                    title={data.ways}
                                    thumb={data.img}
                                    extra={<span>{data.type.text}</span>}
                                />
                                 <Card.Body>
                                    <div id='goods'>
                                        <img src={data.img} alt="" id='goodsImg'/>
                                        <div id="goodsInfo">
                                            <h2>
                                                <p className='goodsname'>菜名:{data.name} </p>
                                                <p className='goodstype'>所属菜系:{data.type.text}</p> 
                                            </h2>
                                            <p className='info' id='author'>
                                                <span>创作者:{data.author}</span> 
                                            </p>
                                            <p className='info'>
                                                烹饪方式与口味:{data.ways}
                                            </p>
                                            <p className='info'>
                                                烹饪步骤与耗时:{data.time}
                                            </p>
                                            <p className='info'>
                                                菜品功效:{data.effect}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer content="点赞数量与人气" extra={ <span>{data.comment}</span>  } />
                            </Card>
                        </WingBlank>
                        <WhiteSpace/>

                    </div>
                }
                <WhiteSpace/>
                    <WingBlank>

                        {/* 显示用户的评论数据   style={{display:show?'none':'block'}}*/}
                        {
                            this.state.dataComment.map((comment,i)=>{
                                return(
                                    <div id='commentInfo'  key={i} >   
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