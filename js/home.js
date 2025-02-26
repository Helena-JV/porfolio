// CONSTANTES --------------------------------------------------------
const header_container = document.querySelector('.header-container');
const home_container = document.querySelector('.home-container.hght-100vh');
const home_blue_mask = document.querySelector('.home-blue-mask');



    // VARIABLES CSS --------------------------------------------------------
    const css_vars = getComputedStyle(document.documentElement);
    const home_margins = css_vars.getPropertyValue('--home-margins').trim();
    const header_height = css_vars.getPropertyValue('--header-height').trim();

    // TIMELINE --------------------------------------------------------
    const home_tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4.out'
        }
    });

    // SET --------------------------------------------------------
    home_tl.set(header_container, {
        yPercent: -100
    });

    home_tl.set(home_container, {
        height: "100vh",
        top: 0
    });

    home_tl.set(home_blue_mask, {
        width: "100%",
        height: "100%",
    });

    // TWEEN ------------------------------------------------
    home_tl.to(header_container, {
        yPercent: 0,
        duration: 2
    }, "+=3")
    .to(home_container, {
        top: header_height,
        duration: 2
    }, "<")
    .to(home_blue_mask, {
        duration: 3,
        width: `calc(100% - ${home_margins})`,
        height: `calc(100% - ${home_margins}/2)`,  
        borderRadius: "20px",
    }, "<")
    .to(home_container, {
        height: `calc(100vh - ${header_height})`,
    }, "<");

/*
GSDevTools.create({ 
    animation: intro_tl,
    minimal: false, // Modo con más controles
    persist: true // Permite que se quede en pantalla
 });
 */
