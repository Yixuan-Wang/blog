import React from 'react';

import '../styles/components/footer.scss';
import ButtonToggleTheme from './ButtonToggleTheme';
// import ButtonRSS from './ButtonRSS';
import ButtonSocial from './ButtonSocial';

function Footer() {
  return (
    <footer>
      <span className="footer-tray">
        {/* <ButtonRSS className="footer-button" /> */}
        <ButtonSocial
          className="footer-button"
          socialName="github"
          href="https://github.com/Yixuan-Wang"
        />
        <ButtonSocial
          className="footer-button"
          socialName="zhihu"
          href="https://www.zhihu.com/people/tom-wang-19-44"
        />
      </span>
      <span>
        <ButtonToggleTheme className="footer-button" />
      </span>
    </footer>
  );
}

export default Footer;
