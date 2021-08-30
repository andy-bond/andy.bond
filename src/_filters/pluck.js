module.exports = (arr, value, attr) => {
  return arr.filter((item) => {
    const obj = item.data ? item.data : item;
    return obj[attr] === value
  });
}
