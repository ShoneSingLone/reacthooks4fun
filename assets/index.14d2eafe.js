var x=Object.defineProperty;var b=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var y=(e,t,r)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t)=>{for(var r in t||(t={}))v.call(t,r)&&y(e,r,t[r]);if(b)for(var r of b(t))B.call(t,r)&&y(e,r,t[r]);return e};import{r as d,_ as O,j as f,B as h,a as c,R as C,b as M}from"./vendor.a4c86f22.js";const N=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}};N();const j=e=>!!(e||e===0||e===!1);function g(e){const[t,r]=d.exports.useState(e),s={get:(o,a)=>{const i=o[a];return O.isPlainObject(i)?new Proxy(i,s):i},set:function(o,a,i,L){return o[a]=i,r(Object.assign({},t)),!0}};return new Proxy(t,s)}const A={};function p(e,t){return e&&j(t)&&(A[e]=t),A[e]}let u={a1:0,b1:{a2:0,b2:{a3:0,b3:""}}};function l(){return u=g(u),u}l.actions={addCount(){u.b1.b2.a3++}};l.mutations={addCount(){setTimeout(()=>{u.b1.b2.a3++},1e3*2)}};var S=e=>{const t=e.async?l.mutations.addCount:l.actions.addCount,r=p("StateApp");d.exports.useEffect(()=>{console.log("MyButton re-rendered",r.b1.b2.a3)},[r]);const s=e.async?"async":"sync";return f(h,{type:"primary",onClick:t,children:[s," state count is: ",r.b1.b2.a3]})},P=()=>{const e=p("StateApp");return d.exports.useEffect(()=>{console.log("MyButton2 re-rendered")},[e]),c(h,{children:e.b1.b2.a3})};function E(){const e=l();p("StateApp",e);const t=g({count:0}),r={value:e.b1.b2.b3,style:{color:"red",width:"100px"},onInput:s=>e.b1.b2.b3=s.currentTarget.value};return d.exports.useEffect(()=>{console.log(e.b1.b2.b3)}),c("div",{className:"App",children:f("header",{className:"App-header",children:[c("button",{onClick:()=>t.count++,children:t.count}),c("input",m({},r)),c(S,{async:!1}),c(S,{async:!0}),f("h1",{className:"demo-title",children:[JSON.stringify(p("StateApp")),"StateApp.b1.b2.a3: ",e.b1.b2.a3]}),c(P,{})]})})}C.render(c(M.StrictMode,{children:c(E,{})}),document.getElementById("root"));
