
// CONSTANTES --------------------------------------------------------
    let intro_container = document.querySelector('.intro-container');
    let intro_ico = intro_container.querySelector('.icon-container'); 
    let intro_ico_punto = intro_container.querySelector('.circle-hj'); 
    let intro_title = intro_container.querySelector('.intro-title');
    let intro_subtitle = intro_container.querySelector('.intro-subtitle');


// SPLIT TEXT --------------------------------------------------------
    function wrapLettersInSpans(element) {
        element.innerHTML = element.innerHTML
            .split(/(<br\s*\/?>)/g) // Divide manteniendo los <br>
            .map(part =>
                part === "<br>" || part === "<br/>" ? part : 
                part.split("").map(letter => 
                    letter === " " ? `<span>&nbsp;</span>` : `<span>${letter}</span>`
                ).join("")
            ).join("");
    }
    
    // Aplicar la función al título
    wrapLettersInSpans(document.querySelector(".intro-title"));
    let letters_title = document.querySelectorAll(".intro-title span");

    
    


// TIMELINE --------------------------------------------------------
    intro_tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4.out'
        },

        //Limpieza cuando acaba la timeline
        autoRemoveChildren: true, // Elimina los tweens después de ejecutarse
        onComplete: () => {
            kill_tl(intro_tl);

            intro_container.innerHTML = "";
            intro_container.remove();

            intro_container = null;
            intro_ico = null;
            intro_ico_punto = null;
            //intro_title = null; No quitar por seo
            //intro_subtitle = null; No quitar por seo
            intro_tl = null;
        } 
    });

// SET --------------------------------------------------------
    gsap.set (intro_ico, {
        opacity: 0,
        scale: 0.5,
        rotation: -360*4,
    
    });

    gsap.set (intro_ico_punto, {
        scale: 0.001
    });

    gsap.set (letters_title, {
        yPercent: 20,
        opacity: 0,
        rotation: -20
    });

    gsap.set (intro_subtitle, {
        yPercent: 50,
        opacity: 0,
        ease: "power2.out"
    });

// TWEENS TIMELINE --------------------------------------------------------

    intro_tl.to (intro_ico, {    
        opacity: 1,    
        rotation: 0,
        scale: 1,
        duration: 1.5
})

    .to (letters_title, {
        yPercent:0,
        stagger: 0.1,
        duration:1,
        opacity: 1,
        ease: "elastic.out(1,0.3)",
        rotation: 0
    },"-=1")


.to (intro_subtitle, {
    yPercent:0,
    opacity: 1,
    duration: 1,
}, "-=1")



.to (intro_ico_punto, {  
    scale: 200,
    duration: 0.5,
    ease: CustomEase.create("custom", "M0,0 C0,0 0.14,0.033 0.185,0.048 0.224,0.061 0.298,0.091 0.335,0.109 0.371,0.127 0.441,0.168 0.475,0.192 0.508,0.216 0.57,0.268 0.6,0.297 0.632,0.329 0.692,0.4 0.72,0.437 0.747,0.474 0.796,0.551 0.82,0.592 0.845,0.638 0.893,0.734 0.915,0.783 0.938,0.836 1,1 1,1 "),

})

/*
GSDevTools.create({ 
    animation: intro_tl,
    minimal: false, // Modo con más controles
    persist: true // Permite que se quede en pantalla
 });
 */





        