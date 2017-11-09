$(function(){

// 进度条
	$(document).ajaxStart(function(){
		// console.log("hais")
		
		NProgress.start();
	})
	$(document).ajaxStop(function() {
		NProgress.done();
	});
//判断是否登录
	if(location.href.indexOf("login.html")==-1){
		//到这里表示不是login页
		$.ajax({
			url:'/employee/checkRootLogin',
			success:function(data){
				console.log(data);
				if(data.error==400){
					location.href="login.html";
				}
			}
		})
	}


	//左侧边栏的选中打开
	$('.menu a').on('click',function(){
		// $('.menu a').removeClass('now');
		// $(this).toggleClass('now');
	})
	$('.submenu').prev('a').on('click',function(){
		$(this).next('.submenu').toggle(400);
	})
	//左右收缩
	$('.btn_menu').on('click',function(){
		$('.main').toggleClass('now');
		$('.sidebar').toggleClass('b');
	})
	//退出登录
	$('.btn_exitSure').on("click",function(){
		$.ajax({
			url:'/employee/employeeLogout',
			success:function(data){
				if(data.success){
					location.href="login.html";
				}
			}
		})
	})
	
})