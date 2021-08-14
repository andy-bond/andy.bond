module.exports = (value) => {
  const scale = ['Unbearable', 'Painful', 'Awful', 'Bad', 'Mediocre', 'Okay', 'Good', 'Great', 'Amazing', 'Masterpiece'];
  return (value < scale.length + 1) ? scale[value - 1] : 'Unknown';
}
