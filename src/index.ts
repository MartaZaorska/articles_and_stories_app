import "./style.scss";
import Store from "./classes/Store";
import UI from "./classes/UI";
import Article from "./interfaces/Article";
import { getArticles } from "./api";

const cache: { [prop: string]: Article[] } = {};

async function init() {
  const activeCategory: string = Store.getCategory();
  const data: Article[] = await getArticles(activeCategory);
  UI.displayCategoriesList(activeCategory);
  UI.displayArticles(data);
  cache[activeCategory] = data;
}

init();
