const cart = [];
const wishlist = [];
let pageInfo = null;

//when click submit button, add roll, amount, glaze to cart
function handleSubmit (e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const glaze = document.getElementById('glaze').value;
    const amountGlaze = {
        roll: pageInfo.pageName,
        amount: amount,
        glaze: glaze,
        subtotal: pageInfo.price * amount,
        price: pageInfo.price
    }

    if(e.submitter.name == "submitCart") {
        cart.push(amountGlaze);
        const jsonCart = JSON.stringify(cart);
        localStorage.setItem("cartAmount", jsonCart)
        console.log(cart);
        updateCount();
    }

    else if(e.submitter.name == "submitWish") {
        wishlist.push(amountGlaze);
        const jsonWishlist = JSON.stringify(wishlist);
        localStorage.setItem("wishlistAmount", jsonWishlist)
        console.log(wishlist);
    }
    
}

//whenever page loads, cart will show empty or cart amount
function onLoad (e) {
    pageInfo = e;
    const myCart = localStorage.getItem("cartAmount");
    const myWishlist = localStorage.getItem("wishlistAmount");
    if(myCart === null || myCart.length === 2) {
      console.log('Cart is empty!');
      return;
    }
    else {
      const savedCart = JSON.parse(myCart);
      savedCart.forEach((amountGlaze) => {
        cart.push(amountGlaze);
      });

      const savedWish = JSON.parse(myWishlist);
      savedWish.forEach((amountGlaze) => {
          wishlist.push(amountGlaze);
      })
      updateCount();
      if(e.pageName == 'Cart') {
        renderCart();
        renderWish();
      }
    }
}

//will populate cart page with cart
function renderCart () {
    const itemList = document.getElementById('itemList');
    const totalEl = document.getElementById('total');
    itemList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const node = document.createElement("li");
        node.id = index;
        const stringTemplate = `
                <ul>
                    <li>${item.roll}</li>
                    <li>${item.amount}</li>
                    <li>${item.glaze}</li>
                    <li>$ ${item.subtotal}</li>
                    <li class="removeItem" id="cart${index}">X</li>
                </ul>
        `
        total+=item.subtotal;
        node.innerHTML= stringTemplate;
        itemList.appendChild(node);

        let removeItem = document.getElementById(`cart${index}`);
        removeItem.onclick = function (e) {
            cart.splice(index, 1);
            const jsonCart = JSON.stringify(cart);
            localStorage.setItem("cartAmount", jsonCart);
            updateCount();
            renderCart();
        }
    })
    totalEl.innerHTML = `<u><b>Total: $ ${total}</b></u>`
}

function renderWish () {
    const wishlistList = document.getElementById('wishlistList');
    wishlistList.innerHTML = '';
    wishlist.forEach((item, index) => {
        const node2 = document.createElement("li");
        node2.id = index;
        const stringTemplate = `
                <ul>
                    <li>${item.roll}</li>
                    <li>${item.amount}</li>
                    <li>${item.glaze}</li>
                    <li>$ ${item.subtotal}</li>
                    <li class="removeItem" id="wishlist${index}">X</li>
                </ul>
        `
        node2.innerHTML= stringTemplate;
        wishlistList.appendChild(node2);

        let removeItem = document.getElementById(`wishlist${index}`);
        removeItem.onclick = function (e) {
            wishlist.splice(index, 1);
            const jsonWishlist = JSON.stringify(wishlist);
            localStorage.setItem("wishlistAmount", jsonWishlist);
            updateCount();
            renderWish();
        }
    })
}



//updates the # next to cart on nav bar
function updateCount (e) {
    const itemCount = document.getElementById('cartItems');
    let totalAmount = 0;
    cart.forEach((item) => {
        totalAmount += parseInt(item.amount);
    })
    itemCount.innerHTML = 'Cart (' + totalAmount + ')';
}

//changes picture when glaze selection is changed

function handleGlaze () {
    const glaze = document.getElementById('glaze').value;
    const picture = document.getElementById('cinnamon');
    if (glaze == "none") {
        picture.src="assets/cinnamon.png";
    }
    else if (glaze =="sugarMilk") {
        picture.src="assets/sugarMilk.jpg";
    }
    else if (glaze =="vanillaMilk") {
        picture.src="assets/vanillaMilk.jpg";
    }
    else if (glaze =="doubleChocolate") {
        picture.src="assets/chocolate.jpg";
    }
}


const slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
