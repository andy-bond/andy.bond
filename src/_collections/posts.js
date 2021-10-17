const categories = require('../_data/categories.json');
const getCategoryChunks = require("./_utils");

module.exports = (collection) => {
  const pagesize = 10;
  const allItems = collection.getFilteredByGlob("./src/posts/*.md").reverse();
  const categoryNames = categories.posts.map(i => i.name);
  const result = getCategoryChunks(allItems, pagesize, categoryNames, 'posts');
  return result;
}
