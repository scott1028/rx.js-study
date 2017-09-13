'use strict';

var Rx = require('rxjs/Rx');


Rx.Observable.create(function(obs){
	obs.next(1);
	obs.next(9);
	obs.complete();
	obs.next('no work');
}).subscribe({
	next(v){
		console.log(v);
	},
	error(v){
		console.log(v);
	},
	complete(v){
		console.log('done');
	}
});

/*
Output =>
1
9
done
*/

/*
Observable 可以被訂閱(subscribe)，或說可以被觀察，而訂閱 Observable 的物件又稱為 **觀察者(Observer)**。觀察者是一個具有三個方法(method)的物件，每當 Observable 發生事件時，便會呼叫觀察者相對應的方法。

注意這裡的觀察者(Observer)跟上一篇講的觀察者模式(Observer Pattern)無關，觀察者模式是一種設計模式，是思考問題的解決過程，而這裡講的觀察者是一個被定義的物件。
觀察者的三個方法(method)：
	next：每當 Observable 發送出新的值，next 方法就會被呼叫。
	complete：在 Observable 沒有其他的資料可以取得時，complete 方法就會被呼叫，在 complete 被呼叫之後，next 方法就不會再起作用。
	error：每當 Observable 內發生錯誤時，error 方法就會被呼叫。
*/
