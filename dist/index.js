const F = globalThis, tt = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = /* @__PURE__ */ Symbol(), st = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(s, n, r) {
    if (this._$cssResult$ = !0, r !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = n;
  }
  get styleSheet() {
    let s = this.o;
    const n = this.t;
    if (tt && s === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (s = st.get(n)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), r && st.set(n, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
};
const At = (d) => new mt(typeof d == "string" ? d : d + "", void 0, $t), St = (d, s) => {
  if (tt) d.adoptedStyleSheets = s.map(((n) => n instanceof CSSStyleSheet ? n : n.styleSheet));
  else for (const n of s) {
    const r = document.createElement("style"), p = F.litNonce;
    p !== void 0 && r.setAttribute("nonce", p), r.textContent = n.cssText, d.appendChild(r);
  }
}, nt = tt ? (d) => d : (d) => d instanceof CSSStyleSheet ? ((s) => {
  let n = "";
  for (const r of s.cssRules) n += r.cssText;
  return At(n);
})(d) : d;
const { is: Ct, defineProperty: bt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Pt, getOwnPropertySymbols: Ot, getPrototypeOf: xt } = Object, k = globalThis, dt = k.trustedTypes, Ht = dt ? dt.emptyScript : "", Lt = k.reactiveElementPolyfillSupport, X = (d, s) => d, q = { toAttribute(d, s) {
  switch (s) {
    case Boolean:
      d = d ? Ht : null;
      break;
    case Object:
    case Array:
      d = d == null ? d : JSON.stringify(d);
  }
  return d;
}, fromAttribute(d, s) {
  let n = d;
  switch (s) {
    case Boolean:
      n = d !== null;
      break;
    case Number:
      n = d === null ? null : Number(d);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(d);
      } catch {
        n = null;
      }
  }
  return n;
} }, it = (d, s) => !Ct(d, s), rt = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), k.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(s) {
    this._$Ei(), (this.l ??= []).push(s);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(s, n = rt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(s) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(s, n), !n.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), p = this.getPropertyDescriptor(s, r, n);
      p !== void 0 && bt(this.prototype, s, p);
    }
  }
  static getPropertyDescriptor(s, n, r) {
    const { get: p, set: u } = Et(this.prototype, s) ?? { get() {
      return this[n];
    }, set(y) {
      this[n] = y;
    } };
    return { get: p, set(y) {
      const a = p?.call(this);
      u?.call(this, y), this.requestUpdate(s, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(s) {
    return this.elementProperties.get(s) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const s = xt(this);
    s.finalize(), s.l !== void 0 && (this.l = [...s.l]), this.elementProperties = new Map(s.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const n = this.properties, r = [...Pt(n), ...Ot(n)];
      for (const p of r) this.createProperty(p, n[p]);
    }
    const s = this[Symbol.metadata];
    if (s !== null) {
      const n = litPropertyMetadata.get(s);
      if (n !== void 0) for (const [r, p] of n) this.elementProperties.set(r, p);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const p = this._$Eu(n, r);
      p !== void 0 && this._$Eh.set(p, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s) {
    const n = [];
    if (Array.isArray(s)) {
      const r = new Set(s.flat(1 / 0).reverse());
      for (const p of r) n.unshift(nt(p));
    } else s !== void 0 && n.push(nt(s));
    return n;
  }
  static _$Eu(s, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof s == "string" ? s.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((s) => this.enableUpdating = s)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((s) => s(this)));
  }
  addController(s) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(s), this.renderRoot !== void 0 && this.isConnected && s.hostConnected?.();
  }
  removeController(s) {
    this._$EO?.delete(s);
  }
  _$E_() {
    const s = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (s.set(r, this[r]), delete this[r]);
    s.size > 0 && (this._$Ep = s);
  }
  createRenderRoot() {
    const s = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return St(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((s) => s.hostConnected?.()));
  }
  enableUpdating(s) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((s) => s.hostDisconnected?.()));
  }
  attributeChangedCallback(s, n, r) {
    this._$AK(s, r);
  }
  _$ET(s, n) {
    const r = this.constructor.elementProperties.get(s), p = this.constructor._$Eu(s, r);
    if (p !== void 0 && r.reflect === !0) {
      const u = (r.converter?.toAttribute !== void 0 ? r.converter : q).toAttribute(n, r.type);
      this._$Em = s, u == null ? this.removeAttribute(p) : this.setAttribute(p, u), this._$Em = null;
    }
  }
  _$AK(s, n) {
    const r = this.constructor, p = r._$Eh.get(s);
    if (p !== void 0 && this._$Em !== p) {
      const u = r.getPropertyOptions(p), y = typeof u.converter == "function" ? { fromAttribute: u.converter } : u.converter?.fromAttribute !== void 0 ? u.converter : q;
      this._$Em = p;
      const a = y.fromAttribute(n, u.type);
      this[p] = a ?? this._$Ej?.get(p) ?? a, this._$Em = null;
    }
  }
  requestUpdate(s, n, r) {
    if (s !== void 0) {
      const p = this.constructor, u = this[s];
      if (r ??= p.getPropertyOptions(s), !((r.hasChanged ?? it)(u, n) || r.useDefault && r.reflect && u === this._$Ej?.get(s) && !this.hasAttribute(p._$Eu(s, r)))) return;
      this.C(s, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(s, n, { useDefault: r, reflect: p, wrapped: u }, y) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(s) && (this._$Ej.set(s, y ?? n ?? this[s]), u !== !0 || y !== void 0) || (this._$AL.has(s) || (this.hasUpdated || r || (n = void 0), this._$AL.set(s, n)), p === !0 && this._$Em !== s && (this._$Eq ??= /* @__PURE__ */ new Set()).add(s));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const s = this.scheduleUpdate();
    return s != null && await s, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [p, u] of this._$Ep) this[p] = u;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [p, u] of r) {
        const { wrapped: y } = u, a = this[p];
        y !== !0 || this._$AL.has(p) || a === void 0 || this.C(p, void 0, u, a);
      }
    }
    let s = !1;
    const n = this._$AL;
    try {
      s = this.shouldUpdate(n), s ? (this.willUpdate(n), this._$EO?.forEach(((r) => r.hostUpdate?.())), this.update(n)) : this._$EM();
    } catch (r) {
      throw s = !1, this._$EM(), r;
    }
    s && this._$AE(n);
  }
  willUpdate(s) {
  }
  _$AE(s) {
    this._$EO?.forEach(((n) => n.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(s)), this.updated(s);
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
  shouldUpdate(s) {
    return !0;
  }
  update(s) {
    this._$Eq &&= this._$Eq.forEach(((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(s) {
  }
  firstUpdated(s) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[X("elementProperties")] = /* @__PURE__ */ new Map(), L[X("finalized")] = /* @__PURE__ */ new Map(), Lt?.({ ReactiveElement: L }), (k.reactiveElementVersions ??= []).push("2.1.1");
const ct = globalThis, G = ct.trustedTypes, pt = G ? G.createPolicy("lit-html", { createHTML: (d) => d }) : void 0, wt = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Tt = "?" + C, Ut = `<${Tt}>`, x = document, B = () => x.createComment(""), W = (d) => d === null || typeof d != "object" && typeof d != "function", ot = Array.isArray, Nt = (d) => ot(d) || typeof d?.[Symbol.iterator] == "function", K = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, yt = />/g, P = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, at = /"/g, ft = /^(?:script|style|textarea|title)$/i, Mt = (d) => (s, ...n) => ({ _$litType$: d, strings: s, values: n }), U = Mt(1), N = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), O = x.createTreeWalker(x, 129);
function Dt(d, s) {
  if (!ot(d) || !d.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(s) : s;
}
const jt = (d, s) => {
  const n = d.length - 1, r = [];
  let p, u = s === 2 ? "<svg>" : s === 3 ? "<math>" : "", y = R;
  for (let a = 0; a < n; a++) {
    const h = d[a];
    let l, _, z = -1, D = 0;
    for (; D < h.length && (y.lastIndex = D, _ = y.exec(h), _ !== null); ) D = y.lastIndex, y === R ? _[1] === "!--" ? y = ut : _[1] !== void 0 ? y = yt : _[2] !== void 0 ? (ft.test(_[2]) && (p = RegExp("</" + _[2], "g")), y = P) : _[3] !== void 0 && (y = P) : y === P ? _[0] === ">" ? (y = p ?? R, z = -1) : _[1] === void 0 ? z = -2 : (z = y.lastIndex - _[2].length, l = _[1], y = _[3] === void 0 ? P : _[3] === '"' ? at : ht) : y === at || y === ht ? y = P : y === ut || y === yt ? y = R : (y = P, p = void 0);
    const S = y === P && d[a + 1].startsWith("/>") ? " " : "";
    u += y === R ? h + Ut : z >= 0 ? (r.push(l), h.slice(0, z) + wt + h.slice(z) + C + S) : h + C + (z === -2 ? a : S);
  }
  return [Dt(d, u + (d[n] || "<?>") + (s === 2 ? "</svg>" : s === 3 ? "</math>" : "")), r];
};
class Z {
  constructor({ strings: s, _$litType$: n }, r) {
    let p;
    this.parts = [];
    let u = 0, y = 0;
    const a = s.length - 1, h = this.parts, [l, _] = jt(s, n);
    if (this.el = Z.createElement(l, r), O.currentNode = this.el.content, n === 2 || n === 3) {
      const z = this.el.content.firstChild;
      z.replaceWith(...z.childNodes);
    }
    for (; (p = O.nextNode()) !== null && h.length < a; ) {
      if (p.nodeType === 1) {
        if (p.hasAttributes()) for (const z of p.getAttributeNames()) if (z.endsWith(wt)) {
          const D = _[y++], S = p.getAttribute(z).split(C), I = /([.?@])?(.*)/.exec(D);
          h.push({ type: 1, index: u, name: I[2], strings: S, ctor: I[1] === "." ? Xt : I[1] === "?" ? Bt : I[1] === "@" ? Wt : Q }), p.removeAttribute(z);
        } else z.startsWith(C) && (h.push({ type: 6, index: u }), p.removeAttribute(z));
        if (ft.test(p.tagName)) {
          const z = p.textContent.split(C), D = z.length - 1;
          if (D > 0) {
            p.textContent = G ? G.emptyScript : "";
            for (let S = 0; S < D; S++) p.append(z[S], B()), O.nextNode(), h.push({ type: 2, index: ++u });
            p.append(z[D], B());
          }
        }
      } else if (p.nodeType === 8) if (p.data === Tt) h.push({ type: 2, index: u });
      else {
        let z = -1;
        for (; (z = p.data.indexOf(C, z + 1)) !== -1; ) h.push({ type: 7, index: u }), z += C.length - 1;
      }
      u++;
    }
  }
  static createElement(s, n) {
    const r = x.createElement("template");
    return r.innerHTML = s, r;
  }
}
function M(d, s, n = d, r) {
  if (s === N) return s;
  let p = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const u = W(s) ? void 0 : s._$litDirective$;
  return p?.constructor !== u && (p?._$AO?.(!1), u === void 0 ? p = void 0 : (p = new u(d), p._$AT(d, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = p : n._$Cl = p), p !== void 0 && (s = M(d, p._$AS(d, s.values), p, r)), s;
}
class Rt {
  constructor(s, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = s, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(s) {
    const { el: { content: n }, parts: r } = this._$AD, p = (s?.creationScope ?? x).importNode(n, !0);
    O.currentNode = p;
    let u = O.nextNode(), y = 0, a = 0, h = r[0];
    for (; h !== void 0; ) {
      if (y === h.index) {
        let l;
        h.type === 2 ? l = new J(u, u.nextSibling, this, s) : h.type === 1 ? l = new h.ctor(u, h.name, h.strings, this, s) : h.type === 6 && (l = new Zt(u, this, s)), this._$AV.push(l), h = r[++a];
      }
      y !== h?.index && (u = O.nextNode(), y++);
    }
    return O.currentNode = x, p;
  }
  p(s) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(s, r, n), n += r.strings.length - 2) : r._$AI(s[n])), n++;
  }
}
class J {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(s, n, r, p) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = s, this._$AB = n, this._$AM = r, this.options = p, this._$Cv = p?.isConnected ?? !0;
  }
  get parentNode() {
    let s = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && s?.nodeType === 11 && (s = n.parentNode), s;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(s, n = this) {
    s = M(this, s, n), W(s) ? s === g || s == null || s === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : s !== this._$AH && s !== N && this._(s) : s._$litType$ !== void 0 ? this.$(s) : s.nodeType !== void 0 ? this.T(s) : Nt(s) ? this.k(s) : this._(s);
  }
  O(s) {
    return this._$AA.parentNode.insertBefore(s, this._$AB);
  }
  T(s) {
    this._$AH !== s && (this._$AR(), this._$AH = this.O(s));
  }
  _(s) {
    this._$AH !== g && W(this._$AH) ? this._$AA.nextSibling.data = s : this.T(x.createTextNode(s)), this._$AH = s;
  }
  $(s) {
    const { values: n, _$litType$: r } = s, p = typeof r == "number" ? this._$AC(s) : (r.el === void 0 && (r.el = Z.createElement(Dt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === p) this._$AH.p(n);
    else {
      const u = new Rt(p, this), y = u.u(this.options);
      u.p(n), this.T(y), this._$AH = u;
    }
  }
  _$AC(s) {
    let n = zt.get(s.strings);
    return n === void 0 && zt.set(s.strings, n = new Z(s)), n;
  }
  k(s) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, p = 0;
    for (const u of s) p === n.length ? n.push(r = new J(this.O(B()), this.O(B()), this, this.options)) : r = n[p], r._$AI(u), p++;
    p < n.length && (this._$AR(r && r._$AB.nextSibling, p), n.length = p);
  }
  _$AR(s = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); s !== this._$AB; ) {
      const r = s.nextSibling;
      s.remove(), s = r;
    }
  }
  setConnected(s) {
    this._$AM === void 0 && (this._$Cv = s, this._$AP?.(s));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(s, n, r, p, u) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = s, this.name = n, this._$AM = p, this.options = u, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(s, n = this, r, p) {
    const u = this.strings;
    let y = !1;
    if (u === void 0) s = M(this, s, n, 0), y = !W(s) || s !== this._$AH && s !== N, y && (this._$AH = s);
    else {
      const a = s;
      let h, l;
      for (s = u[0], h = 0; h < u.length - 1; h++) l = M(this, a[r + h], n, h), l === N && (l = this._$AH[h]), y ||= !W(l) || l !== this._$AH[h], l === g ? s = g : s !== g && (s += (l ?? "") + u[h + 1]), this._$AH[h] = l;
    }
    y && !p && this.j(s);
  }
  j(s) {
    s === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, s ?? "");
  }
}
class Xt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(s) {
    this.element[this.name] = s === g ? void 0 : s;
  }
}
class Bt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(s) {
    this.element.toggleAttribute(this.name, !!s && s !== g);
  }
}
class Wt extends Q {
  constructor(s, n, r, p, u) {
    super(s, n, r, p, u), this.type = 5;
  }
  _$AI(s, n = this) {
    if ((s = M(this, s, n, 0) ?? g) === N) return;
    const r = this._$AH, p = s === g && r !== g || s.capture !== r.capture || s.once !== r.once || s.passive !== r.passive, u = s !== g && (r === g || p);
    p && this.element.removeEventListener(this.name, this, r), u && this.element.addEventListener(this.name, this, s), this._$AH = s;
  }
  handleEvent(s) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, s) : this._$AH.handleEvent(s);
  }
}
class Zt {
  constructor(s, n, r) {
    this.element = s, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s) {
    M(this, s);
  }
}
const Jt = ct.litHtmlPolyfillSupport;
Jt?.(Z, J), (ct.litHtmlVersions ??= []).push("3.3.1");
const Yt = (d, s, n) => {
  const r = n?.renderBefore ?? s;
  let p = r._$litPart$;
  if (p === void 0) {
    const u = n?.renderBefore ?? null;
    r._$litPart$ = p = new J(s.insertBefore(B(), u), u, void 0, n ?? {});
  }
  return p._$AI(d), p;
};
const et = globalThis;
class b extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const s = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= s.firstChild, s;
  }
  update(s) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(s), this._$Do = Yt(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return N;
  }
}
b._$litElement$ = !0, b.finalized = !0, et.litElementHydrateSupport?.({ LitElement: b });
const It = et.litElementPolyfillSupport;
It?.({ LitElement: b });
(et.litElementVersions ??= []).push("4.2.1");
const V = (d) => (s, n) => {
  n !== void 0 ? n.addInitializer((() => {
    customElements.define(d, s);
  })) : customElements.define(d, s);
};
const Ft = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: it }, qt = (d = Ft, s, n) => {
  const { kind: r, metadata: p } = n;
  let u = globalThis.litPropertyMetadata.get(p);
  if (u === void 0 && globalThis.litPropertyMetadata.set(p, u = /* @__PURE__ */ new Map()), r === "setter" && ((d = Object.create(d)).wrapped = !0), u.set(n.name, d), r === "accessor") {
    const { name: y } = n;
    return { set(a) {
      const h = s.get.call(this);
      s.set.call(this, a), this.requestUpdate(y, h, d);
    }, init(a) {
      return a !== void 0 && this.C(y, void 0, d, a), a;
    } };
  }
  if (r === "setter") {
    const { name: y } = n;
    return function(a) {
      const h = this[y];
      s.call(this, a), this.requestUpdate(y, h, d);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function $(d) {
  return (s, n) => typeof n == "object" ? qt(d, s, n) : ((r, p, u) => {
    const y = p.hasOwnProperty(u);
    return p.constructor.createProperty(u, r), y ? Object.getOwnPropertyDescriptor(p, u) : void 0;
  })(d, s, n);
}
function w(d) {
  return $({ ...d, state: !0, attribute: !1 });
}
const Gt = (d, s, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof s != "object" && Object.defineProperty(d, s, n), n);
function Y(d, s) {
  return (n, r, p) => {
    const u = (y) => y.renderRoot?.querySelector(d) ?? null;
    return Gt(n, r, { get() {
      return u(this);
    } });
  };
}
const o = ["臺北市", "基隆市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園市", "苗栗縣", "臺中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣", "臺南市", "高雄市", "澎湖縣", "屏東縣", "臺東縣", "花蓮縣", "金門縣", "連江縣"], i = ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區", "仁愛區", "安樂區", "暖暖區", "七堵區", "萬里區", "金山區", "板橋區", "汐止區", "深坑區", "石碇區", "瑞芳區", "平溪區", "雙溪區", "貢寮區", "新店區", "坪林區", "烏來區", "永和區", "中和區", "土城區", "三峽區", "樹林區", "鶯歌區", "三重區", "新莊區", "泰山區", "林口區", "蘆洲區", "五股區", "八里區", "淡水區", "三芝區", "石門區", "宜蘭市", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "羅東鎮", "三星鄉", "大同鄉", "五結鄉", "冬山鄉", "蘇澳鎮", "南澳鄉", "釣魚臺列嶼", "東區", "北區", "香山區", "竹北市", "湖口鄉", "新豐鄉", "新埔鎮", "關西鎮", "芎林鄉", "寶山鄉", "竹東鎮", "五峰鄉", "橫山鄉", "尖石鄉", "北埔鄉", "峨眉鄉", "中壢區", "平鎮區", "龍潭區", "楊梅區", "新屋區", "觀音區", "桃園區", "龜山區", "八德區", "大溪區", "復興區", "大園區", "蘆竹區", "竹南鎮", "頭份市", "三灣鄉", "南庄鄉", "獅潭鄉", "後龍鎮", "通霄鎮", "苑裡鎮", "苗栗市", "造橋鄉", "頭屋鄉", "公館鄉", "大湖鄉", "泰安鄉", "銅鑼鄉", "三義鄉", "西湖鄉", "卓蘭鎮", "中區", "南區", "西區", "北屯區", "西屯區", "南屯區", "太平區", "大里區", "霧峰區", "烏日區", "豐原區", "后里區", "石岡區", "東勢區", "和平區", "新社區", "潭子區", "大雅區", "神岡區", "大肚區", "沙鹿區", "龍井區", "梧棲區", "清水區", "大甲區", "外埔區", "彰化市", "芬園鄉", "花壇鄉", "秀水鄉", "鹿港鎮", "福興鄉", "線西鄉", "和美鎮", "伸港鄉", "員林市", "社頭鄉", "永靖鄉", "埔心鄉", "溪湖鎮", "大村鄉", "埔鹽鄉", "田中鎮", "北斗鎮", "田尾鄉", "埤頭鄉", "溪州鄉", "竹塘鄉", "二林鎮", "大城鄉", "芳苑鄉", "二水鄉", "南投市", "中寮鄉", "草屯鎮", "國姓鄉", "埔里鎮", "仁愛鄉", "名間鄉", "集集鎮", "水里鄉", "魚池鄉", "信義鄉", "竹山鎮", "鹿谷鄉", "番路鄉", "梅山鄉", "竹崎鄉", "阿里山鄉", "中埔鄉", "大埔鄉", "水上鄉", "鹿草鄉", "太保市", "朴子市", "東石鄉", "六腳鄉", "新港鄉", "民雄鄉", "大林鎮", "溪口鄉", "義竹鄉", "布袋鎮", "斗南鎮", "大埤鄉", "虎尾鎮", "土庫鎮", "褒忠鄉", "東勢鄉", "臺西鄉", "崙背鄉", "麥寮鄉", "斗六市", "林內鄉", "古坑鄉", "莿桐鄉", "西螺鎮", "二崙鄉", "北港鎮", "水林鄉", "口湖鄉", "四湖鄉", "元長鄉", "中西區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區", "新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "楠梓區", "小港區", "左營區", "仁武區", "大社區", "岡山區", "路竹區", "阿蓮區", "田寮區", "燕巢區", "橋頭區", "梓官區", "彌陀區", "永安區", "湖內區", "鳳山區", "大寮區", "林園區", "鳥松區", "大樹區", "旗山區", "美濃區", "六龜區", "內門區", "杉林區", "甲仙區", "桃源區", "那瑪夏區", "茂林區", "茄萣區", "東沙群島", "南沙群島", "馬公市", "西嶼鄉", "望安鄉", "七美鄉", "白沙鄉", "湖西鄉", "屏東市", "三地門鄉", "霧臺鄉", "瑪家鄉", "九如鄉", "里港鄉", "高樹鄉", "鹽埔鄉", "長治鄉", "麟洛鄉", "竹田鄉", "內埔鄉", "萬丹鄉", "潮州鎮", "泰武鄉", "來義鄉", "萬巒鄉", "崁頂鄉", "新埤鄉", "南州鄉", "林邊鄉", "東港鎮", "琉球鄉", "佳冬鄉", "新園鄉", "枋寮鄉", "枋山鄉", "春日鄉", "獅子鄉", "車城鄉", "牡丹鄉", "恆春鎮", "滿州鄉", "臺東市", "綠島鄉", "蘭嶼鄉", "延平鄉", "卑南鄉", "鹿野鄉", "關山鎮", "海端鄉", "池上鄉", "東河鄉", "成功鎮", "長濱鄉", "太麻里鄉", "金峰鄉", "大武鄉", "達仁鄉", "花蓮市", "新城鄉", "秀林鄉", "吉安鄉", "壽豐鄉", "鳳林鎮", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "玉里鎮", "卓溪鄉", "富里鄉", "金沙鎮", "金湖鎮", "金寧鄉", "金城鎮", "烈嶼鄉", "烏坵鄉", "南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"], t = ["100", "103", "104", "105", "106", "108", "110", "111", "112", "114", "115", "116", "200", "201", "202", "203", "204", "205", "206", "207", "208", "220", "221", "222", "223", "224", "226", "227", "228", "231", "232", "233", "234", "235", "236", "237", "238", "239", "241", "242", "243", "244", "247", "248", "249", "251", "252", "253", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "272", "290", "300", "302", "303", "304", "305", "306", "307", "308", "310", "311", "312", "313", "314", "315", "320", "324", "325", "326", "327", "328", "330", "333", "334", "335", "336", "337", "338", "350", "351", "352", "353", "354", "356", "357", "358", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "400", "401", "402", "403", "404", "406", "407", "408", "411", "412", "413", "414", "420", "421", "422", "423", "424", "426", "427", "428", "429", "432", "433", "434", "435", "436", "437", "438", "439", "500", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "512", "513", "514", "515", "516", "520", "521", "522", "523", "524", "525", "526", "527", "528", "530", "540", "541", "542", "544", "545", "546", "551", "552", "553", "555", "556", "557", "558", "600", "602", "603", "604", "605", "606", "607", "608", "611", "612", "613", "614", "615", "616", "621", "622", "623", "624", "625", "630", "631", "632", "633", "634", "635", "636", "637", "638", "640", "643", "646", "647", "648", "649", "651", "652", "653", "654", "655", "700", "701", "702", "704", "708", "709", "710", "711", "712", "713", "714", "715", "716", "717", "718", "719", "720", "721", "722", "723", "724", "725", "726", "727", "730", "731", "732", "733", "734", "735", "736", "737", "741", "742", "743", "744", "745", "800", "801", "802", "803", "804", "805", "806", "807", "811", "812", "813", "814", "815", "820", "821", "822", "823", "824", "825", "826", "827", "828", "829", "830", "831", "832", "833", "840", "842", "843", "844", "845", "846", "847", "848", "849", "851", "852", "817", "819", "880", "881", "882", "883", "884", "885", "900", "901", "902", "903", "904", "905", "906", "907", "908", "909", "911", "912", "913", "920", "921", "922", "923", "924", "925", "926", "927", "928", "929", "931", "932", "940", "941", "942", "943", "944", "945", "946", "947", "950", "951", "952", "953", "954", "955", "956", "957", "958", "959", "961", "962", "963", "964", "965", "966", "970", "971", "972", "973", "974", "975", "976", "977", "978", "979", "981", "982", "983", "890", "891", "892", "893", "894", "896", "209", "210", "211", "212"], e = ["Taipei City", "Keelung City", "New Taipei City", "Yilan County", "Hsinchu City", "HsinChu County", "Taoyuan City", "Miaoli County", "Taichung City", "Changhua County", "Nantou County", "Chiayi City", "Chiayi County", "Yunlin County", "Tainan City", "Kaohsiung City", "Penghu County", "Pingtung County", "Taitung County", "Hualien County", "Kinmen County", "Lienchiang County"], c = ["Zhongzheng District", "Daton District", "Zhongshan District", "Songshan District", "Da'an District", "Wanhua Disrict", "Xinyi District", "Shilin District", "Beitou District", "Neihu District", "Nangang District", "Wenshan District", "Ren'ai District", "Anle District", "Nuannuan District", "Qidu District", "Wanli District", "Jinshan District", "Banqiao District", "Xizhi District", "Shenkeng District", "Shiding District", "Ruifang District", "Pingxi District", "Shuangxi District", "Gongliao District", "Xindian Distict", "Pinglin District", "Wulai District", "Yonghe District", "Zhonghe District", "Tucheng District", "Sanxia District", "Shulin District", "Yingge District", "Sanchong District", "Xinzhuang District", "Taishan District", "Linkou District", "Luzhou District", "Wugu District", "Bali District", "Tamsui District", "Sanzhi District", "Shimen District", "Yilan City", "Toucheng Township", "Jiaoxi Township", "Zhuangwei Township", "Yuanshan Township", "Luodong Township", "Sanxing Township", "Datong Township", "Wujie Township", "Dongshan Township", "Su'ao Township", "Nan'ao Township", "Diaoyu Islands", "East District", "North District", "Xiangshan District", "Zhubei City", "Hukou Township", "Xinfeng Township", "Xinpu Township", "Guanxi Township", "Qionglin Township", "Baoshan Township", "Zhudong Township", "Wufeng Township", "Hengshan Township", "Jianshi Township", "Beipu Township", "Emei Township", "Zhongli District", "Pingzhen District", "Longtan District", "Yangmei District", "Xinwu District", "Guanyin District", "Taoyuan District", "Guishan District", "Bade District", "Daxi District", "Fuxing District", "Dayuan District", "Luzhu District", "Zhunan Township", "Toufen Town", "Sanwan Township", "Nanzhuang Township", "Shitan Township", "Houlong Township", "Tongxiao Township", "Yuanli Township", "Miaoli City", "Zaoqiao Township", "Touwu Township", "Gongguan Township", "Dahu Township", "Tai'an Township", "Tongluo Township", "Sanyi Township", "Xihu Township", "Zhuolan Township", "Central District", "South District", "West District", "Beitun District", "Xitun District", "Nantun District", "Taiping District", "Dali District", "Wufeng District", "Wuri District", "Fengyuan District", "Houli District", "Shigang District", "Dongshi District", "Heping District", "Xinshe District", "Tanzi District", "Daya District", "Shengang District", "Dadu District", "Shalu District", "Longjing District", "Wuqi District", "Qingshui District", "Dajia District", "Waipu District", "Changhua City", "Fenyuan Township", "Huatan Township", "Xiushui Township", "Lukang Township", "Fuxing Township", "Xianxi Township", "Hemei Township", "Shengang Township", "Yuanlin市", "Shetou Township", "Yongjing Township", "Puxin Township", "Dacun Township", "Puyan Township", "Tianzhong Township", "Beidu Township", "Tianwei Township", "Pitou Township", "Xizhou Township", "Zhutang Township", "Erlin Township", "Dacheng Township", "Fangyuan Township", "Ershui Township", "Nantou City", "Zhongliao Township", "Caotun Township", "Guoxing Township", "Puli Township", "Ren'ai Township", "Mingjian Township", "Jiji Township", "Shuili Township", "Yuchi Township", "Xinyi Township", "Zhushan Township", "Lugu Township", "Fanlu Township", "Meishan Township", "Zhuqi Township", "Alishan Township", "Zhongpu Township", "Dapu Township", "Shuishang Township", "Lucao Township", "Taibao City", "Puzi City", "Dongshi Township", "Liujiao Township", "Xingang Township", "Minxiong Township", "Dalin Township", "Xikou Township", "Yizhu Township", "Budai Township", "Dounan Township", "Dapi Township", "Huwei Township", "Tuku Township", "Baozhong Township", "Taixi Township", "Lunbei Township", "Mailiao Township", "Douliu City", "Linnei Township", "Gukeng Township", "Citong Township", "Xiluo Township", "Erlun Township", "Beigang Township", "Shuilin Township", "Kouhu Township", "Sihu Township", "Yuanchang Township", "West Central District", "Anping District", "Annan District", "Yongkang District", "Guiren District", "Xinhua District", "Zuozhen District", "Yujing District", "Nanxi District", "Nanhua District", "Rende District", "Guanmiao District", "Longqi District", "Guantian District", "Madou District", "Jiali District", "Xigang District", "Qigu District", "Jiangjun District", "Xuejia District", "Beimen District", "Xinying District", "Houbi District", "Baihe District", "Dongshan District", "Liujia District", "Xiaying District", "Liuying District", "Yanshui District", "Shanhua District", "Danei District", "Shanshang District", "Xinshi District", "Anding District", "Xinxing District", "Qianjin District", "Lingya District", "Yancheng District", "Gushan District", "Qijin District", "Qianzhen District", "Sanmin District", "Nanzi District", "Xiaogang District", "Zouying District", "Renwu District", "Dashe District", "Gangshan District", "Alian District", "Tianliao District", "Yanchao District", "Qiaotou District", "Ziguan District", "Mituo District", "Yong'an District", "Hunei District", "Fengshan District", "Daliao District", "Linyuan District", "Niaosong District", "Dashu District", "Qishan District", "Meinong District", "Liugui District", "Neimen District", "Shanlin District", "Jiaxian District", "Namaxia District", "Maolin District", "Qieding District", "Dongsha Islands", "Spratly Islands", "Magong City", "Xiyu Township", "Wang'an Township", "Qimei Township", "Baisha Township", "Huxi Township", "Pingdong City", "Sandimen Township", "Wutai Township", "Majia Township", "Jiuru Township", "Ligang Township", "Gaoshu Township", "Yanpu Township", "Changzhi Township", "Linluo Township", "Zhutian Township", "Neipu Township", "Wandan Township", "Chaozhou Township", "Taiwu Township", "Laiyi Township", "Wanluan Township", "Kanding Township", "Xinpi Township", "Nanzhou Township", "Linbian Township", "Donggang Township", "Liuqiu Township", "Jiadong Township", "Xinyuan Township", "Fangliao Township", "Fangshan Township", "Chunri Township", "Shizi Township", "Checheng Township", "Mudan Township", "Hengchu Township", "Manzhou Township", "Taitung City", "Ludao Township", "Lanyu Township", "Yangping Township", "Beinan Township", "Luye Township", "Guanshan Township", "Haiduan Township", "Chishang Township", "Donghe Township", "Chenggong Township", "Changbin Township", "Taimali Township", "Jinfeng Township", "Dawu Township", "Daren Township", "Hualien City", "Xincheng Township", "Xiulin Township", "Ji'an Township", "Shoufeng Township", "Fenglin Township", "Guangfu Township", "Fengbin Township", "Ruisui Township", "Wanrong Township", "Yuli Township", "Zhuoxi Township", "Fuli Township", "Jinsha Township", "Jinhu Township", "Jinning Township", "Jincheng Township", "Lieyu Township", "Wuqiu Township", "Nangan Township", "Beigan Township", "Juguan Township", "Dongyin Township"], lt = [
  [o[0], e[0]],
  [o[1], e[1]],
  [o[2], e[2]],
  [o[3], e[3]],
  [o[4], e[4]],
  [o[5], e[5]],
  [o[6], e[6]],
  [o[7], e[7]],
  [o[8], e[8]],
  [o[9], e[9]],
  [o[10], e[10]],
  [o[11], e[11]],
  [o[12], e[12]],
  [o[13], e[13]],
  [o[14], e[14]],
  [o[15], e[15]],
  [o[16], e[16]],
  [o[17], e[17]],
  [o[18], e[18]],
  [o[19], e[19]],
  [o[20], e[20]],
  [o[21], e[21]]
], vt = new Map([
  lt,
  lt.map((d) => [d[1], d[0]])
].flat()), gt = [
  [i[0], c[0]],
  [i[1], c[1]],
  [i[2], c[2]],
  [i[3], c[3]],
  [i[4], c[4]],
  [i[5], c[5]],
  [i[6], c[6]],
  [i[7], c[7]],
  [i[8], c[8]],
  [i[9], c[9]],
  [i[10], c[10]],
  [i[11], c[11]],
  [i[12], c[12]],
  [i[13], c[13]],
  [i[14], c[14]],
  [i[15], c[15]],
  [i[16], c[16]],
  [i[17], c[17]],
  [i[18], c[18]],
  [i[19], c[19]],
  [i[20], c[20]],
  [i[21], c[21]],
  [i[22], c[22]],
  [i[23], c[23]],
  [i[24], c[24]],
  [i[25], c[25]],
  [i[26], c[26]],
  [i[27], c[27]],
  [i[28], c[28]],
  [i[29], c[29]],
  [i[30], c[30]],
  [i[31], c[31]],
  [i[32], c[32]],
  [i[33], c[33]],
  [i[34], c[34]],
  [i[35], c[35]],
  [i[36], c[36]],
  [i[37], c[37]],
  [i[38], c[38]],
  [i[39], c[39]],
  [i[40], c[40]],
  [i[41], c[41]],
  [i[42], c[42]],
  [i[43], c[43]],
  [i[44], c[44]],
  [i[45], c[45]],
  [i[46], c[46]],
  [i[47], c[47]],
  [i[48], c[48]],
  [i[49], c[49]],
  [i[50], c[50]],
  [i[51], c[51]],
  [i[52], c[52]],
  [i[53], c[53]],
  [i[54], c[54]],
  [i[55], c[55]],
  [i[56], c[56]],
  [i[57], c[57]],
  [i[58], c[58]],
  [i[59], c[59]],
  [i[60], c[60]],
  [i[61], c[61]],
  [i[62], c[62]],
  [i[63], c[63]],
  [i[64], c[64]],
  [i[65], c[65]],
  [i[66], c[66]],
  [i[67], c[67]],
  [i[68], c[68]],
  [i[69], c[69]],
  [i[70], c[70]],
  [i[71], c[71]],
  [i[72], c[72]],
  [i[73], c[73]],
  [i[74], c[74]],
  [i[75], c[75]],
  [i[76], c[76]],
  [i[77], c[77]],
  [i[78], c[78]],
  [i[79], c[79]],
  [i[80], c[80]],
  [i[81], c[81]],
  [i[82], c[82]],
  [i[83], c[83]],
  [i[84], c[84]],
  [i[85], c[85]],
  [i[86], c[86]],
  [i[87], c[87]],
  [i[88], c[88]],
  [i[89], c[89]],
  [i[90], c[90]],
  [i[91], c[91]],
  [i[92], c[92]],
  [i[93], c[93]],
  [i[94], c[94]],
  [i[95], c[95]],
  [i[96], c[96]],
  [i[97], c[97]],
  [i[98], c[98]],
  [i[99], c[99]],
  [i[100], c[100]],
  [i[101], c[101]],
  [i[102], c[102]],
  [i[103], c[103]],
  [i[104], c[104]],
  [i[105], c[105]],
  [i[106], c[106]],
  [i[107], c[107]],
  [i[108], c[108]],
  [i[109], c[109]],
  [i[110], c[110]],
  [i[111], c[111]],
  [i[112], c[112]],
  [i[113], c[113]],
  [i[114], c[114]],
  [i[115], c[115]],
  [i[116], c[116]],
  [i[117], c[117]],
  [i[118], c[118]],
  [i[119], c[119]],
  [i[120], c[120]],
  [i[121], c[121]],
  [i[122], c[122]],
  [i[123], c[123]],
  [i[124], c[124]],
  [i[125], c[125]],
  [i[126], c[126]],
  [i[127], c[127]],
  [i[128], c[128]],
  [i[129], c[129]],
  [i[130], c[130]],
  [i[131], c[131]],
  [i[132], c[132]],
  [i[133], c[133]],
  [i[134], c[134]],
  [i[135], c[135]],
  [i[136], c[136]],
  [i[137], c[137]],
  [i[138], c[138]],
  [i[139], c[139]],
  [i[140], c[140]],
  [i[141], c[141]],
  [i[142], c[142]],
  [i[143], c[143]],
  [i[144], c[103]],
  [i[145], c[144]],
  [i[146], c[145]],
  [i[147], c[146]],
  [i[148], c[147]],
  [i[149], c[148]],
  [i[150], c[149]],
  [i[151], c[150]],
  [i[152], c[151]],
  [i[153], c[152]],
  [i[154], c[153]],
  [i[155], c[154]],
  [i[156], c[155]],
  [i[157], c[156]],
  [i[158], c[157]],
  [i[159], c[158]],
  [i[160], c[159]],
  [i[161], c[160]],
  [i[162], c[161]],
  [i[163], c[162]],
  [i[164], c[163]],
  [i[165], c[164]],
  [i[166], c[165]],
  [i[167], c[166]],
  [i[168], c[167]],
  [i[169], c[168]],
  [i[170], c[169]],
  [i[171], c[170]],
  [i[172], c[171]],
  [i[173], c[172]],
  [i[174], c[173]],
  [i[175], c[174]],
  [i[176], c[175]],
  [i[177], c[176]],
  [i[178], c[177]],
  [i[179], c[178]],
  [i[180], c[179]],
  [i[181], c[180]],
  [i[182], c[181]],
  [i[183], c[182]],
  [i[184], c[183]],
  [i[185], c[184]],
  [i[186], c[185]],
  [i[187], c[186]],
  [i[188], c[187]],
  [i[189], c[188]],
  [i[190], c[189]],
  [i[191], c[190]],
  [i[192], c[191]],
  [i[193], c[179]],
  [i[194], c[192]],
  [i[195], c[193]],
  [i[196], c[194]],
  [i[197], c[195]],
  [i[198], c[196]],
  [i[199], c[197]],
  [i[200], c[198]],
  [i[201], c[199]],
  [i[202], c[200]],
  [i[203], c[201]],
  [i[204], c[202]],
  [i[205], c[203]],
  [i[206], c[204]],
  [i[207], c[205]],
  [i[208], c[206]],
  [i[209], c[207]],
  [i[210], c[208]],
  [i[211], c[209]],
  [i[212], c[210]],
  [i[213], c[211]],
  [i[214], c[212]],
  [i[215], c[213]],
  [i[216], c[214]],
  [i[217], c[215]],
  [i[218], c[216]],
  [i[219], c[217]],
  [i[220], c[218]],
  [i[221], c[219]],
  [i[222], c[220]],
  [i[223], c[221]],
  [i[224], c[222]],
  [i[225], c[223]],
  [i[226], c[224]],
  [i[227], c[225]],
  [i[228], c[226]],
  [i[229], c[227]],
  [i[230], c[228]],
  [i[231], c[229]],
  [i[232], c[230]],
  [i[233], c[231]],
  [i[234], c[232]],
  [i[235], c[233]],
  [i[236], c[234]],
  [i[237], c[235]],
  [i[238], c[236]],
  [i[239], c[237]],
  [i[240], c[238]],
  [i[241], c[239]],
  [i[242], c[240]],
  [i[243], c[241]],
  [i[244], c[242]],
  [i[245], c[243]],
  [i[246], c[244]],
  [i[247], c[245]],
  [i[248], c[246]],
  [i[249], c[247]],
  [i[250], c[248]],
  [i[251], c[249]],
  [i[252], c[250]],
  [i[253], c[251]],
  [i[254], c[252]],
  [i[255], c[253]],
  [i[256], c[86]],
  [i[257], c[254]],
  [i[258], c[255]],
  [i[259], c[256]],
  [i[260], c[257]],
  [i[261], c[258]],
  [i[262], c[259]],
  [i[263], c[260]],
  [i[264], c[261]],
  [i[265], c[262]],
  [i[266], c[263]],
  [i[267], c[264]],
  [i[268], c[265]],
  [i[269], c[266]],
  [i[270], c[267]],
  [i[271], c[268]],
  [i[272], c[269]],
  [i[273], c[270]],
  [i[274], c[271]],
  [i[275], c[272]],
  [i[276], c[80]],
  [i[277], c[273]],
  [i[278], c[274]],
  [i[279], c[275]],
  [i[280], c[276]],
  [i[281], c[277]],
  [i[282], c[278]],
  [i[283], c[279]],
  [i[284], c[280]],
  [i[285], c[281]],
  [i[286], c[282]],
  [i[287], c[283]],
  [i[288], c[284]],
  [i[289], c[285]],
  [i[290], c[286]],
  [i[291], c[287]],
  [i[292], c[288]],
  [i[293], c[289]],
  [i[294], c[290]],
  [i[295], c[291]],
  [i[296], c[292]],
  [i[297], c[293]],
  [i[298], c[294]],
  [i[299], c[295]],
  [i[300], c[296]],
  [i[301], c[297]],
  [i[302], c[298]],
  [i[303], c[299]],
  [i[304], c[300]],
  [i[305], c[301]],
  [i[306], c[302]],
  [i[307], c[303]],
  [i[308], c[304]],
  [i[309], c[305]],
  [i[310], c[306]],
  [i[311], c[307]],
  [i[312], c[308]],
  [i[313], c[309]],
  [i[314], c[310]],
  [i[315], c[311]],
  [i[316], c[312]],
  [i[317], c[313]],
  [i[318], c[314]],
  [i[319], c[315]],
  [i[320], c[316]],
  [i[321], c[317]],
  [i[322], c[318]],
  [i[323], c[319]],
  [i[324], c[320]],
  [i[325], c[321]],
  [i[326], c[322]],
  [i[327], c[323]],
  [i[328], c[324]],
  [i[329], c[325]],
  [i[330], c[326]],
  [i[331], c[327]],
  [i[332], c[328]],
  [i[333], c[329]],
  [i[334], c[330]],
  [i[335], c[331]],
  [i[336], c[332]],
  [i[337], c[333]],
  [i[338], c[334]],
  [i[339], c[335]],
  [i[340], c[336]],
  [i[341], c[337]],
  [i[342], c[338]],
  [i[343], c[339]],
  [i[344], c[340]],
  [i[345], c[341]],
  [i[346], c[342]],
  [i[347], c[343]],
  [i[348], c[344]],
  [i[349], c[345]],
  [i[350], c[346]],
  [i[351], c[347]],
  [i[352], c[348]],
  [i[353], c[349]],
  [i[354], c[350]],
  [i[355], c[351]],
  [i[356], c[352]],
  [i[357], c[353]],
  [i[358], c[354]],
  [i[359], c[355]]
], kt = new Map([
  gt,
  gt.map((d) => [d[1], d[0]])
].flat());
var Qt = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, E = (d, s, n, r) => {
  for (var p = r > 1 ? void 0 : r ? Vt(s, n) : s, u = d.length - 1, y; u >= 0; u--)
    (y = d[u]) && (p = (r ? y(s, n, p) : y(p)) || p);
  return r && p && Qt(s, n, p), p;
};
let v = class extends b {
  constructor() {
    super(...arguments), this.classes = "", this.name = "county", this.placeholder = "---", this.lang = "zh-tw", this.value = "", this._options = [], this.tag = "county", this._counties = [];
  }
  updated(d) {
    d.has("value") && this.dispatchEvent(
      new CustomEvent("update:county", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  reload(d) {
    this._counties = d !== "en" ? o : e, this._updateOptions();
  }
  ignore(d) {
    this._updateOptions(this.lang !== "en" ? d : d.map((s) => vt.get(s) ?? s));
  }
  findAndSelect(d, s) {
    this.select(d.find(({ zipcode: n }) => n.startsWith(s))?.county ?? "");
  }
  select(d) {
    this.value = d && this._options.includes(d) ? d : "", !this.value && this.$_select && (this.$_select.value = "");
  }
  _updateOptions(d = []) {
    this._options = d.length ? this._counties.filter((s) => !d.includes(s)) : this._counties, this.select(this.value);
  }
  _handleEvent(d) {
    this.select(d.target.value);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return U`
      <select class="${this.classes}" name=${this.name} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map((d) => U`<option value=${d} ?selected=${this.value === d}>${d}</option>`)}
      </select>
    `;
  }
};
E([
  $({ type: String })
], v.prototype, "classes", 2);
E([
  $({ type: String })
], v.prototype, "name", 2);
E([
  $({ type: String })
], v.prototype, "placeholder", 2);
E([
  w()
], v.prototype, "lang", 2);
E([
  w()
], v.prototype, "value", 2);
E([
  w()
], v.prototype, "_options", 2);
E([
  Y("select")
], v.prototype, "$_select", 2);
v = E([
  V("county-field")
], v);
var Kt = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, m = (d, s, n, r) => {
  for (var p = r > 1 ? void 0 : r ? ti(s, n) : s, u = d.length - 1, y; u >= 0; u--)
    (y = d[u]) && (p = (r ? y(s, n, p) : y(p)) || p);
  return r && p && Kt(s, n, p), p;
};
let T = class extends b {
  constructor() {
    super(...arguments), this.classes = "", this.name = "district", this.placeholder = "---", this.lang = "zh-tw", this.value = "", this._ignoreList = {}, this._options = [], this.tag = "district";
  }
  updated(d) {
    d.has("value") && this.dispatchEvent(
      new CustomEvent("update:district", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  reload(d, s) {
    if (!s)
      return;
    let n = d.filter(({ county: r }) => r === s).map(({ district: r }) => r);
    if (s in this._ignoreList) {
      const r = this._ignoreList[s];
      n = n.filter((p) => !r?.includes(p));
    }
    this._options = n, this.select();
  }
  ignore(d) {
    let s = d.reduce((n, r) => ({ ...n, ...r }), {});
    this.lang === "en" && (s = Object.entries(s).reduce((n, [r, p]) => ({
      ...n,
      [vt.get(r) ?? r]: p.map((u) => kt.get(u) ?? u)
    }), {})), this._ignoreList = s;
  }
  findAndSelect(d, s) {
    const n = s.length === 3 ? d.find(({ zipcode: r }) => r === s)?.district ?? "" : "";
    this.select(n);
  }
  select(d = "") {
    this.value = d && this._options.includes(d) ? d : "", this.value || (this.$_select.value = "");
  }
  _handleEvent(d) {
    this.select(d.target.value);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return U`
      <select class="${this.classes}" name=${this.name} ?disabled=${!this._options.length} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map((d) => U`<option value=${d} ?selected=${this.value === d}>${d}</option>`)}
      </select>
    `;
  }
};
m([
  $({ type: String })
], T.prototype, "classes", 2);
m([
  $({ type: String })
], T.prototype, "name", 2);
m([
  $({ type: String })
], T.prototype, "placeholder", 2);
m([
  w()
], T.prototype, "lang", 2);
m([
  w()
], T.prototype, "value", 2);
m([
  w()
], T.prototype, "_ignoreList", 2);
m([
  w()
], T.prototype, "_options", 2);
m([
  Y("select")
], T.prototype, "$_select", 2);
T = m([
  V("district-field")
], T);
const ii = [
  { county: e[0], district: c[0], zipcode: t[0] },
  { county: e[0], district: c[1], zipcode: t[1] },
  { county: e[0], district: c[2], zipcode: t[2] },
  { county: e[0], district: c[3], zipcode: t[3] },
  { county: e[0], district: c[4], zipcode: t[4] },
  { county: e[0], district: c[5], zipcode: t[5] },
  { county: e[0], district: c[6], zipcode: t[6] },
  { county: e[0], district: c[7], zipcode: t[7] },
  { county: e[0], district: c[8], zipcode: t[8] },
  { county: e[0], district: c[9], zipcode: t[9] },
  { county: e[0], district: c[10], zipcode: t[10] },
  { county: e[0], district: c[11], zipcode: t[11] },
  { county: e[1], district: c[12], zipcode: t[12] },
  { county: e[1], district: c[6], zipcode: t[13] },
  { county: e[1], district: c[0], zipcode: t[14] },
  { county: e[1], district: c[2], zipcode: t[15] },
  { county: e[1], district: c[13], zipcode: t[16] },
  { county: e[1], district: c[14], zipcode: t[17] },
  { county: e[1], district: c[15], zipcode: t[18] },
  { county: e[2], district: c[16], zipcode: t[19] },
  { county: e[2], district: c[17], zipcode: t[20] },
  { county: e[2], district: c[18], zipcode: t[21] },
  { county: e[2], district: c[19], zipcode: t[22] },
  { county: e[2], district: c[20], zipcode: t[23] },
  { county: e[2], district: c[21], zipcode: t[24] },
  { county: e[2], district: c[22], zipcode: t[25] },
  { county: e[2], district: c[23], zipcode: t[26] },
  { county: e[2], district: c[24], zipcode: t[27] },
  { county: e[2], district: c[25], zipcode: t[28] },
  { county: e[2], district: c[26], zipcode: t[29] },
  { county: e[2], district: c[27], zipcode: t[30] },
  { county: e[2], district: c[28], zipcode: t[31] },
  { county: e[2], district: c[29], zipcode: t[32] },
  { county: e[2], district: c[30], zipcode: t[33] },
  { county: e[2], district: c[31], zipcode: t[34] },
  { county: e[2], district: c[32], zipcode: t[35] },
  { county: e[2], district: c[33], zipcode: t[36] },
  { county: e[2], district: c[34], zipcode: t[37] },
  { county: e[2], district: c[35], zipcode: t[38] },
  { county: e[2], district: c[36], zipcode: t[39] },
  { county: e[2], district: c[37], zipcode: t[40] },
  { county: e[2], district: c[38], zipcode: t[41] },
  { county: e[2], district: c[39], zipcode: t[42] },
  { county: e[2], district: c[40], zipcode: t[43] },
  { county: e[2], district: c[41], zipcode: t[44] },
  { county: e[2], district: c[42], zipcode: t[45] },
  { county: e[2], district: c[43], zipcode: t[46] },
  { county: e[2], district: c[44], zipcode: t[47] },
  { county: e[3], district: c[45], zipcode: t[48] },
  { county: e[3], district: c[46], zipcode: t[49] },
  { county: e[3], district: c[47], zipcode: t[50] },
  { county: e[3], district: c[48], zipcode: t[51] },
  { county: e[3], district: c[49], zipcode: t[52] },
  { county: e[3], district: c[50], zipcode: t[53] },
  { county: e[3], district: c[51], zipcode: t[54] },
  { county: e[3], district: c[52], zipcode: t[55] },
  { county: e[3], district: c[53], zipcode: t[56] },
  { county: e[3], district: c[54], zipcode: t[57] },
  { county: e[3], district: c[55], zipcode: t[58] },
  { county: e[3], district: c[56], zipcode: t[59] },
  { county: e[3], district: c[57], zipcode: t[60] },
  { county: e[4], district: c[58], zipcode: t[61] },
  { county: e[4], district: c[59], zipcode: t[61] },
  { county: e[4], district: c[60], zipcode: t[61] },
  { county: e[5], district: c[61], zipcode: t[62] },
  { county: e[5], district: c[62], zipcode: t[63] },
  { county: e[5], district: c[63], zipcode: t[64] },
  { county: e[5], district: c[64], zipcode: t[65] },
  { county: e[5], district: c[65], zipcode: t[66] },
  { county: e[5], district: c[66], zipcode: t[67] },
  { county: e[5], district: c[67], zipcode: t[68] },
  { county: e[5], district: c[68], zipcode: t[69] },
  { county: e[5], district: c[69], zipcode: t[70] },
  { county: e[5], district: c[70], zipcode: t[71] },
  { county: e[5], district: c[71], zipcode: t[72] },
  { county: e[5], district: c[72], zipcode: t[73] },
  { county: e[5], district: c[73], zipcode: t[74] },
  { county: e[6], district: c[74], zipcode: t[75] },
  { county: e[6], district: c[75], zipcode: t[76] },
  { county: e[6], district: c[76], zipcode: t[77] },
  { county: e[6], district: c[77], zipcode: t[78] },
  { county: e[6], district: c[78], zipcode: t[79] },
  { county: e[6], district: c[79], zipcode: t[80] },
  { county: e[6], district: c[80], zipcode: t[81] },
  { county: e[6], district: c[81], zipcode: t[82] },
  { county: e[6], district: c[82], zipcode: t[83] },
  { county: e[6], district: c[83], zipcode: t[84] },
  { county: e[6], district: c[84], zipcode: t[85] },
  { county: e[6], district: c[85], zipcode: t[86] },
  { county: e[6], district: c[86], zipcode: t[87] },
  { county: e[7], district: c[87], zipcode: t[88] },
  { county: e[7], district: c[88], zipcode: t[89] },
  { county: e[7], district: c[89], zipcode: t[90] },
  { county: e[7], district: c[90], zipcode: t[91] },
  { county: e[7], district: c[91], zipcode: t[92] },
  { county: e[7], district: c[92], zipcode: t[93] },
  { county: e[7], district: c[93], zipcode: t[94] },
  { county: e[7], district: c[94], zipcode: t[95] },
  { county: e[7], district: c[95], zipcode: t[96] },
  { county: e[7], district: c[96], zipcode: t[97] },
  { county: e[7], district: c[97], zipcode: t[98] },
  { county: e[7], district: c[98], zipcode: t[99] },
  { county: e[7], district: c[99], zipcode: t[100] },
  { county: e[7], district: c[100], zipcode: t[101] },
  { county: e[7], district: c[101], zipcode: t[102] },
  { county: e[7], district: c[102], zipcode: t[103] },
  { county: e[7], district: c[103], zipcode: t[104] },
  { county: e[7], district: c[104], zipcode: t[105] },
  { county: e[8], district: c[105], zipcode: t[106] },
  { county: e[8], district: c[58], zipcode: t[107] },
  { county: e[8], district: c[106], zipcode: t[108] },
  { county: e[8], district: c[107], zipcode: t[109] },
  { county: e[8], district: c[59], zipcode: t[110] },
  { county: e[8], district: c[108], zipcode: t[111] },
  { county: e[8], district: c[109], zipcode: t[112] },
  { county: e[8], district: c[110], zipcode: t[113] },
  { county: e[8], district: c[111], zipcode: t[114] },
  { county: e[8], district: c[112], zipcode: t[115] },
  { county: e[8], district: c[113], zipcode: t[116] },
  { county: e[8], district: c[114], zipcode: t[117] },
  { county: e[8], district: c[115], zipcode: t[118] },
  { county: e[8], district: c[116], zipcode: t[119] },
  { county: e[8], district: c[117], zipcode: t[120] },
  { county: e[8], district: c[118], zipcode: t[121] },
  { county: e[8], district: c[119], zipcode: t[122] },
  { county: e[8], district: c[120], zipcode: t[123] },
  { county: e[8], district: c[121], zipcode: t[124] },
  { county: e[8], district: c[122], zipcode: t[125] },
  { county: e[8], district: c[123], zipcode: t[126] },
  { county: e[8], district: c[124], zipcode: t[127] },
  { county: e[8], district: c[125], zipcode: t[128] },
  { county: e[8], district: c[126], zipcode: t[129] },
  { county: e[8], district: c[127], zipcode: t[130] },
  { county: e[8], district: c[128], zipcode: t[131] },
  { county: e[8], district: c[129], zipcode: t[132] },
  { county: e[8], district: c[130], zipcode: t[133] },
  { county: e[8], district: c[4], zipcode: t[134] },
  { county: e[9], district: c[131], zipcode: t[135] },
  { county: e[9], district: c[132], zipcode: t[136] },
  { county: e[9], district: c[133], zipcode: t[137] },
  { county: e[9], district: c[134], zipcode: t[138] },
  { county: e[9], district: c[135], zipcode: t[139] },
  { county: e[9], district: c[136], zipcode: t[140] },
  { county: e[9], district: c[137], zipcode: t[141] },
  { county: e[9], district: c[138], zipcode: t[142] },
  { county: e[9], district: c[139], zipcode: t[143] },
  { county: e[9], district: c[140], zipcode: t[144] },
  { county: e[9], district: c[141], zipcode: t[145] },
  { county: e[9], district: c[142], zipcode: t[146] },
  { county: e[9], district: c[143], zipcode: t[147] },
  { county: e[9], district: c[103], zipcode: t[148] },
  { county: e[9], district: c[144], zipcode: t[149] },
  { county: e[9], district: c[145], zipcode: t[150] },
  { county: e[9], district: c[146], zipcode: t[151] },
  { county: e[9], district: c[147], zipcode: t[152] },
  { county: e[9], district: c[148], zipcode: t[153] },
  { county: e[9], district: c[149], zipcode: t[154] },
  { county: e[9], district: c[150], zipcode: t[155] },
  { county: e[9], district: c[151], zipcode: t[156] },
  { county: e[9], district: c[152], zipcode: t[157] },
  { county: e[9], district: c[153], zipcode: t[158] },
  { county: e[9], district: c[154], zipcode: t[159] },
  { county: e[9], district: c[155], zipcode: t[160] },
  { county: e[10], district: c[156], zipcode: t[161] },
  { county: e[10], district: c[157], zipcode: t[162] },
  { county: e[10], district: c[158], zipcode: t[163] },
  { county: e[10], district: c[159], zipcode: t[164] },
  { county: e[10], district: c[160], zipcode: t[165] },
  { county: e[10], district: c[161], zipcode: t[166] },
  { county: e[10], district: c[162], zipcode: t[167] },
  { county: e[10], district: c[163], zipcode: t[168] },
  { county: e[10], district: c[164], zipcode: t[169] },
  { county: e[10], district: c[165], zipcode: t[170] },
  { county: e[10], district: c[166], zipcode: t[171] },
  { county: e[10], district: c[167], zipcode: t[172] },
  { county: e[10], district: c[168], zipcode: t[173] },
  { county: e[11], district: c[58], zipcode: t[174] },
  { county: e[11], district: c[107], zipcode: t[174] },
  { county: e[12], district: c[169], zipcode: t[175] },
  { county: e[12], district: c[170], zipcode: t[176] },
  { county: e[12], district: c[171], zipcode: t[177] },
  { county: e[12], district: c[172], zipcode: t[178] },
  { county: e[12], district: c[173], zipcode: t[179] },
  { county: e[12], district: c[174], zipcode: t[180] },
  { county: e[12], district: c[175], zipcode: t[181] },
  { county: e[12], district: c[176], zipcode: t[182] },
  { county: e[12], district: c[177], zipcode: t[183] },
  { county: e[12], district: c[178], zipcode: t[184] },
  { county: e[12], district: c[179], zipcode: t[185] },
  { county: e[12], district: c[180], zipcode: t[186] },
  { county: e[12], district: c[181], zipcode: t[187] },
  { county: e[12], district: c[182], zipcode: t[188] },
  { county: e[12], district: c[183], zipcode: t[189] },
  { county: e[12], district: c[184], zipcode: t[190] },
  { county: e[12], district: c[185], zipcode: t[191] },
  { county: e[12], district: c[186], zipcode: t[192] },
  { county: e[13], district: c[187], zipcode: t[193] },
  { county: e[13], district: c[188], zipcode: t[194] },
  { county: e[13], district: c[189], zipcode: t[195] },
  { county: e[13], district: c[190], zipcode: t[196] },
  { county: e[13], district: c[191], zipcode: t[197] },
  { county: e[13], district: c[179], zipcode: t[198] },
  { county: e[13], district: c[192], zipcode: t[199] },
  { county: e[13], district: c[193], zipcode: t[200] },
  { county: e[13], district: c[194], zipcode: t[201] },
  { county: e[13], district: c[195], zipcode: t[202] },
  { county: e[13], district: c[196], zipcode: t[203] },
  { county: e[13], district: c[197], zipcode: t[204] },
  { county: e[13], district: c[198], zipcode: t[205] },
  { county: e[13], district: c[199], zipcode: t[206] },
  { county: e[13], district: c[200], zipcode: t[207] },
  { county: e[13], district: c[201], zipcode: t[208] },
  { county: e[13], district: c[202], zipcode: t[209] },
  { county: e[13], district: c[203], zipcode: t[210] },
  { county: e[13], district: c[204], zipcode: t[211] },
  { county: e[13], district: c[205], zipcode: t[212] },
  { county: e[14], district: c[206], zipcode: t[213] },
  { county: e[14], district: c[58], zipcode: t[214] },
  { county: e[14], district: c[106], zipcode: t[215] },
  { county: e[14], district: c[59], zipcode: t[216] },
  { county: e[14], district: c[207], zipcode: t[217] },
  { county: e[14], district: c[208], zipcode: t[218] },
  { county: e[14], district: c[209], zipcode: t[219] },
  { county: e[14], district: c[210], zipcode: t[220] },
  { county: e[14], district: c[211], zipcode: t[221] },
  { county: e[14], district: c[212], zipcode: t[222] },
  { county: e[14], district: c[213], zipcode: t[223] },
  { county: e[14], district: c[214], zipcode: t[224] },
  { county: e[14], district: c[215], zipcode: t[225] },
  { county: e[14], district: c[216], zipcode: t[226] },
  { county: e[14], district: c[217], zipcode: t[227] },
  { county: e[14], district: c[218], zipcode: t[228] },
  { county: e[14], district: c[219], zipcode: t[229] },
  { county: e[14], district: c[220], zipcode: t[230] },
  { county: e[14], district: c[221], zipcode: t[231] },
  { county: e[14], district: c[222], zipcode: t[232] },
  { county: e[14], district: c[223], zipcode: t[233] },
  { county: e[14], district: c[224], zipcode: t[234] },
  { county: e[14], district: c[225], zipcode: t[235] },
  { county: e[14], district: c[226], zipcode: t[236] },
  { county: e[14], district: c[227], zipcode: t[237] },
  { county: e[14], district: c[228], zipcode: t[238] },
  { county: e[14], district: c[229], zipcode: t[239] },
  { county: e[14], district: c[230], zipcode: t[240] },
  { county: e[14], district: c[231], zipcode: t[241] },
  { county: e[14], district: c[232], zipcode: t[242] },
  { county: e[14], district: c[233], zipcode: t[243] },
  { county: e[14], district: c[234], zipcode: t[244] },
  { county: e[14], district: c[235], zipcode: t[245] },
  { county: e[14], district: c[236], zipcode: t[246] },
  { county: e[14], district: c[237], zipcode: t[247] },
  { county: e[14], district: c[238], zipcode: t[248] },
  { county: e[14], district: c[239], zipcode: t[249] },
  { county: e[15], district: c[240], zipcode: t[250] },
  { county: e[15], district: c[241], zipcode: t[251] },
  { county: e[15], district: c[242], zipcode: t[252] },
  { county: e[15], district: c[243], zipcode: t[253] },
  { county: e[15], district: c[244], zipcode: t[254] },
  { county: e[15], district: c[245], zipcode: t[255] },
  { county: e[15], district: c[246], zipcode: t[256] },
  { county: e[15], district: c[247], zipcode: t[257] },
  { county: e[15], district: c[248], zipcode: t[258] },
  { county: e[15], district: c[249], zipcode: t[259] },
  { county: e[15], district: c[250], zipcode: t[260] },
  { county: e[15], district: c[251], zipcode: t[261] },
  { county: e[15], district: c[252], zipcode: t[262] },
  { county: e[15], district: c[253], zipcode: t[263] },
  { county: e[15], district: c[86], zipcode: t[264] },
  { county: e[15], district: c[254], zipcode: t[265] },
  { county: e[15], district: c[255], zipcode: t[266] },
  { county: e[15], district: c[256], zipcode: t[267] },
  { county: e[15], district: c[257], zipcode: t[268] },
  { county: e[15], district: c[258], zipcode: t[269] },
  { county: e[15], district: c[259], zipcode: t[270] },
  { county: e[15], district: c[260], zipcode: t[271] },
  { county: e[15], district: c[261], zipcode: t[272] },
  { county: e[15], district: c[262], zipcode: t[273] },
  { county: e[15], district: c[263], zipcode: t[274] },
  { county: e[15], district: c[264], zipcode: t[275] },
  { county: e[15], district: c[265], zipcode: t[276] },
  { county: e[15], district: c[266], zipcode: t[277] },
  { county: e[15], district: c[267], zipcode: t[278] },
  { county: e[15], district: c[268], zipcode: t[279] },
  { county: e[15], district: c[269], zipcode: t[280] },
  { county: e[15], district: c[270], zipcode: t[281] },
  { county: e[15], district: c[271], zipcode: t[282] },
  { county: e[15], district: c[272], zipcode: t[283] },
  { county: e[15], district: c[80], zipcode: t[284] },
  { county: e[15], district: c[273], zipcode: t[285] },
  { county: e[15], district: c[274], zipcode: t[286] },
  { county: e[15], district: c[275], zipcode: t[287] },
  { county: e[15], district: c[276], zipcode: t[288] },
  { county: e[15], district: c[277], zipcode: t[289] },
  { county: e[16], district: c[278], zipcode: t[290] },
  { county: e[16], district: c[279], zipcode: t[291] },
  { county: e[16], district: c[280], zipcode: t[292] },
  { county: e[16], district: c[281], zipcode: t[293] },
  { county: e[16], district: c[282], zipcode: t[294] },
  { county: e[16], district: c[283], zipcode: t[295] },
  { county: e[17], district: c[284], zipcode: t[296] },
  { county: e[17], district: c[285], zipcode: t[297] },
  { county: e[17], district: c[286], zipcode: t[298] },
  { county: e[17], district: c[287], zipcode: t[299] },
  { county: e[17], district: c[288], zipcode: t[300] },
  { county: e[17], district: c[289], zipcode: t[301] },
  { county: e[17], district: c[290], zipcode: t[302] },
  { county: e[17], district: c[291], zipcode: t[303] },
  { county: e[17], district: c[292], zipcode: t[304] },
  { county: e[17], district: c[293], zipcode: t[305] },
  { county: e[17], district: c[294], zipcode: t[306] },
  { county: e[17], district: c[295], zipcode: t[307] },
  { county: e[17], district: c[296], zipcode: t[308] },
  { county: e[17], district: c[297], zipcode: t[309] },
  { county: e[17], district: c[298], zipcode: t[310] },
  { county: e[17], district: c[299], zipcode: t[311] },
  { county: e[17], district: c[300], zipcode: t[312] },
  { county: e[17], district: c[301], zipcode: t[313] },
  { county: e[17], district: c[302], zipcode: t[314] },
  { county: e[17], district: c[303], zipcode: t[315] },
  { county: e[17], district: c[304], zipcode: t[316] },
  { county: e[17], district: c[305], zipcode: t[317] },
  { county: e[17], district: c[306], zipcode: t[318] },
  { county: e[17], district: c[307], zipcode: t[319] },
  { county: e[17], district: c[308], zipcode: t[320] },
  { county: e[17], district: c[309], zipcode: t[321] },
  { county: e[17], district: c[310], zipcode: t[322] },
  { county: e[17], district: c[311], zipcode: t[323] },
  { county: e[17], district: c[312], zipcode: t[324] },
  { county: e[17], district: c[313], zipcode: t[325] },
  { county: e[17], district: c[314], zipcode: t[326] },
  { county: e[17], district: c[315], zipcode: t[327] },
  { county: e[17], district: c[316], zipcode: t[328] },
  { county: e[18], district: c[317], zipcode: t[329] },
  { county: e[18], district: c[318], zipcode: t[330] },
  { county: e[18], district: c[319], zipcode: t[331] },
  { county: e[18], district: c[320], zipcode: t[332] },
  { county: e[18], district: c[321], zipcode: t[333] },
  { county: e[18], district: c[322], zipcode: t[334] },
  { county: e[18], district: c[323], zipcode: t[335] },
  { county: e[18], district: c[324], zipcode: t[336] },
  { county: e[18], district: c[325], zipcode: t[337] },
  { county: e[18], district: c[326], zipcode: t[338] },
  { county: e[18], district: c[327], zipcode: t[339] },
  { county: e[18], district: c[328], zipcode: t[340] },
  { county: e[18], district: c[329], zipcode: t[341] },
  { county: e[18], district: c[330], zipcode: t[342] },
  { county: e[18], district: c[331], zipcode: t[343] },
  { county: e[18], district: c[332], zipcode: t[344] },
  { county: e[19], district: c[333], zipcode: t[345] },
  { county: e[19], district: c[334], zipcode: t[346] },
  { county: e[19], district: c[335], zipcode: t[347] },
  { county: e[19], district: c[336], zipcode: t[348] },
  { county: e[19], district: c[337], zipcode: t[349] },
  { county: e[19], district: c[338], zipcode: t[350] },
  { county: e[19], district: c[339], zipcode: t[351] },
  { county: e[19], district: c[340], zipcode: t[352] },
  { county: e[19], district: c[341], zipcode: t[353] },
  { county: e[19], district: c[342], zipcode: t[354] },
  { county: e[19], district: c[343], zipcode: t[355] },
  { county: e[19], district: c[344], zipcode: t[356] },
  { county: e[19], district: c[345], zipcode: t[357] },
  { county: e[20], district: c[346], zipcode: t[358] },
  { county: e[20], district: c[347], zipcode: t[359] },
  { county: e[20], district: c[348], zipcode: t[360] },
  { county: e[20], district: c[349], zipcode: t[361] },
  { county: e[20], district: c[350], zipcode: t[362] },
  { county: e[20], district: c[351], zipcode: t[363] },
  { county: e[21], district: c[352], zipcode: t[364] },
  { county: e[21], district: c[353], zipcode: t[365] },
  { county: e[21], district: c[354], zipcode: t[366] },
  { county: e[21], district: c[355], zipcode: t[367] }
], _t = [
  { county: o[0], district: i[0], zipcode: t[0] },
  { county: o[0], district: i[1], zipcode: t[1] },
  { county: o[0], district: i[2], zipcode: t[2] },
  { county: o[0], district: i[3], zipcode: t[3] },
  { county: o[0], district: i[4], zipcode: t[4] },
  { county: o[0], district: i[5], zipcode: t[5] },
  { county: o[0], district: i[6], zipcode: t[6] },
  { county: o[0], district: i[7], zipcode: t[7] },
  { county: o[0], district: i[8], zipcode: t[8] },
  { county: o[0], district: i[9], zipcode: t[9] },
  { county: o[0], district: i[10], zipcode: t[10] },
  { county: o[0], district: i[11], zipcode: t[11] },
  { county: o[1], district: i[12], zipcode: t[12] },
  { county: o[1], district: i[6], zipcode: t[13] },
  { county: o[1], district: i[0], zipcode: t[14] },
  { county: o[1], district: i[2], zipcode: t[15] },
  { county: o[1], district: i[13], zipcode: t[16] },
  { county: o[1], district: i[14], zipcode: t[17] },
  { county: o[1], district: i[15], zipcode: t[18] },
  { county: o[2], district: i[16], zipcode: t[19] },
  { county: o[2], district: i[17], zipcode: t[20] },
  { county: o[2], district: i[18], zipcode: t[21] },
  { county: o[2], district: i[19], zipcode: t[22] },
  { county: o[2], district: i[20], zipcode: t[23] },
  { county: o[2], district: i[21], zipcode: t[24] },
  { county: o[2], district: i[22], zipcode: t[25] },
  { county: o[2], district: i[23], zipcode: t[26] },
  { county: o[2], district: i[24], zipcode: t[27] },
  { county: o[2], district: i[25], zipcode: t[28] },
  { county: o[2], district: i[26], zipcode: t[29] },
  { county: o[2], district: i[27], zipcode: t[30] },
  { county: o[2], district: i[28], zipcode: t[31] },
  { county: o[2], district: i[29], zipcode: t[32] },
  { county: o[2], district: i[30], zipcode: t[33] },
  { county: o[2], district: i[31], zipcode: t[34] },
  { county: o[2], district: i[32], zipcode: t[35] },
  { county: o[2], district: i[33], zipcode: t[36] },
  { county: o[2], district: i[34], zipcode: t[37] },
  { county: o[2], district: i[35], zipcode: t[38] },
  { county: o[2], district: i[36], zipcode: t[39] },
  { county: o[2], district: i[37], zipcode: t[40] },
  { county: o[2], district: i[38], zipcode: t[41] },
  { county: o[2], district: i[39], zipcode: t[42] },
  { county: o[2], district: i[40], zipcode: t[43] },
  { county: o[2], district: i[41], zipcode: t[44] },
  { county: o[2], district: i[42], zipcode: t[45] },
  { county: o[2], district: i[43], zipcode: t[46] },
  { county: o[2], district: i[44], zipcode: t[47] },
  { county: o[3], district: i[45], zipcode: t[48] },
  { county: o[3], district: i[46], zipcode: t[49] },
  { county: o[3], district: i[47], zipcode: t[50] },
  { county: o[3], district: i[48], zipcode: t[51] },
  { county: o[3], district: i[49], zipcode: t[52] },
  { county: o[3], district: i[50], zipcode: t[53] },
  { county: o[3], district: i[51], zipcode: t[54] },
  { county: o[3], district: i[52], zipcode: t[55] },
  { county: o[3], district: i[53], zipcode: t[56] },
  { county: o[3], district: i[54], zipcode: t[57] },
  { county: o[3], district: i[55], zipcode: t[58] },
  { county: o[3], district: i[56], zipcode: t[59] },
  { county: o[3], district: i[57], zipcode: t[60] },
  { county: o[4], district: i[58], zipcode: t[61] },
  { county: o[4], district: i[59], zipcode: t[61] },
  { county: o[4], district: i[60], zipcode: t[61] },
  { county: o[5], district: i[61], zipcode: t[62] },
  { county: o[5], district: i[62], zipcode: t[63] },
  { county: o[5], district: i[63], zipcode: t[64] },
  { county: o[5], district: i[64], zipcode: t[65] },
  { county: o[5], district: i[65], zipcode: t[66] },
  { county: o[5], district: i[66], zipcode: t[67] },
  { county: o[5], district: i[67], zipcode: t[68] },
  { county: o[5], district: i[68], zipcode: t[69] },
  { county: o[5], district: i[69], zipcode: t[70] },
  { county: o[5], district: i[70], zipcode: t[71] },
  { county: o[5], district: i[71], zipcode: t[72] },
  { county: o[5], district: i[72], zipcode: t[73] },
  { county: o[5], district: i[73], zipcode: t[74] },
  { county: o[6], district: i[74], zipcode: t[75] },
  { county: o[6], district: i[75], zipcode: t[76] },
  { county: o[6], district: i[76], zipcode: t[77] },
  { county: o[6], district: i[77], zipcode: t[78] },
  { county: o[6], district: i[78], zipcode: t[79] },
  { county: o[6], district: i[79], zipcode: t[80] },
  { county: o[6], district: i[80], zipcode: t[81] },
  { county: o[6], district: i[81], zipcode: t[82] },
  { county: o[6], district: i[82], zipcode: t[83] },
  { county: o[6], district: i[83], zipcode: t[84] },
  { county: o[6], district: i[84], zipcode: t[85] },
  { county: o[6], district: i[85], zipcode: t[86] },
  { county: o[6], district: i[86], zipcode: t[87] },
  { county: o[7], district: i[87], zipcode: t[88] },
  { county: o[7], district: i[88], zipcode: t[89] },
  { county: o[7], district: i[89], zipcode: t[90] },
  { county: o[7], district: i[90], zipcode: t[91] },
  { county: o[7], district: i[91], zipcode: t[92] },
  { county: o[7], district: i[92], zipcode: t[93] },
  { county: o[7], district: i[93], zipcode: t[94] },
  { county: o[7], district: i[94], zipcode: t[95] },
  { county: o[7], district: i[95], zipcode: t[96] },
  { county: o[7], district: i[96], zipcode: t[97] },
  { county: o[7], district: i[97], zipcode: t[98] },
  { county: o[7], district: i[98], zipcode: t[99] },
  { county: o[7], district: i[99], zipcode: t[100] },
  { county: o[7], district: i[100], zipcode: t[101] },
  { county: o[7], district: i[101], zipcode: t[102] },
  { county: o[7], district: i[102], zipcode: t[103] },
  { county: o[7], district: i[103], zipcode: t[104] },
  { county: o[7], district: i[104], zipcode: t[105] },
  { county: o[8], district: i[105], zipcode: t[106] },
  { county: o[8], district: i[58], zipcode: t[107] },
  { county: o[8], district: i[106], zipcode: t[108] },
  { county: o[8], district: i[107], zipcode: t[109] },
  { county: o[8], district: i[59], zipcode: t[110] },
  { county: o[8], district: i[108], zipcode: t[111] },
  { county: o[8], district: i[109], zipcode: t[112] },
  { county: o[8], district: i[110], zipcode: t[113] },
  { county: o[8], district: i[111], zipcode: t[114] },
  { county: o[8], district: i[112], zipcode: t[115] },
  { county: o[8], district: i[113], zipcode: t[116] },
  { county: o[8], district: i[114], zipcode: t[117] },
  { county: o[8], district: i[115], zipcode: t[118] },
  { county: o[8], district: i[116], zipcode: t[119] },
  { county: o[8], district: i[117], zipcode: t[120] },
  { county: o[8], district: i[118], zipcode: t[121] },
  { county: o[8], district: i[119], zipcode: t[122] },
  { county: o[8], district: i[120], zipcode: t[123] },
  { county: o[8], district: i[121], zipcode: t[124] },
  { county: o[8], district: i[122], zipcode: t[125] },
  { county: o[8], district: i[123], zipcode: t[126] },
  { county: o[8], district: i[124], zipcode: t[127] },
  { county: o[8], district: i[125], zipcode: t[128] },
  { county: o[8], district: i[126], zipcode: t[129] },
  { county: o[8], district: i[127], zipcode: t[130] },
  { county: o[8], district: i[128], zipcode: t[131] },
  { county: o[8], district: i[129], zipcode: t[132] },
  { county: o[8], district: i[130], zipcode: t[133] },
  { county: o[8], district: i[4], zipcode: t[134] },
  { county: o[9], district: i[131], zipcode: t[135] },
  { county: o[9], district: i[132], zipcode: t[136] },
  { county: o[9], district: i[133], zipcode: t[137] },
  { county: o[9], district: i[134], zipcode: t[138] },
  { county: o[9], district: i[135], zipcode: t[139] },
  { county: o[9], district: i[136], zipcode: t[140] },
  { county: o[9], district: i[137], zipcode: t[141] },
  { county: o[9], district: i[138], zipcode: t[142] },
  { county: o[9], district: i[139], zipcode: t[143] },
  { county: o[9], district: i[140], zipcode: t[144] },
  { county: o[9], district: i[141], zipcode: t[145] },
  { county: o[9], district: i[142], zipcode: t[146] },
  { county: o[9], district: i[143], zipcode: t[147] },
  { county: o[9], district: i[144], zipcode: t[148] },
  { county: o[9], district: i[145], zipcode: t[149] },
  { county: o[9], district: i[146], zipcode: t[150] },
  { county: o[9], district: i[147], zipcode: t[151] },
  { county: o[9], district: i[148], zipcode: t[152] },
  { county: o[9], district: i[149], zipcode: t[153] },
  { county: o[9], district: i[150], zipcode: t[154] },
  { county: o[9], district: i[151], zipcode: t[155] },
  { county: o[9], district: i[152], zipcode: t[156] },
  { county: o[9], district: i[153], zipcode: t[157] },
  { county: o[9], district: i[154], zipcode: t[158] },
  { county: o[9], district: i[155], zipcode: t[159] },
  { county: o[9], district: i[156], zipcode: t[160] },
  { county: o[10], district: i[157], zipcode: t[161] },
  { county: o[10], district: i[158], zipcode: t[162] },
  { county: o[10], district: i[159], zipcode: t[163] },
  { county: o[10], district: i[160], zipcode: t[164] },
  { county: o[10], district: i[161], zipcode: t[165] },
  { county: o[10], district: i[162], zipcode: t[166] },
  { county: o[10], district: i[163], zipcode: t[167] },
  { county: o[10], district: i[164], zipcode: t[168] },
  { county: o[10], district: i[165], zipcode: t[169] },
  { county: o[10], district: i[166], zipcode: t[170] },
  { county: o[10], district: i[167], zipcode: t[171] },
  { county: o[10], district: i[168], zipcode: t[172] },
  { county: o[10], district: i[169], zipcode: t[173] },
  { county: o[11], district: i[58], zipcode: t[174] },
  { county: o[11], district: i[107], zipcode: t[174] },
  { county: o[12], district: i[170], zipcode: t[175] },
  { county: o[12], district: i[171], zipcode: t[176] },
  { county: o[12], district: i[172], zipcode: t[177] },
  { county: o[12], district: i[173], zipcode: t[178] },
  { county: o[12], district: i[174], zipcode: t[179] },
  { county: o[12], district: i[175], zipcode: t[180] },
  { county: o[12], district: i[176], zipcode: t[181] },
  { county: o[12], district: i[177], zipcode: t[182] },
  { county: o[12], district: i[178], zipcode: t[183] },
  { county: o[12], district: i[179], zipcode: t[184] },
  { county: o[12], district: i[180], zipcode: t[185] },
  { county: o[12], district: i[181], zipcode: t[186] },
  { county: o[12], district: i[182], zipcode: t[187] },
  { county: o[12], district: i[183], zipcode: t[188] },
  { county: o[12], district: i[184], zipcode: t[189] },
  { county: o[12], district: i[185], zipcode: t[190] },
  { county: o[12], district: i[186], zipcode: t[191] },
  { county: o[12], district: i[187], zipcode: t[192] },
  { county: o[13], district: i[188], zipcode: t[193] },
  { county: o[13], district: i[189], zipcode: t[194] },
  { county: o[13], district: i[190], zipcode: t[195] },
  { county: o[13], district: i[191], zipcode: t[196] },
  { county: o[13], district: i[192], zipcode: t[197] },
  { county: o[13], district: i[193], zipcode: t[198] },
  { county: o[13], district: i[194], zipcode: t[199] },
  { county: o[13], district: i[195], zipcode: t[200] },
  { county: o[13], district: i[196], zipcode: t[201] },
  { county: o[13], district: i[197], zipcode: t[202] },
  { county: o[13], district: i[198], zipcode: t[203] },
  { county: o[13], district: i[199], zipcode: t[204] },
  { county: o[13], district: i[200], zipcode: t[205] },
  { county: o[13], district: i[201], zipcode: t[206] },
  { county: o[13], district: i[202], zipcode: t[207] },
  { county: o[13], district: i[203], zipcode: t[208] },
  { county: o[13], district: i[204], zipcode: t[209] },
  { county: o[13], district: i[205], zipcode: t[210] },
  { county: o[13], district: i[206], zipcode: t[211] },
  { county: o[13], district: i[207], zipcode: t[212] },
  { county: o[14], district: i[208], zipcode: t[213] },
  { county: o[14], district: i[58], zipcode: t[214] },
  { county: o[14], district: i[106], zipcode: t[215] },
  { county: o[14], district: i[59], zipcode: t[216] },
  { county: o[14], district: i[209], zipcode: t[217] },
  { county: o[14], district: i[210], zipcode: t[218] },
  { county: o[14], district: i[211], zipcode: t[219] },
  { county: o[14], district: i[212], zipcode: t[220] },
  { county: o[14], district: i[213], zipcode: t[221] },
  { county: o[14], district: i[214], zipcode: t[222] },
  { county: o[14], district: i[215], zipcode: t[223] },
  { county: o[14], district: i[216], zipcode: t[224] },
  { county: o[14], district: i[217], zipcode: t[225] },
  { county: o[14], district: i[218], zipcode: t[226] },
  { county: o[14], district: i[219], zipcode: t[227] },
  { county: o[14], district: i[220], zipcode: t[228] },
  { county: o[14], district: i[221], zipcode: t[229] },
  { county: o[14], district: i[222], zipcode: t[230] },
  { county: o[14], district: i[223], zipcode: t[231] },
  { county: o[14], district: i[224], zipcode: t[232] },
  { county: o[14], district: i[225], zipcode: t[233] },
  { county: o[14], district: i[226], zipcode: t[234] },
  { county: o[14], district: i[227], zipcode: t[235] },
  { county: o[14], district: i[228], zipcode: t[236] },
  { county: o[14], district: i[229], zipcode: t[237] },
  { county: o[14], district: i[230], zipcode: t[238] },
  { county: o[14], district: i[231], zipcode: t[239] },
  { county: o[14], district: i[232], zipcode: t[240] },
  { county: o[14], district: i[233], zipcode: t[241] },
  { county: o[14], district: i[234], zipcode: t[242] },
  { county: o[14], district: i[235], zipcode: t[243] },
  { county: o[14], district: i[236], zipcode: t[244] },
  { county: o[14], district: i[237], zipcode: t[245] },
  { county: o[14], district: i[238], zipcode: t[246] },
  { county: o[14], district: i[239], zipcode: t[247] },
  { county: o[14], district: i[240], zipcode: t[248] },
  { county: o[14], district: i[241], zipcode: t[249] },
  { county: o[15], district: i[242], zipcode: t[250] },
  { county: o[15], district: i[243], zipcode: t[251] },
  { county: o[15], district: i[244], zipcode: t[252] },
  { county: o[15], district: i[245], zipcode: t[253] },
  { county: o[15], district: i[246], zipcode: t[254] },
  { county: o[15], district: i[247], zipcode: t[255] },
  { county: o[15], district: i[248], zipcode: t[256] },
  { county: o[15], district: i[249], zipcode: t[257] },
  { county: o[15], district: i[250], zipcode: t[258] },
  { county: o[15], district: i[251], zipcode: t[259] },
  { county: o[15], district: i[252], zipcode: t[260] },
  { county: o[15], district: i[253], zipcode: t[261] },
  { county: o[15], district: i[254], zipcode: t[262] },
  { county: o[15], district: i[255], zipcode: t[263] },
  { county: o[15], district: i[256], zipcode: t[264] },
  { county: o[15], district: i[257], zipcode: t[265] },
  { county: o[15], district: i[258], zipcode: t[266] },
  { county: o[15], district: i[259], zipcode: t[267] },
  { county: o[15], district: i[260], zipcode: t[268] },
  { county: o[15], district: i[261], zipcode: t[269] },
  { county: o[15], district: i[262], zipcode: t[270] },
  { county: o[15], district: i[263], zipcode: t[271] },
  { county: o[15], district: i[264], zipcode: t[272] },
  { county: o[15], district: i[265], zipcode: t[273] },
  { county: o[15], district: i[266], zipcode: t[274] },
  { county: o[15], district: i[267], zipcode: t[275] },
  { county: o[15], district: i[268], zipcode: t[276] },
  { county: o[15], district: i[269], zipcode: t[277] },
  { county: o[15], district: i[270], zipcode: t[278] },
  { county: o[15], district: i[271], zipcode: t[279] },
  { county: o[15], district: i[272], zipcode: t[280] },
  { county: o[15], district: i[273], zipcode: t[281] },
  { county: o[15], district: i[274], zipcode: t[282] },
  { county: o[15], district: i[275], zipcode: t[283] },
  { county: o[15], district: i[276], zipcode: t[284] },
  { county: o[15], district: i[277], zipcode: t[285] },
  { county: o[15], district: i[278], zipcode: t[286] },
  { county: o[15], district: i[279], zipcode: t[287] },
  { county: o[15], district: i[280], zipcode: t[288] },
  { county: o[15], district: i[281], zipcode: t[289] },
  { county: o[16], district: i[282], zipcode: t[290] },
  { county: o[16], district: i[283], zipcode: t[291] },
  { county: o[16], district: i[284], zipcode: t[292] },
  { county: o[16], district: i[285], zipcode: t[293] },
  { county: o[16], district: i[286], zipcode: t[294] },
  { county: o[16], district: i[287], zipcode: t[295] },
  { county: o[17], district: i[288], zipcode: t[296] },
  { county: o[17], district: i[289], zipcode: t[297] },
  { county: o[17], district: i[290], zipcode: t[298] },
  { county: o[17], district: i[291], zipcode: t[299] },
  { county: o[17], district: i[292], zipcode: t[300] },
  { county: o[17], district: i[293], zipcode: t[301] },
  { county: o[17], district: i[294], zipcode: t[302] },
  { county: o[17], district: i[295], zipcode: t[303] },
  { county: o[17], district: i[296], zipcode: t[304] },
  { county: o[17], district: i[297], zipcode: t[305] },
  { county: o[17], district: i[298], zipcode: t[306] },
  { county: o[17], district: i[299], zipcode: t[307] },
  { county: o[17], district: i[300], zipcode: t[308] },
  { county: o[17], district: i[301], zipcode: t[309] },
  { county: o[17], district: i[302], zipcode: t[310] },
  { county: o[17], district: i[303], zipcode: t[311] },
  { county: o[17], district: i[304], zipcode: t[312] },
  { county: o[17], district: i[305], zipcode: t[313] },
  { county: o[17], district: i[306], zipcode: t[314] },
  { county: o[17], district: i[307], zipcode: t[315] },
  { county: o[17], district: i[308], zipcode: t[316] },
  { county: o[17], district: i[309], zipcode: t[317] },
  { county: o[17], district: i[310], zipcode: t[318] },
  { county: o[17], district: i[311], zipcode: t[319] },
  { county: o[17], district: i[312], zipcode: t[320] },
  { county: o[17], district: i[313], zipcode: t[321] },
  { county: o[17], district: i[314], zipcode: t[322] },
  { county: o[17], district: i[315], zipcode: t[323] },
  { county: o[17], district: i[316], zipcode: t[324] },
  { county: o[17], district: i[317], zipcode: t[325] },
  { county: o[17], district: i[318], zipcode: t[326] },
  { county: o[17], district: i[319], zipcode: t[327] },
  { county: o[17], district: i[320], zipcode: t[328] },
  { county: o[18], district: i[321], zipcode: t[329] },
  { county: o[18], district: i[322], zipcode: t[330] },
  { county: o[18], district: i[323], zipcode: t[331] },
  { county: o[18], district: i[324], zipcode: t[332] },
  { county: o[18], district: i[325], zipcode: t[333] },
  { county: o[18], district: i[326], zipcode: t[334] },
  { county: o[18], district: i[327], zipcode: t[335] },
  { county: o[18], district: i[328], zipcode: t[336] },
  { county: o[18], district: i[329], zipcode: t[337] },
  { county: o[18], district: i[330], zipcode: t[338] },
  { county: o[18], district: i[331], zipcode: t[339] },
  { county: o[18], district: i[332], zipcode: t[340] },
  { county: o[18], district: i[333], zipcode: t[341] },
  { county: o[18], district: i[334], zipcode: t[342] },
  { county: o[18], district: i[335], zipcode: t[343] },
  { county: o[18], district: i[336], zipcode: t[344] },
  { county: o[19], district: i[337], zipcode: t[345] },
  { county: o[19], district: i[338], zipcode: t[346] },
  { county: o[19], district: i[339], zipcode: t[347] },
  { county: o[19], district: i[340], zipcode: t[348] },
  { county: o[19], district: i[341], zipcode: t[349] },
  { county: o[19], district: i[342], zipcode: t[350] },
  { county: o[19], district: i[343], zipcode: t[351] },
  { county: o[19], district: i[344], zipcode: t[352] },
  { county: o[19], district: i[345], zipcode: t[353] },
  { county: o[19], district: i[346], zipcode: t[354] },
  { county: o[19], district: i[347], zipcode: t[355] },
  { county: o[19], district: i[348], zipcode: t[356] },
  { county: o[19], district: i[349], zipcode: t[357] },
  { county: o[20], district: i[350], zipcode: t[358] },
  { county: o[20], district: i[351], zipcode: t[359] },
  { county: o[20], district: i[352], zipcode: t[360] },
  { county: o[20], district: i[353], zipcode: t[361] },
  { county: o[20], district: i[354], zipcode: t[362] },
  { county: o[20], district: i[355], zipcode: t[363] },
  { county: o[21], district: i[356], zipcode: t[364] },
  { county: o[21], district: i[357], zipcode: t[365] },
  { county: o[21], district: i[358], zipcode: t[366] },
  { county: o[21], district: i[359], zipcode: t[367] }
];
var ci = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, A = (d, s, n, r) => {
  for (var p = r > 1 ? void 0 : r ? oi(s, n) : s, u = d.length - 1, y; u >= 0; u--)
    (y = d[u]) && (p = (r ? y(s, n, p) : y(p)) || p);
  return r && p && ci(s, n, p), p;
};
let f = class extends b {
  constructor() {
    super(...arguments), this.lang = "zh-tw", this._data = _t, this.value = { zipcode: void 0, county: void 0, district: void 0 }, this._countyUpdateHandler = this._handleCountyUpdate.bind(this), this._districtUpdateHandler = this._handleDistrictUpdate.bind(this), this._zipcodeUpdateHandler = this._handleZipcodeUpdate.bind(this);
  }
  attributeChangedCallback(d, s, n) {
    s !== n && requestAnimationFrame(() => {
      switch (d) {
        case "lang":
          this._data = n !== "en" ? _t : ii, [this.$_zipcode, this.$_county, this.$_district].forEach((r) => {
            r && (r.lang = n);
          });
          break;
        case "default-values":
          this._writeDefaultValues(n);
          break;
        case "ignore-options":
          this._updateIgnoreOpts(n);
      }
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("update:zipcode", this._zipcodeUpdateHandler), this.addEventListener("update:county", this._countyUpdateHandler), this.addEventListener("update:district", this._districtUpdateHandler), this.hasChildNodes() || ["zipcode-field", "county-field", "district-field"].forEach((d) => {
      this.appendChild(document.createElement(d));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("update:zipcode", this._zipcodeUpdateHandler), this.removeEventListener("update:county", this._countyUpdateHandler), this.removeEventListener("update:district", this._districtUpdateHandler);
  }
  updated(d) {
    d.has("_data") && this.$_county?.reload(this.lang), d.has("value") && this._dispatch(this.value);
  }
  _writeDefaultValues(d) {
    const { zipcode: s, county: n, district: r } = this._parseJSON(d, {});
    this._data.some(({ zipcode: p, county: u, district: y }) => p === s && u === n && y === r) && (this.$_zipcode?.write(s), this.$_county?.select(n), requestAnimationFrame(() => this.$_district?.select(r)));
  }
  _updateIgnoreOpts(d) {
    const s = this._parseJSON(d, []), { c: n = [], d: r = [] } = Object.groupBy(s, (p) => typeof p == "string" ? "c" : "d");
    this.$_county?.ignore(n), this.$_district?.ignore(r);
  }
  _parseJSON(d, s) {
    try {
      return JSON.parse(d) ?? s;
    } catch (n) {
      return console.warn("Failed to parse JSON:", d, n), s;
    }
  }
  _handleZipcodeUpdate(d) {
    this._updateValue("zipcode", d);
  }
  _handleCountyUpdate(d) {
    const s = this._updateValue("county", d);
    this.$_district?.reload(this._data, s);
  }
  _handleDistrictUpdate(d) {
    const s = this._updateValue("district", d);
    this.$_zipcode?.findAndWrite(this._data, { county: this.value.county, district: s });
  }
  _updateValue(d, { detail: s }) {
    return this.value = { ...this.value, [d]: s.value }, s.value;
  }
  _dispatch(d) {
    if (Object.values(d).some((n) => !n)) {
      this.dispatchEvent(new CustomEvent("pending"));
      return;
    }
    this._data.some(({ zipcode: n, county: r, district: p }) => n === d.zipcode && r === d.county && p === d.district) && this.dispatchEvent(new CustomEvent("done", { detail: { value: d } }));
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return U``;
  }
};
A([
  $({ type: String })
], f.prototype, "lang", 2);
A([
  $({ type: Object, attribute: "default-values" })
], f.prototype, "defaultValues", 2);
A([
  $({ type: Array, attribute: "ignore-options" })
], f.prototype, "ignoreOptions", 2);
A([
  w()
], f.prototype, "_data", 2);
A([
  w()
], f.prototype, "value", 2);
A([
  Y("zipcode-field")
], f.prototype, "$_zipcode", 2);
A([
  Y("county-field")
], f.prototype, "$_county", 2);
A([
  Y("district-field")
], f.prototype, "$_district", 2);
f = A([
  V("twzipcode-fieldset")
], f);
var ei = Object.defineProperty, si = Object.getOwnPropertyDescriptor, j = (d, s, n, r) => {
  for (var p = r > 1 ? void 0 : r ? si(s, n) : s, u = d.length - 1, y; u >= 0; u--)
    (y = d[u]) && (p = (r ? y(s, n, p) : y(p)) || p);
  return r && p && ei(s, n, p), p;
};
let H = class extends b {
  constructor() {
    super(...arguments), this.classes = "", this.name = "zipcode", this.placeholder = "", this.lang = "zh-tw", this.value = "", this.tag = "zipcode";
  }
  updated(d) {
    d.has("value") && this.dispatchEvent(
      new CustomEvent("update:zipcode", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  findAndWrite(d, s) {
    const n = d.find(({ county: r, district: p }) => r === s.county && p === s.district)?.zipcode ?? "";
    this.write(n);
  }
  write(d) {
    this.value = d;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return U`
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
j([
  $({ type: String })
], H.prototype, "classes", 2);
j([
  $({ type: String })
], H.prototype, "name", 2);
j([
  $({ type: String })
], H.prototype, "placeholder", 2);
j([
  w()
], H.prototype, "lang", 2);
j([
  w()
], H.prototype, "value", 2);
H = j([
  V("zipcode-field")
], H);
export {
  v as CountyField,
  T as DistrictField,
  f as TwzipcodeFieldset,
  H as ZipcodeField
};
