import{_ as u}from"./app.c0ca27e0.js";import{f as i,I as f,p,o as r,b as s,d as o,t as d,i as l,h as _,F as h}from"./vendor.b3517e51.js";const x={class:"flex flex-col justify-start items-start gap-2 mt-4 mb-8"},T=["innerHTML"],k=i({props:{frontmatter:null,inner:null},setup(t){const e=t,n=f();return p({title:`${e.frontmatter.title} | Pak`,meta:[{name:"description",content:n.meta.excerpt}],link:[{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css",integrity:"sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET",crossorigin:"anonymous"}]}),(c,a)=>{const m=u;return r(),s(h,null,[o("header",x,[o("h1",null,d(e.frontmatter.title),1),l(m,{article:_(n).meta},null,8,["article"])]),o("section",{id:"md",innerHTML:t.inner},null,8,T)],64)}}}),H={key:0,class:"text-left"},y=["innerHTML"],B=i({props:{frontmatter:null,inner:null},setup(t){const e=t;return(n,c)=>{const a=k;return e.frontmatter.title?(r(),s("article",H,[l(a,{frontmatter:e.frontmatter,inner:t.inner},null,8,["frontmatter","inner"])])):(r(),s("div",{key:1,innerHTML:t.inner},null,8,y))}}});export{B as _};
