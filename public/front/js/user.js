$(function(){

	//判断是否登陆
	isLogin();

	//查询用户信息 渲染
	$.ajax({
		type:'get',
		url:"/user/queryUserMessage",
		success:function(data){
			// console.log(data);
			$('.info').html(template('tpl',data));
		}
	})

	//退出登陆
	$('.logout').on('click',function(){
		$.ajax({
			type:'get',
			url:'/user/logout',
			success:function(data){
					// console.log(data);
					if(data.success){
						location.href="login.html";
					}
			}
		})
	})




})