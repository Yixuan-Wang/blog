import{u as kr,a as re}from"./app.ead9bef9.js";import{f as lr,s as j,o as U,b as X,d as M,t as W,F as pr,l as ee,h as R,i as te,u as ne,q as ae,p as ie,e as oe}from"./vendor.68320762.js";var se=typeof global=="object"&&global&&global.Object===Object&&global,gr=se,ue=typeof self=="object"&&self&&self.Object===Object&&self,fe=gr||ue||Function("return this")(),y=fe,ce=y.Symbol,m=ce,dr=Object.prototype,le=dr.hasOwnProperty,pe=dr.toString,D=m?m.toStringTag:void 0;function ge(r){var e=le.call(r,D),t=r[D];try{r[D]=void 0;var n=!0}catch{}var i=pe.call(r);return n&&(e?r[D]=t:delete r[D]),i}var de=Object.prototype,he=de.toString;function _e(r){return he.call(r)}var ve="[object Null]",ye="[object Undefined]",hr=m?m.toStringTag:void 0;function I(r){return r==null?r===void 0?ye:ve:hr&&hr in Object(r)?ge(r):_e(r)}function C(r){return r!=null&&typeof r=="object"}var be="[object Symbol]";function Z(r){return typeof r=="symbol"||C(r)&&I(r)==be}function Te(r,e){for(var t=-1,n=r==null?0:r.length,i=Array(n);++t<n;)i[t]=e(r[t],t,r);return i}var Ae=Array.isArray,_=Ae,$e=1/0,_r=m?m.prototype:void 0,vr=_r?_r.toString:void 0;function yr(r){if(typeof r=="string")return r;if(_(r))return Te(r,yr)+"";if(Z(r))return vr?vr.call(r):"";var e=r+"";return e=="0"&&1/r==-$e?"-0":e}function J(r){var e=typeof r;return r!=null&&(e=="object"||e=="function")}function me(r){return r}var Oe="[object AsyncFunction]",we="[object Function]",Pe="[object GeneratorFunction]",Se="[object Proxy]";function br(r){if(!J(r))return!1;var e=I(r);return e==we||e==Pe||e==Oe||e==Se}var Ee=y["__core-js_shared__"],Q=Ee,Tr=function(){var r=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||"");return r?"Symbol(src)_1."+r:""}();function xe(r){return!!Tr&&Tr in r}var Ie=Function.prototype,Ce=Ie.toString;function P(r){if(r!=null){try{return Ce.call(r)}catch{}try{return r+""}catch{}}return""}var je=/[\\^$.*+?()[\]{}|]/g,Me=/^\[object .+?Constructor\]$/,Re=Function.prototype,De=Object.prototype,Le=Re.toString,Fe=De.hasOwnProperty,Ne=RegExp("^"+Le.call(Fe).replace(je,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Ge(r){if(!J(r)||xe(r))return!1;var e=br(r)?Ne:Me;return e.test(P(r))}function Be(r,e){return r==null?void 0:r[e]}function S(r,e){var t=Be(r,e);return Ge(t)?t:void 0}var Ue=S(y,"WeakMap"),V=Ue,ze=function(){try{var r=S(Object,"defineProperty");return r({},"",{}),r}catch{}}(),Ar=ze,He=9007199254740991,Ke=/^(?:0|[1-9]\d*)$/;function $r(r,e){var t=typeof r;return e=e==null?He:e,!!e&&(t=="number"||t!="symbol"&&Ke.test(r))&&r>-1&&r%1==0&&r<e}function Ye(r,e,t){e=="__proto__"&&Ar?Ar(r,e,{configurable:!0,enumerable:!0,value:t,writable:!0}):r[e]=t}function mr(r,e){return r===e||r!==r&&e!==e}var qe=9007199254740991;function k(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=qe}function Or(r){return r!=null&&k(r.length)&&!br(r)}var Xe=Object.prototype;function We(r){var e=r&&r.constructor,t=typeof e=="function"&&e.prototype||Xe;return r===t}function Ze(r,e){for(var t=-1,n=Array(r);++t<r;)n[t]=e(t);return n}var Je="[object Arguments]";function wr(r){return C(r)&&I(r)==Je}var Pr=Object.prototype,Qe=Pr.hasOwnProperty,Ve=Pr.propertyIsEnumerable,ke=wr(function(){return arguments}())?wr:function(r){return C(r)&&Qe.call(r,"callee")&&!Ve.call(r,"callee")},Sr=ke;function rt(){return!1}var Er=typeof exports=="object"&&exports&&!exports.nodeType&&exports,xr=Er&&typeof module=="object"&&module&&!module.nodeType&&module,et=xr&&xr.exports===Er,Ir=et?y.Buffer:void 0,tt=Ir?Ir.isBuffer:void 0,nt=tt||rt,rr=nt,at="[object Arguments]",it="[object Array]",ot="[object Boolean]",st="[object Date]",ut="[object Error]",ft="[object Function]",ct="[object Map]",lt="[object Number]",pt="[object Object]",gt="[object RegExp]",dt="[object Set]",ht="[object String]",_t="[object WeakMap]",vt="[object ArrayBuffer]",yt="[object DataView]",bt="[object Float32Array]",Tt="[object Float64Array]",At="[object Int8Array]",$t="[object Int16Array]",mt="[object Int32Array]",Ot="[object Uint8Array]",wt="[object Uint8ClampedArray]",Pt="[object Uint16Array]",St="[object Uint32Array]",c={};c[bt]=c[Tt]=c[At]=c[$t]=c[mt]=c[Ot]=c[wt]=c[Pt]=c[St]=!0;c[at]=c[it]=c[vt]=c[ot]=c[yt]=c[st]=c[ut]=c[ft]=c[ct]=c[lt]=c[pt]=c[gt]=c[dt]=c[ht]=c[_t]=!1;function Et(r){return C(r)&&k(r.length)&&!!c[I(r)]}function xt(r){return function(e){return r(e)}}var Cr=typeof exports=="object"&&exports&&!exports.nodeType&&exports,L=Cr&&typeof module=="object"&&module&&!module.nodeType&&module,It=L&&L.exports===Cr,er=It&&gr.process,Ct=function(){try{var r=L&&L.require&&L.require("util").types;return r||er&&er.binding&&er.binding("util")}catch{}}(),jr=Ct,Mr=jr&&jr.isTypedArray,jt=Mr?xt(Mr):Et,Rr=jt,Mt=Object.prototype,Rt=Mt.hasOwnProperty;function Dt(r,e){var t=_(r),n=!t&&Sr(r),i=!t&&!n&&rr(r),a=!t&&!n&&!i&&Rr(r),o=t||n||i||a,s=o?Ze(r.length,String):[],f=s.length;for(var u in r)(e||Rt.call(r,u))&&!(o&&(u=="length"||i&&(u=="offset"||u=="parent")||a&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||$r(u,f)))&&s.push(u);return s}function Lt(r,e){return function(t){return r(e(t))}}var Ft=Lt(Object.keys,Object),Nt=Ft,Gt=Object.prototype,Bt=Gt.hasOwnProperty;function Ut(r){if(!We(r))return Nt(r);var e=[];for(var t in Object(r))Bt.call(r,t)&&t!="constructor"&&e.push(t);return e}function tr(r){return Or(r)?Dt(r):Ut(r)}var zt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ht=/^\w*$/;function nr(r,e){if(_(r))return!1;var t=typeof r;return t=="number"||t=="symbol"||t=="boolean"||r==null||Z(r)?!0:Ht.test(r)||!zt.test(r)||e!=null&&r in Object(e)}var Kt=S(Object,"create"),F=Kt;function Yt(){this.__data__=F?F(null):{},this.size=0}function qt(r){var e=this.has(r)&&delete this.__data__[r];return this.size-=e?1:0,e}var Xt="__lodash_hash_undefined__",Wt=Object.prototype,Zt=Wt.hasOwnProperty;function Jt(r){var e=this.__data__;if(F){var t=e[r];return t===Xt?void 0:t}return Zt.call(e,r)?e[r]:void 0}var Qt=Object.prototype,Vt=Qt.hasOwnProperty;function kt(r){var e=this.__data__;return F?e[r]!==void 0:Vt.call(e,r)}var rn="__lodash_hash_undefined__";function en(r,e){var t=this.__data__;return this.size+=this.has(r)?0:1,t[r]=F&&e===void 0?rn:e,this}function E(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}E.prototype.clear=Yt;E.prototype.delete=qt;E.prototype.get=Jt;E.prototype.has=kt;E.prototype.set=en;function tn(){this.__data__=[],this.size=0}function z(r,e){for(var t=r.length;t--;)if(mr(r[t][0],e))return t;return-1}var nn=Array.prototype,an=nn.splice;function on(r){var e=this.__data__,t=z(e,r);if(t<0)return!1;var n=e.length-1;return t==n?e.pop():an.call(e,t,1),--this.size,!0}function sn(r){var e=this.__data__,t=z(e,r);return t<0?void 0:e[t][1]}function un(r){return z(this.__data__,r)>-1}function fn(r,e){var t=this.__data__,n=z(t,r);return n<0?(++this.size,t.push([r,e])):t[n][1]=e,this}function b(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}b.prototype.clear=tn;b.prototype.delete=on;b.prototype.get=sn;b.prototype.has=un;b.prototype.set=fn;var cn=S(y,"Map"),N=cn;function ln(){this.size=0,this.__data__={hash:new E,map:new(N||b),string:new E}}function pn(r){var e=typeof r;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?r!=="__proto__":r===null}function H(r,e){var t=r.__data__;return pn(e)?t[typeof e=="string"?"string":"hash"]:t.map}function gn(r){var e=H(this,r).delete(r);return this.size-=e?1:0,e}function dn(r){return H(this,r).get(r)}function hn(r){return H(this,r).has(r)}function _n(r,e){var t=H(this,r),n=t.size;return t.set(r,e),this.size+=t.size==n?0:1,this}function T(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}T.prototype.clear=ln;T.prototype.delete=gn;T.prototype.get=dn;T.prototype.has=hn;T.prototype.set=_n;var vn="Expected a function";function ar(r,e){if(typeof r!="function"||e!=null&&typeof e!="function")throw new TypeError(vn);var t=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=t.cache;if(a.has(i))return a.get(i);var o=r.apply(this,n);return t.cache=a.set(i,o)||a,o};return t.cache=new(ar.Cache||T),t}ar.Cache=T;var yn=500;function bn(r){var e=ar(r,function(n){return t.size===yn&&t.clear(),n}),t=e.cache;return e}var Tn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,An=/\\(\\)?/g,$n=bn(function(r){var e=[];return r.charCodeAt(0)===46&&e.push(""),r.replace(Tn,function(t,n,i,a){e.push(i?a.replace(An,"$1"):n||t)}),e}),mn=$n;function On(r){return r==null?"":yr(r)}function Dr(r,e){return _(r)?r:nr(r,e)?[r]:mn(On(r))}var wn=1/0;function K(r){if(typeof r=="string"||Z(r))return r;var e=r+"";return e=="0"&&1/r==-wn?"-0":e}function Lr(r,e){e=Dr(e,r);for(var t=0,n=e.length;r!=null&&t<n;)r=r[K(e[t++])];return t&&t==n?r:void 0}function Pn(r,e,t){var n=r==null?void 0:Lr(r,e);return n===void 0?t:n}function Sn(r,e){for(var t=-1,n=e.length,i=r.length;++t<n;)r[i+t]=e[t];return r}function En(){this.__data__=new b,this.size=0}function xn(r){var e=this.__data__,t=e.delete(r);return this.size=e.size,t}function In(r){return this.__data__.get(r)}function Cn(r){return this.__data__.has(r)}var jn=200;function Mn(r,e){var t=this.__data__;if(t instanceof b){var n=t.__data__;if(!N||n.length<jn-1)return n.push([r,e]),this.size=++t.size,this;t=this.__data__=new T(n)}return t.set(r,e),this.size=t.size,this}function A(r){var e=this.__data__=new b(r);this.size=e.size}A.prototype.clear=En;A.prototype.delete=xn;A.prototype.get=In;A.prototype.has=Cn;A.prototype.set=Mn;function Rn(r,e){for(var t=-1,n=r==null?0:r.length,i=0,a=[];++t<n;){var o=r[t];e(o,t,r)&&(a[i++]=o)}return a}function Dn(){return[]}var Ln=Object.prototype,Fn=Ln.propertyIsEnumerable,Fr=Object.getOwnPropertySymbols,Nn=Fr?function(r){return r==null?[]:(r=Object(r),Rn(Fr(r),function(e){return Fn.call(r,e)}))}:Dn,Gn=Nn;function Bn(r,e,t){var n=e(r);return _(r)?n:Sn(n,t(r))}function Nr(r){return Bn(r,tr,Gn)}var Un=S(y,"DataView"),ir=Un,zn=S(y,"Promise"),or=zn,Hn=S(y,"Set"),sr=Hn,Gr="[object Map]",Kn="[object Object]",Br="[object Promise]",Ur="[object Set]",zr="[object WeakMap]",Hr="[object DataView]",Yn=P(ir),qn=P(N),Xn=P(or),Wn=P(sr),Zn=P(V),x=I;(ir&&x(new ir(new ArrayBuffer(1)))!=Hr||N&&x(new N)!=Gr||or&&x(or.resolve())!=Br||sr&&x(new sr)!=Ur||V&&x(new V)!=zr)&&(x=function(r){var e=I(r),t=e==Kn?r.constructor:void 0,n=t?P(t):"";if(n)switch(n){case Yn:return Hr;case qn:return Gr;case Xn:return Br;case Wn:return Ur;case Zn:return zr}return e});var Kr=x,Jn=y.Uint8Array,Yr=Jn,Qn="__lodash_hash_undefined__";function Vn(r){return this.__data__.set(r,Qn),this}function kn(r){return this.__data__.has(r)}function Y(r){var e=-1,t=r==null?0:r.length;for(this.__data__=new T;++e<t;)this.add(r[e])}Y.prototype.add=Y.prototype.push=Vn;Y.prototype.has=kn;function ra(r,e){for(var t=-1,n=r==null?0:r.length;++t<n;)if(e(r[t],t,r))return!0;return!1}function ea(r,e){return r.has(e)}var ta=1,na=2;function qr(r,e,t,n,i,a){var o=t&ta,s=r.length,f=e.length;if(s!=f&&!(o&&f>s))return!1;var u=a.get(r),g=a.get(e);if(u&&g)return u==e&&g==r;var p=-1,l=!0,v=t&na?new Y:void 0;for(a.set(r,e),a.set(e,r);++p<s;){var d=r[p],h=e[p];if(n)var $=o?n(h,d,p,e,r,a):n(d,h,p,r,e,a);if($!==void 0){if($)continue;l=!1;break}if(v){if(!ra(e,function(O,w){if(!ea(v,w)&&(d===O||i(d,O,t,n,a)))return v.push(w)})){l=!1;break}}else if(!(d===h||i(d,h,t,n,a))){l=!1;break}}return a.delete(r),a.delete(e),l}function aa(r){var e=-1,t=Array(r.size);return r.forEach(function(n,i){t[++e]=[i,n]}),t}function ia(r){var e=-1,t=Array(r.size);return r.forEach(function(n){t[++e]=n}),t}var oa=1,sa=2,ua="[object Boolean]",fa="[object Date]",ca="[object Error]",la="[object Map]",pa="[object Number]",ga="[object RegExp]",da="[object Set]",ha="[object String]",_a="[object Symbol]",va="[object ArrayBuffer]",ya="[object DataView]",Xr=m?m.prototype:void 0,ur=Xr?Xr.valueOf:void 0;function ba(r,e,t,n,i,a,o){switch(t){case ya:if(r.byteLength!=e.byteLength||r.byteOffset!=e.byteOffset)return!1;r=r.buffer,e=e.buffer;case va:return!(r.byteLength!=e.byteLength||!a(new Yr(r),new Yr(e)));case ua:case fa:case pa:return mr(+r,+e);case ca:return r.name==e.name&&r.message==e.message;case ga:case ha:return r==e+"";case la:var s=aa;case da:var f=n&oa;if(s||(s=ia),r.size!=e.size&&!f)return!1;var u=o.get(r);if(u)return u==e;n|=sa,o.set(r,e);var g=qr(s(r),s(e),n,i,a,o);return o.delete(r),g;case _a:if(ur)return ur.call(r)==ur.call(e)}return!1}var Ta=1,Aa=Object.prototype,$a=Aa.hasOwnProperty;function ma(r,e,t,n,i,a){var o=t&Ta,s=Nr(r),f=s.length,u=Nr(e),g=u.length;if(f!=g&&!o)return!1;for(var p=f;p--;){var l=s[p];if(!(o?l in e:$a.call(e,l)))return!1}var v=a.get(r),d=a.get(e);if(v&&d)return v==e&&d==r;var h=!0;a.set(r,e),a.set(e,r);for(var $=o;++p<f;){l=s[p];var O=r[l],w=e[l];if(n)var cr=o?n(w,O,l,e,r,a):n(O,w,l,r,e,a);if(!(cr===void 0?O===w||i(O,w,t,n,a):cr)){h=!1;break}$||($=l=="constructor")}if(h&&!$){var G=r.constructor,B=e.constructor;G!=B&&"constructor"in r&&"constructor"in e&&!(typeof G=="function"&&G instanceof G&&typeof B=="function"&&B instanceof B)&&(h=!1)}return a.delete(r),a.delete(e),h}var Oa=1,Wr="[object Arguments]",Zr="[object Array]",q="[object Object]",wa=Object.prototype,Jr=wa.hasOwnProperty;function Pa(r,e,t,n,i,a){var o=_(r),s=_(e),f=o?Zr:Kr(r),u=s?Zr:Kr(e);f=f==Wr?q:f,u=u==Wr?q:u;var g=f==q,p=u==q,l=f==u;if(l&&rr(r)){if(!rr(e))return!1;o=!0,g=!1}if(l&&!g)return a||(a=new A),o||Rr(r)?qr(r,e,t,n,i,a):ba(r,e,f,t,n,i,a);if(!(t&Oa)){var v=g&&Jr.call(r,"__wrapped__"),d=p&&Jr.call(e,"__wrapped__");if(v||d){var h=v?r.value():r,$=d?e.value():e;return a||(a=new A),i(h,$,t,n,a)}}return l?(a||(a=new A),ma(r,e,t,n,i,a)):!1}function fr(r,e,t,n,i){return r===e?!0:r==null||e==null||!C(r)&&!C(e)?r!==r&&e!==e:Pa(r,e,t,n,fr,i)}var Sa=1,Ea=2;function xa(r,e,t,n){var i=t.length,a=i,o=!n;if(r==null)return!a;for(r=Object(r);i--;){var s=t[i];if(o&&s[2]?s[1]!==r[s[0]]:!(s[0]in r))return!1}for(;++i<a;){s=t[i];var f=s[0],u=r[f],g=s[1];if(o&&s[2]){if(u===void 0&&!(f in r))return!1}else{var p=new A;if(n)var l=n(u,g,f,r,e,p);if(!(l===void 0?fr(g,u,Sa|Ea,n,p):l))return!1}}return!0}function Qr(r){return r===r&&!J(r)}function Ia(r){for(var e=tr(r),t=e.length;t--;){var n=e[t],i=r[n];e[t]=[n,i,Qr(i)]}return e}function Vr(r,e){return function(t){return t==null?!1:t[r]===e&&(e!==void 0||r in Object(t))}}function Ca(r){var e=Ia(r);return e.length==1&&e[0][2]?Vr(e[0][0],e[0][1]):function(t){return t===r||xa(t,r,e)}}function ja(r,e){return r!=null&&e in Object(r)}function Ma(r,e,t){e=Dr(e,r);for(var n=-1,i=e.length,a=!1;++n<i;){var o=K(e[n]);if(!(a=r!=null&&t(r,o)))break;r=r[o]}return a||++n!=i?a:(i=r==null?0:r.length,!!i&&k(i)&&$r(o,i)&&(_(r)||Sr(r)))}function Ra(r,e){return r!=null&&Ma(r,e,ja)}var Da=1,La=2;function Fa(r,e){return nr(r)&&Qr(e)?Vr(K(r),e):function(t){var n=Pn(t,r);return n===void 0&&n===e?Ra(t,r):fr(e,n,Da|La)}}function Na(r){return function(e){return e==null?void 0:e[r]}}function Ga(r){return function(e){return Lr(e,r)}}function Ba(r){return nr(r)?Na(K(r)):Ga(r)}function Ua(r){return typeof r=="function"?r:r==null?me:typeof r=="object"?_(r)?Fa(r[0],r[1]):Ca(r):Ba(r)}function za(r,e,t,n){for(var i=-1,a=r==null?0:r.length;++i<a;){var o=r[i];e(n,o,t(o),r)}return n}function Ha(r){return function(e,t,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var f=o[r?s:++i];if(t(a[f],f,a)===!1)break}return e}}var Ka=Ha(),Ya=Ka;function qa(r,e){return r&&Ya(r,e,tr)}function Xa(r,e){return function(t,n){if(t==null)return t;if(!Or(t))return r(t,n);for(var i=t.length,a=e?i:-1,o=Object(t);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return t}}var Wa=Xa(qa),Za=Wa;function Ja(r,e,t,n){return Za(r,function(i,a,o){e(n,i,t(i),o)}),n}function Qa(r,e){return function(t,n){var i=_(t)?za:Ja,a=e?e():{};return i(t,r,Ua(n),a)}}var Va=Object.prototype,ka=Va.hasOwnProperty,ri=Qa(function(r,e,t){ka.call(r,t)?r[t].push(e):Ye(r,t,[e])}),ei=ri;const ti={class:"mt-4 mb-8"},ni={class:"flex flex-col gap-8"},ai={class:"font-bold text-[1.5em] mb-1"},ii={class:"font-mono"},oi=lr({props:{name:null,filter:null},setup(r){const e=r,t=kr(),n=o=>new Date(o).getFullYear(),i=j(()=>ei(t.articles.filter(e.filter),o=>n(o.timestamp))),a=j(()=>Object.keys(i.value).sort((o,s)=>Number(s)-Number(o)));return(o,s)=>{const f=re;return U(),X(pr,null,[M("h1",ti,W(r.name),1),M("div",ni,[(U(!0),X(pr,null,ee(R(a),u=>(U(),X("section",{key:u,class:"flex flex-col gap-2"},[M("div",null,[M("h2",ai,W(u),1),M("p",ii,W(R(i)[u].length),1)]),te(f,{articles:R(i)[u],compact:!0},null,8,["articles"])]))),128))])],64)}}}),fi=lr({setup(r){const{t:e}=ne(),t=ae({posts:!0,sheets:!0,notes:!0}),n=j(()=>a=>t==null?void 0:t[a.genre]),i=j(()=>e("archive"));return ie({title:j(()=>`${i.value} | Pak`),meta:[{name:"description",content:"All articles on Pak."}]}),(a,o)=>{const s=oi;return U(),oe(s,{name:R(i),filter:R(n)},null,8,["name","filter"])}}});export{fi as default};
