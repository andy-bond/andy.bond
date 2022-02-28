module.exports = (arr, value) => {
  return arr.find((item) => {
    const obj = item.data ? item.data : item;
    return obj.name === value ? obj : null;
  });
};
