type Quote = {
  quote: string;
  author: string;
  book: string;
};

export async function fetchQuote() {
  try {
    const response = await fetch(process.env.APP_ENDPOINT!);
    if (!response.ok) {
      throw new Error("No response");
    }
    const data = await response.json();

    const Resp: Quote = {
      quote: data.quote,
      author: data.author,
      book: data.book,
    };
    return Resp;
  } catch (error) {
    console.log("error fetching quote");
  }
}

export async function getPayload() {
  const data = await fetchQuote();
  let payload: string;
  let tmp = `${data?.quote}
${data?.author}

#motivation #stoicism #philosophy`;

  if (tmp.length > 300) {
    getPayload();
  }

  payload = tmp;

  return payload;
}
