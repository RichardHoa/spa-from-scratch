import API from "./API.js";

const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  set(target, key, value) {
    target[key] = value;
    if (key === "cart") {
      window.dispatchEvent(new Event("cart-update"));
    }
    if (key === "menu") {
      window.dispatchEvent(new Event("menu-update"));
    }
    return true;
  },
});

export default proxiedStore;
