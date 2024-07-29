//Subtotal: Represents the total before additional factors (taxes, discounts, shipping) are applied.
//destructuring
const cartContainer = document.getElementById('cart');
const productsContainer = document.getElementById('products-container');
const dessertContainer = document.getElementById('dessert-container');
const cartBtn = document.getElementById('cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const totalNumberOfItems = document.getElementById('total-items');
const cartSubTotal = document.getElementById('subtotal');
const cartTaxes = document.getElementById('taxes');
const cartTotal = document.getElementById('total');
const showHideCartSpan = document.getElementById('show-hide-cart');

let isCartShowing = false;


const products = [
    {
      id: 1,
      name: "Vanilla Cupcakes (6 Pack)",
      price: 12.99,
      category: "Cupcake",
    },
    {
      id: 2,
      name: "French Macaron",
      price: 3.99,
      category: "Macaron",
    },
    {
      id: 3,
      name: "Pumpkin Cupcake",
      price: 3.99,
      category: "Cupcake",
    },
    {
      id: 4,
      name: "Chocolate Cupcake",
      price: 5.99,
      category: "Cupcake",
    },
    {
      id: 5,
      name: "Chocolate Pretzels (4 Pack)",
      price: 10.99,
      category: "Pretzel",
    },
    {
      id: 6,
      name: "Strawberry Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 7,
      name: "Chocolate Macarons (4 Pack)",
      price: 9.99,
      category: "Macaron",
    },
    {
      id: 8,
      name: "Strawberry Pretzel",
      price: 4.99,
      category: "Pretzel",
    },
    {
      id: 9,
      name: "Butter Pecan Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 10,
      name: "Rocky Road Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 11,
      name: "Vanilla Macarons (5 Pack)",
      price: 11.99,
      category: "Macaron",
    },
    {
      id: 12,
      name: "Lemon Cupcakes (4 Pack)",
      price: 12.99,
      category: "Cupcake",
    },
  ];


  products.forEach(
    ({name, id, price, category}) => {
        dessertContainer.innerHTML += `<div class='dessert-card'><h2>${name}</h2><p class='dessert-price'>$${price}</p><p class='product-category'>${category}</p><button id='${id}' class='btn add-to-cart-btn'>Add to cart</button></div>`;
    }
  )

  class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }

    addItem(id, products){
        const product = products.find((item) => item.id === id);
        this.items.push(product);
        const {name, price} = product;
        const countPerProduct = {};
        this.items.forEach(item => {countPerProduct[item.id] = (countPerProduct[item.id]||0) + 1;})
        const productCount = countPerProduct[product.id];
        const productCountSpan = document.getElementById(`product-count-span-${id}`)
        productCount > 1 ? productCountSpan.textContent = `${productCount}x` : productsContainer.innerHTML += `<div><p><span id='product-count-span-${id}' class='product-count'>${productCount}</span>${name}</p>${price}</div>`;
    }

    getCounts() {
        return this.items.length;
    }

    clearCart() {
        if(!this.items.length) {
            alert('Your shopping cart is empty');
            return;
        };
        const isCartCleard = confirm('Are you sure you want to clear all items in your cart?');//confirm returns true or false
        if (isCartCleard){
            this.items =[];
            this.total = 0;
            productsContainer.innerHTML = '';
            totalNumberOfItems.textContent = '0';
            cartSubTotal.textContent = '0';
            cartTaxes.textContent = '0';
            cartTotal.textContent = '0';
        }
    }

    calculateTaxes(amount){
        return parseFloat(((this.taxRate/100)*amount).toFixed(2));
    }
    calculateTotal(){
        const subtotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = this.calculateTaxes(subtotal)
        this.total = subtotal + tax;
        cartSubTotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTaxes.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;
        totalNumberOfItems.textContent = this.getCounts() + ' items';
        return this.total;

    }

    
  }

  const cart = new ShoppingCart;
  const addToCartBtns = document.getElementsByClassName('add-to-cart-btn');

  [...addToCartBtns].forEach((btn)=> {
    btn.addEventListener('click', (event) => {cart.addItem(Number(event.target.id), products);//event.target.id is a way to access the id attribute of the element that triggered an event in Javascript.
    cart.calculateTotal();
  });
});


  cartBtn.addEventListener('click', () => {
        isCartShowing = !isCartShowing;
        showHideCartSpan.textContent = isCartShowing? 'Hide': 'Show';
        cartContainer.style.display = isCartShowing? 'block': 'none';
  })


clearCartBtn.addEventListener('click',cart.clearCart.bind(cart)
    //cart.clearCart();//Without bind, the clearCart method might not work correctly because the this keyword would refer to the button element instead of the ShoppingCart instance. This would lead to errors or unexpected behavior when attempting to access or modify properties like this.items and this.total.
    //although the cart.clearCart() statement seems to work fine, i think it is because visual studio do something with 'this';;;;;; or this ::::::This version works because when the arrow function is executed, it directly calls cart.clearCart(). Arrow functions do not have their own this context and will use the this value from the surrounding lexical scope. In this case, since cart is already available in the scope, cart.clearCart() will work correctly and this inside clearCart will refer to the cart instance.
)