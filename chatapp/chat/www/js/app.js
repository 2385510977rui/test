// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('left');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: '/tab',
		cache: false,
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.dash', {
			url: '/dash',
			cache: false,
			views: {
				'tab-dash': {
					templateUrl: 'templates/tab-dash.html',
					controller: 'InformationCtrl'
				}
			}
		})
		.state('information', {
			url: '/dash/information',
			cache: false,
			templateUrl: 'templates/information.html',
			controller: 'InformationCtrl'
				//			controller: 'DashCtrl'

		})
		.state('set-up', {
			url: '/dash/set-up',

			templateUrl: 'templates/set-up.html',
			//			controller: 'DashCtrl'
			controller: 'InformationCtrl'

		})
		.state('tab.friends', {
			url: '/friends',
			views: {
				'tab-friends': {
					templateUrl: 'templates/tab-friends.html',
					controller: 'FriendCtrl'
				}
			}
		})
		.state('tab-friend-person', {
			url: '/friends/:friendId',
			templateUrl: 'templates/friend-person.html',
			controller: 'FriendPerson'
		})

	.state('tab.chats', {
			url: '/chats',
			views: {
				'tab-chats': {
					templateUrl: 'templates/tab-chats.html',
					controller: 'ChatDetail'
				}
			}
		})
		.state('tab-chat-detail', {
			url: '/chats/:chatId',
			templateUrl: 'templates/chat-detail.html',
			controller: 'ChatDetail'
		})
		.state('add-friends', {
			url: '/add-friends',
			cache: false,
			templateUrl: 'templates/add-friends.html',
			controller: 'AddCtrl'
		})
		.state('xin-friends', {
			url: '/xin-friends',
			cache: false,
			templateUrl: 'templates/xin-friends.html',
			controller: 'XinCtrl'
		})
		//登录
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl'
		})
		//		注册
		.state('register', {
			url: '/register',
			templateUrl: 'templates/register.html',
			controller: 'RegisterCtrl'
		})
		//修改头像
		.state('head', {
			url: '/head',
			templateUrl: 'templates/head.html',
			controller: 'InformationCtrl'
		})

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'InformationCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	//进入的页面
	$urlRouterProvider.otherwise('/tab/chats');

});