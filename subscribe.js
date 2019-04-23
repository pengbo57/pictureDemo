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
}

Subscribe.prototype.remove = function(type, fn){
    if(this.container[type] === undefined){
        return;
    }

    for(let i = 0; i < this.container[type].length; i ++){
        if(this.container[type][i] === fn){
            this.container[type].splice(i, 1);
        }
    }
}

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
}

var subscribe = new Subscribe();

var fn = function(){}

// subscribe.add("open", fn);
// subscribe.add("open", fn1);
subscribe.remove("open", fn);

subscribe.fire("open", 1, 2);
