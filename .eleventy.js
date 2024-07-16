const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    // Copy `src/style.css` to `_site/style.css`
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      // which file extensions to process
      extensions: "html",
  
      // Add any other Image utility options here:
  
      // optional, output image formats
      formats: ["webp", "jpeg"],
      // formats: ["auto"],
  
      // optional, output image widths
      // widths: ["auto"],
  
      // optional, attributes assigned on <img> override these values.
      defaultAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    });
  };
  
return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
