module.exports = (collection) => {
  const result = collection.getFilteredByGlob("./src/reviews/*.md").filter((review) => review.data.draft !== true).reverse();
  return result;
}
