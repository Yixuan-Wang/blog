import { Link } from 'gatsby';
import React from 'react';

import SEO from '../components/SEO';

const NotFoundPage = () => (
  <>
    <SEO title="404" />
    <h1>404: Not Found</h1>
    <p>
      这个页面不存在…… 试试
      <a onClick={() => window.history.back()}>返回上一页</a>
      或者
      <Link to="/">回到主页</Link>。
    </p>
  </>
);

export default NotFoundPage;
