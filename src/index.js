import _ from "lodash";
import "./style.css";
//import Pic1 from "./img/logo.jpg";

("use strict");

//Drink class
class Drink {
  constructor(name, price, type) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

//Order Factory Function
const Order = () => {
  const cart = [];

  const addToCart = (drink) => {
    let quantity = 1;

    if (cart.length > 0) {
      cart.forEach((item) => {
        if (item.drink.getName() === drink.getName()) {
          item.quantity++;
          quantity++;
        }
      });
    }
    if (quantity == 1) {
      cart.push({ drink, quantity });
    }
    updateCart();
  };

  const updateCart = () => {
    const parent = document.getElementById("cart_section");
    parent.innerHTML = "";

    cart.forEach((cart_item) => {
      const itemCard = createTag(parent, "div", null, "cart_item");
      createTag(
        itemCard,
        "p",
        null,
        "cart_item_name",
        cart_item.drink.getName()
      );
      createTag(
        itemCard,
        "p",
        null,
        "cart_item_price",
        "€ " + (cart_item.drink.getPrice() * cart_item.quantity).toFixed(2)
      );
      createTag(itemCard, "p", null, "cart_item_num", cart_item.quantity + "x");
      const dec_button = createTag(
        itemCard,
        "button",
        null,
        "decrease_num",
        " - "
      );

      // add EventListner to dec_button > call function removeItem()
      dec_button.addEventListener("click", () => {
        removeItem(cart_item);
      });
      // when clicked and give an argument to the function
    });
  };

  const removeItem = (cart_item) => {
    //add argument
    //dec quantity in cart
    cart_item.quantity--;
    //check if quantity == 0 > remove item from cart
    if (cart_item.quantity === 0) {
      let i = cart.indexOf(cart_item);
      cart.splice(i, 1);
    }

    updateCart();
  };

  return {
    addToCart,
  };
};

//create Tags
function createTag(parent_node, tag_node, id_name, class_name, content) {
  const tag = document.createElement(tag_node);

  if (parent_node != null) {
    parent_node.append(tag);
  } else {
    const startpoint = document.getElementById("content");
    startpoint.append(tag);
  }

  if (id_name != null) {
    tag.id = id_name;
  }

  if (class_name != null) {
    tag.className = class_name;
  }

  if (content != null) {
    tag.innerHTML = content;
  }

  return tag;
}

//create multiple tags
function createMultiTags(parent_node, tag_node, num, list, menu, links) {
  for (let i = 0; i < num; i++) {
    if (menu) {
      createTag(
        parent_node,
        tag_node,
        null,
        list[i],
        '<a href="#' + list[i].replace(/ /g, "-") + '">' + list[i] + "</a>"
      );
    } else if (links) {
      createTag(
        parent_node,
        tag_node,
        null,
        null,
        '<a class="' + list[i] + '" href="#"></a>'
      );
    } else {
      createTag(
        parent_node,
        tag_node,
        null,
        list[i].replace(/ /g, "_"),
        list[i]
      );
    }
  }
}

//create header
function createHeader() {
  const header = createTag(null, "header");
  //const myPic = new Image();
  //myPic.src = Pic1;
  const logo = createTag(
    header,
    "div",
    null,
    "logo_header",
    '<img src="./img/logo.jpg"></img>'
  );
  const heading = createTag(header, "h1", null, null, "Nici's Manufraktur");
  const nav_header = createTag(header, "nav", "nav_header");
  const menu = createTag(nav_header, "ul", null, "menu_header");

  let menu_list = ["  Armbänder ", "| Ohrringe |  ", " Halsketten "];
  createMultiTags(menu, "li", menu_list.length, menu_list, true);
}

//create card
function createCard(parent_section, drink, order) {
  const card = createTag(parent_section, "div", "card_section", "card");
  createTag(card, "h3", null, "drink_name", drink.getName());
  createTag(card, "p", null, "drink_price", `€ ${drink.getPrice().toFixed(2)}`);
  const button = createTag(card, "button", null, "add_button", "Hinzufügen");

  button.addEventListener("click", () => {
    order.addToCart(drink);
  });
}

//create menu
function createMenu(menulist) {
  const order = Order();
  const menu_section = createTag(null, "section", "menu_section");
  const menu_coffee = createTag(
    menu_section,
    "div",
    "menu_coffee",
    "menu_sub_section"
  );
  const menu_coffee_special = createTag(
    menu_section,
    "div",
    "menu_coffee_special",
    "menu_sub_section"
  );

  createTag(menu_coffee, "h2", null, "coffee_heading", "Uhren");
  createTag(
    menu_coffee_special,
    "h2",
    null,
    "coffee_s_heading",
    "Coffee Specials"
  );
  //

  menulist.forEach((drink) => {
    if (drink.getType() === "coffee") {
      createCard(menu_coffee, drink, order);
    } else if (drink.getType() === "coffee_special") {
      createCard(menu_coffee_special, drink, order);
    }
  });
}

//create order
function createOrder() {
  const order_section = createTag(null, "section", "order_section", "order");
  createTag(order_section, "h2", null, "order_heading", "Your Order");
  createTag(order_section, "div", "cart_section");
}

//create footer
function createFooter() {
  const footer = createTag(null, "footer");
  const logo = createTag(
    footer,
    "div",
    null,
    "logo_footer",
    '<img src="./img/logo.jpg"></img>'
  );
  const social = createTag(footer, "div", null, "social_footer");

  let social_list = [
    "fa-brands fa-facebook",
    "fa-brands fa-twitter",
    "fa-brands fa-instagram",
  ];
  createMultiTags(social, "li", social_list.length, social_list, false, true);

  // add space the logo
  // add the social links (facebook, instagram, twitter)
}

//main function
function init() {
  const espresso = new Drink("Uhrband", 2.85, "coffee");
  // ich hab es derzeit mal so übernommen aber ich will ein dropdown menü machen

  const cappuccino = new Drink("Ziffernblatt", 3.2, "coffee");
  // ich will ein dropdown menü machen
  const latte = new Drink("Latte", 3.2, "coffee");
  const bullet = new Drink("", 3.2, "coffee_special");

  const mocca = new Drink("Mocca Froffee", 3.2, "coffee_special");

  const menulist = [espresso, cappuccino, latte, bullet, mocca];

  createHeader();
  createMenu(menulist);
  createOrder();
  createFooter();
}

init();
