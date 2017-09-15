'use strict';
// Ref: http://ithelp.ithome.com.tw/articles/10187333

var Rx = require('rxjs/Rx');


var obs1 = Rx.Observable.interval(1000).take(5);
var obs2 = Rx.Observable.interval(500).take(2);
var obs3 = Rx.Observable.interval(2000).take(1);

var source = Rx.Observable.of(obs1, obs2, obs3);
// var source = Rx.Observable.of(obs1, obs2);

var example = source.concatAll();
// var example = obs1;

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
/*
這裡需要注意的是 concatAll 會處理 source 先發出來的 observable，必須等到這個 observable 結束，
才會再處理下一個 source 發出來的 observable，讓我們用下面這個範例說明。

.concatAll(): `obs1 done -> obs2 done -> obs3 done`(it works in a pipeline).

Output =>
0
1
2
3
4
0
1
0
complete

第一個 source 的效果仍然回分攤到每一個元素內.
ex:

0 -> sleep(1) -> 1
+map
+concatAll
[obs1 do all task] -> sleep(1) -> [obs2 do all task]
*/