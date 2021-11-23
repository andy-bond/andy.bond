module.exports = (arr, currentRating) => {
  const copy = arr.slice().sort((a, b) => {
    const objA = a.data ? a.data : a;
    const objB = b.data ? b.data : b;

    const propA = objA.rating;
    const propB = objB.rating;

    return propB - propA;
  });

  const ratings = copy.map(i => i.data.rating);
  const unique = ratings.filter((x, i) => ratings.indexOf(x) === i);

  return unique.indexOf(currentRating) + 1;
}
