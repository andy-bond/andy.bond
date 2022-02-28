module.exports = (arr, limit, current) => {
  // Filters out current page
  const pageArr = arr.filter((page) => page.url !== current);

  // Randomizes remaining items
  pageArr.sort(() => {
    return 0.5 - Math.random();
  });

  // Returns array items up to limit
  return pageArr.slice(0, limit);
};
