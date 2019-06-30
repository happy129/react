
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import {Guide} from './guide';
import {App} from './app';
import {Search} from './search';
import {Login} from './login';
import {Register} from './register';
import {Menu} from './menu';
import {Fabu} from './fabu';
import {MyFabu} from './myFabu';
export class IndexView extends Component{
    render(){
        return(
            <Router>
                <div id="main">
                    <Route path='' exact component={Layout} /> 
                </div>
            </Router>  
        )
    }
}


// 路由配置
export class  Layout extends Component{
    getChildContext(){
        return {
            props:this.props
        }
    }
    render(){
        return(
            <Switch>
                {/* 重定向至guide页面中 */}
                <Route path='/' exact render={()=>(<Redirect to='/guide'  />)} />
                <Route path='/guide' component={Guide} />
                <Route path='/app/' strtic component={App} />
                <Route path='/login' strtic component={Login} />
                <Route path='/register' strtic component={Register} />
                <Route path='/search' strtic component={Search} />
                <Route path='/menu/detail/:menuId?' strtic component={Menu} />
                <Route path='/fabu' strtic component={Fabu} />
                <Route path='/myFabu' strtic component={MyFabu} />
            </Switch>
        )
    }
}

Layout.childContextTypes = {
    props:PropTypes.object
}
