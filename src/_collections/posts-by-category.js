const categories = require('../_data/categories.json');
const getCategoryChunks = require('./_getCategoryChunks');

module.exports = (collection) => {
  const pagesize = 10;
  const allItems = collection
    .getFilteredByGlob('./src/posts/**/*.md')
    .reverse();
  const result = getCategoryChunks(
    allItems,
    pagesize,
    categories.posts,
    'posts'
  );
  return result;
};
