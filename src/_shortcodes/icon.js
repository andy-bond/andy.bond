module.exports = (name, options) => {
  const icon = require(`lucide-static/lib/icons/${name}.js`);
  const iconAsString = `${icon}`;
  return `${iconAsString.slice(0, 4)} class="lucide-icon lucide-${name}" ${iconAsString.slice(4)}`;
}
