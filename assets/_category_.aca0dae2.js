import{_ as m}from"./TheTaxonomy.0ba7c483.js";import{f as u,L as p,I as f,u as l,s,p as i,o as _,e as y,h as d}from"./vendor.68320762.js";import"./app.f9872afc.js";const x=u({setup(g){const{params:e}=p(f()),{t:n}=l(),c=t=>{var o;return t.frontmatter.category===((o=e.value)==null?void 0:o.category)},a=s(()=>n(`categories.${e.value.category}`,e.value.category));return i({title:s(()=>`${a.value} | Pak`),meta:[{name:"description",content:`Articles about ${a.value} on Pak`}]}),(t,o)=>{const r=m;return _(),y(r,{name:d(a),filter:c},null,8,["name"])}}});export{x as default};
