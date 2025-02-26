
const home_blue_mask = document.querySelector('.home-blue-mask');


    // TIMELINE --------------------------------------------------------
    const home_tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4.out'
        }
    });

    // SET --------------------------------------------------------
    home_tl.set(home_blue_mask, {
        width: "100%",
        height: "100%",
    });

    // TWEEN ------------------------------------------------
    home_tl.to(home_blue_mask, {
        width: "calc(100% - 10vw",  
        height: "calc(100% - 10vw", 
        borderRadius: "20px"
    },"+=3");


/*
GSDevTools.create({ 
    animation: intro_tl,
    minimal: false, // Modo con más controles
    persist: true // Permite que se quede en pantalla
 });
 */

