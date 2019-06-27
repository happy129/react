

import './index.scss';
import {Head} from "~/components/head";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

export  class Mine extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:null,
        }
    }
    componentWillMount(){
        console.log(this);
        var UserName = sessionStorage.username;
        // 判断UserName为string类型  将其转换为JSON数据类型
        var result = JSON.parse(UserName);
        var username = result.name;
        this.setState({
            username:username
        })

    }
    gotoLogin=()=>{
        const {history} = this.props;
        history.push('/login');
    }
    gotoReg=()=>{
        const {history}=this.props;
        history.push('/register');
    }

    zhuxiao=()=>{
        console.log('这就注销了');
    }
    fabu=()=>{
        const {history}=this.props;
        history.push('/fabu');
    }

    myFabu=()=>{
        const {history}=this.props;
        history.push('/myFabu');
    }
    render(){
        const{
            isLogin,
            username,
        }=this.state;

        if(username!=''){
            // this.refs.notLogin.style.display='none';
        }else{
            this.refs.Login.style.display='none';
        }
        return(
            <div>
                <Head title='个人中心' show={true}></Head>
                <div id='top'>
                    <div id='my_top'>
                        <div id='userImg'>
                            <img src="http://static.meishij.net/images/get3/ceshi/sousuo.png" alt=""/>
                        </div>
                        <div id='username'>17771427257</div> 
                    </div>
                    <div ref="one"></div>
                    <WingBlank>
                        <WhiteSpace />
                        <ul id='info'>
                            <li>1关注</li>
                            <li>0粉丝</li>
                            <li>0菜谱</li>
                        </ul>
                    </WingBlank> 
                    <WingBlank id='xzInfo'>
                        <WhiteSpace />  
                        <h3 id='xzTitle'>荣誉勋章</h3> 
                        <WhiteSpace /> 
                        <ul id="xz">  
                            <li>
                                <img  src="http://static.meishij.net/images/get3/ceshi/sousuo.png" alt=""/>
                            </li>  
                            <li>
                                <img src="http://static.meishij.net/images/get3/ceshi/sousuo.png" alt=""/>
                            </li>  
                            <li>
                                <img src="http://static.meishij.net/images/get3/ceshi/sousuo.png" alt=""/>
                            </li>  
                            <li>
                                <img src="http://static.meishij.net/images/get3/ceshi/sousuo.png" alt=""/>
                            </li>  
                            <li>
                                <img src="http://static.meishij.net/images/get3/ceshi/sousuo.png" alt=""/>
                            </li>  
                        </ul>
                    </WingBlank>
                    <WhiteSpace /> 
                        
                    <WingBlank >
                        <div onClick={this.fabu}>我要发布</div>
                        <WhiteSpace /> 
                        <div onClick={this.myFabu}>我的发布</div>
                        <WhiteSpace /> 
                        <div>我的收藏</div>
                        <WhiteSpace /> 
                    </WingBlank>
                  
                </div>
                <div id='m-foot'>  

                    <div ref='Login'>
                        <WingBlank >
                            <Button type="warning" onClick={this.zhuxiao} >注销</Button>
                        </WingBlank>
                    </div>
                    
                    <div ref='notLogin'>
                        <WingBlank >
                            <WhiteSpace /><Button type="primary"  onClick={this.gotoLogin} style={{display:!isLogin?'block':'none'}}>马上登录</Button><WhiteSpace />
                            <Button type="warning" onClick={this.gotoReg} style={{display:!isLogin?'block':'none'}}>注册</Button>
                        </WingBlank>
                    </div>
                    
                </div>


            </div>
        )
    }
}