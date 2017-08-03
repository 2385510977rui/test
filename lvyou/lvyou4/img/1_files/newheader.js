function showlogin() {
	showWindow('login', '/member.php?mod=logging&action=login' + (0 ? '&cookietime=1' : ''));
}

function commonSearch() {
	var stype = jQuery("#indexSearchTypeValue").val(),
		action = "",
		keywords = jQuery('#serbox').val();
		keywords_event = encodeURI(jQuery('#serbox').val());
	    jQuery('#portal_keywords').val('');
	switch(stype) {
		case 'activity':
			window.open("http://www.lvye.com/search.jsp?web_site=&key_word=" + keywords_event);
			return false;
			break;
		case 'portal':
			jQuery('#portal_keywords').val(keywords);
			jQuery('#commonSearchForm').attr('action', 'http://www.lvye.cn/search.php?mod=portal');
			break;
		case 'user':
			window.open("http://www.lvye.cn/home.php?mod=spacecp&ac=search&type=all&searchsubmit=true&username=" + keywords);
			return false;
			break;
		/*case 'forum':
			jQuery('#commonSearchForm').attr('action', 'http://www.lvye.cn/search.php?mod=forum');
			break;*/
	}
	jQuery("#commonSearchForm").submit();
}

jQuery(document).ready(function($) {
	//消息异步加载
	//console.log('test1');
	$.ajax({
         type: "post",
         url: "http://www.lvye.cn/api/xiaoxi/getstatus.php?callback=",
         dataType: "jsonp",
         success: function(json){
       		//console.log(json['newpm']); 
       		if(json['newpm'] > 0) {
       			$('#mnn').addClass('new');
       			$('.my_new_num').html('('+json['newpm']+')');
       		}
       		if(json['newprompt'] > 0) {
       			$('#mtn').addClass('new');
       			$('.my_tip_num').html('('+json['newprompt']+')');
       			
       		}   
       		if(json['newpm'] > 0 || json['newprompt'] > 0) {
       			$('.hasnewmarker1').addClass('hasnewmarker');
       			$('.newsbox').show();
       			if(json['newpm'] > 0) {
       				//console.log(json['newpm']);
       				$('.new_msg_div').show();
       				$('.new_msg_num').html(json['newpm']);
       			}else{
       				$('.new_msg_div').hide();
       			}
       			if(json['newprompt'] > 0) {
       				//console.log(json['newprompt']);
       				$('.new_remind_div').show();
       				$('.new_prompt_num').html(json['newprompt']);
       			}else {
       				$('.new_remind_div').hide();
       			}
       		}else {
       			$('.newsbox').hide();
       		}   
         }
    });

	$(".searchtype").hover(function() {
		$('.searchdrop').show();
	}, function() {
		$('.searchdrop').hide();
	})
	$('#search_submit_btn').click(function(e) {
		e.preventDefault();
		commonSearch();
	})

	function disableEnter(e) {
		if (e.keyCode == 13) {

		}
	}
	/*$("#search_bar").find("li").click(function() {
		var s = $(this);
		if (s.data('searchtype')) {
			$("#indexSearchTypeValue").val(s.attr("data-searchtype"));
			$("#searchselect").text(s.text());
			if(s.data('searchtype') == "lvxing") {
				$("#commonSearchForm").attr("action","http://www.lvye.com/search")
			}else{
				$("#commonSearchForm").attr("action","http://www.lvye.cn/huodong/search")
			}
		}
		$('.searchdrop').hide();
	});*/
	$("#search_bar").find("li").click(function() {
		var s = $(this);
		if (s.data('searchtype')) {
			$("#indexSearchTypeValue").val(s.attr("data-searchtype"));
			$("#searchselect").text(s.text());
			if(s.data('searchtype') == "activity") {
				$("#commonSearchForm").attr("action","http://www.lvye.com/search.jsp")
			}else if(s.data("searchtype")=='forum'){
				$("#commonSearchForm").attr("action","/search.php?searchsubmit=yes");
				$("#commonSearchForm").attr("method","post");
				$("#scbar_mod").attr("value","forum");
				$("#scbar_btn").attr("value","true");
				$("#serbox").attr("name","srchtxt");
			}else if(s.data("searchtype")=='article'){
				$("#commonSearchForm").attr("action","/search.php?searchsubmit=yes");
				$("#commonSearchForm").attr("method","post");
				$("#scbar_mod").attr("value","article");
				$("#serbox").attr("name","srchtxt");
			}
		}
		$('.searchdrop').hide();
	});
	
	$('.close_x').bind('click', function() {
		$('.newsbox').remove();
	})
	$("#commonSearchForm").submit(function(e){
		if($('#serbox').val() == "" && $("#commonSearchForm").attr("action") == "http://www.lvye.com/search.jsp") {
			e.preventDefault();
			// location.href = "http://www.lvye.com"
			window.open("http://www.lvye.com"); 
		}
	})

	// $('.searchdrop li').each(function() {
	// 	$(this).click(function() {
	// 		$("#searchselect").html($(this).html())
	// 		$(".searchdrop").hide();
	// 		$('.searchform').attr('action', $(this).data('searchtype'));
	// 	})
	// })
	// 导航下拉菜单
        topDropdown();

	$('#newnavi li').hover(function() {
		$(this).addClass('lihover')
	}, function() {
		$(this).removeClass('lihover')
	});
	/*$('#msgli').hover(function() {
		if( $('.newsbox').is(':visible') ) {
			$('.newsbox').hide();
		}
	}, function() {
		if( $('.newsbox').is(':hidden') ){
			$('.newsbox').show();
		}
	});*/

	// 微信弹出二维码
	$('.qrcodepreview').click(function() {
		$('.weichatpopup').toggle();
	})

	$(document).click(function(e) {
		var target = $(e.target);
		if (!target.is('.weichatpopup') && !target.parents().is('.weichatpopup') && !target.is('.qrcodepreview')) {
			$('.weichatpopup').hide();
		}
	})
    
	//新版快捷导航
	$('#hover_slidedown').hover(function() {
		$('.slide_sign').css({'backgroundPosition':'113px -6px'})
		if($('.slide_menu').is(':hidden')) {
			$('.slide_menu').show();
		}
	}, function() {
		$('.slide_sign').css({'backgroundPosition':'113px 12px'})
		if($('.slide_menu').is(':visible')) {
			$('.slide_menu').hide();
		}
	});
	
})

function topDropdown () {
	if (jQuery('.topnavul li').length > 0) {
		jQuery('.topnavul').delegate("li", "hover", function () {
			jQuery(this).toggleClass('topnavhover')
		})
	}
}
