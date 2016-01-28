/* jslint node: true */

var fs = require('fs');

// import_zone_file('beer');
// import_zone_file('wtf');
// import_zone_file('win');
// import_zone_file('top');

function import_zone_file(gtld) {
    var file_name = 'zone_files/20160127-' + gtld + '-zone-data.txt';

    fs.readFile(file_name, 'utf8', function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log('t');
            var teh_data = res.split('\n');
            var domain_combiner = {};
            var domains = [];

            var x = 0;
            for (var i = 0; i < teh_data.length; i++) {
                var tmp_domain_name = teh_data[i].split('.')[0];
                if (!domain_combiner[tmp_domain_name]) {
                    domain_combiner[tmp_domain_name] = 1;
                    domains.push(tmp_domain_name);
                    x++;
                }
            }

            fs.writeFile('parsed_zone_files/' + gtld + '.json', JSON.stringify(domains, null, '\t'), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }

    });
}

function report_memory() {
    console.log( 'Memory: ' + Math.round(process.memoryUsage().rss / 1000000) + 'MB' );
}
