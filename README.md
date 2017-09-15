# Conception

- Rx.JS 跟 FB 的 React 沒關係是另一種以 Observable 模式的 Design Pattern。
- Rx 真的是蠻有趣的東西，提供的lib又號稱毫無相依性，可以應用在各種framework上方，只是必須要懂得如何Think in Reactive Programming，否則這些lib的用法還真的是不好理解。
- Reactive Programming 是一種以 asynchronous data streams 為中心思想出發的程式撰寫方式，比較常聽到的是 asynchronous event，像是 user click event, mouse hover event 等等，而這邊特別的則是 data 與 stream，顧名思義，Reactive Extensions 將 event 延伸為 data，並且注重在 stream （串流）上，也就是 時間序列上的一連串資料事件，Rx讓你將任何事情都變化為 data streams : variables, user inputs, properties, caches, data structures 等等皆可，透過 Observe 這些 data streams，並依據其造成的 side effects 進行對應的動作。
- Ref: http://blog.techbridge.cc/2016/05/28/reactive-programming-intro-by-rxjs/

# Tools

- Ref: http://rxmarbles.com/
