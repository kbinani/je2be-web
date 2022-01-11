(()=>{function M(e){return e?e.type==="post"&&typeof e.id=="string"&&typeof e.levelDirectory=="string":!1}function _(e){return e?e.type==="db_put"&&typeof e.id=="string"&&!!e.key&&!!e.value:!1}function F(e){if(!e.startsWith("/"))return;let t=e.substring(1).split("/");for(let s=1;s<=t.length;s++){let r="/"+t.slice(0,s).join("/");P(r)||FS.mkdir(r)}}function P(e){try{return FS.stat(e),!0}catch(t){return!1}}async function b(e,t){let s=async r=>{let{path:n,node:o}=r;if(o.isFolder){await t({path:n,dir:!0});for(let f of Object.keys(o.contents)){let a=o.contents[f],Q=`${n}/${f}`;await s({path:Q,node:a})}}else{if(o.isDevice)return;await t({path:n,dir:!1})}};await s(FS.lookupPath(e))}function w(e){try{return FS.readFile(e)}catch(t){console.trace(t)}}function k(e){try{P(e)&&FS.unlink(e)}catch(t){console.trace(t)}}function x(e,t,s={}){try{switch(e){case"mem":FS.mount(MEMFS,s,t);break;case"worker":FS.mount(WORKERFS,s,t);break}}catch(r){console.trace(r)}}function c(e){try{FS.unmount(e)}catch(t){console.trace(t)}}var g,$=new Uint8Array(16);function m(){if(!g&&(g=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!g))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return g($)}var R=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function E(e){return typeof e=="string"&&R.test(e)}var D=E;var i=[];for(y=0;y<256;++y)i.push((y+256).toString(16).substr(1));var y;function W(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,s=(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase();if(!D(s))throw TypeError("Stringified UUID is invalid");return s}var S=W;function j(e,t,s){e=e||{};var r=e.random||(e.rng||m)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){s=s||0;for(var n=0;n<16;++n)t[s+n]=r[n];return t}return S(r)}var p=j;function l(){let e=r=>{},t=r=>{},s=new Promise((r,n)=>{e=r,t=n});return Object.assign(s,{resolve:e,reject:t})}var h=class{constructor(){this._string=new Map;this._void=new Map;this._strings=new Map;this._file=new Map;this._files=new Map;this.onMessage=t=>{if(U(t.data)){let s=t.data.id,r=t.data.value,n=this._string.get(s);this._string.delete(s),n==null||n.resolve(r)}else if(K(t.data)){let s=t.data.id,r=this._void.get(s);this._void.delete(s),r==null||r.resolve()}else if(L(t.data)){let s=t.data.id,r=this._strings.get(s);this._strings.delete(s),r==null||r.resolve(t.data.strings)}else if(T(t.data)){let s=t.data.id,r=this._file.get(s);this._file.delete(s),r==null||r.resolve(t.data.file)}else if(C(t.data)){let s=t.data.id,r=this._files.get(s);this._files.delete(s),r==null||r.resolve(t.data.files)}};self.addEventListener("message",this.onMessage)}async get(t){let s=p(),r=l(),n={type:"get",id:s,key:t};return this._string.set(s,r),self.postMessage(n),r.then(async o=>{if(o===void 0)return;let a=await(await fetch(o)).arrayBuffer();return new Uint8Array(a)})}async file(t){let s=p(),r=l(),n={type:"file",id:s,key:t};return this._file.set(s,r),self.postMessage(n),r}async put(t,s){let r=p(),n=l(),o={type:"put",id:r,key:t,buffer:s};return this._void.set(r,n),self.postMessage(o),n}async del(t){let s=p(),r=l(),n={type:"del",id:s,key:t};return this._void.set(s,r),self.postMessage(n),r}async keys({withPrefix:t}){let s=p(),r=l(),n={type:"keys_with_prefix",id:s,prefix:t};return this._strings.set(s,r),self.postMessage(n),r}async files({withPrefix:t}){let s=p(),r=l(),n={type:"files_with_prefix",id:s,prefix:t};return this._files.set(s,r),self.postMessage(n),r}async removeKeys({withPrefix:t}){let s=p(),r=l(),n={id:s,prefix:t,type:"remove_keys_with_prefix"};return this._void.set(s,r),self.postMessage(n),r}};function C(e){return e?e.type==="files_response"&&typeof e.id=="string"&&!!e.files:!1}function U(e){return e?e.type==="string_response"&&typeof e.id=="string":!1}function K(e){return e?e.type==="void_response"&&typeof e.id=="string":!1}function L(e){return e?e.type==="strings_response"&&typeof e.id=="string"&&!!e.strings:!1}function T(e){return e?e.type==="file_response"&&typeof e.id=="string":!1}async function v({kvs:e,prefix:t,mountPoint:s}){let r=t.endsWith("/")?t:`${t}/`,o=(await e.files({withPrefix:r})).map(f=>{let a=f.name.substring(r.length);return new File([f],a)});F(s),x("worker",s,{files:o})}self.importScripts("./post-wasm.js");var d=new Map;self.addEventListener("message",e=>{M(e.data)?O(e.data):_(e.data)&&A(e.data)});var u=new h;function A(e){let{id:t,key:s,value:r}=e,n=d.get(t);n===void 0&&(n=Module.NewDb(t),d.set(t,n));let o=Module._malloc(s.length);for(let a=0;a<s.length;a++)Module.HEAPU8[o+a]=s[a];let f=Module._malloc(r.length);for(let a=0;a<r.length;a++)Module.HEAPU8[f+a]=r[a];Module.PutToDb(n,o,s.length,f,r.length)}function O(e){let{id:t}=e;console.log(`[post] (${t}) start post`),V(e).then(()=>console.log(`[post] (${t}) post done`))}async function V(e){let{id:t}=e;console.log(`[post] (${t}) mountInputFiles...`),await z(t),console.log(`[post] (${t}) mountInputFiles done`),console.log(`[post] (${t}) wasm::Post...`);let s=d.get(t);if(s===void 0){console.error(`[post] (${t}) db is not opened yet`);return}let r=Module.Post(t,s);if(d.delete(t),r<0){console.log(`[post] (${t}) wasm::Post failed: code=${r}`);return}I(t),console.log(`[post] (${t}) wasm::Post done`),console.log(`[post] (${t}) collectOutputFiles...`),await H(t),console.log(`[post] (${t}) collectOutputFiles done`),console.log(`[post] (${t}) cleanup...`),await G(t),console.log(`[post] (${t}) cleanup done`);let n={type:"post_done",id:t};self.postMessage(n)}async function z(e){await v({kvs:u,prefix:`/je2be/${e}/wd`,mountPoint:`/je2be/${e}/wd`}),await v({kvs:u,prefix:`/je2be/${e}/in`,mountPoint:`/je2be/${e}/in`})}function I(e){c(`/je2be/${e}/wd`),c(`/je2be/${e}/in`)}async function G(e){let t=`/je2be/${e}/wd`;await u.removeKeys({withPrefix:t});let s=`/je2be/${e}/in`;await u.removeKeys({withPrefix:s})}async function H(e){let t=`/je2be/${e}/out`;await b(t,async({path:s,dir:r})=>{if(r)return;let n=w(s),o=s.substring(`${t}/`.length);console.log(`[post] (${e}) ${o} ${n.length} bytes`),await u.put(s,n),k(s)})}})();
