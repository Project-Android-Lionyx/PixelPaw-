/* ============================================================
   PROGRESSION — Bloc 9/25 : Niveau du joueur, XP, arbre de compétences
   Module additif : n'écrase aucune mécanique existante. Les hooks vers
   doTap/buyUp/animalClick/premiumClick/globalMult/critChance ajoutent
   un seul appel chacun, rien d'autre n'est modifié dans ces fonctions.
   ============================================================ */
(function(){
  /* Le niveau s'affiche sur la ligne d'info sous le HUD : la grille .hud-row est
     déjà pleine (5 colonnes / 5 éléments), y ajouter un 6e la ferait déborder. */
  const lvlLine = document.createElement("div");
  lvlLine.id = "lvlLine";
  lvlLine.innerHTML = '<span id="lvlVal">⭐ Niv. 1</span><span id="xpBar"><i></i></span>';
  const cps = document.getElementById("cpsLine");
  if(cps && cps.parentNode) cps.parentNode.insertBefore(lvlLine, cps.nextSibling);

  function xpForLevel(n){ return Math.floor(60 * Math.pow(1.32, n-1)); }

  window.gainPlayerXP = function(amount){
    if(typeof S === "undefined" || !amount) return;
    amount *= (1 + 0.02*(S.skills ? S.skills.explo : 0));   // talent Exploration : +2%/pt sur l'XP gagnée
    S.playerXP = (S.playerXP||0) + amount;
    let leveled = false;
    while(S.playerXP >= xpForLevel(S.playerLvl||1)){
      S.playerXP -= xpForLevel(S.playerLvl||1);
      S.playerLvl = (S.playerLvl||1) + 1;
      S.skillPts = (S.skillPts||0) + 1;
      const rc = Math.floor(50 * S.playerLvl);
      S.coins += rc; S.totalEarned += rc; S.lifetimeEarned += rc;
      if(S.playerLvl % 5 === 0) S.gems += 5;
      leveled = true;
    }
    if(leveled){
      sfx("evo"); vibrate(50);
      if(typeof confetti === "function") confetti(30);
      toast("Niveau "+S.playerLvl+" ! +1 point de talent");
      if(typeof applyHabitat === "function") applyHabitat();
    }
    updateLvlBadge();
  };

  function updateLvlBadge(){
    if(typeof S === "undefined") return;
    const el = document.getElementById("lvlVal");
    if(el){
      el.textContent = "⭐ Niv. "+(S.playerLvl||1) +
        ((S.skillPts||0) > 0 ? "  ·  "+S.skillPts+" pt" + (S.skillPts>1?"s":"") : "");
    }
    const bar = document.querySelector("#xpBar i");
    if(bar){
      const need = xpForLevel(S.playerLvl||1);
      bar.style.width = Math.max(0, Math.min(100, ((S.playerXP||0)/need)*100)) + "%";
    }
  }
  setInterval(updateLvlBadge, 600);

  /* --- Arbre de compétences : 4 branches, 1 pt/niveau, bonus modestes --- */
  const SKILL_INFO = {
    prod:    {name:"Production",  desc:"+2% production / pt"},
    happy:   {name:"Bonheur",     desc:"+1% chance critique / pt"},
    explo:   {name:"Exploration", desc:"+2% XP gagnée / pt"},
    collect: {name:"Collection",  desc:"+1% chance objets rares / pt"}
  };
  window.SKILL_INFO = SKILL_INFO;

  window.spendSkillPoint = function(branch){
    if(typeof S === "undefined") return false;
    if(!SKILL_INFO[branch]) return false;
    if((S.skillPts||0) <= 0) return false;
    S.skills = S.skills || {prod:0,happy:0,explo:0,collect:0};
    S.skills[branch] = (S.skills[branch]||0) + 1;
    S.skillPts -= 1;
    sfx("good"); toast(SKILL_INFO[branch].name+" amélioré");
    save(); renderHUD();
    return true;
  };

  window.skillProdMult  = function(){ return 1 + 0.02 * ((typeof S!=="undefined" && S.skills) ? S.skills.prod    : 0); };
  window.skillCritBonus = function(){ return       0.01 * ((typeof S!=="undefined" && S.skills) ? S.skills.happy   : 0); };
  window.skillLuckMult  = function(){ return 1 + 0.01 * ((typeof S!=="undefined" && S.skills) ? S.skills.collect : 0); };

  updateLvlBadge();
})();

/* ============================================================
   TALENTS & QUALITÉ — Bloc 9/25 (dépense des points) + Bloc 11/25
   L'arbre de compétences avait des points gagnables mais aucun écran
   pour les dépenser : c'est ce que ce module ajoute. Il n'écrase pas
   openSettings(), il l'enveloppe pour y greffer le réglage de qualité.
   ============================================================ */
(function(){
  /* --- Écran des talents, ouvert en touchant la ligne de niveau --- */
  function openTalents(){
    if(typeof openModal !== "function" || typeof S === "undefined") return;
    const pts = S.skillPts || 0;
    S.skills = S.skills || {prod:0,happy:0,explo:0,collect:0};
    const ICONS = {prod:"🌾", happy:"💖", explo:"🧭", collect:"🎁"};

    let html = '<h2>Talents</h2>' +
      '<div style="font-size:9px;color:var(--ink-soft);margin-bottom:10px">' +
      (pts > 0 ? pts+" point"+(pts>1?"s":"")+" à dépenser" : "Aucun point disponible — monte de niveau pour en gagner") +
      '</div>';

    Object.keys(SKILL_INFO).forEach(k=>{
      const info = SKILL_INFO[k], lvl = S.skills[k] || 0;
      html += '<div class="talentRow">' +
        '<div class="talentIco">'+ICONS[k]+'</div>' +
        '<div class="talentTxt"><b>'+info.name+'</b><span>'+info.desc+'</span></div>' +
        '<div class="talentLvl">'+lvl+'</div>' +
        '<button class="talentBtn" data-sk="'+k+'"'+(pts<=0?' disabled':'')+'>+</button>' +
      '</div>';
    });

    html += '<button class="mBtn" id="tClose">Fermer</button>';
    openModal(html);
    document.querySelectorAll("[data-sk]").forEach(b=>{
      b.onclick = ()=>{ if(spendSkillPoint(b.dataset.sk)) openTalents(); };
    });
    const cl = document.getElementById("tClose");
    if(cl) cl.onclick = closeModal;
  }
  window.openTalents = openTalents;

  const line = document.getElementById("lvlLine");
  if(line){
    line.style.cursor = "pointer";
    line.addEventListener("click", ()=>{ if(typeof sfx==="function") sfx("tab"); openTalents(); });
  }

  /* --- Réglage de la qualité graphique, greffé dans les Options --- */
  if(typeof openSettings === "function"){
    const originalSettings = openSettings;
    window.openSettings = openSettings = function(){
      originalSettings.apply(this, arguments);           // comportement d'origine intact
      try{
        const anchor = document.getElementById("mNotif");
        if(!anchor || document.getElementById("gfxGrid")) return;
        const cur = S.gfxQ || "haute";
        const wrap = document.createElement("div");
        wrap.innerHTML =
          '<div class="sLabel" style="margin-bottom:6px"><span>Qualité graphique</span><span></span></div>' +
          '<div class="themeGrid" id="gfxGrid" style="grid-template-columns:repeat(3,1fr)">' +
            ['faible','moyenne','haute'].map(q=>
              '<button class="themeBtn'+(cur===q?" on":"")+'" data-gfx="'+q+'">'+q.charAt(0).toUpperCase()+q.slice(1)+'</button>'
            ).join("") +
          '</div>';
        while(wrap.firstChild) anchor.parentNode.insertBefore(wrap.firstChild, anchor);
        document.querySelectorAll("[data-gfx]").forEach(b=>{
          b.onclick = ()=>{
            S.gfxQ = b.dataset.gfx; save();
            window.dispatchEvent(new Event("habitatchange"));   // relance le décor
            if(typeof sfx==="function") sfx("click");
            openSettings();
          };
        });
      }catch(e){}
    };
  }
})();

/* ============================================================
   FRÉNÉSIE PROGRESSIVE
   Auparavant : jauge remplie à 2,6 % par tape, soit ~39 tapes fixes.
   Désormais : 100 tapes pour la première, puis +50 tapes à chaque
   déclenchement. La jauge reste exprimée en pourcentage pour que la
   barre existante continue de fonctionner sans être modifiée.
   ============================================================ */
(function(){
  if(typeof tickFrenzyGauge !== "function") return;

  window.frenzyTapsNeeded = function(){
    return 100 + 50 * ((typeof S !== "undefined" && S.frenzyLvl) || 0);
  };

  window.tickFrenzyGauge = tickFrenzyGauge = function(){
    if(frenzyActive()) return;                       // fenêtre active : la jauge est figée
    const need = frenzyTapsNeeded();
    S.frenzyGauge = (S.frenzyGauge||0) + (100 / need);
    if(S.frenzyGauge >= 100){
      S.frenzyGauge = 0;
      S.frenzyLvl = (S.frenzyLvl||0) + 1;            // la suivante demandera 50 tapes de plus
      S.boostMult = frenzyMultBase();
      S.boostUntil = Date.now() + FRENZY_DURATION;
      S.boostName = "Frénésie";
      setCls(app, "frenzyOn", true);
      sfx("big"); vibrate(80);
      if(typeof confetti === "function") confetti(24);
      toast("Frénésie ×"+frenzyMultBase()+" · niveau "+S.frenzyLvl+" ! Prochaine à "+frenzyTapsNeeded()+" tapes");
    }
  };
})();
