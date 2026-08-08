/* ============================================================
   EFFETS — Bloc 8/25 (aura des raretés, animations avancées)
            Bloc 6/25 (retours visuels de l'interface)
   ============================================================ */
(function(){
  const stageEl = document.getElementById("stage");
  const wrap = document.getElementById("petWrap");
  if(!stageEl || !wrap) return;

  /* --- Aura derrière l'animal, colorée selon sa rareté --- */
  const aura = document.createElement("div");
  aura.id = "petAura";
  wrap.insertBefore(aura, wrap.firstChild);

  function refreshAura(){
    if(typeof S === "undefined" || typeof currentPet !== "function") return;
    let p, r;
    try { p = currentPet(); r = p && RARITIES[p.rar]; } catch(e){ return; }
    if(!r){ aura.style.display = "none"; return; }
    /* Seules les raretés élevées brillent : garde l'effet lisible et rare. */
    const strong = ["epique","legendaire","mythique","divin","cosmique","secret"];
    const key = String(p.rar).toLowerCase();
    const on = strong.some(s=>key.indexOf(s) >= 0);
    aura.style.display = on ? "block" : "none";
    if(on){ aura.style.background = "radial-gradient(circle, "+r.col+"66 0%, transparent 68%)"; }
  }
  setInterval(refreshAura, 700);

  /* --- Confettis : déclenchés sur les moments forts --- */
  window.confetti = function(n){
    const host = document.getElementById("fx") || stageEl;
    const r = stageEl.getBoundingClientRect();
    const cols = ["#FF8FB1","#FFE066","#7DD3C0","#B47BFF","#FFC94A","#FF7043"];
    const count = Math.min(n || 26, 40);
    for(let i=0;i<count;i++){
      const d = document.createElement("i");
      d.className = "confetti";
      d.style.left = (r.width*0.5 + (Math.random()*120-60)) + "px";
      d.style.top  = (r.height*0.42) + "px";
      d.style.background = cols[i % cols.length];
      d.style.setProperty("--cx", (Math.random()*220-110).toFixed(0)+"px");
      d.style.setProperty("--cy", (-60-Math.random()*130).toFixed(0)+"px");
      d.style.setProperty("--cr", (Math.random()*720-360).toFixed(0)+"deg");
      d.style.animationDelay = (i*0.012)+"s";
      host.appendChild(d);
      setTimeout(()=>d.remove(), 1500);
    }
  };

  /* --- Petites animations de vie : bâillement, clin d'œil, étirement --- */
  const MOODS = ["blink","yawn","dance","jump"];
  setInterval(()=>{
    if(document.hidden) return;
    if(!wrap || wrap.classList.contains("sleep")) return;
    if(Math.random() < 0.35 && typeof setMood === "function"){
      const m = MOODS[Math.floor(Math.random()*MOODS.length)];
      try { setMood(m, 900); } catch(e){}
    }
  }, 6000);

  /* --- Bloc 6 : chaque bouton réagit au toucher --- */
  document.addEventListener("pointerdown", e=>{
    const b = e.target.closest("button");
    if(!b) return;
    b.classList.remove("pressPop"); void b.offsetWidth; b.classList.add("pressPop");
    setTimeout(()=>b.classList.remove("pressPop"), 220);
  }, {passive:true});

  refreshAura();
})();

/* ============================================================
   APPARITION SPECTACULAIRE — Bloc 18/25
   Écran de célébration lors de la première obtention d'un animal
   de rareté élevée. Purement visuel : ne modifie ni l'économie ni
   la logique de découverte, s'accroche simplement à discover().
   ============================================================ */
(function(){
  const stageEl = document.getElementById("stage");
  if(!stageEl || typeof discover !== "function") return;

  const burst = document.createElement("div");
  burst.id = "rareBurst";
  burst.innerHTML = '<div class="rbRays"></div><div class="rbLabel"></div>';
  stageEl.appendChild(burst);

  function celebrate(id){
    let p = null, r = null;
    try {
      p = (typeof petById === "function" && petById(id)) ||
          (typeof PREMIUM !== "undefined" && PREMIUM.find(x=>x.id===id));
      r = p && RARITIES[p.rar];
    } catch(e){ return; }
    if(!r) return;
    const key = String(p.rar).toLowerCase();
    const strong = ["rare","epique","legendaire","mythique","divin","cosmique","secret"];
    if(!strong.some(s=>key.indexOf(s) >= 0)) return;

    const lbl = burst.querySelector(".rbLabel");
    lbl.textContent = r.name.toUpperCase();
    lbl.style.color = r.col;
    burst.style.setProperty("--rb-col", r.col);
    burst.classList.remove("on"); void burst.offsetWidth; burst.classList.add("on");
    setTimeout(()=>burst.classList.remove("on"), 2000);
    if(typeof confetti === "function") confetti(34);
  }

  /* On enveloppe discover() sans le réécrire : le comportement d'origine
     est appelé tel quel, on ajoute seulement la célébration par-dessus. */
  const originalDiscover = discover;
  window.discover = discover = function(id){
    const first = originalDiscover(id);
    if(first) celebrate(id);
    return first;
  };
})();
