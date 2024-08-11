document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();

    document.getElementById('clear-cart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        loadCartItems();
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const image = e.target.dataset.image;

            addToCart(id, name, price, image);
            loadCartItems();
        });
    });
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-row" id="cart-item-${item.id}">
                <div class="cart-item-left">
                    <div class="cart-item-image-container">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    </div>
                    <div class="cart-item-details">
                        <h2 class="cart-item-name">${item.name}</h2>
                    </div>
                </div>
                <div class="cart-item-center">
                    <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                    <span class="quantity" id="quantity-${item.id}">${item.quantity}</span>
                    <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    <button class="btn-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
                <div class="cart-item-right">
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Add event listeners to the increase and decrease buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const action = e.target.dataset.action;
            updateQuantity(id, action);
        });
    });

    // Add event listeners to the remove buttons
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeItem(id);
        });
    });
}

function updateQuantity(id, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
        if (item.id === id) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease') {
                item.quantity = Math.max(item.quantity - 1, 1);
            }
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}


// Desplegable Política de Privacidad | Términos y Condiciones
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
