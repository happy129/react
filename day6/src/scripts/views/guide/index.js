

import "./index.scss";
import Swipe from "@/scripts/components/swipe"

const Item = Swipe.item;


export class Guide extends Component{
    state = {
        imgs:[
            require("@/assets/images/slide1.png"),
            require("@/assets/images/slide2.png"),
            require("@/assets/images/slide3.png"),
            require("@/assets/images/slide4.png"),
        ]
    }
    gotoApp(id){
        const {history} = this.props;
        if(id==this.state.imgs.length-1){
            history.push("/app/home");
        }
    }
    gotoHome(){
        const {history} = this.props;
        history.push('./app/home');
    }
    componentWillMount(){
        if(localStorage.pcount){
            localStorage.pcount++;
            if(localStorage.pcount>10){
                const {history} = this.props;
                history.push("/app/home");
            }
        }else{  
            localStorage.pcount = 1;
        }
    }
    render(){
        return (
            <Swipe id="guide" options={{loop:false}}>
                {
                    this.state.imgs.map((item,id)=>{
                        return (
                            <Item key={id}>
                                <div id='slipe' onClick={()=>this.gotoHome()}>跳过</div>
                                <img src={item} alt="" className="g-img" onClick={()=>this.gotoApp(id)}   />
                            </Item>
                        )
                    })
                }
            </Swipe>
        )
    }
}