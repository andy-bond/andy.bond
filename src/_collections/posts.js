module.exports = (collection) => {
  const result = collection.getFilteredByGlob("./src/posts/**/*.md").filter((post) => post.data.draft !== true).reverse();
  return result;
}
