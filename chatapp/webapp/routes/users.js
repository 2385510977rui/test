var express = require('express');
var router = express.Router();
var models = require("../models/models");

var images = require("images");
var multiparty = require('multiparty');
const uuidV4 = require('uuid/v4');

var User = models.User;
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/webapp', function(req, res) {
	console.log(req.body)
	res.status(200).json({
		status: false,
		message: '已有账号'
	});
});

//登录
router.post('/chat/login/', function(req, res) {
	var user = new User(req.body);
	console.log(req.body);
	User.find({
		'tel': req.body.tel
	}, function(err, users) {
		if(!err) {
			User.find({
				'password': req.body.password
			}, function(err, users) {
				if(users.length > 0) {
					res.cookie('tel', req.body.tel);
					res.json({
						status: true,
						message: '登陆成功！'
					});
					//					res.end();
				} else {
					res.json({
						status: false,
						message: '密码错误！'
					});
					//					res.end();
				}
			});
		} else {
			res.json({
				status: false,
				message: '用户名或密码错误！'
			});
			//			res.end();
		}
	});
});

//注册

router.post("/chat/register/", function(req, res) {
	var user = new User(req.body);
	console.log(req.body);
	User.find({
		'tel': req.body.tel
	}, function(err, users) {
		if(!err) {
			console.log(users);
			if(users.length > 0) {
				console.log('用户名已存在！');
				res.end();
			} else {
				console.log('用户名可以使用！');
				var user = new User(req.body);
				user.save(function(err) {
					if(err) {
						res.status(200).json({
							status: false,
							message: '注册失败！'
						});
						return;
					} else {
						res.status(200).json({
							status: true,
							message: '注册成功！'
						});
					}
				});
			}
		};
	});

});
//个人信息
router.post('/cai', function(req, res) {
	var user = new User(req.body);
	User.findOne({
		'tel': req.body.coki
	}, function(err, user) {
		if(!err) {
			res.status(200).json({
				status: true,
				data: user
			});
		}
	})
});

//router.post("/cai", function(req, res) {
//	console.log(req.body);
//	var phone = req.query.tel;
//	User.find({
//			'tel': phone
//		})
//		.limit(1)
//		.select('nickname sex avator')
//		.exec(function(err, users) {
//			if(err) {
//				console.log(err);
//				return;
//			} else {
//				if(users.length) {
//					res.json({
//						status: true,
//						message: '获取成功！',
//						data: users[0]
//					});
//
//				}
//			}
//		});
//});

router.post('/information', function(req, res) {
		console.log(req.body);
		var user = new User(req.body);
		User.update({
			'tel': req.body.cookie
		}, {
			$set: {
				sex: req.body.sex,
				nickname: req.body.nickname,
				autograph: req.body.autograph
			}
		}, function() {
			res.status(200).json({
				status: true,
				message: '存储成功！'
			});
		})
	})
	//上传图片
router.post('/upload/goodsImg/', function(req, res) {
	var form = new multiparty.Form();

	form.parse(req, function(err, fields, files) {
		var size = files.img[0].size;
		var path = files.img[0].path;
		var type = files.img[0].headers["content-type"];
		var fileTag = type.split("/")[1];
		var filename = uuidV4();
		var fileFolder = "/images/details/";
		var imghp='http://localhost:3003'
//		var imghp='http://210.209.93.44:3018'
		if(type.indexOf("image") > -1) {
			if(size > 2048000) {
				res.status(200).json({
					status: false,
					message: "图片体积过大，请重新选择！"
				});
			} else {
				images(files.img[0].path) //Load image from file 
					//加载图像文件
					.size(800, 800)
					.save("public" + fileFolder + "lg_" + filename + "." + fileTag, { //Save the image to a file,whih quality 50
						quality: 70 //保存图片到文件,图片质量为50
					});
				images(files.img[0].path) //Load image from file 
					//加载图像文件
					.size(310, 310)
					.save("public" + fileFolder + "md_" + filename + "." + fileTag, { //Save the image to a file,whih quality 50
						quality: 70 //保存图片到文件,图片质量为50
					});
				images(files.img[0].path) //Load image from file 
					//加载图像文件
					.size(60, 60)
					.save("public" + fileFolder + "sm_" + filename + "." + fileTag, { //Save the image to a file,whih quality 50
						quality: 70 //保存图片到文件,图片质量为50
					});

				var imgUrl = {
					
//						"lg_img":imghp+ fileFolder + "lg_" + filename + "." + fileTag,
//						"md_img": fileFolder + "md_" + filename + "." + fileTag,
						"sm_img": imghp+fileFolder + "sm_" + filename + "." + fileTag,
					}
					//返回图片地址
				res.status(200).json({
					status: true,
					message: "上传成功！",
					data: imgUrl
				});
			}
		} else {
			res.status(200).json({
				status: false,
				message: "图片格式不正确，请重新选择！"
			});
		}
	});
});

router.post('/upload/Img/', function(req, res) {
	console.log(req.body)
	var user = new User(req.body);
	User.update({
			tel: req.body.cookie
		}, {
			imgs: req.body.imgs
		},
		function() {
			res.status(200).json({
				status: true,
				message: '存储成功！'
			});
		})
})

router.post('/tupian', function(req, res) {
	var user = new User(req.body);
	User.findOne({
		'tel': req.body.coki
	}, function(err, user) {
		if(!err) {
			res.status(200).json({
				status: true,
				data: user
			});
		}
	})
});
//搜索好友

router.post("/xinxi", function(req, res) {
	console.log(req.body);
	var phone = req.body.tel;
	User.find({
			'tel': phone
		})
		.select('nickname imgs tel')
		.exec(function(err, users) {
			if(err) {
				console.log(err);
				return;
			} else {
				if(users.length) {
					res.json({
						status: true,
						message: '获取成功！',
						data: users[0]
					});

				}
			}
		});
});
//添加按钮
router.post("/tian", function(req, res) {
	console.log(req.body);
	User.update({
			"tel": req.body.m
		}, {
			$addToSet: {
				"dailist": req.body.id
			}
		},
		function(err) {
			if(err) {
				res.send(500);
				console.log(err);
			} else {
				res.json({
					status: true,
					message: 'success',
				});
			}
		});
	User.update({
			"tel": req.body.id
		}, {
			$addToSet: {
				"waitlist": req.body.m
			}
		},
		function(err) {
			console.log(err);
		}
	);
});
//
router.post('/tong', function(req, res) {
	//  console.log(req.body.cookll);
	User.find({
			"tel": req.body.cookll
		})
		.select('waitlist')
		.exec(function(err, msg) {
			console.log(msg);
			if(err) {
				console.log(err)
			} else {
				res.status(200).json({
					status: true,
					message: 'success',
					data: msg
				});
			}
		});
});
//
router.post('/dai', function(req, res) {
	User.find({
			"tel": req.body.fdId
		})
		.select('nickname imgs tel')
		.exec(function(err, msg) {
			console.log(msg);
			if(err) {
				console.log(err)
			} else {
				res.status(200).json({
					status: true,
					message: 'success',
					data: msg
				});
			}
		});

});
//
router.post("/agerr", function(req, res) {
	//	console.log(req.body.agerr);
	var user = new User(req.body);

	User.update({
			tel: req.body.cookll
		}, {
			$pull: {
				waitlist: req.body.agerr
			},
			$push: {
				friendslist: req.body.agerr
			}
		},
		function(err, users) {

		})
	User.update({
			tel: req.body.agerr
		}, {
			$pull: {
				dailist: req.body.cookll
			},
			$push: {
				friendslist: req.body.cookll
			}
		},
		function(err, users) {
			if(err) {
				console.log(err)
			} else {
				res.status(200).json({
					status: true,
					messsage: '修改成功！'
				})
			}
		})

})
//
router.post('/ageg', function(req, res) {
	User.find({
			"tel": req.body.col
		})
		.select('friendslist')
		.exec(function(err, msg) {
			//			console.log(msg);
			if(err) {
				console.log(err)
			} else {
				res.status(200).json({
					status: true,
					message: 'success',
					data: msg
				});
			}
		});
});
//渲染通信录
router.post('/ager', function(req, res) {
	User.find({
			"tel": req.body.friend
		})
		.select('nickname imgs tel')
		.exec(function(err, msg) {
			console.log(msg);
			if(err) {
				console.log(err)
			} else {
				res.status(200).json({
					status: true,
					message: 'success',
					data: msg
				});
			}
		});

});



//
router.setSocket = function(server) {
	var io = require("socket.io")(server);
	//connection建立连接
	io.on('connection', function(socket) {
		//群聊
		socket.on('broadcast', function(data) {
			console.log(data);
			//发送事件 ：hello: 'world'
//			socket.broadcast.emit('broadcast', data);
			io.sockets.emit('broadcast', data);

		});
		//私聊
		socket.on("private", function(data) {
			console.log(data);
			var room = '';
			var m = data.to;
			var n = data.from;
			if(m > n) {
				room = m + n;
			} else {
				room = n + m;
			}
			socket.join(room);
			socket.to(room).emit('private', data);
		})
	});
}

module.exports = router;