'use strict';
// Ref: http://ithelp.ithome.com.tw/articles/10187043

var Rx = require('rxjs/Rx');


// Promise Queue 全部完成觸發一個 .next() 就觸發 .complete()
var source = Rx.Observable
    .from(new Promise((res, rej) => {
        setTimeout(() => {
            res('Hello RxJS!');
        }, 1000);
    }).then(function(val) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(`[${val}]`);
            }, 1500);
        });
    }));

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
});

/*
Output =>

[Hello RxJS!]
complete!
*/