const mdIterator = require('markdown-it-for-inline');
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

// markdownit link changes start here

  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })

    .use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
      const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href');

      if (href && (!href.includes('vaettr.com') && !href.startsWith('/') && !href.startsWith('#'))) {
        tokens[idx].attrPush(['target', '_blank']);
        tokens[idx].attrPush(['rel', 'noopener noreferrer']);
      }
    }).use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#"
    }));

//and end here


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