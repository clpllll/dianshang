$(function(){
	var productid = getKey('productid');

	$.ajax({
		url:'/product/queryProductDetail',
		data:{
		id:productid,
		},
		success:function(data){
			console.log(data);
			
			
			$('.mui-scroll').html(template('tpl',data));

			//初始化轮播图
			var gallery = mui('.mui-slider');
			gallery.slider({
			  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
			});

			//初始化数字输入框控件
			mui('.mui-numbox').numbox();

			//选尺码
			$('.info .size span').on('click',function(){
				$(this).addClass('now').siblings().removeClass('now');
			});

		}
	})

	//加入购物车
	$('.addcart').on('click',function(){
			//獲取尺碼 數量
			var size = $('.info .size span.now').html();
			var num = $('.info .mui-numbox input').val();
			var id = $('.info').data('id');
			console.log(id);

			//判断是否登录
			$.ajax({
					type:'get',
					url:'/user/queryUserMessage',
					success:function(data){
						// console.log(data);
						if(data.error==400){
							mui.toast(data.message);
							location.href="login.html?reUrl="+location.href;
							return false;
						}
						if(!size){
							mui.toast('請選擇尺碼');
							return false;
						};

						$.ajax({
							type:'post',
							url:'/cart/addCart',
							data:{
								productId:id,
								num:num,
								size:size
							},success:function(data){
								// console.log(data);
								if(data.success){
									mui.confirm('添加成功','溫馨提示',['去購物車','繼續瀏覽'],function(e){
											if(e.index==0){
												location.href="cart.html?reUrl="+location.href;
											}

										});

								}
							}
						})


					}
			})
                                        
	})


})