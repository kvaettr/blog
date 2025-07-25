Learning 11ty using this tutorial and good old trial and error.






# Basic Eleventy Demo

To get started, clone this repo, cd into it, and run `npm install`.

## Taking a step back

The steps to get it to this point ("step 1") were:

1. Make a new directory
2. cd into it
3. `npm init -y`
3. Install Eleventy with `npm install @11ty/eleventy`
4. Edit the package.json to add a `start` script of `npx @11ty/eleventy --serve` and a build script of `npx @11ty/eleventy`.
5. Create index.md
6. Run the start script. Eleventy processes index.md into the default output folder _site/ with the filename index.html.

## Step 2: Add a layout and styles

Checkout branch `2-layout-styles` to see this next step. In this step, I move our source code to a `/src/` folder, add a layout file, and add a CSS styles file.

To build it on your own:

**First, we move our source code to `/src/`:**

1. Create `/src/` and move `index.md` into it.
2. Create a `.eleventy.js` file in the root of the project with the following content:

```javascript
module.exports = function(eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
```

Most of those are defaults - change their name in this file if you'd like to use a different name. You'll need to restart your dev server for any changes in this file to take effect.

**Next, add a layout:**

1. Create `/src/_includes/layout.njk`. This is a [Nunjucks](https://mozilla.github.io/nunjucks/) template, but you can use [many others](https://www.11ty.dev/docs/). The stuff in curly brackets are things that we will fill in at build time:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Grab title from the page data and dump it here -->
    <title>{{ title }}</title>
  </head>
  <body>
    <!-- Grab the content from the page data and dump it here, and mark it as safe -->
    <!-- Safe docs: https://mozilla.github.io/nunjucks/templating.html#safe -->
    {{ content | safe }}
  </body>
  </html>
  ```
2. Add [YAML frontmatter](https://www.11ty.dev/docs/data-frontmatter/) to the top of our `/src/index.md` file to tell it which layout to use and to set the `title` data attribute:
  ```yaml
  ---
  layout: layout.njk
  title: The Best Eleventy Demo TM
  ---
  ```


**Finally, add some CSS:**

1. Create `/src/style.css`. Add some CSS to that file.
2. Add `<link rel="stylesheet" href="/style.css">` to the head of `/src/_includes/layout.njk`.
3. Now we need to tell Eleventy to ["pass through"](https://www.11ty.dev/docs/copy/#manual-passthrough-file-copy-(faster)) any CSS files. We do this in `.eleventy.js`:
  ```diff
  module.exports = function(eleventyConfig) {
  +  // Copy `src/style.css` to `_site/style.css`
  +  eleventyConfig.addPassthroughCopy("src/style.css");

    return {
  +    // When a passthrough file is modified, rebuild the pages:
  +    passthroughFileCopy: true,
      dir: {
        input: "src",
        includes: "_includes",
        data: "_data",
        output: "_site"
      }
    };
  };
  ```

## Step 3: Add a blog

Checkout branch `3-blog` to see this next step. In this step, I create blog posts and an index of those posts.

1. Create a `/src/blog/` folder.
2. Add our first post in that folder `welcome-to-my-blog.md`, remembering to set the layout and title:

```md
---
layout: layout.njk
title: Welcome to my blog
---

# Welcome

These are profound thoughts.
```

We can now access it at http://localhost:8080/blog/welcome-to-my-blog/, but it would be nice to get some links on our home page for all our posts. For that, we should make a [collection](https://www.11ty.dev/docs/collections/) for our blog posts. We will do this using tags.

**Tip**: You can log data to your terminal using the `log` filter which is included in Eleventy for free! For example, `{{ collections | log }}` to see all your collections. Right now, we only have the `all` collection which contains all our pages (home and first blog post).

1. Add a `blog` tag to our blog post's frontmatter:
  ```diff
  ---
  layout: layout.njk
  title: Welcome to my blog
  + tags: blog
  ---
  ```
2. Change our `/src/index.md` file to use Nunjucks instead by changing `.md` to `.njk` and changing the current content to html:
  ```html
  ---
  layout: layout.njk
  title: The Best Eleventy Demo TM
  ---

  <h1>Yo Eleventy</h1>
  <p>This site rocks.</p>
  ```
3. Render a list of blogs on our index/home page (`/src/index.njk`) usink a [Nunjucks for loop](https://mozilla.github.io/nunjucks/templating.html#for):
  ```html
  <ul>
  {% for post in collections.blog %}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {% endfor %}
  </ul>
  ```
4. Add another post and see it magically appear!
5. Add a "nav" to your home page so people can get back to it from the blog page. In `/src/_includes/layout.njk` inside the `<body>`:
  ```html
  <nav>
    <a href="/">Home</a>
  </nav>
  ```

This is when I'd probably make another layout for a blog post so that the title is automatically rendered in its `<h1>`, but then this baby demo would be longer. :)

Once you've had a chance to play with collections and other forms of data in Eleventy, I recommend you check out my article [Architecting data in Eleventy](https://sia.codes/posts/architecting-data-in-eleventy/) to learn more. It might be a bit much if this is your first time.
