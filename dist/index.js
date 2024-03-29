"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  timer: () => timer_exports,
  urlHelper: () => urlHelper_exports
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  timer,
  urlHelper
});
