const categories = require('../_data/categories.json');
const gallery = require('../_data/gallery.json');
const getCategoryChunks = require("./_utils");

module.exports = (collection) => {
  const pagesize = 24;
  const allItems = gallery.photos;
  const categoryNames = categories.photos.map(i => i.name);
  const result = getCategoryChunks(allItems, pagesize, categoryNames, 'photos');
  return result;
}
