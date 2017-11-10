$(function(){
	var currentPage = 1;
	var pageSize = 5;
	var $form = $('#form');
	//发送ajax获取数据
	function render(){
		$.ajax({
			url:'/category/queryTopCategoryPaging',
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(data){
				console.log(data);
				$('tbody').html(template('tpl',data));
				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:currentPage,
					totalPages:Math.ceil(data.total/data.size),
					 onPageClicked:function(a,b,c,page){
					 	currentPage=page;
					 	render();
					 }
				})
			}
		})
	}
	render();
	//显示模态框
	$('.btn-addTopCategory').on('click',function(){
		$('#myModal').modal('show');
	})
	//验证表单
	$form.bootstrapValidator({
		//小图标
		feedbackIcons: {
	    valid: 'glyphicon glyphicon-ok',
	    invalid: 'glyphicon glyphicon-remove',
	    validating: 'glyphicon glyphicon-refresh'
	  },
	 	//规则
	 	 fields:{
	 			categoryName:{
	 			validators:{
	 				 	notEmpty:{
	 						message:'请输入一级分类'
	 					}
	 				}
	 			}
	 		}
	})
	// 增加一级分类ajax
	$form.on('success.form.bv',function(e){
		e.preventDefault();
		// console.log($form.serialize());
			$.ajax({
				url:'/category/addTopCategory',
				type:"post",
				data:$form.serialize(),
				success:function(data){
					// console.log(data)
					if(data.success){
						currentPage=1;
						render();
					};
					//隐藏模态框
					$('#myModal').modal('hide');
					//清空表单的样式
					$form.data("bootstrapValidator").resetForm();
					//清空表单的内容 reset()方法dom 对象的
					$form[0].reset();
				}
			})
	})
})