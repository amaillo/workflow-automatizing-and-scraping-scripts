// ==UserScript==
// @name         Prestashop Helper
// @namespace    http://tampermonkey.net/
// @version      v0.9.2
// @description  An easier way to edit products. Tested on prestashop 1.7.8.11
// @author       Ricardo M (amaillo)
// @match        https://localhost/prestashop/admin192zohfbx/index.php/sell/catalog/products/*
// @icon         none
// @grant        none
// ==/UserScript==


// Delays main execution to ensure that
// the DOM elements are fully loaded.
setTimeout(function(){

let title = document.getElementById("form_step1_name_1")

let manufacturer = document.getElementById("select2-form_step1_id_manufacturer-container")

let elemDiv = document.createElement('div');

const allFeatureElements = document.getElementsByClassName("select2-selection__rendered")

let selectCategory = document.getElementById("ps-select-product-category")

let categoryList = document.getElementById("ui-id-1")

const pressBack = new KeyboardEvent('keydown', {
  key: 'Back',
  code: 'Back',
  which: 8,
  keyCode: 8,
});

const pressEnter = new KeyboardEvent('keydown', {
  key: 'Enter',
  code: 'Enter',
  which: 13,
  keyCode: 13,
});

const pressSpace = new KeyboardEvent('keydown', {
  key: 'Space',
  code: 'Space',
  which: 32,
  keyCode: 32,
});

const releaseSpace = new KeyboardEvent('keyup', {
  key: 'Space',
  code: 'Space',
  which: 32,
  keyCode: 32,
});

const pressDown = new KeyboardEvent('keydown', {
  key: 'ArrowDown',
  code: 'ArrowDown',
  which: 40,
  keyCode: 40,
});

const pressUp = new KeyboardEvent('keydown', {
  key: 'ArrowUp',
  code: 'ArrowUp',
  which: 38,
  keyCode: 38,
});

const releaseUp = new KeyboardEvent('keyup', {
  key: 'ArrowUp',
  code: 'ArrowUp',
  which: 38,
  keyCode: 38,
});

const pressInsert = new KeyboardEvent('keydown', {
  key: 'Insert',
  code: 'Insert',
  which: 45,
  keyCode: 45,
});

const releaseInsert = new KeyboardEvent('keyup', {
  key: 'Insert',
  code: 'Insert',
  which: 45,
  keyCode: 45,
});

const pressDelete = new KeyboardEvent('keydown', {
  key: 'Delete',
  code: 'Delete',
  which: 46,
  keyCode: 46,
});

const clippedAndFullWordsList = [{old:"7Inch",new:"7-Inch"},
                        {old:" 3S ",new:" 3 Stripes "},
                        {old:" 3s ",new:" 3 Stripes "},
                        //{old:" 1P ",new:" 1 Pack/Pairs "},//Puede ser una de dos, toca escoger
                        //{old:" 3P ",new:" 3 Pack/Pairs "},//Puede ser una de dos, toca escoger
                        {old:" 3Pk ",new:" Pack de 3 Unidades "},
                        //{old:" 2P ",new:" 2 Pack/Pairs "}, //Puede ser una de dos, toca escoger
                        //{old:" 2 P ",new:" 2 Pack/Pairs "},//Puede ser una de dos, toca escoger
                        {old:" Ath ",new:" Athletic "},
                        {old:"AG ",new:"Artificial Grass "},
                        {old:" Aviatr ",new:" Aviator "},
                        {old:" Aop ",new:" Allover Prints "},
                        {old:" AOP ",new:" Allover Prints "},
                        //{old:" Adv ",new:" Advantage/Advanced "}, //Puede ser una de dos, toca escoger
                        {old:" Acd ",new:" Academy "},
                        {old:" Agr ",new:" Agravic "},
                        {old:" Bt ",new:" Boots "},
                        {old:"Blk",new:"Black"},
                        {old:"Bkstrp",new:"Backprint"},
                        {old:" Bcl ",new:" Beach Classics "},
                        {old:" Be Cl ",new:" Beach Classics "},
                        {old:" Compr ",new:" Compression "},
                        {old:" Chlsea ",new:" Chelsea "},
                        {old:" CNY ",new:" Chinese New Year "},
                        {old:" Cn ",new:" Crew Neck "},
                        {old:" Ctas ",new:" Chuck Taylor All Star "},
                        {old:" Cfc ",new:" Chelsea FC "},
                        {old:" Crw ",new:" Crew "},
                        {old:" Drl ",new:" Drill "},
                        {old:" DBreak ",new:" Day Break "},
                        {old:" Dril ",new:" Drill "},
                        {old:" Dnc ",new:" Dance "},
                        {old:" Df ",new:" Dri-FIT "},
                        {old:" Desig ",new:" Design "},
                        {old:" D4R ",new:" Designed 4 Running "},
                        {old:" Essntl ",new:" Essential "},
                        {old:" ELT ",new:" Elite "},
                        {old:" Ess ",new:" Essentials "}, //Observar
                        {old:" ESS ",new:" Essentials "}, //Observar
                        {old:" Esy ",new:" Essentials "}, //Observar
                        {old:" Exs ",new:" Exercise "},
                        {old:" Fz ",new:" Full-Zip "},
                        {old:" FZ ",new:" Full-Zip "},
                        {old:" Fl ",new:" Fleece "},
                        {old:" FL ",new:" Fleece "},
                        {old:" Fi ",new:" Future Icons "},
                        {old:" FI ",new:" Future Icons "},
                        {old:" Flc ",new:" Fleece "},
                        {old:"FQP",new:"FIFA Quality Pro"},
                        {old:" Fx ",new:" Fixed "},
                        {old:" Ft ",new:" French Terry "},
                        {old:" FT ",new:" French Terry "},
                        {old:" Fcb ",new:" FC Barcelona "},
                        {old:"FtblCore",new:"Football Core"},
                        {old:"ftblHeritage",new:"Football Heritage"},
                        {old:"ftblArchive",new:"Football Archive"},
                        {old:"FSHN",new:"Fashion"},
                        {old:"funcional Classics",new:"Utility Classics"},
                        {old:"FG",new:"Firm Ground"},
                        {old:"Gráfica",new:"Graphic Tee"}, //Observar
                        {old:" Gk ",new:" Goalkeeper "},
                        {old:" Hd ",new:" Hooded "},
                        {old:" Hmlfirst ",new:" First "},
                        {old:" Hb ",new:" Windbreaker "},
                        {old:" Hz ",new:" Half-Zip "},
                        {old:" Hdy ",new:" Hoodie "},
                        {old:" Hr ",new:" High-Rise "},
                        {old:" Hw ",new:" High Waist "},
                        {old:" Happinessforeve ",new:" Happiness Forever "},
                        {old:" Hopeyoubelieve ",new:" Hope You Believe "},
                        {old:" Hc ",new:" Hard Court "},
                        {old:" HKNE ",new:" Hakone "},
                        {old:" Hjacket ",new:" Hooded Jacket "},
                        {old:" Half Zi ",new:" Half-Zip "},
                        {old:" Juvents ",new:" Juventus "},
                        {old:" Jkt ",new:" Jacket "},
                        {old:" Jket ",new:" Jacket "},
                        {old:" Jckt ",new:" Jacket "},
                        {old:" Jsy ",new:" Jersey "},
                        {old:"Jg ",new:"Joggers "},
                        {old:" Jggr ",new:" Joggers "},
                        {old:" J Ess ",new:" Jordan Essential "},
                        {old:" Kbec ",new:" Kennebec "},
                        {old:" KP ",new:" Knit Pants "},
                        {old:" KM ",new:" Kylian Mbappé "},
                        {old:" Lif ",new:" Lifestyle "},
                        {old:" Ls ",new:" Long Sleeve "},
                        {old:" LS",new:" Long Sleeve"},
                        {old:" LGE ",new:" League "},
                        {old:" Lggng ",new:" Leggins "},
                        {old:" Lth ",new:" Leather "},
                        {old:" Mapf1 ",new:" Mercedes-AMG Petronas Motorsport F1 "},
                        {old:" MAPF1 ",new:" Mercedes-AMG Petronas Motorsport F1 "},
                        {old:" Mr ",new:" Mid-Rise "},
                        {old:" MRL ",new:" Morelia "},
                        {old:" MG ",new:" Multi-Ground "},
                        {old:" M20 ",new:" Marathon 20 "},
                        {old:" Mnk ",new:" M Nike "},
                        {old:"Mng",new:"Monogram"},
                        {old:" MDS ",new:" Mercurial Dream Speed "},
                        {old:"MMS",new:"M Motorsports"},
                        {old:" Mb ",new:" Mont Blanc "},
                        {old:" Mv ",new:" Mission Victory "},
                        {old:" Mt ",new:" Multi "},
                        {old:" Mdlyr ",new:" Midlayer "},
                        {old:" Nsw ",new:" Nike Sportswear "},
                        {old:" Nk ",new:" Nike "},
                        {old:" Nikecourt ",new:" Nike Court "},
                        {old:" Nckt ",new:" Nike Court "},
                        {old:" Np ",new:" Nike Pro "},
                        {old:" Nb ",new:" New Balance "},
                        {old:" Org ",new:" Original "},
                        {old:" OM ",new:" Olympique de Marseille "},
                        {old:" Om ",new:" Olympique de Marseille "},
                        {old:" Os ",new:" Oversize "},
                        {old:" Ovrszd ",new:" Oversized "},
                        {old:" Otr ",new:" Own The Run "},
                        {old:"Opt",new:"Optime"},
                        {old:" OL ",new:" Olympique de Lyon "},
                        {old:" Phnx ",new:" Phoenix "},
                        {old:" Psg ",new:" Paris Saint-Germain "},
                        {old:" PSG ",new:" Paris Saint-Germain "},
                        {old:" Pnt ",new:" Pants "},
                        {old:" Po ",new:" Pullover "},
                        {old:" Pullo ",new:" Pullover "},
                        {old:" Prnt ",new:" Print "},
                        {old:" Pr ",new:" Premium Essential "}, // Puede fallar?
                        {old:" Pt ",new:" Pants "},
                        {old:" Pow Er ",new:" Power "},
                        {old:" Qtr ",new:" Quart "},
                        {old:" QPR ",new:" Queens Park Rangers "},
                        {old:" Rain J ",new:" Rain Jacket "},
                        {old:" Ri ",new:" Reebok Identity "},
                        {old:" Rn ",new:" Round Neck "},
                        {old:" Rev ",new:" Reversible "},
                        {old:" Ss ",new:" Short Sleeve "},
                        {old:" Sl ",new:" Slim Fit "},
                        {old:" SG ",new:" Soft Ground "},
                        {old:" SL ",new:" Superlight "},
                        {old:" Sho ",new:" Shorts "},
                        {old:" Shrt ",new:" Short "},
                        {old:" Sphr ",new:" Sphere "},
                        {old:" Sw ",new:" Swoosh "}, // Puede fallar
                        {old:" Swsh ",new:" Swoosh "},
                        {old:" Si ",new:" Standard Issue "},
                        {old:" Strk ",new:" Strike "},
                        {old:" Strke ",new:" Strike "},
                        {old:" Sil ",new:" Silicone "},
                        {old:" SW ",new:" Star Wars "},
                        {old:"Swhoody",new:"Sweat Hoodie"},
                        {old:" Txfloocelt ",new:" Terrex Tech Fleece "},
                        {old:" TR23 ",new:" Tiro23 "},
                        {old:" Tt ",new:" Track Top "},
                        {old:" Tf ",new:" Techfit "},
                        {old:" TF ",new:" Turf "},
                        {old:" Tiro Wrm ",new:" Tiro Warm "},
                        {old:" TRN ",new:" Training "},
                        {old:"Trphy23",new:"Trophy23"},
                        {old:" Tr-Es ",new:" Train Essentials "},
                        {old:" Thrma ",new:" Therma "},
                        {old:" Trk Pnt ",new:" Track Pants "},
                        {old:" Tri J",new:" Triangle Bikini Top"},
                        {old:" Tc ",new:" Train Cotton Performance "},
                        {old:" Tght ",new:" Tight "},
                        {old:"Tshirtrn",new:"T-shirt Rn"},
                        {old:" Ua ",new:" Under Armour "},
                        {old:" Windbre ",new:" Windbreaker "},
                        {old:" Ww ",new:" Windwave "},
                        {old:" Wb ",new:" Windbreaker "},
                        {old:" Wp ",new:" Waterproof "},
                        {old:" Wor ",new:" Workout "},
                        {old:" Wvn ",new:" Woven "},
                        {old:" XPR ",new:" Xperior "}
                       ]

const changeForThisWordsList = [
                       {old:"Botas y Botines ",new:"Botas/Botines "}, //Puede ser una de dos, toca escoger
                       {old:"Bota ",new:"Botas "},
                       {old:"Braguitas ",new:"Braguita "},
                       {old:"Beisbol",new:"Béisbol"},
                       {old:"Balon ",new:"Balón "},
                       {old:"Bolsa ",new:"Bolso "},
                       {old:" Bebés ",new:" Bebé "},
                       {old:"Chandal ",new:"Chándal "},
                       {old:"Cazadora ",new:"Chaqueta Cazadora "},
                       {old:"Chaqueta Con Cremallera Completa ",new:"Chaqueta "},
                       {old:"Chaqueta Impermeable ",new:"Chubasquero "},
                       {old:"Casullas ",new:"Camiseta Sin Mangas "},
                       {old:"Casulla ",new:"Camiseta Sin Mangas "},
                       {old:"Calcetin ",new:"Calcetines "},
                       {old:"Chancletas ",new:"Chanclas "},
                       {old:"Chancla ",new:"Chanclas "},
                       {old:"Cinturon",new:"Cinturón"},
                       {old:"Cinturon",new:"Cinturón"},
                       {old:"Cisne ",new:"Camiseta/Chaqueta Cuello Cisne "}, //Puede ser una de dos, toca escoger
                       {old:"Camisetas ",new:"Camiseta "},
                       {old:"Camiseta corta",new:"Camiseta"},
                       {old:"De Baseball",new:"de Béisbol"},
                       {old:" De Padel ",new:" de Pádel "},
                       {old:"Top De Training",new:"Sujetador Deportivo"},
                       {old:" De Plumón ",new:" Acolchada "},
                       {old:" De Invierno ",new:" Polar "},
                       {old:" De Manga Larga ",new:" Manga Larga "},
                       {old:" De Plumas ",new:" Acolchada "},
                       {old:" De Cintura Alta ",new:" Largas "},
                       {old:" De ",new:" de "},
                       {old:" Deportivos ",new:" Deportivo "},
                       {old:"Equipacion",new:"Equipación"},
                       {old:"Entrenadores",new:"Zapatillas"},
                       {old:"Formadores",new:"Zapatillas"},
                       {old:"Guante ",new:"Guantes "},
                       {old:"Jersei",new:"Jersey"},
                       {old:"Jóvenes",new:"Juvenil"},
                       {old:"Levi´S",new:"Levi's"},
                       {old:"Levi´s",new:"Levi's"},
                       {old:"Malla Pirata",new:"Mallas Piratas"},
                       {old:"Malla Larga",new:"Mallas Largas"},
                       {old:"Malla Corta",new:"Mallas Cortas"},
                       {old:"Mangas Largas",new:"Manga Larga"},
                       {old:"Mono ",new:"Peto "},
                       {old:"Malla ",new:"Mallas "},
                       {old:" Marron",new:" Marrón"},
                       {old:"Medias",new:"Calcetines"},
                       {old:"Niños Pequeños",new:"Infantil"},
                       {old:" Niños",new:" Infantil"},
                       {old:" Niño",new:" Infantil"},
                       {old:" Niña",new:" Infantil"},
                       {old:" Niñas",new:" Infantil"},
                       {old:" Natacion ",new:" Natación "},
                       {old:"Pantalones ",new:"Pantalón "},
                       {old:"Pantalon ",new:"Pantalón "},
                       {old:"Pantalón Cortos",new:"Pantalón Corto"},
                       {old:"Pantalón Corto Compresión ",new:"Mallas Cortas "},
                       {old:"Pantalón Corto de Compresión ",new:"Mallas Cortas "},
                       {old:"Poncho ",new:"Sudadera "},
                       {old:" Recién Nacidos",new:" Bebé"},
                       {old:"Shorts ",new:"Pantalón Corto "},
                       {old:"Zapatilla ",new:"Zapatillas "},
                       {old:"Zapatos ",new:"Zapatillas "},
                       {old:"Zapato ",new:"Zapatillas "},
                       {old:" PUMA POWER ",new:" Puma Power "},
                       {old:"PUMA",new:"Puma"},
                       {old:" POWER",new:" Power"},
                       {old:"PETRONAS",new:"Petronas"},
                       {old:" SEASONS",new:" Seasons"},
                       {old:" CLASSICS CAFE",new:" Classics Cafe"},
                       {old:" CLASSICS UTILITY",new:" Classics Utility"},
                       {old:" CLASSICS",new:" Classics"},
                       {old:" OPEN ROAD",new:" Open Road"},
                       {old:" ESS+ MINIMAL GOLD",new:" Ess+ Minimal Gold"},
                       {old:" ESS+",new:" Ess+"},
                       {old:" MOTION",new:" Motion"},
                       {old:"SQUAD",new:" Squad"},
                       {old:"TEAM",new:" Team"},
                      ]

const alwaysInUppercaseWordsList = [{old:" Fc ",new:" FC "},
                       {old:"Gtx",new:"GTX"},
                       {old:"Gfx",new:"GFX"},
                       {old:"Bmw",new:"BMW"},
                       {old:"Sds",new:"SDS"},
                        {old:"Hbr",new:"HBR"},
                        {old:" Ii ",new:" II "},
                        {old:" Iii ",new:" III "},
                        {old:" Iv ",new:" IV "},
                        {old:" Nyc ",new:" NYC "},
                        {old:" Ugg ",new:" UGG "},
                        {old:"-amg ",new:"-AMG "}
                      ]

const deleteIfAppearsWordsList = [
                       {old:" de manga corta ",new:" "},
                       {old:" de outdoor ",new:" "},
                       {old:" de chándal ",new:" "},
                       {old:" de Chándal ",new:" "},
                       {old:" de talle alto ",new:" "},
                       //{old:" de Compresión ",new:" Manga Larga de Compresión "},
                       {old:" de automovilismo ",new:" "},
                       {old:" De La ",new:" "},
                       {old:" de La ",new:" "},
                       {old:"Hml",new:""},
                       {old:" Con Media Cremallera ",new:" "},
                       {old:" Media Cremallera ",new:" "},
                       {old:" Byj0",new:""},
                       {old:" Bsp0",new:""},
                       {old:" Cqy0",new:""},
                       {old:" Crb0",new:""},
                       {old:" Cns0",new:""},
                       {old:" Otlr",new:""},
                       {old:" Kvj0",new:""},
                       {old:" Bla0",new:""}]

// Obtains the last vowel of the first word
// to determine the grammatical gender or number.
function endVowel(x){
   const match = x.match(/[aeiou]([^aeiou]*?)(?= |$)/i);
    if(match.includes("as")){
       return "as";
    }else if(match.includes("o")){
       return "o";
    }else if(match.includes("a")){
       return "a";
    }
}

// Searches through predefined dictionaries to find
// and replace abbreviations and correct syntax.
function wordsListManager(){

    for(const obj of clippedAndFullWordsList){
      if(title.value.includes(obj.old)===true){

          document.getElementById("form_step1_name_1").value = document.getElementById("form_step1_name_1").value.replace(obj.old,obj.new)
      }
    }

    for(const obj of changeForThisWordsList){
        if(title.value.includes(obj.old)===true){
            document.getElementById("form_step1_name_1").value = document.getElementById("form_step1_name_1").value.replace(obj.old,obj.new)
        }
    }

    for(const obj of alwaysInUppercaseWordsList){
        if(title.value.includes(obj.old)===true){
            document.getElementById("form_step1_name_1").value = document.getElementById("form_step1_name_1").value.replace(obj.old,obj.new)
        }
    }

    for(const obj of deleteIfAppearsWordsList){
        if(title.value.includes(obj.old)===true){
            document.getElementById("form_step1_name_1").value = document.getElementById("form_step1_name_1").value.replace(obj.old,obj.new)
        }
    }
}

// Standardizes the first word of the title
// and applies specific grammatical rules.
function changeFirstWordTo(){

    if(title.value.split(" ")[0]==="Leggings"){
      title.value = title.value.replace("Leggings","Mallas")
    }

    if(title.value.split(" ")[0]==="Parka"){
        title.value = title.value.replace("Parka","Chaqueta Parka")
    }

    if(title.value.split(" ")[0]==="Pantalón"&& title.value.split(" ")[1]!="Corto"&& title.value.split(" ")[1]!="Cortos"&&title.value.split(" ")[1]!="Largo"){
      title.value = title.value.replace("Pantalón","Pantalón Largo")
    }

    if(title.value.split(" ")[0]==="Sneakers"){
        title.value = title.value.replace("Sneakers","Zapatillas")
    }

    if(title.value.split(" ")[0]==="Set"){
      title.value = title.value.replace("Set","Conjunto")
    }

    if(title.value.split(" ")[0]==="Impermeable"){
        title.value = title.value.replace("Impermeable","Chubasquero")
    }

    if(title.value.split(" ")[0]==="Boxers"||title.value.split(" ")[1]==="Boxers"||title.value.split(" ")[2]==="Boxers"){
      title.value = title.value.replace("Boxers","Calzoncillos Bóxer")
    }

    if(title.value.split(" ")[0]==="Leggings"){
        title.value = title.value.replace("Leggings","Mallas")
    }

    if(title.value.split(" ")[0]==="Legging"){
        title.value = title.value.replace("Legging","Mallas")
    }

    if(title.value.includes("de campana")===true){
        title.value = title.value.replace("de campana ","")
        title.value = title.value.replace("Mallas","Mallas de Campana")
    }

    if(title.value.toLowerCase().includes("equipación")===true&&title.value.toLowerCase().includes("de fútbol")===false){

        if(title.value.split(" ")[1].toLowerCase()==="corto"){
            let tempTitle = title.value.split(" ")
            tempTitle.splice(2,0,"de Fútbol")
            title.value = tempTitle.join(" ")
        }else if(title.value.split(" ")[1].toLowerCase()==="largo"){
            let tempTitle = title.value.split(" ")
            tempTitle.splice(2,0,"de Fútbol")
            title.value = tempTitle.join(" ")
        }else{
            let tempTitle = title.value.split(" ")
            tempTitle.splice(1,0,"de Fútbol")
            title.value = tempTitle.join(" ")
        }
    }

    if(title.value.toLowerCase().includes("portero")===true&&title.value.toLowerCase().includes("guantes")===true){
        let tempTitle = title.value.replace(" portero","").replace(" Portero","").split(" ")
        tempTitle.splice(1,0,"de Portero")
        title.value = tempTitle.join(" ")
    }

    if(title.value.toLowerCase().includes("1/4")===true&&title.value.toLowerCase().includes("chaqueta")===true){
        const tempTitle = title.value.replace("1/4 ","").replace("cremallera ","").replace("Cremallera ","").replace("Chaqueta","Camiseta")
        title.value = tempTitle
    }

    if(title.value.toLowerCase().includes("manga larga")===true){
        let tempTitle = title.value.replace(" Manga Larga "," ")
        tempTitle = tempTitle.split(" ")
        tempTitle.splice(1,0,"Manga Larga")
        title.value = tempTitle.join(" ")
    }

    if(title.value.toLowerCase().includes("pantalón corto")===true&&title.value.toLowerCase().split(" ")[0]!="pantalón"&&title.value.toLowerCase().split(" ")[0]!="conjunto"){

        let tempTitle = title.value.replace(" Pantalón Corto "," ")
        tempTitle = tempTitle.split(" ")
        tempTitle.splice(0,0,"Pantalón Corto")
        title.value = tempTitle.join(" ")
    }


    if(title.value.includes("de sportwear")===true){
       const lastVowel = endVowel(title.value)

        if(lastVowel==="a"||lastVowel==="á"){
            title.value = title.value.replace("de sportwear","Deportiva")
        }else if(lastVowel==="o"||lastVowel==="ó"){
            title.value = title.value.replace("de sportwear","Deportivo")
        }else if(lastVowel==="as"||lastVowel==="as"){
            title.value = title.value.replace("de sportwear","Deportivas")
        }
        else{
            title.value = title.value.replace("de sportwear","Deportivo")
        }
    }

    if(title.value.includes("de Deporte")===true){

        const lastVowel = endVowel(title.value)
        //console.log(lastVowel)
        if(lastVowel==="a"||lastVowel==="á"){
            title.value = title.value.replace("de Deporte","Deportiva")
        }else if(lastVowel==="o"||lastVowel==="ó"){
            title.value = title.value.replace("de Deporte","Deportivo")
        }else if(lastVowel==="as"||lastVowel==="as"){
            title.value = title.value.replace("de Deporte","Deportivas")
        }
        else{
            title.value = title.value.replace("de Deporte","Deportivo")
        }
    }
}

// Extracts terms related to gender or demographics,
// translates them and relocates them to the end of the title.
function moveGenreToEndAndTranslate(){
    const genres = [" Hombre "," Hombres "," hombre "," Mujer "," Mujeres "," mujer "," Juvenil "," Men "," M ", " W "," Y "," Youth K ",
                    " Youth B ", " Youth G "," Youth "," K ", " B ", " G "," Jrs", " Infantil "," Bebé "," Chico ", " Chica "," Chicos ", " Chicas "]

    const rejectList = ["G Infantil", "K Infantil", "B Infantil","G Juvenil","B Juvenil"]

     for(const reject of rejectList){

         if(title.value.includes(reject)===true){
             return
         }
    }

    for(const gender of genres){
      if(title.value.includes(" de"+gender)===true){
          title.value = title.value.replace(" de"+gender,gender)
      }else if(title.value.includes(" Para"+gender)===true){

          title.value = title.value.replace(" Para"+gender,gender)
      }

      if(title.value.includes(gender)===true){
          document.getElementById("form_step1_name_1").value = document.getElementById("form_step1_name_1").value.replace(gender," ") + ` ${translateLetter(gender)}`
          return
      }
    }
}

// Move prefixes like "Pack de" to the beginning
// to relocate them to the end in a standardized format.
function moveToEnd(){
    if(title.value.split(" ")[0]+" "+ title.value.split(" ")[1]==="Pack de"){
        title.value = title.value.replace("Pack de ","")
        title.value = title.value+ " Pack de X Unidades"
    }

    if(title.value.split(" ")[0]+" "+ title.value.split(" ")[1]==="Juego de"){
        title.value = title.value.replace("Juego de ","")
        title.value = title.value+ " X Pares/Pack de X"
    }
        if(title.value.split(" ")[1]+" "+ title.value.split(" ")[2]==="de Portero"){
        title.value = title.value.replace("de Portero ","")
        title.value = title.value+ " Portero"
    }
}

// Translates codes and terms into standardized gender categories.
function translateLetter(letter){
    if(letter===" M "||letter===" Men "||letter===" Hombre "||letter===" Hombres "||letter===" hombre "){
        return "Hombre"
    }
    else if(letter===" W "|| letter===" Women "||letter===" Mujer "||letter===" Mujeres "||letter===" mujer "){
    return "Mujer"
    }
    else if(letter===" Y "||letter===" Youth "||letter===" Juvenil "||letter===" juvenil "){
    return "Juvenil"
    }
    else if(letter===" Youth B "){
    return "Youth B Juvenil"
    }
    else if (letter===" Youth G "){
    return "Youth G Juvenil"
    }
    else if (letter===" Bebé "){
    return "Bebé"
    }
    else if(letter===" K "||letter===" Infantil "||letter===" Chica "||letter===" Chico "||letter===" Chicas "||letter===" Chicos "){
    return "Infantil"
    }
    else if(letter===" B "){
    return "B Infantil"
    }
    else if (letter===" G "){
    return "G Infantil"
    }
    else if (letter===" Jrs "){
    return "Jrs Infantil"
    }

}

// Determine gender (m, w, k) by analyzing the
// title or attribute of Department.// Maps the product name to a category
// and manages automatic selection in the UI.
function getGender(){
    let departmentGender = ""
    const titleInLowerCase = title.value.toLowerCase()

    for(const index in allFeatureElements){

        if(allFeatureElements[index].title==="Departamento"){
            departmentGender = allFeatureElements[Number(index)+1].title
        }
    }

    if(titleInLowerCase.includes("hombre")
      ||titleInLowerCase.includes("masculino")
      ||titleInLowerCase.includes(" m ")
      ||titleInLowerCase.includes(" men ")
      ||titleInLowerCase.includes(" man ")){

        return "m"
    }else if(titleInLowerCase.includes("mujer")
      ||titleInLowerCase.includes("femenino")
      ||titleInLowerCase.includes(" w ")
      ||titleInLowerCase.includes(" women ")
      ||titleInLowerCase.includes(" woman ")){

        return "w"
    }else if(titleInLowerCase.includes("niñ")
      ||titleInLowerCase.includes("infantil")
      ||titleInLowerCase.includes("juvenil")
      ||titleInLowerCase.includes(" k ")
      ||titleInLowerCase.includes(" g ")
      ||titleInLowerCase.includes(" b ")
      ||titleInLowerCase.includes(" kid ")
      ||titleInLowerCase.includes(" girl")
      ||titleInLowerCase.includes(" boy")
      ||titleInLowerCase.includes(" y ")
      ||titleInLowerCase.includes(" youth ")
      ||titleInLowerCase.includes(" bebe")
      ||titleInLowerCase.includes(" bebé")
      ||titleInLowerCase.includes(" beby")
      ||titleInLowerCase.includes(" jrs")
      ||titleInLowerCase.includes(" junior")){

        return "k"
    }

    if(departmentGender==="HOMBRE"){

        return "m"
    }else if(departmentGender==="BEBE"
    ||departmentGender==="JUNIOR"
    ||departmentGender==="KIDS"
    ||departmentGender==="Niños"
    ||departmentGender==="NIÑO"){

        return "k"
    }else if(departmentGender==="MUJER"){

        return "w"
    }

    return "No Gender"
}

// Maps the product name to a category
// and manages automatic selection in the UI.
async function typeCategory(){
    const itemTitleInParts = title.value.split(" ")
    let nameToUseAsCategory = ""

    if(itemTitleInParts[0]==="Chaqueta"){
        nameToUseAsCategory = "Abrigo"
    }else if(itemTitleInParts[0]==="Zapatillas"){
        nameToUseAsCategory = "Zapatillas"
    }else if(itemTitleInParts[0]==="Chaleco"){
        nameToUseAsCategory = "Chaleco"
    }else if(itemTitleInParts[0]==="Sudadera"){
        nameToUseAsCategory = "Sudadera"
    }else if(itemTitleInParts[0]==="Camiseta"&&title.value.toLowerCase().includes("manga larga")===true){
        nameToUseAsCategory = "Camisetas de Manga Larga"
    }else if(itemTitleInParts[0]==="Camiseta"){
        nameToUseAsCategory = "Camisetas"
    }else if(itemTitleInParts[0]==="Pantalón"&&itemTitleInParts[1]==="Corto"){
        nameToUseAsCategory = "Pantalones cortos"
    }else if(itemTitleInParts[0]==="Pantalón"&&itemTitleInParts[1]==="Largo"){
        nameToUseAsCategory = "Pantalones largos"
    }else if(itemTitleInParts[0]==="Botas"&&title.value.toLowerCase().includes("fútbol")===true){
        nameToUseAsCategory = "botas futbol"
    }else if(itemTitleInParts[0]==="Braguita"&&title.value.toLowerCase().includes("bikini")===true||itemTitleInParts[0]==="Bikini"){
        nameToUseAsCategory = "bikini"
    }else if(itemTitleInParts[0]==="Falda"){
        nameToUseAsCategory = "Falda"
    }else if(itemTitleInParts[0]==="Braguita"||itemTitleInParts[0]==="Braguitas"){
        nameToUseAsCategory = "Ropa interior"
    }else if(itemTitleInParts[0]==="Calcetines"){
        nameToUseAsCategory = "Calcetines"
    }else if(itemTitleInParts[0]==="Chanclas"){
        nameToUseAsCategory = "Chanclas"
    }else if(itemTitleInParts[0]==="Top"&&title.value.toLowerCase().includes("shirt")===true){ //En pruebas
        nameToUseAsCategory = "Camiseta"
    }else if(itemTitleInParts[0]==="Sujetador"||itemTitleInParts[0]==="Top"){
        nameToUseAsCategory = "Tops"
    }else if(itemTitleInParts[0]==="Balón"&&title.value.toLowerCase().includes("de fútbol")===true){
        nameToUseAsCategory = "Pelotas Fútbol"
    }else if(itemTitleInParts[0]==="Balón"&&title.value.toLowerCase().includes("de baloncesto")===true){
        nameToUseAsCategory = "Pelotas Baloncesto"
    }else if(itemTitleInParts[0]==="Balón"){
        nameToUseAsCategory = "Pelota"
    }else if(itemTitleInParts[0]==="Zuecos"){
        nameToUseAsCategory = "Zapatillas"
    }else if(itemTitleInParts[0]==="Braga"&&title.value.toLowerCase().includes("de cuello")===true){
        nameToUseAsCategory = "Bufanda"
    }else if(itemTitleInParts[0]==="Conjunto"){
        nameToUseAsCategory = "Conjunto"
    }else if(itemTitleInParts[0]==="Muslera"){
        nameToUseAsCategory = "Muslera"
    }else if(itemTitleInParts[0]==="Manguito"){
        nameToUseAsCategory = "Manguito"
    }else if(itemTitleInParts[0]==="Mascarilla"){
        nameToUseAsCategory = "Mascarilla"
    }else if(itemTitleInParts[0]==="Pizarra"){
        nameToUseAsCategory = "Pizarra"
    }else if(itemTitleInParts[0]==="Clavija"||itemTitleInParts[0]==="Clavijas"){
        nameToUseAsCategory = "Clavija"
    }else if(itemTitleInParts[0]==="Mesa"){
        nameToUseAsCategory = "Mesa"
    }else if(itemTitleInParts[0]==="Banda"){
        nameToUseAsCategory = "Banda"
    }else if(itemTitleInParts[0]==="Sandalias"){
        nameToUseAsCategory = "Sandalias"
    }else if(itemTitleInParts[0]==="Compresas"||itemTitleInParts[0]==="Compresa"){
        nameToUseAsCategory = "Compresa"
    }else if(itemTitleInParts[0]==="Bañador"){
        nameToUseAsCategory = "Bañador"
    }else if(itemTitleInParts[0]==="Espinilleras"){
        nameToUseAsCategory = "Espinilleras"
    }else if(itemTitleInParts[0]==="Coderas"){
        nameToUseAsCategory = "Coderas"
    }else if(itemTitleInParts[0]==="Estantería"){
        nameToUseAsCategory = "Estanterias"
    }else if(itemTitleInParts[0]==="Manga"){
        nameToUseAsCategory = "Mangas de compresion"
    }else if(itemTitleInParts[0]==="Colchonetas"){
        nameToUseAsCategory = "Colchonetas"
    }else if(itemTitleInParts[0]==="Botas"){
        nameToUseAsCategory = "Botas"
    }else if(itemTitleInParts[0]==="Botella"){
        nameToUseAsCategory = "Botella"
    }else if(itemTitleInParts[0]==="Cuello Térmico"){
        nameToUseAsCategory = "Bufanda"
    }else if(itemTitleInParts[0]==="Chándal"){
        nameToUseAsCategory = "Chandal"
    }else if(itemTitleInParts[0]==="Chubasquero"){
        nameToUseAsCategory = "Chubasquero"
    }else if(itemTitleInParts[0]==="Gorra"||itemTitleInParts[0]==="Visera"||itemTitleInParts[0]==="Visor"){
        nameToUseAsCategory = "Gorra"
    }else if(itemTitleInParts[0]==="Gorro"){
        nameToUseAsCategory = "Gorro"
    }else if(itemTitleInParts[0]==="Jersey"){
        nameToUseAsCategory = "jers"
    }else if(itemTitleInParts[0]==="Bomba"){
        nameToUseAsCategory = "Bomba de aire"
    }else if(itemTitleInParts[0]==="Bandera"){
        nameToUseAsCategory = "Bandera"
    }else if(itemTitleInParts[0]==="Brazales"){
        nameToUseAsCategory = "Brazales"
    }else if(itemTitleInParts[0]==="Cinta"){
        nameToUseAsCategory = "Cinta"
    }else if(itemTitleInParts[0]==="Mallas"){
        nameToUseAsCategory = "Leggings"
    }else if(itemTitleInParts[0]==="Mochila"||itemTitleInParts[0]==="Bolso"||itemTitleInParts[0]==="Bolsa"){
        nameToUseAsCategory = "Mochila"
    }else if(itemTitleInParts[0]==="Monedero"){
        nameToUseAsCategory = "Monedero"
    }else if(itemTitleInParts[0]==="Muñequera"){
        nameToUseAsCategory = "Muñequera"
    }else if(itemTitleInParts[0]==="Raqueta"){
        nameToUseAsCategory = "Raqueta"
    }else if(itemTitleInParts[0]==="Conjunto"){
        nameToUseAsCategory = "Conjunto"
    }else if(itemTitleInParts[0]==="Disco"){
        nameToUseAsCategory = "Disco"
    }else if(itemTitleInParts[0]==="Discos"){
        nameToUseAsCategory = "Discos"
    }else if(itemTitleInParts[0]==="Diadema"){
        nameToUseAsCategory = "Diadema"
    }else if(itemTitleInParts[0]==="Pala"){
        nameToUseAsCategory = "Pala"
    }else if(itemTitleInParts[0]==="Cuerda"){
        nameToUseAsCategory = "Cuerda"
    }else if(itemTitleInParts[0]==="Peto"){
        nameToUseAsCategory = "Peto"
    }else if(itemTitleInParts[0]==="Casco"){
        nameToUseAsCategory = "Casco"
    }else if(itemTitleInParts[0]==="Camisa"){
        nameToUseAsCategory = "Camisa"
    }else if(itemTitleInParts[0]==="Polo"){
        nameToUseAsCategory = "Polo"
    }else if(itemTitleInParts[0]==="Vestido"){
        nameToUseAsCategory = "Vestido"
    }else if(itemTitleInParts[0]==="Toalla"){
        nameToUseAsCategory = "Toalla"
    }else if(itemTitleInParts[0]==="Cartera"){
        nameToUseAsCategory = "Cartera"
    }else if(itemTitleInParts[0]==="Guantes"){
        nameToUseAsCategory = "Guantes"
    }else if(itemTitleInParts[0]==="Hiyab"){
        nameToUseAsCategory = "Hiyab"
    }else if(itemTitleInParts[0]==="Cinturón"){
        nameToUseAsCategory = "Cinturones"
    }else if(itemTitleInParts[0]==="Calzoncillos"){
        nameToUseAsCategory = "Calzoncillos"
    }else if(itemTitleInParts[0]==="Bandolera"){
        nameToUseAsCategory = "Mochila"
    }else if(itemTitleInParts[0]==="Correas"){
        nameToUseAsCategory = "Correas"
    }else if(itemTitleInParts[0]==="Bufanda"){
        nameToUseAsCategory = "Bufanda"
    }else if(itemTitleInParts[0]==="Boxers"||itemTitleInParts[0]==="Bóxers"){
        nameToUseAsCategory = "Calzoncillos"
    }else{
        nameToUseAsCategory = ""
    }

    selectCategory.value = nameToUseAsCategory
    selectCategory.focus()
    selectCategory.dispatchEvent(pressInsert)

    if(title.value.includes("Camiseta")===true&&title.value.includes("Manga Larga")===false){return}

// Observer callback to confirm the
// category based on the detected gender.
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                const gender = getGender()

                if(gender==="No Gender"){return}

                const childNodes = document.getElementById("ui-id-1").childNodes
                childNodes.forEach((node, index) => {

                    if(node.textContent.toLowerCase().includes("hombre")&&gender==="m"){
                        node.click()
                        selectCategory.value = nameToUseAsCategory + " Hombre"
                        document.getElementsByClassName("pstaggerClosingCross")[0].click()
                        observer.disconnect()
                    }else if (node.textContent.toLowerCase().includes("mujer")&&gender==="w") {
                        node.click()
                        selectCategory.value = nameToUseAsCategory + " Mujer"
                        document.getElementsByClassName("pstaggerClosingCross")[0].click()
                        observer.disconnect()
                    }else if (node.textContent.toLowerCase().includes("niño")&&gender==="k") {
                        node.click()
                        document.getElementsByClassName("pstaggerClosingCross")[0].click()
                        node.click()
                        selectCategory.value = nameToUseAsCategory + " Niño"
                        observer.disconnect()
                    }
                })
            }
        }
    };
    elementsObserver(callback,document.getElementById("ui-id-1"))
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Wrapper for MutationObserver that monitors
// changes in DOM elements.
function elementsObserver(callback,targetNode){

    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);


    observer.observe(targetNode, config);
}

// Navigate through lists of options by simulating
// up/down arrow presses.
function pickNewOption(oldName,newName,focusedElement,optionListElement){
    let i = 0
    let newNameIndex = 0
    let oldNameIndex = 0

    while(optionListElement.options[i]){

        if(optionListElement.options[i].text.toLowerCase()===newName.toLowerCase()){
            newNameIndex = i
            break
        }
        i=i+1
    }
    i =0
    while(optionListElement.options[i]){
        if(optionListElement.options[i].text.toLowerCase()===oldName.toLowerCase()){
            oldNameIndex = i
            break
        }
        i=i+1
    }

    if(newNameIndex=== 0||oldNameIndex === 0){return}

    if(newNameIndex<oldNameIndex){
        i = oldNameIndex

        while(i>newNameIndex){
            focusedElement.dispatchEvent(pressUp)
            i=i-1
        }
    }
    else if(oldNameIndex<newNameIndex){
        i = oldNameIndex
        while(i<newNameIndex){
            focusedElement.dispatchEvent(pressDown)
            i=i+1
        }
    }


    //window.scrollTo(0, 0)
}

// Create quick access buttons for colors
// and color schemes in the interface.
function addButtonsWithColors(elementWithListOfColors,colorElement){

    let elementWithColorScheme =document.querySelectorAll(".selection .select2-selection--single")
    let elementWithOptions = ""

    for (const index in elementWithColorScheme){
        if(elementWithColorScheme[index].firstChild.title==="Esquema de color"){
            elementWithColorScheme = elementWithColorScheme[index]
        }
        if(elementWithColorScheme.firstChild.title==="Esquema de color"){
            elementWithOptions = document.querySelectorAll(".selection .select2-selection--single")[Number(index)+1]
            break
        }
    }
    let i = 0
    while(elementWithListOfColors.options[i]){
        let button = document.createElement('button')
        button.setAttribute("type","button")
        button.innerText = elementWithListOfColors.options[i].innerText

        if(button.innerText==="Marrón"){button.innerText="Marron"}

        if(i>0){
        elementWithColorScheme.parentNode.appendChild(button);

            button.addEventListener("click",function(){

                elementWithOptions.focus()
                elementWithOptions.dispatchEvent(pressEnter)
                const idFromTextbox = elementWithOptions.getAttribute("aria-labelledby").replace("-container","-results")

                let query = '.select2-search__field[aria-controls="'+idFromTextbox+'"]'
                const textboxElement = document.querySelector(query)
                const colorSchemeOptions = elementWithOptions.parentNode.parentNode.previousSibling

                const currentChosedOption = elementWithOptions.firstChild.title
                textboxElement.dispatchEvent(releaseInsert)

                pickNewOption(currentChosedOption,button.innerText,textboxElement,colorSchemeOptions)

                elementWithOptions.dispatchEvent(pressEnter)
            })
        }
    i=i+1
    }
    let navyBlue = document.createElement('button')
    navyBlue.setAttribute("type","button")
    navyBlue.setAttribute("style","color:navy;")
    navyBlue.innerText = "AZUL MARINO"
    elementWithColorScheme.parentNode.appendChild(navyBlue);
    navyBlue.addEventListener("click",function(){

        elementWithOptions.focus()
        elementWithOptions.dispatchEvent(pressEnter)
        const idFromTextbox = elementWithOptions.getAttribute("aria-labelledby").replace("-container","-results")

        let query = '.select2-search__field[aria-controls="'+idFromTextbox+'"]'
        const textboxElement = document.querySelector(query)
        const colorSchemeOptions = elementWithOptions.parentNode.parentNode.previousSibling

        const currentChosedOption = elementWithOptions.firstChild.title
        textboxElement.dispatchEvent(releaseInsert)

        pickNewOption(currentChosedOption,navyBlue.innerText,textboxElement,colorSchemeOptions)

        elementWithOptions.dispatchEvent(pressEnter)
    })

    i=0
    while(elementWithListOfColors.options[i]){
        let button = document.createElement('button')
        button.setAttribute("type","button")
        button.innerText = elementWithListOfColors.options[i].innerText


        if(i>0){
            colorElement.parentNode.appendChild(button);

            button.addEventListener("click",function(){
                elementWithListOfColors.focus()
                let k = 0
                while(elementWithListOfColors.options[k].innerText){
                    if(elementWithListOfColors.options[k].innerText===button.innerText){
                        elementWithListOfColors.selectedIndex = k
                    }
                    k=k+1
                }
            })
        }
        i=i+1
    }
}

// Search and select a specific characteristic
// by name in a dropdown.
function pickCharacteristic(characteristicName,characteristicsElement,index){
    let i =0

    while(characteristicsElement.options[i].text){
        if(characteristicsElement.options[i].text===characteristicName){

            let characteristicsList = document.getElementsByClassName("select2-selection select2-selection--single")

            characteristicsList[index].focus()
            characteristicsList[index].dispatchEvent(pressEnter)
            const colorIndex = i
            i =0
            while(i<colorIndex){
                characteristicsList[index].dispatchEvent(pressDown)
                i=i+1
            }
            characteristicsList[index].dispatchEvent(pressEnter)
            window.scrollTo(0, 0)

            break
        }
        i=i+1
    }
}
//Decide about when to add the buttons with colors
function checkIfColorExist(){
    let colorSchemeIndex = false
    let colorIndex = false
    let colorIndexFound = false
    for(const index in allFeatureElements){

        if(allFeatureElements[index].title==="Color"){
            colorIndex = index
            colorIndexFound = true
        }else if(allFeatureElements[index].title==="Esquema de color"){
            colorSchemeIndex = index
        }
    }

    while(colorIndex===false||colorSchemeIndex===false){
        let i = 0
        let newElementIndex = 0

        while(document.getElementById(`form_step1_features_${i}_feature`)){

            if(document.getElementById(`form_step1_features_${i+1}_feature`)===null){
                newElementIndex = i+1

                document.getElementById("add_feature_button").click()

                const newElementWithCharacteristicsList = document.getElementById(`form_step1_features_${newElementIndex}_feature`)
                i = 0

                if(colorIndex===false){
                    pickCharacteristic("Color",newElementWithCharacteristicsList,newElementIndex*2)
                    colorIndex = newElementIndex

                }else if(colorSchemeIndex===false){
                    pickCharacteristic("Esquema color",newElementWithCharacteristicsList,newElementIndex*2)
                    colorSchemeIndex = newElementIndex
                }
                break
            }
            i=i+1
        }
    }

    if(colorIndexFound){
        addButtonsWithColors(document.getElementById(`form_step1_features_${Number(colorIndex/2)}_value`),document.getElementsByClassName("select2-selection select2-selection--single")[colorIndex])
    }else{
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === "attributes") {
                    addButtonsWithColors(document.getElementById(`form_step1_features_${Number(colorIndex)}_value`),document.getElementsByClassName("select2-selection select2-selection--single")[colorIndex*2])
                    observer.disconnect()
                }
            }
        };
        elementsObserver(callback,document.getElementById(`form_step1_features_${Number(colorIndex)}_value`))
    }
}

// Capitalize the first letter of each word
// present in the title field.
function capitalizeTitle(){

    let splitedTitle = title.value.split(" ")

    for(const wordNumber in splitedTitle){
        let i = 0

        for(const index in splitedTitle[wordNumber]){

            if(isLetter(splitedTitle[wordNumber][index])){

                splitedTitle[wordNumber] =
                    splitedTitle[wordNumber].slice(0,Number(index)) +
                    splitedTitle[wordNumber][Number(index)].toUpperCase() +
                    splitedTitle[wordNumber].slice(Number(index)+1)
                break
            }
        }
    }
    title.value = splitedTitle.join(" ")
}

// Corrects common manufacturer names
// based on a list of known errors.
function changeManufacturer(){
    const manufacturerName = manufacturer.title
    const blackList = ["Quicksilver","Quickslver","Newbalance","NEWERA","Underarmour","Adidas Sportswear","NikeLab","Levi´s"]

    if(blackList.includes(manufacturerName)===false){return}

    let manufacturerPosition = 0

    for(const index in allFeatureElements){

        if(allFeatureElements[index].id==="select2-form_step1_id_manufacturer-container"){
            manufacturerPosition = index
        }
    }

    let characteristic = document.getElementsByClassName("select2-selection select2-selection--single")
    const manufacturerElement = document.getElementById(`form_step1_id_manufacturer`)
    characteristic[manufacturerPosition].focus()

    if(manufacturerName==="Quicksilver"){
        pickNewOption("Quicksilver","Quiksilver",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="Quickslver"){
        pickNewOption("Quickslver","Quiksilver",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="Newbalance"){
        pickNewOption("Newbalance","New Balance",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="NEWERA"){
        pickNewOption("NEWERA","New Era",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="Underarmour"){
        pickNewOption("Underarmour","Under Armour",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="Adidas Sportswear"){
        pickNewOption("Adidas Sportswear","Adidas",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="NikeLab"){
        pickNewOption("NikeLab","Nike",characteristic[manufacturerPosition],manufacturerElement)
    }else if(manufacturerName==="Levi´s"){
        pickNewOption("Levi´s","Levi's",characteristic[manufacturerPosition],manufacturerElement)
    }

    characteristic[manufacturerPosition].dispatchEvent(pressEnter)
    manufacturer = document.getElementById("select2-form_step1_id_manufacturer-container")
}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

// Detects error texts and generates buttons
// to retry category selection.
function addButtonsForErrors(){

    const potato = document.getElementsByClassName("category")

    let i = 0
    while(potato[i]){
        const trimmedText = potato[i].parentNode.innerText.trim()
        if(trimmedText.toLowerCase().includes("error")===true){

            const category = document.getElementsByClassName("ui-widget")
            let button = document.createElement('button')
            button.setAttribute("type","button")
            button.innerText = trimmedText
            button.addEventListener("click",()=>{
                selectCategory.value = button.innerText
                selectCategory.dispatchEvent(pressInsert)

                const callback = (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (mutation.type === "childList") {
                            const childNodes = document.getElementById("ui-id-1").childNodes
                            childNodes[0].click()
                            document.getElementsByClassName("pstaggerClosingCross")[0].click()
                            childNodes[0].click()
                            observer.disconnect()
                        }
                    }
                };
                elementsObserver(callback,document.getElementById("ui-id-1"))
            })
            category[0].parentElement.parentElement.parentElement.prepend(button);
        }
        i=i+1
    }
}

// Enables quick image deletion
// using the Delete key (keycode 46).
function quickImageDelete(){

    document.getElementById("confirmation_modal").addEventListener("transitionend",()=>{
        document.getElementsByClassName("btn btn-primary btn-lg continue")[0].click()
    })
    document.onkeydown = function (e) {

        if(e.keyCode===46){
            const imagesElements = document.getElementsByClassName("dz-preview dz-processing dz-image-preview dz-complete ui-sortable-handle")
            let i =0
            let activeElement = ""
            let activeElementIndex = ""

            for(const imageElement of imagesElements){

                if(imageElement.className.includes("active")===true){

                    activeElement = imagesElements[i]
                    activeElementIndex = i
                    break
                }
            }

            if(activeElement){
                const tempButton = document.createElement("button")
                tempButton.setAttribute("onclick",`formImagesProduct.delete(${activeElement.getAttribute("data-id")})`)
                tempButton.setAttribute("type",`button`)

                if(imagesElements[activeElementIndex+1]){
                    imagesElements[activeElementIndex+1].className = imagesElements[activeElementIndex].className
                }

                tempButton.click()
                tempButton.remove()
            }
        }else{return}
    }
}

function deleteUnnecesarySpaces(){

    if(title.value[title.value.length-1]=== " "){
       title.value= title.value.replace(/\s+/g,' ').trim()
    }
}

// Validates the length of the sizes; marks the
// tab in red if it detects anomalies.
function checkSizes(){
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                const allTd =document.getElementsByTagName("td")
                let sizesArr = []
                for(const td of allTd){

                    if(td.className===""&&td.id===""&&td.innerText.replace(/\D/g, "")>length>0){
                        //if (td.innerText.includes("Talla")===true||td.innerText.includes("Talle")===true){
                            sizesArr.push(td.innerText.replace(/\D/g, ""))
                        //}
                    }
                }
                console.log(sizesArr)
                for(const sizeNumber of sizesArr){
                    if(sizeNumber.length>2){
                        document.getElementById("tab_step3").firstChild.setAttribute("style","color:red;")
                        break
                    }
                }
                observer.disconnect()
            }
        }
    };

    elementsObserver(callback,document.getElementById(`accordion_combinations`))
}

// Listeners and execution of main logic
// when interacting with categories and the DOM.
selectCategory.addEventListener("click",function(){
typeCategory()
    if(selectCategory.value.includes("Hombre")===true){
        selectCategory.value = selectCategory.value.replace(" Hombre","")
    }else if(selectCategory.value.includes("Mujer")===true){
        selectCategory.value = selectCategory.value.replace(" Mujer","")
    }else if(selectCategory.value.includes("Niño")===true){
        selectCategory.value = selectCategory.value.replace(" Niño","")
    }
    selectCategory.dispatchEvent(pressInsert)
})

title.value = title.value + " "

document.getElementById("form_step6_reference").addEventListener("click", function(){
    window.getSelection().selectAllChildren(
        document.getElementById("form_step6_reference")
    );
    window.open(`https://www.google.com/search?client=firefox-b-d&q=${document.getElementById("form_step6_reference").value+"+"+manufacturer.title}`, "_blank");
})

capitalizeTitle()
wordsListManager()
deleteUnnecesarySpaces()

moveToEnd()
moveGenreToEndAndTranslate()

changeFirstWordTo()

changeManufacturer()
checkIfColorExist()
typeCategory()

addButtonsForErrors()

quickImageDelete()

checkSizes()

elemDiv.setAttribute("style",`
position: absolute;
    top: 0;
    left: 0;`)
elemDiv.setAttribute("id","potatoId")
elemDiv.innerText = manufacturer.title + " "
document.getElementById("form").appendChild(elemDiv);

elemDiv.addEventListener("click",function(){
    window.getSelection().selectAllChildren(
        document.getElementById("potatoId")
    );
})
}, 1000)