const categories = require('../_data/categories.json');
const getCategoryChunks = require("./_utils");

module.exports = (collection) => {
  const pagesize = 16;
  const allItems = collection.getFilteredByGlob("./src/reviews/*.md").filter((review) => review.data.draft !== true).reverse();
  const categoryNames = categories.reviews.map(i => i.name);
  const result = getCategoryChunks(allItems, pagesize, categoryNames, 'reviews');
  return result;
}
