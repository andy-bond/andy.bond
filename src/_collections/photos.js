const gallery = require('../_data/gallery.json');

module.exports = () => {
  const result = [...gallery.photos].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return result;
};
