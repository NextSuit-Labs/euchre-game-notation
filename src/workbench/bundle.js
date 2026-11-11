"use strict";
var EuchreNotation = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
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
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/ajv/dist/runtime/ucs2length.js
  var require_ucs2length = __commonJS({
    "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function ucs2length(str) {
        const len = str.length;
        let length = 0;
        let pos = 0;
        let value;
        while (pos < len) {
          length++;
          value = str.charCodeAt(pos++);
          if (value >= 55296 && value <= 56319 && pos < len) {
            value = str.charCodeAt(pos);
            if ((value & 64512) === 56320)
              pos++;
          }
        }
        return length;
      }
      exports.default = ucs2length;
      ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
    }
  });

  // node_modules/ajv-formats/dist/formats.js
  var require_formats = __commonJS({
    "node_modules/ajv-formats/dist/formats.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
      function fmtDef(validate, compare) {
        return { validate, compare };
      }
      exports.fullFormats = {
        // date: http://tools.ietf.org/html/rfc3339#section-5.6
        date: fmtDef(date, compareDate),
        // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
        time: fmtDef(getTime(true), compareTime),
        "date-time": fmtDef(getDateTime(true), compareDateTime),
        "iso-time": fmtDef(getTime(), compareIsoTime),
        "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
        // duration: https://tools.ietf.org/html/rfc3339#appendix-A
        duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
        uri,
        "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
        // uri-template: https://tools.ietf.org/html/rfc6570
        "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
        // For the source: https://gist.github.com/dperini/729294
        // For test cases: https://mathiasbynens.be/demo/url-regex
        url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
        hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
        // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
        ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
        ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
        regex,
        // uuid: http://tools.ietf.org/html/rfc4122
        uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
        // JSON-pointer: https://tools.ietf.org/html/rfc6901
        // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
        "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
        "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
        // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
        "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
        // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
        // byte: https://github.com/miguelmota/is-base64
        byte,
        // signed 32 bit integer
        int32: { type: "number", validate: validateInt32 },
        // signed 64 bit integer
        int64: { type: "number", validate: validateInt64 },
        // C-type float
        float: { type: "number", validate: validateNumber },
        // C-type double
        double: { type: "number", validate: validateNumber },
        // hint to the UI to hide input strings
        password: true,
        // unchecked string payload
        binary: true
      };
      exports.fastFormats = {
        ...exports.fullFormats,
        date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
        time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
        "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
        "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
        "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
        // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
        uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
        "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
        // email (sources from jsen validator):
        // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
        // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
        email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
      };
      exports.formatNames = Object.keys(exports.fullFormats);
      function isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      }
      var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
      var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function date(str) {
        const matches = DATE.exec(str);
        if (!matches)
          return false;
        const year = +matches[1];
        const month = +matches[2];
        const day = +matches[3];
        return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
      }
      function compareDate(d1, d2) {
        if (!(d1 && d2))
          return void 0;
        if (d1 > d2)
          return 1;
        if (d1 < d2)
          return -1;
        return 0;
      }
      var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
      function getTime(strictTimeZone) {
        return function time(str) {
          const matches = TIME.exec(str);
          if (!matches)
            return false;
          const hr = +matches[1];
          const min = +matches[2];
          const sec = +matches[3];
          const tz = matches[4];
          const tzSign = matches[5] === "-" ? -1 : 1;
          const tzH = +(matches[6] || 0);
          const tzM = +(matches[7] || 0);
          if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
            return false;
          if (hr <= 23 && min <= 59 && sec < 60)
            return true;
          const utcMin = min - tzM * tzSign;
          const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
          return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
        };
      }
      function compareTime(s1, s2) {
        if (!(s1 && s2))
          return void 0;
        const t1 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf();
        const t2 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
        if (!(t1 && t2))
          return void 0;
        return t1 - t2;
      }
      function compareIsoTime(t1, t2) {
        if (!(t1 && t2))
          return void 0;
        const a1 = TIME.exec(t1);
        const a2 = TIME.exec(t2);
        if (!(a1 && a2))
          return void 0;
        t1 = a1[1] + a1[2] + a1[3];
        t2 = a2[1] + a2[2] + a2[3];
        if (t1 > t2)
          return 1;
        if (t1 < t2)
          return -1;
        return 0;
      }
      var DATE_TIME_SEPARATOR = /t|\s/i;
      function getDateTime(strictTimeZone) {
        const time = getTime(strictTimeZone);
        return function date_time(str) {
          const dateTime = str.split(DATE_TIME_SEPARATOR);
          return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
        };
      }
      function compareDateTime(dt1, dt2) {
        if (!(dt1 && dt2))
          return void 0;
        const d1 = new Date(dt1).valueOf();
        const d2 = new Date(dt2).valueOf();
        if (!(d1 && d2))
          return void 0;
        return d1 - d2;
      }
      function compareIsoDateTime(dt1, dt2) {
        if (!(dt1 && dt2))
          return void 0;
        const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
        const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
        const res = compareDate(d1, d2);
        if (res === void 0)
          return void 0;
        return res || compareTime(t1, t2);
      }
      var NOT_URI_FRAGMENT = /\/|:/;
      var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
      function uri(str) {
        return NOT_URI_FRAGMENT.test(str) && URI.test(str);
      }
      var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
      function byte(str) {
        BYTE.lastIndex = 0;
        return BYTE.test(str);
      }
      var MIN_INT32 = -(2 ** 31);
      var MAX_INT32 = 2 ** 31 - 1;
      function validateInt32(value) {
        return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
      }
      function validateInt64(value) {
        return Number.isInteger(value);
      }
      function validateNumber() {
        return true;
      }
      var Z_ANCHOR = /[^\\]\\Z/;
      function regex(str) {
        if (Z_ANCHOR.test(str))
          return false;
        try {
          new RegExp(str);
          return true;
        } catch (e) {
          return false;
        }
      }
    }
  });

  // src/workbench/browser-shims.js
  var require_browser_shims = __commonJS({
    "src/workbench/browser-shims.js"(exports, module) {
      "use strict";
      module.exports = {
        readFileSync: () => {
          throw new Error("fs.readFileSync is not available in browser. Use FileReader / Blob.");
        },
        writeFileSync: () => {
          throw new Error("fs.writeFileSync is not available in browser. Use Blob / File download.");
        },
        existsSync: () => false,
        unlinkSync: () => {
        },
        join: (...args) => args.filter(Boolean).join("/"),
        resolve: (...args) => args.filter(Boolean).join("/"),
        dirname: (p) => p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : ".",
        basename: (p, ext) => {
          const base = p.split("/").pop() || "";
          return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base;
        },
        extname: (p) => {
          const idx = p.lastIndexOf(".");
          return idx >= 0 ? p.slice(idx) : "";
        }
      };
    }
  });

  // node_modules/protobufjs/src/util/aspromise.js
  var require_aspromise = __commonJS({
    "node_modules/protobufjs/src/util/aspromise.js"(exports, module) {
      "use strict";
      module.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }
  });

  // node_modules/protobufjs/src/util/base64.js
  var require_base64 = __commonJS({
    "node_modules/protobufjs/src/util/base64.js"(exports) {
      "use strict";
      var base64 = exports;
      base64.length = function length(string) {
        var p = string.length;
        if (!p)
          return 0;
        while (p > 0 && string.charAt(p - 1) === "=")
          --p;
        return Math.floor(p * 3 / 4);
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      s64[45] = 62;
      s64[95] = 63;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      var base64Re = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      var base64UrlRe = /[-_]/;
      var base64UrlNoPaddingRe = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}(?:==)?|[A-Za-z0-9_-]{3}=?)?$/;
      base64.test = function test(string) {
        return base64Re.test(string) || base64UrlRe.test(string) && base64UrlNoPaddingRe.test(string);
      };
    }
  });

  // node_modules/protobufjs/src/util/eventemitter.js
  var require_eventemitter = __commonJS({
    "node_modules/protobufjs/src/util/eventemitter.js"(exports, module) {
      "use strict";
      module.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = /* @__PURE__ */ Object.create(null);
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = /* @__PURE__ */ Object.create(null);
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            if (!listeners)
              return this;
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    }
  });

  // node_modules/protobufjs/src/util/float.js
  var require_float = __commonJS({
    "node_modules/protobufjs/src/util/float.js"(exports, module) {
      "use strict";
      module.exports = factory(factory);
      function factory(exports2) {
        if (typeof Float32Array !== "undefined") (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports2.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports2.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports2.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports2.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
        else (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports2.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports2.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports2.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports2.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
        if (typeof Float64Array !== "undefined") (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports2.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports2.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports2.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports2.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
        else (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports2.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports2.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports2.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports2.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports2;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // node_modules/protobufjs/src/util/utf8.js
  var require_utf8 = __commonJS({
    "node_modules/protobufjs/src/util/utf8.js"(exports) {
      "use strict";
      var utf8 = exports;
      var replacementChar = "\uFFFD";
      var looseDecoder = new TextDecoder("utf-8", { ignoreBOM: true });
      var strictDecoder;
      var TEXT_DECODER_MIN_LENGTH = 64;
      try {
        strictDecoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
      } catch (err) {
        strictDecoder = looseDecoder;
      }
      utf8.length = function utf8_length(string) {
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      function utf8_read_js(buffer, start, end, str) {
        for (var i = start; i < end; ) {
          var t = buffer[i++];
          if (t <= 127) {
            str += String.fromCharCode(t);
          } else if (t >= 192 && t < 224) {
            var c2 = (t & 31) << 6 | buffer[i++] & 63;
            str += c2 >= 128 ? String.fromCharCode(c2) : replacementChar;
          } else if (t >= 224 && t < 240) {
            var c3 = (t & 15) << 12 | (buffer[i++] & 63) << 6 | buffer[i++] & 63;
            str += c3 >= 2048 ? String.fromCharCode(c3) : replacementChar;
          } else if (t >= 240) {
            var t2 = (t & 7) << 18 | (buffer[i++] & 63) << 12 | (buffer[i++] & 63) << 6 | buffer[i++] & 63;
            if (t2 < 65536 || t2 > 1114111)
              str += replacementChar;
            else {
              t2 -= 65536;
              str += String.fromCharCode(55296 + (t2 >> 10));
              str += String.fromCharCode(56320 + (t2 & 1023));
            }
          }
        }
        return str;
      }
      function utf8_read_decoder(decoder, buffer, start, end) {
        var source = start === 0 && end === buffer.length ? buffer : buffer.subarray(start, end);
        return decoder.decode(source);
      }
      utf8.read = function utf8_read_loose(buffer, start, end) {
        if (end - start < 1)
          return "";
        if (end - start >= TEXT_DECODER_MIN_LENGTH)
          return utf8_read_decoder(looseDecoder, buffer, start, end);
        var str = "", i = start, c1, c2, c3, c4, c5, c6, c7, c8;
        for (; i + 7 < end; i += 8) {
          c1 = buffer[i];
          c2 = buffer[i + 1];
          c3 = buffer[i + 2];
          c4 = buffer[i + 3];
          c5 = buffer[i + 4];
          c6 = buffer[i + 5];
          c7 = buffer[i + 6];
          c8 = buffer[i + 7];
          if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) & 128)
            return utf8_read_js(buffer, i, end, str);
          str += String.fromCharCode(c1, c2, c3, c4, c5, c6, c7, c8);
        }
        for (; i < end; ++i) {
          c1 = buffer[i];
          if (c1 & 128)
            return utf8_read_js(buffer, i, end, str);
          str += String.fromCharCode(c1);
        }
        return str;
      };
      utf8.readStrict = function utf8_read_strict(buffer, start, end) {
        if (end - start < 1)
          return "";
        if (end - start >= TEXT_DECODER_MIN_LENGTH)
          return utf8_read_decoder(strictDecoder, buffer, start, end);
        var str = "", i = start, c1, c2, c3, c4, c5, c6, c7, c8;
        for (; i + 7 < end; i += 8) {
          c1 = buffer[i];
          c2 = buffer[i + 1];
          c3 = buffer[i + 2];
          c4 = buffer[i + 3];
          c5 = buffer[i + 4];
          c6 = buffer[i + 5];
          c7 = buffer[i + 6];
          c8 = buffer[i + 7];
          if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) & 128)
            return str + utf8_read_decoder(strictDecoder, buffer, i, end);
          str += String.fromCharCode(c1, c2, c3, c4, c5, c6, c7, c8);
        }
        for (; i < end; ++i) {
          c1 = buffer[i];
          if (c1 & 128)
            return str + utf8_read_decoder(strictDecoder, buffer, i, end);
          str += String.fromCharCode(c1);
        }
        return str;
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // node_modules/protobufjs/src/util/pool.js
  var require_pool = __commonJS({
    "node_modules/protobufjs/src/util/pool.js"(exports, module) {
      "use strict";
      module.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports, module) {
      "use strict";
      module.exports = LongBits;
      var Long;
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (typeof value === "string" || value instanceof String) {
          if (Long)
            value = Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return Long ? new Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
      LongBits._configure = function(Long_) {
        Long = Long_;
      };
    }
  });

  // node_modules/long/umd/index.js
  var require_umd = __commonJS({
    "node_modules/long/umd/index.js"(exports, module) {
      (function(global2, factory) {
        function preferDefault(exports2) {
          return exports2.default || exports2;
        }
        if (typeof define === "function" && define.amd) {
          define([], function() {
            var exports2 = {};
            factory(exports2);
            return preferDefault(exports2);
          });
        } else if (typeof exports === "object") {
          factory(exports);
          if (typeof module === "object") module.exports = preferDefault(exports);
        } else {
          (function() {
            var exports2 = {};
            factory(exports2);
            global2.Long = preferDefault(exports2);
          })();
        }
      })(
        typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports,
        function(_exports) {
          "use strict";
          Object.defineProperty(_exports, "__esModule", {
            value: true
          });
          _exports.default = void 0;
          var wasm = null;
          try {
            wasm = new WebAssembly.Instance(
              new WebAssembly.Module(
                new Uint8Array([
                  // \0asm
                  0,
                  97,
                  115,
                  109,
                  // version 1
                  1,
                  0,
                  0,
                  0,
                  // section "type"
                  1,
                  13,
                  2,
                  // 0, () => i32
                  96,
                  0,
                  1,
                  127,
                  // 1, (i32, i32, i32, i32) => i32
                  96,
                  4,
                  127,
                  127,
                  127,
                  127,
                  1,
                  127,
                  // section "function"
                  3,
                  7,
                  6,
                  // 0, type 0
                  0,
                  // 1, type 1
                  1,
                  // 2, type 1
                  1,
                  // 3, type 1
                  1,
                  // 4, type 1
                  1,
                  // 5, type 1
                  1,
                  // section "global"
                  6,
                  6,
                  1,
                  // 0, "high", mutable i32
                  127,
                  1,
                  65,
                  0,
                  11,
                  // section "export"
                  7,
                  50,
                  6,
                  // 0, "mul"
                  3,
                  109,
                  117,
                  108,
                  0,
                  1,
                  // 1, "div_s"
                  5,
                  100,
                  105,
                  118,
                  95,
                  115,
                  0,
                  2,
                  // 2, "div_u"
                  5,
                  100,
                  105,
                  118,
                  95,
                  117,
                  0,
                  3,
                  // 3, "rem_s"
                  5,
                  114,
                  101,
                  109,
                  95,
                  115,
                  0,
                  4,
                  // 4, "rem_u"
                  5,
                  114,
                  101,
                  109,
                  95,
                  117,
                  0,
                  5,
                  // 5, "get_high"
                  8,
                  103,
                  101,
                  116,
                  95,
                  104,
                  105,
                  103,
                  104,
                  0,
                  0,
                  // section "code"
                  10,
                  191,
                  1,
                  6,
                  // 0, "get_high"
                  4,
                  0,
                  35,
                  0,
                  11,
                  // 1, "mul"
                  36,
                  1,
                  1,
                  126,
                  32,
                  0,
                  173,
                  32,
                  1,
                  173,
                  66,
                  32,
                  134,
                  132,
                  32,
                  2,
                  173,
                  32,
                  3,
                  173,
                  66,
                  32,
                  134,
                  132,
                  126,
                  34,
                  4,
                  66,
                  32,
                  135,
                  167,
                  36,
                  0,
                  32,
                  4,
                  167,
                  11,
                  // 2, "div_s"
                  36,
                  1,
                  1,
                  126,
                  32,
                  0,
                  173,
                  32,
                  1,
                  173,
                  66,
                  32,
                  134,
                  132,
                  32,
                  2,
                  173,
                  32,
                  3,
                  173,
                  66,
                  32,
                  134,
                  132,
                  127,
                  34,
                  4,
                  66,
                  32,
                  135,
                  167,
                  36,
                  0,
                  32,
                  4,
                  167,
                  11,
                  // 3, "div_u"
                  36,
                  1,
                  1,
                  126,
                  32,
                  0,
                  173,
                  32,
                  1,
                  173,
                  66,
                  32,
                  134,
                  132,
                  32,
                  2,
                  173,
                  32,
                  3,
                  173,
                  66,
                  32,
                  134,
                  132,
                  128,
                  34,
                  4,
                  66,
                  32,
                  135,
                  167,
                  36,
                  0,
                  32,
                  4,
                  167,
                  11,
                  // 4, "rem_s"
                  36,
                  1,
                  1,
                  126,
                  32,
                  0,
                  173,
                  32,
                  1,
                  173,
                  66,
                  32,
                  134,
                  132,
                  32,
                  2,
                  173,
                  32,
                  3,
                  173,
                  66,
                  32,
                  134,
                  132,
                  129,
                  34,
                  4,
                  66,
                  32,
                  135,
                  167,
                  36,
                  0,
                  32,
                  4,
                  167,
                  11,
                  // 5, "rem_u"
                  36,
                  1,
                  1,
                  126,
                  32,
                  0,
                  173,
                  32,
                  1,
                  173,
                  66,
                  32,
                  134,
                  132,
                  32,
                  2,
                  173,
                  32,
                  3,
                  173,
                  66,
                  32,
                  134,
                  132,
                  130,
                  34,
                  4,
                  66,
                  32,
                  135,
                  167,
                  36,
                  0,
                  32,
                  4,
                  167,
                  11
                ])
              ),
              {}
            ).exports;
          } catch {
          }
          function Long(low, high, unsigned) {
            this.low = low | 0;
            this.high = high | 0;
            this.unsigned = !!unsigned;
          }
          Long.prototype.__isLong__;
          Object.defineProperty(Long.prototype, "__isLong__", {
            value: true
          });
          function isLong(obj) {
            return (obj && obj["__isLong__"]) === true;
          }
          function ctz32(value) {
            var c = Math.clz32(value & -value);
            return value ? 31 - c : c;
          }
          Long.isLong = isLong;
          var INT_CACHE = {};
          var UINT_CACHE = {};
          function fromInt(value, unsigned) {
            var obj, cachedObj, cache;
            if (unsigned) {
              value >>>= 0;
              if (cache = 0 <= value && value < 256) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj) return cachedObj;
              }
              obj = fromBits(value, 0, true);
              if (cache) UINT_CACHE[value] = obj;
              return obj;
            } else {
              value |= 0;
              if (cache = -128 <= value && value < 128) {
                cachedObj = INT_CACHE[value];
                if (cachedObj) return cachedObj;
              }
              obj = fromBits(value, value < 0 ? -1 : 0, false);
              if (cache) INT_CACHE[value] = obj;
              return obj;
            }
          }
          Long.fromInt = fromInt;
          function fromNumber(value, unsigned) {
            if (isNaN(value)) return unsigned ? UZERO : ZERO;
            if (unsigned) {
              if (value < 0) return UZERO;
              if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
            } else {
              if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
              if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
            }
            if (value < 0) return fromNumber(-value, unsigned).neg();
            return fromBits(
              value % TWO_PWR_32_DBL | 0,
              value / TWO_PWR_32_DBL | 0,
              unsigned
            );
          }
          Long.fromNumber = fromNumber;
          function fromBits(lowBits, highBits, unsigned) {
            return new Long(lowBits, highBits, unsigned);
          }
          Long.fromBits = fromBits;
          var pow_dbl = Math.pow;
          function fromString(str, unsigned, radix) {
            if (str.length === 0) throw Error("empty string");
            if (typeof unsigned === "number") {
              radix = unsigned;
              unsigned = false;
            } else {
              unsigned = !!unsigned;
            }
            if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
              return unsigned ? UZERO : ZERO;
            radix = radix || 10;
            if (radix < 2 || 36 < radix) throw RangeError("radix");
            var p;
            if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
            else if (p === 0) {
              return fromString(str.substring(1), unsigned, radix).neg();
            }
            var radixToPower = fromNumber(pow_dbl(radix, 8));
            var result = ZERO;
            for (var i = 0; i < str.length; i += 8) {
              var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
              if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
              } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
              }
            }
            result.unsigned = unsigned;
            return result;
          }
          Long.fromString = fromString;
          function fromValue(val, unsigned) {
            if (typeof val === "number") return fromNumber(val, unsigned);
            if (typeof val === "string") return fromString(val, unsigned);
            return fromBits(
              val.low,
              val.high,
              typeof unsigned === "boolean" ? unsigned : val.unsigned
            );
          }
          Long.fromValue = fromValue;
          var TWO_PWR_16_DBL = 1 << 16;
          var TWO_PWR_24_DBL = 1 << 24;
          var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
          var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
          var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
          var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
          var ZERO = fromInt(0);
          Long.ZERO = ZERO;
          var UZERO = fromInt(0, true);
          Long.UZERO = UZERO;
          var ONE = fromInt(1);
          Long.ONE = ONE;
          var UONE = fromInt(1, true);
          Long.UONE = UONE;
          var NEG_ONE = fromInt(-1);
          Long.NEG_ONE = NEG_ONE;
          var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
          Long.MAX_VALUE = MAX_VALUE;
          var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
          Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
          var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
          Long.MIN_VALUE = MIN_VALUE;
          var LongPrototype = Long.prototype;
          LongPrototype.toInt = function toInt() {
            return this.unsigned ? this.low >>> 0 : this.low;
          };
          LongPrototype.toNumber = function toNumber() {
            if (this.unsigned)
              return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
            return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
          };
          LongPrototype.toString = function toString(radix) {
            radix = radix || 10;
            if (radix < 2 || 36 < radix) throw RangeError("radix");
            if (this.isZero()) return "0";
            if (this.isNegative()) {
              if (this.eq(MIN_VALUE)) {
                var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
              } else return "-" + this.neg().toString(radix);
            }
            var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
            var result = "";
            while (true) {
              var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
              rem = remDiv;
              if (rem.isZero()) return digits + result;
              else {
                while (digits.length < 6) digits = "0" + digits;
                result = "" + digits + result;
              }
            }
          };
          LongPrototype.getHighBits = function getHighBits() {
            return this.high;
          };
          LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
            return this.high >>> 0;
          };
          LongPrototype.getLowBits = function getLowBits() {
            return this.low;
          };
          LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
            return this.low >>> 0;
          };
          LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
            if (this.isNegative())
              return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
            var val = this.high != 0 ? this.high : this.low;
            for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;
            return this.high != 0 ? bit + 33 : bit + 1;
          };
          LongPrototype.isSafeInteger = function isSafeInteger() {
            var top11Bits = this.high >> 21;
            if (!top11Bits) return true;
            if (this.unsigned) return false;
            return top11Bits === -1 && !(this.low === 0 && this.high === -2097152);
          };
          LongPrototype.isZero = function isZero() {
            return this.high === 0 && this.low === 0;
          };
          LongPrototype.eqz = LongPrototype.isZero;
          LongPrototype.isNegative = function isNegative() {
            return !this.unsigned && this.high < 0;
          };
          LongPrototype.isPositive = function isPositive() {
            return this.unsigned || this.high >= 0;
          };
          LongPrototype.isOdd = function isOdd() {
            return (this.low & 1) === 1;
          };
          LongPrototype.isEven = function isEven() {
            return (this.low & 1) === 0;
          };
          LongPrototype.equals = function equals(other) {
            if (!isLong(other)) other = fromValue(other);
            if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
              return false;
            return this.high === other.high && this.low === other.low;
          };
          LongPrototype.eq = LongPrototype.equals;
          LongPrototype.notEquals = function notEquals(other) {
            return !this.eq(
              /* validates */
              other
            );
          };
          LongPrototype.neq = LongPrototype.notEquals;
          LongPrototype.ne = LongPrototype.notEquals;
          LongPrototype.lessThan = function lessThan(other) {
            return this.comp(
              /* validates */
              other
            ) < 0;
          };
          LongPrototype.lt = LongPrototype.lessThan;
          LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
            return this.comp(
              /* validates */
              other
            ) <= 0;
          };
          LongPrototype.lte = LongPrototype.lessThanOrEqual;
          LongPrototype.le = LongPrototype.lessThanOrEqual;
          LongPrototype.greaterThan = function greaterThan(other) {
            return this.comp(
              /* validates */
              other
            ) > 0;
          };
          LongPrototype.gt = LongPrototype.greaterThan;
          LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
            return this.comp(
              /* validates */
              other
            ) >= 0;
          };
          LongPrototype.gte = LongPrototype.greaterThanOrEqual;
          LongPrototype.ge = LongPrototype.greaterThanOrEqual;
          LongPrototype.compare = function compare(other) {
            if (!isLong(other)) other = fromValue(other);
            if (this.eq(other)) return 0;
            var thisNeg = this.isNegative(), otherNeg = other.isNegative();
            if (thisNeg && !otherNeg) return -1;
            if (!thisNeg && otherNeg) return 1;
            if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
            return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
          };
          LongPrototype.comp = LongPrototype.compare;
          LongPrototype.negate = function negate() {
            if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
            return this.not().add(ONE);
          };
          LongPrototype.neg = LongPrototype.negate;
          LongPrototype.add = function add(addend) {
            if (!isLong(addend)) addend = fromValue(addend);
            var a48 = this.high >>> 16;
            var a32 = this.high & 65535;
            var a16 = this.low >>> 16;
            var a00 = this.low & 65535;
            var b48 = addend.high >>> 16;
            var b32 = addend.high & 65535;
            var b16 = addend.low >>> 16;
            var b00 = addend.low & 65535;
            var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
            c00 += a00 + b00;
            c16 += c00 >>> 16;
            c00 &= 65535;
            c16 += a16 + b16;
            c32 += c16 >>> 16;
            c16 &= 65535;
            c32 += a32 + b32;
            c48 += c32 >>> 16;
            c32 &= 65535;
            c48 += a48 + b48;
            c48 &= 65535;
            return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
          };
          LongPrototype.subtract = function subtract(subtrahend) {
            if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
            return this.add(subtrahend.neg());
          };
          LongPrototype.sub = LongPrototype.subtract;
          LongPrototype.multiply = function multiply(multiplier) {
            if (this.isZero()) return this;
            if (!isLong(multiplier)) multiplier = fromValue(multiplier);
            if (wasm) {
              var low = wasm["mul"](
                this.low,
                this.high,
                multiplier.low,
                multiplier.high
              );
              return fromBits(low, wasm["get_high"](), this.unsigned);
            }
            if (multiplier.isZero()) return this.unsigned ? UZERO : ZERO;
            if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
            if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
            if (this.isNegative()) {
              if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
              else return this.neg().mul(multiplier).neg();
            } else if (multiplier.isNegative())
              return this.mul(multiplier.neg()).neg();
            if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
              return fromNumber(
                this.toNumber() * multiplier.toNumber(),
                this.unsigned
              );
            var a48 = this.high >>> 16;
            var a32 = this.high & 65535;
            var a16 = this.low >>> 16;
            var a00 = this.low & 65535;
            var b48 = multiplier.high >>> 16;
            var b32 = multiplier.high & 65535;
            var b16 = multiplier.low >>> 16;
            var b00 = multiplier.low & 65535;
            var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
            c00 += a00 * b00;
            c16 += c00 >>> 16;
            c00 &= 65535;
            c16 += a16 * b00;
            c32 += c16 >>> 16;
            c16 &= 65535;
            c16 += a00 * b16;
            c32 += c16 >>> 16;
            c16 &= 65535;
            c32 += a32 * b00;
            c48 += c32 >>> 16;
            c32 &= 65535;
            c32 += a16 * b16;
            c48 += c32 >>> 16;
            c32 &= 65535;
            c32 += a00 * b32;
            c48 += c32 >>> 16;
            c32 &= 65535;
            c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
            c48 &= 65535;
            return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
          };
          LongPrototype.mul = LongPrototype.multiply;
          LongPrototype.divide = function divide(divisor) {
            if (!isLong(divisor)) divisor = fromValue(divisor);
            if (divisor.isZero()) throw Error("division by zero");
            if (wasm) {
              if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
                return this;
              }
              var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
                this.low,
                this.high,
                divisor.low,
                divisor.high
              );
              return fromBits(low, wasm["get_high"](), this.unsigned);
            }
            if (this.isZero()) return this.unsigned ? UZERO : ZERO;
            var approx, rem, res;
            if (!this.unsigned) {
              if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                  return MIN_VALUE;
                else if (divisor.eq(MIN_VALUE)) return ONE;
                else {
                  var halfThis = this.shr(1);
                  approx = halfThis.div(divisor).shl(1);
                  if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                  } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                  }
                }
              } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
              if (this.isNegative()) {
                if (divisor.isNegative()) return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
              } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
              res = ZERO;
            } else {
              if (!divisor.unsigned) divisor = divisor.toUnsigned();
              if (divisor.gt(this)) return UZERO;
              if (divisor.gt(this.shru(1)))
                return UONE;
              res = UZERO;
            }
            rem = this;
            while (rem.gte(divisor)) {
              approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
              var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
              while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
              }
              if (approxRes.isZero()) approxRes = ONE;
              res = res.add(approxRes);
              rem = rem.sub(approxRem);
            }
            return res;
          };
          LongPrototype.div = LongPrototype.divide;
          LongPrototype.modulo = function modulo(divisor) {
            if (!isLong(divisor)) divisor = fromValue(divisor);
            if (wasm) {
              var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
                this.low,
                this.high,
                divisor.low,
                divisor.high
              );
              return fromBits(low, wasm["get_high"](), this.unsigned);
            }
            return this.sub(this.div(divisor).mul(divisor));
          };
          LongPrototype.mod = LongPrototype.modulo;
          LongPrototype.rem = LongPrototype.modulo;
          LongPrototype.not = function not() {
            return fromBits(~this.low, ~this.high, this.unsigned);
          };
          LongPrototype.countLeadingZeros = function countLeadingZeros() {
            return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
          };
          LongPrototype.clz = LongPrototype.countLeadingZeros;
          LongPrototype.countTrailingZeros = function countTrailingZeros() {
            return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
          };
          LongPrototype.ctz = LongPrototype.countTrailingZeros;
          LongPrototype.and = function and(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(
              this.low & other.low,
              this.high & other.high,
              this.unsigned
            );
          };
          LongPrototype.or = function or(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(
              this.low | other.low,
              this.high | other.high,
              this.unsigned
            );
          };
          LongPrototype.xor = function xor(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(
              this.low ^ other.low,
              this.high ^ other.high,
              this.unsigned
            );
          };
          LongPrototype.shiftLeft = function shiftLeft(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;
            else if (numBits < 32)
              return fromBits(
                this.low << numBits,
                this.high << numBits | this.low >>> 32 - numBits,
                this.unsigned
              );
            else return fromBits(0, this.low << numBits - 32, this.unsigned);
          };
          LongPrototype.shl = LongPrototype.shiftLeft;
          LongPrototype.shiftRight = function shiftRight(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;
            else if (numBits < 32)
              return fromBits(
                this.low >>> numBits | this.high << 32 - numBits,
                this.high >> numBits,
                this.unsigned
              );
            else
              return fromBits(
                this.high >> numBits - 32,
                this.high >= 0 ? 0 : -1,
                this.unsigned
              );
          };
          LongPrototype.shr = LongPrototype.shiftRight;
          LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;
            if (numBits < 32)
              return fromBits(
                this.low >>> numBits | this.high << 32 - numBits,
                this.high >>> numBits,
                this.unsigned
              );
            if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
            return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
          };
          LongPrototype.shru = LongPrototype.shiftRightUnsigned;
          LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
          LongPrototype.rotateLeft = function rotateLeft(numBits) {
            var b;
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;
            if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
            if (numBits < 32) {
              b = 32 - numBits;
              return fromBits(
                this.low << numBits | this.high >>> b,
                this.high << numBits | this.low >>> b,
                this.unsigned
              );
            }
            numBits -= 32;
            b = 32 - numBits;
            return fromBits(
              this.high << numBits | this.low >>> b,
              this.low << numBits | this.high >>> b,
              this.unsigned
            );
          };
          LongPrototype.rotl = LongPrototype.rotateLeft;
          LongPrototype.rotateRight = function rotateRight(numBits) {
            var b;
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;
            if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
            if (numBits < 32) {
              b = 32 - numBits;
              return fromBits(
                this.high << b | this.low >>> numBits,
                this.low << b | this.high >>> numBits,
                this.unsigned
              );
            }
            numBits -= 32;
            b = 32 - numBits;
            return fromBits(
              this.low << b | this.high >>> numBits,
              this.high << b | this.low >>> numBits,
              this.unsigned
            );
          };
          LongPrototype.rotr = LongPrototype.rotateRight;
          LongPrototype.toSigned = function toSigned() {
            if (!this.unsigned) return this;
            return fromBits(this.low, this.high, false);
          };
          LongPrototype.toUnsigned = function toUnsigned() {
            if (this.unsigned) return this;
            return fromBits(this.low, this.high, true);
          };
          LongPrototype.toBytes = function toBytes2(le) {
            return le ? this.toBytesLE() : this.toBytesBE();
          };
          LongPrototype.toBytesLE = function toBytesLE() {
            var hi = this.high, lo = this.low;
            return [
              lo & 255,
              lo >>> 8 & 255,
              lo >>> 16 & 255,
              lo >>> 24,
              hi & 255,
              hi >>> 8 & 255,
              hi >>> 16 & 255,
              hi >>> 24
            ];
          };
          LongPrototype.toBytesBE = function toBytesBE() {
            var hi = this.high, lo = this.low;
            return [
              hi >>> 24,
              hi >>> 16 & 255,
              hi >>> 8 & 255,
              hi & 255,
              lo >>> 24,
              lo >>> 16 & 255,
              lo >>> 8 & 255,
              lo & 255
            ];
          };
          Long.fromBytes = function fromBytes(bytes, unsigned, le) {
            return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
          };
          Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
            return new Long(
              bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
              bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
              unsigned
            );
          };
          Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
            return new Long(
              bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
              bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
              unsigned
            );
          };
          if (typeof BigInt === "function") {
            Long.fromBigInt = function fromBigInt(value, unsigned) {
              var lowBits = Number(BigInt.asIntN(32, value));
              var highBits = Number(BigInt.asIntN(32, value >> BigInt(32)));
              return fromBits(lowBits, highBits, unsigned);
            };
            Long.fromValue = function fromValueWithBigInt(value, unsigned) {
              if (typeof value === "bigint") return Long.fromBigInt(value, unsigned);
              return fromValue(value, unsigned);
            };
            LongPrototype.toBigInt = function toBigInt() {
              var lowBigInt = BigInt(this.low >>> 0);
              var highBigInt = BigInt(this.unsigned ? this.high >>> 0 : this.high);
              return highBigInt << BigInt(32) | lowBigInt;
            };
          }
          var _default = _exports.default = Long;
        }
      );
    }
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports) {
      "use strict";
      var util = exports;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      function isUnsafeProperty(key) {
        return key === "__proto__" || key === "prototype" || key === "constructor";
      }
      util.isUnsafeProperty = isUnsafeProperty;
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof globalThis !== "undefined" && globalThis || exports;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (
        /* istanbul ignore next */
        []
      );
      util.emptyObject = Object.freeze ? Object.freeze({}) : (
        /* istanbul ignore next */
        {}
      );
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && Object.hasOwnProperty.call(obj, prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = (function() {
        try {
          var Buffer2 = util.global.Buffer;
          return Buffer2.prototype.utf8Write || util.isNode ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e) {
          return null;
        }
      })();
      util.newBuffer = function newBuffer(sizeOrArray) {
        var Buffer2 = util.Buffer;
        return typeof sizeOrArray === "number" ? Buffer2 ? Buffer2.allocUnsafe(sizeOrArray) : new Uint8Array(sizeOrArray) : Buffer2 ? Buffer2.from(sizeOrArray) : new Uint8Array(sizeOrArray);
      };
      util.rawField = function rawField(id, wireType, data) {
        var out = [], tag = id << 3 | wireType;
        tag >>>= 0;
        while (tag > 127) {
          out.push(tag & 127 | 128);
          tag >>>= 7;
        }
        out.push(tag);
        for (var i = 0; i < data.length; ++i)
          out.push(data[i]);
        return util.newBuffer(out);
      };
      util.Array = Uint8Array;
      util.Long = /* istanbul ignore next */
      util.global.dcodeIO && /* istanbul ignore next */
      util.global.dcodeIO.Long || /* istanbul ignore next */
      util.global.Long || (function() {
        try {
          var Long = require_umd();
          return Long && Long.isLong ? Long : null;
        } catch (e) {
          return null;
        }
      })();
      util.key2Re = /^(?:true|false|0|1)$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\x00-\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      util.longFromKey = function longFromKey(key, unsigned) {
        return util.key64Re.test(key) && !util.key32Re.test(key) ? util.longFromHash(key, unsigned) : key;
      };
      util.boolFromKey = function boolFromKey(key) {
        return key === "true" || key === "1";
      };
      function merge(dst) {
        var ifNotSet = typeof arguments[arguments.length - 1] === "boolean", limit = ifNotSet ? arguments.length - 1 : arguments.length;
        ifNotSet = ifNotSet && arguments[arguments.length - 1];
        for (var a = 1; a < limit; ++a) {
          var src = arguments[a];
          if (!src)
            continue;
          for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
            if (!isUnsafeProperty(keys[i]) && (!ifNotSet || !Object.prototype.hasOwnProperty.call(dst, keys[i]) || dst[keys[i]] === void 0))
              dst[keys[i]] = src[keys[i]];
        }
        return dst;
      }
      util.merge = merge;
      util.nestingLimit = 32;
      util.recursionLimit = 100;
      util.makeProp = function makeProp(obj, key, enumerable) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          return;
        Object.defineProperty(obj, key, {
          enumerable: enumerable === void 0 ? true : enumerable,
          configurable: true,
          writable: true
        });
      };
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge(this, properties);
        }
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: function get() {
              return name;
            },
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: function value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
    }
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports, module) {
      "use strict";
      module.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Writer() {
        this.pos = 0;
        this.buf = this.constructor.alloc(64);
        this.view = null;
        this.states = null;
      }
      Object.defineProperty(Writer.prototype, "len", {
        configurable: true,
        enumerable: true,
        get: function get_len() {
          return this.pos;
        }
      });
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create();
      Writer.alloc = function alloc(size) {
        return new Uint8Array(size);
      };
      Writer.alloc = util.pool(Writer.alloc, Uint8Array.prototype.subarray);
      function sizeVarint32(value) {
        return value < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5;
      }
      Writer.prototype._reserve = function _reserve(n) {
        var need = this.pos + n;
        if (need > this.buf.length) {
          var size = this.buf.length << 1;
          if (size < need)
            size = need;
          var buf = this.constructor.alloc(size);
          buf.set(this.buf.subarray(0, this.pos), 0);
          this.buf = buf;
          this.view = null;
        }
      };
      function writeStringAscii(val, buf, pos) {
        for (var i = 0; i < val.length; )
          buf[pos++] = val.charCodeAt(i++);
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
        return pos + 1;
      }
      Writer.prototype.uint32 = function write_uint32(value) {
        value = value >>> 0;
        this._reserve(5);
        var pos = this.pos;
        this.pos = writeVarint32(value, this.buf, pos);
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        if ((value |= 0) < 0) {
          this._reserve(10);
          writeVarint64(LongBits.fromNumber(value), this.buf, this.pos);
          this.pos += 10;
          return this;
        }
        return this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        var lo = val.lo, hi = val.hi;
        while (hi) {
          buf[pos++] = lo & 127 | 128;
          lo = (lo >>> 7 | hi << 25) >>> 0;
          hi >>>= 7;
        }
        while (lo > 127) {
          buf[pos++] = lo & 127 | 128;
          lo = lo >>> 7;
        }
        buf[pos] = lo;
        return pos + 1;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        this._reserve(10);
        var pos = this.pos;
        this.pos = writeVarint64(bits, this.buf, pos);
        return this;
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        this._reserve(10);
        var pos = this.pos;
        this.pos = writeVarint64(bits, this.buf, pos);
        return this;
      };
      Writer.prototype.bool = function write_bool(value) {
        this._reserve(1);
        this.buf[this.pos++] = value ? 1 : 0;
        return this;
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        this._reserve(4);
        writeFixed32(value >>> 0, this.buf, this.pos);
        this.pos += 4;
        return this;
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        this._reserve(8);
        writeFixed32(bits.lo, this.buf, this.pos);
        writeFixed32(bits.hi, this.buf, this.pos + 4);
        this.pos += 8;
        return this;
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        this._reserve(4);
        util.float.writeFloatLE(value, this.buf, this.pos);
        this.pos += 4;
        return this;
      };
      Writer.prototype.double = function write_double(value) {
        this._reserve(8);
        util.float.writeDoubleLE(value, this.buf, this.pos);
        this.pos += 8;
        return this;
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len) {
          this._reserve(1);
          this.buf[this.pos++] = 0;
          return this;
        }
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        this.uint32(len);
        this._reserve(len);
        this.buf.set(value, this.pos);
        this.pos += len;
        return this;
      };
      Writer.prototype.raw = function write_raw(value) {
        var len = value.length >>> 0;
        if (!len)
          return this;
        this._reserve(len);
        this.buf.set(value, this.pos);
        this.pos += len;
        return this;
      };
      Writer.prototype._delim = function _delim(pos, len) {
        var n = sizeVarint32(len);
        if (n > 1)
          this.buf.copyWithin(pos + n, pos + 1, pos + 1 + len);
        writeVarint32(len, this.buf, pos);
        this.pos = pos + n + len;
        return this;
      };
      Writer.prototype.string = function write_string(value) {
        var n = value.length;
        if (!n) {
          this._reserve(1);
          this.buf[this.pos++] = 0;
          return this;
        }
        if (n < 128) {
          this._reserve(n * 3 + 5);
          var lenPos = this.pos;
          return this._delim(lenPos, utf8.write(value, this.buf, lenPos + 1));
        }
        var len = utf8.length(value);
        this.uint32(len);
        this._reserve(len);
        if (len === value.length)
          writeStringAscii(value, this.buf, this.pos);
        else
          utf8.write(value, this.buf, this.pos);
        this.pos += len;
        return this;
      };
      Writer.prototype.uint32s = function write_uint32s(value) {
        var n = value.length;
        this._reserve(n * 5 + 5);
        var buf = this.buf, lenPos = this.pos, p = lenPos + 1;
        for (var i = 0; i < n; ++i)
          p = writeVarint32(value[i] >>> 0, buf, p);
        return this._delim(lenPos, p - lenPos - 1);
      };
      Writer.prototype.int32s = function write_int32s(value) {
        var n = value.length;
        this._reserve(n * 10 + 5);
        var buf = this.buf, lenPos = this.pos, pos = lenPos + 1, val;
        for (var i = 0; i < n; ++i) {
          if ((val = value[i] | 0) < 0) {
            pos = writeVarint64(LongBits.fromNumber(val), buf, pos);
          } else {
            pos = writeVarint32(val, buf, pos);
          }
        }
        return this._delim(lenPos, pos - lenPos - 1);
      };
      Writer.prototype.sint32s = function write_sint32s(value) {
        var n = value.length;
        this._reserve(n * 5 + 5);
        var buf = this.buf, lenPos = this.pos, pos = lenPos + 1;
        for (var i = 0; i < n; ++i)
          pos = writeVarint32((value[i] << 1 ^ value[i] >> 31) >>> 0, buf, pos);
        return this._delim(lenPos, pos - lenPos - 1);
      };
      Writer.prototype.uint64s = function write_uint64s(value) {
        var n = value.length;
        this._reserve(n * 10 + 5);
        var buf = this.buf, lenPos = this.pos, pos = lenPos + 1;
        for (var i = 0; i < n; ++i) {
          pos = writeVarint64(LongBits.from(value[i]), buf, pos);
        }
        return this._delim(lenPos, pos - lenPos - 1);
      };
      Writer.prototype.int64s = Writer.prototype.uint64s;
      Writer.prototype.sint64s = function write_sint64s(value) {
        var n = value.length;
        this._reserve(n * 10 + 5);
        var buf = this.buf, lenPos = this.pos, pos = lenPos + 1;
        for (var i = 0; i < n; ++i) {
          pos = writeVarint64(LongBits.from(value[i]).zzEncode(), buf, pos);
        }
        return this._delim(lenPos, pos - lenPos - 1);
      };
      Writer.prototype.bools = function write_bools(value) {
        var n = value.length;
        this.uint32(n);
        this._reserve(n);
        var buf = this.buf, p = this.pos;
        for (var i = 0; i < n; ++i)
          buf[p++] = value[i] ? 1 : 0;
        this.pos += n;
        return this;
      };
      var VIEW_THRESHOLD_FLOAT = 16;
      var VIEW_THRESHOLD_INT = 128;
      function getLazyView(writer, count, threshold) {
        var view = writer.view;
        if (view || count < threshold)
          return view;
        var buf = writer.buf;
        return writer.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      }
      Writer.prototype.fixed32s = function write_fixed32s(value) {
        var n = value.length, bytes = n * 4;
        this.uint32(bytes);
        this._reserve(bytes);
        var p = this.pos, i, dv = getLazyView(this, n, VIEW_THRESHOLD_INT);
        if (dv)
          for (i = 0; i < n; ++i) {
            dv.setUint32(p, value[i] >>> 0, true);
            p += 4;
          }
        else {
          var buf = this.buf;
          for (i = 0; i < n; ++i) {
            writeFixed32(value[i] >>> 0, buf, p);
            p += 4;
          }
        }
        this.pos += bytes;
        return this;
      };
      Writer.prototype.sfixed32s = Writer.prototype.fixed32s;
      Writer.prototype.fixed64s = function write_fixed64s(value) {
        var n = value.length, bytes = n * 8;
        this.uint32(bytes);
        this._reserve(bytes);
        var p = this.pos, i, bits, dv = getLazyView(this, n, VIEW_THRESHOLD_INT);
        if (dv)
          for (i = 0; i < n; ++i) {
            bits = LongBits.from(value[i]);
            dv.setUint32(p, bits.lo, true);
            dv.setUint32(p + 4, bits.hi, true);
            p += 8;
          }
        else {
          var buf = this.buf;
          for (i = 0; i < n; ++i) {
            bits = LongBits.from(value[i]);
            writeFixed32(bits.lo, buf, p);
            writeFixed32(bits.hi, buf, p + 4);
            p += 8;
          }
        }
        this.pos += bytes;
        return this;
      };
      Writer.prototype.sfixed64s = Writer.prototype.fixed64s;
      Writer.prototype.floats = function write_floats(value) {
        var n = value.length, bytes = n * 4;
        this.uint32(bytes);
        this._reserve(bytes);
        var p = this.pos, i, dv = getLazyView(this, n, VIEW_THRESHOLD_FLOAT);
        if (dv)
          for (i = 0; i < n; ++i) {
            dv.setFloat32(p, value[i], true);
            p += 4;
          }
        else {
          var buf = this.buf;
          for (i = 0; i < n; ++i) {
            util.float.writeFloatLE(value[i], buf, p);
            p += 4;
          }
        }
        this.pos += bytes;
        return this;
      };
      Writer.prototype.doubles = function write_doubles(value) {
        var n = value.length, bytes = n * 8;
        this.uint32(bytes);
        this._reserve(bytes);
        var p = this.pos, i, dv = getLazyView(this, n, VIEW_THRESHOLD_FLOAT);
        if (dv)
          for (i = 0; i < n; ++i) {
            dv.setFloat64(p, value[i], true);
            p += 8;
          }
        else {
          var buf = this.buf;
          for (i = 0; i < n; ++i) {
            util.float.writeDoubleLE(value[i], buf, p);
            p += 8;
          }
        }
        this.pos += bytes;
        return this;
      };
      Writer.prototype.fork = function fork() {
        this._reserve(1);
        (this.states || (this.states = [])).push(this.pos);
        this.pos += 1;
        return this;
      };
      Writer.prototype.reset = function reset() {
        var states = this.states;
        if (states && states.length) {
          this.pos = states.pop();
        } else {
          this.pos = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var states = this.states, len, vlen;
        if (states && states.length) {
          var lenPos = states.pop();
          len = this.pos - lenPos - 1;
          vlen = sizeVarint32(len);
          if (vlen > 1) {
            this._reserve(vlen - 1);
            this.buf.copyWithin(lenPos + vlen, lenPos + 1, lenPos + 1 + len);
            this.pos += vlen - 1;
            writeVarint32(len, this.buf, lenPos);
          } else {
            this.buf[lenPos] = len;
          }
        } else {
          len = this.pos;
          vlen = sizeVarint32(len);
          this._reserve(vlen);
          this.buf.copyWithin(vlen, 0, len);
          writeVarint32(len, this.buf, 0);
          this.pos += vlen;
        }
        return this;
      };
      Writer.prototype.finish = function finish(shared) {
        if (shared)
          return this.buf.subarray(0, this.pos);
        var buf = this.constructor.alloc(this.pos);
        buf.set(this.buf.subarray(0, this.pos), 0);
        return buf;
      };
      Writer.prototype.finishInto = function finishInto(buf, offset) {
        if (offset === void 0)
          offset = 0;
        buf.set(this.buf.subarray(0, this.pos), offset);
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports, module) {
      "use strict";
      module.exports = BufferWriter;
      var Writer = require_writer();
      BufferWriter.prototype = Object.create(Writer.prototype, {
        constructor: {
          value: BufferWriter,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      var writeStringBuffer;
      BufferWriter._configure = function() {
        BufferWriter.alloc = util.Buffer && util.Buffer.allocUnsafe;
        writeStringBuffer = util.Buffer && util.Buffer.prototype.utf8Write ? function writeStringBuffer_utf8Write(val, buf, pos) {
          return buf.utf8Write(val, pos);
        } : function writeStringBuffer_write(val, buf, pos) {
          return buf.write(val, pos);
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util.Buffer.from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len) {
          this._reserve(len);
          this.buf.set(value, this.pos);
          this.pos += len;
        }
        return this;
      };
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var n = value.length;
        if (!n) {
          this._reserve(1);
          this.buf[this.pos++] = 0;
          return this;
        }
        if (n < 128) {
          this._reserve(n * 3 + 5);
          var pos = this.pos, buf = this.buf;
          return this._delim(
            pos,
            n < 40 ? util.utf8.write(value, buf, pos + 1) : writeStringBuffer(value, buf, pos + 1)
          );
        }
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        this._reserve(len);
        writeStringBuffer(value, this.buf, this.pos);
        this.pos += len;
        return this;
      };
      BufferWriter._configure();
    }
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports, module) {
      "use strict";
      module.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
        this.view = null;
        this.discardUnknown = Reader.discardUnknown;
      }
      function create_array(buffer) {
        if (Array.isArray(buffer))
          buffer = new Uint8Array(buffer);
        if (buffer instanceof Uint8Array)
          return new Reader(buffer);
        throw Error("illegal buffer");
      }
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create();
      Reader.prototype.raw = function read_raw(start, end) {
        return this.buf.subarray(start, end);
      };
      Reader.prototype.uint32 = function read_uint32() {
        var buf = this.buf, pos = this.pos, value = (buf[pos] & 127) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 127) << 7) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 127) << 14) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 127) << 21) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 15) << 28) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        for (var i = 0; i < 5; ++i) {
          if (pos >= this.len) {
            this.pos = pos;
            throw indexOutOfRange(this);
          }
          if (buf[pos++] < 128) {
            this.pos = pos;
            return value;
          }
        }
        this.pos = pos;
        throw Error("invalid varint encoding");
      };
      Reader.prototype.tag = function read_tag() {
        var buf = this.buf, pos = this.pos, value = (buf[pos] & 127) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 127) << 7) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 127) << 14) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 127) << 21) >>> 0;
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
        value = (value | (buf[pos] & 15) << 28) >>> 0;
        if (buf[pos] < 128 && (buf[pos] & 112) === 0) {
          this.pos = pos + 1;
          return value;
        }
        this.pos = pos + 1;
        throw Error("invalid tag encoding");
      };
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i = 0;
        } else {
          for (; i < 4; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          throw indexOutOfRange(this);
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        var value = false, b;
        for (var i = 0; i < 10; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          b = this.buf[this.pos++];
          if (b & 127)
            value = true;
          if (b < 128)
            return value;
        }
        throw Error("invalid varint encoding");
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.uint32s = function read_uint32s(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.uint32());
        return array;
      };
      Reader.prototype.int32s = function read_int32s(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.int32());
        return array;
      };
      Reader.prototype.sint32s = function read_sint32s(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.sint32());
        return array;
      };
      Reader.prototype.bools = function read_bools(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.bool());
        return array;
      };
      var VIEW_THRESHOLD_FLOAT = 8;
      var VIEW_THRESHOLD_INT = 128;
      function getLazyView(reader, count, threshold) {
        var view = reader.view;
        if (view || count < threshold)
          return view;
        var buf = reader.buf;
        return reader.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      }
      Reader.prototype.fixed32s = function read_fixed32s(array) {
        if (array === void 0) array = [];
        var len = this.uint32(), end = this.pos + len;
        if (end > this.len) throw indexOutOfRange(this, len);
        var count = len >>> 2, i = array.length, pos = this.pos;
        array.length = i + count;
        var dv = getLazyView(this, count, VIEW_THRESHOLD_INT);
        if (dv)
          for (var k = 0; k < count; ++k, pos += 4) array[i++] = dv.getUint32(pos, true);
        else {
          var buf = this.buf;
          for (var j = 0; j < count; ++j, pos += 4) array[i++] = readFixed32_end(buf, pos + 4);
        }
        this.pos = pos;
        if (pos !== end) throw indexOutOfRange(this, 4);
        return array;
      };
      Reader.prototype.sfixed32s = function read_sfixed32s(array) {
        if (array === void 0) array = [];
        var len = this.uint32(), end = this.pos + len;
        if (end > this.len) throw indexOutOfRange(this, len);
        var count = len >>> 2, i = array.length, pos = this.pos;
        array.length = i + count;
        var dv = getLazyView(this, count, VIEW_THRESHOLD_INT);
        if (dv)
          for (var k = 0; k < count; ++k, pos += 4) array[i++] = dv.getInt32(pos, true);
        else {
          var buf = this.buf;
          for (var j = 0; j < count; ++j, pos += 4) array[i++] = readFixed32_end(buf, pos + 4) | 0;
        }
        this.pos = pos;
        if (pos !== end) throw indexOutOfRange(this, 4);
        return array;
      };
      Reader.prototype.floats = function read_floats(array) {
        if (array === void 0) array = [];
        var len = this.uint32(), end = this.pos + len;
        if (end > this.len) throw indexOutOfRange(this, len);
        var count = len >>> 2, i = array.length, pos = this.pos;
        array.length = i + count;
        var dv = getLazyView(this, count, VIEW_THRESHOLD_FLOAT);
        if (dv)
          for (var k = 0; k < count; ++k, pos += 4) array[i++] = dv.getFloat32(pos, true);
        else {
          var buf = this.buf;
          for (var j = 0; j < count; ++j, pos += 4) array[i++] = util.float.readFloatLE(buf, pos);
        }
        this.pos = pos;
        if (pos !== end) throw indexOutOfRange(this, 4);
        return array;
      };
      Reader.prototype.doubles = function read_doubles(array) {
        if (array === void 0) array = [];
        var len = this.uint32(), end = this.pos + len;
        if (end > this.len) throw indexOutOfRange(this, len);
        var count = len >>> 3, i = array.length, pos = this.pos;
        array.length = i + count;
        var dv = getLazyView(this, count, VIEW_THRESHOLD_FLOAT);
        if (dv)
          for (var k = 0; k < count; ++k, pos += 8) array[i++] = dv.getFloat64(pos, true);
        else {
          var buf = this.buf;
          for (var j = 0; j < count; ++j, pos += 8) array[i++] = util.float.readDoubleLE(buf, pos);
        }
        this.pos = pos;
        if (pos !== end) throw indexOutOfRange(this, 8);
        return array;
      };
      Reader.prototype.uint64s = function read_uint64s(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.uint64());
        return array;
      };
      Reader.prototype.int64s = function read_int64s(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.int64());
        return array;
      };
      Reader.prototype.sint64s = function read_sint64s(array) {
        if (array === void 0) array = [];
        var end = this.uint32() + this.pos;
        while (this.pos < end)
          array.push(this.sint64());
        return array;
      };
      Reader.prototype.fixed64s = function read_fixed64s(array) {
        if (array === void 0) array = [];
        var len = this.uint32(), end = this.pos + len, i = array.length;
        if (end > this.len) throw indexOutOfRange(this, len);
        var count = len >>> 3;
        array.length = i + count;
        for (var j = 0; j < count; ++j)
          array[i++] = this.fixed64();
        if (this.pos !== end) throw indexOutOfRange(this, 8);
        return array;
      };
      Reader.prototype.sfixed64s = function read_sfixed64s(array) {
        if (array === void 0) array = [];
        var len = this.uint32(), end = this.pos + len, i = array.length;
        if (end > this.len) throw indexOutOfRange(this, len);
        var count = len >>> 3;
        array.length = i + count;
        for (var j = 0; j < count; ++j)
          array[i++] = this.sfixed64();
        if (this.pos !== end) throw indexOutOfRange(this, 8);
        return array;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos = end;
        return this.raw(start, end);
      };
      Reader.prototype.string = function read_string() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos = end;
        return utf8.read(this.buf, start, end);
      };
      Reader.prototype.stringVerify = function read_string_verify() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos = end;
        return utf8.readStrict(this.buf, start, end);
      };
      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.recursionLimit = util.recursionLimit;
      Reader.discardUnknown = true;
      Reader.prototype.skipType = function(wireType, depth, fieldNumber) {
        if (depth === void 0) depth = 0;
        if (depth > Reader.recursionLimit)
          throw Error("max depth exceeded");
        if (fieldNumber === 0)
          throw Error("illegal tag: field number 0");
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while (true) {
              var tag = this.tag();
              var nestedField = tag >>> 3;
              wireType = tag & 7;
              if (!nestedField)
                throw Error("illegal tag: field number 0");
              if (wireType === 4) {
                if (fieldNumber !== void 0 && nestedField !== fieldNumber)
                  throw Error("invalid end group tag");
                break;
              }
              this.skipType(wireType, depth + 1, nestedField);
            }
            break;
          case 5:
            this.skip(4);
            break;
          /* istanbul ignore next */
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports, module) {
      "use strict";
      module.exports = BufferReader;
      var Reader = require_reader();
      BufferReader.prototype = Object.create(Reader.prototype, {
        constructor: {
          value: BufferReader,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.raw = function read_raw_buffer(start, end) {
        return this._slice.call(this.buf, start, end);
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32(), start = this.pos, end = this.pos + len;
        if (end > this.len)
          throw RangeError("index out of range: " + this.pos + " + " + len + " > " + this.len);
        this.pos = end;
        return this.buf.utf8Slice ? this.buf.utf8Slice(start, end) : this.buf.toString("utf-8", start, end);
      };
      BufferReader._configure();
    }
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports, module) {
      "use strict";
      module.exports = Service;
      var util = require_minimal();
      Service.prototype = Object.create(util.EventEmitter.prototype, {
        constructor: {
          value: Service,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(
                  /* endedByRPC */
                  true
                );
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports) {
      "use strict";
      var rpc = exports;
      rpc.Service = require_service();
    }
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports, module) {
      "use strict";
      module.exports = /* @__PURE__ */ Object.create(null);
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports) {
      "use strict";
      exports.build = "minimal";
      exports.Writer = require_writer();
      exports.BufferWriter = require_writer_buffer();
      exports.Reader = require_reader();
      exports.BufferReader = require_reader_buffer();
      exports.util = require_minimal();
      exports.rpc = require_rpc();
      exports.roots = require_roots();
      exports.configure = configure;
      function configure() {
        exports.util.LongBits._configure(exports.util.Long);
        exports.Writer._configure(exports.BufferWriter);
        exports.Reader._configure(exports.BufferReader);
      }
      configure();
    }
  });

  // node_modules/protobufjs/src/util/patterns.js
  var require_patterns = __commonJS({
    "node_modules/protobufjs/src/util/patterns.js"(exports) {
      "use strict";
      var patterns = exports;
      patterns.numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
      patterns.typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
      patterns.reservedRe = /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;
    }
  });

  // node_modules/protobufjs/src/util/codegen.js
  var require_codegen = __commonJS({
    "node_modules/protobufjs/src/util/codegen.js"(exports, module) {
      "use strict";
      module.exports = codegen;
      var patterns = require_patterns();
      var reservedRe = patterns.reservedRe;
      function codegen(functionParams, functionName) {
        if (typeof functionParams === "string") {
          functionName = functionParams;
          functionParams = void 0;
        }
        var body = [];
        function Codegen(formatStringOrScope) {
          if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
              console.log("codegen: " + source);
            source = "return " + source;
            if (formatStringOrScope) {
              var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
              while (scopeOffset < scopeKeys.length) {
                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
              }
              scopeParams[scopeOffset] = source;
              return Function.apply(null, scopeParams).apply(null, scopeValues);
            }
            return Function(source)();
          }
          var formatParams = new Array(arguments.length - 1), formatOffset = 0;
          while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
          formatOffset = 0;
          formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
              case "d":
              case "f":
                return String(Number(value));
              case "i":
                return String(Math.floor(value));
              case "j":
                return JSON.stringify(value);
              case "s":
                return String(value);
            }
            return "%";
          });
          if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
          body.push(formatStringOrScope);
          return Codegen;
        }
        function toString(functionNameOverride) {
          return "function " + safeFunctionName(functionNameOverride || functionName) + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
        }
        Object.defineProperty(Codegen, "toString", {
          value: toString,
          writable: true,
          enumerable: true,
          configurable: true
        });
        return Codegen;
      }
      codegen.verbose = false;
      function safeFunctionName(name) {
        if (!name)
          return "";
        name = String(name).replace(/[^\w$]/g, "");
        if (!name)
          return "";
        if (/^\d/.test(name))
          name = "_" + name;
        return reservedRe.test(name) ? name + "_" : name;
      }
    }
  });

  // node_modules/protobufjs/src/util/fs.js
  var require_fs = __commonJS({
    "node_modules/protobufjs/src/util/fs.js"(exports, module) {
      "use strict";
      var fs3 = null;
      try {
        fs3 = require_browser_shims();
        if (!fs3 || !fs3.readFile || !fs3.readFileSync)
          fs3 = null;
      } catch (e) {
      }
      module.exports = fs3;
    }
  });

  // node_modules/protobufjs/src/util/fetch.js
  var require_fetch = __commonJS({
    "node_modules/protobufjs/src/util/fetch.js"(exports, module) {
      "use strict";
      module.exports = fetch;
      var asPromise = require_aspromise();
      var fs3 = require_fs();
      function fetch(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options)
          options = {};
        if (!callback)
          return asPromise(fetch, this, filename, options);
        if (!options.xhr && fs3 && fs3.readFile)
          return fs3.readFile(filename, function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
          });
        return fetch.xhr(filename, options, callback);
      }
      fetch.xhr = function fetch_xhr(filename, options, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function fetchOnReadyStateChange() {
          if (xhr.readyState !== 4)
            return void 0;
          if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));
          if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
              buffer = [];
              for (var i = 0; i < xhr.responseText.length; ++i)
                buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
          }
          return callback(null, xhr.responseText);
        };
        if (options.binary) {
          if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.responseType = "arraybuffer";
        }
        xhr.open("GET", filename);
        xhr.send();
      };
    }
  });

  // node_modules/protobufjs/src/util/path.js
  var require_path = __commonJS({
    "node_modules/protobufjs/src/util/path.js"(exports) {
      "use strict";
      var path = exports;
      var urlRe = /^[a-zA-Z][a-zA-Z0-9+.-]+:\/\//;
      function normalizeUrl(path2) {
        if (typeof URL === "undefined" || !urlRe.test(path2))
          return null;
        try {
          return new URL(path2).href;
        } catch (e) {
          return null;
        }
      }
      function resolveUrl(originPath, includePath) {
        if (typeof URL === "undefined" || !urlRe.test(originPath) || urlRe.test(includePath))
          return null;
        try {
          return new URL(includePath, originPath).href;
        } catch (e) {
          return null;
        }
      }
      var isAbsolute = (
        /**
         * Tests if the specified path is absolute.
         * @param {string} path Path to test
         * @returns {boolean} `true` if path is absolute
         */
        path.isAbsolute = function isAbsolute2(path2) {
          return /^(?:\/|\w+:|\\\\\w+)/.test(path2);
        }
      );
      var normalize = (
        /**
         * Normalizes the specified path.
         * @param {string} path Path to normalize
         * @returns {string} Normalized path
         */
        path.normalize = function normalize2(path2) {
          var normalizedUrl = normalizeUrl(path2);
          if (normalizedUrl)
            return normalizedUrl;
          var firstTwoCharacters = path2.substring(0, 2);
          var uncPrefix = "";
          if (firstTwoCharacters === "\\\\") {
            uncPrefix = firstTwoCharacters;
            path2 = path2.substring(2);
          }
          path2 = path2.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
          var parts = path2.split("/"), absolute = isAbsolute(path2), prefix = "";
          if (absolute)
            prefix = parts.shift() + "/";
          for (var i = 0; i < parts.length; ) {
            if (parts[i] === "..") {
              if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
              else if (absolute)
                parts.splice(i, 1);
              else
                ++i;
            } else if (parts[i] === ".")
              parts.splice(i, 1);
            else
              ++i;
          }
          return uncPrefix + prefix + parts.join("/");
        }
      );
      path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
        var resolvedUrl = resolveUrl(originPath, includePath);
        if (resolvedUrl)
          return resolvedUrl;
        if (!alreadyNormalized)
          includePath = normalize(includePath);
        if (isAbsolute(includePath))
          return includePath;
        if (!alreadyNormalized)
          originPath = normalize(originPath);
        return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
      };
    }
  });

  // node_modules/protobufjs/src/namespace.js
  var require_namespace = __commonJS({
    "node_modules/protobufjs/src/namespace.js"(exports, module) {
      "use strict";
      module.exports = Namespace;
      var ReflectionObject = require_object();
      Namespace.prototype = Object.create(ReflectionObject.prototype, {
        constructor: {
          value: Namespace,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Namespace.className = "Namespace";
      var Field = require_field();
      var util = require_util();
      var OneOf = require_oneof();
      var Type;
      var Service;
      var Enum;
      Namespace.fromJSON = function fromJSON(name, json, depth) {
        if (depth === void 0)
          depth = 0;
        if (depth > util.recursionLimit)
          throw Error("max depth exceeded");
        return new Namespace(name, json.options).addJSON(json.nested, depth);
      };
      function arrayToJSON(array, toJSONOptions) {
        if (!(array && array.length))
          return void 0;
        var obj = {};
        for (var i = 0; i < array.length; ++i)
          obj[array[i].name] = array[i].toJSON(toJSONOptions);
        return obj;
      }
      Namespace.arrayToJSON = arrayToJSON;
      Namespace.isReservedId = function isReservedId(reserved, id) {
        if (reserved) {
          for (var i = 0; i < reserved.length; ++i)
            if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id)
              return true;
        }
        return false;
      };
      Namespace.isReservedName = function isReservedName(reserved, name) {
        if (reserved) {
          for (var i = 0; i < reserved.length; ++i)
            if (reserved[i] === name)
              return true;
        }
        return false;
      };
      function Namespace(name, options) {
        ReflectionObject.call(this, name, options);
        this.nested = void 0;
        this._nestedArray = null;
        this._lookupCache = /* @__PURE__ */ Object.create(null);
        this._needsRecursiveFeatureResolution = true;
        this._needsRecursiveResolve = true;
      }
      function clearCache(namespace) {
        namespace._nestedArray = null;
        namespace._lookupCache = /* @__PURE__ */ Object.create(null);
        var parent = namespace;
        while (parent = parent.parent) {
          parent._lookupCache = /* @__PURE__ */ Object.create(null);
        }
        return namespace;
      }
      Object.defineProperty(Namespace.prototype, "nestedArray", {
        get: function() {
          return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }
      });
      Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
        return util.toObject([
          "options",
          this.options,
          "nested",
          arrayToJSON(this.nestedArray, toJSONOptions)
        ]);
      };
      Namespace.prototype.addJSON = function addJSON(nestedJson, depth) {
        if (depth === void 0)
          depth = 0;
        if (depth > util.recursionLimit)
          throw Error("max depth exceeded");
        var ns = this;
        if (nestedJson) {
          for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add(
              // most to least likely
              (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested, depth + 1)
            );
          }
        }
        return this;
      };
      Namespace.prototype.get = function get(name) {
        return this.nested && Object.prototype.hasOwnProperty.call(this.nested, name) ? this.nested[name] : null;
      };
      Namespace.prototype.getEnum = function getEnum(name) {
        if (this.nested && Object.prototype.hasOwnProperty.call(this.nested, name) && this.nested[name] instanceof Enum)
          return this.nested[name].values;
        throw Error("no such enum: " + name);
      };
      Namespace.prototype.add = function add(object) {
        if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace))
          throw TypeError("object must be a valid nested object");
        if (object.name === "__proto__")
          return this;
        if (!this.nested)
          this.nested = {};
        else {
          var prev = this.get(object.name);
          if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
              var nested = prev.nestedArray;
              for (var i = 0; i < nested.length; ++i)
                object.add(nested[i]);
              this.remove(prev);
              if (!this.nested)
                this.nested = {};
              object.setOptions(prev.options, true);
            } else
              throw Error("duplicate name '" + object.name + "' in " + this);
          }
        }
        this.nested[object.name] = object;
        if (!(this instanceof Type || this instanceof Service || this instanceof Enum || this instanceof Field)) {
          if (!object._edition) {
            object._edition = object._defaultEdition;
          }
        }
        this._needsRecursiveFeatureResolution = true;
        this._needsRecursiveResolve = true;
        var parent = this;
        while (parent = parent.parent) {
          parent._needsRecursiveFeatureResolution = true;
          parent._needsRecursiveResolve = true;
        }
        object.onAdd(this);
        return clearCache(this);
      };
      Namespace.prototype.remove = function remove(object) {
        if (!(object instanceof ReflectionObject))
          throw TypeError("object must be a ReflectionObject");
        if (object.parent !== this)
          throw Error(object + " is not a member of " + this);
        if (!util.remove(this.nested, object, object.name))
          throw Error(object + " is not a member of " + this);
        if (!Object.keys(this.nested).length)
          this.nested = void 0;
        object.onRemove(this);
        return clearCache(this);
      };
      Namespace.prototype.define = function define2(path, json) {
        if (util.isString(path))
          path = path.split(".");
        else if (!Array.isArray(path))
          throw TypeError("illegal path");
        if (path && path.length && path[0] === "")
          throw Error("path must be relative");
        if (path.length > util.recursionLimit)
          throw Error("max depth exceeded");
        var ptr = this;
        while (path.length > 0) {
          var part = path.shift();
          if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
              throw Error("path conflicts with non-namespace objects");
          } else
            ptr.add(ptr = new Namespace(part));
        }
        if (json)
          ptr.addJSON(json);
        return ptr;
      };
      Namespace.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        if (this._needsRecursiveFeatureResolution)
          this._resolveFeaturesRecursive(this._edition);
        var nested = this.nestedArray, i = 0;
        this.resolve();
        while (i < nested.length)
          if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
          else
            nested[i++].resolve();
        this._needsRecursiveResolve = false;
        return this;
      };
      Namespace.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        this._needsRecursiveFeatureResolution = false;
        edition = this._edition || edition;
        ReflectionObject.prototype._resolveFeaturesRecursive.call(this, edition);
        this.nestedArray.forEach((nested) => {
          nested._resolveFeaturesRecursive(edition);
        });
        return this;
      };
      Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
        if (typeof filterTypes === "boolean") {
          parentAlreadyChecked = filterTypes;
          filterTypes = void 0;
        } else if (filterTypes && !Array.isArray(filterTypes))
          filterTypes = [filterTypes];
        if (util.isString(path) && path.length) {
          if (path === ".")
            return this.root;
          path = path.split(".");
        } else if (!path.length)
          return this;
        var flatPath = path.join(".");
        if (path[0] === "")
          return this.root.lookup(path.slice(1), filterTypes);
        var found = this._lookupImpl(path, flatPath);
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
          return found;
        }
        found = this.root._fullyQualifiedObjects && this.root._fullyQualifiedObjects["." + flatPath];
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
          return found;
        }
        if (parentAlreadyChecked)
          return null;
        var current = this;
        while (current.parent) {
          found = current.parent._lookupImpl(path, flatPath);
          if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
            return found;
          }
          current = current.parent;
        }
        return null;
      };
      Namespace.prototype._lookupImpl = function lookup(path, flatPath) {
        if (Object.prototype.hasOwnProperty.call(this._lookupCache, flatPath)) {
          return this._lookupCache[flatPath];
        }
        var found = this.get(path[0]);
        var exact = null;
        if (found) {
          if (path.length === 1) {
            exact = found;
          } else if (found instanceof Namespace) {
            path = path.slice(1);
            exact = found._lookupImpl(path, path.join("."));
          }
        } else {
          for (var i = 0; i < this.nestedArray.length; ++i)
            if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i]._lookupImpl(path, flatPath))) {
              exact = found;
              break;
            }
        }
        this._lookupCache[flatPath] = exact;
        return exact;
      };
      Namespace.prototype.lookupType = function lookupType(path) {
        var found = this.lookup(path, [Type]);
        if (!found)
          throw Error("no such type: " + path);
        return found;
      };
      Namespace.prototype.lookupEnum = function lookupEnum(path) {
        var found = this.lookup(path, [Enum]);
        if (!found)
          throw Error("no such Enum '" + path + "' in " + this);
        return found;
      };
      Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
        var found = this.lookup(path, [Type, Enum]);
        if (!found)
          throw Error("no such Type or Enum '" + path + "' in " + this);
        return found;
      };
      Namespace.prototype.lookupService = function lookupService(path) {
        var found = this.lookup(path, [Service]);
        if (!found)
          throw Error("no such Service '" + path + "' in " + this);
        return found;
      };
      Namespace._configure = function(Type_, Service_, Enum_) {
        Type = Type_;
        Service = Service_;
        Enum = Enum_;
      };
    }
  });

  // node_modules/protobufjs/src/mapfield.js
  var require_mapfield = __commonJS({
    "node_modules/protobufjs/src/mapfield.js"(exports, module) {
      "use strict";
      module.exports = MapField;
      var Field = require_field();
      MapField.prototype = Object.create(Field.prototype, {
        constructor: {
          value: MapField,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      MapField.className = "MapField";
      var types = require_types();
      var util = require_util();
      function MapField(name, id, keyType, type, options, comment) {
        Field.call(this, name, id, type, void 0, void 0, options, comment);
        if (!util.isString(keyType))
          throw TypeError("keyType must be a string");
        this.keyType = keyType;
        this.resolvedKeyType = null;
        this.map = true;
      }
      MapField.fromJSON = function fromJSON(name, json) {
        var field = new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
        if (json.protoName)
          field.protoName = json.protoName;
        if (json.jsonName !== void 0)
          field.jsonName = json.jsonName;
        else if (json.options && json.options.json_name !== void 0)
          field.jsonName = json.options.json_name;
        return field;
      };
      MapField.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "keyType",
          this.keyType,
          "type",
          this.type,
          "id",
          this.id,
          "extend",
          this.extend,
          "protoName",
          this.protoName !== this.name ? this.protoName : void 0,
          "jsonName",
          this.jsonName !== util.jsonName(this.protoName || this.name) ? this.jsonName : void 0,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      MapField.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if (types.mapKey[this.keyType] === void 0)
          throw Error("invalid key type: " + this.keyType);
        return Field.prototype.resolve.call(this);
      };
      MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
        if (typeof fieldValueType === "function")
          fieldValueType = util.decorateType(fieldValueType).name;
        else if (fieldValueType && typeof fieldValueType === "object")
          fieldValueType = util.decorateEnum(fieldValueType).name;
        return function mapFieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
        };
      };
    }
  });

  // node_modules/protobufjs/src/method.js
  var require_method = __commonJS({
    "node_modules/protobufjs/src/method.js"(exports, module) {
      "use strict";
      module.exports = Method;
      var ReflectionObject = require_object();
      Method.prototype = Object.create(ReflectionObject.prototype, {
        constructor: {
          value: Method,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Method.className = "Method";
      var util = require_util();
      function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
        if (util.isObject(requestStream)) {
          options = requestStream;
          requestStream = responseStream = void 0;
        } else if (util.isObject(responseStream)) {
          options = responseStream;
          responseStream = void 0;
        }
        if (!(type === void 0 || util.isString(type)))
          throw TypeError("type must be a string");
        if (!util.isString(requestType))
          throw TypeError("requestType must be a string");
        if (!util.isString(responseType))
          throw TypeError("responseType must be a string");
        ReflectionObject.call(this, name, options);
        this.type = type || "rpc";
        this.requestType = requestType;
        this.requestStream = requestStream ? true : void 0;
        this.responseType = responseType;
        this.responseStream = responseStream ? true : void 0;
        this.path = "/" + this.name;
        this.resolvedRequestType = null;
        this.resolvedResponseType = null;
        this.comment = comment;
        this.parsedOptions = parsedOptions;
      }
      Method.fromJSON = function fromJSON(name, json) {
        return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
      };
      Method.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "type",
          this.type !== "rpc" && /* istanbul ignore next */
          this.type || void 0,
          "requestType",
          this.requestType,
          "requestStream",
          this.requestStream,
          "responseType",
          this.responseType,
          "responseStream",
          this.responseStream,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0,
          "parsedOptions",
          this.parsedOptions
        ]);
      };
      Method.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if (this.parent) {
          var serviceName = this.parent.fullName;
          if (serviceName.charAt(0) === ".")
            serviceName = serviceName.substring(1);
          this.path = "/" + serviceName + "/" + this.name;
        } else
          this.path = "/" + this.name;
        this.resolvedRequestType = this.parent.lookupType(this.requestType);
        this.resolvedResponseType = this.parent.lookupType(this.responseType);
        return ReflectionObject.prototype.resolve.call(this);
      };
    }
  });

  // node_modules/protobufjs/src/service.js
  var require_service2 = __commonJS({
    "node_modules/protobufjs/src/service.js"(exports, module) {
      "use strict";
      module.exports = Service;
      var Namespace = require_namespace();
      Service.prototype = Object.create(Namespace.prototype, {
        constructor: {
          value: Service,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Service.className = "Service";
      var Method = require_method();
      var util = require_util();
      var rpc = require_rpc();
      function Service(name, options) {
        Namespace.call(this, name, options);
        this.methods = {};
        this._methodsArray = null;
      }
      Service.fromJSON = function fromJSON(name, json, depth) {
        if (depth === void 0)
          depth = 0;
        if (depth > util.recursionLimit)
          throw Error("max depth exceeded");
        var service = new Service(name, json.options);
        if (json.methods)
          for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
            service.add(Method.fromJSON(names[i], json.methods[names[i]]));
        if (json.nested)
          service.addJSON(json.nested, depth);
        if (json.edition)
          service._edition = json.edition;
        service.comment = json.comment;
        service._defaultEdition = "proto3";
        return service;
      };
      Service.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          inherited && inherited.options || void 0,
          "methods",
          Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */
          {},
          "nested",
          inherited && inherited.nested || void 0,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      Object.defineProperty(Service.prototype, "methodsArray", {
        get: function() {
          return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }
      });
      function clearCache(service) {
        service._methodsArray = null;
        return service;
      }
      Service.prototype.get = function get(name) {
        return Object.prototype.hasOwnProperty.call(this.methods, name) ? this.methods[name] : Namespace.prototype.get.call(this, name);
      };
      Service.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        Namespace.prototype.resolve.call(this);
        var methods = this.methodsArray;
        for (var i = 0; i < methods.length; ++i)
          methods[i].resolve();
        return this;
      };
      Service.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        edition = this._edition || edition;
        Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
        this.methodsArray.forEach((method) => {
          method._resolveFeaturesRecursive(edition);
        });
        return this;
      };
      Service.prototype.add = function add(object) {
        if (this.get(object.name))
          throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Method) {
          if (object.name === "__proto__")
            return this;
          this.methods[object.name] = object;
          object.parent = this;
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      };
      Service.prototype.remove = function remove(object) {
        if (object instanceof Method) {
          if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.methods[object.name];
          object.parent = null;
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      };
      Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
        for (var i = 0, method; i < /* initializes */
        this.methodsArray.length; ++i) {
          var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
          rpcService[methodName] = /* @__PURE__ */ (function(method2, requestType, responseType) {
            return function rpcMethod(request, callback) {
              return rpc.Service.prototype.rpcCall.call(this, method2, requestType, responseType, request, callback);
            };
          })(method, method.resolvedRequestType.ctor, method.resolvedResponseType.ctor);
        }
        return rpcService;
      };
    }
  });

  // node_modules/protobufjs/src/message.js
  var require_message = __commonJS({
    "node_modules/protobufjs/src/message.js"(exports, module) {
      "use strict";
      module.exports = Message;
      var util = require_minimal();
      function Message(properties) {
        if (properties) {
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null && keys[i] !== "__proto__")
              this[keys[i]] = properties[keys[i]];
        }
      }
      Message.create = function create(properties) {
        return this.$type.create(properties);
      };
      Message.encode = function encode(message, writer) {
        return this.$type.encode(message, writer);
      };
      Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.$type.encodeDelimited(message, writer);
      };
      Message.decode = function decode(reader) {
        return this.$type.decode(reader);
      };
      Message.decodeDelimited = function decodeDelimited(reader) {
        return this.$type.decodeDelimited(reader);
      };
      Message.verify = function verify(message) {
        return this.$type.verify(message);
      };
      Message.fromObject = function fromObject(object) {
        return this.$type.fromObject(object);
      };
      Message.toObject = function toObject(message, options) {
        return this.$type.toObject(message, options);
      };
      Message.prototype.toJSON = function toJSON() {
        return this.$type.toObject(this, util.toJSONOptions);
      };
    }
  });

  // node_modules/protobufjs/src/decoder.js
  var require_decoder = __commonJS({
    "node_modules/protobufjs/src/decoder.js"(exports, module) {
      "use strict";
      module.exports = decoder;
      var Enum = require_enum();
      var types = require_types();
      var util = require_util();
      function missing(field) {
        return "missing required '" + field.name + "'";
      }
      function stringMethod(field) {
        return field._features.utf8_validation === "VERIFY" ? "stringVerify" : "string";
      }
      function genPreserveUnknown(gen, ref) {
        return gen("if(!r.discardUnknown){")('util.makeProp(m,"$unknowns",false);')("(m.$unknowns||(m.$unknowns=[])).push(%s)", ref)("}");
      }
      function decoder(mtype) {
        var hasMapField = false, needsValueVar = false, i = 0;
        for (; i < mtype.fieldsArray.length; ++i) {
          var pfield = mtype._fieldsArray[i];
          if (pfield.map)
            hasMapField = true;
          if (pfield.resolvedType instanceof Enum || !pfield.repeated && !pfield.map && !pfield.hasPresence)
            needsValueVar = true;
        }
        var gen = util.codegen(["r", "l", "z", "q", "g"])("if(!(r instanceof Reader))")("r=Reader.create(r)")("if(q===undefined)q=0")("if(q>Reader.recursionLimit)")('throw Error("max depth exceeded")')("var c=l===undefined?r.len:r.pos+l,m=g||new C" + (hasMapField ? ",k,v" : needsValueVar ? ",v" : ""))("while(r.pos<c){")("var s=r.pos")("var t=r.tag()")("if(t===z){")("z=undefined")("break")("}");
        if (mtype.fieldsArray.length) gen("var u=t&7")("switch(t>>>=3){");
        for (i = 0; i < /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name), closed = field.resolvedType instanceof Enum && field.resolvedType._features.enum_type === "CLOSED";
          if (field.map) {
            gen("case %i:{", field.id)("if(u!==2)")("break");
            if (!closed) gen("if(%s===util.emptyObject)", ref)("%s={}", ref);
            gen("var c2=r.uint32()+r.pos");
            if (types.defaults[field.keyType] !== void 0) gen("k=%j", types.defaults[field.keyType]);
            else gen("k=null");
            if (types.long[type] !== void 0) gen("v=util.Long?util.Long.fromNumber(0,%j):0", type === "uint64" || type === "fixed64");
            else if (types.defaults[type] !== void 0) gen("v=%j", types.defaults[type]);
            else gen("v=null");
            gen("while(r.pos<c2){")("var t2=r.tag()")("u=t2&7")("switch(t2>>>=3){")("case 1:")("if(u!==%i)", types.mapKey[field.keyType])("break")("k=r.%s()", field.keyType === "string" ? stringMethod(field) : field.keyType)("continue")("case 2:")("if(u!==%i)", types.basic[type] === void 0 ? 2 : types.basic[type])("break");
            if (types.basic[type] === void 0) gen("v=types[%i].decode(r,r.uint32(),undefined,q+1,v)", i);
            else gen("v=r.%s()", type === "string" ? stringMethod(field) : type);
            gen("continue")("}")("r.skipType(u,q,t2)")("}");
            if (closed) {
              gen("if(types[%i].valuesById[v]===undefined){", i);
              genPreserveUnknown(gen, "r.raw(s,r.pos)")("continue")("}")("if(%s===util.emptyObject)", ref)("%s={}", ref);
            }
            var val = types.basic[type] === void 0 ? "v||new types[" + i + "].ctor" : "v";
            if (types.long[field.keyType] !== void 0) gen('%s[typeof k==="object"?util.longToHash(k):k]=%s', ref, val);
            else {
              if (field.keyType === "string") gen('if(k==="__proto__")')("util.makeProp(%s,k)", ref);
              gen("%s[k]=%s", ref, val);
            }
          } else if (field.repeated) {
            gen("case %i:", field.id)("{");
            if (types.packed[type] !== void 0) {
              gen("if(u===2){");
              if (closed) {
                gen("var c2=r.uint32()+r.pos")("while(r.pos<c2){")("s=r.pos")("v=r.%s()", type)("if(types[%i].valuesById[v]!==undefined){", i)("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref)("%s.push(v)", ref)("}else");
                genPreserveUnknown(gen, "util.rawField(" + field.id + ",0,r.raw(s,r.pos))")("}");
              } else gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref)("r.%ss(%s)", type, ref);
              gen("continue")("}");
            }
            gen("if(u!==%i)", types.basic[type] === void 0 ? field.delimited ? 3 : 2 : types.basic[type])("break");
            if (!closed) gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
            if (types.basic[type] === void 0) {
              if (field.delimited) gen("%s.push(types[%i].decode(r,undefined,%i,q+1))", ref, i, field.id * 8 + 4);
              else gen("%s.push(types[%i].decode(r,r.uint32(),undefined,q+1))", ref, i);
            } else if (closed) {
              gen("v=r.%s()", type)("if(types[%i].valuesById[v]!==undefined){", i)("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref)("%s.push(v)", ref)("}else");
              genPreserveUnknown(gen, "r.raw(s,r.pos)");
            } else gen("%s.push(r.%s())", ref, type === "string" ? stringMethod(field) : type);
          } else if (types.basic[type] === void 0) {
            gen("case %i:{", field.id)("if(u!==%i)", field.delimited ? 3 : 2)("break");
            if (field.delimited) gen("%s=types[%i].decode(r,undefined,%i,q+1,%s)", ref, i, field.id * 8 + 4, ref);
            else gen("%s=types[%i].decode(r,r.uint32(),undefined,q+1,%s)", ref, i, ref);
          } else if (field.hasPresence) {
            gen("case %i:{", field.id)("if(u!==%i)", types.basic[type])("break");
            if (closed) {
              gen("v=r.%s()", type)("if(types[%i].valuesById[v]!==undefined){", i)("%s=v", ref);
              if (field.partOf) gen("m%s=%j", util.safeProp(field.partOf.name), field.name);
              gen("}else");
              genPreserveUnknown(gen, "r.raw(s,r.pos)");
            } else gen("%s=r.%s()", ref, type === "string" ? stringMethod(field) : type);
          } else {
            gen("case %i:{", field.id)("if(u!==%i)", types.basic[type])("break");
            if (closed) {
              gen("v=r.%s()", type)("if(types[%i].valuesById[v]!==undefined){", i)("if(v!==%j)", field.typeDefault)("%s=v", ref)("else")("delete %s", ref)("}else{");
              genPreserveUnknown(gen, "r.raw(s,r.pos)")("}");
            } else {
              if (field.resolvedType instanceof Enum && field.typeDefault !== 0) gen("if((v=r.%s())!==%j)", type, field.typeDefault);
              else if (type === "string") gen("if((v=r.%s()).length)", stringMethod(field));
              else if (type === "bytes") gen("if((v=r.%s()).length)", type);
              else if (types.long[type] !== void 0) gen('if(typeof(v=r.%s())==="object"?v.low||v.high:v!==0)', type);
              else if (type === "double" || type === "float") gen("if(!Object.is(v=r.%s(),0))", type);
              else gen("if(v=r.%s())", type);
              gen("%s=v", ref)("else")("delete %s", ref);
            }
          }
          if (field.partOf && !closed) gen("m%s=%j", util.safeProp(field.partOf.name), field.name);
          gen("continue")("}");
        }
        if (i) gen("}");
        gen("r.skipType(%s,q,t)", i ? "u" : "t&7");
        genPreserveUnknown(gen, "r.raw(s,r.pos)")("}")("if(z!==undefined)")('throw Error("missing end group")');
        for (i = 0; i < mtype._fieldsArray.length; ++i) {
          var rfield = mtype._fieldsArray[i];
          if (rfield.required) gen("if(!Object.hasOwnProperty.call(m,%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
        }
        return gen("return m");
      }
    }
  });

  // node_modules/protobufjs/src/verifier.js
  var require_verifier = __commonJS({
    "node_modules/protobufjs/src/verifier.js"(exports, module) {
      "use strict";
      module.exports = verifier;
      var Enum = require_enum();
      var util = require_util();
      function invalid(field, expected) {
        return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
      }
      function genVerifyValue(gen, field, fieldIndex, ref) {
        var resolvedType = field.resolvedType;
        if (resolvedType) {
          if (resolvedType instanceof Enum) {
            if (resolvedType._features.enum_type === "CLOSED") {
              gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
              for (var keys = Object.keys(resolvedType.values), j = 0; j < keys.length; ++j) gen("case %i:", resolvedType.values[keys[j]]);
              gen("break")("}");
            } else gen('if(typeof %s!=="number"||(%s|0)!==%s)', ref, ref, ref)("return%j", invalid(field, "enum value"));
          } else {
            gen("{")("var e=types[%i].verify(%s,q+1);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
          }
        } else {
          switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
              gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
              break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
              break;
            case "float":
            case "double":
              gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
              break;
            case "bool":
              gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
              break;
            case "string":
              gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
              break;
            case "bytes":
              gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
              break;
          }
        }
        return gen;
      }
      function genVerifyKey(gen, field, ref) {
        switch (field.keyType) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
            break;
          case "bool":
            gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
            break;
        }
        return gen;
      }
      function verifier(mtype) {
        var gen = util.codegen(["m", "q"])('if(typeof m!=="object"||m===null)')("return%j", "object expected")("if(q===undefined)q=0")("if(q>util.recursionLimit)")("return%j", "max depth exceeded");
        var oneofs = mtype.oneofsArray, seenFirstField = {};
        if (oneofs.length) gen("var p={}");
        for (var i = 0; i < /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
          if (field.optional) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name);
          if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
          } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i, ref + "[i]")("}");
          } else {
            if (field.partOf) {
              var oneofProp = util.safeProp(field.partOf.name);
              if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
              seenFirstField[field.partOf.name] = 1;
              gen("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
          }
          if (field.optional) gen("}");
        }
        return gen("return null");
      }
    }
  });

  // node_modules/protobufjs/src/converter.js
  var require_converter = __commonJS({
    "node_modules/protobufjs/src/converter.js"(exports) {
      "use strict";
      var converter = exports;
      var Enum = require_enum();
      var types = require_types();
      var util = require_util();
      function genValuePartial_fromObject(gen, field, fieldIndex, prop, dstProp) {
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            var dst = dstProp ? "m" + dstProp + "[m" + dstProp + ".length]" : "m" + prop;
            gen("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
              gen("case%j:", keys[i])("case %i:", values[keys[i]])("%s=%j", dst, values[keys[i]])("break");
            }
            gen("default:");
            if (field.resolvedType._features.enum_type !== "CLOSED") {
              gen('if(typeof d%s==="number"&&(d%s|0)===d%s)', prop, prop, prop)("%s=d%s", dst, prop);
            }
            gen("}");
          } else gen("if(!util.isObject(d%s))", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s,q+1)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;
          switch (field.type) {
            case "double":
            case "float":
              gen("m%s=Number(d%s)", prop, prop);
              break;
            case "uint32":
            case "fixed32":
              gen("m%s=d%s>>>0", prop, prop);
              break;
            case "int32":
            case "sint32":
            case "sfixed32":
              gen("m%s=d%s|0", prop, prop);
              break;
            case "uint64":
            case "fixed64":
              isUnsigned = true;
            // eslint-disable-next-line no-fallthrough
            case "int64":
            case "sint64":
            case "sfixed64":
              gen("if(util.Long)")("m%s=util.Long.fromValue(d%s,%j)", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
              break;
            case "bytes":
              gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length>=0)", prop)("m%s=d%s", prop, prop);
              break;
            case "string":
              gen("m%s=String(d%s)", prop, prop);
              break;
            case "bool":
              gen("m%s=Boolean(d%s)", prop, prop);
              break;
          }
        }
        return gen;
      }
      converter.fromObject = function fromObject(mtype) {
        var fields = mtype.fieldsArray;
        var gen = util.codegen(["d", "q"])("if(d instanceof C)")("return d")("if(!util.isObject(d))")("throw TypeError(%j)", mtype.fullName + ": object expected")("if(q===undefined)q=0")("if(q>util.recursionLimit)")('throw Error("max depth exceeded")');
        if (!fields.length) return gen("return new C");
        gen("var m=new C");
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(), prop = util.safeProp(field.name), implicitPresence = !field.hasPresence && !field.repeated && !field.map && (field.resolvedType instanceof Enum || types.basic[field.type] !== void 0);
          if (field.map) {
            gen("if(d%s){", prop)("if(!util.isObject(d%s))", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            gen('if(ks[i]==="__proto__")')("util.makeProp(m%s,ks[i])", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i,
              prop + "[ks[i]]"
            )("}")("}");
          } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected");
            if (field.resolvedType instanceof Enum) gen("m%s=[]", prop);
            else gen("m%s=Array(d%s.length)", prop, prop);
            gen("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i,
              prop + "[i]",
              field.resolvedType instanceof Enum ? prop : void 0
            )("}")("}");
          } else {
            if (!(field.resolvedType instanceof Enum)) gen("if(d%s!=null){", prop);
            if (implicitPresence) {
              if (field.resolvedType instanceof Enum) gen('if(d%s!==%j&&(typeof d%s!=="string"||types[%i].values[d%s]!==%j)){', prop, field.typeDefault, prop, i, prop, field.typeDefault);
              else if (field.type === "string") gen('if(typeof d%s!=="string"||d%s.length){', prop, prop);
              else if (field.type === "bytes") gen("if(d%s.length){", prop);
              else if (field.type === "bool") gen("if(d%s){", prop);
              else if (field.type === "double" || field.type === "float") gen("if(!Object.is(Number(d%s),0)){", prop);
              else if (types.long[field.type] !== void 0) gen('if(typeof d%s==="object"?d%s.low||d%s.high:Number(d%s)!==0){', prop, prop, prop, prop);
              else gen("if(Number(d%s)!==0){", prop);
            }
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i,
              prop
            );
            if (implicitPresence) gen("}");
            if (!(field.resolvedType instanceof Enum)) gen("}");
          }
        }
        return gen("return m");
      };
      function genValuePartial_toObject(gen, field, fieldIndex, dstProp, srcProp) {
        if (!srcProp)
          srcProp = dstProp;
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", dstProp, fieldIndex, srcProp, srcProp, fieldIndex, srcProp, srcProp);
          else gen("d%s=types[%i].toObject(m%s,o,q+1)", dstProp, fieldIndex, srcProp);
        } else {
          var isUnsigned = false;
          switch (field.type) {
            case "double":
            case "float":
              gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", dstProp, srcProp, srcProp, srcProp);
              break;
            case "uint64":
            case "fixed64":
              isUnsigned = true;
            // eslint-disable-next-line no-fallthrough
            case "int64":
            case "sint64":
            case "sfixed64":
              gen('if(typeof BigInt!=="undefined"&&o.longs===BigInt)')('d%s=typeof m%s==="number"?BigInt(m%s):util.Long.fromBits(m%s.low>>>0,m%s.high>>>0,%j).toBigInt()', dstProp, srcProp, srcProp, srcProp, srcProp, isUnsigned)('else if(typeof m%s==="number")', srcProp)("d%s=o.longs===String?String(m%s):m%s", dstProp, srcProp, srcProp)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", dstProp, srcProp, srcProp, srcProp, isUnsigned ? "true" : "", srcProp);
              break;
            case "bytes":
              gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", dstProp, srcProp, srcProp, srcProp, srcProp);
              break;
            default:
              gen("d%s=m%s", dstProp, srcProp);
              break;
          }
        }
        return gen;
      }
      converter.toObject = function toObject(mtype) {
        var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
        if (!fields.length)
          return util.codegen()("return {}");
        var gen = util.codegen(["m", "o", "q"])("if(!o)")("o={}")("if(q===undefined)q=0")("if(q>util.recursionLimit)")('throw Error("max depth exceeded")')("var d={}");
        var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
        for (; i < fields.length; ++i)
          if (!fields[i].partOf)
            (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
        if (repeatedFields.length) {
          gen("if(o.arrays||o.defaults){");
          for (i = 0; i < repeatedFields.length; ++i) gen("d%s=[]", util.safeProp(repeatedFields[i].name));
          gen("}");
        }
        if (mapFields.length) {
          gen("if(o.objects||o.defaults){");
          for (i = 0; i < mapFields.length; ++i) gen("d%s={}", util.safeProp(mapFields[i].name));
          gen("}");
        }
        if (normalFields.length) {
          gen("if(o.defaults){");
          for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i], prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)('d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():typeof BigInt!=="undefined"&&o.longs===BigInt?n.toBigInt():n', prop)("}else")('d%s=o.longs===String?%j:typeof BigInt!=="undefined"&&o.longs===BigInt?BigInt(%j):%i', prop, field.typeDefault.toString(), field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
              var arrayDefault = Array.prototype.slice.call(field.typeDefault);
              gen("if(o.bytes===String)d%s=%j", prop, util.base64.encode(field.typeDefault, 0, field.typeDefault.length))("else{")("d%s=%j", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
            } else gen("d%s=%j", prop, field.typeDefault);
          }
          gen("}");
        }
        var hasKs2 = false;
        for (i = 0; i < fields.length; ++i) {
          var field = fields[i], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
          if (field.map) {
            if (!hasKs2) {
              hasKs2 = true;
              gen("var ks2");
            }
            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop);
            var longKey = types.long[field.keyType] !== void 0, srcProp = prop + "[ks2[j]]";
            gen("for(var j=0;j<ks2.length;++j){");
            if (longKey) gen("var k2=util.longFromKey(ks2[j],%j).toString()", field.keyType === "uint64" || field.keyType === "fixed64");
            gen('if(ks2[j]==="__proto__")')("util.makeProp(d%s,ks2[j])", prop);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index,
              longKey ? prop + "[k2]" : srcProp,
              srcProp
            )("}");
          } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=Array(m%s.length)", prop, prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index,
              prop + "[j]"
            )("}");
          } else {
            gen("if(m%s!=null&&Object.hasOwnProperty.call(m,%j)){", prop, field.name);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index,
              prop
            );
            if (field.partOf && !field.partOf.isProto3Optional) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
          }
          gen("}");
        }
        return gen("return d");
      };
    }
  });

  // node_modules/protobufjs/src/wrappers.js
  var require_wrappers = __commonJS({
    "node_modules/protobufjs/src/wrappers.js"(exports) {
      "use strict";
      var wrappers = exports;
      var Message = require_message();
      var util = require_minimal();
      wrappers[".google.protobuf.Any"] = {
        fromObject: function(object, depth) {
          if (object && object["@type"]) {
            var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
            var type = this.lookup(name, [this.constructor]);
            if (type) {
              var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
              if (type_url.indexOf("/") === -1) {
                type_url = "/" + type_url;
              }
              return this.create({
                type_url,
                value: type.encode(type.fromObject(object, depth === void 0 ? 1 : depth + 1)).finish()
              });
            }
          }
          return this.fromObject(object, depth);
        },
        toObject: function(message, options, depth) {
          if (depth === void 0)
            depth = 0;
          if (depth > util.recursionLimit)
            throw Error("max depth exceeded");
          var googleApi = "type.googleapis.com/";
          var prefix = "";
          var name = "";
          if (options && options.json && message.type_url && message.value) {
            name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name, [this.constructor]);
            if (type)
              message = type.decode(message.value, void 0, void 0, depth + 1);
          }
          if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options, depth + 1);
            var messageName = message.$type.fullName[0] === "." ? message.$type.fullName.slice(1) : message.$type.fullName;
            if (prefix === "") {
              prefix = googleApi;
            }
            name = prefix + messageName;
            object["@type"] = name;
            return object;
          }
          return this.toObject(message, options, depth);
        }
      };
    }
  });

  // node_modules/protobufjs/src/type.js
  var require_type = __commonJS({
    "node_modules/protobufjs/src/type.js"(exports, module) {
      "use strict";
      module.exports = Type;
      var Namespace = require_namespace();
      Type.prototype = Object.create(Namespace.prototype, {
        constructor: {
          value: Type,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Type.className = "Type";
      var Enum = require_enum();
      var OneOf = require_oneof();
      var Field = require_field();
      var MapField = require_mapfield();
      var Service = require_service2();
      var Message = require_message();
      var Reader = require_reader();
      var Writer = require_writer();
      var util = require_util();
      var encoder = require_encoder();
      var decoder = require_decoder();
      var verifier = require_verifier();
      var converter = require_converter();
      var wrappers = require_wrappers();
      function Type(name, options) {
        name = name.replace(/\W/g, "");
        Namespace.call(this, name, options);
        this.fields = {};
        this.oneofs = void 0;
        this.extensions = void 0;
        this.reserved = void 0;
        this.group = void 0;
        this._fieldsById = null;
        this._fieldsArray = null;
        this._oneofsArray = null;
        this._ctor = null;
        this._fieldsByJsonName = null;
      }
      Object.defineProperties(Type.prototype, {
        /**
         * Message fields by id.
         * @name Type#fieldsById
         * @type {Object.<number,Field>}
         * @readonly
         */
        fieldsById: {
          get: function() {
            if (this._fieldsById)
              return this._fieldsById;
            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
              var field = this.fields[names[i]], id = field.id;
              if (this._fieldsById[id])
                throw Error("duplicate id " + id + " in " + this);
              this._fieldsById[id] = field;
            }
            return this._fieldsById;
          }
        },
        /**
         * Fields of this message as an array for iteration.
         * @name Type#fieldsArray
         * @type {Field[]}
         * @readonly
         */
        fieldsArray: {
          get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
          }
        },
        /**
         * Oneofs of this message as an array for iteration.
         * @name Type#oneofsArray
         * @type {OneOf[]}
         * @readonly
         */
        oneofsArray: {
          get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
          }
        },
        /**
         * The registered constructor, if any registered, otherwise a generic constructor.
         * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
         * When assigning manually, add the type to its parent namespace/root first if fields reference other reflected types, because constructor setup resolves field defaults.
         * @name Type#ctor
         * @type {Constructor<{}>}
         */
        ctor: {
          get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
          },
          set: function(ctor) {
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
              ctor.prototype = new Message();
              Object.defineProperty(ctor.prototype, "constructor", {
                value: ctor,
                writable: true,
                enumerable: false,
                configurable: true
              });
              util.merge(ctor.prototype, prototype);
            }
            ctor.$type = ctor.prototype.$type = this;
            util.merge(ctor, Message, true);
            this._ctor = ctor;
            delete this.decode;
            delete this.fromObject;
            var i = 0;
            for (var field; i < /* initializes */
            this.fieldsArray.length; ++i) {
              field = this._fieldsArray[i].resolve();
              ctor.prototype[field.name] = field.defaultValue;
            }
            var ctorProperties = {};
            for (i = 0; i < /* initializes */
            this.oneofsArray.length; ++i)
              ctorProperties[this._oneofsArray[i].resolve().name] = {
                get: util.oneOfGetter(this._oneofsArray[i].oneof),
                set: util.oneOfSetter(this._oneofsArray[i].oneof)
              };
            if (i)
              Object.defineProperties(ctor.prototype, ctorProperties);
          }
        }
      });
      Type.generateConstructor = function generateConstructor(mtype) {
        var gen = util.codegen(["p"]);
        for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
          if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));
          else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
        return gen('if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null&&ks[i]!=="__proto__")')("this[ks[i]]=p[ks[i]]");
      };
      function clearCache(type) {
        type._fieldsById = type._fieldsArray = type._oneofsArray = type._fieldsByJsonName = null;
        delete type.encode;
        delete type.decode;
        delete type.verify;
        return type;
      }
      Type.fromJSON = function fromJSON(name, json, depth) {
        if (depth === void 0)
          depth = 0;
        if (depth > util.nestingLimit)
          throw Error("max depth exceeded");
        var type = new Type(name, json.options);
        type.extensions = json.extensions;
        type.reserved = json.reserved;
        var names = Object.keys(json.fields), i = 0;
        for (; i < names.length; ++i)
          type.add(
            (typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]])
          );
        if (json.oneofs)
          for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
        if (json.nested)
          for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add(
              // most to least likely
              (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i], nested, depth + 1)
            );
          }
        if (json.extensions && json.extensions.length)
          type.extensions = json.extensions;
        if (json.reserved && json.reserved.length)
          type.reserved = json.reserved;
        if (json.group)
          type.group = true;
        if (json.comment)
          type.comment = json.comment;
        if (json.edition)
          type._edition = json.edition;
        type._defaultEdition = "proto3";
        return type;
      };
      Type.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          inherited && inherited.options || void 0,
          "oneofs",
          Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
          "fields",
          Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
            return !obj.declaringField;
          }), toJSONOptions) || {},
          "extensions",
          this.extensions && this.extensions.length ? this.extensions : void 0,
          "reserved",
          this.reserved && this.reserved.length ? this.reserved : void 0,
          "group",
          this.group || void 0,
          "nested",
          inherited && inherited.nested || void 0,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      Type.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        Namespace.prototype.resolveAll.call(this);
        var oneofs = this.oneofsArray;
        i = 0;
        while (i < oneofs.length)
          oneofs[i++].resolve();
        var fields = this.fieldsArray, i = 0;
        while (i < fields.length)
          fields[i++].resolve();
        return this;
      };
      Type.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        edition = this._edition || edition;
        Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
        this.oneofsArray.forEach((oneof) => {
          oneof._resolveFeatures(edition);
        });
        this.fieldsArray.forEach((field) => {
          field._resolveFeatures(edition);
        });
        return this;
      };
      Type.prototype.get = function get(name) {
        if (Object.prototype.hasOwnProperty.call(this.fields, name))
          return this.fields[name];
        if (this.oneofs && Object.prototype.hasOwnProperty.call(this.oneofs, name))
          return this.oneofs[name];
        if (this.nested && Object.prototype.hasOwnProperty.call(this.nested, name))
          return this.nested[name];
        return null;
      };
      Type.prototype.add = function add(object) {
        if (this.get(object.name))
          throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Field && object.extend === void 0) {
          if (this._fieldsById ? (
            /* istanbul ignore next */
            this._fieldsById[object.id]
          ) : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
          if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
          if (this.isReservedName(object.name) || object.name.charAt(0) === "$")
            throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.name === "__proto__")
            return this;
          if (object.parent)
            object.parent.remove(object);
          this.fields[object.name] = object;
          object.message = this;
          object.onAdd(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (object.name.charAt(0) === "$")
            throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.name === "__proto__")
            return this;
          if (!this.oneofs)
            this.oneofs = {};
          this.oneofs[object.name] = object;
          object.onAdd(this);
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      };
      Type.prototype.remove = function remove(object) {
        if (object instanceof Field && object.extend === void 0) {
          if (!util.remove(this.fields, object, object.name))
            throw Error(object + " is not a member of " + this);
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!util.remove(this.oneofs, object, object.name))
            throw Error(object + " is not a member of " + this);
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      };
      Type.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      Type.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
      Type.prototype.create = function create(properties) {
        return new this.ctor(properties);
      };
      Type.prototype.setup = function setup() {
        var root = this.root;
        if (root && root._needsRecursiveFeatureResolution) {
          var edition = root._edition || this._edition;
          if (edition)
            root._resolveFeaturesRecursive(edition);
        }
        var fullName = this.fullName, types = [];
        for (var i = 0; i < /* initializes */
        this.fieldsArray.length; ++i)
          types.push(this._fieldsArray[i].resolve().resolvedType);
        this.encode = encoder(this)({
          Writer,
          types,
          util
        });
        this.decode = decoder(this)({
          Reader,
          types,
          util,
          C: this.ctor
        });
        this.verify = verifier(this)({
          types,
          util
        });
        this.fromObject = converter.fromObject(this)({
          types,
          util,
          C: this.ctor
        });
        this.toObject = converter.toObject(this)({
          types,
          util
        });
        var wrapper = wrappers[fullName];
        if (wrapper) {
          var wrapperThis = Object.create(this);
          wrapperThis._ctor = this.ctor;
          wrapperThis.fromObject = this.fromObject;
          this.fromObject = wrapper.fromObject.bind(wrapperThis);
          wrapperThis.toObject = this.toObject;
          this.toObject = wrapper.toObject.bind(wrapperThis);
        }
        return this;
      };
      Type.prototype.encode = function encode_setup(message, writer) {
        return this.setup().encode.apply(this, arguments);
      };
      Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, (writer || Writer.create()).fork()).ldelim();
      };
      Type.prototype.decode = function decode_setup(reader, length) {
        return this.setup().decode.apply(this, arguments);
      };
      Type.prototype.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof Reader))
          reader = Reader.create(reader);
        return this.decode(reader, reader.uint32());
      };
      Type.prototype.verify = function verify_setup(message) {
        return this.setup().verify.apply(this, arguments);
      };
      Type.prototype.fromObject = function fromObject(object) {
        return this.setup().fromObject.apply(this, arguments);
      };
      Type.prototype.toObject = function toObject(message, options) {
        return this.setup().toObject.apply(this, arguments);
      };
      Type.prototype.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === void 0)
          prefix = "type.googleapis.com";
        var fullName = this.fullName;
        return prefix + "/" + (fullName.charAt(0) === "." ? fullName.substring(1) : fullName);
      };
      Type.d = function decorateType(typeName) {
        return function typeDecorator(target) {
          util.decorateType(target, typeName);
        };
      };
    }
  });

  // node_modules/protobufjs/src/root.js
  var require_root = __commonJS({
    "node_modules/protobufjs/src/root.js"(exports, module) {
      "use strict";
      module.exports = Root;
      var Namespace = require_namespace();
      Root.prototype = Object.create(Namespace.prototype, {
        constructor: {
          value: Root,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Root.className = "Root";
      var Field = require_field();
      var Enum = require_enum();
      var OneOf = require_oneof();
      var util = require_util();
      var Type;
      var parse;
      var common;
      function Root(options) {
        Namespace.call(this, "", options);
        this.deferred = [];
        this.files = [];
        this._edition = "proto2";
        this._fullyQualifiedObjects = {};
      }
      Root.fromJSON = function fromJSON(json, root, depth) {
        if (depth === void 0)
          depth = 0;
        if (depth > util.recursionLimit)
          throw Error("max depth exceeded");
        if (!root)
          root = new Root();
        if (json.options)
          root.setOptions(json.options);
        return root.addJSON(json.nested, depth).resolveAll();
      };
      Root.prototype.resolvePath = util.path.resolve;
      Root.prototype.fetch = util.fetch;
      function SYNC() {
      }
      Root.prototype.load = function load(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        var self2 = this;
        if (!callback) {
          return util.asPromise(load, self2, filename, options);
        }
        var sync = callback === SYNC;
        function finish(err, root) {
          if (!callback) {
            return;
          }
          if (sync) {
            throw err;
          }
          if (root) {
            root.resolveAll();
          }
          var cb = callback;
          callback = null;
          cb(err, root);
        }
        function getBundledFileName(filename2) {
          var idx = filename2.lastIndexOf("google/protobuf/");
          if (idx > -1) {
            var altname = filename2.substring(idx);
            if (Object.prototype.hasOwnProperty.call(common, altname)) return altname;
          }
          if (Object.prototype.hasOwnProperty.call(common, filename2)) return filename2;
          return null;
        }
        function process(filename2, source, depth) {
          if (depth === void 0)
            depth = 0;
          try {
            if (depth > util.recursionLimit)
              throw Error("max depth exceeded");
            if (util.isString(source) && source.charAt(0) === "{")
              source = JSON.parse(source);
            if (!util.isString(source))
              self2.setOptions(source.options).addJSON(source.nested);
            else {
              parse.filename = filename2;
              var parsed = parse(source, self2, options), resolved2, i2 = 0;
              if (parsed.imports) {
                for (; i2 < parsed.imports.length; ++i2)
                  if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                    fetch(resolved2, false, depth + 1);
              }
              if (parsed.weakImports) {
                for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
                  if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                    fetch(resolved2, true, depth + 1);
              }
            }
          } catch (err) {
            finish(err);
          }
          if (!sync && !queued) {
            finish(null, self2);
          }
        }
        function fetch(filename2, weak, depth) {
          if (depth === void 0)
            depth = 0;
          filename2 = getBundledFileName(filename2) || filename2;
          if (self2.files.indexOf(filename2) > -1) {
            return;
          }
          self2.files.push(filename2);
          if (Object.prototype.hasOwnProperty.call(common, filename2)) {
            if (sync) {
              process(filename2, common[filename2], depth);
            } else {
              ++queued;
              setTimeout(function() {
                --queued;
                process(filename2, common[filename2], depth);
              });
            }
            return;
          }
          if (sync) {
            var source;
            try {
              source = util.fs.readFileSync(filename2).toString("utf8");
            } catch (err) {
              if (!weak)
                finish(err);
              return;
            }
            process(filename2, source, depth);
          } else {
            ++queued;
            self2.fetch(filename2, function(err, source2) {
              --queued;
              if (!callback) {
                return;
              }
              if (err) {
                if (!weak)
                  finish(err);
                else if (!queued)
                  finish(null, self2);
                return;
              }
              process(filename2, source2, depth);
            });
          }
        }
        var queued = 0;
        if (util.isString(filename)) {
          filename = [filename];
        }
        for (var i = 0, resolved; i < filename.length; ++i)
          if (resolved = self2.resolvePath("", filename[i]))
            fetch(resolved);
        if (sync) {
          self2.resolveAll();
          return self2;
        }
        if (!queued) {
          finish(null, self2);
        }
        return self2;
      };
      Root.prototype.loadSync = function loadSync(filename, options) {
        if (!util.isNode)
          throw Error("not supported");
        return this.load(filename, options, SYNC);
      };
      Root.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        if (this.deferred.length)
          throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
          }).join(", "));
        return Namespace.prototype.resolveAll.call(this);
      };
      var exposeRe = /^[A-Z]/;
      function tryHandleExtension(root, field) {
        var extendedType = field.parent.lookup(field.extend);
        if (extendedType) {
          var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
          if (extendedType.get(sisterField.name)) {
            return true;
          }
          sisterField.declaringField = field;
          field.extensionField = sisterField;
          extendedType.add(sisterField);
          return true;
        }
        return false;
      }
      Root.prototype._handleAdd = function _handleAdd(object) {
        if (object instanceof Field) {
          if (
            /* an extension field (implies not part of a oneof) */
            object.extend !== void 0 && /* not already handled */
            !object.extensionField
          ) {
            if (!tryHandleExtension(this, object))
              this.deferred.push(object);
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name))
            object.parent[object.name] = object.values;
        } else if (!(object instanceof OneOf)) {
          if (object instanceof Type)
            for (var i = 0; i < this.deferred.length; )
              if (tryHandleExtension(this, this.deferred[i]))
                this.deferred.splice(i, 1);
              else
                ++i;
          for (var j = 0; j < /* initializes */
          object.nestedArray.length; ++j)
            this._handleAdd(object._nestedArray[j]);
          if (exposeRe.test(object.name))
            object.parent[object.name] = object;
        }
        if (object instanceof Type || object instanceof Enum || object instanceof Field) {
          this._fullyQualifiedObjects[object.fullName] = object;
        }
      };
      Root.prototype._handleRemove = function _handleRemove(object) {
        if (object instanceof Field) {
          if (
            /* an extension field */
            object.extend !== void 0
          ) {
            if (
              /* already handled */
              object.extensionField
            ) {
              object.extensionField.parent.remove(object.extensionField);
              object.extensionField = null;
            } else {
              var index = this.deferred.indexOf(object);
              if (index > -1)
                this.deferred.splice(index, 1);
            }
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name))
            delete object.parent[object.name];
        } else if (object instanceof Namespace) {
          for (var i = 0; i < /* initializes */
          object.nestedArray.length; ++i)
            this._handleRemove(object._nestedArray[i]);
          if (exposeRe.test(object.name))
            delete object.parent[object.name];
        }
        delete this._fullyQualifiedObjects[object.fullName];
      };
      Root._configure = function(Type_, parse_, common_) {
        Type = Type_;
        parse = parse_;
        common = common_;
      };
    }
  });

  // node_modules/protobufjs/src/util.js
  var require_util = __commonJS({
    "node_modules/protobufjs/src/util.js"(exports, module) {
      "use strict";
      var util = module.exports = require_minimal();
      var roots = require_roots();
      var Type;
      var Enum;
      util.codegen = require_codegen();
      util.fetch = require_fetch();
      util.path = require_path();
      util.patterns = require_patterns();
      var reservedRe = util.patterns.reservedRe;
      util.fs = require_fs();
      util.toArray = function toArray(object) {
        if (object) {
          var keys = Object.keys(object), array = new Array(keys.length), index = 0;
          while (index < keys.length)
            array[index] = object[keys[index++]];
          return array;
        }
        return [];
      };
      util.toObject = function toObject(array) {
        var object = {}, index = 0;
        while (index < array.length) {
          var key = array[index++], val = array[index++];
          if (val !== void 0)
            object[key] = val;
        }
        return object;
      };
      util.remove = function remove(object, value, key) {
        if (!object)
          return false;
        if (key !== void 0 && Object.prototype.hasOwnProperty.call(object, key) && object[key] === value) {
          delete object[key];
          return true;
        }
        for (var names = Object.keys(object), i = 0; i < names.length; ++i)
          if (object[names[i]] === value) {
            delete object[names[i]];
            return true;
          }
        return false;
      };
      util.isReserved = function isReserved(name) {
        return reservedRe.test(name);
      };
      util.safeProp = function safeProp(prop) {
        if (!/^[$\w_]+$/.test(prop) || reservedRe.test(prop))
          return "[" + JSON.stringify(prop) + "]";
        return "." + prop;
      };
      util.ucFirst = function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      };
      var camelCaseRe = /_([a-z])/g;
      util.camelCase = function camelCase(str) {
        return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
          return $1.toUpperCase();
        });
      };
      util.jsonName = function jsonName(str) {
        var result = "", upperNext = false, i = 0;
        for (; i < str.length; ++i) {
          var ch = str.charAt(i);
          if (ch === "_")
            upperNext = true;
          else if (upperNext) {
            result += ch.toUpperCase();
            upperNext = false;
          } else
            result += ch;
        }
        return result;
      };
      util.compareFieldsById = function compareFieldsById(a, b) {
        return a.id - b.id;
      };
      util.decorateType = function decorateType(ctor, typeName) {
        if (ctor.$type) {
          if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
          }
          return ctor.$type;
        }
        if (!Type)
          Type = require_type();
        var type = new Type(typeName || ctor.name);
        util.decorateRoot.add(type);
        type.ctor = ctor;
        Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
        Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
        return type;
      };
      var decorateEnumIndex = 0;
      util.decorateEnum = function decorateEnum(object) {
        if (object.$type)
          return object.$type;
        if (!Enum)
          Enum = require_enum();
        var enm = new Enum("Enum" + decorateEnumIndex++, object);
        util.decorateRoot.add(enm);
        Object.defineProperty(object, "$type", { value: enm, enumerable: false });
        return enm;
      };
      util.setProperty = function setProperty(dst, path, value, ifNotSet) {
        function setProp(dst2, path2, value2) {
          var part = path2.shift();
          if (util.isUnsafeProperty(part))
            return dst2;
          if (path2.length > 0) {
            dst2[part] = setProp(dst2[part] || {}, path2, value2);
          } else {
            var prevValue = dst2[part];
            if (prevValue && ifNotSet)
              return dst2;
            if (prevValue)
              value2 = [].concat(prevValue).concat(value2);
            dst2[part] = value2;
          }
          return dst2;
        }
        if (typeof dst !== "object")
          throw TypeError("dst must be an object");
        if (!path)
          throw TypeError("path must be specified");
        path = path.split(".");
        if (path.length > util.recursionLimit)
          throw Error("max depth exceeded");
        return setProp(dst, path, value);
      };
      Object.defineProperty(util, "decorateRoot", {
        get: function() {
          return roots["decorated"] || (roots["decorated"] = new (require_root())());
        }
      });
    }
  });

  // node_modules/protobufjs/src/types.js
  var require_types = __commonJS({
    "node_modules/protobufjs/src/types.js"(exports) {
      "use strict";
      var types = exports;
      var util = require_util();
      var s = [
        "double",
        // 0
        "float",
        // 1
        "int32",
        // 2
        "uint32",
        // 3
        "sint32",
        // 4
        "fixed32",
        // 5
        "sfixed32",
        // 6
        "int64",
        // 7
        "uint64",
        // 8
        "sint64",
        // 9
        "fixed64",
        // 10
        "sfixed64",
        // 11
        "bool",
        // 12
        "string",
        // 13
        "bytes"
        // 14
      ];
      function bake(values, offset) {
        var i = 0, o = /* @__PURE__ */ Object.create(null);
        offset |= 0;
        while (i < values.length) o[s[i + offset]] = values[i++];
        return o;
      }
      types.basic = bake([
        /* double   */
        1,
        /* float    */
        5,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0,
        /* string   */
        2,
        /* bytes    */
        2
      ]);
      types.defaults = bake([
        /* double   */
        0,
        /* float    */
        0,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        0,
        /* sfixed32 */
        0,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        0,
        /* sfixed64 */
        0,
        /* bool     */
        false,
        /* string   */
        "",
        /* bytes    */
        util.emptyArray,
        /* message  */
        null
      ]);
      types.long = bake([
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1
      ], 7);
      types.mapKey = bake([
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0,
        /* string   */
        2
      ], 2);
      types.packed = bake([
        /* double   */
        1,
        /* float    */
        5,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0
      ]);
    }
  });

  // node_modules/protobufjs/src/field.js
  var require_field = __commonJS({
    "node_modules/protobufjs/src/field.js"(exports, module) {
      "use strict";
      module.exports = Field;
      var ReflectionObject = require_object();
      Field.prototype = Object.create(ReflectionObject.prototype, {
        constructor: {
          value: Field,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Field.className = "Field";
      var Enum = require_enum();
      var types = require_types();
      var util = require_util();
      var Type;
      var ruleRe = /^(?:required|optional|repeated)$/;
      Field.fromJSON = function fromJSON(name, json) {
        var field = new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
        if (json.edition)
          field._edition = json.edition;
        if (json.protoName)
          field.protoName = json.protoName;
        if (json.jsonName !== void 0)
          field.jsonName = json.jsonName;
        else if (json.options && json.options.json_name !== void 0)
          field.jsonName = json.options.json_name;
        field._defaultEdition = "proto3";
        return field;
      };
      function Field(name, id, type, rule, extend, options, comment) {
        if (util.isObject(rule)) {
          comment = extend;
          options = rule;
          rule = extend = void 0;
        } else if (util.isObject(extend)) {
          comment = options;
          options = extend;
          extend = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!util.isInteger(id) || id < 0)
          throw TypeError("id must be a non-negative integer");
        if (!util.isString(type))
          throw TypeError("type must be a string");
        if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
          throw TypeError("rule must be a string rule");
        if (extend !== void 0 && !util.isString(extend))
          throw TypeError("extend must be a string");
        this.rule = rule && rule !== "optional" ? rule : void 0;
        this.type = type;
        this.id = id;
        this.extend = extend || void 0;
        this.repeated = rule === "repeated";
        this.map = false;
        this.message = null;
        this.partOf = null;
        this.typeDefault = null;
        this.defaultValue = null;
        this.long = util.Long ? types.long[type] !== void 0 : (
          /* istanbul ignore next */
          false
        );
        this.bytes = type === "bytes";
        this.resolvedType = null;
        this.extensionField = null;
        this.declaringField = null;
        this.comment = comment;
        this.protoName = void 0;
        this.jsonName = void 0;
      }
      Object.defineProperty(Field.prototype, "required", {
        get: function() {
          return this._features.field_presence === "LEGACY_REQUIRED";
        }
      });
      Object.defineProperty(Field.prototype, "optional", {
        get: function() {
          return !this.required;
        }
      });
      Object.defineProperty(Field.prototype, "delimited", {
        get: function() {
          return this.resolvedType instanceof Type && this._features.message_encoding === "DELIMITED";
        }
      });
      Object.defineProperty(Field.prototype, "packed", {
        get: function() {
          return this._features.repeated_field_encoding === "PACKED";
        }
      });
      Object.defineProperty(Field.prototype, "hasPresence", {
        get: function() {
          if (this.repeated || this.map) {
            return false;
          }
          return this.partOf || // oneofs
          this.declaringField || this.extensionField || // extensions
          this._features.field_presence !== "IMPLICIT";
        }
      });
      Field.prototype.setOption = function setOption(name, value, ifNotSet) {
        return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
      };
      Field.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "rule",
          this.rule !== "optional" && this.rule || void 0,
          "type",
          this.type,
          "id",
          this.id,
          "extend",
          this.extend,
          "protoName",
          this.protoName !== this.name ? this.protoName : void 0,
          "jsonName",
          this.jsonName !== util.jsonName(this.protoName || this.name) ? this.jsonName : void 0,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      Field.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if ((this.typeDefault = types.defaults[this.type]) === void 0) {
          this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
          if (this.resolvedType instanceof Type)
            this.typeDefault = null;
          else
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
        } else if (this.options && this.options.proto3_optional) {
          this.typeDefault = null;
        }
        if (this.options && this.options["default"] != null) {
          this.typeDefault = this.options["default"];
          if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
        }
        if (this.options) {
          if (this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
          if (!Object.keys(this.options).length)
            this.options = void 0;
        }
        if (this.long) {
          this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type === "uint64" || this.type === "fixed64");
          if (Object.freeze)
            Object.freeze(this.typeDefault);
        } else if (this.bytes && typeof this.typeDefault === "string") {
          var buf;
          if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
          else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
          this.typeDefault = buf;
        }
        if (this.map)
          this.defaultValue = util.emptyObject;
        else if (this.repeated)
          this.defaultValue = util.emptyArray;
        else
          this.defaultValue = this.typeDefault;
        if (this.parent instanceof Type && this.parent._ctor)
          this.parent._ctor.prototype[this.name] = this.defaultValue;
        if (this.protoName === void 0)
          this.protoName = this.name;
        if (this.jsonName === void 0)
          this.jsonName = util.jsonName(this.protoName);
        return ReflectionObject.prototype.resolve.call(this);
      };
      Field.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures(edition) {
        if (edition !== "proto2" && edition !== "proto3") {
          return {};
        }
        var features = {};
        if (this.rule === "required") {
          features.field_presence = "LEGACY_REQUIRED";
        }
        if (this.parent && types.defaults[this.type] === void 0) {
          var type = this.parent.get(this.type.split(".").pop());
          if (type && type instanceof Type && type.group) {
            features.message_encoding = "DELIMITED";
          }
        }
        if (this.getOption("packed") === true) {
          features.repeated_field_encoding = "PACKED";
        } else if (this.getOption("packed") === false) {
          features.repeated_field_encoding = "EXPANDED";
        }
        return features;
      };
      Field.prototype._resolveFeatures = function _resolveFeatures(edition) {
        return ReflectionObject.prototype._resolveFeatures.call(this, this._edition || edition);
      };
      Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
        if (typeof fieldType === "function")
          fieldType = util.decorateType(fieldType).name;
        else if (fieldType && typeof fieldType === "object")
          fieldType = util.decorateEnum(fieldType).name;
        return function fieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
        };
      };
      Field._configure = function configure(Type_) {
        Type = Type_;
      };
    }
  });

  // node_modules/protobufjs/src/oneof.js
  var require_oneof = __commonJS({
    "node_modules/protobufjs/src/oneof.js"(exports, module) {
      "use strict";
      module.exports = OneOf;
      var ReflectionObject = require_object();
      OneOf.prototype = Object.create(ReflectionObject.prototype, {
        constructor: {
          value: OneOf,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      OneOf.className = "OneOf";
      var Field = require_field();
      var util = require_util();
      function OneOf(name, fieldNames, options, comment) {
        if (!Array.isArray(fieldNames)) {
          options = fieldNames;
          fieldNames = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
          throw TypeError("fieldNames must be an Array");
        this.oneof = fieldNames || [];
        this.fieldsArray = [];
        this.comment = comment;
      }
      OneOf.fromJSON = function fromJSON(name, json) {
        return new OneOf(name, json.oneof, json.options, json.comment);
      };
      OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "options",
          this.options,
          "oneof",
          this.oneof,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      function addFieldsToParent(oneof) {
        if (oneof.parent) {
          for (var i = 0; i < oneof.fieldsArray.length; ++i)
            if (!oneof.fieldsArray[i].parent)
              oneof.parent.add(oneof.fieldsArray[i]);
        }
      }
      OneOf.prototype.add = function add(field) {
        if (!(field instanceof Field))
          throw TypeError("field must be a Field");
        if (field.parent && field.parent !== this.parent)
          field.parent.remove(field);
        this.oneof.push(field.name);
        this.fieldsArray.push(field);
        field.partOf = this;
        addFieldsToParent(this);
        return this;
      };
      OneOf.prototype.remove = function remove(field) {
        if (!(field instanceof Field))
          throw TypeError("field must be a Field");
        var index = this.fieldsArray.indexOf(field);
        if (index < 0)
          throw Error(field + " is not a member of " + this);
        this.fieldsArray.splice(index, 1);
        index = this.oneof.indexOf(field.name);
        if (index > -1)
          this.oneof.splice(index, 1);
        field.partOf = null;
        return this;
      };
      OneOf.prototype.onAdd = function onAdd(parent) {
        ReflectionObject.prototype.onAdd.call(this, parent);
        var self2 = this;
        for (var i = 0; i < this.oneof.length; ++i) {
          var field = parent.get(this.oneof[i]);
          if (field && !field.partOf) {
            field.partOf = self2;
            self2.fieldsArray.push(field);
          }
        }
        addFieldsToParent(this);
      };
      OneOf.prototype.onRemove = function onRemove(parent) {
        for (var i = 0, field; i < this.fieldsArray.length; ++i)
          if ((field = this.fieldsArray[i]).parent)
            field.parent.remove(field);
        ReflectionObject.prototype.onRemove.call(this, parent);
      };
      Object.defineProperty(OneOf.prototype, "isProto3Optional", {
        get: function() {
          if (this.fieldsArray == null || this.fieldsArray.length !== 1) {
            return false;
          }
          var field = this.fieldsArray[0];
          return field.options != null && field.options["proto3_optional"] === true;
        }
      });
      OneOf.d = function decorateOneOf() {
        var fieldNames = new Array(arguments.length), index = 0;
        while (index < arguments.length)
          fieldNames[index] = arguments[index++];
        return function oneOfDecorator(prototype, oneofName) {
          util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
          Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
          });
        };
      };
    }
  });

  // node_modules/protobufjs/src/object.js
  var require_object = __commonJS({
    "node_modules/protobufjs/src/object.js"(exports, module) {
      "use strict";
      module.exports = ReflectionObject;
      ReflectionObject.className = "ReflectionObject";
      var OneOf = require_oneof();
      var util = require_util();
      var Root;
      var editions2024Defaults = { enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY", enforce_naming_style: "STYLE2024", default_symbol_visibility: "EXPORT_TOP_LEVEL" };
      var editions2023Defaults = { enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY", enforce_naming_style: "STYLE_LEGACY", default_symbol_visibility: "EXPORT_ALL" };
      var proto2Defaults = { enum_type: "CLOSED", field_presence: "EXPLICIT", json_format: "LEGACY_BEST_EFFORT", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "EXPANDED", utf8_validation: "NONE", enforce_naming_style: "STYLE_LEGACY", default_symbol_visibility: "EXPORT_ALL" };
      var proto3Defaults = { enum_type: "OPEN", field_presence: "IMPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY", enforce_naming_style: "STYLE_LEGACY", default_symbol_visibility: "EXPORT_ALL" };
      function ReflectionObject(name, options) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        if (options && !util.isObject(options))
          throw TypeError("options must be an object");
        this.options = options;
        this.parsedOptions = null;
        this.name = name;
        this._edition = null;
        this._defaultEdition = "proto2";
        this._features = {};
        this._featuresResolved = false;
        this.parent = null;
        this.resolved = false;
        this.comment = null;
        this.filename = null;
      }
      Object.defineProperties(ReflectionObject.prototype, {
        /**
         * Reference to the root namespace.
         * @name ReflectionObject#root
         * @type {Root}
         * @readonly
         */
        root: {
          get: function() {
            var ptr = this;
            while (ptr.parent !== null)
              ptr = ptr.parent;
            return ptr;
          }
        },
        /**
         * Full name including leading dot.
         * @name ReflectionObject#fullName
         * @type {string}
         * @readonly
         */
        fullName: {
          get: function() {
            var path = [this.name], ptr = this.parent;
            while (ptr) {
              path.unshift(ptr.name);
              ptr = ptr.parent;
            }
            return path.join(".");
          }
        }
      });
      ReflectionObject.prototype.toJSON = /* istanbul ignore next */
      function toJSON() {
        throw Error();
      };
      ReflectionObject.prototype.onAdd = function onAdd(parent) {
        if (this.parent && this.parent !== parent)
          this.parent.remove(this);
        this.parent = parent;
        this.resolved = false;
        var root = parent.root;
        if (root instanceof Root)
          root._handleAdd(this);
      };
      ReflectionObject.prototype.onRemove = function onRemove(parent) {
        var root = parent.root;
        if (root instanceof Root)
          root._handleRemove(this);
        this.parent = null;
        this.resolved = false;
      };
      ReflectionObject.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if (this.root instanceof Root)
          this.resolved = true;
        return this;
      };
      ReflectionObject.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        return this._resolveFeatures(this._edition || edition);
      };
      ReflectionObject.prototype._resolveFeatures = function _resolveFeatures(edition) {
        if (this._featuresResolved) {
          return;
        }
        var defaults = {};
        if (!edition) {
          throw new Error("Unknown edition for " + this.fullName);
        }
        var protoFeatures = util.merge(
          {},
          this.options && this.options.features,
          this._inferLegacyProtoFeatures(edition)
        );
        if (this._edition) {
          if (edition === "proto2") {
            defaults = Object.assign({}, proto2Defaults);
          } else if (edition === "proto3") {
            defaults = Object.assign({}, proto3Defaults);
          } else if (edition === "2023") {
            defaults = Object.assign({}, editions2023Defaults);
          } else if (edition === "2024") {
            defaults = Object.assign({}, editions2024Defaults);
          } else {
            throw new Error("Unknown edition: " + edition);
          }
          this._features = util.merge(defaults, protoFeatures);
        } else {
          if (this.partOf instanceof OneOf) {
            var lexicalParentFeaturesCopy = util.merge({}, this.partOf._features);
            this._features = util.merge(lexicalParentFeaturesCopy, protoFeatures);
          } else if (this.declaringField) {
          } else if (this.parent) {
            var parentFeaturesCopy = util.merge({}, this.parent._features);
            this._features = util.merge(parentFeaturesCopy, protoFeatures);
          } else {
            throw new Error("Unable to find a parent for " + this.fullName);
          }
        }
        if (this.extensionField) {
          this.extensionField._features = this._features;
        }
        this._featuresResolved = true;
      };
      ReflectionObject.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures() {
        return {};
      };
      ReflectionObject.prototype.getOption = function getOption(name) {
        if (this.options && Object.prototype.hasOwnProperty.call(this.options, name))
          return this.options[name];
        return void 0;
      };
      ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
        if (name === "__proto__")
          return this;
        if (!this.options)
          this.options = {};
        if (/^features\./.test(name)) {
          util.setProperty(this.options, name, value, ifNotSet);
        } else {
          var prev = this.getOption(name);
          if (!ifNotSet || prev === void 0) {
            if (prev !== value) this.resolved = false;
            this.options[name] = value;
          }
        }
        return this;
      };
      ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
        if (name === "__proto__")
          return this;
        if (!this.parsedOptions) {
          this.parsedOptions = [];
        }
        var parsedOptions = this.parsedOptions;
        if (propName) {
          var opt = parsedOptions.find(function(opt2) {
            return Object.prototype.hasOwnProperty.call(opt2, name);
          });
          if (opt) {
            var newValue = opt[name];
            util.setProperty(newValue, propName, value);
          } else {
            opt = {};
            opt[name] = util.setProperty({}, propName, value);
            parsedOptions.push(opt);
          }
        } else {
          var newOpt = {};
          newOpt[name] = value;
          parsedOptions.push(newOpt);
        }
        return this;
      };
      ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
        if (options)
          for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
            this.setOption(keys[i], options[keys[i]], ifNotSet);
        return this;
      };
      Object.defineProperty(ReflectionObject.prototype, "toString", {
        value: function toString() {
          var className = this.constructor.className, fullName = this.fullName;
          if (fullName.length)
            return className + " " + fullName;
          return className;
        },
        writable: true,
        enumerable: false,
        configurable: true
      });
      ReflectionObject.prototype._editionToJSON = function _editionToJSON() {
        if (!this._edition || this._edition === "proto3") {
          return void 0;
        }
        return this._edition;
      };
      ReflectionObject._configure = function(Root_) {
        Root = Root_;
      };
    }
  });

  // node_modules/protobufjs/src/enum.js
  var require_enum = __commonJS({
    "node_modules/protobufjs/src/enum.js"(exports, module) {
      "use strict";
      module.exports = Enum;
      var ReflectionObject = require_object();
      Enum.prototype = Object.create(ReflectionObject.prototype, {
        constructor: {
          value: Enum,
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      Enum.className = "Enum";
      var Namespace = require_namespace();
      var util = require_util();
      function Enum(name, values, options, comment, comments, valuesOptions) {
        ReflectionObject.call(this, name, options);
        if (values && typeof values !== "object")
          throw TypeError("values must be an object");
        this.valuesById = /* @__PURE__ */ Object.create(null);
        this.values = Object.create(this.valuesById);
        this.comment = comment;
        this.comments = comments || {};
        this.valuesOptions = valuesOptions;
        this._valuesFeatures = {};
        this.reserved = void 0;
        if (values) {
          for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
            if (keys[i] !== "__proto__" && typeof values[keys[i]] === "number")
              this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
        }
      }
      Enum.prototype._resolveFeatures = function _resolveFeatures(edition) {
        edition = this._edition || edition;
        ReflectionObject.prototype._resolveFeatures.call(this, edition);
        Object.keys(this.values).forEach((key) => {
          var parentFeaturesCopy = util.merge({}, this._features);
          this._valuesFeatures[key] = util.merge(parentFeaturesCopy, this.valuesOptions && this.valuesOptions[key] && this.valuesOptions[key].features || {});
        });
        return this;
      };
      Enum.fromJSON = function fromJSON(name, json) {
        var enm = new Enum(name, json.values, json.options, json.comment, json.comments, json.valuesOptions);
        enm.reserved = json.reserved;
        if (json.edition)
          enm._edition = json.edition;
        enm._defaultEdition = "proto3";
        return enm;
      };
      Enum.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          this.options,
          "valuesOptions",
          this.valuesOptions,
          "values",
          this.values,
          "reserved",
          this.reserved && this.reserved.length ? this.reserved : void 0,
          "comment",
          keepComments ? this.comment : void 0,
          "comments",
          keepComments ? this.comments : void 0
        ]);
      };
      Enum.prototype.add = function add(name, id, comment, options) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        if (!util.isInteger(id))
          throw TypeError("id must be an integer");
        if (name === "__proto__")
          return this;
        if (this.values[name] !== void 0)
          throw Error("duplicate name '" + name + "' in " + this);
        if (this.isReservedId(id))
          throw Error("id " + id + " is reserved in " + this);
        if (this.isReservedName(name))
          throw Error("name '" + name + "' is reserved in " + this);
        if (this.valuesById[id] !== void 0) {
          if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id " + id + " in " + this);
          this.values[name] = id;
        } else
          this.valuesById[this.values[name] = id] = name;
        if (options) {
          if (this.valuesOptions === void 0)
            this.valuesOptions = {};
          this.valuesOptions[name] = options || null;
        }
        this.comments[name] = comment || null;
        return this;
      };
      Enum.prototype.remove = function remove(name) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        var val = this.values[name];
        if (val == null)
          throw Error("name '" + name + "' does not exist in " + this);
        delete this.valuesById[val];
        delete this.values[name];
        delete this.comments[name];
        if (this.valuesOptions)
          delete this.valuesOptions[name];
        return this;
      };
      Enum.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      Enum.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
    }
  });

  // node_modules/protobufjs/src/encoder.js
  var require_encoder = __commonJS({
    "node_modules/protobufjs/src/encoder.js"(exports, module) {
      "use strict";
      module.exports = encoder;
      var Enum = require_enum();
      var types = require_types();
      var util = require_util();
      function genTypePartial(gen, field, fieldIndex, ref) {
        return field.delimited ? gen("types[%i].encode(%s,w.uint32(%i),q+1).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork(),q+1).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
      }
      function encoder(mtype) {
        var gen = util.codegen(["m", "w", "q"])("if(!w)")("w=Writer.create()")("if(q===undefined)q=0")("if(q>util.recursionLimit)")('throw Error("max depth exceeded")');
        var i, ref;
        var fields = (
          /* initializes */
          mtype.fieldsArray.slice().sort(util.compareFieldsById)
        );
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
          ref = "m" + util.safeProp(field.name);
          if (field.map) {
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref);
            if (field.keyType === "bool") gen("w.uint32(%i).fork().uint32(%i).bool(util.boolFromKey(ks[i]))", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType]);
            else if (types.long[field.keyType] !== void 0) gen("w.uint32(%i).fork().uint32(%i).%s(util.longFromKey(ks[i],%j))", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType, field.keyType === "uint64" || field.keyType === "fixed64");
            else gen("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === void 0) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork(),q+1).ldelim().ldelim()", index, ref);
            else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}");
          } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref);
            if (field.packed && types.packed[type] !== void 0) {
              gen("w.uint32(%i).%ss(%s)", (field.id << 3 | 2) >>> 0, type, ref);
            } else {
              gen("for(var i=0;i<%s.length;++i)", ref);
              if (wireType === void 0)
                genTypePartial(gen, field, index, ref + "[i]");
              else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }
            gen("}");
          } else {
            if (!field.required)
              if (field.hasPresence || !(field.resolvedType instanceof Enum || types.basic[type] !== void 0)) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
              else if (field.resolvedType instanceof Enum) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!==%j)", ref, field.name, ref, field.typeDefault);
              else if (type === "bool") gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!==false)", ref, field.name, ref);
              else if (type === "string") gen('if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!=="")', ref, field.name, ref);
              else if (type === "bytes") gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s.length)", ref, field.name, ref);
              else if (type === "double" || type === "float") gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&!Object.is(%s,0))", ref, field.name, ref);
              else if (types.long[type] !== void 0) gen('if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&(typeof %s==="object"?%s.low||%s.high:%s!==0))', ref, field.name, ref, ref, ref, ref);
              else gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!==0)", ref, field.name, ref);
            if (wireType === void 0)
              genTypePartial(gen, field, index, ref);
            else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
          }
        }
        return gen('if(m.$unknowns!=null&&Object.hasOwnProperty.call(m,"$unknowns"))')("for(var i=0;i<m.$unknowns.length;++i)")("w.raw(m.$unknowns[i])")("return w");
      }
    }
  });

  // node_modules/protobufjs/src/index-light.js
  var require_index_light = __commonJS({
    "node_modules/protobufjs/src/index-light.js"(exports, module) {
      "use strict";
      exports = module.exports = require_index_minimal();
      exports.build = "light";
      function load(filename, root, callback) {
        if (typeof root === "function") {
          callback = root;
          root = new exports.Root();
        } else if (!root)
          root = new exports.Root();
        return root.load(filename, callback);
      }
      exports.load = load;
      function loadSync(filename, root) {
        if (!root)
          root = new exports.Root();
        return root.loadSync(filename);
      }
      exports.loadSync = loadSync;
      exports.encoder = require_encoder();
      exports.decoder = require_decoder();
      exports.verifier = require_verifier();
      exports.converter = require_converter();
      exports.ReflectionObject = require_object();
      exports.Namespace = require_namespace();
      exports.Root = require_root();
      exports.Enum = require_enum();
      exports.Type = require_type();
      exports.Field = require_field();
      exports.OneOf = require_oneof();
      exports.MapField = require_mapfield();
      exports.Service = require_service2();
      exports.Method = require_method();
      exports.Message = require_message();
      exports.wrappers = require_wrappers();
      exports.types = require_types();
      exports.util = require_util();
      exports.ReflectionObject._configure(exports.Root);
      exports.Namespace._configure(exports.Type, exports.Service, exports.Enum);
      exports.Root._configure(exports.Type, void 0, {});
      exports.Field._configure(exports.Type);
    }
  });

  // node_modules/protobufjs/src/tokenize.js
  var require_tokenize = __commonJS({
    "node_modules/protobufjs/src/tokenize.js"(exports, module) {
      "use strict";
      module.exports = tokenize;
      var delimRe = /[\s{}=;:[\],'"()<>]/g;
      var stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
      var stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
      var setCommentRe = /^ *[*/]+ */;
      var setCommentAltRe = /^\s*\*?\/*/;
      var setCommentSplitRe = /\n/g;
      var whitespaceRe = /\s/;
      var unescapeRe = /\\(.?)/g;
      var unescapeMap = {
        "0": "\0",
        "r": "\r",
        "n": "\n",
        "t": "	"
      };
      function unescape(str) {
        return str.replace(unescapeRe, function($0, $1) {
          switch ($1) {
            case "\\":
            case "":
              return $1;
            default:
              return unescapeMap[$1] || "";
          }
        });
      }
      tokenize.unescape = unescape;
      function tokenize(source, alternateCommentMode) {
        source = source.toString();
        var offset = 0, length = source.length, line = 1, lastCommentLine = 0, comments = {};
        var stack = [];
        var stringDelim = null;
        function illegal(subject) {
          return Error("illegal " + subject + " (line " + line + ")");
        }
        function readString() {
          var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
          re.lastIndex = offset - 1;
          var match = re.exec(source);
          if (!match)
            throw illegal("string");
          offset = re.lastIndex;
          push(stringDelim);
          stringDelim = null;
          return unescape(match[1]);
        }
        function charAt(pos) {
          return source.charAt(pos);
        }
        function setComment(start, end, isLeading) {
          var comment = {
            type: source.charAt(start++),
            lineEmpty: false,
            leading: isLeading
          };
          var lookback;
          if (alternateCommentMode) {
            lookback = 2;
          } else {
            lookback = 3;
          }
          var commentOffset = start - lookback, c;
          do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
              comment.lineEmpty = true;
              break;
            }
          } while (c === " " || c === "	");
          var lines = source.substring(start, end).split(setCommentSplitRe);
          for (var i = 0; i < lines.length; ++i)
            lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
          comment.text = lines.join("\n").trim();
          comments[line] = comment;
          lastCommentLine = line;
        }
        function isDoubleSlashCommentLine(startOffset) {
          var endOffset = findEndOfLine(startOffset);
          var lineText = source.substring(startOffset, endOffset);
          var isComment = /^\s*\/\//.test(lineText);
          return isComment;
        }
        function findEndOfLine(cursor) {
          var endOffset = cursor;
          while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
          }
          return endOffset;
        }
        function next() {
          if (stack.length > 0)
            return stack.shift();
          if (stringDelim)
            return readString();
          var repeat, prev, curr, start, isDoc, nextLineIsComment, isLeadingComment = offset === 0;
          do {
            if (offset === length)
              return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
              if (curr === "\n") {
                isLeadingComment = true;
                ++line;
              }
              if (++offset === length)
                return null;
            }
            if (charAt(offset) === "/") {
              if (++offset === length) {
                throw illegal("comment");
              }
              if (charAt(offset) === "/") {
                if (!alternateCommentMode) {
                  isDoc = charAt(start = offset + 1) === "/";
                  while (charAt(++offset) !== "\n") {
                    if (offset === length) {
                      return null;
                    }
                  }
                  ++offset;
                  if (isDoc) {
                    setComment(start, offset - 1, isLeadingComment);
                    isLeadingComment = true;
                  }
                  ++line;
                  repeat = true;
                } else {
                  start = offset;
                  isDoc = false;
                  if (isDoubleSlashCommentLine(offset - 1)) {
                    isDoc = true;
                    do {
                      offset = findEndOfLine(offset);
                      if (offset === length) {
                        break;
                      }
                      offset++;
                      if (!isLeadingComment) {
                        break;
                      }
                      nextLineIsComment = isDoubleSlashCommentLine(offset);
                      if (nextLineIsComment) {
                        line++;
                      }
                    } while (nextLineIsComment);
                  } else {
                    offset = Math.min(length, findEndOfLine(offset) + 1);
                  }
                  if (isDoc) {
                    setComment(start, offset, isLeadingComment);
                    isLeadingComment = true;
                  }
                  line++;
                  repeat = true;
                }
              } else if ((curr = charAt(offset)) === "*") {
                start = offset + 1;
                isDoc = alternateCommentMode || charAt(start) === "*";
                do {
                  if (curr === "\n") {
                    ++line;
                  }
                  if (++offset === length) {
                    throw illegal("comment");
                  }
                  prev = curr;
                  curr = charAt(offset);
                } while (prev !== "*" || curr !== "/");
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 2, isLeadingComment);
                  isLeadingComment = true;
                }
                repeat = true;
              } else {
                return "/";
              }
            }
          } while (repeat);
          var end = offset;
          delimRe.lastIndex = 0;
          var delim = delimRe.test(charAt(end++));
          if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
              ++end;
          var token = source.substring(offset, offset = end);
          if (token === '"' || token === "'")
            stringDelim = token;
          return token;
        }
        function push(token) {
          stack.push(token);
        }
        function peek() {
          if (!stack.length) {
            var token = next();
            if (token === null)
              return null;
            push(token);
          }
          return stack[0];
        }
        function skip(expected, optional) {
          var actual = peek(), equals = actual === expected;
          if (equals) {
            next();
            return true;
          }
          if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
          return false;
        }
        function cmnt(trailingLine) {
          var ret = null;
          var comment;
          if (trailingLine === void 0) {
            comment = comments[line - 1];
            delete comments[line - 1];
            if (comment && (alternateCommentMode || comment.type === "*" || comment.lineEmpty)) {
              ret = comment.leading ? comment.text : null;
            }
          } else {
            if (lastCommentLine < trailingLine) {
              peek();
            }
            comment = comments[trailingLine];
            delete comments[trailingLine];
            if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === "/")) {
              ret = comment.leading ? null : comment.text;
            }
          }
          return ret;
        }
        return Object.defineProperty({
          next,
          peek,
          push,
          skip,
          cmnt
        }, "line", {
          get: function() {
            return line;
          }
        });
      }
    }
  });

  // node_modules/protobufjs/src/parse.js
  var require_parse = __commonJS({
    "node_modules/protobufjs/src/parse.js"(exports, module) {
      "use strict";
      module.exports = parse;
      parse.filename = null;
      parse.defaults = { keepCase: false };
      var tokenize = require_tokenize();
      var Root = require_root();
      var Type = require_type();
      var Field = require_field();
      var MapField = require_mapfield();
      var OneOf = require_oneof();
      var Enum = require_enum();
      var Service = require_service2();
      var Method = require_method();
      var ReflectionObject = require_object();
      var types = require_types();
      var util = require_util();
      var base10Re = /^[1-9][0-9]*$/;
      var base10NegRe = /^-?[1-9][0-9]*$/;
      var base16Re = /^0[x][0-9a-fA-F]+$/;
      var base16NegRe = /^-?0[x][0-9a-fA-F]+$/;
      var base8Re = /^0[0-7]+$/;
      var base8NegRe = /^-?0[0-7]+$/;
      var numberRe = util.patterns.numberRe;
      var nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
      var typeRefRe = util.patterns.typeRefRe;
      var maxFieldId = 536870911;
      var maxEnumId = 2147483647;
      function parse(source, root, options) {
        if (!(root instanceof Root)) {
          options = root;
          root = new Root();
        }
        if (!options)
          options = parse.defaults;
        var preferTrailingComment = options.preferTrailingComment || false;
        var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
        var head = true, pkg, imports, weakImports, edition = "proto2";
        var ptr = root;
        var topLevelObjects = [];
        var topLevelOptions = {};
        var applyCase = options.keepCase ? function(name) {
          return name;
        } : util.camelCase;
        function resolveFileFeatures() {
          topLevelObjects.forEach((obj) => {
            obj._edition = edition;
            Object.keys(topLevelOptions).forEach((opt) => {
              if (obj.getOption(opt) !== void 0) return;
              obj.setOption(opt, topLevelOptions[opt], true);
            });
          });
        }
        function illegal(token2, name, insideTryCatch) {
          var filename = parse.filename;
          if (!insideTryCatch)
            parse.filename = null;
          return Error("illegal " + (name || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
        }
        function readString() {
          var values = [], token2;
          do {
            if ((token2 = next()) !== '"' && token2 !== "'")
              throw illegal(token2);
            values.push(next());
            skip(token2);
            token2 = peek();
          } while (token2 === '"' || token2 === "'");
          return values.join("");
        }
        function readValue(acceptTypeRef) {
          var token2 = next();
          switch (token2) {
            case "'":
            case '"':
              push(token2);
              return readString();
            case "true":
            case "TRUE":
              return true;
            case "false":
            case "FALSE":
              return false;
          }
          try {
            return parseNumber(
              token2,
              /* insideTryCatch */
              true
            );
          } catch (e) {
            if (acceptTypeRef && typeRefRe.test(token2))
              return token2;
            throw illegal(token2, "value");
          }
        }
        function readRanges(target, acceptStrings, max, acceptNegative) {
          var token2, start;
          do {
            if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'")) {
              var str = readString();
              target.push(str);
              if (edition >= 2023) {
                throw illegal(str, "id");
              }
            } else {
              try {
                target.push([start = parseId(next(), acceptNegative, max), skip("to", true) ? parseId(next(), acceptNegative, max) : start]);
              } catch (err) {
                if (acceptStrings && typeRefRe.test(token2) && edition >= 2023) {
                  target.push(token2);
                } else {
                  throw err;
                }
              }
            }
          } while (skip(",", true));
          var dummy = { options: void 0 };
          dummy.setOption = function(name, value) {
            if (this.options === void 0) this.options = {};
            this.options[name] = value;
          };
          ifBlock(
            dummy,
            function parseRange_block(token3) {
              if (token3 === "option") {
                parseOption(dummy, token3);
                skip(";");
              } else
                throw illegal(token3);
            },
            function parseRange_line() {
              parseInlineOptions(dummy);
            }
          );
        }
        function parseNumber(token2, insideTryCatch) {
          var sign = 1;
          if (token2.charAt(0) === "-") {
            sign = -1;
            token2 = token2.substring(1);
          }
          switch (token2) {
            case "inf":
            case "INF":
            case "Inf":
              return sign * Infinity;
            case "nan":
            case "NAN":
            case "Nan":
            case "NaN":
              return NaN;
            case "0":
              return 0;
          }
          if (base10Re.test(token2))
            return sign * parseInt(token2, 10);
          if (base16Re.test(token2))
            return sign * parseInt(token2, 16);
          if (base8Re.test(token2))
            return sign * parseInt(token2, 8);
          if (numberRe.test(token2))
            return sign * parseFloat(token2);
          throw illegal(token2, "number", insideTryCatch);
        }
        function parseId(token2, acceptNegative, max) {
          if (token2 === null) {
            throw illegal(token2, "end of input");
          }
          switch (token2) {
            case "max":
            case "MAX":
            case "Max":
              return max || maxFieldId;
            case "0":
              return 0;
          }
          if (!acceptNegative && token2.charAt(0) === "-")
            throw illegal(token2, "id");
          if (base10NegRe.test(token2))
            return parseInt(token2, 10);
          if (base16NegRe.test(token2))
            return parseInt(token2, 16);
          if (base8NegRe.test(token2))
            return parseInt(token2, 8);
          throw illegal(token2, "id");
        }
        function parsePackage() {
          if (pkg !== void 0)
            throw illegal("package");
          pkg = next();
          if (pkg === null || !typeRefRe.test(pkg))
            throw illegal(pkg, "name");
          ptr = ptr.define(pkg);
          skip(";");
        }
        function parseImport() {
          var token2 = peek();
          var whichImports;
          switch (token2) {
            case "option":
              if (edition < "2024") {
                throw illegal("option");
              }
              next();
              readString();
              skip(";");
              return;
            case "weak":
              whichImports = weakImports || (weakImports = []);
              next();
              break;
            case "public":
              next();
            // eslint-disable-next-line no-fallthrough
            default:
              whichImports = imports || (imports = []);
              break;
          }
          token2 = readString();
          skip(";");
          whichImports.push(token2);
        }
        function parseSyntax() {
          skip("=");
          edition = readString();
          if (edition < 2023)
            throw illegal(edition, "syntax");
          skip(";");
        }
        function parseEdition() {
          skip("=");
          edition = readString();
          const supportedEditions = ["2023", "2024"];
          if (!supportedEditions.includes(edition))
            throw illegal(edition, "edition");
          skip(";");
        }
        function parseCommon(parent, token2, depth) {
          if (depth === void 0)
            depth = 0;
          switch (token2) {
            case "option":
              parseOption(parent, token2);
              skip(";");
              return true;
            case "message":
              parseType(parent, token2, depth + 1);
              return true;
            case "enum":
              parseEnum(parent, token2);
              return true;
            case "export":
            case "local":
              if (edition < "2024") {
                return false;
              }
              token2 = next();
              if (token2 === "export" || token2 === "local") {
                return false;
              }
              if (token2 !== "message" && token2 !== "enum") {
                return false;
              }
              return parseCommon(parent, token2, depth);
            case "service":
              parseService(parent, token2, depth + 1);
              return true;
            case "extend":
              parseExtension(parent, token2, depth);
              return true;
          }
          return false;
        }
        function ifBlock(obj, fnIf, fnElse) {
          var trailingLine = tn.line;
          if (obj) {
            if (typeof obj.comment !== "string") {
              obj.comment = cmnt();
            }
            obj.filename = parse.filename;
          }
          if (skip("{", true)) {
            var token2;
            while ((token2 = next()) !== "}")
              fnIf(token2);
            skip(";", true);
          } else {
            if (fnElse)
              fnElse();
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
              obj.comment = cmnt(trailingLine) || obj.comment;
          }
        }
        function parseType(parent, token2, depth) {
          if (depth === void 0)
            depth = 0;
          if (depth > util.nestingLimit)
            throw Error("max depth exceeded");
          if ((token2 = next()) === null || !nameRe.test(token2))
            throw illegal(token2, "type name");
          var type = new Type(token2);
          ifBlock(type, function parseType_block(token3) {
            if (parseCommon(type, token3, depth))
              return;
            switch (token3) {
              case ";":
                break;
              case "map":
                parseMapField(type, token3);
                break;
              case "required":
                if (edition !== "proto2")
                  throw illegal(token3);
              /* eslint-disable no-fallthrough */
              case "repeated":
                parseField(type, token3, void 0, depth + 1);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(type, "proto3_optional", void 0, depth + 1);
                } else if (edition !== "proto2") {
                  throw illegal(token3);
                } else {
                  parseField(type, "optional", void 0, depth + 1);
                }
                break;
              case "oneof":
                parseOneOf(type, token3, depth + 1);
                break;
              case "extensions":
                readRanges(type.extensions || (type.extensions = []));
                break;
              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;
              default:
                if (edition === "proto2" || !typeRefRe.test(token3)) {
                  throw illegal(token3);
                }
                push(token3);
                parseField(type, "optional", void 0, depth + 1);
                break;
            }
          });
          parent.add(type);
          if (parent === ptr) {
            topLevelObjects.push(type);
          }
        }
        function parseField(parent, rule, extend, depth) {
          var type = next();
          if (type === null) {
            throw illegal(type, "end of input");
          }
          if (type === "group") {
            parseGroup(parent, rule, extend, depth);
            return;
          }
          while (type.endsWith(".") || (peek() || "").startsWith(".")) {
            var part = next();
            if (part === null) {
              throw illegal(part, "end of input");
            }
            type += part;
          }
          if (!typeRefRe.test(type))
            throw illegal(type, "type");
          var name = next();
          if (name === null) {
            throw illegal(name, "end of input");
          }
          if (!nameRe.test(name))
            throw illegal(name, "name");
          var protoName = name;
          name = applyCase(name);
          skip("=");
          var field = new Field(name, parseId(next()), type, rule === "proto3_optional" ? "optional" : rule, extend);
          if (protoName !== name)
            field.protoName = protoName;
          ifBlock(field, function parseField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else
              throw illegal(token2);
          }, function parseField_line() {
            parseInlineOptions(field);
          });
          if (rule === "proto3_optional") {
            var oneof = new OneOf("_" + name);
            field.setOption("proto3_optional", true);
            oneof.add(field);
            parent.add(oneof);
          } else {
            parent.add(field);
          }
          if (parent === ptr) {
            topLevelObjects.push(field);
          }
        }
        function parseGroup(parent, rule, extend, depth) {
          if (depth === void 0)
            depth = 0;
          if (depth > util.nestingLimit)
            throw Error("max depth exceeded");
          if (edition >= 2023) {
            throw illegal("group");
          }
          var name = next();
          if (name === null || !nameRe.test(name))
            throw illegal(name, "name");
          var fieldName = util.lcFirst(name);
          if (name === fieldName)
            name = util.ucFirst(name);
          skip("=");
          var id = parseId(next());
          var type = new Type(name);
          type.group = true;
          var field = new Field(fieldName, id, name, rule, extend);
          field.filename = parse.filename;
          ifBlock(type, function parseGroup_block(token2) {
            switch (token2) {
              case ";":
                break;
              case "map":
                parseMapField(type);
                break;
              case "option":
                parseOption(type, token2);
                skip(";");
                break;
              case "required":
              case "repeated":
                parseField(type, token2, void 0, depth + 1);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(type, "proto3_optional", void 0, depth + 1);
                } else {
                  parseField(type, "optional", void 0, depth + 1);
                }
                break;
              case "message":
                parseType(type, token2, depth + 1);
                break;
              case "enum":
                parseEnum(type, token2);
                break;
              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;
              case "export":
              case "local":
                if (edition < "2024") {
                  throw illegal(token2);
                }
                token2 = next();
                switch (token2) {
                  case "message":
                    parseType(type, token2, depth + 1);
                    break;
                  case "enum":
                    parseType(type, token2, depth + 1);
                    break;
                  default:
                    throw illegal(token2);
                }
                break;
              /* istanbul ignore next */
              default:
                throw illegal(token2);
            }
          });
          parent.add(type).add(field);
          if (parent === ptr) {
            topLevelObjects.push(type);
            topLevelObjects.push(field);
          }
        }
        function parseMapField(parent) {
          skip("<");
          var keyType = next();
          if (types.mapKey[keyType] === void 0)
            throw illegal(keyType, "type");
          skip(",");
          var valueType = next();
          if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");
          skip(">");
          var name = next();
          if (name === null || !nameRe.test(name))
            throw illegal(name, "name");
          skip("=");
          var protoName = name;
          name = applyCase(name);
          var field = new MapField(name, parseId(next()), keyType, valueType);
          if (protoName !== name)
            field.protoName = protoName;
          ifBlock(field, function parseMapField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else
              throw illegal(token2);
          }, function parseMapField_line() {
            parseInlineOptions(field);
          });
          parent.add(field);
        }
        function parseOneOf(parent, token2, depth) {
          if ((token2 = next()) === null || !nameRe.test(token2))
            throw illegal(token2, "name");
          var oneof = new OneOf(applyCase(token2));
          ifBlock(oneof, function parseOneOf_block(token3) {
            if (token3 === "option") {
              parseOption(oneof, token3);
              skip(";");
            } else {
              push(token3);
              parseField(oneof, "optional", void 0, depth);
            }
          });
          parent.add(oneof);
        }
        function parseEnum(parent, token2) {
          if ((token2 = next()) === null || !nameRe.test(token2))
            throw illegal(token2, "name");
          var enm = new Enum(token2), values = [];
          ifBlock(enm, function parseEnum_block(token3) {
            switch (token3) {
              case ";":
                break;
              case "option":
                parseOption(enm, token3);
                skip(";");
                break;
              case "reserved":
                readRanges(enm.reserved || (enm.reserved = []), true, maxEnumId, true);
                if (enm.reserved === void 0) enm.reserved = [];
                break;
              default:
                values.push(parseEnumValue(token3));
            }
          });
          for (var i = 0; i < values.length; ++i)
            enm.add(values[i].name, values[i].id, values[i].comment, values[i].options);
          parent.add(enm);
          if (parent === ptr) {
            topLevelObjects.push(enm);
          }
        }
        function parseEnumValue(token2) {
          if (!nameRe.test(token2))
            throw illegal(token2, "name");
          skip("=");
          var value = parseId(next(), true), dummy = {
            options: void 0
          };
          dummy.getOption = function(name) {
            return this.options[name];
          };
          dummy.setOption = function(name, value2) {
            ReflectionObject.prototype.setOption.call(dummy, name, value2);
          };
          dummy.setParsedOption = function() {
            return void 0;
          };
          ifBlock(dummy, function parseEnumValue_block(token3) {
            if (token3 === "option") {
              parseOption(dummy, token3);
              skip(";");
            } else
              throw illegal(token3);
          }, function parseEnumValue_line() {
            parseInlineOptions(dummy);
          });
          return {
            name: token2,
            id: value,
            comment: dummy.comment,
            options: dummy.parsedOptions || dummy.options
          };
        }
        function parseOption(parent, token2) {
          var option;
          var propName;
          var isOption = true;
          if (token2 === "option") {
            token2 = next();
          }
          while (token2 !== "=") {
            if (token2 === null) {
              throw illegal(token2, "end of input");
            }
            if (token2 === "(") {
              var parensValue = next();
              skip(")");
              token2 = "(" + parensValue + ")";
            }
            if (isOption) {
              isOption = false;
              if (token2.includes(".") && !token2.includes("(")) {
                var tokens = token2.split(".");
                option = tokens[0] + ".";
                token2 = tokens[1];
                continue;
              }
              option = token2;
            } else {
              propName = propName ? propName += token2 : token2;
            }
            token2 = next();
          }
          var name = propName ? option.concat(propName) : option;
          var optionValue = parseOptionValue(parent, name);
          propName = propName && propName[0] === "." ? propName.slice(1) : propName;
          option = option && option[option.length - 1] === "." ? option.slice(0, -1) : option;
          setParsedOption(parent, option, optionValue, propName);
        }
        function parseOptionValue(parent, name, depth) {
          if (depth === void 0)
            depth = 0;
          if (depth > util.recursionLimit)
            throw Error("max depth exceeded");
          if (skip("{", true)) {
            var objectResult = {};
            while (!skip("}", true)) {
              token = next();
              var propName;
              if (token === null)
                throw illegal(token, "end of input");
              if (token === "[") {
                token = next();
                var slash = token === null ? -1 : token.lastIndexOf("/");
                if (token === null || !typeRefRe.test(slash < 0 ? token : token.slice(slash + 1)))
                  throw illegal(token, "name");
                propName = "[" + token + "]";
                skip("]");
              } else {
                if (!nameRe.test(token)) {
                  throw illegal(token, "name");
                }
                propName = token;
              }
              var value;
              skip(":", true);
              if (peek() === "{") {
                value = parseOptionValue(parent, name + "." + propName, depth + 1);
              } else if (peek() === "[") {
                value = [];
                var lastValue, lastValueIsAggregate;
                if (skip("[", true)) {
                  if (!skip("]", true)) {
                    do {
                      lastValueIsAggregate = peek() === "{";
                      lastValue = lastValueIsAggregate ? parseOptionValue(parent, name + "." + propName, depth + 1) : readValue(true);
                      value.push(lastValue);
                    } while (skip(",", true));
                    skip("]");
                    if (typeof lastValue !== "undefined") {
                      if (!lastValueIsAggregate)
                        setOption(parent, name + "." + propName, lastValue);
                    }
                  }
                }
              } else {
                value = readValue(true);
                setOption(parent, name + "." + propName, value);
              }
              var prevValue = Object.prototype.hasOwnProperty.call(objectResult, propName) ? objectResult[propName] : void 0;
              if (prevValue)
                value = [].concat(prevValue).concat(value);
              if (propName !== "__proto__")
                objectResult[propName] = value;
              skip(",", true);
              skip(";", true);
            }
            return objectResult;
          }
          var simpleValue = readValue(true);
          setOption(parent, name, simpleValue);
          return simpleValue;
        }
        function setOption(parent, name, value) {
          if (ptr === parent && /^features\./.test(name)) {
            topLevelOptions[name] = value;
            return;
          }
          if (name === "json_name" && parent instanceof Field) {
            parent.jsonName = value;
          }
          if (parent.setOption)
            parent.setOption(name, value);
        }
        function setParsedOption(parent, name, value, propName) {
          if (parent.setParsedOption)
            parent.setParsedOption(name, value, propName);
        }
        function parseInlineOptions(parent) {
          if (skip("[", true)) {
            do {
              parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
          }
          return parent;
        }
        function parseService(parent, token2, depth) {
          if (depth === void 0)
            depth = 0;
          if (depth > util.recursionLimit)
            throw Error("max depth exceeded");
          if ((token2 = next()) === null || !nameRe.test(token2))
            throw illegal(token2, "service name");
          var service = new Service(token2);
          ifBlock(service, function parseService_block(token3) {
            if (parseCommon(service, token3, depth)) {
              return;
            }
            if (token3 === ";")
              return;
            if (token3 === "rpc")
              parseMethod(service, token3);
            else
              throw illegal(token3);
          });
          parent.add(service);
          if (parent === ptr) {
            topLevelObjects.push(service);
          }
        }
        function parseMethod(parent, token2) {
          var commentText = cmnt();
          var type = token2;
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var name = token2, requestType, requestStream, responseType, responseStream;
          skip("(");
          if (skip("stream", true))
            requestStream = true;
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2);
          requestType = token2;
          skip(")");
          skip("returns");
          skip("(");
          if (skip("stream", true))
            responseStream = true;
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2);
          responseType = token2;
          skip(")");
          var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
          method.comment = commentText;
          ifBlock(method, function parseMethod_block(token3) {
            if (token3 === ";")
              return;
            if (token3 === "option") {
              parseOption(method, token3);
              skip(";");
            } else
              throw illegal(token3);
          });
          parent.add(method);
        }
        function parseExtension(parent, token2, depth) {
          if ((token2 = next()) === null || !typeRefRe.test(token2))
            throw illegal(token2, "reference");
          var reference = token2;
          ifBlock(null, function parseExtension_block(token3) {
            switch (token3) {
              case "required":
              case "repeated":
                parseField(parent, token3, reference, depth + 1);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(parent, "proto3_optional", reference, depth + 1);
                } else {
                  parseField(parent, "optional", reference, depth + 1);
                }
                break;
              default:
                if (edition === "proto2" || !typeRefRe.test(token3))
                  throw illegal(token3);
                push(token3);
                parseField(parent, "optional", reference, depth + 1);
                break;
            }
          });
        }
        var token;
        while ((token = next()) !== null) {
          switch (token) {
            case ";":
              break;
            case "package":
              if (!head)
                throw illegal(token);
              parsePackage();
              break;
            case "import":
              parseImport();
              break;
            case "syntax":
              if (!head)
                throw illegal(token);
              parseSyntax();
              break;
            case "edition":
              if (!head)
                throw illegal(token);
              parseEdition();
              break;
            case "option":
              parseOption(ptr, token);
              skip(";", true);
              break;
            default:
              if (parseCommon(ptr, token, 0)) {
                head = false;
                continue;
              }
              throw illegal(token);
          }
        }
        resolveFileFeatures();
        parse.filename = null;
        return {
          "package": pkg,
          "imports": imports,
          weakImports,
          root
        };
      }
    }
  });

  // node_modules/protobufjs/src/common.js
  var require_common = __commonJS({
    "node_modules/protobufjs/src/common.js"(exports, module) {
      "use strict";
      module.exports = common;
      var commonRe = /\/|\./;
      function common(name, json) {
        if (!commonRe.test(name)) {
          name = "google/protobuf/" + name + ".proto";
          json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
        }
        common[name] = json;
      }
      common("any", {
        /**
         * Properties of a google.protobuf.Any message.
         * @interface IAny
         * @type {Object}
         * @property {string} [typeUrl]
         * @property {Uint8Array} [bytes]
         * @memberof common
         */
        Any: {
          fields: {
            type_url: {
              type: "string",
              id: 1
            },
            value: {
              type: "bytes",
              id: 2
            }
          }
        }
      });
      var timeType;
      common("duration", {
        /**
         * Properties of a google.protobuf.Duration message.
         * @interface IDuration
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Duration: timeType = {
          fields: {
            seconds: {
              type: "int64",
              id: 1
            },
            nanos: {
              type: "int32",
              id: 2
            }
          }
        }
      });
      common("timestamp", {
        /**
         * Properties of a google.protobuf.Timestamp message.
         * @interface ITimestamp
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Timestamp: timeType
      });
      common("empty", {
        /**
         * Properties of a google.protobuf.Empty message.
         * @interface IEmpty
         * @memberof common
         */
        Empty: {
          fields: {}
        }
      });
      common("struct", {
        /**
         * Properties of a google.protobuf.Struct message.
         * @interface IStruct
         * @type {Object}
         * @property {Object.<string,IValue>} [fields]
         * @memberof common
         */
        Struct: {
          fields: {
            fields: {
              keyType: "string",
              type: "Value",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Value message.
         * @interface IValue
         * @type {Object}
         * @property {string} [kind]
         * @property {0} [nullValue]
         * @property {number} [numberValue]
         * @property {string} [stringValue]
         * @property {boolean} [boolValue]
         * @property {IStruct} [structValue]
         * @property {IListValue} [listValue]
         * @memberof common
         */
        Value: {
          oneofs: {
            kind: {
              oneof: [
                "nullValue",
                "numberValue",
                "stringValue",
                "boolValue",
                "structValue",
                "listValue"
              ]
            }
          },
          fields: {
            nullValue: {
              type: "NullValue",
              id: 1,
              protoName: "null_value"
            },
            numberValue: {
              type: "double",
              id: 2,
              protoName: "number_value"
            },
            stringValue: {
              type: "string",
              id: 3,
              protoName: "string_value"
            },
            boolValue: {
              type: "bool",
              id: 4,
              protoName: "bool_value"
            },
            structValue: {
              type: "Struct",
              id: 5,
              protoName: "struct_value"
            },
            listValue: {
              type: "ListValue",
              id: 6,
              protoName: "list_value"
            }
          }
        },
        NullValue: {
          values: {
            NULL_VALUE: 0
          }
        },
        /**
         * Properties of a google.protobuf.ListValue message.
         * @interface IListValue
         * @type {Object}
         * @property {Array.<IValue>} [values]
         * @memberof common
         */
        ListValue: {
          fields: {
            values: {
              rule: "repeated",
              type: "Value",
              id: 1
            }
          }
        }
      });
      common("wrappers", {
        /**
         * Properties of a google.protobuf.DoubleValue message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        DoubleValue: {
          fields: {
            value: {
              type: "double",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.FloatValue message.
         * @interface IFloatValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FloatValue: {
          fields: {
            value: {
              type: "float",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Int64Value message.
         * @interface IInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        Int64Value: {
          fields: {
            value: {
              type: "int64",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.UInt64Value message.
         * @interface IUInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        UInt64Value: {
          fields: {
            value: {
              type: "uint64",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Int32Value message.
         * @interface IInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        Int32Value: {
          fields: {
            value: {
              type: "int32",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.UInt32Value message.
         * @interface IUInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        UInt32Value: {
          fields: {
            value: {
              type: "uint32",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.BoolValue message.
         * @interface IBoolValue
         * @type {Object}
         * @property {boolean} [value]
         * @memberof common
         */
        BoolValue: {
          fields: {
            value: {
              type: "bool",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.StringValue message.
         * @interface IStringValue
         * @type {Object}
         * @property {string} [value]
         * @memberof common
         */
        StringValue: {
          fields: {
            value: {
              type: "string",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.BytesValue message.
         * @interface IBytesValue
         * @type {Object}
         * @property {Uint8Array} [value]
         * @memberof common
         */
        BytesValue: {
          fields: {
            value: {
              type: "bytes",
              id: 1
            }
          }
        }
      });
      common("field_mask", {
        /**
         * Properties of a google.protobuf.FieldMask message.
         * @interface IFieldMask
         * @type {Object}
         * @property {string[]} [paths]
         * @memberof common
         */
        FieldMask: {
          fields: {
            paths: {
              rule: "repeated",
              type: "string",
              id: 1
            }
          }
        }
      });
      common.get = function get(file) {
        return common[file] || null;
      };
    }
  });

  // node_modules/protobufjs/src/index.js
  var require_src = __commonJS({
    "node_modules/protobufjs/src/index.js"(exports, module) {
      "use strict";
      exports = module.exports = require_index_light();
      exports.build = "full";
      exports.tokenize = require_tokenize();
      exports.parse = require_parse();
      exports.common = require_common();
      exports.Root._configure(exports.Type, exports.parse, exports.common);
    }
  });

  // node_modules/protobufjs/index.js
  var require_protobufjs = __commonJS({
    "node_modules/protobufjs/index.js"(exports, module) {
      "use strict";
      module.exports = require_src();
    }
  });

  // src/bitstream.ts
  function bytesToBase64(bytes) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(bytes).toString("base64");
    }
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  function base64ToBytes(base64) {
    if (typeof Buffer !== "undefined") {
      return new Uint8Array(Buffer.from(base64, "base64"));
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  function encodeInteger(value, maxValue) {
    const bitLen = maxValue.toString(2).length;
    return value.toString(2).padStart(bitLen, "0");
  }
  function encodeBoolean(value) {
    return value ? "1" : "0";
  }
  function binaryStringToBase64Url(binaryStr) {
    if (!binaryStr) return "";
    const paddedStr = binaryStr.padEnd(Math.ceil(binaryStr.length / 8) * 8, "0");
    const byteCount = paddedStr.length / 8;
    const bytes = new Uint8Array(byteCount);
    for (let i = 0; i < byteCount; i++) {
      bytes[i] = parseInt(paddedStr.slice(i * 8, (i + 1) * 8), 2);
    }
    const base64 = bytesToBase64(bytes);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function base64UrlToBinaryString(base64Url) {
    if (!base64Url) return "";
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padding = base64.length % 4;
    if (padding > 0) {
      base64 += "=".repeat(4 - padding);
    }
    const bytes = base64ToBytes(base64);
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
      result += bytes[i].toString(2).padStart(8, "0");
    }
    return result;
  }
  function encodeString(str) {
    const bytes = textEncoder.encode(str);
    let bitStr = encodeInteger(bytes.length, 65535);
    for (let i = 0; i < bytes.length; i++) {
      bitStr += bytes[i].toString(2).padStart(8, "0");
    }
    return bitStr;
  }
  function decodeString(reader) {
    const length = reader.readInteger(65535);
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      const byteBits = reader.readBits(8);
      bytes[i] = parseInt(byteBits, 2);
    }
    return textDecoder.decode(bytes);
  }
  var textEncoder, textDecoder, BitReader;
  var init_bitstream = __esm({
    "src/bitstream.ts"() {
      "use strict";
      textEncoder = new TextEncoder();
      textDecoder = new TextDecoder();
      BitReader = class {
        constructor(binaryStr) {
          this.binaryStr = binaryStr;
          this.pos = 0;
        }
        readBits(numBits) {
          if (this.pos + numBits > this.binaryStr.length) {
            throw new Error("Not enough bits to read");
          }
          const bits = this.binaryStr.slice(this.pos, this.pos + numBits);
          this.pos += numBits;
          return bits;
        }
        remainingBits() {
          return this.binaryStr.length - this.pos;
        }
        readInteger(maxValue) {
          const bitLen = maxValue.toString(2).length;
          const bits = this.readBits(bitLen);
          const val = parseInt(bits, 2);
          if (val > maxValue) {
            throw new Error(`Read integer value ${val} exceeds maximum allowed value ${maxValue}.`);
          }
          return val;
        }
        readBoolean() {
          return this.readBits(1) === "1";
        }
        hasMoreBits() {
          return this.pos < this.binaryStr.length;
        }
        peekRemaining() {
          return this.binaryStr.slice(this.pos);
        }
      };
    }
  });

  // src/card-encoding.ts
  function buildDeck(minRank = 9, includeCavalier = false, includeTriumphs = false) {
    const rankStr = String(minRank);
    const rankArray = includeCavalier ? ALL_RANKS_WITH_CAVALIER : ALL_RANKS;
    const startIdx = rankArray.indexOf(rankStr);
    const ranks = startIdx >= 0 ? rankArray.slice(startIdx) : rankArray.slice(rankArray.indexOf("9"));
    return ranks.flatMap((rank) => SUITS.map((suit) => rank + suit)).concat(includeTriumphs ? TRIUMPHS : []);
  }
  function encodeCard(card, cardsRemaining) {
    const index = cardsRemaining.indexOf(card);
    if (index === -1) {
      throw new Error(`Card ${card} not found in remaining cards.`);
    }
    return encodeInteger(index, cardsRemaining.length - 1);
  }
  function encodeCardFromDeck(card, deck) {
    const index = deck.indexOf(card);
    if (index === -1) {
      throw new Error(`Card ${card} not found in deck.`);
    }
    return encodeInteger(index, deck.length - 1);
  }
  function encodeR1Call(call) {
    return call === "Pass" || call === "p" ? "0" : "1";
  }
  function encodeR2Call(call, possibleSuits) {
    if (call === "Pass" || call === "p") {
      return "00";
    } else {
      const char = call[0].toLowerCase();
      const index = possibleSuits.indexOf(char) + 1;
      return encodeInteger(index, 3);
    }
  }
  var SUITS, ALL_RANKS, ALL_RANKS_WITH_CAVALIER, TRIUMPHS, MIN_RANK_TO_CODE, CODE_TO_MIN_RANK, STANDARD_DECK, FULL_52_CARD_DECK, FULL_78_CARD_DECK;
  var init_card_encoding = __esm({
    "src/card-encoding.ts"() {
      "use strict";
      init_bitstream();
      SUITS = ["s", "h", "c", "d"];
      ALL_RANKS = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "T",
        "J",
        "Q",
        "K",
        "A"
      ];
      ALL_RANKS_WITH_CAVALIER = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "T",
        "J",
        "C",
        "Q",
        "K",
        "A"
      ];
      TRIUMPHS = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21"
      ];
      MIN_RANK_TO_CODE = { 9: 0, 8: 1, 7: 2, 6: 3, 2: 4 };
      CODE_TO_MIN_RANK = [9, 8, 7, 6, 2];
      STANDARD_DECK = buildDeck(9);
      FULL_52_CARD_DECK = buildDeck(2);
      FULL_78_CARD_DECK = buildDeck(2, true, true);
    }
  });

  // src/bitpacker.ts
  var bitpacker_exports = {};
  __export(bitpacker_exports, {
    base64UrlToBinaryString: () => base64UrlToBinaryString,
    binaryStringToBase64Url: () => binaryStringToBase64Url,
    packDeal: () => packDeal,
    unpackDeal: () => unpackDeal
  });
  function encodeAnnotations(annotations) {
    const keys = Object.keys(annotations || {}).map(Number).filter((n) => !isNaN(n)).sort((a, b) => a - b);
    if (keys.length === 0) {
      return "0";
    }
    let bits = "1";
    bits += encodeInteger(keys.length, 255);
    for (const key of keys) {
      bits += encodeInteger(key, 255);
      const texts = annotations[key] || [];
      bits += encodeInteger(texts.length, 255);
      for (const text of texts) {
        bits += encodeString(text);
      }
    }
    return bits;
  }
  function decodeAnnotations(reader) {
    const hasAnn = reader.readBoolean();
    if (!hasAnn) {
      return void 0;
    }
    const annotations = {};
    const numItems = reader.readInteger(255);
    for (let i = 0; i < numItems; i++) {
      const key = reader.readInteger(255);
      const numTexts = reader.readInteger(255);
      const texts = [];
      for (let j = 0; j < numTexts; j++) {
        texts.push(decodeString(reader));
      }
      annotations[key] = texts;
    }
    return annotations;
  }
  function encodeBiddingPhase(bidding, upCard, startActionIndex = 0, numPlayers = 4, version = 1, deck = STANDARD_DECK) {
    let bits = "";
    bidding.calls.forEach((call, callIndex) => {
      const actualIndex = startActionIndex + callIndex;
      if (actualIndex < numPlayers) {
        bits += encodeR1Call(call);
      } else {
        const remainingSuits = SUITS.filter(
          (suit) => suit !== upCard[1].toLowerCase()
        );
        bits += encodeR2Call(call, remainingSuits);
      }
    });
    bits += encodeBoolean(bidding.isAlone ?? false);
    if (version >= 2 && (bidding.isAlone ?? false)) {
      const hasDefendAlone = bidding.aloneDefender !== void 0 && bidding.aloneDefender >= 0;
      bits += encodeBoolean(hasDefendAlone);
      if (hasDefendAlone) {
        bits += encodeInteger(bidding.aloneDefender, 7);
      }
    }
    if (version >= 3) {
      const hasDiscard = bidding.discard !== void 0;
      bits += encodeBoolean(hasDiscard);
      if (hasDiscard) {
        bits += encodeCardFromDeck(bidding.discard, deck);
      }
    }
    bits += encodeAnnotations(bidding.callAnnotations);
    return bits;
  }
  function decodeBiddingPhase(reader, upCard, startActionIndex = 0, numPlayers = 4, version = 1, deck = STANDARD_DECK) {
    const calls = [];
    let orderedUp = false;
    if (startActionIndex < numPlayers) {
      for (let i = startActionIndex; i < numPlayers; i++) {
        const bit = reader.readBits(1);
        if (bit === "0") {
          calls.push("Pass");
        } else {
          calls.push("Order");
          orderedUp = true;
          break;
        }
      }
    }
    if (!orderedUp) {
      const remainingSuits = SUITS.filter((suit) => suit !== upCard[1].toLowerCase());
      const round2Start = Math.max(0, startActionIndex - numPlayers);
      for (let i = round2Start; i < numPlayers; i++) {
        const val = reader.readInteger(3);
        if (val === 0) {
          calls.push("Pass");
        } else {
          calls.push(remainingSuits[val - 1]);
          orderedUp = true;
          break;
        }
      }
    }
    const isAlone = reader.readBoolean();
    let aloneDefender = void 0;
    if (version >= 2 && isAlone) {
      const hasDefendAlone = reader.readBoolean();
      if (hasDefendAlone) {
        aloneDefender = reader.readInteger(7);
      }
    }
    let discard = void 0;
    if (version >= 3) {
      const hasDiscard = reader.readBoolean();
      if (hasDiscard) {
        const discardIndex = reader.readInteger(deck.length - 1);
        discard = deck[discardIndex];
      }
    }
    const callAnnotations = decodeAnnotations(reader);
    const phase = {
      phaseNumber: 0,
      type: "EUCHRE_BIDDING",
      calls,
      isAlone
    };
    if (aloneDefender !== void 0) {
      phase.aloneDefender = aloneDefender;
    }
    if (discard !== void 0) {
      phase.discard = discard;
    }
    if (callAnnotations) {
      phase.callAnnotations = callAnnotations;
    }
    return phase;
  }
  function encodePlayerCards(playerCards, deck, numPlayers) {
    const hasPlayerCards = Array.isArray(playerCards);
    let bits = encodeBoolean(hasPlayerCards);
    if (!hasPlayerCards) {
      return bits;
    }
    for (let seat = 0; seat < numPlayers; seat++) {
      const hand = Array.isArray(playerCards[seat]) ? playerCards[seat] : [];
      bits += encodeInteger(hand.length, 15);
      for (const card of hand) {
        bits += encodeCardFromDeck(card, deck);
      }
    }
    return bits;
  }
  function decodePlayerCards(reader, deck, numPlayers) {
    const hasPlayerCards = reader.readBoolean();
    if (!hasPlayerCards) {
      return void 0;
    }
    const playerCards = [];
    for (let seat = 0; seat < numPlayers; seat++) {
      const handLen = reader.readInteger(15);
      if (handLen > deck.length || handLen > 5) {
        throw new Error(`Invalid player hand length ${handLen} in bitpacked player cards.`);
      }
      const hand = [];
      for (let i = 0; i < handLen; i++) {
        const cardIndex = reader.readInteger(deck.length - 1);
        hand.push(deck[cardIndex]);
      }
      playerCards.push(hand);
    }
    return playerCards;
  }
  function encodePlayPhase(play, cardsRemaining) {
    let bits = "";
    bits += encodeInteger(play.tricks.length, 7);
    play.tricks.forEach((trick) => {
      trick.forEach((card) => {
        bits += encodeCard(card, cardsRemaining);
        const idx = cardsRemaining.indexOf(card);
        if (idx !== -1) {
          cardsRemaining.splice(idx, 1);
        }
      });
    });
    bits += encodeAnnotations(play.playAnnotations);
    return bits;
  }
  function computeCardsPerTrick(numPlayers, isAlone, hasDefendAlone) {
    if (!isAlone) return numPlayers;
    return hasDefendAlone ? numPlayers - 2 : numPlayers - 1;
  }
  function decodePlayPhase(reader, isAlone, cardsRemaining, numPlayers = 4, firstTrickCards, hasDefendAlone = false) {
    const numTricks = reader.readInteger(7);
    const tricks = [];
    const cardsPerTrick = computeCardsPerTrick(numPlayers, isAlone, hasDefendAlone);
    for (let t = 0; t < numTricks; t++) {
      const trick = [];
      const limit = t === 0 && firstTrickCards !== void 0 ? firstTrickCards : cardsPerTrick;
      for (let c = 0; c < limit; c++) {
        const maxVal = cardsRemaining.length - 1;
        if (maxVal < 0) break;
        const cardIndex = reader.readInteger(maxVal);
        const card = cardsRemaining[cardIndex];
        cardsRemaining.splice(cardIndex, 1);
        trick.push(card);
      }
      tricks.push(trick);
    }
    const playAnnotations = decodeAnnotations(reader);
    const phase = {
      phaseNumber: 1,
      type: "TRICK_PLAY",
      tricks
    };
    if (playAnnotations) {
      phase.playAnnotations = playAnnotations;
    }
    return phase;
  }
  function getCardsRemainingAtActionIndex(deal, branchIndex, deck = STANDARD_DECK) {
    const cardsRemaining = [...deck];
    let actionCount = 0;
    for (const phase of deal.phases) {
      if (phase.type === "EUCHRE_BIDDING") {
        const bidding = phase;
        const numCalls = bidding.calls.length;
        if (actionCount + numCalls <= branchIndex) {
          actionCount += numCalls;
        } else {
          actionCount = branchIndex;
          break;
        }
      } else if (phase.type === "TRICK_PLAY") {
        const play = phase;
        for (const trick of play.tricks) {
          for (const card of trick) {
            if (actionCount < branchIndex) {
              const idx = cardsRemaining.indexOf(card);
              if (idx !== -1) {
                cardsRemaining.splice(idx, 1);
              }
              actionCount++;
            } else {
              break;
            }
          }
          if (actionCount >= branchIndex) {
            break;
          }
        }
      }
      if (actionCount >= branchIndex) {
        break;
      }
    }
    return cardsRemaining;
  }
  function packDeal(deal, options) {
    let version = options?.version;
    if (version === void 0) {
      const numPlayers = options?.numPlayers ?? 4;
      const minRank = options?.minRank ?? 9;
      const dealer = deal.initialState.dealer ?? 0;
      const hasDefendAlone = deal.phases?.some((p) => p.type === "EUCHRE_BIDDING" && p.aloneDefender !== void 0 && p.aloneDefender !== -1);
      const hasDiscard = deal.phases?.some((p) => p.type === "EUCHRE_BIDDING" && p.discard !== void 0 && p.discard.length > 0) || deal.alternativeLines?.some((line) => line.phases?.some((p) => p.type === "EUCHRE_BIDDING" && p.discard !== void 0 && p.discard.length > 0));
      const hasPlayerCards = Array.isArray(deal.initialState.playerCards) && deal.initialState.playerCards.some((cards) => Array.isArray(cards) && cards.length > 0);
      const needsV3 = hasDiscard || hasPlayerCards;
      const needsV2 = numPlayers !== 4 || minRank !== 9 || hasDefendAlone || dealer >= 4;
      version = needsV3 ? 3 : needsV2 ? 2 : 1;
    }
    const binaryString = version === 3 ? packDealV3(deal, options) : version === 2 ? packDealV2(deal, options) : packDealV1(deal);
    if (options?.asBinary) {
      return binaryString;
    }
    return binaryStringToBase64Url(binaryString);
  }
  function packDealV1(deal) {
    let binaryString = "0001";
    binaryString += encodeInteger(deal.initialState.dealer, 3);
    const cardsRemaining = [...STANDARD_DECK];
    binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);
    binaryString += encodeInteger(deal.phases.length, 7);
    let isAlone = false;
    deal.phases.forEach((phase) => {
      if (phase.type === "EUCHRE_BIDDING") {
        binaryString += "0";
        binaryString += encodeBiddingPhase(phase, deal.initialState.upCard, 0, 4, 1, STANDARD_DECK);
        isAlone = phase.isAlone ?? false;
      } else if (phase.type === "TRICK_PLAY") {
        binaryString += "1";
        binaryString += encodePlayPhase(phase, cardsRemaining);
      }
    });
    if (deal.alternativeLines && deal.alternativeLines.length > 0) {
      binaryString += "1";
      binaryString += encodeInteger(deal.alternativeLines.length, 255);
      deal.alternativeLines.forEach((altLine) => {
        binaryString += encodeInteger(altLine.branchIndex, 65535);
        const altCardsRemaining = getCardsRemainingAtActionIndex(deal, altLine.branchIndex, STANDARD_DECK);
        binaryString += encodeInteger(altLine.phases.length, 15);
        let altIsAlone = isAlone;
        altLine.phases.forEach((phase) => {
          if (phase.type === "EUCHRE_BIDDING") {
            binaryString += "0";
            binaryString += encodeBiddingPhase(phase, deal.initialState.upCard, altLine.branchIndex, 4, 1, STANDARD_DECK);
            altIsAlone = phase.isAlone ?? false;
          } else if (phase.type === "TRICK_PLAY") {
            binaryString += "1";
            binaryString += encodePlayPhase(phase, altCardsRemaining);
          }
        });
      });
    } else {
      binaryString += "0";
    }
    binaryString += "1010";
    return binaryString;
  }
  function packDealV2(deal, options) {
    const numPlayers = options?.numPlayers ?? 4;
    const minRank = options?.minRank ?? 9;
    const minRankCode = MIN_RANK_TO_CODE[minRank] ?? 0;
    const deck = buildDeck(minRank);
    let binaryString = "0010";
    binaryString += encodeInteger(deal.initialState.dealer, 7);
    binaryString += encodeInteger(numPlayers - 1, 7);
    binaryString += encodeInteger(minRankCode, 3);
    const cardsRemaining = [...deck];
    binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);
    binaryString += encodeInteger(deal.phases.length, 7);
    let isAlone = false;
    deal.phases.forEach((phase) => {
      if (phase.type === "EUCHRE_BIDDING") {
        binaryString += "0";
        binaryString += encodeBiddingPhase(phase, deal.initialState.upCard, 0, numPlayers, 2, deck);
        isAlone = phase.isAlone ?? false;
      } else if (phase.type === "TRICK_PLAY") {
        binaryString += "1";
        binaryString += encodePlayPhase(phase, cardsRemaining);
      }
    });
    if (deal.alternativeLines && deal.alternativeLines.length > 0) {
      binaryString += "1";
      binaryString += encodeInteger(deal.alternativeLines.length, 255);
      deal.alternativeLines.forEach((altLine) => {
        binaryString += encodeInteger(altLine.branchIndex, 65535);
        const altCardsRemaining = getCardsRemainingAtActionIndex(deal, altLine.branchIndex, deck);
        binaryString += encodeInteger(altLine.phases.length, 15);
        let altIsAlone = isAlone;
        altLine.phases.forEach((phase) => {
          if (phase.type === "EUCHRE_BIDDING") {
            binaryString += "0";
            binaryString += encodeBiddingPhase(phase, deal.initialState.upCard, altLine.branchIndex, numPlayers, 2, deck);
            altIsAlone = phase.isAlone ?? false;
          } else if (phase.type === "TRICK_PLAY") {
            binaryString += "1";
            binaryString += encodePlayPhase(phase, altCardsRemaining);
          }
        });
      });
    } else {
      binaryString += "0";
    }
    binaryString += "1010";
    return binaryString;
  }
  function packDealV3(deal, options) {
    const numPlayers = options?.numPlayers ?? 4;
    const minRank = options?.minRank ?? 9;
    const minRankCode = MIN_RANK_TO_CODE[minRank] ?? 0;
    const deck = buildDeck(minRank);
    let binaryString = "0011";
    binaryString += encodeInteger(deal.initialState.dealer, 7);
    binaryString += encodeInteger(numPlayers - 1, 7);
    binaryString += encodeInteger(minRankCode, 3);
    const cardsRemaining = [...deck];
    binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);
    binaryString += encodePlayerCards(deal.initialState.playerCards, deck, numPlayers);
    binaryString += encodeInteger(deal.phases.length, 7);
    let isAlone = false;
    deal.phases.forEach((phase) => {
      if (phase.type === "EUCHRE_BIDDING") {
        binaryString += "0";
        binaryString += encodeBiddingPhase(phase, deal.initialState.upCard, 0, numPlayers, 3, deck);
        isAlone = phase.isAlone ?? false;
      } else if (phase.type === "TRICK_PLAY") {
        binaryString += "1";
        binaryString += encodePlayPhase(phase, cardsRemaining);
      }
    });
    if (deal.alternativeLines && deal.alternativeLines.length > 0) {
      binaryString += "1";
      binaryString += encodeInteger(deal.alternativeLines.length, 255);
      deal.alternativeLines.forEach((altLine) => {
        binaryString += encodeInteger(altLine.branchIndex, 65535);
        const altCardsRemaining = getCardsRemainingAtActionIndex(deal, altLine.branchIndex, deck);
        binaryString += encodeInteger(altLine.phases.length, 15);
        let altIsAlone = isAlone;
        altLine.phases.forEach((phase) => {
          if (phase.type === "EUCHRE_BIDDING") {
            binaryString += "0";
            binaryString += encodeBiddingPhase(phase, deal.initialState.upCard, altLine.branchIndex, numPlayers, 3, deck);
            altIsAlone = phase.isAlone ?? false;
          } else if (phase.type === "TRICK_PLAY") {
            binaryString += "1";
            binaryString += encodePlayPhase(phase, altCardsRemaining);
          }
        });
      });
    } else {
      binaryString += "0";
    }
    binaryString += "1010";
    return binaryString;
  }
  function unpackDeal(input, dealNumber = 0, isBinary = false) {
    const binaryString = isBinary ? input : base64UrlToBinaryString(input);
    const reader = new BitReader(binaryString);
    const headerBits = binaryString.slice(0, 4);
    if (reader.remainingBits() >= 4 && headerBits === "0011") {
      try {
        return unpackDealV3(reader, binaryString, dealNumber);
      } catch (e) {
        return unpackDealV0(binaryString, dealNumber);
      }
    }
    if (reader.remainingBits() >= 4 && headerBits === "0010") {
      try {
        return unpackDealV2(reader, binaryString, dealNumber);
      } catch (e) {
        return unpackDealV0(binaryString, dealNumber);
      }
    }
    if (reader.remainingBits() >= 4 && headerBits === "0001") {
      try {
        return unpackDealV1(reader, binaryString, dealNumber);
      } catch (e) {
        return unpackDealV0(binaryString, dealNumber);
      }
    }
    return unpackDealV0(binaryString, dealNumber);
  }
  function unpackDealV2(reader, binaryString, dealNumber) {
    reader.readBits(4);
    const dealer = reader.readInteger(7);
    const numPlayersOffset = reader.readInteger(7);
    const numPlayers = numPlayersOffset + 1;
    const minRankCode = reader.readInteger(3);
    const minRank = CODE_TO_MIN_RANK[minRankCode] ?? 9;
    const deck = buildDeck(minRank);
    const cardsRemaining = [...deck];
    const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
    const upCard = cardsRemaining[upCardIndex];
    const deal = {
      dealNumber,
      initialState: { dealer, upCard },
      phases: []
    };
    const numPhases = reader.readInteger(7);
    let isAlone = false;
    let hasDefendAlone = false;
    for (let p = 0; p < numPhases; p++) {
      const phaseType = reader.readBits(1);
      if (phaseType === "0") {
        const biddingPhase = decodeBiddingPhase(reader, upCard, 0, numPlayers, 2, deck);
        biddingPhase.phaseNumber = p;
        isAlone = biddingPhase.isAlone ?? false;
        hasDefendAlone = biddingPhase.aloneDefender !== void 0 && biddingPhase.aloneDefender >= 0;
        deal.phases.push(biddingPhase);
      } else {
        const playPhase = decodePlayPhase(reader, isAlone, cardsRemaining, numPlayers, void 0, hasDefendAlone);
        playPhase.phaseNumber = p;
        deal.phases.push(playPhase);
      }
    }
    const hasAltLines = reader.readBoolean();
    if (hasAltLines) {
      const numAltLines = reader.readInteger(255);
      const alternativeLines = [];
      for (let a = 0; a < numAltLines; a++) {
        const branchIndex = reader.readInteger(65535);
        const altCardsRemaining = getCardsRemainingAtActionIndex(deal, branchIndex, deck);
        const numAltPhases = reader.readInteger(15);
        const phases = [];
        let altIsAlone = isAlone;
        let altHasDefendAlone = hasDefendAlone;
        for (let p = 0; p < numAltPhases; p++) {
          const phaseType = reader.readBits(1);
          if (phaseType === "0") {
            const biddingPhase = decodeBiddingPhase(reader, upCard, branchIndex, numPlayers, 2, deck);
            biddingPhase.phaseNumber = 0;
            altIsAlone = biddingPhase.isAlone ?? false;
            altHasDefendAlone = biddingPhase.aloneDefender !== void 0 && biddingPhase.aloneDefender >= 0;
            phases.push(biddingPhase);
          } else {
            let firstTrickCards = void 0;
            if (p === 0) {
              const mainBiddingPhase = deal.phases.find((ph) => ph.type === "EUCHRE_BIDDING");
              const biddingDecisionsCount = mainBiddingPhase ? mainBiddingPhase.calls.length : 0;
              const branchPlayIndex = branchIndex - biddingDecisionsCount;
              if (branchPlayIndex > 0) {
                const cardsPerTrick = computeCardsPerTrick(numPlayers, altIsAlone, altHasDefendAlone);
                const cardsAlreadyPlayed = branchPlayIndex % cardsPerTrick;
                if (cardsAlreadyPlayed > 0) {
                  firstTrickCards = cardsPerTrick - cardsAlreadyPlayed;
                }
              }
            }
            const playPhase = decodePlayPhase(reader, altIsAlone, altCardsRemaining, numPlayers, firstTrickCards, altHasDefendAlone);
            playPhase.phaseNumber = 1;
            phases.push(playPhase);
          }
        }
        alternativeLines.push({ branchIndex, phases });
      }
      deal.alternativeLines = alternativeLines;
    }
    const endMarker = reader.readBits(4);
    if (endMarker !== "1010") {
      throw new Error("Invalid end marker. Bitpack data may be corrupted.");
    }
    return deal;
  }
  function unpackDealV3(reader, binaryString, dealNumber) {
    reader.readBits(4);
    const dealer = reader.readInteger(7);
    const numPlayersOffset = reader.readInteger(7);
    const numPlayers = numPlayersOffset + 1;
    const minRankCode = reader.readInteger(3);
    const minRank = CODE_TO_MIN_RANK[minRankCode] ?? 9;
    const deck = buildDeck(minRank);
    const cardsRemaining = [...deck];
    const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
    const upCard = cardsRemaining[upCardIndex];
    const playerCards = decodePlayerCards(reader, deck, numPlayers);
    const deal = {
      dealNumber,
      initialState: { dealer, upCard },
      phases: []
    };
    if (playerCards !== void 0) {
      deal.initialState.playerCards = playerCards;
    }
    const numPhases = reader.readInteger(7);
    let isAlone = false;
    let hasDefendAlone = false;
    for (let p = 0; p < numPhases; p++) {
      const phaseType = reader.readBits(1);
      if (phaseType === "0") {
        const biddingPhase = decodeBiddingPhase(reader, upCard, 0, numPlayers, 3, deck);
        biddingPhase.phaseNumber = p;
        isAlone = biddingPhase.isAlone ?? false;
        hasDefendAlone = biddingPhase.aloneDefender !== void 0 && biddingPhase.aloneDefender >= 0;
        deal.phases.push(biddingPhase);
      } else {
        const playPhase = decodePlayPhase(reader, isAlone, cardsRemaining, numPlayers, void 0, hasDefendAlone);
        playPhase.phaseNumber = p;
        deal.phases.push(playPhase);
      }
    }
    const hasAltLines = reader.readBoolean();
    if (hasAltLines) {
      const numAltLines = reader.readInteger(255);
      const alternativeLines = [];
      for (let a = 0; a < numAltLines; a++) {
        const branchIndex = reader.readInteger(65535);
        const altCardsRemaining = getCardsRemainingAtActionIndex(deal, branchIndex, deck);
        const numAltPhases = reader.readInteger(15);
        const phases = [];
        let altIsAlone = isAlone;
        let altHasDefendAlone = hasDefendAlone;
        for (let p = 0; p < numAltPhases; p++) {
          const phaseType = reader.readBits(1);
          if (phaseType === "0") {
            const biddingPhase = decodeBiddingPhase(reader, upCard, branchIndex, numPlayers, 3, deck);
            biddingPhase.phaseNumber = 0;
            altIsAlone = biddingPhase.isAlone ?? false;
            altHasDefendAlone = biddingPhase.aloneDefender !== void 0 && biddingPhase.aloneDefender >= 0;
            phases.push(biddingPhase);
          } else {
            let firstTrickCards = void 0;
            if (p === 0) {
              const mainBiddingPhase = deal.phases.find((ph) => ph.type === "EUCHRE_BIDDING");
              const biddingDecisionsCount = mainBiddingPhase ? mainBiddingPhase.calls.length : 0;
              const branchPlayIndex = branchIndex - biddingDecisionsCount;
              if (branchPlayIndex > 0) {
                const cardsPerTrick = computeCardsPerTrick(numPlayers, altIsAlone, altHasDefendAlone);
                const cardsAlreadyPlayed = branchPlayIndex % cardsPerTrick;
                if (cardsAlreadyPlayed > 0) {
                  firstTrickCards = cardsPerTrick - cardsAlreadyPlayed;
                }
              }
            }
            const playPhase = decodePlayPhase(reader, altIsAlone, altCardsRemaining, numPlayers, firstTrickCards, altHasDefendAlone);
            playPhase.phaseNumber = 1;
            phases.push(playPhase);
          }
        }
        alternativeLines.push({ branchIndex, phases });
      }
      deal.alternativeLines = alternativeLines;
    }
    const endMarker = reader.readBits(4);
    if (endMarker !== "1010") {
      throw new Error("Invalid end marker. Bitpack data may be corrupted.");
    }
    return deal;
  }
  function unpackDealV1(reader, binaryString, dealNumber) {
    reader.readBits(4);
    const dealer = reader.readInteger(3);
    const cardsRemaining = [...STANDARD_DECK];
    const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
    const upCard = cardsRemaining[upCardIndex];
    const deal = {
      dealNumber,
      initialState: { dealer, upCard },
      phases: []
    };
    const numPhases = reader.readInteger(7);
    let isAlone = false;
    for (let p = 0; p < numPhases; p++) {
      const phaseType = reader.readBits(1);
      if (phaseType === "0") {
        const biddingPhase = decodeBiddingPhase(reader, upCard, 0, 4, 1, STANDARD_DECK);
        biddingPhase.phaseNumber = p;
        isAlone = biddingPhase.isAlone ?? false;
        deal.phases.push(biddingPhase);
      } else {
        const playPhase = decodePlayPhase(reader, isAlone, cardsRemaining, 4);
        playPhase.phaseNumber = p;
        deal.phases.push(playPhase);
      }
    }
    const hasAltLines = reader.readBoolean();
    if (hasAltLines) {
      const numAltLines = reader.readInteger(255);
      const alternativeLines = [];
      for (let a = 0; a < numAltLines; a++) {
        const branchIndex = reader.readInteger(65535);
        const altCardsRemaining = getCardsRemainingAtActionIndex(deal, branchIndex, STANDARD_DECK);
        const numAltPhases = reader.readInteger(15);
        const phases = [];
        let altIsAlone = isAlone;
        for (let p = 0; p < numAltPhases; p++) {
          const phaseType = reader.readBits(1);
          if (phaseType === "0") {
            const biddingPhase = decodeBiddingPhase(reader, upCard, branchIndex, 4, 1, STANDARD_DECK);
            biddingPhase.phaseNumber = 0;
            altIsAlone = biddingPhase.isAlone ?? false;
            phases.push(biddingPhase);
          } else {
            let firstTrickCards = void 0;
            if (p === 0) {
              const mainBiddingPhase = deal.phases.find((ph) => ph.type === "EUCHRE_BIDDING");
              const biddingDecisionsCount = mainBiddingPhase ? mainBiddingPhase.calls.length : 0;
              const branchPlayIndex = branchIndex - biddingDecisionsCount;
              if (branchPlayIndex > 0) {
                const cardsPerTrick = altIsAlone ? 3 : 4;
                const cardsAlreadyPlayed = branchPlayIndex % cardsPerTrick;
                if (cardsAlreadyPlayed > 0) {
                  firstTrickCards = cardsPerTrick - cardsAlreadyPlayed;
                }
              }
            }
            const playPhase = decodePlayPhase(reader, altIsAlone, altCardsRemaining, 4, firstTrickCards);
            playPhase.phaseNumber = 1;
            phases.push(playPhase);
          }
        }
        alternativeLines.push({ branchIndex, phases });
      }
      deal.alternativeLines = alternativeLines;
    }
    const endMarker = reader.readBits(4);
    if (endMarker !== "1010") {
      throw new Error("Invalid end marker. Bitpack data may be corrupted.");
    }
    return deal;
  }
  function unpackDealV0(binaryString, dealNumber) {
    const reader = new BitReader(binaryString);
    const legacyDealer = reader.readInteger(3);
    let cardsRemaining = [...STANDARD_DECK];
    const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
    const upCard = cardsRemaining[upCardIndex];
    const deal = {
      dealNumber,
      initialState: { dealer: legacyDealer, upCard },
      phases: []
    };
    if (!reader.hasMoreBits() || reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1) {
      return deal;
    }
    const calls = [];
    let orderedUp = false;
    for (let i = 0; i < 4; i++) {
      const bit = reader.readBits(1);
      if (bit === "0") {
        calls.push("Pass");
      } else {
        calls.push("Order");
        orderedUp = true;
        break;
      }
    }
    if (!orderedUp) {
      const remainingSuits = SUITS.filter((suit) => suit !== upCard[1].toLowerCase());
      for (let i = 0; i < 4; i++) {
        const val = reader.readInteger(3);
        if (val === 0) {
          calls.push("Pass");
        } else {
          calls.push(remainingSuits[val - 1]);
          orderedUp = true;
          break;
        }
      }
    }
    const isAlone = reader.readBoolean();
    deal.phases.push({
      phaseNumber: 0,
      type: "EUCHRE_BIDDING",
      calls,
      isAlone
    });
    if (!reader.hasMoreBits() || reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1) {
      deal.phases[0].phaseNumber = 0;
      return deal;
    }
    const tricks = [];
    let currentTrick = [];
    const cardsPerTrick = isAlone ? 3 : 4;
    while (reader.hasMoreBits()) {
      const maxVal = cardsRemaining.length - 1;
      if (maxVal < 0) break;
      const bitLen = maxVal.toString(2).length;
      if (reader.remainingBits() < bitLen) {
        break;
      }
      if (currentTrick.length === 0 && reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1) {
        break;
      }
      const cardIndex = reader.readInteger(maxVal);
      const card = cardsRemaining[cardIndex];
      cardsRemaining = cardsRemaining.filter((c) => c !== card);
      currentTrick.push(card);
      if (currentTrick.length === cardsPerTrick) {
        tricks.push(currentTrick);
        currentTrick = [];
      }
    }
    if (currentTrick.length > 0) {
      tricks.push(currentTrick);
    }
    deal.phases[0].phaseNumber = 0;
    deal.phases.push({
      phaseNumber: 1,
      type: "TRICK_PLAY",
      tricks
    });
    return deal;
  }
  var init_bitpacker = __esm({
    "src/bitpacker.ts"() {
      "use strict";
      init_card_encoding();
      init_bitstream();
    }
  });

  // node_modules/fast-deep-equal/index.js
  var require_fast_deep_equal = __commonJS({
    "node_modules/fast-deep-equal/index.js"(exports, module) {
      "use strict";
      module.exports = function equal(a, b) {
        if (a === b) return true;
        if (a && b && typeof a == "object" && typeof b == "object") {
          if (a.constructor !== b.constructor) return false;
          var length, i, keys;
          if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for (i = length; i-- !== 0; )
              if (!equal(a[i], b[i])) return false;
            return true;
          }
          if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
          if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
          if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
          keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0; ) {
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
          }
          return true;
        }
        return a !== a && b !== b;
      };
    }
  });

  // node_modules/ajv/dist/runtime/equal.js
  var require_equal = __commonJS({
    "node_modules/ajv/dist/runtime/equal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var equal = require_fast_deep_equal();
      equal.code = 'require("ajv/dist/runtime/equal").default';
      exports.default = equal;
    }
  });

  // src/workbench/entry.ts
  var entry_exports = {};
  __export(entry_exports, {
    ALL_RANKS: () => ALL_RANKS,
    ALL_RANKS_WITH_CAVALIER: () => ALL_RANKS_WITH_CAVALIER,
    BitReader: () => BitReader,
    CODE_TO_MIN_RANK: () => CODE_TO_MIN_RANK,
    DEFAULT_TGN_ANALYSIS_KEYS: () => DEFAULT_TGN_ANALYSIS_KEYS,
    EMN_SCHEMA_VERSION: () => EMN_SCHEMA_VERSION,
    FULL_52_CARD_DECK: () => FULL_52_CARD_DECK,
    FULL_78_CARD_DECK: () => FULL_78_CARD_DECK,
    MAGIC_BYTE_EMN: () => MAGIC_BYTE_EMN,
    MIN_RANK_TO_CODE: () => MIN_RANK_TO_CODE,
    PACKAGE_VERSION: () => PACKAGE_VERSION,
    SCHEMA_VERSION: () => SCHEMA_VERSION,
    STANDARD_DECK: () => STANDARD_DECK,
    SUITS: () => SUITS,
    SUPPORTED_EMN_SCHEMA_VERSION_RE: () => SUPPORTED_EMN_SCHEMA_VERSION_RE,
    SUPPORTED_SCHEMA_VERSION_RE: () => SUPPORTED_SCHEMA_VERSION_RE,
    TRIUMPHS: () => TRIUMPHS,
    VERSION: () => VERSION,
    addFinalScoreToEgn: () => addFinalScoreToEgn,
    addFinalScoreToEgnFile: () => addFinalScoreToEgnFile,
    addScoresToEmn: () => addScoresToEmn,
    base64UrlToBinaryString: () => base64UrlToBinaryString,
    binaryStringToBase64Url: () => binaryStringToBase64Url,
    binaryToEmn: () => binaryToEmn,
    buildDeck: () => buildDeck,
    calculateDealScoreChange: () => calculateDealScoreChange,
    calculateEmnScores: () => calculateEmnScores,
    calculateFinalScore: () => calculateFinalScore,
    calculatePlayerCards: () => calculatePlayerCards,
    combineEgnToEmn: () => combineEgnToEmn,
    compileDealSteps: () => compileDealSteps,
    convertBinDataToEgnFile: () => convertBinDataToEgnFile,
    convertBinDataToEgnJson: () => convertBinDataToEgnJson,
    convertBinDataToEmnFile: () => convertBinDataToEmnFile,
    convertBinDataToEmnJson: () => convertBinDataToEmnJson,
    convertBinToEgnJson: () => convertBinToEgnJson,
    convertBinToEmnJson: () => convertBinToEmnJson,
    convertEgnFileToBinData: () => convertEgnFileToBinData,
    convertEgnJsonToBin: () => convertEgnJsonToBin,
    convertEgnJsonToBinData: () => convertEgnJsonToBinData,
    convertEmnFileToBinData: () => convertEmnFileToBinData,
    convertEmnJsonToBin: () => convertEmnJsonToBin,
    convertEmnJsonToBinData: () => convertEmnJsonToBinData,
    convertToBaselineEgn: () => convertToBaselineEgn,
    convertToBaselineGame: () => convertToBaselineGame,
    decodeString: () => decodeString,
    detectBinaryFormat: () => detectBinaryFormat,
    detectBinaryFormatFromData: () => detectBinaryFormatFromData,
    detectEmnBinaryFormat: () => detectEmnBinaryFormat,
    detectEmnBinaryFormatFromData: () => detectEmnBinaryFormatFromData,
    determineIsAlone: () => determineIsAlone,
    determineLeadSeat: () => determineLeadSeat,
    determineMaker: () => determineMaker,
    determineTrump: () => determineTrump,
    emn: () => emn_exports,
    emnToBinary: () => emnToBinary,
    encodeBoolean: () => encodeBoolean,
    encodeCard: () => encodeCard,
    encodeCardFromDeck: () => encodeCardFromDeck,
    encodeInteger: () => encodeInteger,
    encodeR1Call: () => encodeR1Call,
    encodeR2Call: () => encodeR2Call,
    encodeString: () => encodeString,
    extractAllEgnsFromEmn: () => extractAllEgnsFromEmn,
    extractAllGamesFromMatch: () => extractAllGamesFromMatch,
    extractEgnFromEmn: () => extractEgnFromEmn,
    extractGameFromMatch: () => extractGameFromMatch,
    getActivePlayerSeat: () => getActivePlayerSeat,
    getCardValue: () => getCardValue,
    getEffectiveSuit: () => getEffectiveSuit,
    getLeftBowerSuit: () => getLeftBowerSuit,
    getPlayerIndexInTrick: () => getPlayerIndexInTrick,
    getSitOutSeats: () => getSitOutSeats,
    getWinnerIndex: () => getWinnerIndex,
    hashBaselineEgn: () => hashBaselineEgn,
    hashBaselineGame: () => hashBaselineGame,
    hashEgn: () => hashEgn,
    hashFullEgn: () => hashFullEgn,
    hashFullGame: () => hashFullGame,
    hashGame: () => hashGame,
    inferPlayerCards: () => inferPlayerCards,
    isDeal: () => isDeal,
    isEGNFile: () => isEGNFile,
    isEgnFile: () => isEgnFile,
    isEmnFile: () => isEmnFile,
    isEmptyStructure: () => isEmptyStructure,
    isGenericMatchFile: () => isGenericMatchFile,
    isOrder: () => isOrder,
    isPass: () => isPass,
    isSupportedEmnSchemaVersion: () => isSupportedEmnSchemaVersion,
    isSupportedSchemaVersion: () => isSupportedSchemaVersion,
    packDeal: () => packDeal,
    packEgnFile: () => packEgnFile,
    packEmnFile: () => packEmnFile,
    stableStringify: () => stableStringify,
    stripPhaseNumbers: () => stripPhaseNumbers,
    unpackDeal: () => unpackDeal,
    unpackEgnFile: () => unpackEgnFile,
    unpackEmnFile: () => unpackEmnFile,
    upgradeEgn: () => upgradeEgn,
    validateDeal: () => validateDeal2,
    validateDealGameplay: () => validateDealGameplay,
    validateEGN: () => validateEGN,
    validateEgn: () => validateEgn2,
    validateEmn: () => validateEmn2,
    validateGameplay: () => validateGameplay
  });

  // src/version.ts
  var SCHEMA_VERSION = "1.6";
  var PACKAGE_VERSION = "1.6.4";
  var VERSION = SCHEMA_VERSION;
  var SUPPORTED_SCHEMA_VERSION_RE = /^1\.[23456](?:\.\d+)?$/;
  function isSupportedSchemaVersion(version) {
    return SUPPORTED_SCHEMA_VERSION_RE.test(version);
  }

  // node_modules/@noble/hashes/esm/utils.js
  function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }
  function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i].fill(0);
    }
  }
  function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
  }
  var hasHexBuiltin = /* @__PURE__ */ (() => (
    // @ts-ignore
    typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
  ))();
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(bytes) {
    abytes(bytes);
    if (hasHexBuiltin)
      return bytes.toHex();
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += hexes[bytes[i]];
    }
    return hex;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    abytes(data);
    return data;
  }
  var Hash = class {
  };
  function createHasher(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }

  // node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
  }
  function Chi(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  var HashMD = class extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView(this.buffer);
    }
    update(data) {
      aexists(this);
      data = toBytes(data);
      abytes(data);
      const { view, buffer, blockLen } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      aexists(this);
      aoutput(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      clean(this.buffer.subarray(pos));
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
      this.process(view, 0);
      const oview = createView(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length;
      to.pos = pos;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  };
  var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);

  // node_modules/@noble/hashes/esm/sha2.js
  var SHA256_K = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
  var SHA256 = class extends HashMD {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = SHA256_IV[0] | 0;
      this.B = SHA256_IV[1] | 0;
      this.C = SHA256_IV[2] | 0;
      this.D = SHA256_IV[3] | 0;
      this.E = SHA256_IV[4] | 0;
      this.F = SHA256_IV[5] | 0;
      this.G = SHA256_IV[6] | 0;
      this.H = SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W[i - 15];
        const W2 = SHA256_W[i - 2];
        const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
        const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
        SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
        const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
        const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
        const T2 = sigma0 + Maj(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      clean(SHA256_W);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      clean(this.buffer);
    }
  };
  var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

  // src/hashing.ts
  var sha2562 = (message) => bytesToHex(sha256(message));
  var DEFAULT_TGN_ANALYSIS_KEYS = /* @__PURE__ */ new Set([
    "alternativeLines",
    "alternative_lines",
    "calls_annotations",
    "callAnnotations",
    "tricks_annotations",
    "tricksAnnotations",
    "playAnnotations",
    "annotations",
    "notes",
    "tags",
    "phaseNumber",
    "phase_number"
  ]);
  function stableStringify(value) {
    if (Array.isArray(value)) {
      return `[${value.map(stableStringify).join(",")}]`;
    }
    if (value && typeof value === "object" && value !== null) {
      const entries = Object.entries(value).sort(([a], [b]) => a === b ? 0 : a < b ? -1 : 1).map(([key, child]) => `${JSON.stringify(key)}:${stableStringify(child)}`);
      return `{${entries.join(",")}}`;
    }
    return JSON.stringify(value);
  }
  function isEmptyStructure(value) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (Array.isArray(value)) {
      return value.length === 0 || value.every(isEmptyStructure);
    }
    if (typeof value === "object") {
      const values = Object.values(value);
      return values.length === 0 || values.every(isEmptyStructure);
    }
    return false;
  }
  function stripPhaseNumbers(value) {
    if (Array.isArray(value)) {
      return value.map(stripPhaseNumbers);
    }
    if (value && typeof value === "object" && value !== null) {
      const stripped = {};
      for (const [key, child] of Object.entries(value)) {
        if (key === "phaseNumber" || key === "phase_number") {
          continue;
        }
        let childToProcess = child;
        if (key === "calls" && Array.isArray(child)) {
          childToProcess = child.map((c) => c === "p" ? "Pass" : c === "o" ? "Order" : c);
        }
        const strippedChild = stripPhaseNumbers(childToProcess);
        if (strippedChild === void 0) {
          continue;
        }
        if (Array.isArray(strippedChild) && (strippedChild.length === 0 || strippedChild.every(isEmptyStructure))) {
          continue;
        }
        if (strippedChild && typeof strippedChild === "object" && strippedChild !== null && Object.keys(strippedChild).length === 0) {
          continue;
        }
        stripped[key] = strippedChild;
      }
      return stripped;
    }
    return value;
  }
  function convertToBaselineGame(value, analysisKeys = DEFAULT_TGN_ANALYSIS_KEYS) {
    const keySet = Array.isArray(analysisKeys) ? new Set(analysisKeys) : analysisKeys;
    if (Array.isArray(value)) {
      return value.map((item) => convertToBaselineGame(item, keySet));
    }
    if (value && typeof value === "object" && value !== null) {
      const stripped = {};
      for (const [key, child] of Object.entries(value)) {
        if (key === "phaseNumber" || key === "phase_number" || keySet.has(key)) {
          continue;
        }
        let childToProcess = child;
        if (key === "calls" && Array.isArray(child)) {
          childToProcess = child.map((c) => c === "p" ? "Pass" : c === "o" ? "Order" : c);
        }
        const strippedChild = convertToBaselineGame(childToProcess, keySet);
        if (strippedChild === void 0) {
          continue;
        }
        if (Array.isArray(strippedChild) && (strippedChild.length === 0 || strippedChild.every(isEmptyStructure))) {
          continue;
        }
        if (strippedChild && typeof strippedChild === "object" && strippedChild !== null && Object.keys(strippedChild).length === 0) {
          continue;
        }
        stripped[key] = strippedChild;
      }
      return stripped;
    }
    return value;
  }
  function hashGame(gameObj) {
    const stripped = stripPhaseNumbers(gameObj);
    const canonical = stableStringify(stripped);
    return sha2562(canonical);
  }
  var hashFullGame = hashGame;
  function hashBaselineGame(gameObj, converter = convertToBaselineGame) {
    const baselineObj = converter(gameObj);
    const canonical = stableStringify(baselineObj);
    return sha2562(canonical);
  }
  var hashEgn = hashGame;
  var hashFullEgn = hashFullGame;

  // src/generated/validators.ts
  var validateEgn = validate10;
  var schema11 = { "$schema": "http://json-schema.org/draft-07/schema#", "title": "Euchre Game Notation (EGN)", "description": "JSON Schema for validating Euchre Game Notation (.egn) files.", "type": "object", "additionalProperties": false, "properties": { "fileType": { "type": "string", "const": "Euchre Game Notation" }, "version": { "type": "string", "pattern": "^1\\.[23456](?:\\.\\d+)?$" }, "metadata": { "type": "object", "additionalProperties": false, "properties": { "gameId": { "type": "string", "maxLength": 64 }, "title": { "type": "string", "maxLength": 128 }, "description": { "type": "string", "maxLength": 1024 }, "players": { "type": "array", "items": { "oneOf": [{ "type": "string", "maxLength": 64 }, { "$ref": "#/definitions/player" }] }, "maxItems": 10, "description": "Array of player names, starting with Player 0 and proceeding clockwise." }, "teamNames": { "type": "array", "items": { "type": "string", "maxLength": 64 }, "minItems": 2, "maxItems": 2, "description": "Optional team names for the two partnerships. [Team 0/2 Name, Team 1/3 Name]." }, "initialScore": { "type": "array", "items": { "type": "integer" }, "maxItems": 2, "description": "Initial team scores. [Team 0/2 Score, Team 1/3 Score]." }, "finalScore": { "type": "array", "items": { "type": "integer" }, "maxItems": 2, "description": "Optional final team scores. [Team 0/2 Score, Team 1/3 Score]." }, "date": { "type": "string", "maxLength": 64, "anyOf": [{ "format": "date-time" }, { "format": "date" }, { "pattern": "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$" }], "description": "Date and time when the game was played." }, "ruleset": { "type": "object", "additionalProperties": false, "properties": { "std": { "type": "boolean", "default": true }, "min_rank": { "type": "integer", "default": 9 }, "winning_score": { "type": "integer", "minimum": 0, "default": 10, "description": "The target score to win the game. A value of 0 means there is no winning score." }, "num_deals": { "type": "integer", "minimum": 0, "default": 0, "description": "The number of deals to play. A value of 0 (or omitting the field) means there is no deal limit. If both num_deals and winning_score are non-zero, the game ends when either limit is reached." }, "canadian": { "type": "boolean", "default": false }, "loner_lead": { "type": "string", "enum": ["LEFT_OF_DEALER", "LEFT_OF_LONER"], "default": "LEFT_OF_DEALER" }, "loner_march_score": { "type": "integer", "default": 4 }, "loner_euchred_score": { "type": "integer", "default": 2 }, "defend_alone": { "type": "boolean", "default": false }, "farmers": { "type": "boolean", "default": false }, "partners_best": { "type": "boolean", "default": false }, "go_under": { "type": "boolean", "default": false }, "joker": { "type": "boolean", "default": false }, "num_players": { "type": "integer", "default": 4 }, "allow_no_trump": { "type": "boolean", "default": false }, "fast_break": { "type": "boolean", "default": false }, "four_trick_tokens": { "type": "boolean", "default": false } }, "allOf": [{ "not": { "required": ["winning_score", "num_deals"] } }, { "anyOf": [{ "not": { "properties": { "winning_score": { "const": 0 } }, "required": ["winning_score"] } }, { "properties": { "num_deals": { "type": "integer", "minimum": 1 } }, "required": ["num_deals"] }] }] } }, "required": ["players", "initialScore"] }, "deals": { "type": "array", "maxItems": 100, "items": { "oneOf": [{ "type": "object", "additionalProperties": false, "properties": { "dealNumber": { "type": "integer", "minimum": 0 }, "initialState": { "type": "object", "additionalProperties": false, "properties": { "dealer": { "type": "integer", "minimum": 0, "maximum": 9 }, "upCard": { "$ref": "#/definitions/card" }, "playerCards": { "type": "array", "maxItems": 10, "items": { "$ref": "#/definitions/cardList" } } }, "required": ["dealer", "upCard"] }, "phases": { "type": "array", "minItems": 0, "maxItems": 2, "items": { "oneOf": [{ "$ref": "#/definitions/biddingPhase" }, { "$ref": "#/definitions/trickPlayPhase" }] } }, "alternativeLines": { "type": "array", "maxItems": 50, "items": { "$ref": "#/definitions/alternativeLine" }, "description": "Analysis-only content that should be stripped for baseline hashing." } }, "required": ["dealNumber", "initialState", "phases"] }, { "type": "string", "pattern": "^[A-Za-z0-9+/_-]*={0,2}$" }] } } }, "required": ["fileType", "version", "metadata", "deals"], "definitions": { "card": { "type": "string", "pattern": "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, "cardList": { "type": "array", "maxItems": 10, "items": { "$ref": "#/definitions/card" } }, "biddingPhase": { "type": "object", "additionalProperties": false, "required": ["type", "calls"], "properties": { "phaseNumber": { "type": "integer" }, "type": { "const": "EUCHRE_BIDDING" }, "calls": { "type": "array", "maxItems": 16, "items": { "type": "string", "enum": ["Pass", "Order", "p", "o", "s", "h", "d", "c", "n", "x"] } }, "isAlone": { "type": "boolean", "default": false }, "aloneDefender": { "type": "integer", "description": "Seat index of the player defending alone against a loner, or -1 if no one is defending alone. Only relevant when the ruleset has defend_alone: true and isAlone is true." }, "discard": { "$ref": "#/definitions/card" }, "cardExchanges": { "type": "array", "maxItems": 4, "items": { "type": "object", "additionalProperties": false, "properties": { "sender": { "type": "integer", "minimum": 0, "maximum": 9 }, "receiver": { "type": "integer", "minimum": 0, "maximum": 9 }, "cards": { "$ref": "#/definitions/cardList" } }, "required": ["receiver", "cards"] } }, "callAnnotations": { "$ref": "#/definitions/annotations", "description": "Analysis-only content that should be stripped for baseline hashing." } } }, "trickPlayPhase": { "type": "object", "additionalProperties": false, "required": ["type", "tricks"], "properties": { "phaseNumber": { "type": "integer" }, "type": { "const": "TRICK_PLAY" }, "tricks": { "type": "array", "maxItems": 10, "items": { "$ref": "#/definitions/cardList" } }, "isAlone": { "type": "boolean", "default": false }, "playAnnotations": { "$ref": "#/definitions/annotations", "description": "Analysis-only content that should be stripped for baseline hashing." } } }, "alternativeLine": { "type": "object", "additionalProperties": false, "required": ["branchIndex", "phases"], "properties": { "branchIndex": { "type": "integer", "minimum": 0 }, "phases": { "type": "array", "minItems": 1, "items": { "oneOf": [{ "$ref": "#/definitions/biddingPhase" }, { "$ref": "#/definitions/trickPlayPhase" }] } } } }, "annotations": { "type": "object", "additionalProperties": { "type": "array", "maxItems": 50, "items": { "type": "string", "maxLength": 1024 } }, "propertyNames": { "pattern": "^[0-9]+$" } }, "player": { "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "maxLength": 64 }, "name": { "type": "string", "maxLength": 64 }, "playerIds": { "type": "array", "minItems": 0, "maxItems": 10, "items": { "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "maxLength": 64 }, "source": { "type": "string", "maxLength": 64 } }, "required": ["id", "source"] } } }, "required": ["name"] } } };
  var pattern0 = new RegExp("^1\\.[23456](?:\\.\\d+)?$", "u");
  var pattern1 = new RegExp("^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$", "u");
  var pattern2 = new RegExp("^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$", "u");
  var pattern7 = new RegExp("^[A-Za-z0-9+/_-]*={0,2}$", "u");
  var func2 = Object.prototype.hasOwnProperty;
  var func3 = require_ucs2length().default;
  var formats0 = require_formats().fullFormats["date-time"];
  var formats2 = require_formats().fullFormats.date;
  function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (Array.isArray(data)) {
        if (data.length > 10) {
          validate11.errors = [{ instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
          return false;
        } else {
          var valid0 = true;
          const len0 = data.length;
          for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (!pattern2.test(data0)) {
                  validate11.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                  return false;
                }
              } else {
                validate11.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
              break;
            }
          }
        }
      } else {
        validate11.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
      }
    }
    validate11.errors = vErrors;
    return errors === 0;
  }
  var schema16 = { "type": "object", "additionalProperties": false, "required": ["type", "calls"], "properties": { "phaseNumber": { "type": "integer" }, "type": { "const": "EUCHRE_BIDDING" }, "calls": { "type": "array", "maxItems": 16, "items": { "type": "string", "enum": ["Pass", "Order", "p", "o", "s", "h", "d", "c", "n", "x"] } }, "isAlone": { "type": "boolean", "default": false }, "aloneDefender": { "type": "integer", "description": "Seat index of the player defending alone against a loner, or -1 if no one is defending alone. Only relevant when the ruleset has defend_alone: true and isAlone is true." }, "discard": { "$ref": "#/definitions/card" }, "cardExchanges": { "type": "array", "maxItems": 4, "items": { "type": "object", "additionalProperties": false, "properties": { "sender": { "type": "integer", "minimum": 0, "maximum": 9 }, "receiver": { "type": "integer", "minimum": 0, "maximum": 9 }, "cards": { "$ref": "#/definitions/cardList" } }, "required": ["receiver", "cards"] } }, "callAnnotations": { "$ref": "#/definitions/annotations", "description": "Analysis-only content that should be stripped for baseline hashing." } } };
  var pattern5 = new RegExp("^[0-9]+$", "u");
  function validate13(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.type === void 0 && (missing0 = "type") || data.calls === void 0 && (missing0 = "calls")) {
          validate13.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "phaseNumber" || key0 === "type" || key0 === "calls" || key0 === "isAlone" || key0 === "aloneDefender" || key0 === "discard" || key0 === "cardExchanges" || key0 === "callAnnotations")) {
              validate13.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.phaseNumber !== void 0) {
              let data0 = data.phaseNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate13.errors = [{ instancePath: instancePath + "/phaseNumber", schemaPath: "#/properties/phaseNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.type !== void 0) {
                const _errs4 = errors;
                if ("EUCHRE_BIDDING" !== data.type) {
                  validate13.errors = [{ instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "EUCHRE_BIDDING" }, message: "must be equal to constant" }];
                  return false;
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.calls !== void 0) {
                  let data2 = data.calls;
                  const _errs5 = errors;
                  if (errors === _errs5) {
                    if (Array.isArray(data2)) {
                      if (data2.length > 16) {
                        validate13.errors = [{ instancePath: instancePath + "/calls", schemaPath: "#/properties/calls/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data2.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          let data3 = data2[i0];
                          const _errs7 = errors;
                          if (typeof data3 !== "string") {
                            validate13.errors = [{ instancePath: instancePath + "/calls/" + i0, schemaPath: "#/properties/calls/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                          if (!(data3 === "Pass" || data3 === "Order" || data3 === "p" || data3 === "o" || data3 === "s" || data3 === "h" || data3 === "d" || data3 === "c" || data3 === "n" || data3 === "x")) {
                            validate13.errors = [{ instancePath: instancePath + "/calls/" + i0, schemaPath: "#/properties/calls/items/enum", keyword: "enum", params: { allowedValues: schema16.properties.calls.items.enum }, message: "must be equal to one of the allowed values" }];
                            return false;
                          }
                          var valid1 = _errs7 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate13.errors = [{ instancePath: instancePath + "/calls", schemaPath: "#/properties/calls/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.isAlone !== void 0) {
                    const _errs9 = errors;
                    if (typeof data.isAlone !== "boolean") {
                      validate13.errors = [{ instancePath: instancePath + "/isAlone", schemaPath: "#/properties/isAlone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                      return false;
                    }
                    var valid0 = _errs9 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.aloneDefender !== void 0) {
                      let data5 = data.aloneDefender;
                      const _errs11 = errors;
                      if (!(typeof data5 == "number" && (!(data5 % 1) && !isNaN(data5)) && isFinite(data5))) {
                        validate13.errors = [{ instancePath: instancePath + "/aloneDefender", schemaPath: "#/properties/aloneDefender/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                        return false;
                      }
                      var valid0 = _errs11 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.discard !== void 0) {
                        let data6 = data.discard;
                        const _errs13 = errors;
                        const _errs14 = errors;
                        if (errors === _errs14) {
                          if (typeof data6 === "string") {
                            if (!pattern2.test(data6)) {
                              validate13.errors = [{ instancePath: instancePath + "/discard", schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                              return false;
                            }
                          } else {
                            validate13.errors = [{ instancePath: instancePath + "/discard", schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid0 = _errs13 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.cardExchanges !== void 0) {
                          let data7 = data.cardExchanges;
                          const _errs16 = errors;
                          if (errors === _errs16) {
                            if (Array.isArray(data7)) {
                              if (data7.length > 4) {
                                validate13.errors = [{ instancePath: instancePath + "/cardExchanges", schemaPath: "#/properties/cardExchanges/maxItems", keyword: "maxItems", params: { limit: 4 }, message: "must NOT have more than 4 items" }];
                                return false;
                              } else {
                                var valid3 = true;
                                const len1 = data7.length;
                                for (let i1 = 0; i1 < len1; i1++) {
                                  let data8 = data7[i1];
                                  const _errs18 = errors;
                                  if (errors === _errs18) {
                                    if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                                      let missing1;
                                      if (data8.receiver === void 0 && (missing1 = "receiver") || data8.cards === void 0 && (missing1 = "cards")) {
                                        validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                        return false;
                                      } else {
                                        const _errs20 = errors;
                                        for (const key1 in data8) {
                                          if (!(key1 === "sender" || key1 === "receiver" || key1 === "cards")) {
                                            validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                            return false;
                                            break;
                                          }
                                        }
                                        if (_errs20 === errors) {
                                          if (data8.sender !== void 0) {
                                            let data9 = data8.sender;
                                            const _errs21 = errors;
                                            if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
                                              validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                              return false;
                                            }
                                            if (errors === _errs21) {
                                              if (typeof data9 == "number" && isFinite(data9)) {
                                                if (data9 > 9 || isNaN(data9)) {
                                                  validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                                  return false;
                                                } else {
                                                  if (data9 < 0 || isNaN(data9)) {
                                                    validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                    return false;
                                                  }
                                                }
                                              }
                                            }
                                            var valid4 = _errs21 === errors;
                                          } else {
                                            var valid4 = true;
                                          }
                                          if (valid4) {
                                            if (data8.receiver !== void 0) {
                                              let data10 = data8.receiver;
                                              const _errs23 = errors;
                                              if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10))) {
                                                validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                return false;
                                              }
                                              if (errors === _errs23) {
                                                if (typeof data10 == "number" && isFinite(data10)) {
                                                  if (data10 > 9 || isNaN(data10)) {
                                                    validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                                    return false;
                                                  } else {
                                                    if (data10 < 0 || isNaN(data10)) {
                                                      validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                      return false;
                                                    }
                                                  }
                                                }
                                              }
                                              var valid4 = _errs23 === errors;
                                            } else {
                                              var valid4 = true;
                                            }
                                            if (valid4) {
                                              if (data8.cards !== void 0) {
                                                const _errs25 = errors;
                                                if (!validate11(data8.cards, { instancePath: instancePath + "/cardExchanges/" + i1 + "/cards", parentData: data8, parentDataProperty: "cards", rootData })) {
                                                  vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
                                                  errors = vErrors.length;
                                                }
                                                var valid4 = _errs25 === errors;
                                              } else {
                                                var valid4 = true;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    } else {
                                      validate13.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                      return false;
                                    }
                                  }
                                  var valid3 = _errs18 === errors;
                                  if (!valid3) {
                                    break;
                                  }
                                }
                              }
                            } else {
                              validate13.errors = [{ instancePath: instancePath + "/cardExchanges", schemaPath: "#/properties/cardExchanges/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                              return false;
                            }
                          }
                          var valid0 = _errs16 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.callAnnotations !== void 0) {
                            let data12 = data.callAnnotations;
                            const _errs26 = errors;
                            const _errs27 = errors;
                            if (errors === _errs27) {
                              if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
                                for (const key2 in data12) {
                                  const _errs29 = errors;
                                  if (typeof key2 === "string") {
                                    if (!pattern5.test(key2)) {
                                      const err0 = { instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[0-9]+$" }, message: 'must match pattern "^[0-9]+$"', propertyName: key2 };
                                      if (vErrors === null) {
                                        vErrors = [err0];
                                      } else {
                                        vErrors.push(err0);
                                      }
                                      errors++;
                                    }
                                  }
                                  var valid6 = _errs29 === errors;
                                  if (!valid6) {
                                    const err1 = { instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/propertyNames", keyword: "propertyNames", params: { propertyName: key2 }, message: "property name must be valid" };
                                    if (vErrors === null) {
                                      vErrors = [err1];
                                    } else {
                                      vErrors.push(err1);
                                    }
                                    errors++;
                                    validate13.errors = vErrors;
                                    return false;
                                    break;
                                  }
                                }
                                if (valid6) {
                                  for (const key3 in data12) {
                                    let data13 = data12[key3];
                                    const _errs31 = errors;
                                    if (errors === _errs31) {
                                      if (Array.isArray(data13)) {
                                        if (data13.length > 50) {
                                          validate13.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                                          return false;
                                        } else {
                                          var valid8 = true;
                                          const len2 = data13.length;
                                          for (let i2 = 0; i2 < len2; i2++) {
                                            let data14 = data13[i2];
                                            const _errs33 = errors;
                                            if (errors === _errs33) {
                                              if (typeof data14 === "string") {
                                                if (func3(data14) > 1024) {
                                                  validate13.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i2, schemaPath: "#/definitions/annotations/additionalProperties/items/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate13.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i2, schemaPath: "#/definitions/annotations/additionalProperties/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid8 = _errs33 === errors;
                                            if (!valid8) {
                                              break;
                                            }
                                          }
                                        }
                                      } else {
                                        validate13.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid7 = _errs31 === errors;
                                    if (!valid7) {
                                      break;
                                    }
                                  }
                                }
                              } else {
                                validate13.errors = [{ instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                              }
                            }
                            var valid0 = _errs26 === errors;
                          } else {
                            var valid0 = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate13.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate13.errors = vErrors;
    return errors === 0;
  }
  function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.type === void 0 && (missing0 = "type") || data.tricks === void 0 && (missing0 = "tricks")) {
          validate16.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "phaseNumber" || key0 === "type" || key0 === "tricks" || key0 === "isAlone" || key0 === "playAnnotations")) {
              validate16.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.phaseNumber !== void 0) {
              let data0 = data.phaseNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate16.errors = [{ instancePath: instancePath + "/phaseNumber", schemaPath: "#/properties/phaseNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.type !== void 0) {
                const _errs4 = errors;
                if ("TRICK_PLAY" !== data.type) {
                  validate16.errors = [{ instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "TRICK_PLAY" }, message: "must be equal to constant" }];
                  return false;
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.tricks !== void 0) {
                  let data2 = data.tricks;
                  const _errs5 = errors;
                  if (errors === _errs5) {
                    if (Array.isArray(data2)) {
                      if (data2.length > 10) {
                        validate16.errors = [{ instancePath: instancePath + "/tricks", schemaPath: "#/properties/tricks/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data2.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          const _errs7 = errors;
                          if (!validate11(data2[i0], { instancePath: instancePath + "/tricks/" + i0, parentData: data2, parentDataProperty: i0, rootData })) {
                            vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
                            errors = vErrors.length;
                          }
                          var valid1 = _errs7 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate16.errors = [{ instancePath: instancePath + "/tricks", schemaPath: "#/properties/tricks/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.isAlone !== void 0) {
                    const _errs8 = errors;
                    if (typeof data.isAlone !== "boolean") {
                      validate16.errors = [{ instancePath: instancePath + "/isAlone", schemaPath: "#/properties/isAlone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                      return false;
                    }
                    var valid0 = _errs8 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.playAnnotations !== void 0) {
                      let data5 = data.playAnnotations;
                      const _errs10 = errors;
                      const _errs11 = errors;
                      if (errors === _errs11) {
                        if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                          for (const key1 in data5) {
                            const _errs13 = errors;
                            if (typeof key1 === "string") {
                              if (!pattern5.test(key1)) {
                                const err0 = { instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[0-9]+$" }, message: 'must match pattern "^[0-9]+$"', propertyName: key1 };
                                if (vErrors === null) {
                                  vErrors = [err0];
                                } else {
                                  vErrors.push(err0);
                                }
                                errors++;
                              }
                            }
                            var valid3 = _errs13 === errors;
                            if (!valid3) {
                              const err1 = { instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/propertyNames", keyword: "propertyNames", params: { propertyName: key1 }, message: "property name must be valid" };
                              if (vErrors === null) {
                                vErrors = [err1];
                              } else {
                                vErrors.push(err1);
                              }
                              errors++;
                              validate16.errors = vErrors;
                              return false;
                              break;
                            }
                          }
                          if (valid3) {
                            for (const key2 in data5) {
                              let data6 = data5[key2];
                              const _errs15 = errors;
                              if (errors === _errs15) {
                                if (Array.isArray(data6)) {
                                  if (data6.length > 50) {
                                    validate16.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                                    return false;
                                  } else {
                                    var valid5 = true;
                                    const len1 = data6.length;
                                    for (let i1 = 0; i1 < len1; i1++) {
                                      let data7 = data6[i1];
                                      const _errs17 = errors;
                                      if (errors === _errs17) {
                                        if (typeof data7 === "string") {
                                          if (func3(data7) > 1024) {
                                            validate16.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i1, schemaPath: "#/definitions/annotations/additionalProperties/items/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                            return false;
                                          }
                                        } else {
                                          validate16.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i1, schemaPath: "#/definitions/annotations/additionalProperties/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid5 = _errs17 === errors;
                                      if (!valid5) {
                                        break;
                                      }
                                    }
                                  }
                                } else {
                                  validate16.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                  return false;
                                }
                              }
                              var valid4 = _errs15 === errors;
                              if (!valid4) {
                                break;
                              }
                            }
                          }
                        } else {
                          validate16.errors = [{ instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                          return false;
                        }
                      }
                      var valid0 = _errs10 === errors;
                    } else {
                      var valid0 = true;
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate16.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate16.errors = vErrors;
    return errors === 0;
  }
  function validate19(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.branchIndex === void 0 && (missing0 = "branchIndex") || data.phases === void 0 && (missing0 = "phases")) {
          validate19.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "branchIndex" || key0 === "phases")) {
              validate19.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.branchIndex !== void 0) {
              let data0 = data.branchIndex;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate19.errors = [{ instancePath: instancePath + "/branchIndex", schemaPath: "#/properties/branchIndex/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              if (errors === _errs2) {
                if (typeof data0 == "number" && isFinite(data0)) {
                  if (data0 < 0 || isNaN(data0)) {
                    validate19.errors = [{ instancePath: instancePath + "/branchIndex", schemaPath: "#/properties/branchIndex/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                    return false;
                  }
                }
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.phases !== void 0) {
                let data1 = data.phases;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (Array.isArray(data1)) {
                    if (data1.length < 1) {
                      validate19.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                      return false;
                    } else {
                      var valid1 = true;
                      const len0 = data1.length;
                      for (let i0 = 0; i0 < len0; i0++) {
                        let data2 = data1[i0];
                        const _errs6 = errors;
                        const _errs7 = errors;
                        let valid2 = false;
                        let passing0 = null;
                        const _errs8 = errors;
                        if (!validate13(data2, { instancePath: instancePath + "/phases/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                          vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);
                          errors = vErrors.length;
                        }
                        var _valid0 = _errs8 === errors;
                        if (_valid0) {
                          valid2 = true;
                          passing0 = 0;
                        }
                        const _errs9 = errors;
                        if (!validate16(data2, { instancePath: instancePath + "/phases/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                          vErrors = vErrors === null ? validate16.errors : vErrors.concat(validate16.errors);
                          errors = vErrors.length;
                        }
                        var _valid0 = _errs9 === errors;
                        if (_valid0 && valid2) {
                          valid2 = false;
                          passing0 = [passing0, 1];
                        } else {
                          if (_valid0) {
                            valid2 = true;
                            passing0 = 1;
                          }
                        }
                        if (!valid2) {
                          const err0 = { instancePath: instancePath + "/phases/" + i0, schemaPath: "#/properties/phases/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                          if (vErrors === null) {
                            vErrors = [err0];
                          } else {
                            vErrors.push(err0);
                          }
                          errors++;
                          validate19.errors = vErrors;
                          return false;
                        } else {
                          errors = _errs7;
                          if (vErrors !== null) {
                            if (_errs7) {
                              vErrors.length = _errs7;
                            } else {
                              vErrors = null;
                            }
                          }
                        }
                        var valid1 = _errs6 === errors;
                        if (!valid1) {
                          break;
                        }
                      }
                    }
                  } else {
                    validate19.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      } else {
        validate19.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate19.errors = vErrors;
    return errors === 0;
  }
  function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.fileType === void 0 && (missing0 = "fileType") || data.version === void 0 && (missing0 = "version") || data.metadata === void 0 && (missing0 = "metadata") || data.deals === void 0 && (missing0 = "deals")) {
          validate10.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "fileType" || key0 === "version" || key0 === "metadata" || key0 === "deals")) {
              validate10.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.fileType !== void 0) {
              let data0 = data.fileType;
              const _errs2 = errors;
              if (typeof data0 !== "string") {
                validate10.errors = [{ instancePath: instancePath + "/fileType", schemaPath: "#/properties/fileType/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
              if ("Euchre Game Notation" !== data0) {
                validate10.errors = [{ instancePath: instancePath + "/fileType", schemaPath: "#/properties/fileType/const", keyword: "const", params: { allowedValue: "Euchre Game Notation" }, message: "must be equal to constant" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.version !== void 0) {
                let data1 = data.version;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (typeof data1 === "string") {
                    if (!pattern0.test(data1)) {
                      validate10.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/pattern", keyword: "pattern", params: { pattern: "^1\\.[23456](?:\\.\\d+)?$" }, message: 'must match pattern "^1\\.[23456](?:\\.\\d+)?$"' }];
                      return false;
                    }
                  } else {
                    validate10.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.metadata !== void 0) {
                  let data2 = data.metadata;
                  const _errs6 = errors;
                  if (errors === _errs6) {
                    if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                      let missing1;
                      if (data2.players === void 0 && (missing1 = "players") || data2.initialScore === void 0 && (missing1 = "initialScore")) {
                        validate10.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                        return false;
                      } else {
                        const _errs8 = errors;
                        for (const key1 in data2) {
                          if (!func2.call(schema11.properties.metadata.properties, key1)) {
                            validate10.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                            return false;
                            break;
                          }
                        }
                        if (_errs8 === errors) {
                          if (data2.gameId !== void 0) {
                            let data3 = data2.gameId;
                            const _errs9 = errors;
                            if (errors === _errs9) {
                              if (typeof data3 === "string") {
                                if (func3(data3) > 64) {
                                  validate10.errors = [{ instancePath: instancePath + "/metadata/gameId", schemaPath: "#/properties/metadata/properties/gameId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                  return false;
                                }
                              } else {
                                validate10.errors = [{ instancePath: instancePath + "/metadata/gameId", schemaPath: "#/properties/metadata/properties/gameId/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid1 = _errs9 === errors;
                          } else {
                            var valid1 = true;
                          }
                          if (valid1) {
                            if (data2.title !== void 0) {
                              let data4 = data2.title;
                              const _errs11 = errors;
                              if (errors === _errs11) {
                                if (typeof data4 === "string") {
                                  if (func3(data4) > 128) {
                                    validate10.errors = [{ instancePath: instancePath + "/metadata/title", schemaPath: "#/properties/metadata/properties/title/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                                    return false;
                                  }
                                } else {
                                  validate10.errors = [{ instancePath: instancePath + "/metadata/title", schemaPath: "#/properties/metadata/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                              var valid1 = _errs11 === errors;
                            } else {
                              var valid1 = true;
                            }
                            if (valid1) {
                              if (data2.description !== void 0) {
                                let data5 = data2.description;
                                const _errs13 = errors;
                                if (errors === _errs13) {
                                  if (typeof data5 === "string") {
                                    if (func3(data5) > 1024) {
                                      validate10.errors = [{ instancePath: instancePath + "/metadata/description", schemaPath: "#/properties/metadata/properties/description/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                      return false;
                                    }
                                  } else {
                                    validate10.errors = [{ instancePath: instancePath + "/metadata/description", schemaPath: "#/properties/metadata/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                  }
                                }
                                var valid1 = _errs13 === errors;
                              } else {
                                var valid1 = true;
                              }
                              if (valid1) {
                                if (data2.players !== void 0) {
                                  let data6 = data2.players;
                                  const _errs15 = errors;
                                  if (errors === _errs15) {
                                    if (Array.isArray(data6)) {
                                      if (data6.length > 10) {
                                        validate10.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                                        return false;
                                      } else {
                                        var valid2 = true;
                                        const len0 = data6.length;
                                        for (let i0 = 0; i0 < len0; i0++) {
                                          let data7 = data6[i0];
                                          const _errs17 = errors;
                                          const _errs18 = errors;
                                          let valid3 = false;
                                          let passing0 = null;
                                          const _errs19 = errors;
                                          if (errors === _errs19) {
                                            if (typeof data7 === "string") {
                                              if (func3(data7) > 64) {
                                                const err0 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/properties/metadata/properties/players/items/oneOf/0/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                if (vErrors === null) {
                                                  vErrors = [err0];
                                                } else {
                                                  vErrors.push(err0);
                                                }
                                                errors++;
                                              }
                                            } else {
                                              const err1 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/properties/metadata/properties/players/items/oneOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                              if (vErrors === null) {
                                                vErrors = [err1];
                                              } else {
                                                vErrors.push(err1);
                                              }
                                              errors++;
                                            }
                                          }
                                          var _valid0 = _errs19 === errors;
                                          if (_valid0) {
                                            valid3 = true;
                                            passing0 = 0;
                                          }
                                          const _errs21 = errors;
                                          const _errs22 = errors;
                                          if (errors === _errs22) {
                                            if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
                                              let missing2;
                                              if (data7.name === void 0 && (missing2 = "name")) {
                                                const err2 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/definitions/player/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" };
                                                if (vErrors === null) {
                                                  vErrors = [err2];
                                                } else {
                                                  vErrors.push(err2);
                                                }
                                                errors++;
                                              } else {
                                                const _errs24 = errors;
                                                for (const key2 in data7) {
                                                  if (!(key2 === "id" || key2 === "name" || key2 === "playerIds")) {
                                                    const err3 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/definitions/player/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                                                    if (vErrors === null) {
                                                      vErrors = [err3];
                                                    } else {
                                                      vErrors.push(err3);
                                                    }
                                                    errors++;
                                                    break;
                                                  }
                                                }
                                                if (_errs24 === errors) {
                                                  if (data7.id !== void 0) {
                                                    let data8 = data7.id;
                                                    const _errs25 = errors;
                                                    if (errors === _errs25) {
                                                      if (typeof data8 === "string") {
                                                        if (func3(data8) > 64) {
                                                          const err4 = { instancePath: instancePath + "/metadata/players/" + i0 + "/id", schemaPath: "#/definitions/player/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                          if (vErrors === null) {
                                                            vErrors = [err4];
                                                          } else {
                                                            vErrors.push(err4);
                                                          }
                                                          errors++;
                                                        }
                                                      } else {
                                                        const err5 = { instancePath: instancePath + "/metadata/players/" + i0 + "/id", schemaPath: "#/definitions/player/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                        if (vErrors === null) {
                                                          vErrors = [err5];
                                                        } else {
                                                          vErrors.push(err5);
                                                        }
                                                        errors++;
                                                      }
                                                    }
                                                    var valid5 = _errs25 === errors;
                                                  } else {
                                                    var valid5 = true;
                                                  }
                                                  if (valid5) {
                                                    if (data7.name !== void 0) {
                                                      let data9 = data7.name;
                                                      const _errs27 = errors;
                                                      if (errors === _errs27) {
                                                        if (typeof data9 === "string") {
                                                          if (func3(data9) > 64) {
                                                            const err6 = { instancePath: instancePath + "/metadata/players/" + i0 + "/name", schemaPath: "#/definitions/player/properties/name/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                            if (vErrors === null) {
                                                              vErrors = [err6];
                                                            } else {
                                                              vErrors.push(err6);
                                                            }
                                                            errors++;
                                                          }
                                                        } else {
                                                          const err7 = { instancePath: instancePath + "/metadata/players/" + i0 + "/name", schemaPath: "#/definitions/player/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                          if (vErrors === null) {
                                                            vErrors = [err7];
                                                          } else {
                                                            vErrors.push(err7);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var valid5 = _errs27 === errors;
                                                    } else {
                                                      var valid5 = true;
                                                    }
                                                    if (valid5) {
                                                      if (data7.playerIds !== void 0) {
                                                        let data10 = data7.playerIds;
                                                        const _errs29 = errors;
                                                        if (errors === _errs29) {
                                                          if (Array.isArray(data10)) {
                                                            if (data10.length > 10) {
                                                              const err8 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds", schemaPath: "#/definitions/player/properties/playerIds/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" };
                                                              if (vErrors === null) {
                                                                vErrors = [err8];
                                                              } else {
                                                                vErrors.push(err8);
                                                              }
                                                              errors++;
                                                            } else {
                                                              if (data10.length < 0) {
                                                                const err9 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds", schemaPath: "#/definitions/player/properties/playerIds/minItems", keyword: "minItems", params: { limit: 0 }, message: "must NOT have fewer than 0 items" };
                                                                if (vErrors === null) {
                                                                  vErrors = [err9];
                                                                } else {
                                                                  vErrors.push(err9);
                                                                }
                                                                errors++;
                                                              } else {
                                                                var valid6 = true;
                                                                const len1 = data10.length;
                                                                for (let i1 = 0; i1 < len1; i1++) {
                                                                  let data11 = data10[i1];
                                                                  const _errs31 = errors;
                                                                  if (errors === _errs31) {
                                                                    if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                                                                      let missing3;
                                                                      if (data11.id === void 0 && (missing3 = "id") || data11.source === void 0 && (missing3 = "source")) {
                                                                        const err10 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1, schemaPath: "#/definitions/player/properties/playerIds/items/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" };
                                                                        if (vErrors === null) {
                                                                          vErrors = [err10];
                                                                        } else {
                                                                          vErrors.push(err10);
                                                                        }
                                                                        errors++;
                                                                      } else {
                                                                        const _errs33 = errors;
                                                                        for (const key3 in data11) {
                                                                          if (!(key3 === "id" || key3 === "source")) {
                                                                            const err11 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1, schemaPath: "#/definitions/player/properties/playerIds/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                                                                            if (vErrors === null) {
                                                                              vErrors = [err11];
                                                                            } else {
                                                                              vErrors.push(err11);
                                                                            }
                                                                            errors++;
                                                                            break;
                                                                          }
                                                                        }
                                                                        if (_errs33 === errors) {
                                                                          if (data11.id !== void 0) {
                                                                            let data12 = data11.id;
                                                                            const _errs34 = errors;
                                                                            if (errors === _errs34) {
                                                                              if (typeof data12 === "string") {
                                                                                if (func3(data12) > 64) {
                                                                                  const err12 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/id", schemaPath: "#/definitions/player/properties/playerIds/items/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                                                  if (vErrors === null) {
                                                                                    vErrors = [err12];
                                                                                  } else {
                                                                                    vErrors.push(err12);
                                                                                  }
                                                                                  errors++;
                                                                                }
                                                                              } else {
                                                                                const err13 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/id", schemaPath: "#/definitions/player/properties/playerIds/items/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                                if (vErrors === null) {
                                                                                  vErrors = [err13];
                                                                                } else {
                                                                                  vErrors.push(err13);
                                                                                }
                                                                                errors++;
                                                                              }
                                                                            }
                                                                            var valid7 = _errs34 === errors;
                                                                          } else {
                                                                            var valid7 = true;
                                                                          }
                                                                          if (valid7) {
                                                                            if (data11.source !== void 0) {
                                                                              let data13 = data11.source;
                                                                              const _errs36 = errors;
                                                                              if (errors === _errs36) {
                                                                                if (typeof data13 === "string") {
                                                                                  if (func3(data13) > 64) {
                                                                                    const err14 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/source", schemaPath: "#/definitions/player/properties/playerIds/items/properties/source/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                                                    if (vErrors === null) {
                                                                                      vErrors = [err14];
                                                                                    } else {
                                                                                      vErrors.push(err14);
                                                                                    }
                                                                                    errors++;
                                                                                  }
                                                                                } else {
                                                                                  const err15 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/source", schemaPath: "#/definitions/player/properties/playerIds/items/properties/source/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                                  if (vErrors === null) {
                                                                                    vErrors = [err15];
                                                                                  } else {
                                                                                    vErrors.push(err15);
                                                                                  }
                                                                                  errors++;
                                                                                }
                                                                              }
                                                                              var valid7 = _errs36 === errors;
                                                                            } else {
                                                                              var valid7 = true;
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    } else {
                                                                      const err16 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1, schemaPath: "#/definitions/player/properties/playerIds/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                                                      if (vErrors === null) {
                                                                        vErrors = [err16];
                                                                      } else {
                                                                        vErrors.push(err16);
                                                                      }
                                                                      errors++;
                                                                    }
                                                                  }
                                                                  var valid6 = _errs31 === errors;
                                                                  if (!valid6) {
                                                                    break;
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          } else {
                                                            const err17 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds", schemaPath: "#/definitions/player/properties/playerIds/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                            if (vErrors === null) {
                                                              vErrors = [err17];
                                                            } else {
                                                              vErrors.push(err17);
                                                            }
                                                            errors++;
                                                          }
                                                        }
                                                        var valid5 = _errs29 === errors;
                                                      } else {
                                                        var valid5 = true;
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            } else {
                                              const err18 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/definitions/player/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                              if (vErrors === null) {
                                                vErrors = [err18];
                                              } else {
                                                vErrors.push(err18);
                                              }
                                              errors++;
                                            }
                                          }
                                          var _valid0 = _errs21 === errors;
                                          if (_valid0 && valid3) {
                                            valid3 = false;
                                            passing0 = [passing0, 1];
                                          } else {
                                            if (_valid0) {
                                              valid3 = true;
                                              passing0 = 1;
                                            }
                                          }
                                          if (!valid3) {
                                            const err19 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/properties/metadata/properties/players/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                                            if (vErrors === null) {
                                              vErrors = [err19];
                                            } else {
                                              vErrors.push(err19);
                                            }
                                            errors++;
                                            validate10.errors = vErrors;
                                            return false;
                                          } else {
                                            errors = _errs18;
                                            if (vErrors !== null) {
                                              if (_errs18) {
                                                vErrors.length = _errs18;
                                              } else {
                                                vErrors = null;
                                              }
                                            }
                                          }
                                          var valid2 = _errs17 === errors;
                                          if (!valid2) {
                                            break;
                                          }
                                        }
                                      }
                                    } else {
                                      validate10.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                      return false;
                                    }
                                  }
                                  var valid1 = _errs15 === errors;
                                } else {
                                  var valid1 = true;
                                }
                                if (valid1) {
                                  if (data2.teamNames !== void 0) {
                                    let data14 = data2.teamNames;
                                    const _errs38 = errors;
                                    if (errors === _errs38) {
                                      if (Array.isArray(data14)) {
                                        if (data14.length > 2) {
                                          validate10.errors = [{ instancePath: instancePath + "/metadata/teamNames", schemaPath: "#/properties/metadata/properties/teamNames/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                          return false;
                                        } else {
                                          if (data14.length < 2) {
                                            validate10.errors = [{ instancePath: instancePath + "/metadata/teamNames", schemaPath: "#/properties/metadata/properties/teamNames/minItems", keyword: "minItems", params: { limit: 2 }, message: "must NOT have fewer than 2 items" }];
                                            return false;
                                          } else {
                                            var valid8 = true;
                                            const len2 = data14.length;
                                            for (let i2 = 0; i2 < len2; i2++) {
                                              let data15 = data14[i2];
                                              const _errs40 = errors;
                                              if (errors === _errs40) {
                                                if (typeof data15 === "string") {
                                                  if (func3(data15) > 64) {
                                                    validate10.errors = [{ instancePath: instancePath + "/metadata/teamNames/" + i2, schemaPath: "#/properties/metadata/properties/teamNames/items/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                    return false;
                                                  }
                                                } else {
                                                  validate10.errors = [{ instancePath: instancePath + "/metadata/teamNames/" + i2, schemaPath: "#/properties/metadata/properties/teamNames/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                              }
                                              var valid8 = _errs40 === errors;
                                              if (!valid8) {
                                                break;
                                              }
                                            }
                                          }
                                        }
                                      } else {
                                        validate10.errors = [{ instancePath: instancePath + "/metadata/teamNames", schemaPath: "#/properties/metadata/properties/teamNames/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid1 = _errs38 === errors;
                                  } else {
                                    var valid1 = true;
                                  }
                                  if (valid1) {
                                    if (data2.initialScore !== void 0) {
                                      let data16 = data2.initialScore;
                                      const _errs42 = errors;
                                      if (errors === _errs42) {
                                        if (Array.isArray(data16)) {
                                          if (data16.length > 2) {
                                            validate10.errors = [{ instancePath: instancePath + "/metadata/initialScore", schemaPath: "#/properties/metadata/properties/initialScore/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                            return false;
                                          } else {
                                            var valid9 = true;
                                            const len3 = data16.length;
                                            for (let i3 = 0; i3 < len3; i3++) {
                                              let data17 = data16[i3];
                                              const _errs44 = errors;
                                              if (!(typeof data17 == "number" && (!(data17 % 1) && !isNaN(data17)) && isFinite(data17))) {
                                                validate10.errors = [{ instancePath: instancePath + "/metadata/initialScore/" + i3, schemaPath: "#/properties/metadata/properties/initialScore/items/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                return false;
                                              }
                                              var valid9 = _errs44 === errors;
                                              if (!valid9) {
                                                break;
                                              }
                                            }
                                          }
                                        } else {
                                          validate10.errors = [{ instancePath: instancePath + "/metadata/initialScore", schemaPath: "#/properties/metadata/properties/initialScore/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                          return false;
                                        }
                                      }
                                      var valid1 = _errs42 === errors;
                                    } else {
                                      var valid1 = true;
                                    }
                                    if (valid1) {
                                      if (data2.finalScore !== void 0) {
                                        let data18 = data2.finalScore;
                                        const _errs46 = errors;
                                        if (errors === _errs46) {
                                          if (Array.isArray(data18)) {
                                            if (data18.length > 2) {
                                              validate10.errors = [{ instancePath: instancePath + "/metadata/finalScore", schemaPath: "#/properties/metadata/properties/finalScore/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                              return false;
                                            } else {
                                              var valid10 = true;
                                              const len4 = data18.length;
                                              for (let i4 = 0; i4 < len4; i4++) {
                                                let data19 = data18[i4];
                                                const _errs48 = errors;
                                                if (!(typeof data19 == "number" && (!(data19 % 1) && !isNaN(data19)) && isFinite(data19))) {
                                                  validate10.errors = [{ instancePath: instancePath + "/metadata/finalScore/" + i4, schemaPath: "#/properties/metadata/properties/finalScore/items/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                  return false;
                                                }
                                                var valid10 = _errs48 === errors;
                                                if (!valid10) {
                                                  break;
                                                }
                                              }
                                            }
                                          } else {
                                            validate10.errors = [{ instancePath: instancePath + "/metadata/finalScore", schemaPath: "#/properties/metadata/properties/finalScore/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                            return false;
                                          }
                                        }
                                        var valid1 = _errs46 === errors;
                                      } else {
                                        var valid1 = true;
                                      }
                                      if (valid1) {
                                        if (data2.date !== void 0) {
                                          let data20 = data2.date;
                                          const _errs50 = errors;
                                          const _errs52 = errors;
                                          let valid11 = false;
                                          const _errs53 = errors;
                                          if (errors === _errs53) {
                                            if (typeof data20 === "string") {
                                              if (!formats0.validate(data20)) {
                                                const err20 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/0/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' };
                                                if (vErrors === null) {
                                                  vErrors = [err20];
                                                } else {
                                                  vErrors.push(err20);
                                                }
                                                errors++;
                                              }
                                            }
                                          }
                                          var _valid1 = _errs53 === errors;
                                          valid11 = valid11 || _valid1;
                                          if (!valid11) {
                                            const _errs54 = errors;
                                            if (errors === _errs54) {
                                              if (typeof data20 === "string") {
                                                if (!formats2.validate(data20)) {
                                                  const err21 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/1/format", keyword: "format", params: { format: "date" }, message: 'must match format "date"' };
                                                  if (vErrors === null) {
                                                    vErrors = [err21];
                                                  } else {
                                                    vErrors.push(err21);
                                                  }
                                                  errors++;
                                                }
                                              }
                                            }
                                            var _valid1 = _errs54 === errors;
                                            valid11 = valid11 || _valid1;
                                            if (!valid11) {
                                              const _errs55 = errors;
                                              if (typeof data20 === "string") {
                                                if (!pattern1.test(data20)) {
                                                  const err22 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/2/pattern", keyword: "pattern", params: { pattern: "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$" }, message: 'must match pattern "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$"' };
                                                  if (vErrors === null) {
                                                    vErrors = [err22];
                                                  } else {
                                                    vErrors.push(err22);
                                                  }
                                                  errors++;
                                                }
                                              }
                                              var _valid1 = _errs55 === errors;
                                              valid11 = valid11 || _valid1;
                                            }
                                          }
                                          if (!valid11) {
                                            const err23 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                                            if (vErrors === null) {
                                              vErrors = [err23];
                                            } else {
                                              vErrors.push(err23);
                                            }
                                            errors++;
                                            validate10.errors = vErrors;
                                            return false;
                                          } else {
                                            errors = _errs52;
                                            if (vErrors !== null) {
                                              if (_errs52) {
                                                vErrors.length = _errs52;
                                              } else {
                                                vErrors = null;
                                              }
                                            }
                                          }
                                          if (errors === _errs50) {
                                            if (typeof data20 === "string") {
                                              if (func3(data20) > 64) {
                                                validate10.errors = [{ instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                return false;
                                              }
                                            } else {
                                              validate10.errors = [{ instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                              return false;
                                            }
                                          }
                                          var valid1 = _errs50 === errors;
                                        } else {
                                          var valid1 = true;
                                        }
                                        if (valid1) {
                                          if (data2.ruleset !== void 0) {
                                            let data21 = data2.ruleset;
                                            const _errs56 = errors;
                                            const _errs58 = errors;
                                            const _errs59 = errors;
                                            const _errs60 = errors;
                                            if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                              let missing4;
                                              if (data21.winning_score === void 0 && (missing4 = "winning_score") || data21.num_deals === void 0 && (missing4 = "num_deals")) {
                                                const err24 = {};
                                                if (vErrors === null) {
                                                  vErrors = [err24];
                                                } else {
                                                  vErrors.push(err24);
                                                }
                                                errors++;
                                              }
                                            }
                                            var valid13 = _errs60 === errors;
                                            if (valid13) {
                                              validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/0/not", keyword: "not", params: {}, message: "must NOT be valid" }];
                                              return false;
                                            } else {
                                              errors = _errs59;
                                              if (vErrors !== null) {
                                                if (_errs59) {
                                                  vErrors.length = _errs59;
                                                } else {
                                                  vErrors = null;
                                                }
                                              }
                                            }
                                            var valid12 = _errs58 === errors;
                                            if (valid12) {
                                              const _errs61 = errors;
                                              const _errs62 = errors;
                                              let valid14 = false;
                                              const _errs63 = errors;
                                              const _errs64 = errors;
                                              const _errs65 = errors;
                                              if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                                let missing5;
                                                if (data21.winning_score === void 0 && (missing5 = "winning_score")) {
                                                  const err25 = {};
                                                  if (vErrors === null) {
                                                    vErrors = [err25];
                                                  } else {
                                                    vErrors.push(err25);
                                                  }
                                                  errors++;
                                                } else {
                                                  if (data21.winning_score !== void 0) {
                                                    if (0 !== data21.winning_score) {
                                                      const err26 = {};
                                                      if (vErrors === null) {
                                                        vErrors = [err26];
                                                      } else {
                                                        vErrors.push(err26);
                                                      }
                                                      errors++;
                                                    }
                                                  }
                                                }
                                              }
                                              var valid15 = _errs65 === errors;
                                              if (valid15) {
                                                const err27 = { instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/0/not", keyword: "not", params: {}, message: "must NOT be valid" };
                                                if (vErrors === null) {
                                                  vErrors = [err27];
                                                } else {
                                                  vErrors.push(err27);
                                                }
                                                errors++;
                                              } else {
                                                errors = _errs64;
                                                if (vErrors !== null) {
                                                  if (_errs64) {
                                                    vErrors.length = _errs64;
                                                  } else {
                                                    vErrors = null;
                                                  }
                                                }
                                              }
                                              var _valid2 = _errs63 === errors;
                                              valid14 = valid14 || _valid2;
                                              if (!valid14) {
                                                const _errs67 = errors;
                                                if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                                  let missing6;
                                                  if (data21.num_deals === void 0 && (missing6 = "num_deals")) {
                                                    const err28 = { instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/1/required", keyword: "required", params: { missingProperty: missing6 }, message: "must have required property '" + missing6 + "'" };
                                                    if (vErrors === null) {
                                                      vErrors = [err28];
                                                    } else {
                                                      vErrors.push(err28);
                                                    }
                                                    errors++;
                                                  } else {
                                                    if (data21.num_deals !== void 0) {
                                                      let data23 = data21.num_deals;
                                                      const _errs68 = errors;
                                                      if (!(typeof data23 == "number" && (!(data23 % 1) && !isNaN(data23)) && isFinite(data23))) {
                                                        const err29 = { instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/1/properties/num_deals/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                                                        if (vErrors === null) {
                                                          vErrors = [err29];
                                                        } else {
                                                          vErrors.push(err29);
                                                        }
                                                        errors++;
                                                      }
                                                      if (errors === _errs68) {
                                                        if (typeof data23 == "number" && isFinite(data23)) {
                                                          if (data23 < 1 || isNaN(data23)) {
                                                            const err30 = { instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/1/properties/num_deals/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                                                            if (vErrors === null) {
                                                              vErrors = [err30];
                                                            } else {
                                                              vErrors.push(err30);
                                                            }
                                                            errors++;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                                var _valid2 = _errs67 === errors;
                                                valid14 = valid14 || _valid2;
                                              }
                                              if (!valid14) {
                                                const err31 = { instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                                                if (vErrors === null) {
                                                  vErrors = [err31];
                                                } else {
                                                  vErrors.push(err31);
                                                }
                                                errors++;
                                                validate10.errors = vErrors;
                                                return false;
                                              } else {
                                                errors = _errs62;
                                                if (vErrors !== null) {
                                                  if (_errs62) {
                                                    vErrors.length = _errs62;
                                                  } else {
                                                    vErrors = null;
                                                  }
                                                }
                                              }
                                              var valid12 = _errs61 === errors;
                                            }
                                            if (errors === _errs56) {
                                              if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                                const _errs70 = errors;
                                                for (const key4 in data21) {
                                                  if (!func2.call(schema11.properties.metadata.properties.ruleset.properties, key4)) {
                                                    validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" }];
                                                    return false;
                                                    break;
                                                  }
                                                }
                                                if (_errs70 === errors) {
                                                  if (data21.std !== void 0) {
                                                    const _errs71 = errors;
                                                    if (typeof data21.std !== "boolean") {
                                                      validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/std", schemaPath: "#/properties/metadata/properties/ruleset/properties/std/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                      return false;
                                                    }
                                                    var valid18 = _errs71 === errors;
                                                  } else {
                                                    var valid18 = true;
                                                  }
                                                  if (valid18) {
                                                    if (data21.min_rank !== void 0) {
                                                      let data25 = data21.min_rank;
                                                      const _errs73 = errors;
                                                      if (!(typeof data25 == "number" && (!(data25 % 1) && !isNaN(data25)) && isFinite(data25))) {
                                                        validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/min_rank", schemaPath: "#/properties/metadata/properties/ruleset/properties/min_rank/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                        return false;
                                                      }
                                                      var valid18 = _errs73 === errors;
                                                    } else {
                                                      var valid18 = true;
                                                    }
                                                    if (valid18) {
                                                      if (data21.winning_score !== void 0) {
                                                        let data26 = data21.winning_score;
                                                        const _errs75 = errors;
                                                        if (!(typeof data26 == "number" && (!(data26 % 1) && !isNaN(data26)) && isFinite(data26))) {
                                                          validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/winning_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/winning_score/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                          return false;
                                                        }
                                                        if (errors === _errs75) {
                                                          if (typeof data26 == "number" && isFinite(data26)) {
                                                            if (data26 < 0 || isNaN(data26)) {
                                                              validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/winning_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/winning_score/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                              return false;
                                                            }
                                                          }
                                                        }
                                                        var valid18 = _errs75 === errors;
                                                      } else {
                                                        var valid18 = true;
                                                      }
                                                      if (valid18) {
                                                        if (data21.num_deals !== void 0) {
                                                          let data27 = data21.num_deals;
                                                          const _errs77 = errors;
                                                          if (!(typeof data27 == "number" && (!(data27 % 1) && !isNaN(data27)) && isFinite(data27))) {
                                                            validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/properties/num_deals/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                            return false;
                                                          }
                                                          if (errors === _errs77) {
                                                            if (typeof data27 == "number" && isFinite(data27)) {
                                                              if (data27 < 0 || isNaN(data27)) {
                                                                validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/properties/num_deals/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                                return false;
                                                              }
                                                            }
                                                          }
                                                          var valid18 = _errs77 === errors;
                                                        } else {
                                                          var valid18 = true;
                                                        }
                                                        if (valid18) {
                                                          if (data21.canadian !== void 0) {
                                                            const _errs79 = errors;
                                                            if (typeof data21.canadian !== "boolean") {
                                                              validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/canadian", schemaPath: "#/properties/metadata/properties/ruleset/properties/canadian/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                              return false;
                                                            }
                                                            var valid18 = _errs79 === errors;
                                                          } else {
                                                            var valid18 = true;
                                                          }
                                                          if (valid18) {
                                                            if (data21.loner_lead !== void 0) {
                                                              let data29 = data21.loner_lead;
                                                              const _errs81 = errors;
                                                              if (typeof data29 !== "string") {
                                                                validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_lead", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_lead/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                              }
                                                              if (!(data29 === "LEFT_OF_DEALER" || data29 === "LEFT_OF_LONER")) {
                                                                validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_lead", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_lead/enum", keyword: "enum", params: { allowedValues: schema11.properties.metadata.properties.ruleset.properties.loner_lead.enum }, message: "must be equal to one of the allowed values" }];
                                                                return false;
                                                              }
                                                              var valid18 = _errs81 === errors;
                                                            } else {
                                                              var valid18 = true;
                                                            }
                                                            if (valid18) {
                                                              if (data21.loner_march_score !== void 0) {
                                                                let data30 = data21.loner_march_score;
                                                                const _errs83 = errors;
                                                                if (!(typeof data30 == "number" && (!(data30 % 1) && !isNaN(data30)) && isFinite(data30))) {
                                                                  validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_march_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_march_score/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                  return false;
                                                                }
                                                                var valid18 = _errs83 === errors;
                                                              } else {
                                                                var valid18 = true;
                                                              }
                                                              if (valid18) {
                                                                if (data21.loner_euchred_score !== void 0) {
                                                                  let data31 = data21.loner_euchred_score;
                                                                  const _errs85 = errors;
                                                                  if (!(typeof data31 == "number" && (!(data31 % 1) && !isNaN(data31)) && isFinite(data31))) {
                                                                    validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_euchred_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_euchred_score/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                    return false;
                                                                  }
                                                                  var valid18 = _errs85 === errors;
                                                                } else {
                                                                  var valid18 = true;
                                                                }
                                                                if (valid18) {
                                                                  if (data21.defend_alone !== void 0) {
                                                                    const _errs87 = errors;
                                                                    if (typeof data21.defend_alone !== "boolean") {
                                                                      validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/defend_alone", schemaPath: "#/properties/metadata/properties/ruleset/properties/defend_alone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                      return false;
                                                                    }
                                                                    var valid18 = _errs87 === errors;
                                                                  } else {
                                                                    var valid18 = true;
                                                                  }
                                                                  if (valid18) {
                                                                    if (data21.farmers !== void 0) {
                                                                      const _errs89 = errors;
                                                                      if (typeof data21.farmers !== "boolean") {
                                                                        validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/farmers", schemaPath: "#/properties/metadata/properties/ruleset/properties/farmers/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                        return false;
                                                                      }
                                                                      var valid18 = _errs89 === errors;
                                                                    } else {
                                                                      var valid18 = true;
                                                                    }
                                                                    if (valid18) {
                                                                      if (data21.partners_best !== void 0) {
                                                                        const _errs91 = errors;
                                                                        if (typeof data21.partners_best !== "boolean") {
                                                                          validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/partners_best", schemaPath: "#/properties/metadata/properties/ruleset/properties/partners_best/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                          return false;
                                                                        }
                                                                        var valid18 = _errs91 === errors;
                                                                      } else {
                                                                        var valid18 = true;
                                                                      }
                                                                      if (valid18) {
                                                                        if (data21.go_under !== void 0) {
                                                                          const _errs93 = errors;
                                                                          if (typeof data21.go_under !== "boolean") {
                                                                            validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/go_under", schemaPath: "#/properties/metadata/properties/ruleset/properties/go_under/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                            return false;
                                                                          }
                                                                          var valid18 = _errs93 === errors;
                                                                        } else {
                                                                          var valid18 = true;
                                                                        }
                                                                        if (valid18) {
                                                                          if (data21.joker !== void 0) {
                                                                            const _errs95 = errors;
                                                                            if (typeof data21.joker !== "boolean") {
                                                                              validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/joker", schemaPath: "#/properties/metadata/properties/ruleset/properties/joker/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                              return false;
                                                                            }
                                                                            var valid18 = _errs95 === errors;
                                                                          } else {
                                                                            var valid18 = true;
                                                                          }
                                                                          if (valid18) {
                                                                            if (data21.num_players !== void 0) {
                                                                              let data37 = data21.num_players;
                                                                              const _errs97 = errors;
                                                                              if (!(typeof data37 == "number" && (!(data37 % 1) && !isNaN(data37)) && isFinite(data37))) {
                                                                                validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/num_players", schemaPath: "#/properties/metadata/properties/ruleset/properties/num_players/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                                return false;
                                                                              }
                                                                              var valid18 = _errs97 === errors;
                                                                            } else {
                                                                              var valid18 = true;
                                                                            }
                                                                            if (valid18) {
                                                                              if (data21.allow_no_trump !== void 0) {
                                                                                const _errs99 = errors;
                                                                                if (typeof data21.allow_no_trump !== "boolean") {
                                                                                  validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/allow_no_trump", schemaPath: "#/properties/metadata/properties/ruleset/properties/allow_no_trump/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                  return false;
                                                                                }
                                                                                var valid18 = _errs99 === errors;
                                                                              } else {
                                                                                var valid18 = true;
                                                                              }
                                                                              if (valid18) {
                                                                                if (data21.fast_break !== void 0) {
                                                                                  const _errs101 = errors;
                                                                                  if (typeof data21.fast_break !== "boolean") {
                                                                                    validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/fast_break", schemaPath: "#/properties/metadata/properties/ruleset/properties/fast_break/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                    return false;
                                                                                  }
                                                                                  var valid18 = _errs101 === errors;
                                                                                } else {
                                                                                  var valid18 = true;
                                                                                }
                                                                                if (valid18) {
                                                                                  if (data21.four_trick_tokens !== void 0) {
                                                                                    const _errs103 = errors;
                                                                                    if (typeof data21.four_trick_tokens !== "boolean") {
                                                                                      validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset/four_trick_tokens", schemaPath: "#/properties/metadata/properties/ruleset/properties/four_trick_tokens/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                      return false;
                                                                                    }
                                                                                    var valid18 = _errs103 === errors;
                                                                                  } else {
                                                                                    var valid18 = true;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              } else {
                                                validate10.errors = [{ instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                return false;
                                              }
                                            }
                                            var valid1 = _errs56 === errors;
                                          } else {
                                            var valid1 = true;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      validate10.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                      return false;
                    }
                  }
                  var valid0 = _errs6 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.deals !== void 0) {
                    let data41 = data.deals;
                    const _errs105 = errors;
                    if (errors === _errs105) {
                      if (Array.isArray(data41)) {
                        if (data41.length > 100) {
                          validate10.errors = [{ instancePath: instancePath + "/deals", schemaPath: "#/properties/deals/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" }];
                          return false;
                        } else {
                          var valid19 = true;
                          const len5 = data41.length;
                          for (let i5 = 0; i5 < len5; i5++) {
                            let data42 = data41[i5];
                            const _errs107 = errors;
                            const _errs108 = errors;
                            let valid20 = false;
                            let passing1 = null;
                            const _errs109 = errors;
                            if (errors === _errs109) {
                              if (data42 && typeof data42 == "object" && !Array.isArray(data42)) {
                                let missing7;
                                if (data42.dealNumber === void 0 && (missing7 = "dealNumber") || data42.initialState === void 0 && (missing7 = "initialState") || data42.phases === void 0 && (missing7 = "phases")) {
                                  const err32 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/0/required", keyword: "required", params: { missingProperty: missing7 }, message: "must have required property '" + missing7 + "'" };
                                  if (vErrors === null) {
                                    vErrors = [err32];
                                  } else {
                                    vErrors.push(err32);
                                  }
                                  errors++;
                                } else {
                                  const _errs111 = errors;
                                  for (const key5 in data42) {
                                    if (!(key5 === "dealNumber" || key5 === "initialState" || key5 === "phases" || key5 === "alternativeLines")) {
                                      const err33 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key5 }, message: "must NOT have additional properties" };
                                      if (vErrors === null) {
                                        vErrors = [err33];
                                      } else {
                                        vErrors.push(err33);
                                      }
                                      errors++;
                                      break;
                                    }
                                  }
                                  if (_errs111 === errors) {
                                    if (data42.dealNumber !== void 0) {
                                      let data43 = data42.dealNumber;
                                      const _errs112 = errors;
                                      if (!(typeof data43 == "number" && (!(data43 % 1) && !isNaN(data43)) && isFinite(data43))) {
                                        const err34 = { instancePath: instancePath + "/deals/" + i5 + "/dealNumber", schemaPath: "#/properties/deals/items/oneOf/0/properties/dealNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                                        if (vErrors === null) {
                                          vErrors = [err34];
                                        } else {
                                          vErrors.push(err34);
                                        }
                                        errors++;
                                      }
                                      if (errors === _errs112) {
                                        if (typeof data43 == "number" && isFinite(data43)) {
                                          if (data43 < 0 || isNaN(data43)) {
                                            const err35 = { instancePath: instancePath + "/deals/" + i5 + "/dealNumber", schemaPath: "#/properties/deals/items/oneOf/0/properties/dealNumber/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                                            if (vErrors === null) {
                                              vErrors = [err35];
                                            } else {
                                              vErrors.push(err35);
                                            }
                                            errors++;
                                          }
                                        }
                                      }
                                      var valid21 = _errs112 === errors;
                                    } else {
                                      var valid21 = true;
                                    }
                                    if (valid21) {
                                      if (data42.initialState !== void 0) {
                                        let data44 = data42.initialState;
                                        const _errs114 = errors;
                                        if (errors === _errs114) {
                                          if (data44 && typeof data44 == "object" && !Array.isArray(data44)) {
                                            let missing8;
                                            if (data44.dealer === void 0 && (missing8 = "dealer") || data44.upCard === void 0 && (missing8 = "upCard")) {
                                              const err36 = { instancePath: instancePath + "/deals/" + i5 + "/initialState", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/required", keyword: "required", params: { missingProperty: missing8 }, message: "must have required property '" + missing8 + "'" };
                                              if (vErrors === null) {
                                                vErrors = [err36];
                                              } else {
                                                vErrors.push(err36);
                                              }
                                              errors++;
                                            } else {
                                              const _errs116 = errors;
                                              for (const key6 in data44) {
                                                if (!(key6 === "dealer" || key6 === "upCard" || key6 === "playerCards")) {
                                                  const err37 = { instancePath: instancePath + "/deals/" + i5 + "/initialState", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key6 }, message: "must NOT have additional properties" };
                                                  if (vErrors === null) {
                                                    vErrors = [err37];
                                                  } else {
                                                    vErrors.push(err37);
                                                  }
                                                  errors++;
                                                  break;
                                                }
                                              }
                                              if (_errs116 === errors) {
                                                if (data44.dealer !== void 0) {
                                                  let data45 = data44.dealer;
                                                  const _errs117 = errors;
                                                  if (!(typeof data45 == "number" && (!(data45 % 1) && !isNaN(data45)) && isFinite(data45))) {
                                                    const err38 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/dealer", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/dealer/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                                                    if (vErrors === null) {
                                                      vErrors = [err38];
                                                    } else {
                                                      vErrors.push(err38);
                                                    }
                                                    errors++;
                                                  }
                                                  if (errors === _errs117) {
                                                    if (typeof data45 == "number" && isFinite(data45)) {
                                                      if (data45 > 9 || isNaN(data45)) {
                                                        const err39 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/dealer", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/dealer/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" };
                                                        if (vErrors === null) {
                                                          vErrors = [err39];
                                                        } else {
                                                          vErrors.push(err39);
                                                        }
                                                        errors++;
                                                      } else {
                                                        if (data45 < 0 || isNaN(data45)) {
                                                          const err40 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/dealer", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/dealer/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                                                          if (vErrors === null) {
                                                            vErrors = [err40];
                                                          } else {
                                                            vErrors.push(err40);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                    }
                                                  }
                                                  var valid22 = _errs117 === errors;
                                                } else {
                                                  var valid22 = true;
                                                }
                                                if (valid22) {
                                                  if (data44.upCard !== void 0) {
                                                    let data46 = data44.upCard;
                                                    const _errs119 = errors;
                                                    const _errs120 = errors;
                                                    if (errors === _errs120) {
                                                      if (typeof data46 === "string") {
                                                        if (!pattern2.test(data46)) {
                                                          const err41 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/upCard", schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' };
                                                          if (vErrors === null) {
                                                            vErrors = [err41];
                                                          } else {
                                                            vErrors.push(err41);
                                                          }
                                                          errors++;
                                                        }
                                                      } else {
                                                        const err42 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/upCard", schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                        if (vErrors === null) {
                                                          vErrors = [err42];
                                                        } else {
                                                          vErrors.push(err42);
                                                        }
                                                        errors++;
                                                      }
                                                    }
                                                    var valid22 = _errs119 === errors;
                                                  } else {
                                                    var valid22 = true;
                                                  }
                                                  if (valid22) {
                                                    if (data44.playerCards !== void 0) {
                                                      let data47 = data44.playerCards;
                                                      const _errs122 = errors;
                                                      if (errors === _errs122) {
                                                        if (Array.isArray(data47)) {
                                                          if (data47.length > 10) {
                                                            const err43 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/playerCards", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/playerCards/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" };
                                                            if (vErrors === null) {
                                                              vErrors = [err43];
                                                            } else {
                                                              vErrors.push(err43);
                                                            }
                                                            errors++;
                                                          } else {
                                                            var valid24 = true;
                                                            const len6 = data47.length;
                                                            for (let i6 = 0; i6 < len6; i6++) {
                                                              const _errs124 = errors;
                                                              if (!validate11(data47[i6], { instancePath: instancePath + "/deals/" + i5 + "/initialState/playerCards/" + i6, parentData: data47, parentDataProperty: i6, rootData })) {
                                                                vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
                                                                errors = vErrors.length;
                                                              }
                                                              var valid24 = _errs124 === errors;
                                                              if (!valid24) {
                                                                break;
                                                              }
                                                            }
                                                          }
                                                        } else {
                                                          const err44 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/playerCards", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/playerCards/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                          if (vErrors === null) {
                                                            vErrors = [err44];
                                                          } else {
                                                            vErrors.push(err44);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var valid22 = _errs122 === errors;
                                                    } else {
                                                      var valid22 = true;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          } else {
                                            const err45 = { instancePath: instancePath + "/deals/" + i5 + "/initialState", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                            if (vErrors === null) {
                                              vErrors = [err45];
                                            } else {
                                              vErrors.push(err45);
                                            }
                                            errors++;
                                          }
                                        }
                                        var valid21 = _errs114 === errors;
                                      } else {
                                        var valid21 = true;
                                      }
                                      if (valid21) {
                                        if (data42.phases !== void 0) {
                                          let data49 = data42.phases;
                                          const _errs125 = errors;
                                          if (errors === _errs125) {
                                            if (Array.isArray(data49)) {
                                              if (data49.length > 2) {
                                                const err46 = { instancePath: instancePath + "/deals/" + i5 + "/phases", schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" };
                                                if (vErrors === null) {
                                                  vErrors = [err46];
                                                } else {
                                                  vErrors.push(err46);
                                                }
                                                errors++;
                                              } else {
                                                if (data49.length < 0) {
                                                  const err47 = { instancePath: instancePath + "/deals/" + i5 + "/phases", schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/minItems", keyword: "minItems", params: { limit: 0 }, message: "must NOT have fewer than 0 items" };
                                                  if (vErrors === null) {
                                                    vErrors = [err47];
                                                  } else {
                                                    vErrors.push(err47);
                                                  }
                                                  errors++;
                                                } else {
                                                  var valid25 = true;
                                                  const len7 = data49.length;
                                                  for (let i7 = 0; i7 < len7; i7++) {
                                                    let data50 = data49[i7];
                                                    const _errs127 = errors;
                                                    const _errs128 = errors;
                                                    let valid26 = false;
                                                    let passing2 = null;
                                                    const _errs129 = errors;
                                                    if (!validate13(data50, { instancePath: instancePath + "/deals/" + i5 + "/phases/" + i7, parentData: data49, parentDataProperty: i7, rootData })) {
                                                      vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var _valid4 = _errs129 === errors;
                                                    if (_valid4) {
                                                      valid26 = true;
                                                      passing2 = 0;
                                                    }
                                                    const _errs130 = errors;
                                                    if (!validate16(data50, { instancePath: instancePath + "/deals/" + i5 + "/phases/" + i7, parentData: data49, parentDataProperty: i7, rootData })) {
                                                      vErrors = vErrors === null ? validate16.errors : vErrors.concat(validate16.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var _valid4 = _errs130 === errors;
                                                    if (_valid4 && valid26) {
                                                      valid26 = false;
                                                      passing2 = [passing2, 1];
                                                    } else {
                                                      if (_valid4) {
                                                        valid26 = true;
                                                        passing2 = 1;
                                                      }
                                                    }
                                                    if (!valid26) {
                                                      const err48 = { instancePath: instancePath + "/deals/" + i5 + "/phases/" + i7, schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
                                                      if (vErrors === null) {
                                                        vErrors = [err48];
                                                      } else {
                                                        vErrors.push(err48);
                                                      }
                                                      errors++;
                                                    } else {
                                                      errors = _errs128;
                                                      if (vErrors !== null) {
                                                        if (_errs128) {
                                                          vErrors.length = _errs128;
                                                        } else {
                                                          vErrors = null;
                                                        }
                                                      }
                                                    }
                                                    var valid25 = _errs127 === errors;
                                                    if (!valid25) {
                                                      break;
                                                    }
                                                  }
                                                }
                                              }
                                            } else {
                                              const err49 = { instancePath: instancePath + "/deals/" + i5 + "/phases", schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                              if (vErrors === null) {
                                                vErrors = [err49];
                                              } else {
                                                vErrors.push(err49);
                                              }
                                              errors++;
                                            }
                                          }
                                          var valid21 = _errs125 === errors;
                                        } else {
                                          var valid21 = true;
                                        }
                                        if (valid21) {
                                          if (data42.alternativeLines !== void 0) {
                                            let data51 = data42.alternativeLines;
                                            const _errs131 = errors;
                                            if (errors === _errs131) {
                                              if (Array.isArray(data51)) {
                                                if (data51.length > 50) {
                                                  const err50 = { instancePath: instancePath + "/deals/" + i5 + "/alternativeLines", schemaPath: "#/properties/deals/items/oneOf/0/properties/alternativeLines/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" };
                                                  if (vErrors === null) {
                                                    vErrors = [err50];
                                                  } else {
                                                    vErrors.push(err50);
                                                  }
                                                  errors++;
                                                } else {
                                                  var valid27 = true;
                                                  const len8 = data51.length;
                                                  for (let i8 = 0; i8 < len8; i8++) {
                                                    const _errs133 = errors;
                                                    if (!validate19(data51[i8], { instancePath: instancePath + "/deals/" + i5 + "/alternativeLines/" + i8, parentData: data51, parentDataProperty: i8, rootData })) {
                                                      vErrors = vErrors === null ? validate19.errors : vErrors.concat(validate19.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var valid27 = _errs133 === errors;
                                                    if (!valid27) {
                                                      break;
                                                    }
                                                  }
                                                }
                                              } else {
                                                const err51 = { instancePath: instancePath + "/deals/" + i5 + "/alternativeLines", schemaPath: "#/properties/deals/items/oneOf/0/properties/alternativeLines/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                if (vErrors === null) {
                                                  vErrors = [err51];
                                                } else {
                                                  vErrors.push(err51);
                                                }
                                                errors++;
                                              }
                                            }
                                            var valid21 = _errs131 === errors;
                                          } else {
                                            var valid21 = true;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              } else {
                                const err52 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/0/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                if (vErrors === null) {
                                  vErrors = [err52];
                                } else {
                                  vErrors.push(err52);
                                }
                                errors++;
                              }
                            }
                            var _valid3 = _errs109 === errors;
                            if (_valid3) {
                              valid20 = true;
                              passing1 = 0;
                            }
                            const _errs134 = errors;
                            if (errors === _errs134) {
                              if (typeof data42 === "string") {
                                if (!pattern7.test(data42)) {
                                  const err53 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/1/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9+/_-]*={0,2}$" }, message: 'must match pattern "^[A-Za-z0-9+/_-]*={0,2}$"' };
                                  if (vErrors === null) {
                                    vErrors = [err53];
                                  } else {
                                    vErrors.push(err53);
                                  }
                                  errors++;
                                }
                              } else {
                                const err54 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/1/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                if (vErrors === null) {
                                  vErrors = [err54];
                                } else {
                                  vErrors.push(err54);
                                }
                                errors++;
                              }
                            }
                            var _valid3 = _errs134 === errors;
                            if (_valid3 && valid20) {
                              valid20 = false;
                              passing1 = [passing1, 1];
                            } else {
                              if (_valid3) {
                                valid20 = true;
                                passing1 = 1;
                              }
                            }
                            if (!valid20) {
                              const err55 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                              if (vErrors === null) {
                                vErrors = [err55];
                              } else {
                                vErrors.push(err55);
                              }
                              errors++;
                              validate10.errors = vErrors;
                              return false;
                            } else {
                              errors = _errs108;
                              if (vErrors !== null) {
                                if (_errs108) {
                                  vErrors.length = _errs108;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                            var valid19 = _errs107 === errors;
                            if (!valid19) {
                              break;
                            }
                          }
                        }
                      } else {
                        validate10.errors = [{ instancePath: instancePath + "/deals", schemaPath: "#/properties/deals/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs105 === errors;
                  } else {
                    var valid0 = true;
                  }
                }
              }
            }
          }
        }
      } else {
        validate10.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate10.errors = vErrors;
    return errors === 0;
  }
  var validateDeal = validate23;
  function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (Array.isArray(data)) {
        if (data.length > 10) {
          validate24.errors = [{ instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
          return false;
        } else {
          var valid0 = true;
          const len0 = data.length;
          for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (!pattern2.test(data0)) {
                  validate24.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                  return false;
                }
              } else {
                validate24.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
              break;
            }
          }
        }
      } else {
        validate24.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
      }
    }
    validate24.errors = vErrors;
    return errors === 0;
  }
  function validate26(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.type === void 0 && (missing0 = "type") || data.calls === void 0 && (missing0 = "calls")) {
          validate26.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "phaseNumber" || key0 === "type" || key0 === "calls" || key0 === "isAlone" || key0 === "aloneDefender" || key0 === "discard" || key0 === "cardExchanges" || key0 === "callAnnotations")) {
              validate26.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.phaseNumber !== void 0) {
              let data0 = data.phaseNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate26.errors = [{ instancePath: instancePath + "/phaseNumber", schemaPath: "#/properties/phaseNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.type !== void 0) {
                const _errs4 = errors;
                if ("EUCHRE_BIDDING" !== data.type) {
                  validate26.errors = [{ instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "EUCHRE_BIDDING" }, message: "must be equal to constant" }];
                  return false;
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.calls !== void 0) {
                  let data2 = data.calls;
                  const _errs5 = errors;
                  if (errors === _errs5) {
                    if (Array.isArray(data2)) {
                      if (data2.length > 16) {
                        validate26.errors = [{ instancePath: instancePath + "/calls", schemaPath: "#/properties/calls/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data2.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          let data3 = data2[i0];
                          const _errs7 = errors;
                          if (typeof data3 !== "string") {
                            validate26.errors = [{ instancePath: instancePath + "/calls/" + i0, schemaPath: "#/properties/calls/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                          if (!(data3 === "Pass" || data3 === "Order" || data3 === "p" || data3 === "o" || data3 === "s" || data3 === "h" || data3 === "d" || data3 === "c" || data3 === "n" || data3 === "x")) {
                            validate26.errors = [{ instancePath: instancePath + "/calls/" + i0, schemaPath: "#/properties/calls/items/enum", keyword: "enum", params: { allowedValues: schema16.properties.calls.items.enum }, message: "must be equal to one of the allowed values" }];
                            return false;
                          }
                          var valid1 = _errs7 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate26.errors = [{ instancePath: instancePath + "/calls", schemaPath: "#/properties/calls/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.isAlone !== void 0) {
                    const _errs9 = errors;
                    if (typeof data.isAlone !== "boolean") {
                      validate26.errors = [{ instancePath: instancePath + "/isAlone", schemaPath: "#/properties/isAlone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                      return false;
                    }
                    var valid0 = _errs9 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.aloneDefender !== void 0) {
                      let data5 = data.aloneDefender;
                      const _errs11 = errors;
                      if (!(typeof data5 == "number" && (!(data5 % 1) && !isNaN(data5)) && isFinite(data5))) {
                        validate26.errors = [{ instancePath: instancePath + "/aloneDefender", schemaPath: "#/properties/aloneDefender/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                        return false;
                      }
                      var valid0 = _errs11 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.discard !== void 0) {
                        let data6 = data.discard;
                        const _errs13 = errors;
                        const _errs14 = errors;
                        if (errors === _errs14) {
                          if (typeof data6 === "string") {
                            if (!pattern2.test(data6)) {
                              validate26.errors = [{ instancePath: instancePath + "/discard", schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                              return false;
                            }
                          } else {
                            validate26.errors = [{ instancePath: instancePath + "/discard", schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid0 = _errs13 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.cardExchanges !== void 0) {
                          let data7 = data.cardExchanges;
                          const _errs16 = errors;
                          if (errors === _errs16) {
                            if (Array.isArray(data7)) {
                              if (data7.length > 4) {
                                validate26.errors = [{ instancePath: instancePath + "/cardExchanges", schemaPath: "#/properties/cardExchanges/maxItems", keyword: "maxItems", params: { limit: 4 }, message: "must NOT have more than 4 items" }];
                                return false;
                              } else {
                                var valid3 = true;
                                const len1 = data7.length;
                                for (let i1 = 0; i1 < len1; i1++) {
                                  let data8 = data7[i1];
                                  const _errs18 = errors;
                                  if (errors === _errs18) {
                                    if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                                      let missing1;
                                      if (data8.receiver === void 0 && (missing1 = "receiver") || data8.cards === void 0 && (missing1 = "cards")) {
                                        validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                        return false;
                                      } else {
                                        const _errs20 = errors;
                                        for (const key1 in data8) {
                                          if (!(key1 === "sender" || key1 === "receiver" || key1 === "cards")) {
                                            validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                            return false;
                                            break;
                                          }
                                        }
                                        if (_errs20 === errors) {
                                          if (data8.sender !== void 0) {
                                            let data9 = data8.sender;
                                            const _errs21 = errors;
                                            if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
                                              validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                              return false;
                                            }
                                            if (errors === _errs21) {
                                              if (typeof data9 == "number" && isFinite(data9)) {
                                                if (data9 > 9 || isNaN(data9)) {
                                                  validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                                  return false;
                                                } else {
                                                  if (data9 < 0 || isNaN(data9)) {
                                                    validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                    return false;
                                                  }
                                                }
                                              }
                                            }
                                            var valid4 = _errs21 === errors;
                                          } else {
                                            var valid4 = true;
                                          }
                                          if (valid4) {
                                            if (data8.receiver !== void 0) {
                                              let data10 = data8.receiver;
                                              const _errs23 = errors;
                                              if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10))) {
                                                validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                return false;
                                              }
                                              if (errors === _errs23) {
                                                if (typeof data10 == "number" && isFinite(data10)) {
                                                  if (data10 > 9 || isNaN(data10)) {
                                                    validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                                    return false;
                                                  } else {
                                                    if (data10 < 0 || isNaN(data10)) {
                                                      validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                      return false;
                                                    }
                                                  }
                                                }
                                              }
                                              var valid4 = _errs23 === errors;
                                            } else {
                                              var valid4 = true;
                                            }
                                            if (valid4) {
                                              if (data8.cards !== void 0) {
                                                const _errs25 = errors;
                                                if (!validate24(data8.cards, { instancePath: instancePath + "/cardExchanges/" + i1 + "/cards", parentData: data8, parentDataProperty: "cards", rootData })) {
                                                  vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
                                                  errors = vErrors.length;
                                                }
                                                var valid4 = _errs25 === errors;
                                              } else {
                                                var valid4 = true;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    } else {
                                      validate26.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                      return false;
                                    }
                                  }
                                  var valid3 = _errs18 === errors;
                                  if (!valid3) {
                                    break;
                                  }
                                }
                              }
                            } else {
                              validate26.errors = [{ instancePath: instancePath + "/cardExchanges", schemaPath: "#/properties/cardExchanges/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                              return false;
                            }
                          }
                          var valid0 = _errs16 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.callAnnotations !== void 0) {
                            let data12 = data.callAnnotations;
                            const _errs26 = errors;
                            const _errs27 = errors;
                            if (errors === _errs27) {
                              if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
                                for (const key2 in data12) {
                                  const _errs29 = errors;
                                  if (typeof key2 === "string") {
                                    if (!pattern5.test(key2)) {
                                      const err0 = { instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[0-9]+$" }, message: 'must match pattern "^[0-9]+$"', propertyName: key2 };
                                      if (vErrors === null) {
                                        vErrors = [err0];
                                      } else {
                                        vErrors.push(err0);
                                      }
                                      errors++;
                                    }
                                  }
                                  var valid6 = _errs29 === errors;
                                  if (!valid6) {
                                    const err1 = { instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/propertyNames", keyword: "propertyNames", params: { propertyName: key2 }, message: "property name must be valid" };
                                    if (vErrors === null) {
                                      vErrors = [err1];
                                    } else {
                                      vErrors.push(err1);
                                    }
                                    errors++;
                                    validate26.errors = vErrors;
                                    return false;
                                    break;
                                  }
                                }
                                if (valid6) {
                                  for (const key3 in data12) {
                                    let data13 = data12[key3];
                                    const _errs31 = errors;
                                    if (errors === _errs31) {
                                      if (Array.isArray(data13)) {
                                        if (data13.length > 50) {
                                          validate26.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                                          return false;
                                        } else {
                                          var valid8 = true;
                                          const len2 = data13.length;
                                          for (let i2 = 0; i2 < len2; i2++) {
                                            let data14 = data13[i2];
                                            const _errs33 = errors;
                                            if (errors === _errs33) {
                                              if (typeof data14 === "string") {
                                                if (func3(data14) > 1024) {
                                                  validate26.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i2, schemaPath: "#/definitions/annotations/additionalProperties/items/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate26.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i2, schemaPath: "#/definitions/annotations/additionalProperties/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid8 = _errs33 === errors;
                                            if (!valid8) {
                                              break;
                                            }
                                          }
                                        }
                                      } else {
                                        validate26.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid7 = _errs31 === errors;
                                    if (!valid7) {
                                      break;
                                    }
                                  }
                                }
                              } else {
                                validate26.errors = [{ instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                              }
                            }
                            var valid0 = _errs26 === errors;
                          } else {
                            var valid0 = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate26.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate26.errors = vErrors;
    return errors === 0;
  }
  function validate29(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.type === void 0 && (missing0 = "type") || data.tricks === void 0 && (missing0 = "tricks")) {
          validate29.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "phaseNumber" || key0 === "type" || key0 === "tricks" || key0 === "isAlone" || key0 === "playAnnotations")) {
              validate29.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.phaseNumber !== void 0) {
              let data0 = data.phaseNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate29.errors = [{ instancePath: instancePath + "/phaseNumber", schemaPath: "#/properties/phaseNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.type !== void 0) {
                const _errs4 = errors;
                if ("TRICK_PLAY" !== data.type) {
                  validate29.errors = [{ instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "TRICK_PLAY" }, message: "must be equal to constant" }];
                  return false;
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.tricks !== void 0) {
                  let data2 = data.tricks;
                  const _errs5 = errors;
                  if (errors === _errs5) {
                    if (Array.isArray(data2)) {
                      if (data2.length > 10) {
                        validate29.errors = [{ instancePath: instancePath + "/tricks", schemaPath: "#/properties/tricks/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data2.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          const _errs7 = errors;
                          if (!validate24(data2[i0], { instancePath: instancePath + "/tricks/" + i0, parentData: data2, parentDataProperty: i0, rootData })) {
                            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
                            errors = vErrors.length;
                          }
                          var valid1 = _errs7 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate29.errors = [{ instancePath: instancePath + "/tricks", schemaPath: "#/properties/tricks/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.isAlone !== void 0) {
                    const _errs8 = errors;
                    if (typeof data.isAlone !== "boolean") {
                      validate29.errors = [{ instancePath: instancePath + "/isAlone", schemaPath: "#/properties/isAlone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                      return false;
                    }
                    var valid0 = _errs8 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.playAnnotations !== void 0) {
                      let data5 = data.playAnnotations;
                      const _errs10 = errors;
                      const _errs11 = errors;
                      if (errors === _errs11) {
                        if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                          for (const key1 in data5) {
                            const _errs13 = errors;
                            if (typeof key1 === "string") {
                              if (!pattern5.test(key1)) {
                                const err0 = { instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[0-9]+$" }, message: 'must match pattern "^[0-9]+$"', propertyName: key1 };
                                if (vErrors === null) {
                                  vErrors = [err0];
                                } else {
                                  vErrors.push(err0);
                                }
                                errors++;
                              }
                            }
                            var valid3 = _errs13 === errors;
                            if (!valid3) {
                              const err1 = { instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/propertyNames", keyword: "propertyNames", params: { propertyName: key1 }, message: "property name must be valid" };
                              if (vErrors === null) {
                                vErrors = [err1];
                              } else {
                                vErrors.push(err1);
                              }
                              errors++;
                              validate29.errors = vErrors;
                              return false;
                              break;
                            }
                          }
                          if (valid3) {
                            for (const key2 in data5) {
                              let data6 = data5[key2];
                              const _errs15 = errors;
                              if (errors === _errs15) {
                                if (Array.isArray(data6)) {
                                  if (data6.length > 50) {
                                    validate29.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                                    return false;
                                  } else {
                                    var valid5 = true;
                                    const len1 = data6.length;
                                    for (let i1 = 0; i1 < len1; i1++) {
                                      let data7 = data6[i1];
                                      const _errs17 = errors;
                                      if (errors === _errs17) {
                                        if (typeof data7 === "string") {
                                          if (func3(data7) > 1024) {
                                            validate29.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i1, schemaPath: "#/definitions/annotations/additionalProperties/items/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                            return false;
                                          }
                                        } else {
                                          validate29.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i1, schemaPath: "#/definitions/annotations/additionalProperties/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid5 = _errs17 === errors;
                                      if (!valid5) {
                                        break;
                                      }
                                    }
                                  }
                                } else {
                                  validate29.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                  return false;
                                }
                              }
                              var valid4 = _errs15 === errors;
                              if (!valid4) {
                                break;
                              }
                            }
                          }
                        } else {
                          validate29.errors = [{ instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                          return false;
                        }
                      }
                      var valid0 = _errs10 === errors;
                    } else {
                      var valid0 = true;
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate29.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate29.errors = vErrors;
    return errors === 0;
  }
  function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.branchIndex === void 0 && (missing0 = "branchIndex") || data.phases === void 0 && (missing0 = "phases")) {
          validate32.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "branchIndex" || key0 === "phases")) {
              validate32.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.branchIndex !== void 0) {
              let data0 = data.branchIndex;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate32.errors = [{ instancePath: instancePath + "/branchIndex", schemaPath: "#/properties/branchIndex/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              if (errors === _errs2) {
                if (typeof data0 == "number" && isFinite(data0)) {
                  if (data0 < 0 || isNaN(data0)) {
                    validate32.errors = [{ instancePath: instancePath + "/branchIndex", schemaPath: "#/properties/branchIndex/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                    return false;
                  }
                }
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.phases !== void 0) {
                let data1 = data.phases;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (Array.isArray(data1)) {
                    if (data1.length < 1) {
                      validate32.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                      return false;
                    } else {
                      var valid1 = true;
                      const len0 = data1.length;
                      for (let i0 = 0; i0 < len0; i0++) {
                        let data2 = data1[i0];
                        const _errs6 = errors;
                        const _errs7 = errors;
                        let valid2 = false;
                        let passing0 = null;
                        const _errs8 = errors;
                        if (!validate26(data2, { instancePath: instancePath + "/phases/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                          vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
                          errors = vErrors.length;
                        }
                        var _valid0 = _errs8 === errors;
                        if (_valid0) {
                          valid2 = true;
                          passing0 = 0;
                        }
                        const _errs9 = errors;
                        if (!validate29(data2, { instancePath: instancePath + "/phases/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                          vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
                          errors = vErrors.length;
                        }
                        var _valid0 = _errs9 === errors;
                        if (_valid0 && valid2) {
                          valid2 = false;
                          passing0 = [passing0, 1];
                        } else {
                          if (_valid0) {
                            valid2 = true;
                            passing0 = 1;
                          }
                        }
                        if (!valid2) {
                          const err0 = { instancePath: instancePath + "/phases/" + i0, schemaPath: "#/properties/phases/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                          if (vErrors === null) {
                            vErrors = [err0];
                          } else {
                            vErrors.push(err0);
                          }
                          errors++;
                          validate32.errors = vErrors;
                          return false;
                        } else {
                          errors = _errs7;
                          if (vErrors !== null) {
                            if (_errs7) {
                              vErrors.length = _errs7;
                            } else {
                              vErrors = null;
                            }
                          }
                        }
                        var valid1 = _errs6 === errors;
                        if (!valid1) {
                          break;
                        }
                      }
                    }
                  } else {
                    validate32.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      } else {
        validate32.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate32.errors = vErrors;
    return errors === 0;
  }
  function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.dealNumber === void 0 && (missing0 = "dealNumber") || data.initialState === void 0 && (missing0 = "initialState") || data.phases === void 0 && (missing0 = "phases")) {
          validate23.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "dealNumber" || key0 === "initialState" || key0 === "phases" || key0 === "alternativeLines")) {
              validate23.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.dealNumber !== void 0) {
              let data0 = data.dealNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate23.errors = [{ instancePath: instancePath + "/dealNumber", schemaPath: "#/properties/dealNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              if (errors === _errs2) {
                if (typeof data0 == "number" && isFinite(data0)) {
                  if (data0 < 0 || isNaN(data0)) {
                    validate23.errors = [{ instancePath: instancePath + "/dealNumber", schemaPath: "#/properties/dealNumber/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                    return false;
                  }
                }
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.initialState !== void 0) {
                let data1 = data.initialState;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
                    let missing1;
                    if (data1.dealer === void 0 && (missing1 = "dealer") || data1.upCard === void 0 && (missing1 = "upCard")) {
                      validate23.errors = [{ instancePath: instancePath + "/initialState", schemaPath: "#/properties/initialState/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                      return false;
                    } else {
                      const _errs6 = errors;
                      for (const key1 in data1) {
                        if (!(key1 === "dealer" || key1 === "upCard" || key1 === "playerCards")) {
                          validate23.errors = [{ instancePath: instancePath + "/initialState", schemaPath: "#/properties/initialState/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                          return false;
                          break;
                        }
                      }
                      if (_errs6 === errors) {
                        if (data1.dealer !== void 0) {
                          let data2 = data1.dealer;
                          const _errs7 = errors;
                          if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
                            validate23.errors = [{ instancePath: instancePath + "/initialState/dealer", schemaPath: "#/properties/initialState/properties/dealer/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                            return false;
                          }
                          if (errors === _errs7) {
                            if (typeof data2 == "number" && isFinite(data2)) {
                              if (data2 > 9 || isNaN(data2)) {
                                validate23.errors = [{ instancePath: instancePath + "/initialState/dealer", schemaPath: "#/properties/initialState/properties/dealer/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                return false;
                              } else {
                                if (data2 < 0 || isNaN(data2)) {
                                  validate23.errors = [{ instancePath: instancePath + "/initialState/dealer", schemaPath: "#/properties/initialState/properties/dealer/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                  return false;
                                }
                              }
                            }
                          }
                          var valid1 = _errs7 === errors;
                        } else {
                          var valid1 = true;
                        }
                        if (valid1) {
                          if (data1.upCard !== void 0) {
                            let data3 = data1.upCard;
                            const _errs9 = errors;
                            const _errs10 = errors;
                            if (errors === _errs10) {
                              if (typeof data3 === "string") {
                                if (!pattern2.test(data3)) {
                                  validate23.errors = [{ instancePath: instancePath + "/initialState/upCard", schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                                  return false;
                                }
                              } else {
                                validate23.errors = [{ instancePath: instancePath + "/initialState/upCard", schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid1 = _errs9 === errors;
                          } else {
                            var valid1 = true;
                          }
                          if (valid1) {
                            if (data1.playerCards !== void 0) {
                              let data4 = data1.playerCards;
                              const _errs12 = errors;
                              if (errors === _errs12) {
                                if (Array.isArray(data4)) {
                                  if (data4.length > 10) {
                                    validate23.errors = [{ instancePath: instancePath + "/initialState/playerCards", schemaPath: "#/properties/initialState/properties/playerCards/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                                    return false;
                                  } else {
                                    var valid3 = true;
                                    const len0 = data4.length;
                                    for (let i0 = 0; i0 < len0; i0++) {
                                      const _errs14 = errors;
                                      if (!validate24(data4[i0], { instancePath: instancePath + "/initialState/playerCards/" + i0, parentData: data4, parentDataProperty: i0, rootData })) {
                                        vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
                                        errors = vErrors.length;
                                      }
                                      var valid3 = _errs14 === errors;
                                      if (!valid3) {
                                        break;
                                      }
                                    }
                                  }
                                } else {
                                  validate23.errors = [{ instancePath: instancePath + "/initialState/playerCards", schemaPath: "#/properties/initialState/properties/playerCards/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                  return false;
                                }
                              }
                              var valid1 = _errs12 === errors;
                            } else {
                              var valid1 = true;
                            }
                          }
                        }
                      }
                    }
                  } else {
                    validate23.errors = [{ instancePath: instancePath + "/initialState", schemaPath: "#/properties/initialState/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.phases !== void 0) {
                  let data6 = data.phases;
                  const _errs15 = errors;
                  if (errors === _errs15) {
                    if (Array.isArray(data6)) {
                      if (data6.length > 2) {
                        validate23.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                        return false;
                      } else {
                        if (data6.length < 0) {
                          validate23.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/minItems", keyword: "minItems", params: { limit: 0 }, message: "must NOT have fewer than 0 items" }];
                          return false;
                        } else {
                          var valid4 = true;
                          const len1 = data6.length;
                          for (let i1 = 0; i1 < len1; i1++) {
                            let data7 = data6[i1];
                            const _errs17 = errors;
                            const _errs18 = errors;
                            let valid5 = false;
                            let passing0 = null;
                            const _errs19 = errors;
                            if (!validate26(data7, { instancePath: instancePath + "/phases/" + i1, parentData: data6, parentDataProperty: i1, rootData })) {
                              vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
                              errors = vErrors.length;
                            }
                            var _valid0 = _errs19 === errors;
                            if (_valid0) {
                              valid5 = true;
                              passing0 = 0;
                            }
                            const _errs20 = errors;
                            if (!validate29(data7, { instancePath: instancePath + "/phases/" + i1, parentData: data6, parentDataProperty: i1, rootData })) {
                              vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
                              errors = vErrors.length;
                            }
                            var _valid0 = _errs20 === errors;
                            if (_valid0 && valid5) {
                              valid5 = false;
                              passing0 = [passing0, 1];
                            } else {
                              if (_valid0) {
                                valid5 = true;
                                passing0 = 1;
                              }
                            }
                            if (!valid5) {
                              const err0 = { instancePath: instancePath + "/phases/" + i1, schemaPath: "#/properties/phases/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                              if (vErrors === null) {
                                vErrors = [err0];
                              } else {
                                vErrors.push(err0);
                              }
                              errors++;
                              validate23.errors = vErrors;
                              return false;
                            } else {
                              errors = _errs18;
                              if (vErrors !== null) {
                                if (_errs18) {
                                  vErrors.length = _errs18;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                            var valid4 = _errs17 === errors;
                            if (!valid4) {
                              break;
                            }
                          }
                        }
                      }
                    } else {
                      validate23.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs15 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.alternativeLines !== void 0) {
                    let data8 = data.alternativeLines;
                    const _errs21 = errors;
                    if (errors === _errs21) {
                      if (Array.isArray(data8)) {
                        if (data8.length > 50) {
                          validate23.errors = [{ instancePath: instancePath + "/alternativeLines", schemaPath: "#/properties/alternativeLines/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                          return false;
                        } else {
                          var valid6 = true;
                          const len2 = data8.length;
                          for (let i2 = 0; i2 < len2; i2++) {
                            const _errs23 = errors;
                            if (!validate32(data8[i2], { instancePath: instancePath + "/alternativeLines/" + i2, parentData: data8, parentDataProperty: i2, rootData })) {
                              vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                              errors = vErrors.length;
                            }
                            var valid6 = _errs23 === errors;
                            if (!valid6) {
                              break;
                            }
                          }
                        }
                      } else {
                        validate23.errors = [{ instancePath: instancePath + "/alternativeLines", schemaPath: "#/properties/alternativeLines/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs21 === errors;
                  } else {
                    var valid0 = true;
                  }
                }
              }
            }
          }
        }
      } else {
        validate23.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate23.errors = vErrors;
    return errors === 0;
  }

  // src/validator.ts
  var precompiledValidateEgn = validateEgn;
  var precompiledValidateDeal = validateDeal;
  function validateEgn2(data) {
    const isValid = Boolean(precompiledValidateEgn(data));
    return {
      isValid,
      errors: precompiledValidateEgn.errors ?? null
    };
  }
  function validateDeal2(data) {
    const isValid = Boolean(precompiledValidateDeal(data));
    return {
      isValid,
      errors: precompiledValidateDeal.errors ?? null
    };
  }
  function isEgnFile(data) {
    return Boolean(precompiledValidateEgn(data));
  }
  function isDeal(data) {
    return Boolean(precompiledValidateDeal(data));
  }
  var validateEGN = validateEgn2;
  var isEGNFile = isEgnFile;

  // src/converter.ts
  var fs = __toESM(require_browser_shims());
  var import_protobufjs = __toESM(require_protobufjs());
  init_bitpacker();

  // src/proto-schemas.ts
  var COMMON_PROTO_SCHEMA = 'syntax = "proto3";\n\npackage egn;\n\nmessage Ruleset {\n  optional bool std = 1;\n  optional int32 min_rank = 2;\n  optional int32 winning_score = 3;\n  optional bool canadian = 4;\n\n  enum LonerLead {\n    LEFT_OF_DEALER = 0;\n    LEFT_OF_LONER = 1;\n  }\n  optional LonerLead loner_lead = 5;\n\n  optional bool farmers = 6;\n  optional bool partners_best = 7;\n  optional bool go_under = 8;\n  optional bool joker = 9;\n  optional bool allow_no_trump = 10;\n  optional bool fast_break = 11;\n  optional bool four_trick_tokens = 12;\n  optional int32 loner_march_score = 13;\n  optional int32 loner_euchred_score = 14;\n  optional bool defend_alone = 15;\n  optional int32 num_players = 16;\n  optional int32 num_deals = 17;\n}\n\nmessage Metadata {\n  optional string game_id = 1;\n  optional string title = 2;\n  optional string description = 3;\n  repeated Player players = 4;\n  repeated int32 initial_score = 5;\n  repeated int32 final_score = 8;\n  optional string date = 6; // ISO 8601 formatted date-time string\n  Ruleset ruleset = 7;\n  repeated string team_names = 9;\n}\n\nmessage Player {\n  oneof player {\n    string name = 1;\n    PlayerWithId player_with_id = 2;\n  }\n}\n\nmessage PlayerWithId {\n  string name = 1;\n  repeated Id ids = 2;\n}\n\nmessage MatchPlayer {\n  string id = 1;\n  string name = 2;\n  repeated Id player_ids = 3;\n}\n\nmessage Id {\n  string id = 1;\n  string source = 2;\n}\n';
  var CONDENSED_PROTO_SCHEMA = 'syntax = "proto3";\n\npackage egn;\n\nimport "egn-common.proto";\n\nmessage EgnFile {\n  string file_type = 1; // Constant: "Euchre Game Notation"\n  string version = 2;\n  Metadata metadata = 3;\n  repeated string deals = 4; // Array of Base64/Base64URL encoded condensed representation of the deals\n}\n';
  var EXPANDED_PROTO_SCHEMA = 'syntax = "proto3";\n\npackage egn;\n\nimport "egn-common.proto";\n\nmessage CardList {\n  repeated string cards = 1;\n}\n\nmessage AnnotationList {\n  repeated string texts = 1;\n}\n\nmessage InitialState {\n  optional int32 dealer = 1;\n  optional string up_card = 2;\n  repeated CardList playerCards = 4;\n}\n\nmessage BiddingPhase {\n  optional int32 phase_number = 1;\n  repeated string calls = 2;\n  optional bool is_alone = 3;\n  optional int32 alone_defender = 4; // Seat index defending alone against loner, or -1 if none\n  optional string discard = 5;\n\n  message CardExchange {\n    optional int32 sender = 1;\n    optional int32 receiver = 2;\n    repeated string cards = 3;\n  }\n  repeated CardExchange cardExchanges = 6;\n\n  map<int32, AnnotationList> callAnnotations = 7;\n}\n\nmessage TrickPlayPhase {\n  optional int32 phase_number = 1;\n\n  message Trick {\n    repeated string cards = 1;\n  }\n  repeated Trick tricks = 3;\n\n  map<int32, AnnotationList> playAnnotations = 4;\n}\n\nmessage Phase {\n  oneof phase {\n    BiddingPhase bidding = 1;\n    TrickPlayPhase play = 2;\n  }\n}\n\nmessage AlternativeLine {\n  optional int32 branch_index = 1;\n  repeated Phase phases = 2;\n}\n\nmessage Deal {\n  optional int32 deal_number = 1;\n  InitialState initial_state = 2;\n  repeated Phase phases = 3;\n  repeated AlternativeLine alternative_lines = 4;\n}\n\nmessage EgnFile {\n  optional string file_type = 1; // Constant: "Euchre Game Notation"\n  optional string version = 2;\n  Metadata metadata = 3;\n  repeated Deal deals = 4; // Expanded array of deals\n}\n';
  var EMN_PROTO_SCHEMA = 'syntax = "proto3";\n\npackage egn;\n\nimport "egn-common.proto";\n\nmessage MatchFormat {\n  enum MatchType {\n    BEST_OF_N = 0;\n    PROGRESSIVE = 1;\n    ROUND_ROBIN = 2;\n    CUSTOM = 3;\n    FIXED_GAMES = 4;\n    TARGET_SCORE = 5;\n    ELIMINATION = 6;\n    SWISS = 7;\n    TIMED = 8;\n    SINGLE_GAME = 9;\n  }\n  MatchType type = 1;\n  optional int32 target = 2;\n}\n\nmessage MatchResult {\n  enum Status {\n    COMPLETED = 0;\n    IN_PROGRESS = 1;\n    FORFEIT = 2;\n    DRAW = 3;\n  }\n  Status status = 1;\n  repeated string winner = 2; // Winning player ID(s) or team key\n  map<string, double> scores = 3; // Player ID / team key -> score metric\n}\n\nmessage MatchTeam {\n  string id = 1;\n  string name = 2;\n  repeated string player_ids = 3;\n  optional string color = 4;\n}\n\nmessage MatchMetadata {\n  optional string match_id = 1;\n  optional string title = 2;\n  optional string description = 3;\n  repeated MatchPlayer players = 4;\n  optional string date = 5;\n  MatchFormat match_format = 6;\n  MatchResult result = 7;\n  repeated MatchTeam teams = 8;\n}\n\nmessage GameEntry {\n  int32 game_index = 1;\n  repeated string players_override = 2; // Exactly 4 player ID references mapping to seats (0: North, 1: East, 2: South, 3: West)\n  oneof game_data {\n    string egn_json = 3;          // Stringified JSON EGN\n    bytes egn_protobuf_bytes = 4; // Serialized Protobuf EGN\n  }\n}\n\nmessage MatchFile {\n  string file_type = 1; // "Euchre Match Notation"\n  string version = 2;\n  MatchMetadata metadata = 3;\n  repeated GameEntry games = 4;\n}\n';

  // src/converter.ts
  var MAGIC_BYTE_EXPANDED = 0;
  var MAGIC_BYTE_CONDENSED = 1;
  var MAX_BINARY_DATA_BYTES = 8 * 1024 * 1024;
  var loadedCondensedRoot = null;
  var loadedExpandedRoot = null;
  function buildProtobufRoot(schema) {
    const root = new import_protobufjs.default.Root();
    import_protobufjs.default.parse(COMMON_PROTO_SCHEMA, root, { keepCase: true });
    import_protobufjs.default.parse(schema, root, { keepCase: true });
    return root;
  }
  function getProtobufRoot(condensed) {
    if (condensed) {
      if (!loadedCondensedRoot) {
        loadedCondensedRoot = buildProtobufRoot(CONDENSED_PROTO_SCHEMA);
      }
      return loadedCondensedRoot;
    } else {
      if (!loadedExpandedRoot) {
        loadedExpandedRoot = buildProtobufRoot(EXPANDED_PROTO_SCHEMA);
      }
      return loadedExpandedRoot;
    }
  }
  function getLonerLeadEnum(condensed) {
    const root = getProtobufRoot(condensed);
    return root.lookupEnum("egn.Ruleset.LonerLead");
  }
  function createSafeMap() {
    return /* @__PURE__ */ Object.create(null);
  }
  function assertAnnotationIndexKey(key) {
    if (!/^\d+$/.test(key)) {
      throw new Error(`Invalid annotation map key: ${key}. Annotation keys must be numeric.`);
    }
  }
  function formatValidationErrors(errors) {
    if (!errors || errors.length === 0) {
      return "Unknown validation error";
    }
    return errors.map((error) => `${error.instancePath || "/"} ${error.message || "is invalid"}`.trim()).join("; ");
  }
  function assertValidEgnFile(egnFile, context) {
    const validation = validateEgn2(egnFile);
    if (!validation.isValid) {
      throw new Error(`${context}: ${formatValidationErrors(validation.errors)}`);
    }
  }
  function assertBinaryDataSize(binData, context) {
    if (binData.length > MAX_BINARY_DATA_BYTES) {
      throw new Error(`${context}: binary data exceeds ${MAX_BINARY_DATA_BYTES} bytes`);
    }
  }
  function assertNumericAnnotationKeys(value) {
    if (!value || typeof value !== "object") {
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        assertNumericAnnotationKeys(item);
      }
      return;
    }
    const record = value;
    for (const [key, child] of Object.entries(record)) {
      if ((key === "callAnnotations" || key === "playAnnotations") && child && typeof child === "object") {
        for (const annotationKey of Object.keys(child)) {
          assertAnnotationIndexKey(annotationKey);
        }
      }
      assertNumericAnnotationKeys(child);
    }
  }
  var protoToJsonKeyMap = {
    file_type: "fileType",
    game_id: "gameId",
    team_names: "teamNames",
    initial_score: "initialScore",
    final_score: "finalScore",
    deal_number: "dealNumber",
    initial_state: "initialState",
    up_card: "upCard",
    phase_number: "phaseNumber",
    is_alone: "isAlone",
    alone_defender: "aloneDefender",
    branch_index: "branchIndex",
    alternative_lines: "alternativeLines"
  };
  var jsonToProtoKeyMap = {
    fileType: "file_type",
    gameId: "game_id",
    teamNames: "team_names",
    initialScore: "initial_score",
    finalScore: "final_score",
    dealNumber: "deal_number",
    initialState: "initial_state",
    upCard: "up_card",
    phaseNumber: "phase_number",
    isAlone: "is_alone",
    aloneDefender: "alone_defender",
    branchIndex: "branch_index",
    alternativeLines: "alternative_lines"
  };
  function mapProtoToEgn(protoObj) {
    if (protoObj === null || protoObj === void 0) return protoObj;
    if (Array.isArray(protoObj)) {
      return protoObj.map(mapProtoToEgn);
    }
    if (typeof protoObj === "object") {
      const res = {};
      for (const key of Object.keys(protoObj)) {
        const val = protoObj[key];
        const mappedKey = protoToJsonKeyMap[key] || key;
        if (mappedKey === "finalScore" && Array.isArray(val) && val.length === 0) {
          continue;
        }
        if (mappedKey === "teamNames" && Array.isArray(val) && val.length === 0) {
          continue;
        }
        if (key === "playerCards" && Array.isArray(val)) {
          res["playerCards"] = val.map((item) => item.cards || []);
          continue;
        }
        if (key === "players" && Array.isArray(val)) {
          res["players"] = val.map((player) => {
            if (typeof player === "string") {
              return player;
            }
            if (player && typeof player === "object" && typeof player.name === "string" && !player.player_with_id) {
              return player.name;
            }
            const nested = player?.player_with_id ?? player;
            if (!nested || typeof nested !== "object") {
              return player;
            }
            const mapped = { name: nested.name ?? "" };
            if (Array.isArray(nested.ids)) {
              mapped.playerIds = nested.ids.map((idObj) => ({
                id: idObj?.id ?? "",
                source: idObj?.source ?? ""
              }));
            }
            return mapped;
          });
          continue;
        }
        if (key === "tricks" && Array.isArray(val)) {
          res["tricks"] = val.map((item) => item.cards || []);
          continue;
        }
        if (key === "phases" && Array.isArray(val)) {
          res["phases"] = val.map((p) => {
            if (p.bidding) {
              const biddingJson = mapProtoToEgn(p.bidding);
              biddingJson.type = "EUCHRE_BIDDING";
              return biddingJson;
            } else if (p.play) {
              const playJson = mapProtoToEgn(p.play);
              playJson.type = "TRICK_PLAY";
              return playJson;
            }
            return mapProtoToEgn(p);
          });
          continue;
        }
        if ((key === "callAnnotations" || key === "playAnnotations") && typeof val === "object" && val !== null) {
          const mappedAnn = createSafeMap();
          for (const annKey of Object.keys(val)) {
            assertAnnotationIndexKey(annKey);
            const numKey = Number(annKey);
            const valObj = val[annKey];
            const texts = valObj ? valObj.texts || [] : [];
            mappedAnn[numKey] = texts;
          }
          res[mappedKey] = mappedAnn;
          continue;
        }
        res[mappedKey] = mapProtoToEgn(val);
      }
      return res;
    }
    return protoObj;
  }
  function detectBinaryFormatFromData(binData) {
    assertBinaryDataSize(binData, "Binary input too large for format detection");
    if (binData.length === 0) {
      return null;
    }
    const magicByte = binData[0];
    if (magicByte === MAGIC_BYTE_CONDENSED) return "condensed";
    if (magicByte === MAGIC_BYTE_EXPANDED) return "expanded";
    return null;
  }
  function detectBinaryFormat(binFilePath) {
    try {
      return detectBinaryFormatFromData(fs.readFileSync(binFilePath));
    } catch {
      return null;
    }
  }
  function mapEgnToProto(jsonObj, condensed) {
    if (jsonObj === null || jsonObj === void 0) return jsonObj;
    if (Array.isArray(jsonObj)) {
      return jsonObj.map((p) => mapEgnToProto(p, condensed));
    }
    if (typeof jsonObj === "object") {
      const res = {};
      for (const key of Object.keys(jsonObj)) {
        const val = jsonObj[key];
        const mappedKey = jsonToProtoKeyMap[key] || key;
        if (key === "loner_lead" && typeof val === "string") {
          const enumType = getLonerLeadEnum(condensed);
          res["loner_lead"] = enumType.values[val];
          continue;
        }
        if (key === "players" && Array.isArray(val)) {
          res["players"] = val.map((player) => {
            if (typeof player === "string") {
              return { name: player };
            }
            const ids = Array.isArray(player?.playerIds) ? player.playerIds.map((idObj) => ({
              id: idObj?.id ?? "",
              source: idObj?.source ?? ""
            })) : [];
            return {
              player_with_id: {
                name: player?.name ?? "",
                ids
              }
            };
          });
          continue;
        }
        if (key === "playerCards") {
          res["playerCards"] = val.map((cards) => ({ cards }));
          continue;
        }
        if (key === "tricks") {
          res["tricks"] = val.map((cards) => ({ cards }));
          continue;
        }
        if (key === "phases" && Array.isArray(val)) {
          res["phases"] = val.map((p) => {
            const mappedPhase = mapEgnToProto(p, condensed);
            delete mappedPhase.type;
            if (p.type === "EUCHRE_BIDDING") {
              return { bidding: mappedPhase };
            } else if (p.type === "TRICK_PLAY") {
              return { play: mappedPhase };
            }
            return mappedPhase;
          });
          continue;
        }
        if ((key === "callAnnotations" || key === "playAnnotations") && typeof val === "object" && val !== null) {
          const mappedAnn = createSafeMap();
          for (const annKey of Object.keys(val)) {
            assertAnnotationIndexKey(annKey);
            const numKey = Number(annKey);
            const texts = val[annKey];
            const valObj = { texts: Array.isArray(texts) ? texts : texts ? [texts] : [] };
            mappedAnn[numKey] = valObj;
          }
          res[mappedKey] = mappedAnn;
          continue;
        }
        res[mappedKey] = mapEgnToProto(val, condensed);
      }
      return res;
    }
    return jsonObj;
  }
  function resolveCondensedMode(binData, condensed) {
    assertBinaryDataSize(binData, "Binary input too large for conversion");
    if (condensed === void 0) {
      if (binData.length === 0) {
        throw new Error("Binary file is empty");
      }
      const detected = detectBinaryFormatFromData(binData);
      if (detected !== null) {
        return detected === "condensed";
      } else {
        return true;
      }
    }
    return condensed;
  }
  function stripMagicByte(binData) {
    if (binData.length > 1 && (binData[0] === MAGIC_BYTE_CONDENSED || binData[0] === MAGIC_BYTE_EXPANDED)) {
      return binData.slice(1);
    }
    return binData;
  }
  function normalizeEgnForEncoding(egnFile, condensed) {
    const jsonObj = JSON.parse(JSON.stringify(egnFile));
    if (Array.isArray(jsonObj.deals)) {
      if (condensed) {
        const numPlayers = jsonObj.metadata?.ruleset?.num_players ?? 4;
        const minRank = jsonObj.metadata?.ruleset?.min_rank ?? 9;
        jsonObj.deals = jsonObj.deals.map((d) => {
          if (typeof d === "object" && d !== null) {
            return packDeal(d, { numPlayers, minRank });
          }
          return d;
        });
      } else {
        jsonObj.deals = jsonObj.deals.map((d, idx) => {
          if (typeof d === "string") {
            return unpackDeal(d, idx);
          }
          return d;
        });
      }
    }
    return jsonObj;
  }
  function convertBinDataToEgnFile(binData, condensed) {
    const resolvedCondensed = resolveCondensedMode(binData, condensed);
    const root = getProtobufRoot(resolvedCondensed);
    const EgnFileMessage = root.lookupType("egn.EgnFile");
    const protoBuffer = stripMagicByte(binData);
    const message = EgnFileMessage.decode(protoBuffer);
    const rawObj = EgnFileMessage.toObject(message, {
      arrays: true,
      longs: String,
      enums: String,
      defaults: false
    });
    const mappedObj = mapProtoToEgn(rawObj);
    if (resolvedCondensed && Array.isArray(mappedObj.deals)) {
      mappedObj.deals = mappedObj.deals.map((dealStr, idx) => {
        if (typeof dealStr === "string") {
          return unpackDeal(dealStr, idx);
        }
        return dealStr;
      });
    }
    if (Array.isArray(mappedObj.deals)) {
      mappedObj.deals.forEach((deal) => {
        if (deal && typeof deal === "object") {
          const normalizePhases = (phases) => {
            if (Array.isArray(phases)) {
              phases.forEach((ph, idx) => {
                if (ph.type === "EUCHRE_BIDDING") {
                  ph.phaseNumber = 0;
                } else if (ph.type === "TRICK_PLAY" || ph.type === "TRICK_PLAY_PHASE") {
                  ph.phaseNumber = 1;
                } else if (typeof ph.phaseNumber === "number" && ph.phaseNumber > 0 && phases.length <= 2) {
                  ph.phaseNumber = idx;
                }
              });
            }
          };
          normalizePhases(deal.phases);
          if (Array.isArray(deal.alternativeLines)) {
            deal.alternativeLines.forEach((alt) => {
              if (alt && typeof alt === "object") {
                normalizePhases(alt.phases);
              }
            });
          }
        }
      });
    }
    assertValidEgnFile(mappedObj, "Decoded binary failed EGN schema validation");
    return mappedObj;
  }
  function convertBinDataToEgnJson(binData, condensed) {
    return JSON.stringify(convertBinDataToEgnFile(binData, condensed), null, 2);
  }
  function convertBinToEgnJson(binFilePath, condensed) {
    return convertBinDataToEgnJson(fs.readFileSync(binFilePath), condensed);
  }
  function convertEgnFileToBinData(egnFile, condensed = true) {
    assertNumericAnnotationKeys(egnFile);
    assertValidEgnFile(egnFile, "Input EGN failed schema validation before binary conversion");
    const root = getProtobufRoot(condensed);
    const EgnFileMessage = root.lookupType("egn.EgnFile");
    const mappedObj = mapEgnToProto(normalizeEgnForEncoding(egnFile, condensed), condensed);
    const errMsg = EgnFileMessage.verify(mappedObj);
    if (errMsg) throw new Error("Protobuf verification failed: " + errMsg);
    const message = EgnFileMessage.create(mappedObj);
    const protoBuffer = EgnFileMessage.encode(message).finish();
    const finalBuffer = new Uint8Array(protoBuffer.length + 1);
    finalBuffer[0] = condensed ? MAGIC_BYTE_CONDENSED : MAGIC_BYTE_EXPANDED;
    finalBuffer.set(protoBuffer, 1);
    assertBinaryDataSize(finalBuffer, "Encoded binary output too large");
    return finalBuffer;
  }
  function convertEgnJsonToBin(egnJsonStr, outBinFilePath, condensed = true) {
    fs.writeFileSync(outBinFilePath, convertEgnJsonToBinData(egnJsonStr, condensed));
  }
  function convertEgnJsonToBinData(egnJsonStr, condensed = true) {
    return convertEgnFileToBinData(JSON.parse(egnJsonStr), condensed);
  }
  function unpackEgnFile(egnFile) {
    assertValidEgnFile(egnFile, "Input EGN failed schema validation before unpacking");
    const cloned = JSON.parse(JSON.stringify(egnFile));
    if (Array.isArray(cloned.deals)) {
      cloned.deals = cloned.deals.map((d, idx) => {
        if (typeof d === "string") {
          return unpackDeal(d, idx);
        }
        return d;
      });
    }
    return cloned;
  }
  function packEgnFile(egnFile) {
    assertValidEgnFile(egnFile, "Input EGN failed schema validation before packing");
    const cloned = JSON.parse(JSON.stringify(egnFile));
    if (Array.isArray(cloned.deals)) {
      const numPlayers = cloned.metadata?.ruleset?.num_players ?? 4;
      const minRank = cloned.metadata?.ruleset?.min_rank ?? 9;
      cloned.deals = cloned.deals.map((d) => {
        if (typeof d === "object" && d !== null) {
          return packDeal(d, { numPlayers, minRank });
        }
        return d;
      });
    }
    return cloned;
  }

  // src/workbench/entry.ts
  init_bitpacker();
  init_bitstream();
  init_card_encoding();

  // src/match-engine.ts
  function isGenericMatchFile(data) {
    if (!data || typeof data !== "object" || data === null) return false;
    const candidate = data;
    return typeof candidate.fileType === "string" && typeof candidate.version === "string" && typeof candidate.metadata === "object" && candidate.metadata !== null && Array.isArray(candidate.games);
  }
  function extractGameFromMatch(matchFile, gameIndex, validator) {
    if (gameIndex < 0 || gameIndex >= matchFile.games.length) {
      throw new Error(`Game index ${gameIndex} out of bounds for match containing ${matchFile.games.length} games.`);
    }
    const gameEntry = matchFile.games.find((g) => g.gameIndex === gameIndex);
    if (!gameEntry) {
      throw new Error(`Game index ${gameIndex} not found in the match file.`);
    }
    const masterPlayers = matchFile.metadata?.players || [];
    const playerMap = /* @__PURE__ */ new Map();
    masterPlayers.forEach((p) => {
      playerMap.set(p.id, p.name);
    });
    const game = JSON.parse(JSON.stringify(gameEntry.gameData));
    if (Array.isArray(gameEntry.playersOverride)) {
      const seatPlayerNames = gameEntry.playersOverride.map((pid) => {
        const name = playerMap.get(pid);
        if (!name) {
          throw new Error(`Master player ID "${pid}" in game index ${gameIndex} could not be resolved.`);
        }
        return name;
      });
      if (!game.metadata) {
        game.metadata = {};
      }
      game.metadata.players = seatPlayerNames;
    }
    if (validator) {
      const validation = validator(game);
      if (!validation.isValid) {
        throw new Error(`Extracted game for index ${gameIndex} is invalid: ${JSON.stringify(validation.errors)}`);
      }
    }
    return game;
  }
  function extractAllGamesFromMatch(matchFile, validator) {
    const sortedGames = [...matchFile.games].sort((a, b) => a.gameIndex - b.gameIndex);
    return sortedGames.map((g) => extractGameFromMatch(matchFile, g.gameIndex, validator));
  }

  // src/engine/rules.ts
  var isPass = (c) => c === "Pass" || c === "p";
  var isOrder = (c) => c === "Order" || c === "o";
  function determineTrump(deal) {
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING") return null;
    const upcardSuit = deal.initialState.upCard ? deal.initialState.upCard[1].toLowerCase() : null;
    const callIndex = bidding.calls.findIndex((c) => !isPass(c));
    if (callIndex === -1) return null;
    const call = bidding.calls[callIndex];
    if (callIndex < 4) {
      if (isOrder(call)) return upcardSuit;
    } else {
      if (["s", "h", "c", "d"].includes(call.toLowerCase())) return call.toLowerCase();
    }
    return null;
  }
  function determineMaker(deal) {
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING") return null;
    const dealer = deal.initialState.dealer ?? 0;
    const callIndex = bidding.calls.findIndex((c) => !isPass(c));
    if (callIndex === -1) return null;
    return (dealer + callIndex + 1) % 4;
  }
  function determineIsAlone(deal) {
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING") return false;
    return Boolean(bidding.isAlone);
  }
  function determineLeadSeat(deal, lonerLead = "LEFT_OF_DEALER") {
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING") return 0;
    const dealer = deal.initialState.dealer ?? 0;
    const maker = determineMaker(deal);
    if (bidding.isAlone && maker !== null) {
      if (lonerLead === "LEFT_OF_LONER") {
        return (maker + 1) % 4;
      } else if (maker === (dealer + 3) % 4) {
        return (dealer + 2) % 4;
      }
    }
    return (dealer + 1) % 4;
  }
  function getLeftBowerSuit(trump) {
    const t = trump.toLowerCase();
    if (t === "d") return "h";
    if (t === "h") return "d";
    if (t === "s") return "c";
    if (t === "c") return "s";
    return null;
  }
  function getCardValue(card, ledSuit, trump) {
    if (!card) return -1;
    const rank = card[0];
    const suit = card[1].toLowerCase();
    const t = trump.toLowerCase();
    const led = ledSuit.toLowerCase();
    if (rank === "J" && suit === t) return 100;
    const isLeftBower = rank === "J" && suit === getLeftBowerSuit(t);
    if (isLeftBower) return 99;
    if (suit === t) {
      const trumpRankValues = { A: 14, K: 13, Q: 12, T: 10, "9": 9, "8": 8, "7": 7 };
      return 80 + (trumpRankValues[rank] || 0);
    }
    if (suit === led) {
      const ledRankValues = { A: 14, K: 13, Q: 12, J: 11, T: 10, "9": 9, "8": 8, "7": 7 };
      return 40 + (ledRankValues[rank] || 0);
    }
    return 0;
  }
  function getWinnerIndex(trickCards, trump) {
    if (!trickCards || trickCards.length === 0) return 0;
    const ledSuit = trickCards[0][1].toLowerCase();
    let bestVal = -1;
    let bestIndex = 0;
    trickCards.forEach((card, index) => {
      const val = getCardValue(card, ledSuit, trump);
      if (val > bestVal) {
        bestVal = val;
        bestIndex = index;
      }
    });
    return bestIndex;
  }
  function getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat) {
    let player = leadSeat;
    let count = 0;
    while (count < cardIndex) {
      player = (player + 1) % 4;
      if (player !== sitOutSeat) {
        count++;
      }
    }
    return player;
  }
  function parseDealInput(deal) {
    if (typeof deal !== "string") {
      return deal;
    }
    const trimmed = deal.trim();
    if (trimmed.startsWith("{")) {
      return JSON.parse(trimmed);
    }
    if (typeof __require !== "undefined") {
      try {
        const bp = (init_bitpacker(), __toCommonJS(bitpacker_exports));
        if (typeof bp.unpackDeal === "function") {
          return bp.unpackDeal(trimmed, 0);
        }
      } catch {
      }
    }
    if (typeof window !== "undefined") {
      const win = window;
      if (win.EuchreNotation && typeof win.EuchreNotation.unpackDeal === "function") {
        return win.EuchreNotation.unpackDeal(trimmed, 0);
      }
      if (typeof win.unpackDeal === "function") {
        return win.unpackDeal(trimmed, 0);
      }
    }
    throw new Error("Cannot unpack condensed base64 deal string: unpackDeal is not available in this environment.");
  }
  function inferPlayerCards(deal, ruleset) {
    const parsedDeal = parseDealInput(deal);
    const rawPlayerCards = parsedDeal.initialState?.playerCards;
    if (Array.isArray(rawPlayerCards) && rawPlayerCards.length === 4 && rawPlayerCards.every((hand) => Array.isArray(hand) && hand.length === 5)) {
      return rawPlayerCards.map((h) => [...h]);
    }
    const dealer = parsedDeal.initialState?.dealer ?? 0;
    const biddingPhase = parsedDeal.phases ? parsedDeal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    let sitOutSeat = null;
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
      const isAlone = Boolean(biddingPhase.isAlone);
      const callIndex = biddingPhase.calls.findIndex((c) => !isPass(c));
      if (callIndex !== -1 && isAlone) {
        const callerSeat = (dealer + 1 + callIndex) % 4;
        sitOutSeat = (callerSeat + 2) % 4;
      }
    }
    const hands = [[], [], [], []];
    const preserveSitOutHands = () => {
      if (sitOutSeat !== null && Array.isArray(rawPlayerCards?.[sitOutSeat]) && rawPlayerCards[sitOutSeat].length > 0) {
        hands[sitOutSeat] = [...rawPlayerCards[sitOutSeat]];
      }
      if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING" && ruleset?.defend_alone && biddingPhase.aloneDefender !== void 0) {
        const defenderPartner = (biddingPhase.aloneDefender + 2) % 4;
        if (Array.isArray(rawPlayerCards?.[defenderPartner]) && rawPlayerCards[defenderPartner].length > 0) {
          hands[defenderPartner] = [...rawPlayerCards[defenderPartner]];
        }
      }
    };
    if (!parsedDeal.phases) {
      preserveSitOutHands();
      return hands;
    }
    const playPhase = parsedDeal.phases.find((p) => p.type === "TRICK_PLAY");
    if (!playPhase || !Array.isArray(playPhase.tricks)) {
      preserveSitOutHands();
      return hands;
    }
    const trump = determineTrump(parsedDeal);
    let leadSeat = determineLeadSeat(parsedDeal, ruleset?.loner_lead ?? "LEFT_OF_DEALER");
    const numExpectedPlayers = sitOutSeat !== null ? 3 : 4;
    playPhase.tricks.forEach((trickCards) => {
      trickCards.forEach((card, cardIndex) => {
        const playerIndex = getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat);
        hands[playerIndex].push(card);
      });
      if (trickCards.length === numExpectedPlayers && trump) {
        const winnerIndex = getWinnerIndex(trickCards, trump);
        leadSeat = getPlayerIndexInTrick(leadSeat, winnerIndex, sitOutSeat);
      } else {
        leadSeat = getPlayerIndexInTrick(leadSeat, 1, sitOutSeat);
      }
    });
    const orderCallIndex = biddingPhase ? biddingPhase.calls.findIndex((c) => !isPass(c)) : -1;
    const isOrderedUp = orderCallIndex >= 0 && orderCallIndex < 4;
    const discard = biddingPhase?.discard;
    const upCard = parsedDeal.initialState?.upCard;
    if (isOrderedUp && upCard && discard) {
      const upcardIdx = hands[dealer].indexOf(upCard);
      if (upcardIdx !== -1) {
        hands[dealer].splice(upcardIdx, 1);
        hands[dealer].push(discard);
      } else if (!hands[dealer].includes(discard)) {
        hands[dealer].push(discard);
      }
    }
    preserveSitOutHands();
    return hands;
  }
  function calculatePlayerCards(deal, ruleset) {
    return inferPlayerCards(deal, ruleset);
  }
  function compileDealSteps(deal, metadata = {}) {
    const players = (metadata.players || ["Player 0", "Player 1", "Player 2", "Player 3"]).map(
      (p) => typeof p === "string" ? p : p.name
    );
    const ruleset = metadata.ruleset;
    let aloneSeat = null;
    let sitOutSeat = null;
    let callingTeam = 0;
    let isAlone = false;
    let callerSeat = null;
    const biddingPhase = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
      isAlone = Boolean(biddingPhase.isAlone);
      const callIndex = biddingPhase.calls.findIndex((c) => !isPass(c));
      if (callIndex !== -1) {
        const dealer2 = deal.initialState.dealer ?? 0;
        callerSeat = (dealer2 + 1 + callIndex) % 4;
        aloneSeat = callerSeat;
        if (isAlone) {
          sitOutSeat = (aloneSeat + 2) % 4;
        }
        callingTeam = callerSeat % 2;
      }
    }
    const initialHands = inferPlayerCards(deal, ruleset);
    const dealer = deal.initialState.dealer ?? 0;
    const upCard = deal.initialState.upCard;
    const orderCallIndex = biddingPhase ? biddingPhase.calls.findIndex((c) => !isPass(c)) : -1;
    const isOrderedUp = orderCallIndex >= 0 && orderCallIndex < 4;
    const discard = biddingPhase?.discard;
    const hasDiscard = Boolean(isOrderedUp && upCard && discard);
    const compiled = [];
    compiled.push({
      type: "INITIAL",
      description: "Initial Deal",
      annotation: "Cards dealt. Upcard is turned up.",
      hands: initialHands,
      playedCards: [null, null, null, null],
      bidCall: null,
      sitOutSeat,
      callingTeam,
      callingTeamTricks: 0,
      defendingTeamTricks: 0
    });
    if (!deal.phases) return compiled;
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
      let caller = (dealer + 1) % 4;
      biddingPhase.calls.forEach((call, index) => {
        const annot = biddingPhase.callAnnotations ? biddingPhase.callAnnotations[index] : null;
        const currentHands = compiled[compiled.length - 1].hands.map((h) => [...h]);
        if (hasDiscard && index === orderCallIndex && upCard && discard) {
          const discIdx = currentHands[dealer].indexOf(discard);
          if (discIdx !== -1) {
            currentHands[dealer].splice(discIdx, 1);
          } else {
            currentHands[dealer] = currentHands[dealer].filter((c) => c !== discard);
          }
          if (!currentHands[dealer].includes(upCard)) {
            currentHands[dealer].push(upCard);
          }
        }
        let stepAnnotation = Array.isArray(annot) ? annot.join("\n") : annot || `Player ${caller} called: ${call}`;
        if (hasDiscard && index === orderCallIndex && biddingPhase.callAnnotations) {
          const discardAnnot = biddingPhase.callAnnotations[16] ?? biddingPhase.callAnnotations["16"];
          if (discardAnnot) {
            const discardText = Array.isArray(discardAnnot) ? discardAnnot.join("\n") : String(discardAnnot);
            stepAnnotation = annot ? `${stepAnnotation}
[Discard] ${discardText}` : `Player ${caller} called: ${call}
[Discard] ${discardText}`;
          }
        }
        compiled.push({
          type: "BID",
          description: `Bidding: ${players[caller]}`,
          annotation: stepAnnotation,
          hands: currentHands,
          playedCards: [null, null, null, null],
          bidCall: { seat: caller, call },
          callIndex: index,
          sitOutSeat,
          callingTeam,
          callingTeamTricks: 0,
          defendingTeamTricks: 0
        });
        caller = (caller + 1) % 4;
      });
    }
    let callingTeamTricks = 0;
    let defendingTeamTricks = 0;
    const playPhase = deal.phases.find((p) => p.type === "TRICK_PLAY");
    if (playPhase && playPhase.type === "TRICK_PLAY") {
      const activeHands = compiled[compiled.length - 1].hands.map((h) => [...h]);
      if (hasDiscard && upCard && discard && activeHands[dealer].includes(discard)) {
        const discIdx = activeHands[dealer].indexOf(discard);
        if (discIdx !== -1) {
          activeHands[dealer].splice(discIdx, 1);
        }
        if (!activeHands[dealer].includes(upCard)) {
          activeHands[dealer].push(upCard);
        }
      }
      const trump = determineTrump(deal);
      let leadSeat = determineLeadSeat(deal, ruleset?.loner_lead ?? "LEFT_OF_DEALER");
      playPhase.tricks.forEach((trickCards, trickIndex) => {
        const currentTrickPlayed = [null, null, null, null];
        trickCards.forEach((card, cardIndex) => {
          const playerIndex = getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat);
          const absolutePlayIndex = trickIndex * 4 + cardIndex;
          activeHands[playerIndex] = activeHands[playerIndex].filter((c) => c !== card);
          currentTrickPlayed[playerIndex] = card;
          const annot = playPhase.playAnnotations ? playPhase.playAnnotations[absolutePlayIndex] : null;
          compiled.push({
            type: "PLAY",
            description: `Trick ${trickIndex + 1}, Card ${cardIndex + 1}`,
            annotation: Array.isArray(annot) ? annot.join("\n") : annot || `Player ${playerIndex + 1} played ${card}`,
            hands: activeHands.map((h) => [...h]),
            playedCards: [...currentTrickPlayed],
            bidCall: null,
            sitOutSeat,
            callingTeam,
            callingTeamTricks,
            defendingTeamTricks
          });
        });
        if (trickCards.length === (sitOutSeat !== null ? 3 : 4) && trump) {
          const winnerIndex = getWinnerIndex(trickCards, trump);
          leadSeat = getPlayerIndexInTrick(leadSeat, winnerIndex, sitOutSeat);
          const winnerTeam = leadSeat % 2;
          if (winnerTeam === callingTeam) {
            callingTeamTricks++;
          } else {
            defendingTeamTricks++;
          }
          const lastPlayIndex = compiled.length - 1;
          if (lastPlayIndex >= 0 && compiled[lastPlayIndex].type === "PLAY") {
            compiled[lastPlayIndex].callingTeamTricks = callingTeamTricks;
            compiled[lastPlayIndex].defendingTeamTricks = defendingTeamTricks;
            compiled[lastPlayIndex].trickWinnerSeat = leadSeat;
          }
        } else {
          leadSeat = getPlayerIndexInTrick(leadSeat, 1, sitOutSeat);
        }
      });
    }
    let team0Change = 0;
    let team1Change = 0;
    if (callingTeamTricks >= 3) {
      const lonerMarchScore = ruleset?.loner_march_score ?? 4;
      const points = callingTeamTricks === 5 ? isAlone ? lonerMarchScore : 2 : 1;
      if (callingTeam === 0) team0Change = points;
      else team1Change = points;
    } else if (defendingTeamTricks >= 3) {
      const lonerEuchredScore = isAlone && ruleset?.loner_euchred_score ? ruleset.loner_euchred_score : 2;
      const points = lonerEuchredScore;
      if (callingTeam === 0) team1Change = points;
      else team0Change = points;
    }
    compiled.forEach((step) => {
      step.scoreChange = [team0Change, team1Change];
    });
    return compiled;
  }

  // src/engine/scoring.ts
  init_bitpacker();
  function getFs() {
    if (typeof __require !== "undefined") {
      try {
        return require_browser_shims();
      } catch {
      }
    }
    return null;
  }
  function calculateDealScoreChange(deal, metadata = {}, dealIndex = 0) {
    const unpackedDeal = typeof deal === "string" ? unpackDeal(deal, dealIndex) : deal;
    const compiledSteps = compileDealSteps(unpackedDeal, metadata);
    if (compiledSteps.length > 0 && compiledSteps[0].scoreChange) {
      return compiledSteps[0].scoreChange;
    }
    return [0, 0];
  }
  function calculateFinalScore(egn) {
    const initialScore = Array.isArray(egn.metadata?.initialScore) && egn.metadata.initialScore.length === 2 ? [egn.metadata.initialScore[0], egn.metadata.initialScore[1]] : [0, 0];
    let currentScore = [initialScore[0], initialScore[1]];
    if (Array.isArray(egn.deals)) {
      egn.deals.forEach((deal, idx) => {
        const delta = calculateDealScoreChange(deal, egn.metadata, idx);
        currentScore = [currentScore[0] + delta[0], currentScore[1] + delta[1]];
      });
    }
    return currentScore;
  }
  function addFinalScoreToEgn(egn) {
    const cloned = JSON.parse(JSON.stringify(egn));
    if (!cloned.metadata) {
      throw new Error("Cannot add finalScore: EGN file is missing metadata object.");
    }
    const finalScore = calculateFinalScore(cloned);
    cloned.metadata.finalScore = [finalScore[0], finalScore[1]];
    const validation = validateEgn2(cloned);
    if (!validation.isValid) {
      const errorDetails = validation.errors?.map((e) => `${e.instancePath || "/"} ${e.message}`).join("; ");
      throw new Error(`Updated EGN failed schema validation: ${errorDetails || "Unknown schema error"}`);
    }
    return cloned;
  }
  function addFinalScoreToEgnFile(inputPath, outputPath) {
    const fs3 = getFs();
    if (!fs3 || !fs3.existsSync || !fs3.readFileSync || !fs3.writeFileSync) {
      throw new Error("addFinalScoreToEgnFile requires a Node.js environment with filesystem access.");
    }
    if (!fs3.existsSync(inputPath)) {
      throw new Error(`EGN file not found at path: ${inputPath}`);
    }
    const rawJson = fs3.readFileSync(inputPath, "utf8");
    const parsed = JSON.parse(rawJson);
    const updated = addFinalScoreToEgn(parsed);
    const targetPath = outputPath || inputPath;
    if (outputPath || outputPath === inputPath) {
      fs3.writeFileSync(targetPath, JSON.stringify(updated, null, 2) + "\n", "utf8");
    }
    return updated;
  }

  // src/engine/validation.ts
  init_bitpacker();
  function getEffectiveSuit(card, trump) {
    if (!card || card.length < 2) return "";
    const rank = card[0];
    const printedSuit = card[1].toLowerCase();
    if (trump) {
      const t = trump.toLowerCase();
      if (rank === "J" && printedSuit === getLeftBowerSuit(t)) {
        return t;
      }
    }
    return printedSuit;
  }
  function getSitOutSeats(deal, ruleset, numPlayers = 4) {
    const sitOuts = /* @__PURE__ */ new Set();
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING") return sitOuts;
    const maker = determineMaker(deal);
    if (bidding.isAlone && maker !== null) {
      const partnerSeat = (maker + Math.floor(numPlayers / 2)) % numPlayers;
      sitOuts.add(partnerSeat);
    }
    if (ruleset?.defend_alone && typeof bidding.aloneDefender === "number" && bidding.aloneDefender >= 0) {
      const defenderPartner = (bidding.aloneDefender + Math.floor(numPlayers / 2)) % numPlayers;
      sitOuts.add(defenderPartner);
    }
    return sitOuts;
  }
  function getActivePlayerSeat(leadSeat, cardIndex, sitOutSeats, numPlayers = 4) {
    let player = leadSeat;
    let count = 0;
    while (count < cardIndex) {
      player = (player + 1) % numPlayers;
      if (!sitOutSeats.has(player)) {
        count++;
      }
    }
    return player;
  }
  function validateDealGameplay(deal, metadata = {}, dealIndex = 0, options = {}) {
    const violations = [];
    const ruleset = metadata.ruleset;
    const numPlayers = ruleset?.num_players ?? 4;
    const checkInventory = options.checkHandInventory ?? true;
    const allowPartial = options.allowPartialHands ?? false;
    const unpackedDeal = typeof deal === "string" ? unpackDeal(deal, dealIndex) : deal;
    const upCard = unpackedDeal.initialState?.upCard;
    const upcardSuit = upCard && upCard.length >= 2 ? upCard[1].toLowerCase() : null;
    const dealtCardsSeen = /* @__PURE__ */ new Map();
    if (upCard) {
      dealtCardsSeen.set(upCard, "upcard");
    }
    if (Array.isArray(unpackedDeal.initialState?.playerCards)) {
      unpackedDeal.initialState.playerCards.forEach((hand, seatIdx) => {
        if (Array.isArray(hand)) {
          hand.forEach((card) => {
            if (dealtCardsSeen.has(card)) {
              violations.push({
                code: "DUPLICATE_CARD_DEALT",
                dealIndex,
                seatIndex: seatIdx,
                card,
                message: `Card ${card} was dealt to seat ${seatIdx}, but was already present in ${dealtCardsSeen.get(card)}.`
              });
            } else {
              dealtCardsSeen.set(card, `seat ${seatIdx} starting hand`);
            }
          });
        }
      });
    }
    const biddingPhase = unpackedDeal.phases ? unpackedDeal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    const trump = determineTrump(unpackedDeal);
    const maker = determineMaker(unpackedDeal);
    const sitOutSeats = getSitOutSeats(unpackedDeal, ruleset, numPlayers);
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
      const calls = biddingPhase.calls || [];
      if (calls.length > numPlayers * 2) {
        violations.push({
          code: "INVALID_BID_COUNT",
          dealIndex,
          expected: `<= ${numPlayers * 2}`,
          actual: calls.length,
          message: `Too many bidding calls in deal ${dealIndex}: found ${calls.length}, maximum allowed is ${numPlayers * 2}.`
        });
      }
      const firstNonPassIdx = calls.findIndex((c) => !isPass(c));
      if (firstNonPassIdx >= numPlayers && firstNonPassIdx !== -1 && upcardSuit) {
        const round2Call = calls[firstNonPassIdx];
        if (typeof round2Call === "string" && round2Call.toLowerCase() === upcardSuit) {
          violations.push({
            code: "ILLEGAL_BID_SUIT",
            dealIndex,
            expected: `Suit other than turned-down upcard suit '${upcardSuit}'`,
            actual: round2Call,
            message: `Player called suit '${round2Call}' in round 2, which matches the turned-down upcard suit '${upcardSuit}'.`
          });
        }
      }
      if (typeof biddingPhase.aloneDefender === "number" && biddingPhase.aloneDefender >= 0) {
        if (!ruleset?.defend_alone) {
          violations.push({
            code: "ILLEGAL_ALONE_DEFENDER",
            dealIndex,
            seatIndex: biddingPhase.aloneDefender,
            message: `Seat ${biddingPhase.aloneDefender} declared aloneDefender, but ruleset.defend_alone is not enabled.`
          });
        } else if (maker !== null && biddingPhase.aloneDefender % 2 === maker % 2) {
          violations.push({
            code: "ILLEGAL_ALONE_DEFENDER",
            dealIndex,
            seatIndex: biddingPhase.aloneDefender,
            message: `Seat ${biddingPhase.aloneDefender} cannot defend alone because they are on the maker's team (maker is seat ${maker}).`
          });
        }
      }
      const dealer = unpackedDeal.initialState?.dealer ?? 0;
      const isDealerPickUp = firstNonPassIdx >= 0 && firstNonPassIdx < numPlayers;
      if (isDealerPickUp && biddingPhase.discard && unpackedDeal.initialState?.playerCards) {
        const dealerHand = unpackedDeal.initialState.playerCards[dealer];
        if (Array.isArray(dealerHand) && dealerHand.length === 5) {
          const validOptions = /* @__PURE__ */ new Set([...dealerHand, ...upCard ? [upCard] : []]);
          if (!validOptions.has(biddingPhase.discard)) {
            violations.push({
              code: "INVALID_DISCARD",
              dealIndex,
              seatIndex: dealer,
              card: biddingPhase.discard,
              message: `Dealer discarded ${biddingPhase.discard}, but it was not present in dealer's dealt hand or upcard.`
            });
          }
        }
      }
    }
    const playPhase = unpackedDeal.phases ? unpackedDeal.phases.find((p) => p.type === "TRICK_PLAY") : null;
    if (playPhase && playPhase.type === "TRICK_PLAY") {
      const tricks = playPhase.tricks || [];
      const expectedTricks = 5;
      if (!allowPartial && tricks.length !== expectedTricks) {
        violations.push({
          code: "INVALID_TRICK_COUNT",
          dealIndex,
          expected: expectedTricks,
          actual: tricks.length,
          message: `Deal ${dealIndex} has ${tricks.length} tricks, expected exactly ${expectedTricks}.`
        });
      }
      const expectedCardsPerTrick = numPlayers - sitOutSeats.size;
      const playedCardsInDeal = /* @__PURE__ */ new Map();
      let playerHands = [[], [], [], []];
      let handsKnown = false;
      if (Array.isArray(unpackedDeal.initialState?.playerCards) && unpackedDeal.initialState.playerCards.every((h) => Array.isArray(h) && h.length === 5)) {
        handsKnown = true;
        playerHands = unpackedDeal.initialState.playerCards.map((h) => [...h]);
        const dealer = unpackedDeal.initialState?.dealer ?? 0;
        const biddingCalls = biddingPhase?.calls || [];
        const callIdx = biddingCalls.findIndex((c) => !isPass(c));
        if (callIdx >= 0 && callIdx < numPlayers && upCard) {
          playerHands[dealer].push(upCard);
          if (biddingPhase?.discard) {
            const discIdx = playerHands[dealer].indexOf(biddingPhase.discard);
            if (discIdx !== -1) {
              playerHands[dealer].splice(discIdx, 1);
            }
          }
        }
      }
      let leadSeat = determineLeadSeat(unpackedDeal, ruleset?.loner_lead ?? "LEFT_OF_DEALER");
      tricks.forEach((trickCards, trickIdx) => {
        if (trickCards.length !== expectedCardsPerTrick) {
          violations.push({
            code: "INVALID_CARDS_PER_TRICK",
            dealIndex,
            trickIndex: trickIdx,
            expected: expectedCardsPerTrick,
            actual: trickCards.length,
            message: `Trick ${trickIdx + 1} has ${trickCards.length} cards, expected ${expectedCardsPerTrick} (num_players: ${numPlayers}, sitting out: ${sitOutSeats.size}).`
          });
        }
        let ledEffectiveSuit = null;
        trickCards.forEach((card, cardIdx) => {
          const playerSeat = getActivePlayerSeat(leadSeat, cardIdx, sitOutSeats, numPlayers);
          if (sitOutSeats.has(playerSeat)) {
            violations.push({
              code: "SIT_OUT_PLAYED",
              dealIndex,
              trickIndex: trickIdx,
              cardIndex: cardIdx,
              seatIndex: playerSeat,
              card,
              message: `Seat ${playerSeat} played card ${card} in trick ${trickIdx + 1}, but is sitting out for this deal.`
            });
          }
          if (playedCardsInDeal.has(card)) {
            const prev = playedCardsInDeal.get(card);
            violations.push({
              code: "DUPLICATE_CARD_PLAYED",
              dealIndex,
              trickIndex: trickIdx,
              cardIndex: cardIdx,
              seatIndex: playerSeat,
              card,
              message: `Card ${card} was played by seat ${playerSeat} in trick ${trickIdx + 1}, but was already played in trick ${prev.trickIndex + 1}.`
            });
          } else {
            playedCardsInDeal.set(card, { trickIndex: trickIdx, cardIndex: cardIdx });
          }
          const playedEffectiveSuit = getEffectiveSuit(card, trump);
          if (cardIdx === 0) {
            ledEffectiveSuit = playedEffectiveSuit;
          } else if (ledEffectiveSuit && playedEffectiveSuit !== ledEffectiveSuit) {
            if (handsKnown && checkInventory) {
              const currentHand = playerHands[playerSeat] || [];
              const hasLedSuit = currentHand.some((c) => getEffectiveSuit(c, trump) === ledEffectiveSuit);
              if (hasLedSuit) {
                const holdingLedCards = currentHand.filter((c) => getEffectiveSuit(c, trump) === ledEffectiveSuit);
                violations.push({
                  code: "RENEGE",
                  dealIndex,
                  trickIndex: trickIdx,
                  cardIndex: cardIdx,
                  seatIndex: playerSeat,
                  card,
                  expected: `Card of suit '${ledEffectiveSuit}'`,
                  actual: card,
                  message: `Seat ${playerSeat} reneged in trick ${trickIdx + 1}: played ${card} (suit '${playedEffectiveSuit}') while holding led suit '${ledEffectiveSuit}' (${holdingLedCards.join(", ")}).`
                });
              }
            }
          }
          if (handsKnown && checkInventory) {
            const currentHand = playerHands[playerSeat] || [];
            const cardInHandIdx = currentHand.indexOf(card);
            if (cardInHandIdx === -1) {
              violations.push({
                code: "CARD_NOT_IN_HAND",
                dealIndex,
                trickIndex: trickIdx,
                cardIndex: cardIdx,
                seatIndex: playerSeat,
                card,
                message: `Seat ${playerSeat} played ${card} in trick ${trickIdx + 1}, but it was not in their hand.`
              });
            } else {
              currentHand.splice(cardInHandIdx, 1);
            }
          }
        });
        if (trickCards.length === expectedCardsPerTrick && trump) {
          const winnerIndex = getWinnerIndex(trickCards, trump);
          leadSeat = getActivePlayerSeat(leadSeat, winnerIndex, sitOutSeats, numPlayers);
        } else {
          leadSeat = getActivePlayerSeat(leadSeat, 1, sitOutSeats, numPlayers);
        }
      });
    }
    return {
      isValid: violations.length === 0,
      violations
    };
  }
  function validateGameplay(egn, options = {}) {
    const allViolations = [];
    if (Array.isArray(egn.deals)) {
      egn.deals.forEach((deal, dealIdx) => {
        const result = validateDealGameplay(deal, egn.metadata, dealIdx, options);
        if (!result.isValid) {
          allViolations.push(...result.violations);
        }
      });
    }
    return {
      isValid: allViolations.length === 0,
      violations: allViolations
    };
  }

  // src/emn/index.ts
  var emn_exports = {};
  __export(emn_exports, {
    EMN_SCHEMA_VERSION: () => EMN_SCHEMA_VERSION,
    MAGIC_BYTE_EMN: () => MAGIC_BYTE_EMN,
    SUPPORTED_EMN_SCHEMA_VERSION_RE: () => SUPPORTED_EMN_SCHEMA_VERSION_RE,
    addScoresToEmn: () => addScoresToEmn,
    binaryToEmn: () => binaryToEmn,
    calculateEmnScores: () => calculateEmnScores,
    combineEgnToEmn: () => combineEgnToEmn,
    convertBinDataToEmnFile: () => convertBinDataToEmnFile,
    convertBinDataToEmnJson: () => convertBinDataToEmnJson,
    convertBinToEmnJson: () => convertBinToEmnJson,
    convertEmnFileToBinData: () => convertEmnFileToBinData,
    convertEmnJsonToBin: () => convertEmnJsonToBin,
    convertEmnJsonToBinData: () => convertEmnJsonToBinData,
    detectEmnBinaryFormat: () => detectEmnBinaryFormat,
    detectEmnBinaryFormatFromData: () => detectEmnBinaryFormatFromData,
    emnToBinary: () => emnToBinary,
    extractAllEgnsFromEmn: () => extractAllEgnsFromEmn,
    extractEgnFromEmn: () => extractEgnFromEmn,
    isEmnFile: () => isEmnFile,
    isSupportedEmnSchemaVersion: () => isSupportedEmnSchemaVersion,
    packEmnFile: () => packEmnFile,
    unpackEmnFile: () => unpackEmnFile,
    validateEmn: () => validateEmn2
  });

  // src/emn/version.ts
  var EMN_SCHEMA_VERSION = "1.2";
  var SUPPORTED_EMN_SCHEMA_VERSION_RE = /^1\.[12](?:\.\d+)?$/;
  function isSupportedEmnSchemaVersion(version) {
    return SUPPORTED_EMN_SCHEMA_VERSION_RE.test(version);
  }

  // src/generated/emn-validators.ts
  var validateEmn = validate102;
  var schema112 = { "$schema": "http://json-schema.org/draft-07/schema#", "title": "Euchre Match Notation (EMN)", "description": "JSON Schema for validating Euchre Match Notation (.emn) files.", "type": "object", "required": ["fileType", "version", "metadata", "games"], "additionalProperties": false, "properties": { "fileType": { "type": "string", "const": "Euchre Match Notation" }, "version": { "type": "string", "pattern": "^1\\.[12](?:\\.\\d+)?$" }, "metadata": { "type": "object", "required": ["players"], "additionalProperties": false, "properties": { "matchId": { "type": "string", "maxLength": 64 }, "title": { "type": "string", "maxLength": 128 }, "description": { "type": "string", "maxLength": 1024 }, "date": { "type": "string", "maxLength": 64, "anyOf": [{ "format": "date-time" }, { "format": "date" }, { "pattern": "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$" }] }, "teams": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "type": "object", "required": ["id", "name"], "additionalProperties": false, "properties": { "id": { "type": "string", "maxLength": 64 }, "name": { "type": "string", "maxLength": 64 }, "playerIds": { "type": "array", "items": { "type": "string", "maxLength": 64 } }, "color": { "type": "string", "maxLength": 32 } } } }, "players": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "allOf": [{ "$ref": "../egn-schema-v1.json#/definitions/player" }, { "type": "object", "required": ["id"], "properties": { "id": { "type": "string", "maxLength": 64 } } }] } }, "matchFormat": { "type": "object", "required": ["type"], "additionalProperties": false, "properties": { "type": { "type": "string", "enum": ["BEST_OF_N", "PROGRESSIVE", "ROUND_ROBIN", "CUSTOM", "FIXED_GAMES", "TARGET_SCORE", "ELIMINATION", "SWISS", "TIMED", "SINGLE_GAME"] }, "target": { "type": "integer", "minimum": 1 } } }, "result": { "type": "object", "additionalProperties": false, "properties": { "status": { "type": "string", "enum": ["COMPLETED", "IN_PROGRESS", "FORFEIT", "DRAW"] }, "winner": { "type": "array", "items": { "type": "string" }, "description": "Winning player ID(s) or team key" }, "scores": { "type": "object", "additionalProperties": { "type": "number" }, "description": "Map of player ID or team key to final score metric" } } } } }, "games": { "type": "array", "items": { "type": "object", "required": ["gameIndex", "playersOverride", "gameData"], "additionalProperties": false, "properties": { "gameIndex": { "type": "integer", "minimum": 0 }, "playersOverride": { "type": "array", "minItems": 4, "maxItems": 4, "uniqueItems": true, "items": { "type": "string" }, "description": "Array of 4 player IDs mapped to [Seat 0: North, Seat 1: East, Seat 2: South, Seat 3: West]" }, "gameData": { "$ref": "../egn-schema-v1.json" } } } } } };
  var pattern02 = new RegExp("^1\\.[12](?:\\.\\d+)?$", "u");
  var pattern12 = new RegExp("^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$", "u");
  var func22 = require_ucs2length().default;
  var func0 = require_equal().default;
  var formats02 = require_formats().fullFormats["date-time"];
  var formats22 = require_formats().fullFormats.date;
  var schema12 = { "$schema": "http://json-schema.org/draft-07/schema#", "title": "Euchre Game Notation (EGN)", "description": "JSON Schema for validating Euchre Game Notation (.egn) files.", "type": "object", "additionalProperties": false, "properties": { "fileType": { "type": "string", "const": "Euchre Game Notation" }, "version": { "type": "string", "pattern": "^1\\.[23456](?:\\.\\d+)?$" }, "metadata": { "type": "object", "additionalProperties": false, "properties": { "gameId": { "type": "string", "maxLength": 64 }, "title": { "type": "string", "maxLength": 128 }, "description": { "type": "string", "maxLength": 1024 }, "players": { "type": "array", "items": { "oneOf": [{ "type": "string", "maxLength": 64 }, { "$ref": "#/definitions/player" }] }, "maxItems": 10, "description": "Array of player names, starting with Player 0 and proceeding clockwise." }, "teamNames": { "type": "array", "items": { "type": "string", "maxLength": 64 }, "minItems": 2, "maxItems": 2, "description": "Optional team names for the two partnerships. [Team 0/2 Name, Team 1/3 Name]." }, "initialScore": { "type": "array", "items": { "type": "integer" }, "maxItems": 2, "description": "Initial team scores. [Team 0/2 Score, Team 1/3 Score]." }, "finalScore": { "type": "array", "items": { "type": "integer" }, "maxItems": 2, "description": "Optional final team scores. [Team 0/2 Score, Team 1/3 Score]." }, "date": { "type": "string", "maxLength": 64, "anyOf": [{ "format": "date-time" }, { "format": "date" }, { "pattern": "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$" }], "description": "Date and time when the game was played." }, "ruleset": { "type": "object", "additionalProperties": false, "properties": { "std": { "type": "boolean", "default": true }, "min_rank": { "type": "integer", "default": 9 }, "winning_score": { "type": "integer", "minimum": 0, "default": 10, "description": "The target score to win the game. A value of 0 means there is no winning score." }, "num_deals": { "type": "integer", "minimum": 0, "default": 0, "description": "The number of deals to play. A value of 0 (or omitting the field) means there is no deal limit. If both num_deals and winning_score are non-zero, the game ends when either limit is reached." }, "canadian": { "type": "boolean", "default": false }, "loner_lead": { "type": "string", "enum": ["LEFT_OF_DEALER", "LEFT_OF_LONER"], "default": "LEFT_OF_DEALER" }, "loner_march_score": { "type": "integer", "default": 4 }, "loner_euchred_score": { "type": "integer", "default": 2 }, "defend_alone": { "type": "boolean", "default": false }, "farmers": { "type": "boolean", "default": false }, "partners_best": { "type": "boolean", "default": false }, "go_under": { "type": "boolean", "default": false }, "joker": { "type": "boolean", "default": false }, "num_players": { "type": "integer", "default": 4 }, "allow_no_trump": { "type": "boolean", "default": false }, "fast_break": { "type": "boolean", "default": false }, "four_trick_tokens": { "type": "boolean", "default": false } }, "allOf": [{ "not": { "required": ["winning_score", "num_deals"] } }, { "anyOf": [{ "not": { "properties": { "winning_score": { "const": 0 } }, "required": ["winning_score"] } }, { "properties": { "num_deals": { "type": "integer", "minimum": 1 } }, "required": ["num_deals"] }] }] } }, "required": ["players", "initialScore"] }, "deals": { "type": "array", "maxItems": 100, "items": { "oneOf": [{ "type": "object", "additionalProperties": false, "properties": { "dealNumber": { "type": "integer", "minimum": 0 }, "initialState": { "type": "object", "additionalProperties": false, "properties": { "dealer": { "type": "integer", "minimum": 0, "maximum": 9 }, "upCard": { "$ref": "#/definitions/card" }, "playerCards": { "type": "array", "maxItems": 10, "items": { "$ref": "#/definitions/cardList" } } }, "required": ["dealer", "upCard"] }, "phases": { "type": "array", "minItems": 0, "maxItems": 2, "items": { "oneOf": [{ "$ref": "#/definitions/biddingPhase" }, { "$ref": "#/definitions/trickPlayPhase" }] } }, "alternativeLines": { "type": "array", "maxItems": 50, "items": { "$ref": "#/definitions/alternativeLine" }, "description": "Analysis-only content that should be stripped for baseline hashing." } }, "required": ["dealNumber", "initialState", "phases"] }, { "type": "string", "pattern": "^[A-Za-z0-9+/_-]*={0,2}$" }] } } }, "required": ["fileType", "version", "metadata", "deals"], "definitions": { "card": { "type": "string", "pattern": "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, "cardList": { "type": "array", "maxItems": 10, "items": { "$ref": "#/definitions/card" } }, "biddingPhase": { "type": "object", "additionalProperties": false, "required": ["type", "calls"], "properties": { "phaseNumber": { "type": "integer" }, "type": { "const": "EUCHRE_BIDDING" }, "calls": { "type": "array", "maxItems": 16, "items": { "type": "string", "enum": ["Pass", "Order", "p", "o", "s", "h", "d", "c", "n", "x"] } }, "isAlone": { "type": "boolean", "default": false }, "aloneDefender": { "type": "integer", "description": "Seat index of the player defending alone against a loner, or -1 if no one is defending alone. Only relevant when the ruleset has defend_alone: true and isAlone is true." }, "discard": { "$ref": "#/definitions/card" }, "cardExchanges": { "type": "array", "maxItems": 4, "items": { "type": "object", "additionalProperties": false, "properties": { "sender": { "type": "integer", "minimum": 0, "maximum": 9 }, "receiver": { "type": "integer", "minimum": 0, "maximum": 9 }, "cards": { "$ref": "#/definitions/cardList" } }, "required": ["receiver", "cards"] } }, "callAnnotations": { "$ref": "#/definitions/annotations", "description": "Analysis-only content that should be stripped for baseline hashing." } } }, "trickPlayPhase": { "type": "object", "additionalProperties": false, "required": ["type", "tricks"], "properties": { "phaseNumber": { "type": "integer" }, "type": { "const": "TRICK_PLAY" }, "tricks": { "type": "array", "maxItems": 10, "items": { "$ref": "#/definitions/cardList" } }, "isAlone": { "type": "boolean", "default": false }, "playAnnotations": { "$ref": "#/definitions/annotations", "description": "Analysis-only content that should be stripped for baseline hashing." } } }, "alternativeLine": { "type": "object", "additionalProperties": false, "required": ["branchIndex", "phases"], "properties": { "branchIndex": { "type": "integer", "minimum": 0 }, "phases": { "type": "array", "minItems": 1, "items": { "oneOf": [{ "$ref": "#/definitions/biddingPhase" }, { "$ref": "#/definitions/trickPlayPhase" }] } } } }, "annotations": { "type": "object", "additionalProperties": { "type": "array", "maxItems": 50, "items": { "type": "string", "maxLength": 1024 } }, "propertyNames": { "pattern": "^[0-9]+$" } }, "player": { "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "maxLength": 64 }, "name": { "type": "string", "maxLength": 64 }, "playerIds": { "type": "array", "minItems": 0, "maxItems": 10, "items": { "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "maxLength": 64 }, "source": { "type": "string", "maxLength": 64 } }, "required": ["id", "source"] } } }, "required": ["name"] } } };
  var pattern22 = new RegExp("^1\\.[23456](?:\\.\\d+)?$", "u");
  var pattern4 = new RegExp("^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$", "u");
  var pattern9 = new RegExp("^[A-Za-z0-9+/_-]*={0,2}$", "u");
  var func11 = Object.prototype.hasOwnProperty;
  function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (Array.isArray(data)) {
        if (data.length > 10) {
          validate12.errors = [{ instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
          return false;
        } else {
          var valid0 = true;
          const len0 = data.length;
          for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (!pattern4.test(data0)) {
                  validate12.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                  return false;
                }
              } else {
                validate12.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
              break;
            }
          }
        }
      } else {
        validate12.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
      }
    }
    validate12.errors = vErrors;
    return errors === 0;
  }
  var schema17 = { "type": "object", "additionalProperties": false, "required": ["type", "calls"], "properties": { "phaseNumber": { "type": "integer" }, "type": { "const": "EUCHRE_BIDDING" }, "calls": { "type": "array", "maxItems": 16, "items": { "type": "string", "enum": ["Pass", "Order", "p", "o", "s", "h", "d", "c", "n", "x"] } }, "isAlone": { "type": "boolean", "default": false }, "aloneDefender": { "type": "integer", "description": "Seat index of the player defending alone against a loner, or -1 if no one is defending alone. Only relevant when the ruleset has defend_alone: true and isAlone is true." }, "discard": { "$ref": "#/definitions/card" }, "cardExchanges": { "type": "array", "maxItems": 4, "items": { "type": "object", "additionalProperties": false, "properties": { "sender": { "type": "integer", "minimum": 0, "maximum": 9 }, "receiver": { "type": "integer", "minimum": 0, "maximum": 9 }, "cards": { "$ref": "#/definitions/cardList" } }, "required": ["receiver", "cards"] } }, "callAnnotations": { "$ref": "#/definitions/annotations", "description": "Analysis-only content that should be stripped for baseline hashing." } } };
  var pattern72 = new RegExp("^[0-9]+$", "u");
  function validate14(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.type === void 0 && (missing0 = "type") || data.calls === void 0 && (missing0 = "calls")) {
          validate14.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "phaseNumber" || key0 === "type" || key0 === "calls" || key0 === "isAlone" || key0 === "aloneDefender" || key0 === "discard" || key0 === "cardExchanges" || key0 === "callAnnotations")) {
              validate14.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.phaseNumber !== void 0) {
              let data0 = data.phaseNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate14.errors = [{ instancePath: instancePath + "/phaseNumber", schemaPath: "#/properties/phaseNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.type !== void 0) {
                const _errs4 = errors;
                if ("EUCHRE_BIDDING" !== data.type) {
                  validate14.errors = [{ instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "EUCHRE_BIDDING" }, message: "must be equal to constant" }];
                  return false;
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.calls !== void 0) {
                  let data2 = data.calls;
                  const _errs5 = errors;
                  if (errors === _errs5) {
                    if (Array.isArray(data2)) {
                      if (data2.length > 16) {
                        validate14.errors = [{ instancePath: instancePath + "/calls", schemaPath: "#/properties/calls/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data2.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          let data3 = data2[i0];
                          const _errs7 = errors;
                          if (typeof data3 !== "string") {
                            validate14.errors = [{ instancePath: instancePath + "/calls/" + i0, schemaPath: "#/properties/calls/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                          if (!(data3 === "Pass" || data3 === "Order" || data3 === "p" || data3 === "o" || data3 === "s" || data3 === "h" || data3 === "d" || data3 === "c" || data3 === "n" || data3 === "x")) {
                            validate14.errors = [{ instancePath: instancePath + "/calls/" + i0, schemaPath: "#/properties/calls/items/enum", keyword: "enum", params: { allowedValues: schema17.properties.calls.items.enum }, message: "must be equal to one of the allowed values" }];
                            return false;
                          }
                          var valid1 = _errs7 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate14.errors = [{ instancePath: instancePath + "/calls", schemaPath: "#/properties/calls/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.isAlone !== void 0) {
                    const _errs9 = errors;
                    if (typeof data.isAlone !== "boolean") {
                      validate14.errors = [{ instancePath: instancePath + "/isAlone", schemaPath: "#/properties/isAlone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                      return false;
                    }
                    var valid0 = _errs9 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.aloneDefender !== void 0) {
                      let data5 = data.aloneDefender;
                      const _errs11 = errors;
                      if (!(typeof data5 == "number" && (!(data5 % 1) && !isNaN(data5)) && isFinite(data5))) {
                        validate14.errors = [{ instancePath: instancePath + "/aloneDefender", schemaPath: "#/properties/aloneDefender/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                        return false;
                      }
                      var valid0 = _errs11 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.discard !== void 0) {
                        let data6 = data.discard;
                        const _errs13 = errors;
                        const _errs14 = errors;
                        if (errors === _errs14) {
                          if (typeof data6 === "string") {
                            if (!pattern4.test(data6)) {
                              validate14.errors = [{ instancePath: instancePath + "/discard", schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' }];
                              return false;
                            }
                          } else {
                            validate14.errors = [{ instancePath: instancePath + "/discard", schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid0 = _errs13 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.cardExchanges !== void 0) {
                          let data7 = data.cardExchanges;
                          const _errs16 = errors;
                          if (errors === _errs16) {
                            if (Array.isArray(data7)) {
                              if (data7.length > 4) {
                                validate14.errors = [{ instancePath: instancePath + "/cardExchanges", schemaPath: "#/properties/cardExchanges/maxItems", keyword: "maxItems", params: { limit: 4 }, message: "must NOT have more than 4 items" }];
                                return false;
                              } else {
                                var valid3 = true;
                                const len1 = data7.length;
                                for (let i1 = 0; i1 < len1; i1++) {
                                  let data8 = data7[i1];
                                  const _errs18 = errors;
                                  if (errors === _errs18) {
                                    if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                                      let missing1;
                                      if (data8.receiver === void 0 && (missing1 = "receiver") || data8.cards === void 0 && (missing1 = "cards")) {
                                        validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                        return false;
                                      } else {
                                        const _errs20 = errors;
                                        for (const key1 in data8) {
                                          if (!(key1 === "sender" || key1 === "receiver" || key1 === "cards")) {
                                            validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                            return false;
                                            break;
                                          }
                                        }
                                        if (_errs20 === errors) {
                                          if (data8.sender !== void 0) {
                                            let data9 = data8.sender;
                                            const _errs21 = errors;
                                            if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
                                              validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                              return false;
                                            }
                                            if (errors === _errs21) {
                                              if (typeof data9 == "number" && isFinite(data9)) {
                                                if (data9 > 9 || isNaN(data9)) {
                                                  validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                                  return false;
                                                } else {
                                                  if (data9 < 0 || isNaN(data9)) {
                                                    validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/sender", schemaPath: "#/properties/cardExchanges/items/properties/sender/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                    return false;
                                                  }
                                                }
                                              }
                                            }
                                            var valid4 = _errs21 === errors;
                                          } else {
                                            var valid4 = true;
                                          }
                                          if (valid4) {
                                            if (data8.receiver !== void 0) {
                                              let data10 = data8.receiver;
                                              const _errs23 = errors;
                                              if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10))) {
                                                validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                return false;
                                              }
                                              if (errors === _errs23) {
                                                if (typeof data10 == "number" && isFinite(data10)) {
                                                  if (data10 > 9 || isNaN(data10)) {
                                                    validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" }];
                                                    return false;
                                                  } else {
                                                    if (data10 < 0 || isNaN(data10)) {
                                                      validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1 + "/receiver", schemaPath: "#/properties/cardExchanges/items/properties/receiver/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                      return false;
                                                    }
                                                  }
                                                }
                                              }
                                              var valid4 = _errs23 === errors;
                                            } else {
                                              var valid4 = true;
                                            }
                                            if (valid4) {
                                              if (data8.cards !== void 0) {
                                                const _errs25 = errors;
                                                if (!validate12(data8.cards, { instancePath: instancePath + "/cardExchanges/" + i1 + "/cards", parentData: data8, parentDataProperty: "cards", rootData })) {
                                                  vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                                                  errors = vErrors.length;
                                                }
                                                var valid4 = _errs25 === errors;
                                              } else {
                                                var valid4 = true;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    } else {
                                      validate14.errors = [{ instancePath: instancePath + "/cardExchanges/" + i1, schemaPath: "#/properties/cardExchanges/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                      return false;
                                    }
                                  }
                                  var valid3 = _errs18 === errors;
                                  if (!valid3) {
                                    break;
                                  }
                                }
                              }
                            } else {
                              validate14.errors = [{ instancePath: instancePath + "/cardExchanges", schemaPath: "#/properties/cardExchanges/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                              return false;
                            }
                          }
                          var valid0 = _errs16 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.callAnnotations !== void 0) {
                            let data12 = data.callAnnotations;
                            const _errs26 = errors;
                            const _errs27 = errors;
                            if (errors === _errs27) {
                              if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
                                for (const key2 in data12) {
                                  const _errs29 = errors;
                                  if (typeof key2 === "string") {
                                    if (!pattern72.test(key2)) {
                                      const err0 = { instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[0-9]+$" }, message: 'must match pattern "^[0-9]+$"', propertyName: key2 };
                                      if (vErrors === null) {
                                        vErrors = [err0];
                                      } else {
                                        vErrors.push(err0);
                                      }
                                      errors++;
                                    }
                                  }
                                  var valid6 = _errs29 === errors;
                                  if (!valid6) {
                                    const err1 = { instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/propertyNames", keyword: "propertyNames", params: { propertyName: key2 }, message: "property name must be valid" };
                                    if (vErrors === null) {
                                      vErrors = [err1];
                                    } else {
                                      vErrors.push(err1);
                                    }
                                    errors++;
                                    validate14.errors = vErrors;
                                    return false;
                                    break;
                                  }
                                }
                                if (valid6) {
                                  for (const key3 in data12) {
                                    let data13 = data12[key3];
                                    const _errs31 = errors;
                                    if (errors === _errs31) {
                                      if (Array.isArray(data13)) {
                                        if (data13.length > 50) {
                                          validate14.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                                          return false;
                                        } else {
                                          var valid8 = true;
                                          const len2 = data13.length;
                                          for (let i2 = 0; i2 < len2; i2++) {
                                            let data14 = data13[i2];
                                            const _errs33 = errors;
                                            if (errors === _errs33) {
                                              if (typeof data14 === "string") {
                                                if (func22(data14) > 1024) {
                                                  validate14.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i2, schemaPath: "#/definitions/annotations/additionalProperties/items/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate14.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i2, schemaPath: "#/definitions/annotations/additionalProperties/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid8 = _errs33 === errors;
                                            if (!valid8) {
                                              break;
                                            }
                                          }
                                        }
                                      } else {
                                        validate14.errors = [{ instancePath: instancePath + "/callAnnotations/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid7 = _errs31 === errors;
                                    if (!valid7) {
                                      break;
                                    }
                                  }
                                }
                              } else {
                                validate14.errors = [{ instancePath: instancePath + "/callAnnotations", schemaPath: "#/definitions/annotations/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                              }
                            }
                            var valid0 = _errs26 === errors;
                          } else {
                            var valid0 = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate14.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate14.errors = vErrors;
    return errors === 0;
  }
  function validate17(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.type === void 0 && (missing0 = "type") || data.tricks === void 0 && (missing0 = "tricks")) {
          validate17.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "phaseNumber" || key0 === "type" || key0 === "tricks" || key0 === "isAlone" || key0 === "playAnnotations")) {
              validate17.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.phaseNumber !== void 0) {
              let data0 = data.phaseNumber;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate17.errors = [{ instancePath: instancePath + "/phaseNumber", schemaPath: "#/properties/phaseNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.type !== void 0) {
                const _errs4 = errors;
                if ("TRICK_PLAY" !== data.type) {
                  validate17.errors = [{ instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "TRICK_PLAY" }, message: "must be equal to constant" }];
                  return false;
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.tricks !== void 0) {
                  let data2 = data.tricks;
                  const _errs5 = errors;
                  if (errors === _errs5) {
                    if (Array.isArray(data2)) {
                      if (data2.length > 10) {
                        validate17.errors = [{ instancePath: instancePath + "/tricks", schemaPath: "#/properties/tricks/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data2.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          const _errs7 = errors;
                          if (!validate12(data2[i0], { instancePath: instancePath + "/tricks/" + i0, parentData: data2, parentDataProperty: i0, rootData })) {
                            vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                            errors = vErrors.length;
                          }
                          var valid1 = _errs7 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate17.errors = [{ instancePath: instancePath + "/tricks", schemaPath: "#/properties/tricks/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.isAlone !== void 0) {
                    const _errs8 = errors;
                    if (typeof data.isAlone !== "boolean") {
                      validate17.errors = [{ instancePath: instancePath + "/isAlone", schemaPath: "#/properties/isAlone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                      return false;
                    }
                    var valid0 = _errs8 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.playAnnotations !== void 0) {
                      let data5 = data.playAnnotations;
                      const _errs10 = errors;
                      const _errs11 = errors;
                      if (errors === _errs11) {
                        if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                          for (const key1 in data5) {
                            const _errs13 = errors;
                            if (typeof key1 === "string") {
                              if (!pattern72.test(key1)) {
                                const err0 = { instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[0-9]+$" }, message: 'must match pattern "^[0-9]+$"', propertyName: key1 };
                                if (vErrors === null) {
                                  vErrors = [err0];
                                } else {
                                  vErrors.push(err0);
                                }
                                errors++;
                              }
                            }
                            var valid3 = _errs13 === errors;
                            if (!valid3) {
                              const err1 = { instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/propertyNames", keyword: "propertyNames", params: { propertyName: key1 }, message: "property name must be valid" };
                              if (vErrors === null) {
                                vErrors = [err1];
                              } else {
                                vErrors.push(err1);
                              }
                              errors++;
                              validate17.errors = vErrors;
                              return false;
                              break;
                            }
                          }
                          if (valid3) {
                            for (const key2 in data5) {
                              let data6 = data5[key2];
                              const _errs15 = errors;
                              if (errors === _errs15) {
                                if (Array.isArray(data6)) {
                                  if (data6.length > 50) {
                                    validate17.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" }];
                                    return false;
                                  } else {
                                    var valid5 = true;
                                    const len1 = data6.length;
                                    for (let i1 = 0; i1 < len1; i1++) {
                                      let data7 = data6[i1];
                                      const _errs17 = errors;
                                      if (errors === _errs17) {
                                        if (typeof data7 === "string") {
                                          if (func22(data7) > 1024) {
                                            validate17.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i1, schemaPath: "#/definitions/annotations/additionalProperties/items/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                            return false;
                                          }
                                        } else {
                                          validate17.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i1, schemaPath: "#/definitions/annotations/additionalProperties/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid5 = _errs17 === errors;
                                      if (!valid5) {
                                        break;
                                      }
                                    }
                                  }
                                } else {
                                  validate17.errors = [{ instancePath: instancePath + "/playAnnotations/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/annotations/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                  return false;
                                }
                              }
                              var valid4 = _errs15 === errors;
                              if (!valid4) {
                                break;
                              }
                            }
                          }
                        } else {
                          validate17.errors = [{ instancePath: instancePath + "/playAnnotations", schemaPath: "#/definitions/annotations/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                          return false;
                        }
                      }
                      var valid0 = _errs10 === errors;
                    } else {
                      var valid0 = true;
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate17.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate17.errors = vErrors;
    return errors === 0;
  }
  function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.branchIndex === void 0 && (missing0 = "branchIndex") || data.phases === void 0 && (missing0 = "phases")) {
          validate20.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "branchIndex" || key0 === "phases")) {
              validate20.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.branchIndex !== void 0) {
              let data0 = data.branchIndex;
              const _errs2 = errors;
              if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
                validate20.errors = [{ instancePath: instancePath + "/branchIndex", schemaPath: "#/properties/branchIndex/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              if (errors === _errs2) {
                if (typeof data0 == "number" && isFinite(data0)) {
                  if (data0 < 0 || isNaN(data0)) {
                    validate20.errors = [{ instancePath: instancePath + "/branchIndex", schemaPath: "#/properties/branchIndex/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                    return false;
                  }
                }
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.phases !== void 0) {
                let data1 = data.phases;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (Array.isArray(data1)) {
                    if (data1.length < 1) {
                      validate20.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                      return false;
                    } else {
                      var valid1 = true;
                      const len0 = data1.length;
                      for (let i0 = 0; i0 < len0; i0++) {
                        let data2 = data1[i0];
                        const _errs6 = errors;
                        const _errs7 = errors;
                        let valid2 = false;
                        let passing0 = null;
                        const _errs8 = errors;
                        if (!validate14(data2, { instancePath: instancePath + "/phases/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                          vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);
                          errors = vErrors.length;
                        }
                        var _valid0 = _errs8 === errors;
                        if (_valid0) {
                          valid2 = true;
                          passing0 = 0;
                        }
                        const _errs9 = errors;
                        if (!validate17(data2, { instancePath: instancePath + "/phases/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                          vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
                          errors = vErrors.length;
                        }
                        var _valid0 = _errs9 === errors;
                        if (_valid0 && valid2) {
                          valid2 = false;
                          passing0 = [passing0, 1];
                        } else {
                          if (_valid0) {
                            valid2 = true;
                            passing0 = 1;
                          }
                        }
                        if (!valid2) {
                          const err0 = { instancePath: instancePath + "/phases/" + i0, schemaPath: "#/properties/phases/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                          if (vErrors === null) {
                            vErrors = [err0];
                          } else {
                            vErrors.push(err0);
                          }
                          errors++;
                          validate20.errors = vErrors;
                          return false;
                        } else {
                          errors = _errs7;
                          if (vErrors !== null) {
                            if (_errs7) {
                              vErrors.length = _errs7;
                            } else {
                              vErrors = null;
                            }
                          }
                        }
                        var valid1 = _errs6 === errors;
                        if (!valid1) {
                          break;
                        }
                      }
                    }
                  } else {
                    validate20.errors = [{ instancePath: instancePath + "/phases", schemaPath: "#/properties/phases/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      } else {
        validate20.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate20.errors = vErrors;
    return errors === 0;
  }
  function validate112(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.fileType === void 0 && (missing0 = "fileType") || data.version === void 0 && (missing0 = "version") || data.metadata === void 0 && (missing0 = "metadata") || data.deals === void 0 && (missing0 = "deals")) {
          validate112.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "fileType" || key0 === "version" || key0 === "metadata" || key0 === "deals")) {
              validate112.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.fileType !== void 0) {
              let data0 = data.fileType;
              const _errs2 = errors;
              if (typeof data0 !== "string") {
                validate112.errors = [{ instancePath: instancePath + "/fileType", schemaPath: "#/properties/fileType/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
              if ("Euchre Game Notation" !== data0) {
                validate112.errors = [{ instancePath: instancePath + "/fileType", schemaPath: "#/properties/fileType/const", keyword: "const", params: { allowedValue: "Euchre Game Notation" }, message: "must be equal to constant" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.version !== void 0) {
                let data1 = data.version;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (typeof data1 === "string") {
                    if (!pattern22.test(data1)) {
                      validate112.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/pattern", keyword: "pattern", params: { pattern: "^1\\.[23456](?:\\.\\d+)?$" }, message: 'must match pattern "^1\\.[23456](?:\\.\\d+)?$"' }];
                      return false;
                    }
                  } else {
                    validate112.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.metadata !== void 0) {
                  let data2 = data.metadata;
                  const _errs6 = errors;
                  if (errors === _errs6) {
                    if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                      let missing1;
                      if (data2.players === void 0 && (missing1 = "players") || data2.initialScore === void 0 && (missing1 = "initialScore")) {
                        validate112.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                        return false;
                      } else {
                        const _errs8 = errors;
                        for (const key1 in data2) {
                          if (!func11.call(schema12.properties.metadata.properties, key1)) {
                            validate112.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                            return false;
                            break;
                          }
                        }
                        if (_errs8 === errors) {
                          if (data2.gameId !== void 0) {
                            let data3 = data2.gameId;
                            const _errs9 = errors;
                            if (errors === _errs9) {
                              if (typeof data3 === "string") {
                                if (func22(data3) > 64) {
                                  validate112.errors = [{ instancePath: instancePath + "/metadata/gameId", schemaPath: "#/properties/metadata/properties/gameId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                  return false;
                                }
                              } else {
                                validate112.errors = [{ instancePath: instancePath + "/metadata/gameId", schemaPath: "#/properties/metadata/properties/gameId/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid1 = _errs9 === errors;
                          } else {
                            var valid1 = true;
                          }
                          if (valid1) {
                            if (data2.title !== void 0) {
                              let data4 = data2.title;
                              const _errs11 = errors;
                              if (errors === _errs11) {
                                if (typeof data4 === "string") {
                                  if (func22(data4) > 128) {
                                    validate112.errors = [{ instancePath: instancePath + "/metadata/title", schemaPath: "#/properties/metadata/properties/title/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                                    return false;
                                  }
                                } else {
                                  validate112.errors = [{ instancePath: instancePath + "/metadata/title", schemaPath: "#/properties/metadata/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                              var valid1 = _errs11 === errors;
                            } else {
                              var valid1 = true;
                            }
                            if (valid1) {
                              if (data2.description !== void 0) {
                                let data5 = data2.description;
                                const _errs13 = errors;
                                if (errors === _errs13) {
                                  if (typeof data5 === "string") {
                                    if (func22(data5) > 1024) {
                                      validate112.errors = [{ instancePath: instancePath + "/metadata/description", schemaPath: "#/properties/metadata/properties/description/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                      return false;
                                    }
                                  } else {
                                    validate112.errors = [{ instancePath: instancePath + "/metadata/description", schemaPath: "#/properties/metadata/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                  }
                                }
                                var valid1 = _errs13 === errors;
                              } else {
                                var valid1 = true;
                              }
                              if (valid1) {
                                if (data2.players !== void 0) {
                                  let data6 = data2.players;
                                  const _errs15 = errors;
                                  if (errors === _errs15) {
                                    if (Array.isArray(data6)) {
                                      if (data6.length > 10) {
                                        validate112.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                                        return false;
                                      } else {
                                        var valid2 = true;
                                        const len0 = data6.length;
                                        for (let i0 = 0; i0 < len0; i0++) {
                                          let data7 = data6[i0];
                                          const _errs17 = errors;
                                          const _errs18 = errors;
                                          let valid3 = false;
                                          let passing0 = null;
                                          const _errs19 = errors;
                                          if (errors === _errs19) {
                                            if (typeof data7 === "string") {
                                              if (func22(data7) > 64) {
                                                const err0 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/properties/metadata/properties/players/items/oneOf/0/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                if (vErrors === null) {
                                                  vErrors = [err0];
                                                } else {
                                                  vErrors.push(err0);
                                                }
                                                errors++;
                                              }
                                            } else {
                                              const err1 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/properties/metadata/properties/players/items/oneOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                              if (vErrors === null) {
                                                vErrors = [err1];
                                              } else {
                                                vErrors.push(err1);
                                              }
                                              errors++;
                                            }
                                          }
                                          var _valid0 = _errs19 === errors;
                                          if (_valid0) {
                                            valid3 = true;
                                            passing0 = 0;
                                          }
                                          const _errs21 = errors;
                                          const _errs22 = errors;
                                          if (errors === _errs22) {
                                            if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
                                              let missing2;
                                              if (data7.name === void 0 && (missing2 = "name")) {
                                                const err2 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/definitions/player/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" };
                                                if (vErrors === null) {
                                                  vErrors = [err2];
                                                } else {
                                                  vErrors.push(err2);
                                                }
                                                errors++;
                                              } else {
                                                const _errs24 = errors;
                                                for (const key2 in data7) {
                                                  if (!(key2 === "id" || key2 === "name" || key2 === "playerIds")) {
                                                    const err3 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/definitions/player/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                                                    if (vErrors === null) {
                                                      vErrors = [err3];
                                                    } else {
                                                      vErrors.push(err3);
                                                    }
                                                    errors++;
                                                    break;
                                                  }
                                                }
                                                if (_errs24 === errors) {
                                                  if (data7.id !== void 0) {
                                                    let data8 = data7.id;
                                                    const _errs25 = errors;
                                                    if (errors === _errs25) {
                                                      if (typeof data8 === "string") {
                                                        if (func22(data8) > 64) {
                                                          const err4 = { instancePath: instancePath + "/metadata/players/" + i0 + "/id", schemaPath: "#/definitions/player/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                          if (vErrors === null) {
                                                            vErrors = [err4];
                                                          } else {
                                                            vErrors.push(err4);
                                                          }
                                                          errors++;
                                                        }
                                                      } else {
                                                        const err5 = { instancePath: instancePath + "/metadata/players/" + i0 + "/id", schemaPath: "#/definitions/player/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                        if (vErrors === null) {
                                                          vErrors = [err5];
                                                        } else {
                                                          vErrors.push(err5);
                                                        }
                                                        errors++;
                                                      }
                                                    }
                                                    var valid5 = _errs25 === errors;
                                                  } else {
                                                    var valid5 = true;
                                                  }
                                                  if (valid5) {
                                                    if (data7.name !== void 0) {
                                                      let data9 = data7.name;
                                                      const _errs27 = errors;
                                                      if (errors === _errs27) {
                                                        if (typeof data9 === "string") {
                                                          if (func22(data9) > 64) {
                                                            const err6 = { instancePath: instancePath + "/metadata/players/" + i0 + "/name", schemaPath: "#/definitions/player/properties/name/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                            if (vErrors === null) {
                                                              vErrors = [err6];
                                                            } else {
                                                              vErrors.push(err6);
                                                            }
                                                            errors++;
                                                          }
                                                        } else {
                                                          const err7 = { instancePath: instancePath + "/metadata/players/" + i0 + "/name", schemaPath: "#/definitions/player/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                          if (vErrors === null) {
                                                            vErrors = [err7];
                                                          } else {
                                                            vErrors.push(err7);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var valid5 = _errs27 === errors;
                                                    } else {
                                                      var valid5 = true;
                                                    }
                                                    if (valid5) {
                                                      if (data7.playerIds !== void 0) {
                                                        let data10 = data7.playerIds;
                                                        const _errs29 = errors;
                                                        if (errors === _errs29) {
                                                          if (Array.isArray(data10)) {
                                                            if (data10.length > 10) {
                                                              const err8 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds", schemaPath: "#/definitions/player/properties/playerIds/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" };
                                                              if (vErrors === null) {
                                                                vErrors = [err8];
                                                              } else {
                                                                vErrors.push(err8);
                                                              }
                                                              errors++;
                                                            } else {
                                                              if (data10.length < 0) {
                                                                const err9 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds", schemaPath: "#/definitions/player/properties/playerIds/minItems", keyword: "minItems", params: { limit: 0 }, message: "must NOT have fewer than 0 items" };
                                                                if (vErrors === null) {
                                                                  vErrors = [err9];
                                                                } else {
                                                                  vErrors.push(err9);
                                                                }
                                                                errors++;
                                                              } else {
                                                                var valid6 = true;
                                                                const len1 = data10.length;
                                                                for (let i1 = 0; i1 < len1; i1++) {
                                                                  let data11 = data10[i1];
                                                                  const _errs31 = errors;
                                                                  if (errors === _errs31) {
                                                                    if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                                                                      let missing3;
                                                                      if (data11.id === void 0 && (missing3 = "id") || data11.source === void 0 && (missing3 = "source")) {
                                                                        const err10 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1, schemaPath: "#/definitions/player/properties/playerIds/items/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" };
                                                                        if (vErrors === null) {
                                                                          vErrors = [err10];
                                                                        } else {
                                                                          vErrors.push(err10);
                                                                        }
                                                                        errors++;
                                                                      } else {
                                                                        const _errs33 = errors;
                                                                        for (const key3 in data11) {
                                                                          if (!(key3 === "id" || key3 === "source")) {
                                                                            const err11 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1, schemaPath: "#/definitions/player/properties/playerIds/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                                                                            if (vErrors === null) {
                                                                              vErrors = [err11];
                                                                            } else {
                                                                              vErrors.push(err11);
                                                                            }
                                                                            errors++;
                                                                            break;
                                                                          }
                                                                        }
                                                                        if (_errs33 === errors) {
                                                                          if (data11.id !== void 0) {
                                                                            let data12 = data11.id;
                                                                            const _errs34 = errors;
                                                                            if (errors === _errs34) {
                                                                              if (typeof data12 === "string") {
                                                                                if (func22(data12) > 64) {
                                                                                  const err12 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/id", schemaPath: "#/definitions/player/properties/playerIds/items/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                                                  if (vErrors === null) {
                                                                                    vErrors = [err12];
                                                                                  } else {
                                                                                    vErrors.push(err12);
                                                                                  }
                                                                                  errors++;
                                                                                }
                                                                              } else {
                                                                                const err13 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/id", schemaPath: "#/definitions/player/properties/playerIds/items/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                                if (vErrors === null) {
                                                                                  vErrors = [err13];
                                                                                } else {
                                                                                  vErrors.push(err13);
                                                                                }
                                                                                errors++;
                                                                              }
                                                                            }
                                                                            var valid7 = _errs34 === errors;
                                                                          } else {
                                                                            var valid7 = true;
                                                                          }
                                                                          if (valid7) {
                                                                            if (data11.source !== void 0) {
                                                                              let data13 = data11.source;
                                                                              const _errs36 = errors;
                                                                              if (errors === _errs36) {
                                                                                if (typeof data13 === "string") {
                                                                                  if (func22(data13) > 64) {
                                                                                    const err14 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/source", schemaPath: "#/definitions/player/properties/playerIds/items/properties/source/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
                                                                                    if (vErrors === null) {
                                                                                      vErrors = [err14];
                                                                                    } else {
                                                                                      vErrors.push(err14);
                                                                                    }
                                                                                    errors++;
                                                                                  }
                                                                                } else {
                                                                                  const err15 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1 + "/source", schemaPath: "#/definitions/player/properties/playerIds/items/properties/source/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                                  if (vErrors === null) {
                                                                                    vErrors = [err15];
                                                                                  } else {
                                                                                    vErrors.push(err15);
                                                                                  }
                                                                                  errors++;
                                                                                }
                                                                              }
                                                                              var valid7 = _errs36 === errors;
                                                                            } else {
                                                                              var valid7 = true;
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    } else {
                                                                      const err16 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds/" + i1, schemaPath: "#/definitions/player/properties/playerIds/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                                                      if (vErrors === null) {
                                                                        vErrors = [err16];
                                                                      } else {
                                                                        vErrors.push(err16);
                                                                      }
                                                                      errors++;
                                                                    }
                                                                  }
                                                                  var valid6 = _errs31 === errors;
                                                                  if (!valid6) {
                                                                    break;
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          } else {
                                                            const err17 = { instancePath: instancePath + "/metadata/players/" + i0 + "/playerIds", schemaPath: "#/definitions/player/properties/playerIds/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                            if (vErrors === null) {
                                                              vErrors = [err17];
                                                            } else {
                                                              vErrors.push(err17);
                                                            }
                                                            errors++;
                                                          }
                                                        }
                                                        var valid5 = _errs29 === errors;
                                                      } else {
                                                        var valid5 = true;
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            } else {
                                              const err18 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/definitions/player/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                              if (vErrors === null) {
                                                vErrors = [err18];
                                              } else {
                                                vErrors.push(err18);
                                              }
                                              errors++;
                                            }
                                          }
                                          var _valid0 = _errs21 === errors;
                                          if (_valid0 && valid3) {
                                            valid3 = false;
                                            passing0 = [passing0, 1];
                                          } else {
                                            if (_valid0) {
                                              valid3 = true;
                                              passing0 = 1;
                                            }
                                          }
                                          if (!valid3) {
                                            const err19 = { instancePath: instancePath + "/metadata/players/" + i0, schemaPath: "#/properties/metadata/properties/players/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                                            if (vErrors === null) {
                                              vErrors = [err19];
                                            } else {
                                              vErrors.push(err19);
                                            }
                                            errors++;
                                            validate112.errors = vErrors;
                                            return false;
                                          } else {
                                            errors = _errs18;
                                            if (vErrors !== null) {
                                              if (_errs18) {
                                                vErrors.length = _errs18;
                                              } else {
                                                vErrors = null;
                                              }
                                            }
                                          }
                                          var valid2 = _errs17 === errors;
                                          if (!valid2) {
                                            break;
                                          }
                                        }
                                      }
                                    } else {
                                      validate112.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                      return false;
                                    }
                                  }
                                  var valid1 = _errs15 === errors;
                                } else {
                                  var valid1 = true;
                                }
                                if (valid1) {
                                  if (data2.teamNames !== void 0) {
                                    let data14 = data2.teamNames;
                                    const _errs38 = errors;
                                    if (errors === _errs38) {
                                      if (Array.isArray(data14)) {
                                        if (data14.length > 2) {
                                          validate112.errors = [{ instancePath: instancePath + "/metadata/teamNames", schemaPath: "#/properties/metadata/properties/teamNames/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                          return false;
                                        } else {
                                          if (data14.length < 2) {
                                            validate112.errors = [{ instancePath: instancePath + "/metadata/teamNames", schemaPath: "#/properties/metadata/properties/teamNames/minItems", keyword: "minItems", params: { limit: 2 }, message: "must NOT have fewer than 2 items" }];
                                            return false;
                                          } else {
                                            var valid8 = true;
                                            const len2 = data14.length;
                                            for (let i2 = 0; i2 < len2; i2++) {
                                              let data15 = data14[i2];
                                              const _errs40 = errors;
                                              if (errors === _errs40) {
                                                if (typeof data15 === "string") {
                                                  if (func22(data15) > 64) {
                                                    validate112.errors = [{ instancePath: instancePath + "/metadata/teamNames/" + i2, schemaPath: "#/properties/metadata/properties/teamNames/items/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                    return false;
                                                  }
                                                } else {
                                                  validate112.errors = [{ instancePath: instancePath + "/metadata/teamNames/" + i2, schemaPath: "#/properties/metadata/properties/teamNames/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                              }
                                              var valid8 = _errs40 === errors;
                                              if (!valid8) {
                                                break;
                                              }
                                            }
                                          }
                                        }
                                      } else {
                                        validate112.errors = [{ instancePath: instancePath + "/metadata/teamNames", schemaPath: "#/properties/metadata/properties/teamNames/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid1 = _errs38 === errors;
                                  } else {
                                    var valid1 = true;
                                  }
                                  if (valid1) {
                                    if (data2.initialScore !== void 0) {
                                      let data16 = data2.initialScore;
                                      const _errs42 = errors;
                                      if (errors === _errs42) {
                                        if (Array.isArray(data16)) {
                                          if (data16.length > 2) {
                                            validate112.errors = [{ instancePath: instancePath + "/metadata/initialScore", schemaPath: "#/properties/metadata/properties/initialScore/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                            return false;
                                          } else {
                                            var valid9 = true;
                                            const len3 = data16.length;
                                            for (let i3 = 0; i3 < len3; i3++) {
                                              let data17 = data16[i3];
                                              const _errs44 = errors;
                                              if (!(typeof data17 == "number" && (!(data17 % 1) && !isNaN(data17)) && isFinite(data17))) {
                                                validate112.errors = [{ instancePath: instancePath + "/metadata/initialScore/" + i3, schemaPath: "#/properties/metadata/properties/initialScore/items/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                return false;
                                              }
                                              var valid9 = _errs44 === errors;
                                              if (!valid9) {
                                                break;
                                              }
                                            }
                                          }
                                        } else {
                                          validate112.errors = [{ instancePath: instancePath + "/metadata/initialScore", schemaPath: "#/properties/metadata/properties/initialScore/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                          return false;
                                        }
                                      }
                                      var valid1 = _errs42 === errors;
                                    } else {
                                      var valid1 = true;
                                    }
                                    if (valid1) {
                                      if (data2.finalScore !== void 0) {
                                        let data18 = data2.finalScore;
                                        const _errs46 = errors;
                                        if (errors === _errs46) {
                                          if (Array.isArray(data18)) {
                                            if (data18.length > 2) {
                                              validate112.errors = [{ instancePath: instancePath + "/metadata/finalScore", schemaPath: "#/properties/metadata/properties/finalScore/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                              return false;
                                            } else {
                                              var valid10 = true;
                                              const len4 = data18.length;
                                              for (let i4 = 0; i4 < len4; i4++) {
                                                let data19 = data18[i4];
                                                const _errs48 = errors;
                                                if (!(typeof data19 == "number" && (!(data19 % 1) && !isNaN(data19)) && isFinite(data19))) {
                                                  validate112.errors = [{ instancePath: instancePath + "/metadata/finalScore/" + i4, schemaPath: "#/properties/metadata/properties/finalScore/items/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                  return false;
                                                }
                                                var valid10 = _errs48 === errors;
                                                if (!valid10) {
                                                  break;
                                                }
                                              }
                                            }
                                          } else {
                                            validate112.errors = [{ instancePath: instancePath + "/metadata/finalScore", schemaPath: "#/properties/metadata/properties/finalScore/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                            return false;
                                          }
                                        }
                                        var valid1 = _errs46 === errors;
                                      } else {
                                        var valid1 = true;
                                      }
                                      if (valid1) {
                                        if (data2.date !== void 0) {
                                          let data20 = data2.date;
                                          const _errs50 = errors;
                                          const _errs52 = errors;
                                          let valid11 = false;
                                          const _errs53 = errors;
                                          if (errors === _errs53) {
                                            if (typeof data20 === "string") {
                                              if (!formats02.validate(data20)) {
                                                const err20 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/0/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' };
                                                if (vErrors === null) {
                                                  vErrors = [err20];
                                                } else {
                                                  vErrors.push(err20);
                                                }
                                                errors++;
                                              }
                                            }
                                          }
                                          var _valid1 = _errs53 === errors;
                                          valid11 = valid11 || _valid1;
                                          if (!valid11) {
                                            const _errs54 = errors;
                                            if (errors === _errs54) {
                                              if (typeof data20 === "string") {
                                                if (!formats22.validate(data20)) {
                                                  const err21 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/1/format", keyword: "format", params: { format: "date" }, message: 'must match format "date"' };
                                                  if (vErrors === null) {
                                                    vErrors = [err21];
                                                  } else {
                                                    vErrors.push(err21);
                                                  }
                                                  errors++;
                                                }
                                              }
                                            }
                                            var _valid1 = _errs54 === errors;
                                            valid11 = valid11 || _valid1;
                                            if (!valid11) {
                                              const _errs55 = errors;
                                              if (typeof data20 === "string") {
                                                if (!pattern12.test(data20)) {
                                                  const err22 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/2/pattern", keyword: "pattern", params: { pattern: "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$" }, message: 'must match pattern "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$"' };
                                                  if (vErrors === null) {
                                                    vErrors = [err22];
                                                  } else {
                                                    vErrors.push(err22);
                                                  }
                                                  errors++;
                                                }
                                              }
                                              var _valid1 = _errs55 === errors;
                                              valid11 = valid11 || _valid1;
                                            }
                                          }
                                          if (!valid11) {
                                            const err23 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                                            if (vErrors === null) {
                                              vErrors = [err23];
                                            } else {
                                              vErrors.push(err23);
                                            }
                                            errors++;
                                            validate112.errors = vErrors;
                                            return false;
                                          } else {
                                            errors = _errs52;
                                            if (vErrors !== null) {
                                              if (_errs52) {
                                                vErrors.length = _errs52;
                                              } else {
                                                vErrors = null;
                                              }
                                            }
                                          }
                                          if (errors === _errs50) {
                                            if (typeof data20 === "string") {
                                              if (func22(data20) > 64) {
                                                validate112.errors = [{ instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                return false;
                                              }
                                            } else {
                                              validate112.errors = [{ instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                              return false;
                                            }
                                          }
                                          var valid1 = _errs50 === errors;
                                        } else {
                                          var valid1 = true;
                                        }
                                        if (valid1) {
                                          if (data2.ruleset !== void 0) {
                                            let data21 = data2.ruleset;
                                            const _errs56 = errors;
                                            const _errs58 = errors;
                                            const _errs59 = errors;
                                            const _errs60 = errors;
                                            if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                              let missing4;
                                              if (data21.winning_score === void 0 && (missing4 = "winning_score") || data21.num_deals === void 0 && (missing4 = "num_deals")) {
                                                const err24 = {};
                                                if (vErrors === null) {
                                                  vErrors = [err24];
                                                } else {
                                                  vErrors.push(err24);
                                                }
                                                errors++;
                                              }
                                            }
                                            var valid13 = _errs60 === errors;
                                            if (valid13) {
                                              validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/0/not", keyword: "not", params: {}, message: "must NOT be valid" }];
                                              return false;
                                            } else {
                                              errors = _errs59;
                                              if (vErrors !== null) {
                                                if (_errs59) {
                                                  vErrors.length = _errs59;
                                                } else {
                                                  vErrors = null;
                                                }
                                              }
                                            }
                                            var valid12 = _errs58 === errors;
                                            if (valid12) {
                                              const _errs61 = errors;
                                              const _errs62 = errors;
                                              let valid14 = false;
                                              const _errs63 = errors;
                                              const _errs64 = errors;
                                              const _errs65 = errors;
                                              if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                                let missing5;
                                                if (data21.winning_score === void 0 && (missing5 = "winning_score")) {
                                                  const err25 = {};
                                                  if (vErrors === null) {
                                                    vErrors = [err25];
                                                  } else {
                                                    vErrors.push(err25);
                                                  }
                                                  errors++;
                                                } else {
                                                  if (data21.winning_score !== void 0) {
                                                    if (0 !== data21.winning_score) {
                                                      const err26 = {};
                                                      if (vErrors === null) {
                                                        vErrors = [err26];
                                                      } else {
                                                        vErrors.push(err26);
                                                      }
                                                      errors++;
                                                    }
                                                  }
                                                }
                                              }
                                              var valid15 = _errs65 === errors;
                                              if (valid15) {
                                                const err27 = { instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/0/not", keyword: "not", params: {}, message: "must NOT be valid" };
                                                if (vErrors === null) {
                                                  vErrors = [err27];
                                                } else {
                                                  vErrors.push(err27);
                                                }
                                                errors++;
                                              } else {
                                                errors = _errs64;
                                                if (vErrors !== null) {
                                                  if (_errs64) {
                                                    vErrors.length = _errs64;
                                                  } else {
                                                    vErrors = null;
                                                  }
                                                }
                                              }
                                              var _valid2 = _errs63 === errors;
                                              valid14 = valid14 || _valid2;
                                              if (!valid14) {
                                                const _errs67 = errors;
                                                if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                                  let missing6;
                                                  if (data21.num_deals === void 0 && (missing6 = "num_deals")) {
                                                    const err28 = { instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/1/required", keyword: "required", params: { missingProperty: missing6 }, message: "must have required property '" + missing6 + "'" };
                                                    if (vErrors === null) {
                                                      vErrors = [err28];
                                                    } else {
                                                      vErrors.push(err28);
                                                    }
                                                    errors++;
                                                  } else {
                                                    if (data21.num_deals !== void 0) {
                                                      let data23 = data21.num_deals;
                                                      const _errs68 = errors;
                                                      if (!(typeof data23 == "number" && (!(data23 % 1) && !isNaN(data23)) && isFinite(data23))) {
                                                        const err29 = { instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/1/properties/num_deals/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                                                        if (vErrors === null) {
                                                          vErrors = [err29];
                                                        } else {
                                                          vErrors.push(err29);
                                                        }
                                                        errors++;
                                                      }
                                                      if (errors === _errs68) {
                                                        if (typeof data23 == "number" && isFinite(data23)) {
                                                          if (data23 < 1 || isNaN(data23)) {
                                                            const err30 = { instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf/1/properties/num_deals/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                                                            if (vErrors === null) {
                                                              vErrors = [err30];
                                                            } else {
                                                              vErrors.push(err30);
                                                            }
                                                            errors++;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                                var _valid2 = _errs67 === errors;
                                                valid14 = valid14 || _valid2;
                                              }
                                              if (!valid14) {
                                                const err31 = { instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/allOf/1/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                                                if (vErrors === null) {
                                                  vErrors = [err31];
                                                } else {
                                                  vErrors.push(err31);
                                                }
                                                errors++;
                                                validate112.errors = vErrors;
                                                return false;
                                              } else {
                                                errors = _errs62;
                                                if (vErrors !== null) {
                                                  if (_errs62) {
                                                    vErrors.length = _errs62;
                                                  } else {
                                                    vErrors = null;
                                                  }
                                                }
                                              }
                                              var valid12 = _errs61 === errors;
                                            }
                                            if (errors === _errs56) {
                                              if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
                                                const _errs70 = errors;
                                                for (const key4 in data21) {
                                                  if (!func11.call(schema12.properties.metadata.properties.ruleset.properties, key4)) {
                                                    validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" }];
                                                    return false;
                                                    break;
                                                  }
                                                }
                                                if (_errs70 === errors) {
                                                  if (data21.std !== void 0) {
                                                    const _errs71 = errors;
                                                    if (typeof data21.std !== "boolean") {
                                                      validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/std", schemaPath: "#/properties/metadata/properties/ruleset/properties/std/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                      return false;
                                                    }
                                                    var valid18 = _errs71 === errors;
                                                  } else {
                                                    var valid18 = true;
                                                  }
                                                  if (valid18) {
                                                    if (data21.min_rank !== void 0) {
                                                      let data25 = data21.min_rank;
                                                      const _errs73 = errors;
                                                      if (!(typeof data25 == "number" && (!(data25 % 1) && !isNaN(data25)) && isFinite(data25))) {
                                                        validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/min_rank", schemaPath: "#/properties/metadata/properties/ruleset/properties/min_rank/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                        return false;
                                                      }
                                                      var valid18 = _errs73 === errors;
                                                    } else {
                                                      var valid18 = true;
                                                    }
                                                    if (valid18) {
                                                      if (data21.winning_score !== void 0) {
                                                        let data26 = data21.winning_score;
                                                        const _errs75 = errors;
                                                        if (!(typeof data26 == "number" && (!(data26 % 1) && !isNaN(data26)) && isFinite(data26))) {
                                                          validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/winning_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/winning_score/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                          return false;
                                                        }
                                                        if (errors === _errs75) {
                                                          if (typeof data26 == "number" && isFinite(data26)) {
                                                            if (data26 < 0 || isNaN(data26)) {
                                                              validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/winning_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/winning_score/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                              return false;
                                                            }
                                                          }
                                                        }
                                                        var valid18 = _errs75 === errors;
                                                      } else {
                                                        var valid18 = true;
                                                      }
                                                      if (valid18) {
                                                        if (data21.num_deals !== void 0) {
                                                          let data27 = data21.num_deals;
                                                          const _errs77 = errors;
                                                          if (!(typeof data27 == "number" && (!(data27 % 1) && !isNaN(data27)) && isFinite(data27))) {
                                                            validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/properties/num_deals/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                            return false;
                                                          }
                                                          if (errors === _errs77) {
                                                            if (typeof data27 == "number" && isFinite(data27)) {
                                                              if (data27 < 0 || isNaN(data27)) {
                                                                validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/num_deals", schemaPath: "#/properties/metadata/properties/ruleset/properties/num_deals/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                                                return false;
                                                              }
                                                            }
                                                          }
                                                          var valid18 = _errs77 === errors;
                                                        } else {
                                                          var valid18 = true;
                                                        }
                                                        if (valid18) {
                                                          if (data21.canadian !== void 0) {
                                                            const _errs79 = errors;
                                                            if (typeof data21.canadian !== "boolean") {
                                                              validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/canadian", schemaPath: "#/properties/metadata/properties/ruleset/properties/canadian/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                              return false;
                                                            }
                                                            var valid18 = _errs79 === errors;
                                                          } else {
                                                            var valid18 = true;
                                                          }
                                                          if (valid18) {
                                                            if (data21.loner_lead !== void 0) {
                                                              let data29 = data21.loner_lead;
                                                              const _errs81 = errors;
                                                              if (typeof data29 !== "string") {
                                                                validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_lead", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_lead/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                              }
                                                              if (!(data29 === "LEFT_OF_DEALER" || data29 === "LEFT_OF_LONER")) {
                                                                validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_lead", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_lead/enum", keyword: "enum", params: { allowedValues: schema12.properties.metadata.properties.ruleset.properties.loner_lead.enum }, message: "must be equal to one of the allowed values" }];
                                                                return false;
                                                              }
                                                              var valid18 = _errs81 === errors;
                                                            } else {
                                                              var valid18 = true;
                                                            }
                                                            if (valid18) {
                                                              if (data21.loner_march_score !== void 0) {
                                                                let data30 = data21.loner_march_score;
                                                                const _errs83 = errors;
                                                                if (!(typeof data30 == "number" && (!(data30 % 1) && !isNaN(data30)) && isFinite(data30))) {
                                                                  validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_march_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_march_score/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                  return false;
                                                                }
                                                                var valid18 = _errs83 === errors;
                                                              } else {
                                                                var valid18 = true;
                                                              }
                                                              if (valid18) {
                                                                if (data21.loner_euchred_score !== void 0) {
                                                                  let data31 = data21.loner_euchred_score;
                                                                  const _errs85 = errors;
                                                                  if (!(typeof data31 == "number" && (!(data31 % 1) && !isNaN(data31)) && isFinite(data31))) {
                                                                    validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/loner_euchred_score", schemaPath: "#/properties/metadata/properties/ruleset/properties/loner_euchred_score/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                    return false;
                                                                  }
                                                                  var valid18 = _errs85 === errors;
                                                                } else {
                                                                  var valid18 = true;
                                                                }
                                                                if (valid18) {
                                                                  if (data21.defend_alone !== void 0) {
                                                                    const _errs87 = errors;
                                                                    if (typeof data21.defend_alone !== "boolean") {
                                                                      validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/defend_alone", schemaPath: "#/properties/metadata/properties/ruleset/properties/defend_alone/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                      return false;
                                                                    }
                                                                    var valid18 = _errs87 === errors;
                                                                  } else {
                                                                    var valid18 = true;
                                                                  }
                                                                  if (valid18) {
                                                                    if (data21.farmers !== void 0) {
                                                                      const _errs89 = errors;
                                                                      if (typeof data21.farmers !== "boolean") {
                                                                        validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/farmers", schemaPath: "#/properties/metadata/properties/ruleset/properties/farmers/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                        return false;
                                                                      }
                                                                      var valid18 = _errs89 === errors;
                                                                    } else {
                                                                      var valid18 = true;
                                                                    }
                                                                    if (valid18) {
                                                                      if (data21.partners_best !== void 0) {
                                                                        const _errs91 = errors;
                                                                        if (typeof data21.partners_best !== "boolean") {
                                                                          validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/partners_best", schemaPath: "#/properties/metadata/properties/ruleset/properties/partners_best/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                          return false;
                                                                        }
                                                                        var valid18 = _errs91 === errors;
                                                                      } else {
                                                                        var valid18 = true;
                                                                      }
                                                                      if (valid18) {
                                                                        if (data21.go_under !== void 0) {
                                                                          const _errs93 = errors;
                                                                          if (typeof data21.go_under !== "boolean") {
                                                                            validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/go_under", schemaPath: "#/properties/metadata/properties/ruleset/properties/go_under/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                            return false;
                                                                          }
                                                                          var valid18 = _errs93 === errors;
                                                                        } else {
                                                                          var valid18 = true;
                                                                        }
                                                                        if (valid18) {
                                                                          if (data21.joker !== void 0) {
                                                                            const _errs95 = errors;
                                                                            if (typeof data21.joker !== "boolean") {
                                                                              validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/joker", schemaPath: "#/properties/metadata/properties/ruleset/properties/joker/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                              return false;
                                                                            }
                                                                            var valid18 = _errs95 === errors;
                                                                          } else {
                                                                            var valid18 = true;
                                                                          }
                                                                          if (valid18) {
                                                                            if (data21.num_players !== void 0) {
                                                                              let data37 = data21.num_players;
                                                                              const _errs97 = errors;
                                                                              if (!(typeof data37 == "number" && (!(data37 % 1) && !isNaN(data37)) && isFinite(data37))) {
                                                                                validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/num_players", schemaPath: "#/properties/metadata/properties/ruleset/properties/num_players/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                                return false;
                                                                              }
                                                                              var valid18 = _errs97 === errors;
                                                                            } else {
                                                                              var valid18 = true;
                                                                            }
                                                                            if (valid18) {
                                                                              if (data21.allow_no_trump !== void 0) {
                                                                                const _errs99 = errors;
                                                                                if (typeof data21.allow_no_trump !== "boolean") {
                                                                                  validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/allow_no_trump", schemaPath: "#/properties/metadata/properties/ruleset/properties/allow_no_trump/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                  return false;
                                                                                }
                                                                                var valid18 = _errs99 === errors;
                                                                              } else {
                                                                                var valid18 = true;
                                                                              }
                                                                              if (valid18) {
                                                                                if (data21.fast_break !== void 0) {
                                                                                  const _errs101 = errors;
                                                                                  if (typeof data21.fast_break !== "boolean") {
                                                                                    validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/fast_break", schemaPath: "#/properties/metadata/properties/ruleset/properties/fast_break/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                    return false;
                                                                                  }
                                                                                  var valid18 = _errs101 === errors;
                                                                                } else {
                                                                                  var valid18 = true;
                                                                                }
                                                                                if (valid18) {
                                                                                  if (data21.four_trick_tokens !== void 0) {
                                                                                    const _errs103 = errors;
                                                                                    if (typeof data21.four_trick_tokens !== "boolean") {
                                                                                      validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset/four_trick_tokens", schemaPath: "#/properties/metadata/properties/ruleset/properties/four_trick_tokens/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                      return false;
                                                                                    }
                                                                                    var valid18 = _errs103 === errors;
                                                                                  } else {
                                                                                    var valid18 = true;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              } else {
                                                validate112.errors = [{ instancePath: instancePath + "/metadata/ruleset", schemaPath: "#/properties/metadata/properties/ruleset/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                return false;
                                              }
                                            }
                                            var valid1 = _errs56 === errors;
                                          } else {
                                            var valid1 = true;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      validate112.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                      return false;
                    }
                  }
                  var valid0 = _errs6 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.deals !== void 0) {
                    let data41 = data.deals;
                    const _errs105 = errors;
                    if (errors === _errs105) {
                      if (Array.isArray(data41)) {
                        if (data41.length > 100) {
                          validate112.errors = [{ instancePath: instancePath + "/deals", schemaPath: "#/properties/deals/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" }];
                          return false;
                        } else {
                          var valid19 = true;
                          const len5 = data41.length;
                          for (let i5 = 0; i5 < len5; i5++) {
                            let data42 = data41[i5];
                            const _errs107 = errors;
                            const _errs108 = errors;
                            let valid20 = false;
                            let passing1 = null;
                            const _errs109 = errors;
                            if (errors === _errs109) {
                              if (data42 && typeof data42 == "object" && !Array.isArray(data42)) {
                                let missing7;
                                if (data42.dealNumber === void 0 && (missing7 = "dealNumber") || data42.initialState === void 0 && (missing7 = "initialState") || data42.phases === void 0 && (missing7 = "phases")) {
                                  const err32 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/0/required", keyword: "required", params: { missingProperty: missing7 }, message: "must have required property '" + missing7 + "'" };
                                  if (vErrors === null) {
                                    vErrors = [err32];
                                  } else {
                                    vErrors.push(err32);
                                  }
                                  errors++;
                                } else {
                                  const _errs111 = errors;
                                  for (const key5 in data42) {
                                    if (!(key5 === "dealNumber" || key5 === "initialState" || key5 === "phases" || key5 === "alternativeLines")) {
                                      const err33 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key5 }, message: "must NOT have additional properties" };
                                      if (vErrors === null) {
                                        vErrors = [err33];
                                      } else {
                                        vErrors.push(err33);
                                      }
                                      errors++;
                                      break;
                                    }
                                  }
                                  if (_errs111 === errors) {
                                    if (data42.dealNumber !== void 0) {
                                      let data43 = data42.dealNumber;
                                      const _errs112 = errors;
                                      if (!(typeof data43 == "number" && (!(data43 % 1) && !isNaN(data43)) && isFinite(data43))) {
                                        const err34 = { instancePath: instancePath + "/deals/" + i5 + "/dealNumber", schemaPath: "#/properties/deals/items/oneOf/0/properties/dealNumber/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                                        if (vErrors === null) {
                                          vErrors = [err34];
                                        } else {
                                          vErrors.push(err34);
                                        }
                                        errors++;
                                      }
                                      if (errors === _errs112) {
                                        if (typeof data43 == "number" && isFinite(data43)) {
                                          if (data43 < 0 || isNaN(data43)) {
                                            const err35 = { instancePath: instancePath + "/deals/" + i5 + "/dealNumber", schemaPath: "#/properties/deals/items/oneOf/0/properties/dealNumber/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                                            if (vErrors === null) {
                                              vErrors = [err35];
                                            } else {
                                              vErrors.push(err35);
                                            }
                                            errors++;
                                          }
                                        }
                                      }
                                      var valid21 = _errs112 === errors;
                                    } else {
                                      var valid21 = true;
                                    }
                                    if (valid21) {
                                      if (data42.initialState !== void 0) {
                                        let data44 = data42.initialState;
                                        const _errs114 = errors;
                                        if (errors === _errs114) {
                                          if (data44 && typeof data44 == "object" && !Array.isArray(data44)) {
                                            let missing8;
                                            if (data44.dealer === void 0 && (missing8 = "dealer") || data44.upCard === void 0 && (missing8 = "upCard")) {
                                              const err36 = { instancePath: instancePath + "/deals/" + i5 + "/initialState", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/required", keyword: "required", params: { missingProperty: missing8 }, message: "must have required property '" + missing8 + "'" };
                                              if (vErrors === null) {
                                                vErrors = [err36];
                                              } else {
                                                vErrors.push(err36);
                                              }
                                              errors++;
                                            } else {
                                              const _errs116 = errors;
                                              for (const key6 in data44) {
                                                if (!(key6 === "dealer" || key6 === "upCard" || key6 === "playerCards")) {
                                                  const err37 = { instancePath: instancePath + "/deals/" + i5 + "/initialState", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key6 }, message: "must NOT have additional properties" };
                                                  if (vErrors === null) {
                                                    vErrors = [err37];
                                                  } else {
                                                    vErrors.push(err37);
                                                  }
                                                  errors++;
                                                  break;
                                                }
                                              }
                                              if (_errs116 === errors) {
                                                if (data44.dealer !== void 0) {
                                                  let data45 = data44.dealer;
                                                  const _errs117 = errors;
                                                  if (!(typeof data45 == "number" && (!(data45 % 1) && !isNaN(data45)) && isFinite(data45))) {
                                                    const err38 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/dealer", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/dealer/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                                                    if (vErrors === null) {
                                                      vErrors = [err38];
                                                    } else {
                                                      vErrors.push(err38);
                                                    }
                                                    errors++;
                                                  }
                                                  if (errors === _errs117) {
                                                    if (typeof data45 == "number" && isFinite(data45)) {
                                                      if (data45 > 9 || isNaN(data45)) {
                                                        const err39 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/dealer", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/dealer/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9 }, message: "must be <= 9" };
                                                        if (vErrors === null) {
                                                          vErrors = [err39];
                                                        } else {
                                                          vErrors.push(err39);
                                                        }
                                                        errors++;
                                                      } else {
                                                        if (data45 < 0 || isNaN(data45)) {
                                                          const err40 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/dealer", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/dealer/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                                                          if (vErrors === null) {
                                                            vErrors = [err40];
                                                          } else {
                                                            vErrors.push(err40);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                    }
                                                  }
                                                  var valid22 = _errs117 === errors;
                                                } else {
                                                  var valid22 = true;
                                                }
                                                if (valid22) {
                                                  if (data44.upCard !== void 0) {
                                                    let data46 = data44.upCard;
                                                    const _errs119 = errors;
                                                    const _errs120 = errors;
                                                    if (errors === _errs120) {
                                                      if (typeof data46 === "string") {
                                                        if (!pattern4.test(data46)) {
                                                          const err41 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/upCard", schemaPath: "#/definitions/card/pattern", keyword: "pattern", params: { pattern: "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$" }, message: 'must match pattern "^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$"' };
                                                          if (vErrors === null) {
                                                            vErrors = [err41];
                                                          } else {
                                                            vErrors.push(err41);
                                                          }
                                                          errors++;
                                                        }
                                                      } else {
                                                        const err42 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/upCard", schemaPath: "#/definitions/card/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                        if (vErrors === null) {
                                                          vErrors = [err42];
                                                        } else {
                                                          vErrors.push(err42);
                                                        }
                                                        errors++;
                                                      }
                                                    }
                                                    var valid22 = _errs119 === errors;
                                                  } else {
                                                    var valid22 = true;
                                                  }
                                                  if (valid22) {
                                                    if (data44.playerCards !== void 0) {
                                                      let data47 = data44.playerCards;
                                                      const _errs122 = errors;
                                                      if (errors === _errs122) {
                                                        if (Array.isArray(data47)) {
                                                          if (data47.length > 10) {
                                                            const err43 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/playerCards", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/playerCards/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" };
                                                            if (vErrors === null) {
                                                              vErrors = [err43];
                                                            } else {
                                                              vErrors.push(err43);
                                                            }
                                                            errors++;
                                                          } else {
                                                            var valid24 = true;
                                                            const len6 = data47.length;
                                                            for (let i6 = 0; i6 < len6; i6++) {
                                                              const _errs124 = errors;
                                                              if (!validate12(data47[i6], { instancePath: instancePath + "/deals/" + i5 + "/initialState/playerCards/" + i6, parentData: data47, parentDataProperty: i6, rootData })) {
                                                                vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                                                                errors = vErrors.length;
                                                              }
                                                              var valid24 = _errs124 === errors;
                                                              if (!valid24) {
                                                                break;
                                                              }
                                                            }
                                                          }
                                                        } else {
                                                          const err44 = { instancePath: instancePath + "/deals/" + i5 + "/initialState/playerCards", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/properties/playerCards/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                          if (vErrors === null) {
                                                            vErrors = [err44];
                                                          } else {
                                                            vErrors.push(err44);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var valid22 = _errs122 === errors;
                                                    } else {
                                                      var valid22 = true;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          } else {
                                            const err45 = { instancePath: instancePath + "/deals/" + i5 + "/initialState", schemaPath: "#/properties/deals/items/oneOf/0/properties/initialState/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                            if (vErrors === null) {
                                              vErrors = [err45];
                                            } else {
                                              vErrors.push(err45);
                                            }
                                            errors++;
                                          }
                                        }
                                        var valid21 = _errs114 === errors;
                                      } else {
                                        var valid21 = true;
                                      }
                                      if (valid21) {
                                        if (data42.phases !== void 0) {
                                          let data49 = data42.phases;
                                          const _errs125 = errors;
                                          if (errors === _errs125) {
                                            if (Array.isArray(data49)) {
                                              if (data49.length > 2) {
                                                const err46 = { instancePath: instancePath + "/deals/" + i5 + "/phases", schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" };
                                                if (vErrors === null) {
                                                  vErrors = [err46];
                                                } else {
                                                  vErrors.push(err46);
                                                }
                                                errors++;
                                              } else {
                                                if (data49.length < 0) {
                                                  const err47 = { instancePath: instancePath + "/deals/" + i5 + "/phases", schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/minItems", keyword: "minItems", params: { limit: 0 }, message: "must NOT have fewer than 0 items" };
                                                  if (vErrors === null) {
                                                    vErrors = [err47];
                                                  } else {
                                                    vErrors.push(err47);
                                                  }
                                                  errors++;
                                                } else {
                                                  var valid25 = true;
                                                  const len7 = data49.length;
                                                  for (let i7 = 0; i7 < len7; i7++) {
                                                    let data50 = data49[i7];
                                                    const _errs127 = errors;
                                                    const _errs128 = errors;
                                                    let valid26 = false;
                                                    let passing2 = null;
                                                    const _errs129 = errors;
                                                    if (!validate14(data50, { instancePath: instancePath + "/deals/" + i5 + "/phases/" + i7, parentData: data49, parentDataProperty: i7, rootData })) {
                                                      vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var _valid4 = _errs129 === errors;
                                                    if (_valid4) {
                                                      valid26 = true;
                                                      passing2 = 0;
                                                    }
                                                    const _errs130 = errors;
                                                    if (!validate17(data50, { instancePath: instancePath + "/deals/" + i5 + "/phases/" + i7, parentData: data49, parentDataProperty: i7, rootData })) {
                                                      vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var _valid4 = _errs130 === errors;
                                                    if (_valid4 && valid26) {
                                                      valid26 = false;
                                                      passing2 = [passing2, 1];
                                                    } else {
                                                      if (_valid4) {
                                                        valid26 = true;
                                                        passing2 = 1;
                                                      }
                                                    }
                                                    if (!valid26) {
                                                      const err48 = { instancePath: instancePath + "/deals/" + i5 + "/phases/" + i7, schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
                                                      if (vErrors === null) {
                                                        vErrors = [err48];
                                                      } else {
                                                        vErrors.push(err48);
                                                      }
                                                      errors++;
                                                    } else {
                                                      errors = _errs128;
                                                      if (vErrors !== null) {
                                                        if (_errs128) {
                                                          vErrors.length = _errs128;
                                                        } else {
                                                          vErrors = null;
                                                        }
                                                      }
                                                    }
                                                    var valid25 = _errs127 === errors;
                                                    if (!valid25) {
                                                      break;
                                                    }
                                                  }
                                                }
                                              }
                                            } else {
                                              const err49 = { instancePath: instancePath + "/deals/" + i5 + "/phases", schemaPath: "#/properties/deals/items/oneOf/0/properties/phases/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                              if (vErrors === null) {
                                                vErrors = [err49];
                                              } else {
                                                vErrors.push(err49);
                                              }
                                              errors++;
                                            }
                                          }
                                          var valid21 = _errs125 === errors;
                                        } else {
                                          var valid21 = true;
                                        }
                                        if (valid21) {
                                          if (data42.alternativeLines !== void 0) {
                                            let data51 = data42.alternativeLines;
                                            const _errs131 = errors;
                                            if (errors === _errs131) {
                                              if (Array.isArray(data51)) {
                                                if (data51.length > 50) {
                                                  const err50 = { instancePath: instancePath + "/deals/" + i5 + "/alternativeLines", schemaPath: "#/properties/deals/items/oneOf/0/properties/alternativeLines/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" };
                                                  if (vErrors === null) {
                                                    vErrors = [err50];
                                                  } else {
                                                    vErrors.push(err50);
                                                  }
                                                  errors++;
                                                } else {
                                                  var valid27 = true;
                                                  const len8 = data51.length;
                                                  for (let i8 = 0; i8 < len8; i8++) {
                                                    const _errs133 = errors;
                                                    if (!validate20(data51[i8], { instancePath: instancePath + "/deals/" + i5 + "/alternativeLines/" + i8, parentData: data51, parentDataProperty: i8, rootData })) {
                                                      vErrors = vErrors === null ? validate20.errors : vErrors.concat(validate20.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var valid27 = _errs133 === errors;
                                                    if (!valid27) {
                                                      break;
                                                    }
                                                  }
                                                }
                                              } else {
                                                const err51 = { instancePath: instancePath + "/deals/" + i5 + "/alternativeLines", schemaPath: "#/properties/deals/items/oneOf/0/properties/alternativeLines/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                if (vErrors === null) {
                                                  vErrors = [err51];
                                                } else {
                                                  vErrors.push(err51);
                                                }
                                                errors++;
                                              }
                                            }
                                            var valid21 = _errs131 === errors;
                                          } else {
                                            var valid21 = true;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              } else {
                                const err52 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/0/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                if (vErrors === null) {
                                  vErrors = [err52];
                                } else {
                                  vErrors.push(err52);
                                }
                                errors++;
                              }
                            }
                            var _valid3 = _errs109 === errors;
                            if (_valid3) {
                              valid20 = true;
                              passing1 = 0;
                            }
                            const _errs134 = errors;
                            if (errors === _errs134) {
                              if (typeof data42 === "string") {
                                if (!pattern9.test(data42)) {
                                  const err53 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/1/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9+/_-]*={0,2}$" }, message: 'must match pattern "^[A-Za-z0-9+/_-]*={0,2}$"' };
                                  if (vErrors === null) {
                                    vErrors = [err53];
                                  } else {
                                    vErrors.push(err53);
                                  }
                                  errors++;
                                }
                              } else {
                                const err54 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf/1/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                if (vErrors === null) {
                                  vErrors = [err54];
                                } else {
                                  vErrors.push(err54);
                                }
                                errors++;
                              }
                            }
                            var _valid3 = _errs134 === errors;
                            if (_valid3 && valid20) {
                              valid20 = false;
                              passing1 = [passing1, 1];
                            } else {
                              if (_valid3) {
                                valid20 = true;
                                passing1 = 1;
                              }
                            }
                            if (!valid20) {
                              const err55 = { instancePath: instancePath + "/deals/" + i5, schemaPath: "#/properties/deals/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                              if (vErrors === null) {
                                vErrors = [err55];
                              } else {
                                vErrors.push(err55);
                              }
                              errors++;
                              validate112.errors = vErrors;
                              return false;
                            } else {
                              errors = _errs108;
                              if (vErrors !== null) {
                                if (_errs108) {
                                  vErrors.length = _errs108;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                            var valid19 = _errs107 === errors;
                            if (!valid19) {
                              break;
                            }
                          }
                        }
                      } else {
                        validate112.errors = [{ instancePath: instancePath + "/deals", schemaPath: "#/properties/deals/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs105 === errors;
                  } else {
                    var valid0 = true;
                  }
                }
              }
            }
          }
        }
      } else {
        validate112.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate112.errors = vErrors;
    return errors === 0;
  }
  function validate102(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing0;
        if (data.fileType === void 0 && (missing0 = "fileType") || data.version === void 0 && (missing0 = "version") || data.metadata === void 0 && (missing0 = "metadata") || data.games === void 0 && (missing0 = "games")) {
          validate102.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
          return false;
        } else {
          const _errs1 = errors;
          for (const key0 in data) {
            if (!(key0 === "fileType" || key0 === "version" || key0 === "metadata" || key0 === "games")) {
              validate102.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
              return false;
              break;
            }
          }
          if (_errs1 === errors) {
            if (data.fileType !== void 0) {
              let data0 = data.fileType;
              const _errs2 = errors;
              if (typeof data0 !== "string") {
                validate102.errors = [{ instancePath: instancePath + "/fileType", schemaPath: "#/properties/fileType/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
              if ("Euchre Match Notation" !== data0) {
                validate102.errors = [{ instancePath: instancePath + "/fileType", schemaPath: "#/properties/fileType/const", keyword: "const", params: { allowedValue: "Euchre Match Notation" }, message: "must be equal to constant" }];
                return false;
              }
              var valid0 = _errs2 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.version !== void 0) {
                let data1 = data.version;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (typeof data1 === "string") {
                    if (!pattern02.test(data1)) {
                      validate102.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/pattern", keyword: "pattern", params: { pattern: "^1\\.[12](?:\\.\\d+)?$" }, message: 'must match pattern "^1\\.[12](?:\\.\\d+)?$"' }];
                      return false;
                    }
                  } else {
                    validate102.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.metadata !== void 0) {
                  let data2 = data.metadata;
                  const _errs6 = errors;
                  if (errors === _errs6) {
                    if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                      let missing1;
                      if (data2.players === void 0 && (missing1 = "players")) {
                        validate102.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                        return false;
                      } else {
                        const _errs8 = errors;
                        for (const key1 in data2) {
                          if (!(key1 === "matchId" || key1 === "title" || key1 === "description" || key1 === "date" || key1 === "teams" || key1 === "players" || key1 === "matchFormat" || key1 === "result")) {
                            validate102.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                            return false;
                            break;
                          }
                        }
                        if (_errs8 === errors) {
                          if (data2.matchId !== void 0) {
                            let data3 = data2.matchId;
                            const _errs9 = errors;
                            if (errors === _errs9) {
                              if (typeof data3 === "string") {
                                if (func22(data3) > 64) {
                                  validate102.errors = [{ instancePath: instancePath + "/metadata/matchId", schemaPath: "#/properties/metadata/properties/matchId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                  return false;
                                }
                              } else {
                                validate102.errors = [{ instancePath: instancePath + "/metadata/matchId", schemaPath: "#/properties/metadata/properties/matchId/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid1 = _errs9 === errors;
                          } else {
                            var valid1 = true;
                          }
                          if (valid1) {
                            if (data2.title !== void 0) {
                              let data4 = data2.title;
                              const _errs11 = errors;
                              if (errors === _errs11) {
                                if (typeof data4 === "string") {
                                  if (func22(data4) > 128) {
                                    validate102.errors = [{ instancePath: instancePath + "/metadata/title", schemaPath: "#/properties/metadata/properties/title/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                                    return false;
                                  }
                                } else {
                                  validate102.errors = [{ instancePath: instancePath + "/metadata/title", schemaPath: "#/properties/metadata/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                              var valid1 = _errs11 === errors;
                            } else {
                              var valid1 = true;
                            }
                            if (valid1) {
                              if (data2.description !== void 0) {
                                let data5 = data2.description;
                                const _errs13 = errors;
                                if (errors === _errs13) {
                                  if (typeof data5 === "string") {
                                    if (func22(data5) > 1024) {
                                      validate102.errors = [{ instancePath: instancePath + "/metadata/description", schemaPath: "#/properties/metadata/properties/description/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                                      return false;
                                    }
                                  } else {
                                    validate102.errors = [{ instancePath: instancePath + "/metadata/description", schemaPath: "#/properties/metadata/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                  }
                                }
                                var valid1 = _errs13 === errors;
                              } else {
                                var valid1 = true;
                              }
                              if (valid1) {
                                if (data2.date !== void 0) {
                                  let data6 = data2.date;
                                  const _errs15 = errors;
                                  const _errs17 = errors;
                                  let valid2 = false;
                                  const _errs18 = errors;
                                  if (errors === _errs18) {
                                    if (typeof data6 === "string") {
                                      if (!formats02.validate(data6)) {
                                        const err0 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/0/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' };
                                        if (vErrors === null) {
                                          vErrors = [err0];
                                        } else {
                                          vErrors.push(err0);
                                        }
                                        errors++;
                                      }
                                    }
                                  }
                                  var _valid0 = _errs18 === errors;
                                  valid2 = valid2 || _valid0;
                                  if (!valid2) {
                                    const _errs19 = errors;
                                    if (errors === _errs19) {
                                      if (typeof data6 === "string") {
                                        if (!formats22.validate(data6)) {
                                          const err1 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/1/format", keyword: "format", params: { format: "date" }, message: 'must match format "date"' };
                                          if (vErrors === null) {
                                            vErrors = [err1];
                                          } else {
                                            vErrors.push(err1);
                                          }
                                          errors++;
                                        }
                                      }
                                    }
                                    var _valid0 = _errs19 === errors;
                                    valid2 = valid2 || _valid0;
                                    if (!valid2) {
                                      const _errs20 = errors;
                                      if (typeof data6 === "string") {
                                        if (!pattern12.test(data6)) {
                                          const err2 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf/2/pattern", keyword: "pattern", params: { pattern: "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$" }, message: 'must match pattern "^$|^\\d{4}-\\d{2}-\\d{2}([T ]\\d{2}:\\d{2}(:\\d{2}(\\.\\d+)?)?)?$"' };
                                          if (vErrors === null) {
                                            vErrors = [err2];
                                          } else {
                                            vErrors.push(err2);
                                          }
                                          errors++;
                                        }
                                      }
                                      var _valid0 = _errs20 === errors;
                                      valid2 = valid2 || _valid0;
                                    }
                                  }
                                  if (!valid2) {
                                    const err3 = { instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                                    if (vErrors === null) {
                                      vErrors = [err3];
                                    } else {
                                      vErrors.push(err3);
                                    }
                                    errors++;
                                    validate102.errors = vErrors;
                                    return false;
                                  } else {
                                    errors = _errs17;
                                    if (vErrors !== null) {
                                      if (_errs17) {
                                        vErrors.length = _errs17;
                                      } else {
                                        vErrors = null;
                                      }
                                    }
                                  }
                                  if (errors === _errs15) {
                                    if (typeof data6 === "string") {
                                      if (func22(data6) > 64) {
                                        validate102.errors = [{ instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                        return false;
                                      }
                                    } else {
                                      validate102.errors = [{ instancePath: instancePath + "/metadata/date", schemaPath: "#/properties/metadata/properties/date/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                      return false;
                                    }
                                  }
                                  var valid1 = _errs15 === errors;
                                } else {
                                  var valid1 = true;
                                }
                                if (valid1) {
                                  if (data2.teams !== void 0) {
                                    let data7 = data2.teams;
                                    const _errs21 = errors;
                                    if (errors === _errs21) {
                                      if (Array.isArray(data7)) {
                                        if (data7.length < 1) {
                                          validate102.errors = [{ instancePath: instancePath + "/metadata/teams", schemaPath: "#/properties/metadata/properties/teams/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                                          return false;
                                        } else {
                                          var valid3 = true;
                                          const len0 = data7.length;
                                          for (let i0 = 0; i0 < len0; i0++) {
                                            let data8 = data7[i0];
                                            const _errs23 = errors;
                                            if (errors === _errs23) {
                                              if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                                                let missing2;
                                                if (data8.id === void 0 && (missing2 = "id") || data8.name === void 0 && (missing2 = "name")) {
                                                  validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0, schemaPath: "#/properties/metadata/properties/teams/items/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" }];
                                                  return false;
                                                } else {
                                                  const _errs25 = errors;
                                                  for (const key2 in data8) {
                                                    if (!(key2 === "id" || key2 === "name" || key2 === "playerIds" || key2 === "color")) {
                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0, schemaPath: "#/properties/metadata/properties/teams/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" }];
                                                      return false;
                                                      break;
                                                    }
                                                  }
                                                  if (_errs25 === errors) {
                                                    if (data8.id !== void 0) {
                                                      let data9 = data8.id;
                                                      const _errs26 = errors;
                                                      if (errors === _errs26) {
                                                        if (typeof data9 === "string") {
                                                          if (func22(data9) > 64) {
                                                            validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/id", schemaPath: "#/properties/metadata/properties/teams/items/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                            return false;
                                                          }
                                                        } else {
                                                          validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/id", schemaPath: "#/properties/metadata/properties/teams/items/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                          return false;
                                                        }
                                                      }
                                                      var valid4 = _errs26 === errors;
                                                    } else {
                                                      var valid4 = true;
                                                    }
                                                    if (valid4) {
                                                      if (data8.name !== void 0) {
                                                        let data10 = data8.name;
                                                        const _errs28 = errors;
                                                        if (errors === _errs28) {
                                                          if (typeof data10 === "string") {
                                                            if (func22(data10) > 64) {
                                                              validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/name", schemaPath: "#/properties/metadata/properties/teams/items/properties/name/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                              return false;
                                                            }
                                                          } else {
                                                            validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/name", schemaPath: "#/properties/metadata/properties/teams/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                          }
                                                        }
                                                        var valid4 = _errs28 === errors;
                                                      } else {
                                                        var valid4 = true;
                                                      }
                                                      if (valid4) {
                                                        if (data8.playerIds !== void 0) {
                                                          let data11 = data8.playerIds;
                                                          const _errs30 = errors;
                                                          if (errors === _errs30) {
                                                            if (Array.isArray(data11)) {
                                                              var valid5 = true;
                                                              const len1 = data11.length;
                                                              for (let i1 = 0; i1 < len1; i1++) {
                                                                let data12 = data11[i1];
                                                                const _errs32 = errors;
                                                                if (errors === _errs32) {
                                                                  if (typeof data12 === "string") {
                                                                    if (func22(data12) > 64) {
                                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/playerIds/" + i1, schemaPath: "#/properties/metadata/properties/teams/items/properties/playerIds/items/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                                      return false;
                                                                    }
                                                                  } else {
                                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/playerIds/" + i1, schemaPath: "#/properties/metadata/properties/teams/items/properties/playerIds/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                    return false;
                                                                  }
                                                                }
                                                                var valid5 = _errs32 === errors;
                                                                if (!valid5) {
                                                                  break;
                                                                }
                                                              }
                                                            } else {
                                                              validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/playerIds", schemaPath: "#/properties/metadata/properties/teams/items/properties/playerIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                              return false;
                                                            }
                                                          }
                                                          var valid4 = _errs30 === errors;
                                                        } else {
                                                          var valid4 = true;
                                                        }
                                                        if (valid4) {
                                                          if (data8.color !== void 0) {
                                                            let data13 = data8.color;
                                                            const _errs34 = errors;
                                                            if (errors === _errs34) {
                                                              if (typeof data13 === "string") {
                                                                if (func22(data13) > 32) {
                                                                  validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/color", schemaPath: "#/properties/metadata/properties/teams/items/properties/color/maxLength", keyword: "maxLength", params: { limit: 32 }, message: "must NOT have more than 32 characters" }];
                                                                  return false;
                                                                }
                                                              } else {
                                                                validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0 + "/color", schemaPath: "#/properties/metadata/properties/teams/items/properties/color/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                              }
                                                            }
                                                            var valid4 = _errs34 === errors;
                                                          } else {
                                                            var valid4 = true;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              } else {
                                                validate102.errors = [{ instancePath: instancePath + "/metadata/teams/" + i0, schemaPath: "#/properties/metadata/properties/teams/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                return false;
                                              }
                                            }
                                            var valid3 = _errs23 === errors;
                                            if (!valid3) {
                                              break;
                                            }
                                          }
                                          if (valid3) {
                                            let i2 = data7.length;
                                            let j0;
                                            if (i2 > 1) {
                                              outer0: for (; i2--; ) {
                                                for (j0 = i2; j0--; ) {
                                                  if (func0(data7[i2], data7[j0])) {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/teams", schemaPath: "#/properties/metadata/properties/teams/uniqueItems", keyword: "uniqueItems", params: { i: i2, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i2 + " are identical)" }];
                                                    return false;
                                                    break outer0;
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      } else {
                                        validate102.errors = [{ instancePath: instancePath + "/metadata/teams", schemaPath: "#/properties/metadata/properties/teams/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid1 = _errs21 === errors;
                                  } else {
                                    var valid1 = true;
                                  }
                                  if (valid1) {
                                    if (data2.players !== void 0) {
                                      let data14 = data2.players;
                                      const _errs36 = errors;
                                      if (errors === _errs36) {
                                        if (Array.isArray(data14)) {
                                          if (data14.length < 1) {
                                            validate102.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                                            return false;
                                          } else {
                                            var valid7 = true;
                                            const len2 = data14.length;
                                            for (let i3 = 0; i3 < len2; i3++) {
                                              let data15 = data14[i3];
                                              const _errs38 = errors;
                                              const _errs39 = errors;
                                              const _errs40 = errors;
                                              if (errors === _errs40) {
                                                if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                                                  let missing3;
                                                  if (data15.name === void 0 && (missing3 = "name")) {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3, schemaPath: "../egn-schema-v1.json#/definitions/player/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" }];
                                                    return false;
                                                  } else {
                                                    const _errs42 = errors;
                                                    for (const key3 in data15) {
                                                      if (!(key3 === "id" || key3 === "name" || key3 === "playerIds")) {
                                                        validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3, schemaPath: "../egn-schema-v1.json#/definitions/player/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" }];
                                                        return false;
                                                        break;
                                                      }
                                                    }
                                                    if (_errs42 === errors) {
                                                      if (data15.id !== void 0) {
                                                        let data16 = data15.id;
                                                        const _errs43 = errors;
                                                        if (errors === _errs43) {
                                                          if (typeof data16 === "string") {
                                                            if (func22(data16) > 64) {
                                                              validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/id", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                              return false;
                                                            }
                                                          } else {
                                                            validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/id", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                          }
                                                        }
                                                        var valid10 = _errs43 === errors;
                                                      } else {
                                                        var valid10 = true;
                                                      }
                                                      if (valid10) {
                                                        if (data15.name !== void 0) {
                                                          let data17 = data15.name;
                                                          const _errs45 = errors;
                                                          if (errors === _errs45) {
                                                            if (typeof data17 === "string") {
                                                              if (func22(data17) > 64) {
                                                                validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/name", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/name/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                                return false;
                                                              }
                                                            } else {
                                                              validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/name", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                              return false;
                                                            }
                                                          }
                                                          var valid10 = _errs45 === errors;
                                                        } else {
                                                          var valid10 = true;
                                                        }
                                                        if (valid10) {
                                                          if (data15.playerIds !== void 0) {
                                                            let data18 = data15.playerIds;
                                                            const _errs47 = errors;
                                                            if (errors === _errs47) {
                                                              if (Array.isArray(data18)) {
                                                                if (data18.length > 10) {
                                                                  validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                                                                  return false;
                                                                } else {
                                                                  if (data18.length < 0) {
                                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/minItems", keyword: "minItems", params: { limit: 0 }, message: "must NOT have fewer than 0 items" }];
                                                                    return false;
                                                                  } else {
                                                                    var valid11 = true;
                                                                    const len3 = data18.length;
                                                                    for (let i4 = 0; i4 < len3; i4++) {
                                                                      let data19 = data18[i4];
                                                                      const _errs49 = errors;
                                                                      if (errors === _errs49) {
                                                                        if (data19 && typeof data19 == "object" && !Array.isArray(data19)) {
                                                                          let missing4;
                                                                          if (data19.id === void 0 && (missing4 = "id") || data19.source === void 0 && (missing4 = "source")) {
                                                                            validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4, schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/required", keyword: "required", params: { missingProperty: missing4 }, message: "must have required property '" + missing4 + "'" }];
                                                                            return false;
                                                                          } else {
                                                                            const _errs51 = errors;
                                                                            for (const key4 in data19) {
                                                                              if (!(key4 === "id" || key4 === "source")) {
                                                                                validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4, schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" }];
                                                                                return false;
                                                                                break;
                                                                              }
                                                                            }
                                                                            if (_errs51 === errors) {
                                                                              if (data19.id !== void 0) {
                                                                                let data20 = data19.id;
                                                                                const _errs52 = errors;
                                                                                if (errors === _errs52) {
                                                                                  if (typeof data20 === "string") {
                                                                                    if (func22(data20) > 64) {
                                                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4 + "/id", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                                                      return false;
                                                                                    }
                                                                                  } else {
                                                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4 + "/id", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                    return false;
                                                                                  }
                                                                                }
                                                                                var valid12 = _errs52 === errors;
                                                                              } else {
                                                                                var valid12 = true;
                                                                              }
                                                                              if (valid12) {
                                                                                if (data19.source !== void 0) {
                                                                                  let data21 = data19.source;
                                                                                  const _errs54 = errors;
                                                                                  if (errors === _errs54) {
                                                                                    if (typeof data21 === "string") {
                                                                                      if (func22(data21) > 64) {
                                                                                        validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4 + "/source", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/properties/source/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                                                        return false;
                                                                                      }
                                                                                    } else {
                                                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4 + "/source", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/properties/source/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                      return false;
                                                                                    }
                                                                                  }
                                                                                  var valid12 = _errs54 === errors;
                                                                                } else {
                                                                                  var valid12 = true;
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        } else {
                                                                          validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds/" + i4, schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                                          return false;
                                                                        }
                                                                      }
                                                                      var valid11 = _errs49 === errors;
                                                                      if (!valid11) {
                                                                        break;
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              } else {
                                                                validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/playerIds", schemaPath: "../egn-schema-v1.json#/definitions/player/properties/playerIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                                return false;
                                                              }
                                                            }
                                                            var valid10 = _errs47 === errors;
                                                          } else {
                                                            var valid10 = true;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                } else {
                                                  validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3, schemaPath: "../egn-schema-v1.json#/definitions/player/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                  return false;
                                                }
                                              }
                                              var valid8 = _errs39 === errors;
                                              if (valid8) {
                                                const _errs56 = errors;
                                                if (errors === _errs56) {
                                                  if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                                                    let missing5;
                                                    if (data15.id === void 0 && (missing5 = "id")) {
                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3, schemaPath: "#/properties/metadata/properties/players/items/allOf/1/required", keyword: "required", params: { missingProperty: missing5 }, message: "must have required property '" + missing5 + "'" }];
                                                      return false;
                                                    } else {
                                                      if (data15.id !== void 0) {
                                                        let data22 = data15.id;
                                                        const _errs58 = errors;
                                                        if (errors === _errs58) {
                                                          if (typeof data22 === "string") {
                                                            if (func22(data22) > 64) {
                                                              validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/id", schemaPath: "#/properties/metadata/properties/players/items/allOf/1/properties/id/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" }];
                                                              return false;
                                                            }
                                                          } else {
                                                            validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3 + "/id", schemaPath: "#/properties/metadata/properties/players/items/allOf/1/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  } else {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/players/" + i3, schemaPath: "#/properties/metadata/properties/players/items/allOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                    return false;
                                                  }
                                                }
                                                var valid8 = _errs56 === errors;
                                              }
                                              var valid7 = _errs38 === errors;
                                              if (!valid7) {
                                                break;
                                              }
                                            }
                                            if (valid7) {
                                              let i5 = data14.length;
                                              let j1;
                                              if (i5 > 1) {
                                                outer1: for (; i5--; ) {
                                                  for (j1 = i5; j1--; ) {
                                                    if (func0(data14[i5], data14[j1])) {
                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/uniqueItems", keyword: "uniqueItems", params: { i: i5, j: j1 }, message: "must NOT have duplicate items (items ## " + j1 + " and " + i5 + " are identical)" }];
                                                      return false;
                                                      break outer1;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        } else {
                                          validate102.errors = [{ instancePath: instancePath + "/metadata/players", schemaPath: "#/properties/metadata/properties/players/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                          return false;
                                        }
                                      }
                                      var valid1 = _errs36 === errors;
                                    } else {
                                      var valid1 = true;
                                    }
                                    if (valid1) {
                                      if (data2.matchFormat !== void 0) {
                                        let data23 = data2.matchFormat;
                                        const _errs60 = errors;
                                        if (errors === _errs60) {
                                          if (data23 && typeof data23 == "object" && !Array.isArray(data23)) {
                                            let missing6;
                                            if (data23.type === void 0 && (missing6 = "type")) {
                                              validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat", schemaPath: "#/properties/metadata/properties/matchFormat/required", keyword: "required", params: { missingProperty: missing6 }, message: "must have required property '" + missing6 + "'" }];
                                              return false;
                                            } else {
                                              const _errs62 = errors;
                                              for (const key5 in data23) {
                                                if (!(key5 === "type" || key5 === "target")) {
                                                  validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat", schemaPath: "#/properties/metadata/properties/matchFormat/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key5 }, message: "must NOT have additional properties" }];
                                                  return false;
                                                  break;
                                                }
                                              }
                                              if (_errs62 === errors) {
                                                if (data23.type !== void 0) {
                                                  let data24 = data23.type;
                                                  const _errs63 = errors;
                                                  if (typeof data24 !== "string") {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat/type", schemaPath: "#/properties/metadata/properties/matchFormat/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                  if (!(data24 === "BEST_OF_N" || data24 === "PROGRESSIVE" || data24 === "ROUND_ROBIN" || data24 === "CUSTOM" || data24 === "FIXED_GAMES" || data24 === "TARGET_SCORE" || data24 === "ELIMINATION" || data24 === "SWISS" || data24 === "TIMED" || data24 === "SINGLE_GAME")) {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat/type", schemaPath: "#/properties/metadata/properties/matchFormat/properties/type/enum", keyword: "enum", params: { allowedValues: schema112.properties.metadata.properties.matchFormat.properties.type.enum }, message: "must be equal to one of the allowed values" }];
                                                    return false;
                                                  }
                                                  var valid15 = _errs63 === errors;
                                                } else {
                                                  var valid15 = true;
                                                }
                                                if (valid15) {
                                                  if (data23.target !== void 0) {
                                                    let data25 = data23.target;
                                                    const _errs65 = errors;
                                                    if (!(typeof data25 == "number" && (!(data25 % 1) && !isNaN(data25)) && isFinite(data25))) {
                                                      validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat/target", schemaPath: "#/properties/metadata/properties/matchFormat/properties/target/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                      return false;
                                                    }
                                                    if (errors === _errs65) {
                                                      if (typeof data25 == "number" && isFinite(data25)) {
                                                        if (data25 < 1 || isNaN(data25)) {
                                                          validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat/target", schemaPath: "#/properties/metadata/properties/matchFormat/properties/target/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                                          return false;
                                                        }
                                                      }
                                                    }
                                                    var valid15 = _errs65 === errors;
                                                  } else {
                                                    var valid15 = true;
                                                  }
                                                }
                                              }
                                            }
                                          } else {
                                            validate102.errors = [{ instancePath: instancePath + "/metadata/matchFormat", schemaPath: "#/properties/metadata/properties/matchFormat/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                            return false;
                                          }
                                        }
                                        var valid1 = _errs60 === errors;
                                      } else {
                                        var valid1 = true;
                                      }
                                      if (valid1) {
                                        if (data2.result !== void 0) {
                                          let data26 = data2.result;
                                          const _errs67 = errors;
                                          if (errors === _errs67) {
                                            if (data26 && typeof data26 == "object" && !Array.isArray(data26)) {
                                              const _errs69 = errors;
                                              for (const key6 in data26) {
                                                if (!(key6 === "status" || key6 === "winner" || key6 === "scores")) {
                                                  validate102.errors = [{ instancePath: instancePath + "/metadata/result", schemaPath: "#/properties/metadata/properties/result/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key6 }, message: "must NOT have additional properties" }];
                                                  return false;
                                                  break;
                                                }
                                              }
                                              if (_errs69 === errors) {
                                                if (data26.status !== void 0) {
                                                  let data27 = data26.status;
                                                  const _errs70 = errors;
                                                  if (typeof data27 !== "string") {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/result/status", schemaPath: "#/properties/metadata/properties/result/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                  if (!(data27 === "COMPLETED" || data27 === "IN_PROGRESS" || data27 === "FORFEIT" || data27 === "DRAW")) {
                                                    validate102.errors = [{ instancePath: instancePath + "/metadata/result/status", schemaPath: "#/properties/metadata/properties/result/properties/status/enum", keyword: "enum", params: { allowedValues: schema112.properties.metadata.properties.result.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                                                    return false;
                                                  }
                                                  var valid16 = _errs70 === errors;
                                                } else {
                                                  var valid16 = true;
                                                }
                                                if (valid16) {
                                                  if (data26.winner !== void 0) {
                                                    let data28 = data26.winner;
                                                    const _errs72 = errors;
                                                    if (errors === _errs72) {
                                                      if (Array.isArray(data28)) {
                                                        var valid17 = true;
                                                        const len4 = data28.length;
                                                        for (let i6 = 0; i6 < len4; i6++) {
                                                          const _errs74 = errors;
                                                          if (typeof data28[i6] !== "string") {
                                                            validate102.errors = [{ instancePath: instancePath + "/metadata/result/winner/" + i6, schemaPath: "#/properties/metadata/properties/result/properties/winner/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                          }
                                                          var valid17 = _errs74 === errors;
                                                          if (!valid17) {
                                                            break;
                                                          }
                                                        }
                                                      } else {
                                                        validate102.errors = [{ instancePath: instancePath + "/metadata/result/winner", schemaPath: "#/properties/metadata/properties/result/properties/winner/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                        return false;
                                                      }
                                                    }
                                                    var valid16 = _errs72 === errors;
                                                  } else {
                                                    var valid16 = true;
                                                  }
                                                  if (valid16) {
                                                    if (data26.scores !== void 0) {
                                                      let data30 = data26.scores;
                                                      const _errs76 = errors;
                                                      if (errors === _errs76) {
                                                        if (data30 && typeof data30 == "object" && !Array.isArray(data30)) {
                                                          for (const key7 in data30) {
                                                            let data31 = data30[key7];
                                                            const _errs79 = errors;
                                                            if (!(typeof data31 == "number" && isFinite(data31))) {
                                                              validate102.errors = [{ instancePath: instancePath + "/metadata/result/scores/" + key7.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/metadata/properties/result/properties/scores/additionalProperties/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                              return false;
                                                            }
                                                            var valid18 = _errs79 === errors;
                                                            if (!valid18) {
                                                              break;
                                                            }
                                                          }
                                                        } else {
                                                          validate102.errors = [{ instancePath: instancePath + "/metadata/result/scores", schemaPath: "#/properties/metadata/properties/result/properties/scores/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                          return false;
                                                        }
                                                      }
                                                      var valid16 = _errs76 === errors;
                                                    } else {
                                                      var valid16 = true;
                                                    }
                                                  }
                                                }
                                              }
                                            } else {
                                              validate102.errors = [{ instancePath: instancePath + "/metadata/result", schemaPath: "#/properties/metadata/properties/result/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                              return false;
                                            }
                                          }
                                          var valid1 = _errs67 === errors;
                                        } else {
                                          var valid1 = true;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      validate102.errors = [{ instancePath: instancePath + "/metadata", schemaPath: "#/properties/metadata/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                      return false;
                    }
                  }
                  var valid0 = _errs6 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.games !== void 0) {
                    let data32 = data.games;
                    const _errs81 = errors;
                    if (errors === _errs81) {
                      if (Array.isArray(data32)) {
                        var valid19 = true;
                        const len5 = data32.length;
                        for (let i7 = 0; i7 < len5; i7++) {
                          let data33 = data32[i7];
                          const _errs83 = errors;
                          if (errors === _errs83) {
                            if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
                              let missing7;
                              if (data33.gameIndex === void 0 && (missing7 = "gameIndex") || data33.playersOverride === void 0 && (missing7 = "playersOverride") || data33.gameData === void 0 && (missing7 = "gameData")) {
                                validate102.errors = [{ instancePath: instancePath + "/games/" + i7, schemaPath: "#/properties/games/items/required", keyword: "required", params: { missingProperty: missing7 }, message: "must have required property '" + missing7 + "'" }];
                                return false;
                              } else {
                                const _errs85 = errors;
                                for (const key8 in data33) {
                                  if (!(key8 === "gameIndex" || key8 === "playersOverride" || key8 === "gameData")) {
                                    validate102.errors = [{ instancePath: instancePath + "/games/" + i7, schemaPath: "#/properties/games/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key8 }, message: "must NOT have additional properties" }];
                                    return false;
                                    break;
                                  }
                                }
                                if (_errs85 === errors) {
                                  if (data33.gameIndex !== void 0) {
                                    let data34 = data33.gameIndex;
                                    const _errs86 = errors;
                                    if (!(typeof data34 == "number" && (!(data34 % 1) && !isNaN(data34)) && isFinite(data34))) {
                                      validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/gameIndex", schemaPath: "#/properties/games/items/properties/gameIndex/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                      return false;
                                    }
                                    if (errors === _errs86) {
                                      if (typeof data34 == "number" && isFinite(data34)) {
                                        if (data34 < 0 || isNaN(data34)) {
                                          validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/gameIndex", schemaPath: "#/properties/games/items/properties/gameIndex/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                          return false;
                                        }
                                      }
                                    }
                                    var valid20 = _errs86 === errors;
                                  } else {
                                    var valid20 = true;
                                  }
                                  if (valid20) {
                                    if (data33.playersOverride !== void 0) {
                                      let data35 = data33.playersOverride;
                                      const _errs88 = errors;
                                      if (errors === _errs88) {
                                        if (Array.isArray(data35)) {
                                          if (data35.length > 4) {
                                            validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/playersOverride", schemaPath: "#/properties/games/items/properties/playersOverride/maxItems", keyword: "maxItems", params: { limit: 4 }, message: "must NOT have more than 4 items" }];
                                            return false;
                                          } else {
                                            if (data35.length < 4) {
                                              validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/playersOverride", schemaPath: "#/properties/games/items/properties/playersOverride/minItems", keyword: "minItems", params: { limit: 4 }, message: "must NOT have fewer than 4 items" }];
                                              return false;
                                            } else {
                                              var valid21 = true;
                                              const len6 = data35.length;
                                              for (let i8 = 0; i8 < len6; i8++) {
                                                const _errs90 = errors;
                                                if (typeof data35[i8] !== "string") {
                                                  validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/playersOverride/" + i8, schemaPath: "#/properties/games/items/properties/playersOverride/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                                var valid21 = _errs90 === errors;
                                                if (!valid21) {
                                                  break;
                                                }
                                              }
                                              if (valid21) {
                                                let i9 = data35.length;
                                                let j2;
                                                if (i9 > 1) {
                                                  const indices0 = {};
                                                  for (; i9--; ) {
                                                    let item0 = data35[i9];
                                                    if (typeof item0 !== "string") {
                                                      continue;
                                                    }
                                                    if (typeof indices0[item0] == "number") {
                                                      j2 = indices0[item0];
                                                      validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/playersOverride", schemaPath: "#/properties/games/items/properties/playersOverride/uniqueItems", keyword: "uniqueItems", params: { i: i9, j: j2 }, message: "must NOT have duplicate items (items ## " + j2 + " and " + i9 + " are identical)" }];
                                                      return false;
                                                      break;
                                                    }
                                                    indices0[item0] = i9;
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        } else {
                                          validate102.errors = [{ instancePath: instancePath + "/games/" + i7 + "/playersOverride", schemaPath: "#/properties/games/items/properties/playersOverride/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                          return false;
                                        }
                                      }
                                      var valid20 = _errs88 === errors;
                                    } else {
                                      var valid20 = true;
                                    }
                                    if (valid20) {
                                      if (data33.gameData !== void 0) {
                                        const _errs92 = errors;
                                        if (!validate112(data33.gameData, { instancePath: instancePath + "/games/" + i7 + "/gameData", parentData: data33, parentDataProperty: "gameData", rootData })) {
                                          vErrors = vErrors === null ? validate112.errors : vErrors.concat(validate112.errors);
                                          errors = vErrors.length;
                                        }
                                        var valid20 = _errs92 === errors;
                                      } else {
                                        var valid20 = true;
                                      }
                                    }
                                  }
                                }
                              }
                            } else {
                              validate102.errors = [{ instancePath: instancePath + "/games/" + i7, schemaPath: "#/properties/games/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                              return false;
                            }
                          }
                          var valid19 = _errs83 === errors;
                          if (!valid19) {
                            break;
                          }
                        }
                      } else {
                        validate102.errors = [{ instancePath: instancePath + "/games", schemaPath: "#/properties/games/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs81 === errors;
                  } else {
                    var valid0 = true;
                  }
                }
              }
            }
          }
        }
      } else {
        validate102.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
      }
    }
    validate102.errors = vErrors;
    return errors === 0;
  }

  // src/emn/validator.ts
  var precompiledValidateEmn = validateEmn;
  function validateEmn2(data) {
    const isSchemaValid = Boolean(precompiledValidateEmn(data));
    if (!isSchemaValid) {
      return {
        isValid: false,
        errors: precompiledValidateEmn.errors ?? null
      };
    }
    const emnData = data;
    const customErrors = [];
    if (emnData.version && !isSupportedEmnSchemaVersion(emnData.version)) {
      customErrors.push({
        instancePath: "/version",
        message: `Unsupported EMN version '${emnData.version}'. Supported versions are '1.1' and '1.2'.`
      });
    }
    const masterPlayerIds = /* @__PURE__ */ new Set();
    emnData.metadata.players.forEach((player, idx) => {
      if (masterPlayerIds.has(player.id)) {
        customErrors.push({
          instancePath: `/metadata/players/${idx}/id`,
          message: `Duplicate master player ID '${player.id}' in metadata.players`
        });
      } else {
        masterPlayerIds.add(player.id);
      }
    });
    if (emnData.metadata.teams) {
      const teamIds = /* @__PURE__ */ new Set();
      emnData.metadata.teams.forEach((team, tIdx) => {
        if (teamIds.has(team.id)) {
          customErrors.push({
            instancePath: `/metadata/teams/${tIdx}/id`,
            message: `Duplicate team ID '${team.id}' in metadata.teams`
          });
        } else {
          teamIds.add(team.id);
        }
        if (team.playerIds) {
          team.playerIds.forEach((pId, pIdx) => {
            if (!masterPlayerIds.has(pId)) {
              customErrors.push({
                instancePath: `/metadata/teams/${tIdx}/playerIds/${pIdx}`,
                message: `Player ID '${pId}' in team '${team.id}' not found in metadata.players`
              });
            }
          });
        }
      });
    }
    emnData.games.forEach((game, gameIdx) => {
      if (!game.playersOverride || game.playersOverride.length !== 4) {
        customErrors.push({
          instancePath: `/games/${gameIdx}/playersOverride`,
          message: `Game at index ${gameIdx} must contain exactly 4 player IDs`
        });
        return;
      }
      const gamePlayerIds = /* @__PURE__ */ new Set();
      game.playersOverride.forEach((pId, seatIdx) => {
        if (!masterPlayerIds.has(pId)) {
          customErrors.push({
            instancePath: `/games/${gameIdx}/playersOverride/${seatIdx}`,
            message: `Player ID '${pId}' in game ${gameIdx} (seat ${seatIdx}) not found in metadata.players`
          });
        }
        if (gamePlayerIds.has(pId)) {
          customErrors.push({
            instancePath: `/games/${gameIdx}/playersOverride/${seatIdx}`,
            message: `Duplicate player ID '${pId}' in game ${gameIdx}`
          });
        } else {
          gamePlayerIds.add(pId);
        }
      });
      const egnResult = validateEgn2(game.gameData);
      if (!egnResult.isValid) {
        egnResult.errors?.forEach((err) => {
          customErrors.push({
            instancePath: `/games/${gameIdx}/gameData${err.instancePath || ""}`,
            message: `Sub-EGN Validation Error: ${err.message}`
          });
        });
      }
    });
    if (customErrors.length > 0) {
      return {
        isValid: false,
        errors: customErrors
      };
    }
    return {
      isValid: true,
      errors: null
    };
  }
  function isEmnFile(data) {
    return validateEmn2(data).isValid;
  }

  // src/emn/converter.ts
  var fs2 = __toESM(require_browser_shims());
  var import_protobufjs2 = __toESM(require_protobufjs());
  var MAGIC_BYTE_EMN = 2;
  var MAX_BINARY_DATA_BYTES2 = 16 * 1024 * 1024;
  var loadedEmnRoot = null;
  function getEmnProtobufRoot() {
    if (!loadedEmnRoot) {
      const root = new import_protobufjs2.default.Root();
      import_protobufjs2.default.parse(COMMON_PROTO_SCHEMA, root, { keepCase: true });
      import_protobufjs2.default.parse(EMN_PROTO_SCHEMA, root, { keepCase: true });
      loadedEmnRoot = root;
    }
    return loadedEmnRoot;
  }
  function getMatchTypeEnum() {
    const root = getEmnProtobufRoot();
    return root.lookupEnum("egn.MatchFormat.MatchType");
  }
  function getMatchStatusEnum() {
    const root = getEmnProtobufRoot();
    return root.lookupEnum("egn.MatchResult.Status");
  }
  function emnToBinary(emnFile, options) {
    const condenseGames = options?.condenseGames ?? true;
    const validation = validateEmn2(emnFile);
    if (!validation.isValid) {
      throw new Error(`Invalid EMN File: ${JSON.stringify(validation.errors)}`);
    }
    const root = getEmnProtobufRoot();
    const MatchFileMsg = root.lookupType("egn.MatchFile");
    const matchTypeEnum = getMatchTypeEnum();
    const matchStatusEnum = getMatchStatusEnum();
    const formatType = emnFile.metadata.matchFormat?.type;
    const protoFormatType = formatType !== void 0 ? matchTypeEnum.values[formatType] : void 0;
    const resultStatus = emnFile.metadata.result?.status;
    const protoStatus = resultStatus !== void 0 ? matchStatusEnum.values[resultStatus] : void 0;
    const protoObject = {
      file_type: emnFile.fileType,
      version: emnFile.version,
      metadata: {
        match_id: emnFile.metadata.matchId,
        title: emnFile.metadata.title,
        description: emnFile.metadata.description,
        date: emnFile.metadata.date,
        teams: emnFile.metadata.teams?.map((t) => ({
          id: t.id,
          name: t.name,
          player_ids: t.playerIds || [],
          color: t.color
        })),
        players: emnFile.metadata.players.map((p) => ({
          id: p.id,
          name: p.name,
          player_ids: p.playerIds || []
        })),
        match_format: emnFile.metadata.matchFormat ? {
          type: protoFormatType,
          target: emnFile.metadata.matchFormat.target
        } : void 0,
        result: emnFile.metadata.result ? {
          status: protoStatus,
          winner: emnFile.metadata.result.winner || [],
          scores: emnFile.metadata.result.scores || {}
        } : void 0
      },
      games: emnFile.games.map((g) => {
        const egnToSerialize = condenseGames ? packEgnFile(g.gameData) : g.gameData;
        return {
          game_index: g.gameIndex,
          players_override: g.playersOverride,
          egn_json: JSON.stringify(egnToSerialize)
        };
      })
    };
    const err = MatchFileMsg.verify(protoObject);
    if (err) {
      throw new Error(`Protobuf verification failed: ${err}`);
    }
    const message = MatchFileMsg.create(protoObject);
    const buffer = MatchFileMsg.encode(message).finish();
    const binaryWithHeader = new Uint8Array(buffer.length + 1);
    binaryWithHeader[0] = MAGIC_BYTE_EMN;
    binaryWithHeader.set(buffer, 1);
    return binaryWithHeader;
  }
  function binaryToEmn(data, options) {
    if (data.length > MAX_BINARY_DATA_BYTES2) {
      throw new Error(`Data size exceeds limit of ${MAX_BINARY_DATA_BYTES2} bytes`);
    }
    let payload = data;
    if (data.length > 0 && data[0] === MAGIC_BYTE_EMN) {
      payload = data.subarray(1);
    }
    const root = getEmnProtobufRoot();
    const MatchFileMsg = root.lookupType("egn.MatchFile");
    const matchTypeEnum = getMatchTypeEnum();
    const matchStatusEnum = getMatchStatusEnum();
    const decoded = MatchFileMsg.decode(payload);
    const decodedObject = MatchFileMsg.toObject(decoded, {
      enums: String,
      longs: String,
      defaults: true,
      oneofs: true
    });
    const rawFormatType = decodedObject.metadata?.match_format?.type;
    const formatTypeStr = typeof rawFormatType === "number" ? matchTypeEnum.valuesById[rawFormatType] : rawFormatType;
    const rawStatus = decodedObject.metadata?.result?.status;
    const statusStr = typeof rawStatus === "number" ? matchStatusEnum.valuesById[rawStatus] : rawStatus;
    const emnFile = {
      fileType: "Euchre Match Notation",
      version: decodedObject.version || "1.1",
      metadata: {
        matchId: decodedObject.metadata?.match_id || void 0,
        title: decodedObject.metadata?.title || void 0,
        description: decodedObject.metadata?.description || void 0,
        date: decodedObject.metadata?.date || void 0,
        teams: decodedObject.metadata?.teams && decodedObject.metadata.teams.length > 0 ? decodedObject.metadata.teams.map((t) => ({
          id: t.id,
          name: t.name,
          playerIds: t.player_ids && t.player_ids.length > 0 ? t.player_ids : void 0,
          color: t.color || void 0
        })) : void 0,
        players: (decodedObject.metadata?.players || []).map((p) => ({
          id: p.id,
          name: p.name,
          playerIds: (p.player_ids || []).map((idObj) => ({
            id: idObj.id,
            source: idObj.source
          }))
        })),
        matchFormat: decodedObject.metadata?.match_format ? {
          type: formatTypeStr || "BEST_OF_N",
          target: decodedObject.metadata.match_format.target
        } : void 0,
        result: decodedObject.metadata?.result ? {
          status: statusStr,
          winner: decodedObject.metadata.result.winner || [],
          scores: decodedObject.metadata.result.scores || {}
        } : void 0
      },
      games: (decodedObject.games || []).map((g) => {
        let gameData = {};
        if (g.egn_json) {
          try {
            gameData = JSON.parse(g.egn_json);
          } catch (e) {
            gameData = {};
          }
        }
        return {
          gameIndex: g.game_index,
          playersOverride: g.players_override,
          gameData
        };
      })
    };
    const validation = validateEmn2(emnFile);
    if (!validation.isValid) {
      throw new Error(`Decoded EMN file failed validation: ${JSON.stringify(validation.errors)}`);
    }
    if (options?.unpackGames) {
      return unpackEmnFile(emnFile);
    }
    return emnFile;
  }
  function unpackEmnFile(emnFile) {
    const validation = validateEmn2(emnFile);
    if (!validation.isValid) {
      throw new Error(`Invalid EMN File: ${JSON.stringify(validation.errors)}`);
    }
    const cloned = JSON.parse(JSON.stringify(emnFile));
    cloned.games = cloned.games.map((g) => ({
      ...g,
      gameData: unpackEgnFile(g.gameData)
    }));
    return cloned;
  }
  function packEmnFile(emnFile) {
    const validation = validateEmn2(emnFile);
    if (!validation.isValid) {
      throw new Error(`Invalid EMN File: ${JSON.stringify(validation.errors)}`);
    }
    const cloned = JSON.parse(JSON.stringify(emnFile));
    cloned.games = cloned.games.map((g) => ({
      ...g,
      gameData: packEgnFile(g.gameData)
    }));
    return cloned;
  }
  var convertEmnFileToBinData = emnToBinary;
  var convertBinDataToEmnFile = binaryToEmn;
  function convertEmnJsonToBinData(emnJsonStr, options) {
    const emnFile = JSON.parse(emnJsonStr);
    return convertEmnFileToBinData(emnFile, options);
  }
  function convertBinDataToEmnJson(data, options) {
    const emnFile = convertBinDataToEmnFile(data, options);
    return JSON.stringify(emnFile, null, 2);
  }
  function convertEmnJsonToBin(emnJsonPath, outBinFilePath, options) {
    const jsonStr = fs2.readFileSync(emnJsonPath, "utf8");
    const binData = convertEmnJsonToBinData(jsonStr, options);
    fs2.writeFileSync(outBinFilePath, binData);
  }
  function convertBinToEmnJson(binFilePath, options) {
    const binData = fs2.readFileSync(binFilePath);
    return convertBinDataToEmnJson(binData, options);
  }
  function detectEmnBinaryFormatFromData(data) {
    return data.length > 0 && data[0] === MAGIC_BYTE_EMN;
  }
  function detectEmnBinaryFormat(filePath) {
    try {
      const data = fs2.readFileSync(filePath);
      return detectEmnBinaryFormatFromData(data);
    } catch {
      return false;
    }
  }

  // src/emn/scoring.ts
  function calculateEmnScores(input) {
    const emn = typeof input === "string" ? JSON.parse(input) : input;
    if (!emn || typeof emn !== "object") {
      throw new Error("Invalid EMN input: expected an EmnFile object or JSON string.");
    }
    const masterPlayers = emn.metadata?.players || [];
    const teams = emn.metadata?.teams || [];
    const formatType = emn.metadata?.matchFormat?.type || "BEST_OF_N";
    const target = emn.metadata?.matchFormat?.target;
    const scores = {};
    masterPlayers.forEach((p) => {
      if (p && p.id) {
        scores[p.id] = 0;
      }
    });
    const teamScores = {};
    teams.forEach((t) => {
      if (t && t.id) {
        teamScores[t.id] = 0;
      }
    });
    const gameScores = [];
    const games = Array.isArray(emn.games) ? emn.games : [];
    games.forEach((game, idx) => {
      const gameIndex = typeof game.gameIndex === "number" ? game.gameIndex : idx;
      const seatPlayers = Array.isArray(game.playersOverride) ? game.playersOverride : [
        masterPlayers[0]?.id || "p-01",
        masterPlayers[1]?.id || "p-02",
        masterPlayers[2]?.id || "p-03",
        masterPlayers[3]?.id || "p-04"
      ];
      seatPlayers.forEach((pid) => {
        if (pid && scores[pid] === void 0) {
          scores[pid] = 0;
        }
      });
      let finalScore = [0, 0];
      const gameData = game.gameData;
      if (gameData) {
        if (gameData.metadata && Array.isArray(gameData.metadata.finalScore) && gameData.metadata.finalScore.length === 2 && typeof gameData.metadata.finalScore[0] === "number" && typeof gameData.metadata.finalScore[1] === "number") {
          finalScore = [gameData.metadata.finalScore[0], gameData.metadata.finalScore[1]];
        } else if (Array.isArray(gameData.deals) && gameData.deals.length > 0) {
          try {
            finalScore = calculateFinalScore(gameData);
          } catch {
            finalScore = [0, 0];
          }
        }
      }
      const ruleset = gameData?.metadata?.ruleset;
      const isNumDeals = Boolean(
        formatType === "PROGRESSIVE" || ruleset && typeof ruleset.num_deals === "number" && ruleset.num_deals > 0
      );
      const team0Score = finalScore[0];
      const team1Score = finalScore[1];
      let winnerSeats = [];
      let winningPlayerIds = [];
      if (team0Score > team1Score) {
        winnerSeats = [0, 2];
        if (seatPlayers[0]) winningPlayerIds.push(seatPlayers[0]);
        if (seatPlayers[2]) winningPlayerIds.push(seatPlayers[2]);
      } else if (team1Score > team0Score) {
        winnerSeats = [1, 3];
        if (seatPlayers[1]) winningPlayerIds.push(seatPlayers[1]);
        if (seatPlayers[3]) winningPlayerIds.push(seatPlayers[3]);
      }
      if (isNumDeals) {
        if (seatPlayers[0]) scores[seatPlayers[0]] = (scores[seatPlayers[0]] || 0) + team0Score;
        if (seatPlayers[2]) scores[seatPlayers[2]] = (scores[seatPlayers[2]] || 0) + team0Score;
        if (seatPlayers[1]) scores[seatPlayers[1]] = (scores[seatPlayers[1]] || 0) + team1Score;
        if (seatPlayers[3]) scores[seatPlayers[3]] = (scores[seatPlayers[3]] || 0) + team1Score;
        teams.forEach((t) => {
          if (t.playerIds && t.playerIds.length > 0) {
            const hasT0 = t.playerIds.includes(seatPlayers[0]) || t.playerIds.includes(seatPlayers[2]);
            const hasT1 = t.playerIds.includes(seatPlayers[1]) || t.playerIds.includes(seatPlayers[3]);
            if (hasT0) teamScores[t.id] = (teamScores[t.id] || 0) + team0Score;
            if (hasT1) teamScores[t.id] = (teamScores[t.id] || 0) + team1Score;
          }
        });
      } else {
        if (team0Score > team1Score) {
          if (seatPlayers[0]) scores[seatPlayers[0]] = (scores[seatPlayers[0]] || 0) + 1;
          if (seatPlayers[2]) scores[seatPlayers[2]] = (scores[seatPlayers[2]] || 0) + 1;
        } else if (team1Score > team0Score) {
          if (seatPlayers[1]) scores[seatPlayers[1]] = (scores[seatPlayers[1]] || 0) + 1;
          if (seatPlayers[3]) scores[seatPlayers[3]] = (scores[seatPlayers[3]] || 0) + 1;
        }
        teams.forEach((t) => {
          if (t.playerIds && t.playerIds.length > 0) {
            const hasT0 = t.playerIds.includes(seatPlayers[0]) || t.playerIds.includes(seatPlayers[2]);
            const hasT1 = t.playerIds.includes(seatPlayers[1]) || t.playerIds.includes(seatPlayers[3]);
            if (hasT0 && team0Score > team1Score) {
              teamScores[t.id] = (teamScores[t.id] || 0) + 1;
            } else if (hasT1 && team1Score > team0Score) {
              teamScores[t.id] = (teamScores[t.id] || 0) + 1;
            }
          }
        });
      }
      gameScores.push({
        gameIndex,
        finalScore,
        winnerSeats,
        winningPlayerIds
      });
    });
    const scoreValues = Object.values(scores);
    const maxScore = scoreValues.length > 0 ? Math.max(...scoreValues) : 0;
    const winners = maxScore > 0 ? Object.keys(scores).filter((id) => scores[id] === maxScore) : [];
    let status = games.length > 0 && winners.length > 0 ? "COMPLETED" : "IN_PROGRESS";
    if (target && target > 0) {
      if (formatType === "BEST_OF_N") {
        const winsNeeded = Math.ceil(target / 2);
        const targetReached = winners.some((w) => scores[w] >= winsNeeded);
        status = targetReached ? "COMPLETED" : games.length >= target ? "COMPLETED" : "IN_PROGRESS";
      } else if (formatType === "TARGET_SCORE") {
        const targetReached = winners.some((w) => scores[w] >= target);
        status = targetReached ? "COMPLETED" : "IN_PROGRESS";
      }
    }
    const result = {
      status,
      winner: winners,
      scores,
      gameScores
    };
    if (teams.length > 0) {
      result.teamScores = teamScores;
    }
    return result;
  }
  function addScoresToEmn(emn) {
    const cloned = JSON.parse(JSON.stringify(emn));
    if (!cloned.metadata) {
      throw new Error("Cannot add scores: EMN file is missing metadata object.");
    }
    const calc = calculateEmnScores(cloned);
    cloned.metadata.result = {
      status: calc.status,
      winner: calc.winner,
      scores: calc.scores
    };
    const validation = validateEmn2(cloned);
    if (!validation.isValid) {
      const errorDetails = validation.errors?.map((e) => `${e.instancePath || "/"} ${e.message}`).join("; ");
      throw new Error(`Updated EMN failed schema validation: ${errorDetails || "Unknown schema error"}`);
    }
    return cloned;
  }

  // src/emn/combiner.ts
  function getPlayerKey(p) {
    if (typeof p === "string") {
      const normalizedKey = p.trim().toLowerCase();
      return { name: p, key: normalizedKey, playerObj: { name: p } };
    } else {
      const key = p.playerIds && p.playerIds.length > 0 ? `${p.playerIds[0].source.trim().toLowerCase()}:${p.playerIds[0].id.trim().toLowerCase()}` : p.name.trim().toLowerCase();
      return { name: p.name, key, playerObj: p };
    }
  }
  function combineEgnToEmn(egnFiles, options = {}) {
    const masterPlayerMap = /* @__PURE__ */ new Map();
    const playerKeyToId = /* @__PURE__ */ new Map();
    let playerCounter = 1;
    egnFiles.forEach((egn) => {
      const players = egn.metadata?.players || [];
      players.forEach((p) => {
        const { name, key, playerObj } = getPlayerKey(p);
        if (!playerKeyToId.has(key)) {
          const id = `p-${String(playerCounter++).padStart(2, "0")}`;
          playerKeyToId.set(key, id);
          masterPlayerMap.set(id, {
            id,
            name,
            playerIds: playerObj.playerIds || [{ id, source: "emn-combine" }]
          });
        }
      });
    });
    const masterPlayers = Array.from(masterPlayerMap.values());
    const games = egnFiles.map((egn, idx) => {
      const gamePlayers = egn.metadata?.players || [];
      const seatPlayerIds = [];
      for (let seat = 0; seat < 4; seat++) {
        const p = gamePlayers[seat];
        if (p) {
          const { key } = getPlayerKey(p);
          const mappedId = playerKeyToId.get(key);
          if (mappedId) {
            seatPlayerIds.push(mappedId);
          } else {
            seatPlayerIds.push(masterPlayers[seat % masterPlayers.length]?.id || `p-01`);
          }
        } else {
          seatPlayerIds.push(masterPlayers[seat % masterPlayers.length]?.id || `p-01`);
        }
      }
      return {
        gameIndex: idx,
        playersOverride: seatPlayerIds,
        gameData: egn
      };
    });
    let computedResult = void 0;
    if (games.length > 0) {
      const candidateEmn = {
        fileType: "Euchre Match Notation",
        version: "1.1",
        metadata: {
          players: masterPlayers,
          matchFormat: {
            type: options.format || "BEST_OF_N",
            target: options.target
          }
        },
        games
      };
      const scored = calculateEmnScores(candidateEmn);
      if (scored.winner && scored.winner.length > 0) {
        computedResult = {
          status: scored.status,
          winner: scored.winner,
          scores: scored.scores
        };
      }
    }
    const emnFile = {
      fileType: "Euchre Match Notation",
      version: "1.1",
      metadata: {
        title: options.title || "Combined Euchre Match",
        description: options.description,
        date: (/* @__PURE__ */ new Date()).toISOString(),
        players: masterPlayers,
        matchFormat: {
          type: options.format || "BEST_OF_N",
          target: options.target
        },
        result: computedResult
      },
      games
    };
    const validation = validateEmn2(emnFile);
    if (!validation.isValid) {
      throw new Error(`Combined EMN validation failed: ${JSON.stringify(validation.errors)}`);
    }
    return emnFile;
  }

  // src/emn/extractor.ts
  function extractEgnFromEmn(emnFile, gameIndex) {
    return extractGameFromMatch(emnFile, gameIndex, validateEgn2);
  }
  function extractAllEgnsFromEmn(emnFile) {
    return extractAllGamesFromMatch(emnFile, validateEgn2);
  }

  // src/workbench/entry.ts
  function convertToBaselineEgn(value) {
    return convertToBaselineGame(value);
  }
  function hashBaselineEgn(egn) {
    return hashBaselineGame(egn, convertToBaselineEgn);
  }
  function upgradeObject(obj) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => upgradeObject(item));
    }
    const upgraded = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "kitty" || key === "initialLead" || key === "timings" || key === "views" || key === "layouts" || key === "videoUrl" || key === "viewSwitches" || key === "screens") {
        continue;
      }
      const newKey = {
        calls_annotations: "callAnnotations",
        tricks_annotations: "playAnnotations",
        player_cards: "playerCards",
        card_exchanges: "cardExchanges",
        match_id: "gameId",
        matchId: "gameId",
        initial_score: "initialScore",
        initialScore: "initialScore",
        initial_state: "initialState",
        initialState: "initialState",
        phase_number: "phaseNumber",
        phaseNumber: "phaseNumber",
        is_alone: "isAlone",
        isAlone: "isAlone",
        alone_defender: "aloneDefender",
        aloneDefender: "aloneDefender",
        play_annotations: "playAnnotations",
        playAnnotations: "playAnnotations",
        alternative_lines: "alternativeLines",
        alternativeLines: "alternativeLines",
        branch_index: "branchIndex",
        branchIndex: "branchIndex",
        up_card: "upCard",
        upCard: "upCard",
        file_type: "fileType",
        fileType: "fileType",
        loner_lead: "loner_lead",
        min_rank: "min_rank",
        winning_score: "winning_score",
        loner_march_score: "loner_march_score",
        loner_euchred_score: "loner_euchred_score",
        defend_alone: "defend_alone",
        num_players: "num_players",
        allow_no_trump: "allow_no_trump",
        fast_break: "fast_break",
        four_trick_tokens: "four_trick_tokens",
        go_under: "go_under",
        max_deals: "num_deals",
        num_deals: "num_deals",
        partners_best: "partners_best",
        farmers: "farmers",
        joker: "joker",
        canadian: "canadian",
        std: "std",
        player_ids: "playerIds",
        playerIds: "playerIds"
      }[key] || key;
      upgraded[newKey] = upgradeObject(value);
    }
    return upgraded;
  }
  function upgradeEgn(input) {
    const parsed = typeof input === "string" ? JSON.parse(input) : input;
    if (parsed.version) {
      parsed.version = SCHEMA_VERSION;
    }
    const upgraded = upgradeObject(parsed);
    if (Array.isArray(upgraded.deals)) {
      upgraded.deals.forEach((deal) => {
        const normalizePhases = (phases) => {
          if (Array.isArray(phases)) {
            phases.forEach((ph, idx) => {
              if (ph.type === "EUCHRE_BIDDING") {
                ph.phaseNumber = 0;
              } else if (ph.type === "TRICK_PLAY" || ph.type === "TRICK_PLAY_PHASE") {
                ph.phaseNumber = 1;
                delete ph.isAlone;
                delete ph.is_alone;
                delete ph.aloneDefender;
                delete ph.alone_defender;
                delete ph.initialLead;
                delete ph.initial_lead;
              } else if (typeof ph.phaseNumber === "number" && ph.phaseNumber > 0 && phases.length <= 2) {
                ph.phaseNumber = idx;
              }
            });
          }
        };
        if (deal && typeof deal === "object") {
          normalizePhases(deal.phases);
          if (Array.isArray(deal.alternativeLines)) {
            deal.alternativeLines.forEach((alt) => {
              if (alt && typeof alt === "object") {
                normalizePhases(alt.phases);
              }
            });
          }
        }
      });
    }
    return typeof input === "string" ? JSON.stringify(upgraded, null, 2) : upgraded;
  }
  return __toCommonJS(entry_exports);
})();
/*! Bundled license information:

long/umd/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
