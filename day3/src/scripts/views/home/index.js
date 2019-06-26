// 促销通知:为反馈广大用户,本商城特于近期推出年中大促销活动,部分商品低至三折,三折买不到吃亏,买不到假货,你还在等什么呢!赶快抢购吧。



import "./index.scss";
import  {Head} from "~/components/head"

import axios from "@/utils/axios"
import history from "@/utils/history";

import {WingBlank ,WhiteSpace ,Carousel ,NoticeBar,Accordion,List} from "antd-mobile"
import {Link} from "react-router-dom"
export class Home extends Component{
    state = {
        banner:[]
    }
    componentWillMount(){
        console.log(this.props);
        axios.get("/react/getMenulist",{
            params:{
                limit:6
            }
        }).then(res=>{
            console.log(res); 
           
            this.setState({
                banner:res.data.result
            })
        })
    }
    render(){
        const {
            banner
        } = this.props;
        return (
            <div>
                
                <Head title="首页" id='title' show={true}></Head>
                <WingBlank style={{marginTop:'0.2rem'}}>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    消息通知:为反馈广大用户,本平台积极听取广大用户的建议与意见,特于近期开通用户上传菜谱入口,欢迎广大用户参与此活动,积极评论交流.美食让生活更美好.
                    </NoticeBar>
                    <Carousel
                    autoplay={false}
                    infinite
                    >
                        {
                            this.state.banner.map((b,i)=>{
                               return (
                                <Link
                                to={"/menu/detail/"+b._id+"?name="+b.name }
                                   key={i}
                                   style={{ display: 'inline-block', width: '100%', height:'4rem' }}
                                   >
                                         <img id='itemImg'
                                            src={b.img}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' ,height:'4rem'}}
                                            onLoad={() => {
                                            
                                                window.dispatchEvent(new Event('resize'));
            
                                            }}
                                        />
                                   </Link>
                               )
                            })
                        }
                    </Carousel>
                </WingBlank>


                
            </div>
        )
    }
}
