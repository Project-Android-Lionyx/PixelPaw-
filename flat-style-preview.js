/* ============================================================
   APERÇU — STYLE PLAT/LISSE (essai, corps entier)
   Prototype indépendant : dessine un animal en formes lisses
   (cercles, courbes) plutôt qu'en grille de pixels. N'affecte
   AUCUN sprite existant — accessible uniquement depuis un écran
   d'aperçu séparé, pour valider la direction avant de l'appliquer.
   ============================================================ */
(function(){
  function drawFlatHamster(ctx, W, H){
    ctx.clearRect(0,0,W,H);
    const cx = W*0.5;

    /* Ombre au sol */
    ctx.fillStyle = "rgba(0,0,0,.15)";
    ctx.beginPath();
    ctx.ellipse(cx, H*0.86, W*0.22, H*0.035, 0, 0, Math.PI*2);
    ctx.fill();

    const fur = "#E3B98A", furDark = "#D1A374", earIn = "#FFC2CE", cream = "#F8E4C8";

    /* Corps (ovale, assis) */
    ctx.fillStyle = fur;
    ctx.beginPath();
    ctx.ellipse(cx, H*0.70, W*0.24, H*0.15, 0, 0, Math.PI*2);
    ctx.fill();

    /* Pattes avant (deux petits ovales) */
    ctx.fillStyle = furDark;
    ctx.beginPath(); ctx.ellipse(cx-W*0.10, H*0.80, W*0.045, H*0.035, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+W*0.10, H*0.80, W*0.045, H*0.035, 0, 0, Math.PI*2); ctx.fill();

    /* Ventre clair */
    ctx.fillStyle = cream;
    ctx.beginPath();
    ctx.ellipse(cx, H*0.74, W*0.13, H*0.09, 0, 0, Math.PI*2);
    ctx.fill();

    /* Oreilles */
    ctx.fillStyle = fur;
    ctx.beginPath(); ctx.arc(cx-W*0.17, H*0.30, W*0.09, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.17, H*0.30, W*0.09, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = earIn;
    ctx.beginPath(); ctx.arc(cx-W*0.17, H*0.30, W*0.05, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.17, H*0.30, W*0.05, 0, Math.PI*2); ctx.fill();

    /* Tête */
    ctx.fillStyle = fur;
    ctx.beginPath();
    ctx.ellipse(cx, H*0.42, W*0.20, H*0.16, 0, 0, Math.PI*2);
    ctx.fill();

    /* Museau clair */
    ctx.fillStyle = cream;
    ctx.beginPath();
    ctx.ellipse(cx, H*0.47, W*0.115, H*0.11, 0, 0, Math.PI*2);
    ctx.fill();

    /* Yeux */
    ctx.fillStyle = "#2B2333";
    ctx.beginPath(); ctx.arc(cx-W*0.075, H*0.40, W*0.018, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.075, H*0.40, W*0.018, 0, Math.PI*2); ctx.fill();

    /* Museau + bouche */
    ctx.fillStyle = "#2B2333";
    ctx.beginPath(); ctx.arc(cx, H*0.46, W*0.012, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#2B2333"; ctx.lineWidth = W*0.008; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx-W*0.02, H*0.475); ctx.quadraticCurveTo(cx, H*0.50, cx+W*0.02, H*0.475); ctx.stroke();

    /* Dent */
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(cx-W*0.012, H*0.485, W*0.024, H*0.02);

    /* Moustaches */
    ctx.strokeStyle = "rgba(60,50,40,.5)"; ctx.lineWidth = W*0.004;
    [-1,1].forEach(side=>{
      for(let i=0;i<3;i++){
        ctx.beginPath();
        ctx.moveTo(cx+side*W*0.09, H*(0.45+i*0.018));
        ctx.lineTo(cx+side*W*0.19, H*(0.43+i*0.02));
        ctx.stroke();
      }
    });

    /* Joues */
    ctx.fillStyle = "rgba(255,150,170,.35)";
    ctx.beginPath(); ctx.arc(cx-W*0.13, H*0.46, W*0.03, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.13, H*0.46, W*0.03, 0, Math.PI*2); ctx.fill();
  }

  window.openFlatPreview = function(){
    if(typeof openModal !== "function") return;
    openModal(
      '<h2>Aperçu — style plat</h2>' +
      '<div style="background:var(--card);border:3px solid var(--ink);border-radius:16px;' +
      'box-shadow:var(--pop-sm);padding:10px;margin-bottom:10px">' +
      '<canvas id="flatPreviewCv" width="240" height="240" style="width:100%;height:auto;display:block"></canvas>' +
      '</div>' +
      '<p style="font-size:8px;line-height:1.7">Essai : Hamster en formes lisses, corps entier.<br>' +
      'Dessiné en code, aucune image externe.</p>' +
      '<button class="mBtn" id="flatPreviewClose">Fermer</button>'
    );
    const cv = document.getElementById("flatPreviewCv");
    if(cv) drawFlatHamster(cv.getContext("2d"), cv.width, cv.height);
    const c = document.getElementById("flatPreviewClose");
    if(c) c.onclick = closeModal;
  };

  /* Accessible depuis les Options, sous la qualité graphique */
  if(typeof openSettings === "function"){
    const prev = openSettings;
    window.openSettings = openSettings = function(){
      prev.apply(this, arguments);
      try{
        const anchor = document.getElementById("mNotif");
        if(!anchor || document.getElementById("flatPreviewBtn")) return;
        const btn = document.createElement("button");
        btn.id = "flatPreviewBtn";
        btn.className = "mBtn ghost";
        btn.textContent = "🎨 Aperçu style plat (essai)";
        anchor.parentNode.insertBefore(btn, anchor);
        btn.onclick = ()=>{ if(typeof sfx==="function") sfx("tab"); openFlatPreview(); };
      }catch(e){}
    };
  }
})();
