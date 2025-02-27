// ELEMENTOS DEL DOM --------------------------------------------------------
    const home_container = document.querySelector('.home-container');
    const home_blue_mask = home_container.querySelector('.home-blue-mask');
    const header_bar = document.querySelector('.header-bar');

// VARIABLES CSS --------------------------------------------------------
    const css_vars = getComputedStyle(document.documentElement);
    let home_margins = css_vars.getPropertyValue('--home-margins').trim();
    
    let home_margins_px = (parseFloat(home_margins) / 100) * window.innerWidth; // Convertir `vw` a `px`

// Limitar el valor a un máximo de 30px
if (home_margins_px >= 30) {
    home_margins_px = 30; // Se queda en px si supera 30px
}

// Convertirlo en string para CSS
let home_margins_css = `${home_margins_px}px`;
console.log(home_margins_css);
console.log(home_margins_px);
console.log(home_margins);

// FUNCIÓN PARA RECALCULAR ALTURAS ------------------------------------------
    function updateSizes() {
        let header_height = header_bar.getBoundingClientRect().height;
        home_container.style.height = `calc(100dvh - ${header_height}px)`;
        home_blue_mask.style.height = `calc(100% - ${home_margins_css}/2)`;
    }

// TIMELINE --------------------------------------------------------
    const home_tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: "power1.inOut",
        }
    });

// SET --------------------------------------------------------
    home_tl.set(header_bar, {
        yPercent: -100
    })

    .set(home_container, {
        y: () => -header_bar.getBoundingClientRect().height,
        height: "100dvh"
    })

    .set(home_blue_mask, {
        top: `calc(${home_margins_css}/2)`,
        width: "100%",
        height: "100%",
    });

// TWEEN ------------------------------------------------
    home_tl.to(home_blue_mask, {
        width: `calc(100% - ${home_margins_css})`,
        height: `calc(100% - ${home_margins_css}/2)`,
        top: 0,
        borderRadius: "20px",
    }, "+=3")

    .to(header_bar, {   
        yPercent: 0,
        onUpdate: updateSizes, // Recalcular en cada frame de animación
    }, "<")

    .to(home_container, {
        y: 0,
    }, "<");

// ACTUALIZAR AL REDIMENSIONAR --------------------------------------
window.addEventListener("resize", updateSizes);


