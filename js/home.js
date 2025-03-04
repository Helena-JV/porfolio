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
