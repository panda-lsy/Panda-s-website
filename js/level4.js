var picnum=2+9;
var picData=[];
var a_num=[];
var level="level4";
var isstart=false;
$(document).ready(function(){
	//var tds=$('#picbox').children().children();
	showpicmain();
	for(var i=0;i<picnum;i++)
	{
		$('#picbox').append("<tr></tr>");
	}
	for(var i=0;i<picnum;i++)
	{
		$('#picbox').children().append("<td></td>");
	}
	$('#startgame').attr("onclick","startgame()");
	var tds=$('#picbox').children().children();
	//console.log(tds.length);
	
	for(var i=0;i<tds.length;i++)
	{
		id=i+1;
		tds[i].setAttribute("id",id);
		tds[i].setAttribute("onclick","movepic("+id+")")
	}
	init();
	saveData();
	setBorder();
	setendpic();
});
function setendpic()
{
	temp=picnum*(picnum-1)-1;
	$('#'+temp).css("background-image","url(img/"+level+"/_"+(picnum-2)*(picnum-2)+".jpg)")
}
function iskong(id)//判断改标签是否为空
{
	
	var bg=$('#'+id).css("background-image");
	if(bg=="none"){
		return true;
	}else
	{
		return false;
	}
}
function movepic(id)//移动图片
{
	if(iskong(id-picnum))
	{
		//alert("moveup");
		move(id,id-picnum);
	}
	else if(iskong(id+picnum))
	{
		//alert("movedown");
		move(id,id+picnum);
	}
	else if(iskong(id-1))
	{
		//alert("moveleft");
		move(id,id-1);
	}
	else if(iskong(id+1))
	{
		//alert("moveright");
		move(id,id+1);
	}
	if(isstart)
	{
		isWin();
	}
}
function setBorder()//设置边界
{
	for(var i=0;i<=picnum;i++)
	{
		$("#"+i).attr({"onclick":null,"class":"border_bg"});
		$("#"+i).css("height","1px");
	}
	for(var i=1;i<=picnum*picnum;i+=picnum)
	{
		$("#"+i).attr({"onclick":null,"class":"border_bg"});
		$("#"+i).css("width","1px");
	}
	for(var i=picnum*(picnum-1)+1;i<=picnum*picnum;i++)
	{
		$("#"+i).attr({"onclick":null,"class":"border_bg"});
		$("#"+i).css("height","1px");
	}
	for(var i=picnum;i<=picnum*picnum;i+=picnum)
	{
		$("#"+i).attr({"onclick":null,"class":"border_bg"});
		$("#"+i).css("width","1px");
	}
}

function move(id,target)//移动
{
	//var temp=$('#'+id).css("background-image");
	//temp=$('#'+id).css("background-image","");
	$('#'+target).css("background-size","cover");
	$('#'+target).css("background-image",$('#'+id).css("background-image"));
	$('#'+id).css("background-image","none");
}
var pic=1;
function init()//初始化图片
{
	for(var i=1;i<picnum-1;i++)
	  {
		for(var id=1;id<picnum*picnum;id++)
		{
			if(id>picnum*i+1&&id<picnum*(i+1))
		{
			$('#'+id).css("background-size","cover");
			$('#'+id).css("background-image","url(img/"+level+"/_"+pic+".jpg)");
			pic++;
			//console.log(pic);
		}
		}
	  }
	  var temp=picnum*(picnum-1)-1;
	  $('#'+temp).css("background-image","none");
}
function saveData()//保存初始数据
{
	for(var i=1;i<picnum-1;i++)
	  {
		for(var id=1;id<picnum*picnum;id++)
		{
			if(id>picnum*i+1&&id<picnum*(i+1))
		{
			var temp=$('#'+id).css("background-image");
			picData.push(temp);
		}
		}
	  }
}
function startgame()//开始游戏，打乱图片顺序
{
	clearTimeout(timer);
	times=0;timem=0;
	isstart=true;
	var k=0;
	var temp=[];
	for(var i=1;i<(picnum-2)*(picnum-2);i++)
	{
		temp[i-1]=i;
	}
	a_num=getnum(temp);
	for(var i=1;i<picnum-1;i++)
	  {
		for(var id=1;id<picnum*picnum;id++)
		{
			if(id>picnum*i+1&&id<picnum*(i+1))
		{
			var temp=$('#'+id).css("background-image","url(img/"+level+"/_"+a_num[k]+".jpg)");
			k++;
		}
		}
	  }
	  var temp=picnum*(picnum-1)-1;
	  $('#'+temp).css("background-image","none");
	  gotime();
}

function getnum(array) //打乱顺序函数
{
    var tmp, current, top =array.length;
    if(top) while(--top){
    current =Math.floor(Math.random() * (top + 1));
    tmp =array[current];
    array[current] =array[top];
    array[top] = tmp;
    }
    return array;
}
function isWin()//判断是否胜利
{
	k=0;
	for(var i=1;i<picnum-1;i++)
	  {
		for(var id=1;id<picnum*picnum;id++)
		{
			if(id>picnum*i+1&&id<picnum*(i+1))
		{
			var temp=$('#'+id).css("background-image");
			if(temp==picData[k])
			{
				k++;
			}
		}
		}
	  }
	  if(k==(picnum-2)*(picnum-2))
	  {
	  	clearTimeout(timer);
	  	windo();
	  }
}
var timem=0;
var times=0;
var timer=null;
function gotime()//开始计时
{
	timer=setTimeout(function(){
		times++;
		if(times>59)
		{
			timem++;
			times=0;
		}
		$('#timer').text(timem+"分"+times+"秒");
		gotime();
},1000);
}

function showpicmain()//显示样本图
{
	$('.pic').css("background-image","url(img/"+level+"/main.jpg)");
}
function windo()
{
	$('.wingame').css("display","block");
	$('.pic2').click(function(){
		$('.wingame').css("display","none");
		startgame();
	});
	$('#timer2').text($('#timer').text());
}