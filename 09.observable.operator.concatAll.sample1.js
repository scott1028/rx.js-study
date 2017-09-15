'use strict';
// Ref: http://ithelp.ithome.com.tw/articles/10187333

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

/*
這裡可以看到 source observable 內部每次發送的值也是 observable，這時我們用 concatAll 就可以把 source 攤平成 example。
這裡需要注意的是 concatAll 會處理 source 先發出來的 observable，必須等到這個 observable 結束，才會再處理下一個 source 發出來的 observable，讓我們用下面這個範例說明。
0
b
c
1
b
c
2
b
c
complete!
*/

source.map((v)=>{
    return Rx.Observable.of(`${v}`, `b`, `c`);
}).subscribe(subscriber);

/*
沒用 concatAll 攤平
Output =>
ArrayObservable { _isScalar: false, array: [ 'a', 'b', 'c' ], scheduler: null }
ArrayObservable { _isScalar: false, array: [ 'a', 'b', 'c' ], scheduler: null }
ArrayObservable { _isScalar: false, array: [ 'a', 'b', 'c' ], scheduler: null }
complete!
*/
