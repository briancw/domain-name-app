/* jslint node: true */

var fs = require('fs');

var domains = {};

function search(search_url) {
    var search_parts = search_url.split('.');

    if (search_parts.length) {
        var tld = search_parts[1];
        var search_term = search_parts[0];

        fs.readFile('parsed_zone_files/' + tld + '.json', 'utf8', function(err, res) {
            if (err) {
                console.log(err);
            } else {
                var all_domains = JSON.parse(res);

                console.log( all_domains.indexOf(search_term) );
                //
            }
        });
    } else {
        console.log('Not a full url');
    }
}

console.time('search');
// search('zytho.beer');
// search('zysma.win');
console.timeEnd('search');

function report_memory() {
    console.log( 'Memory: ' + Math.round(process.memoryUsage().rss / 1000000) + 'MB' );
}
