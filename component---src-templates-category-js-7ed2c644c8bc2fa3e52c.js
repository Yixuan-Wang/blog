(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{EYWl:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),o=a("TJpk"),l=a("Wbzz");function c(e){var t=e.type,a=e.description,n=e.lang,c=e.meta,i=e.title,s=Object(l.useStaticQuery)("63159454").site,p=a||s.siteMetadata.description,m=s.siteMetadata.title;return r.a.createElement(o.Helmet,{htmlAttributes:{lang:n},title:i?i+" | "+m:m,meta:[{name:"description",content:p},{property:"og:title",content:i},{property:"og:description",content:p},{property:"og:type",content:t},{property:"og:site-name",content:m},{property:"og:image",content:Object(l.withPrefix)("/icon.png")}].concat(c)})}c.defaultProps={lang:"zh-Hans",meta:[],description:"",type:"webpage",title:""},t.a=c},Mdw5:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return c}));var n=a("q1tI"),r=a.n(n),o=a("Wbzz"),l=a("EYWl");function c(e){var t=e.pageContext,a=e.data,n=t.category,c=a.allMarkdownRemark.group,i=a.allMarkdownRemark.tags;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{title:n}),r.a.createElement("h1",null,n),r.a.createElement("section",null,r.a.createElement("ul",{className:"posts-group"},i.map((function(e){return r.a.createElement("li",{key:e,className:"posts-group-item"},r.a.createElement("a",{className:"posts-group-item-link",href:"#"+e,style:{color:"var(--clr-ac)"}},e))})))),c.map((function(e){var t=e.tag,a=e.nodes;return r.a.createElement("section",{key:t},r.a.createElement("h2",{id:t},t),r.a.createElement("ul",{className:"posts-group"},a.map((function(e){var t=e.frontmatter,a=e.fields;return r.a.createElement("li",{key:a.slug,className:"posts-group-item"},r.a.createElement(o.Link,{className:"posts-group-item-link",to:"../../"+a.slug},t.title))}))))})))}}}]);
//# sourceMappingURL=component---src-templates-category-js-7ed2c644c8bc2fa3e52c.js.map