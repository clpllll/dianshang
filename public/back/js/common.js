$(function(){
// 进度条
	$(document).ajaxStart(function(){
		// console.log("hais")
		
		NProgress.start();
	})
	$(document).ajaxStop(function() {
		NProgress.done();
	});
	
})