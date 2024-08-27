
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
    // Copy `src/style.css` to `_site/style.css`
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/images/");
    eleventyConfig.addPassthroughCopy("src/pages/");
    eleventyConfig.addPassthroughCopy("src/bookmarks");
    eleventyConfig.addPassthroughCopy("src/watching");
    eleventyConfig.addPassthroughCopy("src/listening");
    eleventyConfig.addPassthroughCopy("src/fonts/");
    eleventyConfig.addPassthroughCopy("src/posts/");

    eleventyConfig.addPlugin(pluginRss);
    
   // custom collections 
   eleventyConfig.addCollection("notes", function(collection) {
    return collection.getFilteredByTags("watching", "reading", "listening", "bookmarks");
  })
    eleventyConfig.addCollection("bookmarks", function (collectionApi) {
    return collectionApi.getFilteredByTags("bookmarks");
  })
    eleventyConfig.addCollection("watching", function (collectionApi) {
    return collectionApi.getFilteredByTags("watching");
  })
    eleventyConfig.addCollection("listening", function (collectionApi) {
    return collectionApi.getFilteredByTags("listening");
  })
   eleventyConfig.addCollection("reading", function (collectionApi) {
    return collectionApi.getFilteredByTags("reading");
  })

    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
})


return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    }
  }};