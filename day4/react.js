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
        db.collection('menu').find(obj, {}).sort({ _id: 1 }).limit(limit).toArray((err, result) => {
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


router.get('/getMenu', (req, res) => {
    var query = req.query;
    var limit = query.limit * 1 || 0;
    conn((err, db) => {
        setError(err, res, db);
        db.collection('menu').find().sort({ _id: -1 }).limit(limit).toArray((err, result) => {
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
        db.collection('comment').find({ menuId }).sort({time:-1}).toArray((err, result) => {
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

// 查询我的评论信息
router.post('/getMyComment',(req,res)=>{
    // post请求使用req.body.参数
    // get请求使用req.query.参数
    var username = req.body.username;
    console.log('用户名：'+username);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('comment').find({ username }).sort({time:-1}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "获取我的评论成功",
                result
            })
            db.close();
        })
    })
})

// 更新我的评论列表
router.post('/updateComment',(req,res)=>{
    var commentInfo = req.body.commentInfo
    var id = req.body.id;
    var nowTime = new Date();
    var time = dateFormat(nowTime);
    var obj = {};
    if (id) {
        console.log(id);
        obj._id = ObjectID(id);
        console.log(obj._id);
    }
    console.log('修改后的评论'+commentInfo,'编号'+id); 
    conn((err,db)=>{
        setError(err, res, db);
        db.collection('comment').update(obj,{
            $set: {
                commentInfo: commentInfo,
                time,
            }
        })
        res.json({
            code: 200,
            msg: "用户评论修改成功",
        })
        db.close();

    })
})

// 删除一条我的评论
router.post('/delComment',(req,res)=>{
    var id = req.body.id;
    var obj = {};
    if (id) {
        console.log(id);
        obj._id = ObjectID(id);
        console.log(obj._id);
    }
    conn((err,db)=>{
        setError(err, res, db);
        db.collection('comment').remove(obj);
        res.json({
            code: 200,
            msg: "评论删除成功",
        })
        db.close();

    })
})


// 图像上传
const multer = require('multer');
var storage = multer.diskStorage({
        //将上传的文件存储在指定的位置（不存在的话需要手动创建）
        destination: function(req, file, cb) {
            cb(null, './public/avatar')
        },
        //将上传的文件做名称的更改
        filename: function(req, file, cb) {
            var fileformat = (file.originalname).split('.');
            console.log(file);
            cb(null, Date.now() + file.originalname);
        }
    })
    //创建multer对象
var upload = multer({ storage: storage })
const avatarUpload = upload.any();

// 头像上传 
router.post("/upload-avatar", avatarUpload, (req, res) => {
    console.log(req.files);
    console.log("上传头像");
    var newName = req.files[0].path;
    console.log(newName);

    var username = aesDecrypt(req.session.token, keys);
    console.log(username);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("users").update({
            username
        }, {
            $set: {
                avatar: newName
            }
        }, (err, result) => {
            res.json({ msg: "图片上传成功", code: 200, imgUrl: newName });
            db.close();
        })
    })
})


//用户上传菜谱与图片
router.post('/uploadMenu',(req,res)=>{
    var menuName = req.body.menuName;
    var username = req.body.username;
    var foods = req.body.foods;
    var describe = req.body.describe;
    var menuTime = req.body.menuTime;
    var nowTime = new Date();
    var time = dateFormat(nowTime);
    // 输出菜谱信息
    console.log(menuName+'和'+username);
    conn((err,db)=>{
        setError(err, res, db);
        db.collection('myMenu').insert({menuName,username,foods,describe,time})

        setError(err, res, db);
        res.json({
            code: 200,
            msg: "菜谱上传成功",
        })
        db.close();
    })
}) 

router.post('/getMyMenu',(req,res)=>{
    var username = req.body.username;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('myMenu').find({username}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "获取我的菜谱成功",
                result
            })
            db.close();
        })
    })
})

module.exports = router;