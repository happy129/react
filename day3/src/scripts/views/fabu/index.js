

import { ImagePicker, WingBlank,TextareaItem ,WhiteSpace,Button} from 'antd-mobile';
import { createForm } from 'rc-form';
import {Head} from "~/components/head";
import './index.scss';
import axios from "@/utils/axios"

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  }];

export class Fabu extends Component{


    state = {
        files: data,
        multiple: false,
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


      commitMenu=()=>{
        var menuWays = this.refs.menuWays.state.value;
        console.log(menuWays);
        axios.post('/react/uploadMenu',{
            menuWays,
        }).then(res=>{
            console.log(res);
        })
      }
    render(){
        const { files } = this.state;
        return(
            <div> 
                <Head title='上传菜谱' show={true}></Head>  

                <WhiteSpace/>
                <WingBlank>
                    <WhiteSpace/>
                    <TextareaItem
                    rows="5"
                    title="上传菜谱"
                    placeholder="请输入菜谱的所需食材与步骤:"
                    data-seed="logId"
                    autoHeight
                    ref='menuWays'
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
        )
    }
}