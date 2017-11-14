//区域滚动功能
mui(".mui-scroll-wrapper").scroll({
  indicators:false
});


//轮播图自动播放功能
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


	//获取url中的关键字
	function getKeyObj(){

	var search = location.search;
	//转码中文
	search = decodeURI(search);
			search = search.slice(1);
	var arr = search.split('&');
	var obj = {};
			for(var i=0;i<arr.length;i++){
				var arrnew = arr[i].split('=');
				obj[arrnew[0]]=arrnew[1];
			}
	// console.log(obj);
	return obj;
	}

	function getKey(k){
		return	getKeyObj()[k];
	}