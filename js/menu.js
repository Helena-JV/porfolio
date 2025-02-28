const menuBtn = document.querySelectorAll(".menu-icon div");

// TIMELINE ----------------------------------------------------
    const menuBtn_tl = gsap.timeline({
        defaults: {
            duration: 0.3,
            ease: "power1.inOut"
        },
        paused: true
    });

// SET ----------------------------------------------------
    gsap.set(menuBtn[0], { y: "5px" });
    gsap.set(menuBtn[1], { y: "-5px" });

// ANIMACIÓN ----------------------------------------------------
    menuBtn_tl
        .to(menuBtn, { y: "0%", duration: 0.1 })
        .to(menuBtn[0], { rotation: 45 }, "-=0.1")  
        .to(menuBtn[1], { rotation: -45 }, "<"); 

// FUNCIÓN TOGGLE ----------------------------------------------------------
function menuBtnAnimation() {
    if (menuBtn_tl.progress() === 0) {
        menuBtn_tl.play();
    } else {
        menuBtn_tl.reverse();
    }
}
