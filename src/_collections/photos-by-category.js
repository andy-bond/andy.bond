const categories = require('../_data/categories.json');
const gallery = require('../_data/gallery.json');
const getCategoryChunks = require('./_getCategoryChunks');

module.exports = () => {
  const pagesize = 24;
  const allItems = [...gallery.photos].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const result = getCategoryChunks(
    allItems,
    pagesize,
    categories.photos,
    'photos'
  );
  return result;
};
