

export const ajax = {
    get(url,params){
        const promise = new Promise(function(resolve,reject){
            const hander = function(){
                if(this.readyState!==4){
                    return ;
                }
                if(this.status==200){
                    resolve({data:this.response});
                }else{
                    reject(new Error(this.statusText));
                }
            }
            // ajax创建请求的4步
            // 1.创建请求头
            var xhr = new XMLHttpRequest();
            
            // 2.打开请求头
            xhr.open("GEt",url,true);
            // 3.send发送请求
            xhr.send();
            // 4.监听后台返回数据
            xhr.onreadystatechange = hander;
        })
        return promise;
    },
    post(){

    }

}


