(self.webpackChunkpak=self.webpackChunkpak||[]).push([[616],{4696:function(e,t,n){"use strict";var r=n(7294);t.Z=function(e){var t=e.friend,n=t.name,a=t.avatar,i=t.link,c=t.blog;return r.createElement("div",{className:"card-friend"},r.createElement("a",{className:"card-friend-link",href:i,target:"_blank",rel:"noopener noreferrer"},r.createElement("img",{className:"card-friend-avatar",src:a})),r.createElement("a",{className:"card-friend-name",href:c,target:"_blank",rel:"noopener noreferrer"},n))}},2248:function(e,t,n){"use strict";var r=n(7294),a=n(5414),i=n(5444);function c(e){var t=e.type,n=e.description,c=e.lang,l=e.meta,o=e.title,s=(0,i.useStaticQuery)("63159454").site,m=n||s.siteMetadata.description,p=s.siteMetadata.title;return r.createElement(a.q,{htmlAttributes:{lang:c},title:o?o+" | "+p:p,meta:[{name:"description",content:m},{property:"og:title",content:o},{property:"og:description",content:m},{property:"og:type",content:t},{property:"og:site-name",content:p},{property:"og:image",content:(0,i.withPrefix)("/icon.png")}].concat(l)})}c.defaultProps={lang:"zh-Hans",meta:[],description:"",type:"webpage",title:""},t.Z=c},9943:function(e,t,n){"use strict";n.r(t);var r=n(7294),a=n(2248),i=n(4696);t.default=function(e){var t=e.data.issues.childYaml.friends;return r.createElement("div",null,r.createElement(a.Z,{title:"朋友"}),r.createElement("h1",{className:"title"},"朋友"),r.createElement("p",{className:"subtitle"},"申请添加友链在"," ",r.createElement("a",{href:"https://github.com/Yixuan-Wang/blog-contents/issues/2#issue-comment-box",target:"_blank",rel:"noopener noreferrer"},"Yixuan-Wang/blog-contents #2")," ","下评论即可🤗~！"),r.createElement("div",null,t.map((function(e){return r.createElement(i.Z,{key:e.name,friend:e})}))))}}}]);
//# sourceMappingURL=component---src-pages-friends-js-509a1c380ac9ced3bc9d.js.map