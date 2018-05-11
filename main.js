let text =readFormula('./Entrada2.in')
let n = parseInt(text[0])
var aaa=0
while(aaa<=n){
	if(text[aaa].includes("TT")){
		solve(text[aaa])
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
// daqui pra baixo é a resolução da tabela verdade 
function solve(text){
	let tent =0
	const sat = require ('./writer.js')
	let string =""
	let b
	let count =0
	let posit = []
	b = readSub(text)
	let variaveis = [-1, -1, -1, -1]
	let usadas = []
	let u=0
	for(i=0; i<b.length; i++){
		if(b[i].includes("P")){
			variaveis[0] = 0;
		}
		if(b[i].includes("Q")){
			variaveis[1] = 1;
		}
		if(b[i].includes("R")){
			variaveis[2] = 2;
		}
		if(b[i].includes("S")){
			variaveis[3] = 3;
		}
	}
	for(j=0; j<4; j++){
		if(variaveis[j] != -1){
			usadas[u] = variaveis[j]
			u++
		}
	}
	let assignment = []
	for(k=0;k<u; k++){
		assignment[k] = 0
	}
	
	for(l=0;l<u; l++){
		if(usadas[l] == 0){
			string = string + "P "
		}if(usadas[l] == 1){
			string = string +"Q "
		}if(usadas[l] == 2){
			string = string +"R "
		}if(usadas[l] == 3){
			string = string +"S "
		}
	}
	string = string + "| "
	for(ac=0; ac<b.length; ac++){
		string = string + b[ac]
		posit[ac] = string.length -1
		string = string + "  "
	}
	console.log(posit)
	let tam = string.length
	for(ax=0; ax<Math.pow(2, assignment.length); ax++){
		string = string + "\r\n"
		for(bb=0; bb<assignment.length; bb++){
			string = string + assignment[bb] + " "
		}
		string = string + "| "
		let xx = 0
		for(dc=0; dc<tam; dc++){
			if(dc +8 == posit[xx]){
				string = string + "0"
				xx++
			}else{
				string = string + " "
			}
		}

	tent++		
	assignment = nextAssignment(tent, assignment.length)
	
	}
console.log(string)
console.log(b)
return string
}

function readSub(text){
	let pilha = []
	let subs = []
	let s =0
	for(i=0; i<text.length; i++){
		if(text.charAt(i) == "("){
			pilha.push(i)
		}
		if(text.charAt(i) == ")"){
			let x = pilha.pop()
			let menor = text.substring(x+1,i)
			subs[s] = menor
			s++
		}
	}
	return subs;
}

function nextAssignment(currentAssignment, tam) {
  //recebe um numero inteiro, referente a atual tentativa
  //numa ordem de 2^n, sendo n o numero de variaveis
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

function decpbin(a) {
      //transforma decimal para binario 
    if (a == 0) {
      return "0";
    } else if (a == 1) {
      return "1";
    } else if (a / 2 == 1) {//casos base
      return "1" + (a % 2);
    } else if (a % 2 == 1) { // vou dividindo o numero e concatenando seus restos até chegar ao caso base
      return decpbin(Math.floor(a / 2)) + "1";
    } else {
      return decpbin(Math.floor(a / 2)) + "0";
    }
  }

