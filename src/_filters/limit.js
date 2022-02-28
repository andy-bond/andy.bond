module.exports = (arr, limit) => {
  return arr && arr.length > 0 ? arr.slice(0, limit) : arr;
};
