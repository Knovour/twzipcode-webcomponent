const W = globalThis, K = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = /* @__PURE__ */ Symbol(), nt = /* @__PURE__ */ new WeakMap();
let vt = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (K && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = nt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (e) => new vt(typeof e == "string" ? e : e + "", void 0, yt), At = (e, t) => {
  if (K) e.adoptedStyleSheets = t.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of t) {
    const s = document.createElement("style"), n = W.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, ot = K ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return mt(i);
})(e) : e;
const { is: Ct, defineProperty: bt, getOwnPropertyDescriptor: St, getOwnPropertyNames: Et, getOwnPropertySymbols: Ot, getPrototypeOf: Pt } = Object, I = globalThis, rt = I.trustedTypes, zt = rt ? rt.emptyScript : "", xt = I.reactiveElementPolyfillSupport, H = (e, t) => e, Z = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? zt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, tt = (e, t) => !Ct(e, t), ht = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), I.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ht) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && bt(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = St(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const t = Pt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const i = this.properties, s = [...Et(i), ...Ot(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) i.unshift(ot(n));
    } else t !== void 0 && i.push(ot(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return At(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Z).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Z;
      this._$Em = n;
      const a = r.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, s) {
    if (t !== void 0) {
      const n = this.constructor, o = this[t];
      if (s ??= n.getPropertyOptions(t), !((s.hasChanged ?? tt)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach(((s) => s.hostUpdate?.())), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((i) => i.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[H("elementProperties")] = /* @__PURE__ */ new Map(), E[H("finalized")] = /* @__PURE__ */ new Map(), xt?.({ ReactiveElement: E }), (I.reactiveElementVersions ??= []).push("2.1.1");
const it = globalThis, Y = it.trustedTypes, at = Y ? Y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $t = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, _t = "?" + v, Ut = `<${_t}>`, b = document, L = () => b.createComment(""), M = (e) => e === null || typeof e != "object" && typeof e != "function", et = Array.isArray, Ht = (e) => et(e) || typeof e?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, pt = />/g, A = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, ut = /"/g, wt = /^(?:script|style|textarea|title)$/i, Lt = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), O = Lt(1), P = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), dt = /* @__PURE__ */ new WeakMap(), C = b.createTreeWalker(b, 129);
function ft(e, t) {
  if (!et(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return at !== void 0 ? at.createHTML(t) : t;
}
const Mt = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = U;
  for (let a = 0; a < i; a++) {
    const h = e[a];
    let l, d, c = -1, f = 0;
    for (; f < h.length && (r.lastIndex = f, d = r.exec(h), d !== null); ) f = r.lastIndex, r === U ? d[1] === "!--" ? r = ct : d[1] !== void 0 ? r = pt : d[2] !== void 0 ? (wt.test(d[2]) && (n = RegExp("</" + d[2], "g")), r = A) : d[3] !== void 0 && (r = A) : r === A ? d[0] === ">" ? (r = n ?? U, c = -1) : d[1] === void 0 ? c = -2 : (c = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? A : d[3] === '"' ? ut : lt) : r === ut || r === lt ? r = A : r === ct || r === pt ? r = U : (r = A, n = void 0);
    const D = r === A && e[a + 1].startsWith("/>") ? " " : "";
    o += r === U ? h + Ut : c >= 0 ? (s.push(l), h.slice(0, c) + $t + h.slice(c) + v + D) : h + v + (c === -2 ? a : D);
  }
  return [ft(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, h = this.parts, [l, d] = Mt(t, i);
    if (this.el = N.createElement(l, s), C.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = C.nextNode()) !== null && h.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith($t)) {
          const f = d[r++], D = n.getAttribute(c).split(v), B = /([.?@])?(.*)/.exec(f);
          h.push({ type: 1, index: o, name: B[2], strings: D, ctor: B[1] === "." ? jt : B[1] === "?" ? Rt : B[1] === "@" ? Xt : q }), n.removeAttribute(c);
        } else c.startsWith(v) && (h.push({ type: 6, index: o }), n.removeAttribute(c));
        if (wt.test(n.tagName)) {
          const c = n.textContent.split(v), f = c.length - 1;
          if (f > 0) {
            n.textContent = Y ? Y.emptyScript : "";
            for (let D = 0; D < f; D++) n.append(c[D], L()), C.nextNode(), h.push({ type: 2, index: ++o });
            n.append(c[f], L());
          }
        }
      } else if (n.nodeType === 8) if (n.data === _t) h.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(v, c + 1)) !== -1; ) h.push({ type: 7, index: o }), c += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function z(e, t, i = e, s) {
  if (t === P) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (t = z(e, n._$AS(e, t.values), n, s)), t;
}
class Nt {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? b).importNode(i, !0);
    C.currentNode = n;
    let o = C.nextNode(), r = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (r === h.index) {
        let l;
        h.type === 2 ? l = new j(o, o.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && (l = new Bt(o, this, t)), this._$AV.push(l), h = s[++a];
      }
      r !== h?.index && (o = C.nextNode(), r++);
    }
    return C.currentNode = b, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class j {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = z(this, t, i), M(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(ft(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Nt(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = dt.get(t.strings);
    return i === void 0 && dt.set(t.strings, i = new N(t)), i;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new j(this.O(L()), this.O(L()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = z(this, t, i, 0), r = !M(t) || t !== this._$AH && t !== P, r && (this._$AH = t);
    else {
      const a = t;
      let h, l;
      for (t = o[0], h = 0; h < o.length - 1; h++) l = z(this, a[s + h], i, h), l === P && (l = this._$AH[h]), r ||= !M(l) || l !== this._$AH[h], l === u ? t = u : t !== u && (t += (l ?? "") + o[h + 1]), this._$AH[h] = l;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Rt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Xt extends q {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = z(this, t, i, 0) ?? u) === P) return;
    const s = this._$AH, n = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const Wt = it.litHtmlPolyfillSupport;
Wt?.(N, j), (it.litHtmlVersions ??= []).push("3.3.1");
const Zt = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new j(t.insertBefore(L(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
const st = globalThis;
class m extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Zt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
m._$litElement$ = !0, m.finalized = !0, st.litElementHydrateSupport?.({ LitElement: m });
const Yt = st.litElementPolyfillSupport;
Yt?.({ LitElement: m });
(st.litElementVersions ??= []).push("4.2.1");
const G = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(e, t);
  })) : customElements.define(e, t);
};
const Jt = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: tt }, Ft = (e = Jt, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const h = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, h, e);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const h = this[r];
      t.call(this, a), this.requestUpdate(r, h, e);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function p(e) {
  return (t, i) => typeof i == "object" ? Ft(e, t, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
function R(e) {
  return p({ ...e, state: !0, attribute: !1 });
}
const It = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function X(e, t) {
  return (i, s, n) => {
    const o = (r) => r.renderRoot?.querySelector(e) ?? null;
    return It(i, s, { get() {
      return o(this);
    } });
  };
}
const J = ["臺北市", "基隆市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園市", "苗栗縣", "臺中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣", "臺南市", "高雄市", "澎湖縣", "屏東縣", "臺東縣", "花蓮縣", "金門縣", "連江縣"], F = ["Taipei City", "Keelung City", "New Taipei City", "Yilan County", "Hsinchu City", "HsinChu County", "Taoyuan City", "Miaoli County", "Taichung City", "Changhua County", "Nantou County", "Chiayi City", "Chiayi County", "Yunlin County", "Tainan City", "Kaohsiung City", "Penghu County", "Pingtung County", "Taitung County", "Hualien County", "Kinmen County", "Lienchiang County"], k = ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區", "仁愛區", "安樂區", "暖暖區", "七堵區", "萬里區", "金山區", "板橋區", "汐止區", "深坑區", "石碇區", "瑞芳區", "平溪區", "雙溪區", "貢寮區", "新店區", "坪林區", "烏來區", "永和區", "中和區", "土城區", "三峽區", "樹林區", "鶯歌區", "三重區", "新莊區", "泰山區", "林口區", "蘆洲區", "五股區", "八里區", "淡水區", "三芝區", "石門區", "宜蘭市", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "羅東鎮", "三星鄉", "大同鄉", "五結鄉", "冬山鄉", "蘇澳鎮", "南澳鄉", "釣魚臺列嶼", "東區", "北區", "香山區", "竹北市", "湖口鄉", "新豐鄉", "新埔鎮", "關西鎮", "芎林鄉", "寶山鄉", "竹東鎮", "五峰鄉", "橫山鄉", "尖石鄉", "北埔鄉", "峨眉鄉", "中壢區", "平鎮區", "龍潭區", "楊梅區", "新屋區", "觀音區", "桃園區", "龜山區", "八德區", "大溪區", "復興區", "大園區", "蘆竹區", "竹南鎮", "頭份市", "三灣鄉", "南庄鄉", "獅潭鄉", "後龍鎮", "通霄鎮", "苑裡鎮", "苗栗市", "造橋鄉", "頭屋鄉", "公館鄉", "大湖鄉", "泰安鄉", "銅鑼鄉", "三義鄉", "西湖鄉", "卓蘭鎮", "中區", "南區", "西區", "北屯區", "西屯區", "南屯區", "太平區", "大里區", "霧峰區", "烏日區", "豐原區", "后里區", "石岡區", "東勢區", "和平區", "新社區", "潭子區", "大雅區", "神岡區", "大肚區", "沙鹿區", "龍井區", "梧棲區", "清水區", "大甲區", "外埔區", "彰化市", "芬園鄉", "花壇鄉", "秀水鄉", "鹿港鎮", "福興鄉", "線西鄉", "和美鎮", "伸港鄉", "員林市", "社頭鄉", "永靖鄉", "埔心鄉", "溪湖鎮", "大村鄉", "埔鹽鄉", "田中鎮", "北斗鎮", "田尾鄉", "埤頭鄉", "溪州鄉", "竹塘鄉", "二林鎮", "大城鄉", "芳苑鄉", "二水鄉", "南投市", "中寮鄉", "草屯鎮", "國姓鄉", "埔里鎮", "仁愛鄉", "名間鄉", "集集鎮", "水里鄉", "魚池鄉", "信義鄉", "竹山鎮", "鹿谷鄉", "番路鄉", "梅山鄉", "竹崎鄉", "阿里山鄉", "中埔鄉", "大埔鄉", "水上鄉", "鹿草鄉", "太保市", "朴子市", "東石鄉", "六腳鄉", "新港鄉", "民雄鄉", "大林鎮", "溪口鄉", "義竹鄉", "布袋鎮", "斗南鎮", "大埤鄉", "虎尾鎮", "土庫鎮", "褒忠鄉", "東勢鄉", "臺西鄉", "崙背鄉", "麥寮鄉", "斗六市", "林內鄉", "古坑鄉", "莿桐鄉", "西螺鎮", "二崙鄉", "北港鎮", "水林鄉", "口湖鄉", "四湖鄉", "元長鄉", "中西區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區", "新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "楠梓區", "小港區", "左營區", "仁武區", "大社區", "岡山區", "路竹區", "阿蓮區", "田寮區", "燕巢區", "橋頭區", "梓官區", "彌陀區", "永安區", "湖內區", "鳳山區", "大寮區", "林園區", "鳥松區", "大樹區", "旗山區", "美濃區", "六龜區", "內門區", "杉林區", "甲仙區", "桃源區", "那瑪夏區", "茂林區", "茄萣區", "東沙群島", "南沙群島", "馬公市", "西嶼鄉", "望安鄉", "七美鄉", "白沙鄉", "湖西鄉", "屏東市", "三地門鄉", "霧臺鄉", "瑪家鄉", "九如鄉", "里港鄉", "高樹鄉", "鹽埔鄉", "長治鄉", "麟洛鄉", "竹田鄉", "內埔鄉", "萬丹鄉", "潮州鎮", "泰武鄉", "來義鄉", "萬巒鄉", "崁頂鄉", "新埤鄉", "南州鄉", "林邊鄉", "東港鎮", "琉球鄉", "佳冬鄉", "新園鄉", "枋寮鄉", "枋山鄉", "春日鄉", "獅子鄉", "車城鄉", "牡丹鄉", "恆春鎮", "滿州鄉", "臺東市", "綠島鄉", "蘭嶼鄉", "延平鄉", "卑南鄉", "鹿野鄉", "關山鎮", "海端鄉", "池上鄉", "東河鄉", "成功鎮", "長濱鄉", "太麻里鄉", "金峰鄉", "大武鄉", "達仁鄉", "花蓮市", "新城鄉", "秀林鄉", "吉安鄉", "壽豐鄉", "鳳林鎮", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "玉里鎮", "卓溪鄉", "富里鄉", "金沙鎮", "金湖鎮", "金寧鄉", "金城鎮", "烈嶼鄉", "烏坵鄉", "南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"], Q = ["Zhongzheng District", "Daton District", "Zhongshan District", "Songshan District", "Da'an District", "Wanhua Disrict", "Xinyi District", "Shilin District", "Beitou District", "Neihu District", "Nangang District", "Wenshan District", "Ren'ai District", "Anle District", "Nuannuan District", "Qidu District", "Wanli District", "Jinshan District", "Banqiao District", "Xizhi District", "Shenkeng District", "Shiding District", "Ruifang District", "Pingxi District", "Shuangxi District", "Gongliao District", "Xindian Distict", "Pinglin District", "Wulai District", "Yonghe District", "Zhonghe District", "Tucheng District", "Sanxia District", "Shulin District", "Yingge District", "Sanchong District", "Xinzhuang District", "Taishan District", "Linkou District", "Luzhou District", "Wugu District", "Bali District", "Tamsui District", "Sanzhi District", "Shimen District", "Yilan City", "Toucheng Township", "Jiaoxi Township", "Zhuangwei Township", "Yuanshan Township", "Luodong Township", "Sanxing Township", "Datong Township", "Wujie Township", "Dongshan Township", "Su'ao Township", "Nan'ao Township", "Diaoyu Islands", "East District", "North District", "Xiangshan District", "Zhubei City", "Hukou Township", "Xinfeng Township", "Xinpu Township", "Guanxi Township", "Qionglin Township", "Baoshan Township", "Zhudong Township", "Wufeng Township", "Hengshan Township", "Jianshi Township", "Beipu Township", "Emei Township", "Zhongli District", "Pingzhen District", "Longtan District", "Yangmei District", "Xinwu District", "Guanyin District", "Taoyuan District", "Guishan District", "Bade District", "Daxi District", "Fuxing District", "Dayuan District", "Luzhu District", "Zhunan Township", "Toufen Town", "Sanwan Township", "Nanzhuang Township", "Shitan Township", "Houlong Township", "Tongxiao Township", "Yuanli Township", "Miaoli City", "Zaoqiao Township", "Touwu Township", "Gongguan Township", "Dahu Township", "Tai'an Township", "Tongluo Township", "Sanyi Township", "Xihu Township", "Zhuolan Township", "Central District", "South District", "West District", "Beitun District", "Xitun District", "Nantun District", "Taiping District", "Dali District", "Wufeng District", "Wuri District", "Fengyuan District", "Houli District", "Shigang District", "Dongshi District", "Heping District", "Xinshe District", "Tanzi District", "Daya District", "Shengang District", "Dadu District", "Shalu District", "Longjing District", "Wuqi District", "Qingshui District", "Dajia District", "Waipu District", "Changhua City", "Fenyuan Township", "Huatan Township", "Xiushui Township", "Lukang Township", "Fuxing Township", "Xianxi Township", "Hemei Township", "Shengang Township", "Yuanlin市", "Shetou Township", "Yongjing Township", "Puxin Township", "Dacun Township", "Puyan Township", "Tianzhong Township", "Beidu Township", "Tianwei Township", "Pitou Township", "Xizhou Township", "Zhutang Township", "Erlin Township", "Dacheng Township", "Fangyuan Township", "Ershui Township", "Nantou City", "Zhongliao Township", "Caotun Township", "Guoxing Township", "Puli Township", "Ren'ai Township", "Mingjian Township", "Jiji Township", "Shuili Township", "Yuchi Township", "Xinyi Township", "Zhushan Township", "Lugu Township", "Fanlu Township", "Meishan Township", "Zhuqi Township", "Alishan Township", "Zhongpu Township", "Dapu Township", "Shuishang Township", "Lucao Township", "Taibao City", "Puzi City", "Dongshi Township", "Liujiao Township", "Xingang Township", "Minxiong Township", "Dalin Township", "Xikou Township", "Yizhu Township", "Budai Township", "Dounan Township", "Dapi Township", "Huwei Township", "Tuku Township", "Baozhong Township", "Taixi Township", "Lunbei Township", "Mailiao Township", "Douliu City", "Linnei Township", "Gukeng Township", "Citong Township", "Xiluo Township", "Erlun Township", "Beigang Township", "Shuilin Township", "Kouhu Township", "Sihu Township", "Yuanchang Township", "West Central District", "Anping District", "Annan District", "Yongkang District", "Guiren District", "Xinhua District", "Zuozhen District", "Yujing District", "Nanxi District", "Nanhua District", "Rende District", "Guanmiao District", "Longqi District", "Guantian District", "Madou District", "Jiali District", "Xigang District", "Qigu District", "Jiangjun District", "Xuejia District", "Beimen District", "Xinying District", "Houbi District", "Baihe District", "Dongshan District", "Liujia District", "Xiaying District", "Liuying District", "Yanshui District", "Shanhua District", "Danei District", "Shanshang District", "Xinshi District", "Anding District", "Xinxing District", "Qianjin District", "Lingya District", "Yancheng District", "Gushan District", "Qijin District", "Qianzhen District", "Sanmin District", "Nanzi District", "Xiaogang District", "Zouying District", "Renwu District", "Dashe District", "Gangshan District", "Alian District", "Tianliao District", "Yanchao District", "Qiaotou District", "Ziguan District", "Mituo District", "Yong'an District", "Hunei District", "Fengshan District", "Daliao District", "Linyuan District", "Niaosong District", "Dashu District", "Qishan District", "Meinong District", "Liugui District", "Neimen District", "Shanlin District", "Jiaxian District", "Namaxia District", "Maolin District", "Qieding District", "Dongsha Islands", "Spratly Islands", "Magong City", "Xiyu Township", "Wang'an Township", "Qimei Township", "Baisha Township", "Huxi Township", "Pingdong City", "Sandimen Township", "Wutai Township", "Majia Township", "Jiuru Township", "Ligang Township", "Gaoshu Township", "Yanpu Township", "Changzhi Township", "Linluo Township", "Zhutian Township", "Neipu Township", "Wandan Township", "Chaozhou Township", "Taiwu Township", "Laiyi Township", "Wanluan Township", "Kanding Township", "Xinpi Township", "Nanzhou Township", "Linbian Township", "Donggang Township", "Liuqiu Township", "Jiadong Township", "Xinyuan Township", "Fangliao Township", "Fangshan Township", "Chunri Township", "Shizi Township", "Checheng Township", "Mudan Township", "Hengchu Township", "Manzhou Township", "Taitung City", "Ludao Township", "Lanyu Township", "Yangping Township", "Beinan Township", "Luye Township", "Guanshan Township", "Haiduan Township", "Chishang Township", "Donghe Township", "Chenggong Township", "Changbin Township", "Taimali Township", "Jinfeng Township", "Dawu Township", "Daren Township", "Hualien City", "Xincheng Township", "Xiulin Township", "Ji'an Township", "Shoufeng Township", "Fenglin Township", "Guangfu Township", "Fengbin Township", "Ruisui Township", "Wanrong Township", "Yuli Township", "Zhuoxi Township", "Fuli Township", "Jinsha Township", "Jinhu Township", "Jinning Township", "Jincheng Township", "Lieyu Township", "Wuqiu Township", "Nangan Township", "Beigan Township", "Juguan Township", "Dongyin Township"], Tt = ["100", "103", "104", "105", "106", "108", "110", "111", "112", "114", "115", "116", "200", "201", "202", "203", "204", "205", "206", "207", "208", "220", "221", "222", "223", "224", "226", "227", "228", "231", "232", "233", "234", "235", "236", "237", "238", "239", "241", "242", "243", "244", "247", "248", "249", "251", "252", "253", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "272", "290", "300", "302", "303", "304", "305", "306", "307", "308", "310", "311", "312", "313", "314", "315", "320", "324", "325", "326", "327", "328", "330", "333", "334", "335", "336", "337", "338", "350", "351", "352", "353", "354", "356", "357", "358", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "400", "401", "402", "403", "404", "406", "407", "408", "411", "412", "413", "414", "420", "421", "422", "423", "424", "426", "427", "428", "429", "432", "433", "434", "435", "436", "437", "438", "439", "500", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "512", "513", "514", "515", "516", "520", "521", "522", "523", "524", "525", "526", "527", "528", "530", "540", "541", "542", "544", "545", "546", "551", "552", "553", "555", "556", "557", "558", "600", "602", "603", "604", "605", "606", "607", "608", "611", "612", "613", "614", "615", "616", "621", "622", "623", "624", "625", "630", "631", "632", "633", "634", "635", "636", "637", "638", "640", "643", "646", "647", "648", "649", "651", "652", "653", "654", "655", "700", "701", "702", "704", "708", "709", "710", "711", "712", "713", "714", "715", "716", "717", "718", "719", "720", "721", "722", "723", "724", "725", "726", "727", "730", "731", "732", "733", "734", "735", "736", "737", "741", "742", "743", "744", "745", "800", "801", "802", "803", "804", "805", "806", "807", "811", "812", "813", "814", "815", "820", "821", "822", "823", "824", "825", "826", "827", "828", "829", "830", "831", "832", "833", "840", "842", "843", "844", "845", "846", "847", "848", "849", "851", "852", "817", "819", "880", "881", "882", "883", "884", "885", "900", "901", "902", "903", "904", "905", "906", "907", "908", "909", "911", "912", "913", "920", "921", "922", "923", "924", "925", "926", "927", "928", "929", "931", "932", "940", "941", "942", "943", "944", "945", "946", "947", "950", "951", "952", "953", "954", "955", "956", "957", "958", "959", "961", "962", "963", "964", "965", "966", "970", "971", "972", "973", "974", "975", "976", "977", "978", "979", "981", "982", "983", "890", "891", "892", "893", "894", "896", "209", "210", "211", "212"], qt = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21]], Gt = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21], [22, 22], [23, 23], [24, 24], [25, 25], [26, 26], [27, 27], [28, 28], [29, 29], [30, 30], [31, 31], [32, 32], [33, 33], [34, 34], [35, 35], [36, 36], [37, 37], [38, 38], [39, 39], [40, 40], [41, 41], [42, 42], [43, 43], [44, 44], [45, 45], [46, 46], [47, 47], [48, 48], [49, 49], [50, 50], [51, 51], [52, 52], [53, 53], [54, 54], [55, 55], [56, 56], [57, 57], [58, 58], [59, 59], [60, 60], [61, 61], [62, 62], [63, 63], [64, 64], [65, 65], [66, 66], [67, 67], [68, 68], [69, 69], [70, 70], [71, 71], [72, 72], [73, 73], [74, 74], [75, 75], [76, 76], [77, 77], [78, 78], [79, 79], [80, 80], [81, 81], [82, 82], [83, 83], [84, 84], [85, 85], [86, 86], [87, 87], [88, 88], [89, 89], [90, 90], [91, 91], [92, 92], [93, 93], [94, 94], [95, 95], [96, 96], [97, 97], [98, 98], [99, 99], [100, 100], [101, 101], [102, 102], [103, 103], [104, 104], [105, 105], [106, 106], [107, 107], [108, 108], [109, 109], [110, 110], [111, 111], [112, 112], [113, 113], [114, 114], [115, 115], [116, 116], [117, 117], [118, 118], [119, 119], [120, 120], [121, 121], [122, 122], [123, 123], [124, 124], [125, 125], [126, 126], [127, 127], [128, 128], [129, 129], [130, 130], [131, 131], [132, 132], [133, 133], [134, 134], [135, 135], [136, 136], [137, 137], [138, 138], [139, 139], [140, 140], [141, 141], [142, 142], [143, 143], [144, 103], [145, 144], [146, 145], [147, 146], [148, 147], [149, 148], [150, 149], [151, 150], [152, 151], [153, 152], [154, 153], [155, 154], [156, 155], [157, 156], [158, 157], [159, 158], [160, 159], [161, 160], [162, 161], [163, 162], [164, 163], [165, 164], [166, 165], [167, 166], [168, 167], [169, 168], [170, 169], [171, 170], [172, 171], [173, 172], [174, 173], [175, 174], [176, 175], [177, 176], [178, 177], [179, 178], [180, 179], [181, 180], [182, 181], [183, 182], [184, 183], [185, 184], [186, 185], [187, 186], [188, 187], [189, 188], [190, 189], [191, 190], [192, 191], [193, 179], [194, 192], [195, 193], [196, 194], [197, 195], [198, 196], [199, 197], [200, 198], [201, 199], [202, 200], [203, 201], [204, 202], [205, 203], [206, 204], [207, 205], [208, 206], [209, 207], [210, 208], [211, 209], [212, 210], [213, 211], [214, 212], [215, 213], [216, 214], [217, 215], [218, 216], [219, 217], [220, 218], [221, 219], [222, 220], [223, 221], [224, 222], [225, 223], [226, 224], [227, 225], [228, 226], [229, 227], [230, 228], [231, 229], [232, 230], [233, 231], [234, 232], [235, 233], [236, 234], [237, 235], [238, 236], [239, 237], [240, 238], [241, 239], [242, 240], [243, 241], [244, 242], [245, 243], [246, 244], [247, 245], [248, 246], [249, 247], [250, 248], [251, 249], [252, 250], [253, 251], [254, 252], [255, 253], [256, 86], [257, 254], [258, 255], [259, 256], [260, 257], [261, 258], [262, 259], [263, 260], [264, 261], [265, 262], [266, 263], [267, 264], [268, 265], [269, 266], [270, 267], [271, 268], [272, 269], [273, 270], [274, 271], [275, 272], [276, 80], [277, 273], [278, 274], [279, 275], [280, 276], [281, 277], [282, 278], [283, 279], [284, 280], [285, 281], [286, 282], [287, 283], [288, 284], [289, 285], [290, 286], [291, 287], [292, 288], [293, 289], [294, 290], [295, 291], [296, 292], [297, 293], [298, 294], [299, 295], [300, 296], [301, 297], [302, 298], [303, 299], [304, 300], [305, 301], [306, 302], [307, 303], [308, 304], [309, 305], [310, 306], [311, 307], [312, 308], [313, 309], [314, 310], [315, 311], [316, 312], [317, 313], [318, 314], [319, 315], [320, 316], [321, 317], [322, 318], [323, 319], [324, 320], [325, 321], [326, 322], [327, 323], [328, 324], [329, 325], [330, 326], [331, 327], [332, 328], [333, 329], [334, 330], [335, 331], [336, 332], [337, 333], [338, 334], [339, 335], [340, 336], [341, 337], [342, 338], [343, 339], [344, 340], [345, 341], [346, 342], [347, 343], [348, 344], [349, 345], [350, 346], [351, 347], [352, 348], [353, 349], [354, 350], [355, 351], [356, 352], [357, 353], [358, 354], [359, 355]], Dt = new Map(
  qt.flatMap(([e, t]) => [[J[e], F[t]], [F[t], J[e]]])
), Vt = new Map(
  Gt.flatMap(([e, t]) => [[k[e], Q[t]], [Q[t], k[e]]])
);
var kt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, T = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Qt(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && kt(t, i, n), n;
};
let w = class extends m {
  constructor() {
    super(...arguments), this.classes = "", this.name = "county", this.placeholder = "---", this.lang = "zh-tw", this.value = "", this.ignoreOptions = [], this._options = [];
  }
  willUpdate(e) {
    (e.has("lang") || e.has("ignoreOptions")) && (this._updateOptions(), this._select(this.value));
  }
  updated(e) {
    e.has("value") && this.dispatchEvent(
      new CustomEvent("update:county", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _updateOptions() {
    const e = this.lang === "en" ? F : J, t = this.lang === "en" ? this.ignoreOptions.map((i) => Dt.get(i) ?? i) : this.ignoreOptions;
    this._options = t.length ? e.filter((i) => !t.includes(i)) : e;
  }
  _handleEvent(e) {
    this._select(e.target.value);
  }
  _select(e) {
    this.value = e && this._options.includes(e) ? e : "", !this.value && this.$_select && (this.$_select.value = "");
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return O`
      <select class="${this.classes}" name=${this.name} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map((e) => O`<option value=${e} ?selected=${this.value === e}>${e}</option>`)}
      </select>
    `;
  }
};
T([
  p({ type: String })
], w.prototype, "classes", 2);
T([
  p({ type: String })
], w.prototype, "name", 2);
T([
  p({ type: String })
], w.prototype, "placeholder", 2);
T([
  p({ type: String, attribute: !1 })
], w.prototype, "lang", 2);
T([
  p({ type: String, attribute: !1 })
], w.prototype, "value", 2);
T([
  p({ type: Array, attribute: !1 })
], w.prototype, "ignoreOptions", 2);
T([
  R()
], w.prototype, "_options", 2);
T([
  X("select")
], w.prototype, "$_select", 2);
w = T([
  G("county-field")
], w);
var Kt = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, $ = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ti(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Kt(t, i, n), n;
};
let g = class extends m {
  constructor() {
    super(...arguments), this.classes = "", this.name = "district", this.placeholder = "---", this.lang = "zh-tw", this.value = "", this.county = "", this.districts = [], this.ignoreOptions = {}, this._options = [];
  }
  willUpdate(e) {
    (e.has("districts") || e.has("ignoreOptions") || e.has("lang") || e.has("county")) && (this._updateOptions(), this._select(this.value));
  }
  updated(e) {
    e.has("value") && this.dispatchEvent(
      new CustomEvent("update:district", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _updateOptions() {
    const e = this.lang === "en" && this.county ? Dt.get(this.county) : this.county;
    if (!e) {
      this._options = [];
      return;
    }
    const t = this.ignoreOptions[e] ?? [], i = this.lang === "en" ? t.map((s) => Vt.get(s) ?? s) : t;
    this._options = this.districts.filter((s) => !i.includes(s));
  }
  _handleEvent(e) {
    this._select(e.target.value);
  }
  _select(e = "") {
    this.value = e && this._options.includes(e) ? e : "", !this.value && this.$_select && (this.$_select.value = "");
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return O`
      <select class="${this.classes}" name=${this.name} ?disabled=${!this._options.length} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map((e) => O`<option value=${e} ?selected=${this.value === e}>${e}</option>`)}
      </select>
    `;
  }
};
$([
  p({ type: String })
], g.prototype, "classes", 2);
$([
  p({ type: String })
], g.prototype, "name", 2);
$([
  p({ type: String })
], g.prototype, "placeholder", 2);
$([
  p({ type: String, attribute: !1 })
], g.prototype, "lang", 2);
$([
  p({ type: String, attribute: !1 })
], g.prototype, "value", 2);
$([
  p({ type: String, attribute: !1 })
], g.prototype, "county", 2);
$([
  p({ type: Array, attribute: !1 })
], g.prototype, "districts", 2);
$([
  p({ type: Object, attribute: !1 })
], g.prototype, "ignoreOptions", 2);
$([
  R()
], g.prototype, "_options", 2);
$([
  X("select")
], g.prototype, "$_select", 2);
g = $([
  G("district-field")
], g);
const ii = [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 4], [0, 5, 5], [0, 6, 6], [0, 7, 7], [0, 8, 8], [0, 9, 9], [0, 10, 10], [0, 11, 11], [1, 12, 12], [1, 6, 13], [1, 0, 14], [1, 2, 15], [1, 13, 16], [1, 14, 17], [1, 15, 18], [2, 16, 19], [2, 17, 20], [2, 18, 21], [2, 19, 22], [2, 20, 23], [2, 21, 24], [2, 22, 25], [2, 23, 26], [2, 24, 27], [2, 25, 28], [2, 26, 29], [2, 27, 30], [2, 28, 31], [2, 29, 32], [2, 30, 33], [2, 31, 34], [2, 32, 35], [2, 33, 36], [2, 34, 37], [2, 35, 38], [2, 36, 39], [2, 37, 40], [2, 38, 41], [2, 39, 42], [2, 40, 43], [2, 41, 44], [2, 42, 45], [2, 43, 46], [2, 44, 47], [3, 45, 48], [3, 46, 49], [3, 47, 50], [3, 48, 51], [3, 49, 52], [3, 50, 53], [3, 51, 54], [3, 52, 55], [3, 53, 56], [3, 54, 57], [3, 55, 58], [3, 56, 59], [3, 57, 60], [4, 58, 61], [4, 59, 61], [4, 60, 61], [5, 61, 62], [5, 62, 63], [5, 63, 64], [5, 64, 65], [5, 65, 66], [5, 66, 67], [5, 67, 68], [5, 68, 69], [5, 69, 70], [5, 70, 71], [5, 71, 72], [5, 72, 73], [5, 73, 74], [6, 74, 75], [6, 75, 76], [6, 76, 77], [6, 77, 78], [6, 78, 79], [6, 79, 80], [6, 80, 81], [6, 81, 82], [6, 82, 83], [6, 83, 84], [6, 84, 85], [6, 85, 86], [6, 86, 87], [7, 87, 88], [7, 88, 89], [7, 89, 90], [7, 90, 91], [7, 91, 92], [7, 92, 93], [7, 93, 94], [7, 94, 95], [7, 95, 96], [7, 96, 97], [7, 97, 98], [7, 98, 99], [7, 99, 100], [7, 100, 101], [7, 101, 102], [7, 102, 103], [7, 103, 104], [7, 104, 105], [8, 105, 106], [8, 58, 107], [8, 106, 108], [8, 107, 109], [8, 59, 110], [8, 108, 111], [8, 109, 112], [8, 110, 113], [8, 111, 114], [8, 112, 115], [8, 113, 116], [8, 114, 117], [8, 115, 118], [8, 116, 119], [8, 117, 120], [8, 118, 121], [8, 119, 122], [8, 120, 123], [8, 121, 124], [8, 122, 125], [8, 123, 126], [8, 124, 127], [8, 125, 128], [8, 126, 129], [8, 127, 130], [8, 128, 131], [8, 129, 132], [8, 130, 133], [8, 4, 134], [9, 131, 135], [9, 132, 136], [9, 133, 137], [9, 134, 138], [9, 135, 139], [9, 136, 140], [9, 137, 141], [9, 138, 142], [9, 139, 143], [9, 140, 144], [9, 141, 145], [9, 142, 146], [9, 143, 147], [9, 103, 148], [9, 144, 149], [9, 145, 150], [9, 146, 151], [9, 147, 152], [9, 148, 153], [9, 149, 154], [9, 150, 155], [9, 151, 156], [9, 152, 157], [9, 153, 158], [9, 154, 159], [9, 155, 160], [10, 156, 161], [10, 157, 162], [10, 158, 163], [10, 159, 164], [10, 160, 165], [10, 161, 166], [10, 162, 167], [10, 163, 168], [10, 164, 169], [10, 165, 170], [10, 166, 171], [10, 167, 172], [10, 168, 173], [11, 58, 174], [11, 107, 174], [12, 169, 175], [12, 170, 176], [12, 171, 177], [12, 172, 178], [12, 173, 179], [12, 174, 180], [12, 175, 181], [12, 176, 182], [12, 177, 183], [12, 178, 184], [12, 179, 185], [12, 180, 186], [12, 181, 187], [12, 182, 188], [12, 183, 189], [12, 184, 190], [12, 185, 191], [12, 186, 192], [13, 187, 193], [13, 188, 194], [13, 189, 195], [13, 190, 196], [13, 191, 197], [13, 179, 198], [13, 192, 199], [13, 193, 200], [13, 194, 201], [13, 195, 202], [13, 196, 203], [13, 197, 204], [13, 198, 205], [13, 199, 206], [13, 200, 207], [13, 201, 208], [13, 202, 209], [13, 203, 210], [13, 204, 211], [13, 205, 212], [14, 206, 213], [14, 58, 214], [14, 106, 215], [14, 59, 216], [14, 207, 217], [14, 208, 218], [14, 209, 219], [14, 210, 220], [14, 211, 221], [14, 212, 222], [14, 213, 223], [14, 214, 224], [14, 215, 225], [14, 216, 226], [14, 217, 227], [14, 218, 228], [14, 219, 229], [14, 220, 230], [14, 221, 231], [14, 222, 232], [14, 223, 233], [14, 224, 234], [14, 225, 235], [14, 226, 236], [14, 227, 237], [14, 228, 238], [14, 229, 239], [14, 230, 240], [14, 231, 241], [14, 232, 242], [14, 233, 243], [14, 234, 244], [14, 235, 245], [14, 236, 246], [14, 237, 247], [14, 238, 248], [14, 239, 249], [15, 240, 250], [15, 241, 251], [15, 242, 252], [15, 243, 253], [15, 244, 254], [15, 245, 255], [15, 246, 256], [15, 247, 257], [15, 248, 258], [15, 249, 259], [15, 250, 260], [15, 251, 261], [15, 252, 262], [15, 253, 263], [15, 86, 264], [15, 254, 265], [15, 255, 266], [15, 256, 267], [15, 257, 268], [15, 258, 269], [15, 259, 270], [15, 260, 271], [15, 261, 272], [15, 262, 273], [15, 263, 274], [15, 264, 275], [15, 265, 276], [15, 266, 277], [15, 267, 278], [15, 268, 279], [15, 269, 280], [15, 270, 281], [15, 271, 282], [15, 272, 283], [15, 80, 284], [15, 273, 285], [15, 274, 286], [15, 275, 287], [15, 276, 288], [15, 277, 289], [16, 278, 290], [16, 279, 291], [16, 280, 292], [16, 281, 293], [16, 282, 294], [16, 283, 295], [17, 284, 296], [17, 285, 297], [17, 286, 298], [17, 287, 299], [17, 288, 300], [17, 289, 301], [17, 290, 302], [17, 291, 303], [17, 292, 304], [17, 293, 305], [17, 294, 306], [17, 295, 307], [17, 296, 308], [17, 297, 309], [17, 298, 310], [17, 299, 311], [17, 300, 312], [17, 301, 313], [17, 302, 314], [17, 303, 315], [17, 304, 316], [17, 305, 317], [17, 306, 318], [17, 307, 319], [17, 308, 320], [17, 309, 321], [17, 310, 322], [17, 311, 323], [17, 312, 324], [17, 313, 325], [17, 314, 326], [17, 315, 327], [17, 316, 328], [18, 317, 329], [18, 318, 330], [18, 319, 331], [18, 320, 332], [18, 321, 333], [18, 322, 334], [18, 323, 335], [18, 324, 336], [18, 325, 337], [18, 326, 338], [18, 327, 339], [18, 328, 340], [18, 329, 341], [18, 330, 342], [18, 331, 343], [18, 332, 344], [19, 333, 345], [19, 334, 346], [19, 335, 347], [19, 336, 348], [19, 337, 349], [19, 338, 350], [19, 339, 351], [19, 340, 352], [19, 341, 353], [19, 342, 354], [19, 343, 355], [19, 344, 356], [19, 345, 357], [20, 346, 358], [20, 347, 359], [20, 348, 360], [20, 349, 361], [20, 350, 362], [20, 351, 363], [21, 352, 364], [21, 353, 365], [21, 354, 366], [21, 355, 367]], ei = ii.map(([e, t, i]) => ({ county: F[e], district: Q[t], zipcode: Tt[i] })), si = [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 4], [0, 5, 5], [0, 6, 6], [0, 7, 7], [0, 8, 8], [0, 9, 9], [0, 10, 10], [0, 11, 11], [1, 12, 12], [1, 6, 13], [1, 0, 14], [1, 2, 15], [1, 13, 16], [1, 14, 17], [1, 15, 18], [2, 16, 19], [2, 17, 20], [2, 18, 21], [2, 19, 22], [2, 20, 23], [2, 21, 24], [2, 22, 25], [2, 23, 26], [2, 24, 27], [2, 25, 28], [2, 26, 29], [2, 27, 30], [2, 28, 31], [2, 29, 32], [2, 30, 33], [2, 31, 34], [2, 32, 35], [2, 33, 36], [2, 34, 37], [2, 35, 38], [2, 36, 39], [2, 37, 40], [2, 38, 41], [2, 39, 42], [2, 40, 43], [2, 41, 44], [2, 42, 45], [2, 43, 46], [2, 44, 47], [3, 45, 48], [3, 46, 49], [3, 47, 50], [3, 48, 51], [3, 49, 52], [3, 50, 53], [3, 51, 54], [3, 52, 55], [3, 53, 56], [3, 54, 57], [3, 55, 58], [3, 56, 59], [3, 57, 60], [4, 58, 61], [4, 59, 61], [4, 60, 61], [5, 61, 62], [5, 62, 63], [5, 63, 64], [5, 64, 65], [5, 65, 66], [5, 66, 67], [5, 67, 68], [5, 68, 69], [5, 69, 70], [5, 70, 71], [5, 71, 72], [5, 72, 73], [5, 73, 74], [6, 74, 75], [6, 75, 76], [6, 76, 77], [6, 77, 78], [6, 78, 79], [6, 79, 80], [6, 80, 81], [6, 81, 82], [6, 82, 83], [6, 83, 84], [6, 84, 85], [6, 85, 86], [6, 86, 87], [7, 87, 88], [7, 88, 89], [7, 89, 90], [7, 90, 91], [7, 91, 92], [7, 92, 93], [7, 93, 94], [7, 94, 95], [7, 95, 96], [7, 96, 97], [7, 97, 98], [7, 98, 99], [7, 99, 100], [7, 100, 101], [7, 101, 102], [7, 102, 103], [7, 103, 104], [7, 104, 105], [8, 105, 106], [8, 58, 107], [8, 106, 108], [8, 107, 109], [8, 59, 110], [8, 108, 111], [8, 109, 112], [8, 110, 113], [8, 111, 114], [8, 112, 115], [8, 113, 116], [8, 114, 117], [8, 115, 118], [8, 116, 119], [8, 117, 120], [8, 118, 121], [8, 119, 122], [8, 120, 123], [8, 121, 124], [8, 122, 125], [8, 123, 126], [8, 124, 127], [8, 125, 128], [8, 126, 129], [8, 127, 130], [8, 128, 131], [8, 129, 132], [8, 130, 133], [8, 4, 134], [9, 131, 135], [9, 132, 136], [9, 133, 137], [9, 134, 138], [9, 135, 139], [9, 136, 140], [9, 137, 141], [9, 138, 142], [9, 139, 143], [9, 140, 144], [9, 141, 145], [9, 142, 146], [9, 143, 147], [9, 144, 148], [9, 145, 149], [9, 146, 150], [9, 147, 151], [9, 148, 152], [9, 149, 153], [9, 150, 154], [9, 151, 155], [9, 152, 156], [9, 153, 157], [9, 154, 158], [9, 155, 159], [9, 156, 160], [10, 157, 161], [10, 158, 162], [10, 159, 163], [10, 160, 164], [10, 161, 165], [10, 162, 166], [10, 163, 167], [10, 164, 168], [10, 165, 169], [10, 166, 170], [10, 167, 171], [10, 168, 172], [10, 169, 173], [11, 58, 174], [11, 107, 174], [12, 170, 175], [12, 171, 176], [12, 172, 177], [12, 173, 178], [12, 174, 179], [12, 175, 180], [12, 176, 181], [12, 177, 182], [12, 178, 183], [12, 179, 184], [12, 180, 185], [12, 181, 186], [12, 182, 187], [12, 183, 188], [12, 184, 189], [12, 185, 190], [12, 186, 191], [12, 187, 192], [13, 188, 193], [13, 189, 194], [13, 190, 195], [13, 191, 196], [13, 192, 197], [13, 193, 198], [13, 194, 199], [13, 195, 200], [13, 196, 201], [13, 197, 202], [13, 198, 203], [13, 199, 204], [13, 200, 205], [13, 201, 206], [13, 202, 207], [13, 203, 208], [13, 204, 209], [13, 205, 210], [13, 206, 211], [13, 207, 212], [14, 208, 213], [14, 58, 214], [14, 106, 215], [14, 59, 216], [14, 209, 217], [14, 210, 218], [14, 211, 219], [14, 212, 220], [14, 213, 221], [14, 214, 222], [14, 215, 223], [14, 216, 224], [14, 217, 225], [14, 218, 226], [14, 219, 227], [14, 220, 228], [14, 221, 229], [14, 222, 230], [14, 223, 231], [14, 224, 232], [14, 225, 233], [14, 226, 234], [14, 227, 235], [14, 228, 236], [14, 229, 237], [14, 230, 238], [14, 231, 239], [14, 232, 240], [14, 233, 241], [14, 234, 242], [14, 235, 243], [14, 236, 244], [14, 237, 245], [14, 238, 246], [14, 239, 247], [14, 240, 248], [14, 241, 249], [15, 242, 250], [15, 243, 251], [15, 244, 252], [15, 245, 253], [15, 246, 254], [15, 247, 255], [15, 248, 256], [15, 249, 257], [15, 250, 258], [15, 251, 259], [15, 252, 260], [15, 253, 261], [15, 254, 262], [15, 255, 263], [15, 256, 264], [15, 257, 265], [15, 258, 266], [15, 259, 267], [15, 260, 268], [15, 261, 269], [15, 262, 270], [15, 263, 271], [15, 264, 272], [15, 265, 273], [15, 266, 274], [15, 267, 275], [15, 268, 276], [15, 269, 277], [15, 270, 278], [15, 271, 279], [15, 272, 280], [15, 273, 281], [15, 274, 282], [15, 275, 283], [15, 276, 284], [15, 277, 285], [15, 278, 286], [15, 279, 287], [15, 280, 288], [15, 281, 289], [16, 282, 290], [16, 283, 291], [16, 284, 292], [16, 285, 293], [16, 286, 294], [16, 287, 295], [17, 288, 296], [17, 289, 297], [17, 290, 298], [17, 291, 299], [17, 292, 300], [17, 293, 301], [17, 294, 302], [17, 295, 303], [17, 296, 304], [17, 297, 305], [17, 298, 306], [17, 299, 307], [17, 300, 308], [17, 301, 309], [17, 302, 310], [17, 303, 311], [17, 304, 312], [17, 305, 313], [17, 306, 314], [17, 307, 315], [17, 308, 316], [17, 309, 317], [17, 310, 318], [17, 311, 319], [17, 312, 320], [17, 313, 321], [17, 314, 322], [17, 315, 323], [17, 316, 324], [17, 317, 325], [17, 318, 326], [17, 319, 327], [17, 320, 328], [18, 321, 329], [18, 322, 330], [18, 323, 331], [18, 324, 332], [18, 325, 333], [18, 326, 334], [18, 327, 335], [18, 328, 336], [18, 329, 337], [18, 330, 338], [18, 331, 339], [18, 332, 340], [18, 333, 341], [18, 334, 342], [18, 335, 343], [18, 336, 344], [19, 337, 345], [19, 338, 346], [19, 339, 347], [19, 340, 348], [19, 341, 349], [19, 342, 350], [19, 343, 351], [19, 344, 352], [19, 345, 353], [19, 346, 354], [19, 347, 355], [19, 348, 356], [19, 349, 357], [20, 350, 358], [20, 351, 359], [20, 352, 360], [20, 353, 361], [20, 354, 362], [20, 355, 363], [21, 356, 364], [21, 357, 365], [21, 358, 366], [21, 359, 367]], gt = si.map(([e, t, i]) => ({ county: J[e], district: k[t], zipcode: Tt[i] }));
var ni = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, _ = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? oi(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && ni(t, i, n), n;
};
let y = class extends m {
  constructor() {
    super(...arguments), this.lang = "zh-tw", this.ignoreCounties = [], this.ignoreDistricts = {}, this._data = gt, this.value = { zipcode: void 0, county: void 0, district: void 0 }, this._lastValue = "", this._countyUpdateHandler = this._handleCountyUpdate.bind(this), this._districtUpdateHandler = this._handleDistrictUpdate.bind(this), this._zipcodeUpdateHandler = this._handleZipcodeUpdate.bind(this);
  }
  willUpdate(e) {
    if (e.has("lang") && (this._data = this.lang === "en" ? ei : gt, [this.$_zipcode, this.$_county, this.$_district].forEach((t) => {
      t && (t.lang = this.lang);
    })), e.has("defaultValues") && this.defaultValues) {
      const { zipcode: t, county: i, district: s } = this.defaultValues;
      this._data.some(({ zipcode: n, county: o, district: r }) => n === t && o === i && r === s) && (this.value = { zipcode: t, county: i, district: s });
    }
  }
  updated(e) {
    e.has("value") && this._dispatch(this.value), (e.has("value") || e.has("ignoreCounties") || e.has("ignoreDistricts")) && this._syncChildren();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("update:zipcode", this._zipcodeUpdateHandler), this.addEventListener("update:county", this._countyUpdateHandler), this.addEventListener("update:district", this._districtUpdateHandler), this.hasChildNodes() || ["zipcode-field", "county-field", "district-field"].forEach((e) => {
      this.appendChild(document.createElement(e));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("update:zipcode", this._zipcodeUpdateHandler), this.removeEventListener("update:county", this._countyUpdateHandler), this.removeEventListener("update:district", this._districtUpdateHandler);
  }
  _syncChildren() {
    this.$_zipcode && (this.$_zipcode.value = this.value.zipcode ?? ""), this.$_county && (this.$_county.value = this.value.county ?? "", this.$_county.ignoreOptions = this.ignoreCounties), this.$_district && (this.$_district.value = this.value.district ?? "", this.$_district.county = this.value.county ?? "", this.$_district.districts = this.value.county ? this._data.filter(({ county: e }) => e === this.value.county).map(({ district: e }) => e) : [], this.$_district.ignoreOptions = this.ignoreDistricts);
  }
  _handleZipcodeUpdate(e) {
    const t = e.detail.value;
    if (!t || t.length !== 3)
      return;
    const i = this._data.find((s) => s.zipcode === t);
    i && (this.value = i);
  }
  _handleCountyUpdate(e) {
    this.value = { county: e.detail.value, district: void 0, zipcode: void 0 };
  }
  _handleDistrictUpdate(e) {
    const t = e.detail.value, i = this._data.find(
      ({ county: s, district: n }) => s === this.value.county && n === t
    )?.zipcode;
    this.value = { ...this.value, district: t, zipcode: i };
  }
  _dispatch(e) {
    const t = JSON.stringify(e);
    if (t === this._lastValue || Object.values(e).some((s) => !s))
      return;
    this._data.some(({ zipcode: s, county: n, district: o }) => s === e.zipcode && n === e.county && o === e.district) && (this._lastValue = t, this.dispatchEvent(new CustomEvent("done", { detail: { value: e } })));
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return O``;
  }
};
_([
  p({ type: String })
], y.prototype, "lang", 2);
_([
  p({ type: Object, attribute: "default-values" })
], y.prototype, "defaultValues", 2);
_([
  p({ type: Array, attribute: "ignore-counties" })
], y.prototype, "ignoreCounties", 2);
_([
  p({ type: Object, attribute: "ignore-districts" })
], y.prototype, "ignoreDistricts", 2);
_([
  R()
], y.prototype, "_data", 2);
_([
  R()
], y.prototype, "value", 2);
_([
  R()
], y.prototype, "_lastValue", 2);
_([
  X("zipcode-field")
], y.prototype, "$_zipcode", 2);
_([
  X("county-field")
], y.prototype, "$_county", 2);
_([
  X("district-field")
], y.prototype, "$_district", 2);
y = _([
  G("twzipcode-fieldset")
], y);
var ri = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, x = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? hi(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && ri(t, i, n), n;
};
let S = class extends m {
  constructor() {
    super(...arguments), this.classes = "", this.name = "zipcode", this.placeholder = "", this.lang = "zh-tw", this.value = "";
  }
  willUpdate(e) {
    e.has("value") && this.dispatchEvent(
      new CustomEvent("update:zipcode", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return O`
      <input
      	class="${this.classes}"
        type="tel"
        name=${this.name}
        .value=${this.value}
        placeholder=${this.placeholder}
        maxlength="3"
        readonly
      >
    `;
  }
};
x([
  p({ type: String })
], S.prototype, "classes", 2);
x([
  p({ type: String })
], S.prototype, "name", 2);
x([
  p({ type: String })
], S.prototype, "placeholder", 2);
x([
  p({ type: String, attribute: !1 })
], S.prototype, "lang", 2);
x([
  p({ type: String, attribute: !1 })
], S.prototype, "value", 2);
S = x([
  G("zipcode-field")
], S);
export {
  w as CountyField,
  g as DistrictField,
  y as TwzipcodeFieldset,
  S as ZipcodeField
};
