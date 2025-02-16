import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

// Link my web components
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";

window.app = {
  store: Store,
  router: Router,
};

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
  loadData();
});
