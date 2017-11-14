$(function(){
	//获取url中拼接的地址
	var search = location.search.replace('?reUrl=','')

	$('.btn-login').on('click',function(){
		var username = $('.mui-input-row input[type=text]').val();
		var password = $('.mui-input-row input[type=password]').val();
		if(!username){
				mui.toast('请输入用户名');
				return false;
		}
		if(!password){
				mui.toast('请输入密码');
				return false;
		}
		//发送的登录的ajax
		$.ajax({
			url:'/user/login',
			type:'post',
			data:{
				username:username,
				password:password
			},
			success:function(data){
				console.log(data);
				if(data.error==403){
					mui.toast(data.message);
				}
				//如果成功跳回之前的页面
				if(data.success){
					console.log('hh');
					console.log(search);
					if(!search){
						location.href="user.html"
					}else{

					location.href=search;
					}
				}
			}
		})
	})

})