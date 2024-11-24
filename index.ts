import { AppBskyRichtextFacet, BskyAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import * as process from "process";
import { getPayload } from "./fetchQuote";

dotenv.config();

const agent = new BskyAgent({
  service: "https://bsky.social",
});

async function main() {
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  const data = await getPayload();
  let start = data.indexOf("#");
  await agent.post({
    text: data,
    facets: [
      {
        index: {
          byteStart: start,
          byteEnd: data.length - 1,
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#tag",
            tag: data.replace(/^#/, ""),
          },
        ],
      },
    ],
  });
}

main();
