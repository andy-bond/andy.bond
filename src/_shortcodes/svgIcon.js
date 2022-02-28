module.exports = (name) => {
  const icon = require(`../static/icons/${name}.js`);
  return `${icon}`;
};
