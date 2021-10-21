module.exports = (arr, reverse, property) => {
  const filtered = arr.filter((item) => {
    const obj = item.data ? item.data : item;
    return obj[property] !== null;
  });

  const isNum = val => val == +val;
  const sorter = (a, b) => isNum(a[property]) && isNum(b[property]) ? +a[property] - b[property] : a[property] < b[property];

  filtered.sort(sorter);

  return reverse ? filtered.reverse() : filtered;
}
