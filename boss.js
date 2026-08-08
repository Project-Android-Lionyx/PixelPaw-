/* ============================================================
   BOSS & DÉFIS — Bloc 19/25
   Un intrus apparaît régulièrement sur la scène. Le joueur a un temps
   limité pour le repousser en tapant. Les points de vie sont calés sur
   la puissance de frappe réelle, donc le défi reste tenu à tous les
   stades sans jamais devenir infaisable. Purement additif : n'altère
   ni la boucle de jeu, ni l'économie existante.
   ============================================================ */
(function(){
  const stageEl = document.getElementById("stage");
  if(!stageEl) return;

  const BOSSES = [
    {id:"corbeau",  name:"Corbeau Voleur",   emoji:"🐦‍⬛", hp:34, time:25},
    {id:"renard",   name:"Renard Rusé",      emoji:"🦊",   hp:42, time:25},
    {id:"blaireau", name:"Blaireau Grognon", emoji:"🦡",   hp:52, time:28},
    {id:"sanglier", name:"Sanglier Furieux", emoji:"🐗",   hp:64, time:30},
    {id:"ours",     name:"Ours Colossal",    emoji:"🐻",   hp:80, time:32}
  ];

  const COOLDOWN = 8*60*1000;                  // un boss toutes les 8 minutes
  let fight = null;

  /* --- Améliorations de combat : la contrepartie de la montée en difficulté --- */
  const CUP = {
    griffes: {name:"Griffes Aiguisées", ico:"🗡️", desc:"+20% dégâts par niveau",      max:25, cost:l=>Math.floor(2500*Math.pow(1.65,l))},
    fureur:  {name:"Fureur",            ico:"🔥", desc:"Combo +1% dégâts par niveau", max:20, cost:l=>Math.floor(4000*Math.pow(1.7,l))},
    precis:  {name:"Œil Précis",        ico:"🎯", desc:"+3% critique en combat",      max:15, cost:l=>Math.floor(6000*Math.pow(1.75,l))},
    chrono:  {name:"Souffle Long",      ico:"⏱️", desc:"+2 s de combat par niveau",   max:10, cost:l=>Math.floor(9000*Math.pow(1.9,l))}
  };
  function cLvl(k){ return (S.cup && S.cup[k]) || 0; }
  function dmgMult(){ return 1 + 0.20*cLvl("griffes"); }
  function comboStep(){ return 0.02 + 0.01*cLvl("fureur"); }
  function bossCrit(){ return Math.min(0.85, (typeof critChance==="function"?critChance():0) + 0.03*cLvl("precis")); }
  function bonusTime(){ return 2*cLvl("chrono"); }

  /* La difficulté monte à chaque victoire, mais reste bornée pour que
     les améliorations puissent toujours suivre. */
  function difficulty(){ return 1 + Math.min(40, S.bossWins||0) * 0.09; }

  function pickBoss(){
    const lvl = (S.playerLvl||1) + (S.world||1)*2 + Math.floor((S.bossWins||0)/3);
    const max = Math.min(BOSSES.length, 1 + Math.floor(lvl/3));
    return BOSSES[Math.floor(Math.random()*max)];
  }

  function bossReady(){ return Date.now() >= (S.bossNext||0); }

  /* --- Pastille d'alerte sur la scène --- */
  const chip = document.createElement("div");
  chip.className = "bossChip";
  chip.style.display = "none";
  chip.addEventListener("click", ()=>{
    if(typeof sfx === "function") sfx("tab");
    if(bossReady()) startFight(); else openCombat();
  });
  stageEl.appendChild(chip);

  let pending = null;
  setInterval(()=>{
    if(typeof S === "undefined") return;
    if(fight){ chip.style.display = "none"; return; }
    chip.style.display = "flex";
    if(bossReady()){
      if(!pending) pending = pickBoss();
      chip.classList.add("alert");
      chip.innerHTML = '<span class="bcIco">'+pending.emoji+'</span><span class="bcTxt">Intrus !</span>';
    } else {
      chip.classList.remove("alert");
      const s = Math.ceil((S.bossNext - Date.now())/1000);
      const m = Math.floor(s/60);
      chip.innerHTML = '<span class="bcIco">⚔️</span><span class="bcTxt">'+(m>0 ? m+"m" : s+"s")+'</span>';
    }
  }, 1000);

  /* --- Atelier de combat : dépenser ses pièces pour frapper plus fort --- */
  function openCombat(){
    if(typeof openModal !== "function") return;
    S.cup = S.cup || {};
    let html = '<h2>Atelier de Combat</h2>' +
      '<div class="bossStat">Victoires : '+(S.bossWins||0)+
      ' · Difficulté actuelle ×'+difficulty().toFixed(2)+'</div>' +
      '<div class="cupSum">Dégâts ×'+dmgMult().toFixed(2)+
      ' · Combo +'+(comboStep()*100).toFixed(0)+'%/coup'+
      ' · Crit '+Math.round(bossCrit()*100)+'%'+
      ' · +'+bonusTime()+' s</div>';

    Object.keys(CUP).forEach(k=>{
      const u = CUP[k], lvl = cLvl(k), maxed = lvl >= u.max;
      const cost = u.cost(lvl);
      const can = !maxed && S.coins >= cost;
      html += '<div class="talentRow">' +
        '<div class="talentIco">'+u.ico+'</div>' +
        '<div class="talentTxt"><b>'+u.name+'</b><span>'+u.desc+'</span></div>' +
        '<div class="talentLvl">'+lvl+'</div>' +
        '<button class="talentBtn cupBtn" data-cup="'+k+'"'+(can?'':' disabled')+'>' +
          (maxed ? "MAX" : '<span class="cupCost">'+fmt(cost)+'</span>') +
        '</button>' +
      '</div>';
    });

    html += '<button class="mBtn" id="cupClose">Fermer</button>';
    openModal(html);
    document.querySelectorAll("[data-cup]").forEach(b=>{
      b.onclick = ()=>{
        const k = b.dataset.cup, u = CUP[k], lvl = cLvl(k);
        if(lvl >= u.max) return;
        const cost = u.cost(lvl);
        if(S.coins < cost) return;
        S.coins -= cost; S.cup[k] = lvl + 1;
        if(typeof sfx === "function") sfx("buy"); vibrate(10);
        save(); renderHUD(); openCombat();
      };
    });
    const c = document.getElementById("cupClose"); if(c) c.onclick = closeModal;
  }
  window.openCombat = openCombat;

  /* --- Combat --- */
  function startFight(){
    if(fight || typeof openModal !== "function") return;
    const b = pending || pickBoss();
    const tap = (typeof perTap === "function" ? perTap() : 1) || 1;
    const maxHp = Math.max(1, Math.round(tap * b.hp * difficulty()));
    const secs = b.time + bonusTime();
    fight = {b, hp:maxHp, maxHp, until:Date.now() + secs*1000, hits:0, combo:0, lastHit:0};

    openModal(
      '<h2>'+b.name+'</h2>' +
      '<div class="bossRank">Palier '+((S.bossWins||0)+1)+' · ×'+difficulty().toFixed(2)+' vie</div>' +
      '<div class="bossArena" id="bossHit">' +
        '<div class="bossCombo" id="bossCombo"></div>' +
        '<div class="bossSprite" id="bossSprite">'+b.emoji+'</div>' +
      '</div>' +
      '<div class="bossHpWrap"><i id="bossHp" style="width:100%"></i><span id="bossHpTxt"></span></div>' +
      '<div class="bossTimer">⏱ <b id="bossTime">'+secs+'</b> s</div>' +
      '<div class="bossHint">Enchaîne les coups pour monter le combo !</div>'
    );

    const arena = document.getElementById("bossHit");
    if(arena){
      arena.addEventListener("pointerdown", hit, {passive:true});
    }
    tickFight();
  }

  function hit(){
    if(!fight) return;
    const now = Date.now();
    /* Combo : monte tant qu'on enchaîne, retombe si on marque une pause */
    fight.combo = (now - fight.lastHit < 900) ? fight.combo + 1 : 0;
    fight.lastHit = now;

    const tap = (typeof perTap === "function" ? perTap() : 1) || 1;
    const comboMult = 1 + fight.combo * comboStep();
    let dmg = tap * dmgMult() * comboMult;
    let crit = false;
    if(Math.random() < bossCrit()){ dmg *= 3; crit = true; }
    dmg = Math.round(dmg);

    fight.hp = Math.max(0, fight.hp - dmg);
    fight.hits++;
    if(typeof sfx === "function") sfx("click");
    vibrate(crit ? 22 : 8);

    const sp = document.getElementById("bossSprite");
    if(sp){ sp.classList.remove("bossHurt"); void sp.offsetWidth; sp.classList.add("bossHurt"); }

    const cb = document.getElementById("bossCombo");
    if(cb){
      if(fight.combo >= 3){
        cb.textContent = "×"+fight.combo+"  ("+comboMult.toFixed(2)+"×)";
        cb.classList.add("on");
        cb.classList.toggle("hot", fight.combo >= 15);
        cb.classList.remove("pulse"); void cb.offsetWidth; cb.classList.add("pulse");
      } else { cb.classList.remove("on","hot"); }
    }
    const arena = document.getElementById("bossHit");
    if(arena && crit){ arena.classList.remove("shake"); void arena.offsetWidth; arena.classList.add("shake"); }

    popDmg(dmg, crit);
    if(fight.hp <= 0) endFight(true);
  }

  function popDmg(v, crit){
    const arena = document.getElementById("bossHit");
    if(!arena) return;
    const d = document.createElement("i");
    d.className = "bossDmg" + (crit ? " crit" : "");
    d.textContent = (typeof fmt === "function" ? fmt(v) : v);
    d.style.left = (30 + Math.random()*40) + "%";
    arena.appendChild(d);
    setTimeout(()=>d.remove(), 700);
  }

  function tickFight(){
    if(!fight) return;
    const left = Math.max(0, Math.ceil((fight.until - Date.now())/1000));
    const bar = document.getElementById("bossHp");
    const txt = document.getElementById("bossHpTxt");
    const tm  = document.getElementById("bossTime");
    if(bar) bar.style.width = ((fight.hp/fight.maxHp)*100).toFixed(1)+"%";
    if(txt && typeof fmt === "function") txt.textContent = fmt(fight.hp)+" / "+fmt(fight.maxHp);
    if(tm) tm.textContent = left;
    if(left <= 0){ endFight(false); return; }
    if(fight) setTimeout(tickFight, 200);
  }

  function endFight(won){
    if(!fight) return;
    const b = fight.b, hits = fight.hits;
    fight = null; pending = null;
    S.bossNext = Date.now() + COOLDOWN;

    if(won){
      const base = (typeof perSec === "function" ? perSec(false) : 0) || 10;
      const coins = Math.floor(base * 150 * (1 + (S.world||1)*0.15));
      const gems  = 2 + Math.floor(Math.random()*4);
      const fc    = Math.random() < 0.5 ? 1 : 0;
      S.coins += coins; S.totalEarned += coins; S.lifetimeEarned += coins;
      S.gems += gems;
      if(fc) S.fc = (S.fc||0) + fc;
      S.bossWins = (S.bossWins||0) + 1;
      S.bossBest = Math.max(S.bossBest||0, hits);
      if(typeof gainPlayerXP === "function") gainPlayerXP(60);
      if(typeof confetti === "function") confetti(34);
      if(typeof sfx === "function") sfx("big");
      vibrate(90);
      openModal(
        '<h2>Victoire !</h2>' +
        '<div class="bossWin">'+b.emoji+'</div>' +
        '<p>'+b.name+' repoussé en '+hits+' coups.</p>' +
        '<div class="bossLoot">+'+fmt(coins)+' pièces<br>+'+gems+' 💎'+(fc?'<br>+'+fc+' 🔩':'')+'</div>' +
        '<div class="bossStat">Victoires : '+S.bossWins+' · Prochain palier ×'+difficulty().toFixed(2)+'</div>' +
        '<button class="mBtn ghost" id="bkUp">⚔️ Atelier de Combat</button>' +
        '<button class="mBtn" id="bkOk">Super !</button>'
      );
    } else {
      if(typeof sfx === "function") sfx("tab");
      openModal(
        '<h2>Il s\'est enfui…</h2>' +
        '<p>'+b.name+' était trop coriace cette fois.</p>' +
        '<div class="bossStat">Un nouvel intrus arrivera dans 8 minutes.</div>' +
        '<button class="mBtn ghost" id="bkUp">⚔️ Renforce-toi d\'ici là</button>' +
        '<button class="mBtn" id="bkOk">Fermer</button>'
      );
    }
    const up = document.getElementById("bkUp");
    if(up) up.onclick = openCombat;
    const ok = document.getElementById("bkOk");
    if(ok) ok.onclick = closeModal;
    save(); renderHUD();
  }

  /* Le premier boss arrive peu après la première partie, pas immédiatement */
  if(!S.bossNext) { S.bossNext = Date.now() + 90*1000; }
})();
