function lvyepic_embed(t,w,h){
	var f=function(o){return jQuery('#'+o);},k=f('my_websitekey'),ti=f('my_websitetime');if(t==''||parseInt(w)<0||parseInt(h)<=0)return;
	s='<iframe name="lvyepic" width='+w+' height='+h+' src="http://bbs.lvye.cn/template/lvye/generate/homepage_cms_outdoor_photos.htm" vspace="0" hspace="0" allowtransparency="true" scrolling="no" marginheight="0" marginwidth="0" frameborder="0" style="border: 0; vertical-align: bottom; margin: 0; display: block;"></iframe>';
	document.write(s);
}
