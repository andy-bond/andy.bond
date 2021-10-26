module.exports = (arr, value, attr) => {
  const copy = arr.slice();

  return value ? copy.filter((item) => {
    const obj = item.data ? item.data : item;
    return obj[attr] === value
  }) : [];
}
