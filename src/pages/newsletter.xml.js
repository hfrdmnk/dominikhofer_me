import { createRSSFeed } from "../utils/rssCreator";

export async function GET(context) {
  const newsletterFooterContent = (title) => `
    <footer>
      <p><strong>---</strong></p>
      <p><strong>Thanks for subscribing to my newsletter!</strong></p>
      <p>Reply to this issue via <a href="mailto:hi@dominikhofer.me?subject=${encodeURIComponent(`Reply to: ${title}`)}">email</a>.</p>
    </footer>`;

  return createRSSFeed(context, {
    collectionName: "newsletter",
    feedTitle: "Tiny Sparks Newsletter",
    feedDescription:
      "Simple ideas worth sharing. Coming to an inbox near you every other Saturday.",
    footerContent: newsletterFooterContent,
  });
}
