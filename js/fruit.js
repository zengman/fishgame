var fruitObj  = function(){
	this.alive = []; 
	this.x = [];
	this.y = [];
	this.aneNO = [];
	this.l = []; //len
	this.spd = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for(var i = 0; i< this.num ; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.spd[i] = Math.random() *0.017 + 0.003; //fly的速度各自不同
		this.fruitType[i] = "";
		this.aneNO[i] =0;
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw  = function(){
	for (var i = 0; i < this.num ; i++){
		//draw
		// find an ane, grow, fly up
		if (this.alive[i] == true){
			if (this.fruitType[i] =="blue"){
				var pic = this.blue;
			}
			else{
				var pic = this.orange;
			}
			if (this.l[i] <= 14){//grow
				var NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime; //
			}
			else{
				this.y[i] -= this.spd[i] *7* deltaTime; //fly，高度一点点变大
			}
			ctx2.drawImage(pic, this.x[i]-this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			if (this.y[i] < 10){ //果实飞很高，果实变false
				this.alive[i] = false;
			}
		}
		
	}
}
fruitObj.prototype.born = function(i){
	//找到任意一个海葵，然后在上面出生
	this.aneNO[i]=Math.floor( Math.random() * ane.num); // floor 四舍五入，取整？
	this.l[i] =0; 
	this.alive[i] = true;
	var ran = Math.random();
	//选择出生果实的颜色
	if (ran<0.2){ 
		this.fruitType[i] = "blue"; 
	}
	else{
		this.fruitType[i] = "orange";
	}
	
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
//监控屏幕上果实数量
function fruitMonitor(){ 
	var  num = 0;
	for (var i = 0; i< fruit.num; i++){
		if (fruit.alive[i]) num++;	
	}
	//统计目前屏幕上的果实数量
	if (num < 15){
		//send fruit
		sendFruit(); //发出果实
		return;
	}
}
function sendFruit(){
	for (var i = 0; i < fruit.num; i++){
		//如果有果实死掉，就使其重生
		if(!fruit.alive[i]){
			fruit.born(i);
			return ;
		}
	}
}