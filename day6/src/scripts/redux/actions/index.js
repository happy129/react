

import axios from  "@/utils/axios"


// 评论--获取我的评论
export const getMyComment = ({url,params,cb})=>{
    return axios.post(url,{
        params

    }).then(res=>{
        cb();
        return {
            type:"getMyComment",
            comments:res.data.result
        }
    })
}

// 评论---更新评论
export const updateComment = ({url,params,cb})=>{
    return axios.post(url,{
        params

    }).then(res=>{
        cb();
        return {
            type:"updateComment",
            upcomments:res.data.result
        }
    })
}

// 获取菜谱详情
export const getMenuOne = ({url,params,cb})=>{
    return axios.post(url,{
        params
    }).then(res=>{
        cb();
        return {
            type:"getMenuOne",
            getMenuOne:res.data.result
        }
    })
}

// 获取菜谱的所有评论
export const getComment = ({url,params,cb})=>{
    console.log(params);
    return axios.post(url,{
        params
    }).then(res=>{
        cb();
        return {
            type:"getComment",
            getComment:res.data.result
        }
    })
}
export const delComment=({url,params,cb})=>{
    console.log(params);
    return axios.post(url,{
        params
    }).then(res=>{
        cb();
        return {
            type:'delComment',
            delComment:res.data.result,
        }
    })
}


export const uploadMenu=({url,params,cb})=>{
    console.log(params);
    return axios.post(url,{
        params
    }).then(res=>{
        cb();
        return {
            type:'uploadMenu',
            myMenu:res.data.result,
        }
    })
}
