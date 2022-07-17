// Cart Content
const $cart = document.querySelector('.cart');
const $cartWindow = document.querySelector('.cart-window');
const $windowContent = document.querySelector('.window-content');
const $removeWindowContent = document.querySelector('.window-damp');
const $cartContainer = document.getElementById('cartContainer');

// Add to Cart
const $price = document.querySelector('.price');
const $productNumber = document.querySelector('.complete-number');
const $deductProduct = document.querySelector('.deduct');
const $plusProduct = document.querySelector('.plus');
const $addToCart = document.querySelector('.add-choice');

let state = {
   isCartShown: false,
   currentProduct: {
      id: 1,
      count: 1,
   },
   products: {
      1: {
         id: 1,
         name: 'Fall Limited Edition Sneakers',
         pictureUrl: 'img/cart-product-photo.png',
         price: 125,
      },
      2: {
         id: 2,
         name: 'Fall Limited Edition Sneakers',
         pictureUrl: 'cart-product-photo.png',
         price: 325,
      },
   },
   cart: [],
   _listeners: [],

   decrementProductCount() {
      state.currentProduct.count = Math.max(1, state.currentProduct.count - 1);
      state.changed();
   },

   incrementProductCount() {
      state.currentProduct.count += 1;
      state.changed();
   },

   onChange(listener) {
      this._listeners.push(listener);
   },

   changed() {
      this._listeners.forEach((listener) => listener(this));
   },

   toggleCart() {
      this.isCartShown = !this.isCartShown;
      this.changed();
   },

   addToCart() {
      if (this.cart.includes(this.currentProduct)) {
         return;
      }
      this.cart.push(this.currentProduct);
      this.changed();
   },

   removeFromCart(id) {
      this.cart = this.cart.filter((cartItem) => cartItem.id !== id);
      this.changed();
   },
};

state.onChange(renderCart);
state.onChange(renderCurrentProduct);

$cart.addEventListener('click', () => state.toggleCart());
$plusProduct.addEventListener('click', () => state.incrementProductCount());
$deductProduct.addEventListener('click', () => state.decrementProductCount());
$addToCart.addEventListener('click', () => state.addToCart());
$cartContainer.addEventListener('click', (event) => {
   if (event.target.hasAttribute('data-product-id')) {
      state.removeFromCart(
         parseInt(event.target.getAttribute('data-product-id'), 10),
      );
   }
});

state.changed();

function renderCart(state) {
   if (state.isCartShown) {
      $cartContainer.innerHTML = `
      <div class="cart-window">
         <div class="window-word">
            Cart
         </div>
         <hr />
         <div class="window-choice">
            ${state.cart.map((cartItem) => {
               const product = state.products[cartItem.id];

               return `
                 <div class="window-icon">
                     <img
                        class="icon"
                        src="${product.pictureUrl}"
                        alt="sneakers"
                     />
                  </div>
                  <div class="window-content">
                     ${product.name} ${formatPrice(product.price)} X ${
                  cartItem.count
               } ${formatPrice(product.price * cartItem.count)}</div>
               <div class="window-dump">
                     <img data-product-id="${
                        cartItem.id
                     }" class="dump" src="img/dump.png" alt="dump" />
                </div>
                `;
            })}
            </div>
            <div class="window-button">
               <button class="button">Checkout</button>
            </div>
      </div>
      `;
   } else {
      $cartContainer.innerHTML = '';
   }
}

function renderCurrentProduct(state) {
   $productNumber.textContent = state.currentProduct.count;
   $price.textContent = formatPrice(
      state.products[state.currentProduct.id].price *
         state.currentProduct.count,
   );
}

function formatPrice(price) {
   return `$${price.toFixed(2)}`;
}
