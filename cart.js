// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    for (const [productId, details] of Object.entries(cart)) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${details.image}" alt="${productId}" style="width: 100px; height: auto;" />
            </div>
            <div class="cart-item-info">
                <h3>${productId}</h3>
                <p>Cantidad:</p>
                <button class="decrease-btn" data-product-id="${productId}">-</button>
                <span class="quantity">${details.quantity}</span>
                <button class="increase-btn" data-product-id="${productId}">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    }

    // Agregar eventos para aumentar y disminuir la cantidad
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.productId, -1));
    });
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.productId, 1));
    });
});

function updateQuantity(productId, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    if (!cart[productId]) return;

    cart[productId].quantity += delta;
    if (cart[productId].quantity <= 0) {
        delete cart[productId];
    }

    if (Object.keys(cart).length === 0) {
        localStorage.removeItem('cart');
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    location.reload(); // Recargar la página para reflejar los cambios
}
