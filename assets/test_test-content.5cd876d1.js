import{_ as a}from"./TheArticle.c822e2c9.js";import{o as t,f as l}from"./app.208d6a43.js";const h="\u9875\u9762\u5185\u5BB9\u6D4B\u8BD5",d="2021-02-14",m="misc",g=["test"],y={setup(o,{expose:n}){const s={title:"\u9875\u9762\u5185\u5BB9\u6D4B\u8BD5",date:"2021-02-14",category:"misc",tags:["test"]};return n({frontmatter:s}),(r,i)=>{const e=a;return t(),l(e,{frontmatter:s,inner:`<div><p>\u9875\u9762\u5185\u5BB9\u6E32\u67D3\u6548\u679C\u7684\u6D4B\u8BD5\uFF0C\u517C\u4F5C Markdown \u53C2\u8003\u3002</p>
<!-- more -->
<p>\u57FA\u4E8E<a href="https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/content/Big_Sample_Post.md" target="_blank" rel="noopener">\u6D4B\u8BD5\u9875</a>\u6539\u7F16\u800C\u6765\u3002</p>
<p>This \u201Cpost\u201D is based on <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener">Markdown Cheatsheet</a> and is meant to test styling of Markdown generated documents.</p>
<p>This is intended as a quick reference and showcase. For more complete info, see <a href="http://daringfireball.net/projects/markdown/" target="_blank" rel="noopener">John Gruber\u2019s original spec</a> and the <a href="http://github.github.com/github-flavored-markdown/" target="_blank" rel="noopener">Github-flavored Markdown info page</a>.</p>
<p>This cheatsheet is specifically <em>Markdown Here\u2019s</em> version of Github-flavored Markdown. This differs slightly in styling and syntax from what Github uses, so what you see below might vary a little from what you get in a <em>Markdown Here</em> email, but it should be pretty close.</p>
<p>You can play around with Markdown on our <a href="http://www.markdown-here.com/livedemo.html" target="_blank" rel="noopener">live demo page</a>.</p>
<p>(If you\u2019re not a Markdown Here user, check out the <a href="./Markdown-Cheatsheet">Markdown Cheatsheet</a> that is not specific to MDH. But, really, you should also use Markdown Here, because it\u2019s awesome. <a href="http://markdown-here.com" target="_blank" rel="noopener">http://markdown-here.com</a>)</p>
<h5 id="table-of-contents" tabindex="-1">Table of Contents</h5>
<p><a href="#headers">Headers</a><br>
<a href="#emphasis">Emphasis</a><br>
<a href="#lists">Lists</a><br>
<a href="#links">Links</a><br>
<a href="#images">Images</a><br>
<a href="#code">Code and Syntax Highlighting</a><br>
<a href="#tables">Tables</a><br>
<a href="#blockquotes">Blockquotes</a><br>
<a href="#html">Inline HTML</a><br>
<a href="#hr">Horizontal Rule</a><br>
<a href="#lines">Line Breaks</a><br>
<a href="#tex">TeX</a></p>
<h2 id="headers" tabindex="-1">Headers</h2>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf"># H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f"># H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
</span></span></code></pre></div></code></pre>
<h1 id="h1" tabindex="-1">H1</h1>
<h2 id="h2" tabindex="-1">H2</h2>
<h3 id="h3" tabindex="-1">H3</h3>
<h4 id="h4" tabindex="-1">H4</h4>
<h5 id="h5" tabindex="-1">H5</h5>
<h6 id="h6" tabindex="-1">H6</h6>
<p>Alternatively, for H1 and H2, an underline-ish style:</p>
<h1 id="alt-h1" tabindex="-1">Alt-H1</h1>
<h2 id="alt-h2" tabindex="-1">Alt-H2</h2>
<h2 id="emphasis" tabindex="-1">Emphasis</h2>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
</span></span></code></pre></div></code></pre>
<p>Emphasis, aka italics, with <em>asterisks</em> or <em>underscores</em>.</p>
<p>Strong emphasis, aka bold, with <strong>asterisks</strong> or <strong>underscores</strong>.</p>
<p>Combined emphasis with <strong>asterisks and <em>underscores</em></strong>.</p>
<p>Strikethrough uses two tildes. <s>Scratch this.</s></p>
<h2 id="lists" tabindex="-1">Lists</h2>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don&#39;t matter, just that it&#39;s a number
  1. Ordered sub-list
4. And another item.

   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don&#39;t matter, just that it&#39;s a number
  1. Ordered sub-list
4. And another item.

   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
</span></span></code></pre></div></code></pre>
<ol>
<li>
<p>First ordered list item</p>
</li>
<li>
<p>Another item</p>
<ul>
<li>Unordered sub-list.</li>
</ul>
</li>
<li>
<p>Actual numbers don\u2019t matter, just that it\u2019s a number</p>
<ol>
<li>Ordered sub-list</li>
</ol>
</li>
<li>
<p>And another item.</p>
<p>Some text that should be aligned with the above item.</p>
</li>
</ol>
<ul>
<li>Unordered list can use asterisks</li>
</ul>
<ul>
<li>Or minuses</li>
</ul>
<ul>
<li>Or pluses</li>
</ul>
<h2 id="links" tabindex="-1">Links</h2>
<p>There are two ways to create links.</p>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">[I&#39;m an inline-style link](https://www.google.com)

[I&#39;m a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or &lt;http://www.example.com&gt; and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">[I&#39;m an inline-style link](https://www.google.com)

[I&#39;m a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or &lt;http://www.example.com&gt; and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
</span></span></code></pre></div></code></pre>
<p><a href="https://www.google.com" target="_blank" rel="noopener">I\u2019m an inline-style link</a></p>
<p><a href="https://www.mozilla.org" target="_blank" rel="noopener">I\u2019m a reference-style link</a></p>
<p><a href="http://slashdot.org" target="_blank" rel="noopener">You can use numbers for reference-style link definitions</a></p>
<p>Or leave it empty and use the <a href="http://www.reddit.com" target="_blank" rel="noopener">link text itself</a></p>
<p>URLs and URLs in angle brackets will automatically get turned into links.
<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a> or <a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a> and sometimes
example.com (but not on Github, for example).</p>
<p>Some text to show that the reference links can follow later.</p>
<h2 id="code-and-syntax-highlighting" tabindex="-1">Code and Syntax Highlighting</h2>
<p>Code blocks are part of the Markdown spec, but syntax highlighting isn\u2019t. However, many renderers \u2013 like Github\u2019s and <em>Markdown Here</em> \u2013 support syntax highlighting. <em>Markdown Here</em> supports highlighting for dozens of languages (and not-really-languages, like diffs and HTTP headers); to see the complete list, and how to write the language names, see the <a href="http://softwaremaniacs.org/media/soft/highlight/test.html" target="_blank" rel="noopener">highlight.js demo page</a>.</p>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">Inline \`code\` has \`back-ticks around\` it.
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">Inline \`code\` has \`back-ticks around\` it.
</span></span></code></pre></div></code></pre>
<p>Inline <code>code</code> has <code>back-ticks around</code> it.</p>
<p>Blocks of code are either fenced by lines with three back-ticks <code>\`\`\`</code>, or are indented with four spaces. I recommend only using the fenced code blocks \u2013 they\u2019re easier and only they support syntax highlighting.</p>
<pre lang=""><code>\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`

\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`

\`\`\`
No language indicated, so no syntax highlighting.
But let's throw in a &lt;b&gt;tag&lt;/b&gt;.
\`\`\`
</code></pre>
<pre><code class="language-javascript"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #C678DD">var</span><span style="color: #ABB2BF"> </span><span style="color: #E06C75">s</span><span style="color: #ABB2BF"> </span><span style="color: #56B6C2">=</span><span style="color: #ABB2BF"> </span><span style="color: #98C379">&quot;JavaScript syntax highlighting&quot;</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #61AFEF">alert</span><span style="color: #ABB2BF">(</span><span style="color: #E06C75">s</span><span style="color: #ABB2BF">);</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #CF222E">var</span><span style="color: #24292F"> s </span><span style="color: #CF222E">=</span><span style="color: #24292F"> </span><span style="color: #0A3069">&quot;JavaScript syntax highlighting&quot;</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #8250DF">alert</span><span style="color: #24292F">(s);</span></span>
<span class="line"></span></code></pre></div></code></pre>
<pre><code class="language-python"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #ABB2BF">s </span><span style="color: #56B6C2">=</span><span style="color: #ABB2BF"> </span><span style="color: #98C379">&quot;Python syntax highlighting&quot;</span></span>
<span class="line"><span style="color: #56B6C2">print</span><span style="color: #ABB2BF"> s</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292F">s </span><span style="color: #CF222E">=</span><span style="color: #24292F"> </span><span style="color: #0A3069">&quot;Python syntax highlighting&quot;</span></span>
<span class="line"><span style="color: #0550AE">print</span><span style="color: #24292F"> s</span></span>
<span class="line"></span></code></pre></div></code></pre>
<pre><code class="language-cpp"><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #ABB2BF">include </span><span style="color: #C678DD">&lt;</span><span style="color: #ABB2BF">iostream</span><span style="color: #C678DD">&gt;</span></span>
<span class="line"><span style="color: #C678DD">using</span><span style="color: #ABB2BF"> </span><span style="color: #C678DD">namespace</span><span style="color: #ABB2BF"> </span><span style="color: #E5C07B">std</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #C678DD">int</span><span style="color: #ABB2BF"> </span><span style="color: #61AFEF">main</span><span style="color: #ABB2BF">() {</span></span>
<span class="line"><span style="color: #ABB2BF">  cout </span><span style="color: #C678DD">&lt;&lt;</span><span style="color: #ABB2BF"> </span><span style="color: #98C379">&quot;Hello World!&quot;</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">  </span><span style="color: #C678DD">return</span><span style="color: #ABB2BF"> </span><span style="color: #D19A66">0</span><span style="color: #ABB2BF">;</span></span>
<span class="line"><span style="color: #ABB2BF">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292F">include </span><span style="color: #CF222E">&lt;</span><span style="color: #24292F">iostream</span><span style="color: #CF222E">&gt;</span></span>
<span class="line"><span style="color: #CF222E">using</span><span style="color: #24292F"> </span><span style="color: #CF222E">namespace</span><span style="color: #24292F"> </span><span style="color: #953800">std</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #CF222E">int</span><span style="color: #24292F"> </span><span style="color: #8250DF">main</span><span style="color: #24292F">() {</span></span>
<span class="line"><span style="color: #24292F">  cout </span><span style="color: #CF222E">&lt;&lt;</span><span style="color: #24292F"> </span><span style="color: #0A3069">&quot;Hello World!&quot;</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">  </span><span style="color: #CF222E">return</span><span style="color: #24292F"> </span><span style="color: #0550AE">0</span><span style="color: #24292F">;</span></span>
<span class="line"><span style="color: #24292F">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">No language indicated, so no syntax highlighting in Markdown Here (varies on Github).
But let&#39;s throw in a &lt;b&gt;tag&lt;/b&gt;.
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">No language indicated, so no syntax highlighting in Markdown Here (varies on Github).
But let&#39;s throw in a &lt;b&gt;tag&lt;/b&gt;.
</span></span></code></pre></div></code></pre>
<p>Again, to see what languages are available for highlighting, and how to write those language names, see the <a href="http://softwaremaniacs.org/media/soft/highlight/test.html" target="_blank" rel="noopener">highlight.js demo page</a>.</p>
<h2 id="tables" tabindex="-1">Tables</h2>
<p>Tables aren\u2019t part of the core Markdown spec, but they are part of GFM and <em>Markdown Here</em> supports them. They are an easy way of adding tables to your email \u2013 a task that would otherwise require copy-pasting from another application.</p>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      | $12   |
| zebra stripes | are neat      | $1    |

The outer pipes (|) are optional, and you don&#39;t need to make the raw Markdown line up prettily. You can also use inline Markdown.

| | Markdown | Less           | Pretty     |     |
| | ------------- | --------------- | ---------- |------- |
| | *Still*   | \`renders\` | **nicely** | |
| | 1               | 2                 | 3          |          |
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      | $12   |
| zebra stripes | are neat      | $1    |

The outer pipes (|) are optional, and you don&#39;t need to make the raw Markdown line up prettily. You can also use inline Markdown.

| | Markdown | Less           | Pretty     |     |
| | ------------- | --------------- | ---------- |------- |
| | *Still*   | \`renders\` | **nicely** | |
| | 1               | 2                 | 3          |          |
</span></span></code></pre></div></code></pre>
<p>Colons can be used to align columns.</p>
<table>
<thead>
<tr>
<th>Tables</th>
<th style="text-align:center">Are</th>
<th style="text-align:right">Cool</th>
</tr>
</thead>
<tbody>
<tr>
<td>col 3 is</td>
<td style="text-align:center">right-aligned</td>
<td style="text-align:right">$1600</td>
</tr>
<tr>
<td>col 2 is</td>
<td style="text-align:center">centered</td>
<td style="text-align:right">$12</td>
</tr>
<tr>
<td>zebra stripes</td>
<td style="text-align:center">are neat</td>
<td style="text-align:right">$1</td>
</tr>
</tbody>
</table>
<p>The outer pipes (|) are optional, and you don\u2019t need to make the raw Markdown line up prettily. You can also use inline Markdown.</p>
<table>
<thead>
<tr>
<th>Markdown</th>
<th>Less</th>
<th>Pretty</th>
</tr>
</thead>
<tbody>
<tr>
<td><em>Still</em></td>
<td><code>renders</code></td>
<td><strong>nicely</strong></td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>3</td>
</tr>
</tbody>
</table>
<h2 id="blockquotes" tabindex="-1">Blockquotes</h2>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">&gt; Blockquotes are very handy in email to emulate reply text.
&gt; This line is part of the same quote.

Quote break.

&gt; This is a very long line that will still be quoted properly when it wraps. Oh boy let&#39;s keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">&gt; Blockquotes are very handy in email to emulate reply text.
&gt; This line is part of the same quote.

Quote break.

&gt; This is a very long line that will still be quoted properly when it wraps. Oh boy let&#39;s keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
</span></span></code></pre></div></code></pre>
<blockquote>
<p>Blockquotes are very handy in email to emulate reply text.
This line is part of the same quote.</p>
</blockquote>
<p>Quote break.</p>
<blockquote>
<p>This is a very long line that will still be quoted properly when it wraps. Oh boy let\u2019s keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can <em>put</em> <strong>Markdown</strong> into a blockquote.</p>
</blockquote>
<h2 id="inline-html" tabindex="-1">Inline HTML</h2>
<p>You can also use raw HTML in your Markdown, and it\u2019ll mostly work pretty well.</p>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">&lt;dl&gt;
  &lt;dt&gt;Definition list&lt;/dt&gt;
  &lt;dd&gt;Is something people use sometimes.&lt;/dd&gt;

  &lt;dt&gt;Markdown in HTML&lt;/dt&gt;
  &lt;dd&gt;Does *not* work **very** well. Use HTML &lt;em&gt;tags&lt;/em&gt;.&lt;/dd&gt;
&lt;/dl&gt;
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">&lt;dl&gt;
  &lt;dt&gt;Definition list&lt;/dt&gt;
  &lt;dd&gt;Is something people use sometimes.&lt;/dd&gt;

  &lt;dt&gt;Markdown in HTML&lt;/dt&gt;
  &lt;dd&gt;Does *not* work **very** well. Use HTML &lt;em&gt;tags&lt;/em&gt;.&lt;/dd&gt;
&lt;/dl&gt;
</span></span></code></pre></div></code></pre>
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>
  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
<h2 id="horizontal-rule" tabindex="-1">Horizontal Rule</h2>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">Three or more...

---

Hyphens

***

Asterisks

___

Underscores
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">Three or more...

---

Hyphens

***

Asterisks

___

Underscores
</span></span></code></pre></div></code></pre>
<p>Three or more\u2026</p>
<hr>
<p>Hyphens</p>
<hr>
<p>Asterisks</p>
<hr>
<p>Underscores</p>
<h2 id="line-breaks" tabindex="-1">Line Breaks</h2>
<p>My basic recommendation for learning how line breaks work is to experiment and discover \u2013 hit &lt;Enter&gt; once (i.e., insert one newline), then hit it twice (i.e., insert two newlines), see what happens. You\u2019ll soon learn to get what you want. \u201CMarkdown Toggle\u201D is your friend.</p>
<p>Here are some things to try out:</p>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">Here&#39;s a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it&#39;s a separate line in the *same paragraph*.
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">Here&#39;s a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it&#39;s a separate line in the *same paragraph*.
</span></span></code></pre></div></code></pre>
<p>Here\u2019s a line for us to start with.</p>
<p>This line is separated from the one above by two newlines, so it will be a <em>separate paragraph</em>.</p>
<p>This line is also begins a separate paragraph, but\u2026
This line is only separated by a single newline, so it\u2019s a separate line in the <em>same paragraph</em>.</p>
<p>(Technical note: <em>Markdown Here</em> uses GFM line breaks, so there\u2019s no need to use MD\u2019s two-space line breaks.)</p>
<h2 id="tex" tabindex="-1">TeX</h2>
<pre><code><div class="shiki-container"><pre class="shiki shiki-dark" style="background-color: #282c34"><code><span class="line"><span style="color: #abb2bf">Inline math: $\\varphi = \\dfrac{1+\\sqrt5}{2}= 1.6180339887\u2026$

Block math:

$$
\\varphi = 1+\\frac{1} {1+\\frac{1} {1+\\frac{1} {1+\\cdots} } }
$$
</span></span></code></pre><pre class="shiki shiki-light" style="background-color: #ffffff"><code><span class="line"><span style="color: #24292f">Inline math: $\\varphi = \\dfrac{1+\\sqrt5}{2}= 1.6180339887\u2026$

Block math:

$$
\\varphi = 1+\\frac{1} {1+\\frac{1} {1+\\frac{1} {1+\\cdots} } }
$$
</span></span></code></pre></div></code></pre>
<p>Inline math: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>\u03C6</mi><mo>=</mo><mstyle displaystyle="true" scriptlevel="0"><mfrac><mrow><mn>1</mn><mo>+</mo><msqrt><mn>5</mn></msqrt></mrow><mn>2</mn></mfrac></mstyle><mo>=</mo><mn>1.6180339887</mn><mo>\u2026</mo></mrow><annotation encoding="application/x-tex">\\varphi = \\dfrac{1+\\sqrt5}{2}= 1.6180339887\u2026</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.19444em;"></span><span class="mord mathnormal">\u03C6</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:2.27022em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.5842200000000002em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.90722em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;">5</span></span><span style="top:-2.86722em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l0 -0
c5.3,-9.3,12,-14,20,-14
H400000v40H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.13278em;"><span></span></span></span></span></span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">1</span><span class="mord">.</span><span class="mord">6</span><span class="mord">1</span><span class="mord">8</span><span class="mord">0</span><span class="mord">3</span><span class="mord">3</span><span class="mord">9</span><span class="mord">8</span><span class="mord">8</span><span class="mord">7</span><span class="mspace" style="margin-right:0.16666666666666666em;"></span><span class="minner">\u2026</span></span></span></span></p>
<p>Block math:</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>\u03C6</mi><mo>=</mo><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>\u22EF</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow><annotation encoding="application/x-tex">\\varphi = 1+\\frac{1} {1+\\frac{1} {1+\\frac{1} {1+\\cdots} } }
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.19444em;"></span><span class="mord mathnormal">\u03C6</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.72777em;vertical-align:-0.08333em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span></span><span class="base"><span class="strut" style="height:2.740033em;vertical-align:-1.418593em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.32144em;"><span style="top:-2.2648919999999997em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.845108em;"><span style="top:-2.59898em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span><span class="mbin mtight">+</span><span class="mord mtight"><span class="mopen nulldelimiter sizing reset-size3 size6"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8443142857142858em;"><span style="top:-2.656em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">1</span><span class="mbin mtight">+</span><span class="minner mtight">\u22EF</span></span></span></span><span style="top:-3.2255em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line mtight" style="border-bottom-width:0.049em;"></span></span><span style="top:-3.384em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.40352142857142853em;"><span></span></span></span></span></span><span class="mclose nulldelimiter sizing reset-size3 size6"></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.6834849999999999em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:1.418593em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>We have KaTeX for maths!</p>
<p><strong>Note:</strong> Use the online reference of <a href="https://katex.org/docs/supported.html" target="_blank" rel="noopener">Supported TeX Functions</a></p>
</div>`})}}};export{m as category,d as date,y as default,g as tags,h as title};
