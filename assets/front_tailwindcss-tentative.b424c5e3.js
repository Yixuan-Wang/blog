import{_ as l}from"./TheArticle.8f9cde5d.js";import{o as p,f as o}from"./app.c736d4e5.js";const i="Tailwind CSS \u521D\u63A2",B="2021-02-04T00:00:00.000Z",F="comp",d=["frontend"],A=["CSS"],h={setup(e,{expose:n}){const s={title:"Tailwind CSS \u521D\u63A2",date:"2021-02-04T00:00:00.000Z",category:"comp",tags:["frontend"],keywords:["CSS"]};return n({frontmatter:s}),(c,t)=>{const a=l;return p(),o(a,{frontmatter:s,inner:`<div><p>Tailwind CSS \u4ECE\u771F\u9999\u5230\u653E\u5F03\u7684\u4E2A\u4EBA\u7ECF\u5386\u3002</p>
<!-- more -->
<h2 id="tailwind-css-\u7B80\u4ECB" tabindex="-1">Tailwind CSS \u7B80\u4ECB</h2>
<p><a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a> \u662F\u4E00\u4E2A CSS \u6846\u67B6\uFF0C\u901A\u8FC7\u7C7B\u540D\u5B9E\u73B0\u8FD1\u4F3C\u5185\u8054\u6837\u5F0F\uFF08inline style\uFF09\u4F46\u66F4\u65B9\u4FBF\u5FEB\u6377\u7684\u7F51\u9875\u6837\u5F0F\u7F16\u5199\u4F53\u9A8C\u3002\u4E00\u6BB5\u793A\u4F8B\u4EE3\u7801\uFF1A</p>
<pre><code class="language-html"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #ABB2BF">&lt;</span><span style="color: #E06C75">header</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #D19A66">className</span><span style="color: #ABB2BF">=</span><span style="color: #98C379">&quot;flex justify-between items-center h-16 md:h-20 text-purple-600&quot;</span></span>
<span class="line"><span style="color: #ABB2BF">&gt;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #7F848E; font-style: italic">&lt;!-- ... --&gt;</span></span>
<span class="line"><span style="color: #ABB2BF">&lt;/</span><span style="color: #E06C75">header</span><span style="color: #ABB2BF">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292F">&lt;</span><span style="color: #116329">header</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">className</span><span style="color: #24292F">=</span><span style="color: #0A3069">&quot;flex justify-between items-center h-16 md:h-20 text-purple-600&quot;</span></span>
<span class="line"><span style="color: #24292F">&gt;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #6E7781">&lt;!-- ... --&gt;</span></span>
<span class="line"><span style="color: #24292F">&lt;/</span><span style="color: #116329">header</span><span style="color: #24292F">&gt;</span></span>
<span class="line"></span></code></pre></div></code></pre>
<p>\u7B49\u4E8E\u5982\u4E0B\u7684 CSS\uFF1A</p>
<pre><code class="language-css"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #D19A66">.this-header</span><span style="color: #ABB2BF"> {</span></span>
<span class="line"><span style="color: #ABB2BF">  display: </span><span style="color: #D19A66">flex</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  justify-content: </span><span style="color: #D19A66">space-between</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  align-items: </span><span style="color: #D19A66">center</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  height: </span><span style="color: #D19A66">4</span><span style="color: #E06C75">rem</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #E06C75">--tw-text-opacity</span><span style="color: #ABB2BF">: </span><span style="color: #D19A66">1</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  color: </span><span style="color: #56B6C2">rgba</span><span style="color: #ABB2BF">(</span><span style="color: #D19A66">124</span><span style="color: #ABB2BF">, </span><span style="color: #D19A66">58</span><span style="color: #ABB2BF">, </span><span style="color: #D19A66">237</span><span style="color: #ABB2BF">, </span><span style="color: #56B6C2">var</span><span style="color: #ABB2BF">(</span><span style="color: #E06C75">--tw-text-opacity</span><span style="color: #ABB2BF">));</span></span>
<span class="line"><span style="color: #ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C678DD">@media</span><span style="color: #ABB2BF"> (min-width: </span><span style="color: #D19A66">768</span><span style="color: #E06C75">px</span><span style="color: #ABB2BF">) {</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #D19A66">.this-header</span><span style="color: #ABB2BF"> {</span></span>
<span class="line"><span style="color: #ABB2BF">    height: </span><span style="color: #D19A66">5</span><span style="color: #E06C75">rem</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  }</span></span>
<span class="line"><span style="color: #ABB2BF">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #0550AE">.this-header</span><span style="color: #24292F"> {</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">display</span><span style="color: #24292F">: </span><span style="color: #0550AE">flex</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">justify-content</span><span style="color: #24292F">: </span><span style="color: #0550AE">space-between</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">align-items</span><span style="color: #24292F">: </span><span style="color: #0550AE">center</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">height</span><span style="color: #24292F">: </span><span style="color: #0550AE">4</span><span style="color: #CF222E">rem</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #953800">--tw-text-opacity</span><span style="color: #24292F">: </span><span style="color: #0550AE">1</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">color</span><span style="color: #24292F">: </span><span style="color: #0550AE">rgba</span><span style="color: #24292F">(</span><span style="color: #0550AE">124</span><span style="color: #24292F">, </span><span style="color: #0550AE">58</span><span style="color: #24292F">, </span><span style="color: #0550AE">237</span><span style="color: #24292F">, </span><span style="color: #0550AE">var</span><span style="color: #24292F">(</span><span style="color: #953800">--tw-text-opacity</span><span style="color: #24292F">));</span></span>
<span class="line"><span style="color: #24292F">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #CF222E">@media</span><span style="color: #24292F"> (</span><span style="color: #0550AE">min-width</span><span style="color: #24292F">: </span><span style="color: #0550AE">768</span><span style="color: #CF222E">px</span><span style="color: #24292F">) {</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">.this-header</span><span style="color: #24292F"> {</span></span>
<span class="line"><span style="color: #24292F">    </span><span style="color: #0550AE">height</span><span style="color: #24292F">: </span><span style="color: #0550AE">5</span><span style="color: #CF222E">rem</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  }</span></span>
<span class="line"><span style="color: #24292F">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h2 id="\u5173\u6CE8\u70B9\u5206\u79BB" tabindex="-1">\u5173\u6CE8\u70B9\u5206\u79BB</h2>
<blockquote>
<p>TL;DR | Tailwind CSS <strong>\u503C\u5F97\u4E00\u8BD5</strong>\uFF0C\u4F46\u5B83\u663E\u7136\u4E5F<strong>\u4E0D\u662F\u4E07\u91D1\u6CB9</strong>\u3002</p>
</blockquote>
<p>Tailwind CSS \u7684\u521B\u59CB\u4EBA Adam Wathan \u66FE\u7ECF\u5199\u8FC7\u4E00\u7BC7<a href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/" target="_blank" rel="noopener">\u6587\u7AE0</a>\u63A2\u8BA8\u201C\u8BED\u4E49\u5316 CSS \u7C7B\u540D\u201D\uFF08semantic classes\uFF09\u4EE5\u53CA\u5404\u79CD\u4F20\u7EDF CSS \u6700\u4F73\u5B9E\u8DF5\u7684\u5F0A\u7AEF\u2014\u2014\u8FD9\u6709\u4E00\u5B9A\u7684\u9053\u7406\u3002\u5C3D\u7BA1\u524D\u7AEF\u4E09\u4EF6\u5957\u7684\u201C\u5173\u6CE8\u70B9\u5206\u79BB\u201D\u601D\u60F3\u8BA9\u7F16\u5199\u7528\u6237\u754C\u9762\u7684\u4F53\u9A8C\u5F97\u5230\u4E86\u8DE8\u8D8A\u5F0F\u7684\u63D0\u5347\uFF0C\u4F46\u8FD9\u4E09\u90E8\u5206\u6700\u7EC8\u8FD8\u662F\u8981\u534F\u540C\u5DE5\u4F5C\u7684\uFF0C\u56E0\u6B64<strong>\u8026\u5408\u662F\u4E0D\u53EF\u907F\u514D\u7684</strong>\u3002\u6240\u4EE5\uFF0C\u201C\u5173\u6CE8\u70B9\u5206\u79BB\u201D\u5176\u5B9E\u6CA1\u6709\u90A3\u4E48\u7EDD\u5BF9\u3002<s>\u65E2\u7136\u80FD\u63A5\u53D7 JSX\uFF0C\u5F53\u7136\u4E5F\u53EF\u4EE5\u628A CSS \u6DF7\u8FDB\u53BB\u4E86\uFF01</s></p>
<p>Tailwind CSS \u5728\u5B98\u7F51\u4E0A\u76F4\u63A5\u547C\u5401\uFF1A</p>
<blockquote>
<p>\u5C3D\u53EF\u80FD\u5FCD\u4F4F\u5E72\u5455\u7684\u51B2\u52A8\u6765\u5C1D\u8BD5\u4E00\u4E0B\uFF0C\u4F60\u4F1A<strong>\u771F\u9999</strong>\u5E76\u629B\u5F03\u5176\u4ED6 CSS \u5B9E\u8DF5\u7684\u3002</p>
<p>\u201CIf you can suppress the urge to retch long enough to give it a chance, I really think you\u2019ll wonder how you ever worked with CSS any other way.\u201D</p>
</blockquote>
<p>Tailwind \u5DF2\u7ECF\u6BD4\u8F83\u5B8C\u5584\u4E86\uFF0C\u622A\u81F3\u5199\u4F5C\u65F6\u6709 36k \u661F\u661F\uFF0C\u56E0\u6B64\u503C\u5F97\u629B\u5F03\u5BF9\u201C\u5173\u6CE8\u70B9\u5206\u79BB\u201D\u7684\u575A\u5B88\uFF0C\u53BB\u4EB2\u81EA\u5C1D\u8BD5\u4E00\u4E0B\u3002\u4F46\u6700\u7EC8\u4F1A\u4E0D\u4F1A\u771F\u9999\u5462\uFF1F\u6211\u5C1D\u8BD5\u4E86\u4E00\u4E0B\uFF0C\u786E\u5B9E\u9999\uFF0C\u4F46\u8FD8\u662F\u6709\u4E9B\u4E0D\u4FBF\u4E4B\u5904\u7684\u3002</p>
<h2 id="\u4F18\u70B9" tabindex="-1">\u4F18\u70B9</h2>
<p>\u867D\u7136 Tailwind CSS \u770B\u8D77\u6765<s>\u53EA\u662F\u628A\u5185\u8054\u6837\u5F0F\u4ECE style \u5C5E\u6027\u79FB\u5230\u4E86 class \u5C5E\u6027\u5E76\u4E14\u6362\u6210\u4E86\u5404\u79CD\u82B1\u5F0F\u7B80\u5199</s>\uFF0C\u4F46\u5B83\u5B9E\u9645\u4E0A<strong>\u6BD4\u76F4\u63A5\u5185\u8054\u6837\u5F0F\u597D\u5F97\u591A</strong>\u3002\u6709\u4E86\u7B80\u5199\uFF0CHTML \u6807\u7B7E\u4E0D\u4F1A\u50CF\u5185\u8054\u6837\u5F0F\u90A3\u4E48\u81C3\u80BF\uFF0C\u800C\u4E14\u7528 JS \u6846\u67B6\u8C03\u6574\u4E5F\u66F4\u65B9\u4FBF\u7B80\u6D01\u3002\u5C24\u5176\u662F\u7B80\u5316\u5230\u6781\u81F4\u7684\u65AD\u70B9\u8BED\u6CD5 <code>{breakpoint-type}:{style}</code> \u548C\u6697\u9ED1\u6A21\u5F0F\u8BED\u6CD5 <code>dark:{style}</code>\uFF0C\u6BD4\u624B\u5199\u5A92\u4F53\u67E5\u8BE2\u8981\u723D\u5F97\u591A\u3002</p>
<p>\u5B83\u5F00\u7BB1\u81EA\u5E26<strong>\u5F7B\u5E95\u7684\u6837\u5F0F\u91CD\u7F6E</strong>\uFF0C\u56E0\u6B64\u5BF9\u6837\u5F0F\u62E5\u6709\u5B8C\u5168\u7684\u638C\u63A7\u6743\u3002\u8FD9\u4E00\u70B9\u4E5F\u6BD4\u8F83\u8212\u670D\u3002</p>
<p>Tailwind \u8986\u76D6\u7684 CSS \u6837\u5F0F\u975E\u5E38\u5E7F\uFF0C\u5B98\u7F51\u7684\u6587\u6863\u4E5F\u5199\u5F97\u975E\u5E38\u8BE6\u7EC6\uFF0C\u4E0A\u624B\u8FD8\u662F\u6BD4\u8F83\u5FEB\u7684\u3002\u6BD4\u5982\uFF0C\u5B83\u5BF9\u957F\u5EA6\u503C<code>&lt;length&gt;</code> \u6709\u7740\u4E30\u5BCC\u7684\u652F\u6301\uFF1A</p>
<pre><code class="language-css"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #D19A66">.whatever</span><span style="color: #ABB2BF"> {</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #7F848E; font-style: italic">/* w-4      */</span></span>
<span class="line"><span style="color: #ABB2BF">  width: </span><span style="color: #D19A66">1</span><span style="color: #E06C75">rem</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #7F848E; font-style: italic">/* w-auto   */</span></span>
<span class="line"><span style="color: #ABB2BF">  width: </span><span style="color: #D19A66">auto</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #7F848E; font-style: italic">/* w-px     */</span></span>
<span class="line"><span style="color: #ABB2BF">  width: </span><span style="color: #D19A66">1</span><span style="color: #E06C75">px</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #7F848E; font-style: italic">/* w-1/3    */</span></span>
<span class="line"><span style="color: #ABB2BF">  width: </span><span style="color: #D19A66">33.333333</span><span style="color: #E06C75">%</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #7F848E; font-style: italic">/* w-screen */</span></span>
<span class="line"><span style="color: #ABB2BF">  width: </span><span style="color: #D19A66">100</span><span style="color: #E06C75">vw</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #0550AE">.whatever</span><span style="color: #24292F"> {</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #6E7781">/* w-4      */</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">width</span><span style="color: #24292F">: </span><span style="color: #0550AE">1</span><span style="color: #CF222E">rem</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #6E7781">/* w-auto   */</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">width</span><span style="color: #24292F">: </span><span style="color: #0550AE">auto</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #6E7781">/* w-px     */</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">width</span><span style="color: #24292F">: </span><span style="color: #0550AE">1</span><span style="color: #CF222E">px</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #6E7781">/* w-1/3    */</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">width</span><span style="color: #24292F">: </span><span style="color: #0550AE">33.333333</span><span style="color: #CF222E">%</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #6E7781">/* w-screen */</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">width</span><span style="color: #24292F">: </span><span style="color: #0550AE">100</span><span style="color: #CF222E">vw</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<p>\u5B83\u4E5F\u652F\u6301\u6309\u9700\u6253\u5305\uFF08treeshaking\uFF09\u3002</p>
<p>\u53E6\u5916\uFF0C\u901A\u8FC7 PostCSS \u8F6C\u8BD1\uFF0C\u5B83\u4E5F\u652F\u6301\u7EC4\u4EF6\u590D\u7528\uFF1A</p>
<pre><code class="language-css"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #D19A66">.btn</span><span style="color: #ABB2BF"> {</span></span>
<span class="line"><span style="color: #ABB2BF">  @apply px-4 py-5 text-white font-semibold;</span></span>
<span class="line"><span style="color: #ABB2BF">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #0550AE">.btn</span><span style="color: #24292F"> {</span></span>
<span class="line"><span style="color: #24292F">  @</span><span style="color: #0550AE">apply</span><span style="color: #24292F"> </span><span style="color: #0550AE">px-</span><span style="color: #24292F">4 </span><span style="color: #0550AE">py-</span><span style="color: #24292F">5 </span><span style="color: #0550AE">text-white</span><span style="color: #24292F"> </span><span style="color: #0550AE">font-semibold</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h2 id="\u7F3A\u70B9" tabindex="-1">\u7F3A\u70B9</h2>
<p>\u5C3D\u7BA1 Tailwind \u8986\u76D6\u7684\u5C5E\u6027\u5DF2\u7ECF\u975E\u5E38\u5E7F\u4E86\uFF0C\u4F46\u5B83\u4E5F\u4E0D\u53EF\u80FD\u7A77\u5C3D\u6240\u6709\u7684\u503C\uFF0C\u56E0\u6B64<strong>\u6709\u65F6\u9700\u8981\u624B\u52A8\u586B\u5199\u914D\u7F6E\u6587\u4EF6</strong>\uFF0C\u5982\u679C\u4F60\u672C\u8EAB\u5C31\u559C\u6B22\u73A9\u5404\u79CD CSS \u82B1\u6837\uFF0C\u5927\u89C4\u6A21\u586B\u5199\u914D\u7F6E\u6587\u4EF6\u662F\u4E2A\u5F88\u75DB\u82E6\u7684\u5DE5\u7A0B\u3002</p>
<p>\u6BD4\u5982\u8BF4\uFF0C\u9700\u8981\u4F7F\u7528\u4E00\u4E9B flex \u6216\u8005 grid \u5E03\u5C40\uFF0C\u6BD4\u5982<a href="http://www.ruanyifeng.com/blog/2020/08/five-css-layouts-in-one-line.html" target="_blank" rel="noopener">\u8FD9\u7BC7\u6587\u7AE0</a>\u4E2D\u4ECB\u7ECD\u7684\u4E09\u660E\u6CBB\u5E03\u5C40\uFF1A</p>
<pre><code class="language-css"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #D19A66">.container</span><span style="color: #ABB2BF"> {</span></span>
<span class="line"><span style="color: #ABB2BF">  display: </span><span style="color: #D19A66">grid</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  grid-template-rows: </span><span style="color: #D19A66">auto</span><span style="color: #ABB2BF"> </span><span style="color: #D19A66">1</span><span style="color: #E06C75">fr</span><span style="color: #ABB2BF"> </span><span style="color: #D19A66">auto</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #0550AE">.container</span><span style="color: #24292F"> {</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">display</span><span style="color: #24292F">: </span><span style="color: #0550AE">grid</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #0550AE">grid-template-rows</span><span style="color: #24292F">: </span><span style="color: #0550AE">auto</span><span style="color: #24292F"> </span><span style="color: #0550AE">1</span><span style="color: #CF222E">fr</span><span style="color: #24292F"> </span><span style="color: #0550AE">auto</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<p>\u5C31\u9700\u8981\u586B\u914D\u7F6E\u6587\u4EF6\uFF1A</p>
<pre><code class="language-js"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #E5C07B">module</span><span style="color: #ABB2BF">.</span><span style="color: #E5C07B">exports</span><span style="color: #ABB2BF"> </span><span style="color: #56B6C2">=</span><span style="color: #ABB2BF"> {</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #E06C75">theme</span><span style="color: #ABB2BF">: {</span></span>
<span class="line"><span style="color: #ABB2BF">    </span><span style="color: #E06C75">extend</span><span style="color: #ABB2BF">: {</span></span>
<span class="line"><span style="color: #ABB2BF">      </span><span style="color: #E06C75">gridTemplateRows</span><span style="color: #ABB2BF">: {</span></span>
<span class="line"><span style="color: #ABB2BF">        </span><span style="color: #E06C75">sandwich</span><span style="color: #ABB2BF">: </span><span style="color: #98C379">&#39;auto 1fr auto&#39;</span><span style="color: #ABB2BF">, </span><span style="color: #7F848E; font-style: italic">// grid-rows-sandwich</span></span>
<span class="line"><span style="color: #ABB2BF">      },</span></span>
<span class="line"><span style="color: #ABB2BF">    },</span></span>
<span class="line"><span style="color: #ABB2BF">  },</span></span>
<span class="line"><span style="color: #ABB2BF">};</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #0550AE">module</span><span style="color: #24292F">.</span><span style="color: #0550AE">exports</span><span style="color: #24292F"> </span><span style="color: #CF222E">=</span><span style="color: #24292F"> {</span></span>
<span class="line"><span style="color: #24292F">  theme: {</span></span>
<span class="line"><span style="color: #24292F">    extend: {</span></span>
<span class="line"><span style="color: #24292F">      gridTemplateRows: {</span></span>
<span class="line"><span style="color: #24292F">        sandwich: </span><span style="color: #0A3069">&#39;auto 1fr auto&#39;</span><span style="color: #24292F">, </span><span style="color: #6E7781">// grid-rows-sandwich</span></span>
<span class="line"><span style="color: #24292F">      },</span></span>
<span class="line"><span style="color: #24292F">    },</span></span>
<span class="line"><span style="color: #24292F">  },</span></span>
<span class="line"><span style="color: #24292F">};</span></span>
<span class="line"></span></code></pre></div></code></pre>
<p>\u8FD9\u65F6\u5019\u5C31\u4EA7\u751F\u4E86\u975E\u6807\u51C6\u7684\u7C7B\u540D\u3002\u4E00\u65E6\u914D\u7F6E\u591A\u8D77\u6765\uFF0C\u539F\u672C Tailwind \u6613\u4FEE\u6539\u4E14\u4E0D\u635F\u5931\u592A\u591A\u53EF\u8BFB\u6027\u7684\u4F18\u52BF\u5C31\u8361\u7136\u65E0\u5B58\u4E86\u3002</p>
<p>\u6B64\u5916\uFF0CTailwind \u7684\u6A21\u5F0F\u663E\u7136\u5BF9\u5404\u5F0F CSS \u9009\u62E9\u5668\u7684\u517C\u5BB9\u6027\u5F88\u5DEE\u3002\u8981\u4F7F\u7528\u4F2A\u7C7B\u4FEE\u9970\u7B26 <code>{pseudo-class}:{style}</code> \uFF0C\u9664\u4E86\u4E00\u5C0F\u90E8\u5206\u9884\u7F6E\u7684\u6837\u5F0F\uFF0C\u4F7F\u7528\u5176\u4ED6\u6837\u5F0F\u6216\u4E0D\u90A3\u4E48\u5E38\u7528\u7684\u4F2A\u7C7B\uFF08<code>:first-child</code>\uFF09\u90FD\u9700\u8981\u586B\u914D\u7F6E\u6587\u4EF6\u3002\u4E00\u4E9B\u4F2A\u7C7B\u5982 <code>:not</code> \u5219\u4E0D\u652F\u6301\uFF0C\u5BF9\u4F2A\u5143\u7D20\u7684\u652F\u6301\u66F4\u662F\u6CA1\u6709\uFF0C\u82E5\u8981\u4F7F\u7528\uFF0C\u8FD8\u5F97\u518D\u989D\u5916\u5199 CSS \u6587\u4EF6\u3002</p>
<p>\u6700\u540E\uFF0C\u5373\u4F7F\u6709\u7F29\u5199\uFF0C\u8D85\u957F\u7684 HTML class \u5C5E\u6027\u786E\u5B9E\u6709\u788D\u89C2\u77BB\uFF0C\u5982\u679C\u63D0\u53D6\u6210\u7EC4\u4EF6\u5199\u8FDB CSS \u6587\u4EF6\uFF0C\u4E00\u5927\u957F\u4E32\u7684<code>@apply</code> \u53EF\u8BFB\u6027\u6216\u8BB8\u8FD8\u4E0D\u5982\u76F4\u63A5\u5199 CSS\u3002</p>
<h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3</h2>
<p>\u5982\u679C\u4F60\u662F\u5185\u8054\u6837\u5F0F\u7684\u7231\u597D\u8005\uFF0C\u90A3 Tailwind \u5E94\u8BE5\u5F88\u9002\u5408\u4F60\u3002\u5982\u679C\u4F60\u662F\u5173\u6CE8\u70B9\u5206\u79BB\u539F\u6559\u65E8\u4E3B\u4E49\u8005\uFF0C\u4E5F\u53EF\u4EE5\u8003\u8651\u4ED4\u7EC6\u8BFB\u4E00\u8BFB\u521B\u59CB\u4EBA\u7684\u6587\u7AE0\uFF0C\u8BD5\u4E00\u628A Tailwind \u770B\u770B\u3002\u4E0D\u8FC7\uFF0CTailwind \u867D\u7136\u5DF2\u7ECF\u6BD4\u8F83\u9999\u4E86\uFF0C\u4F46\u786E\u5B9E\u79BB\u5B98\u65B9\u5BA3\u4F20\u7684\u4E07\u91D1\u6CB9\u8FD8\u5DEE\u7740\u4E0D\u5C11\u3002</p>
</div>`})}}};export{F as category,B as date,h as default,A as keywords,d as tags,i as title};
