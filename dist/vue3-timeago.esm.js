function e(e, t) {
    const n = Object.create(null), o = e.split(",");
    for (let e = 0; e < o.length; e++) n[o[e]] = !0;
    return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

const t = e("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl");

function n(e) {
    if (_(e)) {
        const t = {};
        for (let o = 0; o < e.length; o++) {
            const r = e[o], c = n(y(r) ? s(r) : r);
            if (c) for (const e in c) t[e] = c[e]
        }
        return t
    }
    if (E(e)) return e
}

const o = /;(?![^(]*\))/g, r = /:(.+)/;

function s(e) {
    const t = {};
    return e.split(o).forEach((e => {
        if (e) {
            const n = e.split(r);
            n.length > 1 && (t[n[0].trim()] = n[1].trim())
        }
    })), t
}

function c(e) {
    let t = "";
    if (y(e)) t = e; else if (_(e)) for (let n = 0; n < e.length; n++) t += c(e[n]) + " "; else if (E(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

const i = "production" !== process.env.NODE_ENV ? Object.freeze({}) : {},
    a = "production" !== process.env.NODE_ENV ? Object.freeze([]) : [], l = () => {
    }, u = /^on[^a-z]/, p = e => u.test(e), f = Object.assign, d = Object.prototype.hasOwnProperty,
    h = (e, t) => d.call(e, t), _ = Array.isArray, v = e => "[object Map]" === N(e), g = e => "function" == typeof e,
    y = e => "string" == typeof e, m = e => "symbol" == typeof e, E = e => null !== e && "object" == typeof e,
    w = Object.prototype.toString, N = e => w.call(e), b = e => N(e).slice(8, -1),
    O = e => y(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e, V = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }, k = V((e => e.charAt(0).toUpperCase() + e.slice(1))), S = V((e => e ? `on${k(e)}` : "")),
    D = (e, t) => e !== t && (e == e || t == t);
let x;
const $ = new WeakMap, R = [];
let C;
const j = Symbol("production" !== process.env.NODE_ENV ? "iterate" : ""),
    I = Symbol("production" !== process.env.NODE_ENV ? "Map key iterate" : "");

function P(e, t = i) {
    (function (e) {
        return e && !0 === e._isEffect
    })(e) && (e = e.raw);
    const n = function (e, t) {
        const n = function () {
            if (!n.active) return t.scheduler ? void 0 : e();
            if (!R.includes(n)) {
                A(n);
                try {
                    return U.push(F), F = !0, R.push(n), C = n, e()
                } finally {
                    R.pop(), B(), C = R[R.length - 1]
                }
            }
        };
        return n.id = T++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n
    }(e, t);
    return t.lazy || n(), n
}

function M(e) {
    e.active && (A(e), e.options.onStop && e.options.onStop(), e.active = !1)
}

let T = 0;

function A(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}

let F = !0;
const U = [];

function z() {
    U.push(F), F = !1
}

function B() {
    const e = U.pop();
    F = void 0 === e || e
}

function H(e, t, n) {
    if (!F || void 0 === C) return;
    let o = $.get(e);
    o || $.set(e, o = new Map);
    let r = o.get(n);
    r || o.set(n, r = new Set), r.has(C) || (r.add(C), C.deps.push(r), "production" !== process.env.NODE_ENV && C.options.onTrack && C.options.onTrack({
        effect: C,
        target: e,
        type: t,
        key: n
    }))
}

function W(e, t, n, o, r, s) {
    const c = $.get(e);
    if (!c) return;
    const i = new Set, a = e => {
        e && e.forEach((e => {
            (e !== C || e.allowRecurse) && i.add(e)
        }))
    };
    if ("clear" === t) c.forEach(a); else if ("length" === n && _(e)) c.forEach(((e, t) => {
        ("length" === t || t >= o) && a(e)
    })); else switch (void 0 !== n && a(c.get(n)), t) {
        case"add":
            _(e) ? O(n) && a(c.get("length")) : (a(c.get(j)), v(e) && a(c.get(I)));
            break;
        case"delete":
            _(e) || (a(c.get(j)), v(e) && a(c.get(I)));
            break;
        case"set":
            v(e) && a(c.get(j))
    }
    i.forEach((c => {
        "production" !== process.env.NODE_ENV && c.options.onTrigger && c.options.onTrigger({
            effect: c,
            target: e,
            key: n,
            type: t,
            newValue: o,
            oldValue: r,
            oldTarget: s
        }), c.options.scheduler ? c.options.scheduler(c) : c()
    }))
}

const K = new Set(Object.getOwnPropertyNames(Symbol).map((e => Symbol[e])).filter(m)), L = Q(), J = Q(!1, !0),
    q = Q(!0), Y = Q(!0, !0), G = {};

function Q(e = !1, t = !1) {
    return function (n, o, r) {
        if ("__v_isReactive" === o) return !e;
        if ("__v_isReadonly" === o) return e;
        if ("__v_raw" === o && r === (e ? Oe : be).get(n)) return n;
        const s = _(n);
        if (s && h(G, o)) return Reflect.get(G, o, r);
        const c = Reflect.get(n, o, r);
        if (m(o) ? K.has(o) : "__proto__" === o || "__v_isRef" === o) return c;
        if (e || H(n, "get", o), t) return c;
        if (Ie(c)) {
            return !s || !O(o) ? c.value : c
        }
        return E(c) ? e ? ke(c) : Ve(c) : c
    }
}

["includes", "indexOf", "lastIndexOf"].forEach((e => {
    const t = Array.prototype[e];
    G[e] = function (...e) {
        const n = Ce(this);
        for (let e = 0, t = this.length; e < t; e++) H(n, "get", e + "");
        const o = t.apply(n, e);
        return -1 === o || !1 === o ? t.apply(n, e.map(Ce)) : o
    }
})), ["push", "pop", "shift", "unshift", "splice"].forEach((e => {
    const t = Array.prototype[e];
    G[e] = function (...e) {
        z();
        const n = t.apply(this, e);
        return B(), n
    }
}));

function X(e = !1) {
    return function (t, n, o, r) {
        const s = t[n];
        if (!e && (o = Ce(o), !_(t) && Ie(s) && !Ie(o))) return s.value = o, !0;
        const c = _(t) && O(n) ? Number(n) < t.length : h(t, n), i = Reflect.set(t, n, o, r);
        return t === Ce(r) && (c ? D(o, s) && W(t, "set", n, o, s) : W(t, "add", n, o)), i
    }
}

const Z = {
        get: L, set: X(), deleteProperty: function (e, t) {
            const n = h(e, t), o = e[t], r = Reflect.deleteProperty(e, t);
            return r && n && W(e, "delete", t, void 0, o), r
        }, has: function (e, t) {
            const n = Reflect.has(e, t);
            return m(t) && K.has(t) || H(e, "has", t), n
        }, ownKeys: function (e) {
            return H(e, "iterate", _(e) ? "length" : j), Reflect.ownKeys(e)
        }
    }, ee = {
        get: q,
        set: (e, t) => ("production" !== process.env.NODE_ENV && console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0),
        deleteProperty: (e, t) => ("production" !== process.env.NODE_ENV && console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0)
    }, te = (f({}, Z, {get: J, set: X(!0)}), f({}, ee, {get: Y})), ne = e => E(e) ? Ve(e) : e, oe = e => E(e) ? ke(e) : e,
    re = e => e, se = e => Reflect.getPrototypeOf(e);

function ce(e, t, n = !1, o = !1) {
    const r = Ce(e = e.__v_raw), s = Ce(t);
    t !== s && !n && H(r, "get", t), !n && H(r, "get", s);
    const {has: c} = se(r), i = n ? oe : o ? re : ne;
    return c.call(r, t) ? i(e.get(t)) : c.call(r, s) ? i(e.get(s)) : void 0
}

function ie(e, t = !1) {
    const n = this.__v_raw, o = Ce(n), r = Ce(e);
    return e !== r && !t && H(o, "has", e), !t && H(o, "has", r), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function ae(e, t = !1) {
    return e = e.__v_raw, !t && H(Ce(e), "iterate", j), Reflect.get(e, "size", e)
}

function le(e) {
    e = Ce(e);
    const t = Ce(this), n = se(t).has.call(t, e), o = t.add(e);
    return n || W(t, "add", e, e), o
}

function ue(e, t) {
    t = Ce(t);
    const n = Ce(this), {has: o, get: r} = se(n);
    let s = o.call(n, e);
    s ? "production" !== process.env.NODE_ENV && Ne(n, o, e) : (e = Ce(e), s = o.call(n, e));
    const c = r.call(n, e), i = n.set(e, t);
    return s ? D(t, c) && W(n, "set", e, t, c) : W(n, "add", e, t), i
}

function pe(e) {
    const t = Ce(this), {has: n, get: o} = se(t);
    let r = n.call(t, e);
    r ? "production" !== process.env.NODE_ENV && Ne(t, n, e) : (e = Ce(e), r = n.call(t, e));
    const s = o ? o.call(t, e) : void 0, c = t.delete(e);
    return r && W(t, "delete", e, void 0, s), c
}

function fe() {
    const e = Ce(this), t = 0 !== e.size,
        n = "production" !== process.env.NODE_ENV ? v(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
    return t && W(e, "clear", void 0, void 0, n), o
}

function de(e, t) {
    return function (n, o) {
        const r = this, s = r.__v_raw, c = Ce(s), i = e ? oe : t ? re : ne;
        return !e && H(c, "iterate", j), s.forEach(((e, t) => n.call(o, i(e), i(t), r)))
    }
}

function he(e, t, n) {
    return function (...o) {
        const r = this.__v_raw, s = Ce(r), c = v(s), i = "entries" === e || e === Symbol.iterator && c,
            a = "keys" === e && c, l = r[e](...o), u = t ? oe : n ? re : ne;
        return !t && H(s, "iterate", a ? I : j), {
            next() {
                const {value: e, done: t} = l.next();
                return t ? {value: e, done: t} : {value: i ? [u(e[0]), u(e[1])] : u(e), done: t}
            }, [Symbol.iterator]() {
                return this
            }
        }
    }
}

function _e(e) {
    return function (...t) {
        if ("production" !== process.env.NODE_ENV) {
            const n = t[0] ? `on key "${t[0]}" ` : "";
            console.warn(`${k(e)} operation ${n}failed: target is readonly.`, Ce(this))
        }
        return "delete" !== e && this
    }
}

const ve = {
    get(e) {
        return ce(this, e)
    }, get size() {
        return ae(this)
    }, has: ie, add: le, set: ue, delete: pe, clear: fe, forEach: de(!1, !1)
}, ge = {
    get(e) {
        return ce(this, e, !1, !0)
    }, get size() {
        return ae(this)
    }, has: ie, add: le, set: ue, delete: pe, clear: fe, forEach: de(!1, !0)
}, ye = {
    get(e) {
        return ce(this, e, !0)
    }, get size() {
        return ae(this, !0)
    }, has(e) {
        return ie.call(this, e, !0)
    }, add: _e("add"), set: _e("set"), delete: _e("delete"), clear: _e("clear"), forEach: de(!0, !1)
};

function me(e, t) {
    const n = t ? ge : e ? ye : ve;
    return (t, o, r) => "__v_isReactive" === o ? !e : "__v_isReadonly" === o ? e : "__v_raw" === o ? t : Reflect.get(h(n, o) && o in t ? n : t, o, r)
}

["keys", "values", "entries", Symbol.iterator].forEach((e => {
    ve[e] = he(e, !1, !1), ye[e] = he(e, !0, !1), ge[e] = he(e, !1, !0)
}));
const Ee = {get: me(!1, !1)}, we = {get: me(!0, !1)};

function Ne(e, t, n) {
    const o = Ce(n);
    if (o !== n && t.call(e, o)) {
        const t = b(e);
        console.warn(`Reactive ${t} contains both the raw and reactive versions of the same object${"Map" === t ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
    }
}

const be = new WeakMap, Oe = new WeakMap;

function Ve(e) {
    return e && e.__v_isReadonly ? e : De(e, !1, Z, Ee)
}

function ke(e) {
    return De(e, !0, ee, we)
}

function Se(e) {
    return De(e, !0, te, we)
}

function De(e, t, n, o) {
    if (!E(e)) return "production" !== process.env.NODE_ENV && console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const r = t ? Oe : be, s = r.get(e);
    if (s) return s;
    const c = (i = e).__v_skip || !Object.isExtensible(i) ? 0 : function (e) {
        switch (e) {
            case"Object":
            case"Array":
                return 1;
            case"Map":
            case"Set":
            case"WeakMap":
            case"WeakSet":
                return 2;
            default:
                return 0
        }
    }(b(i));
    var i;
    if (0 === c) return e;
    const a = new Proxy(e, 2 === c ? o : n);
    return r.set(e, a), a
}

function xe(e) {
    return $e(e) ? xe(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function $e(e) {
    return !(!e || !e.__v_isReadonly)
}

function Re(e) {
    return xe(e) || $e(e)
}

function Ce(e) {
    return e && Ce(e.__v_raw) || e
}

const je = e => E(e) ? Ve(e) : e;

function Ie(e) {
    return Boolean(e && !0 === e.__v_isRef)
}

function Pe(e) {
    return function (e, t = !1) {
        if (Ie(e)) return e;
        return new Me(e, t)
    }(e)
}

class Me {
    constructor(e, t = !1) {
        this._rawValue = e, this._shallow = t, this.__v_isRef = !0, this._value = t ? e : je(e)
    }

    get value() {
        return H(Ce(this), "get", "value"), this._value
    }

    set value(e) {
        D(Ce(e), this._rawValue) && (this._rawValue = e, this._value = this._shallow ? e : je(e), W(Ce(this), "set", "value", e))
    }
}

class Te {
    constructor(e, t, n) {
        this._setter = t, this._dirty = !0, this.__v_isRef = !0, this.effect = P(e, {
            lazy: !0, scheduler: () => {
                this._dirty || (this._dirty = !0, W(Ce(this), "set", "value"))
            }
        }), this.__v_isReadonly = n
    }

    get value() {
        return this._dirty && (this._value = this.effect(), this._dirty = !1), H(Ce(this), "get", "value"), this._value
    }

    set value(e) {
        this._setter(e)
    }
}

const Ae = [];

function Fe(e, ...t) {
    z();
    const n = Ae.length ? Ae[Ae.length - 1].component : null, o = n && n.appContext.config.warnHandler,
        r = function () {
            let e = Ae[Ae.length - 1];
            if (!e) return [];
            const t = [];
            for (; e;) {
                const n = t[0];
                n && n.vnode === e ? n.recurseCount++ : t.push({vnode: e, recurseCount: 0});
                const o = e.component && e.component.parent;
                e = o && o.vnode
            }
            return t
        }();
    if (o) He(o, n, 11, [e + t.join(""), n && n.proxy, r.map((({vnode: e}) => `at <${Zt(n, e.type)}>`)).join("\n"), r]); else {
        const n = [`[Vue warn]: ${e}`, ...t];
        r.length && n.push("\n", ...function (e) {
            const t = [];
            return e.forEach(((e, n) => {
                t.push(...0 === n ? [] : ["\n"], ...function ({vnode: e, recurseCount: t}) {
                    const n = t > 0 ? `... (${t} recursive calls)` : "",
                        o = !!e.component && null == e.component.parent, r = ` at <${Zt(e.component, e.type, o)}`,
                        s = ">" + n;
                    return e.props ? [r, ...Ue(e.props), s] : [r + s]
                }(e))
            })), t
        }(r)), console.warn(...n)
    }
    B()
}

function Ue(e) {
    const t = [], n = Object.keys(e);
    return n.slice(0, 3).forEach((n => {
        t.push(...ze(n, e[n]))
    })), n.length > 3 && t.push(" ..."), t
}

function ze(e, t, n) {
    return y(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : "number" == typeof t || "boolean" == typeof t || null == t ? n ? t : [`${e}=${t}`] : Ie(t) ? (t = ze(e, Ce(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : g(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Ce(t), n ? t : [`${e}=`, t])
}

const Be = {
    bc: "beforeCreate hook",
    c: "created hook",
    bm: "beforeMount hook",
    m: "mounted hook",
    bu: "beforeUpdate hook",
    u: "updated",
    bum: "beforeUnmount hook",
    um: "unmounted hook",
    a: "activated hook",
    da: "deactivated hook",
    ec: "errorCaptured hook",
    rtc: "renderTracked hook",
    rtg: "renderTriggered hook",
    0: "setup function",
    1: "render function",
    2: "watcher getter",
    3: "watcher callback",
    4: "watcher cleanup function",
    5: "native event handler",
    6: "component event handler",
    7: "vnode hook",
    8: "directive hook",
    9: "transition hook",
    10: "app errorHandler",
    11: "app warnHandler",
    12: "ref function",
    13: "async component loader",
    14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next"
};

function He(e, t, n, o) {
    let r;
    try {
        r = o ? e(...o) : e()
    } catch (e) {
        Ke(e, t, n)
    }
    return r
}

function We(e, t, n, o) {
    if (g(e)) {
        const s = He(e, t, n, o);
        return s && (E(r = s) && g(r.then) && g(r.catch)) && s.catch((e => {
            Ke(e, t, n)
        })), s
    }
    var r;
    const s = [];
    for (let r = 0; r < e.length; r++) s.push(We(e[r], t, n, o));
    return s
}

function Ke(e, t, n, o = !0) {
    const r = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const r = t.proxy, s = "production" !== process.env.NODE_ENV ? Be[n] : n;
        for (; o;) {
            const t = o.ec;
            if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, s)) return;
            o = o.parent
        }
        const c = t.appContext.config.errorHandler;
        if (c) return void He(c, null, 10, [e, r, s])
    }
    !function (e, t, n, o = !0) {
        if ("production" !== process.env.NODE_ENV) {
            const s = Be[t];
            if (n && (r = n, Ae.push(r)), Fe("Unhandled error" + (s ? ` during execution of ${s}` : "")), n && Ae.pop(), o) throw e;
            console.error(e)
        } else console.error(e);
        var r
    }(e, n, r, o)
}

let Le = !1, Je = !1;
const qe = [];
let Ye = 0;
const Ge = [];
let Qe = null, Xe = 0;
const Ze = [];
let et = null, tt = 0;
const nt = Promise.resolve();
let ot = null, rt = null;

function st(e) {
    const t = ot || nt;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function ct(e) {
    qe.length && qe.includes(e, Le && e.allowRecurse ? Ye + 1 : Ye) || e === rt || (qe.push(e), it())
}

function it() {
    Le || Je || (Je = !0, ot = nt.then(ft))
}

function at(e, t, n, o) {
    _(e) ? n.push(...e) : t && t.includes(e, e.allowRecurse ? o + 1 : o) || n.push(e), it()
}

function lt(e) {
    at(e, et, Ze, tt)
}

function ut(e, t = null) {
    if (Ge.length) {
        for (rt = t, Qe = [...new Set(Ge)], Ge.length = 0, "production" !== process.env.NODE_ENV && (e = e || new Map), Xe = 0; Xe < Qe.length; Xe++) "production" !== process.env.NODE_ENV && dt(e, Qe[Xe]), Qe[Xe]();
        Qe = null, Xe = 0, rt = null, ut(e, t)
    }
}

const pt = e => null == e.id ? 1 / 0 : e.id;

function ft(e) {
    Je = !1, Le = !0, "production" !== process.env.NODE_ENV && (e = e || new Map), ut(e), qe.sort(((e, t) => pt(e) - pt(t)));
    try {
        for (Ye = 0; Ye < qe.length; Ye++) {
            const t = qe[Ye];
            t && ("production" !== process.env.NODE_ENV && dt(e, t), He(t, null, 14))
        }
    } finally {
        Ye = 0, qe.length = 0, function (e) {
            if (Ze.length) {
                const t = [...new Set(Ze)];
                if (Ze.length = 0, et) return void et.push(...t);
                for (et = t, "production" !== process.env.NODE_ENV && (e = e || new Map), et.sort(((e, t) => pt(e) - pt(t))), tt = 0; tt < et.length; tt++) "production" !== process.env.NODE_ENV && dt(e, et[tt]), et[tt]();
                et = null, tt = 0
            }
        }(e), Le = !1, ot = null, (qe.length || Ze.length) && ft(e)
    }
}

function dt(e, t) {
    if (e.has(t)) {
        const n = e.get(t);
        if (n > 100) throw new Error("Maximum recursive updates exceeded. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.");
        e.set(t, n + 1)
    } else e.set(t, 1)
}

const ht = new Set;
if ("production" !== process.env.NODE_ENV) {
    ("undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}).__VUE_HMR_RUNTIME__ = {
        createRecord: vt((function (e) {
            if (_t.has(e)) return !1;
            return _t.set(e, new Set), !0
        })), rerender: vt((function (e, t) {
            const n = _t.get(e);
            if (!n) return;
            Array.from(n).forEach((e => {
                t && (e.render = t), e.renderCache = [], e.update()
            }))
        })), reload: vt((function (e, t) {
            const n = _t.get(e);
            if (!n) return;
            Array.from(n).forEach((e => {
                const n = e.type;
                if (!ht.has(n)) {
                    t = en(t) ? t.__vccOpts : t, f(n, t);
                    for (const e in n) e in t || delete n[e];
                    ht.add(n), lt((() => {
                        ht.delete(n)
                    }))
                }
                e.parent ? ct(e.parent.update) : e.appContext.reload ? e.appContext.reload() : "undefined" != typeof window ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.")
            }))
        }))
    }
}
const _t = new Map;

function vt(e) {
    return (t, n) => {
        try {
            return e(t, n)
        } catch (e) {
            console.error(e), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.")
        }
    }
}

function gt(e) {
    if (g(e) && (e = e()), _(e)) {
        const t = function (e) {
            const t = e.filter((e => !(Tt(e) && e.type === Ct && "v-if" !== e.children)));
            return 1 === t.length && Tt(t[0]) ? t[0] : null
        }(e);
        "production" === process.env.NODE_ENV || t || Fe("<Suspense> slots expect a single root node."), e = t
    }
    return Wt(e)
}

let yt = 0;
const mt = e => yt += e;

function Et(e, t, n = {}, o) {
    let r = e[t];
    "production" !== process.env.NODE_ENV && r && r.length > 1 && (Fe("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), r = () => []), yt++;
    const s = (Pt(), Mt($t, {key: n.key}, r ? r(n) : o ? o() : [], 1 === e._ ? 64 : -2));
    return yt--, s
}

const wt = e => (t, n = Yt) => function (e, t, n = Yt, o = !1) {
    if (n) {
        const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...o) => {
            if (n.isUnmounted) return;
            z(), Gt(n);
            const r = We(t, n, e, o);
            return Gt(null), B(), r
        });
        return o ? r.unshift(s) : r.push(s), s
    }
    "production" !== process.env.NODE_ENV && Fe(`${S(Be[e].replace(/ hook$/, ""))} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`)
}(e, t, n), Nt = wt("m"), bt = wt("um"), Ot = {};

function Vt(e, t, {immediate: n, deep: o, flush: r, onTrack: s, onTrigger: c} = i, a = Yt) {
    "production" === process.env.NODE_ENV || t || (void 0 !== n && Fe('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), void 0 !== o && Fe('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
    const u = e => {
        Fe("Invalid watch source: ", e, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")
    };
    let p, f, d = !1;
    if (Ie(e) ? (p = () => e.value, d = !!e._shallow) : xe(e) ? (p = () => e, o = !0) : _(e) ? p = () => e.map((e => Ie(e) ? e.value : xe(e) ? St(e) : g(e) ? He(e, a, 2) : void ("production" !== process.env.NODE_ENV && u(e)))) : g(e) ? p = t ? () => He(e, a, 2) : () => {
        if (!a || !a.isUnmounted) return f && f(), He(e, a, 3, [h])
    } : (p = l, "production" !== process.env.NODE_ENV && u(e)), t && o) {
        const e = p;
        p = () => St(e())
    }
    const h = e => {
        f = E.options.onStop = () => {
            He(e, a, 4)
        }
    };
    let v = _(e) ? [] : Ot;
    const y = () => {
        if (E.active) if (t) {
            const e = E();
            (o || d || D(e, v)) && (f && f(), We(t, a, 3, [e, v === Ot ? void 0 : v, h]), v = e)
        } else E()
    };
    let m;
    y.allowRecurse = !!t, m = "sync" === r ? y : "post" === r ? () => Dt(y, a && a.suspense) : () => {
        !a || a.isMounted ? function (e) {
            at(e, Qe, Ge, Xe)
        }(y) : y()
    };
    const E = P(p, {lazy: !0, onTrack: s, onTrigger: c, scheduler: m});
    return Qt(E), t ? n ? y() : v = E() : "post" === r ? Dt(E, a && a.suspense) : E(), () => {
        M(E), a && ((e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        })(a.effects, E)
    }
}

function kt(e, t, n) {
    const o = this.proxy;
    return Vt(y(e) ? () => o[e] : e.bind(o), t.bind(o), n, this)
}

function St(e, t = new Set) {
    if (!E(e) || t.has(e)) return e;
    if (t.add(e), Ie(e)) St(e.value, t); else if (_(e)) for (let n = 0; n < e.length; n++) St(e[n], t); else if ("[object Set]" === N(e) || v(e)) e.forEach((e => {
        St(e, t)
    })); else for (const n in e) St(e[n], t);
    return e
}

const Dt = function (e, t) {
        t && t.pendingBranch ? _(e) ? t.effects.push(...e) : t.effects.push(e) : lt(e)
    }, xt = Symbol(), $t = Symbol("production" !== process.env.NODE_ENV ? "Fragment" : void 0),
    Rt = Symbol("production" !== process.env.NODE_ENV ? "Text" : void 0),
    Ct = Symbol("production" !== process.env.NODE_ENV ? "Comment" : void 0),
    jt = (Symbol("production" !== process.env.NODE_ENV ? "Static" : void 0), []);
let It = null;

function Pt(e = !1) {
    jt.push(It = e ? null : [])
}

function Mt(e, t, n, o, r) {
    const s = Ut(e, t, n, o, r, !0);
    return s.dynamicChildren = It || a, jt.pop(), It = jt[jt.length - 1] || null, It && It.push(s), s
}

function Tt(e) {
    return !!e && !0 === e.__v_isVNode
}

const At = ({key: e}) => null != e ? e : null, Ft = ({ref: e}) => null != e ? _(e) ? e : {i: null, r: e} : null,
    Ut = "production" !== process.env.NODE_ENV ? (...e) => zt(...e) : zt;

function zt(e, t = null, o = null, r = 0, s = null, i = !1) {
    if (e && e !== xt || ("production" === process.env.NODE_ENV || e || Fe(`Invalid vnode type when creating vnode: ${e}.`), e = Ct), Tt(e)) {
        const n = Bt(e, t, !0);
        return o && Kt(n, o), n
    }
    if (en(e) && (e = e.__vccOpts), t) {
        (Re(t) || "__vInternal" in t) && (t = f({}, t));
        let {class: e, style: o} = t;
        e && !y(e) && (t.class = c(e)), E(o) && (Re(o) && !_(o) && (o = f({}, o)), t.style = n(o))
    }
    const a = y(e) ? 1 : (e => e.__isSuspense)(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : E(e) ? 4 : g(e) ? 2 : 0;
    "production" !== process.env.NODE_ENV && 4 & a && Re(e) && Fe("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", "\nComponent that was made reactive: ", e = Ce(e));
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && At(t),
        ref: t && Ft(t),
        scopeId: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: a,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null
    };
    if ("production" !== process.env.NODE_ENV && l.key != l.key && Fe("VNode created with invalid key (NaN). VNode type:", l.type), Kt(l, o), 128 & a) {
        const {content: e, fallback: t} = function (e) {
            const {shapeFlag: t, children: n} = e;
            let o, r;
            return 32 & t ? (o = gt(n.default), r = gt(n.fallback)) : (o = gt(n), r = Wt(null)), {
                content: o,
                fallback: r
            }
        }(l);
        l.ssContent = e, l.ssFallback = t
    }
    return !i && It && (r > 0 || 6 & a) && 32 !== r && It.push(l), l
}

function Bt(e, t, o = !1) {
    const {props: r, ref: s, patchFlag: i} = e, a = t ? function (...e) {
        const t = f({}, e[0]);
        for (let o = 1; o < e.length; o++) {
            const r = e[o];
            for (const e in r) if ("class" === e) t.class !== r.class && (t.class = c([t.class, r.class])); else if ("style" === e) t.style = n([t.style, r.style]); else if (p(e)) {
                const n = t[e], o = r[e];
                n !== o && (t[e] = n ? [].concat(n, r[e]) : o)
            } else "" !== e && (t[e] = r[e])
        }
        return t
    }(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && At(a),
        ref: t && t.ref ? o && s ? _(s) ? s.concat(Ft(t)) : [s, Ft(t)] : Ft(t) : s,
        scopeId: e.scopeId,
        children: e.children,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== $t ? -1 === i ? 16 : 16 | i : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Bt(e.ssContent),
        ssFallback: e.ssFallback && Bt(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    }
}

function Ht(e = " ", t = 0) {
    return Ut(Rt, null, e, t)
}

function Wt(e) {
    return null == e || "boolean" == typeof e ? Ut(Ct) : _(e) ? Ut($t, null, e) : "object" == typeof e ? null === e.el ? e : Bt(e) : Ut(Rt, null, String(e))
}

function Kt(e, t) {
    let n = 0;
    const {shapeFlag: o} = e;
    if (null == t) t = null; else if (_(t)) n = 16; else if ("object" == typeof t) {
        if (1 & o || 64 & o) {
            const n = t.default;
            return void (n && (n._c && mt(1), Kt(e, n()), n._c && mt(-1)))
        }
        {
            n = 32;
            const e = t._;
            e || "__vInternal" in t || (t._ctx = null)
        }
    } else g(t) ? (t = {default: t, _ctx: null}, n = 32) : (t = String(t), 64 & o ? (n = 16, t = [Ht(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function Lt(e, t, n) {
    const o = n.appContext.config.optionMergeStrategies, {mixins: r, extends: s} = t;
    s && Lt(e, s, n), r && r.forEach((t => Lt(e, t, n)));
    for (const r in t) o && h(o, r) ? e[r] = o[r](e[r], t[r], n.proxy, r) : e[r] = t[r]
}

const Jt = f(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => "production" !== process.env.NODE_ENV ? Se(e.props) : e.props,
    $attrs: e => "production" !== process.env.NODE_ENV ? Se(e.attrs) : e.attrs,
    $slots: e => "production" !== process.env.NODE_ENV ? Se(e.slots) : e.slots,
    $refs: e => "production" !== process.env.NODE_ENV ? Se(e.refs) : e.refs,
    $parent: e => e.parent && e.parent.proxy,
    $root: e => e.root && e.root.proxy,
    $emit: e => e.emit,
    $options: e => __VUE_OPTIONS_API__ ? function (e) {
        const t = e.type, {__merged: n, mixins: o, extends: r} = t;
        if (n) return n;
        const s = e.appContext.mixins;
        if (!s.length && !o && !r) return t;
        const c = {};
        return s.forEach((t => Lt(c, t, e))), Lt(c, t, e), t.__merged = c
    }(e) : e.type,
    $forceUpdate: e => () => ct(e.update),
    $nextTick: e => st.bind(e.proxy),
    $watch: e => __VUE_OPTIONS_API__ ? kt.bind(e) : l
}), qt = {
    get({_: e}, t) {
        const {ctx: n, setupState: o, data: r, props: s, accessCache: c, type: a, appContext: l} = e;
        if ("__v_skip" === t) return !0;
        if ("production" !== process.env.NODE_ENV && "__isVue" === t) return !0;
        let u;
        if ("$" !== t[0]) {
            const a = c[t];
            if (void 0 !== a) switch (a) {
                case 0:
                    return o[t];
                case 1:
                    return r[t];
                case 3:
                    return n[t];
                case 2:
                    return s[t]
            } else {
                if (o !== i && h(o, t)) return c[t] = 0, o[t];
                if (r !== i && h(r, t)) return c[t] = 1, r[t];
                if ((u = e.propsOptions[0]) && h(u, t)) return c[t] = 2, s[t];
                if (n !== i && h(n, t)) return c[t] = 3, n[t];
                __VUE_OPTIONS_API__, c[t] = 4
            }
        }
        const p = Jt[t];
        let f, d;
        return p ? ("$attrs" === t && (H(e, "get", t), process.env.NODE_ENV), p(e)) : (f = a.__cssModules) && (f = f[t]) ? f : n !== i && h(n, t) ? (c[t] = 3, n[t]) : (d = l.config.globalProperties, h(d, t) ? d[t] : void process.env.NODE_ENV)
    }, set({_: e}, t, n) {
        const {data: o, setupState: r, ctx: s} = e;
        if (r !== i && h(r, t)) r[t] = n; else if (o !== i && h(o, t)) o[t] = n; else if (t in e.props) return "production" !== process.env.NODE_ENV && Fe(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1;
        return "$" === t[0] && t.slice(1) in e ? ("production" !== process.env.NODE_ENV && Fe(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : ("production" !== process.env.NODE_ENV && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
            enumerable: !0,
            configurable: !0,
            value: n
        }) : s[t] = n, !0)
    }, has({_: {data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s}}, c) {
        let a;
        return void 0 !== n[c] || e !== i && h(e, c) || t !== i && h(t, c) || (a = s[0]) && h(a, c) || h(o, c) || h(Jt, c) || h(r.config.globalProperties, c)
    }
};
"production" !== process.env.NODE_ENV && (qt.ownKeys = e => (Fe("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
f({}, qt, {
    get(e, t) {
        if (t !== Symbol.unscopables) return qt.get(e, t, e)
    }, has(e, n) {
        const o = "_" !== n[0] && !t(n);
        return "production" !== process.env.NODE_ENV && !o && qt.has(e, n) && Fe(`Property ${JSON.stringify(n)} should not start with _ which is a reserved prefix for Vue internals.`), o
    }
});
let Yt = null;
const Gt = e => {
    Yt = e
};

function Qt(e) {
    Yt && (Yt.effects || (Yt.effects = [])).push(e)
}

const Xt = /(?:^|[-_])(\w)/g;

function Zt(e, t, n = !1) {
    let o = g(t) && t.displayName || t.name;
    if (!o && t.__file) {
        const e = t.__file.match(/([^/\\]+)\.vue$/);
        e && (o = e[1])
    }
    if (!o && e && e.parent) {
        const n = e => {
            for (const n in e) if (e[n] === t) return n
        };
        o = n(e.components || e.parent.type.components) || n(e.appContext.components)
    }
    return o ? o.replace(Xt, (e => e.toUpperCase())).replace(/[-_]/g, "") : n ? "App" : "Anonymous"
}

function en(e) {
    return g(e) && "__vccOpts" in e
}

function tn(e) {
    const t = function (e) {
        let t, n;
        return g(e) ? (t = e, n = "production" !== process.env.NODE_ENV ? () => {
            console.warn("Write operation failed: computed value is readonly")
        } : l) : (t = e.get, n = e.set), new Te(t, n, g(e) || !e.set)
    }(e);
    return Qt(t.effect), t
}

Symbol("production" !== process.env.NODE_ENV ? "ssrContext" : "");
"production" !== process.env.NODE_ENV && function () {
    const e = x || (x = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});
    e.__VUE__ = !0, e.__VUE_DEVTOOLS_GLOBAL_HOOK__, console.info("You are running a development build of Vue.\nMake sure to use the production build (*.prod.js) when deploying for production."), function () {
        if ("production" === process.env.NODE_ENV) return;
        const e = {style: "color:#3ba776"}, t = {style: "color:#0b1bc9"}, n = {style: "color:#b62e24"},
            o = {style: "color:#9d288c"}, r = {
                header: t => E(t) ? t.__isVue ? ["div", e, "VueInstance"] : Ie(t) ? ["div", {}, ["span", e, p(t)], "<", a(t.value), ">"] : xe(t) ? ["div", {}, ["span", e, "Reactive"], "<", a(t), ">" + ($e(t) ? " (readonly)" : "")] : $e(t) ? ["div", {}, ["span", e, "Readonly"], "<", a(t), ">"] : null : null,
                hasBody: e => e && e.__isVue,
                body(e) {
                    if (e && e.__isVue) return ["div", {}, ...s(e.$)]
                }
            };

        function s(e) {
            const t = [];
            e.type.props && e.props && t.push(c("props", Ce(e.props))), e.setupState !== i && t.push(c("setup", e.setupState)), e.data !== i && t.push(c("data", Ce(e.data)));
            const n = l(e, "computed");
            n && t.push(c("computed", n));
            const r = l(e, "inject");
            return r && t.push(c("injected", r)), t.push(["div", {}, ["span", {style: o.style + ";opacity:0.66"}, "$ (internal): "], ["object", {object: e}]]), t
        }

        function c(e, t) {
            return t = f({}, t), Object.keys(t).length ? ["div", {style: "line-height:1.25em;margin-bottom:0.6em"}, ["div", {style: "color:#476582"}, e], ["div", {style: "padding-left:1.25em"}, ...Object.keys(t).map((e => ["div", {}, ["span", o, e + ": "], a(t[e], !1)]))]] : ["span", {}]
        }

        function a(e, r = !0) {
            return "number" == typeof e ? ["span", t, e] : "string" == typeof e ? ["span", n, JSON.stringify(e)] : "boolean" == typeof e ? ["span", o, e] : E(e) ? ["object", {object: r ? Ce(e) : e}] : ["span", n, String(e)]
        }

        function l(e, t) {
            const n = e.type;
            if (g(n)) return;
            const o = {};
            for (const r in e.ctx) u(n, r, t) && (o[r] = e.ctx[r]);
            return o
        }

        function u(e, t, n) {
            const o = e[n];
            return !!(_(o) && o.includes(t) || E(o) && t in o) || !(!e.extends || !u(e.extends, t, n)) || !(!e.mixins || !e.mixins.some((e => u(e, t, n)))) || void 0
        }

        function p(e) {
            return e._shallow ? "ShallowRef" : e.effect ? "ComputedRef" : "Ref"
        }

        window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r]
    }()
}();
var nn = {
    name: "TimeAgo", props: {
        datetime: {
            type: [String, Date, Number], default: function (e) {
                return new Date
            }
        },
        locale: {type: String, default: "en"},
        refresh: {type: [Number, Boolean], default: !1},
        long: {type: Boolean, default: !1},
        todo: {
            type: Function, default: function (e) {
            }
        },
        tooltip: {type: [String, Boolean], default: !1}
    }, setup: function (e) {
        var t = Pe(""), n = Pe(""), o = Pe(null), r = (tn((function () {
            return {placement: "string" == typeof e.tooltip ? e.tooltip : "top", content: n.value}
        })), function () {
            var r = r(e.datetime, e.locale, e.long ? "long" : "short");
            t.value = r.timeago, n.value = r.nowString, o.value && e.todo()
        });
        return Nt((function () {
            st((function () {
                if (r(), e.refresh) {
                    var t = !0 === e.refresh ? 60 : e.refresh;
                    o.value = setInterval(r, 1e3 * t)
                }
            }))
        })), bt((function () {
            o.value && clearInterval(o.value)
        })), {timeago: t}
    }
};
nn.render = function (e, t, n, o, r, s) {
    return Pt(), Mt("span", null, [Et(e.$slots, "default", {timeago: o.timeago})])
};
export default nn;
