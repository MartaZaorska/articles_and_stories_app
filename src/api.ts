import Article from "./interfaces/Article";

function getImageMostPopular(data: any[]): string {
  let imageURL: string = "";
  const mediaImage = data.find((item: any) => item.type === "image");
  if (mediaImage && mediaImage["media-metadata"].length > 0) {
    imageURL = mediaImage["media-metadata"].sort(
      (a: any, b: any) => b.width - a.width
    )[0].url;
  }
  return imageURL;
}

function getImageTopStories(data: any[]): string {
  let imageURL = "";
  const images = data
    .filter((item: any) => item.type === "image")
    .sort((a: any, b: any) => b.width - a.width);
  if (images.length > 0) {
    imageURL = images[0].url;
  }
  return imageURL;
}

async function fetchMostPopular(): Promise<Article[]> {
  const response = await fetch(
    `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${process.env.API_KEY}`
  );
  const data = await response.json();
  const results: Article[] = data.results.map((item: any) => ({
    title: item.title,
    author: item.byline,
    type: item.type,
    published_date: new Date(item.published_date).getTime(),
    url: item.url,
    abstract: item.abstract,
    image: getImageMostPopular(item.media),
  }));

  return results;
}

async function fetchTopStories(category: string): Promise<Article[]> {
  const response = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${process.env.API_KEY}`
  );
  const data = await response.json();
  const results: Article[] = data.results.map((item: any) => ({
    title: item.title,
    author: item.byline,
    type: item.item_type,
    published_date: new Date(item.published_date).getTime(),
    url: item.url,
    abstract: item.abstract,
    image: getImageTopStories(item.multimedia),
  }));
  return results;
}

export function getArticles(category: string): Promise<Article[]> {
  return category === "most-popular"
    ? fetchMostPopular()
    : fetchTopStories(category);
}
