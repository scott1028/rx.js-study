'use strict';
// Ref: http://ithelp.ithome.com.tw/articles/10187248
// Observable & subscribe 的 merge 解析

var Rx = require('rxjs/Rx');

var decorateFn = function(val){
    return `[${val}]`;
};

var observable1 = Rx.Observable.of(1,2,3);

var observable2 = Rx.Observable.create((observer) => {
    // 將 observable1 傳入, 讓他被 Nested subscriber 訂閱
    // observable1 會觸發三次 subscriber's reaction 因為上層傳入 [1,2,3]
    observable1.subscribe(
        (value) => { 
            try{
                // Trigger 外埠新的 Observable 的 .next() iterator
                observer.next(decorateFn(value));
            } catch(e) {
                observer.error(e);
            }
        },
        (err) => { observer.error(err); },
        () => { observer.complete() }
    )
});

console.log(observable2);

observable2.subscribe({
    next(v){
        console.log(v);
    },
    error(v){
        console.log(v);
    },
    complete(){
        console.log('Complete');
    }
});
