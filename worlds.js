/* ============================================================
   TÉLÉPORTATION & MONDES — méta-progression au-dessus de la Renaissance
   Acheter un Point de Téléportation fait basculer dans le monde suivant :
   tout le cycle de jeu repart de zéro (y compris renaissances et Pattes
   Célestes), mais un multiplicateur permanent s'applique à jamais.
   Ce qui a été payé en gemmes est conservé — comme le fait déjà la
   Renaissance (correctif v2.5), par respect des achats du joueur.
   ============================================================ */
(function(){
  /* Monde 1 = x1 · Monde 2 = x1,5 · puis doublement à chaque monde */
  window.worldMult = function(w){
    const n = w || (typeof S !== "undefined" ? (S.world||1) : 1);
    return n <= 1 ? 1 : 1.5 * Math.pow(2, n-2);
  };
  window.teleportCost = function(){
    const w = (typeof S !== "undefined" ? (S.world||1) : 1);
    return 120 * w;                                  // 120 gemmes, +120 par monde
  };
  window.teleportReqRebirths = function(){
    const w = (typeof S !== "undefined" ? (S.world||1) : 1);
    return 3 * w;                                    // il faut avoir vraiment joué le monde
  };
  window.canTeleport = function(){
    if(typeof S === "undefined") return false;
    return (S.rebirths||0) >= teleportReqRebirths() && S.gems >= teleportCost();
  };

  window.doTeleport = function(){
    if(!canTeleport()) return false;
    S.gems -= teleportCost();
    S.world = (S.world||1) + 1;

    /* Remise à zéro du cycle de jeu — même périmètre que la Renaissance,
       plus les renaissances et les Pattes Célestes elles-mêmes. */
    S.coins = 0;
    S.owned = {cochon:true};
    if(!S.owned[S.animal] && !S.premium[S.animal]) S.animal = "cochon";
    S.up = {}; S.aup = {}; S.rup = {}; S.evo = {};
    S.prest = {}; S.pawPoints = 0; S.rebirths = 0;
    S.inv = {}; S.seen = {}; S.dex = {cochon:1}; S.fc = 0;
    S.boostUntil = 0; S.boostMult = 1; S.boostName = "";
    S.totalEarned = 0; S.offCoinSteps = 0; S.expo = null;
    /* Seuls les achats en gemmes survivent : races premium, cosmétiques,
       pass sans pubs et extensions hors-ligne payées en gemmes.
       Tout le reste — y compris niveau, talents et exploration — repart à zéro. */
    S.playerLvl = 1; S.playerXP = 0; S.skillPts = 0;
    S.skills = {prod:0, happy:0, explo:0, collect:0};
    S.habXp = {}; S.habDone = {}; S.habitat = null;
    S.starter = null;
    if(typeof ensureTierCache === "function") ensureTierCache();

    closeModal();
    if(typeof sfx === "function") sfx("big");
    vibrate(150);
    if(typeof flash !== "undefined" && flash){ flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go"); }
    if(typeof confetti === "function") confetti(40);
    renderPet(); save(); renderHUD(); refreshLists();
    if(typeof applyHabitat === "function") applyHabitat();
    toast("Monde "+S.world+" ! Production ×"+worldMult().toFixed(1)+" pour toujours");
    return true;
  };

  function skinAt(n){
    const names = ["Naturel","Éthéré","Astral","Crépusculaire","Infernal","Abyssal","Prismatique","Spectral"];
    return names[(n-1) % names.length];
  }
  window.openTeleport = function(){
    if(typeof openModal !== "function") return;
    const w = S.world||1, cost = teleportCost(), need = teleportReqRebirths();
    const ok = canTeleport();
    const missReb = Math.max(0, need - (S.rebirths||0));
    const missGem = Math.max(0, cost - S.gems);

    openModal(
      '<h2>Point de Téléportation</h2>' +
      '<div class="tpNow">Monde <b>'+w+'</b> · '+skinAt(w)+'<br>production ×'+worldMult(w).toFixed(1)+'</div>' +
      '<div class="tpArrow">▼</div>' +
      '<div class="tpNext">Monde <b>'+(w+1)+'</b> · '+skinAt(w+1)+'<br>production ×'+worldMult(w+1).toFixed(1)+'</div>' +
      '<div class="tpWarn">' +
        '<b>Tout repart de zéro :</b><br>' +
        'pièces, animaux, améliorations, évolutions,<br>' +
        'renaissances, Pattes Célestes,<br>niveau, talents et exploration.<br><br>' +
        '<b>Tu conserves uniquement tes achats en gemmes :</b><br>' +
        'gemmes, races premium, cosmétiques et pass.' +
      '</div>' +
      '<div class="tpReq">' +
        (missReb ? '<div class="tpKo">✖ Encore '+missReb+' renaissance'+(missReb>1?'s':'')+' ('+(S.rebirths||0)+'/'+need+')</div>'
                 : '<div class="tpOk">✔ Renaissances '+(S.rebirths||0)+'/'+need+'</div>') +
        (missGem ? '<div class="tpKo">✖ Il manque '+fmt(missGem)+' 💎 ('+fmt(S.gems)+'/'+fmt(cost)+')</div>'
                 : '<div class="tpOk">✔ '+fmt(cost)+' 💎 disponibles</div>') +
      '</div>' +
      '<button class="mBtn" id="tpGo"'+(ok?'':' disabled style="opacity:.45"')+'>Se téléporter</button>' +
      '<button class="mBtn ghost" id="tpNo">Annuler</button>'
    );
    const no = document.getElementById("tpNo"); if(no) no.onclick = openWorldMap;
    const go = document.getElementById("tpGo");
    if(go && ok) go.onclick = ()=>{
      openModal('<h2>Confirmer</h2><p>Tu quittes le Monde '+w+' définitivement.<br>Cette action est irréversible.</p>' +
        '<button class="mBtn" id="tpY">Oui, téléporter</button><button class="mBtn ghost" id="tpN">Annuler</button>');
      document.getElementById("tpN").onclick = openTeleport;
      document.getElementById("tpY").onclick = doTeleport;
    };
  };
})();

/* ============================================================
   IDENTITÉ VISUELLE PAR MONDE
   Chaque téléportation ne remet pas seulement les compteurs à zéro :
   elle repeint le monde entier. Les 12 habitats gardent leur structure
   mais changent d'ambiance chromatique, et prennent le chiffre romain
   du monde (Forêt, Forêt II, Forêt III…) — un suffixe neutre qui évite
   tout problème d'accord en français.
   ============================================================ */
(function(){
  /* Chaque monde applique une rotation de teinte, une saturation et une
     luminosité propres, plus une couleur de ciel dominante. */
  /* Rotations calibrées depuis la teinte verte de base (~100°) pour que
     le nom du monde corresponde vraiment à la couleur obtenue. */
  const SKINS = [
    {name:"Naturel",      hue:0,    sat:1.00, lum:0,     sky:null},
    {name:"Éthéré",       hue:+75,  sat:0.80, lum:+0.08, sky:"rgba(150,235,225,.20)"},
    {name:"Astral",       hue:+160, sat:1.00, lum:-0.02, sky:"rgba(130,110,225,.24)"},
    {name:"Crépusculaire",hue:-55,  sat:1.05, lum:-0.02, sky:"rgba(255,190,110,.22)"},
    {name:"Infernal",     hue:-85,  sat:1.20, lum:-0.05, sky:"rgba(255,110,60,.24)"},
    {name:"Abyssal",      hue:+120, sat:0.95, lum:-0.14, sky:"rgba(30,70,120,.32)"},
    {name:"Prismatique",  hue:+220, sat:1.25, lum:+0.02, sky:"rgba(255,150,230,.20)"},
    {name:"Spectral",     hue:+40,  sat:0.70, lum:+0.05, sky:"rgba(200,255,240,.18)"}
  ];

  function skin(){
    const w = (typeof S !== "undefined" ? (S.world||1) : 1);
    return SKINS[(w-1) % SKINS.length];
  }
  window.worldSkinName = function(){ return skin().name; };
  window.worldSkySkin  = function(){ return skin().sky; };

  /* --- Conversion couleur : hex -> HSL -> hex, avec la transformation du monde --- */
  function hex2rgb(h){
    h = h.replace("#","");
    if(h.length === 3) h = h.split("").map(c=>c+c).join("");
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }
  function rgb2hsl(r,g,b){
    r/=255; g/=255; b/=255;
    const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
    let h = 0, s = 0; const l = (mx+mn)/2;
    if(mx !== mn){
      const d = mx-mn;
      s = l > .5 ? d/(2-mx-mn) : d/(mx+mn);
      if(mx === r) h = (g-b)/d + (g < b ? 6 : 0);
      else if(mx === g) h = (b-r)/d + 2;
      else h = (r-g)/d + 4;
      h *= 60;
    }
    return [h, s, l];
  }
  function hsl2hex(h,s,l){
    h = ((h % 360) + 360) % 360; s = Math.min(1, Math.max(0, s)); l = Math.min(1, Math.max(0, l));
    const c = (1 - Math.abs(2*l-1)) * s;
    const x = c * (1 - Math.abs(((h/60) % 2) - 1));
    const m = l - c/2;
    let r=0,g=0,b=0;
    if(h<60){r=c;g=x;} else if(h<120){r=x;g=c;} else if(h<180){g=c;b=x;}
    else if(h<240){g=x;b=c;} else if(h<300){r=x;b=c;} else {r=c;b=x;}
    const to = v => Math.round((v+m)*255).toString(16).padStart(2,"0");
    return "#"+to(r)+to(g)+to(b);
  }

  const cache = {};
  window.worldTint = function(hex){
    const k = (typeof S !== "undefined" ? (S.world||1) : 1) + "|" + hex;
    if(cache[k]) return cache[k];
    const sk = skin();
    if(sk.hue === 0 && sk.sat === 1 && sk.lum === 0){ cache[k] = hex; return hex; }
    try{
      const [r,g,b] = hex2rgb(hex);
      const [h,s,l] = rgb2hsl(r,g,b);
      const out = hsl2hex(h + sk.hue, s * sk.sat, l + sk.lum);
      cache[k] = out; return out;
    }catch(e){ return hex; }
  };

  /* Suffixe romain : neutre, sans accord de genre */
  const ROMAN = ["","","II","III","IV","V","VI","VII","VIII","IX","X"];
  window.worldSuffix = function(){
    const w = (typeof S !== "undefined" ? (S.world||1) : 1);
    return w <= 1 ? "" : " " + (ROMAN[w] || w);
  };
})();
