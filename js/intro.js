
// CONSTANTES --------------------------------------------------------
    let intro_container = document.querySelector('.intro-container');
    let intro_ico = intro_container.querySelector('.icon-container'); 
    let intro_ico_punto = intro_container.querySelector('.circle-hj'); 
    let intro_title = intro_container.querySelector('.intro-title');
    let intro_subtitle = intro_container.querySelector('.intro-subtitle');

// SPLIT TEXT --------------------------------------------------------
    let intro_title_split = new SplitText(intro_title, {
        type: 'words, chars'
    });

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
            intro_title = null;
            intro_subtitle = null;
            intro_title_split.revert();
            intro_title_split = null;
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

    gsap.set (intro_title_split.chars, {
        yPercent: 20,
        opacity: 0
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

    .to (intro_title_split.chars, {
        yPercent:0,
        stagger: 0.1,
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
    duration:7,

},"-=2.5")






        