$(function(){

	//查询
	//获取localStorage
	function getLocalstorage(){
		var arr = JSON.parse(localStorage.getItem('lt_search_history') || '[]');
		// console.log(arr);
		return arr;
	}


	//封装渲染
	function render(){
		var arr = getLocalstorage();
		//调用模板渲染数据
		$('#content .history').html(template('tpl',{arr:arr}));
	}
	//查询本地缓存数据 渲染数据
	render();

	//清空历史记录
	$('.history').on('click','.btn_empty',function(){
		localStorage.removeItem('lt_search_history');
		render();
	})

	//x删除
	$('.history').on('click','li i',function(){
		//获取这条数据在缓存数组中对应的下标像
		var $index = $(this).data('index')

		console.log($index);

		//获取缓存的数据
		var arr = getLocalstorage();

		arr.splice($index,1);
		// console.log(JSON.stringify(arr))
		//用新的数组重新设置localstorage
		localStorage.setItem('lt_search_history',JSON.stringify(arr));
		render();

	})

	//增加
	$('.search button').on('click',function(){

		var arr = getLocalstorage();

		// console.log('haha');
		//获取 iuput 的值 添加到缓存数组中 渲染数据
		var value = $('.search input').val().trim();
		if(value==''){
			return false;
		}

		//判断数组中是否存在这个数据 
		if(arr.indexOf(value)>=0){
			//数组存在直接删除
				var index = arr.indexOf(value);
				arr.splice(index,1);
		}
		//判断数组的长度是不是10个 是删除一个
		if(arr.length>=10){
			arr.pop();
		}
		//删除后添加或者不存在直接添加
		arr.unshift(value);
		//修改localstorage的值
		localStorage.setItem('lt_search_history',JSON.stringify(arr));
		//清空input的值
		$('.search input').val('');
		render();
		location.href="productlist.html?key="+value;

	})
	
	
})