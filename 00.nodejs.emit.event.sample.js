'use strict';
// Ref: https://nodejs.org/api/events.html#events_class_eventemitter


class Event {
    constructor(msg){
        this.message = msg
    }
    toString(){
        return `event of ${this.message}`;
    }
}

var EventEmittor = require('events');
var eventEmittor = new EventEmittor();

eventEmittor.on('click', function(e){
    console.log(`triggered by ${e}`);
})

eventEmittor.emit('click', new Event('click'));
