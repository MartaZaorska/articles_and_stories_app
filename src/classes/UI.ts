import Article from "../interfaces/Article";

class UI {
  static displayCategoriesList(activeCategory: string): void {}

  static displayArticles(data: Article[]): void {}

  static scrollUp(): void {
    window.scroll({ left: 0, top: 0, behavior: "smooth" });
  }
}

export default UI;
