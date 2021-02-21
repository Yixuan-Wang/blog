/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div>
      <SEO title="关于" />
      <h1 className="title">关于</h1>
      <h2 id="命名">命名</h2>
      <p>
        “<strong>博</strong>”字，上古汉语拟音《汉字古音手册》拟作
        [pɑ̆k]，中古汉语拟音各学派皆作 [pɑk]，其中后低不圆唇元音 ɑ (U+0251{' '}
        <span style={{ fontVariant: `all-small-caps` }}>
          LATIN SMALL LETTER ALPHA
        </span>
        ) 字体支持较差，因此转写作 pak。
      </p>
      <p>
        另外地，“This is a blоg, not a blοg”中，о (U+043E{' '}
        <span style={{ fontVariant: 'all-small-caps' }}>
          CYRILLIC SMALL LETTER O
        </span>
        ) 和 o (U+006F{' '}
        <span style={{ fontVariant: 'all-small-caps' }}>
          LATIN SMALL LETTER O
        </span>
        ) 是不同的字符 ::滑稽::。
      </p>
      <h2 id="网站">网站</h2>
      <p>
        <a
          href="https://yixuan-wang.github.io/blog/"
          target="_blank"
          rel="noreferrer noopener"
        >
          本站
        </a>
        托管在 GitHub Pages 上，另有 Gitee Pages{' '}
        <a
          href="https://yixuan-wang.gitee.io/blog/"
          target="_blank"
          rel="noreferrer noopener"
        >
          镜像
        </a>
        。由于 Gitee Pages 服务不稳定，内容请以源站为准。
      </p>
      <h2 id="版权">版权</h2>
      <p>
        代码部分基于{' '}
        <a
          href="https://www.gatsbyjs.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Gatsby
        </a>{' '}
        构建，遵循 MIT 许可证。
      </p>
      <p>
        博客内容采用的许可：
        <br />
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <img
            alt="知识共享许可协议"
            style={{ marginTop: '.5em', borderWidth: 0 }}
            src="https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png"
          />
        </a>
        <br />
        本作品采用
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
        </a>
        进行许可。
      </p>
    </div>
  );
};

export default About;
