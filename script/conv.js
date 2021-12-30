(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !function(t) {
        if (typeof exports == "object" && typeof module != "undefined")
          module.exports = t();
        else if (typeof define == "function" && define.amd)
          define([], t);
        else {
          (typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this).JSZip = t();
        }
      }(function() {
        return function s(a, o, h) {
          function u(r, t2) {
            if (!o[r]) {
              if (!a[r]) {
                var e = typeof __require == "function" && __require;
                if (!t2 && e)
                  return e(r, true);
                if (l)
                  return l(r, true);
                var i = new Error("Cannot find module '" + r + "'");
                throw i.code = "MODULE_NOT_FOUND", i;
              }
              var n = o[r] = { exports: {} };
              a[r][0].call(n.exports, function(t3) {
                var e2 = a[r][1][t3];
                return u(e2 || t3);
              }, n, n.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = typeof __require == "function" && __require, t = 0; t < h.length; t++)
            u(h[t]);
          return u;
        }({ 1: [function(t, e, r) {
          "use strict";
          var c = t("./utils"), d = t("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(t2) {
            for (var e2, r2, i, n, s, a, o, h = [], u = 0, l = t2.length, f = l, d2 = c.getTypeOf(t2) !== "string"; u < t2.length; )
              f = l - u, i = d2 ? (e2 = t2[u++], r2 = u < l ? t2[u++] : 0, u < l ? t2[u++] : 0) : (e2 = t2.charCodeAt(u++), r2 = u < l ? t2.charCodeAt(u++) : 0, u < l ? t2.charCodeAt(u++) : 0), n = e2 >> 2, s = (3 & e2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | i >> 6 : 64, o = 2 < f ? 63 & i : 64, h.push(p.charAt(n) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(t2) {
            var e2, r2, i, n, s, a, o = 0, h = 0, u = "data:";
            if (t2.substr(0, u.length) === u)
              throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (t2 = t2.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
            if (t2.charAt(t2.length - 1) === p.charAt(64) && f--, t2.charAt(t2.length - 2) === p.charAt(64) && f--, f % 1 != 0)
              throw new Error("Invalid base64 input, bad content length.");
            for (l = d.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < t2.length; )
              e2 = p.indexOf(t2.charAt(o++)) << 2 | (n = p.indexOf(t2.charAt(o++))) >> 4, r2 = (15 & n) << 4 | (s = p.indexOf(t2.charAt(o++))) >> 2, i = (3 & s) << 6 | (a = p.indexOf(t2.charAt(o++))), l[h++] = e2, s !== 64 && (l[h++] = r2), a !== 64 && (l[h++] = i);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(t, e, r) {
          "use strict";
          var i = t("./external"), n = t("./stream/DataWorker"), s = t("./stream/Crc32Probe"), a = t("./stream/DataLengthProbe");
          function o(t2, e2, r2, i2, n2) {
            this.compressedSize = t2, this.uncompressedSize = e2, this.crc32 = r2, this.compression = i2, this.compressedContent = n2;
          }
          o.prototype = { getContentWorker: function() {
            var t2 = new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), e2 = this;
            return t2.on("end", function() {
              if (this.streamInfo.data_length !== e2.uncompressedSize)
                throw new Error("Bug : uncompressed data size mismatch");
            }), t2;
          }, getCompressedWorker: function() {
            return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(t2, e2, r2) {
            return t2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(e2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", e2);
          }, e.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(t, e, r) {
          "use strict";
          var i = t("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function(t2) {
            return new i("STORE compression");
          }, uncompressWorker: function() {
            return new i("STORE decompression");
          } }, r.DEFLATE = t("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(t, e, r) {
          "use strict";
          var i = t("./utils");
          var o = function() {
            for (var t2, e2 = [], r2 = 0; r2 < 256; r2++) {
              t2 = r2;
              for (var i2 = 0; i2 < 8; i2++)
                t2 = 1 & t2 ? 3988292384 ^ t2 >>> 1 : t2 >>> 1;
              e2[r2] = t2;
            }
            return e2;
          }();
          e.exports = function(t2, e2) {
            return t2 !== void 0 && t2.length ? i.getTypeOf(t2) !== "string" ? function(t3, e3, r2, i2) {
              var n = o, s = i2 + r2;
              t3 ^= -1;
              for (var a = i2; a < s; a++)
                t3 = t3 >>> 8 ^ n[255 & (t3 ^ e3[a])];
              return -1 ^ t3;
            }(0 | e2, t2, t2.length, 0) : function(t3, e3, r2, i2) {
              var n = o, s = i2 + r2;
              t3 ^= -1;
              for (var a = i2; a < s; a++)
                t3 = t3 >>> 8 ^ n[255 & (t3 ^ e3.charCodeAt(a))];
              return -1 ^ t3;
            }(0 | e2, t2, t2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(t, e, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(t, e, r) {
          "use strict";
          var i = null;
          i = typeof Promise != "undefined" ? Promise : t("lie"), e.exports = { Promise: i };
        }, { lie: 37 }], 7: [function(t, e, r) {
          "use strict";
          var i = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Uint32Array != "undefined", n = t("pako"), s = t("./utils"), a = t("./stream/GenericWorker"), o = i ? "uint8array" : "array";
          function h(t2, e2) {
            a.call(this, "FlateWorker/" + t2), this._pako = null, this._pakoAction = t2, this._pakoOptions = e2, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(t2) {
            this.meta = t2.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(o, t2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new n[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var e2 = this;
            this._pako.onData = function(t2) {
              e2.push({ data: t2, meta: e2.meta });
            };
          }, r.compressWorker = function(t2) {
            return new h("Deflate", t2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(t, e, r) {
          "use strict";
          function A(t2, e2) {
            var r2, i2 = "";
            for (r2 = 0; r2 < e2; r2++)
              i2 += String.fromCharCode(255 & t2), t2 >>>= 8;
            return i2;
          }
          function i(t2, e2, r2, i2, n2, s2) {
            var a, o, h = t2.file, u = t2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), d = I.transformTo("string", O.utf8encode(h.name)), c = h.comment, p = I.transformTo("string", s2(c)), m = I.transformTo("string", O.utf8encode(c)), _ = d.length !== h.name.length, g = m.length !== c.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            e2 && !r2 || (x.crc32 = t2.crc32, x.compressedSize = t2.compressedSize, x.uncompressedSize = t2.uncompressedSize);
            var S = 0;
            e2 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), n2 === "UNIX" ? (C = 798, z |= function(t3, e3) {
              var r3 = t3;
              return t3 || (r3 = e3 ? 16893 : 33204), (65535 & r3) << 16;
            }(h.unixPermissions, w)) : (C = 20, z |= function(t3) {
              return 63 & (t3 || 0);
            }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + d, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(i2, 4) + f + b + p };
          }
          var I = t("../utils"), n = t("../stream/GenericWorker"), O = t("../utf8"), B = t("../crc32"), R = t("../signature");
          function s(t2, e2, r2, i2) {
            n.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e2, this.zipPlatform = r2, this.encodeFileName = i2, this.streamFiles = t2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, n), s.prototype.push = function(t2) {
            var e2 = t2.meta.percent || 0, r2 = this.entriesCount, i2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(t2) : (this.bytesWritten += t2.data.length, n.prototype.push.call(this, { data: t2.data, meta: { currentFile: this.currentFile, percent: r2 ? (e2 + 100 * (r2 - i2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(t2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = t2.file.name;
            var e2 = this.streamFiles && !t2.file.dir;
            if (e2) {
              var r2 = i(t2, e2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else
              this.accumulate = true;
          }, s.prototype.closedSource = function(t2) {
            this.accumulate = false;
            var e2 = this.streamFiles && !t2.file.dir, r2 = i(t2, e2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), e2)
              this.push({ data: function(t3) {
                return R.DATA_DESCRIPTOR + A(t3.crc32, 4) + A(t3.compressedSize, 4) + A(t3.uncompressedSize, 4);
              }(t2), meta: { percent: 100 } });
            else
              for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
                this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var t2 = this.bytesWritten, e2 = 0; e2 < this.dirRecords.length; e2++)
              this.push({ data: this.dirRecords[e2], meta: { percent: 100 } });
            var r2 = this.bytesWritten - t2, i2 = function(t3, e3, r3, i3, n2) {
              var s2 = I.transformTo("string", n2(i3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(t3, 2) + A(t3, 2) + A(e3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            }(this.dirRecords.length, r2, t2, this.zipComment, this.encodeFileName);
            this.push({ data: i2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(t2) {
            this._sources.push(t2);
            var e2 = this;
            return t2.on("data", function(t3) {
              e2.processChunk(t3);
            }), t2.on("end", function() {
              e2.closedSource(e2.previous.streamInfo), e2._sources.length ? e2.prepareNextSource() : e2.end();
            }), t2.on("error", function(t3) {
              e2.error(t3);
            }), this;
          }, s.prototype.resume = function() {
            return !!n.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(t2) {
            var e2 = this._sources;
            if (!n.prototype.error.call(this, t2))
              return false;
            for (var r2 = 0; r2 < e2.length; r2++)
              try {
                e2[r2].error(t2);
              } catch (t3) {
              }
            return true;
          }, s.prototype.lock = function() {
            n.prototype.lock.call(this);
            for (var t2 = this._sources, e2 = 0; e2 < t2.length; e2++)
              t2[e2].lock();
          }, e.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(t, e, r) {
          "use strict";
          var u = t("../compressions"), i = t("./ZipFileWorker");
          r.generateWorker = function(t2, a, e2) {
            var o = new i(a.streamFiles, e2, a.platform, a.encodeFileName), h = 0;
            try {
              t2.forEach(function(t3, e3) {
                h++;
                var r2 = function(t4, e4) {
                  var r3 = t4 || e4, i3 = u[r3];
                  if (!i3)
                    throw new Error(r3 + " is not a valid compression method !");
                  return i3;
                }(e3.options.compression, a.compression), i2 = e3.options.compressionOptions || a.compressionOptions || {}, n = e3.dir, s = e3.date;
                e3._compressWorker(r2, i2).withStreamInfo("file", { name: t3, dir: n, date: s, comment: e3.comment || "", unixPermissions: e3.unixPermissions, dosPermissions: e3.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (t3) {
              o.error(t3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(t, e, r) {
          "use strict";
          function i() {
            if (!(this instanceof i))
              return new i();
            if (arguments.length)
              throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var t2 = new i();
              for (var e2 in this)
                typeof this[e2] != "function" && (t2[e2] = this[e2]);
              return t2;
            };
          }
          (i.prototype = t("./object")).loadAsync = t("./load"), i.support = t("./support"), i.defaults = t("./defaults"), i.version = "3.7.1", i.loadAsync = function(t2, e2) {
            return new i().loadAsync(t2, e2);
          }, i.external = t("./external"), e.exports = i;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(t, e, r) {
          "use strict";
          var i = t("./utils"), n = t("./external"), o = t("./utf8"), h = t("./zipEntries"), s = t("./stream/Crc32Probe"), u = t("./nodejsUtils");
          function l(i2) {
            return new n.Promise(function(t2, e2) {
              var r2 = i2.decompressed.getContentWorker().pipe(new s());
              r2.on("error", function(t3) {
                e2(t3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== i2.decompressed.crc32 ? e2(new Error("Corrupted zip : CRC32 mismatch")) : t2();
              }).resume();
            });
          }
          e.exports = function(t2, s2) {
            var a = this;
            return s2 = i.extend(s2 || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: o.utf8decode }), u.isNode && u.isStream(t2) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", t2, true, s2.optimizedBinaryString, s2.base64).then(function(t3) {
              var e2 = new h(s2);
              return e2.load(t3), e2;
            }).then(function(t3) {
              var e2 = [n.Promise.resolve(t3)], r2 = t3.files;
              if (s2.checkCRC32)
                for (var i2 = 0; i2 < r2.length; i2++)
                  e2.push(l(r2[i2]));
              return n.Promise.all(e2);
            }).then(function(t3) {
              for (var e2 = t3.shift(), r2 = e2.files, i2 = 0; i2 < r2.length; i2++) {
                var n2 = r2[i2];
                a.file(n2.fileNameStr, n2.decompressed, { binary: true, optimizedBinaryString: true, date: n2.date, dir: n2.dir, comment: n2.fileCommentStr.length ? n2.fileCommentStr : null, unixPermissions: n2.unixPermissions, dosPermissions: n2.dosPermissions, createFolders: s2.createFolders });
              }
              return e2.zipComment.length && (a.comment = e2.zipComment), a;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(t, e, r) {
          "use strict";
          var i = t("../utils"), n = t("../stream/GenericWorker");
          function s(t2, e2) {
            n.call(this, "Nodejs stream input adapter for " + t2), this._upstreamEnded = false, this._bindStream(e2);
          }
          i.inherits(s, n), s.prototype._bindStream = function(t2) {
            var e2 = this;
            (this._stream = t2).pause(), t2.on("data", function(t3) {
              e2.push({ data: t3, meta: { percent: 0 } });
            }).on("error", function(t3) {
              e2.isPaused ? this.generatedError = t3 : e2.error(t3);
            }).on("end", function() {
              e2.isPaused ? e2._upstreamEnded = true : e2.end();
            });
          }, s.prototype.pause = function() {
            return !!n.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, e.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(t, e, r) {
          "use strict";
          var n = t("readable-stream").Readable;
          function i(t2, e2, r2) {
            n.call(this, e2), this._helper = t2;
            var i2 = this;
            t2.on("data", function(t3, e3) {
              i2.push(t3) || i2._helper.pause(), r2 && r2(e3);
            }).on("error", function(t3) {
              i2.emit("error", t3);
            }).on("end", function() {
              i2.push(null);
            });
          }
          t("../utils").inherits(i, n), i.prototype._read = function() {
            this._helper.resume();
          }, e.exports = i;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(t, e, r) {
          "use strict";
          e.exports = { isNode: typeof Buffer != "undefined", newBufferFrom: function(t2, e2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from)
              return Buffer.from(t2, e2);
            if (typeof t2 == "number")
              throw new Error('The "data" argument must not be a number');
            return new Buffer(t2, e2);
          }, allocBuffer: function(t2) {
            if (Buffer.alloc)
              return Buffer.alloc(t2);
            var e2 = new Buffer(t2);
            return e2.fill(0), e2;
          }, isBuffer: function(t2) {
            return Buffer.isBuffer(t2);
          }, isStream: function(t2) {
            return t2 && typeof t2.on == "function" && typeof t2.pause == "function" && typeof t2.resume == "function";
          } };
        }, {}], 15: [function(t, e, r) {
          "use strict";
          function s(t2, e2, r2) {
            var i2, n2 = u.getTypeOf(e2), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || new Date(), s2.compression !== null && (s2.compression = s2.compression.toUpperCase()), typeof s2.unixPermissions == "string" && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (t2 = g(t2)), s2.createFolders && (i2 = _(t2)) && b.call(this, i2, true);
            var a2 = n2 === "string" && s2.binary === false && s2.base64 === false;
            r2 && r2.binary !== void 0 || (s2.binary = !a2), (e2 instanceof d && e2.uncompressedSize === 0 || s2.dir || !e2 || e2.length === 0) && (s2.base64 = false, s2.binary = true, e2 = "", s2.compression = "STORE", n2 = "string");
            var o2 = null;
            o2 = e2 instanceof d || e2 instanceof l ? e2 : p.isNode && p.isStream(e2) ? new m(t2, e2) : u.prepareContent(t2, e2, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new c(t2, o2, s2);
            this.files[t2] = h2;
          }
          var n = t("./utf8"), u = t("./utils"), l = t("./stream/GenericWorker"), a = t("./stream/StreamHelper"), f = t("./defaults"), d = t("./compressedObject"), c = t("./zipObject"), o = t("./generate"), p = t("./nodejsUtils"), m = t("./nodejs/NodejsStreamInputAdapter"), _ = function(t2) {
            t2.slice(-1) === "/" && (t2 = t2.substring(0, t2.length - 1));
            var e2 = t2.lastIndexOf("/");
            return 0 < e2 ? t2.substring(0, e2) : "";
          }, g = function(t2) {
            return t2.slice(-1) !== "/" && (t2 += "/"), t2;
          }, b = function(t2, e2) {
            return e2 = e2 !== void 0 ? e2 : f.createFolders, t2 = g(t2), this.files[t2] || s.call(this, t2, null, { dir: true, createFolders: e2 }), this.files[t2];
          };
          function h(t2) {
            return Object.prototype.toString.call(t2) === "[object RegExp]";
          }
          var i = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(t2) {
            var e2, r2, i2;
            for (e2 in this.files)
              i2 = this.files[e2], (r2 = e2.slice(this.root.length, e2.length)) && e2.slice(0, this.root.length) === this.root && t2(r2, i2);
          }, filter: function(r2) {
            var i2 = [];
            return this.forEach(function(t2, e2) {
              r2(t2, e2) && i2.push(e2);
            }), i2;
          }, file: function(t2, e2, r2) {
            if (arguments.length !== 1)
              return t2 = this.root + t2, s.call(this, t2, e2, r2), this;
            if (h(t2)) {
              var i2 = t2;
              return this.filter(function(t3, e3) {
                return !e3.dir && i2.test(t3);
              });
            }
            var n2 = this.files[this.root + t2];
            return n2 && !n2.dir ? n2 : null;
          }, folder: function(r2) {
            if (!r2)
              return this;
            if (h(r2))
              return this.filter(function(t3, e3) {
                return e3.dir && r2.test(t3);
              });
            var t2 = this.root + r2, e2 = b.call(this, t2), i2 = this.clone();
            return i2.root = e2.name, i2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var t2 = this.files[r2];
            if (t2 || (r2.slice(-1) !== "/" && (r2 += "/"), t2 = this.files[r2]), t2 && !t2.dir)
              delete this.files[r2];
            else
              for (var e2 = this.filter(function(t3, e3) {
                return e3.name.slice(0, r2.length) === r2;
              }), i2 = 0; i2 < e2.length; i2++)
                delete this.files[e2[i2].name];
            return this;
          }, generate: function(t2) {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(t2) {
            var e2, r2 = {};
            try {
              if ((r2 = u.extend(t2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: n.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), r2.type === "binarystring" && (r2.type = "string"), !r2.type)
                throw new Error("No output type specified.");
              u.checkSupport(r2.type), r2.platform !== "darwin" && r2.platform !== "freebsd" && r2.platform !== "linux" && r2.platform !== "sunos" || (r2.platform = "UNIX"), r2.platform === "win32" && (r2.platform = "DOS");
              var i2 = r2.comment || this.comment || "";
              e2 = o.generateWorker(this, r2, i2);
            } catch (t3) {
              (e2 = new l("error")).error(t3);
            }
            return new a(e2, r2.type || "string", r2.mimeType);
          }, generateAsync: function(t2, e2) {
            return this.generateInternalStream(t2).accumulate(e2);
          }, generateNodeStream: function(t2, e2) {
            return (t2 = t2 || {}).type || (t2.type = "nodebuffer"), this.generateInternalStream(t2).toNodejsStream(e2);
          } };
          e.exports = i;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(t, e, r) {
          e.exports = t("stream");
        }, { stream: void 0 }], 17: [function(t, e, r) {
          "use strict";
          var i = t("./DataReader");
          function n(t2) {
            i.call(this, t2);
            for (var e2 = 0; e2 < this.data.length; e2++)
              t2[e2] = 255 & t2[e2];
          }
          t("../utils").inherits(n, i), n.prototype.byteAt = function(t2) {
            return this.data[this.zero + t2];
          }, n.prototype.lastIndexOfSignature = function(t2) {
            for (var e2 = t2.charCodeAt(0), r2 = t2.charCodeAt(1), i2 = t2.charCodeAt(2), n2 = t2.charCodeAt(3), s = this.length - 4; 0 <= s; --s)
              if (this.data[s] === e2 && this.data[s + 1] === r2 && this.data[s + 2] === i2 && this.data[s + 3] === n2)
                return s - this.zero;
            return -1;
          }, n.prototype.readAndCheckSignature = function(t2) {
            var e2 = t2.charCodeAt(0), r2 = t2.charCodeAt(1), i2 = t2.charCodeAt(2), n2 = t2.charCodeAt(3), s = this.readData(4);
            return e2 === s[0] && r2 === s[1] && i2 === s[2] && n2 === s[3];
          }, n.prototype.readData = function(t2) {
            if (this.checkOffset(t2), t2 === 0)
              return [];
            var e2 = this.data.slice(this.zero + this.index, this.zero + this.index + t2);
            return this.index += t2, e2;
          }, e.exports = n;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(t, e, r) {
          "use strict";
          var i = t("../utils");
          function n(t2) {
            this.data = t2, this.length = t2.length, this.index = 0, this.zero = 0;
          }
          n.prototype = { checkOffset: function(t2) {
            this.checkIndex(this.index + t2);
          }, checkIndex: function(t2) {
            if (this.length < this.zero + t2 || t2 < 0)
              throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t2 + "). Corrupted zip ?");
          }, setIndex: function(t2) {
            this.checkIndex(t2), this.index = t2;
          }, skip: function(t2) {
            this.setIndex(this.index + t2);
          }, byteAt: function(t2) {
          }, readInt: function(t2) {
            var e2, r2 = 0;
            for (this.checkOffset(t2), e2 = this.index + t2 - 1; e2 >= this.index; e2--)
              r2 = (r2 << 8) + this.byteAt(e2);
            return this.index += t2, r2;
          }, readString: function(t2) {
            return i.transformTo("string", this.readData(t2));
          }, readData: function(t2) {
          }, lastIndexOfSignature: function(t2) {
          }, readAndCheckSignature: function(t2) {
          }, readDate: function() {
            var t2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (t2 >> 25 & 127), (t2 >> 21 & 15) - 1, t2 >> 16 & 31, t2 >> 11 & 31, t2 >> 5 & 63, (31 & t2) << 1));
          } }, e.exports = n;
        }, { "../utils": 32 }], 19: [function(t, e, r) {
          "use strict";
          var i = t("./Uint8ArrayReader");
          function n(t2) {
            i.call(this, t2);
          }
          t("../utils").inherits(n, i), n.prototype.readData = function(t2) {
            this.checkOffset(t2);
            var e2 = this.data.slice(this.zero + this.index, this.zero + this.index + t2);
            return this.index += t2, e2;
          }, e.exports = n;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(t, e, r) {
          "use strict";
          var i = t("./DataReader");
          function n(t2) {
            i.call(this, t2);
          }
          t("../utils").inherits(n, i), n.prototype.byteAt = function(t2) {
            return this.data.charCodeAt(this.zero + t2);
          }, n.prototype.lastIndexOfSignature = function(t2) {
            return this.data.lastIndexOf(t2) - this.zero;
          }, n.prototype.readAndCheckSignature = function(t2) {
            return t2 === this.readData(4);
          }, n.prototype.readData = function(t2) {
            this.checkOffset(t2);
            var e2 = this.data.slice(this.zero + this.index, this.zero + this.index + t2);
            return this.index += t2, e2;
          }, e.exports = n;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(t, e, r) {
          "use strict";
          var i = t("./ArrayReader");
          function n(t2) {
            i.call(this, t2);
          }
          t("../utils").inherits(n, i), n.prototype.readData = function(t2) {
            if (this.checkOffset(t2), t2 === 0)
              return new Uint8Array(0);
            var e2 = this.data.subarray(this.zero + this.index, this.zero + this.index + t2);
            return this.index += t2, e2;
          }, e.exports = n;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(t, e, r) {
          "use strict";
          var i = t("../utils"), n = t("../support"), s = t("./ArrayReader"), a = t("./StringReader"), o = t("./NodeBufferReader"), h = t("./Uint8ArrayReader");
          e.exports = function(t2) {
            var e2 = i.getTypeOf(t2);
            return i.checkSupport(e2), e2 !== "string" || n.uint8array ? e2 === "nodebuffer" ? new o(t2) : n.uint8array ? new h(i.transformTo("uint8array", t2)) : new s(i.transformTo("array", t2)) : new a(t2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(t, e, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(t, e, r) {
          "use strict";
          var i = t("./GenericWorker"), n = t("../utils");
          function s(t2) {
            i.call(this, "ConvertWorker to " + t2), this.destType = t2;
          }
          n.inherits(s, i), s.prototype.processChunk = function(t2) {
            this.push({ data: n.transformTo(this.destType, t2.data), meta: t2.meta });
          }, e.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(t, e, r) {
          "use strict";
          var i = t("./GenericWorker"), n = t("../crc32");
          function s() {
            i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          t("../utils").inherits(s, i), s.prototype.processChunk = function(t2) {
            this.streamInfo.crc32 = n(t2.data, this.streamInfo.crc32 || 0), this.push(t2);
          }, e.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(t, e, r) {
          "use strict";
          var i = t("../utils"), n = t("./GenericWorker");
          function s(t2) {
            n.call(this, "DataLengthProbe for " + t2), this.propName = t2, this.withStreamInfo(t2, 0);
          }
          i.inherits(s, n), s.prototype.processChunk = function(t2) {
            if (t2) {
              var e2 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = e2 + t2.data.length;
            }
            n.prototype.processChunk.call(this, t2);
          }, e.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(t, e, r) {
          "use strict";
          var i = t("../utils"), n = t("./GenericWorker");
          function s(t2) {
            n.call(this, "DataWorker");
            var e2 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, t2.then(function(t3) {
              e2.dataIsReady = true, e2.data = t3, e2.max = t3 && t3.length || 0, e2.type = i.getTypeOf(t3), e2.isPaused || e2._tickAndRepeat();
            }, function(t3) {
              e2.error(t3);
            });
          }
          i.inherits(s, n), s.prototype.cleanUp = function() {
            n.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, i.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished)
              return false;
            var t2 = null, e2 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max)
              return this.end();
            switch (this.type) {
              case "string":
                t2 = this.data.substring(this.index, e2);
                break;
              case "uint8array":
                t2 = this.data.subarray(this.index, e2);
                break;
              case "array":
              case "nodebuffer":
                t2 = this.data.slice(this.index, e2);
            }
            return this.index = e2, this.push({ data: t2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, e.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(t, e, r) {
          "use strict";
          function i(t2) {
            this.name = t2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          i.prototype = { push: function(t2) {
            this.emit("data", t2);
          }, end: function() {
            if (this.isFinished)
              return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (t2) {
              this.emit("error", t2);
            }
            return true;
          }, error: function(t2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = t2 : (this.isFinished = true, this.emit("error", t2), this.previous && this.previous.error(t2), this.cleanUp()), true);
          }, on: function(t2, e2) {
            return this._listeners[t2].push(e2), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(t2, e2) {
            if (this._listeners[t2])
              for (var r2 = 0; r2 < this._listeners[t2].length; r2++)
                this._listeners[t2][r2].call(this, e2);
          }, pipe: function(t2) {
            return t2.registerPrevious(this);
          }, registerPrevious: function(t2) {
            if (this.isLocked)
              throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = t2.streamInfo, this.mergeStreamInfo(), this.previous = t2;
            var e2 = this;
            return t2.on("data", function(t3) {
              e2.processChunk(t3);
            }), t2.on("end", function() {
              e2.end();
            }), t2.on("error", function(t3) {
              e2.error(t3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished)
              return false;
            var t2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), t2 = true), this.previous && this.previous.resume(), !t2;
          }, flush: function() {
          }, processChunk: function(t2) {
            this.push(t2);
          }, withStreamInfo: function(t2, e2) {
            return this.extraStreamInfo[t2] = e2, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var t2 in this.extraStreamInfo)
              this.extraStreamInfo.hasOwnProperty(t2) && (this.streamInfo[t2] = this.extraStreamInfo[t2]);
          }, lock: function() {
            if (this.isLocked)
              throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var t2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + t2 : t2;
          } }, e.exports = i;
        }, {}], 29: [function(t, e, r) {
          "use strict";
          var h = t("../utils"), n = t("./ConvertWorker"), s = t("./GenericWorker"), u = t("../base64"), i = t("../support"), a = t("../external"), o = null;
          if (i.nodestream)
            try {
              o = t("../nodejs/NodejsStreamOutputAdapter");
            } catch (t2) {
            }
          function l(t2, o2) {
            return new a.Promise(function(e2, r2) {
              var i2 = [], n2 = t2._internalType, s2 = t2._outputType, a2 = t2._mimeType;
              t2.on("data", function(t3, e3) {
                i2.push(t3), o2 && o2(e3);
              }).on("error", function(t3) {
                i2 = [], r2(t3);
              }).on("end", function() {
                try {
                  var t3 = function(t4, e3, r3) {
                    switch (t4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", e3), r3);
                      case "base64":
                        return u.encode(e3);
                      default:
                        return h.transformTo(t4, e3);
                    }
                  }(s2, function(t4, e3) {
                    var r3, i3 = 0, n3 = null, s3 = 0;
                    for (r3 = 0; r3 < e3.length; r3++)
                      s3 += e3[r3].length;
                    switch (t4) {
                      case "string":
                        return e3.join("");
                      case "array":
                        return Array.prototype.concat.apply([], e3);
                      case "uint8array":
                        for (n3 = new Uint8Array(s3), r3 = 0; r3 < e3.length; r3++)
                          n3.set(e3[r3], i3), i3 += e3[r3].length;
                        return n3;
                      case "nodebuffer":
                        return Buffer.concat(e3);
                      default:
                        throw new Error("concat : unsupported type '" + t4 + "'");
                    }
                  }(n2, i2), a2);
                  e2(t3);
                } catch (t4) {
                  r2(t4);
                }
                i2 = [];
              }).resume();
            });
          }
          function f(t2, e2, r2) {
            var i2 = e2;
            switch (e2) {
              case "blob":
              case "arraybuffer":
                i2 = "uint8array";
                break;
              case "base64":
                i2 = "string";
            }
            try {
              this._internalType = i2, this._outputType = e2, this._mimeType = r2, h.checkSupport(i2), this._worker = t2.pipe(new n(i2)), t2.lock();
            } catch (t3) {
              this._worker = new s("error"), this._worker.error(t3);
            }
          }
          f.prototype = { accumulate: function(t2) {
            return l(this, t2);
          }, on: function(t2, e2) {
            var r2 = this;
            return t2 === "data" ? this._worker.on(t2, function(t3) {
              e2.call(r2, t3.data, t3.meta);
            }) : this._worker.on(t2, function() {
              h.delay(e2, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(t2) {
            if (h.checkSupport("nodestream"), this._outputType !== "nodebuffer")
              throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: this._outputType !== "nodebuffer" }, t2);
          } }, e.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(t, e, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = typeof ArrayBuffer != "undefined" && typeof Uint8Array != "undefined", r.nodebuffer = typeof Buffer != "undefined", r.uint8array = typeof Uint8Array != "undefined", typeof ArrayBuffer == "undefined")
            r.blob = false;
          else {
            var i = new ArrayBuffer(0);
            try {
              r.blob = new Blob([i], { type: "application/zip" }).size === 0;
            } catch (t2) {
              try {
                var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                n.append(i), r.blob = n.getBlob("application/zip").size === 0;
              } catch (t3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!t("readable-stream").Readable;
          } catch (t2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(t, e, s) {
          "use strict";
          for (var o = t("./utils"), h = t("./support"), r = t("./nodejsUtils"), i = t("./stream/GenericWorker"), u = new Array(256), n = 0; n < 256; n++)
            u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            i.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            i.call(this, "utf-8 encode");
          }
          s.utf8encode = function(t2) {
            return h.nodebuffer ? r.newBufferFrom(t2, "utf-8") : function(t3) {
              var e2, r2, i2, n2, s2, a2 = t3.length, o2 = 0;
              for (n2 = 0; n2 < a2; n2++)
                (64512 & (r2 = t3.charCodeAt(n2))) == 55296 && n2 + 1 < a2 && (64512 & (i2 = t3.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (e2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), n2 = s2 = 0; s2 < o2; n2++)
                (64512 & (r2 = t3.charCodeAt(n2))) == 55296 && n2 + 1 < a2 && (64512 & (i2 = t3.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), r2 < 128 ? e2[s2++] = r2 : (r2 < 2048 ? e2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? e2[s2++] = 224 | r2 >>> 12 : (e2[s2++] = 240 | r2 >>> 18, e2[s2++] = 128 | r2 >>> 12 & 63), e2[s2++] = 128 | r2 >>> 6 & 63), e2[s2++] = 128 | 63 & r2);
              return e2;
            }(t2);
          }, s.utf8decode = function(t2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", t2).toString("utf-8") : function(t3) {
              var e2, r2, i2, n2, s2 = t3.length, a2 = new Array(2 * s2);
              for (e2 = r2 = 0; e2 < s2; )
                if ((i2 = t3[e2++]) < 128)
                  a2[r2++] = i2;
                else if (4 < (n2 = u[i2]))
                  a2[r2++] = 65533, e2 += n2 - 1;
                else {
                  for (i2 &= n2 === 2 ? 31 : n2 === 3 ? 15 : 7; 1 < n2 && e2 < s2; )
                    i2 = i2 << 6 | 63 & t3[e2++], n2--;
                  1 < n2 ? a2[r2++] = 65533 : i2 < 65536 ? a2[r2++] = i2 : (i2 -= 65536, a2[r2++] = 55296 | i2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & i2);
                }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            }(t2 = o.transformTo(h.uint8array ? "uint8array" : "array", t2));
          }, o.inherits(a, i), a.prototype.processChunk = function(t2) {
            var e2 = o.transformTo(h.uint8array ? "uint8array" : "array", t2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = e2;
                (e2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), e2.set(r2, this.leftOver.length);
              } else
                e2 = this.leftOver.concat(e2);
              this.leftOver = null;
            }
            var i2 = function(t3, e3) {
              var r3;
              for ((e3 = e3 || t3.length) > t3.length && (e3 = t3.length), r3 = e3 - 1; 0 <= r3 && (192 & t3[r3]) == 128; )
                r3--;
              return r3 < 0 ? e3 : r3 === 0 ? e3 : r3 + u[t3[r3]] > e3 ? r3 : e3;
            }(e2), n2 = e2;
            i2 !== e2.length && (h.uint8array ? (n2 = e2.subarray(0, i2), this.leftOver = e2.subarray(i2, e2.length)) : (n2 = e2.slice(0, i2), this.leftOver = e2.slice(i2, e2.length))), this.push({ data: s.utf8decode(n2), meta: t2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, i), l.prototype.processChunk = function(t2) {
            this.push({ data: s.utf8encode(t2.data), meta: t2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(t, e, a) {
          "use strict";
          var o = t("./support"), h = t("./base64"), r = t("./nodejsUtils"), i = t("set-immediate-shim"), u = t("./external");
          function n(t2) {
            return t2;
          }
          function l(t2, e2) {
            for (var r2 = 0; r2 < t2.length; ++r2)
              e2[r2] = 255 & t2.charCodeAt(r2);
            return e2;
          }
          a.newBlob = function(e2, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([e2], { type: r2 });
            } catch (t2) {
              try {
                var i2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return i2.append(e2), i2.getBlob(r2);
              } catch (t3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var s = { stringifyByChunk: function(t2, e2, r2) {
            var i2 = [], n2 = 0, s2 = t2.length;
            if (s2 <= r2)
              return String.fromCharCode.apply(null, t2);
            for (; n2 < s2; )
              e2 === "array" || e2 === "nodebuffer" ? i2.push(String.fromCharCode.apply(null, t2.slice(n2, Math.min(n2 + r2, s2)))) : i2.push(String.fromCharCode.apply(null, t2.subarray(n2, Math.min(n2 + r2, s2)))), n2 += r2;
            return i2.join("");
          }, stringifyByChar: function(t2) {
            for (var e2 = "", r2 = 0; r2 < t2.length; r2++)
              e2 += String.fromCharCode(t2[r2]);
            return e2;
          }, applyCanBeUsed: { uint8array: function() {
            try {
              return o.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
            } catch (t2) {
              return false;
            }
          }(), nodebuffer: function() {
            try {
              return o.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
            } catch (t2) {
              return false;
            }
          }() } };
          function f(t2) {
            var e2 = 65536, r2 = a.getTypeOf(t2), i2 = true;
            if (r2 === "uint8array" ? i2 = s.applyCanBeUsed.uint8array : r2 === "nodebuffer" && (i2 = s.applyCanBeUsed.nodebuffer), i2)
              for (; 1 < e2; )
                try {
                  return s.stringifyByChunk(t2, r2, e2);
                } catch (t3) {
                  e2 = Math.floor(e2 / 2);
                }
            return s.stringifyByChar(t2);
          }
          function d(t2, e2) {
            for (var r2 = 0; r2 < t2.length; r2++)
              e2[r2] = t2[r2];
            return e2;
          }
          a.applyFromCharCode = f;
          var c = {};
          c.string = { string: n, array: function(t2) {
            return l(t2, new Array(t2.length));
          }, arraybuffer: function(t2) {
            return c.string.uint8array(t2).buffer;
          }, uint8array: function(t2) {
            return l(t2, new Uint8Array(t2.length));
          }, nodebuffer: function(t2) {
            return l(t2, r.allocBuffer(t2.length));
          } }, c.array = { string: f, array: n, arraybuffer: function(t2) {
            return new Uint8Array(t2).buffer;
          }, uint8array: function(t2) {
            return new Uint8Array(t2);
          }, nodebuffer: function(t2) {
            return r.newBufferFrom(t2);
          } }, c.arraybuffer = { string: function(t2) {
            return f(new Uint8Array(t2));
          }, array: function(t2) {
            return d(new Uint8Array(t2), new Array(t2.byteLength));
          }, arraybuffer: n, uint8array: function(t2) {
            return new Uint8Array(t2);
          }, nodebuffer: function(t2) {
            return r.newBufferFrom(new Uint8Array(t2));
          } }, c.uint8array = { string: f, array: function(t2) {
            return d(t2, new Array(t2.length));
          }, arraybuffer: function(t2) {
            return t2.buffer;
          }, uint8array: n, nodebuffer: function(t2) {
            return r.newBufferFrom(t2);
          } }, c.nodebuffer = { string: f, array: function(t2) {
            return d(t2, new Array(t2.length));
          }, arraybuffer: function(t2) {
            return c.nodebuffer.uint8array(t2).buffer;
          }, uint8array: function(t2) {
            return d(t2, new Uint8Array(t2.length));
          }, nodebuffer: n }, a.transformTo = function(t2, e2) {
            if (e2 = e2 || "", !t2)
              return e2;
            a.checkSupport(t2);
            var r2 = a.getTypeOf(e2);
            return c[r2][t2](e2);
          }, a.getTypeOf = function(t2) {
            return typeof t2 == "string" ? "string" : Object.prototype.toString.call(t2) === "[object Array]" ? "array" : o.nodebuffer && r.isBuffer(t2) ? "nodebuffer" : o.uint8array && t2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && t2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function(t2) {
            if (!o[t2.toLowerCase()])
              throw new Error(t2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(t2) {
            var e2, r2, i2 = "";
            for (r2 = 0; r2 < (t2 || "").length; r2++)
              i2 += "\\x" + ((e2 = t2.charCodeAt(r2)) < 16 ? "0" : "") + e2.toString(16).toUpperCase();
            return i2;
          }, a.delay = function(t2, e2, r2) {
            i(function() {
              t2.apply(r2 || null, e2 || []);
            });
          }, a.inherits = function(t2, e2) {
            function r2() {
            }
            r2.prototype = e2.prototype, t2.prototype = new r2();
          }, a.extend = function() {
            var t2, e2, r2 = {};
            for (t2 = 0; t2 < arguments.length; t2++)
              for (e2 in arguments[t2])
                arguments[t2].hasOwnProperty(e2) && r2[e2] === void 0 && (r2[e2] = arguments[t2][e2]);
            return r2;
          }, a.prepareContent = function(r2, t2, i2, n2, s2) {
            return u.Promise.resolve(t2).then(function(i3) {
              return o.blob && (i3 instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(i3)) !== -1) && typeof FileReader != "undefined" ? new u.Promise(function(e2, r3) {
                var t3 = new FileReader();
                t3.onload = function(t4) {
                  e2(t4.target.result);
                }, t3.onerror = function(t4) {
                  r3(t4.target.error);
                }, t3.readAsArrayBuffer(i3);
              }) : i3;
            }).then(function(t3) {
              var e2 = a.getTypeOf(t3);
              return e2 ? (e2 === "arraybuffer" ? t3 = a.transformTo("uint8array", t3) : e2 === "string" && (s2 ? t3 = h.decode(t3) : i2 && n2 !== true && (t3 = function(t4) {
                return l(t4, o.uint8array ? new Uint8Array(t4.length) : new Array(t4.length));
              }(t3))), t3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "set-immediate-shim": 54 }], 33: [function(t, e, r) {
          "use strict";
          var i = t("./reader/readerFor"), n = t("./utils"), s = t("./signature"), a = t("./zipEntry"), o = (t("./utf8"), t("./support"));
          function h(t2) {
            this.files = [], this.loadOptions = t2;
          }
          h.prototype = { checkSignature: function(t2) {
            if (!this.reader.readAndCheckSignature(t2)) {
              this.reader.index -= 4;
              var e2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(e2) + ", expected " + n.pretty(t2) + ")");
            }
          }, isSignature: function(t2, e2) {
            var r2 = this.reader.index;
            this.reader.setIndex(t2);
            var i2 = this.reader.readString(4) === e2;
            return this.reader.setIndex(r2), i2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var t2 = this.reader.readData(this.zipCommentLength), e2 = o.uint8array ? "uint8array" : "array", r2 = n.transformTo(e2, t2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var t2, e2, r2, i2 = this.zip64EndOfCentralSize - 44; 0 < i2; )
              t2 = this.reader.readInt(2), e2 = this.reader.readInt(4), r2 = this.reader.readData(e2), this.zip64ExtensibleData[t2] = { id: t2, length: e2, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
              throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var t2, e2;
            for (t2 = 0; t2 < this.files.length; t2++)
              e2 = this.files[t2], this.reader.setIndex(e2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), e2.readLocalPart(this.reader), e2.handleUTF8(), e2.processAttributes();
          }, readCentralDir: function() {
            var t2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); )
              (t2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t2);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
              throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var t2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (t2 < 0)
              throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(t2);
            var e2 = t2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (t2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(t2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var i2 = e2 - r2;
            if (0 < i2)
              this.isSignature(e2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = i2);
            else if (i2 < 0)
              throw new Error("Corrupted zip: missing " + Math.abs(i2) + " bytes.");
          }, prepareReader: function(t2) {
            this.reader = i(t2);
          }, load: function(t2) {
            this.prepareReader(t2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, e.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utf8": 31, "./utils": 32, "./zipEntry": 34 }], 34: [function(t, e, r) {
          "use strict";
          var i = t("./reader/readerFor"), s = t("./utils"), n = t("./compressedObject"), a = t("./crc32"), o = t("./utf8"), h = t("./compressions"), u = t("./support");
          function l(t2, e2) {
            this.options = t2, this.loadOptions = e2;
          }
          l.prototype = { isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          }, useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          }, readLocalPart: function(t2) {
            var e2, r2;
            if (t2.skip(22), this.fileNameLength = t2.readInt(2), r2 = t2.readInt(2), this.fileName = t2.readData(this.fileNameLength), t2.skip(r2), this.compressedSize === -1 || this.uncompressedSize === -1)
              throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((e2 = function(t3) {
              for (var e3 in h)
                if (h.hasOwnProperty(e3) && h[e3].magic === t3)
                  return h[e3];
              return null;
            }(this.compressionMethod)) === null)
              throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, e2, t2.readData(this.compressedSize));
          }, readCentralPart: function(t2) {
            this.versionMadeBy = t2.readInt(2), t2.skip(2), this.bitFlag = t2.readInt(2), this.compressionMethod = t2.readString(2), this.date = t2.readDate(), this.crc32 = t2.readInt(4), this.compressedSize = t2.readInt(4), this.uncompressedSize = t2.readInt(4);
            var e2 = t2.readInt(2);
            if (this.extraFieldsLength = t2.readInt(2), this.fileCommentLength = t2.readInt(2), this.diskNumberStart = t2.readInt(2), this.internalFileAttributes = t2.readInt(2), this.externalFileAttributes = t2.readInt(4), this.localHeaderOffset = t2.readInt(4), this.isEncrypted())
              throw new Error("Encrypted zip are not supported");
            t2.skip(e2), this.readExtraFields(t2), this.parseZIP64ExtraField(t2), this.fileComment = t2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var t2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), t2 == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), t2 == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = true);
          }, parseZIP64ExtraField: function(t2) {
            if (this.extraFields[1]) {
              var e2 = i(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(t2) {
            var e2, r2, i2, n2 = t2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); t2.index + 4 < n2; )
              e2 = t2.readInt(2), r2 = t2.readInt(2), i2 = t2.readData(r2), this.extraFields[e2] = { id: e2, length: r2, value: i2 };
            t2.setIndex(n2);
          }, handleUTF8: function() {
            var t2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8())
              this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var e2 = this.findExtraFieldUnicodePath();
              if (e2 !== null)
                this.fileNameStr = e2;
              else {
                var r2 = s.transformTo(t2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var i2 = this.findExtraFieldUnicodeComment();
              if (i2 !== null)
                this.fileCommentStr = i2;
              else {
                var n2 = s.transformTo(t2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(n2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var t2 = this.extraFields[28789];
            if (t2) {
              var e2 = i(t2.value);
              return e2.readInt(1) !== 1 ? null : a(this.fileName) !== e2.readInt(4) ? null : o.utf8decode(e2.readData(t2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var t2 = this.extraFields[25461];
            if (t2) {
              var e2 = i(t2.value);
              return e2.readInt(1) !== 1 ? null : a(this.fileComment) !== e2.readInt(4) ? null : o.utf8decode(e2.readData(t2.length - 5));
            }
            return null;
          } }, e.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(t, e, r) {
          "use strict";
          function i(t2, e2, r2) {
            this.name = t2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = e2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = t("./stream/StreamHelper"), n = t("./stream/DataWorker"), a = t("./utf8"), o = t("./compressedObject"), h = t("./stream/GenericWorker");
          i.prototype = { internalStream: function(t2) {
            var e2 = null, r2 = "string";
            try {
              if (!t2)
                throw new Error("No output type specified.");
              var i2 = (r2 = t2.toLowerCase()) === "string" || r2 === "text";
              r2 !== "binarystring" && r2 !== "text" || (r2 = "string"), e2 = this._decompressWorker();
              var n2 = !this._dataBinary;
              n2 && !i2 && (e2 = e2.pipe(new a.Utf8EncodeWorker())), !n2 && i2 && (e2 = e2.pipe(new a.Utf8DecodeWorker()));
            } catch (t3) {
              (e2 = new h("error")).error(t3);
            }
            return new s(e2, r2, "");
          }, async: function(t2, e2) {
            return this.internalStream(t2).accumulate(e2);
          }, nodeStream: function(t2, e2) {
            return this.internalStream(t2 || "nodebuffer").toNodejsStream(e2);
          }, _compressWorker: function(t2, e2) {
            if (this._data instanceof o && this._data.compression.magic === t2.magic)
              return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, t2, e2);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new n(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++)
            i.prototype[u[f]] = l;
          e.exports = i;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(t, l, e) {
          (function(e2) {
            "use strict";
            var r, i, t2 = e2.MutationObserver || e2.WebKitMutationObserver;
            if (t2) {
              var n = 0, s = new t2(u), a = e2.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = n = ++n % 2;
              };
            } else if (e2.setImmediate || e2.MessageChannel === void 0)
              r = "document" in e2 && "onreadystatechange" in e2.document.createElement("script") ? function() {
                var t3 = e2.document.createElement("script");
                t3.onreadystatechange = function() {
                  u(), t3.onreadystatechange = null, t3.parentNode.removeChild(t3), t3 = null;
                }, e2.document.documentElement.appendChild(t3);
              } : function() {
                setTimeout(u, 0);
              };
            else {
              var o = new e2.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var t3, e3;
              i = true;
              for (var r2 = h.length; r2; ) {
                for (e3 = h, h = [], t3 = -1; ++t3 < r2; )
                  e3[t3]();
                r2 = h.length;
              }
              i = false;
            }
            l.exports = function(t3) {
              h.push(t3) !== 1 || i || r();
            };
          }).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
        }, {}], 37: [function(t, e, r) {
          "use strict";
          var n = t("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], i = ["PENDING"];
          function o(t2) {
            if (typeof t2 != "function")
              throw new TypeError("resolver must be a function");
            this.state = i, this.queue = [], this.outcome = void 0, t2 !== u && c(this, t2);
          }
          function h(t2, e2, r2) {
            this.promise = t2, typeof e2 == "function" && (this.onFulfilled = e2, this.callFulfilled = this.otherCallFulfilled), typeof r2 == "function" && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(e2, r2, i2) {
            n(function() {
              var t2;
              try {
                t2 = r2(i2);
              } catch (t3) {
                return l.reject(e2, t3);
              }
              t2 === e2 ? l.reject(e2, new TypeError("Cannot resolve promise with itself")) : l.resolve(e2, t2);
            });
          }
          function d(t2) {
            var e2 = t2 && t2.then;
            if (t2 && (typeof t2 == "object" || typeof t2 == "function") && typeof e2 == "function")
              return function() {
                e2.apply(t2, arguments);
              };
          }
          function c(e2, t2) {
            var r2 = false;
            function i2(t3) {
              r2 || (r2 = true, l.reject(e2, t3));
            }
            function n2(t3) {
              r2 || (r2 = true, l.resolve(e2, t3));
            }
            var s2 = p(function() {
              t2(n2, i2);
            });
            s2.status === "error" && i2(s2.value);
          }
          function p(t2, e2) {
            var r2 = {};
            try {
              r2.value = t2(e2), r2.status = "success";
            } catch (t3) {
              r2.status = "error", r2.value = t3;
            }
            return r2;
          }
          (e.exports = o).prototype.finally = function(e2) {
            if (typeof e2 != "function")
              return this;
            var r2 = this.constructor;
            return this.then(function(t2) {
              return r2.resolve(e2()).then(function() {
                return t2;
              });
            }, function(t2) {
              return r2.resolve(e2()).then(function() {
                throw t2;
              });
            });
          }, o.prototype.catch = function(t2) {
            return this.then(null, t2);
          }, o.prototype.then = function(t2, e2) {
            if (typeof t2 != "function" && this.state === a || typeof e2 != "function" && this.state === s)
              return this;
            var r2 = new this.constructor(u);
            this.state !== i ? f(r2, this.state === a ? t2 : e2, this.outcome) : this.queue.push(new h(r2, t2, e2));
            return r2;
          }, h.prototype.callFulfilled = function(t2) {
            l.resolve(this.promise, t2);
          }, h.prototype.otherCallFulfilled = function(t2) {
            f(this.promise, this.onFulfilled, t2);
          }, h.prototype.callRejected = function(t2) {
            l.reject(this.promise, t2);
          }, h.prototype.otherCallRejected = function(t2) {
            f(this.promise, this.onRejected, t2);
          }, l.resolve = function(t2, e2) {
            var r2 = p(d, e2);
            if (r2.status === "error")
              return l.reject(t2, r2.value);
            var i2 = r2.value;
            if (i2)
              c(t2, i2);
            else {
              t2.state = a, t2.outcome = e2;
              for (var n2 = -1, s2 = t2.queue.length; ++n2 < s2; )
                t2.queue[n2].callFulfilled(e2);
            }
            return t2;
          }, l.reject = function(t2, e2) {
            t2.state = s, t2.outcome = e2;
            for (var r2 = -1, i2 = t2.queue.length; ++r2 < i2; )
              t2.queue[r2].callRejected(e2);
            return t2;
          }, o.resolve = function(t2) {
            if (t2 instanceof this)
              return t2;
            return l.resolve(new this(u), t2);
          }, o.reject = function(t2) {
            var e2 = new this(u);
            return l.reject(e2, t2);
          }, o.all = function(t2) {
            var r2 = this;
            if (Object.prototype.toString.call(t2) !== "[object Array]")
              return this.reject(new TypeError("must be an array"));
            var i2 = t2.length, n2 = false;
            if (!i2)
              return this.resolve([]);
            var s2 = new Array(i2), a2 = 0, e2 = -1, o2 = new this(u);
            for (; ++e2 < i2; )
              h2(t2[e2], e2);
            return o2;
            function h2(t3, e3) {
              r2.resolve(t3).then(function(t4) {
                s2[e3] = t4, ++a2 !== i2 || n2 || (n2 = true, l.resolve(o2, s2));
              }, function(t4) {
                n2 || (n2 = true, l.reject(o2, t4));
              });
            }
          }, o.race = function(t2) {
            var e2 = this;
            if (Object.prototype.toString.call(t2) !== "[object Array]")
              return this.reject(new TypeError("must be an array"));
            var r2 = t2.length, i2 = false;
            if (!r2)
              return this.resolve([]);
            var n2 = -1, s2 = new this(u);
            for (; ++n2 < r2; )
              a2 = t2[n2], e2.resolve(a2).then(function(t3) {
                i2 || (i2 = true, l.resolve(s2, t3));
              }, function(t3) {
                i2 || (i2 = true, l.reject(s2, t3));
              });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(t, e, r) {
          "use strict";
          var i = {};
          (0, t("./lib/utils/common").assign)(i, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), e.exports = i;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(t, e, r) {
          "use strict";
          var a = t("./zlib/deflate"), o = t("./utils/common"), h = t("./utils/strings"), n = t("./zlib/messages"), s = t("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, d = 0, c = 8;
          function p(t2) {
            if (!(this instanceof p))
              return new p(t2);
            this.options = o.assign({ level: f, method: c, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: d, to: "" }, t2 || {});
            var e2 = this.options;
            e2.raw && 0 < e2.windowBits ? e2.windowBits = -e2.windowBits : e2.gzip && 0 < e2.windowBits && e2.windowBits < 16 && (e2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, e2.level, e2.method, e2.windowBits, e2.memLevel, e2.strategy);
            if (r2 !== l)
              throw new Error(n[r2]);
            if (e2.header && a.deflateSetHeader(this.strm, e2.header), e2.dictionary) {
              var i2;
              if (i2 = typeof e2.dictionary == "string" ? h.string2buf(e2.dictionary) : u.call(e2.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(e2.dictionary) : e2.dictionary, (r2 = a.deflateSetDictionary(this.strm, i2)) !== l)
                throw new Error(n[r2]);
              this._dict_set = true;
            }
          }
          function i(t2, e2) {
            var r2 = new p(e2);
            if (r2.push(t2, true), r2.err)
              throw r2.msg || n[r2.err];
            return r2.result;
          }
          p.prototype.push = function(t2, e2) {
            var r2, i2, n2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended)
              return false;
            i2 = e2 === ~~e2 ? e2 : e2 === true ? 4 : 0, typeof t2 == "string" ? n2.input = h.string2buf(t2) : u.call(t2) === "[object ArrayBuffer]" ? n2.input = new Uint8Array(t2) : n2.input = t2, n2.next_in = 0, n2.avail_in = n2.input.length;
            do {
              if (n2.avail_out === 0 && (n2.output = new o.Buf8(s2), n2.next_out = 0, n2.avail_out = s2), (r2 = a.deflate(n2, i2)) !== 1 && r2 !== l)
                return this.onEnd(r2), !(this.ended = true);
              n2.avail_out !== 0 && (n2.avail_in !== 0 || i2 !== 4 && i2 !== 2) || (this.options.to === "string" ? this.onData(h.buf2binstring(o.shrinkBuf(n2.output, n2.next_out))) : this.onData(o.shrinkBuf(n2.output, n2.next_out)));
            } while ((0 < n2.avail_in || n2.avail_out === 0) && r2 !== 1);
            return i2 === 4 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : i2 !== 2 || (this.onEnd(l), !(n2.avail_out = 0));
          }, p.prototype.onData = function(t2) {
            this.chunks.push(t2);
          }, p.prototype.onEnd = function(t2) {
            t2 === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = t2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = i, r.deflateRaw = function(t2, e2) {
            return (e2 = e2 || {}).raw = true, i(t2, e2);
          }, r.gzip = function(t2, e2) {
            return (e2 = e2 || {}).gzip = true, i(t2, e2);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(t, e, r) {
          "use strict";
          var d = t("./zlib/inflate"), c = t("./utils/common"), p = t("./utils/strings"), m = t("./zlib/constants"), i = t("./zlib/messages"), n = t("./zlib/zstream"), s = t("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(t2) {
            if (!(this instanceof a))
              return new a(t2);
            this.options = c.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t2 || {});
            var e2 = this.options;
            e2.raw && 0 <= e2.windowBits && e2.windowBits < 16 && (e2.windowBits = -e2.windowBits, e2.windowBits === 0 && (e2.windowBits = -15)), !(0 <= e2.windowBits && e2.windowBits < 16) || t2 && t2.windowBits || (e2.windowBits += 32), 15 < e2.windowBits && e2.windowBits < 48 && (15 & e2.windowBits) == 0 && (e2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
            var r2 = d.inflateInit2(this.strm, e2.windowBits);
            if (r2 !== m.Z_OK)
              throw new Error(i[r2]);
            this.header = new s(), d.inflateGetHeader(this.strm, this.header);
          }
          function o(t2, e2) {
            var r2 = new a(e2);
            if (r2.push(t2, true), r2.err)
              throw r2.msg || i[r2.err];
            return r2.result;
          }
          a.prototype.push = function(t2, e2) {
            var r2, i2, n2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended)
              return false;
            i2 = e2 === ~~e2 ? e2 : e2 === true ? m.Z_FINISH : m.Z_NO_FLUSH, typeof t2 == "string" ? h.input = p.binstring2buf(t2) : _.call(t2) === "[object ArrayBuffer]" ? h.input = new Uint8Array(t2) : h.input = t2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (h.avail_out === 0 && (h.output = new c.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = d.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = typeof l == "string" ? p.string2buf(l) : _.call(l) === "[object ArrayBuffer]" ? new Uint8Array(l) : l, r2 = d.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && f === true && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK)
                return this.onEnd(r2), !(this.ended = true);
              h.next_out && (h.avail_out !== 0 && r2 !== m.Z_STREAM_END && (h.avail_in !== 0 || i2 !== m.Z_FINISH && i2 !== m.Z_SYNC_FLUSH) || (this.options.to === "string" ? (n2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - n2, a2 = p.buf2string(h.output, n2), h.next_out = s2, h.avail_out = u - s2, s2 && c.arraySet(h.output, h.output, n2, s2, 0), this.onData(a2)) : this.onData(c.shrinkBuf(h.output, h.next_out)))), h.avail_in === 0 && h.avail_out === 0 && (f = true);
            } while ((0 < h.avail_in || h.avail_out === 0) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (i2 = m.Z_FINISH), i2 === m.Z_FINISH ? (r2 = d.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : i2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(t2) {
            this.chunks.push(t2);
          }, a.prototype.onEnd = function(t2) {
            t2 === m.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = c.flattenChunks(this.chunks)), this.chunks = [], this.err = t2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(t2, e2) {
            return (e2 = e2 || {}).raw = true, o(t2, e2);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(t, e, r) {
          "use strict";
          var i = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Int32Array != "undefined";
          r.assign = function(t2) {
            for (var e2 = Array.prototype.slice.call(arguments, 1); e2.length; ) {
              var r2 = e2.shift();
              if (r2) {
                if (typeof r2 != "object")
                  throw new TypeError(r2 + "must be non-object");
                for (var i2 in r2)
                  r2.hasOwnProperty(i2) && (t2[i2] = r2[i2]);
              }
            }
            return t2;
          }, r.shrinkBuf = function(t2, e2) {
            return t2.length === e2 ? t2 : t2.subarray ? t2.subarray(0, e2) : (t2.length = e2, t2);
          };
          var n = { arraySet: function(t2, e2, r2, i2, n2) {
            if (e2.subarray && t2.subarray)
              t2.set(e2.subarray(r2, r2 + i2), n2);
            else
              for (var s2 = 0; s2 < i2; s2++)
                t2[n2 + s2] = e2[r2 + s2];
          }, flattenChunks: function(t2) {
            var e2, r2, i2, n2, s2, a;
            for (e2 = i2 = 0, r2 = t2.length; e2 < r2; e2++)
              i2 += t2[e2].length;
            for (a = new Uint8Array(i2), e2 = n2 = 0, r2 = t2.length; e2 < r2; e2++)
              s2 = t2[e2], a.set(s2, n2), n2 += s2.length;
            return a;
          } }, s = { arraySet: function(t2, e2, r2, i2, n2) {
            for (var s2 = 0; s2 < i2; s2++)
              t2[n2 + s2] = e2[r2 + s2];
          }, flattenChunks: function(t2) {
            return [].concat.apply([], t2);
          } };
          r.setTyped = function(t2) {
            t2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, n)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(i);
        }, {}], 42: [function(t, e, r) {
          "use strict";
          var h = t("./common"), n = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (t2) {
            n = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (t2) {
            s = false;
          }
          for (var u = new h.Buf8(256), i = 0; i < 256; i++)
            u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          function l(t2, e2) {
            if (e2 < 65537 && (t2.subarray && s || !t2.subarray && n))
              return String.fromCharCode.apply(null, h.shrinkBuf(t2, e2));
            for (var r2 = "", i2 = 0; i2 < e2; i2++)
              r2 += String.fromCharCode(t2[i2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(t2) {
            var e2, r2, i2, n2, s2, a = t2.length, o = 0;
            for (n2 = 0; n2 < a; n2++)
              (64512 & (r2 = t2.charCodeAt(n2))) == 55296 && n2 + 1 < a && (64512 & (i2 = t2.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (e2 = new h.Buf8(o), n2 = s2 = 0; s2 < o; n2++)
              (64512 & (r2 = t2.charCodeAt(n2))) == 55296 && n2 + 1 < a && (64512 & (i2 = t2.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), r2 < 128 ? e2[s2++] = r2 : (r2 < 2048 ? e2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? e2[s2++] = 224 | r2 >>> 12 : (e2[s2++] = 240 | r2 >>> 18, e2[s2++] = 128 | r2 >>> 12 & 63), e2[s2++] = 128 | r2 >>> 6 & 63), e2[s2++] = 128 | 63 & r2);
            return e2;
          }, r.buf2binstring = function(t2) {
            return l(t2, t2.length);
          }, r.binstring2buf = function(t2) {
            for (var e2 = new h.Buf8(t2.length), r2 = 0, i2 = e2.length; r2 < i2; r2++)
              e2[r2] = t2.charCodeAt(r2);
            return e2;
          }, r.buf2string = function(t2, e2) {
            var r2, i2, n2, s2, a = e2 || t2.length, o = new Array(2 * a);
            for (r2 = i2 = 0; r2 < a; )
              if ((n2 = t2[r2++]) < 128)
                o[i2++] = n2;
              else if (4 < (s2 = u[n2]))
                o[i2++] = 65533, r2 += s2 - 1;
              else {
                for (n2 &= s2 === 2 ? 31 : s2 === 3 ? 15 : 7; 1 < s2 && r2 < a; )
                  n2 = n2 << 6 | 63 & t2[r2++], s2--;
                1 < s2 ? o[i2++] = 65533 : n2 < 65536 ? o[i2++] = n2 : (n2 -= 65536, o[i2++] = 55296 | n2 >> 10 & 1023, o[i2++] = 56320 | 1023 & n2);
              }
            return l(o, i2);
          }, r.utf8border = function(t2, e2) {
            var r2;
            for ((e2 = e2 || t2.length) > t2.length && (e2 = t2.length), r2 = e2 - 1; 0 <= r2 && (192 & t2[r2]) == 128; )
              r2--;
            return r2 < 0 ? e2 : r2 === 0 ? e2 : r2 + u[t2[r2]] > e2 ? r2 : e2;
          };
        }, { "./common": 41 }], 43: [function(t, e, r) {
          "use strict";
          e.exports = function(t2, e2, r2, i) {
            for (var n = 65535 & t2 | 0, s = t2 >>> 16 & 65535 | 0, a = 0; r2 !== 0; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (n = n + e2[i++] | 0) | 0, --a; )
                ;
              n %= 65521, s %= 65521;
            }
            return n | s << 16 | 0;
          };
        }, {}], 44: [function(t, e, r) {
          "use strict";
          e.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(t, e, r) {
          "use strict";
          var o = function() {
            for (var t2, e2 = [], r2 = 0; r2 < 256; r2++) {
              t2 = r2;
              for (var i = 0; i < 8; i++)
                t2 = 1 & t2 ? 3988292384 ^ t2 >>> 1 : t2 >>> 1;
              e2[r2] = t2;
            }
            return e2;
          }();
          e.exports = function(t2, e2, r2, i) {
            var n = o, s = i + r2;
            t2 ^= -1;
            for (var a = i; a < s; a++)
              t2 = t2 >>> 8 ^ n[255 & (t2 ^ e2[a])];
            return -1 ^ t2;
          };
        }, {}], 46: [function(t, e, r) {
          "use strict";
          var h, d = t("../utils/common"), u = t("./trees"), c = t("./adler32"), p = t("./crc32"), i = t("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, n = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(t2, e2) {
            return t2.msg = i[e2], e2;
          }
          function T(t2) {
            return (t2 << 1) - (4 < t2 ? 9 : 0);
          }
          function D(t2) {
            for (var e2 = t2.length; 0 <= --e2; )
              t2[e2] = 0;
          }
          function F(t2) {
            var e2 = t2.state, r2 = e2.pending;
            r2 > t2.avail_out && (r2 = t2.avail_out), r2 !== 0 && (d.arraySet(t2.output, e2.pending_buf, e2.pending_out, r2, t2.next_out), t2.next_out += r2, e2.pending_out += r2, t2.total_out += r2, t2.avail_out -= r2, e2.pending -= r2, e2.pending === 0 && (e2.pending_out = 0));
          }
          function N(t2, e2) {
            u._tr_flush_block(t2, 0 <= t2.block_start ? t2.block_start : -1, t2.strstart - t2.block_start, e2), t2.block_start = t2.strstart, F(t2.strm);
          }
          function U(t2, e2) {
            t2.pending_buf[t2.pending++] = e2;
          }
          function P(t2, e2) {
            t2.pending_buf[t2.pending++] = e2 >>> 8 & 255, t2.pending_buf[t2.pending++] = 255 & e2;
          }
          function L(t2, e2) {
            var r2, i2, n2 = t2.max_chain_length, s2 = t2.strstart, a2 = t2.prev_length, o2 = t2.nice_match, h2 = t2.strstart > t2.w_size - z ? t2.strstart - (t2.w_size - z) : 0, u2 = t2.window, l2 = t2.w_mask, f2 = t2.prev, d2 = t2.strstart + S, c2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            t2.prev_length >= t2.good_match && (n2 >>= 2), o2 > t2.lookahead && (o2 = t2.lookahead);
            do {
              if (u2[(r2 = e2) + a2] === p2 && u2[r2 + a2 - 1] === c2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < d2);
                if (i2 = S - (d2 - s2), s2 = d2 - S, a2 < i2) {
                  if (t2.match_start = e2, o2 <= (a2 = i2))
                    break;
                  c2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((e2 = f2[e2 & l2]) > h2 && --n2 != 0);
            return a2 <= t2.lookahead ? a2 : t2.lookahead;
          }
          function j(t2) {
            var e2, r2, i2, n2, s2, a2, o2, h2, u2, l2, f2 = t2.w_size;
            do {
              if (n2 = t2.window_size - t2.lookahead - t2.strstart, t2.strstart >= f2 + (f2 - z)) {
                for (d.arraySet(t2.window, t2.window, f2, f2, 0), t2.match_start -= f2, t2.strstart -= f2, t2.block_start -= f2, e2 = r2 = t2.hash_size; i2 = t2.head[--e2], t2.head[e2] = f2 <= i2 ? i2 - f2 : 0, --r2; )
                  ;
                for (e2 = r2 = f2; i2 = t2.prev[--e2], t2.prev[e2] = f2 <= i2 ? i2 - f2 : 0, --r2; )
                  ;
                n2 += f2;
              }
              if (t2.strm.avail_in === 0)
                break;
              if (a2 = t2.strm, o2 = t2.window, h2 = t2.strstart + t2.lookahead, u2 = n2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = l2 === 0 ? 0 : (a2.avail_in -= l2, d.arraySet(o2, a2.input, a2.next_in, l2, h2), a2.state.wrap === 1 ? a2.adler = c(a2.adler, o2, l2, h2) : a2.state.wrap === 2 && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), t2.lookahead += r2, t2.lookahead + t2.insert >= x)
                for (s2 = t2.strstart - t2.insert, t2.ins_h = t2.window[s2], t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[s2 + 1]) & t2.hash_mask; t2.insert && (t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[s2 + x - 1]) & t2.hash_mask, t2.prev[s2 & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = s2, s2++, t2.insert--, !(t2.lookahead + t2.insert < x)); )
                  ;
            } while (t2.lookahead < z && t2.strm.avail_in !== 0);
          }
          function Z(t2, e2) {
            for (var r2, i2; ; ) {
              if (t2.lookahead < z) {
                if (j(t2), t2.lookahead < z && e2 === l)
                  return A;
                if (t2.lookahead === 0)
                  break;
              }
              if (r2 = 0, t2.lookahead >= x && (t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[t2.strstart + x - 1]) & t2.hash_mask, r2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart), r2 !== 0 && t2.strstart - r2 <= t2.w_size - z && (t2.match_length = L(t2, r2)), t2.match_length >= x)
                if (i2 = u._tr_tally(t2, t2.strstart - t2.match_start, t2.match_length - x), t2.lookahead -= t2.match_length, t2.match_length <= t2.max_lazy_match && t2.lookahead >= x) {
                  for (t2.match_length--; t2.strstart++, t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[t2.strstart + x - 1]) & t2.hash_mask, r2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart, --t2.match_length != 0; )
                    ;
                  t2.strstart++;
                } else
                  t2.strstart += t2.match_length, t2.match_length = 0, t2.ins_h = t2.window[t2.strstart], t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[t2.strstart + 1]) & t2.hash_mask;
              else
                i2 = u._tr_tally(t2, 0, t2.window[t2.strstart]), t2.lookahead--, t2.strstart++;
              if (i2 && (N(t2, false), t2.strm.avail_out === 0))
                return A;
            }
            return t2.insert = t2.strstart < x - 1 ? t2.strstart : x - 1, e2 === f ? (N(t2, true), t2.strm.avail_out === 0 ? O : B) : t2.last_lit && (N(t2, false), t2.strm.avail_out === 0) ? A : I;
          }
          function W(t2, e2) {
            for (var r2, i2, n2; ; ) {
              if (t2.lookahead < z) {
                if (j(t2), t2.lookahead < z && e2 === l)
                  return A;
                if (t2.lookahead === 0)
                  break;
              }
              if (r2 = 0, t2.lookahead >= x && (t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[t2.strstart + x - 1]) & t2.hash_mask, r2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart), t2.prev_length = t2.match_length, t2.prev_match = t2.match_start, t2.match_length = x - 1, r2 !== 0 && t2.prev_length < t2.max_lazy_match && t2.strstart - r2 <= t2.w_size - z && (t2.match_length = L(t2, r2), t2.match_length <= 5 && (t2.strategy === 1 || t2.match_length === x && 4096 < t2.strstart - t2.match_start) && (t2.match_length = x - 1)), t2.prev_length >= x && t2.match_length <= t2.prev_length) {
                for (n2 = t2.strstart + t2.lookahead - x, i2 = u._tr_tally(t2, t2.strstart - 1 - t2.prev_match, t2.prev_length - x), t2.lookahead -= t2.prev_length - 1, t2.prev_length -= 2; ++t2.strstart <= n2 && (t2.ins_h = (t2.ins_h << t2.hash_shift ^ t2.window[t2.strstart + x - 1]) & t2.hash_mask, r2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart), --t2.prev_length != 0; )
                  ;
                if (t2.match_available = 0, t2.match_length = x - 1, t2.strstart++, i2 && (N(t2, false), t2.strm.avail_out === 0))
                  return A;
              } else if (t2.match_available) {
                if ((i2 = u._tr_tally(t2, 0, t2.window[t2.strstart - 1])) && N(t2, false), t2.strstart++, t2.lookahead--, t2.strm.avail_out === 0)
                  return A;
              } else
                t2.match_available = 1, t2.strstart++, t2.lookahead--;
            }
            return t2.match_available && (i2 = u._tr_tally(t2, 0, t2.window[t2.strstart - 1]), t2.match_available = 0), t2.insert = t2.strstart < x - 1 ? t2.strstart : x - 1, e2 === f ? (N(t2, true), t2.strm.avail_out === 0 ? O : B) : t2.last_lit && (N(t2, false), t2.strm.avail_out === 0) ? A : I;
          }
          function M(t2, e2, r2, i2, n2) {
            this.good_length = t2, this.max_lazy = e2, this.nice_length = r2, this.max_chain = i2, this.func = n2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new d.Buf16(2 * w), this.dyn_dtree = new d.Buf16(2 * (2 * a + 1)), this.bl_tree = new d.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new d.Buf16(k + 1), this.heap = new d.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new d.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(t2) {
            var e2;
            return t2 && t2.state ? (t2.total_in = t2.total_out = 0, t2.data_type = n, (e2 = t2.state).pending = 0, e2.pending_out = 0, e2.wrap < 0 && (e2.wrap = -e2.wrap), e2.status = e2.wrap ? C : E, t2.adler = e2.wrap === 2 ? 0 : 1, e2.last_flush = l, u._tr_init(e2), m) : R(t2, _);
          }
          function K(t2) {
            var e2 = G(t2);
            return e2 === m && function(t3) {
              t3.window_size = 2 * t3.w_size, D(t3.head), t3.max_lazy_match = h[t3.level].max_lazy, t3.good_match = h[t3.level].good_length, t3.nice_match = h[t3.level].nice_length, t3.max_chain_length = h[t3.level].max_chain, t3.strstart = 0, t3.block_start = 0, t3.lookahead = 0, t3.insert = 0, t3.match_length = t3.prev_length = x - 1, t3.match_available = 0, t3.ins_h = 0;
            }(t2.state), e2;
          }
          function Y(t2, e2, r2, i2, n2, s2) {
            if (!t2)
              return _;
            var a2 = 1;
            if (e2 === g && (e2 = 6), i2 < 0 ? (a2 = 0, i2 = -i2) : 15 < i2 && (a2 = 2, i2 -= 16), n2 < 1 || y < n2 || r2 !== v || i2 < 8 || 15 < i2 || e2 < 0 || 9 < e2 || s2 < 0 || b < s2)
              return R(t2, _);
            i2 === 8 && (i2 = 9);
            var o2 = new H();
            return (t2.state = o2).strm = t2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = i2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = n2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new d.Buf8(2 * o2.w_size), o2.head = new d.Buf16(o2.hash_size), o2.prev = new d.Buf16(o2.w_size), o2.lit_bufsize = 1 << n2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new d.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = e2, o2.strategy = s2, o2.method = r2, K(t2);
          }
          h = [new M(0, 0, 0, 0, function(t2, e2) {
            var r2 = 65535;
            for (r2 > t2.pending_buf_size - 5 && (r2 = t2.pending_buf_size - 5); ; ) {
              if (t2.lookahead <= 1) {
                if (j(t2), t2.lookahead === 0 && e2 === l)
                  return A;
                if (t2.lookahead === 0)
                  break;
              }
              t2.strstart += t2.lookahead, t2.lookahead = 0;
              var i2 = t2.block_start + r2;
              if ((t2.strstart === 0 || t2.strstart >= i2) && (t2.lookahead = t2.strstart - i2, t2.strstart = i2, N(t2, false), t2.strm.avail_out === 0))
                return A;
              if (t2.strstart - t2.block_start >= t2.w_size - z && (N(t2, false), t2.strm.avail_out === 0))
                return A;
            }
            return t2.insert = 0, e2 === f ? (N(t2, true), t2.strm.avail_out === 0 ? O : B) : (t2.strstart > t2.block_start && (N(t2, false), t2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(t2, e2) {
            return Y(t2, e2, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(t2, e2) {
            return t2 && t2.state ? t2.state.wrap !== 2 ? _ : (t2.state.gzhead = e2, m) : _;
          }, r.deflate = function(t2, e2) {
            var r2, i2, n2, s2;
            if (!t2 || !t2.state || 5 < e2 || e2 < 0)
              return t2 ? R(t2, _) : _;
            if (i2 = t2.state, !t2.output || !t2.input && t2.avail_in !== 0 || i2.status === 666 && e2 !== f)
              return R(t2, t2.avail_out === 0 ? -5 : _);
            if (i2.strm = t2, r2 = i2.last_flush, i2.last_flush = e2, i2.status === C)
              if (i2.wrap === 2)
                t2.adler = 0, U(i2, 31), U(i2, 139), U(i2, 8), i2.gzhead ? (U(i2, (i2.gzhead.text ? 1 : 0) + (i2.gzhead.hcrc ? 2 : 0) + (i2.gzhead.extra ? 4 : 0) + (i2.gzhead.name ? 8 : 0) + (i2.gzhead.comment ? 16 : 0)), U(i2, 255 & i2.gzhead.time), U(i2, i2.gzhead.time >> 8 & 255), U(i2, i2.gzhead.time >> 16 & 255), U(i2, i2.gzhead.time >> 24 & 255), U(i2, i2.level === 9 ? 2 : 2 <= i2.strategy || i2.level < 2 ? 4 : 0), U(i2, 255 & i2.gzhead.os), i2.gzhead.extra && i2.gzhead.extra.length && (U(i2, 255 & i2.gzhead.extra.length), U(i2, i2.gzhead.extra.length >> 8 & 255)), i2.gzhead.hcrc && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending, 0)), i2.gzindex = 0, i2.status = 69) : (U(i2, 0), U(i2, 0), U(i2, 0), U(i2, 0), U(i2, 0), U(i2, i2.level === 9 ? 2 : 2 <= i2.strategy || i2.level < 2 ? 4 : 0), U(i2, 3), i2.status = E);
              else {
                var a2 = v + (i2.w_bits - 8 << 4) << 8;
                a2 |= (2 <= i2.strategy || i2.level < 2 ? 0 : i2.level < 6 ? 1 : i2.level === 6 ? 2 : 3) << 6, i2.strstart !== 0 && (a2 |= 32), a2 += 31 - a2 % 31, i2.status = E, P(i2, a2), i2.strstart !== 0 && (P(i2, t2.adler >>> 16), P(i2, 65535 & t2.adler)), t2.adler = 1;
              }
            if (i2.status === 69)
              if (i2.gzhead.extra) {
                for (n2 = i2.pending; i2.gzindex < (65535 & i2.gzhead.extra.length) && (i2.pending !== i2.pending_buf_size || (i2.gzhead.hcrc && i2.pending > n2 && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending - n2, n2)), F(t2), n2 = i2.pending, i2.pending !== i2.pending_buf_size)); )
                  U(i2, 255 & i2.gzhead.extra[i2.gzindex]), i2.gzindex++;
                i2.gzhead.hcrc && i2.pending > n2 && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending - n2, n2)), i2.gzindex === i2.gzhead.extra.length && (i2.gzindex = 0, i2.status = 73);
              } else
                i2.status = 73;
            if (i2.status === 73)
              if (i2.gzhead.name) {
                n2 = i2.pending;
                do {
                  if (i2.pending === i2.pending_buf_size && (i2.gzhead.hcrc && i2.pending > n2 && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending - n2, n2)), F(t2), n2 = i2.pending, i2.pending === i2.pending_buf_size)) {
                    s2 = 1;
                    break;
                  }
                  s2 = i2.gzindex < i2.gzhead.name.length ? 255 & i2.gzhead.name.charCodeAt(i2.gzindex++) : 0, U(i2, s2);
                } while (s2 !== 0);
                i2.gzhead.hcrc && i2.pending > n2 && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending - n2, n2)), s2 === 0 && (i2.gzindex = 0, i2.status = 91);
              } else
                i2.status = 91;
            if (i2.status === 91)
              if (i2.gzhead.comment) {
                n2 = i2.pending;
                do {
                  if (i2.pending === i2.pending_buf_size && (i2.gzhead.hcrc && i2.pending > n2 && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending - n2, n2)), F(t2), n2 = i2.pending, i2.pending === i2.pending_buf_size)) {
                    s2 = 1;
                    break;
                  }
                  s2 = i2.gzindex < i2.gzhead.comment.length ? 255 & i2.gzhead.comment.charCodeAt(i2.gzindex++) : 0, U(i2, s2);
                } while (s2 !== 0);
                i2.gzhead.hcrc && i2.pending > n2 && (t2.adler = p(t2.adler, i2.pending_buf, i2.pending - n2, n2)), s2 === 0 && (i2.status = 103);
              } else
                i2.status = 103;
            if (i2.status === 103 && (i2.gzhead.hcrc ? (i2.pending + 2 > i2.pending_buf_size && F(t2), i2.pending + 2 <= i2.pending_buf_size && (U(i2, 255 & t2.adler), U(i2, t2.adler >> 8 & 255), t2.adler = 0, i2.status = E)) : i2.status = E), i2.pending !== 0) {
              if (F(t2), t2.avail_out === 0)
                return i2.last_flush = -1, m;
            } else if (t2.avail_in === 0 && T(e2) <= T(r2) && e2 !== f)
              return R(t2, -5);
            if (i2.status === 666 && t2.avail_in !== 0)
              return R(t2, -5);
            if (t2.avail_in !== 0 || i2.lookahead !== 0 || e2 !== l && i2.status !== 666) {
              var o2 = i2.strategy === 2 ? function(t3, e3) {
                for (var r3; ; ) {
                  if (t3.lookahead === 0 && (j(t3), t3.lookahead === 0)) {
                    if (e3 === l)
                      return A;
                    break;
                  }
                  if (t3.match_length = 0, r3 = u._tr_tally(t3, 0, t3.window[t3.strstart]), t3.lookahead--, t3.strstart++, r3 && (N(t3, false), t3.strm.avail_out === 0))
                    return A;
                }
                return t3.insert = 0, e3 === f ? (N(t3, true), t3.strm.avail_out === 0 ? O : B) : t3.last_lit && (N(t3, false), t3.strm.avail_out === 0) ? A : I;
              }(i2, e2) : i2.strategy === 3 ? function(t3, e3) {
                for (var r3, i3, n3, s3, a3 = t3.window; ; ) {
                  if (t3.lookahead <= S) {
                    if (j(t3), t3.lookahead <= S && e3 === l)
                      return A;
                    if (t3.lookahead === 0)
                      break;
                  }
                  if (t3.match_length = 0, t3.lookahead >= x && 0 < t3.strstart && (i3 = a3[n3 = t3.strstart - 1]) === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3]) {
                    s3 = t3.strstart + S;
                    do {
                    } while (i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && n3 < s3);
                    t3.match_length = S - (s3 - n3), t3.match_length > t3.lookahead && (t3.match_length = t3.lookahead);
                  }
                  if (t3.match_length >= x ? (r3 = u._tr_tally(t3, 1, t3.match_length - x), t3.lookahead -= t3.match_length, t3.strstart += t3.match_length, t3.match_length = 0) : (r3 = u._tr_tally(t3, 0, t3.window[t3.strstart]), t3.lookahead--, t3.strstart++), r3 && (N(t3, false), t3.strm.avail_out === 0))
                    return A;
                }
                return t3.insert = 0, e3 === f ? (N(t3, true), t3.strm.avail_out === 0 ? O : B) : t3.last_lit && (N(t3, false), t3.strm.avail_out === 0) ? A : I;
              }(i2, e2) : h[i2.level].func(i2, e2);
              if (o2 !== O && o2 !== B || (i2.status = 666), o2 === A || o2 === O)
                return t2.avail_out === 0 && (i2.last_flush = -1), m;
              if (o2 === I && (e2 === 1 ? u._tr_align(i2) : e2 !== 5 && (u._tr_stored_block(i2, 0, 0, false), e2 === 3 && (D(i2.head), i2.lookahead === 0 && (i2.strstart = 0, i2.block_start = 0, i2.insert = 0))), F(t2), t2.avail_out === 0))
                return i2.last_flush = -1, m;
            }
            return e2 !== f ? m : i2.wrap <= 0 ? 1 : (i2.wrap === 2 ? (U(i2, 255 & t2.adler), U(i2, t2.adler >> 8 & 255), U(i2, t2.adler >> 16 & 255), U(i2, t2.adler >> 24 & 255), U(i2, 255 & t2.total_in), U(i2, t2.total_in >> 8 & 255), U(i2, t2.total_in >> 16 & 255), U(i2, t2.total_in >> 24 & 255)) : (P(i2, t2.adler >>> 16), P(i2, 65535 & t2.adler)), F(t2), 0 < i2.wrap && (i2.wrap = -i2.wrap), i2.pending !== 0 ? m : 1);
          }, r.deflateEnd = function(t2) {
            var e2;
            return t2 && t2.state ? (e2 = t2.state.status) !== C && e2 !== 69 && e2 !== 73 && e2 !== 91 && e2 !== 103 && e2 !== E && e2 !== 666 ? R(t2, _) : (t2.state = null, e2 === E ? R(t2, -3) : m) : _;
          }, r.deflateSetDictionary = function(t2, e2) {
            var r2, i2, n2, s2, a2, o2, h2, u2, l2 = e2.length;
            if (!t2 || !t2.state)
              return _;
            if ((s2 = (r2 = t2.state).wrap) === 2 || s2 === 1 && r2.status !== C || r2.lookahead)
              return _;
            for (s2 === 1 && (t2.adler = c(t2.adler, e2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (s2 === 0 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new d.Buf8(r2.w_size), d.arraySet(u2, e2, l2 - r2.w_size, r2.w_size, 0), e2 = u2, l2 = r2.w_size), a2 = t2.avail_in, o2 = t2.next_in, h2 = t2.input, t2.avail_in = l2, t2.next_in = 0, t2.input = e2, j(r2); r2.lookahead >= x; ) {
              for (i2 = r2.strstart, n2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[i2 + x - 1]) & r2.hash_mask, r2.prev[i2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = i2, i2++, --n2; )
                ;
              r2.strstart = i2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, t2.next_in = o2, t2.input = h2, t2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(t, e, r) {
          "use strict";
          e.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(t, e, r) {
          "use strict";
          e.exports = function(t2, e2) {
            var r2, i, n, s, a, o, h, u, l, f, d, c, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = t2.state, i = t2.next_in, z = t2.input, n = i + (t2.avail_in - 5), s = t2.next_out, C = t2.output, a = s - (e2 - t2.avail_out), o = s + (t2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, d = r2.window, c = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            t:
              do {
                p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = m[c & g];
                e:
                  for (; ; ) {
                    if (c >>>= y = v >>> 24, p -= y, (y = v >>> 16 & 255) === 0)
                      C[s++] = 65535 & v;
                    else {
                      if (!(16 & y)) {
                        if ((64 & y) == 0) {
                          v = m[(65535 & v) + (c & (1 << y) - 1)];
                          continue e;
                        }
                        if (32 & y) {
                          r2.mode = 12;
                          break t;
                        }
                        t2.msg = "invalid literal/length code", r2.mode = 30;
                        break t;
                      }
                      w = 65535 & v, (y &= 15) && (p < y && (c += z[i++] << p, p += 8), w += c & (1 << y) - 1, c >>>= y, p -= y), p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = _[c & b];
                      r:
                        for (; ; ) {
                          if (c >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                            if ((64 & y) == 0) {
                              v = _[(65535 & v) + (c & (1 << y) - 1)];
                              continue r;
                            }
                            t2.msg = "invalid distance code", r2.mode = 30;
                            break t;
                          }
                          if (k = 65535 & v, p < (y &= 15) && (c += z[i++] << p, (p += 8) < y && (c += z[i++] << p, p += 8)), h < (k += c & (1 << y) - 1)) {
                            t2.msg = "invalid distance too far back", r2.mode = 30;
                            break t;
                          }
                          if (c >>>= y, p -= y, (y = s - a) < k) {
                            if (l < (y = k - y) && r2.sane) {
                              t2.msg = "invalid distance too far back", r2.mode = 30;
                              break t;
                            }
                            if (S = d, (x = 0) === f) {
                              if (x += u - y, y < w) {
                                for (w -= y; C[s++] = d[x++], --y; )
                                  ;
                                x = s - k, S = C;
                              }
                            } else if (f < y) {
                              if (x += u + f - y, (y -= f) < w) {
                                for (w -= y; C[s++] = d[x++], --y; )
                                  ;
                                if (x = 0, f < w) {
                                  for (w -= y = f; C[s++] = d[x++], --y; )
                                    ;
                                  x = s - k, S = C;
                                }
                              }
                            } else if (x += f - y, y < w) {
                              for (w -= y; C[s++] = d[x++], --y; )
                                ;
                              x = s - k, S = C;
                            }
                            for (; 2 < w; )
                              C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                            w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                          } else {
                            for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); )
                              ;
                            w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                          }
                          break;
                        }
                    }
                    break;
                  }
              } while (i < n && s < o);
            i -= w = p >> 3, c &= (1 << (p -= w << 3)) - 1, t2.next_in = i, t2.next_out = s, t2.avail_in = i < n ? n - i + 5 : 5 - (i - n), t2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = c, r2.bits = p;
          };
        }, {}], 49: [function(t, e, r) {
          "use strict";
          var I = t("../utils/common"), O = t("./adler32"), B = t("./crc32"), R = t("./inffast"), T = t("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, i = 852, n = 592;
          function L(t2) {
            return (t2 >>> 24 & 255) + (t2 >>> 8 & 65280) + ((65280 & t2) << 8) + ((255 & t2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(t2) {
            var e2;
            return t2 && t2.state ? (e2 = t2.state, t2.total_in = t2.total_out = e2.total = 0, t2.msg = "", e2.wrap && (t2.adler = 1 & e2.wrap), e2.mode = P, e2.last = 0, e2.havedict = 0, e2.dmax = 32768, e2.head = null, e2.hold = 0, e2.bits = 0, e2.lencode = e2.lendyn = new I.Buf32(i), e2.distcode = e2.distdyn = new I.Buf32(n), e2.sane = 1, e2.back = -1, N) : U;
          }
          function o(t2) {
            var e2;
            return t2 && t2.state ? ((e2 = t2.state).wsize = 0, e2.whave = 0, e2.wnext = 0, a(t2)) : U;
          }
          function h(t2, e2) {
            var r2, i2;
            return t2 && t2.state ? (i2 = t2.state, e2 < 0 ? (r2 = 0, e2 = -e2) : (r2 = 1 + (e2 >> 4), e2 < 48 && (e2 &= 15)), e2 && (e2 < 8 || 15 < e2) ? U : (i2.window !== null && i2.wbits !== e2 && (i2.window = null), i2.wrap = r2, i2.wbits = e2, o(t2))) : U;
          }
          function u(t2, e2) {
            var r2, i2;
            return t2 ? (i2 = new s(), (t2.state = i2).window = null, (r2 = h(t2, e2)) !== N && (t2.state = null), r2) : U;
          }
          var l, f, d = true;
          function j(t2) {
            if (d) {
              var e2;
              for (l = new I.Buf32(512), f = new I.Buf32(32), e2 = 0; e2 < 144; )
                t2.lens[e2++] = 8;
              for (; e2 < 256; )
                t2.lens[e2++] = 9;
              for (; e2 < 280; )
                t2.lens[e2++] = 7;
              for (; e2 < 288; )
                t2.lens[e2++] = 8;
              for (T(D, t2.lens, 0, 288, l, 0, t2.work, { bits: 9 }), e2 = 0; e2 < 32; )
                t2.lens[e2++] = 5;
              T(F, t2.lens, 0, 32, f, 0, t2.work, { bits: 5 }), d = false;
            }
            t2.lencode = l, t2.lenbits = 9, t2.distcode = f, t2.distbits = 5;
          }
          function Z(t2, e2, r2, i2) {
            var n2, s2 = t2.state;
            return s2.window === null && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), i2 >= s2.wsize ? (I.arraySet(s2.window, e2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (i2 < (n2 = s2.wsize - s2.wnext) && (n2 = i2), I.arraySet(s2.window, e2, r2 - i2, n2, s2.wnext), (i2 -= n2) ? (I.arraySet(s2.window, e2, r2 - i2, i2, 0), s2.wnext = i2, s2.whave = s2.wsize) : (s2.wnext += n2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += n2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(t2) {
            return u(t2, 15);
          }, r.inflateInit2 = u, r.inflate = function(t2, e2) {
            var r2, i2, n2, s2, a2, o2, h2, u2, l2, f2, d2, c, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!t2 || !t2.state || !t2.output || !t2.input && t2.avail_in !== 0)
              return U;
            (r2 = t2.state).mode === 12 && (r2.mode = 13), a2 = t2.next_out, n2 = t2.output, h2 = t2.avail_out, s2 = t2.next_in, i2 = t2.input, o2 = t2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, d2 = h2, x = N;
            t:
              for (; ; )
                switch (r2.mode) {
                  case P:
                    if (r2.wrap === 0) {
                      r2.mode = 13;
                      break;
                    }
                    for (; l2 < 16; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    if (2 & r2.wrap && u2 === 35615) {
                      E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                      break;
                    }
                    if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                      t2.msg = "incorrect header check", r2.mode = 30;
                      break;
                    }
                    if ((15 & u2) != 8) {
                      t2.msg = "unknown compression method", r2.mode = 30;
                      break;
                    }
                    if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), r2.wbits === 0)
                      r2.wbits = k;
                    else if (k > r2.wbits) {
                      t2.msg = "invalid window size", r2.mode = 30;
                      break;
                    }
                    r2.dmax = 1 << k, t2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                    break;
                  case 2:
                    for (; l2 < 16; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    if (r2.flags = u2, (255 & r2.flags) != 8) {
                      t2.msg = "unknown compression method", r2.mode = 30;
                      break;
                    }
                    if (57344 & r2.flags) {
                      t2.msg = "unknown header flags set", r2.mode = 30;
                      break;
                    }
                    r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
                  case 3:
                    for (; l2 < 32; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
                  case 4:
                    for (; l2 < 16; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
                  case 5:
                    if (1024 & r2.flags) {
                      for (; l2 < 16; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                    } else
                      r2.head && (r2.head.extra = null);
                    r2.mode = 6;
                  case 6:
                    if (1024 & r2.flags && (o2 < (c = r2.length) && (c = o2), c && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, i2, s2, c, k)), 512 & r2.flags && (r2.check = B(r2.check, i2, c, s2)), o2 -= c, s2 += c, r2.length -= c), r2.length))
                      break t;
                    r2.length = 0, r2.mode = 7;
                  case 7:
                    if (2048 & r2.flags) {
                      if (o2 === 0)
                        break t;
                      for (c = 0; k = i2[s2 + c++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && c < o2; )
                        ;
                      if (512 & r2.flags && (r2.check = B(r2.check, i2, c, s2)), o2 -= c, s2 += c, k)
                        break t;
                    } else
                      r2.head && (r2.head.name = null);
                    r2.length = 0, r2.mode = 8;
                  case 8:
                    if (4096 & r2.flags) {
                      if (o2 === 0)
                        break t;
                      for (c = 0; k = i2[s2 + c++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && c < o2; )
                        ;
                      if (512 & r2.flags && (r2.check = B(r2.check, i2, c, s2)), o2 -= c, s2 += c, k)
                        break t;
                    } else
                      r2.head && (r2.head.comment = null);
                    r2.mode = 9;
                  case 9:
                    if (512 & r2.flags) {
                      for (; l2 < 16; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      if (u2 !== (65535 & r2.check)) {
                        t2.msg = "header crc mismatch", r2.mode = 30;
                        break;
                      }
                      l2 = u2 = 0;
                    }
                    r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), t2.adler = r2.check = 0, r2.mode = 12;
                    break;
                  case 10:
                    for (; l2 < 32; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    t2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
                  case 11:
                    if (r2.havedict === 0)
                      return t2.next_out = a2, t2.avail_out = h2, t2.next_in = s2, t2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                    t2.adler = r2.check = 1, r2.mode = 12;
                  case 12:
                    if (e2 === 5 || e2 === 6)
                      break t;
                  case 13:
                    if (r2.last) {
                      u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                      break;
                    }
                    for (; l2 < 3; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                      case 0:
                        r2.mode = 14;
                        break;
                      case 1:
                        if (j(r2), r2.mode = 20, e2 !== 6)
                          break;
                        u2 >>>= 2, l2 -= 2;
                        break t;
                      case 2:
                        r2.mode = 17;
                        break;
                      case 3:
                        t2.msg = "invalid block type", r2.mode = 30;
                    }
                    u2 >>>= 2, l2 -= 2;
                    break;
                  case 14:
                    for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                      t2.msg = "invalid stored block lengths", r2.mode = 30;
                      break;
                    }
                    if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, e2 === 6)
                      break t;
                  case 15:
                    r2.mode = 16;
                  case 16:
                    if (c = r2.length) {
                      if (o2 < c && (c = o2), h2 < c && (c = h2), c === 0)
                        break t;
                      I.arraySet(n2, i2, s2, c, a2), o2 -= c, s2 += c, h2 -= c, a2 += c, r2.length -= c;
                      break;
                    }
                    r2.mode = 12;
                    break;
                  case 17:
                    for (; l2 < 14; ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                      t2.msg = "too many length or distance symbols", r2.mode = 30;
                      break;
                    }
                    r2.have = 0, r2.mode = 18;
                  case 18:
                    for (; r2.have < r2.ncode; ) {
                      for (; l2 < 3; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                    }
                    for (; r2.have < 19; )
                      r2.lens[A[r2.have++]] = 0;
                    if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                      t2.msg = "invalid code lengths set", r2.mode = 30;
                      break;
                    }
                    r2.have = 0, r2.mode = 19;
                  case 19:
                    for (; r2.have < r2.nlen + r2.ndist; ) {
                      for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      if (b < 16)
                        u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                      else {
                        if (b === 16) {
                          for (z = _ + 2; l2 < z; ) {
                            if (o2 === 0)
                              break t;
                            o2--, u2 += i2[s2++] << l2, l2 += 8;
                          }
                          if (u2 >>>= _, l2 -= _, r2.have === 0) {
                            t2.msg = "invalid bit length repeat", r2.mode = 30;
                            break;
                          }
                          k = r2.lens[r2.have - 1], c = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                        } else if (b === 17) {
                          for (z = _ + 3; l2 < z; ) {
                            if (o2 === 0)
                              break t;
                            o2--, u2 += i2[s2++] << l2, l2 += 8;
                          }
                          l2 -= _, k = 0, c = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                        } else {
                          for (z = _ + 7; l2 < z; ) {
                            if (o2 === 0)
                              break t;
                            o2--, u2 += i2[s2++] << l2, l2 += 8;
                          }
                          l2 -= _, k = 0, c = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                        }
                        if (r2.have + c > r2.nlen + r2.ndist) {
                          t2.msg = "invalid bit length repeat", r2.mode = 30;
                          break;
                        }
                        for (; c--; )
                          r2.lens[r2.have++] = k;
                      }
                    }
                    if (r2.mode === 30)
                      break;
                    if (r2.lens[256] === 0) {
                      t2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                      break;
                    }
                    if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                      t2.msg = "invalid literal/lengths set", r2.mode = 30;
                      break;
                    }
                    if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                      t2.msg = "invalid distances set", r2.mode = 30;
                      break;
                    }
                    if (r2.mode = 20, e2 === 6)
                      break t;
                  case 20:
                    r2.mode = 21;
                  case 21:
                    if (6 <= o2 && 258 <= h2) {
                      t2.next_out = a2, t2.avail_out = h2, t2.next_in = s2, t2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(t2, d2), a2 = t2.next_out, n2 = t2.output, h2 = t2.avail_out, s2 = t2.next_in, i2 = t2.input, o2 = t2.avail_in, u2 = r2.hold, l2 = r2.bits, r2.mode === 12 && (r2.back = -1);
                      break;
                    }
                    for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    if (g && (240 & g) == 0) {
                      for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      u2 >>>= v, l2 -= v, r2.back += v;
                    }
                    if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, g === 0) {
                      r2.mode = 26;
                      break;
                    }
                    if (32 & g) {
                      r2.back = -1, r2.mode = 12;
                      break;
                    }
                    if (64 & g) {
                      t2.msg = "invalid literal/length code", r2.mode = 30;
                      break;
                    }
                    r2.extra = 15 & g, r2.mode = 22;
                  case 22:
                    if (r2.extra) {
                      for (z = r2.extra; l2 < z; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                    }
                    r2.was = r2.length, r2.mode = 23;
                  case 23:
                    for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                      if (o2 === 0)
                        break t;
                      o2--, u2 += i2[s2++] << l2, l2 += 8;
                    }
                    if ((240 & g) == 0) {
                      for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      u2 >>>= v, l2 -= v, r2.back += v;
                    }
                    if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                      t2.msg = "invalid distance code", r2.mode = 30;
                      break;
                    }
                    r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
                  case 24:
                    if (r2.extra) {
                      for (z = r2.extra; l2 < z; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                    }
                    if (r2.offset > r2.dmax) {
                      t2.msg = "invalid distance too far back", r2.mode = 30;
                      break;
                    }
                    r2.mode = 25;
                  case 25:
                    if (h2 === 0)
                      break t;
                    if (c = d2 - h2, r2.offset > c) {
                      if ((c = r2.offset - c) > r2.whave && r2.sane) {
                        t2.msg = "invalid distance too far back", r2.mode = 30;
                        break;
                      }
                      p = c > r2.wnext ? (c -= r2.wnext, r2.wsize - c) : r2.wnext - c, c > r2.length && (c = r2.length), m = r2.window;
                    } else
                      m = n2, p = a2 - r2.offset, c = r2.length;
                    for (h2 < c && (c = h2), h2 -= c, r2.length -= c; n2[a2++] = m[p++], --c; )
                      ;
                    r2.length === 0 && (r2.mode = 21);
                    break;
                  case 26:
                    if (h2 === 0)
                      break t;
                    n2[a2++] = r2.length, h2--, r2.mode = 21;
                    break;
                  case 27:
                    if (r2.wrap) {
                      for (; l2 < 32; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 |= i2[s2++] << l2, l2 += 8;
                      }
                      if (d2 -= h2, t2.total_out += d2, r2.total += d2, d2 && (t2.adler = r2.check = r2.flags ? B(r2.check, n2, d2, a2 - d2) : O(r2.check, n2, d2, a2 - d2)), d2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                        t2.msg = "incorrect data check", r2.mode = 30;
                        break;
                      }
                      l2 = u2 = 0;
                    }
                    r2.mode = 28;
                  case 28:
                    if (r2.wrap && r2.flags) {
                      for (; l2 < 32; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      if (u2 !== (4294967295 & r2.total)) {
                        t2.msg = "incorrect length check", r2.mode = 30;
                        break;
                      }
                      l2 = u2 = 0;
                    }
                    r2.mode = 29;
                  case 29:
                    x = 1;
                    break t;
                  case 30:
                    x = -3;
                    break t;
                  case 31:
                    return -4;
                  case 32:
                  default:
                    return U;
                }
            return t2.next_out = a2, t2.avail_out = h2, t2.next_in = s2, t2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || d2 !== t2.avail_out && r2.mode < 30 && (r2.mode < 27 || e2 !== 4)) && Z(t2, t2.output, t2.next_out, d2 - t2.avail_out) ? (r2.mode = 31, -4) : (f2 -= t2.avail_in, d2 -= t2.avail_out, t2.total_in += f2, t2.total_out += d2, r2.total += d2, r2.wrap && d2 && (t2.adler = r2.check = r2.flags ? B(r2.check, n2, d2, t2.next_out - d2) : O(r2.check, n2, d2, t2.next_out - d2)), t2.data_type = r2.bits + (r2.last ? 64 : 0) + (r2.mode === 12 ? 128 : 0) + (r2.mode === 20 || r2.mode === 15 ? 256 : 0), (f2 == 0 && d2 === 0 || e2 === 4) && x === N && (x = -5), x);
          }, r.inflateEnd = function(t2) {
            if (!t2 || !t2.state)
              return U;
            var e2 = t2.state;
            return e2.window && (e2.window = null), t2.state = null, N;
          }, r.inflateGetHeader = function(t2, e2) {
            var r2;
            return t2 && t2.state ? (2 & (r2 = t2.state).wrap) == 0 ? U : ((r2.head = e2).done = false, N) : U;
          }, r.inflateSetDictionary = function(t2, e2) {
            var r2, i2 = e2.length;
            return t2 && t2.state ? (r2 = t2.state).wrap !== 0 && r2.mode !== 11 ? U : r2.mode === 11 && O(1, e2, i2, 0) !== r2.check ? -3 : Z(t2, e2, i2, i2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(t, e, r) {
          "use strict";
          var D = t("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          e.exports = function(t2, e2, r2, i, n, s, a, o) {
            var h, u, l, f, d, c, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++)
              O[b] = 0;
            for (v = 0; v < i; v++)
              O[e2[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && O[w] === 0; w--)
              ;
            if (w < k && (k = w), w === 0)
              return n[s++] = 20971520, n[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && O[y] === 0; y++)
              ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++)
              if (z <<= 1, (z -= O[b]) < 0)
                return -1;
            if (0 < z && (t2 === 0 || w !== 1))
              return -1;
            for (B[1] = 0, b = 1; b < 15; b++)
              B[b + 1] = B[b] + O[b];
            for (v = 0; v < i; v++)
              e2[r2 + v] !== 0 && (a[B[e2[r2 + v]]++] = v);
            if (c = t2 === 0 ? (A = R = a, 19) : t2 === 1 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, d = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, t2 === 1 && 852 < C || t2 === 2 && 592 < C)
              return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < c ? (m = 0, a[v]) : a[v] > c ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; n[d + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, u !== 0; )
                ;
              for (h = 1 << b - 1; E & h; )
                h >>= 1;
              if (h !== 0 ? (E &= h - 1, E += h) : E = 0, v++, --O[b] == 0) {
                if (b === w)
                  break;
                b = e2[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (S === 0 && (S = k), d += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); )
                  x++, z <<= 1;
                if (C += 1 << x, t2 === 1 && 852 < C || t2 === 2 && 592 < C)
                  return 1;
                n[l = E & f] = k << 24 | x << 16 | d - s | 0;
              }
            }
            return E !== 0 && (n[d + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(t, e, r) {
          "use strict";
          e.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(t, e, r) {
          "use strict";
          var n = t("../utils/common"), o = 0, h = 1;
          function i(t2) {
            for (var e2 = t2.length; 0 <= --e2; )
              t2[e2] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, d = 19, _ = 2 * l + 1, g = 15, c = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          i(z);
          var C = new Array(2 * f);
          i(C);
          var E = new Array(512);
          i(E);
          var A = new Array(256);
          i(A);
          var I = new Array(a);
          i(I);
          var O, B, R, T = new Array(f);
          function D(t2, e2, r2, i2, n2) {
            this.static_tree = t2, this.extra_bits = e2, this.extra_base = r2, this.elems = i2, this.max_length = n2, this.has_stree = t2 && t2.length;
          }
          function F(t2, e2) {
            this.dyn_tree = t2, this.max_code = 0, this.stat_desc = e2;
          }
          function N(t2) {
            return t2 < 256 ? E[t2] : E[256 + (t2 >>> 7)];
          }
          function U(t2, e2) {
            t2.pending_buf[t2.pending++] = 255 & e2, t2.pending_buf[t2.pending++] = e2 >>> 8 & 255;
          }
          function P(t2, e2, r2) {
            t2.bi_valid > c - r2 ? (t2.bi_buf |= e2 << t2.bi_valid & 65535, U(t2, t2.bi_buf), t2.bi_buf = e2 >> c - t2.bi_valid, t2.bi_valid += r2 - c) : (t2.bi_buf |= e2 << t2.bi_valid & 65535, t2.bi_valid += r2);
          }
          function L(t2, e2, r2) {
            P(t2, r2[2 * e2], r2[2 * e2 + 1]);
          }
          function j(t2, e2) {
            for (var r2 = 0; r2 |= 1 & t2, t2 >>>= 1, r2 <<= 1, 0 < --e2; )
              ;
            return r2 >>> 1;
          }
          function Z(t2, e2, r2) {
            var i2, n2, s2 = new Array(g + 1), a2 = 0;
            for (i2 = 1; i2 <= g; i2++)
              s2[i2] = a2 = a2 + r2[i2 - 1] << 1;
            for (n2 = 0; n2 <= e2; n2++) {
              var o2 = t2[2 * n2 + 1];
              o2 !== 0 && (t2[2 * n2] = j(s2[o2]++, o2));
            }
          }
          function W(t2) {
            var e2;
            for (e2 = 0; e2 < l; e2++)
              t2.dyn_ltree[2 * e2] = 0;
            for (e2 = 0; e2 < f; e2++)
              t2.dyn_dtree[2 * e2] = 0;
            for (e2 = 0; e2 < d; e2++)
              t2.bl_tree[2 * e2] = 0;
            t2.dyn_ltree[2 * m] = 1, t2.opt_len = t2.static_len = 0, t2.last_lit = t2.matches = 0;
          }
          function M(t2) {
            8 < t2.bi_valid ? U(t2, t2.bi_buf) : 0 < t2.bi_valid && (t2.pending_buf[t2.pending++] = t2.bi_buf), t2.bi_buf = 0, t2.bi_valid = 0;
          }
          function H(t2, e2, r2, i2) {
            var n2 = 2 * e2, s2 = 2 * r2;
            return t2[n2] < t2[s2] || t2[n2] === t2[s2] && i2[e2] <= i2[r2];
          }
          function G(t2, e2, r2) {
            for (var i2 = t2.heap[r2], n2 = r2 << 1; n2 <= t2.heap_len && (n2 < t2.heap_len && H(e2, t2.heap[n2 + 1], t2.heap[n2], t2.depth) && n2++, !H(e2, i2, t2.heap[n2], t2.depth)); )
              t2.heap[r2] = t2.heap[n2], r2 = n2, n2 <<= 1;
            t2.heap[r2] = i2;
          }
          function K(t2, e2, r2) {
            var i2, n2, s2, a2, o2 = 0;
            if (t2.last_lit !== 0)
              for (; i2 = t2.pending_buf[t2.d_buf + 2 * o2] << 8 | t2.pending_buf[t2.d_buf + 2 * o2 + 1], n2 = t2.pending_buf[t2.l_buf + o2], o2++, i2 === 0 ? L(t2, n2, e2) : (L(t2, (s2 = A[n2]) + u + 1, e2), (a2 = w[s2]) !== 0 && P(t2, n2 -= I[s2], a2), L(t2, s2 = N(--i2), r2), (a2 = k[s2]) !== 0 && P(t2, i2 -= T[s2], a2)), o2 < t2.last_lit; )
                ;
            L(t2, m, e2);
          }
          function Y(t2, e2) {
            var r2, i2, n2, s2 = e2.dyn_tree, a2 = e2.stat_desc.static_tree, o2 = e2.stat_desc.has_stree, h2 = e2.stat_desc.elems, u2 = -1;
            for (t2.heap_len = 0, t2.heap_max = _, r2 = 0; r2 < h2; r2++)
              s2[2 * r2] !== 0 ? (t2.heap[++t2.heap_len] = u2 = r2, t2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; t2.heap_len < 2; )
              s2[2 * (n2 = t2.heap[++t2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, t2.depth[n2] = 0, t2.opt_len--, o2 && (t2.static_len -= a2[2 * n2 + 1]);
            for (e2.max_code = u2, r2 = t2.heap_len >> 1; 1 <= r2; r2--)
              G(t2, s2, r2);
            for (n2 = h2; r2 = t2.heap[1], t2.heap[1] = t2.heap[t2.heap_len--], G(t2, s2, 1), i2 = t2.heap[1], t2.heap[--t2.heap_max] = r2, t2.heap[--t2.heap_max] = i2, s2[2 * n2] = s2[2 * r2] + s2[2 * i2], t2.depth[n2] = (t2.depth[r2] >= t2.depth[i2] ? t2.depth[r2] : t2.depth[i2]) + 1, s2[2 * r2 + 1] = s2[2 * i2 + 1] = n2, t2.heap[1] = n2++, G(t2, s2, 1), 2 <= t2.heap_len; )
              ;
            t2.heap[--t2.heap_max] = t2.heap[1], function(t3, e3) {
              var r3, i3, n3, s3, a3, o3, h3 = e3.dyn_tree, u3 = e3.max_code, l2 = e3.stat_desc.static_tree, f2 = e3.stat_desc.has_stree, d2 = e3.stat_desc.extra_bits, c2 = e3.stat_desc.extra_base, p2 = e3.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++)
                t3.bl_count[s3] = 0;
              for (h3[2 * t3.heap[t3.heap_max] + 1] = 0, r3 = t3.heap_max + 1; r3 < _; r3++)
                p2 < (s3 = h3[2 * h3[2 * (i3 = t3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * i3 + 1] = s3, u3 < i3 || (t3.bl_count[s3]++, a3 = 0, c2 <= i3 && (a3 = d2[i3 - c2]), o3 = h3[2 * i3], t3.opt_len += o3 * (s3 + a3), f2 && (t3.static_len += o3 * (l2[2 * i3 + 1] + a3)));
              if (m2 !== 0) {
                do {
                  for (s3 = p2 - 1; t3.bl_count[s3] === 0; )
                    s3--;
                  t3.bl_count[s3]--, t3.bl_count[s3 + 1] += 2, t3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; s3 !== 0; s3--)
                  for (i3 = t3.bl_count[s3]; i3 !== 0; )
                    u3 < (n3 = t3.heap[--r3]) || (h3[2 * n3 + 1] !== s3 && (t3.opt_len += (s3 - h3[2 * n3 + 1]) * h3[2 * n3], h3[2 * n3 + 1] = s3), i3--);
              }
            }(t2, e2), Z(s2, u2, t2.bl_count);
          }
          function X(t2, e2, r2) {
            var i2, n2, s2 = -1, a2 = e2[1], o2 = 0, h2 = 7, u2 = 4;
            for (a2 === 0 && (h2 = 138, u2 = 3), e2[2 * (r2 + 1) + 1] = 65535, i2 = 0; i2 <= r2; i2++)
              n2 = a2, a2 = e2[2 * (i2 + 1) + 1], ++o2 < h2 && n2 === a2 || (o2 < u2 ? t2.bl_tree[2 * n2] += o2 : n2 !== 0 ? (n2 !== s2 && t2.bl_tree[2 * n2]++, t2.bl_tree[2 * b]++) : o2 <= 10 ? t2.bl_tree[2 * v]++ : t2.bl_tree[2 * y]++, s2 = n2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : n2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(t2, e2, r2) {
            var i2, n2, s2 = -1, a2 = e2[1], o2 = 0, h2 = 7, u2 = 4;
            for (a2 === 0 && (h2 = 138, u2 = 3), i2 = 0; i2 <= r2; i2++)
              if (n2 = a2, a2 = e2[2 * (i2 + 1) + 1], !(++o2 < h2 && n2 === a2)) {
                if (o2 < u2)
                  for (; L(t2, n2, t2.bl_tree), --o2 != 0; )
                    ;
                else
                  n2 !== 0 ? (n2 !== s2 && (L(t2, n2, t2.bl_tree), o2--), L(t2, b, t2.bl_tree), P(t2, o2 - 3, 2)) : o2 <= 10 ? (L(t2, v, t2.bl_tree), P(t2, o2 - 3, 3)) : (L(t2, y, t2.bl_tree), P(t2, o2 - 11, 7));
                s2 = n2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : n2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
              }
          }
          i(T);
          var q = false;
          function J(t2, e2, r2, i2) {
            P(t2, (s << 1) + (i2 ? 1 : 0), 3), function(t3, e3, r3, i3) {
              M(t3), i3 && (U(t3, r3), U(t3, ~r3)), n.arraySet(t3.pending_buf, t3.window, e3, r3, t3.pending), t3.pending += r3;
            }(t2, e2, r2, true);
          }
          r._tr_init = function(t2) {
            q || (function() {
              var t3, e2, r2, i2, n2, s2 = new Array(g + 1);
              for (i2 = r2 = 0; i2 < a - 1; i2++)
                for (I[i2] = r2, t3 = 0; t3 < 1 << w[i2]; t3++)
                  A[r2++] = i2;
              for (A[r2 - 1] = i2, i2 = n2 = 0; i2 < 16; i2++)
                for (T[i2] = n2, t3 = 0; t3 < 1 << k[i2]; t3++)
                  E[n2++] = i2;
              for (n2 >>= 7; i2 < f; i2++)
                for (T[i2] = n2 << 7, t3 = 0; t3 < 1 << k[i2] - 7; t3++)
                  E[256 + n2++] = i2;
              for (e2 = 0; e2 <= g; e2++)
                s2[e2] = 0;
              for (t3 = 0; t3 <= 143; )
                z[2 * t3 + 1] = 8, t3++, s2[8]++;
              for (; t3 <= 255; )
                z[2 * t3 + 1] = 9, t3++, s2[9]++;
              for (; t3 <= 279; )
                z[2 * t3 + 1] = 7, t3++, s2[7]++;
              for (; t3 <= 287; )
                z[2 * t3 + 1] = 8, t3++, s2[8]++;
              for (Z(z, l + 1, s2), t3 = 0; t3 < f; t3++)
                C[2 * t3 + 1] = 5, C[2 * t3] = j(t3, 5);
              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, d, p);
            }(), q = true), t2.l_desc = new F(t2.dyn_ltree, O), t2.d_desc = new F(t2.dyn_dtree, B), t2.bl_desc = new F(t2.bl_tree, R), t2.bi_buf = 0, t2.bi_valid = 0, W(t2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(t2, e2, r2, i2) {
            var n2, s2, a2 = 0;
            0 < t2.level ? (t2.strm.data_type === 2 && (t2.strm.data_type = function(t3) {
              var e3, r3 = 4093624447;
              for (e3 = 0; e3 <= 31; e3++, r3 >>>= 1)
                if (1 & r3 && t3.dyn_ltree[2 * e3] !== 0)
                  return o;
              if (t3.dyn_ltree[18] !== 0 || t3.dyn_ltree[20] !== 0 || t3.dyn_ltree[26] !== 0)
                return h;
              for (e3 = 32; e3 < u; e3++)
                if (t3.dyn_ltree[2 * e3] !== 0)
                  return h;
              return o;
            }(t2)), Y(t2, t2.l_desc), Y(t2, t2.d_desc), a2 = function(t3) {
              var e3;
              for (X(t3, t3.dyn_ltree, t3.l_desc.max_code), X(t3, t3.dyn_dtree, t3.d_desc.max_code), Y(t3, t3.bl_desc), e3 = d - 1; 3 <= e3 && t3.bl_tree[2 * S[e3] + 1] === 0; e3--)
                ;
              return t3.opt_len += 3 * (e3 + 1) + 5 + 5 + 4, e3;
            }(t2), n2 = t2.opt_len + 3 + 7 >>> 3, (s2 = t2.static_len + 3 + 7 >>> 3) <= n2 && (n2 = s2)) : n2 = s2 = r2 + 5, r2 + 4 <= n2 && e2 !== -1 ? J(t2, e2, r2, i2) : t2.strategy === 4 || s2 === n2 ? (P(t2, 2 + (i2 ? 1 : 0), 3), K(t2, z, C)) : (P(t2, 4 + (i2 ? 1 : 0), 3), function(t3, e3, r3, i3) {
              var n3;
              for (P(t3, e3 - 257, 5), P(t3, r3 - 1, 5), P(t3, i3 - 4, 4), n3 = 0; n3 < i3; n3++)
                P(t3, t3.bl_tree[2 * S[n3] + 1], 3);
              V(t3, t3.dyn_ltree, e3 - 1), V(t3, t3.dyn_dtree, r3 - 1);
            }(t2, t2.l_desc.max_code + 1, t2.d_desc.max_code + 1, a2 + 1), K(t2, t2.dyn_ltree, t2.dyn_dtree)), W(t2), i2 && M(t2);
          }, r._tr_tally = function(t2, e2, r2) {
            return t2.pending_buf[t2.d_buf + 2 * t2.last_lit] = e2 >>> 8 & 255, t2.pending_buf[t2.d_buf + 2 * t2.last_lit + 1] = 255 & e2, t2.pending_buf[t2.l_buf + t2.last_lit] = 255 & r2, t2.last_lit++, e2 === 0 ? t2.dyn_ltree[2 * r2]++ : (t2.matches++, e2--, t2.dyn_ltree[2 * (A[r2] + u + 1)]++, t2.dyn_dtree[2 * N(e2)]++), t2.last_lit === t2.lit_bufsize - 1;
          }, r._tr_align = function(t2) {
            P(t2, 2, 3), L(t2, m, z), function(t3) {
              t3.bi_valid === 16 ? (U(t3, t3.bi_buf), t3.bi_buf = 0, t3.bi_valid = 0) : 8 <= t3.bi_valid && (t3.pending_buf[t3.pending++] = 255 & t3.bi_buf, t3.bi_buf >>= 8, t3.bi_valid -= 8);
            }(t2);
          };
        }, { "../utils/common": 41 }], 53: [function(t, e, r) {
          "use strict";
          e.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(t, e, r) {
          "use strict";
          e.exports = typeof setImmediate == "function" ? setImmediate : function() {
            var t2 = [].slice.apply(arguments);
            t2.splice(1, 0, 0), setTimeout.apply(null, t2);
          };
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // src/share/messages.ts
  function isStartMessage(x) {
    if (!x) {
      return false;
    }
    return x["type"] === "start" && typeof x["id"] === "string" && x["file"] instanceof File;
  }

  // src/conv/conv.ts
  var import_jszip = __toESM(require_jszip_min());

  // src/conv/fs-ext.ts
  function mkdirp(p) {
    if (!p.startsWith("/")) {
      return;
    }
    const dirs = p.substring(1).split("/");
    for (let i = 1; i <= dirs.length; i++) {
      const pa = "/" + dirs.slice(0, i).join("/");
      if (exists(pa)) {
        continue;
      }
      FS.mkdir(pa);
    }
  }
  function dirname(p) {
    const subs = p.split("/");
    return subs.slice(0, subs.length - 1).join("/");
  }
  function exists(p) {
    try {
      FS.stat(p);
      return true;
    } catch (e) {
      return false;
    }
  }
  async function syncfs(populate) {
    return new Promise((resolve, reject) => {
      FS.syncfs(populate, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // src/conv/conv.ts
  self.importScripts("/je2be-web/script/core.js");
  self.onmessage = (ev) => {
    if (isStartMessage(ev.data)) {
      const id = ev.data.id;
      start(ev.data).catch((e) => failed(e, id)).finally(() => cleanup(id));
    }
  };
  async function start(msg) {
    const id = msg.id;
    console.log(`[${id}] converter: received StartMessage`);
    mkdirp(`/je2be`);
    ensureMount(id);
    await syncfs(true);
    Module.cleanup(`/je2be`);
    mkdirp(`/je2be/${id}`);
    mkdirp(`/je2be/${id}/in`);
    mkdirp(`/je2be/${id}/out`);
    mkdirp(`/je2be/dl`);
    console.log(`[${id}] extract...`);
    await extract(msg.file, msg.id);
    console.log(`[${id}] extract done`);
    console.log(`[${id}] convert...`);
    const ok = await convert(msg.id);
    console.log(`[${id}] convert done`);
    if (ok) {
      send(id);
    } else {
      const e = {
        type: "ConverterFailed"
      };
      throw e;
    }
  }
  async function extract(file, id) {
    let zip;
    try {
      zip = await import_jszip.default.loadAsync(file);
    } catch (e) {
      const error = {
        type: "Unzip",
        native: e
      };
      throw error;
    }
    const foundLevelDat = [];
    zip.forEach((p, f) => {
      if (!p.endsWith("level.dat")) {
        return;
      }
      foundLevelDat.push(p);
    });
    if (foundLevelDat.length === 0) {
      const error = {
        type: "NoLevelDatFound"
      };
      throw error;
    } else if (foundLevelDat.length !== 1) {
      const error = {
        type: "2OrMoreLevelDatFound"
      };
      throw error;
    }
    const levelDatPath = foundLevelDat[0];
    const idx = levelDatPath.lastIndexOf("level.dat");
    const prefix = levelDatPath.substring(0, idx);
    const files = [];
    zip.forEach((path, f) => {
      if (!path.startsWith(prefix)) {
        return;
      }
      if (f.dir) {
        return;
      }
      files.push(path);
    });
    let progress = 0;
    const total = files.length;
    const promises = files.map((path) => promiseUnzipFileInZip({ id, zip, path, prefix }).then(() => {
      progress++;
      const m = {
        type: "progress",
        id,
        stage: "unzip",
        progress,
        total
      };
      self.postMessage(m);
    }));
    await Promise.all(promises);
  }
  async function promiseUnzipFileInZip({
    id,
    zip,
    path,
    prefix
  }) {
    return new Promise((resolve, reject) => {
      const rel = path.substring(prefix.length);
      const target = `/je2be/${id}/in/${rel}`;
      const directory = dirname(target);
      mkdirp(directory);
      zip.file(path).async("uint8array").then((buffer) => {
        FS.writeFile(target, buffer);
        resolve();
      }).catch(reject);
    });
  }
  async function convert(id) {
    const ret = Module.core(id, `/je2be/${id}/in`, `/je2be/${id}/out`, `/je2be/dl/${id}.zip`);
    return ret === 0;
  }
  function failed(error, id) {
    const m = { type: "failed", id, error };
    self.postMessage(m);
  }
  function send(id) {
    const m = { type: "success", id };
    self.postMessage(m);
  }
  function cleanup(id) {
    Module.cleanup(`/je2be/${id}`);
    syncfs(false).then(() => {
      console.log(`[${id}] syncfs done`);
    }).catch((e) => {
      console.error(`[${id}] syncfs failed`, e);
    });
  }
  function ensureMount(id) {
    try {
      FS.mount(IDBFS, {}, "/je2be");
    } catch (e) {
      console.log(`[${id}] already mounted`);
    }
  }
})();
/*!

JSZip v3.7.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
