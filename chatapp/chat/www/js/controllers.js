angular.module('starter.controllers', ['ngCookies'])

//.controller('DashCtrl', function($scope) {})

.controller("DashCtrl", function($scope, $ionicSideMenuDelegate, $ionicTabsDelegate) {
		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};

		//在此作用域下绑定监听ionic视图在进入之前的事件
		$scope.$on('$ionicView.beforeEnter', function() {
			//关闭tab选项卡      
			$ionicTabsDelegate.showBar(false);
		});
		//在此作用域下绑定监听ionic视图在离开之前的事件  
		$scope.$on('$ionicView.beforeLeave', function() {
			//打开tab选项卡      
			$ionicTabsDelegate.showBar(true);
		});

	})
	.controller('ChatsCtrl', function($scope, Friends) {
		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//
		//$scope.$on('$ionicView.enter', function(e) {
		//});

		//$scope.chats = Chats.all();
		//$scope.remove = function(chat) {
		//  Chats.remove(chat);
		//};

		$scope.friends = Friends.all();
		$scope.remove = function(friend) {
			Friends.remove(friend);
		};
	})

.controller('ChatDetailCtrl', function($scope, $stateParams, Friends) {
	//$scope.chat = Chats.get($stateParams.chatId);
	$scope.friend = Friends.get($stateParams.friendId);
})

.controller('FriendCtrl', function($scope, Friends, $http, ApiEndpoint) {
//	$scope.friends = Friends.all();
//	$scope.remove = function(friend) {
//		Friends.remove(friend);
//	};

	$scope.aer = [];

	function getCookie(cname) {
		var arr = document.cookie.split(';');
		for(var i = 0; i < arr.length; i++) {
			var c = arr[i].trim(); //去空格
			var arrC = c.split("=");
			if(arrC[0] == cname) {
				return arrC[1];
			}
		}
		return "";
	}
	var cll = getCookie('user');
	$http({
		url: ApiEndpoint.url + '/ageg',
		method: 'POST',
		data: {
			col: cll,
		}
	}).then(function successCallback(resu) {
		console.log(resu.data.data[0].friendslist);
		$scope.friend = resu.data.data[0].friendslist;
		$http({
			url: ApiEndpoint.url + '/ager',
			method: 'POST',
			data: {
				friend: $scope.friend,
			}
		}).then(function successCallback(resui) {
			$scope.aer = resui.data.data
			console.log($scope.aer);

		});

	});

	//	$http({
	//		method: 'POST',
	//		url: ApiEndpoint.url + '/webapp',
	//		data: {
	//			data: ""
	//		}
	//	}).
	//	then(function successCallback(response) {
	//			//			console.log(response.data);
	//			//			$scope.Data = response.data.data
	//			//			console.log(response.data.data)
	//			alert('1')
	//
	//		}),
	//		function errorCallback(response) {
	//
	//		};

})

.controller('FriendPersonCtrl', function($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
})

.controller('FriendPerson', function($scope, $stateParams, Friends, $ionicTabsDelegate) {
		$scope.friend = Friends.get($stateParams.friendId);
		$scope.friends = Friends.all();
		$scope.remove = function(friend) {
			Friends.remove(friend);
		};
		//在此作用域下绑定监听ionic视图在进入之前的事件
		$scope.$on('$ionicView.beforeEnter', function() {
			//关闭tab选项卡      
			$ionicTabsDelegate.showBar(false);
		});
		//在此作用域下绑定监听ionic视图在离开之前的事件  
		$scope.$on('$ionicView.beforeLeave', function() {
			//打开tab选项卡      
			$ionicTabsDelegate.showBar(true);
		});
	})
	.controller('ChatDetail',
		function($scope, $stateParams, Friends, $ionicTabsDelegate, $http, ApiEndpoint) {
			$scope.chat = Friends.get($stateParams.friendId);
			$scope.chats = Friends.all();
			$scope.remove = function(friend) {
				Friends.remove(chat);
			};
			//			//在此作用域下绑定监听ionic视图在进入之前的事件
			//			$scope.$on('$ionicView.beforeEnter', function() {
			//				//关闭tab选项卡      
			//				$ionicTabsDelegate.showBar(false);
			//			});
			//			//在此作用域下绑定监听ionic视图在离开之前的事件  
			//			$scope.$on('$ionicView.beforeLeave', function() {
			//				//打开tab选项卡      
			//				$ionicTabsDelegate.showBar(true);
			//			});

			//发送群聊
			function getCookie(cname) {
				var arr = document.cookie.split(';');
				for(var i = 0; i < arr.length; i++) {
					var c = arr[i].trim(); //去空格
					var arrC = c.split("=");
					if(arrC[0] == cname) {
						return arrC[1];
					}
				}
				return "";
			}
			var cooks = getCookie('user');
			var socket = io(ApiEndpoint.url);
			$scope.cool = cooks
			$scope.kk = {
				send_content: ''
			};
			$scope.fa = function() {
					//發送
					socket.emit('broadcast', {
						data: {
							s: $scope.kk.send_content,
							c: cooks
						}
					});
					//清空输入框
					$scope.kk.send_content = "";
				}
				//接
			var arr = [];
			socket.on('broadcast', function(res) {
				$scope.$apply(function() {
					arr.push(res.data);
					$scope.faxin = arr;
					console.log(arr);
				})

			});

		})

.controller("InformationCtrl", function($scope, $ionicSideMenuDelegate, Friends, $ionicPopup, $http, ApiEndpoint) {
	//朋友圈
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	//通讯录
	$scope.friends = Friends.all();
	$scope.remove = function(friend) {
		Friends.remove(friend);
	};

	function getCookie(cname) {
		var arr = document.cookie.split(';');
		for(var i = 0; i < arr.length; i++) {
			var c = arr[i].trim(); //去空格
			var arrC = c.split("=");
			if(arrC[0] == cname) {
				return arrC[1];
			}
		}
		return "";
	}
	var cook = getCookie('user');
	console.log(cook);
	$scope.datan = {};
	$scope.datan.coki = cook
	console.log(ApiEndpoint)
	$http({
		url: ApiEndpoint.url + '/tupian',
		method: 'POST',
		data: $scope.datan,
		cache: false
	}).then(function successCallback(result) {

		console.log(result.data.data.imgs.sm_img);
		$scope.imgs = result.data.data.imgs.sm_img
	});

	$http({
		url: ApiEndpoint.url + '/cai',
		method: 'POST',
		data: $scope.datan
	}).then(function successCallback(response) {
		console.log(response.data)
		$scope.nickname = response.data.data.nickname
		$scope.sex = response.data.data.sex
		$scope.autograph = response.data.data.autograph
	});
	//个人资料
	$scope.rese = function() {
		$http({
			url: ApiEndpoint.url + '/information',
			method: 'POST',
			data: {
				nickname: $scope.nickname,
				sex: $scope.sex,
				autograph: $scope.autograph,
				cookie: cook
			}
		}).then(function successCallback(response) {
			if(response.status) {
				console.log(response)
			} else {
				alert('保存失败');
			}
		});

	}

	//昵称
	$scope.showPopup = function() {
			$scope.dataa = {}
				// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="text" ng-model="dataa.nickname">',
				title: '请填写你的昵称',
				scope: $scope,
				buttons: [{
					text: '取消'
				}, {
					text: '<b>确定</b>',
					type: 'button-positive',
					onTap: function(e) {
						if(!$scope.dataa.nickname) {
							//不允许用户关闭，除非他键入wifi密码
							e.preventDefault();
						} else {
							$scope.nickname = $scope.dataa.nickname;
						}
					}
				}, ]
			});

		}
		//性别

	$scope.showSex = function() {
			$scope.data = {}
				// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				templateUrl: 'templates/information-sex.html',
				title: '请选择你的性别',
				scope: $scope,
				buttons: [{
					text: '取消'
				}, {
					text: '<b>确定</b>',
					type: 'button-positive',
					onTap: function(e) {
						if(!$scope.data.sex) {
							//不允许用户关闭，除非他键入wifi密码
							e.preventDefault();
						} else {
							$scope.sex = $scope.data.sex;
						}
					}
				}, ]
			});

		}
		//个性签名
	$scope.showAutograph = function() {
			$scope.datac = {}
				// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="text" ng-model="datac.autograph">',
				title: '个性签名',
				scope: $scope,
				buttons: [{
					text: '取消'
				}, {
					text: '<b>确定</b>',
					type: 'button-positive',
					onTap: function(e) {
						if(!$scope.datac.autograph) {
							//不允许用户关闭，除非他键入wifi密码
							e.preventDefault();
						} else {
							$scope.autograph = $scope.datac.autograph;
						}
					}
				}, ]
			});

		}
		//
		//	//在此作用域下绑定监听ionic视图在进入之前的事件
		//	$scope.$on('$ionicView.beforeEnter', function() {
		//		//关闭tab选项卡      
		//		$ionicTabsDelegate.showBar(false);
		//	});
		//	//在此作用域下绑定监听ionic视图在离开之前的事件  
		//	$scope.$on('$ionicView.beforeLeave', function() {
		//		//打开tab选项卡      
		//		$ionicTabsDelegate.showBar(true);
		//	});

	//
	$scope.reader = new FileReader(); //创建一个FileReader接口
	$scope.form = { //用于绑定提交内容，图片或其他数据
		image: {},
	};
	$scope.thumb = {}; //用于存放图片的base64
	$scope.thumb_default = { //用于循环默认的‘加号’添加图片的框
		1111: {}
	};

	$scope.img_upload = function(files) { //单次提交图片的函数
		$scope.guid = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使用
		$scope.reader.readAsDataURL(files[0]); //FileReader的方法，把图片转成base64
		$scope.reader.onload = function(ev) {
			$scope.$apply(function() {
				$scope.thumb = {
					imgSrc: ev.target.result, //接收base64
				}
			});
		};

		var data = new FormData(); //以下为像后台提交图片数据
		data.append('img', files[0]);
		data.append('guid', $scope.guid);
		$http({
			method: 'POST',
			
			url: ApiEndpoint.url + "/upload/goodsImg/",
			data: data,
			headers: {
				'Content-Type': undefined
			},
			transformRequest: angular.identity
		}).success(function(result) {
			$scope.imgs = result.data
		})
	};

	//	$scope.img_del = function(key) { //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
	//		var guidArr = [];
	//		for(var p in $scope.thumb) {
	//			guidArr.push(p);
	//		}
	//		delete $scope.thumb[guidArr[key]];
	//		delete $scope.form.image[guidArr[key]];
	//	};
	$scope.submit_form = function() { //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，
		$http({
			method: 'post',
			url: ApiEndpoint.url + "/upload/Img/",
			data: {
				imgs: $scope.imgs,
				cookie: cook,
				cache: false
			}

		}).success(function(data) {
			console.log(data);
		})
	};

})

//登录
.controller('LoginCtrl', function($scope, $http, ApiEndpoint, $cookies) {
	$scope.master = {
		tel: "",
		password: ""
	}
	console.log($scope.master)
		//		$scope.user = angular.copy($scope.master);
	$scope.login = function() {
		$http({
				url: ApiEndpoint.url + "/chat/login/",
				method: "POST",
				data: $scope.master
			})
			.then(function successCallback(response) {
				console.log(response.data)
				if(response.data.status) {
//					alert("登录成功");
					location.href = '#/tab/dash';
					$cookies.put("user", $scope.master.tel);
				} else {
					alert("登陆失败");
				}
			}),
			function errorCallback(response) {

			};
	}

})

//注册
.controller('RegisterCtrl', function($scope, $http, ApiEndpoint) {
	$scope.master = {
		tel: "",
		password: ""
	}
	console.log($scope.master)
		//		$scope.user = angular.copy($scope.master);
	$scope.register = function() {
		$http({
				url: ApiEndpoint.url + "/chat/register/",
				method: "POST",
				data: $scope.master
			})
			.then(function successCallback(response) {
				console.log(response.data)
				if(response.data.status) {
					alert("注册成功")
					location.href = '#/login'
				} else {
					alert("已有账号")
				}
			}),
			function errorCallback(response) {

			};
	}

})

//添加好友
.controller('AddCtrl', function($scope, $http, ApiEndpoint) {

		function getCookie(cname) {
			var arr = document.cookie.split(';');
			for(var i = 0; i < arr.length; i++) {
				var c = arr[i].trim(); //去空格
				var arrC = c.split("=");
				if(arrC[0] == cname) {
					return arrC[1];
				}
			}
			return "";
		}
		var cook = getCookie('user');

		$scope.datan = {};
		$scope.datan.coki = cook;
		//自己信息
		$http({
			url: ApiEndpoint.url + '/cai',
			method: 'POST',
			data: $scope.datan
		}).then(function successCallback(response) {
			console.log(response.data.data)
			$scope.nickname = response.data.data.nickname
			$scope.sex = response.data.data.sex
			$scope.autograph = response.data.data.autograph
		});

		//对方信息
		$scope.friend = {
			tel: "",
		};
		$scope.id = "";

		$scope.sou = function() {
				$http({
						url: ApiEndpoint.url + "/xinxi",
						method: "POST",
						data: $scope.friend
					})
					.then(function successCallback(response) {
						console.log(response.data.data);
						$scope.fu = response.data;
						$scope.friendimg = response.data.data.imgs.sm_img;
						$scope.friendname = response.data.data.nickname;
						$scope.id = response.data.data.tel;
						console.log(response.data.data.tel)
					})

			}
			//

		$scope.kong = {}
		$scope.jia = function() {
			$http({
				url: ApiEndpoint.url + '/tian',
				method: 'POST',
				data: {
					m: cook,
					id: $scope.id
				}
			}).then(function successCallback(result) {
				alert('消息已发送');
				//				console.log(result.data.data.name);
				//				$scope.kong.tianzhang = result.data.data.name;
				//				$scope.kong.tiantu = result.data.data.imgs.sm_img;
				//				$scope.kong.ids = result.data.data.usersName
				//發送
				//				socket.emit('broadcast', {
				//					data: $scope.kong,
				//				});
			});

		};

	})
	//同意好友
	.controller('XinCtrl', function($scope, $http, ApiEndpoint) {
		function getCookie(cname) {
			var arr = document.cookie.split(';');
			for(var i = 0; i < arr.length; i++) {
				var c = arr[i].trim(); //去空格
				var arrC = c.split("=");
				if(arrC[0] == cname) {
					return arrC[1];
				}
			}
			return "";
		}
		var cooks = getCookie('user');
		$scope.ma = {};
		$scope.ma.cookl = cooks;
		$scope.art = [];
		$http({
			url: ApiEndpoint.url + '/tong',
			method: 'POST',
			data: {
				cookll: $scope.ma.cookl
			}
		}).then(function successCallback(result) {
			//			console.log(result.data.data[0].dailist);
			$http({
				url: ApiEndpoint.url + '/dai',
				method: 'POST',
				data: {
					fdId: result.data.data[0].waitlist
				}
			}).then(function successCallback(result) {
				$scope.art = result.data.data;
				console.log($scope.art);
			});
		});
		//		
		//		$scope.tong = function() {
		//			$http({
		//				url: ApiEndpoint.url + '/tong',
		//				method: 'POST',
		//				data: {
		//					cookll: $scope.ma.cookl
		//				}
		//			}).then(function successCallback(result) {
		//				$scope.fuu = result.data;
		//				console.log(result.data)
		//			});
		//
		//		};
		$scope.agerr = function(even) {
			$scope.even = even;
			console.log($scope.even);
			$http({
				url: ApiEndpoint.url + '/agerr',
				method: 'POST',
				data: {
					cookll: $scope.ma.cookl,
					agerr: $scope.even
				}
			}).then(function successCallback(resu) {
				alert("添加成功");
			});
		};

	})
	.controller('AccountCtrl', function($scope) {
		$scope.settings = {
			enableFriends: true
		};

	});