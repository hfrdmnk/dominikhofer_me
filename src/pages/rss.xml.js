import rss from "@astrojs/rss";
import { getImage } from "astro:assets";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import footnotePlugin from "markdown-it-footnote";
import replaceLinkPlugin from "markdown-it-replace-link";
import htmlParser from "node-html-parser";
import sanitizeHtml from "sanitize-html";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "../consts";

const imagesGlob = import.meta.glob(
  "/src/assets/posts/**/*.{jpeg,jpg,png,gif}",
);

export async function GET(context) {
  // Setup Link Parser
  const parser = new MarkdownIt();
  parser.use(replaceLinkPlugin, {
    replaceLink: (link) => {
      if (link.startsWith("/")) {
        return context.site.origin + link;
      }
      return link;
    },
  });
  parser.use(footnotePlugin);

  // Get all posts and sort them by date
  const posts = await getCollection("posts");
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date);
  });

  // Create the feed
  const feed = [];

  // Build the feed
  for (const post of sortedPosts) {
    // Setup footer
    const footerContent = `
      <footer>
        <p><strong>---</strong></p>
        <p><strong>Thanks for being an RSS subscriber!</strong></p>
        <p>Reply to this post via <a href="mailto:hi@dominikhofer.me?subject=${encodeURIComponent(`Reply to: ${post.data.title}`)}">email</a>.</p>
      </footer>`;

    // Do all the image parsing stuff
    // Modify the post body
    const body = parser.render(post.body);
    // convert html string to DOM-like structure
    const html = htmlParser.parse(body);
    // hold all img tags in variable images
    const images = html.querySelectorAll("img");

    let firstImageUrl = null;

    for (const img of images) {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt");

      // Relative paths that are optimized by Astro build
      if (src.startsWith("../../")) {
        // remove prefix of `../../`
        const prefixRemoved = src.replace("../../", "");
        // create prefix absolute path from root dir
        const imagePathPrefix = `/src/${prefixRemoved}`;

        // call the dynamic import and return the module
        const imagePath = await imagesGlob[imagePathPrefix]?.()?.then(
          (res) => res.default,
        );

        if (imagePath) {
          const optimizedImg = await getImage({ src: imagePath });
          if (!firstImageUrl) {
            firstImageUrl = context.site.origin + optimizedImg.src;
          }
          // set the correct path to the optimized image
          img.setAttribute("src", context.site.origin + optimizedImg.src);
        }

        // Add figure and figcaption
        const figure = htmlParser.parse(`<figure>${img.outerHTML}</figure>`);
        const figcaption = htmlParser.parse(`<figcaption>${alt}</figcaption>`);
        figure.appendChild(figcaption);
        img.replaceWith(figure);
      } else {
        throw Error("src unknown");
      }
    }

    feed.push({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      author: SITE_AUTHOR,
      link: `/${post.slug}`,
      content: sanitizeHtml(html.toString() + footerContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      customData: post.data.visual
        ? `<media:content
    type="image/${post.data.visual.format == "jpg" ? "jpeg" : "png"}"
    width="${post.data.visual.width}"
    height="${post.data.visual.height}"
    medium="image"
    url="${context.site.origin + post.data.visual.src}" />
  `
        : firstImageUrl
          ? `<media:content
    type="image/jpeg"
    medium="image"
    url="${firstImageUrl}" />
  `
          : undefined,
    });
  }

  return rss({
    title: `All Posts | ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    site: context.site,
    trailingSlash: false,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
    },
    // stylesheet: "/styles/rss.xsl",
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: feed,
  });
}
