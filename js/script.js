 //封裝一個代替getElementByid()堵塞方法
function byId(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}

var index = 0,
	pics = byId("banner").getElementsByTagName('div'),
	dots = byId("dots").getElementsByTagName('span'),
	len = pics.length,
	next = byId("next"),
	prev = byId("prev"),
	timer = null;

function slideImg(){
	var main = byId("main");
	//滑過清除定時器，離開繼續
	main.onmouseover = function(){
		if(timer) clearInterval(timer);
	}
	//離開繼續
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index>=len){
				index = 0;
			}
			changeImg();
		},2000);		
	}
	//自動再main上觸發鼠標離開的事件
	main.onmouseout();

	//遍歷所有點擊，且綁定點擊事件，點擊圓點切換圖片
	for(var d=0;d<len;d++){
		//給所有span添加一個id的屬性，值爲d，作爲span的索引
		dots[d].id = d;
		dots[d].onclick = function(){
			//改變index爲當前span的索引
			index = this.id; 
			//調用changeImg，實現圖片切換
			changeImg();
		}
	}	
}

//切換圖片
function changeImg(){
	//遍歷banner下所有的div，將其隱藏
	for(var i=0;i<len;i++){
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	//根據index索引找到當前div，將其顯示出來
	pics[index].style.display = 'block';
	dots[index].className = "active";
}
//點擊切換下一張
next.onclick = function(){
	index++;
	if(index>=len){
		index = 0;
	}
	changeImg();
}
//點擊切換上一張
prev.onclick = function(){
	index--;
	if(index<0){
		index = len - 1;
	}
	changeImg();
}

slideImg();