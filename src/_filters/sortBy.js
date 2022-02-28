module.exports = (arr, property) => {
  const copy = arr.slice();

  const filtered = copy.filter((item) => {
    const obj = item.data ? item.data : item;
    return obj[property] !== null;
  });

  return filtered.sort((a, b) => {
    const objA = a.data ? a.data : a;
    const objB = b.data ? b.data : b;

    const propA = objA[property];
    const propB = objB[property];

    return propA - propB;
  });
};
