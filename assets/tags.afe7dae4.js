import{_ as r}from"./TheTaxonomy.ff482344.js";import{f as m,S as u,P as f,B as s,y as p,o as i,e as l,h as _}from"./vendor.a2cf0b24.js";import"./app.c3f6a6de.js";const $=m({setup(d){const{query:a}=u(f()),c=n=>{var t,e;return n.frontmatter.tags.includes((e=(t=a.value)==null?void 0:t.tag)!=null?e:"")},o=s(()=>`@${a.value.tag}`);return p({title:s(()=>`${o.value} | Pak`),meta:[{name:"description",content:`Articles with tag ${o.value} on Pak`}]}),(n,t)=>{const e=r;return i(),l(e,{name:`@${_(a).tag}`,filter:c},null,8,["name"])}}});export{$ as default};
