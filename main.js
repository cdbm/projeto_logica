let text =readFormula('./Entrada.in')
const sat = require ('./writer.js')
let n = parseInt(text[0])
var aaa=0

while(aaa<=n){
	if(text[aaa].includes("TT")){
		solve(text[aaa], aaa)
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
function solve(text, indice){
	let ass = 0
	let tent =0
	let string =""
	let b
	let count =0
	let posit = []
if(text.includes("(")){
	b = readSub(text)
	b = sortclaus(b)
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
	string = string + "Problema #" + indice +"\r\n"
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

	let satis = false
	let tam = string.length
	for(ax=0; ax<Math.pow(2, assignment.length); ax++){
		
		string = string + "\r\n"
		for(bb=0; bb<assignment.length; bb++){
			string = string + assignment[bb] + " "
		}
		string = string + "| "
		let xx = 0
		
		let st =""
		for(sd=0; sd<assignment.length; sd++){
			st = st + assignment[sd]
		}
		let result = 0
		for(dc=0; dc<tam; dc++){
			
			if(assignment.length == 3){	
				if(dc +22 == posit[xx]){
					
					if(v(b[xx], st,usadas)){
						result = 1
					}else{
						result =0
					}
					string = string + result
					xx++
					
				}else{
					string = string + " "
				}
				
			}else if(assignment.length == 2){
				if(dc +20 == posit[xx]){
					if(v(b[xx], st,usadas)){
						result = 1
					}else{
						result =0
					}
					string = string + result
					xx++
					
				}else{
					string = string + " "
				}
				
			}else if(assignment.length == 1 ){
				if(dc +18 == posit[xx]){
					if(v(b[xx], st,usadas)){
						result = 1
					}else{
						result =0
					}
					string = string + result
					xx++
					
				}else{
					string = string + " "
				}
				
			}else if(assignment.length == 4){
				if(dc +24 == posit[xx]){
					if(v(b[xx], st,usadas)){
						result = 1
					}else{
						result =0
					}
					string = string + result
					xx++
					
				}else{
					string = string + " "
				}
				
			}
		
		}
		if(result ==1){
			satis =true
		}

		tent++		
		assignment = nextAssignment(tent, assignment.length)
		
	
	
	}
	string = string +"\r\n"

	
	if(satis){
		string = string + "Sim, é satisfatível."
	}else{
		string = string + "Não, não é satisfatível."
	}


string = string + "\r\n\r\n"	

}else{
	string = string + "Problema #" + indice +"\r\n"
	string = string + text.charAt(3) + " |\r\n"
	string = string + "0 |\r\n"
	string = string + "1 |\r\n"
	string = string + "Sim, é satisfatível.\r\n\r\n"
}
sat.write(string)
	return string
}

function v(text, assignment, usadas){
	let retorno = false 
	let aberto =0
	let fechado =0
	let indice =0
	let nva = 0
	let op =0
	let d =0
	let ordem = []

	
	if(text.charAt(0) == " "){
		text =  text.replace(" ", "")
	}
	if(isSpec(text)){
		text = text.substring(1, text.length-1)
	}

	if(text != null){
	for(z=0; z<usadas.length; z++){
		if(usadas[z] == 0){
			ordem[d] = "P"
			d++
		}if(usadas[z] == 1){
			ordem[d] = "Q"
			d++
		}if(usadas[z] == 2){
			ordem[d] = "R"
			d++
		}if(usadas[z] == 3){
			ordem[d] = "S"
			d++
		}
	}
	
 	for(j=0; j<text.length; j++){
 		if(text.charAt(j) == "P" || text.charAt(j) == "Q" || text.charAt(j) == "R" 
 			|| text.charAt(j) == "S"){
 			nva++
 		}
 	}
 
 	let id =0
 	if(text.charAt(0) == "~"){
			text = text.substring(1, text.length)
			
			retorno = !v(text, assignment, usadas)
		}else if(nva == 1){
			if(text.includes("P")){
				for(i=0; i<assignment.length; i++){
					if(ordem[i] =="P"){
						id = i
					}
				}
			
				if(assignment.charAt(id)==0){
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = true
					}else{
						retorno =false
					}
				}else{
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = false
					}else{
						retorno = true
					}
				}
			}if(text.includes("Q")){
				
				for(j=0; j<assignment.length; j++){
					if(ordem[j] =="Q"){
						id = j
					}
				}
				if(assignment.charAt(id)==0){
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = true
					}else{
						retorno =false
					}
				}else{
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = false
					}else{
						retorno = true
					}
				}
			}if(text.includes("R")){
				for(k=0; k<assignment.length; k++){
					if(ordem[k] =="R"){
						id = k
					}
				}
				if(assignment.charAt(id)==0){
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = true
					}else{
						retorno =false
					}
				}else{
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = false
					}else{
						retorno = true
					}
				}

			}if(text.includes("S")){
				
				for(l=0; l<assignment.length; l++){
					if(ordem[l] =="S"){
						id = l
					}
				}
				if(assignment.charAt(id)==0){
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = true
					}else{
						retorno =false
					}
				}else{
					if(text.charAt(0) == "~" || text.charAt(1) == "~" || text.charAt(2) == "~" ){
						retorno = false
					}else{
						retorno = true
					}
				}

			}
		
	}else{
		indice = foundOp(text)

		let a
		let b
		a = text.substring(0, indice-1)
		b = text.substring(indice+1, text.length)
		
		if(text.charAt(indice) =="v"){
			retorno = (v(a, assignment, usadas) || v(b,assignment, usadas))
		}else if(text.charAt(indice) == "&"){
 			retorno = (v(a, assignment, usadas) && v(b,assignment, usadas))
		}else if(text.charAt(indice) == "<"){
 			if(v(a, assignment, usadas) == v(b,assignment, usadas) ){
 				retorno = true
 			}else{
 				retorno = false
 			}
		}else if(text.charAt(indice) == ">"){
 			retorno = (!(v(a, assignment, usadas)) || v(b,assignment, usadas))
		}

	}
}

return retorno;
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

function sortclaus(text){
	let n = text.length
	for(i=0; i<n-1; i++){
		for(j=0; j<n-i-1; j++){
			if(text[j].length > text[j+1].length){
				let temp = text[j]
				text[j] = text[j+1]
				text[j+1] = temp
			}
		}
	}
	return text
}

function foundOp(text){
	let op 

	for(i=0; i<text.length; i++){
		if(text.charAt(i) == "v" || text.charAt(i) == "&" || text.charAt(i) == "<" || 
				text.charAt(i) == ">"){
			let a = text.substring(0, i)
			let b = text.substring(i+1, text.length)
			let abertoA =0
			let fechadoA =0
			let abertoB=0
			let fechadoB=0
			for(j=0;j<a.length; j++){
				if(a.charAt(j) =="("){
					abertoA++
				}if(a.charAt(j) == ")"){
					fechadoA++
				}
			}
			for(k=0;k<b.length; k++){
				if(b.charAt(k) =="("){
					abertoB++
				}if(b.charAt(k) == ")"){
					fechadoB++
				}
			}

		if((abertoA == fechadoA) && (abertoB == fechadoB)){
			op =i
		}


		}
	}
return op
}	

function isSpec(text){
	if(text.charAt(0) == " "){
		text =  text.replace(" ", "")
	}
	let pill = []
	let tes = -1
	let isSpecial = false
	let pos =0

	for(l=0; l<text.length; l++){
		if(text.charAt(l) == "("){
			pill[pos] = l
			pos++
		}if(text.charAt(l) == ")" && (l != text.length-1)){
			pos--
			pill[pos] = -1
			
		}

		if(l==text.length-1 && pill[0] == 0  && text.charAt(l) == ")"){
			isSpecial = true
		}
		
	}
	
	return isSpecial
}
