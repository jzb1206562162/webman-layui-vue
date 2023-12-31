var VueDemi = function (e, t, n) {
    if (e.install) return e;
    if (!t) return console.error("[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`."), e;
    if ("2.7." === t.version.slice(0, 4)) {
        for (var i in t) e[i] = t[i];
        e.isVue2 = !0, e.isVue3 = !1, e.install = function () {
        }, e.Vue = t, e.Vue2 = t, e.version = t.version, e.warn = t.util.warn, e.createApp = function (e, n) {
            var i, r = {}, o = {
                config: t.config,
                use: t.use.bind(t),
                mixin: t.mixin.bind(t),
                component: t.component.bind(t),
                provide: function (e, t) {
                    return r[e] = t, this
                },
                directive: function (e, n) {
                    return n ? (t.directive(e, n), o) : t.directive(e)
                },
                mount: function (o, s) {
                    return i || ((i = new t(Object.assign({propsData: n}, e, {provide: Object.assign(r, e.provide)}))).$mount(o, s), i)
                },
                unmount: function () {
                    i && (i.$destroy(), i = void 0)
                }
            };
            return o
        }
    } else if ("2." === t.version.slice(0, 2)) if (n) {
        for (var i in n) e[i] = n[i];
        e.isVue2 = !0, e.isVue3 = !1, e.install = function () {
        }, e.Vue = t, e.Vue2 = t, e.version = t.version
    } else console.error("[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`."); else if ("3." === t.version.slice(0, 2)) {
        for (var i in t) e[i] = t[i];
        e.isVue2 = !1, e.isVue3 = !0, e.install = function () {
        }, e.Vue = t, e.Vue2 = void 0, e.version = t.version, e.set = function (e, t, n) {
            return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n)
        }, e.del = function (e, t) {
            Array.isArray(e) ? e.splice(t, 1) : delete e[t]
        }
    } else console.error("[vue-demi] Vue version " + t.version + " is unsupported.");
    return e
}(this.VueDemi = this.VueDemi || (void 0 !== VueDemi ? VueDemi : {}), this.Vue || ("undefined" != typeof Vue ? Vue : void 0), this.VueCompositionAPI || ("undefined" != typeof VueCompositionAPI ? VueCompositionAPI : void 0));
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("echarts"), require("vue-demi"), require("echarts/core")) : "function" == typeof define && define.amd ? define(["echarts", "vue-demi", "echarts/core"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).VueECharts = t(e.echarts, e.VueDemi, e.echarts)
}(this, (function (e, t, n) {
    "use strict";
    var i = function () {
        return i = Object.assign || function (e) {
            for (var t, n = 1, i = arguments.length; n < i; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }, i.apply(this, arguments)
    };
    "function" == typeof SuppressedError && SuppressedError;
    var r = ["getWidth", "getHeight", "getDom", "getOption", "resize", "dispatchAction", "convertToPixel", "convertFromPixel", "containPixel", "getDataURL", "getConnectedDataURL", "appendData", "clear", "isDisposed", "dispose"];

    function o(e) {
        return t = Object.create(null), r.forEach((function (n) {
            t[n] = function (t) {
                return function () {
                    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                    if (!e.value) throw new Error("ECharts is not initialized yet.");
                    return e.value[t].apply(e.value, n)
                }
            }(n)
        })), t;
        var t
    }

    var s = null;
    var a = null;

    function u(e, t) {
        void 0 === t && (t = {});
        var n = document.createElement(e);
        return Object.keys(t).forEach((function (e) {
            n[e] = t[e]
        })), n
    }

    function c(e, t, n) {
        return (window.getComputedStyle(e, n || null) || {display: "none"})[t]
    }

    function l(e) {
        if (!document.documentElement.contains(e)) return {detached: !0, rendered: !1};
        for (var t = e; t !== document;) {
            if ("none" === c(t, "display")) return {detached: !1, rendered: !1};
            t = t.parentNode
        }
        return {detached: !1, rendered: !0}
    }

    var _ = '.resize-triggers{visibility:hidden;opacity:0;pointer-events:none}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:"";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}',
        d = 0, f = null;

    function v(e, t) {
        if (e.__resize_mutation_handler__ || (e.__resize_mutation_handler__ = h.bind(e)), !e.__resize_listeners__) if (e.__resize_listeners__ = [], window.ResizeObserver) {
            var n = e.offsetWidth, i = e.offsetHeight, r = new ResizeObserver((function () {
                (e.__resize_observer_triggered__ || (e.__resize_observer_triggered__ = !0, e.offsetWidth !== n || e.offsetHeight !== i)) && g(e)
            })), o = l(e), s = o.detached, a = o.rendered;
            e.__resize_observer_triggered__ = !1 === s && !1 === a, e.__resize_observer__ = r, r.observe(e)
        } else if (e.attachEvent && e.addEventListener) e.__resize_legacy_resize_handler__ = function () {
            g(e)
        }, e.attachEvent("onresize", e.__resize_legacy_resize_handler__), document.addEventListener("DOMSubtreeModified", e.__resize_mutation_handler__); else if (d || (f = function (e) {
            var t = document.createElement("style");
            return t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), (document.querySelector("head") || document.body).appendChild(t), t
        }(_)), function (e) {
            var t = c(e, "position");
            t && "static" !== t || (e.style.position = "relative");
            e.__resize_old_position__ = t, e.__resize_last__ = {};
            var n = u("div", {className: "resize-triggers"}), i = u("div", {className: "resize-expand-trigger"}),
                r = u("div"), o = u("div", {className: "resize-contract-trigger"});
            i.appendChild(r), n.appendChild(i), n.appendChild(o), e.appendChild(n), e.__resize_triggers__ = {
                triggers: n,
                expand: i,
                expandChild: r,
                contract: o
            }, m(e), e.addEventListener("scroll", p, !0), e.__resize_last__ = {
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }(e), e.__resize_rendered__ = l(e).rendered, window.MutationObserver) {
            var v = new MutationObserver(e.__resize_mutation_handler__);
            v.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            }), e.__resize_mutation_observer__ = v
        }
        e.__resize_listeners__.push(t), d++
    }

    function h() {
        var e = l(this), t = e.rendered, n = e.detached;
        t !== this.__resize_rendered__ && (!n && this.__resize_triggers__ && (m(this), this.addEventListener("scroll", p, !0)), this.__resize_rendered__ = t, g(this))
    }

    function p() {
        var e, t, n = this;
        m(this), this.__resize_raf__ && (e = this.__resize_raf__, a || (a = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (e) {
            clearTimeout(e)
        }).bind(window)), a(e)), this.__resize_raf__ = (t = function () {
            var e, t, i, r, o, s,
                a = (t = (e = n).__resize_last__, i = t.width, r = t.height, o = e.offsetWidth, s = e.offsetHeight, o !== i || s !== r ? {
                    width: o,
                    height: s
                } : null);
            a && (n.__resize_last__ = a, g(n))
        }, s || (s = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
            return setTimeout(e, 16)
        }).bind(window)), s(t))
    }

    function g(e) {
        e && e.__resize_listeners__ && e.__resize_listeners__.forEach((function (t) {
            t.call(e, e)
        }))
    }

    function m(e) {
        var t = e.__resize_triggers__, n = t.expand, i = t.expandChild, r = t.contract, o = r.scrollWidth,
            s = r.scrollHeight, a = n.offsetWidth, u = n.offsetHeight, c = n.scrollWidth, l = n.scrollHeight;
        r.scrollLeft = o, r.scrollTop = s, i.style.width = a + 1 + "px", i.style.height = u + 1 + "px", n.scrollLeft = c, n.scrollTop = l
    }

    function b(e, i, r) {
        var o = null;
        t.watch([r, e, i], (function (e, t, i) {
            var r = e[0], s = e[1], a = e[2];
            if (r && s && a) {
                var u = !0 === a ? {} : a, c = u.throttle, l = void 0 === c ? 100 : c, _ = u.onResize, h = function () {
                    s.resize(), null == _ || _()
                };
                o = l ? n.throttle(h, l) : h, v(r, o)
            }
            i((function () {
                r && o && function (e, t) {
                    var n = e.__resize_listeners__;
                    if (n) {
                        if (t && n.splice(n.indexOf(t), 1), !n.length || !t) {
                            if (e.detachEvent && e.removeEventListener) return e.detachEvent("onresize", e.__resize_legacy_resize_handler__), void document.removeEventListener("DOMSubtreeModified", e.__resize_mutation_handler__);
                            e.__resize_observer__ ? (e.__resize_observer__.unobserve(e), e.__resize_observer__.disconnect(), e.__resize_observer__ = null) : (e.__resize_mutation_observer__ && (e.__resize_mutation_observer__.disconnect(), e.__resize_mutation_observer__ = null), e.removeEventListener("scroll", p), e.removeChild(e.__resize_triggers__.triggers), e.__resize_triggers__ = null), e.__resize_listeners__ = null
                        }
                        !--d && f && f.parentNode.removeChild(f)
                    }
                }(r, o)
            }))
        }))
    }

    var z = {autoresize: [Boolean, Object]}, w = /^on[^a-z]/, y = function (e) {
        return w.test(e)
    };

    function E(e, n) {
        var i = t.unref(e);
        return i && "object" == typeof i && "value" in i ? i.value || n : i || n
    }

    var O = "ecLoadingOptions";
    var x = {loading: Boolean, loadingOptions: Object}, V = null, C = "x-vue-echarts";
    var A = [], j = [];
    !function (e, t) {
        if (e && "undefined" != typeof document) {
            var n, i = !0 === t.prepend ? "prepend" : "append", r = !0 === t.singleTag,
                o = "string" == typeof t.container ? document.querySelector(t.container) : document.getElementsByTagName("head")[0];
            if (r) {
                var s = A.indexOf(o);
                -1 === s && (s = A.push(o) - 1, j[s] = {}), n = j[s] && j[s][i] ? j[s][i] : j[s][i] = a()
            } else n = a();
            65279 === e.charCodeAt(0) && (e = e.substring(1)), n.styleSheet ? n.styleSheet.cssText += e : n.appendChild(document.createTextNode(e))
        }

        function a() {
            var e = document.createElement("style");
            if (e.setAttribute("type", "text/css"), t.attributes) for (var n = Object.keys(t.attributes), r = 0; r < n.length; r++) e.setAttribute(n[r], t.attributes[n[r]]);
            var s = "prepend" === i ? "afterbegin" : "beforeend";
            return o.insertAdjacentElement(s, e), e
        }
    }("x-vue-echarts{display:block;width:100%;height:100%;min-width:0}x-vue-echarts>div{width:100%;height:100%}\n", {});
    var T = function () {
        if (null != V) return V;
        if ("undefined" == typeof HTMLElement || "undefined" == typeof customElements) return V = !1;
        try {
            new Function("tag", "class EChartsElement extends HTMLElement {\n  __dispose = null;\n\n  disconnectedCallback() {\n    if (this.__dispose) {\n      this.__dispose();\n      this.__dispose = null;\n    }\n  }\n}\n\nif (customElements.get(tag) == null) {\n  customElements.define(tag, EChartsElement);\n}\n")(C)
        } catch (e) {
            return V = !1
        }
        return V = !0
    }();
    t.Vue2 && t.Vue2.config.ignoredElements.push(C);
    var L = "ecTheme", D = "ecInitOptions", S = "ecUpdateOptions", N = t.defineComponent({
        name: "echarts",
        props: i(i({
            option: Object,
            theme: {type: [Object, String]},
            initOptions: Object,
            updateOptions: Object,
            group: String,
            manualUpdate: Boolean
        }, z), x),
        emits: {},
        inheritAttrs: !1,
        setup: function (e, r) {
            var s = r.attrs, a = t.shallowRef(), u = t.shallowRef(), c = t.shallowRef(), l = t.shallowRef(),
                _ = t.inject(L, null), d = t.inject(D, null), f = t.inject(S, null), v = t.toRefs(e), h = v.autoresize,
                p = v.manualUpdate, g = v.loading, m = v.loadingOptions, z = t.computed((function () {
                    return l.value || e.option || null
                })), w = t.computed((function () {
                    return e.theme || E(_, {})
                })), x = t.computed((function () {
                    return e.initOptions || E(d, {})
                })), V = t.computed((function () {
                    return e.updateOptions || E(f, {})
                })), C = t.computed((function () {
                    return function (e) {
                        var t = {};
                        for (var n in e) y(n) || (t[n] = e[n]);
                        return t
                    }(s)
                })), A = t.getCurrentInstance().proxy.$listeners;

            function j(i) {
                if (u.value) {
                    var r = c.value = n.init(u.value, w.value, x.value);
                    e.group && (r.group = e.group);
                    var o = A;
                    o || (o = {}, Object.keys(s).filter((function (e) {
                        return 0 === e.indexOf("on") && e.length > 2
                    })).forEach((function (e) {
                        var t = e.charAt(2).toLowerCase() + e.slice(3);
                        "Once" === t.substring(t.length - 4) && (t = "~".concat(t.substring(0, t.length - 4))), o[t] = s[e]
                    }))), Object.keys(o).forEach((function (e) {
                        var t = o[e];
                        if (t) {
                            var n = e.toLowerCase();
                            "~" === n.charAt(0) && (n = n.substring(1), t.__once__ = !0);
                            var i = r;
                            if (0 === n.indexOf("zr:") && (i = r.getZr(), n = n.substring(3)), t.__once__) {
                                delete t.__once__;
                                var s = t;
                                t = function () {
                                    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                                    s.apply(void 0, e), i.off(n, t)
                                }
                            }
                            i.on(n, t)
                        }
                    })), h.value ? t.nextTick((function () {
                        r && !r.isDisposed() && r.resize(), a()
                    })) : a()
                }

                function a() {
                    var e = i || z.value;
                    e && r.setOption(e, V.value)
                }
            }

            function N() {
                c.value && (c.value.dispose(), c.value = void 0)
            }

            var I = null;
            t.watch(p, (function (n) {
                "function" == typeof I && (I(), I = null), n || (I = t.watch((function () {
                    return e.option
                }), (function (e, t) {
                    e && (c.value ? c.value.setOption(e, i({notMerge: e !== t}, V.value)) : j())
                }), {deep: !0}))
            }), {immediate: !0}), t.watch([w, x], (function () {
                N(), j()
            }), {deep: !0}), t.watchEffect((function () {
                e.group && c.value && (c.value.group = e.group)
            }));
            var M = o(c);
            return function (e, n, r) {
                var o = t.inject(O, {}), s = t.computed((function () {
                    return i(i({}, E(o, {})), null == r ? void 0 : r.value)
                }));
                t.watchEffect((function () {
                    var t = e.value;
                    t && (n.value ? t.showLoading(s.value) : t.hideLoading())
                }))
            }(c, g, m), b(c, h, u), t.onMounted((function () {
                j()
            })), t.onBeforeUnmount((function () {
                T && a.value ? a.value.__dispose = N : N()
            })), i({
                chart: c, root: a, inner: u, setOption: function (t, n) {
                    e.manualUpdate && (l.value = t), c.value ? c.value.setOption(t, n || {}) : j(t)
                }, nonEventAttrs: C
            }, M)
        },
        render: function () {
            var e = t.Vue2 ? {attrs: this.nonEventAttrs} : i({}, this.nonEventAttrs);
            return e.ref = "root", e.class = e.class ? ["echarts"].concat(e.class) : "echarts", t.h(C, e, [t.h("div", {ref: "inner"})])
        }
    }), I = Object.freeze({
        __proto__: null,
        default: N,
        LOADING_OPTIONS_KEY: O,
        THEME_KEY: L,
        INIT_OPTIONS_KEY: D,
        UPDATE_OPTIONS_KEY: S
    });
    return i(i({}, N), I)
}));