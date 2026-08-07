"use strict";
/* ============================================================
   PIXEL PAW IDLE — v2.0.0
   Fichier unique. Aucune dépendance externe. Fonctionne hors ligne.
   ============================================================ */
const VERSION = "3.3.2";

/* ============================================================
   1. SPRITES — grilles 16x16, une lettre = une couleur du palette
   ============================================================ */
const SPRITES = {
/* --- animaux classiques --- */
poussin:{pal:{y:"#FFE27A",d:"#F2C94C",o:"#FF9F1C",k:"#3B2B20",w:"#FFF6D0"},px:[
"................","................","......yyyy......",".....yyyyyy.....",
"....yyyyyyyy....","....ykyyyyky....","....yyyooyyy....","...yyyyyyyyyy...",
"..yyyyyyyyyyyy..","..yywyyyyyyyyy..","..yywwyyyyyyyy..","...yyyyyyyyyy...",
"....dddddddd....",".....o....o.....","....oo....oo....","................"]},

hamster:{pal:{h:"#E3B98A",d:"#C99468",l:"#FFF0DC",k:"#3B2B20",p:"#FF9FB2"},px:[
"................","..hh........hh..","..hph......hph..","..hhhhhhhhhhhh..",
"..hhhhhhhhhhhh..","..hhkhhhhhhkhh..","..hhhhhllhhhhh..","..hhhhhlplhhhh..",
"..hhhhllllhhhh..","..hhhllllllhhh..","..hhllllllllhh..","...hllllllllh...",
"...hhllllllhh...","....dddddddd....",".....dd..dd.....","................"]},

lapin:{pal:{g:"#EFEFF5",l:"#FFFFFF",d:"#C9C9D6",p:"#FFA8BE",k:"#3B2B20"},px:[
"...gg......gg...","...gpg....gpg...","...gpg....gpg...","...ggg....ggg...",
"....gggggggg....","...gggggggggg...","...ggkggggkgg...","...gggggggggg...",
"...ggggppgggg...","...gggggggggg...","...gggllllggg...","...gglllllggg...",
"....gllllllg....","....dddddddd....",".....dd..dd.....","................"]},

perruche:{pal:{b:"#5EC8F2",c:"#B9EDFF",t:"#2E9BC9",y:"#FFE27A",o:"#FF9F1C",k:"#3B2B20"},px:[
"................","......yy........",".....yyyyyy.....","....yyyyyyyy....",
"....yykyykyy....","....yyyooyyy....","....yyyyyyyy....","...bbbbbbbbbb...",
"..bbbtttbbbbbb..","..bbbtttbbbbbb..","..bbbcccbbbbbb..","...bbbcccbbbb...",
"....bbbbbbbb....",".....bbbbbb.....",".....oo..oo.....","................"]},

chat:{pal:{c:"#F2A65A",d:"#D98B3F",l:"#FFE8CC",k:"#3B2B20",p:"#FF9FB2",g:"#7CD86F"},px:[
"................","..cc........cc..","..ccc......ccc..","..cccccccccccc..",
"..cdccccccccdc..","..ccgccccccgcc..","..cccccppccccc..","..ccccllllcccc..",
"..cccllllllccc..","..dcclllllldcc..","..cccllllllccc..","...ccllllllcc...",
"....cccccccc....","....dd....dd....","................","................"]},

corgi:{pal:{n:"#E8A94E",d:"#C4863A",l:"#FFF0D6",k:"#3B2B20"},px:[
"................","..nn........nn..","..nnn......nnn..","..nnnnnnnnnnnn..",
"..nnknnnnnnknn..","..nnllllllllnn..","..nnlllkklllnn..","..nnllllllllnn..",
"...nlllkkllln...","..nnnnllllnnnn..",".nnnnllllllnnnn.",".nnnnllllllnnnn.",
"..nnnnnnnnnnnn..","..dd........dd..","..dd........dd..","................"]},

capybara:{pal:{b:"#B08050",d:"#8E6337",l:"#D6AA7C",k:"#3B2B20"},px:[
"................","..bb........bb..","..bbbbbbbbbbbb..","..bbbbbbbbbbbb..",
"..bbkbbbbbbkbb..","..bbbbbbbbbbbb..","..bbbbbkkbbbbb..","..bbbbbbbbbbbb..",
".bbbbbbbbbbbbbb.",".bbbbllllbbbbbb.",".bbbllllllbbbbb.",".bbbbllllbbbbbb.",
".bbbbbbbbbbbbbb.","..dddddddddddd..","...dd......dd...","................"]},

panda:{pal:{w:"#FFFFFF",k:"#2B2B33",g:"#D8D8DE",p:"#FF9FB2"},px:[
"..kkk......kkk..","..kkk......kkk..","...wwwwwwwwww...","..wwwwwwwwwwww..",
"..wkkwwwwwwkkw..","..wkkwwwwwwkkw..","..wwwwwkkwwwww..","..wwwwwwwwwwww..",
".kwwwwwwwwwwwwk.",".kkwwwwwwwwwwkk.",".kkwwwwwwwwwwkk.","..wwwwwwwwwwww..",
"...wwwwwwwwww...","...kkkk..kkkk...","................","................"]},

dragon:{pal:{d:"#3FBF7F",l:"#8FF0C0",o:"#FF8A3D",k:"#1B3A2A",r:"#FF4D6D"},px:[
"................","...o........o...","...oo......oo...","...dddddddddd...",
"..dddddddddddd..","..ddkddddddkdd..","..dddddrrddddd..","..dddddddddddd..",
".dddllllllldddd.",".ddlllllllllddd.",".dddllllllldddd.","..dddddddddddd..",
"...oddddddddo...","....dddddddd....","....oo....oo....","................"]},

/* --- races premium --- */
siamois:{pal:{c:"#F2E5D0",d:"#6B5340",k:"#3B2B20",b:"#5EC8F2",p:"#FF9FB2"},px:[
"................","..dd........dd..","..ddd......ddd..","..cccccccccccc..",
"..cccccccccccc..","..ccbccccccbcc..","..dddddppddddd..","..ccddddddddcc..",
"..cccccccccccc..","..cccccccccccc..","..cccccccccccc..","...cccccccccc...",
"....cccccccc....","....dd....dd....","................","................"]},

mainecoon:{pal:{m:"#8A6644",d:"#5E4530",l:"#D9BFA0",k:"#3B2B20",g:"#7CD86F"},px:[
".mm..........mm.",".mmm........mmm.","..mmmmmmmmmmmm..",".mmmmmmmmmmmmmm.",
".mdmmmmmmmmmmdm.",".mmgmmmmmmmmgmm.",".mmmmmmllmmmmmm.",".mmmmmlllllmmmm.",
".mmmmllllllmmmm.",".mdmmllllllmmdm.","..mmllllllllmm..","..mmmllllllmmm..",
"...mmmmmmmmmm...","....dddddddd....","....dd....dd....","................"]},

sphynx:{pal:{s:"#E8C0B8",d:"#C99A92",k:"#3B2B20",l:"#FFDCD6",b:"#A8D8FF"},px:[
".ss..........ss.",".sss........sss.",".ssss......ssss.","..ssssssssssss..",
"..ssdssssssdss..","..ssbssssssbss..","..sssssddsssss..","..ssssddddssss..",
"..sssddddddsss..","..sssddddddsss..","...ssssssssss...","...sslllllsss...",
"....ssssssss....","....dd....dd....","................","................"]},

shiba:{pal:{n:"#E8A94E",d:"#C4863A",l:"#FFF0D6",k:"#3B2B20"},px:[
"................","..nn........nn..","..nnn......nnn..","..nnnnnnnnnnnn..",
"..nnnnnnnnnnnn..","..nnknnnnnnknn..","..nnllllllllnn..","..nnlllkklllnn..",
"..nnllllllllnn..","...nlllkkllln...","...nnllllllnn...","....nnnnnnnn....",
"....nnllllnn....","....dddddddd....",".....dd..dd.....","................"]},

bouledogue:{pal:{f:"#C9C9D1",d:"#9A9AA6",l:"#FFFFFF",k:"#3B2B20",p:"#FF9FB2"},px:[
"................","..ff........ff..","..fff......fff..","..fff......fff..",
"..ffffffffffff..","..ffkffffffkff..","..ffflllllffff..","..fflllkkllfff..",
"..fflllppllfff..","..ffllllllllff..","..fffllllllfff..","...ffllllllff...",
"....ffffffff....","....dddddddd....","...dd......dd...","................"]},

berger:{pal:{t:"#D99A4E",k:"#2B2B33",l:"#FFE0B8",d:"#A87433"},px:[
"..kk........kk..","..ktk......ktk..","..ktk......ktk..","..tttttttttttt..",
"..ttkttttttktt..","..ttlllllllltt..","..ttlllkklltt...","..ttllllllllt...",
"..kkllllllllkk..","..kkkllllllkkk..","..kkkkllllkkkk..","...kkkkkkkkkk...",
"....tttttttt....","....dddddddd....",".....dd..dd.....","................"]},

/* --- icônes --- */
coin:{pal:{o:"#E0A61E",y:"#FFC94A",w:"#FFF0BC"},px:[
"................","................",".....oooooo.....","....oyyyyyyo....",
"...oyywyyyyyo...","...oywyyyyyyo...","..oyywyyyyyyyo..","..oyywyyyyyyyo..",
"..oyywyyyyyyyo..","..oyyywyyyyyyo..","...oyyyyyyyyo...","...oyyyyyyyyo...",
"....oyyyyyyo....",".....oooooo.....","................","................"]},

gem:{pal:{b:"#4C79D6",c:"#7AA7FF",w:"#D6E6FF"},px:[
"................","................","....bbbbbbbb....","...bccccccccb...",
"..bcwccccccccb..","..bcwccccccccb..",".bccwcccccccccb.",".bcccwccccccccb.",
"..bcccwccccccb..","..bccccwccccb...","...bcccwcccb....","....bccwccb.....",
".....bcwcb......","......bcb.......",".......b........","................"]},

paw:{pal:{p:"#C9A0FF"},px:[
"................","...pp..pp..pp...","...pp..pp..pp...","................",
"....pppppppp....","...pppppppppp...","..pppppppppppp..","..pppppppppppp..",
"..pppppppppppp..","...pppppppppp...","....pppppppp....",".....pppppp.....",
"................","................","................","................"]},

/* --- animaux phares TikTok --- */
cochondore:{pal:{P:"#FFD98A",D:"#E0AC3E",S:"#FFF0C4",K:"#3B2B20"},px:[
"................","..PP........PP..","..PPPPPPPPPPPP..","..PPPPPPPPPPPP..",
"..PPKPPPPPPKPP..","..PPPPPPPPPPPP..",".PPPPPPPPPPPPPP.",".PPPPSSSSSSPPPP.",
".PPPPSKSSKSPPPP.",".PPPPSSSSSSPPPP.",".PPPPPPPPPPPPPP.","..DDDDDDDDDDDD..",
"...DD......DD...","................","................","................"]},
cochon:{pal:{P:"#FFAFC4",D:"#E88CA6",S:"#FFD6E0",K:"#3B2B20"},px:[
"................","..PP........PP..","..PPPPPPPPPPPP..","..PPPPPPPPPPPP..",
"..PPKPPPPPPKPP..","..PPPPPPPPPPPP..",".PPPPPPPPPPPPPP.",".PPPPSSSSSSPPPP.",
".PPPPSKSSKSPPPP.",".PPPPSSSSSSPPPP.",".PPPPPPPPPPPPPP.","..DDDDDDDDDDDD..",
"...DD......DD...","................","................","................"]},
lama:{pal:{L:"#F0E4D0",D:"#CBB89A",F:"#8A6E52",K:"#3B2B20",R:"#FF9FB2"},px:[
"................","...LL......LL...","...LL......LL...","....LLLLLLLL....",
"....LDLLLLDL....","....LLLLLLLL....","....LLFFFFLL....","....LFKFFKFL....",
"....LFFRFFFL....","...LLLFFFLLL....","...LLLLLLLLLL...","...LLLLLLLLLL...",
"....DD....DD....","................","................","................"]},
singe:{pal:{M:"#8A6244",D:"#6B4A32",F:"#E8C9A0",K:"#2B2018"},px:[
"................",".MM..........MM.",".MMM........MMM.","..MMMMMMMMMMMM..",
"..MFFFFFFFFFFM..","..MFKFFFFFFKFM..","..MFFFFFFFFFFM..","..MFFFDDDDFFM...",
"..MFFFFFFFFFFM..","..MMMFFFFFMMM...","...MMMMMMMMM....","....DD....DD....",
"................","................","................","................"]},

/* --- Biome Ferme : silhouettes distinctes, pas des recolorations --- */
cochontirelire:{pal:{P:"#FF9FC4",D:"#E06B98",S:"#FFD6E6",K:"#3B2B20",G:"#FFC94A"},px:[
"................","..PP........PP..","..PPPPPPPPPPPP..","..PPPPPPPPPPPP..",
"..PPKPPPPPPKPP..",".PPPPPPPGPPPPPP.",".PPPPPSSSSSPPPP.",".PPPPSKSSKSPPPP.",
".PPPPSSSSSSPPPP.",".PPPPPPPPPPPPPP.","..DDDDDDDDDDDD..","...DD......DD...",
"................","................","................","................"]},
vachelait:{pal:{W:"#FFFFFF",T:"#3B3B45",K:"#2B2018",U:"#FFB3C6",N:"#F5F0E4"},px:[
"WW............WW","................","..NNNNNNNNNNNN..",".NTNNTNNNNTNNTN.",
".NNNNNNNNNNNNNN.",".NKNNNNNNNNNKN..","..NNNNTTTTNNNN..",".NNNNNNNNNNNNNN.",
".NNNNNNNNNNNNNN.","..NNNNNNNNNNNN..","...UUU....UUU...","...UUU....UUU...",
"................","................","................","................"]},
moutonor:{pal:{Y:"#FFE27A",D:"#E0A61E",K:"#3B2B20",F:"#4A3A2A"},px:[
"................",".YY.YYYY.YYY....","YYYYYYYYYYYYYYY.","YYYYYYYYYYYYYYY.",
"YYFFYYYYYYFFYY..","YYFKFYYYYFKFY...","YYFFFYYYYFFFY...","YYYYYYYYYYYYYY..",
"YYYYYYYYYYYYYYY.",".YYYYYYYYYYYYY..","..FF........FF..","..FF........FF..",
"................","................","................","................"]},
chevrepix:{pal:{H:"#E8E4D8",D:"#B8B29E",K:"#2B2018",B:"#F0EAD6"},px:[
"................","..DD........DD..","..DD........DD..","...HHHHHHHHHH...",
"..HHHHHHHHHHHH..","..HKHHHHHHHKH...","..HHHBBBBHHHH...","..HHHHBBHHHHH...",
"..HHHHHHHHHHH...","...HHHHHHHHH....","....DD....DD....","................",
"................","................","................","................"]},
chevaltrait:{pal:{B:"#8A5A34",D:"#5E3A1E",K:"#2B2018",M:"#3B2818"},px:[
"..MM..........M.","..MM.........MM.","..BB........MMM.","..BBBBBBBBBB....",
".BBBBBBBBBBBB...",".BKBBBBBBBBB....","..BBBBBBBBBB....","..BBBLLLLBB.....",
"..BBBBBBBBBB....","..DDDDDDDDDD....","..DD......DD....","................",
"................","................","................","................"]},
anetetu:{pal:{G:"#B9B4C2",K:"#2B2018",L:"#EFEFF5"},px:[
"..G........G....","..G........G....","..GG......GG....","...GGGGGGGG......",
"..GGGGGGGGGG.....",".GGKGGGGGGKG.....","..GGGGGGGGGG.....","..GGGLLLLGG......",
"..GGGGGGGGGG.....","...DDDDDDDD......","...DD....DD......","................",
"................","................","................","................"]},
oiebavarde:{pal:{W:"#FFFFFF",O:"#FF9F1C",K:"#2B2018",G:"#E8E4D8"},px:[
"................","................","......WW........",".....WWWW.......",
"....WWWWWW......","....WKWWWW......","....WOOWWW......","...WWWWWWWW.....",
"..WWWWWWWWWW....","..WWWWWWWWWW....","...GG......GG...","................",
"................","................","................","................"]},
canardplastique:{pal:{Y:"#FFE27A",O:"#FF9F1C",K:"#3B2B20"},px:[
"................","................","................","......YYYY......",
".....YYYYYY.....","....YYYYYYYY....","....YKYYYYYY....","...OOYYYYYYY....",
"..YYYYYYYYYYY...","..YYYYYYYYYYY...","...YYYYYYYYY....","....OO....OO....",
"................","................","................","................"]},
dindonfurieux:{pal:{B:"#5E3A2A",R:"#E2384A",Y:"#FFC94A",K:"#2B2018"},px:[
"................",".RR..........RR.","..R....YYYY....R","...YYYYYYYYYY...",
"..YBBBBBBBBBBY..","..BBKBBBBBBKBB..","..BBBBRRRRBBBB..","..BBBBBBBBBBBB..",
"..BBBBBBBBBBBB..","...BBBBBBBBBB...","....OO....OO....","................",
"................","................","................","................"]},
chiendeberger:{pal:{N:"#3B3226",W:"#F0EAD6",K:"#1B1510"},px:[
"................","..NN........NN..","..NNN......NNN..","..NNNNNNNNNNNN..",
"..NWNNNNNNNNWN..","..NNNNNNNNNNNN..","..WWWWWWWWWWWW..","..WWWNNKKNWWWW..",
"..WWWWWWWWWWWW..","...WWWWWWWWWW...","....NN....NN....","................",
"................","................","................","................"]}
};

/* Dessine un sprite 16x16 sur un canvas. Tolère les lignes mal dimensionnées. */
function paint(cv, key){
  const def = SPRITES[key]; if(!def || !cv) return;
  cv.width = 16; cv.height = 16;
  const ctx = cv.getContext("2d");
  ctx.clearRect(0,0,16,16);
  for(let y=0;y<16;y++){
    const row = (def.px[y]||"").padEnd(16,".");
    for(let x=0;x<16;x++){
      const col = def.pal[row[x]];
      if(!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x,y,1,1);
    }
  }
}

/* ============================================================
   2. RARETÉS
   ============================================================ */
const RARITIES = {
  commun:    {name:"Commun",     col:"#B9B4C2"},
  peucommun: {name:"Peu commun", col:"#7DD3C0"},
  rare:      {name:"Rare",       col:"#5EA8FF"},
  epique:    {name:"Épique",     col:"#B47BFF"},
  legendaire:{name:"Légendaire", col:"#FFB020"},
  mythique:  {name:"Mythique",   col:"#FF5C8A"},
  divin:     {name:"Divin",      col:"#FFE066"},
  cosmique:  {name:"Cosmique",   col:"#00E5FF"},
  secret:    {name:"Secret",     col:"#FF2EA6"}
};

/* ============================================================
   3. ANIMAUX — courbe exponentielle équilibrée
   coût ×13 à ×16 par palier, production ×7 à ×8 : le prochain
   animal reste toujours "presque" à portée.
   ============================================================ */
const ANIMALS = [
  {id:"cochon",  name:"Cochon",        cost:0,      tap:1,      rar:"commun",     desc:"Le premier compagnon de la ferme."},
  {id:"hamster", name:"Hamster",       cost:9e2,    tap:6,      rar:"commun",     desc:"Court dans sa roue, remplit ta bourse."},
  {id:"lapin",   name:"Lapin",         cost:1.4e4,  tap:45,     rar:"peucommun",  desc:"Bondit d'une pièce à l'autre."},
  {id:"perruche",name:"Perruche",      cost:2.2e5,  tap:320,    rar:"peucommun",  desc:"Ramène des pièces en piqué."},
  {id:"chat",    name:"Chat Européen", cost:4e6,    tap:2400,   rar:"rare",       desc:"Rentable et parfaitement indifférent."},
  {id:"corgi",   name:"Chien Corgi",   cost:7.2e7,  tap:18000,  rar:"rare",       desc:"Petites pattes, énormes revenus."},
  {id:"capybara",name:"Capybara",      cost:1.26e9, tap:14e4,   rar:"epique",     desc:"Le calme absolu, la fortune totale."},
  {id:"panda",   name:"Panda",         cost:2.7e10, tap:11e5,   rar:"legendaire", desc:"Mange, dort, encaisse."},
  {id:"dragon",  name:"Dragon Pixel",  cost:5.5e11, tap:9e6,    rar:"mythique",   desc:"Son trésor déborde à chaque tape."}
];

const PREMIUM = [
  {id:"siamois",   name:"Chat Siamois",     gems:120,  mult:3,  tap:5e5,  rar:"rare",       desc:"Élégant, bavard, ×3 sur tout."},
  {id:"mainecoon", name:"Chat Maine Coon",  gems:260,  mult:5,  tap:4e6,  rar:"epique",     desc:"Le géant doux. ×5 sur tout."},
  {id:"sphynx",    name:"Chat Sphynx",      gems:450,  mult:7,  tap:3e7,  rar:"epique",     desc:"Sans poil, sans pitié. ×7 sur tout."},
  {id:"shiba",     name:"Chien Shiba Inu",  gems:700,  mult:10, tap:2e8,  rar:"legendaire", desc:"Le sourire qui rapporte. ×10 sur tout."},
  {id:"bouledogue",name:"Bouledogue Français",gems:1100,mult:14,tap:15e8, rar:"legendaire", desc:"Ronfle en générant des fortunes. ×14."},
  {id:"berger",    name:"Berger Allemand",  gems:1600, mult:20, tap:1e10, rar:"mythique",   desc:"Garde ton or et le multiplie. ×20."},
  {id:"cochondore",name:"Cochon Doré",      gems:900,  mult:12, tap:5e9,  rar:"legendaire", desc:"La star dorée de la ferme. ×12 sur tout."},
  {id:"lama",      name:"Lama",             gems:1400, mult:17, tap:3e10, rar:"mythique",   desc:"Crache le glamour. ×17 sur tout."},
  {id:"singe",     name:"Singe",            gems:2200, mult:28, tap:2e11, rar:"mythique",   desc:"Le boss de la troupe. ×28 sur tout."},

  /* --- Biome Ferme (ajout, rien retiré) --- */
  {id:"cochontirelire", name:"Cochon Tirelire", gems:60,  mult:1,   tap:8e2,  rar:"peucommun", desc:"+15 % sur tes gains de tape.", tapBonus:0.15, biome:"ferme"},
  {id:"vachelait",       name:"Vache Laitière",  gems:70,  mult:1,   tap:0,    rar:"peucommun", desc:"+40 pièces/sec dédiées, tout le temps.", idleFlat:40, biome:"ferme"},
  {id:"moutonor",        name:"Mouton à Laine d'Or", gems:90, mult:3, tap:1.5e3, rar:"rare",    desc:"×3 sur tout.", biome:"ferme"},
  {id:"chevrepix",       name:"Chèvre Pixel",    gems:50,  mult:2,   tap:900,  rar:"peucommun", desc:"×2 sur tout.", biome:"ferme"},
  {id:"chevaltrait",     name:"Cheval de Trait", gems:100, mult:4,   tap:2e3,  rar:"rare",      desc:"×4 sur tout.", biome:"ferme"},
  {id:"anetetu",         name:"Âne Têtu",        gems:80,  mult:1,   tap:1e3,  rar:"rare",      desc:"+3 % de chance de critique.", critBonus:0.03, biome:"ferme"},
  {id:"oiebavarde",      name:"Oie Bavarde",     gems:45,  mult:2,   tap:700,  rar:"commun",    desc:"×2 sur tout.", biome:"ferme"},
  {id:"canardplastique", name:"Canard en Plastique", gems:40, mult:1.5, tap:500, rar:"commun",  desc:"×1,5 sur tout.", biome:"ferme"},
  {id:"dindonfurieux",   name:"Dindon Furieux",  gems:65,  mult:2.5, tap:1.1e3, rar:"peucommun", desc:"×2,5 sur tout.", biome:"ferme"},
  {id:"chiendeberger",   name:"Chien de Berger", gems:150, mult:1,   tap:2.5e3, rar:"legendaire", desc:"+8 % par animal de la Ferme possédé.", packBonus:0.08, biome:"ferme"}
];

const ALL_PETS = ANIMALS.concat(PREMIUM);
function petById(id){ return ALL_PETS.find(p=>p.id===id) || ANIMALS[0]; }

/* ============================================================
   4. AMÉLIORATIONS
   ============================================================ */
const TAP_UPS = [
  {id:"t1", name:"Graines croustillantes", add:1,     base:60,     rate:1.15},
  {id:"t2", name:"Balle rebondissante",    add:9,     base:1400,   rate:1.15},
  {id:"t3", name:"Griffoir deluxe",        add:60,    base:24e3,   rate:1.16},
  {id:"t4", name:"Coussin royal",          add:420,   base:42e4,   rate:1.16},
  {id:"t5", name:"Trampoline pixel",       add:3200,  base:9e6,    rate:1.17},
  {id:"t6", name:"Gant magique",           add:26e3,  base:2.2e8,  rate:1.17}
];
const IDLE_UPS = [
  {id:"i1", name:"Gamelle automatique", add:3,     base:400,    rate:1.16},
  {id:"i2", name:"Distributeur pixel",  add:24,    base:6500,   rate:1.16},
  {id:"i3", name:"Robot câlin",         add:190,   base:11e4,   rate:1.17},
  {id:"i4", name:"Ferme pixel",         add:1500,  base:1.9e6,  rate:1.17},
  {id:"i5", name:"Usine à croquettes",  add:12e3,  base:4.5e7,  rate:1.18},
  {id:"i6", name:"Portail à pièces",    add:95e3,  base:1.1e9,  rate:1.18}
];
const ALL_UPS = TAP_UPS.concat(IDLE_UPS);

const BOOSTS = [
  {id:"b1", name:"Tape ×2", mult:2, secs:60, gems:25,  desc:"60 secondes de folie."},
  {id:"b2", name:"Tout ×3", mult:3, secs:45, gems:60,  desc:"45 secondes, tape et passif."},
  {id:"b3", name:"Tout ×5", mult:5, secs:30, gems:140, desc:"30 secondes, plein régime."}
];

/* ============================================================
   5. STARTERS — bonus permanent, choix unique
   ============================================================ */
const STARTERS = [
  {id:"chat",  sprite:"chat",  name:"Chat",  bonus:"+5 % de pièces",  key:"coin"},
  {id:"chien", sprite:"corgi", name:"Chien", bonus:"+5 % de vitesse", key:"speed"},
  {id:"lapin", sprite:"lapin", name:"Lapin", bonus:"+5 % de critique",key:"crit"}
];

/* ============================================================
   6. PRESTIGE — "Pattes Célestes"
   ============================================================ */
const PRESTIGE_MIN = 2e13;          // 20 000 milliards : première Renaissance en fin de partie normale
const PRESTIGE_UPS = [
  {id:"g1", name:"Aura dorée",     desc:"+40 % de pièces globales",         base:9,  rate:1.85, max:40},
  {id:"g2", name:"Négociant",      desc:"-3 % sur tous les coûts",          base:12, rate:1.9,  max:18},
  {id:"g3", name:"Griffe critique",desc:"+2 % de chance de critique (×7)",  base:12, rate:1.88, max:25},
  {id:"g4", name:"Sommeil profond",desc:"+10 % de gains hors-ligne",        base:14, rate:1.9,  max:20},
  {id:"g5", name:"Départ rapide",  desc:"Commence avec plus de pièces",    base:16, rate:1.95, max:15},
  {id:"g6", name:"Alchimiste",     desc:"+1 Pièce de Fusion par fusion",    base:14, rate:1.95, max:10},
  {id:"g7", name:"Instinct de chasse", desc:"+1 % de chance de critique",   base:16, rate:1.9,  max:20},
  {id:"g8", name:"Mémoire infinie",    desc:"+5 % de gains hors-ligne",     base:16, rate:1.9,  max:15},
  {id:"g9", name:"Cœur généreux",      desc:"+2 % de pièces globales",      base:10, rate:1.8,  max:25},
  {id:"g10",name:"Insomnie dorée",     desc:"+1 h de limite hors-ligne",    base:22, rate:1.85, max:12}
];
/* CORRECTIF v2.3 : courbes adoucies (le seuil d'entrée a baissé, les premières
   Renaissances rapportent moins de Pattes Célestes qu'avant — sans ça, tout
   redevenait hors de prix dès le 2e ou 3e cycle). Plafond de g1 abaissé
   (40%×40 = ×17 max, au lieu de ×26) pour limiter l'inflation à très long terme.

/* ============================================================
   7. HORS-LIGNE
   ============================================================ */
const OFFLINE_BASE = 3600;              // 1 h de départ
const OFFLINE_COIN_STEPS = [            // +30 min chacun, jusqu'à 4 h
  5e4, 6e5, 7e6, 9e7, 12e8, 16e9
];
const OFFLINE_GEM_PACKS = [              // 4 packs distincts, jusqu'à 12h en argent réel/gemmes
  {id:"o1h", name:"Pack 1 h",  add:3600,  gems:180},
  {id:"o2h", name:"Pack 2 h",  add:7200,  gems:320},
  {id:"o4h", name:"Pack 4 h",  add:14400, gems:650},
  {id:"o5h", name:"Pack 5 h",  add:18000, gems:800}
];
const OFFLINE_MAX = 24*3600;             // 1h base + jusqu'à 12h Renaissance (pattes célestes) + jusqu'à 12h gemmes/€ = 24h + marge
const OFFLINE_RATE = 0.5;               // 50 % du taux passif

const TIME_WARP = [
  {id:"w1", name:"Avance 1 h",  secs:3600,  gems:100},
  {id:"w2", name:"Avance 4 h",  secs:14400, gems:300},
  {id:"w3", name:"Avance 12 h", secs:43200, gems:750}
];

/* ============================================================
   8. BOUTIQUE
   ============================================================ */
const PACK_LINKS = {
  p1: "https://www.paypal.com/ncp/payment/PLB-YBE6FK8T7UZ9",
  p2: "https://www.paypal.com/ncp/payment/PLB-4PM79PXF6EEN",
  p3: "https://www.paypal.com/ncp/payment/PLB-UP7CU4NS337C",
  p4: "https://www.paypal.com/ncp/payment/PLB-PGTLMPR4K957"
};
/* Jeton unique par pack, integre a l'URL de retour PayPal. Recu = gemmes donnees
   automatiquement, sans rien taper. Pas de serveur derriere : quelqu'un qui aurait
   ce lien exact sans payer pourrait en theorie s'en servir une fois - risque faible
   pour ce public, mais reel, a savoir. */
const CLAIM_CODES = {
  "W95gd7zFDYbO94zB": {gems:100,  label:"100 gemmes"},
  "NIiLXU4Pfx7cVBkz": {gems:550,  label:"550 gemmes"},
  "wR-ivY5YgYy-LZOV": {gems:1200, label:"1200 gemmes"},
  "UZ1Fj8mYWgt0HUSZ": {gems:3000, label:"3000 gemmes"}
};
function checkPaypalReturn(){
  const params = new URLSearchParams(location.search);
  const claim = params.get("claim");
  if(!claim) return;
  history.replaceState(null, "", location.pathname);
  const c = CLAIM_CODES[claim];
  if(!c) return;
  S.claimedTokens = S.claimedTokens || {};
  if(S.claimedTokens[claim]) return;
  S.claimedTokens[claim] = true;
  S.gems += c.gems;
  save();
  setTimeout(()=>{
    openModal('<h2>Paiement reçu !</h2><div class="big">+'+c.gems+' 💎</div><p>Merci pour ton achat.</p><button class="mBtn" id="mOk">Super</button>');
    const b = document.getElementById("mOk"); if(b) b.onclick = closeModal;
    sfx("big"); vibrate(60);
  }, 400);
}

const PACKS = [
  {id:"p1", gems:100,  price:"1,99 €"},
  {id:"p2", gems:550,  price:"8,99 €"},
  {id:"p3", gems:1200, price:"17,99 €"},
  {id:"p4", gems:3000, price:"39,99 €"}
];
const NOADS_GEMS = 900;

/* ============================================================
   9. CODES CADEAUX — ajoute simplement une clé pour en créer un
   ============================================================ */
const CODES = {
  BIENVENUE:{gems:100, coins:5e3,  label:"Bienvenue chez Pixel Paw !"},
  PIXELPAW: {gems:50,  coins:25e3, boost:{mult:3,secs:120}, label:"Merci de jouer !"},
  STARTER:  {gems:75,  coins:1e3,  label:"Coup de pouce de départ"},
  PATTES:   {gems:150,             label:"Cadeau de la communauté"}
};

/* ============================================================
   10. RÉCOMPENSES QUOTIDIENNES (7 jours glissants)
   ============================================================ */
const DAILY = [
  {d:1, gems:20,  coins:0,    label:"20 💎"},
  {d:2, gems:0,   coinsMin:60,label:"1 min de production"},
  {d:3, gems:40,  coins:0,    label:"40 💎"},
  {d:4, gems:0,   boost:{mult:3,secs:180}, label:"Boost ×3 · 3 min"},
  {d:5, gems:60,  coins:0,    label:"60 💎"},
  {d:6, gems:0,   coinsMin:600,label:"10 min de production"},
  {d:7, gems:150, coins:0,    label:"150 💎 · jackpot"}
];

/* ============================================================
   11. QUÊTES DU JOUR — tirées au hasard chaque jour
   ============================================================ */
const QUEST_POOL = [
  {id:"q_tap",   name:"Taper {n} fois",            gen:()=>[100,250,500][rnd(3)], stat:"taps",     gems:15},
  {id:"q_buy",   name:"Acheter {n} améliorations", gen:()=>[5,10,20][rnd(3)],     stat:"buys",     gems:20},
  {id:"q_earn",  name:"Gagner {n} pièces",         gen:()=>null,                  stat:"earned",   gems:25, scale:true},
  {id:"q_crit",  name:"Faire {n} critiques",       gen:()=>[5,10,20][rnd(3)],     stat:"crits",    gems:20},
  {id:"q_ad",    name:"Regarder {n} pub bonus",    gen:()=>[1,2][rnd(2)],         stat:"ads",      gems:15}
];
function rnd(n){ return Math.floor(Math.random()*n); }

const AD_COOLDOWN = 45;
const BUBBLE_EVERY = 90;

/* ============================================================
   12. SAUVEGARDE — schéma versionné + migration depuis la v1
   CORRECTIF v2 : la v1 écrasait les vieilles sauvegardes.
   ============================================================ */
const SAVE_KEY = "pixelpaw.save";
const OLD_KEY  = "pixelpaw.save.v1";
const SCHEMA   = 3;
const memFallback = {};
const store = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return memFallback[k] ?? null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){ memFallback[k]=v; } },
  del(k){ try{ localStorage.removeItem(k); }catch(e){ delete memFallback[k]; } }
};

function freshState(){
  return {
    schema:SCHEMA,
    /* --- remis à zéro par la Renaissance --- */
    coins:0, animal:"cochon", owned:{cochon:true}, up:{}, aup:{}, evo:{}, rup:{},
    boostMult:1, boostUntil:0, boostName:"",
    /* --- conservé pour toujours --- */
    gems:30, premium:{}, prest:{}, pawPoints:0, rebirths:0,
    playerLvl:1, playerXP:0, skillPts:0, skills:{prod:0,happy:0,explo:0,collect:0},
    noAds:false, starter:null, codes:{}, dex:{poussin:1},
    inv:{}, seen:{}, fc:0, miniPlays:0, miniDate:"", cosm:{}, equip:{},
    fusions:0, wheelLast:"", achv:{}, streak:0, streakBest:0, streakLast:"",
    frenzyGauge:0, frenzyTier:0,
    offCoinSteps:0, offGemPacks:{},
    totalEarned:0, lifetimeEarned:0,
    /* --- quotidien --- */
    dailyDay:0, dailyLast:"", quests:[], qstat:{}, questDate:"",
    /* --- hebdomadaire (Bloc 4/25) --- */
    weekQuests:[], wqstat:{}, weekDate:"",
    /* --- divers --- */
    adReadyAt:0, nextBubble:Date.now()+BUBBLE_EVERY*1000, lastSeen:Date.now(),
    taps:0, theme:"pastel", volBgm:35, volSfx:70, volVib:60, clickSound:"bip", bgmTrack:"classic",
    notifs:false, zen:false
  };
}
let S = freshState();

/* Migration v1 -> v2. Les anciens identifiants premium sont remappés. */
function migrate(d){
  /* v2 -> v3 : rien à convertir, les nouvelles clés viennent de freshState(). */
  if(d.schema === 2){ d.schema = SCHEMA; return d; }
  /* v1 -> v3 */
  const n = freshState();
  n.coins = d.coins||0; n.gems = d.gems||30; n.up = d.up||{}; n.taps = d.taps||0;
  n.owned = d.owned || {poussin:true};
  if(n.owned.chien){ n.owned.corgi = true; delete n.owned.chien; }
  n.animal = d.animal === "chien" ? "corgi" : d.animal === "poussin" ? "cochon" : (d.animal||"cochon");
  const map = {persan:"mainecoon", shiba:"shiba", royal:"berger"};
  Object.keys(d.premium||{}).forEach(k=>{ if(map[k]) n.premium[map[k]] = true; });
  if(map[n.animal]) n.animal = map[n.animal];
  if(!petById(n.animal)) n.animal = "cochon";
  n.volSfx = d.sound === false ? 0 : 70;
  Object.keys(n.owned).forEach(k=>{ n.dex[k] = n.dex[k]||1; });
  Object.keys(n.premium).forEach(k=>{ n.dex[k] = n.dex[k]||1; });
  return n;
}

function save(){
  S.lastSeen = Date.now();
  store.set(SAVE_KEY, JSON.stringify(S));
}
function load(){
  let raw = store.get(SAVE_KEY);
  let legacy = false;
  if(!raw){ raw = store.get(OLD_KEY); legacy = !!raw; }
  if(!raw) return;
  let d;
  try{ d = JSON.parse(raw); }catch(e){ return; }          // sauvegarde illisible : partie neuve
  if(legacy || d.schema !== SCHEMA) d = migrate(d);
  S = Object.assign(freshState(), d);                      // les clés manquantes reprennent la valeur par défaut
  S.schema = SCHEMA;
  if(!petById(S.animal)) S.animal = "cochon";
  if(legacy) store.del(OLD_KEY);
}

/* ============================================================
   13. FORMATAGE — CORRECTIF v2 : plus de plafond à 1e30
   ============================================================ */
const SUFFIX = ["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","Ud","Dd","Td","Qad","Qid","Sxd","Spd","Ocd","Nod","Vg"];
function fmt(n){
  if(!isFinite(n)) return "∞";
  n = Math.floor(n);
  if(n < 1000) return String(n);
  let i = 0;
  while(n >= 1000 && i < SUFFIX.length-1){ n /= 1000; i++; }
  if(n >= 1000) return n.toExponential(2);                 // au-delà de la table : notation scientifique
  return (n < 10 ? n.toFixed(2) : n < 100 ? n.toFixed(1) : Math.floor(n)) + SUFFIX[i];
}
function fmtTime(sec){
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60;
  if(h) return h+" h "+m+" min";
  if(m) return m+" min "+s+" s";
  return s+" s";
}

/* ============================================================
   14. CALCULS
   ============================================================ */
function pLvl(id){ return S.prest[id]||0; }
function costMult(){ return Math.max(0.4, 1 - 0.03*pLvl("g2")); }          // Négociant
function upCost(u){ return Math.floor(tieredCost(u.base, u.rate, S.up[u.id]||0) * costMult()); }
/* Croissance du coût par paliers : douce jusqu'au niveau 50, puis nettement plus
   raide (50-99), puis très raide au-delà de 100 — le "mur" décrit dans le document,
   sans toucher au coût des tout premiers niveaux (le début reste facile). */
function tieredCost(base, rate, lvl){
  const r1 = rate, r2 = rate + 0.18, r3 = rate + 0.4;
  if(lvl < 50) return base * Math.pow(r1, lvl);
  const at50 = base * Math.pow(r1, 50);
  if(lvl < 100) return at50 * Math.pow(r2, lvl-50);
  const at100 = at50 * Math.pow(r2, 50);
  return at100 * Math.pow(r3, lvl-100);
}
function animalCost(a){ return Math.floor(a.cost * costMult()); }
function prestCost(p){ return Math.floor(p.base * Math.pow(p.rate, pLvl(p.id))); }

function boostActive(){ return Date.now() < S.boostUntil; }
function boostMult(){ return boostActive() ? S.boostMult : 1; }
function dexCount(){ return Object.keys(S.dex).filter(k=>S.dex[k]>0).length; }

/* Multiplicateur global. `withBoost=false` sert au calcul hors-ligne.
   CORRECTIF v2 : le boost ne comptait pas dans les gains hors-ligne (exploit). */
function globalMult(withBoost){
  let m = 1;
  PREMIUM.forEach(p=>{ if(S.premium[p.id] && p.mult) m *= p.mult; });
  m *= 1 + 0.05 * Math.max(0, Object.keys(S.owned).filter(k=>S.owned[k]).length - 1); // +5 %/animal
  m *= 1 + 0.02 * dexCount();
  m *= collectionMult();                                    // lot 2 : collection                                                          // +2 %/PixelDex
  m *= 1 + 0.50 * pLvl("g1");                                                          // Aura dorée
  m *= 1 + 0.02 * pLvl("g9");                                                          // Cœur généreux
  m *= 1 + 0.15 * (S.pawPoints||0) / 10;                                               // Pattes Célestes
  if(S.starter === "chat") m *= 1.05;
  if(typeof weatherLuckMult === "function") m *= weatherLuckMult();          // Bloc 3/25 : bonus arc-en-ciel
  if(typeof skillProdMult === "function") m *= skillProdMult();              // Bloc 9/25 : talent Production
  if(typeof skillLuckMult === "function") m *= skillLuckMult();              // Bloc 9/25 : talent Collection
  /* Biome Ferme : Chien de Berger boost les autres animaux de Ferme possédés */
  const dog = PREMIUM.find(p=>p.id === "chiendeberger");
  if(dog && S.premium.chiendeberger){
    const count = PREMIUM.filter(p=>p.biome === "ferme" && p.id !== "chiendeberger" && S.premium[p.id]).length;
    m *= 1 + dog.packBonus * count;
  }
  m *= 1 + 0.02 * dogCount();                                                          // Esprit de Meute
  if(zooComplete()) m *= 2;                                                            // Zoo Complet
  if(nightBirdBonus()) m *= 1.2;                                                       // Oiseau de Nuit
  if(withBoost !== false) m *= boostMult();
  return m;
}
const FLYING_IDS = ["perruche","oiebavarde","canardplastique"];
function nightBirdBonus(){
  const h = new Date().getHours();
  const isNight = (h >= 20 || h < 6);
  if(!isNight) return false;
  return FLYING_IDS.some(id => S.owned[id] || S.premium[id]);
}
const DOG_IDS = ["corgi","shiba","berger","chiendeberger"];
function dogCount(){ return DOG_IDS.filter(id => S.owned[id] || S.premium[id]).length; }
function zooComplete(){
  const tiers = ["commun","peucommun","rare","epique","legendaire","mythique"];
  return tiers.every(r =>
    ANIMALS.some(a=>a.rar===r && S.owned[a.id]) || PREMIUM.some(p=>p.rar===r && S.premium[p.id])
  );
}
function farmIdleFlat(){
  let s = 0;
  PREMIUM.forEach(p=>{ if(p.idleFlat && S.premium[p.id]) s += p.idleFlat; });
  return s;
}
function critChance(){
  let c = 0.02*pLvl("g3") + 0.01*pLvl("g7");
  if(S.starter === "lapin") c += 0.05;
  if(S.premium.anetetu) c += 0.03;
  c += 0.01 * Math.floor((S.taps||0)/1000);          // Clicker Fou : +1%/1000 tapes cumulées
  if(typeof skillCritBonus === "function") c += skillCritBonus();  // Bloc 9/25 : talent Bonheur
  return Math.min(0.75, c);
}
function currentPet(){ return petById(S.animal); }
function perTap(){
  let flat = currentPet().tap;
  TAP_UPS.forEach(u=>{ flat += (S.up[u.id]||0) * u.add; });
  _rtTap.forEach(t=>{ flat += (S.rup[t.id]||0) * t.add; });
  let out = Math.max(1, Math.floor(flat * globalMult()));
  if(S.premium.cochontirelire) out = Math.floor(out * 1.15);
  return out;
}
function perSec(withBoost){
  let s = 0;
  IDLE_UPS.forEach(u=>{ s += (S.up[u.id]||0) * u.add; });
  ANIMAL_UPS.forEach(u=>{ s += (S.aup[u.id]||0) * u.add; });
  _rtIdle.forEach(t=>{ s += (S.rup[t.id]||0) * t.add; });
  s += farmIdleFlat();
  s *= globalMult(withBoost);
  if(S.starter === "chien") s *= 1.05;
  return Math.floor(s);
}
function offlineCap(){
  let cap = OFFLINE_BASE + pLvl("g10")*3600;
  OFFLINE_GEM_PACKS.forEach(p=>{ if(S.offGemPacks[p.id]) cap += p.add; });
  return Math.min(OFFLINE_MAX, cap);
}
function offlineRate(){ return OFFLINE_RATE * (1 + 0.10*pLvl("g4") + 0.05*pLvl("g8")); }
function earn(n){ S.coins += n; S.totalEarned += n; S.lifetimeEarned += n; bump("earned", n); }

/* ============================================================
   15. AUDIO — SFX + boucle 8 bits, tout généré par Web Audio
   ============================================================ */
let actx = null, master = null, bgmTimer = null, bgmStep = 0;
function audio(){
  if(!actx){
    try{
      actx = new (window.AudioContext||window.webkitAudioContext)();
      master = actx.createGain(); master.gain.value = 1; master.connect(actx.destination);
    }catch(e){ return null; }
  }
  if(actx.state === "suspended") actx.resume();
  return actx;
}
function tone(freq, dur, type, vol, slideTo){
  const a = audio(); if(!a || vol <= 0) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type||"square"; o.frequency.setValueAtTime(freq, a.currentTime);
  if(slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, a.currentTime+dur);
  g.gain.setValueAtTime(vol, a.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime+dur);
  o.connect(g); g.connect(master);
  o.start(); o.stop(a.currentTime+dur);
}
/* Sons de clic sélectionnables dans les options */
const CLICK_SOUNDS = {
  bip:   {name:"Bip rétro",   play:v=>tone(660+Math.random()*120,.06,"square",v)},
  coin:  {name:"Coin arcade", play:v=>{tone(988,.05,"square",v);setTimeout(()=>tone(1319,.09,"square",v),45);}},
  pop:   {name:"Pop",         play:v=>tone(420,.09,"sine",v*1.3,900)},
  miaou: {name:"Miaou",       play:v=>tone(700,.18,"sawtooth",v*.7,340)},
  waouf: {name:"Waouf",       play:v=>tone(260,.14,"square",v,150)}
};
function sfx(kind){
  const v = S.volSfx/100 * 0.12;
  if(v <= 0) return;
  if(kind === "click") (CLICK_SOUNDS[S.clickSound]||CLICK_SOUNDS.bip).play(v);
  else if(kind === "buy")  tone(520,.07,"square",v);
  else if(kind === "good") { tone(784,.08,"square",v); setTimeout(()=>tone(1047,.14,"square",v),80); }
  else if(kind === "evo")  { [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.16,"square",v),i*95)); }
  else if(kind === "big")  { [392,523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>tone(f,.2,"square",v),i*80)); }
  else if(kind === "tab")  tone(440,.04,"square",v*.7);
}
function vibrate(ms){
  if(!navigator.vibrate || S.volVib <= 0) return;
  try{ navigator.vibrate(Math.max(1, Math.round(ms * S.volVib/100))); }catch(e){}
}
/* Boucles BGM 8 bits : basse + arpège sur 16 pas. Plusieurs pistes au choix (options). */
const BGM_TRACKS = {
  classic:{name:"Classique", bass:[0,0,7,7,5,5,3,3],              arp:[12,16,19,16,12,16,19,24,12,16,19,16,17,14,12,7],  wave:"square",   tempo:190},
  chill:  {name:"Détente",   bass:[0,0,5,5,3,3,0,0],              arp:[7,12,15,12,7,12,15,19,7,12,15,12,10,9,7,3],       wave:"triangle", tempo:230},
  arcade: {name:"Arcade",    bass:[0,3,5,3,0,3,5,3],              arp:[19,24,22,19,17,19,24,22,19,15,17,19,15,12,14,12], wave:"square",   tempo:150},
  reverie:{name:"Rêverie",   bass:[0,0,2,2,7,7,5,5],              arp:[12,15,19,24,22,19,15,12,10,14,17,22,19,15,12,10], wave:"sine",     tempo:260},
  secrete:{name:"Secrète",   bass:[0,7,3,10,0,7,3,10],            arp:[12,19,15,22,19,12,24,19,17,24,20,27,24,17,29,24], wave:"triangle", tempo:170, locked:"a19"}
};
function nt(semi){ return 220 * Math.pow(2, semi/12); }
function bgmTick(){
  const v = S.volBgm/100 * 0.05;
  if(v <= 0) return;
  const tr = BGM_TRACKS[S.bgmTrack] || BGM_TRACKS.classic;
  if(bgmStep % 2 === 0) tone(nt(tr.bass[(bgmStep/2)%tr.bass.length]-12), .22, "triangle", v*1.6);
  tone(nt(tr.arp[bgmStep % tr.arp.length]), .13, tr.wave, v);
  bgmStep++;
}
function startBgm(){
  if(bgmTimer) return;
  const tr = BGM_TRACKS[S.bgmTrack] || BGM_TRACKS.classic;
  bgmTimer = setInterval(bgmTick, tr.tempo);
}
function stopBgm(){ clearInterval(bgmTimer); bgmTimer = null; }
function restartBgm(){ stopBgm(); if(S.volBgm > 0) startBgm(); }

/* ============================================================
   16. THÈME
   ============================================================ */
function applyTheme(){
  document.body.dataset.theme = S.theme || "pastel";
  const bar = {pastel:"#F7C9E0", dark:"#1E1830", gameboy:"#8BAC0F", cyber:"#12042A"}[S.theme] || "#F7C9E0";
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute("content", bar);
  if(typeof buildWheelGradient === "function") buildWheelGradient();
}

/* ============================================================
   17. PUBLICITÉ SIMULÉE
   triggerRewardedAd(cb) : si le Pass Sans Pubs est possédé,
   la récompense est donnée immédiatement. Sinon, compte à rebours 5 s.
   === HOOK APK : remplace le corps par AdMob / Unity Ads. ===
   ============================================================ */
function triggerRewardedAd(cb, label){
  if(S.noAds){ cb(); return; }
  let left = 5;
  const draw = ()=> openModal(
    '<h2>Pub récompensée</h2>' +
    '<div id="adSlot">Emplacement publicitaire<br>(simulé)</div>' +
    '<p>' + (label||"Récompense à la fin") + '</p>' +
    '<button class="mBtn" id="mOk"' + (left>0?' disabled':'') + '>' +
      (left>0 ? left+" s…" : "Récupérer") + '</button>' +
    (left>0 ? '<button class="mBtn ghost" id="mNo">Annuler</button>' : '')
  );
  draw();
  const no = document.getElementById("mNo"); if(no) no.onclick = ()=>{ clearInterval(t); closeModal(); };
  const t = setInterval(()=>{
    if(!veil.classList.contains("on")){ clearInterval(t); return; }   // fermée par le joueur
    left--;
    if(left <= 0){
      clearInterval(t); draw();
      document.getElementById("mOk").onclick = ()=>{ closeModal(); cb(); };
    }else{
      draw();
      const n2 = document.getElementById("mNo"); if(n2) n2.onclick = ()=>{ clearInterval(t); closeModal(); };
    }
  }, 1000);
}

/* ============================================================
   18. NOTIFICATIONS
   Le navigateur ne sait pas planifier une notif après fermeture.
   Ici : demande de permission + rappels tant que l'app vit.
   === HOOK APK : remplace par @capacitor/local-notifications. ===
   ============================================================ */
const NOTIFS = [
  {h:9,  body:"Vos animaux ont faim ! Venez récolter vos pièces."},
  {h:14, body:"Vos gains hors-ligne sont au maximum !"},
  {h:20, body:"N'oubliez pas votre récompense quotidienne !"}
];
let notifTimers = [];
function scheduleNotifs(){
  notifTimers.forEach(clearTimeout); notifTimers = [];
  if(!S.notifs || !("Notification" in window) || Notification.permission !== "granted") return;
  const now = new Date();
  NOTIFS.forEach(n=>{
    const t = new Date(now); t.setHours(n.h, 0, 0, 0);
    if(t <= now) t.setDate(t.getDate()+1);
    const ms = t - now;
    if(ms < 24*3600*1000) notifTimers.push(setTimeout(()=>{
      try{ new Notification("Pixel Paw", {body:n.body}); }catch(e){}
      scheduleNotifs();
    }, ms));
  });
}
function askNotifs(){
  if(!("Notification" in window)){ toast("Notifications indisponibles"); return; }
  Notification.requestPermission().then(p=>{
    S.notifs = (p === "granted");
    if(S.notifs){ scheduleNotifs(); toast("Rappels activés"); }
    else toast("Permission refusée");
    save(); openSettings();
  });
}

/* ============================================================
   19. RACCOURCIS DOM
   ============================================================ */
const $ = s => document.querySelector(s);
const app=$("#app"), coinVal=$("#coinVal"), gemVal=$("#gemVal"), cpsLine=$("#cpsLine");
const petCv=$("#pet"), petWrap=$("#petWrap"), petLabel=$("#petLabel"), rarityTag=$("#rarityTag");
const fx=$("#fx"), stage=$("#stage"), bubble=$("#bubble"), toastEl=$("#toast");
const bannerEl=$("#banner"), bannerTxt=$("#bannerTxt"), bannerBtn=$("#bannerBtn");
const veil=$("#veil"), modal=$("#modal"), flash=$("#flash");

paint($("#icoCoin"),"coin"); paint($("#icoGem"),"gem");

/* Écriture mise en cache.
   CORRECTIF v2 : la v1 réécrivait 20+ boutons toutes les 400 ms, même sans
   changement — d'où les saccades sur téléphone d'entrée de gamme. */
function setTxt(el, txt){ if(el._t !== txt){ el._t = txt; el.innerHTML = txt; } }
function setDis(el, v){ v = !!v; if(el.disabled !== v){ el.disabled = v; } }
function setCls(el, cls, on){ if(el.classList.contains(cls) !== !!on) el.classList.toggle(cls, !!on); }

let toastT = null;
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("on");
  clearTimeout(toastT);
  toastT = setTimeout(()=>toastEl.classList.remove("on"), 1700);
}
function openModal(html){ modal.innerHTML = html; veil.classList.add("on"); modal.scrollTop = 0; }
function closeModal(){ veil.classList.remove("on"); }
veil.addEventListener("click", e=>{ if(e.target === veil) closeModal(); });

/* ============================================================
   20. TAPE + EFFETS
   ============================================================ */
function spawnFloat(x,y,txt,crit){
  const d = document.createElement("div");
  d.className = "float" + (crit ? " crit" : "");
  d.textContent = txt; d.style.left = x+"px"; d.style.top = y+"px";
  fx.appendChild(d); setTimeout(()=>d.remove(), 900);
}
function spawnCoins(x,y,n){
  for(let i=0;i<n;i++){
    const c = document.createElement("div");
    c.className = "coin"; c.style.left = x+"px"; c.style.top = y+"px";
    c.style.setProperty("--dx",(Math.random()*120-60).toFixed(0)+"px");
    c.style.setProperty("--dy",(-40-Math.random()*60).toFixed(0)+"px");
    c.style.animationDelay = (i*0.03)+"s";
    fx.appendChild(c); setTimeout(()=>c.remove(), 900+i*30);
  }
}
function doTap(cx, cy){
  idleSince = Date.now();
  if(petWrap.classList.contains("sleep")) petWrap.classList.remove("sleep");
  let gain = perTap();
  const pr = petWrap.getBoundingClientRect();
  const centerDist = Math.hypot(cx-(pr.left+pr.width/2), cy-(pr.top+pr.height/2));
  const preciseHit = centerDist < pr.width*0.16;
  const crit = preciseHit || Math.random() < critChance();
  if(crit){ gain *= preciseHit ? 14 : 7; bump("crits",1); }
  earn(gain); S.taps++; bump("taps",1);
  const r = stage.getBoundingClientRect();
  spawnFloat(cx-r.left, cy-r.top, (preciseHit?"SUPER +":crit?"CRIT +":"+")+fmt(gain), crit);
  spawnCoins(cx-r.left, cy-r.top, (frenzyActive() ? 5 : 0) + (crit ? 10 : 2+rnd(4)));
  petWrap.classList.remove("idle");
  petWrap.classList.add("squish");
  setTimeout(()=>{ petWrap.classList.remove("squish"); petWrap.classList.add("idle"); }, 90);
  sfx("click"); vibrate(preciseHit ? 35 : crit ? 22 : 8);
  tickFrenzyGauge();
  if(typeof gainPlayerXP === "function") gainPlayerXP(1);          // Bloc 9/25 : XP de soin
  renderHUD();
}
/* Jauge de frénésie : se remplit en tapant, une fois pleine déclenche 25 s de
   gains multipliés. Réutilise le système de boost existant (banni pour la durée),
   donc aucune économie séparée à maintenir ailleurs. */
const FRENZY_FILL_PER_TAP = 2.6;
const FRENZY_DURATION = 25000;
function frenzyActive(){ return boostActive() && S.boostName === "Frénésie"; }
function frenzyMultBase(){ return S.frenzyTier >= 1 ? 6 : 3; }
function tickFrenzyGauge(){
  if(frenzyActive()) return;                      // deja en fenetre active : la jauge ne bouge plus
  S.frenzyGauge = (S.frenzyGauge||0) + FRENZY_FILL_PER_TAP;
  if(S.frenzyGauge >= 100){
    S.frenzyGauge = 0;
    S.boostMult = frenzyMultBase(); S.boostUntil = Date.now()+FRENZY_DURATION; S.boostName = "Frénésie";
    setCls(app, "frenzyOn", true);
    sfx("big"); vibrate(80);
    toast("Frénésie ! ×"+frenzyMultBase()+" pendant 25 s");
  }
}
function refreshFrenzyBar(){
  const wrap = document.getElementById("frenzyWrap"), bar = document.getElementById("frenzyBar");
  if(!wrap || !bar) return;
  if(frenzyActive()){
    const left = Math.max(0, S.boostUntil - Date.now());
    setCls(wrap, "active", true);
    bar.style.width = (left/FRENZY_DURATION*100)+"%";
  }else{
    setCls(wrap, "active", false);
    bar.style.width = (S.frenzyGauge||0)+"%";
    if(app.classList.contains("frenzyOn")) setCls(app,"frenzyOn",false);
  }
}
stage.addEventListener("pointerdown", e=>{
  if(bubble.contains(e.target)) return;
  doTap(e.clientX, e.clientY);
});

/* ============================================================
   21. AFFICHAGE PRINCIPAL
   ============================================================ */
function renderHUD(){
  setTxt(coinVal, fmt(S.coins));
  setTxt(gemVal, fmt(S.gems));
  const m = globalMult();
  setTxt(cpsLine, fmt(perSec()) + " / sec &nbsp;·&nbsp; ×" + (m<100 ? m.toFixed(1) : fmt(m)) +
    (critChance()>0 ? " &nbsp;·&nbsp; crit " + Math.round(critChance()*100) + "%" : ""));
  setCls($("#prestigeBtn"), "on", true);
}
function renderPet(){
  const p = currentPet();
  paint(petCv, p.id);
  drawCosmOverlay(petCv);
  applyFrame();
  petLabel.textContent = p.name;
  const r = RARITIES[p.rar];
  rarityTag.textContent = r.name;
  rarityTag.style.background = r.col;
  S.dex[p.id] = S.dex[p.id] || 1;
}
function applyFrame(){
  const id = S.equip && S.equip.cadre;
  const c = COSMETICS.find(x=>x.id === id);
  petWrap.style.boxShadow = c ? "0 0 0 4px "+c.color+", 0 0 18px "+c.color : "";
}

/* ============================================================
   22. CONSTRUCTION DES LISTES
   ============================================================ */
function makeRow(o){
  const row = document.createElement("div");
  row.className = "row";
  const th = document.createElement("div"); th.className = "thumb";
  if(o.sprite){ const c = document.createElement("canvas"); paint(c, o.sprite); th.appendChild(c); }
  else { th.textContent = o.emoji||"?"; th.style.fontSize = "20px"; }
  if(o.rar){ const d = document.createElement("i"); d.className = "rarityDot"; d.style.background = RARITIES[o.rar].col; th.appendChild(d); }
  const info = document.createElement("div"); info.className = "rInfo";
  info.innerHTML = '<div class="rName"></div><div class="rSub"></div>';
  const btn = document.createElement("button"); btn.className = "rBtn " + (o.btnClass||"");
  row.append(th, info, btn);
  row._name = info.querySelector(".rName");
  row._sub  = info.querySelector(".rSub");
  row._btn  = btn;
  btn.addEventListener("click", e=>{ e.stopPropagation(); o.onClick(); });
  return row;
}

const R = {animals:[], tap:[], idle:[], off:[], premium:[], warp:[], boost:[], daily:[], quests:[]};

function buildLists(){
  ANIMALS.forEach(a=>{
    const r = makeRow({sprite:a.id, rar:a.rar, onClick:()=>animalClick(a)});
    r._name.textContent = a.name; $("#listAnimals").appendChild(r); R.animals.push({a,r});
  });
  TAP_UPS.forEach(u=>{
    const r = makeRow({emoji:"🍖", onClick:()=>buyUp(u)});
    r._name.textContent = u.name; $("#listTap").appendChild(r); R.tap.push({u,r});
  });
  IDLE_UPS.forEach(u=>{
    const r = makeRow({emoji:"⏱️", btnClass:"mintBtn", onClick:()=>buyUp(u)});
    r._name.textContent = u.name; $("#listIdle").appendChild(r); R.idle.push({u,r});
  });

  /* packs en gemmes (l'extension en pièces est passée dans l'arbre de Renaissance) */
  OFFLINE_GEM_PACKS.forEach(p=>{
    const r = makeRow({emoji:"🌙", btnClass:"gemBtn", onClick:()=>buyOfflinePack(p)});
    r._name.textContent = p.name; $("#listOffline").appendChild(r); R.off.push({type:"gem", p, r});
  });

  PREMIUM.forEach(p=>{
    const r = makeRow({sprite:p.id, rar:p.rar, btnClass:"gemBtn", onClick:()=>premiumClick(p)});
    r._name.textContent = p.name; $("#listPremium").appendChild(r); R.premium.push({p,r});
  });
  TIME_WARP.forEach(w=>{
    const r = makeRow({emoji:"⏩", btnClass:"gemBtn", onClick:()=>buyWarp(w)});
    r._name.textContent = w.name; $("#listWarp").appendChild(r); R.warp.push({w,r});
  });
  BOOSTS.forEach(b=>{
    const r = makeRow({emoji:"🔥", btnClass:"gemBtn", onClick:()=>buyBoost(b)});
    r._name.textContent = b.name; r._sub.textContent = b.desc;
    $("#listBoosts").appendChild(r); R.boost.push({b,r});
  });
  const ad = makeRow({emoji:"📺", btnClass:"mintBtn", onClick:watchAdForGems});
  ad._name.textContent = "Regarder une pub"; ad._sub.textContent = "+50 gemmes";
  ad.id = "adRow"; $("#listBoosts").appendChild(ad);

  const na = makeRow({emoji:"🚫", btnClass:"pawBtn", onClick:buyNoAds});
  na._name.textContent = "Pass Sans Pubs"; na.id = "noAdsRow";
  $("#listPacks").appendChild(na);
  const fz = makeRow({emoji:"⚡", btnClass:"gemBtn", onClick:buyFrenzyUp});
  fz._name.textContent = "Frénésie renforcée"; fz.id = "frenzyRow";
  $("#listPacks").appendChild(fz);
  PACKS.forEach(p=>{
    const r = makeRow({emoji:"💎", btnClass:"gemBtn", onClick:()=>buyPack(p)});
    r._name.textContent = fmt(p.gems)+" gemmes"; r._sub.textContent = "Paiement simulé";
    r._btn.textContent = p.price; $("#listPacks").appendChild(r);
  });

  /* quotidien */
  const dr = makeRow({emoji:"📅", btnClass:"mintBtn", onClick:claimDaily});
  dr._name.textContent = "Récompense du jour"; dr.id = "dailyRow";
  $("#listDaily").appendChild(dr); R.daily.push(dr);

  const cr = makeRow({emoji:"🎟️", btnClass:"pawBtn", onClick:openCodes});
  cr._name.textContent = "Entrer un code"; cr._sub.textContent = "Codes cadeaux Pixel Paw";
  cr._btn.textContent = "OUVRIR"; $("#listCodes").appendChild(cr);

  buildDex();
}

/* ============================================================
   23. PIXELDEX
   ============================================================ */
function buildDex(){
  const g = $("#dexGrid"); g.innerHTML = "";
  ALL_PETS.forEach(p=>{
    const cell = document.createElement("button");
    cell.className = "dexCell";
    const c = document.createElement("canvas"); paint(c, p.id);
    const cnt = document.createElement("span"); cnt.className = "cnt";
    cell.append(c, cnt);
    cell.onclick = ()=>openDexEntry(p);
    g.appendChild(cell);
    cell._cnt = cnt; cell._pet = p;
  });
}
function refreshDex(){
  const cells = $("#dexGrid").children;
  for(const cell of cells){
    const n = S.dex[cell._pet.id]||0;
    setCls(cell, "unknown", n === 0);
    cell.style.borderColor = n ? RARITIES[cell._pet.rar].col : "";
    setTxt(cell._cnt, n ? "×"+n : "");
  }
  setTxt($("#dexTitle"), "PixelDex &nbsp;·&nbsp; " + dexCount() + " / " + ALL_PETS.length);
  setTxt($("#dexBonus"),
    '<div class="row"><div class="thumb">📈</div><div class="rInfo">' +
    '<div class="rName">×' + collectionMult().toFixed(2) + ' de production</div>' +
    '<div class="rSub">+2 %/animal · +0,15 %/créature vue · + bonus par exemplaire</div></div></div>');
}
function openDexEntry(p){
  const known = (S.dex[p.id]||0) > 0;
  const r = RARITIES[p.rar];
  openModal(
    '<h2>' + (known ? p.name : "???") + '</h2>' +
    '<canvas id="dexBig" style="width:96px;height:96px;margin:0 auto 10px' + (known?'':';filter:brightness(0) opacity(.3)') + '"></canvas>' +
    '<div style="font-size:9px;padding:4px 8px;border:2px solid var(--ink);border-radius:8px;display:inline-block;background:'+r.col+';color:#2B2333;margin-bottom:10px">'+r.name+'</div>' +
    '<p>' + (known ? p.desc : "Espèce non découverte.") + '</p>' +
    (known ? '<p>Production : ' + fmt(p.tap) + ' / tape<br>' +
      (p.mult ? "Bonus permanent : ×"+p.mult : "Animal de progression") + '</p>' : '') +
    '<button class="mBtn ghost" id="mNo">Fermer</button>'
  );
  paint($("#dexBig"), p.id);
  $("#mNo").onclick = closeModal;
}

/* Sous-titre d'un animal possédé : sa production par tape. */
function petSub(p){ return fmt(p.tap) + " / tape"; }

/* ============================================================
   24. RAFRAÎCHISSEMENT DES LISTES
   ============================================================ */
function refreshLists(){
  R.animals.forEach(({a,r})=>{
    const own = !!S.owned[a.id], act = S.animal === a.id, cost = animalCost(a);
    setCls(r,"locked",!own); setCls(r,"active",act);
    setTxt(r._sub, own ? petSub(a)+" · "+a.desc : "Verrouillé · "+RARITIES[a.rar].name);
    if(act){ setTxt(r._btn,"ACTIF"); r._btn.className="rBtn owned"; setDis(r._btn,true); }
    else if(own){ setTxt(r._btn,"CHOISIR"); r._btn.className="rBtn mintBtn"; setDis(r._btn,false); }
    else { setTxt(r._btn,"🔓<br>"+fmt(cost)); r._btn.className="rBtn"; setDis(r._btn, S.coins < cost); }
  });
  const upd = (o, suf)=>{
    const lvl = S.up[o.u.id]||0, c = upCost(o.u);
    setTxt(o.r._sub, "Niv. "+lvl+" · +"+fmt(o.u.add)+suf);
    setTxt(o.r._btn, "💰<br>"+fmt(c)); setDis(o.r._btn, S.coins < c);
  };
  R.tap.forEach(o=>upd(o," / tape"));
  R.idle.forEach(o=>upd(o," / sec"));

  R.off.forEach(o=>{
    {
      const own = !!S.offGemPacks[o.p.id], full = offlineCap() >= OFFLINE_MAX;
      setTxt(o.r._sub, own ? ("Déjà acheté · limite actuelle "+fmtTime(offlineCap())) : "+"+fmtTime(o.p.add)+" de stockage");
      if(own){ setTxt(o.r._btn,"OK"); o.r._btn.className="rBtn owned"; setDis(o.r._btn,true); }
      else { setTxt(o.r._btn, full?"MAX":"💎<br>"+fmt(o.p.gems)); setDis(o.r._btn, full || S.gems < o.p.gems); }
    }
  });

  R.premium.forEach(({p,r})=>{
    const own = !!S.premium[p.id], act = S.animal === p.id;
    setCls(r,"active",act);
    setTxt(r._sub, own ? petSub(p)+" · ×"+p.mult : p.desc);
    if(act){ setTxt(r._btn,"ACTIF"); r._btn.className="rBtn owned"; setDis(r._btn,true); }
    else if(own){ setTxt(r._btn,"CHOISIR"); r._btn.className="rBtn mintBtn"; setDis(r._btn,false); }
    else { setTxt(r._btn,"💎<br>"+fmt(p.gems)); r._btn.className="rBtn gemBtn"; setDis(r._btn, S.gems < p.gems); }
  });
  R.warp.forEach(({w,r})=>{
    setTxt(r._sub, "+"+fmt(perSec(false)*w.secs)+" pièces d'un coup");
    setTxt(r._btn,"💎<br>"+fmt(w.gems)); setDis(r._btn, S.gems < w.gems || perSec(false) <= 0);
  });
  R.boost.forEach(({b,r})=>{
    setTxt(r._btn,"💎<br>"+fmt(b.gems)); setDis(r._btn, S.gems < b.gems || boostActive());
  });

  const adRow = $("#adRow");
  if(adRow){
    const left = Math.ceil((S.adReadyAt - Date.now())/1000);
    setTxt(adRow._sub, S.noAds ? "+50 gemmes · sans pub" : "+50 gemmes");
    if(left > 0){ setTxt(adRow._btn, left+"S"); setDis(adRow._btn,true); }
    else { setTxt(adRow._btn,"REGARDER"); setDis(adRow._btn,false); }
  }
  const naRow = $("#noAdsRow");
  if(naRow){
    setTxt(naRow._sub, S.noAds ? "Actif · récompenses instantanées" : "Toutes les pubs deviennent instantanées");
    if(S.noAds){ setTxt(naRow._btn,"ACTIF"); naRow._btn.className="rBtn owned"; setDis(naRow._btn,true); }
    else { setTxt(naRow._btn,"💎<br>"+fmt(NOADS_GEMS)); setDis(naRow._btn, S.gems < NOADS_GEMS); }
  }
  const fzRow = $("#frenzyRow");
  if(fzRow){
    setTxt(fzRow._sub, (S.frenzyTier>=1?"Actif · ":"")+"×"+frenzyMultBase()+" pendant la Frénésie (jauge sous les pièces/sec)");
    if(S.frenzyTier >= 1){ setTxt(fzRow._btn,"ACTIF"); fzRow._btn.className="rBtn owned"; setDis(fzRow._btn,true); }
    else { setTxt(fzRow._btn,"💎<br>"+fmt(FRENZY_UP_GEMS)); setDis(fzRow._btn, S.gems < FRENZY_UP_GEMS); }
  }

  refreshDaily(); refreshQuests(); refreshDex(); refreshLab(); refreshLineDex(); refreshDots();
  refreshAchv(); refreshProfile(); refreshWheel();
  refreshAnimalUps(); refreshProps(); refreshStreak(); refreshRebirthTiers();
}
function refreshDots(){
  setCls($("#dot-animals"),"on", R.animals.some(({a})=>!S.owned[a.id] && S.coins >= animalCost(a)));
  setCls($("#dot-upgrades"),"on", ALL_UPS.some(u=>S.coins >= upCost(u)));
  setCls($("#dot-shop"),"on", PREMIUM.some(p=>!S.premium[p.id] && S.gems >= p.gems) || Date.now() >= S.adReadyAt);
  setCls($("#dot-daily"),"on", S.dailyLast !== today() || S.quests.some(q=>!q.done && (S.qstat[q.stat]||0) >= q.target));
  setCls($("#dot-dex"),"on", false);
}

/* ============================================================
   25. ACTIONS
   ============================================================ */
function discover(id){
  const first = !S.dex[id];
  S.dex[id] = (S.dex[id]||0) + 1;
  if(first){ sfx("evo"); popRarity(); }
  return first;
}
function popRarity(){
  const el = document.getElementById("petName");
  el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
}
function animalClick(a){
  if(S.owned[a.id]){ S.animal = a.id; renderPet(); sfx("buy"); toast(a.name+" est sur le terrain"); }
  else{
    const cost = animalCost(a);
    if(S.coins < cost) return;
    S.coins -= cost; S.owned[a.id] = true; S.animal = a.id;
    discover(a.id); renderPet(); vibrate(40);
    toast(a.name+" débloqué !");
    if(typeof gainPlayerXP === "function") gainPlayerXP(25);       // Bloc 9/25 : XP de découverte
  }
  save(); renderHUD(); refreshLists();
}
function buyUp(u){
  const c = upCost(u);
  if(S.coins < c) return;
  S.coins -= c; S.up[u.id] = (S.up[u.id]||0)+1;
  bump("buys",1); sfx("buy"); vibrate(6);
  if(typeof gainPlayerXP === "function") gainPlayerXP(3);          // Bloc 9/25 : XP d'amélioration
  save(); renderHUD(); refreshLists();
}
function premiumClick(p){
  if(S.premium[p.id]){ S.animal = p.id; renderPet(); toast(p.name+" est sur le terrain"); }
  else{
    if(S.gems < p.gems) return;
    S.gems -= p.gems; S.premium[p.id] = true; S.animal = p.id;
    discover(p.id); renderPet(); sfx("big"); vibrate(60);
    toast(p.name+" · ×"+p.mult+" pour toujours !");
    if(typeof gainPlayerXP === "function") gainPlayerXP(40);       // Bloc 9/25 : XP de découverte premium
  }
  save(); renderHUD(); refreshLists();
}
function buyBoost(b){
  if(S.gems < b.gems || boostActive()) return;
  S.gems -= b.gems; S.boostMult = b.mult; S.boostUntil = Date.now()+b.secs*1000; S.boostName = b.name;
  sfx("good"); toast(b.name+" activé"); save(); renderHUD(); refreshLists();
}
function buyWarp(w){
  if(S.gems < w.gems) return;
  const gain = perSec(false)*w.secs;
  if(gain <= 0){ toast("Achète d'abord du revenu passif"); return; }
  S.gems -= w.gems; earn(gain); sfx("big"); vibrate(40);
  toast("+"+fmt(gain)+" pièces"); save(); renderHUD(); refreshLists();
}
function buyOfflinePack(p){
  if(S.offGemPacks[p.id] || S.gems < p.gems || offlineCap() >= OFFLINE_MAX) return;
  S.gems -= p.gems; S.offGemPacks[p.id] = true; sfx("good");
  toast("Hors-ligne : "+fmtTime(offlineCap())); save(); renderHUD(); refreshLists();
}
function buyNoAds(){
  if(S.noAds || S.gems < NOADS_GEMS) return;
  S.gems -= NOADS_GEMS; S.noAds = true; sfx("big");
  toast("Pass Sans Pubs actif"); save(); renderHUD(); refreshLists();
}
const FRENZY_UP_GEMS = 350;
function buyFrenzyUp(){
  if(S.frenzyTier >= 1 || S.gems < FRENZY_UP_GEMS) return;
  S.gems -= FRENZY_UP_GEMS; S.frenzyTier = 1; sfx("big"); vibrate(50);
  toast("Frénésie renforcée : ×6 au lieu de ×3"); save(); renderHUD(); refreshLists();
}
function buyPack(p){
  const url = PACK_LINKS[p.id];
  if(!url) return;
  location.href = url;
}
function watchAdForGems(){
  if(Date.now() < S.adReadyAt) return;
  triggerRewardedAd(()=>{
    S.gems += 50; S.adReadyAt = Date.now()+AD_COOLDOWN*1000; bump("ads",1);
    sfx("good"); toast("+50 gemmes"); save(); renderHUD(); refreshLists();
  }, "Récompense : 50 gemmes");
}

/* ============================================================
   26. CODES CADEAUX
   ============================================================ */
function openCodes(){
  openModal(
    '<h2>Codes cadeaux</h2><p>Chaque code ne fonctionne qu\'une fois.</p>' +
    '<input class="mInput" id="codeIn" placeholder="TON CODE" autocomplete="off">' +
    '<button class="mBtn" id="mOk">Valider</button><button class="mBtn ghost" id="mNo">Fermer</button>'
  );
  $("#mNo").onclick = closeModal;
  $("#mOk").onclick = ()=>{
    const v = ($("#codeIn").value||"").trim().toUpperCase();
    const c = CODES[v];
    if(!c){ toast("Code invalide"); return; }
    if(S.codes[v]){ toast("Code déjà utilisé"); return; }
    S.codes[v] = true;
    if(c.gems) S.gems += c.gems;
    if(c.coins) earn(c.coins);
    if(c.boost){ S.boostMult = c.boost.mult; S.boostUntil = Date.now()+c.boost.secs*1000; S.boostName = "Code "+v; }
    closeModal(); sfx("big"); vibrate(50);
    toast(c.label); save(); renderHUD(); refreshLists();
  };
}

/* ============================================================
   27. QUOTIDIEN — calendrier + quêtes
   ============================================================ */
function today(){ return new Date().toDateString(); }
function bump(stat, n){
  S.qstat[stat] = (S.qstat[stat]||0) + n;
  S.wqstat = S.wqstat || {}; S.wqstat[stat] = (S.wqstat[stat]||0) + n;   // Bloc 4/25 : compteur hebdo en parallèle
}

function rollQuests(){
  S.questDate = today(); S.qstat = {}; S.quests = [];
  const pool = QUEST_POOL.slice();
  for(let i=0;i<3 && pool.length;i++){
    const q = pool.splice(rnd(pool.length),1)[0];
    const target = q.scale ? Math.max(1000, Math.floor(perSec(false)*600) || 5000) : q.gen();
    S.quests.push({id:q.id, name:q.name, stat:q.stat, gems:q.gems, target, done:false});
  }
}
function refreshQuests(){
  if(S.questDate !== today()) rollQuests();
  const box = $("#listQuests");
  const key = S.questDate + "|" + S.quests.map(q=>q.id+q.target).join(",");
  if(box._key !== key){
    box._key = key;
    box.innerHTML = "";
    R.quests = S.quests.map((q,i)=>{
      const r = makeRow({emoji:"🎯", btnClass:"mintBtn", onClick:()=>claimQuest(i)});
      r._name.textContent = q.name.replace("{n}", fmt(q.target));
      box.appendChild(r); return r;
    });
  }
  S.quests.forEach((q,i)=>{
    const r = R.quests[i]; if(!r) return;
    const cur = Math.min(q.target, S.qstat[q.stat]||0);
    setTxt(r._sub, q.done ? "Terminée" : fmt(cur)+" / "+fmt(q.target));
    if(q.done){ setTxt(r._btn,"✔"); r._btn.className="rBtn owned"; r._btn.style.fontSize="16px"; setDis(r._btn,true); }
    else { setTxt(r._btn,"💎<br>"+q.gems); r._btn.className="rBtn mintBtn"; setDis(r._btn, cur < q.target); }
  });
}
function claimQuest(i){
  const q = S.quests[i];
  if(!q || q.done || (S.qstat[q.stat]||0) < q.target) return;
  q.done = true; S.gems += q.gems; S.fc = (S.fc||0)+3; sfx("good"); vibrate(30);
  toast("+"+q.gems+" gemmes · +3 🧪"); save(); renderHUD(); refreshLists();
}
function refreshDaily(){
  const r = R.daily[0]; if(!r) return;
  const ready = S.dailyLast !== today();
  const day = Math.min(7, (S.dailyDay % 7) + 1);
  const rw = DAILY[day-1];
  setTxt(r._sub, "Jour "+day+" / 7 · "+rw.label);
  if(ready){ setTxt(r._btn,"OUVRIR"); setDis(r._btn,false); }
  else { setTxt(r._btn,"DEMAIN"); setDis(r._btn,true); }
}
function claimDaily(){
  if(S.dailyLast === today()) return;
  const day = Math.min(7, (S.dailyDay % 7) + 1);
  const rw = DAILY[day-1];
  let msg = [];
  if(rw.gems){ S.gems += rw.gems; msg.push("+"+rw.gems+" 💎"); }
  if(rw.coinsMin){ const g = perSec(false)*rw.coinsMin; earn(g); msg.push("+"+fmt(g)+" 💰"); }
  if(rw.boost){ S.boostMult = rw.boost.mult; S.boostUntil = Date.now()+rw.boost.secs*1000; S.boostName = "Bonus du jour"; msg.push("Boost ×"+rw.boost.mult); }
  S.dailyDay++; S.dailyLast = today();
  sfx("big"); vibrate(40);
  openModal('<h2>Jour '+day+'</h2><div class="big">'+(msg.join("<br>")||"Récompense")+'</div><button class="mBtn" id="mOk">Super</button>');
  $("#mOk").onclick = closeModal;
  save(); renderHUD(); refreshLists();
}

/* ============================================================
   28. RENAISSANCE (PRESTIGE)
   ============================================================ */
function pawGain(){
  if(S.totalEarned < PRESTIGE_MIN) return 0;
  return Math.max(1, Math.floor(20 * Math.sqrt(S.totalEarned / 4e13)));
}
function openPrestige(){
  const g = pawGain();
  let tree = "";
  PRESTIGE_UPS.forEach(p=>{
    const lvl = pLvl(p.id), c = prestCost(p), max = lvl >= p.max;
    tree += '<div class="row"><div class="thumb">👑</div><div class="rInfo">' +
      '<div class="rName">'+p.name+' · niv. '+lvl+'</div><div class="rSub">'+p.desc+'</div></div>' +
      '<button class="rBtn pawBtn" data-p="'+p.id+'"'+((max||S.pawPoints<c)?" disabled":"")+'>' +
      (max ? "MAX" : "🐾<br>"+fmt(c)) + '</button></div>';
  });
  openModal(
    '<h2>Renaissance</h2>' +
    '<canvas id="pawBig" style="width:56px;height:56px;margin:0 auto 8px"></canvas>' +
    '<div class="big">'+fmt(S.pawPoints)+' Pattes Célestes</div>' +
    '<p>Renaissances : '+S.rebirths+'<br>Cumul : '+fmt(S.totalEarned)+' pièces</p>' +
    tree +
    (g > 0
      ? '<button class="mBtn" id="mReb">Renaître · +'+fmt(g)+' 🐾</button>'
      : '<button class="mBtn" disabled>Requiert '+fmt(PRESTIGE_MIN)+' pièces cumulées</button>') +
    '<p style="margin-top:10px">Perdu : pièces, animaux classiques, améliorations.<br>Gardé : gemmes, races premium, pass, arbre de Renaissance, PixelDex, limites hors-ligne.</p>' +
    '<button class="mBtn ghost" id="mNo">Fermer</button>'
  );
  paint($("#pawBig"),"paw");
  $("#mNo").onclick = closeModal;
  modal.querySelectorAll("[data-p]").forEach(b=>{
    b.onclick = ()=>{
      const p = PRESTIGE_UPS.find(x=>x.id === b.dataset.p);
      const c = prestCost(p);
      if(pLvl(p.id) >= p.max || S.pawPoints < c) return;
      S.pawPoints -= c; S.prest[p.id] = pLvl(p.id)+1;
      const scroll = modal.scrollTop;
      sfx("good"); save(); renderHUD(); refreshLists(); openPrestige();
      modal.scrollTop = scroll;
    };
  });
  const reb = $("#mReb");
  if(reb) reb.onclick = ()=>{
    openModal('<h2>Confirmer</h2><p>Tu repars de zéro et gagnes '+fmt(g)+' Pattes Célestes.</p>' +
      '<button class="mBtn" id="mY">Renaître</button><button class="mBtn ghost" id="mN">Annuler</button>');
    $("#mN").onclick = openPrestige;
    $("#mY").onclick = doPrestige;
  };
}
function doPrestige(){
  const g = pawGain(); if(g <= 0) return;
  S.pawPoints += g; S.rebirths++;
  /* CORRECTIF v2.5 : ne survivent que les gemmes et ce qui est payé en gemmes
     (races premium, cosmétiques, pass, extensions hors-ligne en gemmes) —
     tout le reste repart à zéro, y compris le labo de fusion. */
  S.coins = 1e3 * Math.pow(6, pLvl("g5"));      // Départ rapide
  S.owned = {cochon:true};
  if(!S.owned[S.animal] && !S.premium[S.animal]) S.animal = "cochon";
  S.up = {}; S.aup = {}; S.rup = {};
  S.inv = {}; S.seen = {}; S.dex = {cochon:1}; S.fc = 0;
  S.boostUntil = 0; S.boostMult = 1; S.totalEarned = 0;
  ensureTierCache();
  closeModal(); sfx("big"); vibrate(120);
  flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
  renderPet(); save(); renderHUD(); refreshLists(); celebrate();
  toast("Renaissance ! +"+fmt(g)+" Pattes Célestes");
}

/* ============================================================
   29. OPTIONS
   ============================================================ */
/* Historique bref, affiché dans les options. Ajoute une entrée en tête à chaque lot. */
const CHANGELOG = [
  {v:"3.3.2", lines:["Correctif : l'animal s'affiche bien dès l'ouverture (plus besoin de changer d'animal)","Œufs payables en Pièces de Fusion OU en gemmes, 4e palier (Mythique), récompense du mini-jeu augmentée"]},
  {v:"3.3.1", lines:["Tap Précis (Super Critique au centre), Oiseau de Nuit, piste secrète, Maître Éleveur"]},
  {v:"3.3.0", lines:["Jauge de Frénésie : se remplit en tapant, 25s de gains ×3 (×6 avec l'amélioration en gemmes)"]},
  {v:"3.2.0", lines:["Rééquilibrage : animaux ×3 à ×11 selon le palier (facile au début, dur à la fin)","Améliorations : croissance qui s'accélère aux niveaux 50 et 100, comme un vrai mur"]},
  {v:"3.1.2", lines:["Esprit de Meute (+chiens possédés), Zoo Complet (×2 si une rareté de chaque), 2 cadres cosmétiques"]},
  {v:"3.1.1", lines:["Clicker Fou (+crit selon le total de tapes), trickle FC/gemmes ambiant, 3 nouveaux succès"]},
  {v:"3.1.0", lines:["Biome Ferme : 10 nouveaux animaux premium, silhouettes propres (pas des recolorations)","3 effets uniques : Cochon Tirelire (+tape), Vache Laitière (passif dédié), Chien de Berger (synergie Ferme)"]},
  {v:"3.0.2", lines:["Arbre de Renaissance bien plus cher : coûts de base et croissance fortement augmentés"]},
  {v:"3.0.1", lines:["Salutation en bulle sur l'animal (5s) au lieu d'un texte sur l'accueil","Nouveautés : la modale s'affiche bien par-dessus l'écran d'accueil"]},
  {v:"3.0.0", lines:["Nouvel écran d'accueil : chargement, fond animaux, salutations, journal des nouveautés"]},
  {v:"2.9.4", lines:["Roue : les logos des lots apparaissent sur la roue elle-même","Renaissance : la liste ne remonte plus en haut après un achat"]},
  {v:"2.9.3", lines:["Le menu reste ouvert à chaque lancement, le replier ne dure que la session en cours"]},
  {v:"2.9.2", lines:["Le nom de l'animal disparaît aussi avec l'étiquette de rareté, pas juste elle seule"]},
  {v:"2.9.1", lines:["Roue de la chance : bouton ⓘ affichant les vrais % et effets de chaque lot"]},
  {v:"2.9.0", lines:["Cochon remplace Poussin au départ · Cochon Doré (premium) renommé pour éviter le doublon","Renaissance : garde l'animal actif s'il est encore possédé · étiquette de rareté animée"]},
  {v:"2.8.0", lines:["Vrais paiements PayPal branchés · gemmes créditées automatiquement au retour"]},
  {v:"2.7.1", lines:["Hors-ligne rééquilibré : 12h max via Pattes Célestes, 12h max via 4 packs en gemmes"]},
  {v:"2.7.0", lines:["Hors-ligne : plafond porté à 24h (base + Renaissance + gemmes)","Série de connexion quotidienne avec succès à 7/14/30 jours"]},
  {v:"2.6.1", lines:["Extension hors-ligne : passe des pièces (perdue à chaque Renaissance) à l'arbre permanent"]},
  {v:"2.6.0", lines:["Cochon, Lama, Singe : 3 nouveaux animaux premium","Renaissance rééquilibrée pour une vraie partie longue (20T) · bouton toujours visible"]},
  {v:"2.5.0", lines:["Paliers de Renaissance (jusqu'à 150), PWA installable (manifest + icônes + hors-ligne)","Renaissance : ne garde vraiment que gemmes et achats en gemmes"]},
  {v:"2.4.0", lines:["Arborescence d'améliorations par animal (18) avec objets visibles à l'écran"]},
  {v:"2.3.0", lines:["Succès + profil, roue de la chance, cosmétiques, animations de vie","Thèmes : boutons désactivés lisibles partout · Renaissance rééquilibrée"]},
  {v:"2.2.1", lines:["Grands nombres réels (Quadrillion...) · Renaissance testable plus tôt"]},
  {v:"2.2.0", lines:["Quêtes cochées ✔ · thèmes retouchés · plusieurs musiques"]},
  {v:"2.1.0", lines:["50 lignées (200 créatures), Laboratoire de Fusion, mini-jeu"]},
  {v:"2.0.0", lines:["Starter, Renaissance, codes cadeaux, hors-ligne amélioré, thèmes"]}
];
function openSettings(){
  const themes = [["pastel","Pastel"],["dark","Dark Pixel"],["gameboy","GameBoy"],["cyber","Cyberpunk"]];
  let tHtml = '<div class="themeGrid">';
  themes.forEach(([k,n])=>{ tHtml += '<button class="themeBtn'+(S.theme===k?" on":"")+'" data-th="'+k+'">'+n+'</button>'; });
  tHtml += '</div>';
  let sHtml = '<div class="themeGrid" style="grid-template-columns:repeat(3,1fr)">';
  Object.keys(CLICK_SOUNDS).forEach(k=>{ sHtml += '<button class="themeBtn'+(S.clickSound===k?" on":"")+'" data-snd="'+k+'">'+CLICK_SOUNDS[k].name+'</button>'; });
  sHtml += '</div>';
  let bgmHtml = '<div class="themeGrid" style="grid-template-columns:repeat(2,1fr)">';
  Object.keys(BGM_TRACKS).forEach(k=>{
    const t = BGM_TRACKS[k], locked = t.locked && !(S.achv && S.achv[t.locked]);
    bgmHtml += '<button class="themeBtn'+(S.bgmTrack===k?" on":"")+'" data-bgm="'+k+'"'+(locked?' disabled style="opacity:.45"':'')+'>'+(locked?"🔒 ???":t.name)+'</button>';
  });
  bgmHtml += '</div>';
  let clHtml = '<div style="text-align:left;font-size:8px;color:var(--ink-soft);line-height:1.9;margin:8px 0 4px">';
  CHANGELOG.slice(0,2).forEach(c=>{ clHtml += '<b style="color:var(--ink)">v'+c.v+'</b> — '+c.lines.join(" · ")+'<br>'; });
  clHtml += '</div>';
  openModal(
    '<h2>Options · v'+VERSION+'</h2>' + clHtml +
    '<div class="sLabel"><span>Musique</span><span id="lb">'+S.volBgm+'%</span></div>' +
    '<input class="slider" type="range" min="0" max="100" value="'+S.volBgm+'" id="sBgm">' +
    '<div class="sLabel"><span>Effets</span><span id="ls">'+S.volSfx+'%</span></div>' +
    '<input class="slider" type="range" min="0" max="100" value="'+S.volSfx+'" id="sSfx">' +
    '<div class="sLabel"><span>Vibrations</span><span id="lv">'+S.volVib+'%</span></div>' +
    '<input class="slider" type="range" min="0" max="100" value="'+S.volVib+'" id="sVib">' +
    '<div class="sLabel" style="margin-bottom:6px"><span>Piste musicale</span><span></span></div>' + bgmHtml +
    '<div class="sLabel" style="margin-bottom:6px"><span>Son de clic</span><span></span></div>' + sHtml +
    '<div class="sLabel" style="margin-bottom:6px"><span>Thème</span><span></span></div>' + tHtml +
    '<button class="mBtn ghost" id="mNotif">'+(S.notifs?"Rappels : activés":"Activer les rappels")+'</button>' +
    '<button class="mBtn ghost" id="mWipe">Effacer la sauvegarde</button>' +
    '<button class="mBtn" id="mNo">Fermer</button>'
  );
  const bind = (id, key, lab)=>{
    const el = $("#"+id);
    el.oninput = ()=>{
      S[key] = +el.value; $("#"+lab).textContent = S[key]+"%";
      if(key === "volBgm") restartBgm();
      if(key === "volSfx") sfx("click");
      if(key === "volVib") vibrate(20);
      save();
    };
  };
  bind("sBgm","volBgm","lb"); bind("sSfx","volSfx","ls"); bind("sVib","volVib","lv");
  modal.querySelectorAll("[data-th]").forEach(b=>b.onclick = ()=>{ S.theme = b.dataset.th; applyTheme(); save(); openSettings(); });
  modal.querySelectorAll("[data-snd]").forEach(b=>b.onclick = ()=>{ S.clickSound = b.dataset.snd; sfx("click"); save(); openSettings(); });
  modal.querySelectorAll("[data-bgm]").forEach(b=>b.onclick = ()=>{
    if(b.disabled) return;
    S.bgmTrack = b.dataset.bgm; restartBgm(); save(); openSettings();
  });
  $("#mNotif").onclick = askNotifs;
  $("#mNo").onclick = closeModal;
  $("#mWipe").onclick = ()=>{
    openModal('<h2>Tout effacer ?</h2><p>Progression, gemmes et achats seront perdus. Irréversible.</p>' +
      '<button class="mBtn" id="mY">Effacer</button><button class="mBtn ghost" id="mN">Annuler</button>');
    $("#mN").onclick = openSettings;
    $("#mY").onclick = ()=>{ store.del(SAVE_KEY); store.del(OLD_KEY); location.reload(); };
  };
}
$("#gearBtn").addEventListener("click", ()=>{ sfx("tab"); openSettings(); });
$("#prestigeBtn").addEventListener("click", ()=>{ sfx("tab"); openPrestige(); });

/* ============================================================
   30. MODE ZEN — panneau réductible, plein écran
   ============================================================ */
function setZen(on){
  setCls(app,"zen",on); S.zen = on; save();
  if(!on) sfx("tab");
}
$("#panelClose").addEventListener("click", ()=>setZen(true));
$("#reopen").addEventListener("click", ()=>setZen(false));
/* double-tape sur la scène = plein écran (une simple tape reste une tape utile) */
let lastTapAt = 0;
stage.addEventListener("pointerup", e=>{
  if(e.target !== stage){ lastTapAt = 0; return; }
  const n = Date.now();
  if(n - lastTapAt < 320 && !app.classList.contains("zen")) setZen(true);
  lastTapAt = n;
});

/* ============================================================
   31. BULLE BONUS + BANNIÈRE
   ============================================================ */
bubble.addEventListener("click", e=>{
  e.stopPropagation();
  bubble.classList.remove("on");
  S.nextBubble = Date.now()+BUBBLE_EVERY*1000;
  watchAdForGems();
});
function tickBubble(){
  if(!bubble.classList.contains("on") && Date.now() >= S.nextBubble && Date.now() >= S.adReadyAt){
    bubble.classList.add("on");
    setTimeout(()=>{
      if(bubble.classList.contains("on")){
        bubble.classList.remove("on");
        S.nextBubble = Date.now()+BUBBLE_EVERY*1000;
      }
    }, 12000);
  }
}
const PROMOS = [
  {txt:"Pass Sans Pubs · toutes les récompenses instantanées", tab:"shop"},
  {txt:"Avance rapide · 12 h de production d'un coup", tab:"shop"},
  {txt:"Code cadeau : BIENVENUE", tab:"daily"},
  {txt:"Quêtes du jour à récupérer", tab:"daily"}
];
let promoIdx = 0;
function tickBanner(){
  if(boostActive()){
    setCls(bannerEl,"boost",true);
    setTxt(bannerTxt, "🔥 "+S.boostName+" · "+Math.ceil((S.boostUntil-Date.now())/1000)+" s");
    bannerBtn.style.visibility = "hidden";
    return;
  }
  setCls(bannerEl,"boost",false);
  bannerBtn.style.visibility = "visible";
  setTxt(bannerTxt, PROMOS[promoIdx].txt);
}
setInterval(()=>{ promoIdx = (promoIdx+1)%PROMOS.length; }, 7000);
bannerBtn.addEventListener("click", ()=>switchTab(PROMOS[promoIdx].tab));

/* ============================================================
   32. ONGLETS
   ============================================================ */
function switchTab(name){
  document.querySelectorAll(".tab").forEach(t=>setCls(t,"on", t.dataset.tab === name));
  document.querySelectorAll(".tabView").forEach(v=>setCls(v,"on", v.id === "view-"+name));
  $("#panel").scrollTop = 0;
  if(app.classList.contains("zen")) setZen(false);
  sfx("tab");
}
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click", ()=>switchTab(t.dataset.tab)));

/* ============================================================
   33. BOUCLES + REPRISE
   CORRECTIF v2 : la v1 plafonnait dt à 1 s et ne recalculait rien au
   retour d'arrière-plan — 30 min en tâche de fond = 0 pièce gagnée.
   ============================================================ */
let lastTick = Date.now();
function loop(){
  const now = Date.now();
  const dt = Math.min(2, (now-lastTick)/1000);
  lastTick = now;
  if(dt > 0) earn(perSec()*dt);
  /* Laboratoire Autonome + Ferme à Gemmes : trickle ambiant minime, pas une amélioration
     achetable — juste un petit plus qui tourne en fond, montants volontairement infimes. */
  S.fcAccum = (S.fcAccum||0) + dt;
  if(S.fcAccum >= 3600){ S.fc = (S.fc||0) + Math.floor(S.fcAccum/3600); S.fcAccum %= 3600; }
  S.gemAccum = (S.gemAccum||0) + dt;
  if(S.gemAccum >= 14400){ S.gems += Math.floor(S.gemAccum/14400); S.gemAccum %= 14400; }
  renderHUD(); tickBanner(); tickBubble(); refreshFrenzyBar();
}
function resume(){
  lastTick = Date.now();
  const away = (Date.now() - (S.lastSeen||Date.now()))/1000;
  if(away < 45) return;                       // courte absence : rien à rattraper
  grantOffline(away);
}
function grantOffline(awaySec){
  const capped = Math.min(offlineCap(), awaySec);
  const base = Math.floor(perSec(false) * capped * offlineRate());
  if(base <= 0) return;
  earn(base);
  const hitCap = awaySec > offlineCap();
  openModal(
    '<h2>Tes animaux ont bossé</h2>' +
    '<p>Absence : '+fmtTime(awaySec)+'<br>Comptabilisé : '+fmtTime(capped)+
      (hitCap ? '<br>Limite atteinte — étends-la dans Améliorations.' : '')+'</p>' +
    '<div class="big">+'+fmt(base)+' 💰</div>' +
    '<button class="mBtn" id="mX2">Doubler · '+(S.noAds?"instantané":"pub")+'</button>' +
    '<button class="mBtn gemBtn" id="mG2">Doubler · 20 💎</button>' +
    '<button class="mBtn ghost" id="mOk">Récupérer</button>'
  );
  const dbl = ()=>{ earn(base); sfx("big"); toast("+"+fmt(base)+" pièces"); closeModal(); save(); renderHUD(); refreshLists(); };
  $("#mOk").onclick = ()=>{ closeModal(); save(); };
  $("#mX2").onclick = ()=> triggerRewardedAd(dbl, "Récompense : doubler tes gains hors-ligne");
  $("#mG2").onclick = ()=>{ if(S.gems < 20){ toast("Pas assez de gemmes"); return; } S.gems -= 20; dbl(); };
}
setInterval(loop, 100);
setInterval(refreshLists, 400);
setInterval(save, 5000);
document.addEventListener("visibilitychange", ()=>{
  if(document.hidden){ save(); stopBgm(); }
  else { resume(); if(S.volBgm > 0) startBgm(); }
});
window.addEventListener("pagehide", save);

/* ============================================================
   34. ÉCRAN DE CHOIX DU STARTER
   ============================================================ */
function showStarter(){
  const row = $("#starterRow"); row.innerHTML = "";
  STARTERS.forEach(s=>{
    const card = document.createElement("button");
    card.className = "starterCard";
    const c = document.createElement("canvas"); paint(c, s.sprite);
    const n = document.createElement("div"); n.className = "sn"; n.textContent = s.name;
    const b = document.createElement("div"); b.className = "sb"; b.textContent = s.bonus;
    card.append(c,n,b);
    card.onclick = ()=>{
      if(S.starter) return;
      S.starter = s.key === "coin" ? "chat" : s.key === "speed" ? "chien" : "lapin";
      card.classList.add("chosen"); sfx("evo"); vibrate(80);
      setTimeout(()=>{
        flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
        setTimeout(()=>{
          $("#starter").classList.remove("on");
          toast(s.name+" · "+s.bonus+" pour toujours");
          save(); renderHUD(); refreshLists();
        }, 300);
      }, 620);
    };
    row.appendChild(card);
  });
  $("#starter").classList.add("on");
}



/* ============================================================
   LOT 2 — 36. LIGNÉES, PALETTES PROCÉDURALES ET ACCESSOIRES
   50 lignées × 4 évolutions = 200 créatures.
   Les sprites ne sont pas dessinés 200 fois : chaque lignée réutilise
   une des 15 formes de base, recolorée par rôle (corps / ombre /
   clair / accent) puis complétée par des calques d'accessoires selon
   le stade d'évolution.
   ============================================================ */

/* Quel caractère du sprite correspond à quel rôle de couleur.
   Les lettres absentes d'ici (yeux, truffe) gardent leur couleur d'origine. */
const ROLES = {
  poussin:{b:"y",d:"d",l:"w",a:"o"},   hamster:{b:"h",d:"d",l:"l",a:"p"},
  lapin:{b:"g",d:"d",l:"l",a:"p"},     perruche:{b:"b",d:"t",l:"c",a:"y"},
  chat:{b:"c",d:"d",l:"l",a:"p"},      corgi:{b:"n",d:"d",l:"l"},
  capybara:{b:"b",d:"d",l:"l"},        panda:{b:"w",d:"k",l:"g",a:"p"},
  dragon:{b:"d",d:"k",l:"l",a:"o"},    siamois:{b:"c",d:"d",a:"p"},
  mainecoon:{b:"m",d:"d",l:"l",a:"g"}, sphynx:{b:"s",d:"d",l:"l",a:"b"},
  shiba:{b:"n",d:"d",l:"l"},           bouledogue:{b:"f",d:"d",l:"l",a:"p"},
  berger:{b:"t",d:"d",l:"l"}
};

/* --- accessoires : calques 16x16 posés par-dessus la créature --- */
const ACC = {
  crown:{px:[
  "....A.A..A.A....","....AAAAAAAA....",".....AAAAAA.....","................",
  "................","................","................","................",
  "................","................","................","................",
  "................","................","................","................"]},
  halo:{px:[
  ".....AAAAAA.....","....A......A....",".....AAAAAA.....","................",
  "................","................","................","................",
  "................","................","................","................",
  "................","................","................","................"]},
  cap:{px:[
  "................",".....AAAAAA.....","....AAAAAAAA....","...AAAAAAAAAAAA.",
  "................","................","................","................",
  "................","................","................","................",
  "................","................","................","................"]},
  horns:{px:[
  "...A........A...","...AA......AA...","....A......A....","................",
  "................","................","................","................",
  "................","................","................","................",
  "................","................","................","................"]},
  glasses:{px:[
  "................","................","................","................",
  "................","..AAAAAAAAAAAA..","..AAA.AAAA.AAA..","................",
  "................","................","................","................",
  "................","................","................","................"]},
  bow:{px:[
  "................","................","................","................",
  "................","................","................","................",
  "................","................","................","....AA....AA....",
  "...AAA.AA.AAA...","....AA....AA....","................","................"]},
  scarf:{px:[
  "................","................","................","................",
  "................","................","................","................",
  "................","................","...AAAAAAAAAA...","...AAAAAAAAAA...",
  ".....AA.........","................","................","................"]},
  wings:{px:[
  "................","................","................","................",
  "A..............A","AA............AA","AAA..........AAA","AAAA........AAAA",
  "AAA..........AAA","AA............AA","A..............A","................",
  "................","................","................","................"]}
};

/* --- outils couleur --- */
function h2r(h){ h=h.replace("#",""); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function r2h(r,g,b){ const c=v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0"); return "#"+c(r)+c(g)+c(b); }
function mix(a,b,t){ const A=h2r(a),B=h2r(b); return r2h(A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t); }
function shade(hex,amt){ const c=h2r(hex); return r2h(c[0]+255*amt, c[1]+255*amt, c[2]+255*amt); }

/* Palette d'un stade : la créature s'éclaircit, se dore, puis prend
   la couleur de sa rareté finale. Une seule couleur suffit par lignée. */
function stagePal(base, stage, rarCol){
  let b = base;
  if(stage === 1) b = mix(base, "#FFFFFF", .14);
  if(stage === 2) b = mix(base, "#FFC94A", .34);
  if(stage === 3) b = mix(base, rarCol, .48);
  return {
    b, d: shade(b,-.20), l: shade(b,.30),
    a: stage >= 2 ? (stage === 3 ? rarCol : "#FFC94A") : shade(b,-.06)
  };
}
const ACC_BY_STAGE = ["", "", "crown", "wings"];
/* Petit accessoire de stade 1, varié selon la lignée pour éviter la monotonie */
const ACC1 = ["bow","cap","glasses","scarf","horns","halo"];

/* --- 50 lignées. Une ligne = un id, une forme, une couleur, 4 noms. --- */
const LINEAGES = [
["poussin","poussin","#FFE27A","Poussin","Poulet","Coq Royal","Phénix Pixel"],
["hamster","hamster","#E3B98A","Hamster","Hamster Ninja","Hamster Samouraï","Hamster Cosmique"],
["lapin","lapin","#EFEFF5","Lapin","Lapin Bondissant","Lapin de Lune","Lapin Céleste"],
["perruche","perruche","#5EC8F2","Perruche","Ara","Ara Royal","Oiseau de Foudre"],
["chaton","chat","#F2A65A","Chaton","Chat Rusé","Chat Sorcier","Chat des Étoiles"],
["corgi","corgi","#E8A94E","Corgi","Corgi Garde","Corgi Chevalier","Corgi Divin"],
["capy","capybara","#B08050","Capybara","Capybara Zen","Capybara Sage","Capybara Éternel"],
["panda","panda","#FFFFFF","Panda","Panda Boxeur","Panda Maître","Panda du Vide"],
["dragon","dragon","#3FBF7F","Dragonnet","Dragon","Dragon Ancien","Dragon Cosmique"],
["siam","siamois","#F2E5D0","Siamois","Siamois Danseur","Siamois Mystique","Siamois Astral"],
["coon","mainecoon","#8A6644","Maine Coon","Coon Sauvage","Coon Alpha","Coon Titan"],
["sphynx","sphynx","#E8C0B8","Sphynx","Sphynx Tatoué","Sphynx Pharaon","Sphynx Éternel"],
["shiba","shiba","#E8A94E","Shiba","Shiba Doge","Shiba Cyber","Shiba Légende"],
["boule","bouledogue","#C9C9D1","Bouledogue","Bouledogue Rockeur","Bouledogue Roi","Bouledogue Mythe"],
["berger","berger","#D99A4E","Berger","Berger Alpha","Berger Gardien","Berger Cosmique"],
["chatnoir","chat","#3A3450","Chat Noir","Chat d'Ombre","Chat Spectre","Chat du Néant"],
["chatneige","chat","#DFF2FF","Chat des Neiges","Chat Glacé","Chat Blizzard","Chat Éternel"],
["lapinfeu","lapin","#FF7A4D","Lapin de Feu","Lapin Braise","Lapin Volcan","Lapin Solaire"],
["lapinvert","lapin","#7DD36F","Lapin Trèfle","Lapin Chance","Lapin Fortune","Lapin Doré"],
["canard","poussin","#7AC8FF","Poussin Azur","Canard","Canard Royal","Oiseau Tempête"],
["flamant","poussin","#FF9FC4","Poussin Rose","Flamant","Flamant Danseur","Flamant Aurore"],
["souris","hamster","#B9B4C2","Souris","Souris Voleuse","Rat Roi","Rat Cosmique"],
["gerbille","hamster","#FFF3E0","Gerbille","Gerbille Rapide","Gerbille Éclair","Gerbille Photon"],
["bergernoir","berger","#4A4458","Berger Noir","Berger Fantôme","Berger Nocturne","Berger Éclipse"],
["boulecreme","bouledogue","#F0DFC0","Bouledogue Crème","Bouledogue Chef","Bouledogue Baron","Bouledogue Astral"],
["akita","shiba","#FFF6E8","Shiba Blanc","Akita","Akita Guerrier","Akita Divin"],
["chatroux","mainecoon","#E2703A","Chat Roux","Chat Bandit","Chat Corsaire","Chat Kraken"],
["sphynxgris","sphynx","#A9A2B8","Sphynx Gris","Sphynx Ombre","Sphynx Oracle","Sphynx Cosmos"],
["capyor","capybara","#FFC94A","Capybara Doré","Capybara Riche","Capybara Empereur","Capybara Soleil"],
["pandaroux","panda","#E0803A","Panda Roux","Roux Ninja","Roux Shogun","Roux Nova"],
["dragonrouge","dragon","#E24A4A","Dragonnet Rouge","Dragon Rouge","Dragon Infernal","Dragon Apocalypse"],
["dragonbleu","dragon","#4A9BE2","Dragonnet Bleu","Dragon de Glace","Dragon Abyssal","Dragon Océan"],
["dragonor","dragon","#FFD34D","Dragonnet Or","Dragon Or","Dragon Souverain","Dragon Absolu"],
["rossignol","perruche","#FFD86B","Mésange","Rossignol","Rossignol Royal","Rossignol Astral"],
["colibri","perruche","#B47BFF","Colibri","Colibri Vif","Colibri Prisme","Colibri Arc-en-ciel"],
["corginoir","corgi","#57506B","Corgi Noir","Corgi Ombre","Corgi Sentinelle","Corgi Éclipse"],
["corgiblanc","corgi","#F5F0E4","Corgi Blanc","Corgi Neige","Corgi Polaire","Corgi Aurore"],
["tigre","chat","#FFB347","Chat Tigré","Chat Tigre","Tigre Pixel","Tigre Céleste"],
["chatreve","chat","#C9A0FF","Chat Lavande","Chat Rêveur","Chat Onirique","Chat des Songes"],
["lapinnuit","lapin","#5B4E8C","Lapin Nuit","Lapin Étoilé","Lapin Nébuleuse","Lapin Galaxie"],
["hamstermiel","hamster","#FFB020","Hamster Miel","Hamster Gourmand","Hamster Roi","Hamster Ambre"],
["boulebleu","bouledogue","#6BA8D6","Bouledogue Bleu","Bouledogue Marin","Bouledogue Amiral","Bouledogue Abysse"],
["bergerblanc","berger","#FFF0C8","Berger Blanc","Berger Lumière","Berger Séraphin","Berger Solaire"],
["sphynxrose","sphynx","#FF9FD0","Sphynx Rose","Sphynx Fée","Sphynx Enchanteur","Sphynx Féerique"],
["capyvert","capybara","#6FBF6F","Capybara Vert","Capybara Jungle","Capybara Ancien","Capybara Gaïa"],
["pandableu","panda","#A8D8FF","Panda Bleu","Panda Givre","Panda Tempête","Panda Cosmos"],
["coonargent","mainecoon","#C6CBD6","Coon Argent","Coon Lunaire","Coon Astral","Coon Éclipse"],
["shibanoir","shiba","#45404F","Shiba Noir","Shiba Kage","Shiba Oni","Shiba Yokai"],
["perroquet","poussin","#8FD86F","Poussin Vert","Perroquet","Perroquet Pirate","Perroquet Légende"],
["dragonviolet","dragon","#9B5BE2","Dragonnet Violet","Dragon de Nuit","Dragon du Vide","Dragon Singularité"]
];
const RAR_KEYS = Object.keys(RARITIES);

/* Index de rareté = palier de la lignée + stade. Le stade 4 des dernières
   lignées atteint "Secret". */
function lineRarIdx(li, stage){ return Math.min(RAR_KEYS.length-1, Math.floor(li/9) + stage); }

/* Descripteur complet d'une créature à partir de sa clé "lignée:stade" */
const petCache = {};
function petKey(li, stage){ return LINEAGES[li][0] + ":" + stage; }
function petInfo(key){
  if(petCache[key]) return petCache[key];
  const [id, st] = key.split(":");
  const li = LINEAGES.findIndex(l=>l[0] === id);
  if(li < 0) return null;
  const stage = +st, L = LINEAGES[li];
  const rIdx = lineRarIdx(li, stage), rKey = RAR_KEYS[rIdx];
  const info = {
    key, li, stage, base:L[1], name:L[3+stage], rar:rKey, rIdx,
    pal: stagePal(L[2], stage, RARITIES[rKey].col),
    acc: stage === 1 ? ACC1[li % ACC1.length] : ACC_BY_STAGE[stage],
    bonus: (rIdx + 1) * 0.3                     // % de production globale par exemplaire
  };
  return (petCache[key] = info);
}
const TOTAL_PETS = LINEAGES.length * 4;

/* Dessin d'une créature : forme recolorée + calque d'accessoire */
function paintCreature(cv, key){
  const inf = petInfo(key); if(!inf || !cv) return;
  const def = SPRITES[inf.base], roles = ROLES[inf.base] || {};
  cv.width = 16; cv.height = 16;
  const ctx = cv.getContext("2d");
  ctx.clearRect(0,0,16,16);
  /* table de substitution : lettre du sprite -> couleur du stade */
  const sub = {};
  Object.keys(roles).forEach(role=>{ sub[roles[role]] = inf.pal[role]; });
  for(let y=0;y<16;y++){
    const row = (def.px[y]||"").padEnd(16,".");
    for(let x=0;x<16;x++){
      const ch = row[x];
      const col = sub[ch] || def.pal[ch];
      if(!col) continue;
      ctx.fillStyle = col; ctx.fillRect(x,y,1,1);
    }
  }
  if(inf.acc && ACC[inf.acc]){
    const acol = inf.stage === 3 ? RARITIES[inf.rar].col : inf.pal.a;
    for(let y=0;y<16;y++){
      const row = (ACC[inf.acc].px[y]||"").padEnd(16,".");
      for(let x=0;x<16;x++){
        if(row[x] !== "A") continue;
        ctx.fillStyle = acol; ctx.fillRect(x,y,1,1);
      }
    }
  }
}

/* ============================================================
   37. INVENTAIRE DE COLLECTION
   Parallèle à la boucle principale : ne casse rien de l'existant.
   Chaque exemplaire possédé ajoute un bonus passif global.
   ============================================================ */
function invCount(key){ return (S.inv && S.inv[key]) || 0; }
function invAdd(key, n){
  S.inv = S.inv || {};
  S.inv[key] = (S.inv[key]||0) + (n||1);
  S.seen = S.seen || {};
  const first = !S.seen[key];
  S.seen[key] = true;
  return first;
}
function invTake(key, n){
  if(invCount(key) < n) return false;
  S.inv[key] -= n;
  if(S.inv[key] <= 0) delete S.inv[key];
  return true;
}
function seenCount(){ return Object.keys(S.seen||{}).length; }
/* Bonus total de collection, en multiplicateur */
function collectionMult(){
  let pct = 0;
  Object.keys(S.inv||{}).forEach(k=>{
    const inf = petInfo(k); if(!inf) return;
    pct += inf.bonus * S.inv[k];
  });
  pct += seenCount() * 0.15;                    // bonus de découverte permanent
  return 1 + pct/100;
}

/* Tirage pondéré : les raretés élevées sont rares. */
function rollPet(minRar){
  const pool = [];
  LINEAGES.forEach((L,li)=>{
    const r = lineRarIdx(li, 0);
    if(minRar !== undefined && r < minRar) return;
    const w = Math.max(1, 40 - r*6);
    for(let i=0;i<w;i++) pool.push(li);
  });
  const li = pool.length ? pool[rnd(pool.length)] : rnd(LINEAGES.length);
  return petKey(li, 0);
}

/* ============================================================
   LOT 2 — 38. LABORATOIRE DE FUSION
   ============================================================ */
const EGGS = [
  {id:"e1", name:"Œuf commun",     fc:20,  gems:150,  min:0, desc:"Une créature au hasard."},
  {id:"e2", name:"Œuf rare",       fc:60,  gems:450,  min:2, desc:"Rare ou mieux garanti."},
  {id:"e3", name:"Œuf légendaire", fc:150, gems:1100, min:4, desc:"Légendaire ou mieux garanti."},
  {id:"e4", name:"Œuf mythique",   fc:400, gems:3000, min:5, desc:"Mythique garanti — le meilleur qu'un œuf puisse donner."}
];
const MINI_FREE_PLAYS = 5;

let slotA = null, slotB = null;

function labSlots(){ return [document.getElementById("slotA"), document.getElementById("slotB")]; }
function drawSlot(el, key){
  el.innerHTML = "";
  if(key){
    const c = document.createElement("canvas"); paintCreature(c, key);
    el.appendChild(c); el.classList.add("full");
  }else{
    const p = document.createElement("div"); p.className = "ph";
    p.textContent = "Dépose une créature";
    el.appendChild(p); el.classList.remove("full");
  }
}
function setSlot(which, key){
  if(which === "A") slotA = key; else slotB = key;
  const [a,b] = labSlots();
  drawSlot(a, slotA); drawSlot(b, slotB);
  refreshFuseBtn();
}
function slotFree(){ return !slotA ? "A" : !slotB ? "B" : null; }

/* Combien d'exemplaires restent disponibles une fois les slots servis */
function available(key){
  let n = invCount(key);
  if(slotA === key) n--;
  if(slotB === key) n--;
  return n;
}
function refreshFuseBtn(){
  const btn = document.getElementById("fuseGo"); if(!btn) return;
  const ok = slotA && slotA === slotB && petInfo(slotA).stage < 3;
  btn.disabled = !ok;
  btn.innerHTML = ok ? "FUSION<br>▶" : (slotA && slotB ? "PAS<br>PAREIL" : "FUSION");
}

function buildLab(){
  const g = document.getElementById("invGrid"); if(!g) return;
  const keys = Object.keys(S.inv||{}).filter(k=>petInfo(k)).sort((x,y)=>{
    const a = petInfo(x), b = petInfo(y);
    return a.li - b.li || a.stage - b.stage;
  });
  g.innerHTML = "";
  if(!keys.length){
    g.innerHTML = '<div class="rSub" style="grid-column:1/-1;text-align:center;padding:14px">'+
      'Aucune créature. Ouvre un œuf ou joue au mini-jeu.</div>';
    return;
  }
  keys.forEach(k=>{
    const inf = petInfo(k);
    const card = document.createElement("div");
    card.className = "petCard";
    card.dataset.k = k;
    card.style.borderColor = RARITIES[inf.rar].col;
    const c = document.createElement("canvas"); paintCreature(c, k);
    const n = document.createElement("div"); n.className = "pn"; n.textContent = inf.name;
    const q = document.createElement("span"); q.className = "qty"; q.textContent = "×"+invCount(k);
    const s = document.createElement("span"); s.className = "st"; s.textContent = "★".repeat(inf.stage+1);
    card.append(c,n,q,s);
    if(invCount(k) >= 2 && inf.stage < 3) card.classList.add("fusable");
    attachDrag(card, k);
    g.appendChild(card);
  });
}
function refreshLab(){
  const fc = document.getElementById("fcVal"); if(fc) setTxt(fc, fmt(S.fc||0));
  (R.eggs||[]).forEach(({e,r})=>{
    const canFc = (S.fc||0) >= e.fc, canGems = (S.gems||0) >= e.gems;
    if(canFc){ setTxt(r._btn,"🧪<br>"+fmt(e.fc)); r._btn.className="rBtn mintBtn"; }
    else if(canGems){ setTxt(r._btn,"💎<br>"+fmt(e.gems)); r._btn.className="rBtn gemBtn"; }
    else { setTxt(r._btn,"🧪"+fmt(e.fc)+"<br>💎"+fmt(e.gems)); r._btn.className="rBtn"; }
    setDis(r._btn, !canFc && !canGems);
  });
  const mp = document.getElementById("miniBtn");
  if(mp){
    const left = miniPlaysLeft();
    setTxt(mp, left > 0 ? "JOUER<br>"+left+" / "+MINI_FREE_PLAYS : "DEMAIN");
    setDis(mp, left <= 0);
  }
}

/* ============================================================
   39. GLISSER-DÉPOSER (pointer events — fiable sur mobile)
   Une simple tape place aussi la créature dans le premier slot libre.
   ============================================================ */
const ghost = document.getElementById("ghost");
function attachDrag(card, key){
  let sx=0, sy=0, dragging=false, hot=null;
  card.addEventListener("pointerdown", e=>{
    if(available(key) <= 0) return;
    sx = e.clientX; sy = e.clientY; dragging = false;
    card.setPointerCapture(e.pointerId);
  });
  card.addEventListener("pointermove", e=>{
    if(!card.hasPointerCapture || !card.hasPointerCapture(e.pointerId)) return;
    if(!dragging && Math.hypot(e.clientX-sx, e.clientY-sy) > 8){
      dragging = true;
      ghost.innerHTML = "";
      const c = document.createElement("canvas"); paintCreature(c, key);
      ghost.appendChild(c); ghost.classList.add("on");
    }
    if(dragging){
      ghost.style.left = e.clientX+"px"; ghost.style.top = e.clientY+"px";
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const slot = el && el.closest ? el.closest(".slot") : null;
      if(hot && hot !== slot) hot.classList.remove("hot");
      hot = slot; if(hot) hot.classList.add("hot");
    }
  });
  card.addEventListener("pointerup", e=>{
    ghost.classList.remove("on");
    if(hot) hot.classList.remove("hot");
    if(dragging){
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const slot = el && el.closest ? el.closest(".slot") : null;
      if(slot) setSlot(slot.id === "slotA" ? "A" : "B", key);
    }else{
      const f = slotFree();
      if(f) setSlot(f, key); else { setSlot("A", key); setSlot("B", null); }
      sfx("tab");
    }
    dragging = false; hot = null;
    buildLab();
  });
  card.addEventListener("pointercancel", ()=>{ ghost.classList.remove("on"); dragging = false; if(hot) hot.classList.remove("hot"); });
}

/* ============================================================
   40. SÉQUENCE DE FUSION
   ============================================================ */
let fuseBusy = false;
function doFusion(){
  if(fuseBusy) return;
  const key = slotA;
  if(!key || slotA !== slotB) return;
  const inf = petInfo(key);
  if(inf.stage >= 3){ toast("Évolution déjà maximale"); return; }
  if(invCount(key) < 2){ toast("Il t'en faut deux identiques"); return; }
  invTake(key, 2);
  const outKey = petKey(inf.li, inf.stage+1);
  const first = invAdd(outKey, 1);
  S.fusions = (S.fusions||0) + 1;
  if(pLvl("g6") > 0) S.fc = (S.fc||0) + pLvl("g6");
  fuseBusy = true;
  playFusion(key, outKey, first);
  slotA = slotB = null;
  save();
}
function playFusion(inKey, outKey, first){
  const box = document.getElementById("fuseFx");
  const out = petInfo(outKey);
  box.classList.add("on");
  paintCreature(document.querySelector("#fA canvas"), inKey);
  paintCreature(document.querySelector("#fB canvas"), inKey);
  paintCreature(document.querySelector("#fOut canvas"), outKey);
  const rays = document.getElementById("fRays"), fo = document.getElementById("fOut"), lab = document.getElementById("fLabel");
  [rays, fo, lab].forEach(el=>el.classList.remove("go"));
  fo.classList.add("silhouette");
  lab.textContent = "";
  document.getElementById("fA").style.display = "";
  document.getElementById("fB").style.display = "";
  sfx("evo"); vibrate(30);

  const timers = [];
  const finish = ()=>{
    timers.forEach(clearTimeout);
    box.classList.remove("on");
    fuseBusy = false;
    const [a,b] = labSlots(); drawSlot(a,null); drawSlot(b,null); refreshFuseBtn();
    buildLab(); renderHUD(); refreshLists();
    if(first) toast("Nouvelle espèce : "+out.name);
  };
  document.getElementById("fSkip").onclick = finish;
  box.onclick = null;

  timers.push(setTimeout(()=>{                                   // convergence terminée
    rays.classList.add("go"); sfx("big"); vibrate(70);
    flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
    document.getElementById("fA").style.display = "none";
    document.getElementById("fB").style.display = "none";
  }, 1000));
  timers.push(setTimeout(()=>{ fo.classList.add("go"); }, 1350)); // silhouette
  timers.push(setTimeout(()=>{                                    // révélation
    fo.classList.remove("silhouette");
    lab.innerHTML = out.name + '<br><span style="font-size:9px;color:'+RARITIES[out.rar].col+'">'+
      RARITIES[out.rar].name + " · +" + out.bonus.toFixed(1) + "% production</span>";
    lab.classList.add("go"); sfx("good"); vibrate(50); celebrate();
  }, 2100));
  timers.push(setTimeout(()=>{ box.onclick = finish; }, 2600));
  timers.push(setTimeout(finish, 5200));
}

/* ============================================================
   41. ŒUFS
   ============================================================ */
function buyEgg(e, useGems){
  if(useGems){ if((S.gems||0) < e.gems) return; S.gems -= e.gems; }
  else{ if((S.fc||0) < e.fc) return; S.fc -= e.fc; }
  const key = rollPet(e.min);
  const first = invAdd(key, 1);
  const inf = petInfo(key);
  sfx(first ? "evo" : "good"); vibrate(first ? 60 : 20);
  openModal(
    '<h2>'+e.name+'</h2>' +
    '<canvas id="eggBig" style="width:96px;height:96px;margin:0 auto 10px"></canvas>' +
    '<div class="big">'+inf.name+'</div>' +
    '<p style="color:'+RARITIES[inf.rar].col+'">'+RARITIES[inf.rar].name+
      (first ? " · nouvelle espèce !" : " · doublon utile pour fusionner")+'</p>' +
    '<button class="mBtn" id="mOk">Génial</button>'
  );
  paintCreature(document.getElementById("eggBig"), key);
  document.getElementById("mOk").onclick = ()=>{ closeModal(); buildLab(); };
  save(); renderHUD(); refreshLists();
}

/* ============================================================
   42. MINI-JEU — "Attrape-croquettes" (45 s, rapporte des Pièces de Fusion)
   ============================================================ */
const MG = {on:false, raf:0, last:0, t:0, score:0, lives:3, items:[], bx:.5, spawn:0, cv:null, ctx:null};
function miniPlaysLeft(){
  if(S.miniDate !== today()){ return MINI_FREE_PLAYS; }
  return Math.max(0, MINI_FREE_PLAYS - (S.miniPlays||0));
}
function startMini(){
  if(miniPlaysLeft() <= 0) return;
  if(S.miniDate !== today()){ S.miniDate = today(); S.miniPlays = 0; }
  S.miniPlays = (S.miniPlays||0) + 1; save();
  const box = document.getElementById("mini");
  box.classList.add("on");
  MG.cv = document.getElementById("miniCv");
  MG.cv.width = MG.cv.clientWidth; MG.cv.height = MG.cv.clientHeight;
  MG.ctx = MG.cv.getContext("2d");
  Object.assign(MG, {on:true, t:45, score:0, lives:3, items:[], bx:.5, spawn:0, last:performance.now()});
  MG.raf = requestAnimationFrame(miniLoop);
}
function stopMini(reward){
  if(!MG.on) return;
  MG.on = false; cancelAnimationFrame(MG.raf);
  document.getElementById("mini").classList.remove("on");
  if(reward){
    const fc = Math.min(100, 5 + Math.floor(MG.score/3));
    S.fc = (S.fc||0) + fc;
    sfx("big");
    openModal('<h2>Partie terminée</h2><div class="big">'+MG.score+' points</div>' +
      '<p>Récompense</p><div class="big">+'+fc+' 🧪 Pièces de Fusion</div>' +
      '<button class="mBtn" id="mOk">Récupérer</button>');
    document.getElementById("mOk").onclick = ()=>{ closeModal(); refreshLab(); };
    save(); renderHUD(); refreshLists();
  }
}
function miniLoop(now){
  if(!MG.on) return;
  const dt = Math.min(.05, (now-MG.last)/1000); MG.last = now;
  const W = MG.cv.width, H = MG.cv.height, ctx = MG.ctx;
  MG.t -= dt;
  if(MG.t <= 0 || MG.lives <= 0){ stopMini(true); return; }

  /* apparition, de plus en plus rapide */
  MG.spawn -= dt;
  if(MG.spawn <= 0){
    MG.spawn = Math.max(.22, .85 - (45-MG.t)*0.012);
    const r = Math.random();
    const type = r < .12 ? "bomb" : r < .26 ? "fish" : "kibble";
    MG.items.push({x:.08+Math.random()*.84, y:-.05, v:.22+Math.random()*.18+(45-MG.t)*0.004, type});
  }
  const bowlY = H-46, bw = Math.max(56, W*.2);
  for(let i=MG.items.length-1;i>=0;i--){
    const it = MG.items[i];
    it.y += it.v*dt;
    const px = it.x*W, py = it.y*H;
    if(py > bowlY-12 && py < bowlY+18 && Math.abs(px - MG.bx*W) < bw/2+10){
      MG.items.splice(i,1);
      if(it.type === "bomb"){ MG.lives--; sfx("waouf"); vibrate(60); }
      else { MG.score += it.type === "fish" ? 5 : 1; sfx("click"); }
      continue;
    }
    if(py > H+20) MG.items.splice(i,1);
  }

  /* rendu */
  ctx.clearRect(0,0,W,H);
  MG.items.forEach(it=>{
    const px = Math.round(it.x*W), py = Math.round(it.y*H);
    if(it.type === "bomb"){ ctx.fillStyle = "#2B2333"; ctx.fillRect(px-7,py-7,14,14); ctx.fillStyle="#FF4D6D"; ctx.fillRect(px-2,py-11,4,4); }
    else if(it.type === "fish"){ ctx.fillStyle = "#FFC94A"; ctx.fillRect(px-8,py-5,16,10); ctx.fillStyle="#E0A61E"; ctx.fillRect(px+6,py-7,4,14); }
    else { ctx.fillStyle = "#B0764A"; ctx.fillRect(px-5,py-5,10,10); ctx.fillStyle="#8A5A34"; ctx.fillRect(px-5,py+1,10,4); }
  });
  const bx = MG.bx*W;
  ctx.fillStyle = "#FFF7E8"; ctx.fillRect(bx-bw/2, bowlY, bw, 18);
  ctx.fillStyle = "#E2678D"; ctx.fillRect(bx-bw/2, bowlY, bw, 5);
  ctx.fillStyle = "#3B2B45"; ctx.fillRect(bx-bw/2, bowlY+18, bw, 4);

  setTxt(document.getElementById("miniT"), "⏱ "+Math.ceil(MG.t)+" s");
  setTxt(document.getElementById("miniS"), "⭐ "+MG.score+"  ❤️ "+MG.lives);
  MG.raf = requestAnimationFrame(miniLoop);
}

/* ============================================================
   43. DEX DES CRÉATURES
   ============================================================ */
function buildLineDex(){
  const g = document.getElementById("lineGrid"); if(!g) return;
  g.innerHTML = "";
  LINEAGES.forEach((L,li)=>{
    const card = document.createElement("div");
    card.className = "petCard";
    const c = document.createElement("canvas");
    card.appendChild(c);
    const n = document.createElement("div"); n.className = "pn";
    const q = document.createElement("span"); q.className = "qty";
    card.append(n,q);
    card.onclick = ()=>openLineage(li);
    card._li = li; card._cv = c; card._n = n; card._q = q;
    g.appendChild(card);
  });
}
function refreshLineDex(){
  const g = document.getElementById("lineGrid"); if(!g || !g.children.length) return;
  for(const card of g.children){
    const li = card._li;
    let best = -1, owned = 0;
    for(let s=0;s<4;s++){
      const k = petKey(li,s);
      if(S.seen && S.seen[k]) best = s;
      owned += invCount(k);
    }
    const showStage = best < 0 ? 0 : best;
    const key = petKey(li, showStage);
    if(card._drawn !== key){ card._drawn = key; paintCreature(card._cv, key); }
    setCls(card, "unknown", best < 0);
    const inf = petInfo(key);
    card.style.borderColor = best < 0 ? "" : RARITIES[inf.rar].col;
    setTxt(card._n, inf.name);
    setTxt(card._q, best < 0 ? "" : (best+1)+"/4");
  }
  setTxt(document.getElementById("lineTitle"),
    "Créatures &nbsp;·&nbsp; " + seenCount() + " / " + TOTAL_PETS);
}
function openLineage(li){
  let html = "";
  for(let s=0;s<4;s++){
    const k = petKey(li,s), inf = petInfo(k), known = !!(S.seen && S.seen[k]);
    html += '<div class="row"><div class="thumb"><canvas id="lg'+s+'"'+(known?'':' style="filter:brightness(0) opacity(.3)"')+'></canvas></div>' +
      '<div class="rInfo"><div class="rName">'+(known?inf.name:"???")+'</div>' +
      '<div class="rSub" style="color:'+RARITIES[inf.rar].col+'">'+RARITIES[inf.rar].name+
      ' · +'+inf.bonus.toFixed(1)+'% / exemplaire</div></div>' +
      '<div class="rBtn owned" style="min-width:44px">×'+invCount(k)+'</div></div>';
  }
  openModal('<h2>'+LINEAGES[li][3]+'</h2>' + html +
    '<p>Deux exemplaires identiques fusionnent en l\'évolution suivante.</p>' +
    '<button class="mBtn ghost" id="mNo">Fermer</button>');
  for(let s=0;s<4;s++) paintCreature(document.getElementById("lg"+s), petKey(li,s));
  document.getElementById("mNo").onclick = closeModal;
}

/* ============================================================
   44. CÂBLAGE DU LABORATOIRE
   ============================================================ */
function buildLabStatic(){
  const er = document.getElementById("eggRow"); er.innerHTML = ""; R.eggs = [];
  EGGS.forEach(e=>{
    const r = makeRow({emoji:"🥚", onClick:()=>{
      if((S.fc||0) >= e.fc) buyEgg(e, false);
      else if((S.gems||0) >= e.gems) buyEgg(e, true);
    }});
    r._name.textContent = e.name; r._sub.textContent = e.desc;
    er.appendChild(r); R.eggs.push({e, r});
  });
  const mr = document.getElementById("miniRow"); mr.innerHTML = "";
  const r = makeRow({emoji:"🎮", btnClass:"mintBtn", onClick:startMini});
  r._name.textContent = "Attrape-croquettes";
  r._sub.textContent = "45 s · rapporte des Pièces de Fusion";
  r._btn.id = "miniBtn";
  mr.appendChild(r);
}
function initLab(){
  buildLabStatic();
  drawSlot(document.getElementById("slotA"), null);
  drawSlot(document.getElementById("slotB"), null);
  document.getElementById("fuseGo").onclick = doFusion;
  document.querySelectorAll("#eggRow [data-egg]").forEach(b=>{
    b.onclick = ()=>buyEgg(EGGS.find(e=>e.id === b.dataset.egg));
  });
  document.getElementById("miniQuit").onclick = ()=>stopMini(true);
  document.getElementById("miniCv").addEventListener("pointermove", e=>{
    if(!MG.on) return;
    const r = MG.cv.getBoundingClientRect();
    MG.bx = Math.max(.06, Math.min(.94, (e.clientX-r.left)/r.width));
  });
  document.getElementById("miniCv").addEventListener("pointerdown", e=>{
    if(!MG.on) return;
    const r = MG.cv.getBoundingClientRect();
    MG.bx = Math.max(.06, Math.min(.94, (e.clientX-r.left)/r.width));
  });
  buildLab(); buildLineDex(); refreshLab(); refreshLineDex();
}

/* ============================================================
   v2.3 — VIE DE L'ANIMAL (humeurs)
   Réutilise les classes CSS .jump/.sleep/.dance/.yawn/.blink déjà en place.
   ============================================================ */
let idleSince = Date.now(), lastMood = "";
function setMood(cls, ms){
  petWrap.classList.remove("jump","sleep","dance","yawn","blink");
  if(cls) petWrap.classList.add(cls);
  lastMood = cls||"";
  if(cls && ms) setTimeout(()=>{ if(petWrap.classList.contains(cls)) petWrap.classList.remove(cls); }, ms);
}
function spawnZzz(){
  const z = document.createElement("div"); z.className = "zzz"; z.textContent = "💤";
  z.style.left = "64%"; z.style.top = "12%";
  fx.appendChild(z); setTimeout(()=>z.remove(), 2400);
}
function celebrate(){ idleSince = Date.now(); setMood("dance", 900); }
function moodTick(){
  if(veil.classList.contains("on")) return;               // pas d'animation sous une modale
  const idleMs = Date.now() - idleSince;
  if(idleMs > 20000){
    if(lastMood !== "sleep") setMood("sleep", null);
    if(Math.random() < .3) spawnZzz();
    return;
  }
  const r = Math.random();
  if(r < .18) setMood("blink", 160);
  else if(r < .28) setMood("jump", 520);
  else if(r < .34) setMood("yawn", 1250);
}
setInterval(moodTick, 2600);

/* ============================================================
   v2.3 — COSMÉTIQUES (purement visuels, aucun bonus de jeu)
   Réutilise les motifs ACC déjà dessinés pour les évolutions.
   ============================================================ */
const COSMETICS = [
  {id:"c_cap",   name:"Casquette",     cat:"tete", acc:"cap",     color:"#FF8FB1", gems:35},
  {id:"c_crown", name:"Couronne",      cat:"tete", acc:"crown",   color:"#FFC94A", gems:90},
  {id:"c_halo",  name:"Auréole",       cat:"tete", acc:"halo",    color:"#FFE066", gems:110},
  {id:"c_horns", name:"Cornes",        cat:"tete", acc:"horns",   color:"#B47BFF", gems:70},
  {id:"c_glass", name:"Lunettes",      cat:"yeux", acc:"glasses", color:"#2B2333", gems:30},
  {id:"c_bow",   name:"Nœud papillon", cat:"cou",  acc:"bow",     color:"#E2678D", gems:20},
  {id:"c_scarf", name:"Écharpe",       cat:"cou",  acc:"scarf",   color:"#4C79D6", gems:25},
  {id:"c_wings", name:"Ailes",         cat:"dos",  acc:"wings",   color:"#7DD3C0", gems:150},
  {id:"c_frameneon", name:"Cadre néon", cat:"cadre", color:"#00E5FF", gems:80},
  {id:"c_framegold", name:"Cadre doré", cat:"cadre", color:"#FFC94A", gems:120}
];
function drawCosmOverlay(cv){
  const ctx = cv.getContext("2d");
  Object.values(S.equip||{}).forEach(cid=>{
    if(!cid) return;
    const c = COSMETICS.find(x=>x.id===cid); const pat = c && ACC[c.acc];
    if(!pat) return;
    for(let y=0;y<16;y++){
      const row=(pat.px[y]||"").padEnd(16,".");
      for(let x=0;x<16;x++){ if(row[x]==="A"){ ctx.fillStyle=c.color; ctx.fillRect(x,y,1,1); } }
    }
  });
}
function buildCosmGrid(){
  const g = document.getElementById("cosmGrid"); if(!g) return;
  g.innerHTML = "";
  COSMETICS.forEach(c=>{
    const owned = !!(S.cosm && S.cosm[c.id]), on = !!(S.equip && S.equip[c.cat] === c.id);
    const cell = document.createElement("button");
    cell.className = "cosmCell" + (!owned?" locked":"") + (on?" on":"");
    const cv = document.createElement("canvas"); cv.width=16; cv.height=16;
    const pctx = cv.getContext("2d");
    const pat = ACC[c.acc];
    for(let y=0;y<16;y++){ const row=(pat.px[y]||"").padEnd(16,"."); for(let x=0;x<16;x++){ if(row[x]==="A"){ pctx.fillStyle=c.color; pctx.fillRect(x,y,1,1); } } }
    const lbl = document.createElement("span"); lbl.className = "px";
    lbl.textContent = owned ? c.name : "💎"+c.gems;
    cell.append(cv, lbl);
    cell.onclick = ()=>buyCosm(c);
    g.appendChild(cell);
  });
}
function buyCosm(c){
  S.cosm = S.cosm||{}; S.equip = S.equip||{};
  if(!S.cosm[c.id]){
    if(S.gems < c.gems) return;
    S.gems -= c.gems; S.cosm[c.id] = true; sfx("good"); vibrate(30);
  }
  S.equip[c.cat] = (S.equip[c.cat] === c.id) ? null : c.id;
  save(); renderHUD(); renderPet(); buildCosmGrid();
}

/* ============================================================
   v2.3 — SUCCÈS + PROFIL
   ============================================================ */
const ACHIEVEMENTS = [
  {id:"a1", name:"Premier million",           stat:"lifetimeEarned", target:1e6,  gems:20},
  {id:"a2", name:"Premier milliard",          stat:"lifetimeEarned", target:1e9,  gems:60},
  {id:"a3", name:"Premier trillion",          stat:"lifetimeEarned", target:1e12, gems:150},
  {id:"a4", name:"Première Renaissance",      stat:"rebirths",       target:1,    gems:40},
  {id:"a5", name:"Renaissance ×5",            stat:"rebirths",       target:5,    gems:120},
  {id:"a6", name:"Renaissance ×20",           stat:"rebirths",       target:20,   gems:300},
  {id:"a7", name:"Première fusion",           stat:"fusions",        target:1,    gems:20},
  {id:"a8", name:"25 fusions",                stat:"fusions",        target:25,   gems:100},
  {id:"a9", name:"100 fusions",               stat:"fusions",        target:100,  gems:250},
  {id:"a10",name:"10 000 tapes",              stat:"taps",           target:1e4,  gems:30},
  {id:"a11",name:"Toute la ménagerie",        stat:"classicOwned",   target:9,    gems:80},
  {id:"a12",name:"50 créatures découvertes",  stat:"seen",           target:50,   gems:100},
  {id:"a13",name:"150 créatures découvertes", stat:"seen",           target:150,  gems:300},
  {id:"a14",name:"Série de 7 jours",           stat:"streakBest",     target:7,    gems:500},
  {id:"a15",name:"Série de 14 jours",          stat:"streakBest",     target:14,   gems:1200},
  {id:"a16",name:"Série de 30 jours",          stat:"streakBest",     target:30,   gems:5000},
  {id:"a17",name:"Le Taper Fou",               stat:"taps",           target:1e6,  gems:400},
  {id:"a18",name:"Le Riche Héritier",          stat:"lifetimeEarned", target:1e18, gems:1000},
  {id:"a19",name:"L'Alchimiste Fou",           stat:"fusions",        target:500,  gems:600},
  {id:"a20",name:"Le Maître Éleveur",          stat:"seen",           target:TOTAL_PETS, gems:2000}
];
function achvValue(a){
  if(a.stat === "classicOwned") return Object.keys(S.owned||{}).filter(k=>S.owned[k]).length;
  if(a.stat === "seen") return seenCount();
  return S[a.stat]||0;
}
/* Série de connexion : un jour = une ouverture de l'app, peu importe ce qu'on y fait.
   Une seule journée manquée et ça repart à 1 — c'est le principe d'une série. */
function bumpStreak(){
  const y = new Date(Date.now()-86400000).toDateString();
  if(S.streakLast === today()) return;
  S.streak = (S.streakLast === y) ? (S.streak||0)+1 : 1;
  S.streakLast = today();
  if(S.streak > (S.streakBest||0)) S.streakBest = S.streak;
}
function refreshStreak(){
  const el = document.getElementById("streakBox"); if(!el) return;
  setTxt(el, '<div class="row"><div class="thumb" style="font-size:20px">🔥</div><div class="rInfo">' +
    '<div class="rName">'+(S.streak||0)+' jour'+((S.streak||0)>1?'s':'')+' d\'affilée</div>' +
    '<div class="rSub">Record : '+(S.streakBest||0)+' · reviens chaque jour pour ne pas la casser</div></div></div>');
}
function buildAchvList(){
  const box = document.getElementById("achvList"); if(!box) return;
  box.innerHTML = ""; R.achv = [];
  ACHIEVEMENTS.forEach(a=>{
    const r = makeRow({emoji:"🏆", btnClass:"pawBtn", onClick:()=>claimAchv(a.id)});
    r._name.textContent = a.name;
    box.appendChild(r); R.achv.push(r);
  });
}
function refreshAchv(){
  ACHIEVEMENTS.forEach((a,i)=>{
    const r = R.achv && R.achv[i]; if(!r) return;
    const done = !!(S.achv && S.achv[a.id]);
    const cur = Math.min(a.target, achvValue(a));
    setTxt(r._sub, done ? "Débloqué" : fmt(cur)+" / "+fmt(a.target));
    if(done){ setTxt(r._btn,"✔"); r._btn.className="rBtn owned"; r._btn.style.fontSize="16px"; setDis(r._btn,true); }
    else { r._btn.style.fontSize=""; setTxt(r._btn,"💎<br>"+a.gems); r._btn.className="rBtn pawBtn"; setDis(r._btn, cur < a.target); }
  });
}
function claimAchv(id){
  const a = ACHIEVEMENTS.find(x=>x.id===id);
  S.achv = S.achv||{};
  if(!a || S.achv[id] || achvValue(a) < a.target) return;
  S.achv[id] = true; S.gems += a.gems;
  celebrate(); sfx("big"); vibrate(50);
  toast("Succès débloqué : +"+a.gems+" gemmes");
  save(); renderHUD(); refreshAchv();
}
function refreshProfile(){
  const el = document.getElementById("profileBox"); if(!el) return;
  const done = Object.keys(S.achv||{}).length;
  setTxt(el,
    '<div class="row"><div class="thumb" style="font-size:20px">👤</div><div class="rInfo">' +
    '<div class="rName">Ton profil</div>' +
    '<div class="rSub">'+fmt(S.lifetimeEarned)+' pièces cumulées · '+(S.rebirths||0)+' renaissances<br>'+
    (S.fusions||0)+' fusions · '+done+' / '+ACHIEVEMENTS.length+' succès</div></div></div>');
}

/* ============================================================
   v2.3 — ROUE DE LA CHANCE
   ============================================================ */
const WHEEL_SEGMENTS = [
  {label:"10 💎",    type:"gems",  amt:10,  w:22, ico:"💎", desc:"10 gemmes directement dans ta réserve."},
  {label:"×2 · 5 min",type:"boost",mult:2,  secs:300, w:14, ico:"🔥", desc:"Double tous tes gains pendant 5 minutes."},
  {label:"25 💎",    type:"gems",  amt:25,  w:16, ico:"💎", desc:"25 gemmes directement dans ta réserve."},
  {label:"🧪 ×10",   type:"fc",    amt:10,  w:16, ico:"🧪", desc:"10 Pièces de Fusion pour le Laboratoire."},
  {label:"20 💎",    type:"gems",  amt:20,  w:16, ico:"💎", desc:"20 gemmes directement dans ta réserve."},
  {label:"×5 · 1 min",type:"boost",mult:5,  secs:60,  w:8,  ico:"🔥", desc:"Multiplie tous tes gains par 5 pendant 1 minute."},
  {label:"100 💎",   type:"gems",  amt:100, w:4,  ico:"💎", desc:"Le gros lot en gemmes."},
  {label:"🧪 ×30",   type:"fc",    amt:30,  w:14, ico:"🧪", desc:"30 Pièces de Fusion pour le Laboratoire."}
];
function openWheelInfo(){
  const total = WHEEL_SEGMENTS.reduce((s,x)=>s+x.w,0);
  let html = '<h2>Ce que tu peux gagner</h2>';
  WHEEL_SEGMENTS.forEach(s=>{
    const pct = (s.w/total*100).toFixed(1);
    html += '<div class="row"><div class="thumb" style="font-size:18px">'+s.ico+'</div>' +
      '<div class="rInfo"><div class="rName">'+s.label+' · '+pct+'%</div><div class="rSub">'+s.desc+'</div></div></div>';
  });
  html += '<button class="mBtn ghost" id="mNo">Fermer</button>';
  openModal(html);
  document.getElementById("mNo").onclick = closeModal;
}
const WHEEL_COLORS = ["--gold","--gem","--pink","--mint","--paw","--gold","--gem","--pink"];
function buildWheelGradient(){
  const disc = document.getElementById("wheelDisc"); if(!disc) return;
  const n = WHEEL_SEGMENTS.length, step = 360/n, cs = getComputedStyle(app);
  let stops = [];
  for(let i=0;i<n;i++){
    const col = (cs.getPropertyValue(WHEEL_COLORS[i])||"#ccc").trim();
    stops.push(col+" "+(i*step)+"deg "+((i+1)*step)+"deg");
  }
  disc.style.background = "conic-gradient("+stops.join(",")+")";
  disc.querySelectorAll(".wheelIcon").forEach(el=>el.remove());
  WHEEL_SEGMENTS.forEach((seg,i)=>{
    const angle = i*step + step/2;
    const el = document.createElement("div");
    el.className = "wheelIcon";
    el.style.transform = "rotate("+angle+"deg) translate(0,-50px) rotate(-"+angle+"deg)";
    el.textContent = seg.ico;
    disc.appendChild(el);
  });
}
function wheelPick(){
  const total = WHEEL_SEGMENTS.reduce((s,x)=>s+x.w,0);
  let r = Math.random()*total;
  for(let i=0;i<WHEEL_SEGMENTS.length;i++){ r -= WHEEL_SEGMENTS[i].w; if(r<=0) return i; }
  return 0;
}
let wheelSpinning = false, wheelAngle = 0;
function runSpin(free){
  wheelSpinning = true;
  const idx = wheelPick(), n = WHEEL_SEGMENTS.length, step = 360/n;
  wheelAngle += 360*4 + (360 - ((idx*step + step/2) - (wheelAngle%360) + 360)%360);
  const disc = document.getElementById("wheelDisc");
  disc.style.transform = "rotate("+wheelAngle+"deg)";
  sfx("tab");
  setTimeout(()=>{
    const seg = WHEEL_SEGMENTS[idx];
    if(seg.type === "gems") S.gems += seg.amt;
    else if(seg.type === "fc") S.fc = (S.fc||0) + seg.amt;
    else if(seg.type === "boost"){ S.boostMult=seg.mult; S.boostUntil=Date.now()+seg.secs*1000; S.boostName="Roue de la chance"; }
    if(free) S.wheelLast = today();
    wheelSpinning = false;
    celebrate(); sfx("big"); vibrate(50);
    toast("Roue : "+seg.label);
    save(); renderHUD(); refreshLists(); refreshWheel();
  }, 3300);
}
function spinWheel(free){
  if(wheelSpinning) return;
  if(free){ if(S.wheelLast === today()) return; runSpin(true); }
  else{ if(S.gems < 40) return; S.gems -= 40; runSpin(false); }
}
function refreshWheel(){
  const f = document.getElementById("wheelSpin"), e = document.getElementById("wheelExtra");
  if(!f) return;
  const canFree = S.wheelLast !== today();
  setTxt(f, canFree ? "LANCER GRATUIT" : "REVIENS DEMAIN");
  setDis(f, !canFree || wheelSpinning);
  if(e){ setTxt(e, "💎 40 · relancer"); setDis(e, (S.gems<40) || wheelSpinning); }
}
document.getElementById("wheelInfo").addEventListener("click", e=>{ e.stopPropagation(); openWheelInfo(); });
document.getElementById("wheelSpin").addEventListener("click", ()=>spinWheel(true));
document.getElementById("wheelExtra").addEventListener("click", ()=>spinWheel(false));

/* ============================================================
   v2.4 — AMÉLIORATIONS PAR ANIMAL
   2 paliers par animal classique, déverrouillés en le possédant ;
   le palier 2 exige le palier 1. Chaque achat pose un objet visible
   près de l'animal (4 silhouettes partagées, recolorées par item —
   même principe que les accessoires de fusion).
   ============================================================ */
const PROP_SHAPES = {
  nest:{px:[
  "................","................","................","................",
  "................","................","...AAAAAAAAAA...","..AAAAAAAAAAAA..",
  ".AAAAAAAAAAAAAA.",".AAAAAAAAAAAAAA.","..AAAAAAAAAAAA..","................",
  "................","................","................","................"]},
  hut:{px:[
  "................","................","......AAAA......",".....AAAAAA.....",
  "....AAAAAAAA....","...AAAAAAAAAA...","..AAAAAAAAAAAA..","..AAAAAAAAAAAA..",
  "..AA..AAAA..AA..","..AA..AAAA..AA..","..AA..AAAA..AA..","..AAAAAAAAAAAA..",
  "................","................","................","................"]},
  plant:{px:[
  "................","................","................","......AA........",
  ".....AAAA.......","....AAAAAA......","......AA........","......AA........",
  "......AA........","......AA........",".....AAAA.......","....AAAAAA......",
  "...AAAAAAAA.....","................","................","................"]},
  gadget:{px:[
  "................","................","....AA....AA....","....AA....AA....",
  "...AAAA..AAAA...","....AAAAAAAA....",".....AAAAAA.....","....AAAAAAAA....",
  "...AAAA..AAAA...","....AA....AA....","....AA....AA....","................",
  "................","................","................","................"]}
};
const ANIMAL_UPS = [
  {id:"au1",  animal:"cochon",   tier:1, name:"Mangeoire à graines",  add:2,     base:150,    rate:1.16, icon:"nest",  color:"#FFC94A"},
  {id:"au2",  animal:"cochon",   tier:2, name:"Couveuse chauffante",  add:14,    base:3200,   rate:1.17, icon:"hut",   color:"#F2C94C"},
  {id:"au3",  animal:"hamster",  tier:1, name:"Roue à dynamo",        add:9,     base:1100,   rate:1.16, icon:"gadget",color:"#E3B98A"},
  {id:"au4",  animal:"hamster",  tier:2, name:"Réserve de noisettes", add:60,    base:2.2e4,  rate:1.17, icon:"nest",  color:"#C99468"},
  {id:"au5",  animal:"lapin",    tier:1, name:"Terrier profond",      add:65,    base:1.6e4,  rate:1.17, icon:"hut",   color:"#C9C9D6"},
  {id:"au6",  animal:"lapin",    tier:2, name:"Carotte géante",       add:420,   base:3.2e5,  rate:1.18, icon:"plant", color:"#FF7A4D"},
  {id:"au7",  animal:"perruche", tier:1, name:"Perchoir doré",        add:480,   base:1.2e5,  rate:1.17, icon:"nest",  color:"#FFC94A"},
  {id:"au8",  animal:"perruche", tier:2, name:"Distributeur auto",    add:3100,  base:2.4e6,  rate:1.18, icon:"gadget",color:"#5EC8F2"},
  {id:"au9",  animal:"chat",     tier:1, name:"Coussin chauffant",    add:3600,  base:1.8e6,  rate:1.18, icon:"hut",   color:"#F2A65A"},
  {id:"au10", animal:"chat",     tier:2, name:"Laser automatique",   add:24e3,  base:3.6e7,  rate:1.19, icon:"gadget",color:"#7CD86F"},
  {id:"au11", animal:"corgi",    tier:1, name:"Lanceur de balle auto",add:27e3,  base:2.8e7,  rate:1.18, icon:"gadget",color:"#E8A94E"},
  {id:"au12", animal:"corgi",    tier:2, name:"Niche premium",       add:180e3, base:5.5e8,  rate:1.19, icon:"hut",   color:"#C4863A"},
  {id:"au13", animal:"capybara", tier:1, name:"Onsen miniature",     add:2e5,   base:4.2e8,  rate:1.19, icon:"nest",  color:"#B08050"},
  {id:"au14", animal:"capybara", tier:2, name:"Verger de fruits",    add:13e5,  base:8.5e9,  rate:1.2,  icon:"plant", color:"#7DD36F"},
  {id:"au15", animal:"panda",    tier:1, name:"Bambouseraie",        add:16e5,  base:6.5e9,  rate:1.19, icon:"plant", color:"#8BAC0F"},
  {id:"au16", animal:"panda",    tier:2, name:"Tanière matelassée",  add:11e6,  base:1.3e11, rate:1.2,  icon:"hut",   color:"#D8D8DE"},
  {id:"au17", animal:"dragon",   tier:1, name:"Forge à trésor",      add:12e6,  base:1.1e11, rate:1.2,  icon:"gadget",color:"#FF8A3D"},
  {id:"au18", animal:"dragon",   tier:2, name:"Antre volcanique",    add:85e6,  base:2.2e12, rate:1.21, icon:"nest",  color:"#FF4D6D"}
];
function auCost(u){ return Math.floor(tieredCost(u.base, u.rate, S.aup[u.id]||0) * costMult()); }
function auUnlocked(u){
  if(!S.owned[u.animal]) return false;
  if(u.tier === 2){
    const t1 = ANIMAL_UPS.find(x=>x.animal===u.animal && x.tier===1);
    if(!t1 || !(S.aup[t1.id]>0)) return false;
  }
  return true;
}
function buyAu(u){
  if(!auUnlocked(u)) return;
  const c = auCost(u);
  if(S.coins < c) return;
  S.coins -= c; S.aup[u.id] = (S.aup[u.id]||0)+1;
  bump("buys",1); sfx("buy"); vibrate(6);
  save(); renderHUD(); refreshLists();
}
const RAU = {};
function refreshAnimalUps(){
  const box = document.getElementById("listAnimalUp"); if(!box) return;
  const visible = ANIMAL_UPS.filter(u=>S.owned[u.animal]);
  const key = visible.map(u=>u.id).join(",");
  if(box._key !== key){
    box._key = key; box.innerHTML = "";
    visible.forEach(u=>{
      const r = makeRow({emoji:"🏠", onClick:()=>buyAu(u)});
      r._name.textContent = u.name;
      box.appendChild(r); RAU[u.id] = r;
    });
  }
  visible.forEach(u=>{
    const r = RAU[u.id]; if(!r) return;
    const unlocked = auUnlocked(u), lvl = S.aup[u.id]||0, cost = auCost(u);
    setCls(r, "locked", !unlocked);
    setTxt(r._sub, unlocked ? (petById(u.animal).name+" · niv. "+lvl+" · +"+fmt(u.add)+" / sec")
                             : (petById(u.animal).name+" · nécessite le palier précédent"));
    setTxt(r._btn, "💰<br>"+fmt(cost)); setDis(r._btn, !unlocked || S.coins < cost);
  });
}
function refreshProps(){
  const el = document.getElementById("propsStrip"); if(!el) return;
  const active = ANIMALS.filter(a=>ANIMAL_UPS.some(u=>u.animal===a.id && (S.aup[u.id]||0)>0));
  const key = active.map(a=>a.id).join(",");
  if(el._key === key) return;
  el._key = key; el.innerHTML = "";
  active.forEach(a=>{
    const t2 = ANIMAL_UPS.find(u=>u.animal===a.id && u.tier===2 && (S.aup[u.id]||0)>0);
    const t1 = ANIMAL_UPS.find(u=>u.animal===a.id && u.tier===1);
    const u = t2 || t1;
    const cv = document.createElement("canvas"); cv.width=16; cv.height=16;
    const ctx = cv.getContext("2d");
    const pat = PROP_SHAPES[u.icon];
    for(let y=0;y<16;y++){ const row=(pat.px[y]||"").padEnd(16,"."); for(let x=0;x<16;x++){ if(row[x]==="A"){ ctx.fillStyle=u.color; ctx.fillRect(x,y,1,1);} } }
    el.appendChild(cv);
  });
}

/* ============================================================
   v2.5 — PALIERS DE RENAISSANCE (jusqu'à 150 niveaux, procédural)
   Chaque Renaissance déverrouille un nouveau palier de Tape ET de
   Revenu passif. 150 niveaux de contenu écrit à la main serait
   ingérable (et illisible) — nom et effet sont donc générés par
   formule ; coût et puissance grimpent avec le palier. On ne calcule
   et n'affiche que les paliers débloqués + un aperçu du suivant.
   ============================================================ */
const RT_ADJ = ["Rouillé","Robuste","Précis","Turbo","Suprême","Radiant","Astral","Quantique","Éternel","Primordial"];
const RT_NOUN = {tap:["Gant","Levier","Percuteur","Ressort","Marteau"], idle:["Rouage","Générateur","Réacteur","Noyau","Collecteur"]};
const RT_MAX = 150;
function rtDef(kind, n){
  const nouns = RT_NOUN[kind], adj = RT_ADJ[n % RT_ADJ.length];
  const wave = Math.floor(n/(RT_ADJ.length*nouns.length)) + 1;
  const name = nouns[Math.floor(n/RT_ADJ.length) % nouns.length] + " " + adj + (wave>1 ? " "+wave : "");
  return {
    id:(kind==="tap"?"rt":"ri")+n, kind, n, name,
    base:(kind==="tap"?800:1500) * Math.pow(8.5, n),
    add: (kind==="tap"?600:900)  * Math.pow(7, n),
    rate: 1.16
  };
}
let _rtN = -1, _rtTap = [], _rtIdle = [];
function ensureTierCache(){
  const n = Math.min(RT_MAX-1, S.rebirths||0);
  if(_rtN === n) return;
  _rtN = n; _rtTap = []; _rtIdle = [];
  for(let i=0;i<=n;i++){ _rtTap.push(rtDef("tap",i)); _rtIdle.push(rtDef("idle",i)); }
  if(n+1 < RT_MAX){ _rtTap.push(rtDef("tap",n+1)); _rtIdle.push(rtDef("idle",n+1)); }  // aperçu verrouillé
}
function rtCost(t){ return Math.floor(t.base * Math.pow(t.rate, S.rup[t.id]||0) * costMult()); }
function rtUnlocked(t){ return (S.rebirths||0) >= t.n; }
function buyRt(t){
  if(!rtUnlocked(t)) return;
  const c = rtCost(t);
  if(S.coins < c) return;
  S.coins -= c; S.rup[t.id] = (S.rup[t.id]||0)+1;
  bump("buys",1); sfx("buy"); vibrate(6);
  save(); renderHUD(); refreshLists();
}
const RRT = {};
function refreshRebirthTiers(){
  ensureTierCache();
  [["listRebirthTap",_rtTap,"🥊"," / tape"],["listRebirthIdle",_rtIdle,"🔧"," / sec"]].forEach(([boxId,arr,ico,unit])=>{
    const box = document.getElementById(boxId); if(!box) return;
    const key = arr.map(t=>t.id).join(",");
    if(box._key !== key){
      box._key = key; box.innerHTML = "";
      arr.forEach(t=>{
        const r = makeRow({emoji:ico, onClick:()=>buyRt(t)});
        r._name.textContent = t.name;
        box.appendChild(r); RRT[t.id] = r;
      });
    }
    arr.forEach(t=>{
      const r = RRT[t.id]; if(!r) return;
      const unlocked = rtUnlocked(t), lvl = S.rup[t.id]||0, cost = rtCost(t);
      setCls(r,"locked",!unlocked);
      setTxt(r._sub, unlocked ? ("Niv. "+lvl+" · +"+fmt(t.add)+unit) : ("Renaissance "+(t.n+1)+" requise"));
      setTxt(r._btn,"💰<br>"+fmt(cost)); setDis(r._btn, !unlocked || S.coins < cost);
    });
  });
}

/* ============================================================
   ÉCRAN D'ACCUEIL
   ============================================================ */
const HOME_GREETS = [
  "Où étais-tu passé ? Tu ne m'oublies pas hein ?!",
  "Te revoilà ! J'ai gardé la ferme au chaud.",
  "Enfin ! Je commençais à m'ennuyer tout seul.",
  "Prêt à taper encore un peu ?",
  "J'ai compté les secondes, tu sais."
];
function buildHomeBg(){
  const el = document.getElementById("homeBg"); if(!el) return;
  const pool = ["cochon","hamster","lapin","perruche","chat","corgi","capybara","panda","dragon"];
  for(let i=0;i<14;i++){
    const cv = document.createElement("canvas");
    paint(cv, pool[i % pool.length]);
    cv.style.left = (Math.random()*90)+"%";
    cv.style.top = (Math.random()*90)+"%";
    cv.style.transform = "rotate("+(Math.random()*30-15)+"deg)";
    el.appendChild(cv);
  }
}
function startHome(){
  buildHomeBg();
  document.getElementById("homeVersion").textContent = "v"+VERSION;
  const bar = document.getElementById("homeBar"), txt = document.getElementById("homeBarTxt");
  let p = 0;
  const t = setInterval(()=>{
    p += 8 + Math.random()*14;
    if(p >= 100){
      p = 100; clearInterval(t);
      txt.textContent = "Prêt !";
      document.getElementById("homePlay").style.display = "block";
      document.getElementById("homeNews").style.display = "block";
    }
    bar.style.width = p+"%";
  }, 130);
  document.getElementById("homePlay").addEventListener("click", ()=>{
    sfx("good");
    const h = document.getElementById("home");
    h.classList.add("leaving");
    setTimeout(()=>{
      h.style.display = "none";
      if(S.volBgm > 0) startBgm();
      renderPet();                 // re-peint le canvas, invisible pendant qu'il était sous l'accueil
      const gb = document.getElementById("greetBubble");
      gb.textContent = HOME_GREETS[rnd(HOME_GREETS.length)];
      gb.classList.remove("on"); void gb.offsetWidth; gb.classList.add("on");
    }, 420);
  });
  document.getElementById("homeNews").addEventListener("click", ()=>{
    let html = '<h2>Nouveautés</h2>';
    CHANGELOG.slice(0,6).forEach(c=>{
      html += '<div style="text-align:left;font-size:8.5px;color:var(--ink-soft);line-height:1.9;margin-bottom:6px">' +
        '<b style="color:var(--ink)">v'+c.v+'</b> — '+c.lines.join(" · ")+'</div>';
    });
    html += '<button class="mBtn ghost" id="mNo">Fermer</button>';
    openModal(html);
    document.getElementById("mNo").onclick = closeModal;
  });
}

/* ============================================================
   35. DÉMARRAGE
   ============================================================ */
load();
startHome();
checkPaypalReturn();
bumpStreak();
ensureTierCache();
applyTheme();
buildLists();
initLab();
buildCosmGrid();
buildAchvList();
buildWheelGradient();
renderPet();
popRarity();
renderHUD();
if(S.questDate !== today()) rollQuests();
refreshLists();
tickBanner();
/* Le menu s'ouvre toujours au démarrage — le replier reste possible pendant
   la session (double-tape sur l'animal) mais ne doit pas persister d'une
   ouverture d'app à l'autre : un testeur ne doit jamais tomber sur un menu
   caché sans savoir pourquoi. */
resume();
if(!S.starter) showStarter();
if(S.notifs) scheduleNotifs();
/* l'audio ne peut démarrer qu'après un geste : on attend la première tape */
document.addEventListener("pointerdown", function once(){
  document.removeEventListener("pointerdown", once);
  if(S.volBgm > 0) startBgm();
});
save();

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
    wcv.width  = Math.max(1, Math.floor(r.width));
    wcv.height = Math.max(1, Math.floor(r.height));
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
    {id:"mondeceleste",  name:"Monde céleste",  emoji:"☁️", unlockLvl:11, colors:["#D9CCF2","#EFE7FA"]},
    {id:"mondecosmique", name:"Monde cosmique", emoji:"🌌", unlockLvl:12, colors:["#7C6CA8","#B9A8DB"]}
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
    stageEl.style.setProperty("--habitat-c1", h.colors[0]);
    stageEl.style.setProperty("--habitat-c2", h.colors[1]);
    badge.textContent = h.emoji + " " + h.name;
  }

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
    const W = wcv.width, H = wcv.height;
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
    const ctx = wcv.getContext("2d");
    ctx.clearRect(0,0,wcv.width,wcv.height);
    const w = AMB.weather;
    if(w==="soleil") return;
    if(w==="brouillard"){
      ctx.fillStyle = "rgba(255,255,255,.16)";
      ctx.fillRect(0,0,wcv.width,wcv.height);
      return;
    }
    if(w==="pluie" || w==="orage"){
      ctx.strokeStyle = "rgba(180,210,255,.55)"; ctx.lineWidth = 1.4;
      particles.forEach(p=>{
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x, p.y+p.len); ctx.stroke();
        p.y += p.vy; if(p.y > wcv.height){ p.y = -10; p.x = Math.random()*wcv.width; }
      });
      if(w==="orage"){
        lightningT -= 1;
        if(lightningT <= 0 && Math.random() < 0.01){
          lightningT = 6;
          ctx.fillStyle = "rgba(255,255,255,.35)";
          ctx.fillRect(0,0,wcv.width,wcv.height);
        }
      }
      return;
    }
    if(w==="neige"){
      ctx.fillStyle = "rgba(255,255,255,.85)";
      particles.forEach(p=>{
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        p.y += p.vy; p.x += p.vx;
        if(p.y > wcv.height){ p.y = -5; p.x = Math.random()*wcv.width; }
      });
      return;
    }
    if(w==="vent"){
      ctx.strokeStyle = "rgba(140,170,120,.4)"; ctx.lineWidth = 2;
      particles.forEach(p=>{
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-10,p.y-3); ctx.stroke();
        p.x += p.vx*2; if(p.x > wcv.width){ p.x = -10; p.y = Math.random()*wcv.height; }
      });
      return;
    }
    if(w==="arcenciel"){
      const cx = wcv.width*0.5, cy = wcv.height*1.05, R = wcv.width*0.55;
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
   PROGRESSION — Bloc 9/25 : Niveau du joueur, XP, arbre de compétences
   Module additif : n'écrase aucune mécanique existante. Les hooks vers
   doTap/buyUp/animalClick/premiumClick/globalMult/critChance ajoutent
   un seul appel chacun, rien d'autre n'est modifié dans ces fonctions.
   ============================================================ */
(function(){
  const hudRow = document.querySelector("#hud .hud-row");
  const badge = document.createElement("div");
  badge.className = "stat";
  badge.id = "lvlBadge";
  badge.innerHTML = '<span class="ico" style="font-size:12px;line-height:1">⭐</span><span class="val" id="lvlVal">Niv. 1</span>';
  if(hudRow) hudRow.insertBefore(badge, hudRow.firstChild);

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
      toast("Niveau "+S.playerLvl+" ! +1 point de talent");
      if(typeof applyHabitat === "function") applyHabitat();
    }
    updateLvlBadge();
  };

  function updateLvlBadge(){
    const el = document.getElementById("lvlVal");
    if(el && typeof S !== "undefined") el.textContent = "Niv. "+(S.playerLvl||1);
  }

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
