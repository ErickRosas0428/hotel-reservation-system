document.addEventListener("DOMContentLoaded", function () {
    // Carrusel
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");

    function showNextSlide() {
        slides[slideIndex].style.left = "100%"; // Ocultar el slide actual
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].style.left = "0"; // Mostrar el siguiente slide
    }

    // Inicializa la primera imagen visible
    slides[0].style.left = "0";

    // Cambia de slide cada 3 segundos
    setInterval(showNextSlide, 3000);

    // Manejo del formulario de búsqueda
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir que el formulario se envíe y recargue la página

        // Obtener valores de los campos
        const checkinDate = document.getElementById("checkin-date").value;
        const checkoutDate = document.getElementById("checkout-date").value;
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;

        // Validar que las fechas sean correctas
        if (new Date(checkinDate) >= new Date(checkoutDate)) {
            alert("La fecha de salida debe ser posterior a la fecha de entrada.");
            return;
        }

        // Mostrar los datos seleccionados en la consola o en un mensaje
        alert(`Buscando habitaciones para ${adults} adulto(s) y ${children} niño(s). \nDesde el ${checkinDate} hasta el ${checkoutDate}`);
    });
});
