/* ============================================================
   CARTE DU MONDE & EXPÉDITIONS — Bloc 16/25
   Donne un but aux 12 habitats : on y voyage, on y envoie son animal
   en expédition, et chaque habitat se découvre progressivement.
   Les expéditions se poursuivent hors-ligne (horodatage), sans jamais
   toucher au système de gains hors-ligne existant.
   ============================================================ */
(function(){
  const DURATIONS = [
    {id:"court",  name:"Balade",     ms:5*60*1000,     mult:1.0},
    {id:"moyen",  name:"Randonnée",  ms:30*60*1000,    mult:6.5},
    {id:"long",   name:"Expédition", ms:2*60*60*1000,  mult:28}
  ];

  function habList(){ return (typeof getHabitats === "function") ? getHabitats() : []; }
  function habById(id){ return habList().find(h=>h.id === id); }

  /* Récompenses : adossées à la production réelle du joueur pour rester
     équilibrées à tous les stades, et plafonnées pour ne pas court-circuiter
     la progression normale. */
  function expoReward(habId, dur){
    const hs = habList(), idx = Math.max(0, hs.findIndex(h=>h.id===habId));
    const base = (typeof perSec === "function" ? perSec(false) : 0) || 10;
    const coins = Math.floor(base * (dur.ms/1000) * 0.45 * (1 + idx*0.08));
    const gemChance = Math.min(0.55, 0.12 + idx*0.03 + (dur.mult/60));
    const gems = Math.random() < gemChance ? (1 + Math.floor(Math.random()*(1+idx/3))) : 0;
    const fc = Math.random() < 0.35 ? 1 + Math.floor(dur.mult/10) : 0;
    const xp = Math.floor(8 * dur.mult);
    return {coins, gems, fc, xp};
  }

  function expoLeft(){
    if(!S.expo) return 0;
    return Math.max(0, S.expo.until - Date.now());
  }

  function startExpo(habId, durId){
    if(S.expo) return false;
    const dur = DURATIONS.find(d=>d.id===durId);
    const h = habById(habId);
    if(!dur || !h || !h.unlocked) return false;
    S.expo = {hab:habId, until:Date.now()+dur.ms, dur:durId};
    save(); if(typeof sfx==="function") sfx("buy");
    toast(h.name+" · "+dur.name+" en cours");
    openWorldMap();
    return true;
  }

  function collectExpo(){
    if(!S.expo || expoLeft() > 0) return false;
    const dur = DURATIONS.find(d=>d.id===S.expo.dur) || DURATIONS[0];
    const h = habById(S.expo.hab);
    const r = expoReward(S.expo.hab, dur);

    S.coins += r.coins; S.totalEarned += r.coins; S.lifetimeEarned += r.coins;
    if(r.gems) S.gems += r.gems;
    if(r.fc) S.fc = (S.fc||0) + r.fc;

    /* Progression d'exploration de l'habitat */
    S.habXp = S.habXp || {};
    S.habXp[S.expo.hab] = (S.habXp[S.expo.hab]||0) + Math.round(dur.mult);
    if(S.habXp[S.expo.hab] >= 100 && !(S.habDone||{})[S.expo.hab]){
      S.habDone = S.habDone || {}; S.habDone[S.expo.hab] = true;
      S.gems += 25;
      toast((h?h.name:"Habitat")+" entièrement exploré ! +25 💎");
      if(typeof confetti === "function") confetti(30);
    }

    S.expo = null;
    if(typeof gainPlayerXP === "function") gainPlayerXP(r.xp);
    if(typeof sfx==="function") sfx("good");
    vibrate(35);
    let msg = "+"+fmt(r.coins)+" pièces";
    if(r.gems) msg += " · +"+r.gems+" 💎";
    if(r.fc)   msg += " · +"+r.fc+" 🔩";
    toast(msg);
    save(); renderHUD(); openWorldMap();
    return true;
  }

  function fmtLeft(ms){
    const s = Math.ceil(ms/1000);
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), q = s%60;
    return h ? h+"h "+String(m).padStart(2,"0")+"m" : m ? m+"m "+String(q).padStart(2,"0")+"s" : q+"s";
  }

  window.openWorldMap = function(){
    if(typeof openModal !== "function") return;
    const hs = habList();
    const cur = (typeof AMB !== "undefined" && AMB.habitat) ? AMB.habitat : (hs[0]&&hs[0].id);
    let html = '<h2>Carte du monde</h2>';

    /* Bandeau d'expédition en cours */
    if(S.expo){
      const h = habById(S.expo.hab), left = expoLeft();
      html += '<div class="expoBar">' +
        '<span class="expoIco">'+(h?h.emoji:"🧭")+'</span>' +
        '<span class="expoTxt">'+(h?h.name:"?")+'<br><b id="expoLeft">'+(left>0?fmtLeft(left):"Terminée !")+'</b></span>' +
        (left>0 ? '<span class="expoWait">⏳</span>'
                : '<button class="talentBtn" id="expoGet" style="width:auto;padding:0 12px">Récolter</button>') +
      '</div>';
    }

    html += '<div class="mapGrid">';
    hs.forEach(h=>{
      const done = (S.habDone||{})[h.id];
      const prog = Math.min(100, (S.habXp||{})[h.id] || 0);
      const isCur = h.id === cur;
      html += '<button class="mapCell'+(h.unlocked?"":" lock")+(isCur?" cur":"")+'" data-hab="'+h.id+'"'+(h.unlocked?"":" disabled")+'>' +
        '<span class="mcIco">'+(h.unlocked ? h.emoji : "🔒")+'</span>' +
        '<span class="mcName">'+(h.unlocked ? h.name : "Niv. "+h.unlockLvl)+'</span>' +
        (h.unlocked ? '<span class="mcBar"><i style="width:'+prog+'%"></i></span>' : '') +
        (done ? '<span class="mcDone">★</span>' : '') +
      '</button>';
    });
    html += '</div>';

    if(!S.expo){
      html += '<div class="sLabel" style="margin:10px 0 6px"><span>Envoyer en expédition</span><span></span></div>' +
        '<div style="font-size:7.5px;color:var(--ink-soft);margin-bottom:6px">Choisis d\'abord un habitat ci-dessus</div>' +
        '<div class="themeGrid" style="grid-template-columns:repeat(3,1fr)">' +
        DURATIONS.map(d=>'<button class="themeBtn" data-dur="'+d.id+'">'+d.name+'<br><span style="font-size:7px;opacity:.7">'+fmtLeft(d.ms)+'</span></button>').join("") +
        '</div>';
    }

    html += '<button class="mBtn ghost" id="wmTp">🌀 Monde ' + (S.world||1) +
            (typeof worldSkinName === "function" ? ' · ' + worldSkinName() : '') +
            ' · ×' + (typeof worldMult==="function" ? worldMult().toFixed(1) : "1") +
            '<br><span style="font-size:7px;opacity:.75">Point de Téléportation</span></button>' +
            '<button class="mBtn" id="wmClose">Fermer</button>';
    openModal(html);
    const tp = document.getElementById("wmTp");
    if(tp) tp.onclick = ()=>{ if(typeof openTeleport === "function") openTeleport(); };

    let picked = cur;
    document.querySelectorAll("[data-hab]").forEach(b=>{
      b.onclick = ()=>{
        if(b.disabled) return;
        picked = b.dataset.hab;
        document.querySelectorAll("[data-hab]").forEach(x=>x.classList.remove("sel"));
        b.classList.add("sel");
        if(typeof setHabitat === "function") setHabitat(picked);
        if(typeof sfx==="function") sfx("tab");
      };
    });
    document.querySelectorAll("[data-dur]").forEach(b=>{
      b.onclick = ()=>startExpo(picked, b.dataset.dur);
    });
    const g = document.getElementById("expoGet"); if(g) g.onclick = collectExpo;
    const c = document.getElementById("wmClose"); if(c) c.onclick = closeModal;
  };

  /* Compte à rebours vivant dans la fenêtre, et pastille sur le badge */
  setInterval(()=>{
    const el = document.getElementById("expoLeft");
    if(el && S.expo){
      const left = expoLeft();
      el.textContent = left > 0 ? fmtLeft(left) : "Terminée !";
      if(left <= 0 && !document.getElementById("expoGet")) openWorldMap();
    }
    const badge = document.querySelector(".habitatBadge");
    if(badge) badge.classList.toggle("hasExpo", !!S.expo && expoLeft() <= 0);
  }, 1000);

  /* La carte s'ouvre en touchant le badge d'habitat */
  const badge = document.querySelector(".habitatBadge");
  if(badge){
    badge.style.pointerEvents = "auto";
    badge.style.cursor = "pointer";
    badge.addEventListener("click", ()=>{ if(typeof sfx==="function") sfx("tab"); openWorldMap(); });
  }
})();

/* ============================================================
   INDICATEUR D'EXPÉDITION — visible en permanence sur la scène
   L'expédition n'était visible que dans la carte : cette pastille
   affiche l'habitat en cours et le temps restant, et ouvre la carte.
   ============================================================ */
(function(){
  const stageEl = document.getElementById("stage");
  if(!stageEl) return;

  const chip = document.createElement("div");
  chip.className = "expoChip";
  chip.style.display = "none";
  chip.addEventListener("click", ()=>{
    if(typeof sfx === "function") sfx("tab");
    if(typeof openWorldMap === "function") openWorldMap();
  });
  stageEl.appendChild(chip);

  function left(){ return (S && S.expo) ? Math.max(0, S.expo.until - Date.now()) : 0; }
  function fmtShort(ms){
    const s = Math.ceil(ms/1000), h = Math.floor(s/3600), m = Math.floor((s%3600)/60);
    return h ? h+"h"+String(m).padStart(2,"0") : m ? m+"m"+String(s%60).padStart(2,"0") : s+"s";
  }

  setInterval(()=>{
    if(typeof S === "undefined") return;
    if(!S.expo){ chip.style.display = "none"; return; }
    const ms = left(), done = ms <= 0;
    let emoji = "🧭";
    try {
      const h = (typeof getHabitats === "function") && getHabitats().find(x=>x.id === S.expo.hab);
      if(h) emoji = h.emoji;
    } catch(e){}
    chip.style.display = "flex";
    chip.classList.toggle("ready", done);
    chip.innerHTML = '<span class="ecIco">'+emoji+'</span><span class="ecTxt">' +
      (done ? "Récolter !" : fmtShort(ms)) + '</span>';
  }, 1000);
})();

/* ============================================================
   TÉLÉPORTEURS — carte illustrée façon "pad de téléportation"
   Remplace la grille de cases par une vraie carte dessinée : chemin
   reliant les habitats, plateformes de téléportation lumineuses,
   brouillard sur les zones verrouillées.
   Les pads sont dessinés en pixel art original (anneaux concentriques
   + faisceau + particules), pas une reprise d'un visuel existant.
   ============================================================ */
(function(){
  if(typeof openWorldMap !== "function") return;
  const originalMap = openWorldMap;

  /* Positions des habitats sur la carte, en pourcentage (chemin sinueux) */
  const NODES = [
    [16,88],[38,80],[60,86],[80,74],
    [72,60],[48,62],[24,56],[14,42],
    [34,36],[56,38],[76,28],[50,14]
  ];

  function drawMap(cv, habs, selId){
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0,0,W,H);

    /* Fond : parchemin dégradé */
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#CFE3F5"); g.addColorStop(.45,"#DCEFD4"); g.addColorStop(1,"#C7E0B8");
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    /* Relief de fond : collines pixelisées */
    ctx.fillStyle = "rgba(255,255,255,.22)";
    for(let x=0;x<W;x++){
      const y = Math.round(H*0.55 - 8*Math.sin(x*0.05) - 5*Math.sin(x*0.11));
      ctx.fillRect(x, y, 1, H-y);
    }
    ctx.fillStyle = "rgba(120,170,110,.18)";
    for(let x=0;x<W;x++){
      const y = Math.round(H*0.72 - 6*Math.sin(x*0.07+2));
      ctx.fillRect(x, y, 1, H-y);
    }

    const pt = i => [NODES[i][0]/100*W, NODES[i][1]/100*H];

    /* Chemin pointillé entre les étapes */
    for(let i=0;i<habs.length-1;i++){
      const [x1,y1] = pt(i), [x2,y2] = pt(i+1);
      const steps = Math.round(Math.hypot(x2-x1, y2-y1) / 5);
      const unlocked = habs[i].unlocked && habs[i+1].unlocked;
      ctx.fillStyle = unlocked ? "rgba(120,95,70,.75)" : "rgba(120,120,120,.3)";
      for(let s=0;s<=steps;s++){
        if(s % 2) continue;
        ctx.fillRect(Math.round(x1+(x2-x1)*s/steps)-1, Math.round(y1+(y2-y1)*s/steps)-1, 3, 3);
      }
    }

    /* Plateformes de téléportation */
    habs.forEach((h,i)=>{
      const [x,y] = pt(i);
      const sel = h.id === selId;
      if(h.unlocked){
        /* Anneaux concentriques + halo */
        const col = sel ? "#FFD24A" : "#7DD3C0";
        for(let r=13; r>=5; r-=4){
          ctx.strokeStyle = col; ctx.lineWidth = 2;
          ctx.globalAlpha = sel ? .95 : .65;
          ctx.beginPath(); ctx.ellipse(x, y+7, r, r*0.42, 0, 0, Math.PI*2); ctx.stroke();
        }
        ctx.globalAlpha = 1;
        /* Faisceau vertical */
        const bg = ctx.createLinearGradient(0, y-16, 0, y+8);
        bg.addColorStop(0, "rgba(255,255,255,0)");
        bg.addColorStop(1, sel ? "rgba(255,210,74,.5)" : "rgba(125,211,192,.4)");
        ctx.fillStyle = bg; ctx.fillRect(x-5, y-16, 10, 24);
      } else {
        /* Zone verrouillée : brouillard */
        ctx.fillStyle = "rgba(90,90,110,.42)";
        ctx.beginPath(); ctx.ellipse(x, y+4, 16, 12, 0, 0, Math.PI*2); ctx.fill();
      }
    });
  }

  window.openWorldMap = openWorldMap = function(){
    originalMap.apply(this, arguments);
    try{
      const grid = document.querySelector(".mapGrid");
      if(!grid) return;
      const habs = (typeof getHabitats === "function") ? getHabitats() : [];
      if(habs.length !== NODES.length) return;
      const cur = (typeof AMB !== "undefined" && AMB.habitat) || (habs[0] && habs[0].id);

      /* Carte dessinée, insérée AVANT la grille (qui reste la zone
         tactile : elle garantit des cibles assez grandes au doigt) */
      const holder = document.createElement("div");
      holder.className = "mapCanvasWrap";
      const cv = document.createElement("canvas");
      cv.className = "mapCanvas"; cv.width = 220; cv.height = 260;
      holder.appendChild(cv);

      /* Marqueurs positionnés par-dessus la carte */
      habs.forEach((h,i)=>{
        const m = document.createElement("button");
        m.className = "mapPin" + (h.unlocked ? "" : " lock") + (h.id === cur ? " cur" : "");
        m.style.left = NODES[i][0] + "%";
        m.style.top  = NODES[i][1] + "%";
        m.innerHTML = '<span class="mpIco">'+(h.unlocked ? h.emoji : "🔒")+'</span>' +
                      '<span class="mpName">'+(h.unlocked ? h.name : "Niv."+h.unlockLvl)+'</span>';
        if(h.unlocked){
          m.onclick = ()=>{
            if(typeof setHabitat === "function") setHabitat(h.id);
            if(typeof sfx === "function") sfx("big");
            vibrate(30);
            holder.classList.remove("warp"); void holder.offsetWidth; holder.classList.add("warp");
            setTimeout(()=>openWorldMap(), 260);
          };
        } else { m.disabled = true; }
        holder.appendChild(m);
      });

      grid.parentNode.insertBefore(holder, grid);
      drawMap(cv, habs, cur);
      grid.classList.add("mapGridCompact");
    }catch(e){}
  };
})();
