// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');

    // Cargar productos desde el almacenamiento local
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.name}</p>
                <p>Precio: $${item.price}</p>
                <button class="remove-btn" data-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Añadir evento para eliminar productos
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Función para eliminar un producto
    function removeItem(event) {
        const id = event.target.getAttribute('data-id');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCart();
    }

    // Inicializar el carrito
    loadCart();
});


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


