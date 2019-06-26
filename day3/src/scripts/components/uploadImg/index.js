import "./index.scss"

import {WingBlank,WhiteSpace } from "antd-mobile";
import {Link} from "react-router-dom"
export class Item extends Component{
    render(){
        const {
            menu
        } = this.props;
        return (
            <div>
                <div id="photo"><img src="{userInfo.touxiang}" onClick="updateimg" class="ohuo"/>
                </div>
                <input type="file" ref="one" accept="image/*" onChange={this.shangchuan} class="hiddenInput"/>
            </div>
        )
    }
}