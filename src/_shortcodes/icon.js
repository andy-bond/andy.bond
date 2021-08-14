const feather = require('feather-icons');

module.exports = (name, options) => {
  return feather.icons[name].toSvg(options);
}
