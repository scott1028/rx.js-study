'use strict';
// Ref: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takeuntil.md

/*
當 timer 有兩個參數時，第一個參數代表要發出第一個值的等待時間(ms)，第二個參數代表第一次之後發送值的間隔時間，所以上面這段程式碼會先等一秒送出 1 之後每五秒送出 2, 3, 4, 5...。

timer 第一個參數除了可以是數值(Number)之外，也可以是日期(Date)，就會等到指定的時間在發送第一個值。
*/

var Rx = require('rxjs/Rx');


// when secondary parameter is filled. This observable obj is never complete.
// (delay, step) in millionseconds.
var source = Rx.Observable.timer(1000, 2000);

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

var subscription = source.subscribe(subscriber);

// after 7 second make subscribe unsubscribe this obj.
setTimeout(function(){
    subscription.unsubscribe();
}, 8000);
// 0
// 1
// 2 ...

// after 6 second trigger .complete()
source.takeUntil(Rx.Observable.timer(6000)).subscribe(subscriber);
// 0
// 1
// 2
// 3 ...

// after 12 second trigger .complete()
source.takeUntil(new Promise(function(res, rej){
    setTimeout(res, 12000);
})).subscribe(subscriber);

/*
Events observable 盡量不要用 unsubscribe ，通常我們會使用 takeUntil，在某個事件發生後來完成 Event observable，這個部份我們之後會講到！
*/

// 10秒後結束觸發 .complete() do .complete once listener of stream emit first .next()
source.takeUntil(Rx.Observable.timer(10 * 1000)).subscribe(subscriber);
// source.takeUntil(Rx.Observable.of(0,1,2)).subscribe(subscriber);
// Rx.Observable.of(0,1,2).subscribe(subscriber);
// Rx.Observable.timer(10 * 1000).subscribe(subscriber);
