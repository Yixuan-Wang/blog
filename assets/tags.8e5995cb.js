import{_ as r}from"./TheTaxonomy.8ce7dc54.js";import{d as u,D as m,g as l,B as s,u as i,o as f,f as p,e as _}from"./app.7d8243f6.js";const k=u({setup(d){const{query:t}=m(l()),c=n=>{var a,e;return n.frontmatter.tags.includes((e=(a=t.value)==null?void 0:a.tag)!=null?e:"")},o=s(()=>`@${t.value.tag}`);return i({title:s(()=>`${o.value} | Pak`),meta:[{name:"description",content:`Articles with tag ${o.value} on Pak`}]}),(n,a)=>{const e=r;return f(),p(e,{name:`@${_(t).tag}`,filter:c},null,8,["name"])}}});export{k as default};