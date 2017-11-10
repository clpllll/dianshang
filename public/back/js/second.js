$(function(){
	var currentPage = 1;
	var pageSize = 5;
	//发送ajax渲染数据
	function render(){
		$.ajax({
			url:'/category/querySecondCategoryPaging',
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(data){
				// console.log(data);
				$('tbody').html(template('tpl2',data));
				//分页
				$('#paginator').bootstrapPaginator({
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
	};
	render();
	//弹出增加二级分类的模态框
	$('.btn-brandName').on('click',function(){
		$('#myModal1').modal('show');
		//渲染一级分类
		$.ajax({
			url:'/category/queryTopCategoryPaging',
			type:'get',
			data:{
				page:1,
				pageSize:100,
			},
			success:function(data){
				console.log(data);
				$('.dropdown-menu').html(template('tpl3',data));
			}

		})
	})

	$('.dropdown-menu').on('click','a',function(){

		$('.dropdown-toggle .span').html($(this).html())
		console.log($(this).data('id'));
		$('.select').val($(this).data('id'));
	})
	//初始化图片上传
	$('.file input').on('click',function(){
		//初始化上传文件
		$("#fileupload").fileupload({
			dataTpye:"json",
			 done:function (e, data) {
			 	// console.log(data);
			 	$('.imgnone').attr('src',data.result.picAddr);
			 }
		})
	})

	//验证表单
	$('#form').bootstrapValidator({

		  //小图标
	  feedbackIcons: {
	    valid: 'glyphicon glyphicon-ok',
	    invalid: 'glyphicon glyphicon-remove',
	    validating: 'glyphicon glyphicon-refresh'
	  },
	  excluded:[],
	  fields:{
	  	brandName:{
	  		validators:{
	  			notEmpty:{
	  				message:"请选择一级分类"
	  			}
	  		}
	  	},

	  }
	})
	
})