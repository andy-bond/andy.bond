module.exports = (collection) => {
  const result = collection.getFilteredByGlob('./src/posts/**/*.md').reverse();
  return result;
};
