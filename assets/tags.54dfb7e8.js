import{_ as r}from"./TheTaxonomy.09706dee.js";import{f as m,S as u,P as p,B as s,y as i,o as l,e as f,h as _}from"./vendor.a2cf0b24.js";import"./app.77d166c7.js";const $=m({setup(d){const{query:a}=u(p()),c=n=>{var t,e;return n.frontmatter.tags.includes((e=(t=a.value)==null?void 0:t.tag)!=null?e:"")},o=s(()=>`@${a.value.tag}`);return i({title:s(()=>`${o.value} | Pak`),meta:[{name:"description",content:`Articles with tag ${o.value} on Pak`}]}),(n,t)=>{const e=r;return l(),f(e,{name:`@${_(a).tag}`,filter:c},null,8,["name"])}}});export{$ as default};
