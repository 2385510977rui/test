(function(){
var getHost = function(url) {
            var host = "null";
            if (typeof url == "undefined"
                    || null == url)
                url = window.location.href;
            var regex = /.*\:\/\/([^\/|:]*).*/;
            var match = url.match(regex);
            if (typeof match != "undefined"
                    && null != match) {
                host = match[1];
            }
            if (typeof host != "undefined"
                    && null != host) {
                var strAry = host.split(".");
                if (strAry.length > 1) {
                    host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
                }
            }
            return host;
        }

var site_name = getHost();

function getcookie(name){
    var arr, reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    return '';
}

var trackdomain = "lvye.com";

var uid = 0;
function mygetlogin(){
	if (site_name == "lvye.com" ){
		var a = document.getElementById("login_in");
		var href = a.getAttribute('href',"");
		if (href.indexOf("accounts/login") > -1) {
			return 1;
		}
		else if (href.indexOf("accounts/logout") > -1) {
			return 2;
		}
		else{
			return 0;
		}
	}
	else if (site_name == "lvye.cn"){
		var header = document.getElementsByTagName("header")[0];
		var divs = header.getElementsByTagName("div");
		for (var i=0;i<divs.length;i++){
			if (divs[i].className.indexOf("identity") > -1){
				var a = divs[i].getElementsByTagName("a")[0]
				var href = a.getAttribute('href',"");
				var parts = href.split("-");
				uid = parts[parts.length - 1].split(".")[0];
				return 2;
			}
		}
		return 1;
	}
	return 0;
}

function getlogin(){
	try{
		return mygetlogin();
    }catch(e){
        return 0;
    }
}

var loginstat = getlogin();


var referrer = encodeURIComponent(document.referrer);
function ajaxsend(url){
    var img = new Image();
    img.src = url;
}

var f1='';
var f2='';
var f3='';
function mygetforum(){
	if (site_name == "lvye.cn" ){
		var div = document.getElementById("pt");
		var lis = div.getElementsByTagName("li");
		for (var i=0;i<lis.length;i++){
			if (i < 2) {continue;}
			else if (i == 2){
				if( lis[i].getElementsByTagName("a").length >0) { f1 = encodeURIComponent(lis[i].getElementsByTagName("a")[0].innerText);}
				else{ f1 = encodeURIComponent(lis[i].innerText);}
				}
			else if (i == 3){ 
				if( lis[i].getElementsByTagName("a").length >0) { f2 = encodeURIComponent(lis[i].getElementsByTagName("a")[0].innerText);}
				else{ f2 = encodeURIComponent(lis[i].innerText);}
				}
			else if (i == 4){ 
				if( lis[i].getElementsByTagName("a").length >0) { f3 = encodeURIComponent(lis[i].getElementsByTagName("a")[0].innerText);}
				else{ f3 = encodeURIComponent(lis[i].innerText);}
				}
			}
	
	}
}
try{ mygetforum();}
catch(e){}


var ClickID = 0;

function ajaxlog(log){
    var rand_log_id = Math.random();
    ajaxsend(document.location.protocol+"//tracklog."+trackdomain+"/empty.js.gif?fromid=referrer&site_name="+site_name+"&uid="+uid+"&loginstat="+loginstat+"&"+log+"&clickid="+ClickID+"&f1="+f1+"&f2="+f2+"&f3="+f3+"&rand_id="+rand_log_id);
}


function tracksetcookie(name,val,days){
    var exp = new Date();
    exp.setTime(exp.getTime() + days*86400000);
    document.cookie = name + '=' + escape(val) + '; expires=' + exp.toGMTString()+ "; domain=tracklog.lvye.com" + "; path=/";
}

function setcookie_session(name,val){
    var exp = new Date();
    exp.setTime(exp.getTime() + 1800000);
    document.cookie = name + '=' + escape(val) + '; expires=' + exp.toGMTString()+ "; domain=tracklog.lvye.com" + "; path=/";
}



function clicklog(logmsg){
    logmsg = logmsg + "&tag=click&referrer=" + referrer;
    try{logmsg = logmsg + '&window_size='+document.documentElement.clientWidth+'x'+document.documentElement.clientHeight;}catch(e){}
    ajaxlog(logmsg);
}


function addEvent(obj, evt, fn, capture) {
            capture = capture || false;
            if (obj.addEventListener) {
                obj.addEventListener(evt, fn, capture)
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + evt, fn);
            } else {
                obj["on" + evt] = fn;
            }
        }

function trackListen(obj){ 
addEvent(obj, "click", function(e) {
  var _target = e.target || window.event.srcElement;  
  if ( _target.nodeName.toLowerCase() == 'a' ) {
    ClickID  = ClickID+1;
    var e = e || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var posx = e.pageX || e.clientX + scrollX;
    var posy = e.pageY || e.clientY + scrollY;
    tracksetcookie('lastposx',posx);
    tracksetcookie('lastposy',posy);
    var _href = _target.getAttribute('href') || "#";
    var tongji_text =  _target.getAttribute('title') || _target.innerText;
    tracksetcookie('lasttext',tongji_text);
    clicklog("&text="+encodeURIComponent(tongji_text)+"&to="+encodeURIComponent(_href)+"&posx="+posx+"&posy="+posy);
  }
});
}

trackListen(document);

function newpostListen(){
	try{
		var e_controls = document.getElementById("e_controls");
		if  (e_controls != null){ 
			var e_as = e_controls.getElementsByTagName("a");
			for (var i=0;i<e_as.length;i++){
				trackListen(e_as[i]);
			}
		}
	}
	catch(e){}
}

newpostListen();

(function(){
    logmsg = "tag=pvstat&referrer=" + referrer + "&posx="+getcookie("lastposx") + "&posy=" + getcookie("lastposy")+ "&text="+getcookie("lasttext")   ;
	try{
		var loadtime = new Date().getTime() - performance.timing.navigationStart;
		logmsg = logmsg + "&loadtime="+loadtime
	}
	catch(e){}
	try{ 
		if (document.title == "404页面"){
			logmsg = logmsg + "&sc=404"
		}
	}
	catch(e){}
    try{logmsg = logmsg + '&window_size='+document.documentElement.clientWidth+'x'+document.documentElement.clientHeight;}catch(e){}
    ajaxlog(logmsg);
})();

function format_trackParams(paramContent) {
    if(paramContent == "NA") {
        return paramContent;
    }
    try{
        var _trackArrParams = [];
        for(var i = 0, ln = paramContent.length; i < ln; i++){
            _trackArrParams.push(paramContent[i].I + ":" + paramContent[i].V.replace(/\|/g,"*"));
        }
        return _trackArrParams.join("@@");
    }catch(e){
        return "error";
    }
}
})();
