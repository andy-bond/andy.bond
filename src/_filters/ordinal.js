module.exports = (number) => {
  let modTen = number % 10;
  let modHundred = number % 100;

  if (modTen == 1 && modHundred != 11) {
    return number + 'st';
  }

  if (modTen == 2 && modHundred != 12) {
    return number + 'nd';
  }

  if (modTen == 3 && modHundred != 13) {
    return number + 'rd';
  }

  return number + 'th';
};
