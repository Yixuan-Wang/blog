import{d as f,g as y,u as p,n as _,_ as v,h as x,i as m,r as T,o as n,c as o,a as t,t as g,b as k,e as u,j as h,F as H,k as V,l as E}from"./app.9ecca7f5.js";const L={class:"text-left relative"},B={key:0,class:"flex flex-col justify-start items-start gap-2 mt-4 mb-8"},M={class:"lg:sticky lg:top-4"},w={key:0,id:"toc"},A={class:"flex flex-col gap-1"},I=["href"],b=t("div",{"i-mdi-circle-medium":""},null,-1),O=["innerHTML"],R=t("div",{m:"b-8"},null,-1),j=["innerHTML"],D=f({props:{frontmatter:null,inner:null},setup(a){const l=a,i=y();l.frontmatter.title&&p({title:`${l.frontmatter.title} | Pak`,meta:[{name:"description",content:i.meta.excerpt}],link:[{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css",integrity:"sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET",crossorigin:"anonymous"}]}),_(async()=>{const{unoify:s}=await v(()=>import("./uno.c4b92a81.js"),[]),e=await s(l.inner);x(e)}),m(()=>{if(i.hash){const s=i.hash.slice(1),e=document.getElementById(s);e&&_(()=>e.scrollIntoView())}});const c=T([]);return m(()=>{const e=Array.from(document.querySelectorAll("#md h2")).map(r=>[r.id,r.innerHTML]);c.push(...e)}),(s,e)=>{const r=E;return n(),o("article",L,[a.frontmatter.title?(n(),o("header",B,[t("h1",null,g(a.frontmatter.title),1),k(r,{article:u(i).meta},null,8,["article"])])):h("",!0),t("div",M,[u(c)?(n(),o("nav",w,[t("ul",A,[(n(!0),o(H,null,V(u(c),d=>(n(),o("li",{key:d[0],font:"serif bold",text:"hover:acc",class:"transition-lively"},[t("a",{href:`#${d[0]}`},[b,t("span",{innerHTML:d[1]},null,8,O)],8,I)]))),128))])])):h("",!0)]),R,t("article",{id:"md",innerHTML:a.inner},null,8,j)])}}});export{D as _};
