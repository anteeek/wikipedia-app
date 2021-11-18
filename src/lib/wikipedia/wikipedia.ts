export async function searchWikipedia(
  phrase: string,
  options: { limit: number }
): Promise<IWikipediaResult[]> {
  return await fetch(
    `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=%22${phrase}%22&srlimit=${
      options.limit || 10
    }`
  )
    .then((res) => res.json())
    .then((result) => {
      return result.query.search;
    });
}

export interface IWikipediaResult {
  pageid: number;
  size: number;
  snippet: string;
  timestamp: string;
  title: string;
  wordcount: number;
}
