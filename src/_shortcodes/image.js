const Image = require('@11ty/eleventy-img');

module.exports = async (src, alt, config = {}) => {
  if (!config.widths) {
    config.widths = [300, 600, 1200];
  }

  if (!config.sizes) {
    config.sizes = '(max-width: 1200px) 100vw, 1200px';
  }

  let options = {
    widths: config.widths,
    formats: ['webp', 'jpeg'],
    urlPath: '/static/img/',
    outputDir: '_site/static/img/',
  };

  if (src.toLowerCase().endsWith('.gif')) {
    options.formats = ['webp', 'gif'];
    options.sharpOptions = {
      animated: true,
    };
  }

  let stats = await Image(src, options);

  let imageAttributes = {
    alt,
    sizes: config.sizes,
    loading: 'lazy',
    decoding: 'async',
    whitespaceMode: 'inline',
    ...config?.metadata,
  };

  if (config.preload) {
    delete imageAttributes.loading;
  }

  return Image.generateHTML(stats, imageAttributes);
};
