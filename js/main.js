var can1; 
var can2;

var ctx1;
var ctx2;

var canWidth; //以左上角为坐标原点
var canHeight;

var lastTime; //上一帧执行的时间
var deltaTime; //两帧间隔的时间差 

var bgPic = new Image(); //定义一个图片变量

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra =[];
var momBodyBlue =[];

var data ;

var wave;
var halo;

var dust;
var dustPic =[];

document.body.onload = game; 
// body 加载完后，将ganme作为js加载的入口

function game(){
	init();
	lastTime = Date.now(); //等于当前时间
	deltaTime = 0;
	gameloop();
}
function init(){
	//获得canvas context
	can1 = document.getElementById("canvas1"); //fishes, dust, UI, circle
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2"); //bacg\kground, ane, fruits
	ctx2 = can2.getContext("2d");

	can1.addEventListener('mousemove',onMouseMove, false); //监测鼠标的移动
	//element.addEventListener(event, function, useCapture)
	bgPic.src = "./src/background.jpg"; 

	canWidth = can1.width;
	canHeight = can2.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby  = new babyObj();
	baby.init();

	mx = canWidth * 0.5;;
	my = canHeight * 0.5;

	for( var i = 0; i<8; i++){
		babyTail[i] = new Image();
		babyTail[i].src ="./src/babyTail" + i +".png";
	}

	for (var i = 0 ; i<2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	
	for (var i=0; i<20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i+".png";
	}

	for (var i=0; i<8; i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i +".png";
	}
	for (var i=0; i<2; i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye" + i　+".png";
	}

	data = new dataObj();

	for(var i=0; i<8; i++){
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "./src/bigSwim" + i +".png";
		momBodyBlue[i].src = "./src/bigSwimBlue" + i +".png";
	}
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();
	halo = new haloObj();
	halo.init();

	for (var i=0; i<7; i++){
		dustPic[i] = new Image();
		dustPic[i].src ="./src/dust"+i+".png";
	}
	dust  = new dustObj();
	dust.init();

}
function gameloop(){
	window.requestAnimFrame(gameloop); //setInterval , setTimeout 智能根据机器来定制帧数 fps
	//请求动画帧，当前绘制完成后，根据机器的性能，间隔多长时间进行下一帧。时间间隔不固定。在不同浏览器的配置不同，需要兼容。
	//其他，若设定为60s，但实际不能在这期间绘制完成
	var now = Date.now(); //获取当前时间
	deltaTime = now - lastTime;  //两帧间隔
	lastTime = now;  //更新上一次的时间
	if (deltaTime>40) deltaTime = 40;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight); //clearRect(x,y,width,height)清空给定矩阵内的指定像素
	mom.draw();
	momFruitsCollision();
    momBabyCollision();
	baby.draw();
	data.draw();

	wave.draw();
	halo.draw();
	dust.draw();

}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){ //需要考虑到浏览器的兼容性，使用layerX和layer来兼容Firefox浏览器
			mx = e.offSetX == undefined?e.layerX:e.offSetX; //layerX以文档窗口左上角为原点
			my = e.offSetY == undefined?e.layerY:e.offSetY;
		}
	}
	
}