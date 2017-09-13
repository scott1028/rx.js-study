'use strict';
// 組合 Streaming of subscriber
// Ref: http://reactivex.io/documentation/operators/combinelatest.html
// Ref: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/combinelatest.md


var Rx = require('rxjs/Rx');

/* Have staggering intervals, this is async(Timer 觸發 Stream 到第二個) */
var source1 = Rx.Observable.interval(100)
    .map(function(i) { return 'First: ' + i; });

var source2 = Rx.Observable.interval(150)
    .map(function(i) { return 'Second: ' + i; });

// Combine latest of source1 and source2 whenever either gives a value
var source = Rx.Observable.combineLatest(
    source1,
    source2
).take(4);

var subscription = source.subscribe(
    function(x) {
        console.log('Next: %s', JSON.stringify(x));
    },
    function(err) {
        console.log('Error: %s', err);
    },
    function() {
        console.log('Completed');
    });

// => Next: ["First: 0","Second: 0"]
// => Next: ["First: 1","Second: 0"]
// => Next: ["First: 1","Second: 1"]
// => Next: ["First: 2","Second: 1"]
// => Completed

// Oberserable -> Event Streaming.
// var source = Rx.Observable.combineLatest(source1, source2); create new streaming(source1 + source2)
Rx.Observable.range(1,2).combineLatest(function(x){
  return x + 100;
}).subscribe(function(x){
  console.log(x);
});

console.log();

// Another ways(兩種執行 Response 模式)
Rx.Observable.combineLatest(Rx.Observable.range(2,2), function(x){
  return x + 100;
}).subscribe(function(x){
  console.log(x);
});

console.log();

// Another ways(兩種執行 Response 模式, 第一個執行完畢才觸發 stream 到第二個)
Rx.Observable.combineLatest(Rx.Observable.range(2,2), Rx.Observable.range(4,2)).subscribe(function(x){
  console.log(x);
});

console.log();

Rx.Observable.range(2,2).subscribe(function(x){console.log(x)});

console.log();
