const Image = require("@11ty/eleventy-img");

module.exports = (src) => {

  let options = {
    widths: [1200],
    formats: ["jpeg"],
    urlPath: "/static/img/",
    outputDir: "_site/static/img/"
  };

  Image(src, options);

  let stats = Image.statsSync(src, options);

  return stats?.jpeg?.[0]?.url ?? undefined;
}
