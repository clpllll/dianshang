$(function(){
	//验证表单
	var inputs  = $('.mui-input-row input');
	// console.log(inputs);
	
	var username,password,repassword,phone,code;
	inputs.each(function(i,e){
		$(this).on('blur',function(){
		if(i==0){
			username = $(this).val().trim();
			if(!username){
				mui.toast('请输入用户名');
				return false;
			}
		}
		if(i==1){
			password = $(this).val().trim();
			if(!password){
				mui.toast('请输入密码');
				return false;
			}
		}
		
		if(i==2){
			repassword = $(this).val().trim();
			if(!repassword){
				mui.toast('请再次输入密码');
				return false;
			}else{
				if(repassword != password){
					mui.toast('两次密码不同 ,请重新输入');
					return false;
				}
			}
		}
		
		if(i==3){
			phone = $(this).val().trim();
			if(!phone){
				mui.toast('请输入手机号');
				return false;
			}else{
				//正则判断手机号
				if(!/^1[3578]\d{9}/.test(phone)){
					mui.toast('请输入正确的手机号');
					return false;
				}
			}
		}
		
		if(i==4){
			code = $(this).val().trim();
			if(!code){
				mui.toast('请输入验证码');
				return false;
			}
			console.log(code);
		}
				
		})
	})

//发送验证码
	$('.btn-code').on('click',function(e){
		e.preventDefault();
		//改变按钮的颜色 修改内容
		$(this).addClass('now');
		$(this).html('正在发送中...');
		$.ajax({
			type:'get',
			url:'/user/vCode',
			success:function(data){
				console.log(data);
				var count = 5;
			var timeid =	setInterval(function(){
						count--;
						if(count==0){
							$('.btn-code').removeClass('now').html('获取验证码');
							clearInterval(timeid);
							return false;

						}
						$('.btn-code').html(count+'后再次发送');
				},1000);
			}
		})
	})


	//发送注册的ajax
	$('.btn_register').on('tap',function(){
		if(!(username&&password&&repassword&&phone&&code)){
			mui.toast('请填写注册信息');
			return false;
		}
		$.ajax({
			type:'post',
			url:'/user/register',
			data:{
				username:username,
				password:password,
				mobile:phone,
				vCode:code
			},
			success:function(data){
				console.log(data);
				if(data.success){
					location.href="login.html";
				}
				if(data.error==403){
					mui.toast(data.message);
				}
			}
		})

	})
})