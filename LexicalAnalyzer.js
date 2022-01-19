//! First of all we will read the program from a txt file and then analyse every single word alone
var fs = require('fs');
var text = fs.readFileSync("./tpCompil1.txt", 'utf-8');
var code = text.split('\r\n');

function splitting(text, sep){
    temp = []
    temp2 = []
    text.forEach(mot => {
        temp.push( mot.split(sep))
    });

    temp.forEach(ele => {
        temp2 = temp2.concat(ele)
    });
     return temp2
}

SEP = [/(\()/, /(\+)/, /(-)/, /(:=)/, /(,)/,/(:)/ , /(;)/, /(\))/];

SEP.forEach(sep => {
    code = splitting(code, sep)
});

var data=[];
code.forEach(element => {
    data.push(element.split(' '));
});
ar=[];
data.forEach(elm=>{
    
    ar.push(elm.filter( (value)=>{return value!== ''}))
})

//----------------------//

function numColonneId(tc){
    if((tc>='a' && tc<='z')||(tc>='A' && tc<='Z')){
        return 0;
    } else{
        if(tc >=0 && tc<=9){
            return 1;
        } else{
            if(tc == '-')return 2;
        }
    }
    return -1;
    
}

function numColonneSep(tc) {
    switch(tc){
        case(',') : return 0;
        case(';') : return 1;
        case('(') : return 2;
        case(')') : return 3;
        case(':') : return 4;
        default: return -1;
    }
    
}

function numColonneOp(tc) {
    switch(tc){
        case('=')  : return 0;
        case(':=') :  return 1;
        case('-')  : return 2;
        case('+')  : return 3;
        default: return -1;
    }
    
}

function numColonneConst(tc) {
    if(tc >=0 && tc<=9){
        return 0;
    }else{
        return -1;
    } 
    
}

function numColonneMot(tc){
    switch(tc){
        case('A') : return 0;
        case('B') : return 1;
        case('C') : return 2;
        case('D') : return 3;
        case('E') : return 4;
        case('F') : return 5;
        case('G') : return 6;
        case('H') : return 7;
        case('I') : return 8;
        case('L') : return 9;
        case('M') : return 10;
        case('N') : return 11;
        case('O') : return 12;
        case('P') : return 13;
        case('R') : return 14;
        case('S') : return 15;
        case('T') : return 16;
        case('U') : return 17;
        case('V') : return 18;
        default: return -1;
    }
}


    const etatFinID=[1];                //etat finaux dans l'automate IDentificateur
    const etatFinConst=[1];             //etat finaux dans l'automate Constante
    const etatFinSep=[1,2,3,4,5];       //etat finaux dans l'automate Separateurs
    const etatFinOp=[1,2,3,4];          //etat finaux dans l'automate Operateurs
    const etatFinMot=[7,10,13,14,19,31,37];     //etat finaux dans l'automate Mots clés
  

    motCle = [];
    Identificateur = [];
    Separateur = [];
    Operateur = [];
    Constante = [];


 ar.forEach(element => {
     element.forEach(mot => {           
        try {
                if(checkerConst(mot)){
                console.log(`la chaine ${mot} est acceptée: Constante`);
                if(!Constante.includes(mot)){ Constante.push(mot)};
            }else{
                if (checkerMotCle(mot)) {
                    console.log(`la chaine ${mot} est acceptée: Mot Clé`);
                    if(!motCle.includes(mot)){ motCle.push(mot)};
                }else{
                    if (checkerID(mot)) {
                        console.log(`la chaine ${mot} est acceptée: Identificateur`);
                        if(!Identificateur.includes(mot)){ Identificateur.push(mot)};
                    }else{
                        if(checkerSep(mot)){
                            console.log(`la Chaine ${mot} est acceptée: Separateur`);
                            if(!Separateur.includes(mot)){ Separateur.push(mot)};
                        }else{
                            if (checkerOp(mot)) {
                                console.log(`la chaine ${mot} acceptée: Operateur`);
                                if(!Operateur.includes(mot)){ Operateur.push(mot)};
                            }else{
                                console.log(`la Chaine ${mot} eronné!`);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(`la Chaine ${mot} eronné!`);
        }
        });
 });
 console.log('---------------------');
    console.log("les mot acceptes sont:")
    console.log('Mot Cles: ' + motCle)
    console.log('Identificateurs: ' + Identificateur) 
    console.log('Separateur: ' + Separateur)
    console.log('Operateur: ' + Operateur)
    console.log('Constantes: ' + Constante)

function checkerMotCle(mot){   //! => Done
        const matMotCle =  ([[-1,15,-1,-1,28,20,-1,-1,11,-1,-1,-1,-1,1,32,-1,26,-1,8],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,-1,-1,-1,-1],[6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,14,-1,-1,-1,-1,-1,12,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,19,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,21,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,22,-1,-1,-1,-1,-1,-1,-1],[-1,-1,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,18,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,29,-1,36,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,30,-1,-1,-1]
                            ,[-1,-1,-1,-1,31,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                            ,[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,34,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,35,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,18,-1,-1,-1,-1]
                            ,[-1,-1,-1,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]);
        var Ec=0,i=0;
        try {
            while (i<mot.length && matMotCle[Ec][numColonneMot(mot[i])] !== -1) {
                Ec=matMotCle[Ec][numColonneMot(mot[i])]
                i++; 
            }
        } catch (error) {
            return false;
        }
        
        if (i == mot.length && etatFinMot.includes(Ec)) {
            return true;
        }else{
            return false;
         }   
}    
    
function checkerID(mot){ //! => Done
    const matId =  ([[1,-1,-1],[1,1,2],[1,1,-1]]);
    var Ec=0, cptId=0, i=0;
    try {
        while (i<mot.length && matId[Ec][numColonneId(mot[i])] !== -1 && cptId<=10) {
            Ec=matId[Ec][numColonneId(mot[i])] 
            cptId++;
            i++;
        }
    } catch (error) {
        return false;
    }
    if (i==mot.length && etatFinID.includes(Ec) && cptId<=10) {
       return true;
    }else{
        if(cptId>10){
            console.log('cpt id >10');
            return false;
        }      
    }
}

function checkerConst(mot){   //! => Done
    const matConst =  ([[1],[1]]);
    var Ec=0, i=0, cptConst=0;
    try {
        while (i<mot.length && matConst[Ec][numColonneConst(mot[i])] !== -1 && cptConst<=8) {
            Ec=matConst[Ec][numColonneConst(mot[i])] 
            cptConst++;
            i++;
        }    
    } catch (error) {
        return false;
    }
    if (i==mot.length && etatFinConst.includes(Ec) && cptConst<=8) {
        return true;
    }else{
        if(cptConst>8){
            console.log('cpt id >8');
            return false;
        }
     }   
}


function checkerSep(mot){   //! => Done
    const matSep =  ([[1,2,3,4,5],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1][-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1]]);
    var Ec=0;
        if (matSep[Ec][numColonneSep(mot)] !== -1) {
            Ec=matSep[Ec][numColonneSep(mot)] 
        }
    
    if (etatFinSep.includes(Ec)) {
        return true;
    }else{
        return false;
    } 
}

function checkerOp(mot){   //! => Done
    const matOp =  ([[1,2,3,4],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1][-1,-1,-1,-1]]);
    var Ec=0;
    try {
        if (matOp[Ec][numColonneOp(mot)] !== -1) {
            Ec=matOp[Ec][numColonneOp(mot)] 
        }
    } catch (error) {
        return false;
    }
    
    if (etatFinOp.includes(Ec)) {
        return true;
    }else{
        return false;
     }   
}
    
