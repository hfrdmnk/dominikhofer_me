import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import replaceLinkPlugin from "markdown-it-replace-link";
import sanitizeHtml from "sanitize-html";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "../consts";

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

  // Get all posts and sort them by date
  const posts = await getCollection("posts");
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date);
  });

  console.log(sortedPosts[0].data.visual);

  return rss({
    title: `All Posts | ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    site: context.site,
    trailingSlash: false,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
    },
    stylesheet: "/styles/rss.xsl",
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: sortedPosts.map((post) => {
      const footerContent = `
      <footer style="margin-top: 32px;">
        <p style="font-weight: bold;">Thanks for being an RSS subscriber!</p>
        <p>Reply to this post via <a href="mailto:hi@dominikhofer.me?subject=${encodeURIComponent(`Reply to: ${post.data.title}`)}">email</a>.</p>
      </footer>`;
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        author: SITE_AUTHOR,
        link: `/${post.slug}`,
        content: sanitizeHtml(parser.render(post.body) + footerContent, {
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
          : undefined,
      };
    }),
  });
}
