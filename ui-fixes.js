/* ============================================================
   CORRECTIF — Conservation de la position de défilement
   Les écrans Talents / Atelier / Carte se reconstruisent après chaque
   achat pour rafraîchir les coûts : la fenêtre remontait alors tout en
   haut. Comme ces écrans s'appellent en interne, on intercepte au seul
   point de passage commun — openModal — et on compare le titre : même
   écran, on restaure le défilement ; écran différent, on repart en haut.
   ============================================================ */
(function(){
  if(typeof openModal !== "function") return;
  const originalOpen = openModal;

  function titleOf(el){
    const h = el && el.querySelector("h2");
    return h ? h.textContent.trim() : "";
  }

  /* Réassignation de la liaison elle-même (et non d'une propriété de
     window) : c'est le seul moyen d'intercepter aussi les appels
     internes des autres modules. */
  window.openModal = openModal = function(){
    const el = document.getElementById("modal");
    const veilEl = document.getElementById("veil");
    const wasOpen = veilEl && veilEl.classList.contains("on");
    const prevTitle = wasOpen ? titleOf(el) : null;
    const prevScroll = wasOpen && el ? el.scrollTop : 0;

    const r = originalOpen.apply(this, arguments);

    if(el && prevScroll > 0 && prevTitle && titleOf(el) === prevTitle){
      el.scrollTop = prevScroll;
    }
    return r;
  };
})();

/* ============================================================
   ÉCHELLE D'INTERFACE
   CORRECTIF : la première version utilisait "zoom" sur <body>, qui
   cohabite mal avec les unités dvh utilisées par #app (menus mal
   calés, contenu qui peut déborder hors d'atteinte). Remplacé par la
   technique standard : #app est recalculé plus grand ou plus petit
   que l'écran, puis ramené exactement à sa taille par transform:scale.
   Le résultat occupe TOUJOURS 100% de l'écran, quelle que soit
   l'échelle — aucun contenu ne peut sortir de portée.
   ============================================================ */
(function(){
  const MIN = 0.85, MAX = 1.30, STEP = 0.05;
  function clamp(v){ return Math.min(MAX, Math.max(MIN, Math.round(v/STEP)*STEP)); }

  window.applyUiScale = function(){
    if(typeof S === "undefined") return;
    const v = clamp(S.uiScale || 1);
    document.documentElement.style.setProperty("--ui-scale", v);
    /* Les canvas (météo, décor) écoutent "resize" pour recalculer leur
       taille : un changement d'échelle ne déclenche pas cet événement
       nativement, donc on le simule après le prochain rendu. */
    requestAnimationFrame(()=> window.dispatchEvent(new Event("resize")));
  };

  window.setUiScale = function(v){
    if(typeof S === "undefined") return;
    S.uiScale = clamp(v);
    applyUiScale();
    save();
    const label = document.getElementById("uiScaleVal");
    if(label) label.textContent = Math.round(S.uiScale*100) + "%";
  };

  applyUiScale();

  /* Greffé dans les Options, juste après le réglage de qualité graphique */
  if(typeof openSettings === "function"){
    const prev = openSettings;
    window.openSettings = openSettings = function(){
      prev.apply(this, arguments);
      try{
        const anchor = document.getElementById("mNotif");
        if(!anchor || document.getElementById("uiScaleRow")) return;
        const row = document.createElement("div");
        row.id = "uiScaleRow";
        row.className = "uiScaleRow";
        row.innerHTML =
          '<span>Taille de l\'interface</span>' +
          '<button class="uiScaleBtn" id="uiScaleDown">−</button>' +
          '<span id="uiScaleVal">'+Math.round((S.uiScale||1)*100)+'%</span>' +
          '<button class="uiScaleBtn" id="uiScaleUp">+</button>';
        anchor.parentNode.insertBefore(row, anchor);
        document.getElementById("uiScaleDown").onclick = ()=>{ if(typeof sfx==="function") sfx("tab"); setUiScale((S.uiScale||1) - STEP); };
        document.getElementById("uiScaleUp").onclick   = ()=>{ if(typeof sfx==="function") sfx("tab"); setUiScale((S.uiScale||1) + STEP); };
      }catch(e){}
    };
  }
})();
