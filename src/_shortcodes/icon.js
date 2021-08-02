const feather = require('feather-icons');

module.exports = (name) => {
  return feather.icons[name].toSvg();
}
