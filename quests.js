/* ============================================================
   QUÊTES HEBDOMADAIRES — Bloc 4/25
   Module additif : réutilise #listQuests et le pattern makeRow()
   déjà existants pour les quêtes quotidiennes, sans les toucher.
   Les compteurs hebdo (S.wqstat) sont alimentés par bump() (1 seule
   modification faite ci-dessus, en parallèle du compteur quotidien).
   ============================================================ */
(function(){
  const WEEK_QUEST_POOL = [
    {id:"wq_tap",  name:"[Hebdo] Taper {n} fois",            gen:()=>[1500,3000,6000][rnd(3)], stat:"taps",   gems:80},
    {id:"wq_buy",  name:"[Hebdo] Acheter {n} améliorations", gen:()=>[40,80,150][rnd(3)],       stat:"buys",   gems:100},
    {id:"wq_earn", name:"[Hebdo] Gagner {n} pièces",         gen:()=>null,                       stat:"earned", gems:120, scale:true},
    {id:"wq_crit", name:"[Hebdo] Faire {n} critiques",       gen:()=>[40,80,150][rnd(3)],        stat:"crits",  gems:100}
  ];

  function weekKey(){
    const d = new Date();
    const onejan = new Date(d.getFullYear(),0,1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay()+1)/7);
    return d.getFullYear()+"-W"+week;
  }

  function rollWeekQuests(){
    S.weekDate = weekKey(); S.wqstat = {}; S.weekQuests = [];
    const pool = WEEK_QUEST_POOL.slice();
    for(let i=0;i<3 && pool.length;i++){
      const q = pool.splice(rnd(pool.length),1)[0];
      const target = q.scale ? Math.max(20000, Math.floor(perSec(false)*600*7) || 100000) : q.gen();
      S.weekQuests.push({id:q.id, name:q.name, stat:q.stat, gems:q.gems, target, done:false});
    }
  }

  window.claimWeekQuest = function(i){
    const q = S.weekQuests[i];
    if(!q || q.done || (S.wqstat[q.stat]||0) < q.target) return;
    q.done = true; S.gems += q.gems; sfx("good"); vibrate(30);
    toast("+"+q.gems+" gemmes (hebdo)"); save(); renderHUD();
    if(typeof gainPlayerXP === "function") gainPlayerXP(15);
  };

  function refreshWeekQuests(){
    if(typeof S === "undefined" || typeof R === "undefined" || typeof makeRow !== "function") return;
    const box = document.getElementById("listQuests");
    if(!box) return;
    if(S.weekDate !== weekKey()) rollWeekQuests();

    const needBuild = !R.weekQuests || R.weekQuests.some(r=>!box.contains(r));
    const key = S.weekDate + "|" + S.weekQuests.map(q=>q.id+q.target).join(",");
    if(needBuild || box._weekKey !== key){
      box._weekKey = key;
      (R.weekQuests||[]).forEach(r=>{ if(box.contains(r)) box.removeChild(r); });
      R.weekQuests = S.weekQuests.map((q,i)=>{
        const r = makeRow({emoji:"🗓️", btnClass:"mintBtn", onClick:()=>claimWeekQuest(i)});
        r._name.textContent = q.name.replace("{n}", fmt(q.target));
        box.appendChild(r); return r;
      });
    }
    S.weekQuests.forEach((q,i)=>{
      const r = R.weekQuests[i]; if(!r) return;
      const cur = Math.min(q.target, S.wqstat[q.stat]||0);
      setTxt(r._sub, q.done ? "Terminée" : fmt(cur)+" / "+fmt(q.target));
      if(q.done){ setTxt(r._btn,"✔"); r._btn.className="rBtn owned"; r._btn.style.fontSize="16px"; setDis(r._btn,true); }
      else { setTxt(r._btn,"💎<br>"+q.gems); r._btn.className="rBtn mintBtn"; setDis(r._btn, cur < q.target); }
    });
  }

  setInterval(refreshWeekQuests, 500);
})();
