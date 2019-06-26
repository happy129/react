

import './index.scss';
import {Head} from "~/components/head";
import { Button, WhiteSpace, WingBlank ,List,InputItem} from 'antd-mobile';

export  class Register extends Component{
    state = {
        toggle:true,
        flag:true,
    }
    checkUserName=(username)=>{
        console.log(username);
    }

    gotoLogin=()=>{
        const {history} = this.props;
        history.push('/login');
    }
    render(){
        const {
            toggle,
            flag,
        } = this.state
        return(
            <div>
                <Head title='注册' show={true}></Head>
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
                        <InputItem
							type="password"
							placeholder="请确认密码"
							clear
						>确认密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
							type="email"
							placeholder="请输入邮箱"
							clear
						>邮箱</InputItem>
						<WhiteSpace/>
						<Button type="primary" disabled={toggle}>注册</Button>
                        <WhiteSpace/>
                            <Button ref="btn" type="warning" onClick={this.gotoLogin}> 已有账号,去登陆</Button>
                            <WhiteSpace/>
                    </List>
                </WingBlank>


            </div>
        )
    }

    // 组件移除时清除定时器
    componentWillUnmount(){
        clearInterval(timer);
    }
}