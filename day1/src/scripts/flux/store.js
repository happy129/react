




// Store 保存整个应用的状态。它的角色有点像 MVC 架构之中的Model 。

//  emit 发送事件
//  on  监听事件
//  once 监听一次 
// EventEmitter.prototype.on .emit .once 
import {EventEmitter} from "events";  // node 自带模块  

export const store = {
    ...{

        items:["node","vue","react","小程序","angular","react-navtive","flutter","weex"],
    
        getItems(){
            return this.items;
        },
    
        descItems(){
            this.items.pop(); 
            console.log(this.items);
        },

        changeItems(text){
            console.log("004 通知 store 修改数据 ")
            this.items.push(text);
            console.log(this.items);
        },
        emitChangeItems(){
            console.log("005 emit change ")
            this.emit("changeItems")
        },
        addListenerOnItems(callback){
            this.on("changeItems",callback)
        }
    },
    ...EventEmitter.prototype
}

