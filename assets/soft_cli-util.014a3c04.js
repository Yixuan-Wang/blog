import{_ as a}from"./TheArticle.76e9007b.js";import{o,j as t}from"./app.065124aa.js";const h="Awesome CLI Toys",d="2022-09-14T07:21:00.000Z",u="comp",y=["softwares"],f=["cli","awesome"],m="en",g={setup(l,{expose:e}){const s={title:"Awesome CLI Toys",date:"2022-09-14T07:21:00.000Z",category:"comp",tags:["softwares"],keywords:["cli","awesome"],lang:"en"};return e({frontmatter:s}),(r,p)=>{const n=a;return o(),t(n,{frontmatter:s,inner:`<div><p>Some nice CLI utilities that can cure your internal mental consumption.</p>
<!-- more -->
<p>Note that the mental consumption introduced by <em>installing</em> or <em>building from source</em> are not considered.</p>
<p>Also note that this article <strong>DOES NOT</strong> intend to deliberately stress the fact that <s>the Rust language specializes solely on rewriting CLI tools with fancy ANSI escape codes</s>.</p>
<h2 id="zsh" tabindex="-1">Zsh</h2>
<p><a href="http://www.zsh.org/" target="_blank" rel="noopener"><code>zsh</code> <img src="https://www.zsh.org/color_vertical_icon.png" alt="zsh" style="display: inline; height: 1em; vertical-align: sub;"></a> is quite a powerful and configurable yet old-schooled shell(comparing to fancy <s>REAL <em>GEN-Z</em></s> stuff like <a href="https://www.warp.dev/" target="_blank" rel="noopener"><code>warp</code></a> or <a href="https://www.nushell.sh/" target="_blank" rel="noopener"><code>nushell</code></a>). Traditionally you would want to install the famous <s>bloatware</s> <a href="https://ohmyz.sh/" target="_blank" rel="noopener"><code>oh-my-zsh</code></a> as a drop-in configuration framework. <s>Wait a minute, this is a shell, not a CLI\u{1F92A}.</s></p>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Install \`oh-my-zsh\`</span></span>
<span class="line"><span style="color: #ABB2BF">sh -c </span><span style="color: #98C379">&quot;$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># Install \`oh-my-zsh\` with Gitee mirror</span></span>
<span class="line"><span style="color: #ABB2BF">sh -c </span><span style="color: #98C379">&quot;$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)&quot;</span></span>
<span class="line"></span></code></pre>
<p>Then, it would be delightful to have <a href="https://github.com/zsh-users/zsh-syntax-highlighting" target="_blank" rel="noopener">syntax highlighting</a>, <a href="https://github.com/zsh-users/zsh-completions" target="_blank" rel="noopener">completions</a> and <a href="https://github.com/zsh-users/zsh-autosuggestions" target="_blank" rel="noopener">auto suggestions</a>.</p>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Cloning</span></span>
<span class="line"><span style="color: #ABB2BF">git clone https://github.com/zsh-users/zsh-syntax-highlighting.git </span><span style="color: #E06C75">\${ZSH_CUSTOM</span><span style="color: #ABB2BF">:-</span><span style="color: #E06C75">~</span><span style="color: #ABB2BF">/</span><span style="color: #E06C75">.oh-my-zsh</span><span style="color: #ABB2BF">/</span><span style="color: #E06C75">custom}</span><span style="color: #ABB2BF">/plugins/zsh-syntax-highlighting</span></span>
<span class="line"><span style="color: #ABB2BF">git clone https://github.com/zsh-users/zsh-completions </span><span style="color: #E06C75">\${ZSH_CUSTOM</span><span style="color: #ABB2BF">:-</span><span style="color: #E06C75">\${ZSH</span><span style="color: #ABB2BF">:-</span><span style="color: #E06C75">~</span><span style="color: #ABB2BF">/</span><span style="color: #E06C75">.oh-my-zsh}</span><span style="color: #ABB2BF">/</span><span style="color: #E06C75">custom}</span><span style="color: #ABB2BF">/plugins/zsh-completions</span></span>
<span class="line"><span style="color: #ABB2BF">git clone https://github.com/zsh-users/zsh-autosuggestions </span><span style="color: #E06C75">\${ZSH_CUSTOM</span><span style="color: #ABB2BF">:-</span><span style="color: #E06C75">~</span><span style="color: #ABB2BF">/</span><span style="color: #E06C75">.oh-my-zsh</span><span style="color: #ABB2BF">/</span><span style="color: #E06C75">custom}</span><span style="color: #ABB2BF">/plugins/zsh-autosuggestions</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># Install via \`omz\`</span></span>
<span class="line"><span style="color: #ABB2BF">omz plugin </span><span style="color: #56B6C2">enable</span><span style="color: #ABB2BF"> zsh-syntax-highlighting zsh-completions zsh-autosuggestions</span></span>
<span class="line"></span></code></pre>
<h2 id="zoxide" tabindex="-1">Zoxide</h2>
<p><a href="https://github.com/ajeetdsouza/zoxide" target="_blank" rel="noopener"><code>zoxide</code></a> is a Rust implementation of smart working directory changing tools like <a href="https://github.com/wting/autojump" target="_blank" rel="noopener"><code>autojump</code></a> and <a href="https://github.com/rupa/z" target="_blank" rel="noopener"><code>z</code></a>. It remembers your previous browsing records, so a tiny fraction of path suffices your next navigation to this directory.</p>
<details><summary>Demo</summary>
<p><img src="https://github.com/ajeetdsouza/zoxide/raw/main/contrib/tutorial.webp" alt="zoxide demo"></p>
</details>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #ABB2BF">z ~/a/very/long/path/with/a-long-name</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># The next time you want to jump to that directory:</span></span>
<span class="line"><span style="color: #ABB2BF">z a-lo</span></span>
<span class="line"></span></code></pre>
<p>Read the full installation instructions <a href="https://github.com/ajeetdsouza/zoxide#installation" target="_blank" rel="noopener">here</a>.</p>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Install on Linux</span></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># This script is COMPATIBLE with local installation</span></span>
<span class="line"><span style="color: #ABB2BF">curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># ADD the init script to your \`.zshrc\` </span></span>
<span class="line"><span style="color: #56B6C2">eval</span><span style="color: #ABB2BF"> </span><span style="color: #98C379">&quot;$(zoxide init zsh)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># OR use \`omz\` plugin for \`zoxide\`</span></span>
<span class="line"><span style="color: #ABB2BF">omz plugin </span><span style="color: #56B6C2">enable</span><span style="color: #ABB2BF"> zoxide</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># ALIAS \`cd\` to \`z\`</span></span>
<span class="line"><span style="color: #56B6C2">alias</span><span style="color: #ABB2BF"> cd=</span><span style="color: #98C379">&quot;z&quot;</span></span>
<span class="line"></span></code></pre>
<h2 id="starship" tabindex="-1">Starship</h2>
<p>Although themes like <a href="https://github.com/romkatv/powerlevel10k" target="_blank" rel="noopener"><code>powerlevel10k</code></a> or <a href="https://github.com/ohmyzsh/ohmyzsh/wiki/Themes#robbyrussell" target="_blank" rel="noopener"><code>rubbyrussell</code></a> <s>or <code>random</code></s> looks pretty nice, sometimes you might have to cope with <s>the recognized best Linux desktop environment</s>, namely Windows. It would have been a nightmare trying to sync your <code>pwsh</code> theme with your <code>zsh</code> counterpart. <a href="https://starship.rs/" target="_blank" rel="noopener"><code>starship</code> <img src="https://starship.rs/icon.png" alt="starship" style="display: inline; height: 1em; vertical-align: sub;"></a> provides a unified and configurable cross-shell prompting environment, which suits this need perfectly.</p>
<details><summary>Demo</summary>
<video controls>
  <source src="https://starship.rs/demo.webm" type="video/webm">
</video>
</details>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Install on Linux</span></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># This root is INCOMPATIBLE with local installation!</span></span>
<span class="line"><span style="color: #7F848E; font-style: italic">#   manually set the env var to install it locally.</span></span>
<span class="line"><span style="color: #C678DD">export</span><span style="color: #ABB2BF"> BIN_DIR=</span><span style="color: #98C379">&quot;/usr/local/bin&quot;</span></span>
<span class="line"><span style="color: #ABB2BF">curl -sS https://starship.rs/install.sh | sh</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># ADD the init script to your \`.zshrc\`</span></span>
<span class="line"><span style="color: #56B6C2">eval</span><span style="color: #ABB2BF"> </span><span style="color: #98C379">&quot;$(starship init zsh)&quot;</span></span>
<span class="line"></span></code></pre>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Install on Windows with \`scoop\`</span></span>
<span class="line"><span style="color: #ABB2BF">scoop install starship</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># ADD this line to your Powershell profile ($PROFILE).</span></span>
<span class="line"><span style="color: #56B6C2">Invoke-Expression</span><span style="color: #ABB2BF"> (&amp;starship init powershell)</span></span>
<span class="line"></span></code></pre>
<p>Then nicely disable your <code>omz</code> theme and place a configuration in your <code>~/.config/starship.toml</code>. Detailed instructions of <code>starship</code> can be found <a href="https://starship.rs/config/" target="_blank" rel="noopener">here</a>. It is plausible that you want to change a bunch of default prompt icons from weird emojis into pretty <a href="https://www.nerdfonts.com" target="_blank" rel="noopener">Nerd Fonts</a>, but as Material Design Icons regularly clash with CJK codepoints, personally it is not recommended. Checkout <a href="https://starship.rs/presets/#nerd-font-symbols" target="_blank" rel="noopener">official presets</a> for more configuration ideas.</p>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Starship config schema</span></span>
<span class="line"><span style="color: #E06C75">&quot;</span><span style="color: #ABB2BF">$schema</span><span style="color: #E06C75">&quot;</span><span style="color: #ABB2BF"> = </span><span style="color: #98C379">&#39;https://starship.rs/config-schema.json&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7F848E; font-style: italic"># Example: Inject some prompt of the current operating system</span></span>
<span class="line"><span style="color: #E06C75">format</span><span style="color: #ABB2BF"> = </span><span style="color: #98C379">&quot;[{windows|linux|vps}](cyan) $all&quot;</span></span>
<span class="line"></span></code></pre>
<h2 id="fzf" tabindex="-1">Fzf</h2>
<p><a href="https://github.com/junegunn/fzf" target="_blank" rel="noopener"><code>fzf</code></a> is an <strong>interactive</strong> fuzzy finder implemented in Go. By default it will walk the file system as a file finder, but it is capable of finding a whole bunch of other stuff, like searching inside text files, managing Docker environments and picking references from your bibliography. Check the <a href="https://github.com/junegunn/fzf/wiki/examples" target="_blank" rel="noopener">community examples wiki page</a> for some handy inspiration.</p>
<details><summary>Demo</summary>
<p><img src="https://raw.githubusercontent.com/junegunn/i/master/fzf-preview.png" alt="fzf demo"></p>
</details>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #7F848E; font-style: italic"># Use \`git\` to install</span></span>
<span class="line"><span style="color: #ABB2BF">git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf</span></span>
<span class="line"><span style="color: #ABB2BF">~/.fzf/install</span></span>
<span class="line"></span></code></pre>
<h2 id="fd" tabindex="-1">Fd</h2>
<p><a href="https://github.com/sharkdp/fd" target="_blank" rel="noopener"><code>fd</code></a> is a Rust implementation of GNU <code>find</code> from <a href="https://www.gnu.org/software/findutils/" target="_blank" rel="noopener"><code>findutils</code></a>. It uses regular expressions by default, which is more intuitive than <code>find</code>\u2019s verbose parameters. It self proclaims to be even faster than <code>find</code> in its <a href="https://github.com/sharkdp/fd#benchmark" target="_blank" rel="noopener">benchmark</a>, as Rust regex automata are fast and the directory traversal part is always carried out in parallel. <strong>Beware that <code>fd</code> skips hidden files and gitignore\u2019d files</strong>, you need to use the <code>-HI</code> flag to explicitly include them.</p>
<details><summary>Demo</summary>
<p><img src="https://github.com/sharkdp/fd/raw/master/doc/screencast.svg" alt="fd demo"></p>
</details>
<p><code>fd</code> doesn\u2019t come with a install script, so you have to grab them by hand from <a href="https://github.com/sharkdp/fd/releases" target="_blank" rel="noopener">the release page</a>. Because of name clash, it is called <code>fdfind</code> on <code>apt</code> repo.</p>
<p>Refer to <a href="https://github.com/sharkdp/fd#how-to-use" target="_blank" rel="noopener">this page</a> for documentation. If you want to use <code>fd</code> to boost your <code>fzf</code> search experience, stuff these env vars into your <code>.zshrc</code> or so.</p>
<pre class="shiki" style="background-color: #282c34"><code><span class="line"><span style="color: #C678DD">export</span><span style="color: #ABB2BF"> FZF_DEFAULT_COMMAND=</span><span style="color: #98C379">&#39;fd --type file&#39;</span></span>
<span class="line"><span style="color: #C678DD">export</span><span style="color: #ABB2BF"> FZF_CTRL_T_COMMAND=</span><span style="color: #98C379">&quot;</span><span style="color: #E06C75">$FZF_DEFAULT_COMMAND</span><span style="color: #98C379">&quot;</span></span>
<span class="line"></span></code></pre>
<h2 id="ripgrep" tabindex="-1">Ripgrep</h2>
<p>This GNU <a href="https://www.gnu.org/software/grep/" target="_blank" rel="noopener"><code>grep</code></a> alternative is handcrafted by the very author of the Rust regex crate. In fact, <a href="https://rust-cli.github.io/book/tutorial/index.html" target="_blank" rel="noopener">the Rust CLI book</a> actually teach you to implement your own <code>grep</code>, but this one, often abbreviated as <code>rg</code>, is technically way more usable. You may want to check the author\u2019s <a href="https://blog.burntsushi.net/ripgrep/" target="_blank" rel="noopener">blog post</a> for a benchmark. Besides, it provides support for Unicode and basic regex right out of box. If you want to use powerful Perl-flavoured regexes(namely PC2E, with fancy stuff like the <code>(?=foo)</code> lookahead), you can enable the <code>-P</code> flag.</p>
<p>There is also no install script provided, just grab a prebuilt binary from <a href="https://github.com/BurntSushi/ripgrep/releases" target="_blank" rel="noopener">its release page</a>. <strong>Beware that <code>rg</code> also skips hidden files and gitignore\u2019d files</strong>.</p>
<details><summary>Demo</summary>
<p><img src="https://burntsushi.net/stuff/ripgrep1.png" alt=""></p>
</details>
<h2 id="bat" tabindex="-1">Bat</h2>
<p>Yet another Rust-ified CLI tool from the same author of <code>fd</code>, <code>bat</code> is a human readable version of <code>cat</code>.</p>
<p><img src="https://images.unsplash.com/photo-1613341027066-a522e1a04c27?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=774&amp;q=80" alt="cat on a bin"></p>
<p>This time, <s>I prefer a cat in my bin than a bat, anyway.</s> But the syntax highlighting and <code>git</code> intergration provided by <code>bat</code> is kind of tempting.</p>
<details><summary>Demo</summary>
<p><img src="https://camo.githubusercontent.com/7b7c397acc5b91b4c4cf7756015185fe3c5f700f70d256a212de51294a0cf673/68747470733a2f2f696d6775722e636f6d2f724773646e44652e706e67" alt="bat demo: syntax highlighting"></p>
<p><img src="https://camo.githubusercontent.com/c436c206f2c86605ab2f9fb632dd485afc05fccbf14af472770b0c59d876c9cc/68747470733a2f2f692e696d6775722e636f6d2f326c53573452452e706e67" alt="bat demo: git"></p>
</details>
<p>Check <a href="https://camo.githubusercontent.com/c436c206f2c86605ab2f9fb632dd485afc05fccbf14af472770b0c59d876c9cc/68747470733a2f2f692e696d6775722e636f6d2f326c53573452452e706e67" target="_blank" rel="noopener">this section</a> for its intergration with other fancy CLI apps. Same as <code>fd</code>, grab a binary from the <a href="https://github.com/sharkdp/bat/releases" target="_blank" rel="noopener">release page</a>, or check <code>batcat</code>(yet another name clash) on <code>apt</code> repo.</p>
</div>`})}}};export{u as category,d as date,g as default,f as keywords,m as lang,y as tags,h as title};
