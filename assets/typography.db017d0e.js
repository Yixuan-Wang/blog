import{f as d,o as a,b as s,d as e,k as b,u as V,r as y,t as r,h as n,i as u,w as p,F as i,l as g,j as w}from"./vendor.c722daca.js";import{u as v}from"./app.bc3e9037.js";const x={class:"flex flex-rows gap-2 items-center"},$=["checked"],C=d({props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(c){return(t,o)=>(a(),s("div",x,[e("input",{checked:c.modelValue,type:"checkbox",class:"h-4 w-4 text-acc border-dim rounded hover:ring-acc hover:ring-2",onInput:o[0]||(o[0]=m=>t.$emit("update:modelValue",!c.modelValue))},null,40,$),e("label",null,[b(t.$slots,"default")])]))}}),j={class:"mt-4 mb-8"},k={id:"md"},S=d({setup(c){const t=v(),{t:o}=V();return(m,B)=>{const h=C,_=y("ClientOnly");return a(),s(i,null,[e("h1",j,r(n(o)("typography.typography")),1),e("article",k,[u(_,null,{default:p(()=>[e("section",null,[e("h2",null,r(n(o)("typography.font")),1),e("h2",null,r(n(o)("typography.webfont")),1),(a(!0),s(i,null,g(Object.keys(n(t).webfont),l=>(a(),s("div",{key:l},[u(h,{modelValue:n(t).webfont[l],"onUpdate:modelValue":f=>n(t).webfont[l]=f},{default:p(()=>[w(r(l),1)]),_:2},1032,["modelValue","onUpdate:modelValue"])]))),128))])]),_:1})])],64)}}});export{S as default};
