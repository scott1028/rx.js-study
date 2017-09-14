'use strict';
// Ref: http://ithelp.ithome.com.tw/articles/10187043
/*
補充：fromEventPattern

要用 Event 來建立 Observable 實例還有另一個方法 fromEventPattern，這個方法是給類事件使用。
所謂的類事件就是指其行為跟事件相像，同時具有註冊監聽及移除監聽兩種行為，就像 DOM Event 有 addEventListener 及 removeEventListener 一樣！
舉一個例子，我們在【30 天精通 RxJS (04)： 什麼是 Observable ?】實作的 Observer Pattern 就是類事件，程式碼如下：
*/

var Rx = require('rxjs/Rx');


// This is EventPattern Class
class Producer {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener)
        } else {
            throw new Error('listener 必須是 function')
        }
    }
    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
    notify(message) {
        this.listeners.forEach(listener => {
            listener(message);
        })
    }
}
// ------- 以上都是之前的程式碼 -------- //

var egghead = new Producer();
// egghead 同時具有 註冊監聽者及移除監聽者 兩種方法

var source = Rx.Observable
    .fromEventPattern(
        (handler) => egghead.addListener(handler),
        (handler) => egghead.removeListener(handler)
    );

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
})

egghead.notify('Hello! Can you hear me?');
// Hello! Can you hear me?