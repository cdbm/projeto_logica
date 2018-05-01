const sat = require ('./writer.js')
let subs = []
let s=0
let abre = []
let a = 0
let fecha = []
let f = 0
let text =readFormula('./Entrada2.in')
for(i=0; i<text.length; i++){
	if(text[i].includes("TT")){
		solve(text[i])
	}
}

 function readFormula(fileName) { 
   //chamando o modulo readFileSync
    let f = fileName
    let fs = require ('fs')
    let content = fs.readFileSync(f).toString()
    let text = content.split('\r\n') //text vira um array divido por linhas 
   return text;
}


function solve(text){
let b = substring(text)
console.log(b)
}

function substring(text){
	for(i=0; i<text.length; i++){
		if(text.charAt(i) == "("){
			abre[a] = i
			a++
		}if(text.charAt(i) == (")")){
			fecha[f] = i
			f++
		}
	}
	console.log(abre)
	console.log(fecha)
	a = 0 
	f = fecha.length -1
	while(a<abre.length && f>=0){
		let sub = text.substring(abre[a]+1, fecha[f])
		subs[s] = sub
		s++
		a++
		f--
	}

/*
	
	for(i=0; i<=text.length;i++){
		if(text.charAt(i) == "("  && !found){
			start = i
			
			found = true
		}if(text.charAt(i) == ")"){
			end = i
			
		}
	}
	if(end > 0){
	console.log(start+1)
	console.log(end-1)
	
	let sub = text.substring(start+1, end)
	subs[d] = sub
	d++
	if(sub.includes("(")){
	substring(sub)
	}
}*/
return subs;
}