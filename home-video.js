/* ============================================================
   VIDÉO D'ACCUEIL
   CORRECTIF : la tentative de lecture était différée jusqu'à
   l'événement "load" complet de la page (attend TOUS les scripts,
   images, etc.) — d'où le démarrage perçu comme tardif. On tente
   maintenant immédiatement, dès que ce script s'exécute.
   Certains WebView bloquent malgré tout l'autoplay muet dans de
   rares cas : si ça échoue, on relance au premier toucher, sans
   jamais bloquer l'affichage du reste de l'écran d'accueil.
   ============================================================ */
(function(){
  const v = document.getElementById("homeVideo");
  if(!v) return;

  function tryPlay(){
    const p = v.play();
    if(p && typeof p.catch === "function"){
      p.catch(()=>{
        const retry = ()=>{ v.play().catch(()=>{}); };
        document.addEventListener("pointerdown", retry, {once:true});
        document.addEventListener("visibilitychange", ()=>{ if(!document.hidden) retry(); }, {once:true});
      });
    }
  }
  tryPlay();                                   // tentative immédiate
  if(document.readyState !== "complete"){
    window.addEventListener("load", tryPlay);  // filet de sécurité, ne bloque rien
  }

  /* Coupe la vidéo une fois en jeu : plus besoin de la décoder en tâche
     de fond, ça libère de la ressource pour le jeu lui-même. */
  const playBtn = document.getElementById("homePlay");
  if(playBtn){
    playBtn.addEventListener("click", ()=>{
      setTimeout(()=>{ v.pause(); }, 500);
    });
  }
})();
