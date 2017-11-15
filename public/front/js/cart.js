$(function(){
	//判断是否登录
	$.ajax({
		type:'get',
		url:'/user/queryUserMessage',
		success:function(data){
			// console.log(data);
			if(data.error==400){
				// mui.toast(data.message);
				location.href="login.html?reUrl="+location.href;
				return false;
			}
			if(data.success){

				//下拉刷新
				mui.init({
					pullRefresh : {
				    container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
				    down:{
				    	auto:true,
							ntrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
							callback :function(){
							  //发送ajax获取数据
							  $.ajax({
							  	url:'/cart/queryCart',
							  	type:'get',
							  	success:function(data){
										// console.log(data);
										//数据回来时下拉刷新结束
										mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
										if(data.length==0){
											return false;
										}else{

											$('.mui-table-view').html(template('tpl',{data:data}));
										}
									}
								})
							} 
						}
					}
				});
			}
		}
	});



	//删除购物车商品btn-delete
	$('.mui-table-view').on('tap','.btn-delete',function(){
		//获取购物车商品的id
		var id = $(this).data('id');
		$.ajax({
			type:'get',
			url:'/cart/deleteCart',
			data:{
				id:id
			},
			success:function(data){
				// console.log(data);
				//如果删除成功 手动刷新页面
				if(data.success){
					mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
				}
			}
		})
	})


	//计算价格
	$('.mui-table-view').on('click','input',function(){
		var $checked = $('.mui-table-view input:checked');
		var total = 0;
		$checked.each(function(){
			total+=$(this).data('price')*$(this).data('num');
		});
		console.log(total);
		$('.total .p').html(total.toFixed(2));

	});


	//编辑购物车商品
	$('.mui-table-view').on('tap','.mui-icon-compose',function(){
		var that=this;
		//调用模板渲染数据
		var $html = template('tpl2',this.dataset);
		//去空格
		$html = $html.replace(/\n/g,'');
		// console.log($html);
		
		mui.confirm($html,'编辑商品',['确定','取消'],function(e){
			if(e.index==0){
				var num =$('.mui-numbox-input').val();
				var size = $('.mui-popup span.now').html();
				var id =that.dataset.id;

				$.ajax({
					type:'post',
					url:'/cart/updateCart',
					data:{
						num:num,
						size:size,
						id:id
					},
					success:function(data){
						if(data.success){
							mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
						}
					}
				})
			}
		});

		//初始化数字输入框
		mui('.mui-numbox').numbox();
		//选尺码
		$('.mui-popup span').on('click',function(){
			size = $(this).html();
			$(this).addClass('now').siblings().removeClass('now');
		});

	})
});
