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
  "/src/assets/{posts,newsletter}/**/*.{jpeg,jpg,png,gif}",
);

async function createRSSFeed(context, options) {
  const {
    collectionName,
    feedTitle,
    feedDescription,
    siteDescription = SITE_DESCRIPTION,
    footerContent,
  } = options;

  // Markdown parser with custom plugins
  const parser = new MarkdownIt();
  parser.use(replaceLinkPlugin, {
    replaceLink: (link) => {
      if (link.startsWith("/")) {
        return context.site + link;
      }
      return link;
    },
  });
  parser.use(footnotePlugin);

  // Get items, sort and filter them
  const currentDate = new Date();
  const items = await getCollection(collectionName);
  const sortedItems = items
    .filter((entry) => new Date(entry.data.date) <= currentDate)
    .sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });

  const feed = [];

  for (const item of sortedItems) {
    const { content, firstImage } = await processContent(
      parser,
      item.body,
      context,
    );

    feed.push({
      title: item.data.title,
      pubDate: item.data.date,
      description: item.data.excerpt,
      author: SITE_AUTHOR,
      link:
        collectionName === "newsletter"
          ? `/newsletter/${item.slug}`
          : `/${item.slug}`,
      content: sanitizeHtml(
        content + footerContent(item.data.title, item.data.webmentionsLink),
        {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        },
      ),
      customData: getCustomData(item.data.visual, firstImage, context),
    });
  }

  return rss({
    title: `${feedTitle} | ${SITE_TITLE}`,
    description: feedDescription || siteDescription,
    site: context.site,
    trailingSlash: false,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
    },
    stylesheet: "/styles/rss.xsl",
    customData: `<atom:link href="${context.site}${collectionName}.xml" rel="self" type="application/rss+xml" />`,
    items: feed,
  });
}

// Process content and replace image paths
async function processContent(parser, body, context) {
  const parsedBody = parser.render(body);
  const html = htmlParser.parse(parsedBody);
  const images = html.querySelectorAll("img");

  let firstImage = null;

  for (const img of images) {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");

    if (src.startsWith("../../")) {
      const prefixRemoved = src.replace("../../", "");
      const imagePathPrefix = `/src/${prefixRemoved}`;

      const imagePath = await imagesGlob[imagePathPrefix]?.()?.then(
        (res) => res.default,
      );

      if (imagePath) {
        const optimizedImg = await getImage({ src: imagePath });
        if (!firstImage) {
          firstImage = optimizedImg;
        }
        img.setAttribute("src", context.site + optimizedImg.src);
      }

      const figure = htmlParser.parse(`<figure>${img.outerHTML}</figure>`);
      const figcaption = htmlParser.parse(
        `<figcaption style="text-align: center;">${alt}</figcaption>`,
      );
      figure.appendChild(figcaption);
      img.replaceWith(figure);
    } else {
      throw Error("src unknown");
    }
  }

  return { content: html.toString(), firstImage };
}

// Get custom data for media:content tag
function getCustomData(visual, firstImage, context) {
  if (visual) {
    return `<media:content
      type="image/${visual.format == "jpg" ? "jpeg" : "png"}"
      width="${visual.width}"
      height="${visual.height}"
      medium="image"
      url="${context.site + visual.src}" />
    `;
  } else if (firstImage) {
    return `<media:content
      type="image/${firstImage.options.src.format == "jpg" ? "jpeg" : "png"}"
      width="${firstImage.options.src.width}"
      height="${firstImage.options.src.height}"
      medium="image"
      url="${context.site + firstImage.options.src.src}" />
    `;
  }
  return undefined;
}

export { createRSSFeed };
