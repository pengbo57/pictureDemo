;(function(){
    function Drag(options){
        // 元素时私有属性
        this.ele = options.ele;
        this.startCallback = options.startCallback;
        this.moveCallback = options.moveCallback;
        this.upCallback = options.upCallback;

        console.log(this.ele);

        if(!this.ele) return;
        
        // 公有属性，down，move，up

        this.ele.onmousedown = Drag.prototype.down.bind(this);
        
    }

    // 鼠标落下时执行的事件
    Drag.prototype.down = function(e){
        // 记录坐标，便宜量，添加move事件
        var startX = e.clientX;
        var startY = e.clientY;
        var offsetX = this.ele.offsetLeft;
        var offsetY = this.ele.offsetTop;

        this._left = startX - offsetX;
        this._top = startY - offsetY;

        document.onmousemove = Drag.prototype.move.bind(this);
        document.onmouseup = Drag.prototype.up.bind(this);

        // 执行一个操作
        typeof this.startCallback === "function" && this.startCallback();
    }

    // 鼠标按下后移动
    Drag.prototype.move = function(e){
        
        var l = e.clientX - this._left; 
        var t = e.clientY - this._top;

        this.ele.style.left = l + "px";
        this.ele.style.top = t + "px";

        // 执行一个操作
        typeof this.moveCallback === "function" && this.moveCallback();
    }

    // 鼠标抬起执行
    Drag.prototype.up = function(){
        document.onmousemove = null;
        document.onmouseup = null;
        // 执行一个操作
        typeof this.upCallback === "function" && this.upCallback();
    }

    window.Drag = Drag;
})();