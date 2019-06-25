

export const foots =  [
    {txt:"首页",path:"/app/home",name:"home",icon:"icon-home"},
    {txt:"菜系",path:"/app/classify",name:"classify",icon:"icon-goodsfill"},
    {txt:"评论",path:"/app/comment",name:"comment",icon:"icon-shop_car"},
    {txt:"我",path:"/app/mine",name:"mine",icon:"icon-minefill"}
]

import "./index.scss"
import  {Link,NavLink} from "react-router-dom"
import {Badge} from "antd-mobile"

export const Foot = ()=>{
    return (
       <footer>
           {
               foots.map((item,i)=>{
                   return (
                       <div key={i}>
                           <NavLink to={item.path} activeClassName="nav-active" > 
                                <i className={"iconfont icon " + item.icon} ></i>
                                <span> {item.txt}</span>
                                {i==2&&<Badge className="hot" text={8} style={{ marginLeft: 12 }}></Badge>}
                           </NavLink>
                       </div>
                   )
               })
           }
       </footer>
    )
}