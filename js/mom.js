var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer =0;
	this.momEyeCount=0;
	this.momEyeInterval = 1000;

	this.momBodyCount =0;

}
momObj.prototype.init = function(){
	this.x = canWidth * 0.5; //把大鱼画在canvas的中间
	this.y = canHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function(){

	//lerp x,y
	//lerpDistance()函数将大鱼坐标趋近于鼠标的坐标。 lerpDistance(aim,cur,rate), aim 被趋近于的值，cur当前值， rate 趋近程度
	this.x = lerpDistance(mx,this.x,0.9);
	this.y = lerpDistance(my, this.y,0.9);
	//delta angle
	//Math.atan1(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//lero angle
	this.angle = lerpAngle(beta,this.angle,0.6);
   //tail
   this.momTailTimer += deltaTime;
   if(this.momTailTimer >50){
   		this.momTailCount =(this.momTailCount +1 ) % 8;
   		this.momTailTimer %=50;
   } 
  //mom Eye
  this.momEyeTimer +=deltaTime;
  if(this.momEyeTimer >this.momEyeInterval){
  	this.momEyeCount =(this.momEyeCount +1) %2;
  	this.momEyeTimer %= this.momEyeInterval;
  	if (this.momEyeCount ==0){
  		this.momEyeInterval = Math.random() * 1500 +2000;
  	}
  	else{
  		this.momEyeInterval = 200;
  	}
  }
	ctx1.save();
	ctx1.translate(this.x, this.y); //translate() 方法重新映射画布上的 (0,0) 位置。更改坐标原点
	ctx1.rotate(this.angle); //旋转某个角度
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width*0.5+30 , -momTail[momTailCount].height *0.5);
	var momBodyCount = this.momBodyCount;
	if(data.double ==1){//ora
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width*0.5, -momBodyOra[momBodyCount].height *0.5);

	}
	else{
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width*0.5, -momBodyBlue[momBodyCount].height *0.5);

	}
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width*0.5, -momEye[momEyeCount].height *0.5);
	
	

	ctx1.restore();
}