// ELEMENTOS DEL DOM --------------------------------------------------------
const headerBar = document.querySelector('.header-bar');
const iconWaveHeader = headerBar.querySelector('.icon-wave-header');

const homeContainer = document.querySelector('.home-container');
const homeBlueMask = homeContainer.querySelector('.home-blue-mask');



// FUNCIÓN PARA OBTENER LA ALTURA DEL HEADER ----------------------------------------
function getHeaderHeight() {
    return headerBar.getBoundingClientRect().height || 50;
}

// FUNCIÓN PARA OBTENER EL VALOR DE `--home-margins` --------------------------
function getHomeMargins() {
    return getComputedStyle(document.documentElement).getPropertyValue('--home-margins').trim();
}

// FUNCIÓN PARA RECALCULAR ALTURA Y PADDING DEL CONTENEDOR -------------------
function updateLayout() {
    let headerHeight = getHeaderHeight();
    homeContainer.style.height = `calc(100dvh - ${headerHeight}px)`;
    let homeMargins = getHomeMargins();
    homeContainer.style.paddingRight = homeMargins;
    homeContainer.style.paddingBottom = homeMargins;
    homeContainer.style.paddingLeft = homeMargins;
}

// TIMELINE --------------------------------------------------------
const home_tl = gsap.timeline({
    defaults: { duration: 0.5, ease: "power1.inOut" },
    onComplete: () => {
        home_tl.kill(); 
    }
});

// SET ---------------------------------------------------------------------
home_tl
    .set(headerBar, { 
        yPercent: -200 
    })
    .set(homeContainer, { 
        padding: "0px",
        height: "100dvh" 
    });
    

// LABELS ---------------------------------------------------------------------
home_tl
    .addLabel("fase1", "+=3")
    .addLabel("fase2", "+=4");

// ANIMACIONES ----------------------------------------------------------------
home_tl
    .to(homeContainer, {
        paddingRight: getHomeMargins(),
        paddingBottom: getHomeMargins(),
        paddingLeft: getHomeMargins(),
        paddingTop: getHomeMargins()
    }, "fase1") 

    .to(homeBlueMask, {
        borderRadius: "20px"
    }, "fase1")

    .to(headerBar, {   
        yPercent: 0,
        onUpdate: updateLayout 
    }, "fase2") 

    .to(homeContainer, {
        paddingTop: "0px",
    }, "fase2+=0.1")

    

// RESIZE -------------------------------------------------------------
window.addEventListener("resize", () => {
    gsap.killTweensOf(homeContainer); 
    gsap.killTweensOf(headerBar); 
    gsap.set(homeContainer, { clearProps: "all" });
    gsap.set(headerBar, { clearProps: "all" }); 

    homeContainer.style.transition = "none"; 
    homeContainer.style.height = `calc(100dvh - ${getHeaderHeight()}px)`;
    
    let homeMargins = getHomeMargins();
    homeContainer.style.paddingRight = homeMargins;
    homeContainer.style.paddingBottom = homeMargins;
    homeContainer.style.paddingLeft = homeMargins;
    
    homeContainer.offsetHeight;

    setTimeout(() => {
        homeContainer.style.transition = "";
    }, 100);
});

// BOTONES CONTACTO -------------------------------------------------------------
const contactBtns = document.querySelectorAll(".contact-btn");

contactBtns.forEach(contactBtn => {
  let btnOnda;

  contactBtn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    
    btnOnda = document.createElement("div");
    btnOnda.classList.add("onda");
    btnOnda.style.left = `${left}px`;
    btnOnda.style.top = `${top}px`;
    
    // Agregar la onda solo al botón sobre el que se está haciendo hover
    e.target.prepend(btnOnda);
  });

  contactBtn.addEventListener("mouseleave", () => {
    // Remover la onda cuando el mouse sale
    if (btnOnda) {
      contactBtn.removeChild(btnOnda);
    }
  });
});

// ENVIO -----------------------------------
  // Whatsapp ---------------
  document.getElementById("whatsappBtn").addEventListener("click", () => {
      let telefono = "34675873053"; 
      let mensaje = encodeURIComponent("Hola, quiero contactar contigo.");
      let url = `https://wa.me/${telefono}?text=${mensaje}`;

      window.open(url, "_blank"); // Abre WhatsApp en una nueva pestaña
  });

  // Mail ---------------
  document.getElementById("mailBtn").addEventListener("click", () => {
      window.location.href = "mailto:helenajgraphics@gmail.com?subject=Asunto%20del%20email&body=Hola,%20quiero%20contactar%20contigo.";
    });


// MENU SCROLL -------------------------------------------------------------
// Seleccionamos los elementos necesarios
const scrollMenu = document.querySelector('.scroll-menu');
const menuItems = document.querySelectorAll('.scroll-item');
const totalItems = menuItems.length;
const anglePerItem = 360 / totalItems; // Ángulo por cada elemento

let currentAngle = 0; // Ángulo inicial
let isProcessingScroll = false;
let lastScrollTime = 0;
let accumulatedDelta = 0;
const scrollCooldown = 300; // Tiempo entre rotaciones (aumentado para permitir animación más lenta)
const scrollSensitivity = 0.05; // Factor de sensibilidad (menor = rotación más lenta)
const scrollThreshold = 5; // Umbral para activar la rotación

// Función para actualizar la rotación del menú
function rotateMenu(direction) {
    // Ajustamos el ángulo una posición en la dirección determinada
    currentAngle -= direction * anglePerItem;
    
    console.log("Rotating to angle:", currentAngle);
    
    // Aplicamos la rotación con una transición suave
    scrollMenu.style.transform = `perspective(1000px) rotateY(${currentAngle}deg)`;
}

// Detector de wheel con acumulación y sensibilidad reducida
scrollMenu.addEventListener('wheel', function(e) {
    e.preventDefault(); // Prevenimos el comportamiento de scroll por defecto
    
    const now = Date.now();
    
    // Determinamos el delta mapeado con sensibilidad reducida
    const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const mappedDelta = rawDelta * scrollSensitivity; // Reducimos la sensibilidad
    
    // Acumulamos el delta hasta que alcance el umbral
    accumulatedDelta += mappedDelta;
    
    // Si estamos procesando un scroll, solo acumulamos pero no rotamos aún
    if (isProcessingScroll) {
        return;
    }
    
    // Si ha pasado suficiente tiempo desde la última rotación y acumulamos suficiente delta
    if (now - lastScrollTime > scrollCooldown && Math.abs(accumulatedDelta) >= scrollThreshold) {
        // Determinar la dirección basada en el acumulado
        const direction = Math.sign(accumulatedDelta);
        
        // Reiniciamos el acumulador
        accumulatedDelta = 0;
        
        // Marcamos que estamos procesando un scroll
        isProcessingScroll = true;
        lastScrollTime = now;
        
        // Rotamos exactamente una posición
        rotateMenu(direction);
        
        // Liberamos el bloqueo después del tiempo de cooldown
        setTimeout(() => {
            isProcessingScroll = false;
        }, scrollCooldown);
    }
}, { passive: false });

// Opcional: Reiniciamos el acumulador si el cursor sale del elemento
scrollMenu.addEventListener('mouseleave', function() {
    accumulatedDelta = 0;
});

// Opcional: Añadir soporte para teclas de flecha
document.addEventListener('keydown', function(e) {
    const now = Date.now();
    
    // Solo permitimos una rotación cada cierto tiempo
    if (isProcessingScroll || now - lastScrollTime < scrollCooldown) {
        return;
    }
    
    let direction = 0;
    
    if (e.key === 'ArrowLeft') {
        direction = -1;
    } else if (e.key === 'ArrowRight') {
        direction = 1;
    }
    
    if (direction !== 0) {
        // Marcamos que estamos procesando una rotación
        isProcessingScroll = true;
        lastScrollTime = now;
        
        // Rotamos exactamente una posición
        rotateMenu(direction);
        
        // Liberamos el bloqueo después del tiempo de cooldown
        setTimeout(() => {
            isProcessingScroll = false;
        }, scrollCooldown);
    }
});

 //Moviles -------------------------
 let touchStartX = 0;
let touchStartY = 0;

scrollMenu.addEventListener('touchstart', function(e) {
    e.preventDefault();
    // Guardamos la posición inicial del toque
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: false });

scrollMenu.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Prevenir scroll
}, { passive: false });

scrollMenu.addEventListener('touchend', function(e) {
    e.preventDefault();
    
    // Si estamos procesando un scroll, ignoramos este evento
    if (isProcessingScroll) {
        return;
    }
    
    const now = Date.now();
    
    // Solo permitimos una rotación cada cierto tiempo
    if (now - lastScrollTime < scrollCooldown) {
        return;
    }
    
    // Calculamos la diferencia entre la posición inicial y final
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    // Detectamos si el swipe fue más horizontal o vertical
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    // Si el movimiento es muy pequeño, lo ignoramos (tap, no swipe)
    if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
        return;
    }
    
    let direction = 0;
    
    // Determinamos la dirección basándonos en el movimiento más grande
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Movimiento horizontal
        direction = diffX > 0 ? -1 : 1; // Invertido para que coincida con la dirección natural
    } else {
        // Movimiento vertical
        direction = diffY > 0 ? -1 : 1;
    }
    
    // Marcamos que estamos procesando una rotación
    isProcessingScroll = true;
    lastScrollTime = now;
    
    // Rotamos exactamente una posición
    rotateMenu(direction);
    
    // Liberamos el bloqueo después del tiempo de cooldown
    setTimeout(() => {
        isProcessingScroll = false;
    }, scrollCooldown);
}, { passive: false });


const leftButton = document.querySelector('.button-scroll-menu button:first-child');
const rightButton = document.querySelector('.button-scroll-menu button:last-child');

// Botón para rotar hacia la izquierda
leftButton.addEventListener('click', function() {
    const now = Date.now();
    
    // Solo permitimos una rotación cada cierto tiempo
    if (isProcessingScroll || now - lastScrollTime < scrollCooldown) {
        return;
    }
    
    // Marcamos que estamos procesando una rotación
    isProcessingScroll = true;
    lastScrollTime = now;
    
    // Rotamos hacia la izquierda (dirección negativa)
    rotateMenu(-1);
    
    // Liberamos el bloqueo después del tiempo de cooldown
    setTimeout(() => {
        isProcessingScroll = false;
    }, scrollCooldown);
});

// Botones de navegación --------------------------
// Botón para rotar hacia la derecha
rightButton.addEventListener('click', function() {
    const now = Date.now();
    
    // Solo permitimos una rotación cada cierto tiempo
    if (isProcessingScroll || now - lastScrollTime < scrollCooldown) {
        return;
    }
    
    // Marcamos que estamos procesando una rotación
    isProcessingScroll = true;
    lastScrollTime = now;
    
    // Rotamos hacia la derecha (dirección positiva)
    rotateMenu(1);
    
    // Liberamos el bloqueo después del tiempo de cooldown
    setTimeout(() => {
        isProcessingScroll = false;
    }, scrollCooldown);
});