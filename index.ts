import { BskyAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import * as process from "process";
import { fetchQuote } from "./fetchQuote";

dotenv.config();

const agent = new BskyAgent({
  service: "https://bsky.social",
});

async function main() {
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  const data = await fetchQuote();
  await agent.post({
    text: `${data?.quote}
    ${data?.author} `,
  });
}

main();
