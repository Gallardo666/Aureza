//Carrito

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Cargar el carrito al cargar la página
    loadCart();
});

function addToCart(event) {
    const button = event.target;
    const product = {
        id: button.getAttribute('data-id'),
        name: button.getAttribute('data-name'),
        price: parseFloat(button.getAttribute('data-price')),
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);

}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart);
}

function updateCartCount(cart) {
    const cartCountBubble = document.querySelector('.cart-count-bubble span');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountBubble.textContent = totalItems;
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


