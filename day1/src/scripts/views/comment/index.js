



import './index.scss';
import {Head} from "~/components/head";

export  class Comment extends Component{
    render(){
        return(
            <div>
                <Head title='评论' show={true}></Head>
                <h2>Comment-Comment-评论</h2>
            </div>
        )
    }
}