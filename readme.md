# r-foundation

##说明：
r-foundation集成了基础的对象和函数扩展

##使用：
```javascript
const rf = require('@/vendors/r-foudation')
```
###browser
```javascript
const browser = rf.browser;
browser.isSafari();
```

###event_emitter
```javascript
//初始化一个事件中心
const EventEmitter = rf.EventEmitter;
const event_center =  new EventEmitter();
const notification_foo = 'notification_foo';
//发布事件及参数
event_center.emit(notification_foo,params);
//增加事件监听
const callback = (params)=>{

};
event_center.on(notification_foo,callback);
//删除一种事件的指定事件监听
event_center.removeListener(notification_foo,callback);
//删除一种事件的全部事件监听
event_center.removeAllListeners(notification_foo);

```
###storage
例如创建一个localstorage的字段集中管理文件local/index.js
```javascript
const {localWrapper} = rf.storage;
export default  {
  foo:localWrapper.generateAccessor('foo')
}
```
使用
```javascript
import local from 'path/to/local';
local.foo.get();
const bar = {"test":1};
local.foo.set(bar);//支持直接存储对象
```

###timer
延迟执行
```javascript
const timer = rf.timer
const delayedFunc = async ()=>{
  try {
    await timer.delay(2000);
    //Do something
  }catch (e) {
    
  }
}






```


