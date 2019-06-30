

import './index.scss';
import {Head} from "~/components/head";
import { Button, WhiteSpace, WingBlank,Tabs,Badge,List,InputItem } from 'antd-mobile';

// 正则表达式：验证电话号码与验证码的格式
export const mobileReg = /^1(3|5|6|7|8|9)\d{9}$/;
export const codeReg = /^\d{4}$/;

import axios from  '@/utils/axios'

let timer = null;
export  class Login extends Component{
    state = {
        toggle:true,
        mobileDis:true,
        flag:true,
        count:60,
        txt:"获取验证码",
    }
    // 跳转至注册页面
    gotoReg=()=>{
        const {history} = this.props;
        history.push('/register');
    }

    // 验证电话号码：
    checkMobile = (mobile)=>{
        console.log(mobile);
        if(this.state.flag){
            this.setState({
                mobileDis:!mobileReg.test(mobile),
            })
        }
    }

    startTime = ()=>{
        timer = setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    txt:this.state.count+'s后继续'
                })
                
            }else{
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt:"获取验证码",
                    mobileDis:false,
                    flag:true,
                    count:60
                })
            }
        },1000)
    }

    // 验证验证码格式
    checkCode = (val)=>{
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle:!(codeReg.test(val)&&mobileReg.test(mobile))
        })
    }

    getCode=()=>{
        console.log('验证码');
        // 请求验证码数据
        axios.post('/react/sendCode',{
            mobile:this.refs.mobile.state.value
        }).then(res=>{
            console.log(res);
        })
        this.setState({
            mobileDis:true,
            flag:false
        })
        this.startTime();

    }

    rightNowLogin =()=>{
        // 验证手机号码与验证码的匹配状况
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.code.state.value;
        // console.log(mobile,code);
        // sessionStorage.userInfo = mobile;
        axios.post("/react/testCode",{
            mobile,
            code
        }).then(res=>{
            if(!!res.data.type){
                this.props.history.push("/app/mine");
                var token =  {
                    token:res.data.token,
                }
                var name={
                    name:res.data.username,
                }
                sessionStorage.token = JSON.stringify(token)
                sessionStorage.username = JSON.stringify(name)
            }else{
                delete sessionStorage['userInfo']
            }
        })
    }
    
    render(){
        const {
            toggle,
            mobileDis,
            txt
        } = this.state
        const tabs = [
            { title: <Badge>账号登录</Badge> },
            { title: <Badge>手机号登录</Badge> },
          ];    
        return(
            <div>
                <Head title='登录' show={true}></Head>
                <Tabs tabs={tabs}
                initialPage={1}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    {/* 用户名密码登录 */}
                    <WingBlank>
                        <List>
                            <WhiteSpace/>
                            <InputItem
                                type="text"
                                placeholder="请输入用户名"
                                clear
                                onChange={this.checkUserName}
                            >用户名</InputItem>
                            <WhiteSpace/>
                            <InputItem
                                type="password"
                                placeholder="请输入密码"
                                clear
                            >密码</InputItem>
                            <WhiteSpace/>
                            <Button type="primary" disabled={toggle}>登录</Button>
                        </List>
                    </WingBlank>

                    {/* 手机号与验证码登录表 */}
                    <WingBlank>
                        <List>
                            <WhiteSpace/>
                            <InputItem
                                type="tel"
                                placeholder="请输入手机号"
                                clear
                                onChange={this.checkMobile}
                                ref="mobile"
                            >手机号</InputItem>
                            <WhiteSpace/>
                            <InputItem
                                type="text"
                                placeholder="请输入验证码"
                                clear
                                onChange={this.checkCode}
                                ref="code"
                            >验证码</InputItem>
                            <WhiteSpace/>
                            <Button ref="btn" type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                            <WhiteSpace/>
                            <Button type="primary" disabled={toggle} onClick={this.rightNowLogin}>登录</Button>
                        </List>
                    </WingBlank>
                </Tabs>
                <WhiteSpace/>
                <div onClick={this.gotoReg} style={{float:'right' ,marginRight:'0.8rem'}}>还么有账号,先去注册.</div>
            </div>
        )
    }

    componentWillUnmount(){
        clearInterval(timer);
    }
}