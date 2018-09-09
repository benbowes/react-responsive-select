var ReactResponsiveSelect = (function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var l = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(l.exports, l, l.exports, n), (l.l = !0), l.exports;
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var l in e)
          n.d(
            r,
            l,
            function(t) {
              return e[t];
            }.bind(null, l),
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 52))
  );
})([
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    (t.INITIALISE = 'INITIALISE'),
      (t.UPDATE_VIA_PROPS = 'UPDATE_VIA_PROPS'),
      (t.SET_IS_DRAGGING = 'SET_IS_DRAGGING'),
      (t.SET_OPTIONS_PANEL_OPEN = 'SET_OPTIONS_PANEL_OPEN'),
      (t.SET_OPTIONS_PANEL_CLOSED = 'SET_OPTIONS_PANEL_CLOSED'),
      (t.SET_SINGLESELECT_OPTIONS = 'SET_SINGLESELECT_OPTIONS'),
      (t.SET_MULTISELECT_OPTIONS = 'SET_MULTISELECT_OPTIONS'),
      (t.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION =
        'SET_OPTIONS_PANEL_CLOSED_NO_SELECTION'),
      (t.SET_OPTIONS_PANEL_CLOSED_ONBLUR = 'SET_OPTIONS_PANEL_CLOSED_ONBLUR'),
      (t.SET_NEXT_SELECTED_INDEX = 'SET_NEXT_SELECTED_INDEX'),
      (t.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC =
        'SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC');
  },
  function(e, t, n) {
    e.exports = n(38)();
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = n(39);
    Object.defineProperty(t, 'ReactResponsiveSelectProps', {
      enumerable: !0,
      get: function() {
        return r.ReactResponsiveSelectProps;
      },
    });
    var l = n(36);
    Object.defineProperty(t, 'MultiSelectProps', {
      enumerable: !0,
      get: function() {
        return l.MultiSelectProps;
      },
    });
    var o = n(35);
    Object.defineProperty(t, 'MultiSelectOptionProps', {
      enumerable: !0,
      get: function() {
        return o.MultiSelectOptionProps;
      },
    });
    var i = n(34);
    Object.defineProperty(t, 'SingleSelectProps', {
      enumerable: !0,
      get: function() {
        return i.SingleSelectProps;
      },
    });
    var a = n(33);
    Object.defineProperty(t, 'SingleSelectOptionProps', {
      enumerable: !0,
      get: function() {
        return a.SingleSelectOptionProps;
      },
    });
  },
  function(e, t) {
    e.exports = function(e) {
      return e.replace(/\s\s+/g, ' ').trim();
    };
  },
  function(e, t, n) {
    (function(e, n) {
      var r = 200,
        l = '__lodash_hash_undefined__',
        o = 1,
        i = 2,
        a = 9007199254740991,
        u = '[object Arguments]',
        c = '[object Array]',
        s = '[object AsyncFunction]',
        f = '[object Boolean]',
        d = '[object Date]',
        p = '[object Error]',
        _ = '[object Function]',
        S = '[object GeneratorFunction]',
        v = '[object Map]',
        b = '[object Number]',
        O = '[object Null]',
        y = '[object Object]',
        h = '[object Proxy]',
        g = '[object RegExp]',
        m = '[object Set]',
        P = '[object String]',
        I = '[object Symbol]',
        x = '[object Undefined]',
        E = '[object ArrayBuffer]',
        j = '[object DataView]',
        T = /^\[object .+?Constructor\]$/,
        R = /^(?:0|[1-9]\d*)$/,
        M = {};
      (M['[object Float32Array]'] = M['[object Float64Array]'] = M[
        '[object Int8Array]'
      ] = M['[object Int16Array]'] = M['[object Int32Array]'] = M[
        '[object Uint8Array]'
      ] = M['[object Uint8ClampedArray]'] = M['[object Uint16Array]'] = M[
        '[object Uint32Array]'
      ] = !0),
        (M[u] = M[c] = M[E] = M[f] = M[j] = M[d] = M[p] = M[_] = M[v] = M[
          b
        ] = M[y] = M[g] = M[m] = M[P] = M['[object WeakMap]'] = !1);
      var N = 'object' == typeof e && e && e.Object === Object && e,
        w = 'object' == typeof self && self && self.Object === Object && self,
        L = N || w || Function('return this')(),
        A = 'object' == typeof t && t && !t.nodeType && t,
        C = A && 'object' == typeof n && n && !n.nodeType && n,
        D = C && C.exports === A,
        k = D && N.process,
        B = (function() {
          try {
            return k && k.binding && k.binding('util');
          } catch (e) {}
        })(),
        U = B && B.isTypedArray;
      function V(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
          if (t(e[n], n, e)) return !0;
        return !1;
      }
      function z(e, t) {
        return e.has(t);
      }
      function q(e) {
        var t = -1,
          n = Array(e.size);
        return (
          e.forEach(function(e, r) {
            n[++t] = [r, e];
          }),
          n
        );
      }
      function G(e) {
        var t = -1,
          n = Array(e.size);
        return (
          e.forEach(function(e) {
            n[++t] = e;
          }),
          n
        );
      }
      var X = Array.prototype,
        F = Function.prototype,
        W = Object.prototype,
        $ = L['__core-js_shared__'],
        K = F.toString,
        H = W.hasOwnProperty,
        Y = (function() {
          var e = /[^.]+$/.exec(($ && $.keys && $.keys.IE_PROTO) || '');
          return e ? 'Symbol(src)_1.' + e : '';
        })(),
        J = W.toString,
        Q = RegExp(
          '^' +
            K.call(H)
              .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                '$1.*?',
              ) +
            '$',
        ),
        Z = D ? L.Buffer : void 0,
        ee = L.Symbol,
        te = L.Uint8Array,
        ne = W.propertyIsEnumerable,
        re = X.splice,
        le = ee ? ee.toStringTag : void 0,
        oe = Object.getOwnPropertySymbols,
        ie = Z ? Z.isBuffer : void 0,
        ae = (function(e, t) {
          return function(n) {
            return e(t(n));
          };
        })(Object.keys, Object),
        ue = De(L, 'DataView'),
        ce = De(L, 'Map'),
        se = De(L, 'Promise'),
        fe = De(L, 'Set'),
        de = De(L, 'WeakMap'),
        pe = De(Object, 'create'),
        _e = Ve(ue),
        Se = Ve(ce),
        ve = Ve(se),
        be = Ve(fe),
        Oe = Ve(de),
        ye = ee ? ee.prototype : void 0,
        he = ye ? ye.valueOf : void 0;
      function ge(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      function me(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      function Pe(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      function Ie(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.__data__ = new Pe(); ++t < n; ) this.add(e[t]);
      }
      function xe(e) {
        var t = (this.__data__ = new me(e));
        this.size = t.size;
      }
      function Ee(e, t) {
        var n = Ge(e),
          r = !n && qe(e),
          l = !n && !r && Xe(e),
          o = !n && !r && !l && He(e),
          i = n || r || l || o,
          a = i
            ? (function(e, t) {
                for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
                return r;
              })(e.length, String)
            : [],
          u = a.length;
        for (var c in e)
          (!t && !H.call(e, c)) ||
            (i &&
              ('length' == c ||
                (l && ('offset' == c || 'parent' == c)) ||
                (o &&
                  ('buffer' == c || 'byteLength' == c || 'byteOffset' == c)) ||
                Ue(c, u))) ||
            a.push(c);
        return a;
      }
      function je(e, t) {
        for (var n = e.length; n--; ) if (ze(e[n][0], t)) return n;
        return -1;
      }
      function Te(e) {
        return null == e
          ? void 0 === e
            ? x
            : O
          : le && le in Object(e)
            ? (function(e) {
                var t = H.call(e, le),
                  n = e[le];
                try {
                  e[le] = void 0;
                  var r = !0;
                } catch (e) {}
                var l = J.call(e);
                r && (t ? (e[le] = n) : delete e[le]);
                return l;
              })(e)
            : (function(e) {
                return J.call(e);
              })(e);
      }
      function Re(e) {
        return Ke(e) && Te(e) == u;
      }
      function Me(e, t, n, r, l) {
        return (
          e === t ||
          (null == e || null == t || (!Ke(e) && !Ke(t))
            ? e != e && t != t
            : (function(e, t, n, r, l, a) {
                var s = Ge(e),
                  _ = Ge(t),
                  S = s ? c : Be(e),
                  O = _ ? c : Be(t),
                  h = (S = S == u ? y : S) == y,
                  x = (O = O == u ? y : O) == y,
                  T = S == O;
                if (T && Xe(e)) {
                  if (!Xe(t)) return !1;
                  (s = !0), (h = !1);
                }
                if (T && !h)
                  return (
                    a || (a = new xe()),
                    s || He(e)
                      ? Le(e, t, n, r, l, a)
                      : (function(e, t, n, r, l, a, u) {
                          switch (n) {
                            case j:
                              if (
                                e.byteLength != t.byteLength ||
                                e.byteOffset != t.byteOffset
                              )
                                return !1;
                              (e = e.buffer), (t = t.buffer);
                            case E:
                              return !(
                                e.byteLength != t.byteLength ||
                                !a(new te(e), new te(t))
                              );
                            case f:
                            case d:
                            case b:
                              return ze(+e, +t);
                            case p:
                              return e.name == t.name && e.message == t.message;
                            case g:
                            case P:
                              return e == t + '';
                            case v:
                              var c = q;
                            case m:
                              var s = r & o;
                              if ((c || (c = G), e.size != t.size && !s))
                                return !1;
                              var _ = u.get(e);
                              if (_) return _ == t;
                              (r |= i), u.set(e, t);
                              var S = Le(c(e), c(t), r, l, a, u);
                              return u.delete(e), S;
                            case I:
                              if (he) return he.call(e) == he.call(t);
                          }
                          return !1;
                        })(e, t, S, n, r, l, a)
                  );
                if (!(n & o)) {
                  var R = h && H.call(e, '__wrapped__'),
                    M = x && H.call(t, '__wrapped__');
                  if (R || M) {
                    var N = R ? e.value() : e,
                      w = M ? t.value() : t;
                    return a || (a = new xe()), l(N, w, n, r, a);
                  }
                }
                if (!T) return !1;
                return (
                  a || (a = new xe()),
                  (function(e, t, n, r, l, i) {
                    var a = n & o,
                      u = Ae(e),
                      c = u.length,
                      s = Ae(t).length;
                    if (c != s && !a) return !1;
                    for (var f = c; f--; ) {
                      var d = u[f];
                      if (!(a ? d in t : H.call(t, d))) return !1;
                    }
                    var p = i.get(e);
                    if (p && i.get(t)) return p == t;
                    var _ = !0;
                    i.set(e, t), i.set(t, e);
                    for (var S = a; ++f < c; ) {
                      d = u[f];
                      var v = e[d],
                        b = t[d];
                      if (r)
                        var O = a ? r(b, v, d, t, e, i) : r(v, b, d, e, t, i);
                      if (!(void 0 === O ? v === b || l(v, b, n, r, i) : O)) {
                        _ = !1;
                        break;
                      }
                      S || (S = 'constructor' == d);
                    }
                    if (_ && !S) {
                      var y = e.constructor,
                        h = t.constructor;
                      y != h &&
                        'constructor' in e &&
                        'constructor' in t &&
                        !(
                          'function' == typeof y &&
                          y instanceof y &&
                          'function' == typeof h &&
                          h instanceof h
                        ) &&
                        (_ = !1);
                    }
                    return i.delete(e), i.delete(t), _;
                  })(e, t, n, r, l, a)
                );
              })(e, t, n, r, Me, l))
        );
      }
      function Ne(e) {
        return (
          !(
            !$e(e) ||
            (function(e) {
              return !!Y && Y in e;
            })(e)
          ) && (Fe(e) ? Q : T).test(Ve(e))
        );
      }
      function we(e) {
        if (
          !(function(e) {
            var t = e && e.constructor,
              n = ('function' == typeof t && t.prototype) || W;
            return e === n;
          })(e)
        )
          return ae(e);
        var t = [];
        for (var n in Object(e))
          H.call(e, n) && 'constructor' != n && t.push(n);
        return t;
      }
      function Le(e, t, n, r, l, a) {
        var u = n & o,
          c = e.length,
          s = t.length;
        if (c != s && !(u && s > c)) return !1;
        var f = a.get(e);
        if (f && a.get(t)) return f == t;
        var d = -1,
          p = !0,
          _ = n & i ? new Ie() : void 0;
        for (a.set(e, t), a.set(t, e); ++d < c; ) {
          var S = e[d],
            v = t[d];
          if (r) var b = u ? r(v, S, d, t, e, a) : r(S, v, d, e, t, a);
          if (void 0 !== b) {
            if (b) continue;
            p = !1;
            break;
          }
          if (_) {
            if (
              !V(t, function(e, t) {
                if (!z(_, t) && (S === e || l(S, e, n, r, a))) return _.push(t);
              })
            ) {
              p = !1;
              break;
            }
          } else if (S !== v && !l(S, v, n, r, a)) {
            p = !1;
            break;
          }
        }
        return a.delete(e), a.delete(t), p;
      }
      function Ae(e) {
        return (function(e, t, n) {
          var r = t(e);
          return Ge(e)
            ? r
            : (function(e, t) {
                for (var n = -1, r = t.length, l = e.length; ++n < r; )
                  e[l + n] = t[n];
                return e;
              })(r, n(e));
        })(e, Ye, ke);
      }
      function Ce(e, t) {
        var n = e.__data__;
        return (function(e) {
          var t = typeof e;
          return 'string' == t ||
            'number' == t ||
            'symbol' == t ||
            'boolean' == t
            ? '__proto__' !== e
            : null === e;
        })(t)
          ? n['string' == typeof t ? 'string' : 'hash']
          : n.map;
      }
      function De(e, t) {
        var n = (function(e, t) {
          return null == e ? void 0 : e[t];
        })(e, t);
        return Ne(n) ? n : void 0;
      }
      (ge.prototype.clear = function() {
        (this.__data__ = pe ? pe(null) : {}), (this.size = 0);
      }),
        (ge.prototype.delete = function(e) {
          var t = this.has(e) && delete this.__data__[e];
          return (this.size -= t ? 1 : 0), t;
        }),
        (ge.prototype.get = function(e) {
          var t = this.__data__;
          if (pe) {
            var n = t[e];
            return n === l ? void 0 : n;
          }
          return H.call(t, e) ? t[e] : void 0;
        }),
        (ge.prototype.has = function(e) {
          var t = this.__data__;
          return pe ? void 0 !== t[e] : H.call(t, e);
        }),
        (ge.prototype.set = function(e, t) {
          var n = this.__data__;
          return (
            (this.size += this.has(e) ? 0 : 1),
            (n[e] = pe && void 0 === t ? l : t),
            this
          );
        }),
        (me.prototype.clear = function() {
          (this.__data__ = []), (this.size = 0);
        }),
        (me.prototype.delete = function(e) {
          var t = this.__data__,
            n = je(t, e);
          return !(
            n < 0 ||
            (n == t.length - 1 ? t.pop() : re.call(t, n, 1), --this.size, 0)
          );
        }),
        (me.prototype.get = function(e) {
          var t = this.__data__,
            n = je(t, e);
          return n < 0 ? void 0 : t[n][1];
        }),
        (me.prototype.has = function(e) {
          return je(this.__data__, e) > -1;
        }),
        (me.prototype.set = function(e, t) {
          var n = this.__data__,
            r = je(n, e);
          return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
        }),
        (Pe.prototype.clear = function() {
          (this.size = 0),
            (this.__data__ = {
              hash: new ge(),
              map: new (ce || me)(),
              string: new ge(),
            });
        }),
        (Pe.prototype.delete = function(e) {
          var t = Ce(this, e).delete(e);
          return (this.size -= t ? 1 : 0), t;
        }),
        (Pe.prototype.get = function(e) {
          return Ce(this, e).get(e);
        }),
        (Pe.prototype.has = function(e) {
          return Ce(this, e).has(e);
        }),
        (Pe.prototype.set = function(e, t) {
          var n = Ce(this, e),
            r = n.size;
          return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
        }),
        (Ie.prototype.add = Ie.prototype.push = function(e) {
          return this.__data__.set(e, l), this;
        }),
        (Ie.prototype.has = function(e) {
          return this.__data__.has(e);
        }),
        (xe.prototype.clear = function() {
          (this.__data__ = new me()), (this.size = 0);
        }),
        (xe.prototype.delete = function(e) {
          var t = this.__data__,
            n = t.delete(e);
          return (this.size = t.size), n;
        }),
        (xe.prototype.get = function(e) {
          return this.__data__.get(e);
        }),
        (xe.prototype.has = function(e) {
          return this.__data__.has(e);
        }),
        (xe.prototype.set = function(e, t) {
          var n = this.__data__;
          if (n instanceof me) {
            var l = n.__data__;
            if (!ce || l.length < r - 1)
              return l.push([e, t]), (this.size = ++n.size), this;
            n = this.__data__ = new Pe(l);
          }
          return n.set(e, t), (this.size = n.size), this;
        });
      var ke = oe
          ? function(e) {
              return null == e
                ? []
                : ((e = Object(e)),
                  (function(e, t) {
                    for (
                      var n = -1, r = null == e ? 0 : e.length, l = 0, o = [];
                      ++n < r;

                    ) {
                      var i = e[n];
                      t(i, n, e) && (o[l++] = i);
                    }
                    return o;
                  })(oe(e), function(t) {
                    return ne.call(e, t);
                  }));
            }
          : function() {
              return [];
            },
        Be = Te;
      function Ue(e, t) {
        return (
          !!(t = null == t ? a : t) &&
          ('number' == typeof e || R.test(e)) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
        );
      }
      function Ve(e) {
        if (null != e) {
          try {
            return K.call(e);
          } catch (e) {}
          try {
            return e + '';
          } catch (e) {}
        }
        return '';
      }
      function ze(e, t) {
        return e === t || (e != e && t != t);
      }
      ((ue && Be(new ue(new ArrayBuffer(1))) != j) ||
        (ce && Be(new ce()) != v) ||
        (se && '[object Promise]' != Be(se.resolve())) ||
        (fe && Be(new fe()) != m) ||
        (de && '[object WeakMap]' != Be(new de()))) &&
        (Be = function(e) {
          var t = Te(e),
            n = t == y ? e.constructor : void 0,
            r = n ? Ve(n) : '';
          if (r)
            switch (r) {
              case _e:
                return j;
              case Se:
                return v;
              case ve:
                return '[object Promise]';
              case be:
                return m;
              case Oe:
                return '[object WeakMap]';
            }
          return t;
        });
      var qe = Re(
          (function() {
            return arguments;
          })(),
        )
          ? Re
          : function(e) {
              return Ke(e) && H.call(e, 'callee') && !ne.call(e, 'callee');
            },
        Ge = Array.isArray;
      var Xe =
        ie ||
        function() {
          return !1;
        };
      function Fe(e) {
        if (!$e(e)) return !1;
        var t = Te(e);
        return t == _ || t == S || t == s || t == h;
      }
      function We(e) {
        return 'number' == typeof e && e > -1 && e % 1 == 0 && e <= a;
      }
      function $e(e) {
        var t = typeof e;
        return null != e && ('object' == t || 'function' == t);
      }
      function Ke(e) {
        return null != e && 'object' == typeof e;
      }
      var He = U
        ? (function(e) {
            return function(t) {
              return e(t);
            };
          })(U)
        : function(e) {
            return Ke(e) && We(e.length) && !!M[Te(e)];
          };
      function Ye(e) {
        return (function(e) {
          return null != e && We(e.length) && !Fe(e);
        })(e)
          ? Ee(e)
          : we(e);
      }
      n.exports = function(e, t) {
        return Me(e, t);
      };
    }.call(this, n(51), n(50)(e)));
  },
  function(e, t) {
    e.exports = React;
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = function e(t, n, r) {
        null === t && (t = Function.prototype);
        var l = Object.getOwnPropertyDescriptor(t, n);
        if (void 0 === l) {
          var o = Object.getPrototypeOf(t);
          return null === o ? void 0 : e(o, n, r);
        }
        if ('value' in l) return l.value;
        var i = l.get;
        return void 0 !== i ? i.call(r) : void 0;
      },
      o = (function(e) {
        return e && e.__esModule ? e : { default: e };
      })(n(11));
    t.default = function(e) {
      return (function(t) {
        function n() {
          return (
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, n),
            (function(e, t) {
              if (!e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called",
                );
              return !t || ('object' != typeof t && 'function' != typeof t)
                ? e
                : t;
            })(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments),
            )
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t,
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(n, e),
          r(n, [
            {
              key: 'scrollIntoView',
              value: function() {
                var e = this.props,
                  t = e.scrollIntoViewElementSelector,
                  n = e.scrollIntoViewScrollPaneRef,
                  r = e.isDragging;
                (this.scrollPaneDOM = this.scrollPaneDOM || n.current),
                  (this.elementDOM = this.elementDOM || this.optionRef.current);
                var l = (0, o.default)(this.elementDOM, t);
                if (
                  (!0 === r && (this.dontScrollIntoView = !0),
                  !this.dontScrollIntoView && l)
                ) {
                  var i = this.scrollPaneDOM.getBoundingClientRect().top,
                    a = this.scrollPaneDOM.getBoundingClientRect().bottom,
                    u = this.elementDOM.getBoundingClientRect().top;
                  this.elementDOM.getBoundingClientRect().bottom > a &&
                    (this.scrollPaneDOM.scrollTop += this.elementDOM.getBoundingClientRect().height),
                    u < i &&
                      (this.scrollPaneDOM.scrollTop -= this.elementDOM.getBoundingClientRect().height),
                    0 === this.props.index &&
                      (this.scrollPaneDOM.scrollTop = 0);
                }
              },
            },
            {
              key: 'componentDidUpdate',
              value: function() {
                return (
                  l(
                    n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                    'componentDidUpdate',
                    this,
                  ) &&
                    l(
                      n.prototype.__proto__ ||
                        Object.getPrototypeOf(n.prototype),
                      'componentDidUpdate',
                      this,
                    ).call(this),
                  this.scrollIntoView()
                );
              },
            },
            {
              key: 'render',
              value: function() {
                return l(
                  n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                  'render',
                  this,
                ).call(this);
              },
            },
          ]),
          n
        );
      })();
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e) {
      var t = e.noSelectionLabel,
        n = e.name,
        l = e.options,
        o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      if (!t) {
        var i = -1 === o ? 0 : o;
        return r({ name: n }, l[i]);
      }
      return o > -1
        ? r({ name: n }, l[o])
        : { name: n, text: t, value: 'null' };
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = {
        multiselect: !1,
        name: void 0,
        options: [],
        isDragging: !1,
        isOptionsPanelOpen: !1,
        altered: !1,
        singleSelectInitialIndex: 0,
        singleSelectSelectedIndex: 0,
        singleSelectSelectedOption: {},
        nextPotentialSelectionIndex: 0,
        multiSelectInitialSelectedIndexes: [0],
        multiSelectSelectedOptions: { options: [] },
        multiSelectSelectedIndexes: [],
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.state,
          n = e.ReactResponsiveSelectClassRef,
          o = e.type,
          i = t.isOptionsPanelOpen;
        if (t.disabled) return;
        n.updateState({
          type: l.SET_NEXT_SELECTED_INDEX,
          optionIndex: (0, r.default)(o, t),
        }),
          !1 === i && n.updateState({ type: l.SET_OPTIONS_PANEL_OPEN });
      });
    var r = (function(e) {
        return e && e.__esModule ? e : { default: e };
      })(n(42)),
      l = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0));
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    })(n(0));
    t.default = function(e) {
      var t = e.event,
        n = e.state,
        l = e.props,
        o = e.ReactResponsiveSelectClassRef,
        i = n.multiselect,
        a = n.isOptionsPanelOpen,
        u = n.nextPotentialSelectionIndex,
        c = n.disabled,
        s = n.options;
      if (!c) {
        var f = parseFloat(t.target.getAttribute('data-key'));
        (s[f] && !0 === s[f].disabled) ||
          (i
            ? o.updateState({ type: r.SET_MULTISELECT_OPTIONS, optionIndex: u })
            : o.updateState({
                type: r.SET_SINGLESELECT_OPTIONS,
                optionIndex: u,
              }),
          a ? t.stopPropagation() : l.onSubmit());
      }
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e, t) {
        return (
          String(e.className)
            .split(' ')
            .indexOf(t) > -1
        );
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.event,
          n = e.state,
          o = e.ReactResponsiveSelectClassRef,
          i = n.multiselect,
          a = n.isOptionsPanelOpen,
          u = n.isDragging,
          c = n.disabled,
          s = n.options;
        if (c) return;
        if (!1 === u) {
          if (
            (t.preventDefault(), t && (0, r.default)(t.target, 'rrs__options'))
          )
            return;
          var f = parseFloat(t.target.getAttribute('data-key'));
          if (s[f] && !0 === s[f].disabled) return;
          if ((0, r.default)(t.target, 'rrs__option'))
            return void o.updateState({
              type: i ? l.SET_MULTISELECT_OPTIONS : l.SET_SINGLESELECT_OPTIONS,
              optionIndex: f,
            });
          o.updateState(
            { type: a ? l.SET_OPTIONS_PANEL_CLOSED : l.SET_OPTIONS_PANEL_OPEN },
            function() {
              !1 === o.state.isOptionsPanelOpen && o.focusButton();
            },
          );
        }
      });
    var r = (function(e) {
        return e && e.__esModule ? e : { default: e };
      })(n(11)),
      l = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0));
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.singleSelectBroadcastChange = t.multiSelectBroadcastChange = void 0);
    var r = o(n(47)),
      l = o(n(46));
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.multiSelectBroadcastChange = r.default),
      (t.singleSelectBroadcastChange = l.default);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    })(n(0));
    t.default = function(e) {
      var t = e.event,
        n = e.state,
        l = e.ReactResponsiveSelectClassRef,
        o = n.options;
      if (!n.disabled) {
        var i = o
          .map(function(e) {
            return e.text.toLowerCase().charAt(0);
          })
          .indexOf(t.key);
        i > -1 &&
          l.updateState({
            type: r.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
            optionIndex: i,
          });
      }
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(5),
      o = u(l),
      i = u(n(3)),
      a = n(2);
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var c = (function(e) {
      function t() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t);
        var e = (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            );
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return (e.optionRef = o.default.createRef()), e;
      }
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t,
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        })(t, l.Component),
        r(t, [
          {
            key: 'componentDidUpdate',
            value: function() {
              var e = this.props,
                t = e.index,
                n = e.isOptionsPanelOpen;
              t === e.nextPotentialSelectionIndex &&
                n &&
                this.optionRef.current.focus();
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.index,
                n = e.nextPotentialSelectionIndex,
                r = e.option,
                l = e.singleSelectSelectedIndex;
              return o.default.createElement(
                'li',
                {
                  role: 'menuitem',
                  tabIndex: '-1',
                  'aria-disabled': r.disabled ? 'true' : 'false',
                  'data-key': t,
                  index: t,
                  ref: this.optionRef,
                  className: (0, i.default)(
                    '\n          rrs__option\n          ' +
                      (l === t ? 'rrs__option--selected' : '') +
                      '\n          ' +
                      (n === t ? 'rrs__option--next-selection' : '') +
                      '\n          ' +
                      (!0 === r.disabled ? 'rrs__option--disabled' : '') +
                      '\n        ',
                  ),
                },
                r.markup || r.text,
              );
            },
          },
        ]),
        t
      );
    })();
    (t.default = c), (c.propTypes = a.SingleSelectOptionProps);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(5),
      o = c(l),
      i = c(n(3)),
      a = n(2),
      u = c(n(15));
    function c(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var s = (0, c(n(6)).default)(u.default),
      f = (function(e) {
        function t() {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          var e = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return !t || ('object' != typeof t && 'function' != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.optionsButton = o.default.createRef()),
            (e.optionsContainer = o.default.createRef()),
            e
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t,
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, l.Component),
          r(t, [
            {
              key: 'componentDidUpdate',
              value: function(e) {
                var t = this.props,
                  n = t.singleSelectSelectedIndex,
                  r = t.isOptionsPanelOpen,
                  l = t.nextPotentialSelectionIndex;
                !r &&
                  e.isOptionsPanelOpen &&
                  e.singleSelectSelectedIndex !== n &&
                  this.optionsButton.current.focus(),
                  r && -1 === l && this.optionsButton.current.focus();
              },
            },
            {
              key: 'getCustomLabel',
              value: function() {
                var e = this.props,
                  t = e.prefix,
                  n = e.name,
                  r = e.singleSelectSelectedOption,
                  l = e.caretIcon,
                  i = e.customLabelText;
                return o.default.createElement(
                  'div',
                  { className: 'rrs__label' },
                  o.default.createElement(
                    'span',
                    {
                      'aria-label': (t ? t + ' ' : '') + r.text + ' selected',
                      className: 'rrs__label__text',
                      id: 'rrs-' + n + '-label',
                    },
                    i,
                  ),
                  l && l,
                );
              },
            },
            {
              key: 'getDefaultLabel',
              value: function() {
                var e = this.props,
                  t = e.prefix,
                  n = e.singleSelectSelectedOption,
                  r = e.name,
                  l = e.caretIcon,
                  i = e.singleSelectSelectedIndex,
                  a = e.noSelectionLabel;
                return -1 === i
                  ? o.default.createElement(
                      'div',
                      { className: 'rrs__label' },
                      o.default.createElement(
                        'span',
                        {
                          'aria-label': a,
                          className: 'rrs__label__text',
                          id: 'rrs-' + r + '-label',
                        },
                        t && o.default.createElement('span', null, t),
                        a,
                      ),
                      l && l,
                    )
                  : o.default.createElement(
                      'div',
                      { className: 'rrs__label' },
                      o.default.createElement(
                        'span',
                        {
                          'aria-label':
                            (t ? t + ' ' : '') + n.text + ' selected',
                          className: 'rrs__label__text',
                          id: 'rrs-' + r + '-label',
                        },
                        t && o.default.createElement('span', null, t),
                        n.text
                          ? n.text
                          : o.default.createElement('div', null, ' '),
                      ),
                      l && l,
                    );
              },
            },
            {
              key: 'render',
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.customLabelText,
                  r = t.disabled,
                  l = t.isOptionsPanelOpen,
                  a = t.isDragging,
                  u = t.name,
                  c = t.nextPotentialSelectionIndex,
                  f = t.options,
                  d = t.singleSelectSelectedIndex,
                  p = t.singleSelectSelectedOption;
                return o.default.createElement(
                  'div',
                  null,
                  o.default.createElement(
                    'div',
                    {
                      role: 'button',
                      tabIndex: '0',
                      'aria-disabled': r,
                      'aria-haspopup': 'true',
                      'aria-expanded': l,
                      'aria-controls': 'rrs-' + u + '-menu',
                      ref: this.optionsButton,
                      className: (0, i.default)(
                        '\n            rrs__button\n            ' +
                          (!0 === r ? 'rrs__button--disabled' : '') +
                          '\n          ',
                      ),
                    },
                    n && this.getCustomLabel(),
                    !n && this.getDefaultLabel(),
                    u &&
                      o.default.createElement('input', {
                        type: 'hidden',
                        name: u,
                        value: p.value,
                      }),
                  ),
                  o.default.createElement(
                    'ul',
                    {
                      id: 'rrs-' + u + '-menu',
                      'aria-labelledby': 'rrs-' + u + '-label',
                      role: 'menu',
                      className: 'rrs__options',
                      ref: this.optionsContainer,
                    },
                    f.length > 0 &&
                      f.map(function(t, n) {
                        return o.default.createElement(s, {
                          scrollIntoViewScrollPaneRef: e.optionsContainer,
                          scrollIntoViewElementSelector:
                            'rrs__option--next-selection',
                          key: n,
                          index: n,
                          isDragging: a,
                          isOptionsPanelOpen: l,
                          option: t,
                          singleSelectSelectedIndex: d,
                          nextPotentialSelectionIndex: c,
                        });
                      }),
                  ),
                );
              },
            },
          ]),
          t
        );
      })();
    (t.default = f), (f.propTypes = a.SingleSelectProps);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(5),
      o = u(l),
      i = u(n(3)),
      a = n(2);
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var c = (function(e) {
      function t() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t);
        var e = (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            );
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return (e.optionRef = o.default.createRef()), e;
      }
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t,
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        })(t, l.Component),
        r(t, [
          {
            key: 'componentDidUpdate',
            value: function() {
              var e = this.props,
                t = e.index,
                n = e.isOptionsPanelOpen;
              t === e.nextPotentialSelectionIndex &&
                n &&
                this.optionRef.current.focus();
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.index,
                n = e.multiSelectSelectedIndexes,
                r = e.nextPotentialSelectionIndex,
                l = e.option,
                a = n.some(function(e) {
                  return e === t;
                });
              return o.default.createElement(
                'li',
                {
                  role: 'checkbox',
                  tabIndex: '-1',
                  'aria-checked': a,
                  'aria-label': l.text,
                  'aria-live': 'assertive',
                  'aria-disabled': l.disabled ? 'true' : 'false',
                  'data-key': t,
                  index: t,
                  ref: this.optionRef,
                  className: (0, i.default)(
                    '\n          rrs__option\n          ' +
                      (a ? 'rrs__option--selected' : '') +
                      '\n          ' +
                      (r === t ? 'rrs__option--next-selection' : '') +
                      '\n          ' +
                      (!0 === l.disabled ? 'rrs__option--disabled' : '') +
                      '\n        ',
                  ),
                },
                l.markup || l.text,
              );
            },
          },
        ]),
        t
      );
    })();
    (t.default = c), (c.propTypes = a.MultiSelectOptionProps);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(5),
      o = s(l),
      i = s(n(3)),
      a = s(n(4)),
      u = n(2),
      c = s(n(17));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var f = (0, s(n(6)).default)(c.default),
      d = (function(e) {
        function t() {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          var e = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return !t || ('object' != typeof t && 'function' != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.optionsButton = o.default.createRef()),
            (e.optionsContainer = o.default.createRef()),
            e
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t,
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, l.Component),
          r(t, [
            {
              key: 'componentDidUpdate',
              value: function(e) {
                this.props.isOptionsPanelOpen ||
                  !e.isOptionsPanelOpen ||
                  (0, a.default)(
                    e.multiSelectSelectedIndexes,
                    this.props.multiSelectSelectedIndexes,
                  ) ||
                  this.optionsButton.current.focus();
              },
            },
            {
              key: 'getAriaLabel',
              value: function() {
                var e = this.props,
                  t = e.multiSelectSelectedOptions,
                  n = e.prefix,
                  r = t.options.length;
                return (0, i.default)(
                  '\n      Checkbox group ' +
                    (n ? n + ' ' : '') +
                    ' has\n      ' +
                    r +
                    ' item' +
                    (1 === r ? '' : 's') +
                    ' selected.\n      Selected option' +
                    (1 === r ? '' : 's') +
                    ' ' +
                    (1 === r ? 'is' : 'are') +
                    '\n      ' +
                    t.options
                      .map(function(e) {
                        return e.text;
                      })
                      .join(' and ') +
                    '\n    ',
                );
              },
            },
            {
              key: 'render',
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.caretIcon,
                  r = t.customLabelText,
                  l = t.disabled,
                  a = t.isDragging,
                  u = t.isOptionsPanelOpen,
                  c = t.multiSelectSelectedIndexes,
                  s = t.multiSelectSelectedOptions,
                  d = t.name,
                  p = t.options,
                  _ = t.nextPotentialSelectionIndex,
                  S = t.prefix;
                return o.default.createElement(
                  'div',
                  null,
                  o.default.createElement(
                    'div',
                    {
                      role: 'button',
                      tabIndex: '0',
                      'aria-disabled': l,
                      'aria-haspopup': 'true',
                      'aria-expanded': u,
                      'aria-controls': 'rrs-' + d + '-menu',
                      ref: this.optionsButton,
                      className: (0, i.default)(
                        '\n            rrs__button\n            ' +
                          (!0 === l ? 'rrs__button--disabled' : '') +
                          '\n          ',
                      ),
                    },
                    r &&
                      o.default.createElement(
                        'div',
                        { className: 'rrs__label' },
                        o.default.createElement(
                          'span',
                          {
                            'aria-label': this.getAriaLabel(),
                            className: 'rrs__label__text',
                            id: 'rrs-' + d + '-label',
                          },
                          r,
                        ),
                        n && n,
                      ),
                    !r &&
                      o.default.createElement(
                        'div',
                        { className: 'rrs__label' },
                        o.default.createElement(
                          'span',
                          {
                            'aria-label': this.getAriaLabel(),
                            className: 'rrs__label__text',
                            id: 'rrs-' + d + '-label',
                          },
                          o.default.createElement(
                            'span',
                            { className: 'rrs__multiselect-label' },
                            o.default.createElement(
                              'span',
                              { className: 'rrs__multiselect-label__text' },
                              (S ? S + ' ' : '') +
                                '\n                  ' +
                                (s.options.length > 0 ? s.options[0].text : ''),
                            ),
                            s.options.length > 1 &&
                              o.default.createElement(
                                'span',
                                { className: 'rrs__multiselect-label__badge' },
                                '+ ' + (s.options.length - 1),
                              ),
                          ),
                        ),
                        n && n,
                      ),
                    d &&
                      o.default.createElement('input', {
                        type: 'hidden',
                        name: d,
                        value: [
                          s.options.map(function(e) {
                            return e.value;
                          }),
                        ].join(','),
                      }),
                  ),
                  o.default.createElement(
                    'ul',
                    {
                      id: 'rrs-' + d + '-menu',
                      'aria-labelledby': 'rrs-' + d + '-label',
                      role: 'menu',
                      className: 'rrs__options',
                      ref: this.optionsContainer,
                    },
                    p.length > 0 &&
                      p.map(function(t, n) {
                        return o.default.createElement(f, {
                          scrollIntoViewScrollPaneRef: e.optionsContainer,
                          scrollIntoViewElementSelector:
                            'rrs__option--next-selection',
                          key: n,
                          index: n,
                          option: t,
                          isDragging: a,
                          isOptionsPanelOpen: u,
                          multiSelectSelectedIndexes: c,
                          nextPotentialSelectionIndex: _,
                        });
                      }),
                  ),
                );
              },
            },
          ]),
          t
        );
      })();
    (t.default = d), (d.propTypes = u.MultiSelectProps);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e) {
      return r({}, e, {
        multiSelectSelectedIndexes: [].concat(
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
            return Array.from(e);
          })(l.default.multiSelectSelectedIndexes),
        ),
        multiSelectSelectedOptions: r({}, l.default.multiSelectSelectedOptions),
      });
    };
    var l = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(8));
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return r({}, e, {
        multiSelectSelectedIndexes: [0],
        multiSelectSelectedOptions: {
          options: [r({ name: e.name }, e.options[0])],
        },
        nextPotentialSelectionIndex: 0,
        singleSelectSelectedOption: (0, l.default)(e, t),
      });
    };
    var l = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(7));
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    (t.isAltered = o),
      (t.default = function(e) {
        return r({}, e, { altered: o(e) });
      });
    var l = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(4));
    function o(e) {
      return e.multiselect
        ? !(0, l.default)(
            e.multiSelectInitialSelectedIndexes,
            e.multiSelectSelectedIndexes,
          )
        : e.singleSelectSelectedIndex !== e.singleSelectInitialIndex;
    }
  },
  function(e, t, n) {
    'use strict';
    function r(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
      }
      return Array.from(e);
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e, t) {
        return {
          options: [].concat(
            r(e.multiSelectSelectedOptions.options.slice(0, t)),
            r(e.multiSelectSelectedOptions.options.slice(t + 1)),
          ),
        };
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e, t) {
      return {
        options: [].concat(
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
            return Array.from(e);
          })(e.multiSelectSelectedOptions.options),
          [r({ name: e.name }, e.options[t])],
        ),
      };
    };
  },
  function(e, t, n) {
    'use strict';
    function r(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
      }
      return Array.from(e);
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e, t) {
        return [].concat(
          r(e.multiSelectSelectedIndexes.slice(0, t)),
          r(e.multiSelectSelectedIndexes.slice(t + 1)),
        );
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e, t) {
        return [].concat(
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
            return Array.from(e);
          })(e.multiSelectSelectedIndexes),
          [t],
        );
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e) {
      var t = e.options,
        n = e.name,
        l = e.selectedValues,
        o = e.noSelectionLabel;
      if (!o)
        return l
          ? t
              .filter(function(e) {
                return l.some(function(t) {
                  return t === e.value;
                });
              })
              .map(function(e) {
                return r({ name: n }, e);
              })
          : [r({ name: n }, t[0])];
      return l && l.length > 0
        ? t
            .filter(function(e) {
              return l.some(function(t) {
                return t === e.value;
              });
            })
            .map(function(e) {
              return r({ name: n }, e);
            })
        : [{ name: n, text: o, value: 'null' }];
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          n = arguments[2],
          r = e
            .map(function(e, n) {
              return t.some(function(t) {
                return e.value === t;
              })
                ? n
                : void 0;
            })
            .filter(function(e) {
              return void 0 !== e;
            }),
          l = n ? [] : [0];
        return r.length ? r : l;
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.options,
          n = e.selectedValue,
          r = e.noSelectionLabel,
          l = t
            .map(function(e) {
              return e.value;
            })
            .indexOf(n);
        return l > -1 || r ? l : 0;
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.resetMultiSelectState = t.getSingleSelectSelectedOption = t.getInitialOption = t.mergeIsAlteredState = t.removeMultiSelectOption = t.addMultiSelectOption = t.removeMultiSelectIndex = t.addMultiSelectIndex = t.getMultiSelectInitialSelectedOptions = t.getMultiSelectSelectedValueIndexes = t.getSelectedValueIndex = void 0);
    var r = _(n(28)),
      l = _(n(27)),
      o = _(n(26)),
      i = _(n(25)),
      a = _(n(24)),
      u = _(n(23)),
      c = _(n(22)),
      s = _(n(21)),
      f = _(n(20)),
      d = _(n(7)),
      p = _(n(19));
    function _(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.getSelectedValueIndex = r.default),
      (t.getMultiSelectSelectedValueIndexes = l.default),
      (t.getMultiSelectInitialSelectedOptions = o.default),
      (t.addMultiSelectIndex = i.default),
      (t.removeMultiSelectIndex = a.default),
      (t.addMultiSelectOption = u.default),
      (t.removeMultiSelectOption = c.default),
      (t.mergeIsAlteredState = s.default),
      (t.getInitialOption = f.default),
      (t.getSingleSelectSelectedOption = d.default),
      (t.resetMultiSelectState = p.default);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e, t) {
      switch (t.type) {
        case l.UPDATE_VIA_PROPS:
        case l.INITIALISE:
          var n = (0, o.getSelectedValueIndex)(t.value),
            i = (0, o.getMultiSelectSelectedValueIndexes)(
              t.value.options,
              t.value.selectedValues,
              t.value.noSelectionLabel,
            );
          return r({}, e, {
            multiselect: t.value.multiselect || !1,
            noSelectionLabel: t.value.noSelectionLabel,
            name: t.value.name,
            options: t.value.options,
            altered: t.value.altered || !1,
            disabled: t.value.disabled || !1,
            singleSelectInitialIndex: n,
            singleSelectSelectedIndex: n,
            singleSelectSelectedOption: (0, o.getSingleSelectSelectedOption)(
              t.value,
              n,
            ),
            nextPotentialSelectionIndex: e.nextPotentialSelectionIndex
              ? e.nextPotentialSelectionIndex
              : n,
            multiSelectInitialSelectedIndexes: i,
            multiSelectSelectedIndexes: i,
            multiSelectSelectedOptions: {
              options: (0, o.getMultiSelectInitialSelectedOptions)(t.value, i),
            },
          });
        case l.SET_IS_DRAGGING:
          return r({}, e, { isDragging: t.value });
        case l.SET_OPTIONS_PANEL_OPEN:
          var a = r({}, e, {
            isOptionsPanelOpen: !0,
            nextPotentialSelectionIndex: e.multiselect
              ? e.multiSelectSelectedIndexes.length
                ? e.multiSelectSelectedIndexes[0]
                : 0
              : e.nextPotentialSelectionIndex,
            singleSelectSelectedOption: (0, o.getSingleSelectSelectedOption)(
              e,
              e.nextPotentialSelectionIndex,
            ),
          });
          return (0, o.mergeIsAlteredState)(a);
        case l.SET_OPTIONS_PANEL_CLOSED:
          var u = r({}, e, {
            isOptionsPanelOpen: !1,
            singleSelectSelectedIndex: e.nextPotentialSelectionIndex,
            singleSelectSelectedOption: (0, o.getSingleSelectSelectedOption)(
              e,
              e.nextPotentialSelectionIndex,
            ),
          });
          return (0, o.mergeIsAlteredState)(u);
        case l.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION:
        case l.SET_OPTIONS_PANEL_CLOSED_ONBLUR:
          return r({}, e, { isOptionsPanelOpen: !1 });
        case l.SET_NEXT_SELECTED_INDEX:
          return r({}, e, { nextPotentialSelectionIndex: t.optionIndex });
        case l.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC:
          return r({}, e, {
            isOptionsPanelOpen: !0,
            nextPotentialSelectionIndex: t.optionIndex,
          });
        case l.SET_SINGLESELECT_OPTIONS:
          var c = r({}, e, {
            nextPotentialSelectionIndex: t.optionIndex,
            singleSelectSelectedIndex: t.optionIndex,
            isOptionsPanelOpen: !1,
            singleSelectSelectedOption: (0, o.getSingleSelectSelectedOption)(
              e,
              t.optionIndex,
            ),
          });
          return (0, o.mergeIsAlteredState)(c);
        case l.SET_MULTISELECT_OPTIONS:
          if (!e.noSelectionLabel) {
            var s =
                0 === e.multiSelectSelectedIndexes[0] &&
                1 === e.multiSelectSelectedIndexes.length,
              f =
                e.multiSelectSelectedIndexes.length > 0 &&
                !s &&
                0 === t.optionIndex,
              d = s && 0 !== t.optionIndex;
            if (f) {
              var p = (0, o.getInitialOption)(e);
              return (0, o.mergeIsAlteredState)(p);
            }
            d && (e = (0, o.resetMultiSelectState)(e));
          }
          e.noSelectionLabel &&
            e.multiSelectSelectedOptions.options[0].text ===
              e.noSelectionLabel &&
            (e.multiSelectSelectedOptions.options = []);
          var _ = e.multiSelectSelectedIndexes.indexOf(t.optionIndex),
            S = r({}, e, {
              nextPotentialSelectionIndex: t.optionIndex,
              multiSelectSelectedIndexes:
                -1 === _
                  ? (0, o.addMultiSelectIndex)(e, t.optionIndex)
                  : (0, o.removeMultiSelectIndex)(e, _),
              multiSelectSelectedOptions:
                -1 === _
                  ? (0, o.addMultiSelectOption)(e, t.optionIndex)
                  : (0, o.removeMultiSelectOption)(e, _),
            });
          if (0 === S.multiSelectSelectedOptions.options.length)
            if (e.noSelectionLabel) {
              var v = (0, o.getMultiSelectSelectedValueIndexes)(
                e.options,
                e.selectedValues,
              );
              S = r({}, S, {
                nextPotentialSelectionIndex: -1,
                multiSelectSelectedOptions: {
                  options: (0, o.getMultiSelectInitialSelectedOptions)(e, v),
                },
              });
            } else S = (0, o.getInitialOption)(e);
          return (0, o.mergeIsAlteredState)(S);
        default:
          return e;
      }
    };
    var l = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0)),
      o = n(29);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.state,
          n = e.props,
          r = n.multiselect,
          l = n.customLabelRenderer,
          o = t.multiSelectSelectedOptions,
          i = t.singleSelectSelectedOption;
        return !!l && l(r ? o : i);
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    'function' == typeof Symbol && Symbol.iterator;
    t.default = function(e, t, n) {
      0;
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.SingleSelectOptionProps = void 0);
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(1));
    t.SingleSelectOptionProps = {
      index: r.default.number.isRequired,
      isOptionsPanelOpen: r.default.bool.isRequired,
      nextPotentialSelectionIndex: r.default.number,
      option: r.default.shape({
        text: r.default.string.isRequired,
        value: r.default.string.isRequired,
        markup: r.default.element,
        disabled: r.default.bool,
      }).isRequired,
      singleSelectSelectedIndex: r.default.number,
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.SingleSelectProps = void 0);
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(1));
    t.SingleSelectProps = {
      altered: r.default.bool,
      caretIcon: r.default.oneOfType([r.default.string, r.default.element]),
      customLabelText: r.default.oneOfType([
        r.default.string,
        r.default.bool,
        r.default.element,
      ]),
      disabled: r.default.bool,
      singleSelectInitialIndex: r.default.number,
      singleSelectSelectedIndex: r.default.number,
      singleSelectSelectedOption: r.default.shape({
        text: r.default.string,
        value: r.default.string,
      }),
      isDragging: r.default.bool,
      isOptionsPanelOpen: r.default.bool,
      name: r.default.string,
      nextPotentialSelectionIndex: r.default.number,
      onSubmit: r.default.func,
      options: r.default.arrayOf(
        r.default.shape({
          text: r.default.string.isRequired,
          value: r.default.string.isRequired,
        }),
      ).isRequired,
      prefix: r.default.string,
      noSelectionLabel: r.default.string,
      selectedValue: r.default.string,
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.MultiSelectOptionProps = void 0);
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(1));
    t.MultiSelectOptionProps = {
      index: r.default.number.isRequired,
      isOptionsPanelOpen: r.default.bool.isRequired,
      multiSelectSelectedIndexes: r.default.arrayOf(r.default.number),
      nextPotentialSelectionIndex: r.default.number,
      option: r.default.shape({
        text: r.default.string.isRequired,
        value: r.default.string.isRequired,
        markup: r.default.element,
        disabled: r.default.bool,
      }).isRequired,
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.MultiSelectProps = void 0);
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(1));
    t.MultiSelectProps = {
      altered: r.default.bool,
      caretIcon: r.default.oneOfType([r.default.string, r.default.element]),
      customLabelText: r.default.oneOfType([
        r.default.string,
        r.default.bool,
        r.default.element,
      ]),
      disabled: r.default.bool,
      multiSelectInitialSelectedIndexes: r.default.arrayOf(r.default.number),
      multiSelectSelectedIndexes: r.default.arrayOf(r.default.number),
      multiSelectSelectedOptions: r.default.shape({
        altered: r.default.bool,
        options: r.default.arrayOf(
          r.default.shape({
            name: r.default.string,
            text: r.default.string,
            value: r.default.string,
            markup: r.default.object,
          }),
        ),
      }),
      isDragging: r.default.bool,
      isOptionsPanelOpen: r.default.bool,
      name: r.default.string,
      nextPotentialSelectionIndex: r.default.number,
      onSubmit: r.default.func,
      options: r.default.arrayOf(
        r.default.shape({
          text: r.default.string.isRequired,
          value: r.default.string.isRequired,
        }),
      ).isRequired,
      prefix: r.default.string,
    };
  },
  function(e, t, n) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  function(e, t, n) {
    'use strict';
    var r = n(37);
    function l() {}
    e.exports = function() {
      function e(e, t, n, l, o, i) {
        if (i !== r) {
          var a = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((a.name = 'Invariant Violation'), a);
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
      };
      return (n.checkPropTypes = l), (n.PropTypes = n), n;
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.ReactResponsiveSelectProps = void 0);
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(1));
    t.ReactResponsiveSelectProps = {
      caretIcon: r.default.oneOfType([r.default.string, r.default.element]),
      customLabelRenderer: r.default.func,
      disabled: r.default.bool,
      multiselect: r.default.bool,
      name: r.default.string.isRequired,
      onChange: r.default.func,
      options: r.default.arrayOf(
        r.default.shape({
          text: r.default.string.isRequired,
          value: r.default.string.isRequired,
        }),
      ).isRequired,
      onSubmit: r.default.func,
      prefix: r.default.string,
      selectedValue: r.default.string,
      noSelectionLabel: r.default.string,
      selectedValues: r.default.arrayOf(r.default.string.isRequired),
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.state,
          n = e.ReactResponsiveSelectClassRef;
        if (t.disabled) return;
        n.updateState({ type: r.SET_IS_DRAGGING, value: !1 });
      });
    var r = (function(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    })(n(0));
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.state,
          n = e.ReactResponsiveSelectClassRef,
          l = t.isDragging;
        if (t.disabled) return;
        l || n.updateState({ type: r.SET_IS_DRAGGING, value: !0 });
      });
    var r = (function(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    })(n(0));
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e, t) {
        var n = t.isOptionsPanelOpen,
          r = t.nextPotentialSelectionIndex,
          l = t.options;
        switch (e) {
          case 'increment':
            return !1 === n ? r : r === l.length - 1 ? 0 : r + 1;
          case 'decrement':
            return !1 === n ? r : 0 === r ? l.length - 1 : r - 1;
          default:
            return 0;
        }
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e, t) {
        e.forEach(function(e) {
          e === t.keyCode && t.preventDefault();
        });
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = {
        TAB: 9,
        ENTER: 13,
        SPACE: 32,
        ESCAPE: 27,
        UP: 38,
        DOWN: 40,
      });
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.event,
          n = e.state,
          s = e.props,
          f = e.ReactResponsiveSelectClassRef,
          d = n.multiselect,
          p = n.isOptionsPanelOpen;
        if (n.disabled) return;
        (0, o.default)(
          [
            r.default.ENTER,
            r.default.SPACE,
            r.default.ESCAPE,
            r.default.UP,
            r.default.DOWN,
          ],
          t,
        ),
          /^[a-z0-9]+$/.test(t.key) &&
            (0, i.default)({
              event: t,
              ReactResponsiveSelectClassRef: f,
              state: n,
            });
        switch (t.keyCode) {
          case r.default.TAB:
            p &&
              (t.preventDefault(),
              d &&
                f.updateState({ type: l.SET_OPTIONS_PANEL_CLOSED }, function() {
                  return f.focusButton();
                }));
            break;
          case r.default.ENTER:
            (0, a.default)({
              event: t,
              state: n,
              props: s,
              ReactResponsiveSelectClassRef: f,
            });
            break;
          case r.default.SPACE:
            p
              ? (0, u.default)({
                  event: t,
                  state: n,
                  ReactResponsiveSelectClassRef: f,
                })
              : f.updateState({ type: l.SET_OPTIONS_PANEL_OPEN });
            break;
          case r.default.ESCAPE:
            f.updateState(
              { type: l.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION },
              function() {
                return f.focusButton();
              },
            );
            break;
          case r.default.UP:
            (0, c.default)({
              state: n,
              ReactResponsiveSelectClassRef: f,
              type: 'decrement',
            });
            break;
          case r.default.DOWN:
            (0, c.default)({
              state: n,
              ReactResponsiveSelectClassRef: f,
              type: 'increment',
            });
        }
      });
    var r = s(n(44)),
      l = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0)),
      o = s(n(43)),
      i = s(n(14)),
      a = s(n(10)),
      u = s(n(12)),
      c = s(n(9));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(4));
    t.default = function(e, t, n, l) {
      l &&
        (!(0, r.default)(e, t) &&
          l({ name: t.name, text: t.text, value: t.value, altered: n }));
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(n(4));
    t.default = function(e, t, n, l) {
      l &&
        (!(0, r.default)(e, t) &&
          l({
            options: t.map(function(e) {
              return { name: e.name, text: e.text, value: e.value };
            }),
            altered: n,
          }));
    };
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function(e) {
        var t = e.state,
          n = e.ReactResponsiveSelectClassRef,
          o = e.props,
          i = t.isOptionsPanelOpen,
          a = t.disabled,
          u = t.altered,
          c = t.singleSelectSelectedOption,
          s = t.multiSelectSelectedOptions,
          f = o.onBlur,
          d = o.multiselect;
        if (a) return;
        var p = n.selectBox && !n.selectBox.contains(document.activeElement);
        i && p && n.updateState({ type: r.SET_OPTIONS_PANEL_CLOSED_ONBLUR });
        p &&
          f &&
          (d
            ? (0, l.multiSelectBroadcastChange)(void 0, s.options, u, f)
            : (0, l.singleSelectBroadcastChange)(void 0, c, u, f));
      });
    var r = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0)),
      l = n(13);
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.handleTouchStart = t.handleTouchMove = t.handleKeyUpOrDownPressed = t.handleKeyEvent = t.handleEnterPressed = t.handleClick = t.handleBlur = t.handleAlphaNumerical = void 0);
    var r = f(n(14)),
      l = f(n(48)),
      o = f(n(12)),
      i = f(n(10)),
      a = f(n(45)),
      u = f(n(9)),
      c = f(n(41)),
      s = f(n(40));
    function f(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.handleAlphaNumerical = r.default),
      (t.handleBlur = l.default),
      (t.handleClick = o.default),
      (t.handleEnterPressed = i.default),
      (t.handleKeyEvent = a.default),
      (t.handleKeyUpOrDownPressed = u.default),
      (t.handleTouchMove = c.default),
      (t.handleTouchStart = s.default);
  },
  function(e, t) {
    e.exports = function(e) {
      return (
        e.webpackPolyfill ||
          ((e.deprecate = function() {}),
          (e.paths = []),
          e.children || (e.children = []),
          Object.defineProperty(e, 'loaded', {
            enumerable: !0,
            get: function() {
              return e.l;
            },
          }),
          Object.defineProperty(e, 'id', {
            enumerable: !0,
            get: function() {
              return e.i;
            },
          }),
          (e.webpackPolyfill = 1)),
        e
      );
    };
  },
  function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || Function('return this')() || (0, eval)('this');
    } catch (e) {
      'object' == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        },
      l = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      o = n(5),
      i = y(o),
      a = y(n(4)),
      u = y(n(3)),
      c = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0)),
      s = n(49),
      f = n(13),
      d = n(2),
      p = y(n(32)),
      _ = y(n(31)),
      S = y(n(8)),
      v = y(n(30)),
      b = y(n(18)),
      O = y(n(16));
    function y(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var h = (function(e) {
      function t() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t);
        var e = (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            );
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return (e.state = S.default), (e.reducer = v.default), e;
      }
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t,
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        })(t, o.Component),
        l(t, [
          {
            key: 'componentDidMount',
            value: function() {
              var e = this.props,
                t = e.options,
                n = e.noSelectionLabel,
                r = e.selectedValue,
                l = e.selectedValues,
                o = e.name,
                i = e.multiselect,
                a = e.disabled,
                u = e.altered;
              this.updateState({
                type: c.INITIALISE,
                value: {
                  options: t,
                  noSelectionLabel: n,
                  selectedValue: r,
                  selectedValues: l,
                  name: o,
                  multiselect: i,
                  disabled: a,
                  altered: u,
                },
              });
            },
          },
          {
            key: 'componentWillReceiveProps',
            value: function(e) {
              (0, a.default)(e, this.props) ||
                this.updateState({
                  type: c.UPDATE_VIA_PROPS,
                  value: r({}, this.props, e),
                });
            },
          },
          {
            key: 'componentDidUpdate',
            value: function(e, t) {
              var n = this.state,
                r = n.singleSelectInitialIndex,
                l = n.singleSelectSelectedOption,
                o = n.multiSelectSelectedOptions,
                i = n.multiselect,
                u = n.altered,
                c = n.multiSelectInitialSelectedIndexes,
                s = this.props,
                d = s.onChange,
                p = s.selectedValue,
                _ = s.selectedValues;
              return (
                p !== r &&
                !(0, a.default)(_, c) &&
                (i
                  ? (0, f.multiSelectBroadcastChange)(
                      t.multiSelectSelectedOptions.options,
                      o.options,
                      u,
                      d,
                    )
                  : (0, f.singleSelectBroadcastChange)(
                      t.singleSelectSelectedOption,
                      l,
                      u,
                      d,
                    ),
                !0)
              );
            },
          },
          {
            key: 'updateState',
            value: function(e, t) {
              var n = this.reducer(this.state, e);
              this.setState(n, function() {
                return t && t();
              }),
                (0, p.default)(this.props.name, e, n);
            },
          },
          {
            key: 'focusButton',
            value: function() {
              this.selectBox.querySelector('.rrs__button').focus();
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this,
                t = this.props,
                n = t.prefix,
                r = t.caretIcon,
                l = t.disabled,
                o = this.state,
                a = o.altered,
                c = o.singleSelectInitialIndex,
                f = o.isOptionsPanelOpen,
                d = o.isDragging,
                p = o.noSelectionLabel,
                S = o.multiSelectInitialSelectedIndexes,
                v = o.multiSelectSelectedIndexes,
                y = o.multiSelectSelectedOptions,
                h = o.name,
                g = o.nextPotentialSelectionIndex,
                m = o.options,
                P = o.singleSelectSelectedIndex,
                I = o.singleSelectSelectedOption,
                x = o.multiselect,
                E = (0, _.default)({ state: this.state, props: this.props });
              return i.default.createElement(
                'div',
                {
                  className: (0, u.default)(
                    '\n          rrs\n          ' +
                      (!0 === f ? 'rrs--options-visible' : '') +
                      '\n          ' +
                      (a ? 'rrs--has-changed' : '') +
                      '\n        ',
                  ),
                  ref: function(t) {
                    e.selectBox = t;
                  },
                  tabIndex: '-1',
                  onKeyDown: function(t) {
                    return (0, s.handleKeyEvent)({
                      event: t,
                      ReactResponsiveSelectClassRef: e,
                      state: e.state,
                      props: e.props,
                    });
                  },
                  onTouchStart: function() {
                    return (0, s.handleTouchStart)({
                      ReactResponsiveSelectClassRef: e,
                      state: e.state,
                    });
                  },
                  onTouchMove: function() {
                    return (0, s.handleTouchMove)({
                      ReactResponsiveSelectClassRef: e,
                      state: e.state,
                    });
                  },
                  onTouchEnd: function(t) {
                    return (0, s.handleClick)({
                      event: t,
                      ReactResponsiveSelectClassRef: e,
                      state: e.state,
                    });
                  },
                  onMouseDown: function(t) {
                    return (0, s.handleClick)({
                      event: t,
                      ReactResponsiveSelectClassRef: e,
                      state: e.state,
                    });
                  },
                  onBlur: function() {
                    return (0, s.handleBlur)({
                      ReactResponsiveSelectClassRef: e,
                      state: e.state,
                      props: e.props,
                    });
                  },
                },
                x
                  ? i.default.createElement(b.default, {
                      noSelectionLabel: p,
                      disabled: l,
                      altered: a,
                      isDragging: d,
                      caretIcon: r,
                      customLabelText: E,
                      prefix: n,
                      name: h,
                      multiSelectInitialSelectedIndexes: S,
                      multiSelectSelectedOptions: y,
                      multiSelectSelectedIndexes: v,
                      nextPotentialSelectionIndex: g,
                      isOptionsPanelOpen: f,
                      options: m,
                    })
                  : i.default.createElement(O.default, {
                      noSelectionLabel: p,
                      disabled: l,
                      altered: a,
                      isDragging: d,
                      singleSelectInitialIndex: c,
                      caretIcon: r,
                      prefix: n,
                      name: h,
                      customLabelText: E,
                      singleSelectSelectedOption: I,
                      singleSelectSelectedIndex: P,
                      nextPotentialSelectionIndex: g,
                      isOptionsPanelOpen: f,
                      options: m,
                    }),
              );
            },
          },
        ]),
        t
      );
    })();
    (t.default = h), (h.propTypes = d.ReactResponsiveSelectProps);
  },
]);
