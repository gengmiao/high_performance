/*
Highmaps JS v6.1.0 (2018-04-13)

(c) 2011-2016 Torstein Honsi

License: www.highcharts.com/license
*/
(function (T, I) { "object" === typeof module && module.exports ? module.exports = T.document ? I(T) : I : T.Highcharts = I(T) })("undefined" !== typeof window ? window : this, function (T) {
    var I = function () {
        var a = "undefined" === typeof T ? window : T, A = a.document, C = a.navigator && a.navigator.userAgent || "", z = A && A.createElementNS && !!A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, m = /(edge|msie|trident)/i.test(C) && !a.opera, e = -1 !== C.indexOf("Firefox"), k = -1 !== C.indexOf("Chrome"), r = e && 4 > parseInt(C.split("Firefox/")[1],
10); return a.Highcharts ? a.Highcharts.error(16, !0) : { product: "Highmaps", version: "6.1.0", deg2rad: 2 * Math.PI / 360, doc: A, hasBidiBug: r, hasTouch: A && void 0 !== A.documentElement.ontouchstart, isMS: m, isWebKit: -1 !== C.indexOf("AppleWebKit"), isFirefox: e, isChrome: k, isSafari: !k && -1 !== C.indexOf("Safari"), isTouchDevice: /(Mobile|Android|Windows Phone)/.test(C), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: z, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () { },
    charts: []
}
    } (); (function (a) {
        a.timers = []; var A = a.charts, C = a.doc, z = a.win; a.error = function (m, e) { m = a.isNumber(m) ? "Highcharts error #" + m + ": www.highcharts.com/errors/" + m : m; if (e) throw Error(m); z.console && console.log(m) }; a.Fx = function (a, e, k) { this.options = e; this.elem = a; this.prop = k }; a.Fx.prototype = { dSetter: function () {
            var a = this.paths[0], e = this.paths[1], k = [], r = this.now, x = a.length, p; if (1 === r) k = this.toD; else if (x === e.length && 1 > r) for (; x--; ) p = parseFloat(a[x]), k[x] = isNaN(p) ? e[x] : r * parseFloat(e[x] - p) + p; else k = e; this.elem.attr("d",
k, null, !0)
        }, update: function () { var a = this.elem, e = this.prop, k = this.now, r = this.options.step; if (this[e + "Setter"]) this[e + "Setter"](); else a.attr ? a.element && a.attr(e, k, null, !0) : a.style[e] = k + this.unit; r && r.call(a, k, this) }, run: function (m, e, k) {
            var r = this, x = r.options, p = function (a) { return p.stopped ? !1 : r.step(a) }, h = z.requestAnimationFrame || function (a) { setTimeout(a, 13) }, d = function () { for (var f = 0; f < a.timers.length; f++) a.timers[f]() || a.timers.splice(f--, 1); a.timers.length && h(d) }; m !== e || this.elem["forceAnimate:" +
this.prop] ? (this.startTime = +new Date, this.start = m, this.end = e, this.unit = k, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === a.timers.push(p) && h(d)) : (delete x.curAnim[this.prop], x.complete && 0 === a.keys(x.curAnim).length && x.complete.call(this.elem))
        }, step: function (m) {
            var e = +new Date, k, r = this.options, x = this.elem, p = r.complete, h = r.duration, d = r.curAnim; x.attr && !x.element ? m = !1 : m || e >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), k = d[this.prop] = !0, a.objectEach(d, function (a) {
                !0 !==
a && (k = !1)
            }), k && p && p.call(x), m = !1) : (this.pos = r.easing((e - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), m = !0); return m
        }, initPath: function (m, e, k) {
            function r(a) { var b, g; for (c = a.length; c--; ) b = "M" === a[c] || "L" === a[c], g = /[a-zA-Z]/.test(a[c + 3]), b && g && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2]) } function x(a, b) {
                for (; a.length < g; ) { a[0] = b[g - a.length]; var d = a.slice(0, u); [].splice.apply(a, [0, 0].concat(d)); l && (d = a.slice(a.length - u), [].splice.apply(a, [a.length, 0].concat(d)), c--) } a[0] =
"M"
            } function p(a, c) { for (var d = (g - a.length) / u; 0 < d && d--; ) b = a.slice().splice(a.length / y - u, u * y), b[0] = c[g - u - d * u], n && (b[u - 6] = b[u - 2], b[u - 5] = b[u - 1]), [].splice.apply(a, [a.length / y, 0].concat(b)), l && d-- } e = e || ""; var h, d = m.startX, f = m.endX, n = -1 < e.indexOf("C"), u = n ? 7 : 3, g, b, c; e = e.split(" "); k = k.slice(); var l = m.isArea, y = l ? 2 : 1, J; n && (r(e), r(k)); if (d && f) { for (c = 0; c < d.length; c++) if (d[c] === f[0]) { h = c; break } else if (d[0] === f[f.length - d.length + c]) { h = c; J = !0; break } void 0 === h && (e = []) } e.length && a.isNumber(h) && (g = k.length + h * y * u,
J ? (x(e, k), p(k, e)) : (x(k, e), p(e, k))); return [e, k]
        } 
        }; a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () { this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0) }; a.merge = function () {
            var m, e = arguments, k, r = {}, x = function (p, h) { "object" !== typeof p && (p = {}); a.objectEach(h, function (d, f) { !a.isObject(d, !0) || a.isClass(d) || a.isDOMElement(d) ? p[f] = h[f] : p[f] = x(p[f] || {}, d) }); return p }; !0 === e[0] && (r = e[1], e = Array.prototype.slice.call(e, 2)); k = e.length; for (m = 0; m < k; m++) r = x(r,
e[m]); return r
        }; a.pInt = function (a, e) { return parseInt(a, e || 10) }; a.isString = function (a) { return "string" === typeof a }; a.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a }; a.isObject = function (m, e) { return !!m && "object" === typeof m && (!e || !a.isArray(m)) }; a.isDOMElement = function (m) { return a.isObject(m) && "number" === typeof m.nodeType }; a.isClass = function (m) {
            var e = m && m.constructor; return !(!a.isObject(m, !0) || a.isDOMElement(m) || !e || !e.name || "Object" ===
e.name)
        }; a.isNumber = function (a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a }; a.erase = function (a, e) { for (var k = a.length; k--; ) if (a[k] === e) { a.splice(k, 1); break } }; a.defined = function (a) { return void 0 !== a && null !== a }; a.attr = function (m, e, k) { var r; a.isString(e) ? a.defined(k) ? m.setAttribute(e, k) : m && m.getAttribute && ((r = m.getAttribute(e)) || "class" !== e || (r = m.getAttribute(e + "Name"))) : a.defined(e) && a.isObject(e) && a.objectEach(e, function (a, p) { m.setAttribute(p, a) }); return r }; a.splat = function (m) {
            return a.isArray(m) ?
m : [m]
        }; a.syncTimeout = function (a, e, k) { if (e) return setTimeout(a, e, k); a.call(0, k) }; a.clearTimeout = function (m) { a.defined(m) && clearTimeout(m) }; a.extend = function (a, e) { var k; a || (a = {}); for (k in e) a[k] = e[k]; return a }; a.pick = function () { var a = arguments, e, k, r = a.length; for (e = 0; e < r; e++) if (k = a[e], void 0 !== k && null !== k) return k }; a.css = function (m, e) { a.isMS && !a.svg && e && void 0 !== e.opacity && (e.filter = "alpha(opacity\x3d" + 100 * e.opacity + ")"); a.extend(m.style, e) }; a.createElement = function (m, e, k, r, x) {
            m = C.createElement(m); var p =
a.css; e && a.extend(m, e); x && p(m, { padding: 0, border: "none", margin: 0 }); k && p(m, k); r && r.appendChild(m); return m
        }; a.extendClass = function (m, e) { var k = function () { }; k.prototype = new m; a.extend(k.prototype, e); return k }; a.pad = function (a, e, k) { return Array((e || 2) + 1 - String(a).replace("-", "").length).join(k || 0) + a }; a.relativeLength = function (a, e, k) { return /%$/.test(a) ? e * parseFloat(a) / 100 + (k || 0) : parseFloat(a) }; a.wrap = function (a, e, k) {
            var m = a[e]; a[e] = function () {
                var a = Array.prototype.slice.call(arguments), p = arguments, h = this;
                h.proceed = function () { m.apply(h, arguments.length ? arguments : p) }; a.unshift(m); a = k.apply(this, a); h.proceed = null; return a
            } 
        }; a.formatSingle = function (m, e, k) { var r = /\.([0-9])/, x = a.defaultOptions.lang; /f$/.test(m) ? (k = (k = m.match(r)) ? k[1] : -1, null !== e && (e = a.numberFormat(e, k, x.decimalPoint, -1 < m.indexOf(",") ? x.thousandsSep : ""))) : e = (k || a.time).dateFormat(m, e); return e }; a.format = function (m, e, k) {
            for (var r = "{", x = !1, p, h, d, f, n = [], u; m; ) {
                r = m.indexOf(r); if (-1 === r) break; p = m.slice(0, r); if (x) {
                    p = p.split(":"); h = p.shift().split(".");
                    f = h.length; u = e; for (d = 0; d < f; d++) u && (u = u[h[d]]); p.length && (u = a.formatSingle(p.join(":"), u, k)); n.push(u)
                } else n.push(p); m = m.slice(r + 1); r = (x = !x) ? "}" : "{"
            } n.push(m); return n.join("")
        }; a.getMagnitude = function (a) { return Math.pow(10, Math.floor(Math.log(a) / Math.LN10)) }; a.normalizeTickInterval = function (m, e, k, r, x) {
            var p, h = m; k = a.pick(k, 1); p = m / k; e || (e = x ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === r && (1 === k ? e = a.grep(e, function (a) { return 0 === a % 1 }) : .1 >= k && (e = [1 / k]))); for (r = 0; r < e.length && !(h = e[r], x && h * k >= m ||
!x && p <= (e[r] + (e[r + 1] || e[r])) / 2); r++); return h = a.correctFloat(h * k, -Math.round(Math.log(.001) / Math.LN10))
        }; a.stableSort = function (a, e) { var k = a.length, m, x; for (x = 0; x < k; x++) a[x].safeI = x; a.sort(function (a, h) { m = e(a, h); return 0 === m ? a.safeI - h.safeI : m }); for (x = 0; x < k; x++) delete a[x].safeI }; a.arrayMin = function (a) { for (var e = a.length, k = a[0]; e--; ) a[e] < k && (k = a[e]); return k }; a.arrayMax = function (a) { for (var e = a.length, k = a[0]; e--; ) a[e] > k && (k = a[e]); return k }; a.destroyObjectProperties = function (m, e) {
            a.objectEach(m, function (a,
r) { a && a !== e && a.destroy && a.destroy(); delete m[r] })
        }; a.discardElement = function (m) { var e = a.garbageBin; e || (e = a.createElement("div")); m && e.appendChild(m); e.innerHTML = "" }; a.correctFloat = function (a, e) { return parseFloat(a.toPrecision(e || 14)) }; a.setAnimation = function (m, e) { e.renderer.globalAnimation = a.pick(m, e.options.chart.animation, !0) }; a.animObject = function (m) { return a.isObject(m) ? a.merge(m) : { duration: m ? 500 : 0} }; a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5,
            year: 314496E5
        }; a.numberFormat = function (m, e, k, r) {
            m = +m || 0; e = +e; var x = a.defaultOptions.lang, p = (m.toString().split(".")[1] || "").split("e")[0].length, h, d, f = m.toString().split("e"); -1 === e ? e = Math.min(p, 20) : a.isNumber(e) ? e && f[1] && 0 > f[1] && (h = e + +f[1], 0 <= h ? (f[0] = (+f[0]).toExponential(h).split("e")[0], e = h) : (f[0] = f[0].split(".")[0] || 0, m = 20 > e ? (f[0] * Math.pow(10, f[1])).toFixed(e) : 0, f[1] = 0)) : e = 2; d = (Math.abs(f[1] ? f[0] : m) + Math.pow(10, -Math.max(e, p) - 1)).toFixed(e); p = String(a.pInt(d)); h = 3 < p.length ? p.length % 3 : 0; k = a.pick(k,
x.decimalPoint); r = a.pick(r, x.thousandsSep); m = (0 > m ? "-" : "") + (h ? p.substr(0, h) + r : ""); m += p.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + r); e && (m += k + d.slice(-e)); f[1] && 0 !== +m && (m += "e" + f[1]); return m
        }; Math.easeInOutSine = function (a) { return -.5 * (Math.cos(Math.PI * a) - 1) }; a.getStyle = function (m, e, k) {
            if ("width" === e) return Math.min(m.offsetWidth, m.scrollWidth) - a.getStyle(m, "padding-left") - a.getStyle(m, "padding-right"); if ("height" === e) return Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m, "padding-top") - a.getStyle(m,
"padding-bottom"); z.getComputedStyle || a.error(27, !0); if (m = z.getComputedStyle(m, void 0)) m = m.getPropertyValue(e), a.pick(k, "opacity" !== e) && (m = a.pInt(m)); return m
        }; a.inArray = function (m, e, k) { return (a.indexOfPolyfill || Array.prototype.indexOf).call(e, m, k) }; a.grep = function (m, e) { return (a.filterPolyfill || Array.prototype.filter).call(m, e) }; a.find = Array.prototype.find ? function (a, e) { return a.find(e) } : function (a, e) { var k, m = a.length; for (k = 0; k < m; k++) if (e(a[k], k)) return a[k] }; a.some = function (m, e, k) {
            return (a.somePolyfill ||
Array.prototype.some).call(m, e, k)
        }; a.map = function (a, e) { for (var k = [], m = 0, x = a.length; m < x; m++) k[m] = e.call(a[m], a[m], m, a); return k }; a.keys = function (m) { return (a.keysPolyfill || Object.keys).call(void 0, m) }; a.reduce = function (m, e, k) { return (a.reducePolyfill || Array.prototype.reduce).call(m, e, k) }; a.offset = function (a) {
            var e = C.documentElement; a = a.parentElement ? a.getBoundingClientRect() : { top: 0, left: 0 }; return { top: a.top + (z.pageYOffset || e.scrollTop) - (e.clientTop || 0), left: a.left + (z.pageXOffset || e.scrollLeft) - (e.clientLeft ||
0)
            }
        }; a.stop = function (m, e) { for (var k = a.timers.length; k--; ) a.timers[k].elem !== m || e && e !== a.timers[k].prop || (a.timers[k].stopped = !0) }; a.each = function (m, e, k) { return (a.forEachPolyfill || Array.prototype.forEach).call(m, e, k) }; a.objectEach = function (a, e, k) { for (var m in a) a.hasOwnProperty(m) && e.call(k || a[m], a[m], m, a) }; a.addEvent = function (m, e, k) {
            var r, x = m.addEventListener || a.addEventListenerPolyfill; r = "function" === typeof m && m.prototype ? m.prototype.protoEvents = m.prototype.protoEvents || {} : m.hcEvents = m.hcEvents ||
{}; x && x.call(m, e, k, !1); r[e] || (r[e] = []); r[e].push(k); return function () { a.removeEvent(m, e, k) } 
        }; a.removeEvent = function (m, e, k) {
            function r(d, f) { var h = m.removeEventListener || a.removeEventListenerPolyfill; h && h.call(m, d, f, !1) } function x(d) { var f, h; m.nodeName && (e ? (f = {}, f[e] = !0) : f = d, a.objectEach(f, function (a, g) { if (d[g]) for (h = d[g].length; h--; ) r(g, d[g][h]) })) } var p, h; a.each(["protoEvents", "hcEvents"], function (d) {
                var f = m[d]; f && (e ? (p = f[e] || [], k ? (h = a.inArray(k, p), -1 < h && (p.splice(h, 1), f[e] = p), r(e, k)) : (x(f), f[e] =
[])) : (x(f), m[d] = {}))
            })
        }; a.fireEvent = function (m, e, k, r) {
            var x, p, h, d, f; k = k || {}; C.createEvent && (m.dispatchEvent || m.fireEvent) ? (x = C.createEvent("Events"), x.initEvent(e, !0, !0), a.extend(x, k), m.dispatchEvent ? m.dispatchEvent(x) : m.fireEvent(e, x)) : a.each(["protoEvents", "hcEvents"], function (n) { if (m[n]) for (p = m[n][e] || [], h = p.length, k.target || a.extend(k, { preventDefault: function () { k.defaultPrevented = !0 }, target: m, type: e }), d = 0; d < h; d++) (f = p[d]) && !1 === f.call(m, k) && k.preventDefault() }); r && !k.defaultPrevented && r.call(m,
k)
        }; a.animate = function (m, e, k) {
            var r, x = "", p, h, d; a.isObject(k) || (d = arguments, k = { duration: d[2], easing: d[3], complete: d[4] }); a.isNumber(k.duration) || (k.duration = 400); k.easing = "function" === typeof k.easing ? k.easing : Math[k.easing] || Math.easeInOutSine; k.curAnim = a.merge(e); a.objectEach(e, function (d, n) {
                a.stop(m, n); h = new a.Fx(m, k, n); p = null; "d" === n ? (h.paths = h.initPath(m, m.d, e.d), h.toD = e.d, r = 0, p = 1) : m.attr ? r = m.attr(n) : (r = parseFloat(a.getStyle(m, n)) || 0, "opacity" !== n && (x = "px")); p || (p = d); p && p.match && p.match("px") &&
(p = p.replace(/px/g, "")); h.run(r, p, x)
            })
        }; a.seriesType = function (m, e, k, r, x) { var p = a.getOptions(), h = a.seriesTypes; p.plotOptions[m] = a.merge(p.plotOptions[e], k); h[m] = a.extendClass(h[e] || function () { }, r); h[m].prototype.type = m; x && (h[m].prototype.pointClass = a.extendClass(a.Point, x)); return h[m] }; a.uniqueKey = function () { var a = Math.random().toString(36).substring(2, 9), e = 0; return function () { return "highcharts-" + a + "-" + e++ } } (); z.jQuery && (z.jQuery.fn.highcharts = function () {
            var m = [].slice.call(arguments); if (this[0]) return m[0] ?
(new (a[a.isString(m[0]) ? m.shift() : "Chart"])(this[0], m[0], m[1]), this) : A[a.attr(this[0], "data-highcharts-chart")]
        })
    })(I); (function (a) {
        var A = a.each, C = a.isNumber, z = a.map, m = a.merge, e = a.pInt; a.Color = function (e) { if (!(this instanceof a.Color)) return new a.Color(e); this.init(e) }; a.Color.prototype = { parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (a) { return [e(a[1]), e(a[2]), e(a[3]), parseFloat(a[4], 10)] } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function (a) { return [e(a[1]), e(a[2]), e(a[3]), 1] } 
        }], names: { none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000" }, init: function (e) {
            var k, m, p, h; if ((this.input = e = this.names[e && e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops) this.stops = z(e.stops, function (d) { return new a.Color(d[1]) }); else if (e && e.charAt && "#" === e.charAt() && (k = e.length, e = parseInt(e.substr(1), 16), 7 === k ? m = [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255, 1] : 4 === k && (m = [(e & 3840) >> 4 | (e & 3840) >> 8, (e & 240) >> 4 | e & 240, (e & 15) << 4 | e & 15, 1])), !m) for (p = this.parsers.length; p-- &&
!m; ) h = this.parsers[p], (k = h.regex.exec(e)) && (m = h.parse(k)); this.rgba = m || []
        }, get: function (a) { var e = this.input, k = this.rgba, p; this.stops ? (p = m(e), p.stops = [].concat(p.stops), A(this.stops, function (h, d) { p.stops[d] = [p.stops[d][0], h.get(a)] })) : p = k && C(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : e; return p }, brighten: function (a) {
            var k, m = this.rgba; if (this.stops) A(this.stops, function (e) { e.brighten(a) }); else if (C(a) && 0 !== a) for (k = 0; 3 > k; k++) m[k] += e(255 * a), 0 >
m[k] && (m[k] = 0), 255 < m[k] && (m[k] = 255); return this
        }, setOpacity: function (a) { this.rgba[3] = a; return this }, tweenTo: function (a, e) { var k = this.rgba, p = a.rgba; p.length && k && k.length ? (a = 1 !== p[3] || 1 !== k[3], e = (a ? "rgba(" : "rgb(") + Math.round(p[0] + (k[0] - p[0]) * (1 - e)) + "," + Math.round(p[1] + (k[1] - p[1]) * (1 - e)) + "," + Math.round(p[2] + (k[2] - p[2]) * (1 - e)) + (a ? "," + (p[3] + (k[3] - p[3]) * (1 - e)) : "") + ")") : e = a.input || "none"; return e } 
        }; a.color = function (e) { return new a.Color(e) } 
    })(I); (function (a) {
        var A = a.defined, C = a.each, z = a.extend, m = a.merge,
e = a.pick, k = a.timeUnits, r = a.win; a.Time = function (a) { this.update(a, !1) }; a.Time.prototype = { defaultOptions: {}, update: function (k) {
    var p = e(k && k.useUTC, !0), h = this; this.options = k = m(!0, this.options || {}, k); this.Date = k.Date || r.Date; this.timezoneOffset = (this.useUTC = p) && k.timezoneOffset; this.getTimezoneOffset = this.timezoneOffsetFunction(); (this.variableTimezone = !(p && !k.getTimezoneOffset && !k.timezone)) || this.timezoneOffset ? (this.get = function (a, f) {
        var d = f.getTime(), e = d - h.getTimezoneOffset(f); f.setTime(e); a = f["getUTC" +
a](); f.setTime(d); return a
    }, this.set = function (d, f, n) { var e; if (-1 !== a.inArray(d, ["Milliseconds", "Seconds", "Minutes"])) f["set" + d](n); else e = h.getTimezoneOffset(f), e = f.getTime() - e, f.setTime(e), f["setUTC" + d](n), d = h.getTimezoneOffset(f), e = f.getTime() + d, f.setTime(e) }) : p ? (this.get = function (a, f) { return f["getUTC" + a]() }, this.set = function (a, f, h) { return f["setUTC" + a](h) }) : (this.get = function (a, f) { return f["get" + a]() }, this.set = function (a, f, h) { return f["set" + a](h) })
}, makeTime: function (k, p, h, d, f, n) {
    var u, g, b; this.useUTC ?
(u = this.Date.UTC.apply(0, arguments), g = this.getTimezoneOffset(u), u += g, b = this.getTimezoneOffset(u), g !== b ? u += b - g : g - 36E5 !== this.getTimezoneOffset(u - 36E5) || a.isSafari || (u -= 36E5)) : u = (new this.Date(k, p, e(h, 1), e(d, 0), e(f, 0), e(n, 0))).getTime(); return u
}, timezoneOffsetFunction: function () {
    var e = this, p = this.options, h = r.moment; if (!this.useUTC) return function (a) { return 6E4 * (new Date(a)).getTimezoneOffset() }; if (p.timezone) { if (h) return function (a) { return 6E4 * -h.tz(a, p.timezone).utcOffset() }; a.error(25) } return this.useUTC &&
p.getTimezoneOffset ? function (a) { return 6E4 * p.getTimezoneOffset(a) } : function () { return 6E4 * (e.timezoneOffset || 0) } 
}, dateFormat: function (e, p, h) {
    if (!a.defined(p) || isNaN(p)) return a.defaultOptions.lang.invalidDate || ""; e = a.pick(e, "%Y-%m-%d %H:%M:%S"); var d = this, f = new this.Date(p), n = this.get("Hours", f), u = this.get("Day", f), g = this.get("Date", f), b = this.get("Month", f), c = this.get("FullYear", f), l = a.defaultOptions.lang, y = l.weekdays, k = l.shortWeekdays, q = a.pad, f = a.extend({ a: k ? k[u] : y[u].substr(0, 3), A: y[u], d: q(g), e: q(g,
2, " "), w: u, b: l.shortMonths[b], B: l.months[b], m: q(b + 1), y: c.toString().substr(2, 2), Y: c, H: q(n), k: n, I: q(n % 12 || 12), l: n % 12 || 12, M: q(d.get("Minutes", f)), p: 12 > n ? "AM" : "PM", P: 12 > n ? "am" : "pm", S: q(f.getSeconds()), L: q(Math.round(p % 1E3), 3)
    }, a.dateFormats); a.objectEach(f, function (a, b) { for (; -1 !== e.indexOf("%" + b); ) e = e.replace("%" + b, "function" === typeof a ? a.call(d, p) : a) }); return h ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
}, getTimeTicks: function (a, p, h, d) {
    var f = this, n = [], u = {}, g, b = new f.Date(p), c = a.unitRange, l = a.count || 1,
y; if (A(p)) {
        f.set("Milliseconds", b, c >= k.second ? 0 : l * Math.floor(f.get("Milliseconds", b) / l)); c >= k.second && f.set("Seconds", b, c >= k.minute ? 0 : l * Math.floor(f.get("Seconds", b) / l)); c >= k.minute && f.set("Minutes", b, c >= k.hour ? 0 : l * Math.floor(f.get("Minutes", b) / l)); c >= k.hour && f.set("Hours", b, c >= k.day ? 0 : l * Math.floor(f.get("Hours", b) / l)); c >= k.day && f.set("Date", b, c >= k.month ? 1 : l * Math.floor(f.get("Date", b) / l)); c >= k.month && (f.set("Month", b, c >= k.year ? 0 : l * Math.floor(f.get("Month", b) / l)), g = f.get("FullYear", b)); c >= k.year &&
f.set("FullYear", b, g - g % l); c === k.week && f.set("Date", b, f.get("Date", b) - f.get("Day", b) + e(d, 1)); g = f.get("FullYear", b); d = f.get("Month", b); var J = f.get("Date", b), q = f.get("Hours", b); p = b.getTime(); f.variableTimezone && (y = h - p > 4 * k.month || f.getTimezoneOffset(p) !== f.getTimezoneOffset(h)); b = b.getTime(); for (p = 1; b < h; ) n.push(b), b = c === k.year ? f.makeTime(g + p * l, 0) : c === k.month ? f.makeTime(g, d + p * l) : !y || c !== k.day && c !== k.week ? y && c === k.hour && 1 < l ? f.makeTime(g, d, J, q + p * l) : b + c * l : f.makeTime(g, d, J + p * l * (c === k.day ? 1 : 7)), p++; n.push(b);
        c <= k.hour && 1E4 > n.length && C(n, function (a) { 0 === a % 18E5 && "000000000" === f.dateFormat("%H%M%S%L", a) && (u[a] = "day") })
    } n.info = z(a, { higherRanks: u, totalRange: c * l }); return n
} 
}
    })(I); (function (a) {
        var A = a.color, C = a.merge; a.defaultOptions = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " "
        }, global: {}, time: a.Time.prototype.defaultOptions, chart: { borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10} }, width: null,
            height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc"
        }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333"} }, legend: { enabled: !0, align: "center", alignColumns: !0, layout: "horizontal", labelFormatter: function () { return this.name }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333",
            fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis"
        }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold"}}
        }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"} }, tooltip: { enabled: !0, animation: a.svg, borderRadius: 3,
            dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, backgroundColor: A("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
            shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap"}
        }, credits: { enabled: !0, href: "http://www.highcharts.com", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com"}
        }; a.setOptions = function (z) { a.defaultOptions = C(!0, a.defaultOptions, z); a.time.update(C(a.defaultOptions.global, a.defaultOptions.time), !1); return a.defaultOptions }; a.getOptions = function () { return a.defaultOptions };
        a.defaultPlotOptions = a.defaultOptions.plotOptions; a.time = new a.Time(C(a.defaultOptions.global, a.defaultOptions.time)); a.dateFormat = function (z, m, e) { return a.time.dateFormat(z, m, e) } 
    })(I); (function (a) {
        var A, C, z = a.addEvent, m = a.animate, e = a.attr, k = a.charts, r = a.color, x = a.css, p = a.createElement, h = a.defined, d = a.deg2rad, f = a.destroyObjectProperties, n = a.doc, u = a.each, g = a.extend, b = a.erase, c = a.grep, l = a.hasTouch, y = a.inArray, J = a.isArray, q = a.isFirefox, M = a.isMS, E = a.isObject, D = a.isString, w = a.isWebKit, G = a.merge, B = a.noop,
L = a.objectEach, H = a.pick, t = a.pInt, v = a.removeEvent, N = a.stop, P = a.svg, K = a.SVG_NS, Q = a.symbolSizes, O = a.win; A = a.SVGElement = function () { return this }; g(A.prototype, { opacity: 1, SVG_NS: K, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "), init: function (a, b) { this.element = "span" === b ? p(b) : n.createElementNS(this.SVG_NS, b); this.renderer = a }, animate: function (b, c, t) {
    c = a.animObject(H(c, this.renderer.globalAnimation, !0)); 0 !==
c.duration ? (t && (c.complete = t), m(this, b, c)) : (this.attr(b, null, t), c.step && c.step.call(this)); return this
}, complexColor: function (b, c, t) {
    var F = this.renderer, v, g, d, l, f, w, K, e, B, R, n, q = [], y; a.fireEvent(this.renderer, "complexColor", { args: arguments }, function () {
        b.radialGradient ? g = "radialGradient" : b.linearGradient && (g = "linearGradient"); g && (d = b[g], f = F.gradients, K = b.stops, R = t.radialReference, J(d) && (b[g] = d = { x1: d[0], y1: d[1], x2: d[2], y2: d[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === g && R && !h(d.gradientUnits) &&
(l = d, d = G(d, F.getRadialAttr(R, l), { gradientUnits: "userSpaceOnUse" })), L(d, function (a, b) { "id" !== b && q.push(b, a) }), L(K, function (a) { q.push(a) }), q = q.join(","), f[q] ? n = f[q].attr("id") : (d.id = n = a.uniqueKey(), f[q] = w = F.createElement(g).attr(d).add(F.defs), w.radAttr = l, w.stops = [], u(K, function (b) { 0 === b[1].indexOf("rgba") ? (v = a.color(b[1]), e = v.get("rgb"), B = v.get("a")) : (e = b[1], B = 1); b = F.createElement("stop").attr({ offset: b[0], "stop-color": e, "stop-opacity": B }).add(w); w.stops.push(b) })), y = "url(" + F.url + "#" + n + ")", t.setAttribute(c,
y), t.gradient = q, b.toString = function () { return y })
    })
}, applyTextOutline: function (F) {
    var c = this.element, t, v, g, d, l; -1 !== F.indexOf("contrast") && (F = F.replace(/contrast/g, this.renderer.getContrast(c.style.fill))); F = F.split(" "); v = F[F.length - 1]; if ((g = F[0]) && "none" !== g && a.svg) {
        this.fakeTS = !0; F = [].slice.call(c.getElementsByTagName("tspan")); this.ySetter = this.xSetter; g = g.replace(/(^[\d\.]+)(.*?)$/g, function (a, b, c) { return 2 * b + c }); for (l = F.length; l--; ) t = F[l], "highcharts-text-outline" === t.getAttribute("class") &&
b(F, c.removeChild(t)); d = c.firstChild; u(F, function (a, b) { 0 === b && (a.setAttribute("x", c.getAttribute("x")), b = c.getAttribute("y"), a.setAttribute("y", b || 0), null === b && c.setAttribute("y", 0)); a = a.cloneNode(1); e(a, { "class": "highcharts-text-outline", fill: v, stroke: v, "stroke-width": g, "stroke-linejoin": "round" }); c.insertBefore(a, d) })
    } 
}, attr: function (a, b, c, t) {
    var F, v = this.element, g, d = this, l, f; "string" === typeof a && void 0 !== b && (F = a, a = {}, a[F] = b); "string" === typeof a ? d = (this[a + "Getter"] || this._defaultGetter).call(this,
a, v) : (L(a, function (b, c) { l = !1; t || N(this, c); this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(c) && (g || (this.symbolAttr(a), g = !0), l = !0); !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0); l || (f = this[c + "Setter"] || this._defaultSetter, f.call(this, b, c, v), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, b, f)) }, this), this.afterSetters()); c && c.call(this); return d
}, afterSetters: function () {
    this.doTransform && (this.updateTransform(),
this.doTransform = !1)
}, updateShadows: function (a, b, c) { for (var F = this.shadows, t = F.length; t--; ) c.call(F[t], "height" === a ? Math.max(b - (F[t].cutHeight || 0), 0) : "d" === a ? this.d : b, a, F[t]) }, addClass: function (a, b) { var c = this.attr("class") || ""; -1 === c.indexOf(a) && (b || (a = (c + (c ? " " : "") + a).replace("  ", " ")), this.attr("class", a)); return this }, hasClass: function (a) { return -1 !== y(a, (this.attr("class") || "").split(" ")) }, removeClass: function (a) { return this.attr("class", (this.attr("class") || "").replace(a, "")) }, symbolAttr: function (a) {
    var b =
this; u("x y r start end width height innerR anchorX anchorY".split(" "), function (c) { b[c] = H(a[c], b[c]) }); b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) })
}, clip: function (a) { return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none") }, crisp: function (a, b) {
    var c; b = b || a.strokeWidth || 0; c = Math.round(b) % 2 / 2; a.x = Math.floor(a.x || this.x || 0) + c; a.y = Math.floor(a.y || this.y || 0) + c; a.width = Math.floor((a.width || this.width || 0) - 2 * c); a.height = Math.floor((a.height || this.height || 0) -
2 * c); h(a.strokeWidth) && (a.strokeWidth = b); return a
}, css: function (a) {
    var b = this.styles, c = {}, F = this.element, v, d = "", l, f = !b, w = ["textOutline", "textOverflow", "width"]; a && a.color && (a.fill = a.color); b && L(a, function (a, t) { a !== b[t] && (c[t] = a, f = !0) }); f && (b && (a = g(b, c)), v = this.textWidth = a && a.width && "auto" !== a.width && "text" === F.nodeName.toLowerCase() && t(a.width), this.styles = a, v && !P && this.renderer.forExport && delete a.width, F.namespaceURI === this.SVG_NS ? (l = function (a, b) { return "-" + b.toLowerCase() }, L(a, function (a, b) {
        -1 ===
y(b, w) && (d += b.replace(/([A-Z])/g, l) + ":" + a + ";")
    }), d && e(F, "style", d)) : x(F, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))); return this
}, strokeWidth: function () { return this["stroke-width"] || 0 }, on: function (a, b) {
    var c = this, t = c.element; l && "click" === a ? (t.ontouchstart = function (a) { c.touchEventFired = Date.now(); a.preventDefault(); b.call(t, a) }, t.onclick = function (a) {
        (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() -
(c.touchEventFired || 0)) && b.call(t, a)
    }) : t["on" + a] = b; return this
}, setRadialReference: function (a) { var b = this.renderer.gradients[this.element.gradient]; this.element.radialReference = a; b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)); return this }, translate: function (a, b) { return this.attr({ translateX: a, translateY: b }) }, invert: function (a) { this.inverted = a; this.updateTransform(); return this }, updateTransform: function () {
    var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, t = this.scaleY,
v = this.inverted, g = this.rotation, d = this.matrix, l = this.element; v && (a += this.width, b += this.height); a = ["translate(" + a + "," + b + ")"]; h(d) && a.push("matrix(" + d.join(",") + ")"); v ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + H(this.rotationOriginX, l.getAttribute("x"), 0) + " " + H(this.rotationOriginY, l.getAttribute("y") || 0) + ")"); (h(c) || h(t)) && a.push("scale(" + H(c, 1) + " " + H(t, 1) + ")"); a.length && l.setAttribute("transform", a.join(" "))
}, toFront: function () { var a = this.element; a.parentNode.appendChild(a); return this },
    align: function (a, c, t) {
        var F, v, g, d, l = {}; v = this.renderer; g = v.alignedObjects; var f, w; if (a) { if (this.alignOptions = a, this.alignByTranslate = c, !t || D(t)) this.alignTo = F = t || "renderer", b(g, this), g.push(this), t = null } else a = this.alignOptions, c = this.alignByTranslate, F = this.alignTo; t = H(t, v[F], v); F = a.align; v = a.verticalAlign; g = (t.x || 0) + (a.x || 0); d = (t.y || 0) + (a.y || 0); "right" === F ? f = 1 : "center" === F && (f = 2); f && (g += (t.width - (a.width || 0)) / f); l[c ? "translateX" : "x"] = Math.round(g); "bottom" === v ? w = 1 : "middle" === v && (w = 2); w && (d += (t.height -
(a.height || 0)) / w); l[c ? "translateY" : "y"] = Math.round(d); this[this.placed ? "animate" : "attr"](l); this.placed = !0; this.alignAttr = l; return this
    }, getBBox: function (a, b) {
        var c, t = this.renderer, F, v = this.element, l = this.styles, f, w = this.textStr, K, e = t.cache, B = t.cacheKeys, n; b = H(b, this.rotation); F = b * d; f = l && l.fontSize; h(w) && (n = w.toString(), -1 === n.indexOf("\x3c") && (n = n.replace(/[0-9]/g, "0")), n += ["", b || 0, f, this.textWidth, l && l.textOverflow].join()); n && !a && (c = e[n]); if (!c) {
            if (v.namespaceURI === this.SVG_NS || t.forExport) {
                try {
                    (K =
this.fakeTS && function (a) { u(v.querySelectorAll(".highcharts-text-outline"), function (b) { b.style.display = a }) }) && K("none"), c = v.getBBox ? g({}, v.getBBox()) : { width: v.offsetWidth, height: v.offsetHeight }, K && K("")
                } catch (X) { } if (!c || 0 > c.width) c = { width: 0, height: 0}
            } else c = this.htmlGetBBox(); t.isSVG && (a = c.width, t = c.height, l && "11px" === l.fontSize && 17 === Math.round(t) && (c.height = t = 14), b && (c.width = Math.abs(t * Math.sin(F)) + Math.abs(a * Math.cos(F)), c.height = Math.abs(t * Math.cos(F)) + Math.abs(a * Math.sin(F)))); if (n && 0 < c.height) {
                for (; 250 <
B.length; ) delete e[B.shift()]; e[n] || B.push(n); e[n] = c
            } 
        } return c
    }, show: function (a) { return this.attr({ visibility: a ? "inherit" : "visible" }) }, hide: function () { return this.attr({ visibility: "hidden" }) }, fadeOut: function (a) { var b = this; b.animate({ opacity: 0 }, { duration: a || 150, complete: function () { b.attr({ y: -9999 }) } }) }, add: function (a) {
        var b = this.renderer, c = this.element, t; a && (this.parentGroup = a); this.parentInverted = a && a.inverted; void 0 !== this.textStr && b.buildText(this); this.added = !0; if (!a || a.handleZ || this.zIndex) t =
this.zIndexSetter(); t || (a ? a.element : b.box).appendChild(c); if (this.onAdd) this.onAdd(); return this
    }, safeRemoveChild: function (a) { var b = a.parentNode; b && b.removeChild(a) }, destroy: function () {
        var a = this, c = a.element || {}, t = a.renderer.isSVG && "SPAN" === c.nodeName && a.parentGroup, v = c.ownerSVGElement, g = a.clipPath; c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null; N(a); g && v && (u(v.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
            var b = a.getAttribute("clip-path"), c = g.element.id; (-1 < b.indexOf("(#" +
c + ")") || -1 < b.indexOf('("#' + c + '")')) && a.removeAttribute("clip-path")
        }), a.clipPath = g.destroy()); if (a.stops) { for (v = 0; v < a.stops.length; v++) a.stops[v] = a.stops[v].destroy(); a.stops = null } a.safeRemoveChild(c); for (a.destroyShadows(); t && t.div && 0 === t.div.childNodes.length; ) c = t.parentGroup, a.safeRemoveChild(t.div), delete t.div, t = c; a.alignTo && b(a.renderer.alignedObjects, a); L(a, function (b, c) { delete a[c] }); return null
    }, shadow: function (a, b, c) {
        var t = [], v, g, F = this.element, d, l, f, w; if (!a) this.destroyShadows(); else if (!this.shadows) {
            l =
H(a.width, 3); f = (a.opacity || .15) / l; w = this.parentInverted ? "(-1,-1)" : "(" + H(a.offsetX, 1) + ", " + H(a.offsetY, 1) + ")"; for (v = 1; v <= l; v++) g = F.cloneNode(0), d = 2 * l + 1 - 2 * v, e(g, { isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": f * v, "stroke-width": d, transform: "translate" + w, fill: "none" }), c && (e(g, "height", Math.max(e(g, "height") - d, 0)), g.cutHeight = d), b ? b.element.appendChild(g) : F.parentNode && F.parentNode.insertBefore(g, F), t.push(g); this.shadows = t
        } return this
    }, destroyShadows: function () {
        u(this.shadows || [], function (a) { this.safeRemoveChild(a) },
this); this.shadows = void 0
    }, xGetter: function (a) { "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")); return this._defaultGetter(a) }, _defaultGetter: function (a) { a = H(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a }, dSetter: function (a, b, c) { a && a.join && (a = a.join(" ")); /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"); this[b] !== a && (c.setAttribute(b, a), this[b] = a) }, dashstyleSetter: function (a) {
        var b, c = this["stroke-width"]; "inherit" ===
c && (c = 1); if (a = a && a.toLowerCase()) { a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","); for (b = a.length; b--; ) a[b] = t(a[b]) * c; a = a.join(",").replace(/NaN/g, "none"); this.element.setAttribute("stroke-dasharray", a) } 
    }, alignSetter: function (a) {
        this.alignValue = a; this.element.setAttribute("text-anchor", { left: "start", center: "middle",
            right: "end"
        }[a])
    }, opacitySetter: function (a, b, c) { this[b] = a; c.setAttribute(b, a) }, titleSetter: function (a) { var b = this.element.getElementsByTagName("title")[0]; b || (b = n.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b)); b.firstChild && b.removeChild(b.firstChild); b.appendChild(n.createTextNode(String(H(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e"))) }, textSetter: function (a) { a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this)) },
    fillSetter: function (a, b, c) { "string" === typeof a ? c.setAttribute(b, a) : a && this.complexColor(a, b, c) }, visibilitySetter: function (a, b, c) { "inherit" === a ? c.removeAttribute(b) : this[b] !== a && c.setAttribute(b, a); this[b] = a }, zIndexSetter: function (a, b) {
        var c = this.renderer, v = this.parentGroup, g = (v || c).element || c.box, d, l = this.element, f, w, c = g === c.box; d = this.added; var F; h(a) && (l.zIndex = a, a = +a, this[b] === a && (d = !1), this[b] = a); if (d) {
            (a = this.zIndex) && v && (v.handleZ = !0); b = g.childNodes; for (F = b.length - 1; 0 <= F && !f; F--) if (v = b[F], d =
v.zIndex, w = !h(d), v !== l) if (0 > a && w && !c && !F) g.insertBefore(l, b[F]), f = !0; else if (t(d) <= a || w && (!h(a) || 0 <= a)) g.insertBefore(l, b[F + 1] || null), f = !0; f || (g.insertBefore(l, b[c ? 3 : 0] || null), f = !0)
        } return f
    }, _defaultSetter: function (a, b, c) { c.setAttribute(b, a) } 
}); A.prototype.yGetter = A.prototype.xGetter; A.prototype.translateXSetter = A.prototype.translateYSetter = A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.rotationOriginXSetter = A.prototype.rotationOriginYSetter = A.prototype.scaleXSetter = A.prototype.scaleYSetter =
A.prototype.matrixSetter = function (a, b) { this[b] = a; this.doTransform = !0 }; A.prototype["stroke-widthSetter"] = A.prototype.strokeSetter = function (a, b, c) { this[b] = a; this.stroke && this["stroke-width"] ? (A.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1) }; C = a.SVGRenderer = function () { this.init.apply(this, arguments) }; g(C.prototype, { Element: A, SVG_NS: K,
    init: function (a, b, c, t, v, g) {
        var d; t = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }).css(this.getStyle(t)); d = t.element; a.appendChild(d); e(a, "dir", "ltr"); -1 === a.innerHTML.indexOf("xmlns") && e(d, "xmlns", this.SVG_NS); this.isSVG = !0; this.box = d; this.boxWrapper = t; this.alignedObjects = []; this.url = (q || w) && n.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : ""; this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highmaps 6.1.0"));
        this.defs = this.createElement("defs").add(); this.allowHTML = g; this.forExport = v; this.gradients = {}; this.cache = {}; this.cacheKeys = []; this.imgCount = 0; this.setSize(b, c, !1); var l; q && a.getBoundingClientRect && (b = function () { x(a, { left: 0, top: 0 }); l = a.getBoundingClientRect(); x(a, { left: Math.ceil(l.left) - l.left + "px", top: Math.ceil(l.top) - l.top + "px" }) }, b(), this.unSubPixelFix = z(O, "resize", b))
    }, getStyle: function (a) {
        return this.style = g({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" },
a)
    }, setStyle: function (a) { this.boxWrapper.css(this.getStyle(a)) }, isHidden: function () { return !this.boxWrapper.getBBox().width }, destroy: function () { var a = this.defs; this.box = null; this.boxWrapper = this.boxWrapper.destroy(); f(this.gradients || {}); this.gradients = null; a && (this.defs = a.destroy()); this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null }, createElement: function (a) { var b = new this.Element; b.init(this, a); return b }, draw: B, getRadialAttr: function (a, b) {
        return { cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] -
a[2] / 2 + b.cy * a[2], r: b.r * a[2]
        }
    }, getSpanWidth: function (a) { return a.getBBox(!0).width }, applyEllipsis: function (a, b, c, t) { var v = a.rotation, g = c, d, l = 0, f = c.length, w = function (a) { b.removeChild(b.firstChild); a && b.appendChild(n.createTextNode(a)) }, K; a.rotation = 0; g = this.getSpanWidth(a, b); if (K = g > t) { for (; l <= f; ) d = Math.ceil((l + f) / 2), g = c.substring(0, d) + "\u2026", w(g), g = this.getSpanWidth(a, b), l === f ? l = f + 1 : g > t ? f = d - 1 : l = d; 0 === f && w("") } a.rotation = v; return K }, escapes: { "\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;",
        '"': "\x26quot;"
    }, buildText: function (a) {
        var b = a.element, v = this, g = v.forExport, d = H(a.textStr, "").toString(), l = -1 !== d.indexOf("\x3c"), f = b.childNodes, w, h = e(b, "x"), F = a.styles, B = a.textWidth, G = F && F.lineHeight, q = F && F.textOutline, N = F && "ellipsis" === F.textOverflow, E = F && "nowrap" === F.whiteSpace, p = F && F.fontSize, k, D, J = f.length, F = B && !a.added && this.box, Q = function (a) { var c; c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : p || v.style.fontSize || 12; return G ? t(G) : v.fontMetrics(c, a.getAttribute("style") ? a : b).h }, m =
function (a, b) { L(v.escapes, function (c, t) { b && -1 !== y(c, b) || (a = a.toString().replace(new RegExp(c, "g"), t)) }); return a }, O = function (a, b) { var c; c = a.indexOf("\x3c"); a = a.substring(c, a.indexOf("\x3e") - c); c = a.indexOf(b + "\x3d"); if (-1 !== c && (c = c + b.length + 1, b = a.charAt(c), '"' === b || "'" === b)) return a = a.substring(c + 1), a.substring(0, a.indexOf(b)) }; k = [d, N, E, G, q, p, B].join(); if (k !== a.textCache) {
            for (a.textCache = k; J--; ) b.removeChild(f[J]); l || q || N || B || -1 !== d.indexOf(" ") ? (F && F.appendChild(b), d = l ? d.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [d], d = c(d, function (a) { return "" !== a }), u(d, function (c, t) {
    var d, l = 0; c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||"); d = c.split("|||"); u(d, function (c) {
        if ("" !== c || 1 === d.length) {
            var f = {}, F = n.createElementNS(v.SVG_NS, "tspan"), G, q; (G = O(c, "class")) && e(F, "class", G); if (G = O(c, "style")) G = G.replace(/(;| |^)color([ :])/, "$1fill$2"),
e(F, "style", G); (q = O(c, "href")) && !g && (e(F, "onclick", 'location.href\x3d"' + q + '"'), e(F, "class", "highcharts-anchor"), x(F, { cursor: "pointer" })); c = m(c.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " "); if (" " !== c) {
                F.appendChild(n.createTextNode(c)); l ? f.dx = 0 : t && null !== h && (f.x = h); e(F, f); b.appendChild(F); !l && D && (!P && g && x(F, { display: "block" }), e(F, "dy", Q(F))); if (B) {
                    f = c.replace(/([^\^])-/g, "$1- ").split(" "); q = 1 < d.length || t || 1 < f.length && !E; var y = [], u, p = Q(F), k = a.rotation; for (N && (w = v.applyEllipsis(a, F, c, B)); !N && q && (f.length ||
y.length); ) a.rotation = 0, u = v.getSpanWidth(a, F), c = u > B, void 0 === w && (w = c), c && 1 !== f.length ? (F.removeChild(F.firstChild), y.unshift(f.pop())) : (f = y, y = [], f.length && !E && (F = n.createElementNS(K, "tspan"), e(F, { dy: p, x: h }), G && e(F, "style", G), b.appendChild(F)), u > B && (B = u)), f.length && F.appendChild(n.createTextNode(f.join(" ").replace(/- /g, "-"))); a.rotation = k
                } l++
            } 
        } 
    }); D = D || b.childNodes.length
}), w && a.attr("title", m(a.textStr, ["\x26lt;", "\x26gt;"])), F && F.removeChild(b), q && a.applyTextOutline && a.applyTextOutline(q)) : b.appendChild(n.createTextNode(m(d)))
        } 
    },
    getContrast: function (a) { a = r(a).rgba; return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF" }, button: function (a, b, c, t, v, d, l, f, w) {
        var K = this.label(a, b, c, w, null, null, null, null, "button"), h = 0; K.attr(G({ padding: 8, r: 2 }, v)); var F, B, e, n; v = G({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal"} }, v); F = v.style; delete v.style; d = G(v, { fill: "#e6e6e6" }, d); B = d.style; delete d.style; l = G(v, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold"} }, l); e = l.style; delete l.style;
        f = G(v, { style: { color: "#cccccc"} }, f); n = f.style; delete f.style; z(K.element, M ? "mouseover" : "mouseenter", function () { 3 !== h && K.setState(1) }); z(K.element, M ? "mouseout" : "mouseleave", function () { 3 !== h && K.setState(h) }); K.setState = function (a) { 1 !== a && (K.state = h = a); K.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]); K.attr([v, d, l, f][a || 0]).css([F, B, e, n][a || 0]) }; K.attr(v).css(g({ cursor: "default" }, F)); return K.on("click", function (a) {
            3 !==
h && t.call(K, a)
        })
    }, crispLine: function (a, b) { a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2); a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2); return a }, path: function (a) { var b = { fill: "none" }; J(a) ? b.d = a : E(a) && g(b, a); return this.createElement("path").attr(b) }, circle: function (a, b, c) { a = E(a) ? a : { x: a, y: b, r: c }; b = this.createElement("circle"); b.xSetter = b.ySetter = function (a, b, c) { c.setAttribute("c" + b, a) }; return b.attr(a) }, arc: function (a, b, c, t, v, d) {
        E(a) ? (t = a, b = t.y, c = t.r, a = t.x) : t = { innerR: t, start: v, end: d }; a = this.symbol("arc",
a, b, c, c, t); a.r = c; return a
    }, rect: function (a, b, c, t, v, d) { v = E(a) ? a.r : v; var g = this.createElement("rect"); a = E(a) ? a : void 0 === a ? {} : { x: a, y: b, width: Math.max(c, 0), height: Math.max(t, 0) }; void 0 !== d && (a.strokeWidth = d, a = g.crisp(a)); a.fill = "none"; v && (a.r = v); g.rSetter = function (a, b, c) { e(c, { rx: a, ry: a }) }; return g.attr(a) }, setSize: function (a, b, c) {
        var t = this.alignedObjects, v = t.length; this.width = a; this.height = b; for (this.boxWrapper.animate({ width: a, height: b }, { step: function () {
            this.attr({ viewBox: "0 0 " + this.attr("width") +
" " + this.attr("height")
            })
        }, duration: H(c, !0) ? void 0 : 0
        }); v--; ) t[v].align()
    }, g: function (a) { var b = this.createElement("g"); return a ? b.attr({ "class": "highcharts-" + a }) : b }, image: function (a, b, c, t, v, d) {
        var l = { preserveAspectRatio: "none" }, f, w = function (a, b) { a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b) }; 1 < arguments.length && g(l, { x: b, y: c, width: t, height: v }); f = this.createElement("image").attr(l); d ? (w(f.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),
l = new O.Image, z(l, "load", function (b) { w(f.element, a); d.call(f, b) }), l.src = a) : w(f.element, a); return f
    }, symbol: function (a, b, c, t, v, d) {
        var l = this, f, w = /^url\((.*?)\)$/, K = w.test(a), B = !K && (this.symbols[a] ? a : "circle"), e = B && this.symbols[B], G = h(b) && e && e.call(this.symbols, Math.round(b), Math.round(c), t, v, d), q, F; e ? (f = this.path(G), f.attr("fill", "none"), g(f, { symbolName: B, x: b, y: c, width: t, height: v }), d && g(f, d)) : K && (q = a.match(w)[1], f = this.image(q), f.imgwidth = H(Q[q] && Q[q].width, d && d.width), f.imgheight = H(Q[q] && Q[q].height,
d && d.height), F = function () { f.attr({ width: f.width, height: f.height }) }, u(["width", "height"], function (a) { f[a + "Setter"] = function (a, b) { var c = {}, t = this["img" + b], v = "width" === b ? "translateX" : "translateY"; this[b] = a; h(t) && (this.element && this.element.setAttribute(b, t), this.alignByTranslate || (c[v] = ((this[b] || 0) - t) / 2, this.attr(c))) } }), h(b) && f.attr({ x: b, y: c }), f.isImg = !0, h(f.imgwidth) && h(f.imgheight) ? F() : (f.attr({ width: 0, height: 0 }), p("img", { onload: function () {
    var a = k[l.chartIndex]; 0 === this.width && (x(this, { position: "absolute",
        top: "-999em"
    }), n.body.appendChild(this)); Q[q] = { width: this.width, height: this.height }; f.imgwidth = this.width; f.imgheight = this.height; f.element && F(); this.parentNode && this.parentNode.removeChild(this); l.imgCount--; if (!l.imgCount && a && a.onload) a.onload()
}, src: q
}), this.imgCount++)); return f
    }, symbols: { circle: function (a, b, c, t) { return this.arc(a + c / 2, b + t / 2, c / 2, t / 2, { start: 0, end: 2 * Math.PI, open: !1 }) }, square: function (a, b, c, t) { return ["M", a, b, "L", a + c, b, a + c, b + t, a, b + t, "Z"] }, triangle: function (a, b, c, t) {
        return ["M", a + c /
2, b, "L", a + c, b + t, a, b + t, "Z"]
    }, "triangle-down": function (a, b, c, t) { return ["M", a, b, "L", a + c, b, a + c / 2, b + t, "Z"] }, diamond: function (a, b, c, t) { return ["M", a + c / 2, b, "L", a + c, b + t / 2, a + c / 2, b + t, a, b + t / 2, "Z"] }, arc: function (a, b, c, t, v) {
        var d = v.start, g = v.r || c, l = v.r || t || c, f = v.end - .001; c = v.innerR; t = H(v.open, .001 > Math.abs(v.end - v.start - 2 * Math.PI)); var w = Math.cos(d), K = Math.sin(d), B = Math.cos(f), f = Math.sin(f); v = .001 > v.end - d - Math.PI ? 0 : 1; g = ["M", a + g * w, b + l * K, "A", g, l, 0, v, 1, a + g * B, b + l * f]; h(c) && g.push(t ? "M" : "L", a + c * B, b + c * f, "A", c, c, 0, v, 0,
a + c * w, b + c * K); g.push(t ? "" : "Z"); return g
    }, callout: function (a, b, c, t, v) {
        var d = Math.min(v && v.r || 0, c, t), g = d + 6, l = v && v.anchorX; v = v && v.anchorY; var f; f = ["M", a + d, b, "L", a + c - d, b, "C", a + c, b, a + c, b, a + c, b + d, "L", a + c, b + t - d, "C", a + c, b + t, a + c, b + t, a + c - d, b + t, "L", a + d, b + t, "C", a, b + t, a, b + t, a, b + t - d, "L", a, b + d, "C", a, b, a, b, a + d, b]; l && l > c ? v > b + g && v < b + t - g ? f.splice(13, 3, "L", a + c, v - 6, a + c + 6, v, a + c, v + 6, a + c, b + t - d) : f.splice(13, 3, "L", a + c, t / 2, l, v, a + c, t / 2, a + c, b + t - d) : l && 0 > l ? v > b + g && v < b + t - g ? f.splice(33, 3, "L", a, v + 6, a - 6, v, a, v - 6, a, b + d) : f.splice(33, 3,
"L", a, t / 2, l, v, a, t / 2, a, b + d) : v && v > t && l > a + g && l < a + c - g ? f.splice(23, 3, "L", l + 6, b + t, l, b + t + 6, l - 6, b + t, a + d, b + t) : v && 0 > v && l > a + g && l < a + c - g && f.splice(3, 3, "L", l - 6, b, l, b - 6, l + 6, b, c - d, b); return f
    } 
    }, clipRect: function (b, c, t, v) { var d = a.uniqueKey(), g = this.createElement("clipPath").attr({ id: d }).add(this.defs); b = this.rect(b, c, t, v, 0).add(g); b.id = d; b.clipPath = g; b.count = 0; return b }, text: function (a, b, c, t) {
        var v = {}; if (t && (this.allowHTML || !this.forExport)) return this.html(a, b, c); v.x = Math.round(b || 0); c && (v.y = Math.round(c)); if (a ||
0 === a) v.text = a; a = this.createElement("text").attr(v); t || (a.xSetter = function (a, b, c) { var t = c.getElementsByTagName("tspan"), v, d = c.getAttribute(b), g; for (g = 0; g < t.length; g++) v = t[g], v.getAttribute(b) === d && v.setAttribute(b, a); c.setAttribute(b, a) }); return a
    }, fontMetrics: function (a, b) { a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize; a = /px/.test(a) ? t(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12; b = 24 > a ? a + 3 : Math.round(1.2 * a); return { h: b, b: Math.round(.8 * b), f: a} },
    rotCorr: function (a, b, c) { var t = a; b && c && (t = Math.max(t * Math.cos(b * d), 4)); return { x: -a / 3 * Math.sin(b * d), y: t} }, label: function (b, c, t, d, l, f, w, K, B) {
        var e = this, q = e.g("button" !== B && "label"), n = q.text = e.text("", 0, 0, w).attr({ zIndex: 1 }), y, P, N = 0, E = 3, p = 0, k, D, H, J, Q, F = {}, m, L, O = /^url\((.*?)\)$/.test(d), M = O, r, x, R, U; B && q.addClass("highcharts-" + B); M = O; r = function () { return (m || 0) % 2 / 2 }; x = function () {
            var a = n.element.style, b = {}; P = (void 0 === k || void 0 === D || Q) && h(n.textStr) && n.getBBox(); q.width = (k || P.width || 0) + 2 * E + p; q.height = (D ||
P.height || 0) + 2 * E; L = E + e.fontMetrics(a && a.fontSize, n).b; M && (y || (q.box = y = e.symbols[d] || O ? e.symbol(d) : e.rect(), y.addClass(("button" === B ? "" : "highcharts-label-box") + (B ? " highcharts-" + B + "-box" : "")), y.add(q), a = r(), b.x = a, b.y = (K ? -L : 0) + a), b.width = Math.round(q.width), b.height = Math.round(q.height), y.attr(g(b, F)), F = {})
        }; R = function () { var a = p + E, b; b = K ? 0 : L; h(k) && P && ("center" === Q || "right" === Q) && (a += { center: .5, right: 1}[Q] * (k - P.width)); if (a !== n.x || b !== n.y) n.attr("x", a), void 0 !== b && n.attr("y", b); n.x = a; n.y = b }; U = function (a,
b) { y ? y.attr(a, b) : F[a] = b }; q.onAdd = function () { n.add(q); q.attr({ text: b || 0 === b ? b : "", x: c, y: t }); y && h(l) && q.attr({ anchorX: l, anchorY: f }) }; q.widthSetter = function (b) { k = a.isNumber(b) ? b : null }; q.heightSetter = function (a) { D = a }; q["text-alignSetter"] = function (a) { Q = a }; q.paddingSetter = function (a) { h(a) && a !== E && (E = q.padding = a, R()) }; q.paddingLeftSetter = function (a) { h(a) && a !== p && (p = a, R()) }; q.alignSetter = function (a) { a = { left: 0, center: .5, right: 1}[a]; a !== N && (N = a, P && q.attr({ x: H })) }; q.textSetter = function (a) {
    void 0 !== a && n.textSetter(a);
    x(); R()
}; q["stroke-widthSetter"] = function (a, b) { a && (M = !0); m = this["stroke-width"] = a; U(b, a) }; q.strokeSetter = q.fillSetter = q.rSetter = function (a, b) { "r" !== b && ("fill" === b && a && (M = !0), q[b] = a); U(b, a) }; q.anchorXSetter = function (a, b) { l = q.anchorX = a; U(b, Math.round(a) - r() - H) }; q.anchorYSetter = function (a, b) { f = q.anchorY = a; U(b, a - J) }; q.xSetter = function (a) { q.x = a; N && (a -= N * ((k || P.width) + 2 * E), q["forceAnimate:x"] = !0); H = Math.round(a); q.attr("translateX", H) }; q.ySetter = function (a) { J = q.y = Math.round(a); q.attr("translateY", J) }; var S =
q.css; return g(q, { css: function (a) { if (a) { var b = {}; a = G(a); u(q.textProps, function (c) { void 0 !== a[c] && (b[c] = a[c], delete a[c]) }); n.css(b); "width" in b && x() } return S.call(q, a) }, getBBox: function () { return { width: P.width + 2 * E, height: P.height + 2 * E, x: P.x - E, y: P.y - E} }, shadow: function (a) { a && (x(), y && y.shadow(a)); return q }, destroy: function () { v(q.element, "mouseenter"); v(q.element, "mouseleave"); n && (n = n.destroy()); y && (y = y.destroy()); A.prototype.destroy.call(q); q = e = x = R = U = null } })
    } 
}); a.Renderer = C
    })(I); (function (a) {
        var A = a.attr,
C = a.createElement, z = a.css, m = a.defined, e = a.each, k = a.extend, r = a.isFirefox, x = a.isMS, p = a.isWebKit, h = a.pick, d = a.pInt, f = a.SVGRenderer, n = a.win, u = a.wrap; k(a.SVGElement.prototype, { htmlCss: function (a) { var b = this.element; if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.htmlUpdateTransform(); a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden"); this.styles = k(this.styles, a); z(this.element, a); return this }, htmlGetBBox: function () {
    var a = this.element; return { x: a.offsetLeft,
        y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight
    }
}, htmlUpdateTransform: function () {
    if (this.added) {
        var a = this.renderer, b = this.element, c = this.translateX || 0, l = this.translateY || 0, f = this.x || 0, h = this.y || 0, q = this.textAlign || "left", n = { left: 0, center: .5, right: 1}[q], u = this.styles, p = u && u.whiteSpace; z(b, { marginLeft: c, marginTop: l }); this.shadows && e(this.shadows, function (a) { z(a, { marginLeft: c + 1, marginTop: l + 1 }) }); this.inverted && e(b.childNodes, function (c) { a.invertChild(c, b) }); if ("SPAN" === b.tagName) {
            var u = this.rotation,
w = this.textWidth && d(this.textWidth), G = [u, q, b.innerHTML, this.textWidth, this.textAlign].join(), B; (B = w !== this.oldTextWidth) && !(B = w > this.oldTextWidth) && ((B = this.textPxLength) || (z(b, { width: "", whiteSpace: p || "nowrap" }), B = b.offsetWidth), B = B > w); B && /[ \-]/.test(b.textContent || b.innerText) && (z(b, { width: w + "px", display: "block", whiteSpace: p || "normal" }), this.oldTextWidth = w); G !== this.cTT && (p = a.fontMetrics(b.style.fontSize).b, m(u) && u !== (this.oldRotation || 0) && this.setSpanRotation(u, n, p), this.getSpanCorrection(!m(u) &&
this.textPxLength || b.offsetWidth, p, n, u, q)); z(b, { left: f + (this.xCorr || 0) + "px", top: h + (this.yCorr || 0) + "px" }); this.cTT = G; this.oldRotation = u
        } 
    } else this.alignOnAdd = !0
}, setSpanRotation: function (a, b, c) { var d = {}, g = this.renderer.getTransformKey(); d[g] = d.transform = "rotate(" + a + "deg)"; d[g + (r ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px"; z(this.element, d) }, getSpanCorrection: function (a, b, c) { this.xCorr = -a * c; this.yCorr = -b } 
}); k(f.prototype, { getTransformKey: function () {
    return x && !/Edge/.test(n.navigator.userAgent) ?
"-ms-transform" : p ? "-webkit-transform" : r ? "MozTransform" : n.opera ? "-o-transform" : ""
}, html: function (a, b, c) {
    var d = this.createElement("span"), g = d.element, f = d.renderer, q = f.isSVG, n = function (a, b) { e(["opacity", "visibility"], function (c) { u(a, c + "Setter", function (a, c, d, g) { a.call(this, c, d, g); b[d] = c }) }); a.addedSetters = !0 }; d.textSetter = function (a) { a !== g.innerHTML && delete this.bBox; this.textStr = a; g.innerHTML = h(a, ""); d.doTransform = !0 }; q && n(d, d.element.style); d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function (a,
b) { "align" === b && (b = "textAlign"); d[b] = a; d.doTransform = !0 }; d.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) }; d.attr({ text: a, x: Math.round(b), y: Math.round(c) }).css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute" }); g.style.whiteSpace = "nowrap"; d.css = d.htmlCss; q && (d.add = function (a) {
    var b, c = f.box.parentNode, l = []; if (this.parentGroup = a) {
        if (b = a.div, !b) {
            for (; a; ) l.push(a), a = a.parentGroup; e(l.reverse(), function (a) {
                function g(b, c) {
                    a[c] =
b; "translateX" === c ? f.left = b + "px" : f.top = b + "px"; a.doTransform = !0
                } var f, t = A(a.element, "class"); t && (t = { className: t }); b = a.div = a.div || C("div", t, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, b || c); f = b.style; k(a, { classSetter: function (a) { return function (b) { this.element.setAttribute("class", b); a.className = b } } (b), on: function () { l[0].div && d.on.apply({ element: l[0].div }, arguments); return a }, translateXSetter: g,
                    translateYSetter: g
                }); a.addedSetters || n(a, f)
            })
        } 
    } else b = c; b.appendChild(g); d.added = !0; d.alignOnAdd && d.htmlUpdateTransform(); return d
}); return d
} 
})
    })(I); (function (a) {
        var A = a.correctFloat, C = a.defined, z = a.destroyObjectProperties, m = a.fireEvent, e = a.isNumber, k = a.merge, r = a.pick, x = a.deg2rad; a.Tick = function (a, h, d, f) { this.axis = a; this.pos = h; this.type = d || ""; this.isNewLabel = this.isNew = !0; d || f || this.addLabel() }; a.Tick.prototype = { addLabel: function () {
            var a = this.axis, h = a.options, d = a.chart, f = a.categories, n = a.names, e =
this.pos, g = h.labels, b = a.tickPositions, c = e === b[0], l = e === b[b.length - 1], n = f ? r(f[e], n[e], e) : e, f = this.label, b = b.info, y; a.isDatetimeAxis && b && (y = h.dateTimeLabelFormats[b.higherRanks[e] || b.unitName]); this.isFirst = c; this.isLast = l; h = a.labelFormatter.call({ axis: a, chart: d, isFirst: c, isLast: l, dateTimeLabelFormat: y, value: a.isLog ? A(a.lin2log(n)) : n, pos: e }); if (C(f)) f && f.attr({ text: h }); else {
                if (this.label = f = C(h) && g.enabled ? d.renderer.text(h, 0, 0, g.useHTML).css(k(g.style)).add(a.labelGroup) : null) f.textPxLength = f.getBBox().width;
                this.rotation = 0
            } 
        }, getLabelSize: function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 }, handleOverflow: function (a) {
            var h = this.axis, d = h.options.labels, f = a.x, e = h.chart.chartWidth, u = h.chart.spacing, g = r(h.labelLeft, Math.min(h.pos, u[3])), u = r(h.labelRight, Math.max(h.isRadial ? 0 : h.pos + h.len, e - u[1])), b = this.label, c = this.rotation, l = { left: 0, center: .5, right: 1}[h.labelAlign || b.attr("align")], y = b.getBBox().width, k = h.getSlotWidth(), q = k, p = 1, E, D = {}; if (c || !1 === d.overflow) 0 > c && f - l * y < g ?
E = Math.round(f / Math.cos(c * x) - g) : 0 < c && f + l * y > u && (E = Math.round((e - f) / Math.cos(c * x))); else if (e = f + (1 - l) * y, f - l * y < g ? q = a.x + q * (1 - l) - g : e > u && (q = u - a.x + q * l, p = -1), q = Math.min(k, q), q < k && "center" === h.labelAlign && (a.x += p * (k - q - l * (k - Math.min(y, q)))), y > q || h.autoRotation && (b.styles || {}).width) E = q; E && (D.width = E, (d.style || {}).textOverflow || (D.textOverflow = "ellipsis"), b.css(D))
        }, getPosition: function (e, h, d, f) {
            var n = this.axis, u = n.chart, g = f && u.oldChartHeight || u.chartHeight; e = { x: e ? a.correctFloat(n.translate(h + d, null, null, f) +
n.transB) : n.left + n.offset + (n.opposite ? (f && u.oldChartWidth || u.chartWidth) - n.right - n.left : 0), y: e ? g - n.bottom + n.offset - (n.opposite ? n.height : 0) : a.correctFloat(g - n.translate(h + d, null, null, f) - n.transB)
            }; m(this, "afterGetPosition", { pos: e }); return e
        }, getLabelPosition: function (a, h, d, f, e, u, g, b) {
            var c = this.axis, l = c.transA, n = c.reversed, k = c.staggerLines, q = c.tickRotCorr || { x: 0, y: 0 }, p = e.y, E = f || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ? .5 : 1), D = {}; C(p) || (p = 0 === c.side ? d.rotation ? -8 : -d.getBBox().height :
2 === c.side ? q.y + 8 : Math.cos(d.rotation * x) * (q.y - d.getBBox(!1, 0).height / 2)); a = a + e.x + E + q.x - (u && f ? u * l * (n ? -1 : 1) : 0); h = h + p - (u && !f ? u * l * (n ? 1 : -1) : 0); k && (d = g / (b || 1) % k, c.opposite && (d = k - d - 1), h += c.labelOffset / k * d); D.x = a; D.y = Math.round(h); m(this, "afterGetLabelPosition", { pos: D }); return D
        }, getMarkPath: function (a, h, d, f, e, u) { return u.crispLine(["M", a, h, "L", a + (e ? 0 : -d), h + (e ? d : 0)], f) }, renderGridLine: function (a, e, d) {
            var f = this.axis, h = f.options, u = this.gridLine, g = {}, b = this.pos, c = this.type, l = f.tickmarkOffset, y = f.chart.renderer,
k = c ? c + "Grid" : "grid", q = h[k + "LineWidth"], p = h[k + "LineColor"], h = h[k + "LineDashStyle"]; u || (g.stroke = p, g["stroke-width"] = q, h && (g.dashstyle = h), c || (g.zIndex = 1), a && (g.opacity = 0), this.gridLine = u = y.path().attr(g).addClass("highcharts-" + (c ? c + "-" : "") + "grid-line").add(f.gridGroup)); if (!a && u && (a = f.getPlotLinePath(b + l, u.strokeWidth() * d, a, !0))) u[this.isNew ? "attr" : "animate"]({ d: a, opacity: e })
        }, renderMark: function (a, h, d) {
            var f = this.axis, e = f.options, u = f.chart.renderer, g = this.type, b = g ? g + "Tick" : "tick", c = f.tickSize(b), l =
this.mark, y = !l, k = a.x; a = a.y; var q = r(e[b + "Width"], !g && f.isXAxis ? 1 : 0), e = e[b + "Color"]; c && (f.opposite && (c[0] = -c[0]), y && (this.mark = l = u.path().addClass("highcharts-" + (g ? g + "-" : "") + "tick").add(f.axisGroup), l.attr({ stroke: e, "stroke-width": q })), l[y ? "attr" : "animate"]({ d: this.getMarkPath(k, a, c[0], l.strokeWidth() * d, f.horiz, u), opacity: h }))
        }, renderLabel: function (a, h, d, f) {
            var n = this.axis, u = n.horiz, g = n.options, b = this.label, c = g.labels, l = c.step, n = n.tickmarkOffset, y = !0, k = a.x; a = a.y; b && e(k) && (b.xy = a = this.getLabelPosition(k,
a, b, u, c, n, f, l), this.isFirst && !this.isLast && !r(g.showFirstLabel, 1) || this.isLast && !this.isFirst && !r(g.showLastLabel, 1) ? y = !1 : !u || c.step || c.rotation || h || 0 === d || this.handleOverflow(a), l && f % l && (y = !1), y && e(a.y) ? (a.opacity = d, b[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (b.attr("y", -9999), this.isNewLabel = !0))
        }, render: function (e, h, d) {
            var f = this.axis, n = f.horiz, u = this.getPosition(n, this.pos, f.tickmarkOffset, h), g = u.x, b = u.y, f = n && g === f.pos + f.len || !n && b === f.pos ? -1 : 1; d = r(d, 1); this.isActive = !0; this.renderGridLine(h,
d, f); this.renderMark(u, d, f); this.renderLabel(u, h, d, e); this.isNew = !1; a.fireEvent(this, "afterRender")
        }, destroy: function () { z(this, this.axis) } 
        }
    })(I); var W = function (a) {
        var A = a.addEvent, C = a.animObject, z = a.arrayMax, m = a.arrayMin, e = a.color, k = a.correctFloat, r = a.defaultOptions, x = a.defined, p = a.deg2rad, h = a.destroyObjectProperties, d = a.each, f = a.extend, n = a.fireEvent, u = a.format, g = a.getMagnitude, b = a.grep, c = a.inArray, l = a.isArray, y = a.isNumber, J = a.isString, q = a.merge, M = a.normalizeTickInterval, E = a.objectEach, D = a.pick, w =
a.removeEvent, G = a.splat, B = a.syncTimeout, L = a.Tick, H = function () { this.init.apply(this, arguments) }; a.extend(H.prototype, { defaultOptions: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" }, endOnTick: !1, labels: { enabled: !0, style: { color: "#666666", cursor: "default", fontSize: "11px" }, x: 0 }, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickmarkPlacement: "between",
    tickPixelInterval: 100, tickPosition: "outside", title: { align: "middle", style: { color: "#666666"} }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb"
}, defaultYAxisOptions: { endOnTick: !0, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, maxPadding: .05, minPadding: .05, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { allowOverlap: !1, enabled: !1, formatter: function () {
    return a.numberFormat(this.total,
-1)
}, style: { fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast"}
}, gridLineWidth: 1, lineWidth: 0
}, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270} }, defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90} }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0} }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0} }, init: function (a, b) {
    var t = b.isX, v = this; v.chart = a; v.horiz = a.inverted && !v.isZAxis ? !t : t; v.isXAxis = t; v.coll = v.coll ||
(t ? "xAxis" : "yAxis"); n(this, "init", { userOptions: b }); v.opposite = b.opposite; v.side = b.side || (v.horiz ? v.opposite ? 0 : 2 : v.opposite ? 1 : 3); v.setOptions(b); var d = this.options, g = d.type; v.labelFormatter = d.labels.formatter || v.defaultLabelFormatter; v.userOptions = b; v.minPixelPadding = 0; v.reversed = d.reversed; v.visible = !1 !== d.visible; v.zoomEnabled = !1 !== d.zoomEnabled; v.hasNames = "category" === g || !0 === d.categories; v.categories = d.categories || v.hasNames; v.names || (v.names = [], v.names.keys = {}); v.plotLinesAndBandsGroups = {}; v.isLog =
"logarithmic" === g; v.isDatetimeAxis = "datetime" === g; v.positiveValuesOnly = v.isLog && !v.allowNegativeLog; v.isLinked = x(d.linkedTo); v.ticks = {}; v.labelEdge = []; v.minorTicks = {}; v.plotLinesAndBands = []; v.alternateBands = {}; v.len = 0; v.minRange = v.userMinRange = d.minRange || d.maxZoom; v.range = d.range; v.offset = d.offset || 0; v.stacks = {}; v.oldStacks = {}; v.stacksTouched = 0; v.max = null; v.min = null; v.crosshair = D(d.crosshair, G(a.options.tooltip.crosshairs)[t ? 0 : 1], !1); b = v.options.events; -1 === c(v, a.axes) && (t ? a.axes.splice(a.xAxis.length,
0, v) : a.axes.push(v), a[v.coll].push(v)); v.series = v.series || []; a.inverted && !v.isZAxis && t && void 0 === v.reversed && (v.reversed = !0); E(b, function (a, b) { A(v, b, a) }); v.lin2log = d.linearToLogConverter || v.lin2log; v.isLog && (v.val2lin = v.log2lin, v.lin2val = v.lin2log); n(this, "afterInit")
}, setOptions: function (a) {
    this.options = q(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
q(r[this.coll], a)); n(this, "afterSetOptions", { userOptions: a })
}, defaultLabelFormatter: function () {
    var b = this.axis, c = this.value, d = b.chart.time, g = b.categories, f = this.dateTimeLabelFormat, l = r.lang, w = l.numericSymbols, l = l.numericSymbolMagnitude || 1E3, e = w && w.length, h, q = b.options.labels.format, b = b.isLog ? Math.abs(c) : b.tickInterval; if (q) h = u(q, this, d); else if (g) h = c; else if (f) h = d.dateFormat(f, c); else if (e && 1E3 <= b) for (; e-- && void 0 === h; ) d = Math.pow(l, e + 1), b >= d && 0 === 10 * c % d && null !== w[e] && 0 !== c && (h = a.numberFormat(c / d,
-1) + w[e]); void 0 === h && (h = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, "")); return h
}, getSeriesExtremes: function () {
    var a = this, c = a.chart; n(this, "getSeriesExtremes", null, function () {
        a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.threshold = null; a.softThreshold = !a.isXAxis; a.buildStacks && a.buildStacks(); d(a.series, function (t) {
            if (t.visible || !c.options.chart.ignoreHiddenSeries) {
                var v = t.options, d = v.threshold, g; a.hasVisibleSeries = !0; a.positiveValuesOnly && 0 >= d && (d = null); if (a.isXAxis) v = t.xData,
v.length && (t = m(v), g = z(v), y(t) || t instanceof Date || (v = b(v, y), t = m(v), g = z(v)), v.length && (a.dataMin = Math.min(D(a.dataMin, v[0], t), t), a.dataMax = Math.max(D(a.dataMax, v[0], g), g))); else if (t.getExtremes(), g = t.dataMax, t = t.dataMin, x(t) && x(g) && (a.dataMin = Math.min(D(a.dataMin, t), t), a.dataMax = Math.max(D(a.dataMax, g), g)), x(d) && (a.threshold = d), !v.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
            } 
        })
    }); n(this, "afterGetSeriesExtremes")
}, translate: function (a, b, c, d, g, f) {
    var v = this.linkedParent || this, t = 1, l = 0, w = d ?
v.oldTransA : v.transA; d = d ? v.oldMin : v.min; var e = v.minPixelPadding; g = (v.isOrdinal || v.isBroken || v.isLog && g) && v.lin2val; w || (w = v.transA); c && (t *= -1, l = v.len); v.reversed && (t *= -1, l -= t * (v.sector || v.len)); b ? (a = (a * t + l - e) / w + d, g && (a = v.lin2val(a))) : (g && (a = v.val2lin(a)), a = y(d) ? t * (a - d) * w + l + t * e + (y(f) ? w * f : 0) : void 0); return a
}, toPixels: function (a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) }, toValue: function (a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) }, getPlotLinePath: function (a,
b, c, d, g) {
    var v = this.chart, t = this.left, l = this.top, f, w, e = c && v.oldChartHeight || v.chartHeight, h = c && v.oldChartWidth || v.chartWidth, q; f = this.transB; var K = function (a, b, c) { if (a < b || a > c) d ? a = Math.min(Math.max(b, a), c) : q = !0; return a }; g = D(g, this.translate(a, null, null, c)); g = Math.min(Math.max(-1E5, g), 1E5); a = c = Math.round(g + f); f = w = Math.round(e - g - f); y(g) ? this.horiz ? (f = l, w = e - this.bottom, a = c = K(a, t, t + this.width)) : (a = t, c = h - this.right, f = w = K(f, l, l + this.height)) : (q = !0, d = !1); return q && !d ? null : v.renderer.crispLine(["M", a, f, "L",
c, w], b || 1)
}, getLinearTickPositions: function (a, b, c) { var v, t = k(Math.floor(b / a) * a); c = k(Math.ceil(c / a) * a); var d = [], g; k(t + a) === t && (g = 20); if (this.single) return [b]; for (b = t; b <= c; ) { d.push(b); b = k(b + a, g); if (b === v) break; v = b } return d }, getMinorTickInterval: function () { var a = this.options; return !0 === a.minorTicks ? D(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval }, getMinorTickPositions: function () {
    var a = this, b = a.options, c = a.tickPositions, g = a.minorTickInterval, f = [], l = a.pointRangePadding || 0, w = a.min -
l, l = a.max + l, e = l - w; if (e && e / g < a.len / 3) if (a.isLog) d(this.paddedTicks, function (b, c, v) { c && f.push.apply(f, a.getLogTickPositions(g, v[c - 1], v[c], !0)) }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(g), w, l, b.startOfWeek)); else for (b = w + (c[0] - w) % g; b <= l && b !== f[0]; b += g) f.push(b); 0 !== f.length && a.trimTicks(f); return f
}, adjustForMinRange: function () {
    var a = this.options, b = this.min, c = this.max, g, f, l, w, e, h, q, B; this.isXAxis && void 0 === this.minRange && !this.isLog &&
(x(a.min) || x(a.max) ? this.minRange = null : (d(this.series, function (a) { h = a.xData; for (w = q = a.xIncrement ? 1 : h.length - 1; 0 < w; w--) if (e = h[w] - h[w - 1], void 0 === l || e < l) l = e }), this.minRange = Math.min(5 * l, this.dataMax - this.dataMin))); c - b < this.minRange && (f = this.dataMax - this.dataMin >= this.minRange, B = this.minRange, g = (B - c + b) / 2, g = [b - g, D(a.min, b - g)], f && (g[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = z(g), c = [b + B, D(a.max, b + B)], f && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = m(c), c - b < B && (g[0] = c - B, g[1] =
D(a.min, c - B), b = z(g))); this.min = b; this.max = c
}, getClosest: function () { var a; this.categories ? a = 1 : d(this.series, function (b) { var c = b.closestPointRange, v = b.visible || !b.chart.options.chart.ignoreHiddenSeries; !b.noSharedTooltip && x(c) && v && (a = x(a) ? Math.min(a, c) : c) }); return a }, nameToX: function (a) {
    var b = l(this.categories), d = b ? this.categories : this.names, t = a.options.x, g; a.series.requireSorting = !1; x(t) || (t = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? c(a.name, d) : D(d.keys[a.name], -1)); -1 === t ? b || (g = d.length) :
g = t; void 0 !== g && (this.names[g] = a.name, this.names.keys[a.name] = g); return g
}, updateNames: function () { var b = this, c = this.names; 0 < c.length && (d(a.keys(c.keys), function (a) { delete c.keys[a] }), c.length = 0, this.minRange = this.userMinRange, d(this.series || [], function (a) { a.xIncrement = null; if (!a.points || a.isDirtyData) a.processData(), a.generatePoints(); d(a.points, function (c, v) { var d; c.options && (d = b.nameToX(c), void 0 !== d && d !== c.x && (c.x = d, a.xData[v] = d)) }) })) }, setAxisTranslation: function (a) {
    var b = this, c = b.max - b.min, t =
b.axisPointRange || 0, g, f = 0, l = 0, w = b.linkedParent, e = !!b.categories, h = b.transA, q = b.isXAxis; if (q || e || t) g = b.getClosest(), w ? (f = w.minPointOffset, l = w.pointRangePadding) : d(b.series, function (a) { var c = e ? 1 : q ? D(a.options.pointRange, g, 0) : b.axisPointRange || 0; a = a.options.pointPlacement; t = Math.max(t, c); b.single || (f = Math.max(f, J(a) ? 0 : c / 2), l = Math.max(l, "on" === a ? 0 : c)) }), w = b.ordinalSlope && g ? b.ordinalSlope / g : 1, b.minPointOffset = f *= w, b.pointRangePadding = l *= w, b.pointRange = Math.min(t, c), q && (b.closestPointRange = g); a && (b.oldTransA =
h); b.translationSlope = b.transA = h = b.options.staticScale || b.len / (c + l || 1); b.transB = b.horiz ? b.left : b.bottom; b.minPixelPadding = h * f; n(this, "afterSetAxisTranslation")
}, minFromRange: function () { return this.max - this.range }, setTickInterval: function (b) {
    var c = this, t = c.chart, f = c.options, l = c.isLog, w = c.isDatetimeAxis, e = c.isXAxis, h = c.isLinked, q = f.maxPadding, B = f.minPadding, G = f.tickInterval, u = f.tickPixelInterval, E = c.categories, H = y(c.threshold) ? c.threshold : null, p = c.softThreshold, J, m, L, r; w || E || h || this.getTickAmount();
    L = D(c.userMin, f.min); r = D(c.userMax, f.max); h ? (c.linkedParent = t[c.coll][f.linkedTo], t = c.linkedParent.getExtremes(), c.min = D(t.min, t.dataMin), c.max = D(t.max, t.dataMax), f.type !== c.linkedParent.options.type && a.error(11, 1)) : (!p && x(H) && (c.dataMin >= H ? (J = H, B = 0) : c.dataMax <= H && (m = H, q = 0)), c.min = D(L, J, c.dataMin), c.max = D(r, m, c.dataMax)); l && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, D(c.dataMin, c.min)) && a.error(10, 1), c.min = k(c.log2lin(c.min), 15), c.max = k(c.log2lin(c.max), 15)); c.range && x(c.max) && (c.userMin = c.min =
L = Math.max(c.dataMin, c.minFromRange()), c.userMax = r = c.max, c.range = null); n(c, "foundExtremes"); c.beforePadding && c.beforePadding(); c.adjustForMinRange(); !(E || c.axisPointRange || c.usePercentage || h) && x(c.min) && x(c.max) && (t = c.max - c.min) && (!x(L) && B && (c.min -= t * B), !x(r) && q && (c.max += t * q)); y(f.softMin) && !y(c.userMin) && (c.min = Math.min(c.min, f.softMin)); y(f.softMax) && !y(c.userMax) && (c.max = Math.max(c.max, f.softMax)); y(f.floor) && (c.min = Math.max(c.min, f.floor)); y(f.ceiling) && (c.max = Math.min(c.max, f.ceiling)); p && x(c.dataMin) &&
(H = H || 0, !x(L) && c.min < H && c.dataMin >= H ? c.min = H : !x(r) && c.max > H && c.dataMax <= H && (c.max = H)); c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : h && !G && u === c.linkedParent.options.tickPixelInterval ? G = c.linkedParent.tickInterval : D(G, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, E ? 1 : (c.max - c.min) * u / Math.max(c.len, u)); e && !b && d(c.series, function (a) { a.processData(c.min !== c.oldMin || c.max !== c.oldMax) }); c.setAxisTranslation(!0); c.beforeSetTickPositions && c.beforeSetTickPositions();
    c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval)); c.pointRange && !G && (c.tickInterval = Math.max(c.pointRange, c.tickInterval)); b = D(f.minTickInterval, c.isDatetimeAxis && c.closestPointRange); !G && c.tickInterval < b && (c.tickInterval = b); w || l || G || (c.tickInterval = M(c.tickInterval, null, g(c.tickInterval), D(f.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount)); this.tickAmount || (c.tickInterval = c.unsquish()); this.setTickPositions()
}, setTickPositions: function () {
    var a =
this.options, b, c = a.tickPositions; b = this.getMinorTickInterval(); var d = a.tickPositioner, g = a.startOnTick, f = a.endOnTick; this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0; this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b; this.single = this.min === this.max && x(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals); this.tickPositions = b = c && c.slice(); !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d); this.paddedTicks = b.slice(0); this.trimTicks(b, g, f); this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c ||
d || this.adjustTickAmount()); n(this, "afterSetTickPositions")
}, trimTicks: function (a, b, c) { var d = a[0], t = a[a.length - 1], g = this.minPointOffset || 0; if (!this.isLinked) { if (b && -Infinity !== d) this.min = d; else for (; this.min - g > a[0]; ) a.shift(); if (c) this.max = t; else for (; this.max + g < a[a.length - 1]; ) a.pop(); 0 === a.length && x(d) && !this.options.tickPositions && a.push((t + d) / 2) } }, alignToOthers: function () {
    var a = {}, b, c = this.options; !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick ||
this.isLog || d(this.chart[this.coll], function (c) { var d = c.options, d = [c.horiz ? d.left : d.top, d.width, d.height, d.pane].join(); c.series.length && (a[d] ? b = !0 : a[d] = 1) }); return b
}, getTickAmount: function () { var a = this.options, b = a.tickAmount, c = a.tickPixelInterval; !x(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2); !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1); 4 > b && (this.finalTickAmt = b, b = 5); this.tickAmount = b }, adjustTickAmount: function () {
    var a = this.tickInterval, b =
this.tickPositions, c = this.tickAmount, d = this.finalTickAmt, g = b && b.length, f = D(this.threshold, this.softThreshold ? 0 : null); if (this.hasData()) { if (g < c) { for (; b.length < c; ) b.length % 2 || this.min === f ? b.push(k(b[b.length - 1] + a)) : b.unshift(k(b[0] - a)); this.transA *= (g - 1) / (c - 1); this.min = b[0]; this.max = b[b.length - 1] } else g > c && (this.tickInterval *= 2, this.setTickPositions()); if (x(d)) { for (a = c = b.length; a--; ) (3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1); this.finalTickAmt = void 0 } } 
}, setScale: function () {
    var a, b; this.oldMin =
this.min; this.oldMax = this.max; this.oldAxisLength = this.len; this.setAxisSize(); b = this.len !== this.oldAxisLength; d(this.series, function (b) { if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0 }); b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty =
b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks(); n(this, "afterSetScale")
}, setExtremes: function (a, b, c, g, l) { var t = this, w = t.chart; c = D(c, !0); d(t.series, function (a) { delete a.kdTree }); l = f(l, { min: a, max: b }); n(t, "setExtremes", l, function () { t.userMin = a; t.userMax = b; t.eventArgs = l; c && w.redraw(g) }) }, zoom: function (a, b) {
    var c = this.dataMin, d = this.dataMax, g = this.options, t = Math.min(c, D(g.min, c)), g = Math.max(d, D(g.max, d)); if (a !== this.min || b !== this.max) this.allowZoomOutside || (x(c) &&
(a < t && (a = t), a > g && (a = g)), x(d) && (b < t && (b = t), b > g && (b = g))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, { trigger: "zoom" }); return !0
}, setAxisSize: function () {
    var b = this.chart, c = this.options, d = c.offsets || [0, 0, 0, 0], g = this.horiz, f = this.width = Math.round(a.relativeLength(D(c.width, b.plotWidth - d[3] + d[1]), b.plotWidth)), l = this.height = Math.round(a.relativeLength(D(c.height, b.plotHeight - d[0] + d[2]), b.plotHeight)), w = this.top = Math.round(a.relativeLength(D(c.top, b.plotTop + d[0]), b.plotHeight, b.plotTop)),
c = this.left = Math.round(a.relativeLength(D(c.left, b.plotLeft + d[3]), b.plotWidth, b.plotLeft)); this.bottom = b.chartHeight - l - w; this.right = b.chartWidth - f - c; this.len = Math.max(g ? f : l, 0); this.pos = g ? c : w
}, getExtremes: function () { var a = this.isLog; return { min: a ? k(this.lin2log(this.min)) : this.min, max: a ? k(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax} }, getThreshold: function (a) {
    var b = this.isLog, c = b ? this.lin2log(this.min) : this.min, b = b ? this.lin2log(this.max) :
this.max; null === a || -Infinity === a ? a = c : Infinity === a ? a = b : c > a ? a = c : b < a && (a = b); return this.translate(a, 0, 1, 0, 1)
}, autoLabelAlign: function (a) { a = (D(a, 0) - 90 * this.side + 720) % 360; return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center" }, tickSize: function (a) { var b = this.options, c = b[a + "Length"], d = D(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0); if (d && c) return "inside" === b[a + "Position"] && (c = -c), [c, d] }, labelMetrics: function () {
    var a = this.tickPositions && this.tickPositions[0] || 0; return this.chart.renderer.fontMetrics(this.options.labels.style &&
this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
}, unsquish: function () {
    var a = this.options.labels, b = this.horiz, c = this.tickInterval, g = c, f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), l, w = a.rotation, e = this.labelMetrics(), h, q = Number.MAX_VALUE, B, n = function (a) { a /= f || 1; a = 1 < a ? Math.ceil(a) : 1; return k(a * c) }; b ? (B = !a.staggerLines && !a.step && (x(w) ? [w] : f < D(a.autoRotationLimit, 80) && a.autoRotation)) && d(B, function (a) {
        var b; if (a === w || a && -90 <= a && 90 >= a) h = n(Math.abs(e.h / Math.sin(p * a))), b =
h + Math.abs(a / 360), b < q && (q = b, l = a, g = h)
    }) : a.step || (g = n(e.h)); this.autoRotation = B; this.labelRotation = D(l, w); return g
}, getSlotWidth: function () { var a = this.chart, b = this.horiz, c = this.options.labels, d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), g = a.margin[3]; return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / d || !b && (c.style && parseInt(c.style.width, 10) || g && g - a.spacing[3] || .33 * a.chartWidth) }, renderUnsquish: function () {
    var a = this.chart, b = a.renderer, c = this.tickPositions, g = this.ticks,
f = this.options.labels, l = this.horiz, w = this.getSlotWidth(), e = Math.max(1, Math.round(w - 2 * (f.padding || 5))), h = {}, q = this.labelMetrics(), B = f.style && f.style.textOverflow, n, G, u = 0, y; J(f.rotation) || (h.rotation = f.rotation || 0); d(c, function (a) { (a = g[a]) && a.label && a.label.textPxLength > u && (u = a.label.textPxLength) }); this.maxLabelLength = u; if (this.autoRotation) u > e && u > q.h ? h.rotation = this.labelRotation : this.labelRotation = 0; else if (w && (n = e, !B)) for (G = "clip", e = c.length; !l && e--; ) if (y = c[e], y = g[y].label) y.styles && "ellipsis" ===
y.styles.textOverflow ? y.css({ textOverflow: "clip" }) : y.textPxLength > w && y.css({ width: w + "px" }), y.getBBox().height > this.len / c.length - (q.h - q.f) && (y.specificTextOverflow = "ellipsis"); h.rotation && (n = u > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, B || (G = "ellipsis")); if (this.labelAlign = f.align || this.autoLabelAlign(this.labelRotation)) h.align = this.labelAlign; d(c, function (a) {
    var b = (a = g[a]) && a.label, c = {}; b && (b.attr(h), !n || f.style && f.style.width || !(n < b.textPxLength || "SPAN" === b.element.tagName) || (c.width = n, B ||
(c.textOverflow = b.specificTextOverflow || G), b.css(c)), delete b.specificTextOverflow, a.rotation = h.rotation)
}); this.tickRotCorr = b.rotCorr(q.b, this.labelRotation || 0, 0 !== this.side)
}, hasData: function () { return this.hasVisibleSeries || x(this.min) && x(this.max) && this.tickPositions && 0 < this.tickPositions.length }, addTitle: function (a) {
    var b = this.chart.renderer, c = this.horiz, d = this.opposite, g = this.options.title, f; this.axisTitle || ((f = g.textAlign) || (f = (c ? { low: "left", middle: "center", high: "right"} : { low: d ? "right" : "left",
        middle: "center", high: d ? "left" : "right"
    })[g.align]), this.axisTitle = b.text(g.text, 0, 0, g.useHTML).attr({ zIndex: 7, rotation: g.rotation || 0, align: f }).addClass("highcharts-axis-title").css(q(g.style)).add(this.axisGroup), this.axisTitle.isNew = !0); g.style.width || this.isRadial || this.axisTitle.css({ width: this.len }); this.axisTitle[a ? "show" : "hide"](!0)
}, generateTick: function (a) { var b = this.ticks; b[a] ? b[a].addLabel() : b[a] = new L(this, a) }, getOffset: function () {
    var a = this, b = a.chart, c = b.renderer, g = a.options, f = a.tickPositions,
l = a.ticks, w = a.horiz, e = a.side, h = b.inverted && !a.isZAxis ? [1, 0, 3, 2][e] : e, q, B, n = 0, G, y = 0, u = g.title, k = g.labels, H = 0, p = b.axisOffset, b = b.clipOffset, J = [-1, 1, 1, -1][e], m = g.className, L = a.axisParent, M = this.tickSize("tick"); q = a.hasData(); a.showAxis = B = q || D(g.showEmpty, !0); a.staggerLines = a.horiz && k.staggerLines; a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: g.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (m || "")).add(L), a.axisGroup = c.g("axis").attr({ zIndex: g.zIndex || 2 }).addClass("highcharts-" +
this.coll.toLowerCase() + " " + (m || "")).add(L), a.labelGroup = c.g("axis-labels").attr({ zIndex: k.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (m || "")).add(L)); q || a.isLinked ? (d(f, function (b, c) { a.generateTick(b, c) }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === e || 2 === e || { 1: "left", 3: "right"}[e] === a.labelAlign, D(k.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && d(f, function (a) { H = Math.max(l[a].getLabelSize(), H) }), a.staggerLines && (H *= a.staggerLines), a.labelOffset = H *
(a.opposite ? -1 : 1)) : E(l, function (a, b) { a.destroy(); delete l[b] }); u && u.text && !1 !== u.enabled && (a.addTitle(B), B && !1 !== u.reserveSpace && (a.titleOffset = n = a.axisTitle.getBBox()[w ? "height" : "width"], G = u.offset, y = x(G) ? 0 : D(u.margin, w ? 5 : 10))); a.renderLine(); a.offset = J * D(g.offset, p[e]); a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 }; c = 0 === e ? -a.labelMetrics().h : 2 === e ? a.tickRotCorr.y : 0; y = Math.abs(H) + y; H && (y = y - c + J * (w ? D(k.y, a.tickRotCorr.y + 8 * J) : k.x)); a.axisTitleMargin = D(G, y); p[e] = Math.max(p[e], a.axisTitleMargin + n + J * a.offset,
y, q && f.length && M ? M[0] + J * a.offset : 0); g = g.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2); b[h] = Math.max(b[h], g)
}, getLinePath: function (a) { var b = this.chart, c = this.opposite, d = this.offset, g = this.horiz, f = this.left + (c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d; c && (a *= -1); return b.renderer.crispLine(["M", g ? this.left : f, g ? d : this.top, "L", g ? b.chartWidth - this.right : f, g ? d : b.chartHeight - this.bottom], a) }, renderLine: function () {
    this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
}, getTitlePosition: function () {
    var a = this.horiz, b = this.left, c = this.top, d = this.len, g = this.options.title, f = a ? b : c, l = this.opposite, w = this.offset, e = g.x || 0, h = g.y || 0, q = this.axisTitle, B = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, q), q = Math.max(q.getBBox(null, 0).height - B.h - 1, 0), d = { low: f + (a ? 0 : d), middle: f + d / 2, high: f + (a ? d : 0)}[g.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (l ? -1 : 1) * this.axisTitleMargin + [-q,
q, B.f, -q][this.side]; return { x: a ? d + e : b + (l ? this.width : 0) + w + e, y: a ? b + h - (l ? this.height : 0) + w : d + h}
}, renderMinorTick: function (a) { var b = this.chart.hasRendered && y(this.oldMin), c = this.minorTicks; c[a] || (c[a] = new L(this, a, "minor")); b && c[a].isNew && c[a].render(null, !0); c[a].render(null, !1, 1) }, renderTick: function (a, b) { var c = this.isLinked, d = this.ticks, g = this.chart.hasRendered && y(this.oldMin); if (!c || a >= this.min && a <= this.max) d[a] || (d[a] = new L(this, a)), g && d[a].isNew && d[a].render(b, !0, .1), d[a].render(b) }, render: function () {
    var b =
this, c = b.chart, g = b.options, f = b.isLog, l = b.isLinked, w = b.tickPositions, e = b.axisTitle, h = b.ticks, q = b.minorTicks, G = b.alternateBands, u = g.stackLabels, k = g.alternateGridColor, H = b.tickmarkOffset, p = b.axisLine, D = b.showAxis, J = C(c.renderer.globalAnimation), m, M; b.labelEdge.length = 0; b.overlap = !1; d([h, q, G], function (a) { E(a, function (a) { a.isActive = !1 }) }); if (b.hasData() || l) b.minorTickInterval && !b.categories && d(b.getMinorTickPositions(), function (a) { b.renderMinorTick(a) }), w.length && (d(w, function (a, c) { b.renderTick(a, c) }),
H && (0 === b.min || b.single) && (h[-1] || (h[-1] = new L(b, -1, null, !0)), h[-1].render(-1))), k && d(w, function (d, g) { M = void 0 !== w[g + 1] ? w[g + 1] + H : b.max - H; 0 === g % 2 && d < b.max && M <= b.max + (c.polar ? -H : H) && (G[d] || (G[d] = new a.PlotLineOrBand(b)), m = d + H, G[d].options = { from: f ? b.lin2log(m) : m, to: f ? b.lin2log(M) : M, color: k }, G[d].render(), G[d].isActive = !0) }), b._addedPlotLB || (d((g.plotLines || []).concat(g.plotBands || []), function (a) { b.addPlotBandOrLine(a) }), b._addedPlotLB = !0); d([h, q, G], function (a) {
    var b, d = [], g = J.duration; E(a, function (a,
b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, d.push(b)) }); B(function () { for (b = d.length; b--; ) a[d[b]] && !a[d[b]].isActive && (a[d[b]].destroy(), delete a[d[b]]) }, a !== G && c.hasRendered && g ? g : 0)
}); p && (p[p.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(p.strokeWidth()) }), p.isPlaced = !0, p[D ? "show" : "hide"](!0)); e && D && (g = b.getTitlePosition(), y(g.y) ? (e[e.isNew ? "attr" : "animate"](g), e.isNew = !1) : (e.attr("y", -9999), e.isNew = !0)); u && u.enabled && b.renderStackTotals(); b.isDirty = !1; n(this, "afterRender")
}, redraw: function () {
    this.visible &&
(this.render(), d(this.plotLinesAndBands, function (a) { a.render() })); d(this.series, function (a) { a.isDirty = !0 })
}, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function (a) {
    var b = this, g = b.stacks, f = b.plotLinesAndBands, l; n(this, "destroy", { keepEvents: a }); a || w(b); E(g, function (a, b) { h(a); g[b] = null }); d([b.ticks, b.minorTicks, b.alternateBands], function (a) { h(a) }); if (f) for (a = f.length; a--; ) f[a].destroy(); d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
function (a) { b[a] && (b[a] = b[a].destroy()) }); for (l in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[l] = b.plotLinesAndBandsGroups[l].destroy(); E(b, function (a, d) { -1 === c(d, b.keepProps) && delete b[d] })
}, drawCrosshair: function (a, b) {
    var c, d = this.crosshair, g = D(d.snap, !0), f, l = this.cross; n(this, "drawCrosshair", { e: a, point: b }); a || (a = this.cross && this.cross.e); if (this.crosshair && !1 !== (x(b) || !g)) {
        g ? x(b) && (f = D(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : f = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY +
this.pos); x(f) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : D(b.stackY, b.y)), null, null, null, f) || null); if (!x(c)) { this.hideCrosshair(); return } g = this.categories && !this.isRadial; l || (this.cross = l = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (g ? "category " : "thin ") + d.className).attr({ zIndex: D(d.zIndex, 2) }).add(), l.attr({ stroke: d.color || (g ? e("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": D(d.width, 1) }).css({ "pointer-events": "none" }), d.dashStyle && l.attr({ dashstyle: d.dashStyle }));
        l.show().attr({ d: c }); g && !d.width && l.attr({ "stroke-width": this.transA }); this.cross.e = a
    } else this.hideCrosshair(); n(this, "afterDrawCrosshair", { e: a, point: b })
}, hideCrosshair: function () { this.cross && this.cross.hide() } 
}); return a.Axis = H
    } (I); (function (a) {
        var A = a.Axis, C = a.getMagnitude, z = a.map, m = a.normalizeTickInterval, e = a.pick; A.prototype.getLogTickPositions = function (a, r, x, p) {
            var h = this.options, d = this.len, f = []; p || (this._minorAutoInterval = null); if (.5 <= a) a = Math.round(a), f = this.getLinearTickPositions(a, r, x);
            else if (.08 <= a) for (var d = Math.floor(r), n, u, g, b, c, h = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; d < x + 1 && !c; d++) for (u = h.length, n = 0; n < u && !c; n++) g = this.log2lin(this.lin2log(d) * h[n]), g > r && (!p || b <= x) && void 0 !== b && f.push(b), b > x && (c = !0), b = g; else r = this.lin2log(r), x = this.lin2log(x), a = p ? this.getMinorTickInterval() : h.tickInterval, a = e("auto" === a ? null : a, this._minorAutoInterval, h.tickPixelInterval / (p ? 5 : 1) * (x - r) / ((p ? d / this.tickPositions.length : d) || 1)), a = m(a, null, C(a)), f = z(this.getLinearTickPositions(a, r, x),
this.log2lin), p || (this._minorAutoInterval = a / 5); p || (this.tickInterval = a); return f
        }; A.prototype.log2lin = function (a) { return Math.log(a) / Math.LN10 }; A.prototype.lin2log = function (a) { return Math.pow(10, a) } 
    })(I); (function (a, A) {
        var C = a.arrayMax, z = a.arrayMin, m = a.defined, e = a.destroyObjectProperties, k = a.each, r = a.erase, x = a.merge, p = a.pick; a.PlotLineOrBand = function (a, d) { this.axis = a; d && (this.options = d, this.id = d.id) }; a.PlotLineOrBand.prototype = { render: function () {
            var e = this, d = e.axis, f = d.horiz, n = e.options, u = n.label,
g = e.label, b = n.to, c = n.from, l = n.value, y = m(c) && m(b), k = m(l), q = e.svgElem, M = !q, E = [], D = n.color, w = p(n.zIndex, 0), G = n.events, E = { "class": "highcharts-plot-" + (y ? "band " : "line ") + (n.className || "") }, B = {}, L = d.chart.renderer, H = y ? "bands" : "lines"; d.isLog && (c = d.log2lin(c), b = d.log2lin(b), l = d.log2lin(l)); k ? (E = { stroke: D, "stroke-width": n.width }, n.dashStyle && (E.dashstyle = n.dashStyle)) : y && (D && (E.fill = D), n.borderWidth && (E.stroke = n.borderColor, E["stroke-width"] = n.borderWidth)); B.zIndex = w; H += "-" + w; (D = d.plotLinesAndBandsGroups[H]) ||
(d.plotLinesAndBandsGroups[H] = D = L.g("plot-" + H).attr(B).add()); M && (e.svgElem = q = L.path().attr(E).add(D)); if (k) E = d.getPlotLinePath(l, q.strokeWidth()); else if (y) E = d.getPlotBandPath(c, b, n); else return; M && E && E.length ? (q.attr({ d: E }), G && a.objectEach(G, function (a, b) { q.on(b, function (a) { G[b].apply(e, [a]) }) })) : q && (E ? (q.show(), q.animate({ d: E })) : (q.hide(), g && (e.label = g = g.destroy()))); u && m(u.text) && E && E.length && 0 < d.width && 0 < d.height && !E.flat ? (u = x({ align: f && y && "center", x: f ? !y && 4 : 10, verticalAlign: !f && y && "middle",
    y: f ? y ? 16 : 10 : y ? 6 : -4, rotation: f && !y && 90
}, u), this.renderLabel(u, E, y, w)) : g && g.hide(); return e
        }, renderLabel: function (a, d, f, e) {
            var h = this.label, g = this.axis.chart.renderer; h || (h = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || "") }, h.zIndex = e, this.label = h = g.text(a.text, 0, 0, a.useHTML).attr(h).add(), h.css(a.style)); e = d.xBounds || [d[1], d[4], f ? d[6] : d[1]]; d = d.yBounds || [d[2], d[5], f ? d[7] : d[2]]; f = z(e); g = z(d); h.align(a, !1, { x: f, y: g, width: C(e) - f, height: C(d) -
g
            }); h.show()
        }, destroy: function () { r(this.axis.plotLinesAndBands, this); delete this.axis; e(this) } 
        }; a.extend(A.prototype, { getPlotBandPath: function (a, d) {
            var f = this.getPlotLinePath(d, null, null, !0), e = this.getPlotLinePath(a, null, null, !0), h = [], g = this.horiz, b = 1, c; a = a < this.min && d < this.min || a > this.max && d > this.max; if (e && f) for (a && (c = e.toString() === f.toString(), b = 0), a = 0; a < e.length; a += 6) g && f[a + 1] === e[a + 1] ? (f[a + 1] += b, f[a + 4] += b) : g || f[a + 2] !== e[a + 2] || (f[a + 2] += b, f[a + 5] += b), h.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], f[a +
4], f[a + 5], f[a + 1], f[a + 2], "z"), h.flat = c; return h
        }, addPlotBand: function (a) { return this.addPlotBandOrLine(a, "plotBands") }, addPlotLine: function (a) { return this.addPlotBandOrLine(a, "plotLines") }, addPlotBandOrLine: function (e, d) { var f = (new a.PlotLineOrBand(this, e)).render(), h = this.userOptions; f && (d && (h[d] = h[d] || [], h[d].push(e)), this.plotLinesAndBands.push(f)); return f }, removePlotBandOrLine: function (a) {
            for (var d = this.plotLinesAndBands, f = this.options, e = this.userOptions, h = d.length; h--; ) d[h].id === a && d[h].destroy();
            k([f.plotLines || [], e.plotLines || [], f.plotBands || [], e.plotBands || []], function (d) { for (h = d.length; h--; ) d[h].id === a && r(d, d[h]) })
        }, removePlotBand: function (a) { this.removePlotBandOrLine(a) }, removePlotLine: function (a) { this.removePlotBandOrLine(a) } 
        })
    })(I, W); (function (a) {
        var A = a.each, C = a.extend, z = a.format, m = a.isNumber, e = a.map, k = a.merge, r = a.pick, x = a.splat, p = a.syncTimeout, h = a.timeUnits; a.Tooltip = function () { this.init.apply(this, arguments) }; a.Tooltip.prototype = { init: function (a, f) {
            this.chart = a; this.options = f; this.crosshairs =
[]; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = f.split && !a.inverted; this.shared = f.shared || this.split
        }, cleanSplit: function (a) { A(this.chart.series, function (d) { var f = d && d.tt; f && (!f.isActive || a ? d.tt = f.destroy() : f.isActive = !1) }) }, getLabel: function () {
            var a = this.chart.renderer, f = this.options; this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, f.shape || "callout", null, null, f.useHTML, null, "tooltip").attr({ padding: f.padding, r: f.borderRadius }), this.label.attr({ fill: f.backgroundColor,
                "stroke-width": f.borderWidth
            }).css(f.style).shadow(f.shadow)), this.label.attr({ zIndex: 8 }).add()); return this.label
        }, update: function (a) { this.destroy(); k(!0, this.chart.options.tooltip.userOptions, a); this.init(this.chart, k(!0, this.options, a)) }, destroy: function () { this.label && (this.label = this.label.destroy()); this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()); a.clearTimeout(this.hideTimer); a.clearTimeout(this.tooltipTimeout) }, move: function (d, f, e, h) {
            var g = this, b = g.now, c = !1 !==
g.options.animation && !g.isHidden && (1 < Math.abs(d - b.x) || 1 < Math.abs(f - b.y)), l = g.followPointer || 1 < g.len; C(b, { x: c ? (2 * b.x + d) / 3 : d, y: c ? (b.y + f) / 2 : f, anchorX: l ? void 0 : c ? (2 * b.anchorX + e) / 3 : e, anchorY: l ? void 0 : c ? (b.anchorY + h) / 2 : h }); g.getLabel().attr(b); c && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { g && g.move(d, f, e, h) }, 32))
        }, hide: function (d) {
            var f = this; a.clearTimeout(this.hideTimer); d = r(d, this.options.hideDelay, 500); this.isHidden || (this.hideTimer = p(function () {
                f.getLabel()[d ? "fadeOut" :
"hide"](); f.isHidden = !0
            }, d))
        }, getAnchor: function (a, f) {
            var d, h = this.chart, g = h.inverted, b = h.plotTop, c = h.plotLeft, l = 0, y = 0, k, q; a = x(a); d = a[0].tooltipPos; this.followPointer && f && (void 0 === f.chartX && (f = h.pointer.normalize(f)), d = [f.chartX - h.plotLeft, f.chartY - b]); d || (A(a, function (a) { k = a.series.yAxis; q = a.series.xAxis; l += a.plotX + (!g && q ? q.left - c : 0); y += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!g && k ? k.top - b : 0) }), l /= a.length, y /= a.length, d = [g ? h.plotWidth - y : l, this.shared && !g && 1 < a.length && f ? f.chartY - b : g ? h.plotHeight -
l : y]); return e(d, Math.round)
        }, getPosition: function (a, f, e) {
            var d = this.chart, g = this.distance, b = {}, c = d.inverted && e.h || 0, l, h = ["y", d.chartHeight, f, e.plotY + d.plotTop, d.plotTop, d.plotTop + d.plotHeight], n = ["x", d.chartWidth, a, e.plotX + d.plotLeft, d.plotLeft, d.plotLeft + d.plotWidth], q = !this.followPointer && r(e.ttBelow, !d.inverted === !!e.negative), k = function (a, d, f, l, w, e) {
                var h = f < l - g, t = l + g + f < d, B = l - g - f; l += g; if (q && t) b[a] = l; else if (!q && h) b[a] = B; else if (h) b[a] = Math.min(e - f, 0 > B - c ? B : B - c); else if (t) b[a] = Math.max(w, l + c + f >
d ? l : l + c); else return !1
            }, E = function (a, c, d, f) { var l; f < g || f > c - g ? l = !1 : b[a] = f < d / 2 ? 1 : f > c - d / 2 ? c - d - 2 : f - d / 2; return l }, p = function (a) { var b = h; h = n; n = b; l = a }, w = function () { !1 !== k.apply(0, h) ? !1 !== E.apply(0, n) || l || (p(!0), w()) : l ? b.x = b.y = 0 : (p(!0), w()) }; (d.inverted || 1 < this.len) && p(); w(); return b
        }, defaultFormatter: function (a) { var d = this.points || x(this), e; e = [a.tooltipFooterHeaderFormatter(d[0])]; e = e.concat(a.bodyFormatter(d)); e.push(a.tooltipFooterHeaderFormatter(d[0], !0)); return e }, refresh: function (d, f) {
            var e, h = this.options,
g, b = d, c, l = {}, y = []; e = h.formatter || this.defaultFormatter; var l = this.shared, k; h.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = x(b)[0].series.tooltipOptions.followPointer, c = this.getAnchor(b, f), f = c[0], g = c[1], !l || b.series && b.series.noSharedTooltip ? l = b.getLabelConfig() : (A(b, function (a) { a.setState("hover"); y.push(a.getLabelConfig()) }), l = { x: b[0].category, y: b[0].y }, l.points = y, b = b[0]), this.len = y.length, l = e.call(l, this), k = b.series, this.distance = r(k.tooltipOptions.distance, 16), !1 === l ? this.hide() :
(e = this.getLabel(), this.isHidden && e.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(l, x(d)) : (h.style.width || e.css({ width: this.chart.spacingBox.width }), e.attr({ text: l && l.join ? l.join("") : l }), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + r(b.colorIndex, k.colorIndex)), e.attr({ stroke: h.borderColor || b.color || k.color || "#666666" }), this.updatePosition({ plotX: f, plotY: g, negative: b.negative, ttBelow: b.ttBelow, h: c[2] || 0 })), this.isHidden = !1))
        }, renderSplit: function (d, f) {
            var e = this, h =
[], g = this.chart, b = g.renderer, c = !0, l = this.options, y = 0, k = this.getLabel(); a.isString(d) && (d = [!1, d]); A(d.slice(0, f.length + 1), function (a, d) {
    if (!1 !== a) {
        d = f[d - 1] || { isHeader: !0, plotX: f[0].plotX }; var q = d.series || e, n = q.tt, w = d.series || {}, G = "highcharts-color-" + r(d.colorIndex, w.colorIndex, "none"); n || (q.tt = n = b.label(null, null, null, "callout", null, null, l.useHTML).addClass("highcharts-tooltip-box " + G).attr({ padding: l.padding, r: l.borderRadius, fill: l.backgroundColor, stroke: l.borderColor || d.color || w.color || "#333333",
            "stroke-width": l.borderWidth
        }).add(k)); n.isActive = !0; n.attr({ text: a }); n.css(l.style).shadow(l.shadow); a = n.getBBox(); w = a.width + n.strokeWidth(); d.isHeader ? (y = a.height, w = Math.max(0, Math.min(d.plotX + g.plotLeft - w / 2, g.chartWidth - w))) : w = d.plotX + g.plotLeft - r(l.distance, 16) - w; 0 > w && (c = !1); a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0); a -= g.plotTop; h.push({ target: d.isHeader ? g.plotHeight + y : a, rank: d.isHeader ? 1 : 0, size: q.tt.getBBox().height + 1, point: d, x: w, tt: n })
    } 
}); this.cleanSplit(); a.distribute(h,
g.plotHeight + y); A(h, function (a) { var b = a.point, d = b.series; a.tt.attr({ visibility: void 0 === a.pos ? "hidden" : "inherit", x: c || b.isHeader ? a.x : b.plotX + g.plotLeft + r(l.distance, 16), y: a.pos + g.plotTop, anchorX: b.isHeader ? b.plotX + g.plotLeft : b.plotX + d.xAxis.pos, anchorY: b.isHeader ? a.pos + g.plotTop - 15 : b.plotY + d.yAxis.pos }) })
        }, updatePosition: function (a) {
            var d = this.chart, e = this.getLabel(), e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a); this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + d.plotLeft,
a.plotY + d.plotTop)
        }, getDateFormat: function (a, f, e, k) { var d = this.chart.time, b = d.dateFormat("%m-%d %H:%M:%S.%L", f), c, l, y = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, n = "millisecond"; for (l in h) { if (a === h.week && +d.dateFormat("%w", f) === e && "00:00:00.000" === b.substr(6)) { l = "week"; break } if (h[l] > a) { l = n; break } if (y[l] && b.substr(y[l]) !== "01-01 00:00:00.000".substr(y[l])) break; "week" !== l && (n = l) } l && (c = k[l]); return c }, getXDateFormat: function (a, f, e) {
            f = f.dateTimeLabelFormats; var d = e && e.closestPointRange; return (d ?
this.getDateFormat(d, a.x, e.options.startOfWeek, f) : f.day) || f.year
        }, tooltipFooterHeaderFormatter: function (a, f) { f = f ? "footer" : "header"; var d = a.series, e = d.tooltipOptions, g = e.xDateFormat, b = d.xAxis, c = b && "datetime" === b.options.type && m(a.key), l = e[f + "Format"]; c && !g && (g = this.getXDateFormat(a, e, b)); c && g && A(a.point && a.point.tooltipDateKeys || ["key"], function (a) { l = l.replace("{point." + a + "}", "{point." + a + ":" + g + "}") }); return z(l, { point: a, series: d }, this.chart.time) }, bodyFormatter: function (a) {
            return e(a, function (a) {
                var d =
a.series.tooltipOptions; return (d[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"])
            })
        } 
        }
    })(I); (function (a) {
        var A = a.addEvent, C = a.attr, z = a.charts, m = a.color, e = a.css, k = a.defined, r = a.each, x = a.extend, p = a.find, h = a.fireEvent, d = a.isNumber, f = a.isObject, n = a.offset, u = a.pick, g = a.splat, b = a.Tooltip; a.Pointer = function (a, b) { this.init(a, b) }; a.Pointer.prototype = { init: function (a, d) {
            this.options = d; this.chart = a; this.runChartClick = d.chart.events &&
!!d.chart.events.click; this.pinchDown = []; this.lastValidTouch = {}; b && (a.tooltip = new b(a, d.tooltip), this.followTouchMove = u(d.tooltip.followTouchMove, !0)); this.setDOMEvents()
        }, zoomOption: function (a) { var b = this.chart, c = b.options.chart, d = c.zoomType || "", b = b.inverted; /touch/.test(a.type) && (d = u(c.pinchType, d)); this.zoomX = a = /x/.test(d); this.zoomY = d = /y/.test(d); this.zoomHor = a && !b || d && b; this.zoomVert = d && !b || a && b; this.hasZoom = a || d }, normalize: function (a, b) {
            var c; c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] :
a; b || (this.chartPosition = b = n(this.chart.container)); return x(a, { chartX: Math.round(c.pageX - b.left), chartY: Math.round(c.pageY - b.top) })
        }, getCoordinates: function (a) { var b = { xAxis: [], yAxis: [] }; r(this.chart.axes, function (c) { b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) }) }); return b }, findNearestKDPoint: function (a, b, d) {
            var c; r(a, function (a) {
                var g = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y"); a = a.searchPoint(d, g); if ((g = f(a, !0)) && !(g = !f(c, !0))) var g =
c.distX - a.distX, l = c.dist - a.dist, e = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex), g = 0 < (0 !== g && b ? g : 0 !== l ? l : 0 !== e ? e : c.series.index > a.series.index ? -1 : 1); g && (c = a)
            }); return c
        }, getPointFromEvent: function (a) { a = a.target; for (var b; a && !b; ) b = a.point, a = a.parentNode; return b }, getChartCoordinatesFromPoint: function (a, b) {
            var c = a.series, d = c.xAxis, c = c.yAxis, g = u(a.clientX, a.plotX), f = a.shapeArgs; if (d && c) return b ? { chartX: d.len + d.pos - g, chartY: c.len + c.pos - a.plotY} : { chartX: g + d.pos, chartY: a.plotY +
c.pos
            }; if (f && f.x && f.y) return { chartX: f.x, chartY: f.y}
        }, getHoverData: function (b, d, g, e, h, k, n) {
            var c, l = [], q = n && n.isBoosting; e = !(!e || !b); n = d && !d.stickyTracking ? [d] : a.grep(g, function (a) { return a.visible && !(!h && a.directTouch) && u(a.options.enableMouseTracking, !0) && a.stickyTracking }); d = (c = e ? b : this.findNearestKDPoint(n, h, k)) && c.series; c && (h && !d.noSharedTooltip ? (n = a.grep(g, function (a) { return a.visible && !(!h && a.directTouch) && u(a.options.enableMouseTracking, !0) && !a.noSharedTooltip }), r(n, function (a) {
                var b = p(a.points,
function (a) { return a.x === c.x && !a.isNull }); f(b) && (q && (b = a.getPoint(b)), l.push(b))
            })) : l.push(c)); return { hoverPoint: c, hoverSeries: d, hoverPoints: l}
        }, runPointActions: function (b, d) {
            var c = this.chart, g = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0, f = g ? g.shared : !1, l = d || c.hoverPoint, e = l && l.series || c.hoverSeries, e = this.getHoverData(l, e, c.series, !!d || e && e.directTouch && this.isDirectTouch, f, b, { isBoosting: c.isBoosting }), h, l = e.hoverPoint; h = e.hoverPoints; d = (e = e.hoverSeries) && e.tooltipOptions.followPointer;
            f = f && e && !e.noSharedTooltip; if (l && (l !== c.hoverPoint || g && g.isHidden)) { r(c.hoverPoints || [], function (b) { -1 === a.inArray(b, h) && b.setState() }); r(h || [], function (a) { a.setState("hover") }); if (c.hoverSeries !== e) e.onMouseOver(); c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut"); if (!l.series) return; l.firePointEvent("mouseOver"); c.hoverPoints = h; c.hoverPoint = l; g && g.refresh(f ? h : l, b) } else d && g && !g.isHidden && (l = g.getAnchor([{}], b), g.updatePosition({ plotX: l[0], plotY: l[1] })); this.unDocMouseMove || (this.unDocMouseMove =
A(c.container.ownerDocument, "mousemove", function (b) { var c = z[a.hoverChartIndex]; if (c) c.pointer.onDocumentMouseMove(b) })); r(c.axes, function (c) { var d = u(c.crosshair.snap, !0), g = d ? a.find(h, function (a) { return a.series[c.coll] === c }) : void 0; g || !d ? c.drawCrosshair(b, g) : c.hideCrosshair() })
        }, reset: function (a, b) {
            var c = this.chart, d = c.hoverSeries, f = c.hoverPoint, l = c.hoverPoints, e = c.tooltip, h = e && e.shared ? l : f; a && h && r(g(h), function (b) { b.series.isCartesian && void 0 === b.plotX && (a = !1) }); if (a) e && h && (e.refresh(h), f && (f.setState(f.state,
!0), r(c.axes, function (a) { a.crosshair && a.drawCrosshair(null, f) }))); else { if (f) f.onMouseOut(); l && r(l, function (a) { a.setState() }); if (d) d.onMouseOut(); e && e.hide(b); this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()); r(c.axes, function (a) { a.hideCrosshair() }); this.hoverX = c.hoverPoints = c.hoverPoint = null } 
        }, scaleGroups: function (a, b) {
            var c = this.chart, d; r(c.series, function (g) {
                d = a || g.getPlotBox(); g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(d), g.markerGroup && (g.markerGroup.attr(d), g.markerGroup.clip(b ?
c.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(d))
            }); c.clipRect.attr(b || c.clipBox)
        }, dragStart: function (a) { var b = this.chart; b.mouseIsDown = a.type; b.cancelClick = !1; b.mouseDownX = this.mouseDownX = a.chartX; b.mouseDownY = this.mouseDownY = a.chartY }, drag: function (a) {
            var b = this.chart, c = b.options.chart, d = a.chartX, g = a.chartY, f = this.zoomHor, e = this.zoomVert, h = b.plotLeft, w = b.plotTop, G = b.plotWidth, B = b.plotHeight, k, n = this.selectionMarker, t = this.mouseDownX, v = this.mouseDownY, p = c.panKey && a[c.panKey + "Key"];
            n && n.touch || (d < h ? d = h : d > h + G && (d = h + G), g < w ? g = w : g > w + B && (g = w + B), this.hasDragged = Math.sqrt(Math.pow(t - d, 2) + Math.pow(v - g, 2)), 10 < this.hasDragged && (k = b.isInsidePlot(t - h, v - w), b.hasCartesianSeries && (this.zoomX || this.zoomY) && k && !p && !n && (this.selectionMarker = n = b.renderer.rect(h, w, f ? 1 : G, e ? 1 : B, 0).attr({ fill: c.selectionMarkerFill || m("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker", zIndex: 7 }).add()), n && f && (d -= t, n.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + t })), n && e && (d = g - v, n.attr({ height: Math.abs(d),
                y: (0 < d ? 0 : d) + v
            })), k && !n && c.panning && b.pan(a, c.panning)))
        }, drop: function (a) {
            var b = this, c = this.chart, g = this.hasPinched; if (this.selectionMarker) {
                var f = { originalEvent: a, xAxis: [], yAxis: [] }, n = this.selectionMarker, p = n.attr ? n.attr("x") : n.x, u = n.attr ? n.attr("y") : n.y, w = n.attr ? n.attr("width") : n.width, G = n.attr ? n.attr("height") : n.height, B; if (this.hasDragged || g) r(c.axes, function (c) {
                    if (c.zoomEnabled && k(c.min) && (g || b[{ xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                        var d = c.horiz, e = "touchend" === a.type ? c.minPixelPadding : 0, l =
c.toValue((d ? p : u) + e), d = c.toValue((d ? p + w : u + G) - e); f[c.coll].push({ axis: c, min: Math.min(l, d), max: Math.max(l, d) }); B = !0
                    } 
                }), B && h(c, "selection", f, function (a) { c.zoom(x(a, g ? { animation: !1} : null)) }); d(c.index) && (this.selectionMarker = this.selectionMarker.destroy()); g && this.scaleGroups()
            } c && d(c.index) && (e(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
        }, onContainerMouseDown: function (a) {
            a = this.normalize(a); 2 !== a.button && (this.zoomOption(a),
a.preventDefault && a.preventDefault(), this.dragStart(a))
        }, onDocumentMouseUp: function (b) { z[a.hoverChartIndex] && z[a.hoverChartIndex].pointer.drop(b) }, onDocumentMouseMove: function (a) { var b = this.chart, c = this.chartPosition; a = this.normalize(a, c); !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset() }, onContainerMouseLeave: function (b) { var c = z[a.hoverChartIndex]; c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null) },
            onContainerMouseMove: function (b) { var c = this.chart; k(a.hoverChartIndex) && z[a.hoverChartIndex] && z[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index); b = this.normalize(b); b.returnValue = !1; "mousedown" === c.mouseIsDown && this.drag(b); !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b) }, inClass: function (a, b) {
                for (var c; a; ) {
                    if (c = C(a, "class")) { if (-1 !== c.indexOf(b)) return !0; if (-1 !== c.indexOf("highcharts-container")) return !1 } a =
a.parentNode
                } 
            }, onTrackerMouseOut: function (a) { var b = this.chart.hoverSeries; a = a.relatedTarget || a.toElement; this.isDirectTouch = !1; if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut() }, onContainerClick: function (a) {
                var b = this.chart, c = b.hoverPoint, d = b.plotLeft, g = b.plotTop; a = this.normalize(a); b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (h(c.series, "click", x(a, { point: c })),
b.hoverPoint && c.firePointEvent("click", a)) : (x(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - g) && h(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, d = b.chart.container, g = d.ownerDocument; d.onmousedown = function (a) { b.onContainerMouseDown(a) }; d.onmousemove = function (a) { b.onContainerMouseMove(a) }; d.onclick = function (a) { b.onContainerClick(a) }; this.unbindContainerMouseLeave = A(d, "mouseleave", b.onContainerMouseLeave); a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = A(g, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (d.ontouchstart = function (a) { b.onContainerTouchStart(a) }, d.ontouchmove = function (a) { b.onContainerTouchMove(a) }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = A(g, "touchend", b.onDocumentTouchEnd)))
            }, destroy: function () {
                var b = this; b.unDocMouseMove && b.unDocMouseMove(); this.unbindContainerMouseLeave(); a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd())); clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) { b[c] = null })
            } 
        }
    })(I); (function (a) {
        var A = a.charts, C = a.each, z = a.extend, m = a.map, e = a.noop, k = a.pick; z(a.Pointer.prototype, { pinchTranslate: function (a, e, k, h, d, f) { this.zoomHor && this.pinchTranslateDirection(!0, a, e, k, h, d, f); this.zoomVert && this.pinchTranslateDirection(!1, a, e, k, h, d, f) }, pinchTranslateDirection: function (a, e, k, h, d, f, n, u) {
            var g = this.chart, b = a ? "x" : "y", c = a ? "X" : "Y", l = "chart" + c, p = a ? "width" : "height", m = g["plot" + (a ? "Left" : "Top")], q, r, E = u || 1, D = g.inverted, w = g.bounds[a ? "h" : "v"],
G = 1 === e.length, B = e[0][l], L = k[0][l], H = !G && e[1][l], t = !G && k[1][l], v; k = function () { !G && 20 < Math.abs(B - H) && (E = u || Math.abs(L - t) / Math.abs(B - H)); r = (m - L) / E + B; q = g["plot" + (a ? "Width" : "Height")] / E }; k(); e = r; e < w.min ? (e = w.min, v = !0) : e + q > w.max && (e = w.max - q, v = !0); v ? (L -= .8 * (L - n[b][0]), G || (t -= .8 * (t - n[b][1])), k()) : n[b] = [L, t]; D || (f[b] = r - m, f[p] = q); f = D ? 1 / E : E; d[p] = q; d[b] = e; h[D ? a ? "scaleY" : "scaleX" : "scale" + c] = E; h["translate" + c] = f * m + (L - f * B)
        }, pinch: function (a) {
            var r = this, p = r.chart, h = r.pinchDown, d = a.touches, f = d.length, n = r.lastValidTouch,
u = r.hasZoom, g = r.selectionMarker, b = {}, c = 1 === f && (r.inClass(a.target, "highcharts-tracker") && p.runTrackerClick || r.runChartClick), l = {}; 1 < f && (r.initiated = !0); u && r.initiated && !c && a.preventDefault(); m(d, function (a) { return r.normalize(a) }); "touchstart" === a.type ? (C(d, function (a, b) { h[b] = { chartX: a.chartX, chartY: a.chartY} }), n.x = [h[0].chartX, h[1] && h[1].chartX], n.y = [h[0].chartY, h[1] && h[1].chartY], C(p.axes, function (a) {
    if (a.zoomEnabled) {
        var b = p.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, d = a.toPixels(k(a.options.min,
a.dataMin)), g = a.toPixels(k(a.options.max, a.dataMax)), f = Math.max(d, g); b.min = Math.min(a.pos, Math.min(d, g) - c); b.max = Math.max(a.pos + a.len, f + c)
    } 
}), r.res = !0) : r.followTouchMove && 1 === f ? this.runPointActions(r.normalize(a)) : h.length && (g || (r.selectionMarker = g = z({ destroy: e, touch: !0 }, p.plotBox)), r.pinchTranslate(h, d, b, g, l, n), r.hasPinched = u, r.scaleGroups(b, l), r.res && (r.res = !1, this.reset(!1, 0)))
        }, touch: function (e, m) {
            var p = this.chart, h, d; if (p.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });
            a.hoverChartIndex = p.index; 1 === e.touches.length ? (e = this.normalize(e), (d = p.isInsidePlot(e.chartX - p.plotLeft, e.chartY - p.plotTop)) && !p.openMenu ? (m && this.runPointActions(e), "touchmove" === e.type && (m = this.pinchDown, h = m[0] ? 4 <= Math.sqrt(Math.pow(m[0].chartX - e.chartX, 2) + Math.pow(m[0].chartY - e.chartY, 2)) : !1), k(h, !0) && this.pinch(e)) : m && this.reset()) : 2 === e.touches.length && this.pinch(e)
        }, onContainerTouchStart: function (a) { this.zoomOption(a); this.touch(a, !0) }, onContainerTouchMove: function (a) { this.touch(a) }, onDocumentTouchEnd: function (e) {
            A[a.hoverChartIndex] &&
A[a.hoverChartIndex].pointer.drop(e)
        } 
        })
    })(I); (function (a) {
        var A = a.addEvent, C = a.charts, z = a.css, m = a.doc, e = a.extend, k = a.noop, r = a.Pointer, x = a.removeEvent, p = a.win, h = a.wrap; if (!a.hasTouch && (p.PointerEvent || p.MSPointerEvent)) {
            var d = {}, f = !!p.PointerEvent, n = function () { var g = []; g.item = function (a) { return this[a] }; a.objectEach(d, function (a) { g.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }) }); return g }, u = function (d, b, c, f) {
                "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !C[a.hoverChartIndex] ||
(f(d), f = C[a.hoverChartIndex].pointer, f[b]({ type: c, target: d.currentTarget, preventDefault: k, touches: n() }))
            }; e(r.prototype, { onContainerPointerDown: function (a) { u(a, "onContainerTouchStart", "touchstart", function (a) { d[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget} }) }, onContainerPointerMove: function (a) { u(a, "onContainerTouchMove", "touchmove", function (a) { d[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }; d[a.pointerId].target || (d[a.pointerId].target = a.currentTarget) }) }, onDocumentPointerUp: function (a) {
                u(a,
"onDocumentTouchEnd", "touchend", function (a) { delete d[a.pointerId] })
            }, batchMSEvents: function (a) { a(this.chart.container, f ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); a(this.chart.container, f ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); a(m, f ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp) } 
            }); h(r.prototype, "init", function (a, b, c) { a.call(this, b, c); this.hasZoom && z(b.container, { "-ms-touch-action": "none", "touch-action": "none" }) }); h(r.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
            }); h(r.prototype, "destroy", function (a) { this.batchMSEvents(x); a.call(this) })
        } 
    })(I); (function (a) {
        var A = a.addEvent, C = a.css, z = a.discardElement, m = a.defined, e = a.each, k = a.fireEvent, r = a.isFirefox, x = a.marginNames, p = a.merge, h = a.pick, d = a.setAnimation, f = a.stableSort, n = a.win, u = a.wrap; a.Legend = function (a, b) { this.init(a, b) }; a.Legend.prototype = { init: function (a, b) { this.chart = a; this.setOptions(b); b.enabled && (this.render(), A(this.chart, "endResize", function () { this.legend.positionCheckboxes() })) },
            setOptions: function (a) { var b = h(a.padding, 8); this.options = a; this.itemStyle = a.itemStyle; this.itemHiddenStyle = p(this.itemStyle, a.itemHiddenStyle); this.itemMarginTop = a.itemMarginTop || 0; this.padding = b; this.initialItemY = b - 5; this.symbolWidth = h(a.symbolWidth, 16); this.pages = [] }, update: function (a, b) { var c = this.chart; this.setOptions(p(!0, this.options, a)); this.destroy(); c.isDirtyLegend = c.isDirtyBox = !0; h(b, !0) && c.redraw(); k(this, "afterUpdate") }, colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options, d = a.legendItem, g = a.legendLine, f = a.legendSymbol, e = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : e, h = b ? a.color || e : e, n = a.options && a.options.marker, u = { fill: h }; d && d.css({ fill: c, color: c }); g && g.attr({ stroke: h }); f && (n && f.isMarker && (u = a.pointAttribs(), b || (u.stroke = u.fill = e)), f.attr(u)); k(this, "afterColorizeItem", { item: a, visible: b })
            }, positionItem: function (a) {
                var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, g = d[0], d = d[1], f = a.checkbox; (a = a.legendGroup) && a.element && a.translate(b ?
g : this.legendWidth - g - 2 * c - 4, d); f && (f.x = g, f.y = d)
            }, destroyItem: function (a) { var b = a.checkbox; e(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) { a[b] && (a[b] = a[b].destroy()) }); b && z(a.checkbox) }, destroy: function () { function a(a) { this[a] && (this[a] = this[a].destroy()) } e(this.getAllItems(), function (b) { e(["legendItem", "legendGroup"], a, b) }); e("clipRect up down pager nav box title group".split(" "), a, this); this.display = null }, positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
b, c = this.clipHeight || this.legendHeight, d = this.titleHeight; a && (b = a.translateY, e(this.allItems, function (g) { var f = g.checkbox, e; f && (e = b + d + f.y + (this.scrollOffset || 0) + 3, C(f, { left: a.translateX + g.checkboxOffset + f.x - 20 + "px", top: e + "px", display: e > b - 6 && e < b + c - 6 ? "" : "none" })) }, this))
            }, renderTitle: function () {
                var a = this.options, b = this.padding, c = a.title, d = 0; c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }).css(c.style).add(this.group)),
a = this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: d })); this.titleHeight = d
            }, setText: function (d) { var b = this.options; d.legendItem.attr({ text: b.labelFormat ? a.format(b.labelFormat, d, this.chart.time) : b.labelFormatter.call(d) }) }, renderItem: function (a) {
                var b = this.chart, c = b.renderer, d = this.options, f = this.symbolWidth, g = d.symbolPadding, e = this.itemStyle, n = this.itemHiddenStyle, k = "horizontal" === d.layout ? h(d.itemDistance, 20) : 0, u = !d.rtl, w = a.legendItem, G = !a.series, B = !G &&
a.series.drawLegendSymbol ? a.series : a, m = B.options, m = this.createCheckboxForItem && m && m.showCheckbox, k = f + g + k + (m ? 20 : 0), H = d.useHTML, t = a.options.className; w || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + B.type + "-series highcharts-color-" + a.colorIndex + (t ? " " + t : "") + (G ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = w = c.text("", u ? f + g : -g, this.baseline || 0, H).css(p(a.visible ? e : n)).attr({ align: u ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (f = e.fontSize,
this.fontMetrics = c.fontMetrics(f, w), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, w.attr("y", this.baseline)), this.symbolHeight = d.symbolHeight || this.fontMetrics.f, B.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, w, H), m && this.createCheckboxForItem(a)); this.colorizeItem(a, a.visible); e.width || w.css({ width: (d.itemWidth || d.width || b.spacingBox.width) - k }); this.setText(a); b = w.getBBox(); a.itemWidth = a.checkboxOffset = d.itemWidth || a.legendItemWidth || b.width + k; this.maxItemWidth = Math.max(this.maxItemWidth,
a.itemWidth); this.totalItemWidth += a.itemWidth; this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            }, layoutItem: function (a) {
                var b = this.options, c = this.padding, d = "horizontal" === b.layout, f = a.itemHeight, g = b.itemMarginBottom || 0, e = this.itemMarginTop, n = d ? h(b.itemDistance, 20) : 0, k = b.width, u = k || this.chart.spacingBox.width - 2 * c - b.x, b = b.alignColumns && this.totalItemWidth > u ? this.maxItemWidth : a.itemWidth; d && this.itemX - c + b > u && (this.itemX = c, this.itemY += e + this.lastLineHeight + g, this.lastLineHeight =
0); this.lastItemY = e + this.itemY + g; this.lastLineHeight = Math.max(f, this.lastLineHeight); a._legendItemPos = [this.itemX, this.itemY]; d ? this.itemX += b : (this.itemY += e + f + g, this.lastLineHeight = f); this.offsetWidth = k || Math.max((d ? this.itemX - c - (a.checkbox ? 0 : n) : b) + c, this.offsetWidth)
            }, getAllItems: function () {
                var a = []; e(this.chart.series, function (b) { var c = b && b.options; b && h(c.showInLegend, m(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b))) }); k(this, "afterGetAllItems", { allItems: a });
                return a
            }, getAlignment: function () { var a = this.options; return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0) }, adjustMargins: function (a, b) {
                var c = this.chart, d = this.options, f = this.getAlignment(); f && e([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (g, e) {
                    g.test(f) && !m(a[e]) && (c[x[e]] = Math.max(c[x[e]], c.legend[(e + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][e] * d[e % 2 ? "x" : "y"] + h(d.margin, 12) + b[e] + (0 === e && void 0 !== c.options.title.margin ? c.titleOffset + c.options.title.margin :
0)))
                })
            }, render: function () {
                var a = this.chart, b = a.renderer, c = this.group, d, h, n, q, k = this.box, u = this.options, m = this.padding; this.itemX = m; this.itemY = this.initialItemY; this.lastItemY = this.offsetWidth = 0; c || (this.group = c = b.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = b.g().attr({ zIndex: 1 }).add(c), this.scrollGroup = b.g().add(this.contentGroup)); this.renderTitle(); d = this.getAllItems(); f(d, function (a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) }); u.reversed && d.reverse();
                this.allItems = d; this.display = h = !!d.length; this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0; e(d, this.renderItem, this); e(d, this.layoutItem, this); n = (u.width || this.offsetWidth) + m; q = this.lastItemY + this.lastLineHeight + this.titleHeight; q = this.handleOverflow(q); q += m; k || (this.box = k = b.rect().addClass("highcharts-legend-box").attr({ r: u.borderRadius }).add(c), k.isNew = !0); k.attr({ stroke: u.borderColor, "stroke-width": u.borderWidth || 0, fill: u.backgroundColor || "none" }).shadow(u.shadow); 0 <
n && 0 < q && (k[k.isNew ? "attr" : "animate"](k.crisp.call({}, { x: 0, y: 0, width: n, height: q }, k.strokeWidth())), k.isNew = !1); k[h ? "show" : "hide"](); this.legendWidth = n; this.legendHeight = q; e(d, this.positionItem, this); h && (b = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (b = p(b, { y: b.y + a.titleOffset + a.options.title.margin })), c.align(p(u, { width: n, height: q }), !0, b)); a.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var b = this, c = this.chart, d = c.renderer, f = this.options, g = f.y, k = this.padding, c = c.spacingBox.height +
("top" === f.verticalAlign ? -g : g) - k, g = f.maxHeight, n, u = this.clipRect, p = f.navigation, w = h(p.animation, !0), G = p.arrowSize || 12, B = this.nav, m = this.pages, H, t = this.allItems, v = function (a) { "number" === typeof a ? u.attr({ height: a }) : u && (b.clipRect = u.destroy(), b.contentGroup.clip()); b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + k + "px,9999px," + (k + a) + "px,0)" : "auto") }; "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (c /= 2); g && (c = Math.min(c, g)); m.length = 0; a > c && !1 !== p.enabled ? (this.clipHeight =
n = Math.max(c - 20 - this.titleHeight - k, 0), this.currentPage = h(this.currentPage, 1), this.fullHeight = a, e(t, function (a, b) { var c = a._legendItemPos[1], d = Math.round(a.legendItem.getBBox().height), f = m.length; if (!f || c - m[f - 1] > n && (H || c) !== m[f - 1]) m.push(H || c), f++; a.pageIx = f - 1; H && (t[b - 1].pageIx = f - 1); b === t.length - 1 && c + d - m[f - 1] > n && (m.push(c), a.pageIx = f); c !== H && (H = c) }), u || (u = b.clipRect = d.clipRect(0, k, 9999, 0), b.contentGroup.clip(u)), v(n), B || (this.nav = B = d.g().attr({ zIndex: 1 }).add(this.group), this.up = d.symbol("triangle",
0, 0, G, G).on("click", function () { b.scroll(-1, w) }).add(B), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation").css(p.style).add(B), this.down = d.symbol("triangle-down", 0, 0, G, G).on("click", function () { b.scroll(1, w) }).add(B)), b.scroll(0), a = c) : B && (v(), this.nav = B.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0); return a
            }, scroll: function (a, b) {
                var c = this.pages, f = c.length; a = this.currentPage + a; var e = this.clipHeight, g = this.options.navigation, h = this.pager, k = this.padding; a > f && (a =
f); 0 < a && (void 0 !== b && d(b, this.chart), this.nav.attr({ translateX: k, translateY: e + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), h.attr({ text: a + "/" + f }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), this.up.attr({ fill: 1 === a ? g.inactiveColor : g.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === f ?
g.inactiveColor : g.activeColor
}).css({ cursor: a === f ? "default" : "pointer" }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = a, this.positionCheckboxes())
            } 
        }; a.LegendSymbolMixin = { drawRectangle: function (a, b) { var c = a.symbolHeight, d = a.options.squareSymbol; b.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, d ? c : a.symbolWidth, c, h(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(b.legendGroup) },
            drawLineMarker: function (a) {
                var b = this.options, c = b.marker, d = a.symbolWidth, f = a.symbolHeight, e = f / 2, g = this.chart.renderer, k = this.legendGroup; a = a.baseline - Math.round(.3 * a.fontMetrics.b); var n; n = { "stroke-width": b.lineWidth || 0 }; b.dashStyle && (n.dashstyle = b.dashStyle); this.legendLine = g.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(n).add(k); c && !1 !== c.enabled && (b = Math.min(h(c.radius, e), e), 0 === this.symbol.indexOf("url") && (c = p(c, { width: f, height: f }), b = 0), this.legendSymbol = c = g.symbol(this.symbol, d /
2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(k), c.isMarker = !0)
            } 
        }; (/Trident\/7\.0/.test(n.navigator.userAgent) || r) && u(a.Legend.prototype, "positionItem", function (a, b) { var c = this, d = function () { b._legendItemPos && a.call(c, b) }; d(); setTimeout(d) })
    })(I); (function (a) {
        var A = a.addEvent, C = a.animate, z = a.animObject, m = a.attr, e = a.doc, k = a.Axis, r = a.createElement, x = a.defaultOptions, p = a.discardElement, h = a.charts, d = a.css, f = a.defined, n = a.each, u = a.extend, g = a.find, b = a.fireEvent, c = a.grep, l = a.isNumber, y = a.isObject, J =
a.isString, q = a.Legend, M = a.marginNames, E = a.merge, D = a.objectEach, w = a.Pointer, G = a.pick, B = a.pInt, L = a.removeEvent, H = a.seriesTypes, t = a.splat, v = a.syncTimeout, N = a.win, P = a.Chart = function () { this.getArgs.apply(this, arguments) }; a.chart = function (a, b, c) { return new P(a, b, c) }; u(P.prototype, { callbacks: [], getArgs: function () { var a = [].slice.call(arguments); if (J(a[0]) || a[0].nodeName) this.renderTo = a.shift(); this.init(a[0], a[1]) }, init: function (c, d) {
    var f, e, g = c.series, w = c.plotOptions || {}; b(this, "init", { args: arguments }, function () {
        c.series =
null; f = E(x, c); for (e in f.plotOptions) f.plotOptions[e].tooltip = w[e] && E(w[e].tooltip) || void 0; f.tooltip.userOptions = c.chart && c.chart.forExport && c.tooltip.userOptions || c.tooltip; f.series = c.series = g; this.userOptions = c; var l = f.chart, t = l.events; this.margin = []; this.spacing = []; this.bounds = { h: {}, v: {} }; this.labelCollectors = []; this.callback = d; this.isResizing = 0; this.options = f; this.axes = []; this.series = []; this.time = c.time && a.keys(c.time).length ? new a.Time(c.time) : a.time; this.hasCartesianSeries = l.showAxes; var B =
this; B.index = h.length; h.push(B); a.chartCount++; t && D(t, function (a, b) { A(B, b, a) }); B.xAxis = []; B.yAxis = []; B.pointCount = B.colorCounter = B.symbolCounter = 0; b(B, "afterInit"); B.firstRender()
    })
}, initSeries: function (b) { var c = this.options.chart; (c = H[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0); c = new c; c.init(this, b); return c }, orderSeries: function (a) { var b = this.series; for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName()) }, isInsidePlot: function (a, b, c) {
    var d = c ? b : a; a = c ? a : b; return 0 <= d && d <=
this.plotWidth && 0 <= a && a <= this.plotHeight
}, redraw: function (c) {
    b(this, "beforeRedraw"); var d = this.axes, f = this.series, e = this.pointer, g = this.legend, w = this.isDirtyLegend, h, l, t = this.hasCartesianSeries, B = this.isDirtyBox, k, G = this.renderer, v = G.isHidden(), q = []; this.setResponsive && this.setResponsive(!1); a.setAnimation(c, this); v && this.temporaryDisplay(); this.layOutTitles(); for (c = f.length; c--; ) if (k = f[c], k.options.stacking && (h = !0, k.isDirty)) { l = !0; break } if (l) for (c = f.length; c--; ) k = f[c], k.options.stacking && (k.isDirty =
!0); n(f, function (a) { a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), w = !0); a.isDirtyData && b(a, "updatedData") }); w && g.options.enabled && (g.render(), this.isDirtyLegend = !1); h && this.getStacks(); t && n(d, function (a) { a.updateNames(); a.setScale() }); this.getMargins(); t && (n(d, function (a) { a.isDirty && (B = !0) }), n(d, function (a) { var c = a.min + "," + a.max; a.extKey !== c && (a.extKey = c, q.push(function () { b(a, "afterSetExtremes", u(a.eventArgs, a.getExtremes())); delete a.eventArgs })); (B || h) && a.redraw() }));
    B && this.drawChartBox(); b(this, "predraw"); n(f, function (a) { (B || a.isDirty) && a.visible && a.redraw(); a.isDirtyData = !1 }); e && e.reset(!0); G.draw(); b(this, "redraw"); b(this, "render"); v && this.temporaryDisplay(!0); n(q, function (a) { a.call() })
}, get: function (a) { function b(b) { return b.id === a || b.options && b.options.id === a } var c, d = this.series, f; c = g(this.axes, b) || g(this.series, b); for (f = 0; !c && f < d.length; f++) c = g(d[f].points || [], b); return c }, getAxes: function () {
    var a = this, c = this.options, d = c.xAxis = t(c.xAxis || {}), c = c.yAxis =
t(c.yAxis || {}); b(this, "getAxes"); n(d, function (a, b) { a.index = b; a.isX = !0 }); n(c, function (a, b) { a.index = b }); d = d.concat(c); n(d, function (b) { new k(a, b) }); b(this, "afterGetAxes")
}, getSelectedPoints: function () { var a = []; n(this.series, function (b) { a = a.concat(c(b.data || [], function (a) { return a.selected })) }); return a }, getSelectedSeries: function () { return c(this.series, function (a) { return a.selected }) }, setTitle: function (a, b, c) {
    var d = this, f = d.options, e; e = f.title = E({ style: { color: "#333333", fontSize: f.isStock ? "16px" : "18px"} },
f.title, a); f = f.subtitle = E({ style: { color: "#666666"} }, f.subtitle, b); n([["title", a, e], ["subtitle", b, f]], function (a, b) { var c = a[0], f = d[c], e = a[1]; a = a[2]; f && e && (d[c] = f = f.destroy()); a && !f && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), d[c].update = function (a) { d.setTitle(!b && a, b && a) }, d[c].css(a.style)) }); d.layOutTitles(c)
}, layOutTitles: function (a) {
    var b = 0, c, d = this.renderer, f = this.spacingBox; n(["title", "subtitle"], function (a) {
        var c = this[a],
e = this.options[a]; a = "title" === a ? -3 : e.verticalAlign ? 0 : b + 2; var g; c && (g = e.style.fontSize, g = d.fontMetrics(g, c).b, c.css({ width: (e.width || f.width + e.widthAdjust) + "px" }).align(u({ y: a + g }, e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = Math.ceil(b + c.getBBox(e.useHTML).height)))
    }, this); c = this.titleOffset !== b; this.titleOffset = b; !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw())
}, getChartSize: function () {
    var b = this.options.chart, c = b.width, b =
b.height, d = this.renderTo; f(c) || (this.containerWidth = a.getStyle(d, "width")); f(b) || (this.containerHeight = a.getStyle(d, "height")); this.chartWidth = Math.max(0, c || this.containerWidth || 600); this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
}, temporaryDisplay: function (b) {
    var c = this.renderTo; if (b) for (; c && c.style; ) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (e.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
    else for (; c && c.style; ) { e.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, e.body.appendChild(c)); if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = { display: c.style.display, height: c.style.height, overflow: c.style.overflow }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important"); c = c.parentNode; if (c === e.body) break } 
}, setClassName: function (a) {
    this.container.className = "highcharts-container " +
(a || "")
}, getContainer: function () {
    var c, d = this.options, f = d.chart, g, w; c = this.renderTo; var t = a.uniqueKey(), k; c || (this.renderTo = c = f.renderTo); J(c) && (this.renderTo = c = e.getElementById(c)); c || a.error(13, !0); g = B(m(c, "data-highcharts-chart")); l(g) && h[g] && h[g].hasRendered && h[g].destroy(); m(c, "data-highcharts-chart", this.index); c.innerHTML = ""; f.skipClone || c.offsetWidth || this.temporaryDisplay(); this.getChartSize(); g = this.chartWidth; w = this.chartHeight; k = u({ position: "relative", overflow: "hidden", width: g + "px", height: w +
"px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
    }, f.style); this.container = c = r("div", { id: t }, k, c); this._cursor = c.style.cursor; this.renderer = new (a[f.renderer] || a.Renderer)(c, g, w, null, f.forExport, d.exporting && d.exporting.allowHTML); this.setClassName(f.className); this.renderer.setStyle(f.style); this.renderer.chartIndex = this.index; b(this, "afterGetContainer")
}, getMargins: function (a) {
    var b = this.spacing, c = this.margin, d = this.titleOffset; this.resetMargins(); d &&
!f(c[0]) && (this.plotTop = Math.max(this.plotTop, d + this.options.title.margin + b[0])); this.legend && this.legend.display && this.legend.adjustMargins(c, b); this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value); this.adjustPlotArea && this.adjustPlotArea(); a || this.getAxisMargins()
}, getAxisMargins: function () {
    var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin; a.hasCartesianSeries && n(a.axes, function (a) { a.visible && a.getOffset() }); n(M, function (d, e) { f(c[e]) || (a[d] += b[e]) });
    a.setChartSize()
}, reflow: function (b) { var c = this, d = c.options.chart, g = c.renderTo, w = f(d.width) && f(d.height), h = d.width || a.getStyle(g, "width"), d = d.height || a.getStyle(g, "height"), g = b ? b.target : N; if (!w && !c.isPrinting && h && d && (g === N || g === e)) { if (h !== c.containerWidth || d !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = v(function () { c.container && c.setSize(void 0, void 0, !1) }, b ? 100 : 0); c.containerWidth = h; c.containerHeight = d } }, setReflow: function (a) {
    var b = this; !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow &&
(this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = A(N, "resize", function (a) { b.reflow(a) }), A(this, "destroy", this.unbindReflow))
}, setSize: function (c, f, e) {
    var g = this, w = g.renderer; g.isResizing += 1; a.setAnimation(e, g); g.oldChartHeight = g.chartHeight; g.oldChartWidth = g.chartWidth; void 0 !== c && (g.options.chart.width = c); void 0 !== f && (g.options.chart.height = f); g.getChartSize(); c = w.globalAnimation; (c ? C : d)(g.container, { width: g.chartWidth + "px", height: g.chartHeight + "px" }, c); g.setChartSize(!0); w.setSize(g.chartWidth,
g.chartHeight, e); n(g.axes, function (a) { a.isDirty = !0; a.setScale() }); g.isDirtyLegend = !0; g.isDirtyBox = !0; g.layOutTitles(); g.getMargins(); g.redraw(e); g.oldChartHeight = null; b(g, "resize"); v(function () { g && b(g, "endResize", null, function () { --g.isResizing }) }, z(c).duration)
}, setChartSize: function (a) {
    var c = this.inverted, d = this.renderer, f = this.chartWidth, g = this.chartHeight, e = this.options.chart, w = this.spacing, h = this.clipOffset, l, t, B, k; this.plotLeft = l = Math.round(this.plotLeft); this.plotTop = t = Math.round(this.plotTop);
    this.plotWidth = B = Math.max(0, Math.round(f - l - this.marginRight)); this.plotHeight = k = Math.max(0, Math.round(g - t - this.marginBottom)); this.plotSizeX = c ? k : B; this.plotSizeY = c ? B : k; this.plotBorderWidth = e.plotBorderWidth || 0; this.spacingBox = d.spacingBox = { x: w[3], y: w[0], width: f - w[3] - w[1], height: g - w[0] - w[2] }; this.plotBox = d.plotBox = { x: l, y: t, width: B, height: k }; f = 2 * Math.floor(this.plotBorderWidth / 2); c = Math.ceil(Math.max(f, h[3]) / 2); d = Math.ceil(Math.max(f, h[0]) / 2); this.clipBox = { x: c, y: d, width: Math.floor(this.plotSizeX - Math.max(f,
h[1]) / 2 - c), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, h[2]) / 2 - d))
    }; a || n(this.axes, function (a) { a.setAxisSize(); a.setAxisTranslation() }); b(this, "afterSetChartSize", { skipAxes: a })
}, resetMargins: function () { var a = this, b = a.options.chart; n(["margin", "spacing"], function (c) { var d = b[c], f = y(d) ? d : [d, d, d, d]; n(["Top", "Right", "Bottom", "Left"], function (d, g) { a[c][g] = G(b[c + d], f[g]) }) }); n(M, function (b, c) { a[b] = G(a.margin[c], a.spacing[c]) }); a.axisOffset = [0, 0, 0, 0]; a.clipOffset = [0, 0, 0, 0] }, drawChartBox: function () {
    var a =
this.options.chart, c = this.renderer, d = this.chartWidth, f = this.chartHeight, g = this.chartBackground, e = this.plotBackground, w = this.plotBorder, h, l = this.plotBGImage, t = a.backgroundColor, B = a.plotBackgroundColor, k = a.plotBackgroundImage, n, G = this.plotLeft, v = this.plotTop, q = this.plotWidth, u = this.plotHeight, p = this.plotBox, m = this.clipRect, H = this.clipBox, E = "animate"; g || (this.chartBackground = g = c.rect().addClass("highcharts-background").add(), E = "attr"); h = a.borderWidth || 0; n = h + (a.shadow ? 8 : 0); t = { fill: t || "none" }; if (h || g["stroke-width"]) t.stroke =
a.borderColor, t["stroke-width"] = h; g.attr(t).shadow(a.shadow); g[E]({ x: n / 2, y: n / 2, width: d - n - h % 2, height: f - n - h % 2, r: a.borderRadius }); E = "animate"; e || (E = "attr", this.plotBackground = e = c.rect().addClass("highcharts-plot-background").add()); e[E](p); e.attr({ fill: B || "none" }).shadow(a.plotShadow); k && (l ? l.animate(p) : this.plotBGImage = c.image(k, G, v, q, u).add()); m ? m.animate({ width: H.width, height: H.height }) : this.clipRect = c.clipRect(H); E = "animate"; w || (E = "attr", this.plotBorder = w = c.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
    w.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" }); w[E](w.crisp({ x: G, y: v, width: q, height: u }, -w.strokeWidth())); this.isDirtyBox = !1; b(this, "afterDrawChartBox")
}, propFromSeries: function () { var a = this, b = a.options.chart, c, d = a.options.series, f, g; n(["inverted", "angular", "polar"], function (e) { c = H[b.type || b.defaultSeriesType]; g = b[e] || c && c.prototype[e]; for (f = d && d.length; !g && f--; ) (c = H[d[f].type]) && c.prototype[e] && (g = !0); a[e] = g }) }, linkSeries: function () {
    var a = this, c = a.series; n(c, function (a) {
        a.linkedSeries.length =
0
    }); n(c, function (b) { var c = b.options.linkedTo; J(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible)) }); b(this, "afterLinkSeries")
}, renderSeries: function () { n(this.series, function (a) { a.translate(); a.render() }) }, renderLabels: function () {
    var a = this, b = a.options.labels; b.items && n(b.items, function (c) {
        var d = u(b.style, c.style), f = B(d.left) + a.plotLeft, g = B(d.top) + a.plotTop + 12; delete d.left; delete d.top;
        a.renderer.text(c.html, f, g).attr({ zIndex: 2 }).css(d).add()
    })
}, render: function () {
    var a = this.axes, b = this.renderer, c = this.options, d, f, g; this.setTitle(); this.legend = new q(this, c.legend); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); c = this.plotWidth; d = this.plotHeight = Math.max(this.plotHeight - 21, 0); n(a, function (a) { a.setScale() }); this.getAxisMargins(); f = 1.1 < c / this.plotWidth; g = 1.05 < d / this.plotHeight; if (f || g) n(a, function (a) { (a.horiz && f || !a.horiz && g) && a.setTickInterval(!0) }), this.getMargins();
    this.drawChartBox(); this.hasCartesianSeries && n(a, function (a) { a.visible && a.render() }); this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add()); this.renderSeries(); this.renderLabels(); this.addCredits(); this.setResponsive && this.setResponsive(); this.hasRendered = !0
}, addCredits: function (a) {
    var b = this; a = E(!0, this.options.credits, a); a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
        a.href &&
(N.location.href = a.href)
    }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position), this.credits.update = function (a) { b.credits = b.credits.destroy(); b.addCredits(a) })
}, destroy: function () {
    var c = this, d = c.axes, f = c.series, g = c.container, e, w = g && g.parentNode; b(c, "destroy"); c.renderer.forExport ? a.erase(h, c) : h[c.index] = void 0; a.chartCount--; c.renderTo.removeAttribute("data-highcharts-chart"); L(c); for (e = d.length; e--; ) d[e] = d[e].destroy(); this.scroller && this.scroller.destroy && this.scroller.destroy();
    for (e = f.length; e--; ) f[e] = f[e].destroy(); n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) { var b = c[a]; b && b.destroy && (c[a] = b.destroy()) }); g && (g.innerHTML = "", L(g), w && p(g)); D(c, function (a, b) { delete c[b] })
}, firstRender: function () {
    var a = this, c = a.options; if (!a.isReadyToRender || a.isReadyToRender()) {
        a.getContainer(); a.resetMargins(); a.setChartSize(); a.propFromSeries(); a.getAxes();
        n(c.series || [], function (b) { a.initSeries(b) }); a.linkSeries(); b(a, "beforeRender"); w && (a.pointer = new w(a, c)); a.render(); if (!a.renderer.imgCount && a.onload) a.onload(); a.temporaryDisplay(!0)
    } 
}, onload: function () { n([this.callback].concat(this.callbacks), function (a) { a && void 0 !== this.index && a.apply(this, [this]) }, this); b(this, "load"); b(this, "render"); f(this.index) && this.setReflow(this.options.chart.reflow); this.onload = null } 
})
    })(I); (function (a) {
        var A, C = a.each, z = a.extend, m = a.erase, e = a.fireEvent, k = a.format, r = a.isArray,
x = a.isNumber, p = a.pick, h = a.removeEvent; a.Point = A = function () { }; a.Point.prototype = { init: function (a, f, h) { this.series = a; this.color = a.color; this.applyOptions(f, h); a.options.colorByPoint ? (f = a.options.colors || a.chart.options.colors, this.color = this.color || f[a.colorCounter], f = f.length, h = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : h = a.colorIndex; this.colorIndex = p(this.colorIndex, h); a.chart.pointCount++; e(this, "afterInit"); return this }, applyOptions: function (a, f) {
    var d = this.series,
e = d.options.pointValKey || d.pointValKey; a = A.prototype.optionsToObject.call(this, a); z(this, a); this.options = this.options ? z(this.options, a) : a; a.group && delete this.group; e && (this.y = this[e]); this.isNull = p(this.isValid && !this.isValid(), null === this.x || !x(this.y, !0)); this.selected && (this.state = "select"); "name" in this && void 0 === f && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this)); void 0 === this.x && d && (this.x = void 0 === f ? d.autoIncrement(this) : f); return this
}, setNestedProperty: function (d, f, e) {
    e = e.split(".");
    a.reduce(e, function (d, g, b, c) { d[g] = c.length - 1 === b ? f : a.isObject(d[g], !0) ? d[g] : {}; return d[g] }, d); return d
}, optionsToObject: function (d) {
    var f = {}, e = this.series, h = e.options.keys, g = h || e.pointArrayMap || ["y"], b = g.length, c = 0, l = 0; if (x(d) || null === d) f[g[0]] = d; else if (r(d)) for (!h && d.length > b && (e = typeof d[0], "string" === e ? f.name = d[0] : "number" === e && (f.x = d[0]), c++); l < b; ) h && void 0 === d[c] || (0 < g[l].indexOf(".") ? a.Point.prototype.setNestedProperty(f, d[c], g[l]) : f[g[l]] = d[c]), c++, l++; else "object" === typeof d && (f = d, d.dataLabels &&
(e._hasPointLabels = !0), d.marker && (e._hasPointMarkers = !0)); return f
}, getClassName: function () { return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "") }, getZone: function () {
    var a = this.series,
f = a.zones, a = a.zoneAxis || "y", e = 0, h; for (h = f[e]; this[a] >= h.value; ) h = f[++e]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor; return h
}, destroy: function () {
    var a = this.series.chart, f = a.hoverPoints, e; a.pointCount--; f && (this.setState(), m(f, this), f.length || (a.hoverPoints = null)); if (this === a.hoverPoint) this.onMouseOut(); if (this.graphic || this.dataLabel) h(this), this.destroyElements(); this.legendItem && a.legend.destroyItem(this); for (e in this) this[e] =
null
}, destroyElements: function () { for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], f, e = 6; e--; ) f = a[e], this[f] && (this[f] = this[f].destroy()) }, getLabelConfig: function () { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal} }, tooltipFormatter: function (a) {
    var d = this.series, e = d.tooltipOptions, h = p(e.valueDecimals, ""), g = e.valuePrefix || "", b =
e.valueSuffix || ""; C(d.pointArrayMap || ["y"], function (c) { c = "{point." + c; if (g || b) a = a.replace(RegExp(c + "}", "g"), g + c + "}" + b); a = a.replace(RegExp(c + "}", "g"), c + ":,." + h + "f}") }); return k(a, { point: this, series: this.series }, d.chart.time)
}, firePointEvent: function (a, f, h) { var d = this, g = this.series.options; (g.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(); "click" === a && g.allowPointSelect && (h = function (a) { d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey) }); e(this, a, f, h) },
    visible: !0
}
    })(I); (function (a) {
        var A = a.addEvent, C = a.animObject, z = a.arrayMax, m = a.arrayMin, e = a.correctFloat, k = a.defaultOptions, r = a.defaultPlotOptions, x = a.defined, p = a.each, h = a.erase, d = a.extend, f = a.fireEvent, n = a.grep, u = a.isArray, g = a.isNumber, b = a.isString, c = a.merge, l = a.objectEach, y = a.pick, J = a.removeEvent, q = a.splat, M = a.SVGElement, E = a.syncTimeout, D = a.win; a.Series = a.seriesType("line", null, { lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff",
            enabledThreshold: 2, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}}
        }, point: { events: {} }, dataLabels: { align: "center", formatter: function () { return null === this.y ? "" : a.numberFormat(this.y, -1) }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0, padding: 5 }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 },
            hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25} }, select: { marker: {}}
        }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"
        }, { isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function (a, b) {
            var c = this, e, g = a.series, h; c.chart = a; c.options = b = c.setOptions(b); c.linkedSeries = []; c.bindAxes(); d(c, { name: b.name, state: "", visible: !1 !== b.visible, selected: !0 ===
b.selected
            }); e = b.events; l(e, function (a, b) { A(c, b, a) }); if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0; c.getColor(); c.getSymbol(); p(c.parallelArrays, function (a) { c[a + "Data"] = [] }); c.setData(b.data, !1); c.isCartesian && (a.hasCartesianSeries = !0); g.length && (h = g[g.length - 1]); c._i = y(h && h._i, -1) + 1; a.orderSeries(this.insert(g)); f(this, "afterInit")
        }, insert: function (a) {
            var b = this.options.index, c; if (g(b)) {
                for (c = a.length; c--; ) if (b >= y(a[c].options.index, a[c]._i)) {
                    a.splice(c +
1, 0, this); break
                } -1 === c && a.unshift(this); c += 1
            } else a.push(this); return y(c, a.length - 1)
        }, bindAxes: function () { var b = this, c = b.options, d = b.chart, f; p(b.axisTypes || [], function (e) { p(d[e], function (a) { f = a.options; if (c[e] === f.index || void 0 !== c[e] && c[e] === f.id || void 0 === c[e] && 0 === f.index) b.insert(a.series), b[e] = a, a.isDirty = !0 }); b[e] || b.optionalAxis === e || a.error(18, !0) }) }, updateParallelArrays: function (a, b) {
            var c = a.series, d = arguments, f = g(b) ? function (d) {
                var f = "y" === d && c.toYData ? c.toYData(a) : a[d]; c[d + "Data"][b] =
f
            } : function (a) { Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2)) }; p(c.parallelArrays, f)
        }, autoIncrement: function () { var a = this.options, b = this.xIncrement, c, d = a.pointIntervalUnit, f = this.chart.time, b = y(b, a.pointStart, 0); this.pointInterval = c = y(this.pointInterval, a.pointInterval, 1); d && (a = new f.Date(b), "day" === d ? f.set("Date", a, f.get("Date", a) + c) : "month" === d ? f.set("Month", a, f.get("Month", a) + c) : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + c), c = a.getTime() - b); this.xIncrement = b + c; return b },
            setOptions: function (a) {
                var b = this.chart, d = b.options, e = d.plotOptions, g = (b.userOptions || {}).plotOptions || {}, h = e[this.type]; this.userOptions = a; b = c(h, e.series, a); this.tooltipOptions = c(k.tooltip, k.plotOptions.series && k.plotOptions.series.tooltip, k.plotOptions[this.type].tooltip, d.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, a.tooltip); this.stickyTracking = y(a.stickyTracking, g[this.type] && g[this.type].stickyTracking, g.series && g.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ?
!0 : b.stickyTracking); null === h.marker && delete b.marker; this.zoneAxis = b.zoneAxis; a = this.zones = (b.zones || []).slice(); !b.negativeColor && !b.negativeFillColor || b.zones || a.push({ value: b[this.zoneAxis + "Threshold"] || b.threshold || 0, className: "highcharts-negative", color: b.negativeColor, fillColor: b.negativeFillColor }); a.length && x(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor }); f(this, "afterSetOptions", { options: b }); return b
            }, getName: function () {
                return this.name || "Series " + (this.index +
1)
            }, getCyclic: function (a, b, c) { var d, f = this.chart, e = this.userOptions, g = a + "Index", h = a + "Counter", l = c ? c.length : y(f.options.chart[a + "Count"], f[a + "Count"]); b || (d = y(e[g], e["_" + g]), x(d) || (f.series.length || (f[h] = 0), e["_" + g] = d = f[h] % l, f[h] += 1), c && (b = c[d])); void 0 !== d && (this[g] = d); this[a] = b }, getColor: function () { this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || r[this.type].color, this.chart.options.colors) }, getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol,
this.chart.options.symbols)
            }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, updateData: function (b) {
                var c = this.options, d = this.points, f = [], e, h, l, w = this.requireSorting; p(b, function (b) { var h; h = a.defined(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b).x; g(h) && (h = a.inArray(h, this.xData, l), -1 === h ? f.push(b) : b !== c.data[h] ? (d[h].update(b, !1, null, !1), d[h].touched = !0, w && (l = h)) : d[h] && (d[h].touched = !0), e = !0) }, this); if (e) for (b = d.length; b--; ) h = d[b], h.touched || h.remove(!1), h.touched = !1; else if (b.length ===
d.length) p(b, function (a, b) { d[b].update && a !== c.data[b] && d[b].update(a, !1, null, !1) }); else return !1; p(f, function (a) { this.addPoint(a, !1) }, this); return !0
            }, setData: function (c, d, f, e) {
                var h = this, l = h.points, w = l && l.length || 0, k, q = h.options, n = h.chart, B = null, G = h.xAxis, m = q.turboThreshold, E = this.xData, D = this.yData, r = (k = h.pointArrayMap) && k.length, L; c = c || []; k = c.length; d = y(d, !0); !1 !== e && k && w && !h.cropped && !h.hasGroupedData && h.visible && (L = this.updateData(c)); if (!L) {
                    h.xIncrement = null; h.colorCounter = 0; p(this.parallelArrays,
function (a) { h[a + "Data"].length = 0 }); if (m && k > m) { for (f = 0; null === B && f < k; ) B = c[f], f++; if (g(B)) for (f = 0; f < k; f++) E[f] = this.autoIncrement(), D[f] = c[f]; else if (u(B)) if (r) for (f = 0; f < k; f++) B = c[f], E[f] = B[0], D[f] = B.slice(1, r + 1); else for (f = 0; f < k; f++) B = c[f], E[f] = B[0], D[f] = B[1]; else a.error(12) } else for (f = 0; f < k; f++) void 0 !== c[f] && (B = { series: h }, h.pointClass.prototype.applyOptions.apply(B, [c[f]]), h.updateParallelArrays(B, f)); D && b(D[0]) && a.error(14, !0); h.data = []; h.options.data = h.userOptions.data = c; for (f = w; f--; ) l[f] && l[f].destroy &&
l[f].destroy(); G && (G.minRange = G.userMinRange); h.isDirty = n.isDirtyBox = !0; h.isDirtyData = !!l; f = !1
                } "point" === q.legendType && (this.processData(), this.generatePoints()); d && n.redraw(f)
            }, processData: function (b) {
                var c = this.xData, d = this.yData, f = c.length, e; e = 0; var g, h, l = this.xAxis, w, k = this.options; w = k.cropThreshold; var q = this.getExtremesFromAll || k.getExtremesFromAll, n = this.isCartesian, k = l && l.val2lin, p = l && l.isLog, m = this.requireSorting, u, E; if (n && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !b) return !1; l && (b =
l.getExtremes(), u = b.min, E = b.max); if (n && this.sorted && !q && (!w || f > w || this.forceCrop)) if (c[f - 1] < u || c[0] > E) c = [], d = []; else if (c[0] < u || c[f - 1] > E) e = this.cropData(this.xData, this.yData, u, E), c = e.xData, d = e.yData, e = e.start, g = !0; for (w = c.length || 1; --w; ) f = p ? k(c[w]) - k(c[w - 1]) : c[w] - c[w - 1], 0 < f && (void 0 === h || f < h) ? h = f : 0 > f && m && (a.error(15), m = !1); this.cropped = g; this.cropStart = e; this.processedXData = c; this.processedYData = d; this.closestPointRange = h
            }, cropData: function (a, b, c, d, f) {
                var e = a.length, g = 0, h = e, l; f = y(f, this.cropShoulder,
1); for (l = 0; l < e; l++) if (a[l] >= c) { g = Math.max(0, l - f); break } for (c = l; c < e; c++) if (a[c] > d) { h = c + f; break } return { xData: a.slice(g, h), yData: b.slice(g, h), start: g, end: h}
            }, generatePoints: function () {
                var a = this.options, b = a.data, c = this.data, d, f = this.processedXData, e = this.processedYData, g = this.pointClass, h = f.length, l = this.cropStart || 0, k, n = this.hasGroupedData, a = a.keys, p, u = [], m; c || n || (c = [], c.length = b.length, c = this.data = c); a && n && (this.options.keys = !1); for (m = 0; m < h; m++) k = l + m, n ? (p = (new g).init(this, [f[m]].concat(q(e[m]))),
p.dataGroup = this.groupMap[m]) : (p = c[k]) || void 0 === b[k] || (c[k] = p = (new g).init(this, b[k], f[m])), p && (p.index = k, u[m] = p); this.options.keys = a; if (c && (h !== (d = c.length) || n)) for (m = 0; m < d; m++) m !== l || n || (m += h), c[m] && (c[m].destroyElements(), c[m].plotX = void 0); this.data = c; this.points = u
            }, getExtremes: function (a) {
                var b = this.yAxis, c = this.processedXData, d, f = [], e = 0; d = this.xAxis.getExtremes(); var h = d.min, l = d.max, w, k, q = this.requireSorting ? 1 : 0, n, p; a = a || this.stackedYData || this.processedYData || []; d = a.length; for (p = 0; p < d; p++) if (k =
c[p], n = a[p], w = (g(n, !0) || u(n)) && (!b.positiveValuesOnly || n.length || 0 < n), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[p + q] || k) >= h && (c[p - q] || k) <= l, w && k) if (w = n.length) for (; w--; ) "number" === typeof n[w] && (f[e++] = n[w]); else f[e++] = n; this.dataMin = m(f); this.dataMax = z(f)
            }, translate: function () {
                this.processedXData || this.processData(); this.generatePoints(); var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, h = this.yAxis, l = this.points, k = l.length, q = !!this.modifyValue, n = a.pointPlacement,
m = "between" === n || g(n), p = a.threshold, u = a.startFromThreshold ? p : 0, E, D, r, J, M = Number.MAX_VALUE; "between" === n && (n = .5); g(n) && (n *= y(a.pointRange || c.pointRange)); for (a = 0; a < k; a++) {
                    var z = l[a], C = z.x, A = z.y; D = z.low; var I = b && h.stacks[(this.negStacks && A < (u ? 0 : p) ? "-" : "") + this.stackKey], V; h.positiveValuesOnly && null !== A && 0 >= A && (z.isNull = !0); z.plotX = E = e(Math.min(Math.max(-1E5, c.translate(C, 0, 0, 0, 1, n, "flags" === this.type)), 1E5)); b && this.visible && !z.isNull && I && I[C] && (J = this.getStackIndicator(J, C, this.index), V = I[C], A = V.points[J.key],
D = A[0], A = A[1], D === u && J.key === I[C].base && (D = y(g(p) && p, h.min)), h.positiveValuesOnly && 0 >= D && (D = null), z.total = z.stackTotal = V.total, z.percentage = V.total && z.y / V.total * 100, z.stackY = A, V.setOffset(this.pointXOffset || 0, this.barW || 0)); z.yBottom = x(D) ? Math.min(Math.max(-1E5, h.translate(D, 0, 1, 0, 1)), 1E5) : null; q && (A = this.modifyValue(A, z)); z.plotY = D = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, h.translate(A, 0, 1, 0, 1)), 1E5) : void 0; z.isInside = void 0 !== D && 0 <= D && D <= h.len && 0 <= E && E <= c.len; z.clientX = m ? e(c.translate(C,
0, 0, 0, 1, n)) : E; z.negative = z.y < (p || 0); z.category = d && void 0 !== d[z.x] ? d[z.x] : z.x; z.isNull || (void 0 !== r && (M = Math.min(M, Math.abs(E - r))), r = E); z.zone = this.zones.length && z.getZone()
                } this.closestPointRangePx = M; f(this, "afterTranslate")
            }, getValidPoints: function (a, b) { var c = this.chart; return n(a || this.points || [], function (a) { return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull }) }, setClip: function (a) {
                var b = this.chart, c = this.options, d = b.renderer, f = b.inverted, e = this.clipBox, g = e || b.clipBox, h = this.sharedClipKey ||
["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(), l = b[h], w = b[h + "m"]; l || (a && (g.width = 0, f && (g.x = b.plotSizeX), b[h + "m"] = w = d.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[h] = l = d.clipRect(g), l.count = { length: 0 }); a && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1); !1 !== c.clip && (this.group.clip(a || e ? l : b.clipRect), this.markerGroup.clip(w), this.sharedClipKey = h); a || (l.count[this.index] && (delete l.count[this.index], --l.count.length),
0 === l.count.length && h && b[h] && (e || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            }, animate: function (a) { var b = this.chart, c = C(this.options.animation), d; a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({ width: b.plotSizeX, x: 0 }, c), b[d + "m"] && b[d + "m"].animate({ width: b.plotSizeX + 99, x: 0 }, c), this.animate = null) }, afterAnimate: function () { this.setClip(); f(this, "afterAnimate"); this.finishedAnimating = !0 }, drawPoints: function () {
                var a = this.points, b = this.chart, c, d, f, e, g = this.options.marker,
h, l, k, n = this[this.specialGroup] || this.markerGroup, q, p = y(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold * g.radius); if (!1 !== g.enabled || this._hasPointMarkers) for (c = 0; c < a.length; c++) d = a[c], e = d.graphic, h = d.marker || {}, l = !!d.marker, f = p && void 0 === h.enabled || h.enabled, k = d.isInside, f && !d.isNull ? (f = y(h.symbol, this.symbol), q = this.markerAttribs(d, d.selected && "select"), e ? e[k ? "show" : "hide"](!0).animate(q) : k && (0 < q.width || d.hasImage) && (d.graphic = e = b.renderer.symbol(f, q.x, q.y, q.width,
q.height, l ? h : g).add(n)), e && e.attr(this.pointAttribs(d, d.selected && "select")), e && e.addClass(d.getClassName(), !0)) : e && (d.graphic = e.destroy())
            }, markerAttribs: function (a, b) { var c = this.options.marker, d = a.marker || {}, f = d.symbol || c.symbol, e = y(d.radius, c.radius); b && (c = c.states[b], b = d.states && d.states[b], e = y(b && b.radius, c && c.radius, e + (c && c.radiusPlus || 0))); a.hasImage = f && 0 === f.indexOf("url"); a.hasImage && (e = 0); a = { x: Math.floor(a.plotX) - e, y: a.plotY - e }; e && (a.width = a.height = 2 * e); return a }, pointAttribs: function (a,
b) { var c = this.options.marker, d = a && a.options, f = d && d.marker || {}, e = this.color, g = d && d.color, h = a && a.color, d = y(f.lineWidth, c.lineWidth); a = a && a.zone && a.zone.color; e = g || a || h || e; a = f.fillColor || c.fillColor || e; e = f.lineColor || c.lineColor || e; b && (c = c.states[b], b = f.states && f.states[b] || {}, d = y(b.lineWidth, c.lineWidth, d + y(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, e = b.lineColor || c.lineColor || e); return { stroke: e, "stroke-width": d, fill: a} }, destroy: function () {
    var b = this, c = b.chart, d = /AppleWebKit\/533/.test(D.navigator.userAgent),
e, g, k = b.data || [], q, n; f(b, "destroy"); J(b); p(b.axisTypes || [], function (a) { (n = b[a]) && n.series && (h(n.series, b), n.isDirty = n.forceRedraw = !0) }); b.legendItem && b.chart.legend.destroyItem(b); for (g = k.length; g--; ) (q = k[g]) && q.destroy && q.destroy(); b.points = null; a.clearTimeout(b.animationTimeout); l(b, function (a, b) { a instanceof M && !a.survive && (e = d && "group" === b ? "hide" : "destroy", a[e]()) }); c.hoverSeries === b && (c.hoverSeries = null); h(c.series, b); c.orderSeries(); l(b, function (a, c) { delete b[c] })
}, getGraphPath: function (a, b,
c) {
    var d = this, f = d.options, e = f.step, g, h = [], l = [], k; a = a || d.points; (g = a.reversed) && a.reverse(); (e = { right: 1, center: 2}[e] || e && 3) && g && (e = 4 - e); !f.connectNulls || b || c || (a = this.getValidPoints(a)); p(a, function (g, n) {
        var q = g.plotX, w = g.plotY, t = a[n - 1]; (g.leftCliff || t && t.rightCliff) && !c && (k = !0); g.isNull && !x(b) && 0 < n ? k = !f.connectNulls : g.isNull && !b ? k = !0 : (0 === n || k ? n = ["M", g.plotX, g.plotY] : d.getPointSpline ? n = d.getPointSpline(a, g, n) : e ? (n = 1 === e ? ["L", t.plotX, w] : 2 === e ? ["L", (t.plotX + q) / 2, t.plotY, "L", (t.plotX + q) / 2, w] : ["L", q,
t.plotY], n.push("L", q, w)) : n = ["L", q, w], l.push(g.x), e && (l.push(g.x), 2 === e && l.push(g.x)), h.push.apply(h, n), k = !1)
    }); h.xMap = l; return d.graphPath = h
}, drawGraph: function () {
    var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this), d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]], d = a.getZonesGraphs(d); p(d, function (d, f) {
        var e = d[0], g = a[e]; g ? (g.endX = a.preventGraphAnimation ? null : c.xMap, g.animate({ d: c })) : c.length && (a[e] = a.chart.renderer.path(c).addClass(d[1]).attr({ zIndex: 1 }).add(a.group),
g = { stroke: d[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, d[3] ? g.dashstyle = d[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), g = a[e].attr(g).shadow(2 > f && b.shadow)); g && (g.startX = c.xMap, g.isArea = c.isArea)
    })
}, getZonesGraphs: function (a) { p(this.zones, function (b, c) { a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || this.color, b.dashStyle || this.options.dashStyle]) }, this); return a }, applyZones: function () {
    var a = this,
b = this.chart, c = b.renderer, d = this.zones, f, e, g = this.clips || [], h, l = this.graph, k = this.area, n = Math.max(b.chartWidth, b.chartHeight), q = this[(this.zoneAxis || "y") + "Axis"], m, u, E = b.inverted, D, r, x, J, M = !1; d.length && (l || k) && q && void 0 !== q.min && (u = q.reversed, D = q.horiz, l && !this.showLine && l.hide(), k && k.hide(), m = q.getExtremes(), p(d, function (d, w) {
    f = u ? D ? b.plotWidth : 0 : D ? 0 : q.toPixels(m.min); f = Math.min(Math.max(y(e, f), 0), n); e = Math.min(Math.max(Math.round(q.toPixels(y(d.value, m.max), !0)), 0), n); M && (f = e = q.toPixels(m.max));
    r = Math.abs(f - e); x = Math.min(f, e); J = Math.max(f, e); q.isXAxis ? (h = { x: E ? J : x, y: 0, width: r, height: n }, D || (h.x = b.plotHeight - h.x)) : (h = { x: 0, y: E ? J : x, width: n, height: r }, D && (h.y = b.plotWidth - h.y)); E && c.isVML && (h = q.isXAxis ? { x: 0, y: u ? x : J, height: h.width, width: b.chartWidth} : { x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight }); g[w] ? g[w].animate(h) : (g[w] = c.clipRect(h), l && a["zone-graph-" + w].clip(g[w]), k && a["zone-area-" + w].clip(g[w])); M = d.value > m.max; a.resetZones && 0 === e && (e = void 0)
}), this.clips = g)
}, invertGroups: function (a) {
    function b() {
        p(["group",
"markerGroup"], function (b) { c[b] && (d.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a)) })
    } var c = this, d = c.chart, f; c.xAxis && (f = A(d, "resize", b), A(c, "destroy", f), b(a), c.invertGroups = b)
}, plotGroup: function (a, b, c, d, f) {
    var e = this[a], g = !e; g && (this[a] = e = this.chart.renderer.g().attr({ zIndex: d || .1 }).add(f)); e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (x(this.colorIndex) ? "highcharts-color-" +
this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0); e.attr({ visibility: c })[g ? "attr" : "animate"](this.getPlotBox()); return e
}, getPlotBox: function () { var a = this.chart, b = this.xAxis, c = this.yAxis; a.inverted && (b = c, c = this.xAxis); return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1} }, render: function () {
    var a = this, b = a.chart, c, d = a.options, e = !!a.animate && b.renderer.isSVG && C(d.animation).duration, g = a.visible ? "inherit" :
"hidden", h = d.zIndex, l = a.hasRendered, k = b.seriesGroup, q = b.inverted; c = a.plotGroup("group", "series", g, h, k); a.markerGroup = a.plotGroup("markerGroup", "markers", g, h, k); e && a.animate(!0); c.inverted = a.isCartesian ? q : !1; a.drawGraph && (a.drawGraph(), a.applyZones()); a.drawDataLabels && a.drawDataLabels(); a.visible && a.drawPoints(); a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker(); a.invertGroups(q); !1 === d.clip || a.sharedClipKey || l || c.clip(b.clipRect); e && a.animate(); l || (a.animationTimeout = E(function () { a.afterAnimate() },
e)); a.isDirty = !1; a.hasRendered = !0; f(a, "afterRender")
}, redraw: function () { var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, d = this.xAxis, f = this.yAxis; c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: y(d && d.left, a.plotLeft), translateY: y(f && f.top, a.plotTop) })); this.translate(); this.render(); b && delete this.kdTree }, kdAxisArray: ["clientX", "plotY"], searchPoint: function (a, b) {
    var c = this.xAxis, d = this.yAxis, f = this.chart.inverted; return this.searchKDTree({ clientX: f ?
c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: f ? d.len - a.chartX + d.pos : a.chartY - d.pos
    }, b)
}, buildKDTree: function () {
    function a(c, d, f) { var e, g; if (g = c && c.length) return e = b.kdAxisArray[d % f], c.sort(function (a, b) { return a[e] - b[e] }), g = Math.floor(g / 2), { point: c[g], left: a(c.slice(0, g), d + 1, f), right: a(c.slice(g + 1), d + 1, f)} } this.buildingKdTree = !0; var b = this, c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1; delete b.kdTree; E(function () { b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c); b.buildingKdTree = !1 }, b.options.kdNow ?
0 : 1)
}, searchKDTree: function (a, b) {
    function c(a, b, h, l) { var k = b.point, q = d.kdAxisArray[h % l], n, m, p = k; m = x(a[f]) && x(k[f]) ? Math.pow(a[f] - k[f], 2) : null; n = x(a[e]) && x(k[e]) ? Math.pow(a[e] - k[e], 2) : null; n = (m || 0) + (n || 0); k.dist = x(n) ? Math.sqrt(n) : Number.MAX_VALUE; k.distX = x(m) ? Math.sqrt(m) : Number.MAX_VALUE; q = a[q] - k[q]; n = 0 > q ? "left" : "right"; m = 0 > q ? "right" : "left"; b[n] && (n = c(a, b[n], h + 1, l), p = n[g] < p[g] ? n : k); b[m] && Math.sqrt(q * q) < p[g] && (a = c(a, b[m], h + 1, l), p = a[g] < p[g] ? a : p); return p } var d = this, f = this.kdAxisArray[0], e = this.kdAxisArray[1],
g = b ? "distX" : "dist"; b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1; this.kdTree || this.buildingKdTree || this.buildKDTree(); if (this.kdTree) return c(a, this.kdTree, b, b)
} 
        })
    })(I); (function (a) {
        var A = a.addEvent, C = a.animate, z = a.Axis, m = a.createElement, e = a.css, k = a.defined, r = a.each, x = a.erase, p = a.extend, h = a.fireEvent, d = a.inArray, f = a.isNumber, n = a.isObject, u = a.isArray, g = a.merge, b = a.objectEach, c = a.pick, l = a.Point, y = a.Series, J = a.seriesTypes, q = a.setAnimation, M = a.splat; p(a.Chart.prototype, { addSeries: function (a, b, d) {
            var f,
e = this; a && (b = c(b, !0), h(e, "addSeries", { options: a }, function () { f = e.initSeries(a); e.isDirtyLegend = !0; e.linkSeries(); h(e, "afterAddSeries"); b && e.redraw(d) })); return f
        }, addAxis: function (a, b, d, f) { var e = b ? "xAxis" : "yAxis", h = this.options; a = g(a, { index: this[e].length, isX: b }); b = new z(this, a); h[e] = M(h[e] || {}); h[e].push(a); c(d, !0) && this.redraw(f); return b }, showLoading: function (a) {
            var b = this, c = b.options, d = b.loadingDiv, f = c.loading, g = function () {
                d && e(d, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px",
                    height: b.plotHeight + "px"
                })
            }; d || (b.loadingDiv = d = m("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = m("span", { className: "highcharts-loading-inner" }, null, d), A(b, "redraw", g)); d.className = "highcharts-loading"; b.loadingSpan.innerHTML = a || c.lang.loading; e(d, p(f.style, { zIndex: 10 })); e(b.loadingSpan, f.labelStyle); b.loadingShown || (e(d, { opacity: 0, display: "" }), C(d, { opacity: f.style.opacity || .5 }, { duration: f.showDuration || 0 })); b.loadingShown = !0; g()
        }, hideLoading: function () {
            var a =
this.options, b = this.loadingDiv; b && (b.className = "highcharts-loading highcharts-loading-hidden", C(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function () { e(b, { display: "none" }) } })); this.loadingShown = !1
        }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "), update: function (a, e, l, n) {
                var q = this, m = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" }, p = a.chart, u, w, E = []; h(q, "update", { options: a }); if (p) {
                    g(!0, q.options.chart, p); "className" in p && q.setClassName(p.className); "reflow" in p && q.setReflow(p.reflow); if ("inverted" in p || "polar" in p) q.propFromSeries(), u = !0; "alignTicks" in p && (u = !0); b(p, function (a, b) {
                        -1 !== d("chart." +
b, q.propsRequireUpdateSeries) && (w = !0); -1 !== d(b, q.propsRequireDirtyBox) && (q.isDirtyBox = !0)
                    }); "style" in p && q.renderer.setStyle(p.style)
                } a.colors && (this.options.colors = a.colors); a.plotOptions && g(!0, this.options.plotOptions, a.plotOptions); b(a, function (a, b) { if (q[b] && "function" === typeof q[b].update) q[b].update(a, !1); else if ("function" === typeof q[m[b]]) q[m[b]](a); "chart" !== b && -1 !== d(b, q.propsRequireUpdateSeries) && (w = !0) }); r("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (r(M(a[b]),
function (a, c) { (c = k(a.id) && q.get(a.id) || q[b][c]) && c.coll === b && (c.update(a, !1), l && (c.touched = !0)); if (!c && l) if ("series" === b) q.addSeries(a, !1).touched = !0; else if ("xAxis" === b || "yAxis" === b) q.addAxis(a, "xAxis" === b, !1).touched = !0 }), l && r(q[b], function (a) { a.touched ? delete a.touched : E.push(a) }))
                }); r(E, function (a) { a.remove(!1) }); u && r(q.axes, function (a) { a.update({}, !1) }); w && r(q.series, function (a) { a.update({}, !1) }); a.loading && g(!0, q.options.loading, a.loading); u = p && p.width; p = p && p.height; f(u) && u !== q.chartWidth ||
f(p) && p !== q.chartHeight ? q.setSize(u, p, n) : c(e, !0) && q.redraw(n)
            }, setSubtitle: function (a) { this.setTitle(void 0, a) } 
        }); p(l.prototype, { update: function (a, b, d, f) {
            function e() {
                g.applyOptions(a); null === g.y && l && (g.graphic = l.destroy()); n(a, !0) && (l && l.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = l.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy())); k = g.index; h.updateParallelArrays(g, k); p.data[k] = n(p.data[k], !0) || n(a, !0) ? g.options :
c(a, p.data[k]); h.isDirty = h.isDirtyData = !0; !h.fixedBox && h.hasCartesianSeries && (q.isDirtyBox = !0); "point" === p.legendType && (q.isDirtyLegend = !0); b && q.redraw(d)
            } var g = this, h = g.series, l = g.graphic, k, q = h.chart, p = h.options; b = c(b, !0); !1 === f ? e() : g.firePointEvent("update", { options: a }, e)
        }, remove: function (a, b) { this.series.removePoint(d(this, this.series.data), a, b) } 
        }); p(y.prototype, { addPoint: function (a, b, d, f) {
            var e = this.options, g = this.data, h = this.chart, l = this.xAxis, l = l && l.hasNames && l.names, k = e.data, q, n, p = this.xData,
m, u; b = c(b, !0); q = { series: this }; this.pointClass.prototype.applyOptions.apply(q, [a]); u = q.x; m = p.length; if (this.requireSorting && u < p[m - 1]) for (n = !0; m && p[m - 1] > u; ) m--; this.updateParallelArrays(q, "splice", m, 0, 0); this.updateParallelArrays(q, m); l && q.name && (l[u] = q.name); k.splice(m, 0, a); n && (this.data.splice(m, 0, null), this.processData()); "point" === e.legendType && this.generatePoints(); d && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(q, "shift"), k.shift())); this.isDirtyData = this.isDirty = !0;
            b && h.redraw(f)
        }, removePoint: function (a, b, d) { var f = this, e = f.data, g = e[a], h = f.points, l = f.chart, k = function () { h && h.length === e.length && h.splice(a, 1); e.splice(a, 1); f.options.data.splice(a, 1); f.updateParallelArrays(g || { series: f }, "splice", a, 1); g && g.destroy(); f.isDirty = !0; f.isDirtyData = !0; b && l.redraw() }; q(d, l); b = c(b, !0); g ? g.firePointEvent("remove", null, k) : k() }, remove: function (a, b, d) {
            function f() { e.destroy(); g.isDirtyLegend = g.isDirtyBox = !0; g.linkSeries(); c(a, !0) && g.redraw(b) } var e = this, g = e.chart; !1 !== d ? h(e,
"remove", null, f) : f()
        }, update: function (b, f) {
            var e = this, l = e.chart, k = e.userOptions, q = e.oldType || e.type, n = b.type || k.type || l.options.chart.type, m = J[q].prototype, u, y = ["group", "markerGroup", "dataLabelsGroup"], E = ["navigatorSeries", "baseSeries"], D = e.finishedAnimating && { animation: !1 }, x = ["data", "name", "turboThreshold"], M = a.keys(b), z = 0 < M.length; r(M, function (a) { -1 === d(a, x) && (z = !1) }); if (z) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1); else {
                E = y.concat(E); r(E, function (a) { E[a] = e[a]; delete e[a] });
                b = g(k, D, { index: e.index, pointStart: c(k.pointStart, e.xData[0]) }, { data: e.options.data }, b); e.remove(!1, null, !1); for (u in m) e[u] = void 0; J[n || q] ? p(e, J[n || q].prototype) : a.error(17, !0); r(E, function (a) { e[a] = E[a] }); e.init(l, b); b.zIndex !== k.zIndex && r(y, function (a) { e[a] && e[a].attr({ zIndex: b.zIndex }) }); e.oldType = q; l.linkSeries()
            } h(this, "afterUpdate"); c(f, !0) && l.redraw(!1)
        }, setName: function (a) { this.name = this.options.name = this.userOptions.name = a; this.chart.isDirtyLegend = !0 } 
        }); p(z.prototype, { update: function (a, b) {
            var d =
this.chart; a = g(this.userOptions, a); d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a); this.destroy(!0); this.init(d, p(a, { events: void 0 })); d.isDirtyBox = !0; c(b, !0) && d.redraw()
        }, remove: function (a) {
            for (var b = this.chart, d = this.coll, f = this.series, e = f.length; e--; ) f[e] && f[e].remove(!1); x(b.axes, this); x(b[d], this); u(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d]; r(b[d], function (a, b) { a.options.index = a.userOptions.index = b }); this.destroy();
            b.isDirtyBox = !0; c(a, !0) && b.redraw()
        }, setTitle: function (a, b) { this.update({ title: a }, b) }, setCategories: function (a, b) { this.update({ categories: a }, b) } 
        })
    })(I); (function (a) {
        var A = a.animObject, C = a.color, z = a.each, m = a.extend, e = a.isNumber, k = a.merge, r = a.pick, x = a.Series, p = a.seriesType, h = a.svg; p("column", "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000"} },
            dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff"
        }, { cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () { x.prototype.init.apply(this, arguments); var a = this, f = a.chart; f.hasRendered && z(f.series, function (d) { d.type === a.type && (d.isDirty = !0) }) }, getColumnMetrics: function () {
            var a = this, f = a.options, e = a.xAxis, h = a.yAxis, g = e.reversed, b, c = {}, l = 0; !1 === f.grouping ?
l = 1 : z(a.chart.series, function (d) { var f = d.options, e = d.yAxis, g; d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || h.len !== e.len || h.pos !== e.pos || (f.stacking ? (b = d.stackKey, void 0 === c[b] && (c[b] = l++), g = c[b]) : !1 !== f.grouping && (g = l++), d.columnIndex = g) }); var k = Math.min(Math.abs(e.transA) * (e.ordinalSlope || f.pointRange || e.closestPointRange || e.tickInterval || 1), e.len), p = k * f.groupPadding, q = (k - 2 * p) / (l || 1), f = Math.min(f.maxPointWidth || e.len, r(f.pointWidth, q * (1 - 2 * f.pointPadding))); a.columnMetrics =
{ width: f, offset: (q - f) / 2 + (p + ((a.columnIndex || 0) + (g ? 1 : 0)) * q - k / 2) * (g ? -1 : 1) }; return a.columnMetrics
        }, crispCol: function (a, f, e, h) { var d = this.chart, b = this.borderWidth, c = -(b % 2 ? .5 : 0), b = b % 2 ? .5 : 1; d.inverted && d.renderer.isVML && (b += 1); this.options.crisp && (e = Math.round(a + e) + c, a = Math.round(a) + c, e -= a); h = Math.round(f + h) + b; c = .5 >= Math.abs(f) && .5 < h; f = Math.round(f) + b; h -= f; c && h && (--f, h += 1); return { x: a, y: f, width: e, height: h} }, translate: function () {
            var a = this, f = a.chart, e = a.options, h = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
h = a.borderWidth = r(e.borderWidth, h ? 0 : 1), g = a.yAxis, b = e.threshold, c = a.translatedThreshold = g.getThreshold(b), l = r(e.minPointLength, 5), k = a.getColumnMetrics(), p = k.width, q = a.barW = Math.max(p, 1 + 2 * h), m = a.pointXOffset = k.offset; f.inverted && (c -= .5); e.pointPadding && (q = Math.ceil(q)); x.prototype.translate.apply(a); z(a.points, function (d) {
    var e = r(d.yBottom, c), h = 999 + Math.abs(e), h = Math.min(Math.max(-h, d.plotY), g.len + h), k = d.plotX + m, n = q, u = Math.min(h, e), y, t = Math.max(h, e) - u; l && Math.abs(t) < l && (t = l, y = !g.reversed && !d.negative ||
g.reversed && d.negative, d.y === b && a.dataMax <= b && g.min < b && (y = !y), u = Math.abs(u - c) > l ? e - l : c - (y ? l : 0)); d.barX = k; d.pointWidth = p; d.tooltipPos = f.inverted ? [g.len + g.pos - f.plotLeft - h, a.xAxis.len - k - n / 2, t] : [k + n / 2, h + g.pos - f.plotTop, t]; d.shapeType = "rect"; d.shapeArgs = a.crispCol.apply(a, d.isNull ? [k, c, n, 0] : [k, u, n, t])
})
        }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") }, pointAttribs: function (a, f) {
            var d = this.options,
e, g = this.pointAttrToOptions || {}; e = g.stroke || "borderColor"; var b = g["stroke-width"] || "borderWidth", c = a && a.color || this.color, h = a && a[e] || d[e] || this.color || c, p = a && a[b] || d[b] || this[b] || 0, g = d.dashStyle; a && this.zones.length && (c = a.getZone(), c = a.options.color || c && c.color || this.color); f && (a = k(d.states[f], a.options.states && a.options.states[f] || {}), f = a.brightness, c = a.color || void 0 !== f && C(c).brighten(a.brightness).get() || c, h = a[e] || h, p = a[b] || p, g = a.dashStyle || g); e = { fill: c, stroke: h, "stroke-width": p }; g && (e.dashstyle =
g); return e
        }, drawPoints: function () { var a = this, f = this.chart, h = a.options, p = f.renderer, g = h.animationLimit || 250, b; z(a.points, function (c) { var d = c.graphic, n = d && f.pointCount < g ? "animate" : "attr"; if (e(c.plotY) && null !== c.y) { b = c.shapeArgs; if (d) d[n](k(b)); else c.graphic = d = p[c.shapeType](b).add(c.group || a.group); h.borderRadius && d.attr({ r: h.borderRadius }); d[n](a.pointAttribs(c, c.selected && "select")).shadow(h.shadow, null, h.stacking && !h.borderRadius); d.addClass(c.getClassName(), !0) } else d && (c.graphic = d.destroy()) }) },
            animate: function (a) { var d = this, e = this.yAxis, k = d.options, g = this.chart.inverted, b = {}, c = g ? "translateX" : "translateY", l; h && (a ? (b.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(k.threshold))), g ? b.translateX = a - e.len : b.translateY = a, d.group.attr(b)) : (l = d.group.attr(c), d.group.animate({ scaleY: 1 }, m(A(d.options.animation), { step: function (a, f) { b[c] = l + f.pos * (e.pos - l); d.group.attr(b) } })), d.animate = null)) }, remove: function () {
                var a = this, f = a.chart; f.hasRendered && z(f.series, function (d) {
                    d.type === a.type &&
(d.isDirty = !0)
                }); x.prototype.remove.apply(a, arguments)
            } 
        })
    })(I); (function (a) {
        var A = a.Series; a = a.seriesType; a("scatter", "line", { lineWidth: 0, findNearestPointBy: "xy", marker: { enabled: !0 }, tooltip: { headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"} }, { sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group",
"markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () { this.options.lineWidth && A.prototype.drawGraph.call(this) } 
        })
    })(I); (function (a) {
        var A = a.addEvent, C = a.arrayMax, z = a.defined, m = a.each, e = a.extend, k = a.format, r = a.map, x = a.merge, p = a.noop, h = a.pick, d = a.relativeLength, f = a.Series, n = a.seriesTypes, u = a.some, g = a.stableSort; a.distribute = function (b, c, d) {
            function f(a, b) { return a.target - b.target } var e, l = !0, k = b, n = [], p; p = 0; var w = k.reducedLen || c; for (e = b.length; e--; ) p += b[e].size; if (p > w) {
                g(b, function (a,
b) { return (b.rank || 0) - (a.rank || 0) }); for (p = e = 0; p <= w; ) p += b[e].size, e++; n = b.splice(e - 1, b.length)
            } g(b, f); for (b = r(b, function (a) { return { size: a.size, targets: [a.target], align: h(a.align, .5)} }); l; ) {
                for (e = b.length; e--; ) l = b[e], p = (Math.min.apply(0, l.targets) + Math.max.apply(0, l.targets)) / 2, l.pos = Math.min(Math.max(0, p - l.size * l.align), c - l.size); e = b.length; for (l = !1; e--; ) 0 < e && b[e - 1].pos + b[e - 1].size > b[e].pos && (b[e - 1].size += b[e].size, b[e - 1].targets = b[e - 1].targets.concat(b[e].targets), b[e - 1].align = .5, b[e - 1].pos + b[e - 1].size >
c && (b[e - 1].pos = c - b[e - 1].size), b.splice(e, 1), l = !0)
            } k.push.apply(k, n); e = 0; u(b, function (b) { var f = 0; if (u(b.targets, function () { k[e].pos = b.pos + f; if (Math.abs(k[e].pos - k[e].target) > d) return m(k.slice(0, e + 1), function (a) { delete a.pos }), k.reducedLen = (k.reducedLen || c) - .1 * c, k.reducedLen > .1 * c && a.distribute(k, c, d), !0; f += k[e].size; e++ })) return !0 }); g(k, f)
        }; f.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter; return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" ===
b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            } var c = this, d = c.chart, e = c.options, f = e.dataLabels, g = c.points, p, n, u = c.hasRendered || 0, w, r, B = h(f.defer, !!e.animation), C = d.renderer; if (f.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(f), r = c.plotGroup("dataLabelsGroup", "data-labels", B && !u ? "hidden" : "visible", f.zIndex || 6), B && (r.attr({ opacity: +u }), u || A(c, "afterAnimate", function () { c.visible && r.show(!0); r[e.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 }) })),
n = f, m(g, function (g) {
    var l, q = g.dataLabel, m, u, y = g.connector, E = !q, D; p = g.dlOptions || g.options && g.options.dataLabels; (l = h(p && p.enabled, n.enabled) && !g.isNull) && (l = !0 === b(g, p || f)); l && (f = x(n, p), m = g.getLabelConfig(), D = f[g.formatPrefix + "Format"] || f.format, w = z(D) ? k(D, m, d.time) : (f[g.formatPrefix + "Formatter"] || f.formatter).call(m, f), D = f.style, m = f.rotation, D.color = h(f.color, D.color, c.color, "#000000"), "contrast" === D.color && (g.contrastColor = C.getContrast(g.color || c.color), D.color = f.inside || 0 > h(g.labelDistance, f.distance) ||
e.stacking ? g.contrastColor : "#000000"), e.cursor && (D.cursor = e.cursor), u = { fill: f.backgroundColor, stroke: f.borderColor, "stroke-width": f.borderWidth, r: f.borderRadius || 0, rotation: m, padding: f.padding, zIndex: 1 }, a.objectEach(u, function (a, b) { void 0 === a && delete u[b] })); !q || l && z(w) ? l && z(w) && (q ? u.text = w : (q = g.dataLabel = m ? C.text(w, 0, -9999).addClass("highcharts-data-label") : C.label(w, 0, -9999, f.shape, null, null, f.useHTML, null, "data-label"), q.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (f.className || "") +
(f.useHTML ? "highcharts-tracker" : ""))), q.attr(u), q.css(D).shadow(f.shadow), q.added || q.add(r), c.alignDataLabel(g, q, f, null, E)) : (g.dataLabel = q = q.destroy(), y && (g.connector = y.destroy()))
}); a.fireEvent(this, "afterDrawDataLabels")
        }; f.prototype.alignDataLabel = function (a, c, d, f, g) {
            var b = this.chart, l = b.inverted, k = h(a.dlBox && a.dlBox.centerX, a.plotX, -9999), p = h(a.plotY, -9999), n = c.getBBox(), m, u = d.rotation, r = d.align, y = this.visible && (a.series.forceDL || b.isInsidePlot(k, Math.round(p), l) || f && b.isInsidePlot(k, l ? f.x + 1 :
f.y + f.height - 1, l)), t = "justify" === h(d.overflow, "justify"); if (y && (m = d.style.fontSize, m = b.renderer.fontMetrics(m, c).b, f = e({ x: l ? this.yAxis.len - p : k, y: Math.round(l ? this.xAxis.len - k : p), width: 0, height: 0 }, f), e(d, { width: n.width, height: n.height }), u ? (t = !1, k = b.renderer.rotCorr(m, u), k = { x: f.x + d.x + f.width / 2 + k.x, y: f.y + d.y + { top: 0, middle: .5, bottom: 1}[d.verticalAlign] * f.height }, c[g ? "attr" : "animate"](k).attr({ align: r }), p = (u + 720) % 360, p = 180 < p && 360 > p, "left" === r ? k.y -= p ? n.height : 0 : "center" === r ? (k.x -= n.width / 2, k.y -= n.height /
2) : "right" === r && (k.x -= n.width, k.y -= p ? 0 : n.height), c.placed = !0, c.alignAttr = k) : (c.align(d, null, f), k = c.alignAttr), t ? a.isLabelJustified = this.justifyDataLabel(c, d, k, n, f, g) : h(d.crop, !0) && (y = b.isInsidePlot(k.x, k.y) && b.isInsidePlot(k.x + n.width, k.y + n.height)), d.shape && !u)) c[g ? "attr" : "animate"]({ anchorX: l ? b.plotWidth - a.plotY : a.plotX, anchorY: l ? b.plotHeight - a.plotX : a.plotY }); y || (c.attr({ y: -9999 }), c.placed = !1)
        }; f.prototype.justifyDataLabel = function (a, c, d, f, e, g) {
            var b = this.chart, h = c.align, l = c.verticalAlign, k, q,
p = a.box ? 0 : a.padding || 0; k = d.x + p; 0 > k && ("right" === h ? c.align = "left" : c.x = -k, q = !0); k = d.x + f.width - p; k > b.plotWidth && ("left" === h ? c.align = "right" : c.x = b.plotWidth - k, q = !0); k = d.y + p; 0 > k && ("bottom" === l ? c.verticalAlign = "top" : c.y = -k, q = !0); k = d.y + f.height - p; k > b.plotHeight && ("top" === l ? c.verticalAlign = "bottom" : c.y = b.plotHeight - k, q = !0); q && (a.placed = !g, a.align(c, null, e)); return q
        }; n.pie && (n.pie.prototype.drawDataLabels = function () {
            var b = this, c = b.data, d, e = b.chart, g = b.options.dataLabels, k = h(g.connectorPadding, 10), p = h(g.connectorWidth,
1), n = e.plotWidth, u = e.plotHeight, w = Math.round(e.chartWidth / 3), r, x = b.center, A = x[2] / 2, H = x[1], t, v, N, P, K = [[], []], I, O, F, R, S = [0, 0, 0, 0]; b.visible && (g.enabled || b._hasPointLabels) && (m(c, function (a) { a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1) }), f.prototype.drawDataLabels.apply(b), m(c, function (a) {
    a.dataLabel && a.visible && (K[a.half].push(a), a.dataLabel._pos = null, !z(g.style.width) && !z(a.options.dataLabels && a.options.dataLabels.style &&
a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > w && (a.dataLabel.css({ width: .7 * w }), a.dataLabel.shortened = !0))
}), m(K, function (c, f) {
    var l, q, p = c.length, w = [], r; if (p) for (b.sortByAngle(c, f - .5), 0 < b.maxLabelDistance && (l = Math.max(0, H - A - b.maxLabelDistance), q = Math.min(H + A + b.maxLabelDistance, e.plotHeight), m(c, function (a) {
        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, H - A - a.labelDistance), a.bottom = Math.min(H + A + a.labelDistance, e.plotHeight), r = a.dataLabel.getBBox().height || 21, a.positionsIndex = w.push({ target: a.labelPos[1] -
a.top + r / 2, size: r, rank: a.y
        }) - 1)
    }), l = q + r - l, a.distribute(w, l, l / 5)), R = 0; R < p; R++) d = c[R], q = d.positionsIndex, N = d.labelPos, t = d.dataLabel, F = !1 === d.visible ? "hidden" : "inherit", O = l = N[1], w && z(w[q]) && (void 0 === w[q].pos ? F = "hidden" : (P = w[q].size, O = d.top + w[q].pos)), delete d.positionIndex, I = g.justify ? x[0] + (f ? -1 : 1) * (A + d.labelDistance) : b.getX(O < d.top + 2 || O > d.bottom - 2 ? l : O, f, d), t._attr = { visibility: F, align: N[6] }, t._pos = { x: I + g.x + ({ left: k, right: -k}[N[6]] || 0), y: O + g.y - 10 }, N.x = I, N.y = O, h(g.crop, !0) && (v = t.getBBox().width, l = null,
I - v < k && 1 === f ? (l = Math.round(v - I + k), S[3] = Math.max(l, S[3])) : I + v > n - k && 0 === f && (l = Math.round(I + v - n + k), S[1] = Math.max(l, S[1])), 0 > O - P / 2 ? S[0] = Math.max(Math.round(-O + P / 2), S[0]) : O + P / 2 > u && (S[2] = Math.max(Math.round(O + P / 2 - u), S[2])), t.sideOverflow = l)
}), 0 === C(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(), p && m(this.points, function (a) {
    var c; r = a.connector; if ((t = a.dataLabel) && t._pos && a.visible && 0 < a.labelDistance) {
        F = t._attr.visibility; if (c = !r) a.connector = r = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" +
a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), r.attr({ "stroke-width": p, stroke: g.connectorColor || a.color || "#666666" }); r[c ? "attr" : "animate"]({ d: b.connectorPath(a.labelPos) }); r.attr("visibility", F)
    } else r && (a.connector = r.destroy())
}))
        }, n.pie.prototype.connectorPath = function (a) {
            var b = a.x, d = a.y; return h(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), d, "C", b, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L",
a[4], a[5]]
        }, n.pie.prototype.placeDataLabels = function () { m(this.points, function (a) { var b = a.dataLabel; b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({ width: b._attr.width + "px", textOverflow: this.options.dataLabels.style.textOverflow || "ellipsis" }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({ y: -9999 })) }, this) }, n.pie.prototype.alignDataLabel = p, n.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center, f =
this.options, e = f.center, g = f.minSize || 80, h, k = null !== f.size; k || (null !== e[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), g) : (h = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), g) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(d(f.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0); return k
        }); n.column && (n.column.prototype.alignDataLabel = function (a, c, d, e, g) {
            var b = this.chart.inverted,
k = a.series, l = a.dlBox || a.shapeArgs, p = h(a.below, a.plotY > h(this.translatedThreshold, k.yAxis.len)), n = h(d.inside, !!this.options.stacking); l && (e = x(l), 0 > e.y && (e.height += e.y, e.y = 0), l = e.y + e.height - k.yAxis.len, 0 < l && (e.height -= l), b && (e = { x: k.yAxis.len - e.y - e.height, y: k.xAxis.len - e.x - e.width, width: e.height, height: e.width }), n || (b ? (e.x += p ? 0 : e.width, e.width = 0) : (e.y += p ? e.height : 0, e.height = 0))); d.align = h(d.align, !b || n ? "center" : p ? "right" : "left"); d.verticalAlign = h(d.verticalAlign, b || n ? "middle" : p ? "top" : "bottom"); f.prototype.alignDataLabel.call(this,
a, c, d, e, g); a.isLabelJustified && a.contrastColor && a.dataLabel.css({ color: a.contrastColor })
        })
    })(I); (function (a) {
        var A = a.Chart, C = a.each, z = a.objectEach, m = a.pick; a = a.addEvent; a(A, "render", function () {
            var a = []; C(this.labelCollectors || [], function (e) { a = a.concat(e()) }); C(this.yAxis || [], function (e) { e.options.stackLabels && !e.options.stackLabels.allowOverlap && z(e.stacks, function (e) { z(e, function (e) { a.push(e.label) }) }) }); C(this.series || [], function (e) {
                var k = e.options.dataLabels, x = e.dataLabelCollections || ["dataLabel"];
                (k.enabled || e._hasPointLabels) && !k.allowOverlap && e.visible && C(x, function (k) { C(e.points, function (e) { e[k] && (e[k].labelrank = m(e.labelrank, e.shapeArgs && e.shapeArgs.height), a.push(e[k])) }) })
            }); this.hideOverlappingLabels(a)
        }); A.prototype.hideOverlappingLabels = function (a) {
            var e = a.length, m, x, p, h, d, f, n, u, g, b = function (a, b, d, e, f, g, h, k) { return !(f > a + d || f + h < a || g > b + e || g + k < b) }; for (x = 0; x < e; x++) if (m = a[x]) m.oldOpacity = m.opacity, m.newOpacity = 1, m.width || (p = m.getBBox(), m.width = p.width, m.height = p.height); a.sort(function (a,
b) { return (b.labelrank || 0) - (a.labelrank || 0) }); for (x = 0; x < e; x++) for (p = a[x], m = x + 1; m < e; ++m) if (h = a[m], p && h && p !== h && p.placed && h.placed && 0 !== p.newOpacity && 0 !== h.newOpacity && (d = p.alignAttr, f = h.alignAttr, n = p.parentGroup, u = h.parentGroup, g = 2 * (p.box ? 0 : p.padding || 0), d = b(d.x + n.translateX, d.y + n.translateY, p.width - g, p.height - g, f.x + u.translateX, f.y + u.translateY, h.width - g, h.height - g))) (p.labelrank < h.labelrank ? p : h).newOpacity = 0; C(a, function (a) {
    var b, c; a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () { a.hide() },
a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
})
        } 
    })(I); (function (a) {
        var A = a.addEvent, C = a.Chart, z = a.createElement, m = a.css, e = a.defaultOptions, k = a.defaultPlotOptions, r = a.each, x = a.extend, p = a.fireEvent, h = a.hasTouch, d = a.inArray, f = a.isObject, n = a.Legend, u = a.merge, g = a.pick, b = a.Point, c = a.Series, l = a.seriesTypes, y = a.svg, J; J = a.TrackerMixin = { drawTrackerPoint: function () {
            var a = this, b = a.chart.pointer, c = function (a) { var c = b.getPointFromEvent(a); void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a)) };
            r(a.points, function (a) { a.graphic && (a.graphic.element.point = a); a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a) }); a._hasTracking || (r(a.trackerGroups, function (d) { if (a[d]) { a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) { b.onTrackerMouseOut(a) }); if (h) a[d].on("touchstart", c); a.options.cursor && a[d].css(m).css({ cursor: a.options.cursor }) } }), a._hasTracking = !0); p(this, "afterDrawTracker")
        }, drawTrackerGraph: function () {
            var a = this, b = a.options, c =
b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, k = f.renderer, l = f.options.tooltip.snap, n = a.tracker, m, u = function () { if (f.hoverSeries !== a) a.onMouseOver() }, x = "rgba(192,192,192," + (y ? .0001 : .002) + ")"; if (e && !c) for (m = e + 1; m--; ) "M" === d[m] && d.splice(m + 1, 0, d[m + 1] - l, d[m + 2], "L"), (m && "M" === d[m] || m === e) && d.splice(m, 0, "L", d[m - 2] + l, d[m - 1]); n ? n.attr({ d: d }) : a.graph && (a.tracker = k.path(d).attr({ "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: x, fill: c ? x : "none",
    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * l), zIndex: 2
}).add(a.group), r([a.tracker, a.markerGroup], function (a) { a.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function (a) { g.onTrackerMouseOut(a) }); b.cursor && a.css({ cursor: b.cursor }); if (h) a.on("touchstart", u) })); p(this, "afterDrawTracker")
        } 
        }; l.column && (l.column.prototype.drawTracker = J.drawTrackerPoint); l.pie && (l.pie.prototype.drawTracker = J.drawTrackerPoint); l.scatter && (l.scatter.prototype.drawTracker = J.drawTrackerPoint); x(n.prototype,
{ setItemEvents: function (a, c, d) {
    var e = this, f = e.chart.renderer.boxWrapper, g = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active"; (d ? c : a.legendGroup).on("mouseover", function () { a.setState("hover"); f.addClass(g); c.css(e.options.itemHoverStyle) }).on("mouseout", function () { c.css(u(a.visible ? e.itemStyle : e.itemHiddenStyle)); f.removeClass(g); a.setState() }).on("click", function (b) {
        var c = function () { a.setVisible && a.setVisible() }; f.removeClass(g); b = { browserEvent: b }; a.firePointEvent ? a.firePointEvent("legendItemClick",
b, c) : p(a, "legendItemClick", b, c)
    })
}, createCheckboxForItem: function (a) { a.checkbox = z("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container); A(a.checkbox, "click", function (b) { p(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () { a.select() }) }) } 
}); e.legend.itemStyle.cursor = "pointer"; x(C.prototype, { showResetZoom: function () {
    function a() { b.zoomOut() } var b = this, c = e.lang, d = b.options.chart.resetZoomButton, f = d.theme, g = f.states,
h = "chart" === d.relativeTo ? null : "plotBox"; p(this, "beforeShowResetZoom", null, function () { b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, f, g && g.hover).attr({ align: d.position.align, title: c.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(d.position, !1, h) })
}, zoomOut: function () { p(this, "selection", { resetSelection: !0 }, this.zoom) }, zoom: function (a) {
    var b, c = this.pointer, d = !1, e; !a || a.resetSelection ? (r(this.axes, function (a) { b = a.zoom() }), c.initiated = !1) : r(a.xAxis.concat(a.yAxis), function (a) {
        var e =
a.axis; c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
    }); e = this.resetZoomButton; d && !e ? this.showResetZoom() : !d && f(e) && (this.resetZoomButton = e.destroy()); b && this.redraw(g(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
}, pan: function (a, b) {
    var c = this, d = c.hoverPoints, e; d && r(d, function (a) { a.setState() }); r("xy" === b ? [1, 0] : [1], function (b) {
        b = c[b ? "xAxis" : "yAxis"][0]; var d = b.horiz, f = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d], h = (b.pointRange || 0) / 2,
k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1, l = b.getExtremes(), p = b.toValue(g - f, !0) + h * k, k = b.toValue(g + b.len - f, !0) - h * k, n = k < p, g = n ? k : p, p = n ? p : k, k = Math.min(l.dataMin, h ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)), h = Math.max(l.dataMax, h ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)), n = k - g; 0 < n && (p += n, g = k); n = p - h; 0 < n && (p = h, g -= n); b.series.length && g !== l.min && p !== l.max && (b.setExtremes(g, p, !1, !1, { trigger: "pan" }), e = !0); c[d] = f
    }); e && c.redraw(!1); m(c.container, { cursor: "move" })
} 
}); x(b.prototype,
{ select: function (a, b) { var c = this, e = c.series, f = e.chart; a = g(a, !c.selected); c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () { c.selected = c.options.selected = a; e.options.data[d(c, e.data)] = c.options; c.setState(a && "select"); b || r(f.getSelectedPoints(), function (a) { a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[d(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect")) }) }) }, onMouseOver: function (a) {
    var b = this.series.chart, c = b.pointer; a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this,
b.inverted); c.runPointActions(a, this)
}, onMouseOut: function () { var a = this.series.chart; this.firePointEvent("mouseOut"); r(a.hoverPoints || [], function (a) { a.setState() }); a.hoverPoints = a.hoverPoint = null }, importEvents: function () { if (!this.hasImportedEvents) { var b = this, c = u(b.series.options.point, b.options).events; b.events = c; a.objectEach(c, function (a, c) { A(b, c, a) }); this.hasImportedEvents = !0 } }, setState: function (a, b) {
    var c = Math.floor(this.plotX), d = this.plotY, e = this.series, f = e.options.states[a || "normal"] || {}, h =
k[e.type].marker && e.options.marker, l = h && !1 === h.enabled, n = h && h.states && h.states[a || "normal"] || {}, m = !1 === n.enabled, q = e.stateMarkerGraphic, u = this.marker || {}, r = e.chart, y = e.halo, z, A = h && e.markerAttribs; a = a || ""; if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (m || l && !1 === n.enabled) || a && u.states && u.states[a] && !1 === u.states[a].enabled)) {
        A && (z = e.markerAttribs(this, a)); if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" +
a), this.graphic.animate(e.pointAttribs(this, a), g(r.options.chart.animation, f.animation)), z && this.graphic.animate(z, g(r.options.chart.animation, n.animation, h.animation)), q && q.hide(); else {
            if (a && n) { h = u.symbol || e.symbol; q && q.currentSymbol !== h && (q = q.destroy()); if (q) q[b ? "animate" : "attr"]({ x: z.x, y: z.y }); else h && (e.stateMarkerGraphic = q = r.renderer.symbol(h, z.x, z.y, z.width, z.height).add(e.markerGroup), q.currentSymbol = h); q && q.attr(e.pointAttribs(this, a)) } q && (q[a && r.isInsidePlot(c, d, r.inverted) ? "show" : "hide"](),
q.element.point = this)
        } (c = f.halo) && c.size ? (y || (e.halo = y = r.renderer.path().add((this.graphic || q).parentGroup)), y.show()[b ? "animate" : "attr"]({ d: this.haloPath(c.size) }), y.attr({ "class": "highcharts-halo highcharts-color-" + g(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : "") }), y.point = this, y.attr(x({ fill: this.color || e.color, "fill-opacity": c.opacity, zIndex: -1 }, c.attributes))) : y && y.point && y.point.haloPath && y.animate({ d: y.point.haloPath(0) }, null, y.hide); this.state = a; p(this, "afterSetState")
    } 
},
    haloPath: function (a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a) } 
}); x(c.prototype, { onMouseOver: function () { var a = this.chart, b = a.hoverSeries; if (b && b !== this) b.onMouseOut(); this.options.events.mouseOver && p(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this }, onMouseOut: function () {
    var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint; b.hoverSeries = null; if (d) d.onMouseOut(); this && a.events.mouseOut && p(this, "mouseOut"); !c || this.stickyTracking ||
c.shared && !this.noSharedTooltip || c.hide(); this.setState()
}, setState: function (a) {
    var b = this, c = b.options, d = b.graph, e = c.states, f = c.lineWidth, c = 0; a = a || ""; if (b.state !== a && (r([b.group, b.markerGroup, b.dataLabelsGroup], function (c) { c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a)) }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle)) for (f = { "stroke-width": f }, d.animate(f, g(e[a || "normal"] && e[a || "normal"].animation,
b.chart.options.chart.animation)); b["zone-graph-" + c]; ) b["zone-graph-" + c].attr(f), c += 1
}, setVisible: function (a, b) {
    var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible; f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide"; r(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) { if (c[a]) c[a][f]() }); if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut(); e && d.legend.colorizeItem(c, a); c.isDirty = !0; c.options.stacking &&
r(d.series, function (a) { a.options.stacking && a.visible && (a.isDirty = !0) }); r(c.linkedSeries, function (b) { b.setVisible(a, !1) }); g && (d.isDirtyBox = !0); !1 !== b && d.redraw(); p(c, f)
}, show: function () { this.setVisible(!0) }, hide: function () { this.setVisible(!1) }, select: function (a) { this.selected = a = void 0 === a ? !this.selected : a; this.checkbox && (this.checkbox.checked = a); p(this, a ? "select" : "unselect") }, drawTracker: J.drawTrackerGraph
})
    })(I); (function (a) {
        var A = a.Chart, C = a.each, z = a.inArray, m = a.isArray, e = a.isObject, k = a.pick, r = a.splat;
        A.prototype.setResponsive = function (e) {
            var k = this.options.responsive, h = [], d = this.currentResponsive; k && k.rules && C(k.rules, function (d) { void 0 === d._id && (d._id = a.uniqueKey()); this.matchResponsiveRule(d, h, e) }, this); var f = a.merge.apply(0, a.map(h, function (d) { return a.find(k.rules, function (a) { return a._id === d }).chartOptions })), h = h.toString() || void 0; h !== (d && d.ruleIds) && (d && this.update(d.undoOptions, e), h ? (this.currentResponsive = { ruleIds: h, mergedOptions: f, undoOptions: this.currentOptions(f) }, this.update(f, e)) :
this.currentResponsive = void 0)
        }; A.prototype.matchResponsiveRule = function (a, e) { var h = a.condition; (h.callback || function () { return this.chartWidth <= k(h.maxWidth, Number.MAX_VALUE) && this.chartHeight <= k(h.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(h.minWidth, 0) && this.chartHeight >= k(h.minHeight, 0) }).call(this) && e.push(a._id) }; A.prototype.currentOptions = function (k) {
            function p(d, f, h, k) {
                var g; a.objectEach(d, function (a, c) {
                    if (!k && -1 < z(c, ["series", "xAxis", "yAxis"])) for (a = r(a), h[c] = [], g = 0; g < a.length; g++) f[c][g] &&
(h[c][g] = {}, p(a[g], f[c][g], h[c][g], k + 1)); else e(a) ? (h[c] = m(a) ? [] : {}, p(a, f[c] || {}, h[c], k + 1)) : h[c] = f[c] || null
                })
            } var h = {}; p(k, this.options, h, 0); return h
        } 
    })(I); (function (a) {
        var A = a.addEvent, C = a.Axis, z = a.each, m = a.pick; A(C, "getSeriesExtremes", function () { var a = []; this.isXAxis && (z(this.series, function (e, m) { e.useMapGeometry && (a[m] = e.xData, e.xData = []) }), this.seriesXData = a) }); A(C, "afterGetSeriesExtremes", function () {
            var a = this.seriesXData, k, r, x; this.isXAxis && (k = m(this.dataMin, Number.MAX_VALUE), r = m(this.dataMax,
-Number.MAX_VALUE), z(this.series, function (e, h) { e.useMapGeometry && (k = Math.min(k, m(e.minX, k)), r = Math.max(r, m(e.maxX, r)), e.xData = a[h], x = !0) }), x && (this.dataMin = k, this.dataMax = r), delete this.seriesXData)
        }); A(C, "afterSetAxisTranslation", function () {
            var a = this.chart, k; k = a.plotWidth / a.plotHeight; var a = a.xAxis[0], m; "yAxis" === this.coll && void 0 !== a.transA && z(this.series, function (a) { a.preserveAspectRatio && (m = !0) }); if (m && (this.transA = a.transA = Math.min(this.transA, a.transA), k /= (a.max - a.min) / (this.max - this.min),
k = 1 > k ? this : a, a = (k.max - k.min) * k.transA, k.pixelPadding = k.len - a, k.minPixelPadding = k.pixelPadding / 2, a = k.fixTo)) { a = a[1] - k.toValue(a[0], !0); a *= k.transA; if (Math.abs(a) > k.minPixelPadding || k.min === k.dataMin && k.max === k.dataMax) a = 0; k.minPixelPadding -= a } 
        }); A(C, "render", function () { this.fixTo = null })
    })(I); (function (a) {
        var A = a.addEvent, C = a.Axis, z = a.Chart, m = a.color, e, k = a.each, r = a.extend, x = a.isNumber, p = a.Legend, h = a.LegendSymbolMixin, d = a.noop, f = a.merge, n = a.pick; a.ColorAxis || (e = a.ColorAxis = function () {
            this.init.apply(this,
arguments)
        }, r(e.prototype, C.prototype), r(e.prototype, { defaultColorAxisOptions: { lineWidth: 0, minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify", rotation: 0 }, minColor: "#e6ebf5", maxColor: "#003399", tickLength: 5, showInLegend: !0 }, keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(C.prototype.keepProps), init: function (a, d) {
            var b =
"vertical" !== a.options.legend.layout, c; this.coll = "colorAxis"; c = f(this.defaultColorAxisOptions, { side: b ? 2 : 1, reversed: !b }, d, { opposite: !b, showEmpty: !1, title: null, visible: a.options.legend.enabled }); C.prototype.init.call(this, a, c); d.dataClasses && this.initDataClasses(d); this.initStops(); this.horiz = b; this.zoomEnabled = !1; this.defaultLegendLength = 200
        }, initDataClasses: function (a) {
            var d = this.chart, b, c = 0, e = d.options.chart.colorCount, h = this.options, p = a.dataClasses.length; this.dataClasses = b = []; this.legendItems =
[]; k(a.dataClasses, function (a, g) { a = f(a); b.push(a); a.color || ("category" === h.dataClassColor ? (g = d.options.colors, e = g.length, a.color = g[c], a.colorIndex = c, c++, c === e && (c = 0)) : a.color = m(h.minColor).tweenTo(m(h.maxColor), 2 > p ? .5 : g / (p - 1))) })
        }, setTickPositions: function () { if (!this.dataClasses) return C.prototype.setTickPositions.call(this) }, initStops: function () { this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; k(this.stops, function (a) { a.color = m(a[1]) }) }, setOptions: function (a) {
            C.prototype.setOptions.call(this,
a); this.options.crosshair = this.options.marker
        }, setAxisSize: function () { var a = this.legendSymbol, d = this.chart, b = d.options.legend || {}, c, e; a ? (this.left = b = a.attr("x"), this.top = c = a.attr("y"), this.width = e = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - b - e, this.bottom = d.chartHeight - c - a, this.len = this.horiz ? e : a, this.pos = this.horiz ? b : c) : this.len = (this.horiz ? b.symbolWidth : b.symbolHeight) || this.defaultLegendLength }, normalizedValue: function (a) {
            this.isLog && (a = this.val2lin(a)); return 1 - (this.max -
a) / (this.max - this.min || 1)
        }, toColor: function (a, d) { var b = this.stops, c, e, f = this.dataClasses, g, h; if (f) for (h = f.length; h--; ) { if (g = f[h], c = g.from, b = g.to, (void 0 === c || a >= c) && (void 0 === b || a <= b)) { e = g.color; d && (d.dataClass = h, d.colorIndex = g.colorIndex); break } } else { a = this.normalizedValue(a); for (h = b.length; h-- && !(a > b[h][0]); ); c = b[h] || b[h + 1]; b = b[h + 1] || c; a = 1 - (b[0] - a) / (b[0] - c[0] || 1); e = c.color.tweenTo(b.color, a) } return e }, getOffset: function () {
            var a = this.legendGroup, d = this.chart.axisOffset[this.side]; a && (this.axisParent =
a, C.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
        }, setLegendColor: function () { var a, d = this.reversed; a = d ? 1 : 0; d = d ? 0 : 1; a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a]; this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: this.stops} }, drawLegendSymbol: function (a, d) {
            var b = a.padding, c = a.options, e = this.horiz, f = n(c.symbolWidth, e ? this.defaultLegendLength : 12), g = n(c.symbolHeight, e ? 12 : this.defaultLegendLength), h = n(c.labelPadding,
e ? 16 : 30), c = n(c.itemDistance, 10); this.setLegendColor(); d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({ zIndex: 1 }).add(d.legendGroup); this.legendItemWidth = f + b + (e ? c : h); this.legendItemHeight = g + b + (e ? h : 0)
        }, setState: function (a) { k(this.series, function (d) { d.setState(a) }) }, visible: !0, setVisible: d, getSeriesExtremes: function () {
            var a = this.series, d = a.length; this.dataMin = Infinity; for (this.dataMax = -Infinity; d--; ) void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax =
Math.max(this.dataMax, a[d].valueMax))
        }, drawCrosshair: function (a, d) { var b = d && d.plotX, c = d && d.plotY, e, f = this.pos, g = this.len; d && (e = this.toPixels(d[d.series.colorKey]), e < f ? e = f - 2 : e > f + g && (e = f + g + 2), d.plotX = e, d.plotY = this.len - e, C.prototype.drawCrosshair.call(this, a, d), d.plotX = b, d.plotY = c, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.cross.attr({ fill: this.crosshair.color }))) }, getPlotLinePath: function (a,
d, b, c, e) { return x(e) ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L", this.left - 6, e + 6, this.left - 6, e - 6, "Z"] : C.prototype.getPlotLinePath.call(this, a, d, b, c) }, update: function (a, d) {
    var b = this.chart, c = b.legend; k(this.series, function (a) { a.isDirtyData = !0 }); a.dataClasses && c.allItems && (k(c.allItems, function (a) { a.isDataClass && a.legendGroup && a.legendGroup.destroy() }), b.isDirtyLegend = !0); b.options[this.coll] = f(this.userOptions, a); C.prototype.update.call(this, a, d); this.legendItem &&
(this.setLegendColor(), c.colorizeItem(this, !0))
}, remove: function () { this.legendItem && this.chart.legend.destroyItem(this); C.prototype.remove.call(this) }, getDataClassLegendSymbols: function () {
    var e = this, f = this.chart, b = this.legendItems, c = f.options.legend, l = c.valueDecimals, p = c.valueSuffix || "", n; b.length || k(this.dataClasses, function (c, g) {
        var m = !0, q = c.from, u = c.to; n = ""; void 0 === q ? n = "\x3c " : void 0 === u && (n = "\x3e "); void 0 !== q && (n += a.numberFormat(q, l) + p); void 0 !== q && void 0 !== u && (n += " - "); void 0 !== u && (n += a.numberFormat(u,
l) + p); b.push(r({ chart: f, name: n, options: {}, drawLegendSymbol: h.drawRectangle, visible: !0, setState: d, isDataClass: !0, setVisible: function () { m = this.visible = !m; k(e.series, function (a) { k(a.points, function (a) { a.dataClass === g && a.setVisible(m) }) }); f.legend.colorizeItem(this, m) } }, c))
    }); return b
}, name: ""
        }), k(["fill", "stroke"], function (d) { a.Fx.prototype[d + "Setter"] = function () { this.elem.attr(d, m(this.start).tweenTo(m(this.end), this.pos), null, !0) } }), A(z, "afterGetAxes", function () {
            var a = this.options.colorAxis; this.colorAxis =
[]; a && new e(this, a)
        }), A(p, "afterGetAllItems", function (d) { var e = [], b = this.chart.colorAxis[0]; b && b.options && (b.options.showInLegend && (b.options.dataClasses ? e = b.getDataClassLegendSymbols() : e.push(b)), k(b.series, function (b) { a.erase(d.allItems, b) })); for (; e.length; ) d.allItems.unshift(e.pop()) }), A(p, "afterColorizeItem", function (a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) }), A(p, "afterUpdate", function (a, d, b) {
            this.chart.colorAxis[0] && this.chart.colorAxis[0].update({},
b)
        }))
    })(I); (function (a) {
        var A = a.defined, C = a.each, z = a.noop, m = a.seriesTypes; a.colorPointMixin = { isValid: function () { return null !== this.value && Infinity !== this.value && -Infinity !== this.value }, setVisible: function (a) { var e = this, m = a ? "show" : "hide"; C(["graphic", "dataLabel"], function (a) { if (e[a]) e[a][m]() }) }, setState: function (e) { a.Point.prototype.setState.call(this, e); this.graphic && this.graphic.attr({ zIndex: "hover" === e ? 1 : 0 }) } }; a.colorSeriesMixin = { pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis", trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: z, parallelArrays: ["x", "y", "value"], colorKey: "value", pointAttribs: m.column.prototype.pointAttribs, translateColors: function () { var a = this, k = this.options.nullColor, m = this.colorAxis, x = this.colorKey; C(this.data, function (e) { var h = e[x]; if (h = e.options.color || (e.isNull ? k : m && void 0 !== h ? m.toColor(h, e) : e.color || a.color)) e.color = h }) }, colorAttribs: function (a) { var e = {}; A(a.color) && (e[this.colorProp || "fill"] = a.color); return e } 
        }
    })(I);
    (function (a) {
        function A(a) { a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) } function C(a) { this.init(a) } var z = a.addEvent, m = a.Chart, e = a.doc, k = a.each, r = a.extend, x = a.merge, p = a.pick; C.prototype.init = function (a) { this.chart = a; a.mapNavButtons = [] }; C.prototype.update = function (e) {
            var d = this.chart, f = d.options.mapNavigation, h, k, g, b, c, l = function (a) { this.handler.call(d, a); A(a) }, m = d.mapNavButtons; e && (f = d.options.mapNavigation = x(d.options.mapNavigation, e)); for (; m.length; ) m.pop().destroy();
            p(f.enableButtons, f.enabled) && !d.renderer.forExport && a.objectEach(f.buttons, function (a, e) {
                h = x(f.buttonOptions, a); k = h.theme; k.style = x(h.theme.style, h.style); b = (g = k.states) && g.hover; c = g && g.select; a = d.renderer.button(h.text, 0, 0, l, k, b, c, 0, "zoomIn" === e ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({ width: h.width, height: h.height, title: d.options.lang[e], padding: h.padding, zIndex: 5 }).add(); a.handler = h.onclick; a.align(r(h, { width: a.width, height: 2 * a.height }), null, h.alignTo); z(a.element,
"dblclick", A); m.push(a)
            }); this.updateEvents(f)
        }; C.prototype.updateEvents = function (a) {
            var d = this.chart; p(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || z(d.container, "dblclick", function (a) { d.pointer.onContainerDblClick(a) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick()); p(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || z(d.container, void 0 === e.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (a) {
                d.pointer.onContainerMouseWheel(a);
                A(a); return !1
            }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        }; r(m.prototype, { fitToBox: function (a, d) { k([["x", "width"], ["y", "height"]], function (e) { var f = e[0]; e = e[1]; a[f] + a[e] > d[f] + d[e] && (a[e] > d[e] ? (a[e] = d[e], a[f] = d[f]) : a[f] = d[f] + d[e] - a[e]); a[e] > d[e] && (a[e] = d[e]); a[f] < d[f] && (a[f] = d[f]) }); return a }, mapZoom: function (a, d, e, k, m) {
            var f = this.xAxis[0], b = f.max - f.min, c = p(d, f.min + b / 2), h = b * a, b = this.yAxis[0], n = b.max - b.min, u = p(e, b.min + n / 2), n = n * a, c = this.fitToBox({ x: c - h * (k ? (k - f.pos) / f.len :
.5), y: u - n * (m ? (m - b.pos) / b.len : .5), width: h, height: n
            }, { x: f.dataMin, y: b.dataMin, width: f.dataMax - f.dataMin, height: b.dataMax - b.dataMin }), h = c.x <= f.dataMin && c.width >= f.dataMax - f.dataMin && c.y <= b.dataMin && c.height >= b.dataMax - b.dataMin; k && (f.fixTo = [k - f.pos, d]); m && (b.fixTo = [m - b.pos, e]); void 0 === a || h ? (f.setExtremes(void 0, void 0, !1), b.setExtremes(void 0, void 0, !1)) : (f.setExtremes(c.x, c.x + c.width, !1), b.setExtremes(c.y, c.y + c.height, !1)); this.redraw()
        } 
        }); z(m, "beforeRender", function () {
            this.mapNavigation = new C(this);
            this.mapNavigation.update()
        })
    })(I); (function (a) {
        var A = a.extend, C = a.pick, z = a.Pointer; a = a.wrap; A(z.prototype, { onContainerDblClick: function (a) { var e = this.chart; a = this.normalize(a); e.options.mapNavigation.enableDoubleClickZoomTo ? e.pointer.inClass(a.target, "highcharts-tracker") && e.hoverPoint && e.hoverPoint.zoomTo() : e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop) && e.mapZoom(.5, e.xAxis[0].toValue(a.chartX), e.yAxis[0].toValue(a.chartY), a.chartX, a.chartY) }, onContainerMouseWheel: function (a) {
            var e = this.chart,
k; a = this.normalize(a); k = a.detail || -(a.wheelDelta / 120); e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop) && e.mapZoom(Math.pow(e.options.mapNavigation.mouseWheelSensitivity, k), e.xAxis[0].toValue(a.chartX), e.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
        } 
        }); a(z.prototype, "zoomOption", function (a) { var e = this.chart.options.mapNavigation; C(e.enableTouchZoom, e.enabled) && (this.chart.options.chart.pinchType = "xy"); a.apply(this, [].slice.call(arguments, 1)) }); a(z.prototype, "pinchTranslate", function (a, e, k, r,
x, p, h) { a.call(this, e, k, r, x, p, h); "map" === this.chart.options.chart.type && this.hasZoom && (a = r.scaleX > r.scaleY, this.pinchTranslateDirection(!a, e, k, r, x, p, h, a ? r.scaleX : r.scaleY)) })
    })(I); (function (a) {
        var A = a.colorPointMixin, C = a.each, z = a.extend, m = a.isNumber, e = a.map, k = a.merge, r = a.noop, x = a.pick, p = a.isArray, h = a.Point, d = a.Series, f = a.seriesType, n = a.seriesTypes, u = a.splat, g = void 0 !== a.doc.documentElement.style.vectorEffect; f("map", "scatter", { allAreas: !0, animation: !1, nullColor: "#f7f7f7", borderColor: "#cccccc", borderWidth: 1,
            marker: null, stickyTracking: !1, joinBy: "hc-key", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, turboThreshold: 0, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e" }, states: { normal: { animation: !0 }, hover: { halo: null, brightness: .2 }, select: { color: "#cccccc"}}
        }, k(a.colorSeriesMixin, { type: "map", getExtremesFromAll: !0, useMapGeometry: !0, forceDL: !0, searchPoint: r, directTouch: !0, preserveAspectRatio: !0, pointArrayMap: ["value"],
            getBox: function (b) {
                var c = Number.MAX_VALUE, d = -c, e = c, f = -c, g = c, h = c, k = this.xAxis, p = this.yAxis, n; C(b || [], function (b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path)); var k = b.path || [], l = k.length, p = !1, q = -c, u = c, r = -c, w = c, y = b.properties; if (!b._foundBox) {
                            for (; l--; ) m(k[l]) && (p ? (q = Math.max(q, k[l]), u = Math.min(u, k[l])) : (r = Math.max(r, k[l]), w = Math.min(w, k[l])), p = !p); b._midX = u + (q - u) * x(b.middleX, y && y["hc-middle-x"], .5); b._midY = w + (r - w) * x(b.middleY, y && y["hc-middle-y"], .5); b._maxX = q; b._minX = u; b._maxY =
r; b._minY = w; b.labelrank = x(b.labelrank, (q - u) * (r - w)); b._foundBox = !0
                        } d = Math.max(d, b._maxX); e = Math.min(e, b._minX); f = Math.max(f, b._maxY); g = Math.min(g, b._minY); h = Math.min(b._maxX - b._minX, b._maxY - b._minY, h); n = !0
                    } 
                }); n && (this.minY = Math.min(g, x(this.minY, c)), this.maxY = Math.max(f, x(this.maxY, -c)), this.minX = Math.min(e, x(this.minX, c)), this.maxX = Math.max(d, x(this.maxX, -c)), k && void 0 === k.options.minRange && (k.minRange = Math.min(5 * h, (this.maxX - this.minX) / 5, k.minRange || c)), p && void 0 === p.options.minRange && (p.minRange =
Math.min(5 * h, (this.maxY - this.minY) / 5, p.minRange || c)))
            }, getExtremes: function () { d.prototype.getExtremes.call(this, this.valueData); this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data); this.valueMin = this.dataMin; this.valueMax = this.dataMax; this.dataMin = this.minY; this.dataMax = this.maxY }, translatePath: function (a) {
                var b = !1, d = this.xAxis, e = this.yAxis, f = d.min, g = d.transA, d = d.minPixelPadding, h = e.min, k = e.transA, e = e.minPixelPadding, p, n = []; if (a) for (p = a.length; p--; ) m(a[p]) ? (n[p] = b ? (a[p] - f) * g + d :
(a[p] - h) * k + e, b = !b) : n[p] = a[p]; return n
            }, setData: function (b, c, f, g) {
                var h = this.options, l = this.chart.options.chart, n = l && l.map, r = h.mapData, x = h.joinBy, w = null === x, y = h.keys || this.pointArrayMap, z = [], A = {}, H = this.chart.mapTransforms; !r && n && (r = "string" === typeof n ? a.maps[n] : n); w && (x = "_i"); x = this.joinBy = u(x); x[1] || (x[1] = x[0]); b && C(b, function (c, d) {
                    var e = 0; if (m(c)) b[d] = { value: c }; else if (p(c)) {
                        b[d] = {}; !h.keys && c.length > y.length && "string" === typeof c[0] && (b[d]["hc-key"] = c[0], ++e); for (var f = 0; f < y.length; ++f, ++e) y[f] &&
void 0 !== c[e] && (0 < y[f].indexOf(".") ? a.Point.prototype.setNestedProperty(b[d], c[e], y[f]) : b[d][y[f]] = c[e])
                    } w && (b[d]._i = d)
                }); this.getBox(b); (this.chart.mapTransforms = H = l && l.mapTransforms || r && r["hc-transform"] || H) && a.objectEach(H, function (a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) }); if (r) {
                    "FeatureCollection" === r.type && (this.mapTitle = r.title, r = a.geojson(r, this.type, this)); this.mapData = r; this.mapMap = {}; for (H = 0; H < r.length; H++) l = r[H], n = l.properties, l._i = H, x[0] && n && n[x[0]] &&
(l[x[0]] = n[x[0]]), A[l[x[0]]] = l; this.mapMap = A; b && x[1] && C(b, function (a) { A[a[x[1]]] && z.push(A[a[x[1]]]) }); h.allAreas ? (this.getBox(r), b = b || [], x[1] && C(b, function (a) { z.push(a[x[1]]) }), z = "|" + e(z, function (a) { return a && a[x[0]] }).join("|") + "|", C(r, function (a) { x[0] && -1 !== z.indexOf("|" + a[x[0]] + "|") || (b.push(k(a, { value: null })), g = !1) })) : this.getBox(z)
                } d.prototype.setData.call(this, b, c, f, g)
            }, drawGraph: r, drawDataLabels: r, doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML ||
!this.baseTrans
            }, translate: function () { var a = this, c = a.xAxis, d = a.yAxis, e = a.doFullTranslate(); a.generatePoints(); C(a.data, function (b) { b.plotX = c.toPixels(b._midX, !0); b.plotY = d.toPixels(b._midY, !0); e && (b.shapeType = "path", b.shapeArgs = { d: a.translatePath(b.path) }) }); a.translateColors() }, pointAttribs: function (a, c) { a = n.column.prototype.pointAttribs.call(this, a, c); g ? a["vector-effect"] = "non-scaling-stroke" : a["stroke-width"] = "inherit"; return a }, drawPoints: function () {
                var a = this, c = a.xAxis, d = a.yAxis, e = a.group, f =
a.chart, h = f.renderer, k, p, m, u, r = this.baseTrans, x, z, A, t, v; a.transformGroup || (a.transformGroup = h.g().attr({ scaleX: 1, scaleY: 1 }).add(e), a.transformGroup.survive = !0); a.doFullTranslate() ? (f.hasRendered && C(a.points, function (b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, n.column.prototype.drawPoints.apply(a), a.group = e, C(a.points, function (a) {
    a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] &&
a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
}), this.baseTrans = { originX: c.min - c.minPixelPadding / c.transA, originY: d.min - d.minPixelPadding / d.transA + (d.reversed ? 0 : d.len / d.transA), transAX: c.transA, transAY: d.transA }, this.transformGroup.animate({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 })) : (k = c.transA / r.transAX, p = d.transA / r.transAY, m = c.toPixels(r.originX, !0), u = d.toPixels(r.originY, !0), .99 < k && 1.01 > k && .99 < p && 1.01 > p && (p = k = 1, m = Math.round(m), u = Math.round(u)), x = this.transformGroup,
f.renderer.globalAnimation ? (z = x.attr("translateX"), A = x.attr("translateY"), t = x.attr("scaleX"), v = x.attr("scaleY"), x.attr({ animator: 0 }).animate({ animator: 1 }, { step: function (a, b) { x.attr({ translateX: z + (m - z) * b.pos, translateY: A + (u - A) * b.pos, scaleX: t + (k - t) * b.pos, scaleY: v + (p - v) * b.pos }) } })) : x.attr({ translateX: m, translateY: u, scaleX: k, scaleY: p })); g || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (k || 1)); this.drawMapDataLabels()
            },
            drawMapDataLabels: function () { d.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) }, render: function () { var a = this, c = d.prototype.render; a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () { c.call(a) }) : c.call(a) }, animate: function (a) {
                var b = this.options.animation, d = this.group, e = this.xAxis, f = this.yAxis, g = e.pos, h = f.pos; this.chart.renderer.isSVG && (!0 === b && (b = { duration: 1E3 }), a ? d.attr({ translateX: g + e.len / 2, translateY: h + f.len / 2, scaleX: .001, scaleY: .001 }) :
(d.animate({ translateX: g, translateY: h, scaleX: 1, scaleY: 1 }, b), this.animate = null))
            }, animateDrilldown: function (a) { var b = this.chart.plotBox, d = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], e = d.bBox, f = this.chart.options.drilldown.animation; a || (a = Math.min(e.width / b.width, e.height / b.height), d.shapeArgs = { scaleX: a, scaleY: a, translateX: e.x, translateY: e.y }, C(this.points, function (a) { a.graphic && a.graphic.attr(d.shapeArgs).animate({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, f) }), this.animate = null) },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, animateDrillupFrom: function (a) { n.column.prototype.animateDrillupFrom.call(this, a) }, animateDrillupTo: function (a) { n.column.prototype.animateDrillupTo.call(this, a) } 
        }), z({ applyOptions: function (a, c) { a = h.prototype.applyOptions.call(this, a, c); c = this.series; var b = c.joinBy; c.mapData && ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), z(a, b)) : a.value = a.value || null); return a }, onMouseOver: function (b) {
            a.clearTimeout(this.colorInterval);
            if (null !== this.value || this.series.options.nullInteraction) h.prototype.onMouseOver.call(this, b); else this.series.onMouseOut(b)
        }, zoomTo: function () { var a = this.series; a.xAxis.setExtremes(this._minX, this._maxX, !1); a.yAxis.setExtremes(this._minY, this._maxY, !1); a.chart.redraw() } 
        }, A))
    })(I); (function (a) {
        var A = a.seriesType, C = a.seriesTypes; A("mapline", "map", { lineWidth: 1, fillColor: "none" }, { type: "mapline", colorProp: "stroke", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, pointAttribs: function (a,
m) { a = C.map.prototype.pointAttribs.call(this, a, m); a.fill = this.options.fillColor; return a }, drawLegendSymbol: C.line.prototype.drawLegendSymbol
        })
    })(I); (function (a) {
        var A = a.merge, C = a.Point; a = a.seriesType; a("mappoint", "scatter", { dataLabels: { enabled: !0, formatter: function () { return this.point.name }, crop: !1, defer: !1, overflow: !1, style: { color: "#000000"}} }, { type: "mappoint", forceDL: !0 }, { applyOptions: function (a, m) {
            a = void 0 !== a.lat && void 0 !== a.lon ? A(a, this.series.chart.fromLatLonToPoint(a)) : a; return C.prototype.applyOptions.call(this,
a, m)
        } 
        })
    })(I); (function (a) {
        var A = a.arrayMax, C = a.arrayMin, z = a.Axis, m = a.color, e = a.each, k = a.isNumber, r = a.noop, x = a.pick, p = a.pInt, h = a.Point, d = a.Series, f = a.seriesType, n = a.seriesTypes; f("bubble", "scatter", { dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0} }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5}} }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
            turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
        }, { pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, pointAttribs: function (a, e) { var b = this.options.marker.fillOpacity; a = d.prototype.pointAttribs.call(this, a, e); 1 !== b && (a.fill = m(a.fill).setOpacity(b).get("rgba")); return a }, getRadii: function (a, d, b, c) {
            var e, f, g, h = this.zData, k = [], p = this.options, n = "width" !== p.sizeBy, m = p.zThreshold, u = d - a; f = 0; for (e = h.length; f <
e; f++) g = h[f], p.sizeByAbsoluteValue && null !== g && (g = Math.abs(g - m), d = u = Math.max(d - m, Math.abs(a - m)), a = 0), null === g ? g = null : g < a ? g = b / 2 - 1 : (g = 0 < u ? (g - a) / u : .5, n && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(b + g * (c - b)) / 2), k.push(g); this.radii = k
        }, animate: function (a) {
            !a && this.points.length < this.options.animationLimit && (e(this.points, function (a) { var b = a.graphic, c; b && b.width && (c = { x: b.x, y: b.y, width: b.width, height: b.height }, b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), b.animate(c, this.options.animation)) }, this), this.animate =
null)
        }, translate: function () { var d, e = this.data, b, c, f = this.radii; n.scatter.prototype.translate.call(this); for (d = e.length; d--; ) b = e[d], c = f ? f[d] : 0, k(c) && c >= this.minPxSize / 2 ? (b.marker = a.extend(b.marker, { radius: c, width: 2 * c, height: 2 * c }), b.dlBox = { x: b.plotX - c, y: b.plotY - c, width: 2 * c, height: 2 * c }) : b.shapeArgs = b.plotY = b.dlBox = void 0 }, alignDataLabel: n.column.prototype.alignDataLabel, buildKDTree: r, applyZones: r
        }, { haloPath: function (a) {
            return h.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 :
0) + a)
        }, ttBelow: !1
        }); z.prototype.beforePadding = function () {
            var a = this, d = this.len, b = this.chart, c = 0, f = d, h = this.isXAxis, n = h ? "xData" : "yData", m = this.min, r = {}, z = Math.min(b.plotWidth, b.plotHeight), D = Number.MAX_VALUE, w = -Number.MAX_VALUE, G = this.max - m, B = d / G, I = []; e(this.series, function (c) {
                var d = c.options; !c.bubblePadding || !c.visible && b.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, I.push(c), h && (e(["minSize", "maxSize"], function (a) { var b = d[a], c = /%$/.test(b), b = p(b); r[a] = c ? z * b / 100 : b }), c.minPxSize = r.minSize,
c.maxPxSize = Math.max(r.maxSize, r.minSize), c = c.zData, c.length && (D = x(d.zMin, Math.min(D, Math.max(C(c), !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE))), w = x(d.zMax, Math.max(w, A(c))))))
            }); e(I, function (b) { var d = b[n], e = d.length, g; h && b.getRadii(D, w, b.minPxSize, b.maxPxSize); if (0 < G) for (; e--; ) k(d[e]) && a.dataMin <= d[e] && d[e] <= a.dataMax && (g = b.radii[e], c = Math.min((d[e] - m) * B - g, c), f = Math.max((d[e] - m) * B + g, f)) }); I.length && 0 < G && !this.isLog && (f -= d, B *= (d + c - f) / d, e([["min", "userMin", c], ["max", "userMax", f]], function (b) {
                void 0 ===
x(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / B)
            }))
        } 
    })(I); (function (a) {
        var A = a.merge, C = a.Point, z = a.seriesType, m = a.seriesTypes; m.bubble && z("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}"} }, { xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: m.map.prototype.getMapData, getBox: m.map.prototype.getBox, setData: m.map.prototype.setData }, { applyOptions: function (a, k) {
            return a && void 0 !== a.lat && void 0 !== a.lon ? C.prototype.applyOptions.call(this, A(a, this.series.chart.fromLatLonToPoint(a)),
k) : m.map.prototype.pointClass.prototype.applyOptions.call(this, a, k)
        }, isValid: function () { return "number" === typeof this.z }, ttBelow: !1
        })
    })(I); (function (a) {
        var A = a.colorPointMixin, C = a.each, z = a.merge, m = a.noop, e = a.pick, k = a.Series, r = a.seriesType, x = a.seriesTypes; r("heatmap", "scatter", { animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, marker: null, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e" },
            states: { hover: { halo: !1, brightness: .2}}
        }, z(a.colorSeriesMixin, { pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, getExtremesFromAll: !0, directTouch: !0, init: function () { var a; x.scatter.prototype.init.apply(this, arguments); a = this.options; a.pointRange = e(a.pointRange, a.colsize || 1); this.yAxis.axisPointRange = a.rowsize || 1 }, translate: function () {
            var a = this.options, h = this.xAxis, d = this.yAxis, f = a.pointPadding || 0, k = function (a, d, b) { return Math.min(Math.max(d, a), b) }; this.generatePoints(); C(this.points, function (p) {
                var g =
(a.colsize || 1) / 2, b = (a.rowsize || 1) / 2, c = k(Math.round(h.len - h.translate(p.x - g, 0, 1, 0, 1)), -h.len, 2 * h.len), g = k(Math.round(h.len - h.translate(p.x + g, 0, 1, 0, 1)), -h.len, 2 * h.len), l = k(Math.round(d.translate(p.y - b, 0, 1, 0, 1)), -d.len, 2 * d.len), b = k(Math.round(d.translate(p.y + b, 0, 1, 0, 1)), -d.len, 2 * d.len), n = e(p.pointPadding, f); p.plotX = p.clientX = (c + g) / 2; p.plotY = (l + b) / 2; p.shapeType = "rect"; p.shapeArgs = { x: Math.min(c, g) + n, y: Math.min(l, b) + n, width: Math.abs(g - c) - 2 * n, height: Math.abs(b - l) - 2 * n}
            }); this.translateColors()
        }, drawPoints: function () {
            x.column.prototype.drawPoints.call(this);
            C(this.points, function (a) { a.graphic.attr(this.colorAttribs(a)) }, this)
        }, animate: m, getBox: m, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, alignDataLabel: x.column.prototype.alignDataLabel, getExtremes: function () { k.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; k.prototype.getExtremes.call(this) } 
        }), a.extend({ haloPath: function (a) {
            if (!a) return []; var e = this.shapeArgs; return ["M", e.x - a, e.y - a, "L", e.x - a, e.y + e.height + a, e.x + e.width + a, e.y + e.height + a, e.x +
e.width + a, e.y - a, "Z"]
        } 
        }, A))
    })(I); (function (a) {
        function A(a, e) { var d, f, h, k = !1, g = a.x, b = a.y; a = 0; for (d = e.length - 1; a < e.length; d = a++) f = e[a][1] > b, h = e[d][1] > b, f !== h && g < (e[d][0] - e[a][0]) * (b - e[a][1]) / (e[d][1] - e[a][1]) + e[a][0] && (k = !k); return k } var C = a.Chart, z = a.each, m = a.extend, e = a.format, k = a.merge, r = a.win, x = a.wrap; C.prototype.transformFromLatLon = function (e, h) {
            if (void 0 === r.proj4) return a.error(21), { x: 0, y: null }; e = r.proj4(h.crs, [e.lon, e.lat]); var d = h.cosAngle || h.rotation && Math.cos(h.rotation), f = h.sinAngle || h.rotation &&
Math.sin(h.rotation); e = h.rotation ? [e[0] * d + e[1] * f, -e[0] * f + e[1] * d] : e; return { x: ((e[0] - (h.xoffset || 0)) * (h.scale || 1) + (h.xpan || 0)) * (h.jsonres || 1) + (h.jsonmarginX || 0), y: (((h.yoffset || 0) - e[1]) * (h.scale || 1) + (h.ypan || 0)) * (h.jsonres || 1) - (h.jsonmarginY || 0)}
        }; C.prototype.transformToLatLon = function (e, h) {
            if (void 0 === r.proj4) a.error(21); else {
                e = { x: ((e.x - (h.jsonmarginX || 0)) / (h.jsonres || 1) - (h.xpan || 0)) / (h.scale || 1) + (h.xoffset || 0), y: ((-e.y - (h.jsonmarginY || 0)) / (h.jsonres || 1) + (h.ypan || 0)) / (h.scale || 1) + (h.yoffset || 0) }; var d =
h.cosAngle || h.rotation && Math.cos(h.rotation), f = h.sinAngle || h.rotation && Math.sin(h.rotation); h = r.proj4(h.crs, "WGS84", h.rotation ? { x: e.x * d + e.y * -f, y: e.x * f + e.y * d} : e); return { lat: h.y, lon: h.x}
            } 
        }; C.prototype.fromPointToLatLon = function (e) { var h = this.mapTransforms, d; if (h) { for (d in h) if (h.hasOwnProperty(d) && h[d].hitZone && A({ x: e.x, y: -e.y }, h[d].hitZone.coordinates[0])) return this.transformToLatLon(e, h[d]); return this.transformToLatLon(e, h["default"]) } a.error(22) }; C.prototype.fromLatLonToPoint = function (e) {
            var h =
this.mapTransforms, d, f; if (!h) return a.error(22), { x: 0, y: null }; for (d in h) if (h.hasOwnProperty(d) && h[d].hitZone && (f = this.transformFromLatLon(e, h[d]), A({ x: f.x, y: -f.y }, h[d].hitZone.coordinates[0]))) return f; return this.transformFromLatLon(e, h["default"])
        }; a.geojson = function (a, h, d) {
            var f = [], k = [], p = function (a) { var b, c = a.length; k.push("M"); for (b = 0; b < c; b++) 1 === b && k.push("L"), k.push(a[b][0], -a[b][1]) }; h = h || "map"; z(a.features, function (a) {
                var b = a.geometry, c = b.type, b = b.coordinates; a = a.properties; var d; k = []; "map" ===
h || "mapbubble" === h ? ("Polygon" === c ? (z(b, p), k.push("Z")) : "MultiPolygon" === c && (z(b, function (a) { z(a, p) }), k.push("Z")), k.length && (d = { path: k })) : "mapline" === h ? ("LineString" === c ? p(b) : "MultiLineString" === c && z(b, p), k.length && (d = { path: k })) : "mappoint" === h && "Point" === c && (d = { x: b[0], y: -b[1] }); d && f.push(m(d, { name: a.name || a.NAME, properties: a }))
            }); d && a.copyrightShort && (d.chart.mapCredits = e(d.chart.options.credits.mapText, { geojson: a }), d.chart.mapCreditsFull = e(d.chart.options.credits.mapTextFull, { geojson: a })); return f
        };
        x(C.prototype, "addCredits", function (a, e) { e = k(!0, this.options.credits, e); this.mapCredits && (e.href = null); a.call(this, e); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) })
    })(I); (function (a) {
        function A(a, e, h, k, g, b, c, l) { return ["M", a + g, e, "L", a + h - b, e, "C", a + h - b / 2, e, a + h, e + b / 2, a + h, e + b, "L", a + h, e + k - c, "C", a + h, e + k - c / 2, a + h - c / 2, e + k, a + h - c, e + k, "L", a + l, e + k, "C", a + l / 2, e + k, a, e + k - l / 2, a, e + k - l, "L", a, e + g, "C", a, e + g / 2, a + g / 2, e, a + g, e, "Z"] } var C = a.Chart, z = a.defaultOptions, m = a.each, e = a.extend, k =
a.merge, r = a.pick, x = a.Renderer, p = a.SVGRenderer, h = a.VMLRenderer; e(z.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); z.mapNavigation = { buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "bold" }, theme: { "stroke-width": 1, "text-align": "center"} }, buttons: { zoomIn: { onclick: function () { this.mapZoom(.5) }, text: "+", y: 0 }, zoomOut: { onclick: function () { this.mapZoom(2) }, text: "-", y: 28} }, mouseWheelSensitivity: 1.1 }; a.splitPath = function (a) {
    var d;
    a = a.replace(/([A-Za-z])/g, " $1 "); a = a.replace(/^\s*/, "").replace(/\s*$/, ""); a = a.split(/[ ,]+/); for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d])); return a
}; a.maps = {}; p.prototype.symbols.topbutton = function (a, e, h, k, g) { return A(a - 1, e - 1, h, k, g.r, g.r, 0, 0) }; p.prototype.symbols.bottombutton = function (a, e, h, k, g) { return A(a - 1, e - 1, h, k, 0, 0, g.r, g.r) }; x === h && m(["topbutton", "bottombutton"], function (a) { h.prototype.symbols[a] = p.prototype.symbols[a] }); a.Map = a.mapChart = function (d, e, h) {
    var f = "string" ===
typeof d || d.nodeName, g = arguments[f ? 1 : 0], b = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 }, c, l = a.getOptions().credits; c = g.series; g.series = null; g = k({ chart: { panning: "xy", type: "map" }, credits: { mapText: r(l.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'), mapTextFull: r(l.mapTextFull, "{geojson.copyright}") }, tooltip: { followTouchMove: !1 }, xAxis: b, yAxis: k(b, { reversed: !0 }) }, g, { chart: { inverted: !1, alignTicks: !1} }); g.series = c; return f ? new C(d, g, h) :
new C(g, e)
} 
    })(I); return I
});
