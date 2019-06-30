import "./index.scss"

import {Link} from "react-router-dom"
import axios from "@/utils/axios"
export class UploadImg extends Component{

    constructor(props){
        super(props)
        this.state = {
            userInfo: {
                touxiang: require("@/assets/images/photo.png"),
                
              },
            url:"" 
        }
    }

    updateimg=()=> {
        // console.log("上传图片");
        // this.$el.querySelector('.hiddenInput').click() // 执行 input change 
        this.refs.one.click();
    }

    
    // 将头像显示
    shangchuan=(e)=> {

        let $target = e.target || e.srcElement
        let file = $target.files[0];
        // console.log(file);
        // console.log(this.$refs.one.files[0]);
        
        let data = new FormData();    // 构建表单数据对象  
        // var UserName = sessionStorage.username;
        // var result = JSON.parse(UserName);
        // var username = result.name;
        // console.log(username);
        data.append('avatar', file);  // 需要上传到 服务器 的数据
        // data.append("like",'wh1901');

        axios({
            url:"/react/upload-avatar",
            method:"POST",
            contentType:false,
            processData:false,
            data:data,
        }).then(res=>{
            // console.log(res);
            this.userInfo.touxiang  = res.data.imgUrl.replace(/public/,'http://localhost:8888');
            localStorage.userInfo = JSON.stringify({avatar:res.data.imgUrl});
        })
    }

    render(){
        const {
            userInfo,
        }=this.state
        return (
            <div>
                <div id="photo">
                    <img src={userInfo.touxiang} className="ohuo" onClick={this.updateimg}  />
                </div>
                <input type="file" ref="one" accept="image/*" onChange={this.shangchuan} className="hiddenInput"/>
            </div>
        )
    }
}


