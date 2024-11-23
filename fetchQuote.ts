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
      book: data.bookm,
    };
    return Resp;
  } catch (error) {
    console.log("error fetching quote");
  }
}

function buildPayload(resp: Quote) {}
