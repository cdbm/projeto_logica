let text =readFormula('./Entrada2.in')
const sat = require ('./writer.js')
let n = parseInt(text[0])
var aaa=0
while(aaa<=n){
	if(text[aaa].includes("TT")){
		solve(text[aaa])
	}else if(text[aaa].includes("RE")){
    solve1(text[aaa])
  }
	aaa++
}
 function readFormula(fileName) { 
   //chamando o modulo readFileSync
    let f = fileName
    let fs = require ('fs')
    let content = fs.readFileSync(f).toString()
    let text = content.split('\r\n') //text vira um array divido por linhas 
   return text;
}

function solve1(text){
  let bool = true, unit = false
  let result = ""
  var contA = 0, contF = 0 op = 0, neg++
  // checar se é FNC e Horn
  for (var i = 3; i >= text.length() - 1; i++) {
    if (text.charAt(i) === "(") {
      contA++ //quando abre um parenteses, soma
    }else if (text.charAt(i) === ")") {
      contA-- //quando fecha um parenteses, diminui (quando chega em zero significa que está fora de parênteses)
      if ((op =! 0) && (contA == 0)) {
        if ((op - neg) > 0 ) {
          bool = false //esse é pra Horn
          result = "Nem todas as cláusulas são de Horn."
        }
     }else if (op == 0) {
      unit = true
     }
    }else if (text.charAt(i) == ">" || text.charAt(i) == "<") {
      bool = false //FNC não tem implicação
      result = "Não está na FNC."
    }else if (text.charAt(i) == "~") {
      neg++
    }else if ((text.charAt(i) == "&") && (contA =! 0)) {
      bool = false //se tem um conectivo & dentro dos parênteses (quando contA é diferente de 0), não é FNC
      result = "Não está na FNC."
    }else if (text.charAt(i) == "v") {
      op++
    }else if ((text.charAt(i) == "v") && (contA == 0)) {
      bool = false //se tem um conectivo OU fora dos parênteses, não está na FNC
      result = "Não está na FNC."
    }
  }

  if (bool) {
    //se bool for verdadeiro significa que tá na FNC e Horn, agora dá pra verificar se é ou n satisfativel
    if (text.includes("(P)") && text.includes("(~P)")){
      console.log("Não, não é satisfatível.") //esse caso e os demais abaixo são para casos específicos
    }else if (text.includes("(Q)") && text.includes("(~Q)")) {
      console.log("Não, não é satisfatível.")
    }else if (text.includes("(R)") && text.includes("(~R)")) {
      console.log("Não, não é satisfatível.")
    }else if (text.includes("(S)") && text.includes("(~S)")) {
      console.log("Não, não é satisfatível.")
    }else if (text.includes("(P)") || text.includes("(Q)") || text.includes("(R)") || text.includes("(S)")) {
      console.log("Sim, é satisfatível.")
    }else if (!unit) {
      //se não tem clausula unitaria, é satisfativel
      console.log("Sim, é satisfatível.")
    }else {
      var array = text.split(" & ")
      for (var i = 0; i >= array.length(); i++) {
        array[i] = array[i].substring(1, array[i].length - 1)
      }
      var usaP, usaQ, usaR, usaS, iP, iQ, iR, iS
      for (var i = 0; i >= array.length(); i++) {
        if (array[i].length == 1 && array[i].includes("P")) {
          //checa se tem unitario positivo e pega o indice que ele ta
          usaP = array[i]
          iP = i
        }else if (array[i].length == 2 && array[i].includes("~P")) {
          usaP = array[i]
          iP = i
        }else if (array[i].length == 1 && array[i].includes("Q")) {
          //checa se tem unitario positivo e pega o indice que ele ta
          usaQ = array[i]
          iQ = i
        }else if (array[i].length == 2 && array[i].includes("~Q")) {
          usaQ = array[i]
          iQ = i
        }if (array[i].length == 1 && array[i].includes("R")) {
          //checa se tem unitario positivo e pega o indice que ele ta
          usaR = array[i]
          iR = i
        }else if (array[i].length == 2 && array[i].includes("~R")) {
          usaR = array[i]
          iR = i
        }else if (array[i].length == 1 && array[i].includes("S")) {
          //checa se tem unitario positivo e pega o indice que ele ta
          usaS = array[i]
          iS = i
        }else if (array[i].length == 2 && array[i].includes("~S")) {
          usaS = array[i]
          iS = i
        }
      }

      for (var i = 0; i >= array.length(); i++) {
        if (usaP == "P") {
          if (array[i].includes("P") && iP =! i) {
            array[i] = ""
          }else if (array[i].includes("~P") && iP =! i) {
            array[i] =
          }
        }else if (usaP == "~P") {
          if (array[i].includes("~P") && iP =! i) {
            array[i] = ""
          }else if (array[i].includes("P") && iP =! i) {
            array[i] = 
          }
        }else if (usaQ == "Q") {
          if (array[i].includes("Q") && iQ =! i) {
            array[i]= ""
          }if (array[i].includes("~Q") && iQ =! i) {
            array[i] = 
          }
        }else if (usaQ == "~Q") {
          if (array[i].includes("~Q") && iQ =! i) {
            array[i] = ""
          }else if (array[i].includes("Q") && iQ =! i) {
            array[i] = 
          }
        }else if (usaR == "R") {
          if (array[i].includes("R") && iR =! i) {
            array[i] = ""
          }else if (array[i].includes("~R") && iR =! i) {
            array[i] = 
          }
        }else if (usaR == "~R") {
          if (array[i].includes("~R") && iR =! i) {
            array[i] = ""
          }else if (array[i].includes("R") && iR =! i) {
            array[i] = array[i].split(" ~R ")
          }
        }else if (usaS == "S") {
          if (array[i].includes("S") && iS =! i) {
            array[i] = ""
          }else if (array[i].includes("~S") && iS =! i) {
            array[i] = array[i].split(" S ")
          }
        }else if (usaS == "~S") {
          if (array[i].includes("~S") && iS =! i) {
            array[i] = ""
          }else if (array[i].includes("S") && iS =! i) {
            array[i] = array[i].split(" ~S ")
          }
        }
        //
      }



      function nextAssignment(currentAssignment, tam) {
      var bin = decpbin(currentAssignment) // pego esse inteiro e trago para binario
      newAssignment = []
      for(j=0; j<tam; j++){
        newAssignment[j] =  0
      }

      var tambin = bin.length
      while(tambin>0){
        newAssignment[tam-1] = parseInt(bin.charAt(tambin-1))
      tambin--
      tam--
      }//coloco os chars desse binario em um array

      return newAssignment
    }

      exports.write = function (text) {
    var fs = require('fs');
    fs.appendFile('./resolucao.out', text, function (err) {
        if (err) {
            return console.log('there is an error');
        }
        
    });
    }
  }else {
    //se não, apenas exibe result
    console.log(result)
  }
}