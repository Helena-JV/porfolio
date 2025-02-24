
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
        transformOrigin: "50% 50%"
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
        scale: 1
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
    duration: 4,
}, "-=1")



.to (intro_ico_punto, {  
    scale: 300,
    duration: 3,

},"-=2.5")






        