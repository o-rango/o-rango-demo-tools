/*!
 * O-RANGO - MIT License
 * Built with http://stenciljs.com
 */
((w,d,x,n,h,c,r)=>{((s)=>{s&&(r=s.getAttribute('data-resources-url'))})(d.querySelector("script[data-namespace='orango-demo-tools']"));
function e(e,t){return"sc-"+e.e+(t&&t!==l?"-"+t:"")}function t(e,t){return e+(t?"-h":"-s")}function o(e,t){let n,o,l=null,i=!1,s=!1,a=arguments.length;for(;a-- >2;)j.push(arguments[a]);for(;j.length>0;){let t=j.pop();if(t&&void 0!==t.pop)for(a=t.length;a--;)j.push(t[a]);else"boolean"==typeof t&&(t=null),(s="function"!=typeof e)&&(null==t?t="":"number"==typeof t?t=String(t):"string"!=typeof t&&(s=!1)),s&&i?l[l.length-1].vtext+=t:null===l?l=[s?{vtext:t}:t]:l.push(s?{vtext:t}:t),i=s}if(null!=t){if(t.className&&(t.class=t.className),"object"==typeof t.class){for(a in t.class)t.class[a]&&j.push(a);t.class=j.join(" "),j.length=0}null!=t.key&&(n=t.key),null!=t.name&&(o=t.name)}return"function"==typeof e?e(t,l||[],C):{vtag:e,vchildren:l,vtext:void 0,vattrs:t,vkey:n,vname:o,t:void 0,n:!1}}const l="$",i={},s={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},a=(t,n,o,i)=>{let s=o.e+l,a=o[s];if((2===o.o||1===o.o&&!t.i.l)&&(i["s-sc"]=a?e(o,i.mode):e(o)),a){let e=n.s.head;if(n.l)if(1===o.o)e=i.shadowRoot;else{const t=i.getRootNode();t.host&&(e=t)}let l=t.a.get(e);if(l||t.a.set(e,l={}),!l[s]){let t;{t=a.content.cloneNode(!0),l[s]=!0;const o=e.querySelectorAll("[data-styles]");n.r(e,t,o.length&&o[o.length-1].nextSibling||e.firstChild)}}}},f=e=>null!=e,u=e=>e.toLowerCase(),p=()=>{},b=(e,t,n,o="boolean"==typeof n,l)=>{l=t!==(t=t.replace(/^xlink\:?/,"")),null==n||o&&(!n||"false"===n)?l?e.removeAttributeNS(m,u(t)):e.removeAttribute(t):"function"!=typeof n&&(n=o?"":n.toString(),l?e.setAttributeNS(m,u(t),n):e.setAttribute(t,n))},m="http://www.w3.org/1999/xlink",v=(e,t,n,o,l,i,s)=>{if("class"!==n||i)if("style"===n){for(const e in o)l&&null!=l[e]||(/-/.test(e)?t.style.removeProperty(e):t.style[e]="");for(const e in l)o&&l[e]===o[e]||(/-/.test(e)?t.style.setProperty(e,l[e]):t.style[e]=l[e])}else if("o"!==n[0]||"n"!==n[1]||!/[A-Z]/.test(n[2])||n in t)if("list"!==n&&"type"!==n&&!i&&(n in t||-1!==["object","function"].indexOf(typeof l)&&null!==l)){const o=e.c(t);o&&o.f&&o.f[n]?(M(t,n,l),s&&o.f[n].u&&b(t,o.f[n].p,l,4===o.f[n].d)):"ref"!==n&&(M(t,n,null==l?"":l),null!=l&&!1!==l||e.i.b(t,n))}else null!=l&&"key"!==n?b(t,n,l):(i||e.i.m(t,n)&&(null==l||!1===l))&&e.i.b(t,n);else n=u(n)in t?u(n.substring(2)):u(n[2])+n.substring(3),l?l!==o&&e.i.v(t,n,l):e.i.y(t,n);else if(o!==l){const e=y(o),n=y(l),i=e.filter(e=>!n.includes(e)),s=y(t.className).filter(e=>!i.includes(e)),a=n.filter(t=>!e.includes(t)&&!s.includes(t));s.push(...a),t.className=s.join(" ")}},y=e=>null==e||""===e?[]:e.trim().split(/\s+/),M=(e,t,n)=>{try{e[t]=n}catch(e){}},$=(e,t,n,o,l)=>{const s=11===n.t.nodeType&&n.t.host?n.t.host:n.t,a=t&&t.vattrs||i,r=n.vattrs||i;for(l in a)r&&null!=r[l]||null==a[l]||v(e,s,l,a[l],void 0,o,n.n);for(l in r)l in a&&r[l]===("value"===l||"checked"===l?s[l]:a[l])||v(e,s,l,a[l],r[l],o,n.n)};let g=!1;const k=(e,t)=>{e&&(e.vattrs&&e.vattrs.ref&&e.vattrs.ref(t?null:e.t),e.vchildren&&e.vchildren.forEach(e=>{k(e,t)}))},j=[],C={forEach:(e,t)=>e.forEach(t),map:(e,t)=>e.map(t)},O=(e,t,n)=>{const[o,l,,i,s,a]=e,r={color:{p:"color"}};if(i)for(t=0;t<i.length;t++)r[(n=i[t])[0]]={w:n[1],u:!!n[2],p:"string"==typeof n[3]?n[3]:n[3]?n[0]:0,d:n[4]};return{e:o,M:l,f:Object.assign({},r),o:s,g:a?a.map(W):void 0}},W=e=>({k:e[0],j:e[1],C:!!e[2],O:!!e[3],W:!!e[4]}),N=(e,t)=>f(t)&&"object"!=typeof t&&"function"!=typeof t?e===Boolean||4===e?"false"!==t&&(""===t||!!t):e===Number||8===e?parseFloat(t):e===String||2===e?t.toString():t:t,S=(e,t,n)=>{e.N.add(t),e.S.has(t)||(e.S.set(t,!0),e.x?e.queue.write(()=>E(e,t,n)):e.queue.tick(()=>E(e,t,n)))},E=async(e,n,l,i,s,a)=>{if(e.S.delete(n),!e.A.has(n)){if(s=e.T.get(n)){if(s)try{s.componentWillUpdate&&await s.componentWillUpdate()}catch(t){e.R(t,5,n)}}else{if((a=e.L.get(n))&&!a["s-rn"])return void(a["s-rc"]=a["s-rc"]||[]).push(()=>{E(e,n,l)});if(s=D(e,n,e.D.get(n),l))try{s.componentWillLoad&&await s.componentWillLoad()}catch(t){e.R(t,3,n)}}((e,n,l,i)=>{try{const s=n.q.host,a=n.q.encapsulation,r="shadow"===a&&e.i.l;let c,f=l;if(c=((e,t,n)=>(e&&Object.keys(e).forEach(o=>{e[o].reflectToAttr&&((n=n||{})[o]=t[o])}),n))(n.q.properties,i),r&&(f=l.shadowRoot),!l["s-rn"]){e.B(e,e.i,n,l);const o=l["s-sc"];o&&(e.i.I(l,t(o,!0)),"scoped"===a&&e.i.I(l,t(o)))}if(i.render||i.hostData||s||c){e.P=!0;const t=i.render&&i.render();let n;c&&(n=n?Object.assign(n,c):c),e.P=!1;const s=o(null,n,t),u=e.F.get(l)||{};u.t=f,s.n=!0,e.F.set(l,e.render(l,u,s,r,a))}l["s-rn"]=!0,l["s-rc"]&&(l["s-rc"].forEach(e=>e()),l["s-rc"]=null)}catch(t){e.P=!1,e.R(t,8,l,!0)}})(e,e.c(n),n,s),n["s-init"]()}},A=(e,t,n,o,l,i,s,a,r)=>{if(t.type||t.state){const c=e.H.get(n);t.state||(!t.attr||void 0!==c[l]&&""!==c[l]||(a=i&&i.Q)&&f(r=a[t.attr])&&(c[l]=N(t.type,r)),n.hasOwnProperty(l)&&(void 0===c[l]&&(c[l]=N(t.type,n[l])),"mode"!==l&&delete n[l])),o.hasOwnProperty(l)&&void 0===c[l]&&(c[l]=o[l]),L(o,l,function c(t){return(t=e.H.get(e.U.get(this)))&&t[l]},function u(n,o){(o=e.U.get(this))&&(t.state||t.mutable)&&T(e,o,l,n,s)})}else t.elementRef?R(o,l,n):t.method&&R(n,l,o[l].bind(o))},T=(e,t,n,o,l,i,s)=>{(s=e.H.get(t))||e.H.set(t,s={}),o!==s[n]&&(s[n]=o,e.T.get(t)&&!e.P&&t["s-rn"]&&S(e,t,l))},R=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,value:n})},L=(e,t,n,o)=>{Object.defineProperty(e,t,{configurable:!0,get:n,set:o})},D=(e,t,n,o,l,i,s,a)=>{try{l=new(i=e.c(t).q),((e,t,n,o,l,i)=>{e.U.set(o,n),e.H.has(n)||e.H.set(n,{}),Object.entries(Object.assign({color:{type:String}},t.properties,{mode:{type:String}})).forEach(([t,s])=>{A(e,s,n,o,t,l,i)})})(e,i,t,l,n,o),function r(e,t,n){if(t){const o=e.U.get(n);t.forEach(t=>{n[t.method]={emit:n=>e.Z(o,t.name,{bubbles:t.bubbles,composed:t.composed,cancelable:t.cancelable,detail:n})}})}}(e,i.events,l);try{if(s=e.z.get(t)){for(a=0;a<s.length;a+=2)l[s[a]](s[a+1]);e.z.delete(t)}}catch(n){e.R(n,2,t)}}catch(n){l={},e.R(n,7,t,!0)}return e.T.set(t,l),l},q=(e,t,n,o,l,i)=>{if(e.N.delete(t),(l=e.L.get(t))&&((o=l["s-ld"])&&((n=o.indexOf(t))>-1&&o.splice(n,1),o.length||l["s-init"]&&l["s-init"]()),e.L.delete(t)),e.G.length&&!e.N.size)for(;i=e.G.shift();)i()},B=(e,t,n,o)=>{t.forEach(([t,l])=>{const i=l.w;3&i?L(n,t,function n(){return(e.H.get(this)||{})[t]},function n(i){T(e,this,t,N(l.d,i),o)}):32===i&&R(n,t,p)})},I=(e,t,n,o,l)=>{if(n.connectedCallback=function(){((e,t,n)=>{e.J.has(n)||(e.J.set(n,!0),function o(e,t){const n=e.c(t);n.g&&n.g.forEach(n=>{n.C||e.i.v(t,n.k,function o(e,t,n,l){return o=>{(l=e.T.get(t))?l[n](o):((l=e.z.get(t)||[]).push(n,o),e.z.set(t,l))}}(e,t,n.j),n.W,n.O)})}(e,n)),e.A.delete(n),e.K.has(n)||(e.V=!0,e.N.add(n),e.K.set(n,!0),((e,t,n)=>{for(n=t;n=e.i.X(n);)if(e.Y(n)){e._.has(t)||(e.L.set(t,n),(n["s-ld"]=n["s-ld"]||[]).push(t));break}})(e,n),e.queue.tick(()=>{e.D.set(n,((e,t,n,o,l)=>(n.mode||(n.mode=e.ee(n)),n["s-cr"]||e.te(n,"ssrv")||e.l&&1===t.o||(n["s-cr"]=e.ne(""),n["s-cr"]["s-cn"]=!0,e.r(n,n["s-cr"],e.oe(n)[0])),1===t.o&&e.l&&!n.shadowRoot&&e.le(n,{mode:"open"}),o={Q:{}},t.f&&Object.keys(t.f).forEach(i=>{(l=t.f[i].p)&&(o.Q[l]=e.te(n,l))}),o))(e.i,t,n)),e.ie(t,n)}))})(e,t,this)},n.disconnectedCallback=function(){((e,t)=>{if(!e.se&&((e,t)=>{for(;t;){if(!e.ae(t))return 9!==e.re(t);t=e.ae(t)}})(e.i,t)){e.A.set(t,!0),q(e,t),k(e.F.get(t),!0),e.i.y(t),e.J.delete(t);{const n=e.T.get(t);n&&n.componentDidUnload&&n.componentDidUnload()}[e.L,e.ce,e.D].forEach(e=>e.delete(t))}})(e,this)},n["s-init"]=function(){((e,t,n,o,l,i,s)=>{if((l=e.T.get(t))&&!e.A.has(t)&&(!t["s-ld"]||!t["s-ld"].length)){e._.set(t,!0),(s=e.fe.has(t))||(e.fe.set(t,!0),t["s-ld"]=void 0,e.i.I(t,n));try{k(e.F.get(t)),(i=e.ce.get(t))&&(i.forEach(e=>e(t)),e.ce.delete(t)),!s&&l.componentDidLoad?l.componentDidLoad():s&&l.componentDidUpdate&&l.componentDidUpdate()}catch(n){e.R(n,4,t)}q(e,t)}})(e,this,o)},n.forceUpdate=function(){S(e,this,l)},t.f){const o=Object.entries(t.f);{let e={};o.forEach(([t,{p:n}])=>{n&&(e[n]=t)}),e=Object.assign({},e),n.attributeChangedCallback=function(t,n,o){(function l(e,t,n,o){const l=e[u(n)];l&&(t[l]=o)})(e,this,t,o)}}B(e,o,n,l)}};((e,t,n,i,r,c,p)=>{const d=n.performance,b={html:{}},m=n[e]=n[e]||{},v=((e,t,n)=>{const o=new WeakMap,l={s:n,l:!!n.documentElement.attachShadow,ue:!1,re:e=>e.nodeType,pe:e=>n.createElement(e),de:(e,t)=>n.createElementNS(e,t),ne:e=>n.createTextNode(e),be:e=>n.createComment(e),r:(e,t,n)=>e.insertBefore(t,n),me:e=>e.remove(),ve:(e,t)=>e.appendChild(t),I:(e,t)=>{e.classList.add(t)},oe:e=>e.childNodes,ae:e=>e.parentNode,he:e=>e.nextSibling,ye:e=>e.previousSibling,we:e=>u(e.nodeName),Me:e=>e.textContent,$e:(e,t)=>e.textContent=t,te:(e,t)=>e.getAttribute(t),ge:(e,t,n)=>e.setAttribute(t,n),b:(e,t)=>e.removeAttribute(t),m:(e,t)=>e.hasAttribute(t),ee:t=>t.getAttribute("mode")||(e.Context||{}).mode,ke:(e,o)=>"child"===o?e.firstElementChild:"parent"===o?l.X(e):"body"===o?n.body:"document"===o?n:"window"===o?t:e,v:(t,n,i,a,r,c,f,u,p)=>{let d=t,b=i,m=o.get(t);p=n,m&&m[p]&&m[p](),"string"==typeof c?d=l.ke(t,c):"object"==typeof c?d=c:(u=n.split(":")).length>1&&(d=l.ke(t,u[0]),n=u[1]),d&&((u=n.split(".")).length>1&&(n=u[0],b=(e=>{e.keyCode===s[u[1]]&&i(e)})),f=l.ue?{capture:!!a,passive:!!r}:!!a,e.ael(d,n,b,f),m||o.set(t,m={}),m[p]=(()=>{d&&e.rel(d,n,b,f),m[p]=null}))},y:(e,t,n)=>{(n=o.get(e))&&(t?n[t]&&n[t]():Object.keys(n).forEach(e=>{n[e]&&n[e]()}))},je:(e,n,o,l)=>(l=new t.CustomEvent(n,o),e&&e.dispatchEvent(l),l),X:(e,t)=>(t=l.ae(e))&&11===l.re(t)?t.host:t,Ce:(e,t,n,o)=>e.setAttributeNS(t,n,o),le:(e,t)=>e.attachShadow(t)};e.ael||(e.ael=((e,t,n,o)=>e.addEventListener(t,n,o)),e.rel=((e,t,n,o)=>e.removeEventListener(t,n,o)));try{t.addEventListener("e",null,Object.defineProperty({},"passive",{get:()=>l.ue=!0}))}catch(e){}return l})(m,n,i),h=v.s.documentElement,y=n["s-defined"]=n["s-defined"]||{},w=(e,t)=>{n.customElements.get(e.e)||(I(M,b[e.e]=e,t.prototype,c,d),t.observedAttributes=Object.values(e.f).map(e=>e.p).filter(e=>!!e),n.customElements.define(e.e,t))},M={i:v,Oe:w,c:e=>b[v.we(e)],We:e=>t[e],isClient:!0,Y:e=>!(!y[v.we(e)]&&!M.c(e)),R:(e,t,n)=>console.error(e,t,n&&n.tagName),queue:t.queue=((e,t)=>{{let n=0,o=!1;const l=()=>t.performance.now(),i=!1!==e.asyncQueue,s=Promise.resolve(),a=[],r=[],c=[],f=[],u=t=>n=>{t.push(n),o||(o=!0,e.raf(b))},p=e=>{for(let t=0;t<e.length;t++)try{e[t](l())}catch(e){console.error(e)}e.length=0},d=(e,t)=>{let n,o=0;for(;o<e.length&&(n=l())<t;)try{e[o++](n)}catch(e){console.error(e)}o===e.length?e.length=0:0!==o&&e.splice(0,o)},b=()=>{n++,p(r);const t=i?l()+7*Math.ceil(n*(1/22)):Infinity;d(c,t),d(f,t),c.length>0&&(f.push(...c),c.length=0),(o=r.length+c.length+f.length>0)?e.raf(b):n=0};return e.raf||(e.raf=t.requestAnimationFrame.bind(t)),{tick(e){a.push(e),1===a.length&&s.then(()=>p(a))},read:u(r),write:u(c)}}})(m,n),ie:(e,t)=>{{const n=e.M,o=!v.l;let i=r+n+(o?".sc":"")+".entry.js";import(i).then(n=>{try{e.q=n[(e=>u(e).split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(""))(e.e)],function o(e,t,n,i,s){if(i){const n=t.e+(s||l);if(!t[n]){const o=e.pe("template");t[n]=o,o.innerHTML=`<style>${i}</style>`,e.ve(e.s.head,o)}}}(v,e,e.o,e.q.style,e.q.styleMode),S(M,t,d)}catch(t){console.error(t),e.q=class{}}},e=>console.error(e,i))}},P:!1,x:!1,se:!1,B:a,L:new WeakMap,a:new WeakMap,K:new WeakMap,J:new WeakMap,fe:new WeakMap,_:new WeakMap,U:new WeakMap,D:new WeakMap,T:new WeakMap,A:new WeakMap,S:new WeakMap,ce:new WeakMap,z:new WeakMap,F:new WeakMap,H:new WeakMap,N:new Set,G:[]};return t.isServer=t.isPrerender=!(t.isClient=!0),t.window=n,t.location=n.location,t.document=i,t.resourcesUrl=t.publicPath=r,t.enableListener=((e,t,n,o,l)=>(function i(e,t,n,o,l,s){if(t){const i=e.U.get(t),a=e.c(i);if(a&&a.g)if(o){const o=a.g.find(e=>e.k===n);o&&e.i.v(i,n,e=>t[o.j](e),o.W,void 0===s?o.O:!!s,l)}else e.i.y(i,n)}})(M,e,t,n,o,l)),M.Z=t.emit=((e,n,o)=>v.je(e,t.eventNameFn?t.eventNameFn(n):n,o)),m.h=o,m.Context=t,m.onReady=(()=>new Promise(e=>M.queue.write(()=>M.N.size?M.G.push(e):e()))),M.render=((e,t)=>{let n,o,l,i,s,a,r;const c=(l,p,d,b,m,v,h,y,w)=>{if(y=p.vchildren[d],n||(i=!0,"slot"===y.vtag&&(o&&t.I(b,o+"-s"),y.vchildren?y.Ne=!0:y.Se=!0)),f(y.vtext))y.t=t.ne(y.vtext);else if(y.Se)y.t=t.ne("");else{if(v=y.t=g||"svg"===y.vtag?t.de("http://www.w3.org/2000/svg",y.vtag):t.pe(y.Ne?"slot-fb":y.vtag),e.Y(v)&&e._.delete(r),g="svg"===y.vtag||"foreignObject"!==y.vtag&&g,$(e,null,y,g),f(o)&&v["s-si"]!==o&&t.I(v,v["s-si"]=o),y.vchildren)for(m=0;m<y.vchildren.length;++m)(h=c(l,y,m,v))&&t.ve(v,h);"svg"===y.vtag&&(g=!1)}return y.t["s-hn"]=a,(y.Ne||y.Se)&&(y.t["s-sr"]=!0,y.t["s-cr"]=s,y.t["s-sn"]=y.vname||"",(w=l&&l.vchildren&&l.vchildren[d])&&w.vtag===y.vtag&&l.t&&u(l.t)),y.t},u=(n,o,l,s)=>{e.se=!0;const r=t.oe(n);for(l=r.length-1;l>=0;l--)(s=r[l])["s-hn"]!==a&&s["s-ol"]&&(t.me(s),t.r(v(s),s,m(s)),t.me(s["s-ol"]),s["s-ol"]=null,i=!0),o&&u(s,o);e.se=!1},p=(e,n,o,l,i,s,r,u)=>{const p=e["s-cr"];for((r=p&&t.ae(p)||e).shadowRoot&&t.we(r)===a&&(r=r.shadowRoot);i<=s;++i)l[i]&&(u=f(l[i].vtext)?t.ne(l[i].vtext):c(null,o,i,e))&&(l[i].t=u,t.r(r,u,m(n)))},d=(e,n,o,i)=>{for(;n<=o;++n)f(e[n])&&(i=e[n].t,l=!0,i["s-ol"]?t.me(i["s-ol"]):u(i,!0),t.me(i))},b=(e,t)=>e.vtag===t.vtag&&e.vkey===t.vkey&&("slot"!==e.vtag||e.vname===t.vname),m=e=>e&&e["s-ol"]?e["s-ol"]:e,v=e=>t.ae(e["s-ol"]?e["s-ol"]:e),h=(n,o,l)=>{const i=o.t=n.t,s=n.vchildren,a=o.vchildren;g=o.t&&f(t.X(o.t))&&void 0!==o.t.ownerSVGElement,g="svg"===o.vtag||"foreignObject"!==o.vtag&&g,f(o.vtext)?(l=i["s-cr"])?t.$e(t.ae(l),o.vtext):n.vtext!==o.vtext&&t.$e(i,o.vtext):("slot"!==o.vtag&&$(e,n,o,g),f(s)&&f(a)?((e,n,o,l,i,s,a,r)=>{let y=0,w=0,M=n.length-1,$=n[0],g=n[M],k=l.length-1,j=l[0],C=l[k];for(;y<=M&&w<=k;)if(null==$)$=n[++y];else if(null==g)g=n[--M];else if(null==j)j=l[++w];else if(null==C)C=l[--k];else if(b($,j))h($,j),$=n[++y],j=l[++w];else if(b(g,C))h(g,C),g=n[--M],C=l[--k];else if(b($,C))"slot"!==$.vtag&&"slot"!==C.vtag||u(t.ae($.t)),h($,C),t.r(e,$.t,t.he(g.t)),$=n[++y],C=l[--k];else if(b(g,j))"slot"!==$.vtag&&"slot"!==C.vtag||u(t.ae(g.t)),h(g,j),t.r(e,g.t,$.t),g=n[--M],j=l[++w];else{for(i=null,s=y;s<=M;++s)if(n[s]&&f(n[s].vkey)&&n[s].vkey===j.vkey){i=s;break}f(i)?((r=n[i]).vtag!==j.vtag?a=c(n&&n[w],o,i,e):(h(r,j),n[i]=void 0,a=r.t),j=l[++w]):(a=c(n&&n[w],o,w,e),j=l[++w]),a&&t.r(v($.t),a,m($.t))}y>M?p(e,null==l[k+1]?null:l[k+1].t,o,l,w,k):w>k&&d(n,y,M)})(i,s,o,a):f(a)?(f(n.vtext)&&t.$e(i,""),p(i,null,o,a,0,a.length-1)):f(s)&&d(s,0,s.length-1)),g&&"svg"===o.vtag&&(g=!1)},y=(e,n,o,l,i,s,a,r)=>{for(l=0,i=(o=t.oe(e)).length;l<i;l++)if(n=o[l],1===t.re(n)){if(n["s-sr"])for(a=n["s-sn"],n.hidden=!1,s=0;s<i;s++)if(o[s]["s-hn"]!==n["s-hn"])if(r=t.re(o[s]),""!==a){if(1===r&&a===t.te(o[s],"slot")){n.hidden=!0;break}}else if(1===r||3===r&&""!==t.Me(o[s]).trim()){n.hidden=!0;break}y(n)}},w=[],M=(e,n,o,i,s,a,r,c,f,u)=>{for(s=0,a=(n=t.oe(e)).length;s<a;s++){if((o=n[s])["s-sr"]&&(i=o["s-cr"]))for(c=t.oe(t.ae(i)),f=o["s-sn"],r=c.length-1;r>=0;r--)(i=c[r])["s-cn"]||i["s-nr"]||i["s-hn"]===o["s-hn"]||((3===(u=t.re(i))||8===u)&&""===f||1===u&&null===t.te(i,"slot")&&""===f||1===u&&t.te(i,"slot")===f)&&(w.some(e=>e.Ee===i)||(l=!0,i["s-sn"]=f,w.push({xe:o,Ee:i})));1===t.re(o)&&M(o)}};return(c,f,u,p,d,b,m,v,$,g,k,j)=>{if(r=c,a=t.we(r),s=r["s-cr"],n=p,o=r["s-sc"],i=l=!1,h(f,u),i){for(M(u.t),m=0;m<w.length;m++)(v=w[m]).Ee["s-ol"]||(($=t.ne(""))["s-nr"]=v.Ee,t.r(t.ae(v.Ee),v.Ee["s-ol"]=$,v.Ee));for(e.se=!0,m=0;m<w.length;m++){for(v=w[m],k=t.ae(v.xe),j=t.he(v.xe),$=v.Ee["s-ol"];$=t.ye($);)if((g=$["s-nr"])&&g&&g["s-sn"]===v.Ee["s-sn"]&&k===t.ae(g)&&(g=t.he(g))&&g&&!g["s-nr"]){j=g;break}(!j&&k!==t.ae(v.Ee)||t.he(v.Ee)!==j)&&v.Ee!==j&&(t.me(v.Ee),t.r(k,v.Ee,j))}e.se=!1}return l&&y(u.t),w.length=0,u}})(M,v),h["s-ld"]=[],h["s-rn"]=!0,h["s-init"]=(()=>{M._.set(h,m.loaded=M.x=!0),v.je(n,"appload",{detail:{namespace:e}})}),p.map(O).forEach(e=>w(e,class extends HTMLElement{})),M.V||h["s-init"](),((e,t,n,o,l,i)=>{if(t.componentOnReady=((t,n)=>{if(!t.nodeName.includes("-"))return n(null),!1;const o=e.c(t);if(o)if(e._.has(t))n(t);else{const o=e.ce.get(t)||[];o.push(n),e.ce.set(t,o)}return!!o}),l){for(i=l.length-1;i>=0;i--)t.componentOnReady(l[i][0],l[i][1])&&l.splice(i,1);for(i=0;i<o.length;i++)if(!n[o[i]].componentOnReady)return;for(i=0;i<l.length;i++)l[i][1](null);l.length=0}})(M,m,n,n["s-apps"],n["s-cr"]),m.initialized=!0,M})(n,x,w,d,r,h,c);
})(window,document,{},"OrangoDemoTools","hydrated",[["o-demo-bar","ibfgv1ib",1,[["backgroundColor",1,0,"background-color",2],["caseOptionSelected",2,0,"case-option-selected",8],["device",2,0,1,2],["deviceEmulate",2,0,"device-emulate",4],["deviceSize",2,0,"device-size",2],["el",64],["events",1,0,1,2],["name",1,0,1,2],["pattern",2,0,1,4]],1,[["code-editor-changed","codeEditorChangedHandler"],["selectedCaseChanged","selectedCaseChangedHandler"],["toolbarButtonClicked","toolbarButtonClickedHandler"],["resizeButtonClicked","resizeButtonClickedHandler"]]],["o-demo-bar-buttons","ibfgv1ib",1,0,1],["o-demo-bar-select","ibfgv1ib",1,[["el",64],["options",1,0,1,1]],1],["o-demo-bar-toolbar","ibfgv1ib",1,[["el",64],["name",1,0,1,2],["options",1,0,1,1]],1],["o-demo-case","gwhkzfcf",0,[["name",1,0,1,2]],1],["o-demo-devices","ibfgv1ib",1,[["el",64],["orientation",1,0,1,2],["selectedDevice",16]],1],["o-demo-fab","ibfgv1ib",1,[["el",64]],1],["o-demo-modal","qepu6itt",1,[["closeDialog",32],["code",1,0,1,1],["el",64],["open",2,1,1,4],["openDialog",32]],1],["o-demo-resizer","ibfgv1ib",1,[["el",64],["setActiveViewPort",32],["size",1,0,1,2],["viewport",1,0,1,2]],1],["o-demo-snackbar","ibfgv1ib",1,[["el",64],["events",1,0,1,1]],1]]);