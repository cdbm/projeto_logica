
  exports.write = function (text) {
	var fs = require('fs');
    fs.appendFile('./tabela_teste.out', text, function (err) {
        if (err) {
            return console.log('there is an error');
        }
        
    });
  
}; 
