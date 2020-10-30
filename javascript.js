const cart = [];

function handleSubmit (e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const glaze = document.getElementById('glaze').value;
    const amountGlaze = {
        amount: amount,
        glaze: glaze
    }
    cart.push(amountGlaze);
    const jsonCart = JSON.stringify(cart);
    localStorage.setItem("cartAmount", jsonCart)
    console.log(cart);
    updateCount();
}

function onLoad() {
    const myCart = localStorage.getItem("cartAmount");
    if(myCart === null) {
      console.log('Cart is empty!');
      return;
    }
    else {
      const savedCart = JSON.parse(myCart);
      savedCart.forEach((amountGlaze) => {
        cart.push(amountGlaze);
      });
      updateCount();
    }
}

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
        picture.src="cinnamon.png";
    }
    else if (glaze =="sugarMilk") {
        picture.src="sugarMilk.jpg";
    }
    else if (glaze =="vanillaMilk") {
        picture.src="vanillaMilk.jpg";
    }
    else if (glaze =="doubleChocolate") {
        picture.src="chocolate.jpg";
    }
}