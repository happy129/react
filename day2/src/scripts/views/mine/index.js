

import './index.scss';
import {Head} from "~/components/head";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

export  class Mine extends Component{
    state = {
        isLogin:false
    };
    gotoLogin=()=>{
        const {history} = this.props;
        history.push('/login');
    }
    gotoReg=()=>{
        const {history}=this.props;
        history.push('/register');
    }
    render(){
        const{
            isLogin
        }=this.state;
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
                        
                    <WingBlank>
                        <div>我的发布</div>
                        <WhiteSpace /> 
                        <div>我的收藏</div>
                        <WhiteSpace /> 
                        <div>我的订单</div>
                        <WhiteSpace />
                    </WingBlank>
                  
                </div>
                <div style={{display:isLogin?'block':'none'}} >
                    <h2> 你的账户  ==  {13212341234}</h2>
                    <img src={require("@/assets/images/photo.png")} alt=""/>
                </div>
                <div id='m-foot'>
                    <WingBlank>
                        <WhiteSpace /><Button type="primary"  onClick={this.gotoLogin} style={{display:!isLogin?'block':'none'}}>马上登录</Button><WhiteSpace />
                        <Button type="warning" onClick={this.gotoReg} style={{display:!isLogin?'block':'none'}}>注册</Button>
                    </WingBlank>
                </div>


            </div>
        )
    }
}