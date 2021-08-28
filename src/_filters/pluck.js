module.exports = (arr, value, attr) => {
  return arr.filter((item) => item.data[attr] === value);
}
