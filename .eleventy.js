
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

import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
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
			subtitle: "Art, Music, Learning & Sharing",
			base: "https://vaettr.com/",
			author: {
				name: "Vae",
				email: "", // Optional
			}
		}
	});
};