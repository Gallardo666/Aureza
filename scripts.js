// Función para manejar el desplazamiento suave cuando se hace clic en un enlace de navegación
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los enlaces de navegación que tienen un href que comienza con "#"
    const links = document.querySelectorAll('nav a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Previene el comportamiento predeterminado del enlace

            const targetId = this.getAttribute("href"); // Obtiene el atributo href del enlace
            const targetElement = document.querySelector(targetId); // Selecciona el elemento de destino

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Desplaza hacia la posición del elemento de destino
                    behavior: "smooth" // Habilita el desplazamiento suave
                });
            }
        });
    });
});
