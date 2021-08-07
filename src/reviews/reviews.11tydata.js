const path = require('path');
const getColors = require('get-image-colors');

module.exports = {
  layout: "review",
  tags: [
    "review"
  ],
  eleventyComputed: {
    color: data => {
      if (data.image) {
        // console.log(data);
        const image = path.join(__dirname, data.page.fileSlug, data.image);
        return getColors(image).then(colors => {
          return colors[0].alpha(0.25).css();
        })
      }
      return '';
    }
  }
}
