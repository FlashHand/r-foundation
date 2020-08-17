/**
 * @Description Storage Wrapper
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/7/24 2:44 PM
 */

//判断是否是服务器
const isServer = typeof window === 'undefined';
const dayjs = require('dayjs');

let store;
//初始化localstorage和sessionstorage
function initStore() {
  if (!store) {
    store = {
      /* eslint-disable no-undef */
      storage: !isServer ? window.localStorage : null,
      session: {
        storage: !isServer ? window.sessionStorage : null
      }
    };
    const api = {
      set(key, val) {
        if (this.disabled) {
          return
        }
        if (val === undefined) {
          return this.remove(key)
        }
        this.storage.setItem(key, serialize(val));
        return val
      },

      get(key, def) {
        if (this.disabled) {
          return def
        }
        let val = deserialize(this.storage.getItem(key));
        return (val === undefined ? def : val)
      },

      has(key) {
        return this.get(key) !== undefined
      },

      remove(key) {
        if (this.disabled) {
          return
        }
        this.storage.removeItem(key)
      },

      clear() {
        if (this.disabled) {
          return
        }
        this.storage.clear()
      },

      getAll() {
        if (this.disabled) {
          return null
        }
        let ret = {};
        this.forEach((key, val) => {
          ret[key] = val
        });
        return ret
      },

      forEach(callback) {
        if (this.disabled) {
          return
        }
        for (let i = 0; i < this.storage.length; i++) {
          let key = this.storage.key(i);
          callback(key, this.get(key))
        }
      }
    };

    Object.assign(store, api);

    Object.assign(store.session, api);

    function serialize(val) {
      return JSON.stringify(val)
    }

    function deserialize(val) {
      if (typeof val !== 'string') {
        return undefined
      }
      try {
        return JSON.parse(val)
      } catch (e) {
        return val || undefined
      }
    }

    try {
      const testKey = '__storejs__';
      store.set(testKey, testKey);
      if (store.get(testKey) !== testKey) {
        store.disabled = true
      }
      store.remove(testKey)
    } catch (e) {
      store.disabled = true
    }
  }
}
//对localstorage 存储器的封装
const localWrapper = {
  generateAccessor(key, defaultValue) {
    initStore();
    let get = () => {
      let returnValue = store.get(key);
      if (returnValue === undefined) return defaultValue;
      return returnValue
    };
    let set = (p) => {
      store.set(key, p)
    };
    let remove = () => {
      if (store.get(key)) {
        store.remove(key)
      }
    };
    return {set, get, remove}
  }
};
//对sessionstorage 存储器的封装
const sessionWrapper = {
  generateAccessor(key, defaultValue) {
    initStore();
    let get = () => {
      let returnValue = store.session.get(key);
      if (returnValue === undefined) return defaultValue;
      return returnValue
    };
    let set = (p) => {
      store.session.set(key, p)
    };
    let remove = () => {
      if (store.session.get(key)) {
        store.session.remove(key)
      }
    };
    return {set, get, remove}
  }
};
//设置cookie
function setCookie(key,holdDays,v) {
  let expiredDateStr = '';
  if (holdDays > 0) {
    let today = dayjs();
    expiredDateStr = today.add(holdDays, 'day').toDate().toUTCString();
  }
  let domain = document.domain;
  let index = domain.indexOf(".");
  domain = domain.slice(index + 1);
  document.cookie = `${name}=${v || ''};expires=${expiredDateStr};path=/;domain=${domain}`
}
//对cookie 存储器的封装
const cookieWrapper = {
  generateAccessor(key, holdDays) {
    let set = (v) => {
      setCookie(key, holdDays, v);
    };
    let get = () => {
      let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
      if (document.cookie.match(reg))
        return unescape(document.cookie.match(reg)[2]);
      else
        return null;
    };
    let remove = () => {
      setCookie(key, -1000, '');
    }
  }
};

module.exports = {
  localWrapper,
  sessionWrapper,
  cookieWrapper
};
