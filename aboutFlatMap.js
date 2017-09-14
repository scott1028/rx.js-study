'use strict';
// Ref: http://blog.techbridge.cc/2016/05/28/reactive-programming-intro-by-rxjs/

var Rx = require('rxjs/Rx');


// console.clear();
var source = Rx.Observable
    .range(1, 2)
    .flatMap(function(x) {
        return Rx.Observable.range(x, 2);    
    });  // got [1,2] [2,3] => [1,2,2,3]

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);   
    },
    function () {
        console.log('Completed');   
    });

// got: 10, 11 <= Rx.Observable.range(v, incr?)
Rx.Observable.range(10, 2).subscribe((x)=>console.log(x));
