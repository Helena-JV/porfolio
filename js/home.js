// ELEMENTOS DEL DOM ==============================================================
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

// BOTONES CONTACTO  ==============================================================
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


// MENU SCROLL  ==============================================================
const scrollMenu = document.querySelector('.scroll-menu');
const menuItems = document.querySelectorAll('.scroll-item');
const totalItems = menuItems.length;
const anglePerItem = 360 / totalItems;

let currentAngle = 0; 
let isProcessingScroll = false;
let lastScrollTime = 0;
let accumulatedDelta = 0;
const scrollCooldown = 300; 
const scrollSensitivity = 0.05; 
const scrollThreshold = 5;

// Función para actualizar la rotación del menú
function rotateMenu(direction) {
    currentAngle -= direction * anglePerItem;
    scrollMenu.style.transform = `perspective(1000px) rotateY(${currentAngle}deg)`;
}

// Detector de wheel con acumulación y sensibilidad reducida
scrollMenu.addEventListener('wheel', function(e) {
    e.preventDefault(); 
    
    const now = Date.now();
    
    const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const mappedDelta = rawDelta * scrollSensitivity; 
    
    accumulatedDelta += mappedDelta;
    
    if (isProcessingScroll) {
        return;
    }
    
    // Si ha pasado suficiente tiempo desde la última rotación y se acumula suficiente delta
    if (now - lastScrollTime > scrollCooldown && Math.abs(accumulatedDelta) >= scrollThreshold) {
        const direction = Math.sign(accumulatedDelta);
        accumulatedDelta = 0;
        isProcessingScroll = true;
        lastScrollTime = now;
        rotateMenu(direction);
        
        setTimeout(() => {
            isProcessingScroll = false;
        }, scrollCooldown);
    }
}, { passive: false });

// Reinicio del acumulador si el cursor sale del elemento
scrollMenu.addEventListener('mouseleave', function() {
    accumulatedDelta = 0;
});

// Soporte para teclas de flecha
document.addEventListener('keydown', function(e) {
    const now = Date.now();
    
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
        isProcessingScroll = true;
        lastScrollTime = now;

        rotateMenu(direction);
        
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

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: false });

scrollMenu.addEventListener('touchmove', function(e) {
    e.preventDefault(); 
}, { passive: false });

scrollMenu.addEventListener('touchend', function(e) {
    e.preventDefault();
    
    if (isProcessingScroll) {
        return;
    }
    
    const now = Date.now();
    
    if (now - lastScrollTime < scrollCooldown) {
        return;
    }
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
        return;
    }
    
    let direction = 0;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Movimiento horizontal
        direction = diffX > 0 ? -1 : 1; // Invertido para que coincida con la dirección natural
    } else {
        // Movimiento vertical
        direction = diffY > 0 ? -1 : 1;
    }
    
    isProcessingScroll = true;
    lastScrollTime = now;
    
    rotateMenu(direction);
    
    setTimeout(() => {
        isProcessingScroll = false;
    }, scrollCooldown);
}, { passive: false });


// Botones de navegación --------------------------
    const leftButton = document.querySelector('.button-scroll-menu button:first-child');
    const rightButton = document.querySelector('.button-scroll-menu button:last-child');

    function handleButtonClick(direction) {
        return function () {
            const now = Date.now();

            if (isProcessingScroll || now - lastScrollTime < scrollCooldown) {
                return;
            }

            isProcessingScroll = true;
            lastScrollTime = now;

            rotateMenu(direction);

            setTimeout(() => {
                isProcessingScroll = false;
            }, scrollCooldown);
        };
    }

    leftButton.addEventListener('click', handleButtonClick(-1));
    rightButton.addEventListener('click', handleButtonClick(1));

// Pantalla movil --------------------------
    // Modo móvil (menos de 500px)
    function isMobileView() {
        return window.innerWidth <= 500;
    }

    function rotateMenu(direction) {
        currentAngle -= direction * anglePerItem;
        
         if (isMobileView()) {
            // Rotación en el eje X para pantallas pequeñas
            scrollMenu.style.transform = `perspective(1000px) rotateX(${currentAngle}deg)`;
        } else {
            // Rotación en el eje Y para pantallas normales
            scrollMenu.style.transform = `perspective(1000px) rotateY(${currentAngle}deg)`;
        }
    }
    window.addEventListener('resize', function() {
        rotateMenu(0); 
    });

    window.addEventListener('load', function() {
        rotateMenu(0); 
    });