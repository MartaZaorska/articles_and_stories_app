import "./style.scss";
import Store from "./classes/Store";
import UI from "./classes/UI";
import Article from "./interfaces/Article";
import { getArticles } from "./api";

//DOM ELements
const categoriesElement = document.getElementById("categories")!;
const scrollUpButton = document.getElementById("scroll-up")!;

const cache: { [prop: string]: Article[] } = {};

// IntersectionObserver
const observer: IntersectionObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        element.classList.add("active");
      }
    });
  },
  { threshold: 0.25 }
);

async function init() {
  UI.displaySpinner();
  const activeCategory: string = Store.getCategory();
  const data: Article[] = await getArticles(activeCategory);
  UI.displayCategoriesList(activeCategory, observer);
  UI.displayArticles(data, observer);
  cache[activeCategory] = data;
}

//Event Handlers

window.addEventListener("scroll", () => {
  const scrollY: number = window.pageYOffset;
  const scrollButtonActive: boolean = scrollUpButton.classList.contains(
    "scroll__button--active"
  );
  if (scrollY >= 350 && !scrollButtonActive) {
    scrollUpButton.classList.add("scroll__button--active");
  }
  if (scrollY < 350 && scrollButtonActive) {
    scrollUpButton.classList.remove("scroll__button--active");
  }
});

scrollUpButton.addEventListener("click", UI.scrollUp);

categoriesElement.addEventListener("click", async (e: Event) => {
  const element = e.target as HTMLElement;
  if (element.classList.contains("navbar__item--active")) return;
  if (element.classList.contains("navbar__item")) {
    const prevNavbarItem = document.querySelector(".navbar__item--active")!;
    prevNavbarItem.classList.remove("navbar__item--active");
    element.classList.add("navbar__item--active");

    const category: string = `${element.getAttribute("data-name")}`;
    let data: Article[] = [];
    if (cache[category]) {
      data = cache[category];
    } else {
      UI.displaySpinner();
      data = await getArticles(category);
      cache[category] = data;
    }
    UI.displayArticles(data, observer);
    Store.setCategory(category);
  }
});

document.addEventListener("DOMContentLoaded", init);
