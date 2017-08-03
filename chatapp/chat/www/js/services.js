angular.module('starter.services', [])

//跨域
.service('ApiEndpoint', function() {
    this.url = 'http://localhost:3003'
//         this.url = 'http://192.168.0.122:3003'
})


//跨域
.factory('Api', function($http, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint)

    var getApiData = function() {
        return $http.get(ApiEndpoint.url + '/tasks')
            .then(function(data) {
                console.log('Got some data: ', data);
                return data;
            });
    };

    return {
        getApiData: getApiData
    };
})

.factory('Friends', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [{
        id: 0,
        name: '科比',
        lastText: '你在干什么?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: '詹姆斯',
        lastText: '明天什么时候去吃饭?',
        face: 'img/max.png'
    }, {
        id: 2,
        name: '哈登',
        lastText: '我就在学校',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: '库里',
        lastText: '周末有什么安排?',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: '保罗',
        lastText: '好',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return friends;
        },
        remove: function(friend) {
            friends.splice(friends.indexOf(friend), 1);
        },
        get: function(friendId) {
            for (var i = 0; i < friends.length; i++) {
                if (friends[i].id === parseInt(friendId)) {
                    return friends[i];
                }
            }
            return null;
        }
    };
});
