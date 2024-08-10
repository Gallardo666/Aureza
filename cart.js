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

//Desplegable Politica de Privacidad | Terminos y Condiciones
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('privacy-link').onclick = function(event) {
        event.preventDefault();
        document.getElementById('privacy-modal').style.display = 'block';
    }
    document.getElementById('privacy-close').onclick = function() {
        document.getElementById('privacy-modal').style.display = 'none';
    }
    document.getElementById('terms-link').onclick = function(event) {
        event.preventDefault();
        document.getElementById('terms-modal').style.display = 'block';
    }
    document.getElementById('terms-close').onclick = function() {
        document.getElementById('terms-modal').style.display = 'none';
    }

    // Cierra el modal si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (event.target === document.getElementById('privacy-modal')) {
            document.getElementById('privacy-modal').style.display = 'none';
        }
        if (event.target === document.getElementById('terms-modal')) {
            document.getElementById('terms-modal').style.display = 'none';
        }
    }
});