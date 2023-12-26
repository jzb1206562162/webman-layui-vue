!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Vue3PrintNb = t()
}(this, (function () {
    "use strict";

    class e {
        constructor(e) {
            this.standards = {
                strict: "strict",
                loose: "loose",
                html5: "html5"
            }, this.previewBody = null, this.close = null, this.previewBodyUtilPrintBtn = null, this.selectArray = [], this.counter = 0, this.settings = {standard: this.standards.html5}, Object.assign(this.settings, e), this.init()
        }

        init() {
            this.counter++, this.settings.id = `printArea_${this.counter}`;
            let e = "";
            this.settings.url && !this.settings.asyncUrl && (e = this.settings.url);
            let t = this;
            if (this.settings.asyncUrl) return void t.settings.asyncUrl((function (e) {
                let i = t.getPrintWindow(e);
                t.settings.preview ? t.previewIfrmaeLoad() : t.print(i)
            }), t.settings.vue);
            let i = this.getPrintWindow(e);
            this.settings.url || this.write(i.doc), this.settings.preview ? this.previewIfrmaeLoad() : this.print(i)
        }

        addEvent(e, t, i) {
            e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i
        }

        previewIfrmaeLoad() {
            let e = document.getElementById("vue-pirnt-nb-previewBox");
            if (e) {
                let t = this, i = e.querySelector("iframe");
                this.settings.previewBeforeOpenCallback(), this.addEvent(i, "load", (function () {
                    t.previewBoxShow(), t.removeCanvasImg(), t.settings.previewOpenCallback()
                })), this.addEvent(e.querySelector(".previewBodyUtilPrintBtn"), "click", (function () {
                    t.settings.beforeOpenCallback(), t.settings.openCallback(), i.contentWindow.print(), t.settings.closeCallback()
                }))
            }
        }

        removeCanvasImg() {
            let e = this;
            try {
                if (e.elsdom) {
                    let t = e.elsdom.querySelectorAll(".canvasImg");
                    for (let e = 0; e < t.length; e++) t[e].remove()
                }
            } catch (t) {
                console.log(t)
            }
        }

        print(e) {
            var t = this;
            let i = document.getElementById(this.settings.id) || e.f,
                l = document.getElementById(this.settings.id).contentWindow || e.f.contentWindow;
            t.settings.beforeOpenCallback(), t.addEvent(i, "load", (function () {
                l.focus(), t.settings.openCallback(), l.print(), i.remove(), t.settings.closeCallback(), t.removeCanvasImg()
            }))
        }

        write(e) {
            e.open(), e.write(`${this.docType()}<html>${this.getHead()}${this.getBody()}</html>`), e.close()
        }

        docType() {
            return this.settings.standard === this.standards.html5 ? "<!DOCTYPE html>" : `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${this.settings.standard === this.standards.loose ? " Transitional" : ""}//EN" "http://www.w3.org/TR/html4/${this.settings.standard === this.standards.loose ? "loose" : "strict"}.dtd">`
        }

        getHead() {
            let e = "", t = "", i = "";
            this.settings.extraHead && this.settings.extraHead.replace(/([^,]+)/g, (t => {
                e += t
            })), [].forEach.call(document.querySelectorAll("link"), (function (e) {
                e.href.indexOf(".css") >= 0 && (t += `<link type="text/css" rel="stylesheet" href="${e.href}" >`)
            }));
            let l = document.styleSheets;
            if (l && l.length > 0) for (let r = 0; r < l.length; r++) try {
                if (l[r].cssRules || l[r].rules) {
                    let e = l[r].cssRules || l[r].rules;
                    for (let t = 0; t < e.length; t++) i += e[t].cssText
                }
            } catch (s) {
                console.log(l[r].href + s)
            }
            return this.settings.extraCss && this.settings.extraCss.replace(/([^,\s]+)/g, (e => {
                t += `<link type="text/css" rel="stylesheet" href="${e}">`
            })), `<head><title>${this.settings.popTitle}</title>${e}${t}<style type="text/css">${i}</style></head>`
        }

        getBody() {
            let e = this.settings.ids;
            return e = e.replace(new RegExp("#", "g"), ""), this.elsdom = this.beforeHanler(document.getElementById(e)), "<body>" + this.getFormData(this.elsdom).outerHTML + "</body>"
        }

        beforeHanler(e) {
            let t = e.querySelectorAll("canvas");
            for (let i = 0; i < t.length; i++) if (!t[i].style.display) {
                let e = t[i].parentNode, l = t[i].toDataURL("image/png"), s = new Image;
                s.className = "canvasImg", s.style.display = "none", s.src = l, e.appendChild(s)
            }
            return e
        }

        getFormData(e) {
            let t = e.cloneNode(!0), i = t.querySelectorAll("input,select,textarea"),
                l = t.querySelectorAll(".canvasImg,canvas"), s = -1;
            for (let r = 0; r < l.length; r++) {
                let e = l[r].parentNode, t = l[r];
                "canvas" === t.tagName.toLowerCase() ? e.removeChild(t) : t.style.display = "block"
            }
            for (let r = 0; r < i.length; r++) {
                let t = i[r], l = t.getAttribute("type"), n = i[r];
                if (l || (l = "SELECT" === t.tagName ? "select" : "TEXTAREA" === t.tagName ? "textarea" : ""), "INPUT" === t.tagName) "radio" === l || "checkbox" === l ? t.checked && n.setAttribute("checked", t.checked) : (n.value = t.value, n.setAttribute("value", t.value)); else if ("select" === l) {
                    s++;
                    for (let i = 0; i < e.querySelectorAll("select").length; i++) {
                        let l = e.querySelectorAll("select")[i];
                        if (!l.getAttribute("newbs") && l.setAttribute("newbs", i), l.getAttribute("newbs") == s) {
                            let i = e.querySelectorAll("select")[s].selectedIndex;
                            t.options[i].setAttribute("selected", !0)
                        }
                    }
                } else n.innerHTML = t.value, n.setAttribute("html", t.value)
            }
            return t
        }

        getPrintWindow(e) {
            var t = this.Iframe(e);
            return {f: t, win: t.contentWindow || t, doc: t.doc}
        }

        previewBoxShow() {
            let e = document.getElementById("vue-pirnt-nb-previewBox");
            e && (document.querySelector("html").setAttribute("style", "overflow: hidden"), e.style.display = "block")
        }

        previewBoxHide() {
            let e = document.getElementById("vue-pirnt-nb-previewBox");
            e && (document.querySelector("html").setAttribute("style", "overflow: visible;"), e.querySelector("iframe") && e.querySelector("iframe").remove(), e.style.display = "none")
        }

        previewBox() {
            let e = document.getElementById("vue-pirnt-nb-previewBox"), t = "previewBody";
            if (e) return e.querySelector("iframe") && e.querySelector("iframe").remove(), {
                close: e.querySelector(".previewClose"),
                previewBody: e.querySelector(".previewBody")
            };
            let i = document.createElement("div");
            i.setAttribute("id", "vue-pirnt-nb-previewBox"), i.setAttribute("style", "position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;background: white;display:none"), i.style.zIndex = this.settings.zIndex;
            let l = document.createElement("div");
            l.setAttribute("class", "previewHeader"), l.setAttribute("style", "padding: 5px 20px;"), l.innerHTML = this.settings.previewTitle, i.appendChild(l), this.close = document.createElement("div");
            let s = this.close;
            s.setAttribute("class", "previewClose"), s.setAttribute("style", "position: absolute;top: 5px;right: 20px;width: 25px;height: 20px;cursor: pointer;");
            let r = document.createElement("div"), n = document.createElement("div");
            r.setAttribute("class", "closeBefore"), r.setAttribute("style", "position: absolute;width: 3px;height: 100%;background: #040404;transform: rotate(45deg); top: 0px;left: 50%;"), n.setAttribute("class", "closeAfter"), n.setAttribute("style", "position: absolute;width: 3px;height: 100%;background: #040404;transform: rotate(-45deg); top: 0px;left: 50%;"), s.appendChild(r), s.appendChild(n), l.appendChild(s), this.previewBody = document.createElement("div");
            let o = this.previewBody;
            o.setAttribute("class", t), o.setAttribute("style", "display: flex;flex-direction: column; height: 100%;"), i.appendChild(o);
            let a = document.createElement("div");
            a.setAttribute("class", "previewBodyUtil"), a.setAttribute("style", "height: 32px;background: #474747;position: relative;"), o.appendChild(a), this.previewBodyUtilPrintBtn = document.createElement("div");
            let d = this.previewBodyUtilPrintBtn;
            return d.setAttribute("class", "previewBodyUtilPrintBtn"), d.innerHTML = this.settings.previewPrintBtnLabel, d.setAttribute("style", "position: absolute;padding: 2px 10px;margin-top: 3px;left: 24px;font-size: 14px;color: white;cursor: pointer;background-color: rgba(0,0,0,.12);background-image: linear-gradient(hsla(0,0%,100%,.05),hsla(0,0%,100%,0));background-clip: padding-box;border: 1px solid rgba(0,0,0,.35);border-color: rgba(0,0,0,.32) rgba(0,0,0,.38) rgba(0,0,0,.42);box-shadow: inset 0 1px 0 hsla(0,0%,100%,.05), inset 0 0 1px hsla(0,0%,100%,.15), 0 1px 0 hsla(0,0%,100%,.05);"), a.appendChild(d), document.body.appendChild(i), {
                close: this.close,
                previewBody: this.previewBody
            }
        }

        iframeBox(e, t) {
            let i = document.createElement("iframe");
            return i.style.border = "0px", i.style.position = "absolute", i.style.width = "0px", i.style.height = "0px", i.style.right = "0px", i.style.top = "0px", i.setAttribute("id", e), i.setAttribute("src", t), i
        }

        Iframe(e) {
            let t = this.settings.id;
            e = e || (new Date).getTime();
            let i = this, l = this.iframeBox(t, e);
            try {
                if (this.settings.preview) {
                    l.setAttribute("style", "border: 0px;flex: 1;");
                    let e = this.previewBox(), t = e.previewBody, s = e.close;
                    t.appendChild(l), this.addEvent(s, "click", (function () {
                        i.previewBoxHide()
                    }))
                } else document.body.appendChild(l);
                l.doc = null, l.doc = l.contentDocument ? l.contentDocument : l.contentWindow ? l.contentWindow.document : l.document
            } catch (s) {
                throw new Error(s + ". iframes may not be supported in this browser.")
            }
            if (null == l.doc) throw new Error("Cannot find document.");
            return l
        }
    }

    var t = {
        directiveName: "print", mounted(t, i, l) {
            let s = i.instance, r = "";
            var n, o, a;
            o = "click", a = () => {
                if ("string" == typeof i.value) r = i.value; else {
                    if ("object" != typeof i.value || !i.value.id) return void window.print();
                    {
                        r = i.value.id;
                        let e = r.replace(new RegExp("#", "g"), "");
                        document.getElementById(e) || (console.log("id in Error"), r = "")
                    }
                }
                d()
            }, (n = t).addEventListener ? n.addEventListener(o, a, !1) : n.attachEvent ? n.attachEvent("on" + o, a) : n["on" + o] = a;
            const d = () => {
                new e({
                    ids: r,
                    vue: s,
                    url: i.value.url,
                    standard: "",
                    extraHead: i.value.extraHead,
                    extraCss: i.value.extraCss,
                    zIndex: i.value.zIndex || 20002,
                    previewTitle: i.value.previewTitle || "打印预览",
                    previewPrintBtnLabel: i.value.previewPrintBtnLabel || "打印",
                    popTitle: i.value.popTitle,
                    preview: i.value.preview || !1,
                    asyncUrl: i.value.asyncUrl,
                    previewBeforeOpenCallback() {
                        i.value.previewBeforeOpenCallback && i.value.previewBeforeOpenCallback(s)
                    },
                    previewOpenCallback() {
                        i.value.previewOpenCallback && i.value.previewOpenCallback(s)
                    },
                    openCallback() {
                        i.value.openCallback && i.value.openCallback(s)
                    },
                    closeCallback() {
                        i.value.closeCallback && i.value.closeCallback(s)
                    },
                    beforeOpenCallback() {
                        i.value.beforeOpenCallback && i.value.beforeOpenCallback(s)
                    }
                })
            }
        }, install: function (e) {
            e.directive("print", t)
        }
    };
    return t
}));