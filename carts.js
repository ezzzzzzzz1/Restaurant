let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;
    updateCartDisplay();
    saveCart();
    showNotification(`${itemName} added to cart!`);
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    if (cartItemsElement) {
        cartItemsElement.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;

            // Create a remove button for each item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-5','mb-2');
            removeButton.addEventListener('click', () => removeFromCart(index));
            li.appendChild(removeButton);

            cartItemsElement.appendChild(li);
        });
    }

    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        total -= cart[index].price;
        cart.splice(index, 1); // Remove the item from the cart array
        updateCartDisplay();
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toFixed(2));
}

function showNotification(message) {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('alert', 'alert-success', 'mt-3');
    notificationElement.textContent = message;

    const container = document.querySelector('.p-5');
    container.appendChild(notificationElement);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notificationElement.remove();
    }, 3000);
}

// Call updateCartDisplay on the cart page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);
