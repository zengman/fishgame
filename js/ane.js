var aneObj  = function(){
	//start point, control point, end point(sin)
	this.rootx = [];
	this.headx =[];
	this.heady =[];
	this.amp = [];
	this.alpha = 0;
}
//prototype能添加对象的属性
//object.prototype.name = value;

aneObj.prototype.num = 50; //数量
aneObj.prototype.init = function(){
	for (var i = 0; i < this.num ; i++){
		this.rootx[i] = i * 16 + Math.random() * 20 ;// [0,1)  使海葵随机一段距离就生长
		this.headx[i] = this.rootx[i];  
		this.heady[i] = canHeight- 250 + Math.random() * 50;//海葵的高度，
		this.amp[i] = Math.random()*50 + 50;
	}
}
aneObj.prototype.draw = function(){
	this.alpha +=deltaTime *0.0008; //海葵摆动的角度随时间变化
	var l = Math.sin(this.alpha);//[-1,1] 使海葵可以左右摆动
	ctx2.save(); //save restore 表示绘制的内容只在这段场景下生效。
	ctx2.globalAlpha = 0.6; //globalAlpha表示绘制图的透明度
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle  = "#3b154e";
	for (var i = 0; i < this.num ; i++){
		//beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight); //定义到x轴，can底部
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100,this.headx[i] ,this.heady[i]);
		ctx2.stroke();

	}
	ctx2.restore(); //样式只在这连个函数间起作用；
}