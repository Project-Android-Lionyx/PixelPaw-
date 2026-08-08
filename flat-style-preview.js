/* ============================================================
   APERÇU — STYLE PLAT/LISSE, LES 15 ANIMAUX (essai)
   Prototype indépendant : dessine chaque animal en formes lisses
   (cercles, courbes) plutôt qu'en grille de pixels, corps entier.
   N'affecte AUCUN sprite existant — accessible uniquement depuis
   un écran d'aperçu séparé, pour valider la direction avant de
   l'appliquer au jeu.
   ============================================================ */
(function(){
  const INK = "#2B2333";

  /* --- Base commune : mammifère assis, très paramétrable --- */
  function drawMammal(ctx, W, H, o){
    ctx.clearRect(0,0,W,H);
    const cx = W*0.5;

    ctx.fillStyle = "rgba(0,0,0,.15)";
    ctx.beginPath(); ctx.ellipse(cx, H*0.87, W*0.23, H*0.035, 0, 0, Math.PI*2); ctx.fill();

    /* Queue (derrière le corps) */
    if(o.tail === "fluffy"){
      ctx.fillStyle = o.fur;
      ctx.beginPath(); ctx.arc(cx+W*0.20, H*0.66, W*0.09, 0, Math.PI*2); ctx.fill();
    } else if(o.tail === "curl"){
      ctx.strokeStyle = o.fur; ctx.lineWidth = W*0.045; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(cx+W*0.19, H*0.60, W*0.06, 0.2, Math.PI*1.7); ctx.stroke();
    }

    /* Corps */
    ctx.fillStyle = o.fur;
    ctx.beginPath(); ctx.ellipse(cx, H*0.71, W*(o.bodyW||0.23), H*(o.bodyH||0.15), 0, 0, Math.PI*2); ctx.fill();

    /* Pattes avant */
    ctx.fillStyle = o.furDark || o.fur;
    ctx.beginPath(); ctx.ellipse(cx-W*0.095, H*0.81, W*0.042, H*0.032, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+W*0.095, H*0.81, W*0.042, H*0.032, 0, 0, Math.PI*2); ctx.fill();

    /* Ventre / poitrail clair */
    if(o.belly){
      ctx.fillStyle = o.belly;
      ctx.beginPath(); ctx.ellipse(cx, H*0.745, W*0.125, H*0.085, 0, 0, Math.PI*2); ctx.fill();
    }

    /* Marquage additionnel (selle, taches...) sous les oreilles, avant la tête */
    if(o.bodyMark) o.bodyMark(ctx, cx, W, H);

    /* Oreilles */
    drawEars(ctx, cx, W, H, o);

    /* Tête */
    ctx.fillStyle = o.fur;
    ctx.beginPath(); ctx.ellipse(cx, H*0.42, W*(o.headW||0.20), H*(o.headH||0.16), 0, 0, Math.PI*2); ctx.fill();

    /* Marquages sur la tête (masque panda, points siamois...) */
    if(o.headMark) o.headMark(ctx, cx, W, H);

    /* Museau clair */
    const snoutCol = o.snout || o.belly || "#FFFFFF";
    ctx.fillStyle = snoutCol;
    ctx.beginPath(); ctx.ellipse(cx, H*0.47, W*(o.snoutW||0.115), H*(o.snoutH||0.105), 0, 0, Math.PI*2); ctx.fill();

    /* Yeux */
    const eyeY = H*0.395, eyeDX = W*0.075;
    ctx.fillStyle = o.eyeColor || INK;
    ctx.beginPath(); ctx.arc(cx-eyeDX, eyeY, W*(o.eyeR||0.018), 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+eyeDX, eyeY, W*(o.eyeR||0.018), 0, Math.PI*2); ctx.fill();
    if(o.eyeColor){
      ctx.fillStyle = INK;
      ctx.beginPath(); ctx.arc(cx-eyeDX, eyeY, W*0.007, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+eyeDX, eyeY, W*0.007, 0, Math.PI*2); ctx.fill();
    }

    /* Nez + bouche */
    ctx.fillStyle = o.noseColor || INK;
    ctx.beginPath();
    if(o.noseWide) ctx.ellipse(cx, H*0.455, W*0.02, H*0.014, 0, 0, Math.PI*2);
    else ctx.arc(cx, H*0.455, W*0.012, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = W*0.008; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx-W*0.02, H*0.47); ctx.quadraticCurveTo(cx, H*(o.smile?0.50:0.478), cx+W*0.02, H*0.47); ctx.stroke();

    /* Moustaches */
    if(o.whiskers !== false){
      ctx.strokeStyle = "rgba(60,50,40,.45)"; ctx.lineWidth = W*0.004;
      [-1,1].forEach(side=>{
        for(let i=0;i<3;i++){
          ctx.beginPath();
          ctx.moveTo(cx+side*W*0.085, H*(0.45+i*0.017));
          ctx.lineTo(cx+side*W*0.185, H*(0.43+i*0.019));
          ctx.stroke();
        }
      });
    }

    /* Joues roses */
    if(o.blush !== false){
      ctx.fillStyle = "rgba(255,150,170,.35)";
      ctx.beginPath(); ctx.arc(cx-W*0.13, H*0.455, W*0.028, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+W*0.13, H*0.455, W*0.028, 0, Math.PI*2); ctx.fill();
    }

    /* Accessoire (cornes, lunettes...) */
    if(o.extra) o.extra(ctx, cx, W, H);
  }

  function drawEars(ctx, cx, W, H, o){
    const s = o.earSize || 0.09, dx = o.earDX || 0.17, y = o.earY || 0.28;
    if(o.earStyle === "floppy"){
      ctx.fillStyle = o.earColor || o.fur;
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.ellipse(cx+side*dx*W, H*(y+0.08), W*s*0.7, H*s*1.5, side*0.25, 0, Math.PI*2);
        ctx.fill();
      });
      return;
    }
    if(o.earStyle === "pointy" || o.earStyle === "bat"){
      const wide = o.earStyle === "bat" ? 1.25 : 0.85;
      ctx.fillStyle = o.earColor || o.fur;
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.moveTo(cx+side*dx*W - W*s*wide*0.55, H*(y+0.11));
        ctx.lineTo(cx+side*dx*W + W*s*wide*0.55, H*(y+0.11));
        ctx.lineTo(cx+side*dx*W, H*(y-0.10));
        ctx.closePath(); ctx.fill();
      });
      ctx.fillStyle = o.earInner || "#FFC2CE";
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.moveTo(cx+side*dx*W - W*s*wide*0.32, H*(y+0.075));
        ctx.lineTo(cx+side*dx*W + W*s*wide*0.32, H*(y+0.075));
        ctx.lineTo(cx+side*dx*W, H*(y-0.045));
        ctx.closePath(); ctx.fill();
      });
      return;
    }
    if(o.earStyle === "tall"){                       /* lapin */
      ctx.fillStyle = o.earColor || o.fur;
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.ellipse(cx+side*dx*0.6*W, H*0.14, W*0.05, H*0.20, side*0.08, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.fillStyle = o.earInner || "#FFC2CE";
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.ellipse(cx+side*dx*0.6*W, H*0.15, W*0.026, H*0.14, side*0.08, 0, Math.PI*2);
        ctx.fill();
      });
      return;
    }
    if(o.earStyle === "tiny") return;                 /* sphynx : presque rien */
    /* rond (par défaut) */
    ctx.fillStyle = o.earColor || o.fur;
    ctx.beginPath(); ctx.arc(cx-dx*W, H*y, W*s, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+dx*W, H*y, W*s, 0, Math.PI*2); ctx.fill();
    if(o.earInner){
      ctx.fillStyle = o.earInner;
      ctx.beginPath(); ctx.arc(cx-dx*W, H*y, W*s*0.55, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+dx*W, H*y, W*s*0.55, 0, Math.PI*2); ctx.fill();
    }
    if(o.earTuft){                                     /* maine coon */
      ctx.strokeStyle = o.earColor; ctx.lineWidth = W*0.012; ctx.lineCap = "round";
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.moveTo(cx+side*dx*W, H*(y-s));
        ctx.lineTo(cx+side*dx*W+side*W*0.015, H*(y-s-0.045));
        ctx.stroke();
      });
    }
  }

  /* --- Oiseau (Perruche) --- */
  function drawBird(ctx, W, H){
    ctx.clearRect(0,0,W,H);
    const cx = W*0.5;
    ctx.fillStyle = "rgba(0,0,0,.15)";
    ctx.beginPath(); ctx.ellipse(cx, H*0.87, W*0.16, H*0.03, 0, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = "#7CC77A";
    ctx.beginPath(); ctx.ellipse(cx, H*0.62, W*0.19, H*0.22, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#5AAE6B";
    ctx.beginPath(); ctx.ellipse(cx+W*0.10, H*0.66, W*0.05, H*0.16, 0.3, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = "#FFE066";
    ctx.beginPath(); ctx.ellipse(cx, H*0.36, W*0.16, H*0.145, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#5AC0D8";
    ctx.beginPath(); ctx.ellipse(cx, H*0.32, W*0.15, H*0.08, 0, Math.PI*1.05, Math.PI*1.95); ctx.fill();

    ctx.fillStyle = INK;
    ctx.beginPath(); ctx.arc(cx-W*0.055, H*0.35, W*0.017, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.055, H*0.35, W*0.017, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = "#FF9E42";
    ctx.beginPath();
    ctx.moveTo(cx-W*0.03, H*0.40); ctx.lineTo(cx+W*0.03, H*0.40); ctx.lineTo(cx, H*0.44);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = "#FF9E42";
    ctx.beginPath(); ctx.ellipse(cx-W*0.06, H*0.82, W*0.02, H*0.03, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+W*0.06, H*0.82, W*0.02, H*0.03, 0, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = "rgba(255,150,170,.3)";
    ctx.beginPath(); ctx.arc(cx-W*0.11, H*0.39, W*0.025, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.11, H*0.39, W*0.025, 0, Math.PI*2); ctx.fill();
  }

  /* --- Dragon --- */
  function drawDragon(ctx, W, H){
    ctx.clearRect(0,0,W,H);
    const cx = W*0.5;
    ctx.fillStyle = "rgba(0,0,0,.15)";
    ctx.beginPath(); ctx.ellipse(cx, H*0.87, W*0.22, H*0.032, 0, 0, Math.PI*2); ctx.fill();

    /* Ailes */
    ctx.fillStyle = "#6E4FA0";
    [-1,1].forEach(side=>{
      ctx.beginPath();
      ctx.moveTo(cx+side*W*0.14, H*0.55);
      ctx.quadraticCurveTo(cx+side*W*0.38, H*0.40, cx+side*W*0.30, H*0.68);
      ctx.quadraticCurveTo(cx+side*W*0.22, H*0.66, cx+side*W*0.14, H*0.66);
      ctx.closePath(); ctx.fill();
    });

    /* Corps */
    ctx.fillStyle = "#5FBE72";
    ctx.beginPath(); ctx.ellipse(cx, H*0.71, W*0.20, H*0.145, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#F3E6A8";
    ctx.beginPath(); ctx.ellipse(cx, H*0.745, W*0.10, H*0.075, 0, 0, Math.PI*2); ctx.fill();

    /* Pattes */
    ctx.fillStyle = "#4CA45E";
    ctx.beginPath(); ctx.ellipse(cx-W*0.09, H*0.81, W*0.04, H*0.03, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+W*0.09, H*0.81, W*0.04, H*0.03, 0, 0, Math.PI*2); ctx.fill();

    /* Queue */
    ctx.strokeStyle = "#5FBE72"; ctx.lineWidth = W*0.05; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx+W*0.17, H*0.78); ctx.quadraticCurveTo(cx+W*0.30, H*0.80, cx+W*0.28, H*0.66); ctx.stroke();

    /* Tête */
    ctx.fillStyle = "#5FBE72";
    ctx.beginPath(); ctx.ellipse(cx, H*0.42, W*0.185, H*0.155, 0, 0, Math.PI*2); ctx.fill();

    /* Cornes */
    ctx.fillStyle = "#F3E6A8";
    [-1,1].forEach(side=>{
      ctx.beginPath();
      ctx.moveTo(cx+side*W*0.10, H*0.30);
      ctx.lineTo(cx+side*W*0.16, H*0.14);
      ctx.lineTo(cx+side*W*0.055, H*0.27);
      ctx.closePath(); ctx.fill();
    });

    /* Museau clair */
    ctx.fillStyle = "#F3E6A8";
    ctx.beginPath(); ctx.ellipse(cx, H*0.475, W*0.105, H*0.095, 0, 0, Math.PI*2); ctx.fill();

    /* Yeux */
    ctx.fillStyle = "#FFD24A";
    ctx.beginPath(); ctx.arc(cx-W*0.07, H*0.40, W*0.02, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.07, H*0.40, W*0.02, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = INK;
    ctx.beginPath(); ctx.arc(cx-W*0.07, H*0.40, W*0.008, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.07, H*0.40, W*0.008, 0, Math.PI*2); ctx.fill();

    /* Narines + sourire */
    ctx.fillStyle = INK;
    ctx.beginPath(); ctx.arc(cx-W*0.018, H*0.47, W*0.008, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+W*0.018, H*0.47, W*0.008, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = W*0.008; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx-W*0.03, H*0.50); ctx.quadraticCurveTo(cx, H*0.525, cx+W*0.03, H*0.50); ctx.stroke();
  }

  /* --- Réglages des 15 animaux --- */
  const ANIMALS15 = [
    {id:"cochon",  name:"Cochon",         kind:"mammal", fur:"#F6B3C5", furDark:"#E29AB0", belly:"#FCE0E8",
      earStyle:"floppy", earColor:"#F0A0B8", snoutW:0.10, snoutH:0.075, snout:"#F0A0B8", noseWide:true, whiskers:false},
    {id:"hamster", name:"Hamster",        kind:"mammal", fur:"#E3B98A", furDark:"#D1A374", belly:"#F8E4C8",
      earStyle:"round", earColor:"#E3B98A", earInner:"#FFC2CE", earSize:0.09},
    {id:"lapin",   name:"Lapin",          kind:"mammal", fur:"#F4F1EC", furDark:"#DAD4C8", belly:"#FFFFFF",
      earStyle:"tall", earColor:"#F4F1EC", earInner:"#FFC2CE", tail:"fluffy"},
    {id:"perruche",name:"Perruche",       kind:"bird"},
    {id:"chat",    name:"Chat Européen",  kind:"mammal", fur:"#B7B0C4", furDark:"#9992A8", belly:"#EDEAF2",
      earStyle:"pointy", earColor:"#B7B0C4", earInner:"#FFC2CE", tail:"curl"},
    {id:"corgi",   name:"Chien Corgi",    kind:"mammal", fur:"#E8B36A", furDark:"#D49A4C", belly:"#FBEFD8",
      earStyle:"pointy", earColor:"#E8B36A", earInner:"#F7C9A8", earSize:0.10, tail:"fluffy"},
    {id:"capybara",name:"Capybara",       kind:"mammal", fur:"#B08A5E", furDark:"#96744C", belly:"#D8C09A",
      earStyle:"round", earColor:"#96744C", earSize:0.05, earY:0.24, headW:0.23, headH:0.17,
      snoutW:0.15, snoutH:0.10, snout:"#C9AC7E", whiskers:true},
    {id:"panda",   name:"Panda",          kind:"mammal", fur:"#FAFAFA", furDark:"#2B2333", belly:"#FFFFFF",
      earStyle:"round", earColor:"#2B2333", earSize:0.085,
      headMark:(ctx,cx,W,H)=>{
        ctx.fillStyle="#2B2333";
        ctx.beginPath(); ctx.ellipse(cx-W*0.075,H*0.395,W*0.045,H*0.05,-0.2,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx+W*0.075,H*0.395,W*0.045,H*0.05,0.2,0,Math.PI*2); ctx.fill();
      }, eyeColor:null},
    {id:"dragon",  name:"Dragon Pixel",   kind:"dragon"},
    {id:"siamois", name:"Chat Siamois",   kind:"mammal", fur:"#F3E7D3", furDark:"#8A6A52", belly:"#FBF4E8",
      earStyle:"pointy", earColor:"#8A6A52", earInner:"#C99A82", eyeColor:"#5EC8E0",
      snout:"#F3E7D3", tail:"curl",
      headMark:(ctx,cx,W,H)=>{ ctx.fillStyle="#8A6A52"; ctx.beginPath(); ctx.ellipse(cx,H*0.47,W*0.12,H*0.03,0,0,Math.PI*2); ctx.fill(); }},
    {id:"mainecoon",name:"Chat Maine Coon",kind:"mammal", fur:"#C79A6B", furDark:"#A87B4E", belly:"#EBD9BE",
      earStyle:"pointy", earColor:"#C79A6B", earInner:"#FFC2CE", earTuft:true, headW:0.23, headH:0.185, bodyW:0.26, bodyH:0.17},
    {id:"sphynx",  name:"Chat Sphynx",    kind:"mammal", fur:"#D9B8A0", furDark:"#BE9880", belly:"#EAD3C0",
      earStyle:"bat", earColor:"#D9B8A0", earInner:"#C48F76", earSize:0.10, whiskers:false},
    {id:"shiba",   name:"Chien Shiba Inu",kind:"mammal", fur:"#E8A855", furDark:"#C98B3C", belly:"#FBEBD2",
      earStyle:"pointy", earColor:"#E8A855", earInner:"#F7CFA0", tail:"fluffy",
      snout:"#FBEBD2"},
    {id:"bouledogue",name:"Bouledogue Français",kind:"mammal", fur:"#C7BBAE", furDark:"#A89A8A", belly:"#E6DFD5",
      earStyle:"bat", earColor:"#C7BBAE", earInner:"#D8A0A8", earSize:0.115, snoutW:0.14, snoutH:0.11, noseWide:true},
    {id:"berger",  name:"Berger Allemand",kind:"mammal", fur:"#D8A85E", furDark:"#8A6238", belly:"#F3E0BE",
      earStyle:"pointy", earColor:"#8A6238", earInner:"#C99A70", earSize:0.095,
      headMark:(ctx,cx,W,H)=>{ ctx.fillStyle="#4A3320"; ctx.beginPath(); ctx.ellipse(cx,H*0.36,W*0.11,H*0.09,0,Math.PI,Math.PI*2); ctx.fill(); },
      bodyMark:(ctx,cx,W,H)=>{ ctx.fillStyle="#4A3320"; ctx.beginPath(); ctx.ellipse(cx,H*0.66,W*0.16,H*0.07,0,0,Math.PI*2); ctx.fill(); }}
  ];

  function drawAnimal(cv, a){
    const ctx = cv.getContext("2d");
    if(a.kind === "bird") drawBird(ctx, cv.width, cv.height);
    else if(a.kind === "dragon") drawDragon(ctx, cv.width, cv.height);
    else drawMammal(ctx, cv.width, cv.height, a);
  }

  window.openFlatPreview = function(){
    if(typeof openModal !== "function") return;
    let html = '<h2>Aperçu — style plat (15)</h2>' +
      '<div style="font-size:7.5px;color:var(--ink-soft);margin-bottom:8px">' +
      'Dessinés en code, aucune image externe. Corps entier.</div>' +
      '<div class="flatGrid">';
    ANIMALS15.forEach(a=>{
      html += '<div class="flatCell"><canvas class="flatCv" data-id="'+a.id+'" width="200" height="200"></canvas>' +
              '<span>'+a.name+'</span></div>';
    });
    html += '</div><button class="mBtn" id="flatPreviewClose">Fermer</button>';
    openModal(html);
    document.querySelectorAll(".flatCv").forEach(cv=>{
      const a = ANIMALS15.find(x=>x.id === cv.dataset.id);
      if(a) drawAnimal(cv, a);
    });
    const c = document.getElementById("flatPreviewClose");
    if(c) c.onclick = closeModal;
  };

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
        btn.textContent = "🎨 Aperçu style plat — les 15 (essai)";
        anchor.parentNode.insertBefore(btn, anchor);
        btn.onclick = ()=>{ if(typeof sfx==="function") sfx("tab"); openFlatPreview(); };
      }catch(e){}
    };
  }
})();
