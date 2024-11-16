import { createRSSFeed } from "../utils/rssCreator";

export async function GET(context) {
  const blogFooterContent = (title, webmentionsLink) => `
    <footer>
      <p><strong>---</strong></p>
      <p><strong>Thanks for being an RSS subscriber!</strong></p>
      <p>Reply to this post via <a href="mailto:hi@dominikhofer.me?subject=${encodeURIComponent(`Reply to: ${title}`)}">email</a>.</p>
      ${webmentionsLink ? `<p>If you're on Mastodon, you can also reply to <a href="${webmentionsLink}">this post</a>.</p>` : ""}
    </footer>`;

  return createRSSFeed(context, {
    collectionName: "posts",
    feedTitle: "All Posts",
    footerContent: blogFooterContent,
  });
}
