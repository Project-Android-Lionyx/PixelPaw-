/* ============================================================
   AMBIANCE — Bloc 3/25 : Habitats, décorations, météo, monde vivant
   Module additif et autonome : ne touche à AUCUNE mécanique existante,
   ne modifie aucune sauvegarde existante, tourne sur sa propre boucle
   légère (ne se mélange pas à loop()). Peut être retiré sans casser
   le reste du jeu.
   ============================================================ */
(function(){
  const stageEl = document.getElementById("stage");
  if(!stageEl) return;

  /* --- Couches visuelles créées dynamiquement (aucune modif HTML) --- */
  const sky = document.createElement("div");
  sky.id = "skyTint";
  stageEl.insertBefore(sky, stageEl.firstChild);

  const wfx = document.createElement("div");
  wfx.id = "weatherFx";
  const wcv = document.createElement("canvas");
  wfx.appendChild(wcv);
  stageEl.appendChild(wfx);

  const badge = document.createElement("div");
  badge.className = "habitatBadge";
  stageEl.appendChild(badge);

  function resizeWCV(){
    const r = stageEl.getBoundingClientRect();
    /* CORRECTIF : le canvas allouait son buffer à la taille CSS, sans tenir
       compte du devicePixelRatio de l'écran. Sur un téléphone à écran dense
       (2,5-3x, la norme sur Android), le navigateur devait alors étirer
       chaque pixel du canvas — les traits de pluie fins devenaient des
       bandes floues/pixelisées. On alloue maintenant à la vraie résolution
       physique, et on redimensionne le contexte pour dessiner en unités CSS
       comme avant (aucune autre ligne du module n'a besoin de changer). */
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    wcv.width  = Math.max(1, Math.floor(r.width  * dpr));
    wcv.height = Math.max(1, Math.floor(r.height * dpr));
    const ctx0 = wcv.getContext("2d");
    ctx0.setTransform(dpr, 0, 0, dpr, 0, 0);
    wcv._cssW = r.width; wcv._cssH = r.height;
  }
  resizeWCV();
  window.addEventListener("resize", resizeWCV);

  /* --- Habitats (BLOC 3/25) --- */
  const HABITATS = [
    {id:"prairie",       name:"Prairie",        emoji:"🌾", unlockLvl:1,  colors:["#CFEFC6","#E9F7E0"]},
    {id:"foret",         name:"Forêt",          emoji:"🌲", unlockLvl:2,  colors:["#B7DDB0","#DCEFD4"]},
    {id:"montagne",      name:"Montagne",       emoji:"⛰️", unlockLvl:3,  colors:["#C9D6E3","#EAF1F7"]},
    {id:"desert",        name:"Désert",         emoji:"🏜️", unlockLvl:4,  colors:["#F2DFA6","#FBEFCB"]},
    {id:"banquise",      name:"Banquise",       emoji:"❄️", unlockLvl:5,  colors:["#D6EEF7","#F0FAFD"]},
    {id:"jungle",        name:"Jungle",         emoji:"🌴", unlockLvl:6,  colors:["#A9D89B","#D4EFC7"]},
    {id:"savane",        name:"Savane",         emoji:"🦁", unlockLvl:7,  colors:["#EAD79A","#F7ECC9"]},
    {id:"marais",        name:"Marais",         emoji:"🐸", unlockLvl:8,  colors:["#B8CFA8","#DCE9CE"]},
    {id:"volcan",        name:"Volcan",         emoji:"🌋", unlockLvl:9,  colors:["#E9B3A3","#F6D9CE"]},
    {id:"iletropicale",  name:"Île tropicale",  emoji:"🏝️", unlockLvl:10, colors:["#A6E1DA","#D8F5F1"]},
    {id:"mondeceleste",  name:"Cité Céleste",   emoji:"☁️", unlockLvl:11, colors:["#D9CCF2","#EFE7FA"]},
    {id:"mondecosmique", name:"Voie Cosmique",  emoji:"🌌", unlockLvl:12, colors:["#7C6CA8","#B9A8DB"]}
  ];

  /* Proxy de progression : utilise S.playerLvl si un jour le bloc 9 (niveau joueur)
     est implémenté ; sinon se base sur le nombre d'animaux possédés, sans jamais
     planter si ces champs n'existent pas encore. */
  function playerLevel(){
    if(typeof S === "undefined") return 1;
    if(S.playerLvl) return S.playerLvl;
    const owned = S.owned ? Object.keys(S.owned).filter(k=>S.owned[k]).length : 1;
    return Math.max(1, owned);
  }
  function unlockedHabitats(){
    const lvl = playerLevel();
    const u = HABITATS.filter(h=>lvl >= h.unlockLvl);
    return u.length ? u : [HABITATS[0]];
  }
  function currentHabitat(){
    const u = unlockedHabitats();
    if(typeof S !== "undefined" && S.habitat){
      const h = u.find(x=>x.id === S.habitat);
      if(h) return h;
    }
    return u[u.length-1];
  }
  window.setHabitat = function(id){
    const u = unlockedHabitats();
    const h = u.find(x=>x.id===id);
    if(!h) return false;
    if(typeof S !== "undefined"){ S.habitat = id; if(typeof save==="function") save(); }
    applyHabitat();
    return true;
  };
  window.getHabitats = function(){
    const u = unlockedHabitats();
    return HABITATS.map(h=>({...h, unlocked: u.includes(h)}));
  };
  function applyHabitat(){
    const h = currentHabitat();
    const tint = (typeof worldTint === "function") ? worldTint : (c=>c);
    const suf  = (typeof worldSuffix === "function") ? worldSuffix() : "";
    stageEl.style.setProperty("--habitat-c1", tint(h.colors[0]));
    stageEl.style.setProperty("--habitat-c2", tint(h.colors[1]));
    badge.textContent = h.emoji + " " + h.name + suf;
    AMB.habitat = h.id;
    window.dispatchEvent(new Event("habitatchange"));
  }
  window.applyHabitat = applyHabitat;
  window.currentHabitat = currentHabitat;

  /* --- Cycle jour / nuit (BLOC 3/25) : cycle accéléré de 6 min, 4 phases --- */
  const DAY_CYCLE_MS = 6 * 60 * 1000;
  const PHASES = [
    {t:0.00, name:"Matin",   tint:"rgba(255,224,178,.28)"},
    {t:0.28, name:"Midi",    tint:"rgba(255,255,255,.05)"},
    {t:0.55, name:"Coucher", tint:"rgba(255,150,110,.32)"},
    {t:0.72, name:"Nuit",    tint:"rgba(48,42,110,.50)"}
  ];
  function phaseAt(frac){
    let cur = PHASES[0];
    for(const p of PHASES){ if(frac >= p.t) cur = p; }
    return cur;
  }
  function tickDayNight(){
    const frac = (Date.now() % DAY_CYCLE_MS) / DAY_CYCLE_MS;
    const p = phaseAt(frac);
    sky.style.background = p.tint;
    AMB.phase = p.name;
  }

  /* --- Météo dynamique (BLOC 3/25) --- */
  const WEATHERS = ["soleil","pluie","neige","brouillard","orage","vent","arcenciel"];
  const WEATHER_WEIGHTS = {soleil:34, pluie:16, neige:10, brouillard:10, orage:8, vent:16, arcenciel:6};
  let particles = [];
  const AMB = { weather:"soleil", phase:"Midi" };
  window.AMB = AMB;

  function pickWeather(){
    let total = 0; for(const w in WEATHER_WEIGHTS) total += WEATHER_WEIGHTS[w];
    let r = Math.random()*total;
    for(const w of WEATHERS){ r -= WEATHER_WEIGHTS[w]; if(r<=0) return w; }
    return "soleil";
  }
  function setWeather(w){
    AMB.weather = w;
    particles = [];
    const W = wcv._cssW || wcv.width, H = wcv._cssH || wcv.height;
    const count = (w==="pluie"||w==="orage") ? 70 : (w==="neige") ? 40 : (w==="vent") ? 18 : 0;
    for(let i=0;i<count;i++){
      particles.push({
        x:Math.random()*W, y:Math.random()*H,
        vy:(w==="pluie"||w==="orage") ? (6+Math.random()*4) : (w==="neige") ? (0.6+Math.random()*0.8) : 0,
        vx:(w==="vent") ? (1.2+Math.random()*1.5) : (w==="neige") ? (Math.sin(i)*0.4) : 0,
        len:(w==="pluie"||w==="orage") ? (8+Math.random()*8) : 0,
        r:(w==="neige") ? (1+Math.random()*2) : 0
      });
    }
  }
  let lightningT = 0;
  function drawWeather(){
    if(!wcv.width || !wcv.height) return;
    const W = wcv._cssW || wcv.width, H = wcv._cssH || wcv.height;
    const ctx = wcv.getContext("2d");
    ctx.clearRect(0,0,W,H);
    const w = AMB.weather;
    if(w==="soleil") return;
    if(w==="brouillard"){
      ctx.fillStyle = "rgba(255,255,255,.16)";
      ctx.fillRect(0,0,W,H);
      return;
    }
    if(w==="pluie" || w==="orage"){
      ctx.strokeStyle = "rgba(180,210,255,.55)"; ctx.lineWidth = 1.4;
      particles.forEach(p=>{
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x, p.y+p.len); ctx.stroke();
        p.y += p.vy; if(p.y > H){ p.y = -10; p.x = Math.random()*W; }
      });
      if(w==="orage"){
        lightningT -= 1;
        if(lightningT <= 0 && Math.random() < 0.01){
          lightningT = 6;
          ctx.fillStyle = "rgba(255,255,255,.35)";
          ctx.fillRect(0,0,W,H);
        }
      }
      return;
    }
    if(w==="neige"){
      ctx.fillStyle = "rgba(255,255,255,.85)";
      particles.forEach(p=>{
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        p.y += p.vy; p.x += p.vx;
        if(p.y > H){ p.y = -5; p.x = Math.random()*W; }
      });
      return;
    }
    if(w==="vent"){
      ctx.strokeStyle = "rgba(140,170,120,.4)"; ctx.lineWidth = 2;
      particles.forEach(p=>{
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-10,p.y-3); ctx.stroke();
        p.x += p.vx*2; if(p.x > W){ p.x = -10; p.y = Math.random()*H; }
      });
      return;
    }
    if(w==="arcenciel"){
      const cx = W*0.5, cy = H*1.05, R = W*0.55;
      const cols = ["#FF6B6B","#FFB86B","#FFE96B","#8FE38F","#7DC4F2","#B49CE8"];
      cols.forEach((c,i)=>{
        ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.globalAlpha = .55;
        ctx.beginPath(); ctx.arc(cx, cy, Math.max(1,R - i*5), Math.PI, 2*Math.PI); ctx.stroke();
      });
      ctx.globalAlpha = 1;
      return;
    }
  }
  function rotateWeather(){ setWeather(pickWeather()); }

  /* Petit bonus équilibré (conséquence météo demandée au bloc 3) :
     arc-en-ciel = +5% sur la production, rien d'autre — branché dans globalMult(). */
  window.weatherLuckMult = function(){
    return AMB.weather === "arcenciel" ? 1.05 : 1;
  };

  /* --- Boucle légère dédiée, indépendante de loop() du jeu --- */
  function ambianceTick(){ tickDayNight(); drawWeather(); }
  setInterval(ambianceTick, 200);
  setInterval(rotateWeather, 5*60*1000);

  applyHabitat();
  setWeather(pickWeather());
  tickDayNight();
})();

/* ============================================================
   DÉCOR VIVANT — Bloc 3/25 (parallaxe, décor, particules)
                  Bloc 11/25 (qualité graphique adaptative)
   Rendu en pixel art authentique : canvas basse résolution agrandi
   par CSS (image-rendering:pixelated). Les couches fixes (collines,
   arbres, sol) sont pré-rendues une seule fois par habitat, seules
   les particules et les nuages sont recalculés — pour tenir 60 FPS
   sur téléphone modeste.
   ============================================================ */
(function(){
  const stageEl = document.getElementById("stage");
  if(!stageEl) return;

  const cv = document.createElement("canvas");
  cv.id = "decorCv";
  stageEl.insertBefore(cv, stageEl.firstChild);
  const ctx = cv.getContext("2d");

  const W = 120;                 // résolution interne (pixel art)
  let H = 200;
  let scenery = null;            // couches fixes pré-rendues

  /* Palettes par habitat : ciel, collines, arbres, sol, fleurs */
  const PAL = {
    prairie:      {hill:["#8FCF7A","#79BC64"], tree:"#4E9B4E", trunk:"#7A5230", ground:"#A5DB90", deco:["#FF8FB1","#FFE066","#FFFFFF"], kind:"tree"},
    foret:        {hill:["#6FAF66","#588F52"], tree:"#2F7A3E", trunk:"#5E4326", ground:"#7FBE74", deco:["#FFFFFF","#FFD9E8"],           kind:"pine"},
    montagne:     {hill:["#9FB3C8","#8296AC"], tree:"#5C7A6B", trunk:"#5E4326", ground:"#B6C6D6", deco:["#FFFFFF"],                     kind:"rock"},
    desert:       {hill:["#E3C67F","#CFAF66"], tree:"#7FA85C", trunk:"#8A6B3A", ground:"#EBD79C", deco:["#FF9E6B","#FFE066"],           kind:"cactus"},
    banquise:     {hill:["#BFE2F0","#A2CFE2"], tree:"#8FBFD6", trunk:"#7FA8BC", ground:"#DCF1F8", deco:["#FFFFFF"],                     kind:"ice"},
    jungle:       {hill:["#63A855","#4C8E44"], tree:"#2E7D32", trunk:"#5E4326", ground:"#77BC66", deco:["#FF6B9D","#FFD54F","#FF8A65"], kind:"palm"},
    savane:       {hill:["#DCC177","#C4A85F"], tree:"#8B9F4B", trunk:"#7A5230", ground:"#E6D293", deco:["#FFB74D"],                     kind:"acacia"},
    marais:       {hill:["#7E9C6A","#657F55"], tree:"#4A7A46", trunk:"#4E3B22", ground:"#8FAA78", deco:["#C5E1A5","#AED581"],           kind:"reed"},
    volcan:       {hill:["#8C6A62","#6E504A"], tree:"#5C4038", trunk:"#4A332C", ground:"#A07C72", deco:["#FF7043","#FFAB40"],           kind:"rock"},
    iletropicale: {hill:["#7FD3C4","#5FBBA9"], tree:"#3E9C7A", trunk:"#8A6B3A", ground:"#F0E2B8", deco:["#FF80AB","#FFD180"],           kind:"palm"},
    mondeceleste: {hill:["#C7B8EA","#AB99D9"], tree:"#9C86D0", trunk:"#7A66A8", ground:"#DCD0F2", deco:["#FFFFFF","#FFE066"],           kind:"cloudtree"},
    mondecosmique:{hill:["#5A4C87","#463A6B"], tree:"#6E5CA0", trunk:"#4A3C72", ground:"#6B5C99", deco:["#FFFFFF","#8FE3FF","#FFD1F0"], kind:"crystal"}
  };

  function qLevel(){
    const q = (typeof S !== "undefined" && S.gfxQ) ? S.gfxQ : "haute";
    return q === "faible" ? 0 : q === "moyenne" ? 1 : 2;
  }

  function resize(){
    const r = stageEl.getBoundingClientRect();
    if(!r.width || !r.height) return;
    H = Math.max(80, Math.round(W * (r.height / r.width)));
    cv.width = W; cv.height = H;
    ctx.imageSmoothingEnabled = false;
    scenery = null;                       // force le re-rendu des couches fixes
  }

  /* --- Pré-rendu des couches fixes (une fois par habitat / redimensionnement) --- */
  function buildScenery(){
    const id = (typeof AMB !== "undefined" && AMB.habitat) ? AMB.habitat : "prairie";
    const raw = PAL[id] || PAL.prairie;
    /* Le décor est repeint aux couleurs du monde en cours */
    const t = (typeof worldTint === "function") ? worldTint : (c=>c);
    const p = {
      hill:  raw.hill.map(t),
      tree:  t(raw.tree),
      trunk: t(raw.trunk),
      ground:t(raw.ground),
      deco:  raw.deco.map(t),
      kind:  raw.kind
    };
    const off = document.createElement("canvas");
    off.width = W; off.height = H;
    const c = off.getContext("2d");
    c.imageSmoothingEnabled = false;

    const horizon = Math.round(H * 0.62);

    /* Collines lointaines (2 couches, effet de profondeur) */
    for(let layer=0; layer<2; layer++){
      c.fillStyle = p.hill[layer];
      const base = horizon + layer*6;
      const amp  = 10 - layer*3;
      const freq = 0.05 + layer*0.02;
      for(let x=0; x<W; x++){
        const y = Math.round(base - amp*Math.sin(x*freq + layer*2) - amp*0.4*Math.sin(x*freq*2.3));
        c.fillRect(x, y, 1, H-y);
      }
    }

    /* Sol au premier plan */
    c.fillStyle = p.ground;
    c.fillRect(0, Math.round(H*0.80), W, H);

    /* Végétation : silhouettes simples selon l'habitat */
    const treeCount = 7;
    for(let i=0;i<treeCount;i++){
      const x = Math.round(6 + i*(W-12)/(treeCount-1) + (i%2?3:-3));
      const y = horizon - 2 + (i%3);
      drawPlant(c, p, x, y, 1 + (i%2)*0.35);
    }
    for(let i=0;i<5;i++){
      const x = Math.round(10 + i*(W-20)/4 + (i%2?5:-5));
      drawPlant(c, p, x, Math.round(H*0.80)+2, 1.5);
    }

    /* Touffes d'herbe et fleurs sur le sol */
    for(let i=0;i<26;i++){
      const x = Math.round(Math.random()*W);
      const y = Math.round(H*0.80 + 2 + Math.random()*(H*0.18));
      c.fillStyle = p.deco[i % p.deco.length];
      if(i%3===0){ c.fillRect(x, y, 2, 2); }
      else { c.fillStyle = p.tree; c.fillRect(x, y, 1, 3); c.fillRect(x-1, y+1, 1, 2); c.fillRect(x+1, y+1, 1, 2); }
    }
    scenery = off;
  }

  function drawPlant(c, p, x, y, s){
    const h = Math.round(10*s), w = Math.round(9*s);
    if(p.kind === "pine"){
      c.fillStyle = p.trunk; c.fillRect(x-1, y-3, 2, 4);
      c.fillStyle = p.tree;
      for(let k=0;k<3;k++){
        const ww = Math.round(w - k*2.5), hh = Math.round(3*s);
        c.fillRect(x - ww/2, y - 3 - hh*(k+1), ww, hh);
      }
    } else if(p.kind === "cactus"){
      c.fillStyle = p.tree;
      c.fillRect(x-1, y-h, 3, h);
      c.fillRect(x-4, y-h+3, 3, 2); c.fillRect(x-4, y-h+3, 2, 5);
      c.fillRect(x+2, y-h+5, 3, 2); c.fillRect(x+3, y-h+1, 2, 6);
    } else if(p.kind === "palm"){
      c.fillStyle = p.trunk; c.fillRect(x-1, y-h, 2, h);
      c.fillStyle = p.tree;
      c.fillRect(x-6, y-h-1, 5, 2); c.fillRect(x+1, y-h-1, 5, 2);
      c.fillRect(x-4, y-h-3, 3, 2); c.fillRect(x+1, y-h-3, 3, 2);
    } else if(p.kind === "acacia"){
      c.fillStyle = p.trunk; c.fillRect(x-1, y-h, 2, h);
      c.fillStyle = p.tree;  c.fillRect(x-w/2, y-h-3, w, 3);
    } else if(p.kind === "rock" || p.kind === "ice"){
      c.fillStyle = p.tree;
      c.fillRect(x-3, y-5, 6, 5); c.fillRect(x-2, y-7, 4, 2);
    } else if(p.kind === "reed"){
      c.fillStyle = p.tree;
      for(let k=-2;k<=2;k++) c.fillRect(x+k*2, y-6-Math.abs(k), 1, 6);
    } else if(p.kind === "crystal"){
      c.fillStyle = p.tree;
      c.fillRect(x-2, y-8, 4, 8); c.fillRect(x-1, y-11, 2, 3);
      c.fillStyle = p.deco[0]; c.fillRect(x-1, y-9, 1, 5);
    } else if(p.kind === "cloudtree"){
      c.fillStyle = p.trunk; c.fillRect(x-1, y-6, 2, 6);
      c.fillStyle = p.tree;  c.fillRect(x-4, y-11, 8, 4); c.fillRect(x-3, y-13, 6, 2);
    } else {                                   /* arbre feuillu par défaut */
      c.fillStyle = p.trunk; c.fillRect(x-1, y-5, 2, 5);
      c.fillStyle = p.tree;
      c.fillRect(x-w/2, y-11, w, 6); c.fillRect(x-w/2+1, y-13, w-2, 2);
    }
  }

  /* --- Éléments animés --- */
  const clouds = [], motes = [], flyers = [];
  function seedAmbient(){
    clouds.length = 0; motes.length = 0; flyers.length = 0;
    const q = qLevel();
    for(let i=0;i<3+q;i++) clouds.push({x:Math.random()*W, y:6+Math.random()*22, s:0.05+Math.random()*0.06, w:12+Math.random()*10});
    const moteN = q===0 ? 6 : q===1 ? 14 : 22;
    for(let i=0;i<moteN;i++) motes.push({x:Math.random()*W, y:Math.random()*H, ph:Math.random()*6.28, sp:0.1+Math.random()*0.2});
    const flyN = q===0 ? 1 : q===1 ? 2 : 3;
    for(let i=0;i<flyN;i++) flyers.push({x:Math.random()*W, y:20+Math.random()*(H*0.5), ph:Math.random()*6.28, sp:0.15+Math.random()*0.2, up:Math.random()<0.5});
  }

  let t = 0, last = 0;
  function frame(now){
    requestAnimationFrame(frame);
    if(document.hidden) return;
    if(now - last < 33) return;                 // ~30 FPS suffit pour l'ambiance
    last = now; t += 1;

    if(!cv.width) { resize(); return; }
    if(!scenery) buildScenery();

    ctx.clearRect(0,0,W,H);

    /* Nuages (derrière les collines) */
    const night = (typeof AMB !== "undefined" && AMB.phase === "Nuit");
    ctx.fillStyle = night ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.62)";
    clouds.forEach(cl=>{
      cl.x += cl.s; if(cl.x > W+cl.w) cl.x = -cl.w;
      ctx.fillRect(cl.x, cl.y, cl.w, 3);
      ctx.fillRect(cl.x+3, cl.y-2, cl.w-6, 2);
    });

    /* Étoiles la nuit */
    if(night){
      ctx.fillStyle = "rgba(255,255,255,.85)";
      for(let i=0;i<14;i++){
        const sx = (i*37) % W, sy = (i*17) % Math.round(H*0.45);
        if((t + i*9) % 120 < 90) ctx.fillRect(sx, sy, 1, 1);
      }
    }

    /* Couches fixes pré-rendues */
    ctx.drawImage(scenery, 0, 0);

    /* Herbe qui ondule au premier plan */
    const raw = PAL[(typeof AMB!=="undefined" && AMB.habitat) || "prairie"] || PAL.prairie;
    const tf = (typeof worldTint === "function") ? worldTint : (c=>c);
    const p = {tree: tf(raw.tree), deco: raw.deco.map(tf)};
    const windy = (typeof AMB !== "undefined" && (AMB.weather === "vent" || AMB.weather === "orage"));
    ctx.fillStyle = p.tree;
    const sway = Math.sin(t*0.05) * (windy ? 2 : 0.8);
    for(let i=0;i<18;i++){
      const gx = Math.round((i*7 + 3) % W);
      const gy = Math.round(H - 4 - (i%3));
      ctx.fillRect(gx + Math.round(sway*((i%3)+1)/3), gy-3, 1, 3);
    }

    /* Particules ambiantes : pollen le jour, lucioles la nuit */
    motes.forEach(m=>{
      m.ph += 0.02; m.y -= m.sp*0.35; m.x += Math.sin(m.ph)*0.25;
      if(m.y < -2){ m.y = H+2; m.x = Math.random()*W; }
      if(night){
        const blink = (Math.sin(m.ph*1.7)+1)/2;
        ctx.fillStyle = "rgba(255,238,140,"+(0.25+blink*0.65).toFixed(2)+")";
        ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
        if(blink > 0.85) ctx.fillRect(Math.round(m.x), Math.round(m.y)-1, 1, 1);
      } else {
        ctx.fillStyle = "rgba(255,255,255,.45)";
        ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
      }
    });

    /* Papillons le jour, chauves-souris/oiseaux qui traversent */
    if(!night){
      flyers.forEach(f=>{
        f.ph += 0.12;
        f.x += f.up ? f.sp : -f.sp;
        f.y += Math.sin(f.ph)*0.35;
        if(f.x > W+3){ f.x = -3; f.y = 20+Math.random()*(H*0.5); }
        if(f.x < -3){ f.x = W+3; f.y = 20+Math.random()*(H*0.5); }
        const open = Math.sin(f.ph) > 0;
        ctx.fillStyle = p.deco[0];
        ctx.fillRect(Math.round(f.x), Math.round(f.y), 1, 1);
        if(open){ ctx.fillRect(Math.round(f.x)-1, Math.round(f.y)-1, 1, 1); ctx.fillRect(Math.round(f.x)+1, Math.round(f.y)-1, 1, 1); }
        else    { ctx.fillRect(Math.round(f.x)-1, Math.round(f.y), 1, 1);   ctx.fillRect(Math.round(f.x)+1, Math.round(f.y), 1, 1); }
      });
    }

    /* Rayons de lumière discrets en journée */
    if(!night && qLevel() === 2){
      ctx.fillStyle = "rgba(255,250,200,.05)";
      for(let i=0;i<3;i++){
        const rx = Math.round(((t*0.08) + i*40) % (W+40)) - 20;
        ctx.fillRect(rx, 0, 6, Math.round(H*0.6));
      }
    }
  }

  window.addEventListener("resize", ()=>{ resize(); });
  window.addEventListener("habitatchange", ()=>{ scenery = null; seedAmbient(); });
  resize(); seedAmbient(); requestAnimationFrame(frame);
})();
