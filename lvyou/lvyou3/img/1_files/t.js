(function(){
    var img = new Image();
    var ui = typeof(discuz_uid)=='undefined' ? 0 : discuz_uid;
    img.src = 'http://hm.lvye.cn/hm.gif?referrer=' + encodeURIComponent(document.referrer) + '&domain=' + encodeURIComponent(document.location.href) + '&ui=' + ui;
    img.onload = function(){
	img.onload = null;
    }
})();
