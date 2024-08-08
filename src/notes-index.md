---
layout: layout.njk
title: notes
permalink: "/notes/"
---


<div class="content">
<div class="post-list">
<p><h2>Books</h2>
  <ul>
    {% for post in collections.reading | reverse %}
      <li><a href="{{ post.url }}">{{ post.date | postDate }} - {{ post.data.title }}</a></li>
    {% endfor %}
</ul></p>

<h2>Music</h2>
  <p><ul>
    {% for post in collections.listening | reverse %}
      <li><a href="{{ post.url }}">{{ post.date | postDate }} - {{ post.data.title }}</a></li>
    {% endfor %}
</ul></p>

<h2>Watching</h2>
  <p><ul>
    {% for post in collections.watching | reverse %}
      <li><a href="{{ post.url }}">{{ post.date | postDate }} - {{ post.data.title }}</a></li>
    {% endfor %}
</ul></p>

<h2>Links</h2>
  <p><ul>
    {% for post in collections.bookmarks | reverse %}
      <li><a href="{{ post.url }}">{{ post.date | postDate }} - {{ post.data.title }}</a></li>
    {% endfor %}
</ul></p>

</div>
</div>