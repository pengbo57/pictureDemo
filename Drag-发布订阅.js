;(function(){
    function Subscribe(){
        // Subscribe这个类有一个add，用来添加订阅者
        // Subscribe这个类有一个remove，用来移除订阅者
        // Subscribe这个类有一个fire，用来订阅者触发
        this.container = {
            // "open": [],
        };
    }
    
    Subscribe.prototype.add = function(type, fn){
        if(typeof fn !== "function"){
            return;
        }
    
        if(this.container[type] === undefined){
            this.container[type] = [];
        }
    
        // 不能重复添加相同的订阅者
        for(let i = 0; i < this.container[type].length; i ++){
            if(this.container[type][i] === fn){
                return;
            }
        }
    
        this.container[type].push(fn);
    };
    
    Subscribe.prototype.remove = function(type, fn){
        if(this.container[type] === undefined){
            return;
        }
    
        for(let i = 0; i < this.container[type].length; i ++){
            if(this.container[type][i] === fn){
                this.container[type].splice(i, 1);
            }
        }
    };
    
    Subscribe.prototype.fire = function(type, ...arg){
        // 第一个参数时订阅类型
        // 后面的参数时你要传给订阅者的
    
        if(!this.container[type]){
            return;
        }
        // 将之前订阅的方法依次执行，
        // 并且将参数依次传递给订阅的方法
        for(let i = 0; i < this.container[type].length; i ++){
            this.container[type][i](...arg);
        }
    };

    

    function Drag(ele){
        Subscribe.call(this);
        // 元素时私有属性
        this.ele = ele;
        if(!this.ele) return;
        // 公有属性，down，move，up
        this.ele.onmousedown = this.down.bind(this);
    }

    Drag.prototype = Object.create(Subscribe.prototype);

    // 鼠标落下时执行的事件
    Drag.prototype.down = function(e){
        // 记录坐标，便宜量，添加move事件
        var startX = e.clientX;
        var startY = e.clientY;
        var offsetX = this.ele.offsetLeft;
        var offsetY = this.ele.offsetTop;

       /* this._left = startX - offsetX;
        this._top = startY - offsetY;*/

        //仅仅用于照片墙(相对定位)
        this._left = startX;
        this._top = startY;

        document.onmousemove = Drag.prototype.move.bind(this);
        document.onmouseup = Drag.prototype.up.bind(this);

        // 执行一个操作
        this.fire("down");
    };

    // 鼠标按下后移动
    Drag.prototype.move = function(e){
        
      /*  var l = e.clientX - this._left;
        var t = e.clientY - this._top;*/

       //仅仅用于照片墙
         var l = e.clientX - this._left;
         var t = e.clientY - this._top;


        this.ele.style.left = l + "px";
        this.ele.style.top = t + "px";

        // 执行一个操作
        this.fire("move");
    };

    // 鼠标抬起执行
    Drag.prototype.up = function(){
        document.onmousemove = null;
        document.onmouseup = null;
        // 执行一个操作
        this.fire("up");
    };

    window.Drag = Drag;
})();

// var drag = new Drag(box);
// drag.add("down", function(){});
// drag.add("move", function(){});
