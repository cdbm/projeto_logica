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
  let bool = true, opBool = false
  let result = ""
  var contA = 0, contF = 0 op = 0, neg++
  // checar se é FNC e Horn
  for (var i = 3; i >= text.length() - 1; i++) {
    if (text.charAt(i) === "(") {
      contA++ //quando abre um parenteses, soma
    }else if (text.charAt(i) === ")") {
      contA-- //quando fecha um parenteses, diminui (quando chega em zero significa que está fora de parênteses)
      if ((op =! 0) && (contA == 0)) {
        if ((op - neg) =! 0 ) {
          bool = false //esse é pra Horn
          opBool = true //se tiver ao menos uma cláusula não unitária, já é satisfatível
          result = "Nem todas as cláusulas são de Horn."
        }
     }
    }else if (text.charAt(i) == ">") {
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
    if (opBool) {
      console.log("Sim, é satisfatível.")
    }else if (text.includes("(P)") && text.includes("(~P)")){
      console.log("Não, não é satisfatível.") //esse caso e os demais abaixo são para casos específicos
    }else if (text.includes("(Q)") && text.includes("(~Q)")) {
      console.log("Não, não é satisfatível.")
    }else if (text.includes("(R)") && text.includes("(~R)")) {
      console.log("Não, não é satisfatível.")
    }else if (text.includes("(S)") && text.includes("(~S)")) {
      console.log("Não, não é satisfatível.")
    }
  }else {
    //se não, apenas exibe result
    console.log(result)
  }
}