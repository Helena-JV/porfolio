// ELEMENTOS DEL DOM --------------------------------------------------------
    const homeContainer = document.querySelector('.home-container');
    const headerBar = document.querySelector('.header-bar');
    const homeBlueMask = homeContainer.querySelector('.home-blue-mask');


// FUNCIÓN PARA OBTENER LA ALTURA DEL HEADER ----------------------------------------
    function getHeaderHeight() {
        return headerBar.getBoundingClientRect().height || 50; // Si no detecta altura, usar 50px por defecto
    }


// FUNCIÓN PARA OBTENER EL PADDING EN PX SEGÚN `VW` --------------------------
    function getPaddingVW() {
        return `${(3 * window.innerWidth) / 100}px`; // Convierte 3vw a píxeles
    }


// FUNCIÓN PARA RECALCULAR ALTURA Y PADDING DEL CONTENEDOR -------------------
    function updateLayout() {
        let headerHeight = getHeaderHeight();
        homeContainer.style.height = `calc(100dvh - ${headerHeight}px)`;

        homeContainer.style.paddingRight = getPaddingVW();
        homeContainer.style.paddingBottom = getPaddingVW();
        homeContainer.style.paddingLeft = getPaddingVW();
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
            yPercent: -100 
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
            padding: getPaddingVW()
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
        }, "fase2") 


        .to(homeContainer, {
            paddingRight: getPaddingVW(),
            paddingBottom: getPaddingVW(),
            paddingLeft: getPaddingVW()
        }, "fase2+=0.1"); 


// RESIZE -------------------------------------------------------------
    window.addEventListener("resize", () => {
        gsap.killTweensOf(homeContainer); 
        gsap.killTweensOf(headerBar); 
        gsap.set(homeContainer, { clearProps: "all" });
        gsap.set(headerBar, { clearProps: "all" }); 

        homeContainer.style.transition = "none"; 
        homeContainer.style.height = `calc(100dvh - ${getHeaderHeight()}px)`;
        homeContainer.style.paddingRight = getPaddingVW();
        homeContainer.style.paddingBottom = getPaddingVW();
        homeContainer.style.paddingLeft = getPaddingVW();

        homeContainer.offsetHeight; 

        setTimeout(() => {
            homeContainer.style.transition = "";
        }, 100);
    });
