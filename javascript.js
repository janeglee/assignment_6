const cart = [];
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
    cart.push(amountGlaze);
    const jsonCart = JSON.stringify(cart);
    localStorage.setItem("cartAmount", jsonCart)
    console.log(cart);
    updateCount();
}

//whenever page loads, cart will show empty or cart amount
function onLoad (e) {
    pageInfo = e;
    const myCart = localStorage.getItem("cartAmount");
    if(myCart === null || myCart.length === 2) {
      console.log('Cart is empty!');
      return;
    }
    else {
      const savedCart = JSON.parse(myCart);
      savedCart.forEach((amountGlaze) => {
        cart.push(amountGlaze);
      });
      updateCount();
      if(e.pageName == 'Cart') {
        renderCart()
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
                    <li class="removeItem" id="${index}">X</li>
                </ul>
        `
        total+=item.subtotal;
        node.innerHTML= stringTemplate;
        itemList.appendChild(node);

        let removeItem = document.getElementById(`${index}`);
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


