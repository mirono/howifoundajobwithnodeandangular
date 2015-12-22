var nano = require('nano')('http://localhost:5984');
var fs = require('fs');
var sys = require('sys')
nano.db.destroy('geojob', function() {
  // create a new database
  nano.db.create('geojob', function() {
    // specify the database we are going to use
    var geojob = nano.use('geojob');
 	parseCsvFile('israel-hi-tech.csv', function(rec){
		//console.log(rec);
    		geojob.insert(rec, rec.companyname, function(err, body, header) {
			if (err) {
				console.log('[alice.insert] ', err.message);
				return;
			}
			console.log('you have inserted the record.')
			console.log(rec);
		});
	});
 
	function parseCsvFile(fileName, callback){
		var stream = fs.createReadStream(fileName)
		var iteration = 0, header = [], buffer = ""
		var pattern = /(?:^|,)("(?:[^"]+)*"|[^,]*)/g
		stream.addListener('data', function(data){
			buffer+=data.toString()
			var parts = buffer.split('\r\n')
			parts.forEach(function(d, i){
			if(i == parts.length-1) return
			if(iteration++ == 0 && i == 0){
				header = d.split(pattern)
			}else{
				callback(buildRecord(d))
			}
		})
		buffer = parts[parts.length-1]
	})
 
	function buildRecord(str){
		var record = {}
		str.split(pattern).forEach(function(value, index){
			if(header[index] != '')
				record[header[index].toLowerCase()] = value.replace(/"/g, '')
		})
			return record
		}
	}    
    

  });
});
