'use strict';
// Ref: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takeuntil.md

/*
當 timer 有兩個參數時，第一個參數代表要發出第一個值的等待時間(ms)，第二個參數代表第一次之後發送值的間隔時間，所以上面這段程式碼會先等一秒送出 1 之後每五秒送出 2, 3, 4, 5...。

timer 第一個參數除了可以是數值(Number)之外，也可以是日期(Date)，就會等到指定的時間在發送第一個值。
*/

var Rx = require('rxjs/Rx');


var source = Rx.Observable.timer(1000, 1000).take(3);

var sourceExtra = Rx.Observable.of(`a`, `b`, `c`);

var subscriber = {
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log('Throw Error: ' + error)
    }
};

// source.map((val)=>{
//     return val;
// }).subscribe(subscriber);

source.map((v)=>{
    return Rx.Observable.of(`${v}`, `b`, `c`);
}).concatAll().subscribe(subscriber);