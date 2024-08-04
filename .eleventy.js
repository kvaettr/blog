
module.exports = function(eleventyConfig) {
    // Copy `src/style.css` to `_site/style.css`
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/images/");
    eleventyConfig.addPassthroughCopy("src/pages/");
  
return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    }
  };
};

const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

// If you already have a configuration file make sure you don’t end
// up with multiple `module.exports =` in the same file!
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(feedPlugin, {
		type: "rss", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Vaettr",
			subtitle: "Blogging as an aspect of my creative practice and self-education",
			base: "https://vaettr.com/",
			author: {
				name: "Vae",
				email: "", // Optional
			}
		}
	});
};