import Article from "../interfaces/Article";
import { CATEGORIES } from "../constants";

class UI {
  static displayCategoriesList(
    activeCategory: string,
    observer: IntersectionObserver
  ): void {
    const categoriesElement = document.getElementById("categories")!;
    categoriesElement.innerHTML = "";

    CATEGORIES.forEach((item: string) => {
      const categoryItem = document.createElement("li");
      categoryItem.classList.add("navbar__item");
      categoryItem.setAttribute("data-name", `${item}`);
      if (activeCategory === item)
        categoryItem.classList.add("navbar__item--active");
      categoryItem.innerText = item.replace("-", " ");
      categoriesElement.appendChild(categoryItem);
      observer.observe(categoryItem);
    });
  }

  static displaySpinner(): void {
    const articlesElement = document.getElementById("articles")!;
    articlesElement.innerHTML = `
      <p class="spinner">Loading...</p>
    `;
  }

  static displayArticles(
    data: Article[],
    observer: IntersectionObserver
  ): void {
    const articlesElement = document.getElementById("articles")!;

    if (data.length === 0) {
      articlesElement.innerHTML = `<p class="articles--empty">Empty</p>`;
    }

    articlesElement.innerHTML = "";
    data.forEach((item: Article) => {
      const articleItem = document.createElement("section");
      articleItem.classList.add("articles__item");
      let img = "";
      if (item.image !== "") {
        img = `<div class="articles__image"><img src="${item.image}" alt="${item.title}" /></div>`;
      }
      if (img === "") articleItem.classList.add("articles__item--noimage");

      articleItem.innerHTML += `
          ${img}
          <div class="articles__content">
            <p class="articles__text">
              <span>${item.type}</span>
              <span>${new Date(item.published_date).toDateString()}</span>
            </p>
            <header class="articles__header">
              <h2 class="articles__title"><a href="${
                item.url
              }" target="_blank" rel="noopener noreferrer">${
        item.title
      }</a></h2>
            </header>
            <p class="articles__text">${item.abstract}</p>
            <p class="articles__author">${item.author}</p>
          </div>
      `;
      articlesElement.appendChild(articleItem);
      observer.observe(articleItem);
    });
  }

  static scrollUp(): void {
    window.scroll({ left: 0, top: 0, behavior: "smooth" });
  }
}

export default UI;
