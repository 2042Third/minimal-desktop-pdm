import{t as L,a as I,c as Ce}from"../chunks/CpkR0JiJ.js";import{Y as rt,b as st,i as we,h as Y,Z as lt,d as nt,D as A,_ as it,H as ot,g as Ne,j as ke,n as le,$ as ut,k as Je,l as Ke,m as vt,a0 as Te,a1 as Ue,I as Le,a2 as Me,N as ct,B as He,a3 as Se,a4 as dt,a5 as ft,a6 as _t,a7 as yt,a8 as Ie,a9 as ht,aa as pt,L as mt,ab as We,v as bt,ac as xt,p as qt,c as b,s as $,t as X,a as Et,u as Q,r as _,f as De,F as Fe,ad as gt}from"../chunks/Bo0lOMDE.js";import{d as wt,r as Qe,s as ne,e as kt}from"../chunks/Cmbyf9Qi.js";import{i as ie,b as Tt}from"../chunks/CfXxC5un.js";import{Q as zt,b as Oe,E as Be,a as St,G as It,s as _e}from"../chunks/D9pl3F9z.js";import{s as Z,a as Rt,b as oe,p as P,c as me}from"../chunks/CBE6O7iT.js";import{o as $t}from"../chunks/CgmrDAx4.js";import{w as ve,d as At}from"../chunks/B1dp9kIC.js";function ye(s,e){return e}function Ct(s,e,t,u){for(var r=[],v=e.length,d=0;d<v;d++)dt(e[d].e,r,!0);var p=v>0&&r.length===0&&t!==null;if(p){var h=t.parentNode;ft(h),h.append(t),u.clear(),O(s,e[0].prev,e[v-1].next)}_t(r,()=>{for(var x=0;x<v;x++){var f=e[x];p||(u.delete(f.k),O(s,f.prev,f.next)),yt(f.e,!p)}})}function he(s,e,t,u,r,v=null){var d=s,p={items:new Map,first:null},h=(e&We)!==0;if(h){var x=s;d=Y?we(lt(x)):x.appendChild(rt())}Y&&nt();var f=null,R=!1,n=it(()=>{var c=t();return mt(c)?c:c==null?[]:Ue(c)});st(()=>{var c=A(n),a=c.length;if(R&&a===0)return;R=a===0;let E=!1;if(Y){var y=d.data===ot;y!==(a===0)&&(d=Ne(),we(d),ke(!1),E=!0)}if(Y){for(var q=null,g,m=0;m<a;m++){if(le.nodeType===8&&le.data===ut){d=le,E=!0,ke(!1);break}var l=c[m],o=u(l,m);g=Xe(le,p,q,null,l,o,m,r,e,t),p.items.set(o,g),q=g}a>0&&we(Ne())}Y||Nt(c,p,d,r,e,u,t),v!==null&&(a===0?f?Je(f):f=Ke(()=>v(d)):f!==null&&vt(f,()=>{f=null})),E&&ke(!0),A(n)}),Y&&(d=le)}function Nt(s,e,t,u,r,v,d){var te,de,ae,re;var p=(r&xt)!==0,h=(r&(Ie|Se))!==0,x=s.length,f=e.items,R=e.first,n=R,c,a=null,E,y=[],q=[],g,m,l,o;if(p)for(o=0;o<x;o+=1)g=s[o],m=v(g,o),l=f.get(m),l!==void 0&&((te=l.a)==null||te.measure(),(E??(E=new Set)).add(l));for(o=0;o<x;o+=1){if(g=s[o],m=v(g,o),l=f.get(m),l===void 0){var ce=n?n.e.nodes_start:t;a=Xe(ce,e,a,a===null?e.first:a.next,g,m,o,u,r,d),f.set(m,a),y=[],q=[],n=a.next;continue}if(h&&Lt(l,g,o,r),l.e.f&Te&&(Je(l.e),p&&((de=l.a)==null||de.unfix(),(E??(E=new Set)).delete(l))),l!==n){if(c!==void 0&&c.has(l)){if(y.length<q.length){var M=q[0],w;a=M.prev;var B=y[0],G=y[y.length-1];for(w=0;w<y.length;w+=1)Ve(y[w],M,t);for(w=0;w<q.length;w+=1)c.delete(q[w]);O(e,B.prev,G.next),O(e,a,B),O(e,G,M),n=M,a=G,o-=1,y=[],q=[]}else c.delete(l),Ve(l,n,t),O(e,l.prev,l.next),O(e,l,a===null?e.first:a.next),O(e,a,l),a=l;continue}for(y=[],q=[];n!==null&&n.k!==m;)n.e.f&Te||(c??(c=new Set)).add(n),q.push(n),n=n.next;if(n===null)continue;l=n}y.push(l),a=l,n=l.next}if(n!==null||c!==void 0){for(var H=c===void 0?[]:Ue(c);n!==null;)n.e.f&Te||H.push(n),n=n.next;var j=H.length;if(j>0){var ee=r&We&&x===0?t:null;if(p){for(o=0;o<j;o+=1)(ae=H[o].a)==null||ae.measure();for(o=0;o<j;o+=1)(re=H[o].a)==null||re.fix()}Ct(e,H,ee,f)}}p&&bt(()=>{var se;if(E!==void 0)for(l of E)(se=l.a)==null||se.apply()}),Le.first=e.first&&e.first.e,Le.last=a&&a.e}function Lt(s,e,t,u){u&Ie&&Me(s.v,e),u&Se?Me(s.i,t):s.i=t}function Xe(s,e,t,u,r,v,d,p,h,x){var f=(h&Ie)!==0,R=(h&ht)===0,n=f?R?ct(r):He(r):r,c=h&Se?He(d):d,a={i:c,v:n,k:v,a:null,e:null,prev:t,next:u};try{return a.e=Ke(()=>p(s,n,c,x),Y),a.e.prev=t&&t.e,a.e.next=u&&u.e,t===null?e.first=a:(t.next=a,t.e.next=a.e),u!==null&&(u.prev=a,u.e.prev=a.e),a}finally{}}function Ve(s,e,t){for(var u=s.next?s.next.e.nodes_start:t,r=e?e.e.nodes_start:t,v=s.e.nodes_start;v!==u;){var d=pt(v);r.before(v),v=d}}function O(s,e,t){e===null?s.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}const ze=ve({table:"",sql:""}),ue=ve(new zt),Ye=ve([]),Ge=ve(""),pe=ve({editing:!1,row:0,column:0,width:0,height:0,top:0,left:0});async function Mt(s,e,t,u){try{const r=await St(e(t().sql));console.log(r)}catch(r){me(ue,Q(u).error=r.message,Q(u))}}var Ht=(s,e)=>s.ctrlKey&&s.key==="Enter"&&e(),Dt=(s,e,t)=>e(A(t)),Ft=L('<li class="svelte-quzy97"> </li>'),Qt=L('<div class="error svelte-quzy97"> </div>'),Ot=L('<th class="svelte-quzy97"> </th>'),Bt=L('<td class="can-select-text svelte-quzy97"> </td>'),Vt=L("<tr></tr>"),Yt=(s,e,t)=>{s.key==="Enter"&&e(),s.key==="Escape"&&t()},Gt=L('<textarea class="cell-editor svelte-quzy97"></textarea>'),Jt=L('<div class="table-container svelte-quzy97"><table class="svelte-quzy97"><thead><tr></tr></thead><tbody></tbody></table> <!></div>'),Kt=L('<div class="query-results svelte-quzy97"><!></div>'),Ut=L('<div class="query-runner svelte-quzy97"><div class="container svelte-quzy97"><div class="left-panel svelte-quzy97"><div class="query-input svelte-quzy97"><textarea placeholder="Enter your SQL query..." class="svelte-quzy97"></textarea> <button class="svelte-quzy97">Execute Query</button> <button class="svelte-quzy97">Execute Statement</button> <button class="svelte-quzy97">Refresh</button></div> <div><h3 class="no-select">Database Name</h3> <p class="can-select-text"> </p></div> <div class="tables-list svelte-quzy97"><h3 class="svelte-quzy97">Available Tables</h3> <ul class="svelte-quzy97"></ul></div></div> <div class="results-panel svelte-quzy97"><!></div></div></div>');function ra(s,e){qt(e,!0);const[t,u]=Rt(),r=()=>Z(ue,"$results",t),v=()=>Z(ze,"$query",t),d=()=>Z(Ge,"$dbFile",t),p=()=>Z(Ye,"$tables",t),h=()=>Z(pe,"$editingCell",t),x=()=>Z(q,"$editorStyle",t),f=i=>i.trim().replace(/\n/g," ");async function R(){try{oe(ue,P(await Be(f(v().sql))))}catch(i){me(ue,Q(r).error=i.message,Q(r))}}async function n(){oe(Ge,P(await It()))}async function c(){try{const i=await Be("SELECT name FROM sqlite_master WHERE type='table';");oe(Ye,P(i.rows.map(k=>k[0])))}catch(i){console.error("Failed to load tables:",i)}}function a(i){oe(ze,P({table:i,sql:`SELECT rowid, * FROM ${i} LIMIT 100;`})),R()}let E=gt(""),y;const q=At(pe,i=>i.editing?`
            position: absolute;
            top: ${i.top}px;
            left: ${i.left}px;
            width: ${i.width}px;
            height: ${i.height}px;
        `:"");function g(i,k,C,J){const T=i.target.getBoundingClientRect(),z=y.getBoundingClientRect();Fe(E,P(J)),oe(pe,P({editing:!0,row:k,column:C,width:T.width,height:T.height,top:T.top-z.top+y.scrollTop,left:T.left-z.left+y.scrollLeft})),setTimeout(()=>{const D=document.querySelector(".cell-editor");D&&D.focus()},0)}function m(){me(pe,Q(h).editing=!1,Q(h))}async function l(){if(h().editing)try{const i=h().row,k=h().column,C=r().rows[i][0],J=r().columns[k]}catch(i){console.error("Failed to update:",i)}finally{m()}}$t(()=>{c(),n()});var o=Ut(),ce=b(o),M=b(ce),w=b(M),B=b(w);Qe(B),B.__keydown=[Ht,R];var G=$(B,2);G.__click=R;var H=$(G,2);H.__click=[Mt,f,v,r];var j=$(H,2);j.__click=c,_(w);var ee=$(w,2),te=$(b(ee),2),de=b(te,!0);_(te),_(ee);var ae=$(ee,2),re=$(b(ae),2);he(re,5,p,ye,(i,k)=>{var C=Ft();C.__click=[Dt,a,k];var J=b(C,!0);_(C),X(()=>ne(J,A(k))),I(i,C)}),_(re),_(ae),_(M);var se=$(M,2),Ze=b(se);{var Pe=i=>{var k=Kt(),C=b(k);{var J=T=>{var z=Qt(),D=b(z,!0);_(z),X(()=>ne(D,r().error)),I(T,z)},Re=T=>{var z=Jt(),D=b(z),be=b(D),$e=b(be);he($e,5,()=>r().columns,ye,(N,S,K)=>{var U=Ce(),xe=De(U);{var fe=F=>{var W=Ot(),qe=b(W,!0);_(W),X(()=>ne(qe,A(S))),I(F,W)};ie(xe,F=>{K!==0&&F(fe)})}I(N,U)}),_($e),_(be);var Ae=$(be);he(Ae,5,()=>r().rows,ye,(N,S,K)=>{var U=Vt();he(U,21,()=>A(S),ye,(xe,fe,F)=>{var W=Ce(),qe=De(W);{var tt=Ee=>{var V=Bt();_e(V,"data-row",K),_e(V,"data-col",F),V.__dblclick=ge=>g(ge,K,F,A(fe));var at=b(V,!0);_(V),X(ge=>{_e(V,"style",`--custom-contextmenu: dbTableMenu; --custom-contextmenu-data: ${ge??""}`),ne(at,A(fe))},[()=>JSON.stringify({table:v().table,rowid:A(S)[0],column:r().columns[F]})]),I(Ee,V)};ie(qe,Ee=>{F!==0&&Ee(tt)})}I(xe,W)}),_(U),I(N,U)}),_(Ae),_(D);var je=$(D,2);{var et=N=>{var S=Gt();Qe(S),S.__keydown=[Yt,l,m],X(()=>_e(S,"style",x())),kt("blur",S,l),Oe(S,()=>A(E),K=>Fe(E,K)),I(N,S)};ie(je,N=>{h().editing&&N(et)})}_(z),Tt(z,N=>y=N,()=>y),I(T,z)};ie(C,T=>{r().error?T(J):T(Re,!1)})}_(k),I(i,k)};ie(Ze,i=>{ue&&i(Pe)})}_(se),_(ce),_(o),X(()=>ne(de,d())),Oe(B,()=>v().sql,i=>me(ze,Q(v).sql=i,Q(v))),I(s,o),Et(),u()}wt(["keydown","click","dblclick"]);export{ra as component};
