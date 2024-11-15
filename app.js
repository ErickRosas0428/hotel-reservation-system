document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const errorMessage = document.getElementById("error-message");
    const checkinInput = document.getElementById("checkin-date");
    const checkoutInput = document.getElementById("checkout-date");

    // Actualizar el mínimo de la fecha de salida cuando cambie la fecha de entrada
    checkinInput.addEventListener("change", function () {
        if (checkinInput.value) {
            const checkinDate = new Date(checkinInput.value);
            checkoutInput.setAttribute("min", checkinDate.toISOString().split('T')[0]);
        }
    });

    // Validación y procesamiento del formulario
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir que el formulario se envíe y recargue la página

        const checkinDate = document.getElementById("checkin-date").value;
        const checkoutDate = document.getElementById("checkout-date").value;
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;

        errorMessage.style.display = "none"; // Resetear mensajes de error

        // Verificar si la fecha de salida es obligatoria
        if (!checkoutDate) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "La fecha de salida es obligatoria.";
            return;
        }

        const currentDate = new Date();
        const currentHour = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City", hour: '2-digit', minute: '2-digit' }).split(':')[0]; // Hora en México

        const checkin = new Date(checkinDate);
        const currentDateOnly = new Date(currentDate.toLocaleDateString("en-CA")); // Convertir la fecha actual a formato "YYYY-MM-DD"

        // Validaciones de fecha
        if (checkin < currentDateOnly) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "La fecha de entrada no puede ser en el pasado.";
            return;
        }

        if (new Date(checkinDate) >= new Date(checkoutDate)) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "La fecha de salida debe ser posterior a la de entrada.";
            return;
        }

        // Verificar si la fecha de entrada es hoy
        if (checkinDate === currentDateOnly.toISOString().split('T')[0]) { 
            if (parseInt(currentHour) >= 13) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Lo sentimos, no hay disponibilidad para hoy después de las 13:00.";
                return;
            }
        }

        // Verificar que la diferencia entre checkin y checkout sea al menos de 24 horas
        const checkinTime = new Date(checkinDate);
        const checkoutTime = new Date(checkoutDate);
        const timeDifference = (checkoutTime - checkinTime) / (1000 * 60 * 60); // Diferencia en horas

        if (timeDifference < 24 && checkinDate !== checkoutDate) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "La estancia mínima es de 24 horas.";
            return;
        }

        alert(`Buscando habitaciones para ${adults} adulto(s) y ${children} niño(s). \nDesde el ${checkinDate} hasta el ${checkoutDate}`);
    });

    // Carrusel de imágenes (código JavaScript para el deslizamiento)
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function showNextSlide() {
        slides[currentSlide].style.transform = "translateX(-100%)";
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].style.transform = "translateX(0)";
    }

    setInterval(showNextSlide, 3000);  // Cambia cada 3 segundos
});
