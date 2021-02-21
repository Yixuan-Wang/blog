const dictionary = {
  quarters: '分区',
  posts: '文章',
  sheets: '清单',
  talks: '言论',
  others: '其他',
  category: '类别',
  categories: '类别',
  tags: '标签',
  keywords: '关键词',
};

export default translator = en => dictionary[en] ?? dictionary[`${en}s`];
