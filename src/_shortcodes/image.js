const Image = require("@11ty/eleventy-img");

module.exports = (src, alt, sizes = "(max-width: 1200px) 100vw, 1200px", widths = [300, 600, 1200]) => {
  let options = {
    widths,
    formats: ["avif", "webp", "jpeg"],
    urlPath: "/static/img/",
    outputDir: "_site/static/img/"
  };

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    whitespaceMode: 'inline'
  };

  let metadata = Image.statsSync(src, options);

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}
