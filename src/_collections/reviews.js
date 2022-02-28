module.exports = (collection) => {
  const result = collection
    .getFilteredByGlob('./src/reviews/**/*.md')
    .reverse();
  return result;
};
