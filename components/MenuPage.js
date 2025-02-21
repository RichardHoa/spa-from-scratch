export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);

    async function loadCSS() {
      const css = await fetch("/components/MenuPage.css");
      const cssText = await css.text();
      style.innerText = cssText;
    }

    loadCSS();
  }
  // When component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("menu-update", () => {
      this.render();
    });
    this.render();
  }

  render() {
    const menuElement = this.root.querySelector("#menu");
    if (app.store.menu) {
      menuElement.innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class="category"></ul>
        `;
        menuElement.appendChild(liCategory);

        category.products.map((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      menuElement.innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
