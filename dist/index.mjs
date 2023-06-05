var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/timer/index.ts
var timer_exports = {};
__export(timer_exports, {
  sleep: () => sleep
});
var sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

// src/urlHelper/index.ts
var urlHelper_exports = {};
__export(urlHelper_exports, {
  createAccessForHash: () => createAccessForHash
});
var replaceQuery = (search) => {
  const parser = new URLSearchParams();
  for (let k in search) {
    parser.append(k, search[k]);
  }
  const query = parser.toString();
  const { pathname, hash } = window.location;
  window.history.replaceState(null, "", `${pathname}?${query}${hash}`);
};
var hashArgs = {
  search: {},
  replaceQuery,
  getAll() {
    updateArgs();
    return hashArgs.search;
  },
  remove(key) {
    updateArgs();
    delete hashArgs.search[key];
    replaceQuery(hashArgs.search);
  }
};
var updateArgs = () => {
  const { hash, pathname, search } = window.location;
  Object.assign(hashArgs, { hash, pathname });
  if (search) {
    const sp = new URLSearchParams(search.replace("?", ""));
    const so = {};
    for (const [key, value] of sp) {
      so[key] = value;
    }
    hashArgs.search = so;
  } else {
    hashArgs.search = {};
  }
};
var createAccessForHash = (key) => {
  let get = () => {
    updateArgs();
    return hashArgs.search[key];
  };
  let set = (value) => {
    updateArgs();
    hashArgs.search[key] = value;
    hashArgs.replaceQuery(hashArgs.search);
  };
  let remove = () => {
    hashArgs.remove(key);
  };
  return { set, get, remove };
};
export {
  timer_exports as timer,
  urlHelper_exports as urlHelper
};
