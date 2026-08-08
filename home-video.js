/* ============================================================
   VIDÉO D'ACCUEIL
   Lance la vidéo en boucle dès que possible. Certains WebView bloquent
   l'autoplay même en muet dans de rares cas : si ça échoue, on relance
   au premier toucher de l'écran, sans jamais bloquer l'affichage du
   reste de l'écran d'accueil (bouton Jouer, titre, etc. déjà en place
   par-dessus, indépendants de la vidéo).
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
  if(document.readyState === "complete") tryPlay();
  else window.addEventListener("load", tryPlay);

  /* Coupe la vidéo une fois en jeu : plus besoin de la décoder en tâche
     de fond, ça libère de la ressource pour le jeu lui-même. */
  const playBtn = document.getElementById("homePlay");
  if(playBtn){
    playBtn.addEventListener("click", ()=>{
      setTimeout(()=>{ v.pause(); }, 500);
    });
  }
})();
