const gallery = require('../_data/gallery.json');

module.exports = (collection) => {
  const result = [...gallery.photos].reverse();
  return result;
}
