gsap.config({
    trialWarn: false,
  })
  
  // https://gsap.com/docs/v3/Eases/CustomEase/
  gsap.registerPlugin(CustomEase, SplitText);

//FUNCIONES PERSONALIZADAS -----------------------------------------------

  //Número aleatorio entre dos valores
  function random(min, max) {
    return Math.random() * (max - min) + min
  }

  //Número entero aleatorio entre dos valores
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  //Mapea un valor x que está en el rango [a1, a2] a un nuevo valor en el rango [b1, b2].
  function map(x, a1, a2, b1, b2) {
    return ((x - a1) * (b2 - b1)) / (a2 - a1) + b1
  }

  //Restringe (clamp) el valor v para que esté dentro del rango definido por min y max.
  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v))
  }

  //Realiza una interpolación lineal entre v1 y v2 usando el factor alpha
  function lerp(v1, v2, alpha) {
    return v1 + (v2 - v1) * alpha
  }

  //KILL TIMELINE -----------------------------------------------
  function kill_tl(tl) {
    tl.progress(1).kill()
  }
