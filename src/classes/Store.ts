class Store {
  private static defaultCategory = "most-popular";
  static getCategory(): string {
    const localData = localStorage.getItem("articles_mz_app");
    return localData === null
      ? Store.defaultCategory
      : JSON.parse(localData).category;
  }

  static setCategory(category: string): void {
    localStorage.setItem("articles_mz_app", JSON.stringify({ category }));
  }
}

export default Store;
