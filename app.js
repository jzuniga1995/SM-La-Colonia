// Smooth scrolling para los enlaces del menú de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Activa/desactiva el menú
});


// Funcionalidad del formulario de contacto
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto de enviar el formulario
    
    if (validateForm()) {
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        form.reset(); // Limpiar el formulario
    }
});

// Validar formulario
function validateForm() {
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector('textarea');
    
    let isValid = true;
    
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Por favor, ingresa tu nombre.");
        isValid = false;
    } else {
        clearError(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Por favor, ingresa un correo válido.");
        isValid = false;
    } else {
        clearError(emailInput);
    }

    if (messageInput.value.trim() === "") {
        showError(messageInput, "Por favor, ingresa un mensaje.");
        isValid = false;
    } else {
        clearError(messageInput);
    }

    return isValid;
}

function isValidEmail(email) {
    // Expresión regular básica para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const parent = input.parentElement;
    let errorText = parent.querySelector('.error-text');
    if (!errorText) {
        errorText = document.createElement('span');
        errorText.classList.add('error-text');
        parent.appendChild(errorText);
    }
    errorText.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const parent = input.parentElement;
    const errorText = parent.querySelector('.error-text');
    if (errorText) {
        errorText.remove();
    }
    input.classList.remove('error');
}

// Selecciona los elementos del carrusel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// Acomodar los slides uno al lado del otro
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

// Función para mover al slide correspondiente
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Función para actualizar los indicadores
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

// Función para mostrar/esconder las flechas en los extremos del carrusel
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'block';
    } else if (targetIndex === slides.length - 1) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    }
};

// Cuando el usuario hace clic en la flecha derecha
nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// Cuando el usuario hace clic en la flecha izquierda
prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// Cuando el usuario hace clic en los indicadores (dots)
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

// Mostrar u ocultar flechas al cargar la página
hideShowArrows(slides, prevButton, nextButton, 0);


// Carrusel Automático: Cambiar de slide cada 3 segundos
let autoSlideInterval = setInterval(() => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0]; // Vuelve al primer slide al llegar al final
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling || dots[0]; // Cambia al primer dot al llegar al final
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
}, 3000); // Cambia la imagen cada 3 segundos



