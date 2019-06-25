import "./index.scss"

import {WingBlank,WhiteSpace } from "antd-mobile";
import {Link} from "react-router-dom"
export class Item extends Component{
    render(){
        const {
            menu
        } = this.props;
        return (
            <div className="move-in item">
            <Link to={"/menu/detail/"+menu._id+"?name="+menu.name } style={{float:'left',width:'50%'}}>
            
            <WhiteSpace/>
            <WingBlank style={{position:'relative'}}>
            <img src={menu.img} alt="" style={{width:"100%",height:'3rem',borderRadius:'0.1rem'}}/>
            <h2 style={{color:"yellowgreen",fontSize:"0.3rem",
            whiteSpace: 'nowrap',
            textOverflow:'ellipsis'}}>
                <p><span style={{color:'#000'}}>{menu.type.text}--{menu.name}</span>  </p> 
                
                <p><span style={{color:'chocolate',overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',}}>出处:{menu.author}</span>  </p>
                <p style={{width:'85%', whiteSpace: 'nowrap',
                textOverflow:'ellipsis'}}>烹饪与味道:{menu.ways}</p>
            </h2>
            <div style={{position:"absolute",right:'0.2rem',top:'0.2rem',width:'1.3rem',height:'0.45rem',color:'#fff',backgroundColor:'#f40',textAlign:'center',lineHeight:'0.45rem',borderRadius:'0.18rem'}}>{menu.effect}</div>
            </WingBlank> 
            <WhiteSpace/>
                </Link>
            </div>
        )
    }
}