import { promises as fs } from "fs";
import * as opml from "opml";

export type Feed = {
  title: string;
  subs: { feed: any }[];
};

let feedCategories: Feed[] = [];

// TODO: Refactor to other package or just use JSON

async function parseOpmlFile(filePath: string): Promise<void> {
  try {
    const buffer = await fs.readFile(filePath);
    const opmltext = buffer.toString("utf8");

    const theOutline: any = await new Promise((resolve, reject) => {
      opml.parse(opmltext, (err: any, parsedOutline: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsedOutline);
        }
      });
    });

    feedCategories = theOutline.opml.body.subs.map((category: any) => ({
      title: category.title,
      text: category.text,
      subs: category.subs.sort((a: any, b: any) =>
        a.title.localeCompare(b.title),
      ),
    }));
  } catch (err) {
    console.error(err);
  }
}

export { feedCategories, parseOpmlFile };
