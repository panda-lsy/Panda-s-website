var timem=0;
var times=0;
var timer=null;

function gotime()
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