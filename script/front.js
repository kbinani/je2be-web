(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
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

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = require_object_assign();
      var n = 60103;
      var p = 60106;
      exports.Fragment = 60107;
      exports.StrictMode = 60108;
      exports.Profiler = 60114;
      var q = 60109;
      var r = 60110;
      var t = 60112;
      exports.Suspense = 60113;
      var u = 60115;
      var v = 60116;
      if (typeof Symbol === "function" && Symbol.for) {
        w = Symbol.for;
        n = w("react.element");
        p = w("react.portal");
        exports.Fragment = w("react.fragment");
        exports.StrictMode = w("react.strict_mode");
        exports.Profiler = w("react.profiler");
        q = w("react.provider");
        r = w("react.context");
        t = w("react.forward_ref");
        exports.Suspense = w("react.suspense");
        u = w("react.memo");
        v = w("react.lazy");
      }
      var w;
      var x = typeof Symbol === "function" && Symbol.iterator;
      function y(a) {
        if (a === null || typeof a !== "object")
          return null;
        a = x && a[x] || a["@@iterator"];
        return typeof a === "function" ? a : null;
      }
      function z(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
          b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var A = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var B = {};
      function C(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      C.prototype.isReactComponent = {};
      C.prototype.setState = function(a, b) {
        if (typeof a !== "object" && typeof a !== "function" && a != null)
          throw Error(z(85));
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      C.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function D() {
      }
      D.prototype = C.prototype;
      function E(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      var F = E.prototype = new D();
      F.constructor = E;
      l(F, C.prototype);
      F.isPureReactComponent = true;
      var G = { current: null };
      var H = Object.prototype.hasOwnProperty;
      var I = { key: true, ref: true, __self: true, __source: true };
      function J(a, b, c) {
        var e, d = {}, k = null, h = null;
        if (b != null)
          for (e in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
            H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
        var g = arguments.length - 2;
        if (g === 1)
          d.children = c;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++)
            f[m] = arguments[m + 2];
          d.children = f;
        }
        if (a && a.defaultProps)
          for (e in g = a.defaultProps, g)
            d[e] === void 0 && (d[e] = g[e]);
        return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
      }
      function K(a, b) {
        return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function L(a) {
        return typeof a === "object" && a !== null && a.$$typeof === n;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var M = /\/+/g;
      function N(a, b) {
        return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
      }
      function O(a, b, c, e, d) {
        var k = typeof a;
        if (k === "undefined" || k === "boolean")
          a = null;
        var h = false;
        if (a === null)
          h = true;
        else
          switch (k) {
            case "string":
            case "number":
              h = true;
              break;
            case "object":
              switch (a.$$typeof) {
                case n:
                case p:
                  h = true;
              }
          }
        if (h)
          return h = a, d = d(h), a = e === "" ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", a != null && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
            return a2;
          })) : d != null && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
        h = 0;
        e = e === "" ? "." : e + ":";
        if (Array.isArray(a))
          for (var g = 0; g < a.length; g++) {
            k = a[g];
            var f = e + N(k, g);
            h += O(k, b, c, f, d);
          }
        else if (f = y(a), typeof f === "function")
          for (a = f.call(a), g = 0; !(k = a.next()).done; )
            k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
        else if (k === "object")
          throw b = "" + a, Error(z(31, b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
        return h;
      }
      function P(a, b, c) {
        if (a == null)
          return a;
        var e = [], d = 0;
        O(a, e, "", "", function(a2) {
          return b.call(c, a2, d++);
        });
        return e;
      }
      function Q(a) {
        if (a._status === -1) {
          var b = a._result;
          b = b();
          a._status = 0;
          a._result = b;
          b.then(function(b2) {
            a._status === 0 && (b2 = b2.default, a._status = 1, a._result = b2);
          }, function(b2) {
            a._status === 0 && (a._status = 2, a._result = b2);
          });
        }
        if (a._status === 1)
          return a._result;
        throw a._result;
      }
      var R = { current: null };
      function S() {
        var a = R.current;
        if (a === null)
          throw Error(z(321));
        return a;
      }
      var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
      exports.Children = { map: P, forEach: function(a, b, c) {
        P(a, function() {
          b.apply(this, arguments);
        }, c);
      }, count: function(a) {
        var b = 0;
        P(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return P(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!L(a))
          throw Error(z(143));
        return a;
      } };
      exports.Component = C;
      exports.PureComponent = E;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
      exports.cloneElement = function(a, b, c) {
        if (a === null || a === void 0)
          throw Error(z(267, a));
        var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
        if (b != null) {
          b.ref !== void 0 && (k = b.ref, h = G.current);
          b.key !== void 0 && (d = "" + b.key);
          if (a.type && a.type.defaultProps)
            var g = a.type.defaultProps;
          for (f in b)
            H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (f === 1)
          e.children = c;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++)
            g[m] = arguments[m + 2];
          e.children = g;
        }
        return {
          $$typeof: n,
          type: a.type,
          key: d,
          ref: k,
          props: e,
          _owner: h
        };
      };
      exports.createContext = function(a, b) {
        b === void 0 && (b = null);
        a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
        a.Provider = { $$typeof: q, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = J;
      exports.createFactory = function(a) {
        var b = J.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: t, render: a };
      };
      exports.isValidElement = L;
      exports.lazy = function(a) {
        return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
      };
      exports.memo = function(a, b) {
        return { $$typeof: u, type: a, compare: b === void 0 ? null : b };
      };
      exports.useCallback = function(a, b) {
        return S().useCallback(a, b);
      };
      exports.useContext = function(a, b) {
        return S().useContext(a, b);
      };
      exports.useDebugValue = function() {
      };
      exports.useEffect = function(a, b) {
        return S().useEffect(a, b);
      };
      exports.useImperativeHandle = function(a, b, c) {
        return S().useImperativeHandle(a, b, c);
      };
      exports.useLayoutEffect = function(a, b) {
        return S().useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return S().useMemo(a, b);
      };
      exports.useReducer = function(a, b, c) {
        return S().useReducer(a, b, c);
      };
      exports.useRef = function(a) {
        return S().useRef(a);
      };
      exports.useState = function(a) {
        return S().useState(a);
      };
      exports.version = "17.0.2";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      var f;
      var g;
      var h;
      var k;
      if (typeof performance === "object" && typeof performance.now === "function") {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      if (typeof window === "undefined" || typeof MessageChannel !== "function") {
        t = null, u = null, w = function() {
          if (t !== null)
            try {
              var a = exports.unstable_now();
              t(true, a);
              t = null;
            } catch (b) {
              throw setTimeout(w, 0), b;
            }
        };
        f = function(a) {
          t !== null ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
        };
        g = function(a, b) {
          u = setTimeout(a, b);
        };
        h = function() {
          clearTimeout(u);
        };
        exports.unstable_shouldYield = function() {
          return false;
        };
        k = exports.unstable_forceFrameRate = function() {
        };
      } else {
        x = window.setTimeout, y = window.clearTimeout;
        if (typeof console !== "undefined") {
          z = window.cancelAnimationFrame;
          typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
          typeof z !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        }
        A = false, B = null, C = -1, D = 5, E = 0;
        exports.unstable_shouldYield = function() {
          return exports.unstable_now() >= E;
        };
        k = function() {
        };
        exports.unstable_forceFrameRate = function(a) {
          0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1e3 / a) : 5;
        };
        F = new MessageChannel(), G = F.port2;
        F.port1.onmessage = function() {
          if (B !== null) {
            var a = exports.unstable_now();
            E = a + D;
            try {
              B(true, a) ? G.postMessage(null) : (A = false, B = null);
            } catch (b) {
              throw G.postMessage(null), b;
            }
          } else
            A = false;
        };
        f = function(a) {
          B = a;
          A || (A = true, G.postMessage(null));
        };
        g = function(a, b) {
          C = x(function() {
            a(exports.unstable_now());
          }, b);
        };
        h = function() {
          y(C);
          C = -1;
        };
      }
      var t;
      var u;
      var w;
      var x;
      var y;
      var z;
      var A;
      var B;
      var C;
      var D;
      var E;
      var F;
      var G;
      function H(a, b) {
        var c = a.length;
        a.push(b);
        a:
          for (; ; ) {
            var d = c - 1 >>> 1, e = a[d];
            if (e !== void 0 && 0 < I(e, b))
              a[d] = b, a[c] = e, c = d;
            else
              break a;
          }
      }
      function J(a) {
        a = a[0];
        return a === void 0 ? null : a;
      }
      function K(a) {
        var b = a[0];
        if (b !== void 0) {
          var c = a.pop();
          if (c !== b) {
            a[0] = c;
            a:
              for (var d = 0, e = a.length; d < e; ) {
                var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
                if (n !== void 0 && 0 > I(n, c))
                  r !== void 0 && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
                else if (r !== void 0 && 0 > I(r, c))
                  a[d] = r, a[v] = c, d = v;
                else
                  break a;
              }
          }
          return b;
        }
        return null;
      }
      function I(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return c !== 0 ? c : a.id - b.id;
      }
      var L = [];
      var M = [];
      var N = 1;
      var O = null;
      var P = 3;
      var Q = false;
      var R = false;
      var S = false;
      function T(a) {
        for (var b = J(M); b !== null; ) {
          if (b.callback === null)
            K(M);
          else if (b.startTime <= a)
            K(M), b.sortIndex = b.expirationTime, H(L, b);
          else
            break;
          b = J(M);
        }
      }
      function U(a) {
        S = false;
        T(a);
        if (!R)
          if (J(L) !== null)
            R = true, f(V);
          else {
            var b = J(M);
            b !== null && g(U, b.startTime - a);
          }
      }
      function V(a, b) {
        R = false;
        S && (S = false, h());
        Q = true;
        var c = P;
        try {
          T(b);
          for (O = J(L); O !== null && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
            var d = O.callback;
            if (typeof d === "function") {
              O.callback = null;
              P = O.priorityLevel;
              var e = d(O.expirationTime <= b);
              b = exports.unstable_now();
              typeof e === "function" ? O.callback = e : O === J(L) && K(L);
              T(b);
            } else
              K(L);
            O = J(L);
          }
          if (O !== null)
            var m = true;
          else {
            var n = J(M);
            n !== null && g(U, n.startTime - b);
            m = false;
          }
          return m;
        } finally {
          O = null, P = c, Q = false;
        }
      }
      var W = k;
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        R || Q || (R = true, f(V));
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return P;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return J(L);
      };
      exports.unstable_next = function(a) {
        switch (P) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = P;
        }
        var c = P;
        P = b;
        try {
          return a();
        } finally {
          P = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = W;
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = P;
        P = a;
        try {
          return b();
        } finally {
          P = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        typeof c === "object" && c !== null ? (c = c.delay, c = typeof c === "number" && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: N++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, H(M, a), J(L) === null && a === J(M) && (S ? h() : S = true, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = true, f(V)));
        return a;
      };
      exports.unstable_wrapCallback = function(a) {
        var b = P;
        return function() {
          var c = P;
          P = b;
          try {
            return a.apply(this, arguments);
          } finally {
            P = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var m = require_object_assign();
      var r = require_scheduler();
      function y(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
          b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      if (!aa)
        throw Error(y(227));
      var ba = /* @__PURE__ */ new Set();
      var ca = {};
      function da(a, b) {
        ea(a, b);
        ea(a + "Capture", b);
      }
      function ea(a, b) {
        ca[a] = b;
        for (a = 0; a < b.length; a++)
          ba.add(b[a]);
      }
      var fa = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined");
      var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var ia = Object.prototype.hasOwnProperty;
      var ja = {};
      var ka = {};
      function la(a) {
        if (ia.call(ka, a))
          return true;
        if (ia.call(ja, a))
          return false;
        if (ha.test(a))
          return ka[a] = true;
        ja[a] = true;
        return false;
      }
      function ma(a, b, c, d) {
        if (c !== null && c.type === 0)
          return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d)
              return false;
            if (c !== null)
              return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return a !== "data-" && a !== "aria-";
          default:
            return false;
        }
      }
      function na(a, b, c, d) {
        if (b === null || typeof b === "undefined" || ma(a, b, c, d))
          return true;
        if (d)
          return false;
        if (c !== null)
          switch (c.type) {
            case 3:
              return !b;
            case 4:
              return b === false;
            case 5:
              return isNaN(b);
            case 6:
              return isNaN(b) || 1 > b;
          }
        return false;
      }
      function B(a, b, c, d, e, f, g) {
        this.acceptsBooleans = b === 2 || b === 3 || b === 4;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var D = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        D[a] = new B(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        D[b] = new B(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        D[a] = new B(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        D[a] = new B(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        D[a] = new B(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        D[a] = new B(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        D[a] = new B(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        D[a] = new B(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        D[a] = new B(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var oa = /[\-:]([a-z])/g;
      function pa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        D[a] = new B(a, 1, false, a.toLowerCase(), null, false, false);
      });
      D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        D[a] = new B(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function qa(a, b, c, d) {
        var e = D.hasOwnProperty(b) ? D[b] : null;
        var f = e !== null ? e.type === 0 : d ? false : !(2 < b.length) || b[0] !== "o" && b[0] !== "O" || b[1] !== "n" && b[1] !== "N" ? false : true;
        f || (na(b, c, e, d) && (c = null), d || e === null ? la(b) && (c === null ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = c === null ? e.type === 3 ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, c === null ? a.removeAttribute(b) : (e = e.type, c = e === 3 || e === 4 && c === true ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
      }
      var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var sa = 60103;
      var ta = 60106;
      var ua = 60107;
      var wa = 60108;
      var xa = 60114;
      var ya = 60109;
      var za = 60110;
      var Aa = 60112;
      var Ba = 60113;
      var Ca = 60120;
      var Da = 60115;
      var Ea = 60116;
      var Fa = 60121;
      var Ga = 60128;
      var Ha = 60129;
      var Ia = 60130;
      var Ja = 60131;
      if (typeof Symbol === "function" && Symbol.for) {
        E = Symbol.for;
        sa = E("react.element");
        ta = E("react.portal");
        ua = E("react.fragment");
        wa = E("react.strict_mode");
        xa = E("react.profiler");
        ya = E("react.provider");
        za = E("react.context");
        Aa = E("react.forward_ref");
        Ba = E("react.suspense");
        Ca = E("react.suspense_list");
        Da = E("react.memo");
        Ea = E("react.lazy");
        Fa = E("react.block");
        E("react.scope");
        Ga = E("react.opaque.id");
        Ha = E("react.debug_trace_mode");
        Ia = E("react.offscreen");
        Ja = E("react.legacy_hidden");
      }
      var E;
      var Ka = typeof Symbol === "function" && Symbol.iterator;
      function La(a) {
        if (a === null || typeof a !== "object")
          return null;
        a = Ka && a[Ka] || a["@@iterator"];
        return typeof a === "function" ? a : null;
      }
      var Ma;
      function Na(a) {
        if (Ma === void 0)
          try {
            throw Error();
          } catch (c) {
            var b = c.stack.trim().match(/\n( *(at )?)/);
            Ma = b && b[1] || "";
          }
        return "\n" + Ma + a;
      }
      var Oa = false;
      function Pa(a, b) {
        if (!a || Oa)
          return "";
        Oa = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b)
            if (b = function() {
              throw Error();
            }, Object.defineProperty(b.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (k) {
                var d = k;
              }
              Reflect.construct(a, [], b);
            } else {
              try {
                b.call();
              } catch (k) {
                d = k;
              }
              a.call(b.prototype);
            }
          else {
            try {
              throw Error();
            } catch (k) {
              d = k;
            }
            a();
          }
        } catch (k) {
          if (k && d && typeof k.stack === "string") {
            for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
              h--;
            for (; 1 <= g && 0 <= h; g--, h--)
              if (e[g] !== f[h]) {
                if (g !== 1 || h !== 1) {
                  do
                    if (g--, h--, 0 > h || e[g] !== f[h])
                      return "\n" + e[g].replace(" at new ", " at ");
                  while (1 <= g && 0 <= h);
                }
                break;
              }
          }
        } finally {
          Oa = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
      }
      function Qa(a) {
        switch (a.tag) {
          case 5:
            return Na(a.type);
          case 16:
            return Na("Lazy");
          case 13:
            return Na("Suspense");
          case 19:
            return Na("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Pa(a.type, false), a;
          case 11:
            return a = Pa(a.type.render, false), a;
          case 22:
            return a = Pa(a.type._render, false), a;
          case 1:
            return a = Pa(a.type, true), a;
          default:
            return "";
        }
      }
      function Ra(a) {
        if (a == null)
          return null;
        if (typeof a === "function")
          return a.displayName || a.name || null;
        if (typeof a === "string")
          return a;
        switch (a) {
          case ua:
            return "Fragment";
          case ta:
            return "Portal";
          case xa:
            return "Profiler";
          case wa:
            return "StrictMode";
          case Ba:
            return "Suspense";
          case Ca:
            return "SuspenseList";
        }
        if (typeof a === "object")
          switch (a.$$typeof) {
            case za:
              return (a.displayName || "Context") + ".Consumer";
            case ya:
              return (a._context.displayName || "Context") + ".Provider";
            case Aa:
              var b = a.render;
              b = b.displayName || b.name || "";
              return a.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
            case Da:
              return Ra(a.type);
            case Fa:
              return Ra(a._render);
            case Ea:
              b = a._payload;
              a = a._init;
              try {
                return Ra(a(b));
              } catch (c) {
              }
          }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "undefined":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && a.toLowerCase() === "input" && (b === "checkbox" || b === "radio");
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && typeof c !== "undefined" && typeof c.get === "function" && typeof c.set === "function") {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a)
          return false;
        var b = a._valueTracker;
        if (!b)
          return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || (typeof document !== "undefined" ? document : void 0);
        if (typeof a === "undefined")
          return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return m({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c != null ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = b.defaultValue == null ? "" : b.defaultValue, d = b.checked != null ? b.checked : b.defaultChecked;
        c = Sa(b.value != null ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: b.type === "checkbox" || b.type === "radio" ? b.checked != null : b.value != null };
      }
      function $a(a, b) {
        b = b.checked;
        b != null && qa(a, "checked", b, false);
      }
      function ab(a, b) {
        $a(a, b);
        var c = Sa(b.value), d = b.type;
        if (c != null)
          if (d === "number") {
            if (c === 0 && a.value === "" || a.value != c)
              a.value = "" + c;
          } else
            a.value !== "" + c && (a.value = "" + c);
        else if (d === "submit" || d === "reset") {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
        b.checked == null && b.defaultChecked != null && (a.defaultChecked = !!b.defaultChecked);
      }
      function cb(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!(d !== "submit" && d !== "reset" || b.value !== void 0 && b.value !== null))
            return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        c !== "" && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        c !== "" && (a.name = c);
      }
      function bb(a, b, c) {
        if (b !== "number" || Xa(a.ownerDocument) !== a)
          c == null ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      function db(a) {
        var b = "";
        aa.Children.forEach(a, function(a2) {
          a2 != null && (b += a2);
        });
        return b;
      }
      function eb(a, b) {
        a = m({ children: void 0 }, b);
        if (b = db(b.children))
          a.children = b;
        return a;
      }
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++)
            b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++)
            e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            b !== null || a[e].disabled || (b = a[e]);
          }
          b !== null && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (b.dangerouslySetInnerHTML != null)
          throw Error(y(91));
        return m({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (c == null) {
          c = b.children;
          b = b.defaultValue;
          if (c != null) {
            if (b != null)
              throw Error(y(92));
            if (Array.isArray(c)) {
              if (!(1 >= c.length))
                throw Error(y(93));
              c = c[0];
            }
            b = c;
          }
          b == null && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        c != null && (c = "" + c, c !== a.value && (a.value = c), b.defaultValue == null && a.defaultValue !== c && (a.defaultValue = c));
        d != null && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && b !== "" && b !== null && (a.value = b);
      }
      var kb = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
      function lb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function mb(a, b) {
        return a == null || a === "http://www.w3.org/1999/xhtml" ? lb(b) : a === "http://www.w3.org/2000/svg" && b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a;
      }
      var nb;
      var ob = function(a) {
        return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if (a.namespaceURI !== kb.svg || "innerHTML" in a)
          a.innerHTML = b;
        else {
          nb = nb || document.createElement("div");
          nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = nb.firstChild; a.firstChild; )
            a.removeChild(a.firstChild);
          for (; b.firstChild; )
            a.appendChild(b.firstChild);
        }
      });
      function pb(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && c.nodeType === 3) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var qb = {
        animationIterationCount: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var rb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(qb).forEach(function(a) {
        rb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          qb[b] = qb[a];
        });
      });
      function sb(a, b, c) {
        return b == null || typeof b === "boolean" || b === "" ? "" : c || typeof b !== "number" || b === 0 || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
      }
      function tb(a, b) {
        a = a.style;
        for (var c in b)
          if (b.hasOwnProperty(c)) {
            var d = c.indexOf("--") === 0, e = sb(c, b[c], d);
            c === "float" && (c = "cssFloat");
            d ? a.setProperty(c, e) : a[c] = e;
          }
      }
      var ub = m({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function vb(a, b) {
        if (b) {
          if (ub[a] && (b.children != null || b.dangerouslySetInnerHTML != null))
            throw Error(y(137, a));
          if (b.dangerouslySetInnerHTML != null) {
            if (b.children != null)
              throw Error(y(60));
            if (!(typeof b.dangerouslySetInnerHTML === "object" && "__html" in b.dangerouslySetInnerHTML))
              throw Error(y(61));
          }
          if (b.style != null && typeof b.style !== "object")
            throw Error(y(62));
        }
      }
      function wb(a, b) {
        if (a.indexOf("-") === -1)
          return typeof b.is === "string";
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return a.nodeType === 3 ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if (typeof yb !== "function")
            throw Error(y(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b)
            for (a = 0; a < b.length; a++)
              Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb(a, b, c, d, e) {
        return a(b, c, d, e);
      }
      function Ib() {
      }
      var Jb = Gb;
      var Kb = false;
      var Lb = false;
      function Mb() {
        if (zb !== null || Ab !== null)
          Ib(), Fb();
      }
      function Nb(a, b, c) {
        if (Lb)
          return a(b, c);
        Lb = true;
        try {
          return Jb(a, b, c);
        } finally {
          Lb = false, Mb();
        }
      }
      function Ob(a, b) {
        var c = a.stateNode;
        if (c === null)
          return null;
        var d = Db(c);
        if (d === null)
          return null;
        c = d[b];
        a:
          switch (b) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (d = !d.disabled) || (a = a.type, d = !(a === "button" || a === "input" || a === "select" || a === "textarea"));
              a = !d;
              break a;
            default:
              a = false;
          }
        if (a)
          return null;
        if (c && typeof c !== "function")
          throw Error(y(231, b, typeof c));
        return c;
      }
      var Pb = false;
      if (fa)
        try {
          Qb = {};
          Object.defineProperty(Qb, "passive", { get: function() {
            Pb = true;
          } });
          window.addEventListener("test", Qb, Qb);
          window.removeEventListener("test", Qb, Qb);
        } catch (a) {
          Pb = false;
        }
      var Qb;
      function Rb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (n) {
          this.onError(n);
        }
      }
      var Sb = false;
      var Tb = null;
      var Ub = false;
      var Vb = null;
      var Wb = { onError: function(a) {
        Sb = true;
        Tb = a;
      } };
      function Xb(a, b, c, d, e, f, g, h, k) {
        Sb = false;
        Tb = null;
        Rb.apply(Wb, arguments);
      }
      function Yb(a, b, c, d, e, f, g, h, k) {
        Xb.apply(this, arguments);
        if (Sb) {
          if (Sb) {
            var l = Tb;
            Sb = false;
            Tb = null;
          } else
            throw Error(y(198));
          Ub || (Ub = true, Vb = l);
        }
      }
      function Zb(a) {
        var b = a, c = a;
        if (a.alternate)
          for (; b.return; )
            b = b.return;
        else {
          a = b;
          do
            b = a, (b.flags & 1026) !== 0 && (c = b.return), a = b.return;
          while (a);
        }
        return b.tag === 3 ? c : null;
      }
      function $b(a) {
        if (a.tag === 13) {
          var b = a.memoizedState;
          b === null && (a = a.alternate, a !== null && (b = a.memoizedState));
          if (b !== null)
            return b.dehydrated;
        }
        return null;
      }
      function ac(a) {
        if (Zb(a) !== a)
          throw Error(y(188));
      }
      function bc(a) {
        var b = a.alternate;
        if (!b) {
          b = Zb(a);
          if (b === null)
            throw Error(y(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (e === null)
            break;
          var f = e.alternate;
          if (f === null) {
            d = e.return;
            if (d !== null) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c)
                return ac(e), a;
              if (f === d)
                return ac(e), b;
              f = f.sibling;
            }
            throw Error(y(188));
          }
          if (c.return !== d.return)
            c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g)
                throw Error(y(189));
            }
          }
          if (c.alternate !== d)
            throw Error(y(190));
        }
        if (c.tag !== 3)
          throw Error(y(188));
        return c.stateNode.current === c ? a : b;
      }
      function cc(a) {
        a = bc(a);
        if (!a)
          return null;
        for (var b = a; ; ) {
          if (b.tag === 5 || b.tag === 6)
            return b;
          if (b.child)
            b.child.return = b, b = b.child;
          else {
            if (b === a)
              break;
            for (; !b.sibling; ) {
              if (!b.return || b.return === a)
                return null;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return null;
      }
      function dc(a, b) {
        for (var c = a.alternate; b !== null; ) {
          if (b === a || b === c)
            return true;
          b = b.return;
        }
        return false;
      }
      var ec;
      var fc;
      var gc;
      var hc;
      var ic = false;
      var jc = [];
      var kc = null;
      var lc = null;
      var mc = null;
      var nc = /* @__PURE__ */ new Map();
      var oc = /* @__PURE__ */ new Map();
      var pc = [];
      var qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function rc(a, b, c, d, e) {
        return { blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d] };
      }
      function sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            kc = null;
            break;
          case "dragenter":
          case "dragleave":
            lc = null;
            break;
          case "mouseover":
          case "mouseout":
            mc = null;
            break;
          case "pointerover":
          case "pointerout":
            nc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            oc.delete(b.pointerId);
        }
      }
      function tc(a, b, c, d, e, f) {
        if (a === null || a.nativeEvent !== f)
          return a = rc(b, c, d, e, f), b !== null && (b = Cb(b), b !== null && fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        e !== null && b.indexOf(e) === -1 && b.push(e);
        return a;
      }
      function uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return kc = tc(kc, a, b, c, d, e), true;
          case "dragenter":
            return lc = tc(lc, a, b, c, d, e), true;
          case "mouseover":
            return mc = tc(mc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            nc.set(f, tc(nc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function vc(a) {
        var b = wc(a.target);
        if (b !== null) {
          var c = Zb(b);
          if (c !== null) {
            if (b = c.tag, b === 13) {
              if (b = $b(c), b !== null) {
                a.blockedOn = b;
                hc(a.lanePriority, function() {
                  r.unstable_runWithPriority(a.priority, function() {
                    gc(c);
                  });
                });
                return;
              }
            } else if (b === 3 && c.stateNode.hydrate) {
              a.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function xc(a) {
        if (a.blockedOn !== null)
          return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (c !== null)
            return b = Cb(c), b !== null && fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function zc(a, b, c) {
        xc(a) && c.delete(b);
      }
      function Ac() {
        for (ic = false; 0 < jc.length; ) {
          var a = jc[0];
          if (a.blockedOn !== null) {
            a = Cb(a.blockedOn);
            a !== null && ec(a);
            break;
          }
          for (var b = a.targetContainers; 0 < b.length; ) {
            var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
            if (c !== null) {
              a.blockedOn = c;
              break;
            }
            b.shift();
          }
          a.blockedOn === null && jc.shift();
        }
        kc !== null && xc(kc) && (kc = null);
        lc !== null && xc(lc) && (lc = null);
        mc !== null && xc(mc) && (mc = null);
        nc.forEach(zc);
        oc.forEach(zc);
      }
      function Bc(a, b) {
        a.blockedOn === b && (a.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
      }
      function Cc(a) {
        function b(b2) {
          return Bc(b2, a);
        }
        if (0 < jc.length) {
          Bc(jc[0], a);
          for (var c = 1; c < jc.length; c++) {
            var d = jc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        kc !== null && Bc(kc, a);
        lc !== null && Bc(lc, a);
        mc !== null && Bc(mc, a);
        nc.forEach(b);
        oc.forEach(b);
        for (c = 0; c < pc.length; c++)
          d = pc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < pc.length && (c = pc[0], c.blockedOn === null); )
          vc(c), c.blockedOn === null && pc.shift();
      }
      function Dc(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var Ec = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") };
      var Fc = {};
      var Gc = {};
      fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
      function Hc(a) {
        if (Fc[a])
          return Fc[a];
        if (!Ec[a])
          return a;
        var b = Ec[a], c;
        for (c in b)
          if (b.hasOwnProperty(c) && c in Gc)
            return Fc[a] = b[c];
        return a;
      }
      var Ic = Hc("animationend");
      var Jc = Hc("animationiteration");
      var Kc = Hc("animationstart");
      var Lc = Hc("transitionend");
      var Mc = /* @__PURE__ */ new Map();
      var Nc = /* @__PURE__ */ new Map();
      var Oc = [
        "abort",
        "abort",
        Ic,
        "animationEnd",
        Jc,
        "animationIteration",
        Kc,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        Lc,
        "transitionEnd",
        "waiting",
        "waiting"
      ];
      function Pc(a, b) {
        for (var c = 0; c < a.length; c += 2) {
          var d = a[c], e = a[c + 1];
          e = "on" + (e[0].toUpperCase() + e.slice(1));
          Nc.set(d, b);
          Mc.set(d, e);
          da(e, [d]);
        }
      }
      var Qc = r.unstable_now;
      Qc();
      var F = 8;
      function Rc(a) {
        if ((1 & a) !== 0)
          return F = 15, 1;
        if ((2 & a) !== 0)
          return F = 14, 2;
        if ((4 & a) !== 0)
          return F = 13, 4;
        var b = 24 & a;
        if (b !== 0)
          return F = 12, b;
        if ((a & 32) !== 0)
          return F = 11, 32;
        b = 192 & a;
        if (b !== 0)
          return F = 10, b;
        if ((a & 256) !== 0)
          return F = 9, 256;
        b = 3584 & a;
        if (b !== 0)
          return F = 8, b;
        if ((a & 4096) !== 0)
          return F = 7, 4096;
        b = 4186112 & a;
        if (b !== 0)
          return F = 6, b;
        b = 62914560 & a;
        if (b !== 0)
          return F = 5, b;
        if (a & 67108864)
          return F = 4, 67108864;
        if ((a & 134217728) !== 0)
          return F = 3, 134217728;
        b = 805306368 & a;
        if (b !== 0)
          return F = 2, b;
        if ((1073741824 & a) !== 0)
          return F = 1, 1073741824;
        F = 8;
        return a;
      }
      function Sc(a) {
        switch (a) {
          case 99:
            return 15;
          case 98:
            return 10;
          case 97:
          case 96:
            return 8;
          case 95:
            return 2;
          default:
            return 0;
        }
      }
      function Tc(a) {
        switch (a) {
          case 15:
          case 14:
            return 99;
          case 13:
          case 12:
          case 11:
          case 10:
            return 98;
          case 9:
          case 8:
          case 7:
          case 6:
          case 4:
          case 5:
            return 97;
          case 3:
          case 2:
          case 1:
            return 95;
          case 0:
            return 90;
          default:
            throw Error(y(358, a));
        }
      }
      function Uc(a, b) {
        var c = a.pendingLanes;
        if (c === 0)
          return F = 0;
        var d = 0, e = 0, f = a.expiredLanes, g = a.suspendedLanes, h = a.pingedLanes;
        if (f !== 0)
          d = f, e = F = 15;
        else if (f = c & 134217727, f !== 0) {
          var k = f & ~g;
          k !== 0 ? (d = Rc(k), e = F) : (h &= f, h !== 0 && (d = Rc(h), e = F));
        } else
          f = c & ~g, f !== 0 ? (d = Rc(f), e = F) : h !== 0 && (d = Rc(h), e = F);
        if (d === 0)
          return 0;
        d = 31 - Vc(d);
        d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
        if (b !== 0 && b !== d && (b & g) === 0) {
          Rc(b);
          if (e <= F)
            return b;
          F = e;
        }
        b = a.entangledLanes;
        if (b !== 0)
          for (a = a.entanglements, b &= d; 0 < b; )
            c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function Wc(a) {
        a = a.pendingLanes & -1073741825;
        return a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function Xc(a, b) {
        switch (a) {
          case 15:
            return 1;
          case 14:
            return 2;
          case 12:
            return a = Yc(24 & ~b), a === 0 ? Xc(10, b) : a;
          case 10:
            return a = Yc(192 & ~b), a === 0 ? Xc(8, b) : a;
          case 8:
            return a = Yc(3584 & ~b), a === 0 && (a = Yc(4186112 & ~b), a === 0 && (a = 512)), a;
          case 2:
            return b = Yc(805306368 & ~b), b === 0 && (b = 268435456), b;
        }
        throw Error(y(358, a));
      }
      function Yc(a) {
        return a & -a;
      }
      function Zc(a) {
        for (var b = [], c = 0; 31 > c; c++)
          b.push(a);
        return b;
      }
      function $c(a, b, c) {
        a.pendingLanes |= b;
        var d = b - 1;
        a.suspendedLanes &= d;
        a.pingedLanes &= d;
        a = a.eventTimes;
        b = 31 - Vc(b);
        a[b] = c;
      }
      var Vc = Math.clz32 ? Math.clz32 : ad;
      var bd = Math.log;
      var cd = Math.LN2;
      function ad(a) {
        return a === 0 ? 32 : 31 - (bd(a) / cd | 0) | 0;
      }
      var dd = r.unstable_UserBlockingPriority;
      var ed = r.unstable_runWithPriority;
      var fd = true;
      function gd(a, b, c, d) {
        Kb || Ib();
        var e = hd, f = Kb;
        Kb = true;
        try {
          Hb(e, a, b, c, d);
        } finally {
          (Kb = f) || Mb();
        }
      }
      function id(a, b, c, d) {
        ed(dd, hd.bind(null, a, b, c, d));
      }
      function hd(a, b, c, d) {
        if (fd) {
          var e;
          if ((e = (b & 4) === 0) && 0 < jc.length && -1 < qc.indexOf(a))
            a = rc(null, a, b, c, d), jc.push(a);
          else {
            var f = yc(a, b, c, d);
            if (f === null)
              e && sc(a, d);
            else {
              if (e) {
                if (-1 < qc.indexOf(a)) {
                  a = rc(f, a, b, c, d);
                  jc.push(a);
                  return;
                }
                if (uc(f, a, b, c, d))
                  return;
                sc(a, d);
              }
              jd(a, b, d, null, c);
            }
          }
        }
      }
      function yc(a, b, c, d) {
        var e = xb(d);
        e = wc(e);
        if (e !== null) {
          var f = Zb(e);
          if (f === null)
            e = null;
          else {
            var g = f.tag;
            if (g === 13) {
              e = $b(f);
              if (e !== null)
                return e;
              e = null;
            } else if (g === 3) {
              if (f.stateNode.hydrate)
                return f.tag === 3 ? f.stateNode.containerInfo : null;
              e = null;
            } else
              f !== e && (e = null);
          }
        }
        jd(a, b, d, e, c);
        return null;
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md)
          return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++)
          ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
          ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, a === 0 && b === 13 && (a = 13)) : a = b;
        a === 10 && (a = 13);
        return 32 <= a || a === 13 ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a)
            a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === false) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        m(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : typeof a2.returnValue !== "unknown" && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : typeof a2.cancelBubble !== "unknown" && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = m({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = m({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a)
          return a.movementX;
        a !== yd && (yd && a.type === "mousemove" ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = m({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = m({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = m({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = m({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = m({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = m({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if (b !== "Unidentified")
            return b;
        }
        return a.type === "keypress" ? (a = od(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return a.type === "keypress" ? od(a) : 0;
      }, keyCode: function(a) {
        return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
      }, which: function(a) {
        return a.type === "keypress" ? od(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = m({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = m({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = m({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = m({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = fa && "CompositionEvent" in window;
      var be = null;
      fa && "documentMode" in document && (be = document.documentMode);
      var ce = fa && "TextEvent" in window && !be;
      var de = fa && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return $d.indexOf(b.keyCode) !== -1;
          case "keydown":
            return b.keyCode !== 229;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return typeof a === "object" && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (b.which !== 32)
              return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie)
          return a === "compositionend" || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length)
                return b.char;
              if (b.which)
                return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && b.locale !== "ko" ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b === "input" ? !!le[a.type] : b === "textarea" ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b))
          return a;
      }
      function ve(a, b) {
        if (a === "change")
          return b;
      }
      var we = false;
      if (fa) {
        if (fa) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = typeof ze.oninput === "function";
          }
          xe = ye;
        } else
          xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if (a.propertyName === "value" && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          a = re;
          if (Kb)
            a(b);
          else {
            Kb = true;
            try {
              Gb(a, b);
            } finally {
              Kb = false, Mb();
            }
          }
        }
      }
      function Ce(a, b, c) {
        a === "focusin" ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : a === "focusout" && Ae();
      }
      function De(a) {
        if (a === "selectionchange" || a === "keyup" || a === "keydown")
          return te(qe);
      }
      function Ee(a, b) {
        if (a === "click")
          return te(b);
      }
      function Fe(a, b) {
        if (a === "input" || a === "change")
          return te(b);
      }
      function Ge(a, b) {
        return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = typeof Object.is === "function" ? Object.is : Ge;
      var Ie = Object.prototype.hasOwnProperty;
      function Je(a, b) {
        if (He(a, b))
          return true;
        if (typeof a !== "object" || a === null || typeof b !== "object" || b === null)
          return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length)
          return false;
        for (d = 0; d < c.length; d++)
          if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]]))
            return false;
        return true;
      }
      function Ke(a) {
        for (; a && a.firstChild; )
          a = a.firstChild;
        return a;
      }
      function Le(a, b) {
        var c = Ke(a);
        a = 0;
        for (var d; c; ) {
          if (c.nodeType === 3) {
            d = a + c.textContent.length;
            if (a <= b && d >= b)
              return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Ke(c);
        }
      }
      function Me(a, b) {
        return a && b ? a === b ? true : a && a.nodeType === 3 ? false : b && b.nodeType === 3 ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Ne() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = typeof b.contentWindow.location.href === "string";
          } catch (d) {
            c = false;
          }
          if (c)
            a = b.contentWindow;
          else
            break;
          b = Xa(a.document);
        }
        return b;
      }
      function Oe(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && (b === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || b === "textarea" || a.contentEditable === "true");
      }
      var Pe = fa && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
        Te || Qe == null || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
      Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
      Pc(Oc, 2);
      for (Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
        Nc.set(Ve[We], 0);
      var Ve;
      var We;
      ea("onMouseEnter", ["mouseout", "mouseover"]);
      ea("onMouseLeave", ["mouseout", "mouseover"]);
      ea("onPointerEnter", ["pointerout", "pointerover"]);
      ea("onPointerLeave", ["pointerout", "pointerover"]);
      da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
      function Ze(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Yb(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = (b & 4) !== 0;
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b)
              for (var g = d.length - 1; 0 <= g; g--) {
                var h = d[g], k = h.instance, l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                Ze(e, h, l);
                f = k;
              }
            else
              for (g = 0; g < d.length; g++) {
                h = d[g];
                k = h.instance;
                l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                Ze(e, h, l);
                f = k;
              }
          }
        }
        if (Ub)
          throw a = Vb, Ub = false, Vb = null, a;
      }
      function G(a, b) {
        var c = $e(b), d = a + "__bubble";
        c.has(d) || (af(b, a, 2, false), c.add(d));
      }
      var bf = "_reactListening" + Math.random().toString(36).slice(2);
      function cf(a) {
        a[bf] || (a[bf] = true, ba.forEach(function(b) {
          Ye.has(b) || df(b, false, a, null);
          df(b, true, a, null);
        }));
      }
      function df(a, b, c, d) {
        var e = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, f = c;
        a === "selectionchange" && c.nodeType !== 9 && (f = c.ownerDocument);
        if (d !== null && !b && Ye.has(a)) {
          if (a !== "scroll")
            return;
          e |= 2;
          f = d;
        }
        var g = $e(f), h = a + "__" + (b ? "capture" : "bubble");
        g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
      }
      function af(a, b, c, d) {
        var e = Nc.get(b);
        switch (e === void 0 ? 2 : e) {
          case 0:
            e = gd;
            break;
          case 1:
            e = id;
            break;
          default:
            e = hd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Pb || b !== "touchstart" && b !== "touchmove" && b !== "wheel" || (e = true);
        d ? e !== void 0 ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : e !== void 0 ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function jd(a, b, c, d, e) {
        var f = d;
        if ((b & 1) === 0 && (b & 2) === 0 && d !== null)
          a:
            for (; ; ) {
              if (d === null)
                return;
              var g = d.tag;
              if (g === 3 || g === 4) {
                var h = d.stateNode.containerInfo;
                if (h === e || h.nodeType === 8 && h.parentNode === e)
                  break;
                if (g === 4)
                  for (g = d.return; g !== null; ) {
                    var k = g.tag;
                    if (k === 3 || k === 4) {
                      if (k = g.stateNode.containerInfo, k === e || k.nodeType === 8 && k.parentNode === e)
                        return;
                    }
                    g = g.return;
                  }
                for (; h !== null; ) {
                  g = wc(h);
                  if (g === null)
                    return;
                  k = g.tag;
                  if (k === 5 || k === 6) {
                    d = f = g;
                    continue a;
                  }
                  h = h.parentNode;
                }
              }
              d = d.return;
            }
        Nb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = Mc.get(a);
            if (h2 !== void 0) {
              var k2 = td, x = a;
              switch (a) {
                case "keypress":
                  if (od(c) === 0)
                    break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  x = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  x = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (c.button === 2)
                    break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case Ic:
                case Jc:
                case Kc:
                  k2 = Hd;
                  break;
                case Lc:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var w = (b & 4) !== 0, z = !w && a === "scroll", u = w ? h2 !== null ? h2 + "Capture" : null : h2;
              w = [];
              for (var t = d2, q; t !== null; ) {
                q = t;
                var v = q.stateNode;
                q.tag === 5 && v !== null && (q = v, u !== null && (v = Ob(t, u), v != null && w.push(ef(t, v, q))));
                if (z)
                  break;
                t = t.return;
              }
              0 < w.length && (h2 = new k2(h2, x, null, c, e2), g2.push({ event: h2, listeners: w }));
            }
          }
          if ((b & 7) === 0) {
            a: {
              h2 = a === "mouseover" || a === "pointerover";
              k2 = a === "mouseout" || a === "pointerout";
              if (h2 && (b & 16) === 0 && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff]))
                break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (x = c.relatedTarget || c.toElement, k2 = d2, x = x ? wc(x) : null, x !== null && (z = Zb(x), x !== z || x.tag !== 5 && x.tag !== 6))
                    x = null;
                } else
                  k2 = null, x = d2;
                if (k2 !== x) {
                  w = Bd;
                  v = "onMouseLeave";
                  u = "onMouseEnter";
                  t = "mouse";
                  if (a === "pointerout" || a === "pointerover")
                    w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
                  z = k2 == null ? h2 : ue(k2);
                  q = x == null ? h2 : ue(x);
                  h2 = new w(v, t + "leave", k2, c, e2);
                  h2.target = z;
                  h2.relatedTarget = q;
                  v = null;
                  wc(e2) === d2 && (w = new w(u, t + "enter", x, c, e2), w.target = q, w.relatedTarget = z, v = w);
                  z = v;
                  if (k2 && x)
                    b: {
                      w = k2;
                      u = x;
                      t = 0;
                      for (q = w; q; q = gf(q))
                        t++;
                      q = 0;
                      for (v = u; v; v = gf(v))
                        q++;
                      for (; 0 < t - q; )
                        w = gf(w), t--;
                      for (; 0 < q - t; )
                        u = gf(u), q--;
                      for (; t--; ) {
                        if (w === u || u !== null && w === u.alternate)
                          break b;
                        w = gf(w);
                        u = gf(u);
                      }
                      w = null;
                    }
                  else
                    w = null;
                  k2 !== null && hf(g2, h2, k2, w, false);
                  x !== null && z !== null && hf(g2, z, x, w, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if (k2 === "select" || k2 === "input" && h2.type === "file")
                var J = ve;
              else if (me(h2))
                if (we)
                  J = Fe;
                else {
                  J = De;
                  var K = Ce;
                }
              else
                (k2 = h2.nodeName) && k2.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (J = Ee);
              if (J && (J = J(a, d2))) {
                ne(g2, J, c, e2);
                break a;
              }
              K && K(a, h2, d2);
              a === "focusout" && (K = h2._wrapperState) && K.controlled && h2.type === "number" && bb(h2, "number", h2.value);
            }
            K = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(K) || K.contentEditable === "true")
                  Qe = K, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe)
                  break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var Q;
            if (ae)
              b: {
                switch (a) {
                  case "compositionstart":
                    var L = "onCompositionStart";
                    break b;
                  case "compositionend":
                    L = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    L = "onCompositionUpdate";
                    break b;
                }
                L = void 0;
              }
            else
              ie ? ge(a, c) && (L = "onCompositionEnd") : a === "keydown" && c.keyCode === 229 && (L = "onCompositionStart");
            L && (de && c.locale !== "ko" && (ie || L !== "onCompositionStart" ? L === "onCompositionEnd" && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a, null, c, e2), g2.push({ event: L, listeners: K }), Q ? L.data = Q : (Q = he(c), Q !== null && (L.data = Q))));
            if (Q = ce ? je(a, c) : ke(a, c))
              d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = Q);
          }
          se(g2, b);
        });
      }
      function ef(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; a !== null; ) {
          var e = a, f = e.stateNode;
          e.tag === 5 && f !== null && (e = f, f = Ob(a, c), f != null && d.unshift(ef(a, f, e)), f = Ob(a, b), f != null && d.push(ef(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function gf(a) {
        if (a === null)
          return null;
        do
          a = a.return;
        while (a && a.tag !== 5);
        return a ? a : null;
      }
      function hf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; c !== null && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (k !== null && k === d)
            break;
          h.tag === 5 && l !== null && (h = l, e ? (k = Ob(c, f), k != null && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), k != null && g.push(ef(c, k, h))));
          c = c.return;
        }
        g.length !== 0 && a.push({ event: b, listeners: g });
      }
      function jf() {
      }
      var kf = null;
      var lf = null;
      function mf(a, b) {
        switch (a) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            return !!b.autoFocus;
        }
        return false;
      }
      function nf(a, b) {
        return a === "textarea" || a === "option" || a === "noscript" || typeof b.children === "string" || typeof b.children === "number" || typeof b.dangerouslySetInnerHTML === "object" && b.dangerouslySetInnerHTML !== null && b.dangerouslySetInnerHTML.__html != null;
      }
      var of = typeof setTimeout === "function" ? setTimeout : void 0;
      var pf = typeof clearTimeout === "function" ? clearTimeout : void 0;
      function qf(a) {
        a.nodeType === 1 ? a.textContent = "" : a.nodeType === 9 && (a = a.body, a != null && (a.textContent = ""));
      }
      function rf(a) {
        for (; a != null; a = a.nextSibling) {
          var b = a.nodeType;
          if (b === 1 || b === 3)
            break;
        }
        return a;
      }
      function sf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (a.nodeType === 8) {
            var c = a.data;
            if (c === "$" || c === "$!" || c === "$?") {
              if (b === 0)
                return a;
              b--;
            } else
              c === "/$" && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var tf = 0;
      function uf(a) {
        return { $$typeof: Ga, toString: a, valueOf: a };
      }
      var vf = Math.random().toString(36).slice(2);
      var wf = "__reactFiber$" + vf;
      var xf = "__reactProps$" + vf;
      var ff = "__reactContainer$" + vf;
      var yf = "__reactEvents$" + vf;
      function wc(a) {
        var b = a[wf];
        if (b)
          return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[ff] || c[wf]) {
            c = b.alternate;
            if (b.child !== null || c !== null && c.child !== null)
              for (a = sf(a); a !== null; ) {
                if (c = a[wf])
                  return c;
                a = sf(a);
              }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[wf] || a[ff];
        return !a || a.tag !== 5 && a.tag !== 6 && a.tag !== 13 && a.tag !== 3 ? null : a;
      }
      function ue(a) {
        if (a.tag === 5 || a.tag === 6)
          return a.stateNode;
        throw Error(y(33));
      }
      function Db(a) {
        return a[xf] || null;
      }
      function $e(a) {
        var b = a[yf];
        b === void 0 && (b = a[yf] = /* @__PURE__ */ new Set());
        return b;
      }
      var zf = [];
      var Af = -1;
      function Bf(a) {
        return { current: a };
      }
      function H(a) {
        0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
      }
      function I(a, b) {
        Af++;
        zf[Af] = a.current;
        a.current = b;
      }
      var Cf = {};
      var M = Bf(Cf);
      var N = Bf(false);
      var Df = Cf;
      function Ef(a, b) {
        var c = a.type.contextTypes;
        if (!c)
          return Cf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
          return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c)
          e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Ff(a) {
        a = a.childContextTypes;
        return a !== null && a !== void 0;
      }
      function Gf() {
        H(N);
        H(M);
      }
      function Hf(a, b, c) {
        if (M.current !== Cf)
          throw Error(y(168));
        I(M, b);
        I(N, c);
      }
      function If(a, b, c) {
        var d = a.stateNode;
        a = b.childContextTypes;
        if (typeof d.getChildContext !== "function")
          return c;
        d = d.getChildContext();
        for (var e in d)
          if (!(e in a))
            throw Error(y(108, Ra(b) || "Unknown", e));
        return m({}, c, d);
      }
      function Jf(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
        Df = M.current;
        I(M, a);
        I(N, N.current);
        return true;
      }
      function Kf(a, b, c) {
        var d = a.stateNode;
        if (!d)
          throw Error(y(169));
        c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
        I(N, c);
      }
      var Lf = null;
      var Mf = null;
      var Nf = r.unstable_runWithPriority;
      var Of = r.unstable_scheduleCallback;
      var Pf = r.unstable_cancelCallback;
      var Qf = r.unstable_shouldYield;
      var Rf = r.unstable_requestPaint;
      var Sf = r.unstable_now;
      var Tf = r.unstable_getCurrentPriorityLevel;
      var Uf = r.unstable_ImmediatePriority;
      var Vf = r.unstable_UserBlockingPriority;
      var Wf = r.unstable_NormalPriority;
      var Xf = r.unstable_LowPriority;
      var Yf = r.unstable_IdlePriority;
      var Zf = {};
      var $f = Rf !== void 0 ? Rf : function() {
      };
      var ag = null;
      var bg = null;
      var cg = false;
      var dg = Sf();
      var O = 1e4 > dg ? Sf : function() {
        return Sf() - dg;
      };
      function eg() {
        switch (Tf()) {
          case Uf:
            return 99;
          case Vf:
            return 98;
          case Wf:
            return 97;
          case Xf:
            return 96;
          case Yf:
            return 95;
          default:
            throw Error(y(332));
        }
      }
      function fg(a) {
        switch (a) {
          case 99:
            return Uf;
          case 98:
            return Vf;
          case 97:
            return Wf;
          case 96:
            return Xf;
          case 95:
            return Yf;
          default:
            throw Error(y(332));
        }
      }
      function gg(a, b) {
        a = fg(a);
        return Nf(a, b);
      }
      function hg(a, b, c) {
        a = fg(a);
        return Of(a, b, c);
      }
      function ig() {
        if (bg !== null) {
          var a = bg;
          bg = null;
          Pf(a);
        }
        jg();
      }
      function jg() {
        if (!cg && ag !== null) {
          cg = true;
          var a = 0;
          try {
            var b = ag;
            gg(99, function() {
              for (; a < b.length; a++) {
                var c = b[a];
                do
                  c = c(true);
                while (c !== null);
              }
            });
            ag = null;
          } catch (c) {
            throw ag !== null && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
          } finally {
            cg = false;
          }
        }
      }
      var kg = ra.ReactCurrentBatchConfig;
      function lg(a, b) {
        if (a && a.defaultProps) {
          b = m({}, b);
          a = a.defaultProps;
          for (var c in a)
            b[c] === void 0 && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      var mg = Bf(null);
      var ng = null;
      var og = null;
      var pg = null;
      function qg() {
        pg = og = ng = null;
      }
      function rg(a) {
        var b = mg.current;
        H(mg);
        a.type._context._currentValue = b;
      }
      function sg(a, b) {
        for (; a !== null; ) {
          var c = a.alternate;
          if ((a.childLanes & b) === b)
            if (c === null || (c.childLanes & b) === b)
              break;
            else
              c.childLanes |= b;
          else
            a.childLanes |= b, c !== null && (c.childLanes |= b);
          a = a.return;
        }
      }
      function tg(a, b) {
        ng = a;
        pg = og = null;
        a = a.dependencies;
        a !== null && a.firstContext !== null && ((a.lanes & b) !== 0 && (ug = true), a.firstContext = null);
      }
      function vg(a, b) {
        if (pg !== a && b !== false && b !== 0) {
          if (typeof b !== "number" || b === 1073741823)
            pg = a, b = 1073741823;
          b = { context: a, observedBits: b, next: null };
          if (og === null) {
            if (ng === null)
              throw Error(y(308));
            og = b;
            ng.dependencies = { lanes: 0, firstContext: b, responders: null };
          } else
            og = og.next = b;
        }
        return a._currentValue;
      }
      var wg = false;
      function xg(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
      }
      function yg(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function zg(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function Ag(a, b) {
        a = a.updateQueue;
        if (a !== null) {
          a = a.shared;
          var c = a.pending;
          c === null ? b.next = b : (b.next = c.next, c.next = b);
          a.pending = b;
        }
      }
      function Bg(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (d !== null && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (c !== null) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              f === null ? e = f = g : f = f.next = g;
              c = c.next;
            } while (c !== null);
            f === null ? e = f = b : f = f.next = b;
          } else
            e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        a === null ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function Cg(a, b, c, d) {
        var e = a.updateQueue;
        wg = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (h !== null) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          g === null ? f = l : g.next = l;
          g = k;
          var n = a.alternate;
          if (n !== null) {
            n = n.updateQueue;
            var A = n.lastBaseUpdate;
            A !== g && (A === null ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
          }
        }
        if (f !== null) {
          A = e.baseState;
          g = 0;
          n = l = k = null;
          do {
            h = f.lane;
            var p = f.eventTime;
            if ((d & h) === h) {
              n !== null && (n = n.next = {
                eventTime: p,
                lane: 0,
                tag: f.tag,
                payload: f.payload,
                callback: f.callback,
                next: null
              });
              a: {
                var C = a, x = f;
                h = b;
                p = c;
                switch (x.tag) {
                  case 1:
                    C = x.payload;
                    if (typeof C === "function") {
                      A = C.call(p, A, h);
                      break a;
                    }
                    A = C;
                    break a;
                  case 3:
                    C.flags = C.flags & -4097 | 64;
                  case 0:
                    C = x.payload;
                    h = typeof C === "function" ? C.call(p, A, h) : C;
                    if (h === null || h === void 0)
                      break a;
                    A = m({}, A, h);
                    break a;
                  case 2:
                    wg = true;
                }
              }
              f.callback !== null && (a.flags |= 32, h = e.effects, h === null ? e.effects = [f] : h.push(f));
            } else
              p = { eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, n === null ? (l = n = p, k = A) : n = n.next = p, g |= h;
            f = f.next;
            if (f === null)
              if (h = e.shared.pending, h === null)
                break;
              else
                f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
          } while (1);
          n === null && (k = A);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = n;
          Dg |= g;
          a.lanes = g;
          a.memoizedState = A;
        }
      }
      function Eg(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (a !== null)
          for (b = 0; b < a.length; b++) {
            var d = a[b], e = d.callback;
            if (e !== null) {
              d.callback = null;
              d = c;
              if (typeof e !== "function")
                throw Error(y(191, e));
              e.call(d);
            }
          }
      }
      var Fg = new aa.Component().refs;
      function Gg(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = c === null || c === void 0 ? b : m({}, b, c);
        a.memoizedState = c;
        a.lanes === 0 && (a.updateQueue.baseState = c);
      }
      var Kg = { isMounted: function(a) {
        return (a = a._reactInternals) ? Zb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = Hg(), e = Ig(a), f = zg(d, e);
        f.payload = b;
        c !== void 0 && c !== null && (f.callback = c);
        Ag(a, f);
        Jg(a, e, d);
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = Hg(), e = Ig(a), f = zg(d, e);
        f.tag = 1;
        f.payload = b;
        c !== void 0 && c !== null && (f.callback = c);
        Ag(a, f);
        Jg(a, e, d);
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = Hg(), d = Ig(a), e = zg(c, d);
        e.tag = 2;
        b !== void 0 && b !== null && (e.callback = b);
        Ag(a, e);
        Jg(a, d, c);
      } };
      function Lg(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return typeof a.shouldComponentUpdate === "function" ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : true;
      }
      function Mg(a, b, c) {
        var d = false, e = Cf;
        var f = b.contextType;
        typeof f === "object" && f !== null ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = d !== null && d !== void 0) ? Ef(a, e) : Cf);
        b = new b(c, f);
        a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null;
        b.updater = Kg;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Ng(a, b, c, d) {
        a = b.state;
        typeof b.componentWillReceiveProps === "function" && b.componentWillReceiveProps(c, d);
        typeof b.UNSAFE_componentWillReceiveProps === "function" && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
      }
      function Og(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = Fg;
        xg(a);
        var f = b.contextType;
        typeof f === "object" && f !== null ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f));
        Cg(a, c, e, d);
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        typeof f === "function" && (Gg(a, b, f, c), e.state = a.memoizedState);
        typeof b.getDerivedStateFromProps === "function" || typeof e.getSnapshotBeforeUpdate === "function" || typeof e.UNSAFE_componentWillMount !== "function" && typeof e.componentWillMount !== "function" || (b = e.state, typeof e.componentWillMount === "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
        typeof e.componentDidMount === "function" && (a.flags |= 4);
      }
      var Pg = Array.isArray;
      function Qg(a, b, c) {
        a = c.ref;
        if (a !== null && typeof a !== "function" && typeof a !== "object") {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (c.tag !== 1)
                throw Error(y(309));
              var d = c.stateNode;
            }
            if (!d)
              throw Error(y(147, a));
            var e = "" + a;
            if (b !== null && b.ref !== null && typeof b.ref === "function" && b.ref._stringRef === e)
              return b.ref;
            b = function(a2) {
              var b2 = d.refs;
              b2 === Fg && (b2 = d.refs = {});
              a2 === null ? delete b2[e] : b2[e] = a2;
            };
            b._stringRef = e;
            return b;
          }
          if (typeof a !== "string")
            throw Error(y(284));
          if (!c._owner)
            throw Error(y(290, a));
        }
        return a;
      }
      function Rg(a, b) {
        if (a.type !== "textarea")
          throw Error(y(31, Object.prototype.toString.call(b) === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
      }
      function Sg(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.lastEffect;
            d2 !== null ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
            c2.nextEffect = null;
            c2.flags = 8;
          }
        }
        function c(c2, d2) {
          if (!a)
            return null;
          for (; d2 !== null; )
            b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); b2 !== null; )
            b2.key !== null ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Tg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a)
            return c2;
          d2 = b2.alternate;
          if (d2 !== null)
            return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
          b2.flags = 2;
          return c2;
        }
        function g(b2) {
          a && b2.alternate === null && (b2.flags = 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (b2 === null || b2.tag !== 6)
            return b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          if (b2 !== null && b2.elementType === c2.type)
            return d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2;
          d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Qg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
            return b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function n(a2, b2, c2, d2, f2) {
          if (b2 === null || b2.tag !== 7)
            return b2 = Xg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function A(a2, b2, c2) {
          if (typeof b2 === "string" || typeof b2 === "number")
            return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
          if (typeof b2 === "object" && b2 !== null) {
            switch (b2.$$typeof) {
              case sa:
                return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
              case ta:
                return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
            }
            if (Pg(b2) || La(b2))
              return b2 = Xg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Rg(a2, b2);
          }
          return null;
        }
        function p(a2, b2, c2, d2) {
          var e2 = b2 !== null ? b2.key : null;
          if (typeof c2 === "string" || typeof c2 === "number")
            return e2 !== null ? null : h(a2, b2, "" + c2, d2);
          if (typeof c2 === "object" && c2 !== null) {
            switch (c2.$$typeof) {
              case sa:
                return c2.key === e2 ? c2.type === ua ? n(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
              case ta:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            }
            if (Pg(c2) || La(c2))
              return e2 !== null ? null : n(a2, b2, c2, d2, null);
            Rg(a2, c2);
          }
          return null;
        }
        function C(a2, b2, c2, d2, e2) {
          if (typeof d2 === "string" || typeof d2 === "number")
            return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if (typeof d2 === "object" && d2 !== null) {
            switch (d2.$$typeof) {
              case sa:
                return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, d2.type === ua ? n(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
              case ta:
                return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            }
            if (Pg(d2) || La(d2))
              return a2 = a2.get(c2) || null, n(b2, a2, d2, e2, null);
            Rg(b2, d2);
          }
          return null;
        }
        function x(e2, g2, h2, k2) {
          for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; u !== null && z < h2.length; z++) {
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var n2 = p(e2, u, h2[z], k2);
            if (n2 === null) {
              u === null && (u = q);
              break;
            }
            a && u && n2.alternate === null && b(e2, u);
            g2 = f(n2, g2, z);
            t === null ? l2 = n2 : t.sibling = n2;
            t = n2;
            u = q;
          }
          if (z === h2.length)
            return c(e2, u), l2;
          if (u === null) {
            for (; z < h2.length; z++)
              u = A(e2, h2[z], k2), u !== null && (g2 = f(u, g2, z), t === null ? l2 = u : t.sibling = u, t = u);
            return l2;
          }
          for (u = d(e2, u); z < h2.length; z++)
            q = C(u, e2, z, h2[z], k2), q !== null && (a && q.alternate !== null && u.delete(q.key === null ? z : q.key), g2 = f(q, g2, z), t === null ? l2 = q : t.sibling = q, t = q);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        function w(e2, g2, h2, k2) {
          var l2 = La(h2);
          if (typeof l2 !== "function")
            throw Error(y(150));
          h2 = l2.call(h2);
          if (h2 == null)
            throw Error(y(151));
          for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); u !== null && !n2.done; z++, n2 = h2.next()) {
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var w2 = p(e2, u, n2.value, k2);
            if (w2 === null) {
              u === null && (u = q);
              break;
            }
            a && u && w2.alternate === null && b(e2, u);
            g2 = f(w2, g2, z);
            t === null ? l2 = w2 : t.sibling = w2;
            t = w2;
            u = q;
          }
          if (n2.done)
            return c(e2, u), l2;
          if (u === null) {
            for (; !n2.done; z++, n2 = h2.next())
              n2 = A(e2, n2.value, k2), n2 !== null && (g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
            return l2;
          }
          for (u = d(e2, u); !n2.done; z++, n2 = h2.next())
            n2 = C(u, e2, z, n2.value, k2), n2 !== null && (a && n2.alternate !== null && u.delete(n2.key === null ? z : n2.key), g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        return function(a2, d2, f2, h2) {
          var k2 = typeof f2 === "object" && f2 !== null && f2.type === ua && f2.key === null;
          k2 && (f2 = f2.props.children);
          var l2 = typeof f2 === "object" && f2 !== null;
          if (l2)
            switch (f2.$$typeof) {
              case sa:
                a: {
                  l2 = f2.key;
                  for (k2 = d2; k2 !== null; ) {
                    if (k2.key === l2) {
                      switch (k2.tag) {
                        case 7:
                          if (f2.type === ua) {
                            c(a2, k2.sibling);
                            d2 = e(k2, f2.props.children);
                            d2.return = a2;
                            a2 = d2;
                            break a;
                          }
                          break;
                        default:
                          if (k2.elementType === f2.type) {
                            c(a2, k2.sibling);
                            d2 = e(k2, f2.props);
                            d2.ref = Qg(a2, k2, f2);
                            d2.return = a2;
                            a2 = d2;
                            break a;
                          }
                      }
                      c(a2, k2);
                      break;
                    } else
                      b(a2, k2);
                    k2 = k2.sibling;
                  }
                  f2.type === ua ? (d2 = Xg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Qg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case ta:
                a: {
                  for (k2 = f2.key; d2 !== null; ) {
                    if (d2.key === k2)
                      if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                        c(a2, d2.sibling);
                        d2 = e(d2, f2.children || []);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      } else {
                        c(a2, d2);
                        break;
                      }
                    else
                      b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Wg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
            }
          if (typeof f2 === "string" || typeof f2 === "number")
            return f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
          if (Pg(f2))
            return x(a2, d2, f2, h2);
          if (La(f2))
            return w(a2, d2, f2, h2);
          l2 && Rg(a2, f2);
          if (typeof f2 === "undefined" && !k2)
            switch (a2.tag) {
              case 1:
              case 22:
              case 0:
              case 11:
              case 15:
                throw Error(y(152, Ra(a2.type) || "Component"));
            }
          return c(a2, d2);
        };
      }
      var Yg = Sg(true);
      var Zg = Sg(false);
      var $g = {};
      var ah = Bf($g);
      var bh = Bf($g);
      var ch = Bf($g);
      function dh(a) {
        if (a === $g)
          throw Error(y(174));
        return a;
      }
      function eh(a, b) {
        I(ch, b);
        I(bh, a);
        I(ah, $g);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
            break;
          default:
            a = a === 8 ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
        }
        H(ah);
        I(ah, b);
      }
      function fh() {
        H(ah);
        H(bh);
        H(ch);
      }
      function gh(a) {
        dh(ch.current);
        var b = dh(ah.current);
        var c = mb(b, a.type);
        b !== c && (I(bh, a), I(ah, c));
      }
      function hh(a) {
        bh.current === a && (H(ah), H(bh));
      }
      var P = Bf(0);
      function ih(a) {
        for (var b = a; b !== null; ) {
          if (b.tag === 13) {
            var c = b.memoizedState;
            if (c !== null && (c = c.dehydrated, c === null || c.data === "$?" || c.data === "$!"))
              return b;
          } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
            if ((b.flags & 64) !== 0)
              return b;
          } else if (b.child !== null) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a)
            break;
          for (; b.sibling === null; ) {
            if (b.return === null || b.return === a)
              return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var jh = null;
      var kh = null;
      var lh = false;
      function mh(a, b) {
        var c = nh(5, null, null, 0);
        c.elementType = "DELETED";
        c.type = "DELETED";
        c.stateNode = b;
        c.return = a;
        c.flags = 8;
        a.lastEffect !== null ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
      }
      function oh(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = b.nodeType !== 1 || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return b !== null ? (a.stateNode = b, true) : false;
          case 6:
            return b = a.pendingProps === "" || b.nodeType !== 3 ? null : b, b !== null ? (a.stateNode = b, true) : false;
          case 13:
            return false;
          default:
            return false;
        }
      }
      function ph(a) {
        if (lh) {
          var b = kh;
          if (b) {
            var c = b;
            if (!oh(a, b)) {
              b = rf(c.nextSibling);
              if (!b || !oh(a, b)) {
                a.flags = a.flags & -1025 | 2;
                lh = false;
                jh = a;
                return;
              }
              mh(jh, c);
            }
            jh = a;
            kh = rf(b.firstChild);
          } else
            a.flags = a.flags & -1025 | 2, lh = false, jh = a;
        }
      }
      function qh(a) {
        for (a = a.return; a !== null && a.tag !== 5 && a.tag !== 3 && a.tag !== 13; )
          a = a.return;
        jh = a;
      }
      function rh(a) {
        if (a !== jh)
          return false;
        if (!lh)
          return qh(a), lh = true, false;
        var b = a.type;
        if (a.tag !== 5 || b !== "head" && b !== "body" && !nf(b, a.memoizedProps))
          for (b = kh; b; )
            mh(a, b), b = rf(b.nextSibling);
        qh(a);
        if (a.tag === 13) {
          a = a.memoizedState;
          a = a !== null ? a.dehydrated : null;
          if (!a)
            throw Error(y(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (a.nodeType === 8) {
                var c = a.data;
                if (c === "/$") {
                  if (b === 0) {
                    kh = rf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else
                  c !== "$" && c !== "$!" && c !== "$?" || b++;
              }
              a = a.nextSibling;
            }
            kh = null;
          }
        } else
          kh = jh ? rf(a.stateNode.nextSibling) : null;
        return true;
      }
      function sh() {
        kh = jh = null;
        lh = false;
      }
      var th = [];
      function uh() {
        for (var a = 0; a < th.length; a++)
          th[a]._workInProgressVersionPrimary = null;
        th.length = 0;
      }
      var vh = ra.ReactCurrentDispatcher;
      var wh = ra.ReactCurrentBatchConfig;
      var xh = 0;
      var R = null;
      var S = null;
      var T = null;
      var yh = false;
      var zh = false;
      function Ah() {
        throw Error(y(321));
      }
      function Bh(a, b) {
        if (b === null)
          return false;
        for (var c = 0; c < b.length && c < a.length; c++)
          if (!He(a[c], b[c]))
            return false;
        return true;
      }
      function Ch(a, b, c, d, e, f) {
        xh = f;
        R = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        vh.current = a === null || a.memoizedState === null ? Dh : Eh;
        a = c(d, e);
        if (zh) {
          f = 0;
          do {
            zh = false;
            if (!(25 > f))
              throw Error(y(301));
            f += 1;
            T = S = null;
            b.updateQueue = null;
            vh.current = Fh;
            a = c(d, e);
          } while (zh);
        }
        vh.current = Gh;
        b = S !== null && S.next !== null;
        xh = 0;
        T = S = R = null;
        yh = false;
        if (b)
          throw Error(y(300));
        return a;
      }
      function Hh() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        T === null ? R.memoizedState = T = a : T = T.next = a;
        return T;
      }
      function Ih() {
        if (S === null) {
          var a = R.alternate;
          a = a !== null ? a.memoizedState : null;
        } else
          a = S.next;
        var b = T === null ? R.memoizedState : T.next;
        if (b !== null)
          T = b, S = a;
        else {
          if (a === null)
            throw Error(y(310));
          S = a;
          a = { memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null };
          T === null ? R.memoizedState = T = a : T = T.next = a;
        }
        return T;
      }
      function Jh(a, b) {
        return typeof b === "function" ? b(a) : b;
      }
      function Kh(a) {
        var b = Ih(), c = b.queue;
        if (c === null)
          throw Error(y(311));
        c.lastRenderedReducer = a;
        var d = S, e = d.baseQueue, f = c.pending;
        if (f !== null) {
          if (e !== null) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (e !== null) {
          e = e.next;
          d = d.baseState;
          var h = g = f = null, k = e;
          do {
            var l = k.lane;
            if ((xh & l) === l)
              h !== null && (h = h.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
            else {
              var n = {
                lane: l,
                action: k.action,
                eagerReducer: k.eagerReducer,
                eagerState: k.eagerState,
                next: null
              };
              h === null ? (g = h = n, f = d) : h = h.next = n;
              R.lanes |= l;
              Dg |= l;
            }
            k = k.next;
          } while (k !== null && k !== e);
          h === null ? f = d : h.next = g;
          He(d, b.memoizedState) || (ug = true);
          b.memoizedState = d;
          b.baseState = f;
          b.baseQueue = h;
          c.lastRenderedState = d;
        }
        return [b.memoizedState, c.dispatch];
      }
      function Lh(a) {
        var b = Ih(), c = b.queue;
        if (c === null)
          throw Error(y(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (e !== null) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (ug = true);
          b.memoizedState = f;
          b.baseQueue === null && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Mh(a, b, c) {
        var d = b._getVersion;
        d = d(b._source);
        var e = b._workInProgressVersionPrimary;
        if (e !== null)
          a = e === d;
        else if (a = a.mutableReadLanes, a = (xh & a) === a)
          b._workInProgressVersionPrimary = d, th.push(b);
        if (a)
          return c(b._source);
        th.push(b);
        throw Error(y(350));
      }
      function Nh(a, b, c, d) {
        var e = U;
        if (e === null)
          throw Error(y(349));
        var f = b._getVersion, g = f(b._source), h = vh.current, k = h.useState(function() {
          return Mh(e, b, c);
        }), l = k[1], n = k[0];
        k = T;
        var A = a.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
        A = A.subscribe;
        var w = R;
        a.memoizedState = { refs: p, source: b, subscribe: d };
        h.useEffect(function() {
          p.getSnapshot = c;
          p.setSnapshot = l;
          var a2 = f(b._source);
          if (!He(g, a2)) {
            a2 = c(b._source);
            He(n, a2) || (l(a2), a2 = Ig(w), e.mutableReadLanes |= a2 & e.pendingLanes);
            a2 = e.mutableReadLanes;
            e.entangledLanes |= a2;
            for (var d2 = e.entanglements, h2 = a2; 0 < h2; ) {
              var k2 = 31 - Vc(h2), v = 1 << k2;
              d2[k2] |= a2;
              h2 &= ~v;
            }
          }
        }, [c, b, d]);
        h.useEffect(function() {
          return d(b._source, function() {
            var a2 = p.getSnapshot, c2 = p.setSnapshot;
            try {
              c2(a2(b._source));
              var d2 = Ig(w);
              e.mutableReadLanes |= d2 & e.pendingLanes;
            } catch (q) {
              c2(function() {
                throw q;
              });
            }
          });
        }, [b, d]);
        He(C, c) && He(x, b) && He(A, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n }, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n);
        return n;
      }
      function Ph(a, b, c) {
        var d = Ih();
        return Nh(d, a, b, c);
      }
      function Qh(a) {
        var b = Hh();
        typeof a === "function" && (a = a());
        b.memoizedState = b.baseState = a;
        a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a };
        a = a.dispatch = Oh.bind(null, R, a);
        return [b.memoizedState, a];
      }
      function Rh(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = R.updateQueue;
        b === null ? (b = { lastEffect: null }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function Sh(a) {
        var b = Hh();
        a = { current: a };
        return b.memoizedState = a;
      }
      function Th() {
        return Ih().memoizedState;
      }
      function Uh(a, b, c, d) {
        var e = Hh();
        R.flags |= a;
        e.memoizedState = Rh(1 | b, c, void 0, d === void 0 ? null : d);
      }
      function Vh(a, b, c, d) {
        var e = Ih();
        d = d === void 0 ? null : d;
        var f = void 0;
        if (S !== null) {
          var g = S.memoizedState;
          f = g.destroy;
          if (d !== null && Bh(d, g.deps)) {
            Rh(b, c, f, d);
            return;
          }
        }
        R.flags |= a;
        e.memoizedState = Rh(1 | b, c, f, d);
      }
      function Wh(a, b) {
        return Uh(516, 4, a, b);
      }
      function Xh(a, b) {
        return Vh(516, 4, a, b);
      }
      function Yh(a, b) {
        return Vh(4, 2, a, b);
      }
      function Zh(a, b) {
        if (typeof b === "function")
          return a = a(), b(a), function() {
            b(null);
          };
        if (b !== null && b !== void 0)
          return a = a(), b.current = a, function() {
            b.current = null;
          };
      }
      function $h(a, b, c) {
        c = c !== null && c !== void 0 ? c.concat([a]) : null;
        return Vh(4, 2, Zh.bind(null, b, a), c);
      }
      function ai() {
      }
      function bi(a, b) {
        var c = Ih();
        b = b === void 0 ? null : b;
        var d = c.memoizedState;
        if (d !== null && b !== null && Bh(b, d[1]))
          return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ci(a, b) {
        var c = Ih();
        b = b === void 0 ? null : b;
        var d = c.memoizedState;
        if (d !== null && b !== null && Bh(b, d[1]))
          return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function di(a, b) {
        var c = eg();
        gg(98 > c ? 98 : c, function() {
          a(true);
        });
        gg(97 < c ? 97 : c, function() {
          var c2 = wh.transition;
          wh.transition = 1;
          try {
            a(false), b();
          } finally {
            wh.transition = c2;
          }
        });
      }
      function Oh(a, b, c) {
        var d = Hg(), e = Ig(a), f = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, g = b.pending;
        g === null ? f.next = f : (f.next = g.next, g.next = f);
        b.pending = f;
        g = a.alternate;
        if (a === R || g !== null && g === R)
          zh = yh = true;
        else {
          if (a.lanes === 0 && (g === null || g.lanes === 0) && (g = b.lastRenderedReducer, g !== null))
            try {
              var h = b.lastRenderedState, k = g(h, c);
              f.eagerReducer = g;
              f.eagerState = k;
              if (He(k, h))
                return;
            } catch (l) {
            } finally {
            }
          Jg(a, e, d);
        }
      }
      var Gh = { readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false };
      var Dh = { readContext: vg, useCallback: function(a, b) {
        Hh().memoizedState = [a, b === void 0 ? null : b];
        return a;
      }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
        c = c !== null && c !== void 0 ? c.concat([a]) : null;
        return Uh(4, 2, Zh.bind(null, b, a), c);
      }, useLayoutEffect: function(a, b) {
        return Uh(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Hh();
        b = b === void 0 ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Hh();
        b = c !== void 0 ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        a = a.dispatch = Oh.bind(null, R, a);
        return [d.memoizedState, a];
      }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Qh(a), c = b[0], d = b[1];
        Wh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Qh(false), b = a[0];
        a = di.bind(null, a[1]);
        Sh(a);
        return [a, b];
      }, useMutableSource: function(a, b, c) {
        var d = Hh();
        d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
        return Nh(d, a, b, c);
      }, useOpaqueIdentifier: function() {
        if (lh) {
          var a = false, b = uf(function() {
            a || (a = true, c("r:" + (tf++).toString(36)));
            throw Error(y(355));
          }), c = Qh(b)[1];
          (R.mode & 2) === 0 && (R.flags |= 516, Rh(5, function() {
            c("r:" + (tf++).toString(36));
          }, void 0, null));
          return b;
        }
        b = "r:" + (tf++).toString(36);
        Qh(b);
        return b;
      }, unstable_isNewReconciler: false };
      var Eh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
        return Kh(Jh);
      }, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Kh(Jh), c = b[0], d = b[1];
        Xh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Kh(Jh)[0];
        return [
          Th().current,
          a
        ];
      }, useMutableSource: Ph, useOpaqueIdentifier: function() {
        return Kh(Jh)[0];
      }, unstable_isNewReconciler: false };
      var Fh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
        return Lh(Jh);
      }, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Lh(Jh), c = b[0], d = b[1];
        Xh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Lh(Jh)[0];
        return [
          Th().current,
          a
        ];
      }, useMutableSource: Ph, useOpaqueIdentifier: function() {
        return Lh(Jh)[0];
      }, unstable_isNewReconciler: false };
      var ei = ra.ReactCurrentOwner;
      var ug = false;
      function fi(a, b, c, d) {
        b.child = a === null ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
      }
      function gi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        tg(b, e);
        d = Ch(a, b, c, d, f, e);
        if (a !== null && !ug)
          return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
        b.flags |= 1;
        fi(a, b, d, e);
        return b.child;
      }
      function ii(a, b, c, d, e, f) {
        if (a === null) {
          var g = c.type;
          if (typeof g === "function" && !ji(g) && g.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0)
            return b.tag = 15, b.type = g, ki(a, b, g, d, e, f);
          a = Vg(c.type, null, d, b, b.mode, f);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        g = a.child;
        if ((e & f) === 0 && (e = g.memoizedProps, c = c.compare, c = c !== null ? c : Je, c(e, d) && a.ref === b.ref))
          return hi(a, b, f);
        b.flags |= 1;
        a = Tg(g, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function ki(a, b, c, d, e, f) {
        if (a !== null && Je(a.memoizedProps, d) && a.ref === b.ref)
          if (ug = false, (f & e) !== 0)
            (a.flags & 16384) !== 0 && (ug = true);
          else
            return b.lanes = a.lanes, hi(a, b, f);
        return li(a, b, c, d, f);
      }
      function mi(a, b, c) {
        var d = b.pendingProps, e = d.children, f = a !== null ? a.memoizedState : null;
        if (d.mode === "hidden" || d.mode === "unstable-defer-without-hiding")
          if ((b.mode & 4) === 0)
            b.memoizedState = { baseLanes: 0 }, ni(b, c);
          else if ((c & 1073741824) !== 0)
            b.memoizedState = { baseLanes: 0 }, ni(b, f !== null ? f.baseLanes : c);
          else
            return a = f !== null ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, ni(b, a), null;
        else
          f !== null ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
        fi(a, b, e, c);
        return b.child;
      }
      function oi(a, b) {
        var c = b.ref;
        if (a === null && c !== null || a !== null && a.ref !== c)
          b.flags |= 128;
      }
      function li(a, b, c, d, e) {
        var f = Ff(c) ? Df : M.current;
        f = Ef(b, f);
        tg(b, e);
        c = Ch(a, b, c, d, f, e);
        if (a !== null && !ug)
          return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
        b.flags |= 1;
        fi(a, b, c, e);
        return b.child;
      }
      function pi(a, b, c, d, e) {
        if (Ff(c)) {
          var f = true;
          Jf(b);
        } else
          f = false;
        tg(b, e);
        if (b.stateNode === null)
          a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = true;
        else if (a === null) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          typeof l === "object" && l !== null ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
          var n = c.getDerivedStateFromProps, A = typeof n === "function" || typeof g.getSnapshotBeforeUpdate === "function";
          A || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== d || k !== l) && Ng(b, g, d, l);
          wg = false;
          var p = b.memoizedState;
          g.state = p;
          Cg(b, d, g, e);
          k = b.memoizedState;
          h !== d || p !== k || N.current || wg ? (typeof n === "function" && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || typeof g.UNSAFE_componentWillMount !== "function" && typeof g.componentWillMount !== "function" || (typeof g.componentWillMount === "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount === "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount === "function" && (b.flags |= 4)) : (typeof g.componentDidMount === "function" && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : (typeof g.componentDidMount === "function" && (b.flags |= 4), d = false);
        } else {
          g = b.stateNode;
          yg(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : lg(b.type, h);
          g.props = l;
          A = b.pendingProps;
          p = g.context;
          k = c.contextType;
          typeof k === "object" && k !== null ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
          var C = c.getDerivedStateFromProps;
          (n = typeof C === "function" || typeof g.getSnapshotBeforeUpdate === "function") || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== A || p !== k) && Ng(b, g, d, k);
          wg = false;
          p = b.memoizedState;
          g.state = p;
          Cg(b, d, g, e);
          var x = b.memoizedState;
          h !== A || p !== x || N.current || wg ? (typeof C === "function" && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || typeof g.UNSAFE_componentWillUpdate !== "function" && typeof g.componentWillUpdate !== "function" || (typeof g.componentWillUpdate === "function" && g.componentWillUpdate(d, x, k), typeof g.UNSAFE_componentWillUpdate === "function" && g.UNSAFE_componentWillUpdate(d, x, k)), typeof g.componentDidUpdate === "function" && (b.flags |= 4), typeof g.getSnapshotBeforeUpdate === "function" && (b.flags |= 256)) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = false);
        }
        return qi(a, b, c, d, f, e);
      }
      function qi(a, b, c, d, e, f) {
        oi(a, b);
        var g = (b.flags & 64) !== 0;
        if (!d && !g)
          return e && Kf(b, c, false), hi(a, b, f);
        d = b.stateNode;
        ei.current = b;
        var h = g && typeof c.getDerivedStateFromError !== "function" ? null : d.render();
        b.flags |= 1;
        a !== null && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f);
        b.memoizedState = d.state;
        e && Kf(b, c, true);
        return b.child;
      }
      function ri(a) {
        var b = a.stateNode;
        b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, false);
        eh(a, b.containerInfo);
      }
      var si = { dehydrated: null, retryLane: 0 };
      function ti(a, b, c) {
        var d = b.pendingProps, e = P.current, f = false, g;
        (g = (b.flags & 64) !== 0) || (g = a !== null && a.memoizedState === null ? false : (e & 2) !== 0);
        g ? (f = true, b.flags &= -65) : a !== null && a.memoizedState === null || d.fallback === void 0 || d.unstable_avoidThisFallback === true || (e |= 1);
        I(P, e & 1);
        if (a === null) {
          d.fallback !== void 0 && ph(b);
          a = d.children;
          e = d.fallback;
          if (f)
            return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, a;
          if (typeof d.unstable_expectedLoadTime === "number")
            return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, b.lanes = 33554432, a;
          c = vi({ mode: "visible", children: a }, b.mode, c, null);
          c.return = b;
          return b.child = c;
        }
        if (a.memoizedState !== null) {
          if (f)
            return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
          c = xi(a, b, d.children, c);
          b.memoizedState = null;
          return c;
        }
        if (f)
          return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
        c = xi(a, b, d.children, c);
        b.memoizedState = null;
        return c;
      }
      function ui(a, b, c, d) {
        var e = a.mode, f = a.child;
        b = { mode: "hidden", children: b };
        (e & 2) === 0 && f !== null ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
        c = Xg(c, e, d, null);
        f.return = a;
        c.return = a;
        f.sibling = c;
        a.child = f;
        return c;
      }
      function xi(a, b, c, d) {
        var e = a.child;
        a = e.sibling;
        c = Tg(e, { mode: "visible", children: c });
        (b.mode & 2) === 0 && (c.lanes = d);
        c.return = b;
        c.sibling = null;
        a !== null && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
        return b.child = c;
      }
      function wi(a, b, c, d, e) {
        var f = b.mode, g = a.child;
        a = g.sibling;
        var h = { mode: "hidden", children: c };
        (f & 2) === 0 && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, g !== null ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
        a !== null ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2);
        d.return = b;
        c.return = b;
        c.sibling = d;
        b.child = c;
        return d;
      }
      function yi(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        c !== null && (c.lanes |= b);
        sg(a.return, b);
      }
      function zi(a, b, c, d, e, f) {
        var g = a.memoizedState;
        g === null ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
      }
      function Ai(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        fi(a, b, d.children, c);
        d = P.current;
        if ((d & 2) !== 0)
          d = d & 1 | 2, b.flags |= 64;
        else {
          if (a !== null && (a.flags & 64) !== 0)
            a:
              for (a = b.child; a !== null; ) {
                if (a.tag === 13)
                  a.memoizedState !== null && yi(a, c);
                else if (a.tag === 19)
                  yi(a, c);
                else if (a.child !== null) {
                  a.child.return = a;
                  a = a.child;
                  continue;
                }
                if (a === b)
                  break a;
                for (; a.sibling === null; ) {
                  if (a.return === null || a.return === b)
                    break a;
                  a = a.return;
                }
                a.sibling.return = a.return;
                a = a.sibling;
              }
          d &= 1;
        }
        I(P, d);
        if ((b.mode & 2) === 0)
          b.memoizedState = null;
        else
          switch (e) {
            case "forwards":
              c = b.child;
              for (e = null; c !== null; )
                a = c.alternate, a !== null && ih(a) === null && (e = c), c = c.sibling;
              c = e;
              c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
              zi(b, false, e, c, f, b.lastEffect);
              break;
            case "backwards":
              c = null;
              e = b.child;
              for (b.child = null; e !== null; ) {
                a = e.alternate;
                if (a !== null && ih(a) === null) {
                  b.child = e;
                  break;
                }
                a = e.sibling;
                e.sibling = c;
                c = e;
                e = a;
              }
              zi(b, true, c, null, f, b.lastEffect);
              break;
            case "together":
              zi(b, false, null, null, void 0, b.lastEffect);
              break;
            default:
              b.memoizedState = null;
          }
        return b.child;
      }
      function hi(a, b, c) {
        a !== null && (b.dependencies = a.dependencies);
        Dg |= b.lanes;
        if ((c & b.childLanes) !== 0) {
          if (a !== null && b.child !== a.child)
            throw Error(y(153));
          if (b.child !== null) {
            a = b.child;
            c = Tg(a, a.pendingProps);
            b.child = c;
            for (c.return = b; a.sibling !== null; )
              a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
            c.sibling = null;
          }
          return b.child;
        }
        return null;
      }
      var Bi;
      var Ci;
      var Di;
      var Ei;
      Bi = function(a, b) {
        for (var c = b.child; c !== null; ) {
          if (c.tag === 5 || c.tag === 6)
            a.appendChild(c.stateNode);
          else if (c.tag !== 4 && c.child !== null) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b)
            break;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === b)
              return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Ci = function() {
      };
      Di = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          dh(ah.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "option":
              e = eb(a, e);
              d = eb(a, d);
              f = [];
              break;
            case "select":
              e = m({}, e, { value: void 0 });
              d = m({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              typeof e.onClick !== "function" && typeof d.onClick === "function" && (a.onclick = jf);
          }
          vb(c, d);
          var g;
          c = null;
          for (l in e)
            if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && e[l] != null)
              if (l === "style") {
                var h = e[l];
                for (g in h)
                  h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
              } else
                l !== "dangerouslySetInnerHTML" && l !== "children" && l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = e != null ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (k != null || h != null))
              if (l === "style")
                if (h) {
                  for (g in h)
                    !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
                  for (g in k)
                    k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
                } else
                  c || (f || (f = []), f.push(l, c)), c = k;
              else
                l === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, k != null && h !== k && (f = f || []).push(l, k)) : l === "children" ? typeof k !== "string" && typeof k !== "number" || (f = f || []).push(l, "" + k) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && (ca.hasOwnProperty(l) ? (k != null && l === "onScroll" && G("scroll", a), f || h === k || (f = [])) : typeof k === "object" && k !== null && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l)
            b.flags |= 4;
        }
      };
      Ei = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Fi(a, b) {
        if (!lh)
          switch (a.tailMode) {
            case "hidden":
              b = a.tail;
              for (var c = null; b !== null; )
                b.alternate !== null && (c = b), b = b.sibling;
              c === null ? a.tail = null : c.sibling = null;
              break;
            case "collapsed":
              c = a.tail;
              for (var d = null; c !== null; )
                c.alternate !== null && (d = c), c = c.sibling;
              d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
          }
      }
      function Gi(a, b, c) {
        var d = b.pendingProps;
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return null;
          case 1:
            return Ff(b.type) && Gf(), null;
          case 3:
            fh();
            H(N);
            H(M);
            uh();
            d = b.stateNode;
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (a === null || a.child === null)
              rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
            Ci(b);
            return null;
          case 5:
            hh(b);
            var e = dh(ch.current);
            c = b.type;
            if (a !== null && b.stateNode != null)
              Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
            else {
              if (!d) {
                if (b.stateNode === null)
                  throw Error(y(166));
                return null;
              }
              a = dh(ah.current);
              if (rh(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[wf] = b;
                d[xf] = f;
                switch (c) {
                  case "dialog":
                    G("cancel", d);
                    G("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    G("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (a = 0; a < Xe.length; a++)
                      G(Xe[a], d);
                    break;
                  case "source":
                    G("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    G("error", d);
                    G("load", d);
                    break;
                  case "details":
                    G("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    G("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    G("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), G("invalid", d);
                }
                vb(c, f);
                a = null;
                for (var g in f)
                  f.hasOwnProperty(g) && (e = f[g], g === "children" ? typeof e === "string" ? d.textContent !== e && (a = ["children", e]) : typeof e === "number" && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && e != null && g === "onScroll" && G("scroll", d));
                switch (c) {
                  case "input":
                    Va(d);
                    cb(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    typeof f.onClick === "function" && (d.onclick = jf);
                }
                d = a;
                b.updateQueue = d;
                d !== null && (b.flags |= 4);
              } else {
                g = e.nodeType === 9 ? e : e.ownerDocument;
                a === kb.html && (a = lb(c));
                a === kb.html ? c === "script" ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : typeof d.is === "string" ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), c === "select" && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[wf] = b;
                a[xf] = d;
                Bi(a, b, false, false);
                b.stateNode = a;
                g = wb(c, d);
                switch (c) {
                  case "dialog":
                    G("cancel", a);
                    G("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    G("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < Xe.length; e++)
                      G(Xe[e], a);
                    e = d;
                    break;
                  case "source":
                    G("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    G("error", a);
                    G("load", a);
                    e = d;
                    break;
                  case "details":
                    G("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    G("invalid", a);
                    break;
                  case "option":
                    e = eb(a, d);
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = m({}, d, { value: void 0 });
                    G("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    G("invalid", a);
                    break;
                  default:
                    e = d;
                }
                vb(c, e);
                var h = e;
                for (f in h)
                  if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    f === "style" ? tb(a, k) : f === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && ob(a, k)) : f === "children" ? typeof k === "string" ? (c !== "textarea" || k !== "") && pb(a, k) : typeof k === "number" && pb(a, "" + k) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (ca.hasOwnProperty(f) ? k != null && f === "onScroll" && G("scroll", a) : k != null && qa(a, f, k, g));
                  }
                switch (c) {
                  case "input":
                    Va(a);
                    cb(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    d.value != null && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f = d.value;
                    f != null ? fb(a, !!d.multiple, f, false) : d.defaultValue != null && fb(a, !!d.multiple, d.defaultValue, true);
                    break;
                  default:
                    typeof e.onClick === "function" && (a.onclick = jf);
                }
                mf(c, d) && (b.flags |= 4);
              }
              b.ref !== null && (b.flags |= 128);
            }
            return null;
          case 6:
            if (a && b.stateNode != null)
              Ei(a, b, a.memoizedProps, d);
            else {
              if (typeof d !== "string" && b.stateNode === null)
                throw Error(y(166));
              c = dh(ch.current);
              dh(ah.current);
              rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
            }
            return null;
          case 13:
            H(P);
            d = b.memoizedState;
            if ((b.flags & 64) !== 0)
              return b.lanes = c, b;
            d = d !== null;
            c = false;
            a === null ? b.memoizedProps.fallback !== void 0 && rh(b) : c = a.memoizedState !== null;
            if (d && !c && (b.mode & 2) !== 0)
              if (a === null && b.memoizedProps.unstable_avoidThisFallback !== true || (P.current & 1) !== 0)
                V === 0 && (V = 3);
              else {
                if (V === 0 || V === 3)
                  V = 4;
                U === null || (Dg & 134217727) === 0 && (Hi & 134217727) === 0 || Ii(U, W);
              }
            if (d || c)
              b.flags |= 4;
            return null;
          case 4:
            return fh(), Ci(b), a === null && cf(b.stateNode.containerInfo), null;
          case 10:
            return rg(b), null;
          case 17:
            return Ff(b.type) && Gf(), null;
          case 19:
            H(P);
            d = b.memoizedState;
            if (d === null)
              return null;
            f = (b.flags & 64) !== 0;
            g = d.rendering;
            if (g === null)
              if (f)
                Fi(d, false);
              else {
                if (V !== 0 || a !== null && (a.flags & 64) !== 0)
                  for (a = b.child; a !== null; ) {
                    g = ih(a);
                    if (g !== null) {
                      b.flags |= 64;
                      Fi(d, false);
                      f = g.updateQueue;
                      f !== null && (b.updateQueue = f, b.flags |= 4);
                      d.lastEffect === null && (b.firstEffect = null);
                      b.lastEffect = d.lastEffect;
                      d = c;
                      for (c = b.child; c !== null; )
                        f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, g === null ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                      I(P, P.current & 1 | 2);
                      return b.child;
                    }
                    a = a.sibling;
                  }
                d.tail !== null && O() > Ji && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
              }
            else {
              if (!f)
                if (a = ih(g), a !== null) {
                  if (b.flags |= 64, f = true, c = a.updateQueue, c !== null && (b.updateQueue = c, b.flags |= 4), Fi(d, true), d.tail === null && d.tailMode === "hidden" && !g.alternate && !lh)
                    return b = b.lastEffect = d.lastEffect, b !== null && (b.nextEffect = null), null;
                } else
                  2 * O() - d.renderingStartTime > Ji && c !== 1073741824 && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
              d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, c !== null ? c.sibling = g : b.child = g, d.last = g);
            }
            return d.tail !== null ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
          case 23:
          case 24:
            return Ki(), a !== null && a.memoizedState !== null !== (b.memoizedState !== null) && d.mode !== "unstable-defer-without-hiding" && (b.flags |= 4), null;
        }
        throw Error(y(156, b.tag));
      }
      function Li(a) {
        switch (a.tag) {
          case 1:
            Ff(a.type) && Gf();
            var b = a.flags;
            return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
          case 3:
            fh();
            H(N);
            H(M);
            uh();
            b = a.flags;
            if ((b & 64) !== 0)
              throw Error(y(285));
            a.flags = b & -4097 | 64;
            return a;
          case 5:
            return hh(a), null;
          case 13:
            return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
          case 19:
            return H(P), null;
          case 4:
            return fh(), null;
          case 10:
            return rg(a), null;
          case 23:
          case 24:
            return Ki(), null;
          default:
            return null;
        }
      }
      function Mi(a, b) {
        try {
          var c = "", d = b;
          do
            c += Qa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e };
      }
      function Ni(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Oi = typeof WeakMap === "function" ? WeakMap : Map;
      function Pi(a, b, c) {
        c = zg(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Qi || (Qi = true, Ri = d);
          Ni(a, b);
        };
        return c;
      }
      function Si(a, b, c) {
        c = zg(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if (typeof d === "function") {
          var e = b.value;
          c.payload = function() {
            Ni(a, b);
            return d(e);
          };
        }
        var f = a.stateNode;
        f !== null && typeof f.componentDidCatch === "function" && (c.callback = function() {
          typeof d !== "function" && (Ti === null ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this), Ni(a, b));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: c2 !== null ? c2 : "" });
        });
        return c;
      }
      var Ui = typeof WeakSet === "function" ? WeakSet : Set;
      function Vi(a) {
        var b = a.ref;
        if (b !== null)
          if (typeof b === "function")
            try {
              b(null);
            } catch (c) {
              Wi(a, c);
            }
          else
            b.current = null;
      }
      function Xi(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            return;
          case 1:
            if (b.flags & 256 && a !== null) {
              var c = a.memoizedProps, d = a.memoizedState;
              a = b.stateNode;
              b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
              a.__reactInternalSnapshotBeforeUpdate = b;
            }
            return;
          case 3:
            b.flags & 256 && qf(b.stateNode.containerInfo);
            return;
          case 5:
          case 6:
          case 4:
          case 17:
            return;
        }
        throw Error(y(163));
      }
      function Yi(a, b, c) {
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            b = c.updateQueue;
            b = b !== null ? b.lastEffect : null;
            if (b !== null) {
              a = b = b.next;
              do {
                if ((a.tag & 3) === 3) {
                  var d = a.create;
                  a.destroy = d();
                }
                a = a.next;
              } while (a !== b);
            }
            b = c.updateQueue;
            b = b !== null ? b.lastEffect : null;
            if (b !== null) {
              a = b = b.next;
              do {
                var e = a;
                d = e.next;
                e = e.tag;
                (e & 4) !== 0 && (e & 1) !== 0 && (Zi(c, a), $i(c, a));
                a = d;
              } while (a !== b);
            }
            return;
          case 1:
            a = c.stateNode;
            c.flags & 4 && (b === null ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate)));
            b = c.updateQueue;
            b !== null && Eg(c, b, a);
            return;
          case 3:
            b = c.updateQueue;
            if (b !== null) {
              a = null;
              if (c.child !== null)
                switch (c.child.tag) {
                  case 5:
                    a = c.child.stateNode;
                    break;
                  case 1:
                    a = c.child.stateNode;
                }
              Eg(c, b, a);
            }
            return;
          case 5:
            a = c.stateNode;
            b === null && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
            return;
          case 6:
            return;
          case 4:
            return;
          case 12:
            return;
          case 13:
            c.memoizedState === null && (c = c.alternate, c !== null && (c = c.memoizedState, c !== null && (c = c.dehydrated, c !== null && Cc(c))));
            return;
          case 19:
          case 17:
          case 20:
          case 21:
          case 23:
          case 24:
            return;
        }
        throw Error(y(163));
      }
      function aj(a, b) {
        for (var c = a; ; ) {
          if (c.tag === 5) {
            var d = c.stateNode;
            if (b)
              d = d.style, typeof d.setProperty === "function" ? d.setProperty("display", "none", "important") : d.display = "none";
            else {
              d = c.stateNode;
              var e = c.memoizedProps.style;
              e = e !== void 0 && e !== null && e.hasOwnProperty("display") ? e.display : null;
              d.style.display = sb("display", e);
            }
          } else if (c.tag === 6)
            c.stateNode.nodeValue = b ? "" : c.memoizedProps;
          else if ((c.tag !== 23 && c.tag !== 24 || c.memoizedState === null || c === a) && c.child !== null) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === a)
            break;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === a)
              return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
      function bj(a, b) {
        if (Mf && typeof Mf.onCommitFiberUnmount === "function")
          try {
            Mf.onCommitFiberUnmount(Lf, b);
          } catch (f) {
          }
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            a = b.updateQueue;
            if (a !== null && (a = a.lastEffect, a !== null)) {
              var c = a = a.next;
              do {
                var d = c, e = d.destroy;
                d = d.tag;
                if (e !== void 0)
                  if ((d & 4) !== 0)
                    Zi(b, c);
                  else {
                    d = b;
                    try {
                      e();
                    } catch (f) {
                      Wi(d, f);
                    }
                  }
                c = c.next;
              } while (c !== a);
            }
            break;
          case 1:
            Vi(b);
            a = b.stateNode;
            if (typeof a.componentWillUnmount === "function")
              try {
                a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
              } catch (f) {
                Wi(b, f);
              }
            break;
          case 5:
            Vi(b);
            break;
          case 4:
            cj(a, b);
        }
      }
      function dj(a) {
        a.alternate = null;
        a.child = null;
        a.dependencies = null;
        a.firstEffect = null;
        a.lastEffect = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.return = null;
        a.updateQueue = null;
      }
      function ej(a) {
        return a.tag === 5 || a.tag === 3 || a.tag === 4;
      }
      function fj(a) {
        a: {
          for (var b = a.return; b !== null; ) {
            if (ej(b))
              break a;
            b = b.return;
          }
          throw Error(y(160));
        }
        var c = b;
        b = c.stateNode;
        switch (c.tag) {
          case 5:
            var d = false;
            break;
          case 3:
            b = b.containerInfo;
            d = true;
            break;
          case 4:
            b = b.containerInfo;
            d = true;
            break;
          default:
            throw Error(y(161));
        }
        c.flags & 16 && (pb(b, ""), c.flags &= -17);
        a:
          b:
            for (c = a; ; ) {
              for (; c.sibling === null; ) {
                if (c.return === null || ej(c.return)) {
                  c = null;
                  break a;
                }
                c = c.return;
              }
              c.sibling.return = c.return;
              for (c = c.sibling; c.tag !== 5 && c.tag !== 6 && c.tag !== 18; ) {
                if (c.flags & 2)
                  continue b;
                if (c.child === null || c.tag === 4)
                  continue b;
                else
                  c.child.return = c, c = c.child;
              }
              if (!(c.flags & 2)) {
                c = c.stateNode;
                break a;
              }
            }
        d ? gj(a, c, b) : hj(a, c, b);
      }
      function gj(a, b, c) {
        var d = a.tag, e = d === 5 || d === 6;
        if (e)
          a = e ? a.stateNode : a.stateNode.instance, b ? c.nodeType === 8 ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (c.nodeType === 8 ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, c !== null && c !== void 0 || b.onclick !== null || (b.onclick = jf));
        else if (d !== 4 && (a = a.child, a !== null))
          for (gj(a, b, c), a = a.sibling; a !== null; )
            gj(a, b, c), a = a.sibling;
      }
      function hj(a, b, c) {
        var d = a.tag, e = d === 5 || d === 6;
        if (e)
          a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (d !== 4 && (a = a.child, a !== null))
          for (hj(a, b, c), a = a.sibling; a !== null; )
            hj(a, b, c), a = a.sibling;
      }
      function cj(a, b) {
        for (var c = b, d = false, e, f; ; ) {
          if (!d) {
            d = c.return;
            a:
              for (; ; ) {
                if (d === null)
                  throw Error(y(160));
                e = d.stateNode;
                switch (d.tag) {
                  case 5:
                    f = false;
                    break a;
                  case 3:
                    e = e.containerInfo;
                    f = true;
                    break a;
                  case 4:
                    e = e.containerInfo;
                    f = true;
                    break a;
                }
                d = d.return;
              }
            d = true;
          }
          if (c.tag === 5 || c.tag === 6) {
            a:
              for (var g = a, h = c, k = h; ; )
                if (bj(g, k), k.child !== null && k.tag !== 4)
                  k.child.return = k, k = k.child;
                else {
                  if (k === h)
                    break a;
                  for (; k.sibling === null; ) {
                    if (k.return === null || k.return === h)
                      break a;
                    k = k.return;
                  }
                  k.sibling.return = k.return;
                  k = k.sibling;
                }
            f ? (g = e, h = c.stateNode, g.nodeType === 8 ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
          } else if (c.tag === 4) {
            if (c.child !== null) {
              e = c.stateNode.containerInfo;
              f = true;
              c.child.return = c;
              c = c.child;
              continue;
            }
          } else if (bj(a, c), c.child !== null) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b)
            break;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === b)
              return;
            c = c.return;
            c.tag === 4 && (d = false);
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
      function ij(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            var c = b.updateQueue;
            c = c !== null ? c.lastEffect : null;
            if (c !== null) {
              var d = c = c.next;
              do
                (d.tag & 3) === 3 && (a = d.destroy, d.destroy = void 0, a !== void 0 && a()), d = d.next;
              while (d !== c);
            }
            return;
          case 1:
            return;
          case 5:
            c = b.stateNode;
            if (c != null) {
              d = b.memoizedProps;
              var e = a !== null ? a.memoizedProps : d;
              a = b.type;
              var f = b.updateQueue;
              b.updateQueue = null;
              if (f !== null) {
                c[xf] = d;
                a === "input" && d.type === "radio" && d.name != null && $a(c, d);
                wb(a, e);
                b = wb(a, d);
                for (e = 0; e < f.length; e += 2) {
                  var g = f[e], h = f[e + 1];
                  g === "style" ? tb(c, h) : g === "dangerouslySetInnerHTML" ? ob(c, h) : g === "children" ? pb(c, h) : qa(c, g, h, b);
                }
                switch (a) {
                  case "input":
                    ab(c, d);
                    break;
                  case "textarea":
                    ib(c, d);
                    break;
                  case "select":
                    a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, f != null ? fb(c, !!d.multiple, f, false) : a !== !!d.multiple && (d.defaultValue != null ? fb(c, !!d.multiple, d.defaultValue, true) : fb(c, !!d.multiple, d.multiple ? [] : "", false));
                }
              }
            }
            return;
          case 6:
            if (b.stateNode === null)
              throw Error(y(162));
            b.stateNode.nodeValue = b.memoizedProps;
            return;
          case 3:
            c = b.stateNode;
            c.hydrate && (c.hydrate = false, Cc(c.containerInfo));
            return;
          case 12:
            return;
          case 13:
            b.memoizedState !== null && (jj = O(), aj(b.child, true));
            kj(b);
            return;
          case 19:
            kj(b);
            return;
          case 17:
            return;
          case 23:
          case 24:
            aj(b, b.memoizedState !== null);
            return;
        }
        throw Error(y(163));
      }
      function kj(a) {
        var b = a.updateQueue;
        if (b !== null) {
          a.updateQueue = null;
          var c = a.stateNode;
          c === null && (c = a.stateNode = new Ui());
          b.forEach(function(b2) {
            var d = lj.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function mj(a, b) {
        return a !== null && (a = a.memoizedState, a === null || a.dehydrated !== null) ? (b = b.memoizedState, b !== null && b.dehydrated === null) : false;
      }
      var nj = Math.ceil;
      var oj = ra.ReactCurrentDispatcher;
      var pj = ra.ReactCurrentOwner;
      var X = 0;
      var U = null;
      var Y = null;
      var W = 0;
      var qj = 0;
      var rj = Bf(0);
      var V = 0;
      var sj = null;
      var tj = 0;
      var Dg = 0;
      var Hi = 0;
      var uj = 0;
      var vj = null;
      var jj = 0;
      var Ji = Infinity;
      function wj() {
        Ji = O() + 500;
      }
      var Z = null;
      var Qi = false;
      var Ri = null;
      var Ti = null;
      var xj = false;
      var yj = null;
      var zj = 90;
      var Aj = [];
      var Bj = [];
      var Cj = null;
      var Dj = 0;
      var Ej = null;
      var Fj = -1;
      var Gj = 0;
      var Hj = 0;
      var Ij = null;
      var Jj = false;
      function Hg() {
        return (X & 48) !== 0 ? O() : Fj !== -1 ? Fj : Fj = O();
      }
      function Ig(a) {
        a = a.mode;
        if ((a & 2) === 0)
          return 1;
        if ((a & 4) === 0)
          return eg() === 99 ? 1 : 2;
        Gj === 0 && (Gj = tj);
        if (kg.transition !== 0) {
          Hj !== 0 && (Hj = vj !== null ? vj.pendingLanes : 0);
          a = Gj;
          var b = 4186112 & ~Hj;
          b &= -b;
          b === 0 && (a = 4186112 & ~a, b = a & -a, b === 0 && (b = 8192));
          return b;
        }
        a = eg();
        (X & 4) !== 0 && a === 98 ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
        return a;
      }
      function Jg(a, b, c) {
        if (50 < Dj)
          throw Dj = 0, Ej = null, Error(y(185));
        a = Kj(a, b);
        if (a === null)
          return null;
        $c(a, b, c);
        a === U && (Hi |= b, V === 4 && Ii(a, W));
        var d = eg();
        b === 1 ? (X & 8) !== 0 && (X & 48) === 0 ? Lj(a) : (Mj(a, c), X === 0 && (wj(), ig())) : ((X & 4) === 0 || d !== 98 && d !== 99 || (Cj === null ? Cj = /* @__PURE__ */ new Set([a]) : Cj.add(a)), Mj(a, c));
        vj = a;
      }
      function Kj(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        c !== null && (c.lanes |= b);
        c = a;
        for (a = a.return; a !== null; )
          a.childLanes |= b, c = a.alternate, c !== null && (c.childLanes |= b), c = a, a = a.return;
        return c.tag === 3 ? c.stateNode : null;
      }
      function Mj(a, b) {
        for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g; ) {
          var h = 31 - Vc(g), k = 1 << h, l = f[h];
          if (l === -1) {
            if ((k & d) === 0 || (k & e) !== 0) {
              l = b;
              Rc(k);
              var n = F;
              f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
            }
          } else
            l <= b && (a.expiredLanes |= k);
          g &= ~k;
        }
        d = Uc(a, a === U ? W : 0);
        b = F;
        if (d === 0)
          c !== null && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
        else {
          if (c !== null) {
            if (a.callbackPriority === b)
              return;
            c !== Zf && Pf(c);
          }
          b === 15 ? (c = Lj.bind(null, a), ag === null ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : b === 14 ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Nj(a) {
        Fj = -1;
        Hj = Gj = 0;
        if ((X & 48) !== 0)
          throw Error(y(327));
        var b = a.callbackNode;
        if (Oj() && a.callbackNode !== b)
          return null;
        var c = Uc(a, a === U ? W : 0);
        if (c === 0)
          return null;
        var d = c;
        var e = X;
        X |= 16;
        var f = Pj();
        if (U !== a || W !== d)
          wj(), Qj(a, d);
        do
          try {
            Rj();
            break;
          } catch (h) {
            Sj(a, h);
          }
        while (1);
        qg();
        oj.current = f;
        X = e;
        Y !== null ? d = 0 : (U = null, W = 0, d = V);
        if ((tj & Hi) !== 0)
          Qj(a, 0);
        else if (d !== 0) {
          d === 2 && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), c = Wc(a), c !== 0 && (d = Tj(a, c)));
          if (d === 1)
            throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
          a.finishedWork = a.current.alternate;
          a.finishedLanes = c;
          switch (d) {
            case 0:
            case 1:
              throw Error(y(345));
            case 2:
              Uj(a);
              break;
            case 3:
              Ii(a, c);
              if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
                if (Uc(a, 0) !== 0)
                  break;
                e = a.suspendedLanes;
                if ((e & c) !== c) {
                  Hg();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = of(Uj.bind(null, a), d);
                break;
              }
              Uj(a);
              break;
            case 4:
              Ii(a, c);
              if ((c & 4186112) === c)
                break;
              d = a.eventTimes;
              for (e = -1; 0 < c; ) {
                var g = 31 - Vc(c);
                f = 1 << g;
                g = d[g];
                g > e && (e = g);
                c &= ~f;
              }
              c = e;
              c = O() - c;
              c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
              if (10 < c) {
                a.timeoutHandle = of(Uj.bind(null, a), c);
                break;
              }
              Uj(a);
              break;
            case 5:
              Uj(a);
              break;
            default:
              throw Error(y(329));
          }
        }
        Mj(a, O());
        return a.callbackNode === b ? Nj.bind(null, a) : null;
      }
      function Ii(a, b) {
        b &= ~uj;
        b &= ~Hi;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - Vc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Lj(a) {
        if ((X & 48) !== 0)
          throw Error(y(327));
        Oj();
        if (a === U && (a.expiredLanes & W) !== 0) {
          var b = W;
          var c = Tj(a, b);
          (tj & Hi) !== 0 && (b = Uc(a, b), c = Tj(a, b));
        } else
          b = Uc(a, 0), c = Tj(a, b);
        a.tag !== 0 && c === 2 && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), b = Wc(a), b !== 0 && (c = Tj(a, b)));
        if (c === 1)
          throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Uj(a);
        Mj(a, O());
        return null;
      }
      function Vj() {
        if (Cj !== null) {
          var a = Cj;
          Cj = null;
          a.forEach(function(a2) {
            a2.expiredLanes |= 24 & a2.pendingLanes;
            Mj(a2, O());
          });
        }
        ig();
      }
      function Wj(a, b) {
        var c = X;
        X |= 1;
        try {
          return a(b);
        } finally {
          X = c, X === 0 && (wj(), ig());
        }
      }
      function Xj(a, b) {
        var c = X;
        X &= -2;
        X |= 8;
        try {
          return a(b);
        } finally {
          X = c, X === 0 && (wj(), ig());
        }
      }
      function ni(a, b) {
        I(rj, qj);
        qj |= b;
        tj |= b;
      }
      function Ki() {
        qj = rj.current;
        H(rj);
      }
      function Qj(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        c !== -1 && (a.timeoutHandle = -1, pf(c));
        if (Y !== null)
          for (c = Y.return; c !== null; ) {
            var d = c;
            switch (d.tag) {
              case 1:
                d = d.type.childContextTypes;
                d !== null && d !== void 0 && Gf();
                break;
              case 3:
                fh();
                H(N);
                H(M);
                uh();
                break;
              case 5:
                hh(d);
                break;
              case 4:
                fh();
                break;
              case 13:
                H(P);
                break;
              case 19:
                H(P);
                break;
              case 10:
                rg(d);
                break;
              case 23:
              case 24:
                Ki();
            }
            c = c.return;
          }
        U = a;
        Y = Tg(a.current, null);
        W = qj = tj = b;
        V = 0;
        sj = null;
        uj = Hi = Dg = 0;
      }
      function Sj(a, b) {
        do {
          var c = Y;
          try {
            qg();
            vh.current = Gh;
            if (yh) {
              for (var d = R.memoizedState; d !== null; ) {
                var e = d.queue;
                e !== null && (e.pending = null);
                d = d.next;
              }
              yh = false;
            }
            xh = 0;
            T = S = R = null;
            zh = false;
            pj.current = null;
            if (c === null || c.return === null) {
              V = 1;
              sj = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = W;
              h.flags |= 2048;
              h.firstEffect = h.lastEffect = null;
              if (k !== null && typeof k === "object" && typeof k.then === "function") {
                var l = k;
                if ((h.mode & 2) === 0) {
                  var n = h.alternate;
                  n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
                }
                var A = (P.current & 1) !== 0, p = g;
                do {
                  var C;
                  if (C = p.tag === 13) {
                    var x = p.memoizedState;
                    if (x !== null)
                      C = x.dehydrated !== null ? true : false;
                    else {
                      var w = p.memoizedProps;
                      C = w.fallback === void 0 ? false : w.unstable_avoidThisFallback !== true ? true : A ? false : true;
                    }
                  }
                  if (C) {
                    var z = p.updateQueue;
                    if (z === null) {
                      var u = /* @__PURE__ */ new Set();
                      u.add(l);
                      p.updateQueue = u;
                    } else
                      z.add(l);
                    if ((p.mode & 2) === 0) {
                      p.flags |= 64;
                      h.flags |= 16384;
                      h.flags &= -2981;
                      if (h.tag === 1)
                        if (h.alternate === null)
                          h.tag = 17;
                        else {
                          var t = zg(-1, 1);
                          t.tag = 2;
                          Ag(h, t);
                        }
                      h.lanes |= 1;
                      break a;
                    }
                    k = void 0;
                    h = b;
                    var q = f.pingCache;
                    q === null ? (q = f.pingCache = new Oi(), k = /* @__PURE__ */ new Set(), q.set(l, k)) : (k = q.get(l), k === void 0 && (k = /* @__PURE__ */ new Set(), q.set(l, k)));
                    if (!k.has(h)) {
                      k.add(h);
                      var v = Yj.bind(null, f, l, h);
                      l.then(v, v);
                    }
                    p.flags |= 4096;
                    p.lanes = b;
                    break a;
                  }
                  p = p.return;
                } while (p !== null);
                k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
              }
              V !== 5 && (V = 2);
              k = Mi(k, h);
              p = g;
              do {
                switch (p.tag) {
                  case 3:
                    f = k;
                    p.flags |= 4096;
                    b &= -b;
                    p.lanes |= b;
                    var J = Pi(p, f, b);
                    Bg(p, J);
                    break a;
                  case 1:
                    f = k;
                    var K = p.type, Q = p.stateNode;
                    if ((p.flags & 64) === 0 && (typeof K.getDerivedStateFromError === "function" || Q !== null && typeof Q.componentDidCatch === "function" && (Ti === null || !Ti.has(Q)))) {
                      p.flags |= 4096;
                      b &= -b;
                      p.lanes |= b;
                      var L = Si(p, f, b);
                      Bg(p, L);
                      break a;
                    }
                }
                p = p.return;
              } while (p !== null);
            }
            Zj(c);
          } catch (va) {
            b = va;
            Y === c && c !== null && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Pj() {
        var a = oj.current;
        oj.current = Gh;
        return a === null ? Gh : a;
      }
      function Tj(a, b) {
        var c = X;
        X |= 16;
        var d = Pj();
        U === a && W === b || Qj(a, b);
        do
          try {
            ak();
            break;
          } catch (e) {
            Sj(a, e);
          }
        while (1);
        qg();
        X = c;
        oj.current = d;
        if (Y !== null)
          throw Error(y(261));
        U = null;
        W = 0;
        return V;
      }
      function ak() {
        for (; Y !== null; )
          bk(Y);
      }
      function Rj() {
        for (; Y !== null && !Qf(); )
          bk(Y);
      }
      function bk(a) {
        var b = ck(a.alternate, a, qj);
        a.memoizedProps = a.pendingProps;
        b === null ? Zj(a) : Y = b;
        pj.current = null;
      }
      function Zj(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if ((b.flags & 2048) === 0) {
            c = Gi(c, b, qj);
            if (c !== null) {
              Y = c;
              return;
            }
            c = b;
            if (c.tag !== 24 && c.tag !== 23 || c.memoizedState === null || (qj & 1073741824) !== 0 || (c.mode & 4) === 0) {
              for (var d = 0, e = c.child; e !== null; )
                d |= e.lanes | e.childLanes, e = e.sibling;
              c.childLanes = d;
            }
            a !== null && (a.flags & 2048) === 0 && (a.firstEffect === null && (a.firstEffect = b.firstEffect), b.lastEffect !== null && (a.lastEffect !== null && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (a.lastEffect !== null ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
          } else {
            c = Li(b);
            if (c !== null) {
              c.flags &= 2047;
              Y = c;
              return;
            }
            a !== null && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
          }
          b = b.sibling;
          if (b !== null) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (b !== null);
        V === 0 && (V = 5);
      }
      function Uj(a) {
        var b = eg();
        gg(99, dk.bind(null, a, b));
        return null;
      }
      function dk(a, b) {
        do
          Oj();
        while (yj !== null);
        if ((X & 48) !== 0)
          throw Error(y(327));
        var c = a.finishedWork;
        if (c === null)
          return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current)
          throw Error(y(177));
        a.callbackNode = null;
        var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
        a.pendingLanes = e;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= e;
        a.mutableReadLanes &= e;
        a.entangledLanes &= e;
        e = a.entanglements;
        for (var g = a.eventTimes, h = a.expirationTimes; 0 < f; ) {
          var k = 31 - Vc(f), l = 1 << k;
          e[k] = 0;
          g[k] = -1;
          h[k] = -1;
          f &= ~l;
        }
        Cj !== null && (d & 24) === 0 && Cj.has(a) && Cj.delete(a);
        a === U && (Y = U = null, W = 0);
        1 < c.flags ? c.lastEffect !== null ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
        if (d !== null) {
          e = X;
          X |= 32;
          pj.current = null;
          kf = fd;
          g = Ne();
          if (Oe(g)) {
            if ("selectionStart" in g)
              h = { start: g.selectionStart, end: g.selectionEnd };
            else
              a:
                if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && l.rangeCount !== 0) {
                  h = l.anchorNode;
                  f = l.anchorOffset;
                  k = l.focusNode;
                  l = l.focusOffset;
                  try {
                    h.nodeType, k.nodeType;
                  } catch (va) {
                    h = null;
                    break a;
                  }
                  var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
                  b:
                    for (; ; ) {
                      for (var u; ; ) {
                        w !== h || f !== 0 && w.nodeType !== 3 || (A = n + f);
                        w !== k || l !== 0 && w.nodeType !== 3 || (p = n + l);
                        w.nodeType === 3 && (n += w.nodeValue.length);
                        if ((u = w.firstChild) === null)
                          break;
                        z = w;
                        w = u;
                      }
                      for (; ; ) {
                        if (w === g)
                          break b;
                        z === h && ++C === f && (A = n);
                        z === k && ++x === l && (p = n);
                        if ((u = w.nextSibling) !== null)
                          break;
                        w = z;
                        z = w.parentNode;
                      }
                      w = u;
                    }
                  h = A === -1 || p === -1 ? null : { start: A, end: p };
                } else
                  h = null;
            h = h || { start: 0, end: 0 };
          } else
            h = null;
          lf = { focusedElem: g, selectionRange: h };
          fd = false;
          Ij = null;
          Jj = false;
          Z = d;
          do
            try {
              ek();
            } catch (va) {
              if (Z === null)
                throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (Z !== null);
          Ij = null;
          Z = d;
          do
            try {
              for (g = a; Z !== null; ) {
                var t = Z.flags;
                t & 16 && pb(Z.stateNode, "");
                if (t & 128) {
                  var q = Z.alternate;
                  if (q !== null) {
                    var v = q.ref;
                    v !== null && (typeof v === "function" ? v(null) : v.current = null);
                  }
                }
                switch (t & 1038) {
                  case 2:
                    fj(Z);
                    Z.flags &= -3;
                    break;
                  case 6:
                    fj(Z);
                    Z.flags &= -3;
                    ij(Z.alternate, Z);
                    break;
                  case 1024:
                    Z.flags &= -1025;
                    break;
                  case 1028:
                    Z.flags &= -1025;
                    ij(Z.alternate, Z);
                    break;
                  case 4:
                    ij(Z.alternate, Z);
                    break;
                  case 8:
                    h = Z;
                    cj(g, h);
                    var J = h.alternate;
                    dj(h);
                    J !== null && dj(J);
                }
                Z = Z.nextEffect;
              }
            } catch (va) {
              if (Z === null)
                throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (Z !== null);
          v = lf;
          q = Ne();
          t = v.focusedElem;
          g = v.selectionRange;
          if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
            g !== null && Oe(t) && (q = g.start, v = g.end, v === void 0 && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = g.end === void 0 ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (v.rangeCount !== 1 || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
            q = [];
            for (v = t; v = v.parentNode; )
              v.nodeType === 1 && q.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
            typeof t.focus === "function" && t.focus();
            for (t = 0; t < q.length; t++)
              v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
          }
          fd = !!kf;
          lf = kf = null;
          a.current = c;
          Z = d;
          do
            try {
              for (t = a; Z !== null; ) {
                var K = Z.flags;
                K & 36 && Yi(t, Z.alternate, Z);
                if (K & 128) {
                  q = void 0;
                  var Q = Z.ref;
                  if (Q !== null) {
                    var L = Z.stateNode;
                    switch (Z.tag) {
                      case 5:
                        q = L;
                        break;
                      default:
                        q = L;
                    }
                    typeof Q === "function" ? Q(q) : Q.current = q;
                  }
                }
                Z = Z.nextEffect;
              }
            } catch (va) {
              if (Z === null)
                throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (Z !== null);
          Z = null;
          $f();
          X = e;
        } else
          a.current = c;
        if (xj)
          xj = false, yj = a, zj = b;
        else
          for (Z = d; Z !== null; )
            b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
        d = a.pendingLanes;
        d === 0 && (Ti = null);
        d === 1 ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
        c = c.stateNode;
        if (Mf && typeof Mf.onCommitFiberRoot === "function")
          try {
            Mf.onCommitFiberRoot(Lf, c, void 0, (c.current.flags & 64) === 64);
          } catch (va) {
          }
        Mj(a, O());
        if (Qi)
          throw Qi = false, a = Ri, Ri = null, a;
        if ((X & 8) !== 0)
          return null;
        ig();
        return null;
      }
      function ek() {
        for (; Z !== null; ) {
          var a = Z.alternate;
          Jj || Ij === null || ((Z.flags & 8) !== 0 ? dc(Z, Ij) && (Jj = true) : Z.tag === 13 && mj(a, Z) && dc(Z, Ij) && (Jj = true));
          var b = Z.flags;
          (b & 256) !== 0 && Xi(a, Z);
          (b & 512) === 0 || xj || (xj = true, hg(97, function() {
            Oj();
            return null;
          }));
          Z = Z.nextEffect;
        }
      }
      function Oj() {
        if (zj !== 90) {
          var a = 97 < zj ? 97 : zj;
          zj = 90;
          return gg(a, fk);
        }
        return false;
      }
      function $i(a, b) {
        Aj.push(b, a);
        xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
      }
      function Zi(a, b) {
        Bj.push(b, a);
        xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
      }
      function fk() {
        if (yj === null)
          return false;
        var a = yj;
        yj = null;
        if ((X & 48) !== 0)
          throw Error(y(331));
        var b = X;
        X |= 32;
        var c = Bj;
        Bj = [];
        for (var d = 0; d < c.length; d += 2) {
          var e = c[d], f = c[d + 1], g = e.destroy;
          e.destroy = void 0;
          if (typeof g === "function")
            try {
              g();
            } catch (k) {
              if (f === null)
                throw Error(y(330));
              Wi(f, k);
            }
        }
        c = Aj;
        Aj = [];
        for (d = 0; d < c.length; d += 2) {
          e = c[d];
          f = c[d + 1];
          try {
            var h = e.create;
            e.destroy = h();
          } catch (k) {
            if (f === null)
              throw Error(y(330));
            Wi(f, k);
          }
        }
        for (h = a.current.firstEffect; h !== null; )
          a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
        X = b;
        ig();
        return true;
      }
      function gk(a, b, c) {
        b = Mi(c, b);
        b = Pi(a, b, 1);
        Ag(a, b);
        b = Hg();
        a = Kj(a, 1);
        a !== null && ($c(a, 1, b), Mj(a, b));
      }
      function Wi(a, b) {
        if (a.tag === 3)
          gk(a, a, b);
        else
          for (var c = a.return; c !== null; ) {
            if (c.tag === 3) {
              gk(c, a, b);
              break;
            } else if (c.tag === 1) {
              var d = c.stateNode;
              if (typeof c.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (Ti === null || !Ti.has(d))) {
                a = Mi(b, a);
                var e = Si(c, a, 1);
                Ag(c, e);
                e = Hg();
                c = Kj(c, 1);
                if (c !== null)
                  $c(c, 1, e), Mj(c, e);
                else if (typeof d.componentDidCatch === "function" && (Ti === null || !Ti.has(d)))
                  try {
                    d.componentDidCatch(b, a);
                  } catch (f) {
                  }
                break;
              }
            }
            c = c.return;
          }
      }
      function Yj(a, b, c) {
        var d = a.pingCache;
        d !== null && d.delete(b);
        b = Hg();
        a.pingedLanes |= a.suspendedLanes & c;
        U === a && (W & c) === c && (V === 4 || V === 3 && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
        Mj(a, b);
      }
      function lj(a, b) {
        var c = a.stateNode;
        c !== null && c.delete(b);
        b = 0;
        b === 0 && (b = a.mode, (b & 2) === 0 ? b = 1 : (b & 4) === 0 ? b = eg() === 99 ? 1 : 2 : (Gj === 0 && (Gj = tj), b = Yc(62914560 & ~Gj), b === 0 && (b = 4194304)));
        c = Hg();
        a = Kj(a, b);
        a !== null && ($c(a, b, c), Mj(a, c));
      }
      var ck;
      ck = function(a, b, c) {
        var d = b.lanes;
        if (a !== null)
          if (a.memoizedProps !== b.pendingProps || N.current)
            ug = true;
          else if ((c & d) !== 0)
            ug = (a.flags & 16384) !== 0 ? true : false;
          else {
            ug = false;
            switch (b.tag) {
              case 3:
                ri(b);
                sh();
                break;
              case 5:
                gh(b);
                break;
              case 1:
                Ff(b.type) && Jf(b);
                break;
              case 4:
                eh(b, b.stateNode.containerInfo);
                break;
              case 10:
                d = b.memoizedProps.value;
                var e = b.type._context;
                I(mg, e._currentValue);
                e._currentValue = d;
                break;
              case 13:
                if (b.memoizedState !== null) {
                  if ((c & b.child.childLanes) !== 0)
                    return ti(a, b, c);
                  I(P, P.current & 1);
                  b = hi(a, b, c);
                  return b !== null ? b.sibling : null;
                }
                I(P, P.current & 1);
                break;
              case 19:
                d = (c & b.childLanes) !== 0;
                if ((a.flags & 64) !== 0) {
                  if (d)
                    return Ai(a, b, c);
                  b.flags |= 64;
                }
                e = b.memoizedState;
                e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null);
                I(P, P.current);
                if (d)
                  break;
                else
                  return null;
              case 23:
              case 24:
                return b.lanes = 0, mi(a, b, c);
            }
            return hi(a, b, c);
          }
        else
          ug = false;
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            d = b.type;
            a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
            a = b.pendingProps;
            e = Ef(b, M.current);
            tg(b, c);
            e = Ch(null, b, d, a, e, c);
            b.flags |= 1;
            if (typeof e === "object" && e !== null && typeof e.render === "function" && e.$$typeof === void 0) {
              b.tag = 1;
              b.memoizedState = null;
              b.updateQueue = null;
              if (Ff(d)) {
                var f = true;
                Jf(b);
              } else
                f = false;
              b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null;
              xg(b);
              var g = d.getDerivedStateFromProps;
              typeof g === "function" && Gg(b, d, g, a);
              e.updater = Kg;
              b.stateNode = e;
              e._reactInternals = b;
              Og(b, d, a, c);
              b = qi(null, b, d, true, f, c);
            } else
              b.tag = 0, fi(null, b, e, c), b = b.child;
            return b;
          case 16:
            e = b.elementType;
            a: {
              a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
              a = b.pendingProps;
              f = e._init;
              e = f(e._payload);
              b.type = e;
              f = b.tag = hk(e);
              a = lg(e, a);
              switch (f) {
                case 0:
                  b = li(null, b, e, a, c);
                  break a;
                case 1:
                  b = pi(null, b, e, a, c);
                  break a;
                case 11:
                  b = gi(null, b, e, a, c);
                  break a;
                case 14:
                  b = ii(null, b, e, lg(e.type, a), d, c);
                  break a;
              }
              throw Error(y(306, e, ""));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
          case 3:
            ri(b);
            d = b.updateQueue;
            if (a === null || d === null)
              throw Error(y(282));
            d = b.pendingProps;
            e = b.memoizedState;
            e = e !== null ? e.element : null;
            yg(a, b);
            Cg(b, d, null, c);
            d = b.memoizedState.element;
            if (d === e)
              sh(), b = hi(a, b, c);
            else {
              e = b.stateNode;
              if (f = e.hydrate)
                kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = true;
              if (f) {
                a = e.mutableSourceEagerHydrationData;
                if (a != null)
                  for (e = 0; e < a.length; e += 2)
                    f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
                c = Zg(b, null, d, c);
                for (b.child = c; c; )
                  c.flags = c.flags & -3 | 1024, c = c.sibling;
              } else
                fi(a, b, d, c), sh();
              b = b.child;
            }
            return b;
          case 5:
            return gh(b), a === null && ph(b), d = b.type, e = b.pendingProps, f = a !== null ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : f !== null && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;
          case 6:
            return a === null && ph(b), null;
          case 13:
            return ti(a, b, c);
          case 4:
            return eh(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
          case 7:
            return fi(a, b, b.pendingProps, c), b.child;
          case 8:
            return fi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return fi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              g = b.memoizedProps;
              f = e.value;
              var h = b.type._context;
              I(mg, h._currentValue);
              h._currentValue = f;
              if (g !== null)
                if (h = g.value, f = He(h, f) ? 0 : (typeof d._calculateChangedBits === "function" ? d._calculateChangedBits(h, f) : 1073741823) | 0, f === 0) {
                  if (g.children === e.children && !N.current) {
                    b = hi(a, b, c);
                    break a;
                  }
                } else
                  for (h = b.child, h !== null && (h.return = b); h !== null; ) {
                    var k = h.dependencies;
                    if (k !== null) {
                      g = h.child;
                      for (var l = k.firstContext; l !== null; ) {
                        if (l.context === d && (l.observedBits & f) !== 0) {
                          h.tag === 1 && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                          h.lanes |= c;
                          l = h.alternate;
                          l !== null && (l.lanes |= c);
                          sg(h.return, c);
                          k.lanes |= c;
                          break;
                        }
                        l = l.next;
                      }
                    } else
                      g = h.tag === 10 ? h.type === b.type ? null : h.child : h.child;
                    if (g !== null)
                      g.return = h;
                    else
                      for (g = h; g !== null; ) {
                        if (g === b) {
                          g = null;
                          break;
                        }
                        h = g.sibling;
                        if (h !== null) {
                          h.return = g.return;
                          g = h;
                          break;
                        }
                        g = g.return;
                      }
                    h = g;
                  }
              fi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(e, f.unstable_observedBits), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
          case 14:
            return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);
          case 15:
            return ki(a, b, b.type, b.pendingProps, d, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = true, Jf(b)) : a = false, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, true, a, c);
          case 19:
            return Ai(a, b, c);
          case 23:
            return mi(a, b, c);
          case 24:
            return mi(a, b, c);
        }
        throw Error(y(156, b.tag));
      };
      function ik(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.flags = 0;
        this.lastEffect = this.firstEffect = this.nextEffect = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function nh(a, b, c, d) {
        return new ik(a, b, c, d);
      }
      function ji(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function hk(a) {
        if (typeof a === "function")
          return ji(a) ? 1 : 0;
        if (a !== void 0 && a !== null) {
          a = a.$$typeof;
          if (a === Aa)
            return 11;
          if (a === Da)
            return 14;
        }
        return 2;
      }
      function Tg(a, b) {
        var c = a.alternate;
        c === null ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = b === null ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Vg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if (typeof a === "function")
          ji(a) && (g = 1);
        else if (typeof a === "string")
          g = 5;
        else
          a:
            switch (a) {
              case ua:
                return Xg(c.children, e, f, b);
              case Ha:
                g = 8;
                e |= 16;
                break;
              case wa:
                g = 8;
                e |= 1;
                break;
              case xa:
                return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;
              case Ba:
                return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;
              case Ca:
                return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;
              case Ia:
                return vi(c, e, f, b);
              case Ja:
                return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;
              default:
                if (typeof a === "object" && a !== null)
                  switch (a.$$typeof) {
                    case ya:
                      g = 10;
                      break a;
                    case za:
                      g = 9;
                      break a;
                    case Aa:
                      g = 11;
                      break a;
                    case Da:
                      g = 14;
                      break a;
                    case Ea:
                      g = 16;
                      d = null;
                      break a;
                    case Fa:
                      g = 22;
                      break a;
                  }
                throw Error(y(130, a == null ? a : typeof a, ""));
            }
        b = nh(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Xg(a, b, c, d) {
        a = nh(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function vi(a, b, c, d) {
        a = nh(23, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        return a;
      }
      function Ug(a, b, c) {
        a = nh(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Wg(a, b, c) {
        b = nh(4, a.children !== null ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function jk(a, b, c) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.pendingContext = this.context = null;
        this.hydrate = c;
        this.callbackNode = null;
        this.callbackPriority = 0;
        this.eventTimes = Zc(0);
        this.expirationTimes = Zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = Zc(0);
        this.mutableSourceEagerHydrationData = null;
      }
      function kk(a, b, c) {
        var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return { $$typeof: ta, key: d == null ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function lk(a, b, c, d) {
        var e = b.current, f = Hg(), g = Ig(e);
        a:
          if (c) {
            c = c._reactInternals;
            b: {
              if (Zb(c) !== c || c.tag !== 1)
                throw Error(y(170));
              var h = c;
              do {
                switch (h.tag) {
                  case 3:
                    h = h.stateNode.context;
                    break b;
                  case 1:
                    if (Ff(h.type)) {
                      h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                      break b;
                    }
                }
                h = h.return;
              } while (h !== null);
              throw Error(y(171));
            }
            if (c.tag === 1) {
              var k = c.type;
              if (Ff(k)) {
                c = If(c, k, h);
                break a;
              }
            }
            c = h;
          } else
            c = Cf;
        b.context === null ? b.context = c : b.pendingContext = c;
        b = zg(f, g);
        b.payload = { element: a };
        d = d === void 0 ? null : d;
        d !== null && (b.callback = d);
        Ag(e, b);
        Jg(e, g, f);
        return g;
      }
      function mk(a) {
        a = a.current;
        if (!a.child)
          return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function nk(a, b) {
        a = a.memoizedState;
        if (a !== null && a.dehydrated !== null) {
          var c = a.retryLane;
          a.retryLane = c !== 0 && c < b ? c : b;
        }
      }
      function ok(a, b) {
        nk(a, b);
        (a = a.alternate) && nk(a, b);
      }
      function pk() {
        return null;
      }
      function qk(a, b, c) {
        var d = c != null && c.hydrationOptions != null && c.hydrationOptions.mutableSources || null;
        c = new jk(a, b, c != null && c.hydrate === true);
        b = nh(3, null, null, b === 2 ? 7 : b === 1 ? 3 : 0);
        c.current = b;
        b.stateNode = c;
        xg(b);
        a[ff] = c.current;
        cf(a.nodeType === 8 ? a.parentNode : a);
        if (d)
          for (a = 0; a < d.length; a++) {
            b = d[a];
            var e = b._getVersion;
            e = e(b._source);
            c.mutableSourceEagerHydrationData == null ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
          }
        this._internalRoot = c;
      }
      qk.prototype.render = function(a) {
        lk(a, this._internalRoot, null, null);
      };
      qk.prototype.unmount = function() {
        var a = this._internalRoot, b = a.containerInfo;
        lk(null, a, null, function() {
          b[ff] = null;
        });
      };
      function rk(a) {
        return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11 && (a.nodeType !== 8 || a.nodeValue !== " react-mount-point-unstable "));
      }
      function sk(a, b) {
        b || (b = a ? a.nodeType === 9 ? a.documentElement : a.firstChild : null, b = !(!b || b.nodeType !== 1 || !b.hasAttribute("data-reactroot")));
        if (!b)
          for (var c; c = a.lastChild; )
            a.removeChild(c);
        return new qk(a, 0, b ? { hydrate: true } : void 0);
      }
      function tk(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f._internalRoot;
          if (typeof e === "function") {
            var h = e;
            e = function() {
              var a2 = mk(g);
              h.call(a2);
            };
          }
          lk(b, g, a, e);
        } else {
          f = c._reactRootContainer = sk(c, d);
          g = f._internalRoot;
          if (typeof e === "function") {
            var k = e;
            e = function() {
              var a2 = mk(g);
              k.call(a2);
            };
          }
          Xj(function() {
            lk(b, g, a, e);
          });
        }
        return mk(g);
      }
      ec = function(a) {
        if (a.tag === 13) {
          var b = Hg();
          Jg(a, 4, b);
          ok(a, 4);
        }
      };
      fc = function(a) {
        if (a.tag === 13) {
          var b = Hg();
          Jg(a, 67108864, b);
          ok(a, 67108864);
        }
      };
      gc = function(a) {
        if (a.tag === 13) {
          var b = Hg(), c = Ig(a);
          Jg(a, c, b);
          ok(a, c);
        }
      };
      hc = function(a, b) {
        return b();
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            ab(a, c);
            b = c.name;
            if (c.type === "radio" && b != null) {
              for (c = a; c.parentNode; )
                c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e)
                    throw Error(y(90));
                  Wa(d);
                  ab(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, b != null && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Wj;
      Hb = function(a, b, c, d, e) {
        var f = X;
        X |= 4;
        try {
          return gg(98, a.bind(null, b, c, d, e));
        } finally {
          X = f, X === 0 && (wj(), ig());
        }
      };
      Ib = function() {
        (X & 49) === 0 && (Vj(), Oj());
      };
      Jb = function(a, b) {
        var c = X;
        X |= 2;
        try {
          return a(b);
        } finally {
          X = c, X === 0 && (wj(), ig());
        }
      };
      function uk(a, b) {
        var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!rk(b))
          throw Error(y(200));
        return kk(a, b, null, c);
      }
      var vk = { Events: [Cb, ue, Db, Eb, Fb, Oj, { current: false }] };
      var wk = { findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom" };
      var xk = { bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = cc(a);
        return a === null ? null : a.stateNode;
      }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
        yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!yk.isDisabled && yk.supportsFiber)
          try {
            Lf = yk.inject(xk), Mf = yk;
          } catch (a) {
          }
      }
      var yk;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
      exports.createPortal = uk;
      exports.findDOMNode = function(a) {
        if (a == null)
          return null;
        if (a.nodeType === 1)
          return a;
        var b = a._reactInternals;
        if (b === void 0) {
          if (typeof a.render === "function")
            throw Error(y(188));
          throw Error(y(268, Object.keys(a)));
        }
        a = cc(b);
        a = a === null ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a, b) {
        var c = X;
        if ((c & 48) !== 0)
          return a(b);
        X |= 1;
        try {
          if (a)
            return gg(99, a.bind(null, b));
        } finally {
          X = c, ig();
        }
      };
      exports.hydrate = function(a, b, c) {
        if (!rk(b))
          throw Error(y(200));
        return tk(null, a, b, true, c);
      };
      exports.render = function(a, b, c) {
        if (!rk(b))
          throw Error(y(200));
        return tk(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!rk(a))
          throw Error(y(40));
        return a._reactRootContainer ? (Xj(function() {
          tk(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[ff] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Wj;
      exports.unstable_createPortal = function(a, b) {
        return uk(a, b, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
      };
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!rk(c))
          throw Error(y(200));
        if (a == null || a._reactInternals === void 0)
          throw Error(y(38));
        return tk(a, b, c, false, d);
      };
      exports.version = "17.0.2";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/@bugsnag/browser/dist/bugsnag.js
  var require_bugsnag = __commonJS({
    "node_modules/@bugsnag/browser/dist/bugsnag.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.Bugsnag = f();
        }
      })(function() {
        var define2, module2, exports2;
        var _$breadcrumbTypes_8 = ["navigation", "request", "process", "log", "user", "state", "error", "manual"];
        var _$reduce_17 = function(arr, fn, accum) {
          var val = accum;
          for (var i = 0, len = arr.length; i < len; i++) {
            val = fn(val, arr[i], i, arr);
          }
          return val;
        };
        ;
        var _$filter_12 = function(arr, fn) {
          return _$reduce_17(arr, function(accum, item, i, arr2) {
            return !fn(item, i, arr2) ? accum : accum.concat(item);
          }, []);
        };
        ;
        var _$includes_13 = function(arr, x) {
          return _$reduce_17(arr, function(accum, item, i, arr2) {
            return accum === true || item === x;
          }, false);
        };
        var _$isArray_14 = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        var _hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable("toString");
        var _dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
        var _$keys_15 = function(obj) {
          var result = [];
          var prop2;
          for (prop2 in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop2))
              result.push(prop2);
          }
          if (!_hasDontEnumBug)
            return result;
          for (var i = 0, len = _dontEnums.length; i < len; i++) {
            if (Object.prototype.hasOwnProperty.call(obj, _dontEnums[i]))
              result.push(_dontEnums[i]);
          }
          return result;
        };
        var _$intRange_23 = function(min, max) {
          if (min === void 0) {
            min = 1;
          }
          if (max === void 0) {
            max = Infinity;
          }
          return function(value) {
            return typeof value === "number" && parseInt("" + value, 10) === value && value >= min && value <= max;
          };
        };
        ;
        ;
        var _$listOfFunctions_24 = function(value) {
          return typeof value === "function" || _$isArray_14(value) && _$filter_12(value, function(f) {
            return typeof f === "function";
          }).length === value.length;
        };
        var _$stringWithLength_25 = function(value) {
          return typeof value === "string" && !!value.length;
        };
        var _$config_5 = {};
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var defaultErrorTypes = function() {
          return {
            unhandledExceptions: true,
            unhandledRejections: true
          };
        };
        _$config_5.schema = {
          apiKey: {
            defaultValue: function() {
              return null;
            },
            message: "is required",
            validate: _$stringWithLength_25
          },
          appVersion: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be a string",
            validate: function(value) {
              return value === void 0 || _$stringWithLength_25(value);
            }
          },
          appType: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be a string",
            validate: function(value) {
              return value === void 0 || _$stringWithLength_25(value);
            }
          },
          autoDetectErrors: {
            defaultValue: function() {
              return true;
            },
            message: "should be true|false",
            validate: function(value) {
              return value === true || value === false;
            }
          },
          enabledErrorTypes: {
            defaultValue: function() {
              return defaultErrorTypes();
            },
            message: "should be an object containing the flags { unhandledExceptions:true|false, unhandledRejections:true|false }",
            allowPartialObject: true,
            validate: function(value) {
              if (typeof value !== "object" || !value)
                return false;
              var providedKeys = _$keys_15(value);
              var defaultKeys = _$keys_15(defaultErrorTypes());
              if (_$filter_12(providedKeys, function(k) {
                return _$includes_13(defaultKeys, k);
              }).length < providedKeys.length)
                return false;
              if (_$filter_12(_$keys_15(value), function(k) {
                return typeof value[k] !== "boolean";
              }).length > 0)
                return false;
              return true;
            }
          },
          onError: {
            defaultValue: function() {
              return [];
            },
            message: "should be a function or array of functions",
            validate: _$listOfFunctions_24
          },
          onSession: {
            defaultValue: function() {
              return [];
            },
            message: "should be a function or array of functions",
            validate: _$listOfFunctions_24
          },
          onBreadcrumb: {
            defaultValue: function() {
              return [];
            },
            message: "should be a function or array of functions",
            validate: _$listOfFunctions_24
          },
          endpoints: {
            defaultValue: function() {
              return {
                notify: "https://notify.bugsnag.com",
                sessions: "https://sessions.bugsnag.com"
              };
            },
            message: "should be an object containing endpoint URLs { notify, sessions }",
            validate: function(val) {
              return val && typeof val === "object" && _$stringWithLength_25(val.notify) && _$stringWithLength_25(val.sessions) && _$filter_12(_$keys_15(val), function(k) {
                return !_$includes_13(["notify", "sessions"], k);
              }).length === 0;
            }
          },
          autoTrackSessions: {
            defaultValue: function(val) {
              return true;
            },
            message: "should be true|false",
            validate: function(val) {
              return val === true || val === false;
            }
          },
          enabledReleaseStages: {
            defaultValue: function() {
              return null;
            },
            message: "should be an array of strings",
            validate: function(value) {
              return value === null || _$isArray_14(value) && _$filter_12(value, function(f) {
                return typeof f === "string";
              }).length === value.length;
            }
          },
          releaseStage: {
            defaultValue: function() {
              return "production";
            },
            message: "should be a string",
            validate: function(value) {
              return typeof value === "string" && value.length;
            }
          },
          maxBreadcrumbs: {
            defaultValue: function() {
              return 25;
            },
            message: "should be a number \u2264100",
            validate: function(value) {
              return _$intRange_23(0, 100)(value);
            }
          },
          enabledBreadcrumbTypes: {
            defaultValue: function() {
              return _$breadcrumbTypes_8;
            },
            message: "should be null or a list of available breadcrumb types (" + _$breadcrumbTypes_8.join(",") + ")",
            validate: function(value) {
              return value === null || _$isArray_14(value) && _$reduce_17(value, function(accum, maybeType) {
                if (accum === false)
                  return accum;
                return _$includes_13(_$breadcrumbTypes_8, maybeType);
              }, true);
            }
          },
          context: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be a string",
            validate: function(value) {
              return value === void 0 || typeof value === "string";
            }
          },
          user: {
            defaultValue: function() {
              return {};
            },
            message: "should be an object with { id, email, name } properties",
            validate: function(value) {
              return value === null || value && _$reduce_17(_$keys_15(value), function(accum, key) {
                return accum && _$includes_13(["id", "email", "name"], key);
              }, true);
            }
          },
          metadata: {
            defaultValue: function() {
              return {};
            },
            message: "should be an object",
            validate: function(value) {
              return typeof value === "object" && value !== null;
            }
          },
          logger: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be null or an object with methods { debug, info, warn, error }",
            validate: function(value) {
              return !value || value && _$reduce_17(["debug", "info", "warn", "error"], function(accum, method) {
                return accum && typeof value[method] === "function";
              }, true);
            }
          },
          redactedKeys: {
            defaultValue: function() {
              return ["password"];
            },
            message: "should be an array of strings|regexes",
            validate: function(value) {
              return _$isArray_14(value) && value.length === _$filter_12(value, function(s) {
                return typeof s === "string" || s && typeof s.test === "function";
              }).length;
            }
          },
          plugins: {
            defaultValue: function() {
              return [];
            },
            message: "should be an array of plugin objects",
            validate: function(value) {
              return _$isArray_14(value) && value.length === _$filter_12(value, function(p) {
                return p && typeof p === "object" && typeof p.load === "function";
              }).length;
            }
          }
        };
        var _$assign_11 = function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        ;
        var _$map_16 = function(arr, fn) {
          return _$reduce_17(arr, function(accum, item, i, arr2) {
            return accum.concat(fn(item, i, arr2));
          }, []);
        };
        function _extends() {
          _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
          return _extends.apply(this, arguments);
        }
        var schema = _$config_5.schema;
        ;
        ;
        var _$config_1 = {
          releaseStage: _$assign_11({}, schema.releaseStage, {
            defaultValue: function() {
              if (/^localhost(:\d+)?$/.test(window.location.host))
                return "development";
              return "production";
            }
          }),
          appType: _extends({}, schema.appType, {
            defaultValue: function() {
              return "browser";
            }
          }),
          logger: _$assign_11({}, schema.logger, {
            defaultValue: function() {
              return typeof console !== "undefined" && typeof console.debug === "function" ? getPrefixedConsole() : void 0;
            }
          })
        };
        var getPrefixedConsole = function() {
          var logger = {};
          var consoleLog = console.log;
          _$map_16(["debug", "info", "warn", "error"], function(method) {
            var consoleMethod = console[method];
            logger[method] = typeof consoleMethod === "function" ? consoleMethod.bind(console, "[bugsnag]") : consoleLog.bind(console, "[bugsnag]");
          });
          return logger;
        };
        var Breadcrumb = /* @__PURE__ */ function() {
          function Breadcrumb2(message, metadata, type, timestamp) {
            if (timestamp === void 0) {
              timestamp = new Date();
            }
            this.type = type;
            this.message = message;
            this.metadata = metadata;
            this.timestamp = timestamp;
          }
          var _proto = Breadcrumb2.prototype;
          _proto.toJSON = function toJSON() {
            return {
              type: this.type,
              name: this.message,
              timestamp: this.timestamp,
              metaData: this.metadata
            };
          };
          return Breadcrumb2;
        }();
        var _$Breadcrumb_3 = Breadcrumb;
        var _$stackframe_33 = {};
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2("stackframe", [], factory);
          } else if (typeof _$stackframe_33 === "object") {
            _$stackframe_33 = factory();
          } else {
            root.StackFrame = factory();
          }
        })(this, function() {
          "use strict";
          function _isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }
          function _capitalize(str) {
            return str.charAt(0).toUpperCase() + str.substring(1);
          }
          function _getter(p) {
            return function() {
              return this[p];
            };
          }
          var booleanProps = ["isConstructor", "isEval", "isNative", "isToplevel"];
          var numericProps = ["columnNumber", "lineNumber"];
          var stringProps = ["fileName", "functionName", "source"];
          var arrayProps = ["args"];
          var props = booleanProps.concat(numericProps, stringProps, arrayProps);
          function StackFrame(obj) {
            if (obj instanceof Object) {
              for (var i2 = 0; i2 < props.length; i2++) {
                if (obj.hasOwnProperty(props[i2]) && obj[props[i2]] !== void 0) {
                  this["set" + _capitalize(props[i2])](obj[props[i2]]);
                }
              }
            }
          }
          StackFrame.prototype = {
            getArgs: function() {
              return this.args;
            },
            setArgs: function(v) {
              if (Object.prototype.toString.call(v) !== "[object Array]") {
                throw new TypeError("Args must be an Array");
              }
              this.args = v;
            },
            getEvalOrigin: function() {
              return this.evalOrigin;
            },
            setEvalOrigin: function(v) {
              if (v instanceof StackFrame) {
                this.evalOrigin = v;
              } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
              } else {
                throw new TypeError("Eval Origin must be an Object or StackFrame");
              }
            },
            toString: function() {
              var functionName = this.getFunctionName() || "{anonymous}";
              var args = "(" + (this.getArgs() || []).join(",") + ")";
              var fileName = this.getFileName() ? "@" + this.getFileName() : "";
              var lineNumber = _isNumber(this.getLineNumber()) ? ":" + this.getLineNumber() : "";
              var columnNumber = _isNumber(this.getColumnNumber()) ? ":" + this.getColumnNumber() : "";
              return functionName + args + fileName + lineNumber + columnNumber;
            }
          };
          for (var i = 0; i < booleanProps.length; i++) {
            StackFrame.prototype["get" + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
            StackFrame.prototype["set" + _capitalize(booleanProps[i])] = function(p) {
              return function(v) {
                this[p] = Boolean(v);
              };
            }(booleanProps[i]);
          }
          for (var j = 0; j < numericProps.length; j++) {
            StackFrame.prototype["get" + _capitalize(numericProps[j])] = _getter(numericProps[j]);
            StackFrame.prototype["set" + _capitalize(numericProps[j])] = function(p) {
              return function(v) {
                if (!_isNumber(v)) {
                  throw new TypeError(p + " must be a Number");
                }
                this[p] = Number(v);
              };
            }(numericProps[j]);
          }
          for (var k = 0; k < stringProps.length; k++) {
            StackFrame.prototype["get" + _capitalize(stringProps[k])] = _getter(stringProps[k]);
            StackFrame.prototype["set" + _capitalize(stringProps[k])] = function(p) {
              return function(v) {
                this[p] = String(v);
              };
            }(stringProps[k]);
          }
          return StackFrame;
        });
        var _$errorStackParser_30 = {};
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2("error-stack-parser", ["stackframe"], factory);
          } else if (typeof _$errorStackParser_30 === "object") {
            _$errorStackParser_30 = factory(_$stackframe_33);
          } else {
            root.ErrorStackParser = factory(root.StackFrame);
          }
        })(this, function ErrorStackParser(StackFrame) {
          "use strict";
          var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
          var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
          var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
          return {
            parse: function ErrorStackParser$$parse(error) {
              if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") {
                return this.parseOpera(error);
              } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
              } else if (error.stack) {
                return this.parseFFOrSafari(error);
              } else {
                throw new Error("Cannot parse given Error object");
              }
            },
            extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
              if (urlLike.indexOf(":") === -1) {
                return [urlLike];
              }
              var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
              var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ""));
              return [parts[1], parts[2] || void 0, parts[3] || void 0];
            },
            parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
              var filtered = error.stack.split("\n").filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
              }, this);
              return filtered.map(function(line) {
                if (line.indexOf("(eval ") > -1) {
                  line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, "");
                }
                var sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(");
                var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
                sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
                var tokens = sanitizedLine.split(/\s+/).slice(1);
                var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
                var functionName = tokens.join(" ") || void 0;
                var fileName = ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0];
                return new StackFrame({
                  functionName,
                  fileName,
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
                });
              }, this);
            },
            parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
              var filtered = error.stack.split("\n").filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
              }, this);
              return filtered.map(function(line) {
                if (line.indexOf(" > eval") > -1) {
                  line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ":$1");
                }
                if (line.indexOf("@") === -1 && line.indexOf(":") === -1) {
                  return new StackFrame({
                    functionName: line
                  });
                } else {
                  var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                  var matches = line.match(functionNameRegex);
                  var functionName = matches && matches[1] ? matches[1] : void 0;
                  var locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
                  return new StackFrame({
                    functionName,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                  });
                }
              }, this);
            },
            parseOpera: function ErrorStackParser$$parseOpera(e) {
              if (!e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length) {
                return this.parseOpera9(e);
              } else if (!e.stack) {
                return this.parseOpera10(e);
              } else {
                return this.parseOpera11(e);
              }
            },
            parseOpera9: function ErrorStackParser$$parseOpera9(e) {
              var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
              var lines = e.message.split("\n");
              var result = [];
              for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                  result.push(new StackFrame({
                    fileName: match[2],
                    lineNumber: match[1],
                    source: lines[i]
                  }));
                }
              }
              return result;
            },
            parseOpera10: function ErrorStackParser$$parseOpera10(e) {
              var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
              var lines = e.stacktrace.split("\n");
              var result = [];
              for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                  result.push(new StackFrame({
                    functionName: match[3] || void 0,
                    fileName: match[2],
                    lineNumber: match[1],
                    source: lines[i]
                  }));
                }
              }
              return result;
            },
            parseOpera11: function ErrorStackParser$$parseOpera11(error) {
              var filtered = error.stack.split("\n").filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
              }, this);
              return filtered.map(function(line) {
                var tokens = line.split("@");
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = tokens.shift() || "";
                var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^\)]*\)/g, "") || void 0;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                  argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, "$1");
                }
                var args = argsRaw === void 0 || argsRaw === "[arguments not available]" ? void 0 : argsRaw.split(",");
                return new StackFrame({
                  functionName,
                  args,
                  fileName: locationParts[0],
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
                });
              }, this);
            }
          };
        });
        var _$errorStackParser_10 = _$errorStackParser_30;
        var _$hasStack_18 = function(err) {
          return !!err && (!!err.stack || !!err.stacktrace || !!err["opera#sourceloc"]) && typeof (err.stack || err.stacktrace || err["opera#sourceloc"]) === "string" && err.stack !== err.name + ": " + err.message;
        };
        var _$isError_31 = isError;
        function isError(value) {
          switch (Object.prototype.toString.call(value)) {
            case "[object Error]":
              return true;
            case "[object Exception]":
              return true;
            case "[object DOMException]":
              return true;
            default:
              return value instanceof Error;
          }
        }
        var _$iserror_19 = _$isError_31;
        ;
        var add = function(state, section, keyOrObj, maybeVal) {
          var _updates;
          if (!section)
            return;
          var updates;
          if (keyOrObj === null)
            return clear(state, section);
          if (typeof keyOrObj === "object")
            updates = keyOrObj;
          if (typeof keyOrObj === "string")
            updates = (_updates = {}, _updates[keyOrObj] = maybeVal, _updates);
          if (!updates)
            return;
          if (!state[section])
            state[section] = {};
          state[section] = _$assign_11({}, state[section], updates);
        };
        var get = function(state, section, key) {
          if (typeof section !== "string")
            return void 0;
          if (!key) {
            return state[section];
          }
          if (state[section]) {
            return state[section][key];
          }
          return void 0;
        };
        var clear = function(state, section, key) {
          if (typeof section !== "string")
            return;
          if (!key) {
            delete state[section];
            return;
          }
          if (state[section]) {
            delete state[section][key];
          }
        };
        var _$metadataDelegate_21 = {
          add,
          get,
          clear
        };
        var _$stackGenerator_32 = {};
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2("stack-generator", ["stackframe"], factory);
          } else if (typeof _$stackGenerator_32 === "object") {
            _$stackGenerator_32 = factory(_$stackframe_33);
          } else {
            root.StackGenerator = factory(root.StackFrame);
          }
        })(this, function(StackFrame) {
          return {
            backtrace: function StackGenerator$$backtrace(opts) {
              var stack = [];
              var maxStackSize = 10;
              if (typeof opts === "object" && typeof opts.maxStackSize === "number") {
                maxStackSize = opts.maxStackSize;
              }
              var curr = arguments.callee;
              while (curr && stack.length < maxStackSize && curr["arguments"]) {
                var args = new Array(curr["arguments"].length);
                for (var i = 0; i < args.length; ++i) {
                  args[i] = curr["arguments"][i];
                }
                if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
                  stack.push(new StackFrame({
                    functionName: RegExp.$1 || void 0,
                    args
                  }));
                } else {
                  stack.push(new StackFrame({
                    args
                  }));
                }
                try {
                  curr = curr.caller;
                } catch (e) {
                  break;
                }
              }
              return stack;
            }
          };
        });
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var Event = /* @__PURE__ */ function() {
          function Event2(errorClass, errorMessage, stacktrace, handledState, originalError) {
            if (stacktrace === void 0) {
              stacktrace = [];
            }
            if (handledState === void 0) {
              handledState = defaultHandledState();
            }
            this.apiKey = void 0;
            this.context = void 0;
            this.groupingHash = void 0;
            this.originalError = originalError;
            this._handledState = handledState;
            this.severity = this._handledState.severity;
            this.unhandled = this._handledState.unhandled;
            this.app = {};
            this.device = {};
            this.request = {};
            this.breadcrumbs = [];
            this.threads = [];
            this._metadata = {};
            this._user = {};
            this._session = void 0;
            this.errors = [{
              errorClass: ensureString(errorClass),
              errorMessage: ensureString(errorMessage),
              type: Event2.__type,
              stacktrace: _$reduce_17(stacktrace, function(accum, frame) {
                var f = formatStackframe(frame);
                try {
                  if (JSON.stringify(f) === "{}")
                    return accum;
                  return accum.concat(f);
                } catch (e) {
                  return accum;
                }
              }, [])
            }];
          }
          var _proto = Event2.prototype;
          _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
            return _$metadataDelegate_21.add(this._metadata, section, keyOrObj, maybeVal);
          };
          _proto.getMetadata = function getMetadata(section, key) {
            return _$metadataDelegate_21.get(this._metadata, section, key);
          };
          _proto.clearMetadata = function clearMetadata(section, key) {
            return _$metadataDelegate_21.clear(this._metadata, section, key);
          };
          _proto.getUser = function getUser() {
            return this._user;
          };
          _proto.setUser = function setUser(id, email, name2) {
            this._user = {
              id,
              email,
              name: name2
            };
          };
          _proto.toJSON = function toJSON() {
            return {
              payloadVersion: "4",
              exceptions: _$map_16(this.errors, function(er) {
                return _$assign_11({}, er, {
                  message: er.errorMessage
                });
              }),
              severity: this.severity,
              unhandled: this._handledState.unhandled,
              severityReason: this._handledState.severityReason,
              app: this.app,
              device: this.device,
              request: this.request,
              breadcrumbs: this.breadcrumbs,
              context: this.context,
              groupingHash: this.groupingHash,
              metaData: this._metadata,
              user: this._user,
              session: this._session
            };
          };
          return Event2;
        }();
        var formatStackframe = function(frame) {
          var f = {
            file: frame.fileName,
            method: normaliseFunctionName(frame.functionName),
            lineNumber: frame.lineNumber,
            columnNumber: frame.columnNumber,
            code: void 0,
            inProject: void 0
          };
          if (f.lineNumber > -1 && !f.file && !f.method) {
            f.file = "global code";
          }
          return f;
        };
        var normaliseFunctionName = function(name2) {
          return /^global code$/i.test(name2) ? "global code" : name2;
        };
        var defaultHandledState = function() {
          return {
            unhandled: false,
            severity: "warning",
            severityReason: {
              type: "handledException"
            }
          };
        };
        var ensureString = function(str) {
          return typeof str === "string" ? str : "";
        };
        Event.getStacktrace = function(error, errorFramesToSkip, backtraceFramesToSkip) {
          if (_$hasStack_18(error))
            return _$errorStackParser_10.parse(error).slice(errorFramesToSkip);
          try {
            return _$filter_12(_$stackGenerator_32.backtrace(), function(frame) {
              return (frame.functionName || "").indexOf("StackGenerator$$") === -1;
            }).slice(1 + backtraceFramesToSkip);
          } catch (e) {
            return [];
          }
        };
        Event.create = function(maybeError, tolerateNonErrors, handledState, component, errorFramesToSkip, logger) {
          if (errorFramesToSkip === void 0) {
            errorFramesToSkip = 0;
          }
          var _normaliseError = normaliseError(maybeError, tolerateNonErrors, component, logger), error = _normaliseError[0], internalFrames = _normaliseError[1];
          var event;
          try {
            var stacktrace = Event.getStacktrace(error, internalFrames > 0 ? 1 + internalFrames + errorFramesToSkip : 0, 1 + errorFramesToSkip);
            event = new Event(error.name, error.message, stacktrace, handledState, maybeError);
          } catch (e) {
            event = new Event(error.name, error.message, [], handledState, maybeError);
          }
          if (error.name === "InvalidError") {
            event.addMetadata("" + component, "non-error parameter", makeSerialisable(maybeError));
          }
          return event;
        };
        var makeSerialisable = function(err) {
          if (err === null)
            return "null";
          if (err === void 0)
            return "undefined";
          return err;
        };
        var normaliseError = function(maybeError, tolerateNonErrors, component, logger) {
          var error;
          var internalFrames = 0;
          var createAndLogInputError = function(reason) {
            if (logger)
              logger.warn(component + ' received a non-error: "' + reason + '"');
            var err = new Error(component + ' received a non-error. See "' + component + '" tab for more detail.');
            err.name = "InvalidError";
            return err;
          };
          if (!tolerateNonErrors) {
            if (_$iserror_19(maybeError)) {
              error = maybeError;
            } else {
              error = createAndLogInputError(typeof maybeError);
              internalFrames += 2;
            }
          } else {
            switch (typeof maybeError) {
              case "string":
              case "number":
              case "boolean":
                error = new Error(String(maybeError));
                internalFrames += 1;
                break;
              case "function":
                error = createAndLogInputError("function");
                internalFrames += 2;
                break;
              case "object":
                if (maybeError !== null && _$iserror_19(maybeError)) {
                  error = maybeError;
                } else if (maybeError !== null && hasNecessaryFields(maybeError)) {
                  error = new Error(maybeError.message || maybeError.errorMessage);
                  error.name = maybeError.name || maybeError.errorClass;
                  internalFrames += 1;
                } else {
                  error = createAndLogInputError(maybeError === null ? "null" : "unsupported object");
                  internalFrames += 2;
                }
                break;
              default:
                error = createAndLogInputError("nothing");
                internalFrames += 2;
            }
          }
          if (!_$hasStack_18(error)) {
            try {
              throw error;
            } catch (e) {
              if (_$hasStack_18(e)) {
                error = e;
                internalFrames = 1;
              }
            }
          }
          return [error, internalFrames];
        };
        Event.__type = "browserjs";
        var hasNecessaryFields = function(error) {
          return (typeof error.name === "string" || typeof error.errorClass === "string") && (typeof error.message === "string" || typeof error.errorMessage === "string");
        };
        var _$Event_6 = Event;
        var _$asyncEvery_7 = function(arr, fn, cb) {
          var index = 0;
          var next = function() {
            if (index >= arr.length)
              return cb(null, true);
            fn(arr[index], function(err, result) {
              if (err)
                return cb(err);
              if (result === false)
                return cb(null, false);
              index++;
              next();
            });
          };
          next();
        };
        ;
        var _$callbackRunner_9 = function(callbacks, event, onCallbackError, cb) {
          var runMaybeAsyncCallback = function(fn, cb2) {
            if (typeof fn !== "function")
              return cb2(null);
            try {
              if (fn.length !== 2) {
                var ret = fn(event);
                if (ret && typeof ret.then === "function") {
                  return ret.then(function(val) {
                    return setTimeout(function() {
                      return cb2(null, val);
                    });
                  }, function(err) {
                    setTimeout(function() {
                      onCallbackError(err);
                      return cb2(null, true);
                    });
                  });
                }
                return cb2(null, ret);
              }
              fn(event, function(err, result) {
                if (err) {
                  onCallbackError(err);
                  return cb2(null);
                }
                cb2(null, result);
              });
            } catch (e) {
              onCallbackError(e);
              cb2(null);
            }
          };
          _$asyncEvery_7(callbacks, runMaybeAsyncCallback, cb);
        };
        var _$syncCallbackRunner_22 = function(callbacks, callbackArg, callbackType, logger) {
          var ignore = false;
          var cbs = callbacks.slice();
          while (!ignore) {
            if (!cbs.length)
              break;
            try {
              ignore = cbs.pop()(callbackArg) === false;
            } catch (e) {
              logger.error("Error occurred in " + callbackType + " callback, continuing anyway\u2026");
              logger.error(e);
            }
          }
          return ignore;
        };
        var _$pad_28 = function pad(num, size) {
          var s = "000000000" + num;
          return s.substr(s.length - size);
        };
        ;
        var env = typeof window === "object" ? window : self;
        var globalCount = 0;
        for (var prop in env) {
          if (Object.hasOwnProperty.call(env, prop))
            globalCount++;
        }
        var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
        var clientId = _$pad_28((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
        var _$fingerprint_27 = function fingerprint() {
          return clientId;
        };
        ;
        ;
        var c = 0, blockSize = 4, base = 36, discreteValues = Math.pow(base, blockSize);
        function randomBlock() {
          return _$pad_28((Math.random() * discreteValues << 0).toString(base), blockSize);
        }
        function safeCounter() {
          c = c < discreteValues ? c : 0;
          c++;
          return c - 1;
        }
        function cuid() {
          var letter = "c", timestamp = new Date().getTime().toString(base), counter = _$pad_28(safeCounter().toString(base), blockSize), print = _$fingerprint_27(), random = randomBlock() + randomBlock();
          return letter + timestamp + counter + print + random;
        }
        cuid.fingerprint = _$fingerprint_27;
        var _$cuid_26 = cuid;
        ;
        var Session = /* @__PURE__ */ function() {
          function Session2() {
            this.id = _$cuid_26();
            this.startedAt = new Date();
            this._handled = 0;
            this._unhandled = 0;
            this._user = {};
            this.app = {};
            this.device = {};
          }
          var _proto = Session2.prototype;
          _proto.getUser = function getUser() {
            return this._user;
          };
          _proto.setUser = function setUser(id, email, name2) {
            this._user = {
              id,
              email,
              name: name2
            };
          };
          _proto.toJSON = function toJSON() {
            return {
              id: this.id,
              startedAt: this.startedAt,
              events: {
                handled: this._handled,
                unhandled: this._unhandled
              }
            };
          };
          _proto._track = function _track(event) {
            this[event._handledState.unhandled ? "_unhandled" : "_handled"] += 1;
          };
          return Session2;
        }();
        var _$Session_34 = Session;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var noop = function() {
        };
        var Client = /* @__PURE__ */ function() {
          function Client2(configuration, schema2, internalPlugins, notifier) {
            var _this = this;
            if (schema2 === void 0) {
              schema2 = _$config_5.schema;
            }
            if (internalPlugins === void 0) {
              internalPlugins = [];
            }
            this._notifier = notifier;
            this._config = {};
            this._schema = schema2;
            this._delivery = {
              sendSession: noop,
              sendEvent: noop
            };
            this._logger = {
              debug: noop,
              info: noop,
              warn: noop,
              error: noop
            };
            this._plugins = {};
            this._breadcrumbs = [];
            this._session = null;
            this._metadata = {};
            this._context = void 0;
            this._user = {};
            this._cbs = {
              e: [],
              s: [],
              sp: [],
              b: []
            };
            this.Client = Client2;
            this.Event = _$Event_6;
            this.Breadcrumb = _$Breadcrumb_3;
            this.Session = _$Session_34;
            this._config = this._configure(configuration, internalPlugins);
            _$map_16(internalPlugins.concat(this._config.plugins), function(pl) {
              if (pl)
                _this._loadPlugin(pl);
            });
            this._depth = 1;
            var self2 = this;
            var notify = this.notify;
            this.notify = function() {
              return notify.apply(self2, arguments);
            };
          }
          var _proto = Client2.prototype;
          _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
            return _$metadataDelegate_21.add(this._metadata, section, keyOrObj, maybeVal);
          };
          _proto.getMetadata = function getMetadata(section, key) {
            return _$metadataDelegate_21.get(this._metadata, section, key);
          };
          _proto.clearMetadata = function clearMetadata(section, key) {
            return _$metadataDelegate_21.clear(this._metadata, section, key);
          };
          _proto.getContext = function getContext() {
            return this._context;
          };
          _proto.setContext = function setContext(c2) {
            this._context = c2;
          };
          _proto._configure = function _configure(opts, internalPlugins) {
            var schema2 = _$reduce_17(internalPlugins, function(schema3, plugin) {
              if (plugin && plugin.configSchema)
                return _$assign_11({}, schema3, plugin.configSchema);
              return schema3;
            }, this._schema);
            var _reduce = _$reduce_17(_$keys_15(schema2), function(accum, key) {
              var defaultValue = schema2[key].defaultValue(opts[key]);
              if (opts[key] !== void 0) {
                var valid = schema2[key].validate(opts[key]);
                if (!valid) {
                  accum.errors[key] = schema2[key].message;
                  accum.config[key] = defaultValue;
                } else {
                  if (schema2[key].allowPartialObject) {
                    accum.config[key] = _$assign_11(defaultValue, opts[key]);
                  } else {
                    accum.config[key] = opts[key];
                  }
                }
              } else {
                accum.config[key] = defaultValue;
              }
              return accum;
            }, {
              errors: {},
              config: {}
            }), errors = _reduce.errors, config = _reduce.config;
            if (schema2.apiKey) {
              if (!config.apiKey)
                throw new Error("No Bugsnag API Key set");
              if (!/^[0-9a-f]{32}$/i.test(config.apiKey))
                errors.apiKey = "should be a string of 32 hexadecimal characters";
            }
            this._metadata = _$assign_11({}, config.metadata);
            this._user = _$assign_11({}, config.user);
            this._context = config.context;
            if (config.logger)
              this._logger = config.logger;
            if (config.onError)
              this._cbs.e = this._cbs.e.concat(config.onError);
            if (config.onBreadcrumb)
              this._cbs.b = this._cbs.b.concat(config.onBreadcrumb);
            if (config.onSession)
              this._cbs.s = this._cbs.s.concat(config.onSession);
            if (_$keys_15(errors).length) {
              this._logger.warn(generateConfigErrorMessage(errors, opts));
            }
            return config;
          };
          _proto.getUser = function getUser() {
            return this._user;
          };
          _proto.setUser = function setUser(id, email, name2) {
            this._user = {
              id,
              email,
              name: name2
            };
          };
          _proto._loadPlugin = function _loadPlugin(plugin) {
            var result = plugin.load(this);
            if (plugin.name)
              this._plugins["~" + plugin.name + "~"] = result;
            return this;
          };
          _proto.getPlugin = function getPlugin(name2) {
            return this._plugins["~" + name2 + "~"];
          };
          _proto._setDelivery = function _setDelivery(d) {
            this._delivery = d(this);
          };
          _proto.startSession = function startSession() {
            var session = new _$Session_34();
            session.app.releaseStage = this._config.releaseStage;
            session.app.version = this._config.appVersion;
            session.app.type = this._config.appType;
            session._user = _$assign_11({}, this._user);
            var ignore = _$syncCallbackRunner_22(this._cbs.s, session, "onSession", this._logger);
            if (ignore) {
              this._logger.debug("Session not started due to onSession callback");
              return this;
            }
            return this._sessionDelegate.startSession(this, session);
          };
          _proto.addOnError = function addOnError(fn, front) {
            if (front === void 0) {
              front = false;
            }
            this._cbs.e[front ? "unshift" : "push"](fn);
          };
          _proto.removeOnError = function removeOnError(fn) {
            this._cbs.e = _$filter_12(this._cbs.e, function(f) {
              return f !== fn;
            });
          };
          _proto._addOnSessionPayload = function _addOnSessionPayload(fn) {
            this._cbs.sp.push(fn);
          };
          _proto.addOnSession = function addOnSession(fn) {
            this._cbs.s.push(fn);
          };
          _proto.removeOnSession = function removeOnSession(fn) {
            this._cbs.s = _$filter_12(this._cbs.s, function(f) {
              return f !== fn;
            });
          };
          _proto.addOnBreadcrumb = function addOnBreadcrumb(fn, front) {
            if (front === void 0) {
              front = false;
            }
            this._cbs.b[front ? "unshift" : "push"](fn);
          };
          _proto.removeOnBreadcrumb = function removeOnBreadcrumb(fn) {
            this._cbs.b = _$filter_12(this._cbs.b, function(f) {
              return f !== fn;
            });
          };
          _proto.pauseSession = function pauseSession() {
            return this._sessionDelegate.pauseSession(this);
          };
          _proto.resumeSession = function resumeSession() {
            return this._sessionDelegate.resumeSession(this);
          };
          _proto.leaveBreadcrumb = function leaveBreadcrumb(message, metadata, type) {
            message = typeof message === "string" ? message : "";
            type = typeof type === "string" && _$includes_13(_$breadcrumbTypes_8, type) ? type : "manual";
            metadata = typeof metadata === "object" && metadata !== null ? metadata : {};
            if (!message)
              return;
            var crumb = new _$Breadcrumb_3(message, metadata, type);
            var ignore = _$syncCallbackRunner_22(this._cbs.b, crumb, "onBreadcrumb", this._logger);
            if (ignore) {
              this._logger.debug("Breadcrumb not attached due to onBreadcrumb callback");
              return;
            }
            this._breadcrumbs.push(crumb);
            if (this._breadcrumbs.length > this._config.maxBreadcrumbs) {
              this._breadcrumbs = this._breadcrumbs.slice(this._breadcrumbs.length - this._config.maxBreadcrumbs);
            }
          };
          _proto._isBreadcrumbTypeEnabled = function _isBreadcrumbTypeEnabled(type) {
            var types = this._config.enabledBreadcrumbTypes;
            return types === null || _$includes_13(types, type);
          };
          _proto.notify = function notify(maybeError, onError, cb) {
            if (cb === void 0) {
              cb = noop;
            }
            var event = _$Event_6.create(maybeError, true, void 0, "notify()", this._depth + 1, this._logger);
            this._notify(event, onError, cb);
          };
          _proto._notify = function _notify(event, onError, cb) {
            var _this2 = this;
            if (cb === void 0) {
              cb = noop;
            }
            event.app = _$assign_11({}, event.app, {
              releaseStage: this._config.releaseStage,
              version: this._config.appVersion,
              type: this._config.appType
            });
            event.context = event.context || this._context;
            event._metadata = _$assign_11({}, event._metadata, this._metadata);
            event._user = _$assign_11({}, event._user, this._user);
            event.breadcrumbs = this._breadcrumbs.slice();
            if (this._config.enabledReleaseStages !== null && !_$includes_13(this._config.enabledReleaseStages, this._config.releaseStage)) {
              this._logger.warn("Event not sent due to releaseStage/enabledReleaseStages configuration");
              return cb(null, event);
            }
            var originalSeverity = event.severity;
            var onCallbackError = function(err) {
              _this2._logger.error("Error occurred in onError callback, continuing anyway\u2026");
              _this2._logger.error(err);
            };
            var callbacks = [].concat(this._cbs.e).concat(onError);
            _$callbackRunner_9(callbacks, event, onCallbackError, function(err, shouldSend) {
              if (err)
                onCallbackError(err);
              if (!shouldSend) {
                _this2._logger.debug("Event not sent due to onError callback");
                return cb(null, event);
              }
              if (_this2._isBreadcrumbTypeEnabled("error")) {
                Client2.prototype.leaveBreadcrumb.call(_this2, event.errors[0].errorClass, {
                  errorClass: event.errors[0].errorClass,
                  errorMessage: event.errors[0].errorMessage,
                  severity: event.severity
                }, "error");
              }
              if (originalSeverity !== event.severity) {
                event._handledState.severityReason = {
                  type: "userCallbackSetSeverity"
                };
              }
              if (event.unhandled !== event._handledState.unhandled) {
                event._handledState.severityReason.unhandledOverridden = true;
                event._handledState.unhandled = event.unhandled;
              }
              if (_this2._session) {
                _this2._session._track(event);
                event._session = _this2._session;
              }
              _this2._delivery.sendEvent({
                apiKey: event.apiKey || _this2._config.apiKey,
                notifier: _this2._notifier,
                events: [event]
              }, function(err2) {
                return cb(err2, event);
              });
            });
          };
          return Client2;
        }();
        var generateConfigErrorMessage = function(errors, rawInput) {
          var er = new Error("Invalid configuration\n" + _$map_16(_$keys_15(errors), function(key) {
            return "  - " + key + " " + errors[key] + ", got " + stringify2(rawInput[key]);
          }).join("\n\n"));
          return er;
        };
        var stringify2 = function(val) {
          switch (typeof val) {
            case "string":
            case "number":
            case "object":
              return JSON.stringify(val);
            default:
              return String(val);
          }
        };
        var _$Client_4 = Client;
        var _$safeJsonStringify_29 = function(data, replacer, space, opts) {
          var redactedKeys = opts && opts.redactedKeys ? opts.redactedKeys : [];
          var redactedPaths = opts && opts.redactedPaths ? opts.redactedPaths : [];
          return JSON.stringify(prepareObjForSerialization(data, redactedKeys, redactedPaths), replacer, space);
        };
        var MAX_DEPTH = 20;
        var MAX_EDGES = 25e3;
        var MIN_PRESERVED_DEPTH = 8;
        var REPLACEMENT_NODE = "...";
        function __isError_29(o) {
          return o instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(o));
        }
        function throwsMessage(err) {
          return "[Throws: " + (err ? err.message : "?") + "]";
        }
        function find(haystack, needle) {
          for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i] === needle)
              return true;
          }
          return false;
        }
        function isDescendent(paths, path) {
          for (var i = 0, len = paths.length; i < len; i++) {
            if (path.indexOf(paths[i]) === 0)
              return true;
          }
          return false;
        }
        function shouldRedact(patterns, key) {
          for (var i = 0, len = patterns.length; i < len; i++) {
            if (typeof patterns[i] === "string" && patterns[i].toLowerCase() === key.toLowerCase())
              return true;
            if (patterns[i] && typeof patterns[i].test === "function" && patterns[i].test(key))
              return true;
          }
          return false;
        }
        function __isArray_29(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        }
        function safelyGetProp(obj, prop2) {
          try {
            return obj[prop2];
          } catch (err) {
            return throwsMessage(err);
          }
        }
        function prepareObjForSerialization(obj, redactedKeys, redactedPaths) {
          var seen = [];
          var edges = 0;
          function visit(obj2, path) {
            function edgesExceeded() {
              return path.length > MIN_PRESERVED_DEPTH && edges > MAX_EDGES;
            }
            edges++;
            if (path.length > MAX_DEPTH)
              return REPLACEMENT_NODE;
            if (edgesExceeded())
              return REPLACEMENT_NODE;
            if (obj2 === null || typeof obj2 !== "object")
              return obj2;
            if (find(seen, obj2))
              return "[Circular]";
            seen.push(obj2);
            if (typeof obj2.toJSON === "function") {
              try {
                edges--;
                var fResult = visit(obj2.toJSON(), path);
                seen.pop();
                return fResult;
              } catch (err) {
                return throwsMessage(err);
              }
            }
            var er = __isError_29(obj2);
            if (er) {
              edges--;
              var eResult = visit({
                name: obj2.name,
                message: obj2.message
              }, path);
              seen.pop();
              return eResult;
            }
            if (__isArray_29(obj2)) {
              var aResult = [];
              for (var i = 0, len = obj2.length; i < len; i++) {
                if (edgesExceeded()) {
                  aResult.push(REPLACEMENT_NODE);
                  break;
                }
                aResult.push(visit(obj2[i], path.concat("[]")));
              }
              seen.pop();
              return aResult;
            }
            var result = {};
            try {
              for (var prop2 in obj2) {
                if (!Object.prototype.hasOwnProperty.call(obj2, prop2))
                  continue;
                if (isDescendent(redactedPaths, path.join(".")) && shouldRedact(redactedKeys, prop2)) {
                  result[prop2] = "[REDACTED]";
                  continue;
                }
                if (edgesExceeded()) {
                  result[prop2] = REPLACEMENT_NODE;
                  break;
                }
                result[prop2] = visit(safelyGetProp(obj2, prop2), path.concat(prop2));
              }
            } catch (e) {
            }
            seen.pop();
            return result;
          }
          return visit(obj, []);
        }
        var _$jsonPayload_20 = {};
        ;
        var EVENT_REDACTION_PATHS = ["events.[].metaData", "events.[].breadcrumbs.[].metaData", "events.[].request"];
        _$jsonPayload_20.event = function(event, redactedKeys) {
          var payload = _$safeJsonStringify_29(event, null, null, {
            redactedPaths: EVENT_REDACTION_PATHS,
            redactedKeys
          });
          if (payload.length > 1e6) {
            event.events[0]._metadata = {
              notifier: "WARNING!\nSerialized payload was " + payload.length / 1e6 + "MB (limit = 1MB)\nmetadata was removed"
            };
            payload = _$safeJsonStringify_29(event, null, null, {
              redactedPaths: EVENT_REDACTION_PATHS,
              redactedKeys
            });
            if (payload.length > 1e6)
              throw new Error("payload exceeded 1MB limit");
          }
          return payload;
        };
        _$jsonPayload_20.session = function(event, redactedKeys) {
          var payload = _$safeJsonStringify_29(event, null, null);
          if (payload.length > 1e6)
            throw new Error("payload exceeded 1MB limit");
          return payload;
        };
        var _$delivery_35 = {};
        ;
        _$delivery_35 = function(client, win) {
          if (win === void 0) {
            win = window;
          }
          return {
            sendEvent: function(event, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              var url2 = getApiUrl(client._config, "notify", "4", win);
              var req = new win.XDomainRequest();
              req.onload = function() {
                cb(null);
              };
              req.open("POST", url2);
              setTimeout(function() {
                try {
                  req.send(_$jsonPayload_20.event(event, client._config.redactedKeys));
                } catch (e) {
                  client._logger.error(e);
                  cb(e);
                }
              }, 0);
            },
            sendSession: function(session, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              var url2 = getApiUrl(client._config, "sessions", "1", win);
              var req = new win.XDomainRequest();
              req.onload = function() {
                cb(null);
              };
              req.open("POST", url2);
              setTimeout(function() {
                try {
                  req.send(_$jsonPayload_20.session(session, client._config.redactedKeys));
                } catch (e) {
                  client._logger.error(e);
                  cb(e);
                }
              }, 0);
            }
          };
        };
        var getApiUrl = function(config, endpoint, version2, win) {
          var isoDate = JSON.parse(JSON.stringify(new Date()));
          var url2 = matchPageProtocol(config.endpoints[endpoint], win.location.protocol);
          return url2 + "?apiKey=" + encodeURIComponent(config.apiKey) + "&payloadVersion=" + version2 + "&sentAt=" + encodeURIComponent(isoDate);
        };
        var matchPageProtocol = _$delivery_35._matchPageProtocol = function(endpoint, pageProtocol) {
          return pageProtocol === "http:" ? endpoint.replace(/^https:/, "http:") : endpoint;
        };
        ;
        var _$delivery_36 = function(client, win) {
          if (win === void 0) {
            win = window;
          }
          return {
            sendEvent: function(event, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              try {
                var url2 = client._config.endpoints.notify;
                var req = new win.XMLHttpRequest();
                req.onreadystatechange = function() {
                  if (req.readyState === win.XMLHttpRequest.DONE)
                    cb(null);
                };
                req.open("POST", url2);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Bugsnag-Api-Key", event.apiKey || client._config.apiKey);
                req.setRequestHeader("Bugsnag-Payload-Version", "4");
                req.setRequestHeader("Bugsnag-Sent-At", new Date().toISOString());
                req.send(_$jsonPayload_20.event(event, client._config.redactedKeys));
              } catch (e) {
                client._logger.error(e);
              }
            },
            sendSession: function(session, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              try {
                var url2 = client._config.endpoints.sessions;
                var req = new win.XMLHttpRequest();
                req.onreadystatechange = function() {
                  if (req.readyState === win.XMLHttpRequest.DONE)
                    cb(null);
                };
                req.open("POST", url2);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Bugsnag-Api-Key", client._config.apiKey);
                req.setRequestHeader("Bugsnag-Payload-Version", "1");
                req.setRequestHeader("Bugsnag-Sent-At", new Date().toISOString());
                req.send(_$jsonPayload_20.session(session, client._config.redactedKeys));
              } catch (e) {
                client._logger.error(e);
              }
            }
          };
        };
        var appStart = new Date();
        var reset = function() {
          appStart = new Date();
        };
        var _$app_37 = {
          name: "appDuration",
          load: function(client) {
            client.addOnError(function(event) {
              var now = new Date();
              event.app.duration = now - appStart;
            }, true);
            return {
              reset
            };
          }
        };
        var _$context_38 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              client.addOnError(function(event) {
                if (event.context !== void 0)
                  return;
                event.context = win.location.pathname;
              }, true);
            }
          };
        };
        var _$pad_42 = function pad(num, size) {
          var s = "000000000" + num;
          return s.substr(s.length - size);
        };
        ;
        var __env_41 = typeof window === "object" ? window : self;
        var __globalCount_41 = 0;
        for (var __prop_41 in __env_41) {
          if (Object.hasOwnProperty.call(__env_41, __prop_41))
            __globalCount_41++;
        }
        var __mimeTypesLength_41 = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
        var __clientId_41 = _$pad_42((__mimeTypesLength_41 + navigator.userAgent.length).toString(36) + __globalCount_41.toString(36), 4);
        var _$fingerprint_41 = function fingerprint() {
          return __clientId_41;
        };
        ;
        ;
        var __c_40 = 0, __blockSize_40 = 4, __base_40 = 36, __discreteValues_40 = Math.pow(__base_40, __blockSize_40);
        function __randomBlock_40() {
          return _$pad_42((Math.random() * __discreteValues_40 << 0).toString(__base_40), __blockSize_40);
        }
        function __safeCounter_40() {
          __c_40 = __c_40 < __discreteValues_40 ? __c_40 : 0;
          __c_40++;
          return __c_40 - 1;
        }
        function __cuid_40() {
          var letter = "c", timestamp = new Date().getTime().toString(__base_40), counter = _$pad_42(__safeCounter_40().toString(__base_40), __blockSize_40), print = _$fingerprint_41(), random = __randomBlock_40() + __randomBlock_40();
          return letter + timestamp + counter + print + random;
        }
        __cuid_40.fingerprint = _$fingerprint_41;
        var _$cuid_40 = __cuid_40;
        ;
        ;
        var BUGSNAG_ANONYMOUS_ID_KEY = "bugsnag-anonymous-id";
        var getDeviceId = function() {
          try {
            var storage = window.localStorage;
            var id = storage.getItem(BUGSNAG_ANONYMOUS_ID_KEY);
            if (id && /^c[a-z0-9]{20,32}$/.test(id)) {
              return id;
            }
            id = _$cuid_40();
            storage.setItem(BUGSNAG_ANONYMOUS_ID_KEY, id);
            return id;
          } catch (err) {
          }
        };
        var _$device_39 = function(nav, screen) {
          if (nav === void 0) {
            nav = navigator;
          }
          if (screen === void 0) {
            screen = window.screen;
          }
          return {
            load: function(client) {
              var device = {
                locale: nav.browserLanguage || nav.systemLanguage || nav.userLanguage || nav.language,
                userAgent: nav.userAgent
              };
              if (screen && screen.orientation && screen.orientation.type) {
                device.orientation = screen.orientation.type;
              } else {
                device.orientation = document.documentElement.clientWidth > document.documentElement.clientHeight ? "landscape" : "portrait";
              }
              if (client._config.generateAnonymousId) {
                device.id = getDeviceId();
              }
              client.addOnSession(function(session) {
                session.device = _$assign_11({}, session.device, device);
                if (!client._config.collectUserIp)
                  setDefaultUserId(session);
              });
              client.addOnError(function(event) {
                event.device = _$assign_11({}, event.device, device, {
                  time: new Date()
                });
                if (!client._config.collectUserIp)
                  setDefaultUserId(event);
              }, true);
            },
            configSchema: {
              generateAnonymousId: {
                validate: function(value) {
                  return value === true || value === false;
                },
                defaultValue: function() {
                  return true;
                },
                message: "should be true|false"
              }
            }
          };
        };
        var setDefaultUserId = function(eventOrSession) {
          var user = eventOrSession.getUser();
          if (!user || !user.id) {
            eventOrSession.setUser(eventOrSession.device.id);
          }
        };
        ;
        var _$request_43 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              client.addOnError(function(event) {
                if (event.request && event.request.url)
                  return;
                event.request = _$assign_11({}, event.request, {
                  url: win.location.href
                });
              }, true);
            }
          };
        };
        ;
        var _$session_44 = {
          load: function(client) {
            client._sessionDelegate = sessionDelegate;
          }
        };
        var sessionDelegate = {
          startSession: function(client, session) {
            var sessionClient = client;
            sessionClient._session = session;
            sessionClient._pausedSession = null;
            if (sessionClient._config.enabledReleaseStages !== null && !_$includes_13(sessionClient._config.enabledReleaseStages, sessionClient._config.releaseStage)) {
              sessionClient._logger.warn("Session not sent due to releaseStage/enabledReleaseStages configuration");
              return sessionClient;
            }
            sessionClient._delivery.sendSession({
              notifier: sessionClient._notifier,
              device: session.device,
              app: session.app,
              sessions: [{
                id: session.id,
                startedAt: session.startedAt,
                user: session._user
              }]
            });
            return sessionClient;
          },
          resumeSession: function(client) {
            if (client._session) {
              return client;
            }
            if (client._pausedSession) {
              client._session = client._pausedSession;
              client._pausedSession = null;
              return client;
            }
            return client.startSession();
          },
          pauseSession: function(client) {
            client._pausedSession = client._session;
            client._session = null;
          }
        };
        ;
        var _$clientIp_45 = {
          load: function(client) {
            if (client._config.collectUserIp)
              return;
            client.addOnError(function(event) {
              if (event._user && typeof event._user.id === "undefined")
                delete event._user.id;
              event._user = _$assign_11({
                id: "[REDACTED]"
              }, event._user);
              event.request = _$assign_11({
                clientIp: "[REDACTED]"
              }, event.request);
            });
          },
          configSchema: {
            collectUserIp: {
              defaultValue: function() {
                return true;
              },
              message: "should be true|false",
              validate: function(value) {
                return value === true || value === false;
              }
            }
          }
        };
        var _$consoleBreadcrumbs_46 = {};
        ;
        ;
        ;
        _$consoleBreadcrumbs_46.load = function(client) {
          var isDev = /^(local-)?dev(elopment)?$/.test(client._config.releaseStage);
          if (isDev || !client._isBreadcrumbTypeEnabled("log"))
            return;
          _$map_16(CONSOLE_LOG_METHODS, function(method) {
            var original = console[method];
            console[method] = function() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              client.leaveBreadcrumb("Console output", _$reduce_17(args, function(accum, arg, i) {
                var stringified = "[Unknown value]";
                try {
                  stringified = String(arg);
                } catch (e) {
                }
                if (stringified === "[object Object]") {
                  try {
                    stringified = JSON.stringify(arg);
                  } catch (e) {
                  }
                }
                accum["[" + i + "]"] = stringified;
                return accum;
              }, {
                severity: method.indexOf("group") === 0 ? "log" : method
              }), "log");
              original.apply(console, args);
            };
            console[method]._restore = function() {
              console[method] = original;
            };
          });
        };
        if (false) {
          _$consoleBreadcrumbs_46.destroy = function() {
            return CONSOLE_LOG_METHODS.forEach(function(method) {
              if (typeof console[method]._restore === "function")
                console[method]._restore();
            });
          };
        }
        var CONSOLE_LOG_METHODS = _$filter_12(["log", "debug", "info", "warn", "error"], function(method) {
          return typeof console !== "undefined" && typeof console[method] === "function";
        });
        ;
        ;
        ;
        var MAX_LINE_LENGTH = 200;
        var MAX_SCRIPT_LENGTH = 5e5;
        var _$inlineScriptContent_47 = function(doc, win) {
          if (doc === void 0) {
            doc = document;
          }
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              if (!client._config.trackInlineScripts)
                return;
              var originalLocation = win.location.href;
              var html = "";
              var isOldIe = !!doc.attachEvent;
              var DOMContentLoaded = isOldIe ? doc.readyState === "complete" : doc.readyState !== "loading";
              var getHtml = function() {
                return doc.documentElement.outerHTML;
              };
              html = getHtml();
              var prev = doc.onreadystatechange;
              doc.onreadystatechange = function() {
                if (doc.readyState === "interactive") {
                  html = getHtml();
                  DOMContentLoaded = true;
                }
                try {
                  prev.apply(this, arguments);
                } catch (e) {
                }
              };
              var _lastScript = null;
              var updateLastScript = function(script) {
                _lastScript = script;
              };
              var getCurrentScript = function() {
                var script = doc.currentScript || _lastScript;
                if (!script && !DOMContentLoaded) {
                  var scripts = doc.scripts || doc.getElementsByTagName("script");
                  script = scripts[scripts.length - 1];
                }
                return script;
              };
              var addSurroundingCode = function(lineNumber) {
                if (!DOMContentLoaded || !html)
                  html = getHtml();
                var htmlLines = ["<!-- DOC START -->"].concat(html.split("\n"));
                var zeroBasedLine = lineNumber - 1;
                var start = Math.max(zeroBasedLine - 3, 0);
                var end = Math.min(zeroBasedLine + 3, htmlLines.length);
                return _$reduce_17(htmlLines.slice(start, end), function(accum, line, i) {
                  accum[start + 1 + i] = line.length <= MAX_LINE_LENGTH ? line : line.substr(0, MAX_LINE_LENGTH);
                  return accum;
                }, {});
              };
              client.addOnError(function(event) {
                event.errors[0].stacktrace = _$filter_12(event.errors[0].stacktrace, function(f) {
                  return !/__trace__$/.test(f.method);
                });
                var frame = event.errors[0].stacktrace[0];
                if (frame && frame.file && frame.file.replace(/#.*$/, "") !== originalLocation.replace(/#.*$/, ""))
                  return;
                var currentScript = getCurrentScript();
                if (currentScript) {
                  var content = currentScript.innerHTML;
                  event.addMetadata("script", "content", content.length <= MAX_SCRIPT_LENGTH ? content : content.substr(0, MAX_SCRIPT_LENGTH));
                  if (frame && frame.lineNumber) {
                    frame.code = addSurroundingCode(frame.lineNumber);
                  }
                }
              }, true);
              var _map = _$map_16(["setTimeout", "setInterval", "setImmediate", "requestAnimationFrame"], function(fn) {
                return __proxy(win, fn, function(original) {
                  return __traceOriginalScript(original, function(args) {
                    return {
                      get: function() {
                        return args[0];
                      },
                      replace: function(fn2) {
                        args[0] = fn2;
                      }
                    };
                  });
                });
              }), _setTimeout = _map[0];
              _$map_16(["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], function(o) {
                if (!win[o] || !win[o].prototype || !Object.prototype.hasOwnProperty.call(win[o].prototype, "addEventListener"))
                  return;
                __proxy(win[o].prototype, "addEventListener", function(original) {
                  return __traceOriginalScript(original, eventTargetCallbackAccessor);
                });
                __proxy(win[o].prototype, "removeEventListener", function(original) {
                  return __traceOriginalScript(original, eventTargetCallbackAccessor, true);
                });
              });
              function __traceOriginalScript(fn, callbackAccessor, alsoCallOriginal) {
                if (alsoCallOriginal === void 0) {
                  alsoCallOriginal = false;
                }
                return function() {
                  var args = [].slice.call(arguments);
                  try {
                    var cba = callbackAccessor(args);
                    var cb = cba.get();
                    if (alsoCallOriginal)
                      fn.apply(this, args);
                    if (typeof cb !== "function")
                      return fn.apply(this, args);
                    if (cb.__trace__) {
                      cba.replace(cb.__trace__);
                    } else {
                      var script = getCurrentScript();
                      cb.__trace__ = function __trace__() {
                        updateLastScript(script);
                        _setTimeout(function() {
                          updateLastScript(null);
                        }, 0);
                        var ret = cb.apply(this, arguments);
                        updateLastScript(null);
                        return ret;
                      };
                      cb.__trace__.__trace__ = cb.__trace__;
                      cba.replace(cb.__trace__);
                    }
                  } catch (e) {
                  }
                  if (fn.apply)
                    return fn.apply(this, args);
                  switch (args.length) {
                    case 1:
                      return fn(args[0]);
                    case 2:
                      return fn(args[0], args[1]);
                    default:
                      return fn();
                  }
                };
              }
            },
            configSchema: {
              trackInlineScripts: {
                validate: function(value) {
                  return value === true || value === false;
                },
                defaultValue: function() {
                  return true;
                },
                message: "should be true|false"
              }
            }
          };
        };
        function __proxy(host, name2, replacer) {
          var original = host[name2];
          if (!original)
            return original;
          var replacement = replacer(original);
          host[name2] = replacement;
          return original;
        }
        function eventTargetCallbackAccessor(args) {
          var isEventHandlerObj = !!args[1] && typeof args[1].handleEvent === "function";
          return {
            get: function() {
              return isEventHandlerObj ? args[1].handleEvent : args[1];
            },
            replace: function(fn) {
              if (isEventHandlerObj) {
                args[1].handleEvent = fn;
              } else {
                args[1] = fn;
              }
            }
          };
        }
        var _$interactionBreadcrumbs_48 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              if (!("addEventListener" in win))
                return;
              if (!client._isBreadcrumbTypeEnabled("user"))
                return;
              win.addEventListener("click", function(event) {
                var targetText, targetSelector;
                try {
                  targetText = getNodeText(event.target);
                  targetSelector = getNodeSelector(event.target, win);
                } catch (e) {
                  targetText = "[hidden]";
                  targetSelector = "[hidden]";
                  client._logger.error("Cross domain error when tracking click event. See docs: https://tinyurl.com/yy3rn63z");
                }
                client.leaveBreadcrumb("UI click", {
                  targetText,
                  targetSelector
                }, "user");
              }, true);
            }
          };
        };
        var getNodeText = function(el) {
          var text = el.textContent || el.innerText || "";
          if (!text && (el.type === "submit" || el.type === "button"))
            text = el.value;
          text = text.replace(/^\s+|\s+$/g, "");
          return truncate(text, 140);
        };
        function getNodeSelector(el, win) {
          var parts = [el.tagName];
          if (el.id)
            parts.push("#" + el.id);
          if (el.className && el.className.length)
            parts.push("." + el.className.split(" ").join("."));
          if (!win.document.querySelectorAll || !Array.prototype.indexOf)
            return parts.join("");
          try {
            if (win.document.querySelectorAll(parts.join("")).length === 1)
              return parts.join("");
          } catch (e) {
            return parts.join("");
          }
          if (el.parentNode.childNodes.length > 1) {
            var index = Array.prototype.indexOf.call(el.parentNode.childNodes, el) + 1;
            parts.push(":nth-child(" + index + ")");
          }
          if (win.document.querySelectorAll(parts.join("")).length === 1)
            return parts.join("");
          if (el.parentNode)
            return getNodeSelector(el.parentNode, win) + " > " + parts.join("");
          return parts.join("");
        }
        function truncate(value, length) {
          var ommision = "(...)";
          if (value && value.length <= length)
            return value;
          return value.slice(0, length - ommision.length) + ommision;
        }
        var _$navigationBreadcrumbs_49 = {};
        _$navigationBreadcrumbs_49 = function(win) {
          if (win === void 0) {
            win = window;
          }
          var plugin = {
            load: function(client) {
              if (!("addEventListener" in win))
                return;
              if (!client._isBreadcrumbTypeEnabled("navigation"))
                return;
              var drop = function(name2) {
                return function() {
                  return client.leaveBreadcrumb(name2, {}, "navigation");
                };
              };
              win.addEventListener("pagehide", drop("Page hidden"), true);
              win.addEventListener("pageshow", drop("Page shown"), true);
              win.addEventListener("load", drop("Page loaded"), true);
              win.document.addEventListener("DOMContentLoaded", drop("DOMContentLoaded"), true);
              win.addEventListener("load", function() {
                return win.addEventListener("popstate", drop("Navigated back"), true);
              });
              win.addEventListener("hashchange", function(event) {
                var metadata = event.oldURL ? {
                  from: relativeLocation(event.oldURL, win),
                  to: relativeLocation(event.newURL, win),
                  state: getCurrentState(win)
                } : {
                  to: relativeLocation(win.location.href, win)
                };
                client.leaveBreadcrumb("Hash changed", metadata, "navigation");
              }, true);
              if (win.history.replaceState)
                wrapHistoryFn(client, win.history, "replaceState", win);
              if (win.history.pushState)
                wrapHistoryFn(client, win.history, "pushState", win);
            }
          };
          if (false) {
            plugin.destroy = function(win2) {
              if (win2 === void 0) {
                win2 = window;
              }
              win2.history.replaceState._restore();
              win2.history.pushState._restore();
            };
          }
          return plugin;
        };
        if (false) {
          _$navigationBreadcrumbs_49.destroy = function(win) {
            if (win === void 0) {
              win = window;
            }
            win.history.replaceState._restore();
            win.history.pushState._restore();
          };
        }
        var relativeLocation = function(url2, win) {
          var a = win.document.createElement("A");
          a.href = url2;
          return "" + a.pathname + a.search + a.hash;
        };
        var stateChangeToMetadata = function(win, state, title, url2) {
          var currentPath = relativeLocation(win.location.href, win);
          return {
            title,
            state,
            prevState: getCurrentState(win),
            to: url2 || currentPath,
            from: currentPath
          };
        };
        var wrapHistoryFn = function(client, target, fn, win) {
          var orig = target[fn];
          target[fn] = function(state, title, url2) {
            client.leaveBreadcrumb("History " + fn, stateChangeToMetadata(win, state, title, url2), "navigation");
            if (typeof client.resetEventCount === "function")
              client.resetEventCount();
            if (client._config.autoTrackSessions)
              client.startSession();
            orig.apply(target, [state, title].concat(url2 !== void 0 ? url2 : []));
          };
          if (false) {
            target[fn]._restore = function() {
              target[fn] = orig;
            };
          }
        };
        var getCurrentState = function(win) {
          try {
            return win.history.state;
          } catch (e) {
          }
        };
        var BREADCRUMB_TYPE = "request";
        var REQUEST_SETUP_KEY = "BS~~S";
        var REQUEST_URL_KEY = "BS~~U";
        var REQUEST_METHOD_KEY = "BS~~M";
        ;
        var _$networkBreadcrumbs_50 = function(_ignoredUrls, win) {
          if (_ignoredUrls === void 0) {
            _ignoredUrls = [];
          }
          if (win === void 0) {
            win = window;
          }
          var restoreFunctions = [];
          var plugin = {
            load: function(client) {
              if (!client._isBreadcrumbTypeEnabled("request"))
                return;
              var ignoredUrls = [client._config.endpoints.notify, client._config.endpoints.sessions].concat(_ignoredUrls);
              monkeyPatchXMLHttpRequest();
              monkeyPatchFetch();
              function monkeyPatchXMLHttpRequest() {
                if (!("addEventListener" in win.XMLHttpRequest.prototype))
                  return;
                var nativeOpen = win.XMLHttpRequest.prototype.open;
                win.XMLHttpRequest.prototype.open = function open(method, url2) {
                  this[REQUEST_URL_KEY] = url2;
                  this[REQUEST_METHOD_KEY] = method;
                  if (this[REQUEST_SETUP_KEY]) {
                    this.removeEventListener("load", handleXHRLoad);
                    this.removeEventListener("error", handleXHRError);
                  }
                  this.addEventListener("load", handleXHRLoad);
                  this.addEventListener("error", handleXHRError);
                  this[REQUEST_SETUP_KEY] = true;
                  nativeOpen.apply(this, arguments);
                };
                if (false) {
                  restoreFunctions.push(function() {
                    win.XMLHttpRequest.prototype.open = nativeOpen;
                  });
                }
              }
              function handleXHRLoad() {
                var url2 = this[REQUEST_URL_KEY];
                if (url2 === void 0) {
                  client._logger.warn("The request URL is no longer present on this XMLHttpRequest. A breadcrumb cannot be left for this request.");
                  return;
                }
                if (typeof url2 === "string" && _$includes_13(ignoredUrls, url2.replace(/\?.*$/, ""))) {
                  return;
                }
                var metadata = {
                  status: this.status,
                  request: this[REQUEST_METHOD_KEY] + " " + this[REQUEST_URL_KEY]
                };
                if (this.status >= 400) {
                  client.leaveBreadcrumb("XMLHttpRequest failed", metadata, BREADCRUMB_TYPE);
                } else {
                  client.leaveBreadcrumb("XMLHttpRequest succeeded", metadata, BREADCRUMB_TYPE);
                }
              }
              function handleXHRError() {
                var url2 = this[REQUEST_URL_KEY];
                if (url2 === void 0) {
                  client._logger.warn("The request URL is no longer present on this XMLHttpRequest. A breadcrumb cannot be left for this request.");
                  return;
                }
                if (typeof url2 === "string" && _$includes_13(ignoredUrls, url2.replace(/\?.*$/, ""))) {
                  return;
                }
                client.leaveBreadcrumb("XMLHttpRequest error", {
                  request: this[REQUEST_METHOD_KEY] + " " + this[REQUEST_URL_KEY]
                }, BREADCRUMB_TYPE);
              }
              function monkeyPatchFetch() {
                if (!("fetch" in win) || win.fetch.polyfill)
                  return;
                var oldFetch = win.fetch;
                win.fetch = function fetch() {
                  var _arguments = arguments;
                  var urlOrRequest = arguments[0];
                  var options = arguments[1];
                  var method;
                  var url2 = null;
                  if (urlOrRequest && typeof urlOrRequest === "object") {
                    url2 = urlOrRequest.url;
                    if (options && "method" in options) {
                      method = options.method;
                    } else if (urlOrRequest && "method" in urlOrRequest) {
                      method = urlOrRequest.method;
                    }
                  } else {
                    url2 = urlOrRequest;
                    if (options && "method" in options) {
                      method = options.method;
                    }
                  }
                  if (method === void 0) {
                    method = "GET";
                  }
                  return new Promise(function(resolve, reject) {
                    oldFetch.apply(void 0, _arguments).then(function(response) {
                      handleFetchSuccess(response, method, url2);
                      resolve(response);
                    })["catch"](function(error) {
                      handleFetchError(method, url2);
                      reject(error);
                    });
                  });
                };
                if (false) {
                  restoreFunctions.push(function() {
                    win.fetch = oldFetch;
                  });
                }
              }
              var handleFetchSuccess = function(response, method, url2) {
                var metadata = {
                  status: response.status,
                  request: method + " " + url2
                };
                if (response.status >= 400) {
                  client.leaveBreadcrumb("fetch() failed", metadata, BREADCRUMB_TYPE);
                } else {
                  client.leaveBreadcrumb("fetch() succeeded", metadata, BREADCRUMB_TYPE);
                }
              };
              var handleFetchError = function(method, url2) {
                client.leaveBreadcrumb("fetch() error", {
                  request: method + " " + url2
                }, BREADCRUMB_TYPE);
              };
            }
          };
          if (false) {
            plugin.destroy = function() {
              restoreFunctions.forEach(function(fn) {
                return fn();
              });
              restoreFunctions = [];
            };
          }
          return plugin;
        };
        ;
        var _$throttle_51 = {
          load: function(client) {
            var n = 0;
            client.addOnError(function(event) {
              if (n >= client._config.maxEvents)
                return false;
              n++;
            });
            client.resetEventCount = function() {
              n = 0;
            };
          },
          configSchema: {
            maxEvents: {
              defaultValue: function() {
                return 10;
              },
              message: "should be a positive integer \u2264100",
              validate: function(val) {
                return _$intRange_23(1, 100)(val);
              }
            }
          }
        };
        var _$stripQueryString_52 = {};
        ;
        ;
        _$stripQueryString_52 = {
          load: function(client) {
            client.addOnError(function(event) {
              var allFrames = _$reduce_17(event.errors, function(accum, er) {
                return accum.concat(er.stacktrace);
              }, []);
              _$map_16(allFrames, function(frame) {
                frame.file = strip(frame.file);
              });
            });
          }
        };
        var strip = _$stripQueryString_52._strip = function(str) {
          return typeof str === "string" ? str.replace(/\?.*$/, "").replace(/#.*$/, "") : str;
        };
        var _$onerror_53 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              if (!client._config.autoDetectErrors)
                return;
              if (!client._config.enabledErrorTypes.unhandledExceptions)
                return;
              function onerror(messageOrEvent, url2, lineNo, charNo, error) {
                if (lineNo === 0 && /Script error\.?/.test(messageOrEvent)) {
                  client._logger.warn("Ignoring cross-domain or eval script error. See docs: https://tinyurl.com/yy3rn63z");
                } else {
                  var handledState = {
                    severity: "error",
                    unhandled: true,
                    severityReason: {
                      type: "unhandledException"
                    }
                  };
                  var event;
                  if (error) {
                    event = client.Event.create(error, true, handledState, "window onerror", 1);
                    decorateStack(event.errors[0].stacktrace, url2, lineNo, charNo);
                  } else if (typeof messageOrEvent === "object" && messageOrEvent !== null && (!url2 || typeof url2 !== "string") && !lineNo && !charNo && !error) {
                    var name2 = messageOrEvent.type ? "Event: " + messageOrEvent.type : "Error";
                    var message = messageOrEvent.message || messageOrEvent.detail || "";
                    event = client.Event.create({
                      name: name2,
                      message
                    }, true, handledState, "window onerror", 1);
                    event.originalError = messageOrEvent;
                    event.addMetadata("window onerror", {
                      event: messageOrEvent,
                      extraParameters: url2
                    });
                  } else {
                    event = client.Event.create(messageOrEvent, true, handledState, "window onerror", 1);
                    decorateStack(event.errors[0].stacktrace, url2, lineNo, charNo);
                  }
                  client._notify(event);
                }
                if (typeof prevOnError === "function")
                  prevOnError.apply(this, arguments);
              }
              var prevOnError = win.onerror;
              win.onerror = onerror;
            }
          };
        };
        var decorateStack = function(stack, url2, lineNo, charNo) {
          if (!stack[0])
            stack.push({});
          var culprit = stack[0];
          if (!culprit.file && typeof url2 === "string")
            culprit.file = url2;
          if (!culprit.lineNumber && isActualNumber(lineNo))
            culprit.lineNumber = lineNo;
          if (!culprit.columnNumber) {
            if (isActualNumber(charNo)) {
              culprit.columnNumber = charNo;
            } else if (window.event && isActualNumber(window.event.errorCharacter)) {
              culprit.columnNumber = window.event.errorCharacter;
            }
          }
        };
        var isActualNumber = function(n) {
          return typeof n === "number" && String.call(n) !== "NaN";
        };
        ;
        ;
        var _listener;
        var _$unhandledRejection_54 = function(win) {
          if (win === void 0) {
            win = window;
          }
          var plugin = {
            load: function(client) {
              if (!client._config.autoDetectErrors || !client._config.enabledErrorTypes.unhandledRejections)
                return;
              var listener = function(evt) {
                var error = evt.reason;
                var isBluebird = false;
                try {
                  if (evt.detail && evt.detail.reason) {
                    error = evt.detail.reason;
                    isBluebird = true;
                  }
                } catch (e) {
                }
                var event = client.Event.create(error, false, {
                  severity: "error",
                  unhandled: true,
                  severityReason: {
                    type: "unhandledPromiseRejection"
                  }
                }, "unhandledrejection handler", 1, client._logger);
                if (isBluebird) {
                  _$map_16(event.errors[0].stacktrace, fixBluebirdStacktrace(error));
                }
                client._notify(event, function(event2) {
                  if (_$iserror_19(event2.originalError) && !event2.originalError.stack) {
                    var _event$addMetadata;
                    event2.addMetadata("unhandledRejection handler", (_event$addMetadata = {}, _event$addMetadata[Object.prototype.toString.call(event2.originalError)] = {
                      name: event2.originalError.name,
                      message: event2.originalError.message,
                      code: event2.originalError.code
                    }, _event$addMetadata));
                  }
                });
              };
              if ("addEventListener" in win) {
                win.addEventListener("unhandledrejection", listener);
              } else {
                win.onunhandledrejection = function(reason, promise) {
                  listener({
                    detail: {
                      reason,
                      promise
                    }
                  });
                };
              }
              _listener = listener;
            }
          };
          if (false) {
            plugin.destroy = function(win2) {
              if (win2 === void 0) {
                win2 = window;
              }
              if (_listener) {
                if ("addEventListener" in win2) {
                  win2.removeEventListener("unhandledrejection", _listener);
                } else {
                  win2.onunhandledrejection = null;
                }
              }
              _listener = null;
            };
          }
          return plugin;
        };
        var fixBluebirdStacktrace = function(error) {
          return function(frame) {
            if (frame.file === error.toString())
              return;
            if (frame.method) {
              frame.method = frame.method.replace(/^\s+/, "");
            }
          };
        };
        var _$notifier_2 = {};
        var name = "Bugsnag JavaScript";
        var version = "7.14.1";
        var url = "https://github.com/bugsnag/bugsnag-js";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var __schema_2 = _$assign_11({}, _$config_5.schema, _$config_1);
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var Bugsnag3 = {
          _client: null,
          createClient: function(opts) {
            if (typeof opts === "string")
              opts = {
                apiKey: opts
              };
            if (!opts)
              opts = {};
            var internalPlugins = [
              _$app_37,
              _$device_39(),
              _$context_38(),
              _$request_43(),
              _$throttle_51,
              _$session_44,
              _$clientIp_45,
              _$stripQueryString_52,
              _$onerror_53(),
              _$unhandledRejection_54(),
              _$navigationBreadcrumbs_49(),
              _$interactionBreadcrumbs_48(),
              _$networkBreadcrumbs_50(),
              _$consoleBreadcrumbs_46,
              _$inlineScriptContent_47()
            ];
            var bugsnag = new _$Client_4(opts, __schema_2, internalPlugins, {
              name,
              version,
              url
            });
            bugsnag._setDelivery(window.XDomainRequest ? _$delivery_35 : _$delivery_36);
            bugsnag._logger.debug("Loaded!");
            bugsnag.leaveBreadcrumb("Bugsnag loaded", {}, "state");
            return bugsnag._config.autoTrackSessions ? bugsnag.startSession() : bugsnag;
          },
          start: function(opts) {
            if (Bugsnag3._client) {
              Bugsnag3._client._logger.warn("Bugsnag.start() was called more than once. Ignoring.");
              return Bugsnag3._client;
            }
            Bugsnag3._client = Bugsnag3.createClient(opts);
            return Bugsnag3._client;
          }
        };
        _$map_16(["resetEventCount"].concat(_$keys_15(_$Client_4.prototype)), function(m) {
          if (/^_/.test(m))
            return;
          Bugsnag3[m] = function() {
            if (!Bugsnag3._client)
              return console.log("Bugsnag." + m + "() was called before Bugsnag.start()");
            Bugsnag3._client._depth += 1;
            var ret = Bugsnag3._client[m].apply(Bugsnag3._client, arguments);
            Bugsnag3._client._depth -= 1;
            return ret;
          };
        });
        _$notifier_2 = Bugsnag3;
        _$notifier_2.Client = _$Client_4;
        _$notifier_2.Event = _$Event_6;
        _$notifier_2.Session = _$Session_34;
        _$notifier_2.Breadcrumb = _$Breadcrumb_3;
        _$notifier_2["default"] = Bugsnag3;
        return _$notifier_2;
      });
    }
  });

  // node_modules/@bugsnag/js/browser/notifier.js
  var require_notifier = __commonJS({
    "node_modules/@bugsnag/js/browser/notifier.js"(exports, module) {
      module.exports = require_bugsnag();
    }
  });

  // node_modules/@bugsnag/plugin-react/dist/bugsnag-react.js
  var require_bugsnag_react = __commonJS({
    "node_modules/@bugsnag/plugin-react/dist/bugsnag-react.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.BugsnagPluginReact = f();
        }
      })(function() {
        var define2, module2, exports2;
        var _$src_1 = {};
        function _extends() {
          _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
          return _extends.apply(this, arguments);
        }
        function _assertThisInitialized(self2) {
          if (self2 === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return self2;
        }
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        _$src_1 = /* @__PURE__ */ function() {
          function BugsnagPluginReact2() {
            var globalReact = typeof window !== "undefined" && window.React;
            this.name = "react";
            this.lazy = arguments.length === 0 && !globalReact;
            if (!this.lazy) {
              this.React = (arguments.length <= 0 ? void 0 : arguments[0]) || globalReact;
              if (!this.React)
                throw new Error("@bugsnag/plugin-react reference to `React` was undefined");
            }
          }
          var _proto = BugsnagPluginReact2.prototype;
          _proto.load = function load(client) {
            if (!this.lazy) {
              var ErrorBoundary = createClass(this.React, client);
              ErrorBoundary.createErrorBoundary = function() {
                return ErrorBoundary;
              };
              return ErrorBoundary;
            }
            var BugsnagPluginReactLazyInitializer = function() {
              throw new Error("@bugsnag/plugin-react was used incorrectly. Valid usage is as follows:\nPass React to the plugin constructor\n\n  `Bugsnag.start({ plugins: [new BugsnagPluginReact(React)] })`\nand then call `const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary()`\n\nOr if React is not available until after Bugsnag has started,\nconstruct the plugin with no arguments\n  `Bugsnag.start({ plugins: [new BugsnagPluginReact()] })`,\nthen pass in React when available to construct your error boundary\n  `const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)`");
            };
            BugsnagPluginReactLazyInitializer.createErrorBoundary = function(React3) {
              if (!React3)
                throw new Error("@bugsnag/plugin-react reference to `React` was undefined");
              return createClass(React3, client);
            };
            return BugsnagPluginReactLazyInitializer;
          };
          return BugsnagPluginReact2;
        }();
        var formatComponentStack = function(str) {
          var lines = str.split(/\s*\n\s*/g);
          var ret = "";
          for (var line = 0, len = lines.length; line < len; line++) {
            if (lines[line].length)
              ret += (ret.length ? "\n" : "") + lines[line];
          }
          return ret;
        };
        var createClass = function(React3, client) {
          return /* @__PURE__ */ function(_React$Component) {
            _inheritsLoose(ErrorBoundary, _React$Component);
            function ErrorBoundary(props) {
              var _this;
              _this = _React$Component.call(this, props) || this;
              _this.state = {
                error: null,
                info: null
              };
              _this.handleClearError = _this.handleClearError.bind(_assertThisInitialized(_this));
              return _this;
            }
            var _proto2 = ErrorBoundary.prototype;
            _proto2.handleClearError = function handleClearError() {
              this.setState({
                error: null,
                info: null
              });
            };
            _proto2.componentDidCatch = function componentDidCatch(error, info) {
              var onError = this.props.onError;
              var handledState = {
                severity: "error",
                unhandled: true,
                severityReason: {
                  type: "unhandledException"
                }
              };
              var event = client.Event.create(error, true, handledState, 1);
              if (info && info.componentStack)
                info.componentStack = formatComponentStack(info.componentStack);
              event.addMetadata("react", info);
              client._notify(event, onError);
              this.setState({
                error,
                info
              });
            };
            _proto2.render = function render2() {
              var error = this.state.error;
              if (error) {
                var FallbackComponent = this.props.FallbackComponent;
                if (FallbackComponent)
                  return React3.createElement(FallbackComponent, _extends({}, this.state, {
                    clearError: this.handleClearError
                  }));
                return null;
              }
              return this.props.children;
            };
            return ErrorBoundary;
          }(React3.Component);
        };
        _$src_1.formatComponentStack = formatComponentStack;
        _$src_1["default"] = _$src_1;
        return _$src_1;
      });
    }
  });

  // src/front/index.tsx
  var React2 = __toESM(require_react());
  var ReactDOM = __toESM(require_react_dom());
  var import_js2 = __toESM(require_notifier());

  // src/front/main.tsx
  var React = __toESM(require_react());
  var import_react = __toESM(require_react());

  // src/share/messages.ts
  function isSuccessMessage(x) {
    if (!x) {
      return false;
    }
    return typeof x["id"] === "string" && typeof x["url"] === "string";
  }
  function isFailedMessage(x) {
    if (!x) {
      return false;
    }
    return typeof x["id"] === "string" && !x["error"] && typeof x["error"]["type"] === "string";
  }
  function isProgressMessage(x) {
    if (!x) {
      return false;
    }
    return typeof x["id"] === "string" && (x["stage"] === "unzip" || x["stage"] === "convert" || x["stage"] === "compaction" || x["stage"] === "zip") && typeof x["progress"] === "number" && typeof x["total"] === "number";
  }

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default = validate;

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  var i;
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var stringify_default = stringify;

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default = v4;

  // src/front/main.tsx
  var import_js = __toESM(require_notifier());
  var useForceUpdate = () => {
    const [counter, setCounter] = (0, import_react.useReducer)((prev, _) => prev + 1, 0);
    return () => setCounter(counter + 1);
  };
  var MainComponent = () => {
    const state = (0, import_react.useRef)({
      unzip: 0,
      convert: 0,
      convertTotal: 1,
      compaction: 0,
      zip: 0
    });
    const forceUpdate = useForceUpdate();
    const onChange = (ev) => {
      const files = ev.target.files;
      if (!files || files.length !== 1) {
        console.error("no file selected, or one or more files selected");
        return;
      }
      const worker = new Worker("script/conv.js");
      const id = v4_default();
      const file = files.item(0);
      const message = { file, id };
      console.log(`[${id}] front: posting StartMessage`);
      state.current = {
        unzip: 0,
        convert: 0,
        convertTotal: 1,
        compaction: 0,
        zip: 0
      };
      worker.postMessage(message);
      worker.onmessage = (msg) => {
        if (isSuccessMessage(msg.data)) {
          const { id: id2, url } = msg.data;
          console.log(`[${id2}] front: received SuccessMessage`);
          const link = document.createElement("a");
          const dot = file.name.lastIndexOf(".");
          let download = "world.mcworld";
          if (dot > 0) {
            download = file.name.substring(0, dot) + ".mcworld";
          }
          link.download = download;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        } else if (isProgressMessage(msg.data)) {
          const m = msg.data;
          switch (m.stage) {
            case "unzip":
              state.current = { ...state.current, unzip: m.progress / m.total };
              break;
            case "convert":
              state.current = {
                ...state.current,
                convert: m.progress,
                convertTotal: m.total
              };
              break;
            case "compaction":
              state.current = {
                ...state.current,
                compaction: m.progress / m.total
              };
              break;
            case "zip":
              state.current = { ...state.current, zip: m.progress / m.total };
              break;
          }
          forceUpdate();
        } else if (isFailedMessage(msg.data)) {
          import_js.default.notify(msg.data.error);
          console.error(`front: received FailedMessage; e=`, msg.data.error);
        }
      };
    };
    const { unzip, compaction, zip } = state.current;
    const convert = Math.floor(state.current.convert / state.current.convertTotal * 100);
    const chunks = Math.floor(state.current.convert);
    return /* @__PURE__ */ React.createElement("div", {
      className: "main"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "header"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "appLabel"
    }, "je2be-web")), /* @__PURE__ */ React.createElement("div", {
      className: "container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "inputZip"
    }, /* @__PURE__ */ React.createElement("label", {
      className: "inputZipLabel",
      htmlFor: "input_zip"
    }, "Choose a zip file of Java Edition world data"), /* @__PURE__ */ React.createElement("input", {
      name: "input_zip",
      type: "file",
      onChange,
      accept: ".zip"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "progressContainer"
    }, /* @__PURE__ */ React.createElement(Progress, {
      progress: unzip,
      label: "Unzip"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "progress"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "progressBar",
      style: { width: `${convert}%` },
      "data-completed": convert === 100
    }), /* @__PURE__ */ React.createElement("div", {
      className: "progressLabel"
    }, "Conversion: ", chunks, " chunks, ", convert, "% done")), /* @__PURE__ */ React.createElement(Progress, {
      progress: compaction,
      label: "LevelDB Compaction"
    }), /* @__PURE__ */ React.createElement(Progress, {
      progress: zip,
      label: "Zip"
    }))));
  };
  var Progress = ({
    progress,
    label
  }) => {
    const p = Math.floor(progress * 100);
    return /* @__PURE__ */ React.createElement("div", {
      className: "progress"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "progressBar",
      style: { width: `${p}%` },
      "data-completed": p === 100
    }), /* @__PURE__ */ React.createElement("div", {
      className: "progressLabel"
    }, label, ": ", p, "% done"));
  };

  // src/front/index.tsx
  var import_plugin_react = __toESM(require_bugsnag_react());
  document.addEventListener("DOMContentLoaded", () => {
    import_js2.default.start({
      apiKey: "0b173cbc2086cd69b797414d4cceafbb",
      plugins: [new import_plugin_react.default()],
      appVersion: "1.0.0"
    });
    const ErrorBoundary = import_js2.default.getPlugin("react").createErrorBoundary(React2);
    ReactDOM.render(/* @__PURE__ */ React2.createElement(ErrorBoundary, null, /* @__PURE__ */ React2.createElement(MainComponent, null)), document.getElementById("app"));
  });
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
