// vue项目的路由模块

const express = require('express');

var router = express.Router();
var { conn } = require("./utils/db");
var {series,waterfall} = require('async');
var { setError, aesEncrypt, aesDecrypt, keys,dateFormat } = require("./utils");
var { getConn } = require("./utils/mongoose");
var { ObjectID } = require("mongodb");
var util = require('./config/index.js');
const jwt = require('jsonwebtoken'); //用来生成token

router.get('/index', (req, res) => {
    res.json({
        msg:'这是react项目的后台接口***********'
    })
})

// 查询菜谱信息
router.get('/getMenulist', (req, res) => {
    var query = req.query;
    var limit = query.limit * 1 || 0;
    var keyword = query.keyword;
    var obj = {};
    if (keyword) {
        obj = {
            $or: [
                { name: new RegExp(keyword) },
                { 'type.text': new RegExp(keyword) }
            ]
        }
    }
    conn((err, db) => {
        setError(err, res, db);
        db.collection('menu').find(obj, {}).sort({ _id: -1 }).limit(limit).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: '查询成功',
                result
            })
            db.close();
        })
    })
})

// 分类展示菜谱信息接口
router.get('/getMenuTypes', (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection('menu').distinct('type', (err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: '获取商品分类成功',
                result
            })
            db.close();
        })
    })
})


// 根据商品 id查询商品详情  商品详情接口
router.get("/getMenuOne", (req, res) => {
    var menuId = req.query.menuId;
    console.log('menudId'+menuId);
    var obj = {};
    if (menuId) {
        obj._id = ObjectID(menuId);
    }
    conn((err, db) => {
        setError(err, res, db);
        db.collection("menu").findOne(obj, (err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "查询 商品详情数据 成功",
                result
            })
            db.close();
        })
    })
})





// 短信验证码接口

// 生成四位随机验证码
function getCode (){
    return 1000+Math.floor(Math.random()*9000);
}

// 获取短信验证码

router.post("/sendCode", (req, res) => {
    const mobile = req.body.mobile;  // 需要发送得手机号 
    const param = getCode();
    util.getResult(param, mobile).then(function (response) {
        if (response.data.code == '000000') {
            //数据插入数据库 
            conn((err, db) => { 
                setError(err, res, db);
                db.collection("codes").insert({
                    mobile,
                    code: param,
                    time: new Date().getTime()
                }, (err, result) => {
                    setError(err, res, db);
                    res.json({
                        msg: '发送成功',
                        code: response.data
                    });
                })
            })
        
        } else {
            res.json({
                msg: '发送失败 未知错误',
                code: response.data
            });
        }

    }, function (err) {
        res.json({
            msg: '数据库错误',
            code: 500
        })

    })
})


// 检验验证码是否成功
router.post("/testCode",(req,res)=>{
    var mobile=req.body.mobile;
    var code=req.body.code*1;

    console.log(mobile,code);
    conn((err,db)=>{
        setError(err,res,db);
        var codes=db.collection("codes");

        codes.findOne({mobile,code},(err,result)=>{
            setError(err,res,db);
            if(result){
                var time=new Date().getTime();
                var alias=mobile+"wuhan1901"+code;
                var token=aesEncrypt(alias,keys);
                console.log(token);
                var username = mobile;
                //验证码输入时间控制在60s以内,否则超时
                if(time-result.time<60*1000){
                    res.json({
                        msg:"验证码通过",
                        code:200,
                        type:1,
                        token,
                        username,
                    })
                }else{
                    res.json({
                        msg:"验证码失效",
                        code:200,
                        type:0
                    })
                }
            }else{
                res.json({
                    msg:"验证码不匹配",
                    code:200,
                    type:0
                })
            }
        })
    })
})

// 用户插入评论数据
router.post('/insertComment',(req,res)=>{
    var name=req.body.menuName;
    var commentInfo=req.body.commentInfo;
    var username=req.body.username;
    var menuId=req.body.menuId;
    var nowTime = new Date();
    var time = dateFormat(nowTime);
    console.log(time);
    console.log(name,commentInfo,username,menuId);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('comment').insert({ name,commentInfo,username,menuId,time });
        res.json({
            code: 200,
            msg: "用户成功提交评论数据",
        })
        db.close();
    })
})

// 菜单详情中展示用户评论信息
router.get('/getComment',(req,res)=>{
    // post请求使用req.body.参数
    // get请求使用req.query.参数
    var menuId = req.query.menuId;
    conn((err, db) => {
        setError(err, res, db);
        db.collection('comment').find({ menuId }).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "获取菜品评论成功",
                result
            })
            db.close();
        })
    })
})



module.exports = router;