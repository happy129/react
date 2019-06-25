

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


                <div style={{display:isLogin?'block':'none'}} >
                    <h2> 你的账户  ==  {13212341234}</h2>
                    <img src={require("@/assets/images/photo.png")} alt=""/>
                </div>
                <div id='m-foot'>
                    <WingBlank>
                        <WhiteSpace /><Button type="primary" onClick={this.gotoLogin} style={{display:!isLogin?'block':'none'}}>马上登录</Button><WhiteSpace />
                        <Button type="warning" onClick={this.gotoReg} style={{display:!isLogin?'block':'none'}}>注册</Button>
                    </WingBlank>
                </div>


            </div>
        )
    }
}