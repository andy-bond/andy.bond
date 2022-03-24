const Image = require('@11ty/eleventy-img');

module.exports = async (src, alt, metadata, sizes, widths) => {
  if (!widths) {
    widths = [300, 600, 1200];
  }

  if (!sizes) {
    sizes = '(max-width: 1200px) 100vw, 1200px';
  }

  let options = {
    widths,
    formats: ['avif', 'webp', 'jpeg'],
    urlPath: '/static/img/',
    outputDir: '_site/static/img/',
  };

  let stats = await Image(src, options);

  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
    whitespaceMode: 'inline',
    camera: metadata?.camera,
    fstop: metadata?.fstop,
    exposure: metadata?.exposure,
    focalLength: metadata?.focalLength,
    iso: metadata?.iso,
    location: metadata?.location,
  };

  // let stats = Image.statsSync(src, options);

  return Image.generateHTML(stats, imageAttributes);
};
