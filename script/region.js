(()=>{function _(e){return e?e.type==="region"&&typeof e.id=="string"&&typeof e.rx=="number"&&typeof e.rz=="number"&&typeof e.dim=="number"&&!!e.javaEditionMap:!1}function F(e,t,r=Module.HEAPU8){let s=t;for(let i=0;i<4;i++)r[e+i]=255&s,s=s>>8}function l(e){if(!e.startsWith("/"))return;let t=e.substring(1).split("/");for(let r=1;r<=t.length;r++){let s="/"+t.slice(0,r).join("/");c(s)||FS.mkdir(s)}}function c(e){try{return FS.stat(e),!0}catch(t){return!1}}function x(e){try{return FS.readFile(e)}catch(t){console.trace(t)}}function R(e,t,r={}){try{switch(e){case"mem":FS.mount(MEMFS,r,t);break;case"worker":FS.mount(WORKERFS,r,t);break}}catch(s){console.trace(s)}}var y,Q=new Uint8Array(16);function m(){if(!y&&(y=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(Q)}var b=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function E(e){return typeof e=="string"&&b.test(e)}var k=E;var n=[];for(d=0;d<256;++d)n.push((d+256).toString(16).substr(1));var d;function W(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase();if(!k(r))throw TypeError("Stringified UUID is invalid");return r}var w=W;function U(e,t,r){e=e||{};var s=e.random||(e.rng||m)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){r=r||0;for(var i=0;i<16;++i)t[r+i]=s[i];return t}return w(s)}var a=U;function p(){let e=s=>{},t=s=>{},r=new Promise((s,i)=>{e=s,t=i});return Object.assign(r,{resolve:e,reject:t})}var v=class{constructor(){this._string=new Map;this._void=new Map;this._strings=new Map;this._file=new Map;this._files=new Map;this.onMessage=t=>{if(A(t.data)){let r=t.data.id,s=t.data.value,i=this._string.get(r);this._string.delete(r),i==null||i.resolve(s)}else if(L(t.data)){let r=t.data.id,s=this._void.get(r);this._void.delete(r),s==null||s.resolve()}else if(K(t.data)){let r=t.data.id,s=this._strings.get(r);this._strings.delete(r),s==null||s.resolve(t.data.strings)}else if(T(t.data)){let r=t.data.id,s=this._file.get(r);this._file.delete(r),s==null||s.resolve(t.data.file)}else if(j(t.data)){let r=t.data.id,s=this._files.get(r);this._files.delete(r),s==null||s.resolve(t.data.files)}};self.addEventListener("message",this.onMessage)}async get(t){let r=a(),s=p(),i={type:"get",id:r,key:t};return this._string.set(r,s),self.postMessage(i),s.then(async o=>{if(o===void 0)return;let u=await(await fetch(o)).arrayBuffer();return new Uint8Array(u)})}async file(t){let r=a(),s=p(),i={type:"file",id:r,key:t};return this._file.set(r,s),self.postMessage(i),s}async put(t,r){let s=a(),i=p(),o={type:"put",id:s,key:t,buffer:r};return this._void.set(s,i),self.postMessage(o),i}async del(t){let r=a(),s=p(),i={type:"del",id:r,key:t};return this._void.set(r,s),self.postMessage(i),s}async keys({withPrefix:t}){let r=a(),s=p(),i={type:"keys_with_prefix",id:r,prefix:t};return this._strings.set(r,s),self.postMessage(i),s}async files({withPrefix:t}){let r=a(),s=p(),i={type:"files_with_prefix",id:r,prefix:t};return this._files.set(r,s),self.postMessage(i),s}async removeKeys({withPrefix:t}){let r=a(),s=p(),i={id:r,prefix:t,type:"remove_keys_with_prefix"};return this._void.set(r,s),self.postMessage(i),s}};function j(e){return e?e.type==="files_response"&&typeof e.id=="string"&&!!e.files:!1}function A(e){return e?e.type==="string_response"&&typeof e.id=="string":!1}function L(e){return e?e.type==="void_response"&&typeof e.id=="string":!1}function K(e){return e?e.type==="strings_response"&&typeof e.id=="string"&&!!e.strings:!1}function T(e){return e?e.type==="file_response"&&typeof e.id=="string":!1}async function P({kvs:e,prefix:t,mountPoint:r}){let s=t.endsWith("/")?t:`${t}/`,o=(await e.files({withPrefix:s})).map(f=>{let u=f.name.substring(s.length);return new File([f],u)});l(r),R("worker",r,{files:o})}self.importScripts("./region-wasm.js");self.addEventListener("message",e=>{_(e.data)&&V(e.data)});var S=new v;function V(e){$(e).catch(console.error)}async function $(e){let{id:t,rx:r,rz:s,dim:i,javaEditionMap:o}=e;c("/wfs")||await P({kvs:S,prefix:`/je2be/${t}/in`,mountPoint:"/wfs"});let f="/wfs";i===1?f="/wfs/DIM-1":i===2&&(f="/wfs/DIM1");let u=Module._malloc(o.length*4);for(let g=0;g<o.length;g++)F(u+g*4,o[g]);let h=`/je2be/${t}/wd/${i}`;if(l(h),!Module.ConvertRegion(t,f,r,s,i,u,o.length)){console.error(`[region] (${t}) ConvertRegion failed`);return}let M=`${h}/r.${r}.${s}.nbt`,D=x(M);await S.put(M,D),Module.RemoveAll("/je2be");let C={type:"region_done",id:t};self.postMessage(C)}})();
