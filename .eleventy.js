const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  /* --- Shortcodes --- */
  /* eleventyConfig.addShortcode("read", (item) => {console.log(item);return `<a
class="read-item"
style="background-image: url(http://covers.openlibrary.org/b/ISBN/${item.data.isbn}-M.jpg)"
href="${item.url}"
alt="${item.data.title} by ${item.data.author}"
></a>`}); */

eleventyConfig.addShortcode("read", (item) => `<div class="read-item">
  <img src="https://covers.openlibrary.org/b/ISBN/${item.data.isbn}-M.jpg" loading="lazy">
  <div class="info">
    <h1>${item.data.title}</h1>
    <p class="read-author">by ${item.data.author}</p>
    <p class="read-rating">${Array(5).fill('☆').fill('★', 0, item.data.rating).join('')}</p>
    <a href="${item.url}">Read Review →</a>
  </div>
</div>
`);

  /* --- Filters --- */

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Human Readable Date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  /* Eleventy Configuration */

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  // Watch for SCSS
  eleventyConfig.addWatchTarget("./src/static/scss/");

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.load(contents)
  );

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  eleventyConfig.addPassthroughCopy("./src/static/js");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("./src/android-chrome-256x256.png");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/browserconfig.xml");
  eleventyConfig.addPassthroughCopy("./src/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("./src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("./src/mstile-150x150.png");
  eleventyConfig.addPassthroughCopy("./src/safari-pinned-tab.svg");
  eleventyConfig.addPassthroughCopy("./src/site.webmanifest");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
