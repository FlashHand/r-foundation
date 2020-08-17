/**
 * @Description r-foundation集成了基础的对象和函数扩展
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/7/17 6:09 PM
 */
const timer = require('./timer');
const dayjs = require('dayjs');
const _ = require('lodash');
const regex = require('./regex');
const storage = require('./storage');
const browsers = require('./browsers');
const EventEmitter = require('./event_emitter');


function hello(){
  return 'IAmAlive!';
}
module.exports = {
  hello,
  timer,
  dayjs,
  _,
  regex,
  storage,
  browsers,
  EventEmitter
};
