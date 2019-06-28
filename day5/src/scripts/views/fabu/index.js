

import { ImagePicker, WingBlank,TextareaItem ,WhiteSpace,Button} from 'antd-mobile';
import { createForm } from 'rc-form';
import {Head} from "~/components/head";
import './index.scss';
import axios from "@/utils/axios"

import {connect} from "react-redux"
import history from "@/utils/history";
import { uploadMenu} from "~/redux/actions";

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}];

@connect(
    state=>{
        //console.log(state)
        return {
            ...state.data
            //通过容器组件获取数据
        }
    }
)
export class Fabu extends Component{


    state = {
        files: data,
        multiple: false,
        autoFocusInst:""
      }
      onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
      onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
          multiple: index === 1,
        });
      }
      componentDidMount(){
        this.autoFocusInst.focus();
        console.log(this.autoFocusInst);
        this.autoFocusInst.state.value = "";
        this.refs.foods.state.value='';
      }

      commitMenu=()=>{
         // sessionStorage中存储的信息
          var UserName = sessionStorage.username;
          // 判断UserName为string类型  将其转换为JSON数据类型
          var result = JSON.parse(UserName);
          var username = result.name;
          var menuName = this.autoFocusInst.state.value;
          var foods = this.refs.foods.state.value;
          var describe = this.refs.describe.state.value;
          var menuTime = this.refs.menuTime.state.value;
          if(menuName&&username&&foods&&describe!=''){
            const {dispatch}=this.props;
            dispatch(uploadMenu({
                url:'/react/uploadMenu',
                params:{
                    menuName,
                    foods,
                    describe,
                    username,
                    menuTime
                },  
                cb(){
                    
                    history.push('/myFabu');
                    console.log(this.refs);
                    // this.refs.menuName.state.value='';
                    console.log(this.autoFocusInst.state.value)
                    this.autoFocusInst.state.value = '';
                    console.log(menuName);
                    this.refs.foods.state.value='';
                    this.refs.describe.state.value='';
                    console.log(res);
                }
            }))
          }else{
              console.log('你输入的菜谱内容为空,请重新输入后再提交');
          }
      }
    render(){
        const { files } = this.state;
        return(
            <div> 
                <Head title='上传菜谱' show={true}></Head>  
                
                <div id="box">
                    <WingBlank>
                        <TextareaItem
                        rows="1"
                        title="菜谱名称:"
                        placeholder="请输入菜谱名称"
                        data-seed="logId"
                        autoHeight
                        ref={el => this.autoFocusInst = el}
                        />
                    </WingBlank>
                    <WhiteSpace/>
                    <WingBlank>
                        <TextareaItem
                        rows="1"
                        title="制作耗时:"
                        placeholder="请输入制作所需时间"
                        data-seed="logId"
                        autoHeight
                        ref='menuTime'
                        />
                    </WingBlank>
                    <WhiteSpace/>
                    <WingBlank>
                        <TextareaItem
                        rows="2"
                        title="所需食材"
                        placeholder="请输入菜谱所需食材与步骤"
                        data-seed="logId"
                        autoHeight
                        ref='foods'
                        />
                    </WingBlank>
                    <WhiteSpace/>
                    <WingBlank>
                        <TextareaItem
                        rows="3"
                        title="描述:"
                        placeholder="请输入菜谱的所相关描述"
                        data-seed="logId"
                        autoHeight
                        ref='describe'
                        />
                    </WingBlank>
                    <WhiteSpace/>
                    <WingBlank>
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 9}
                            multiple={this.state.multiple}
                        />
                    </WingBlank>
                    <div id='commit'>
                        <Button type="primary" id='commitMenu' onClick={this.commitMenu}>提交菜谱</Button>
                    </div>
                        </div>
                        <WhiteSpace/>
                
            </div>
        )
    }
}