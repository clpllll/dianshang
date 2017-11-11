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
				// console.log(data);
				$('.dropdown-menu').html(template('tpl3',data));
			}

		})
	})

	$('.dropdown-menu').on('click','a',function(){

		$('.dropdown-toggle .span').html($(this).html())
		// console.log($(this).data('id'));
		$('.select').val($(this).data('id'));
		//手动更改验证状态
		$('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');

	})



	//初始化图片上传
		//初始化上传文件
		$("#fileupload").fileupload({
			dataTpye:"json",
			 done:function (e, data) {
			 	// console.log(data);
			 	// 预览图片
			 	$('.imgnone').attr('src',data.result.picAddr);
			 	$form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
			 	$('#inputimg').val(data.result.picAddr);
			 }
		})

	//验证表单
	var $form = $('#form');
	$form.bootstrapValidator({
    //设置不校验的内容，所有的都校验
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      },
    }
  });

  $form.on('success.form.bv',function(e){
  	e.preventDefault();
  	// console.log($form.serialize());
  	$.ajax({
  		type:'post',
  		url:'/category/addSecondCategory',
  		data:$form.serialize(),
  		success:function(data){
  			// console.log(data);
  			
  			if(data.success){
  				//关闭模态框
  				$('#myModal1').modal('hide');
  				// 清空内容
  				$form[0].reset();
  				$('.btn .span').html('请选择一级分类');
  				$('.imgnone').attr('src','/back/images/none.png');

  				// 成功清空单样式
  				$form.data("bootstrapValidator").resetForm();
  				//重新渲染页面
  				currentPage = 1;
  				render();
  				
  			}
  		}

  	})
  })
})