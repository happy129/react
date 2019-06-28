// vue项目的路由模块

const express = require('express');

var router = express.Router();
var { conn } = require("./utils/db");
var async = require('async');
var { setError, aesEncrypt, aesDecrypt, keys } = require("./utils");
var { getConn } = require("./utils/mongoose");
var { ObjectID } = require("mongodb");
const jwt = require('jsonwebtoken'); //用来生成token

router.get('/', (req, res) => {
    res.send('vue项目的接口地址.');
})

router.get('/demo', (req, res) => {
    res.json({
        msg: '零落成泥碾作尘,只有香如故.',
        code: 200,
        word: '真棒'
    })
})


// 查询商品信息   显示全部商品接口
router.get('/goodslist', (req, res) => {
    var limit = req.query.limit * 1 || 0;
    conn((err, db) => {
        setError(err, res, db);
        db.collection('goodslist').find({}, { name: 1, price: 1, oldprice: 1, discount: 1, img: 1, type: 1 }).sort({ _id: -1 }).limit(limit).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: '获取全部商品信息',
                result
            })
            db.close();
        })
    })
})

// 查询商品信息：  查询接口
router.get('/getGoodList', (req, res) => {
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
        db.collection('goodslist').find(obj, {}).sort({ _id: -1 }).limit(limit).toArray((err, result) => {
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


// 根据商品 id查询商品详情  商品详情接口
router.get("/getGoodOne", (req, res) => {
    var goodId = req.query.goodId;
    var obj = {};
    if (goodId) {
        console.log(goodId);
        obj._id = ObjectID(goodId);
        console.log(obj._id);
    }
    conn((err, db) => {
        setError(err, res, db);
        db.collection("goodslist").findOne(obj, (err, result) => {
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

// 分类展示商品接口
router.get('/getGoodTypes', (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection('goodslist').distinct('type', (err, result) => {
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



// 登录

router.post("/login", (req, res) => {
    var body = req.body;
    console.log(req.body);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("user").findOne(body, (err, result) => {
            setError(err, res, db);
            if (result) {
                const token = aesEncrypt(body.username, keys);
                //  console.log(body.username);
                req.session.token = token;
                res.json({
                    code: 200,
                    msg: "登录成功",
                    type: 1,
                    name: body.username,
                    token
                });
            } else {
                res.json({
                    code: 300,
                    msg: "登录失败-login",
                    type: 0,
                });
            }
        })
    })
})


// 注册  提交用户注册信息到数据库中
router.post('/register', (req, res) => {
    var body = req.body;
    console.log(body);
    conn((err, db) => {
        setError(err, res, db);

        var user = db.collection('user');
        async.waterfall([
            (callback) => {
                user.findOne({ username: body.username, tel: body.tel }, (err, result) => {
                    // console.log(result);
                    callback(err, result);
                })
            },
            (args, callback) => {
                if (!args) {
                    // 用户未注册时  将其注册信息插入到数据库中
                    user.insert(body, (err, result) => {
                        callback(err, {
                            code: 200,
                            type: 1,
                            msg: '注册成功',
                            result
                        });
                    })
                } else {
                    // 用户已经注册过  输出提示信息用户已经注册过
                    callback(null, {
                        code: 200,
                        type: 0,
                        msg: '用户名或手机号已经注册,请重新输入注册信息',
                    })
                }
            }
        ], function(err, result) {
            setError(err, res, db);
            res.json(result);
            // 关闭数据库
            db.close();
        })
    })
})

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


// 加入商品购物车
router.post('/addGoodsToCart', (req, res) => {
    var body = req.body;
    var token = req.session.token;
    var username = aesDecrypt(token, keys);
    body.good = JSON.parse(body.good);
    body.count = body.count * 1;
    console.log(body);
    // console.log(username);

    // 连接数据库  判断用户购物车是否有此商品  若有则更新商品数量  若有 则插入一条商品信息及数量
    conn((err, db) => {
        setError(err, res, db);
        var mycart = db.collection('mycart');

        async.waterfall([
            (callback) => {
                mycart.findOne({ username, goodId: body.goodId }, (err, result) => {
                    console.log(result);
                    callback(err, result);
                })
            },
            (args, callback) => {
                if (args) {
                    // 有商品更新商品数量
                    mycart.update({
                        username,
                        goodId: body.goodId
                    }, {
                        $inc: {
                            count: body.count
                        }
                    }, (err, result) => {
                        callback(err, {
                            msg: '购物车商品数量更新成功',
                            code: 200,
                            type: 0,
                            result,
                        })
                    })

                } else {
                    // 无商品插入商品
                    body.username = username;
                    body.time = new Date();
                    mycart.insert(body, (err, result) => {
                        callback(err, {
                            msg: '商品已成功加入购物车',
                            code: 200,
                            type: 1,
                            result,
                        })
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json(result);
            db.close();
        })
    })
})


// 查看用户的购物车数据
router.post('/getCartData', (req, res) => {
    var username = req.body.username;
    console.log(username);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('mycart').find({ username }).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "购物车数据查询成功",
                result
            })
            db.close();
        })
    })
})

// 改变购物车商品数量  +/-
router.post('/changeNum', (req, res) => {
    var username = req.body.username;
    var goodId = req.body.goodId;
    var count = req.body.count;
    console.log('用户名' + username, '商品id' + goodId, '数量' + count);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('mycart').update({ username, goodId }, {
            $set: {
                count: count,
            }
        })
        res.json({
            code: 200,
            msg: "购物车数据更新成功",
        })
        db.close();
    })
})


// 删除一条商品记录
router.post('/delGoods', (req, res) => {
    var username = req.body.username;
    var goodId = req.body.goodId;
    console.log('用户名' + username, '商品id' + goodId);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('mycart').deleteOne({ username, goodId })
        res.json({
            code: 200,
            msg: "购物车商品删除成功",
        })
        db.close();
    })
})

// 用户订单信息
router.post('/order', (req, res) => {
    var name = req.body.username;
    console.log('用户名' + name);
    var list = req.body.list;
    console.log('这是list' + list);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('order').deleteMany({ username: name });
        db.collection('order').insert(list);
        res.json({
            code: 200,
            msg: "结算信息生成成功",
        })
        db.close();
    })
})

// 获取用户订单信息
router.post('/getOrder', (req, res) => {
    var username = req.body.username;
    conn((err, db) => {
        setError(err, res, db);
        db.collection('order').find({ username }).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "订单信息生成成功",
                result
            })
            db.close();
        })
    })
})

// 添加用户收货地址等信息
router.post('/location', (req, res) => {
    var username = req.body.username;
    var location = req.body.content;
    console.log('这是username' + username + '这是地址' + location);
    conn((err, db) => {
        setError(err, res, db);
        db.collection('location').insert({ username, location });
        res.json({
            code: 200,
            msg: "收货地址等信息添加成功",
        })
        db.close();
    })
})

// 获取用户已有的收获地址等信息
router.post('/getLocation', (req, res) => {
    var username = req.body.username;
    conn((err, db) => {
        setError(err, res, db);
        db.collection('location').find({ username }).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "成功获取收获地址信息",
                result
            })
            db.close();
        })
    })
})

// 短信验证码接口




module.exports = router;