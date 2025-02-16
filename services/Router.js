const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const destination = event.target.getAttribute("href");
        Router.go(destination);
      });
    });

    // Event handler if user goes back or forward
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // Go to the current URL
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    console.log(`Navigating to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.innerText = "Home";
        break;
      case "/order":
        pageElement = document.createElement("h1");
        pageElement.innerText = "Order";
        break;
      default:
        if (route.startsWith("/product/")) {
          const productId = route.split("/")[2];
          pageElement = document.createElement("h1");
          pageElement.innerText = `Product ${productId}`;
          pageElement.dataset.id = productId;
          break;
        } else {
          pageElement = document.createElement("h1");
          pageElement.innerText = "Page not found";
          break;
        }
    }
    let main = document.querySelector("main");

    // Remove all children of main
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // Add the new page element to main
    if (pageElement) {
      main.appendChild(pageElement);
      // Set the scroll to 0
      window.scrollTo(0, 0);
    }
  },
};

export default Router;
