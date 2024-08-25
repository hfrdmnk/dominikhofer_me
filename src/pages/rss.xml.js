import { createRSSFeed } from "../utils/rssCreator";

export async function GET(context) {
  const blogFooterContent = (title) => `
    <footer>
      <p><strong>---</strong></p>
      <p><strong>Thanks for being an RSS subscriber!</strong></p>
      <p>Reply to this post via <a href="mailto:hi@dominikhofer.me?subject=${encodeURIComponent(`Reply to: ${title}`)}">email</a>.</p>
      <p>Or subscribe to my bi-weekly newsletter if you want to stay up date with everything I do: <a href="https://dominikhofer.me/newsletter">Tiny Sparks</a>.</p>
    </footer>`;

  return createRSSFeed(context, {
    collectionName: "posts",
    feedTitle: "All Posts",
    footerContent: blogFooterContent,
  });
}
