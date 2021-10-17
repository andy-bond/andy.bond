const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

// Shortcode Imports
const Image = require('./src/_shortcodes/image');
const Review = require('./src/_shortcodes/review');
const Icon = require('./src/_shortcodes/icon');
const Waves = require('./src/_shortcodes/waves');
const CircularChart = require('./src/_shortcodes/circular-chart');
const Rating = require('./src/_shortcodes/rating');

// Filter Imports
const Limit = require('./src/_filters/limit');
const Pick = require('./src/_filters/pick');
const Pluck = require('./src/_filters/pluck');
const ReadableDate = require('./src/_filters/date');

// Collection Imports
const ReviewsByCategory = require("./src/_collections/reviews");
const PostsByCategory = require("./src/_collections/posts");
const PhotosByCategory = require("./src/_collections/photos");

module.exports = function (eleventyConfig) {

  /* --- Shortcodes --- */
  eleventyConfig.addShortcode("image", Image);
  eleventyConfig.addShortcode("review", Review);
  eleventyConfig.addShortcode("icon", Icon)
  eleventyConfig.addShortcode("waves", Waves);
  eleventyConfig.addShortcode("circularChart", CircularChart);
  eleventyConfig.addShortcode("rating", Rating);

  /* --- Filters --- */
  eleventyConfig.addFilter("limit", Limit);
  eleventyConfig.addFilter("pick", Pick);
  eleventyConfig.addFilter("pluck", Pluck);
  eleventyConfig.addFilter("date", ReadableDate);

  /* Collections */
  eleventyConfig.addCollection("reviewsByCategory", ReviewsByCategory);
  eleventyConfig.addCollection("postsByCategory", PostsByCategory);
  eleventyConfig.addCollection("photosByCategory", PhotosByCategory);

  /* Eleventy Configuration */

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  // Watch for Changes
  eleventyConfig.addWatchTarget("./src/static/scss/");
  eleventyConfig.addWatchTarget("./src/posts/");
  eleventyConfig.addWatchTarget("./src/reviews/");

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });

  // Copy Items to Site
  // eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addPassthroughCopy("./src/static/js");

  // Copy relative images to site
  // eleventyConfig.addPassthroughCopy("./src/posts/**/*.jpg");
  // eleventyConfig.addPassthroughCopy("./src/reviews/**/*.jpg");
  // eleventyConfig.addPassthroughCopy("./src/photos/*.jpg");

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
    markdownTemplateEngine: "njk"
  };
};
