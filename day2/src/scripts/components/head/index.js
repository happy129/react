

import './index.scss';

import { Popover,NavBar, Icon } from 'antd-mobile';
export  class Head extends Component{
    // 返回函数
    goback=(show)=>{
        // 属性值穿透
        // const {history} = this.context.props;
        if(show){
            // 返回上一个页面
            history.go(-1);
        }
    }

    goSearch=()=>{
        const {history} = this.context.props;
        history.push('/search');
    }

    render(){
        const{
            title,
            show
        }=this.props;
        return(
            <div>
                <NavBar 
                
                mode="dark"
                icon={show&&<Icon type="left" />}
                onLeftClick={() => this.goback(show)}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goSearch}/>,
                    <Icon key="1" type="ellipsis" />,
                ]}
                > {title }</NavBar>
          </div>
        )
    }
}

import PropTypes from "prop-types"
Head.contextTypes ={
    props:PropTypes.object
}

// style={{position:'fixed',
//                     left: 0,
//                     top: 0,
//                     width: '100%',
//                     zIndex: 100,
//                     animation: 'jello 2s'}}