const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const htmlmin = require('html-minifier');

// Shortcode Imports
const Image = require('./src/_shortcodes/image');
const Icon = require('./src/_shortcodes/icon');
const SvgIcon = require('./src/_shortcodes/svgIcon');
const Waves = require('./src/_shortcodes/waves');
const Rating = require('./src/_shortcodes/rating');

// Filter Imports
const Limit = require('./src/_filters/limit');
const RandomLimit = require('./src/_filters/randomLimit');
const Pick = require('./src/_filters/pick');
const Pluck = require('./src/_filters/pluck');
const ReadableDate = require('./src/_filters/date');
const SortBy = require('./src/_filters/sortBy');
const Ordinal = require('./src/_filters/ordinal');
const RatingPlacement = require('./src/_filters/rating-placement');
const ReadingTime = require('./src/_filters/reading-time');

// Collection Imports
const Reviews = require('./src/_collections/reviews');
const Posts = require('./src/_collections/posts');
const Photos = require('./src/_collections/photos');
const ReviewsByCategory = require('./src/_collections/reviews-by-category');
const PostsByCategory = require('./src/_collections/posts-by-category');
const PhotosByCategory = require('./src/_collections/photos-by-category');

module.exports = (eleventyConfig) => {
  /* --- Shortcodes --- */
  eleventyConfig.addNunjucksAsyncShortcode('image', Image);
  eleventyConfig.addShortcode('icon', Icon);
  eleventyConfig.addShortcode('svgIcon', SvgIcon);
  eleventyConfig.addShortcode('waves', Waves);
  eleventyConfig.addShortcode('rating', Rating);

  /* --- Filters --- */
  eleventyConfig.addFilter('limit', Limit);
  eleventyConfig.addFilter('randomLimit', RandomLimit);
  eleventyConfig.addFilter('pick', Pick);
  eleventyConfig.addFilter('pluck', Pluck);
  eleventyConfig.addFilter('date', ReadableDate);
  eleventyConfig.addFilter('sortBy', SortBy);
  eleventyConfig.addFilter('ordinal', Ordinal);
  eleventyConfig.addFilter('ratingPlacement', RatingPlacement);
  eleventyConfig.addFilter('readingTime', ReadingTime);

  /* Collections */
  eleventyConfig.addCollection('reviews', Reviews);
  eleventyConfig.addCollection('posts', Posts);
  eleventyConfig.addCollection('photos', Photos);
  eleventyConfig.addCollection('reviewsByCategory', ReviewsByCategory);
  eleventyConfig.addCollection('postsByCategory', PostsByCategory);
  eleventyConfig.addCollection('photosByCategory', PhotosByCategory);

  /* Eleventy Configuration */

  // Watch for Changes
  eleventyConfig.addWatchTarget('./src/static/scss/');
  eleventyConfig.addWatchTarget('./src/posts/');
  eleventyConfig.addWatchTarget('./src/reviews/');

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.js': './admin/config.js',
  });

  // Copy Items to Site
  eleventyConfig.addPassthroughCopy('./src/static/fonts');
  eleventyConfig.addPassthroughCopy('./src/static/js');
  eleventyConfig.addPassthroughCopy('./src/static/favicon');

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
