document.write("<script language=javascript src='aniMath.js'></script>");
function wheel(wins,opts,Run){
    //初始化
    this.init(wins,opts,Run);
    //获取参数
    this.getWins();
    //创建容器
    this.creatBox();
    //创建循环列表
    this.creatList();
    //创建按钮
    this.creatButton();
    //自动轮播
    // this.autoRun();
    //点击播放
    // this.clickRun();
}


wheel.prototype = {
    init(wins,opts,Run){
        this.wins = document.querySelector(wins);
        console.log(this.wins);
        this.opts = opts;
        this.Run = Run;
        if(!(this.wins&&this.wins.nodeType==1)){
            console.error("窗口元素未找到")
            return ; 
        }

        this.win = this.wins;
        this.winW = parseInt(getComputedStyle(this.win,null).width);
        
        //添加一个图片
        opts.imgs.push(opts.imgs[0])
        opts.links.push(opts.links[0])
        opts.imgColor.push(opts.imgColor[0])
        this.imgLength = opts.imgs.length;
        
        if(this.imgLength==0){
            console.error("没有传入相应的轮播图");
        }
        this.imgSize = this.opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("请传入合法的的图片尺寸");
        }
        if(this.imgSize.length==0){
            this.imgSize[0] = document.documentElement.clienWidth;
            this.imgSize[1] = 400;
        }
        if(this.imgSize.some(function(val){
            return val==0
        })){
            for(var i=0;i<2;i++){
                if(this.imgSize[i]==0){
                    this.imgSize[i] = 500;
                }
            }
        }
        //按钮
        this.btnColor = opts.btnColor||"green";
        this.btnActive = opts.btnActive||"red";
        this.btnPos = opts.btnPos||["center","20"] ;
        this.btns =[];

        this.Run = Run||{};
        this.time = 0;
        if (this.Run.time) {
            this.time = this.Run.time * 100;
        }
        else {
            this.time = 5000;
        }
        this.eachTime = 0;
        if (this.Run.eachTime) {
            this.eachTime = this.Run.eachTime * 1000;
        }
        else {
            this.eachTime = 500;
        }
        this.runStyle = null;
        if (this.Run.runStyle == "inner" || !(this.Run.runStyle)) {
            this.runStyle = Tween.Linear;

        }
        else if (this.Run.runStyle == "in") {
            this.runStyle = Tween.Quad.easeIn;
        }
        else if (this.Run.runStyle == "out") {
            this.runStyle = Tween.Quad.easeOut;
        }

    },

    getWins(){
        this.wins.style.cssText = "width:100%;height:"+this.imgSize[1]+"px;overflow:hidden;position: relative";
    },

    creatBox(){
        this.box = document.createElement("div");
        this.box.style.cssText = "width:"+(this.imgLength*100)+"%;height:100%;border:1px solid red;overflow:hidden"
        this.wins.appendChild(this.box);
    },

    creatList(){
        for(var i=0;i<this.imgLength;i++){
            
            var divList = document.createElement("div");
            divList.style.cssText = `float:left;width:${100/this.imgLength}%;height: 100%;background:${this.opts.imgColor[i]}`;
    
            var link = document.createElement("a");
            link.href = this.opts.links[i];
            link.style.cssText = "width:"+this.imgSize[0]+"px;height:"+this.imgSize[1]+"px;display:block;margin: 0 auto;background:url("+this.opts.imgs[i]+") no-repeat 0 0"
    
            divList.appendChild(link);
            this.box.appendChild(divList); 
             
         }
    },

    creatButton(){
        var btnBox = document.createElement("div");
        btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+this.btnPos[1]+"px;";

        for(var i=0;i<this.imgLength-1;i++){
            if(i==0){
                var bgcolor = this.btnActive;
            }else{
                var bgcolor = this.btnColor;
            }
            var btn = document.createElement("div");
            btn.style.cssText = "width:20px;height:20px;background:"+bgcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left";
            btnBox.appendChild(btn);
            this.btns.push(btn);
            
        }
        console.log(this.btns);
        
        this.wins.appendChild(btnBox);
    },

    //问题move 中不能获取到wheel的属性。
    // autoRun(){

    //     this.num=0;
    //     //自动轮播
    //     var move=function(num,box,btns,winW,btnColor,btnActive,eachTime){    
    //         num++;
    //         console.log(num,btns,box)
    //         if(num > btns.length-1){
    //             animate(box,{
    //                 marginLeft: -(num * winW)
    //             },eachTime,runStyle,function(){
                    
    //                 box.style.marginLeft = 0;
    //             })
    //             num=0;    
    //         }else{
    //             console.log(box)
    //             animate(box,{
    //                 marginLeft: -(num * winW)
    //             },eachTime)
    //         }
            
            
    //         for(var i=0;i < btns.length;i++){
    //             btns[i].style.background= btnColor;
    //         }
    //         btns[num].style.background = btnActive;
    //         console.log(box.style.marginLeft);
            
    //     }
    //     this.t=setInterval(move(this.num,this.box,this.btns,this.Wins,this.btnColor,this.btnActive,this.eachTime),this.time);
    //     console.log(this.num);

    // }
}