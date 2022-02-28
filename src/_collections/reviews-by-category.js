const categories = require('../_data/categories.json');
const getCategoryChunks = require('./_getCategoryChunks');

module.exports = (collection) => {
  const pagesize = 16;
  const allItems = collection
    .getFilteredByGlob('./src/reviews/**/*.md')
    .filter((review) => review.data.draft !== true)
    .reverse();
  const result = getCategoryChunks(
    allItems,
    pagesize,
    categories.reviews,
    'reviews'
  );
  return result;
};
