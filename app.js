/* jslint node: true */

var fs = require('fs');

var domains_cache = {};

function build_caches(tld) {
    var res = fs.readFileSync('parsed_zone_files/' + tld + '.json', 'utf8');
    var all_domains = JSON.parse(res);
    domains_cache[tld] = all_domains;
}

function search(search_url) {
    var search_parts = search_url.split('.');

    if (search_parts.length) {
        var tld = search_parts[1];
        var search_term = search_parts[0];

        if (domains_cache[tld].indexOf(search_term) !== -1 ) {
            return true;
        } else {
            return false;
        }

    } else {
        console.log('Not a full url');
    }
}

build_caches('beer');
build_caches('win');
build_caches('wtf');

console.time('search');
var letters = 'abcdefghijklmnopqrstuvwxyz';
var found = 0;
var searches = 0;
for (var i = 0; i < letters.length; i++) {
    for (var i2 = 0; i2 < letters.length; i2++) {
        for (var i3 = 0; i3 < letters.length; i3++) {
            var tmp_domain = letters[i] + letters[i2] + letters[i3] + '.win';
            searches++;
            if (search(tmp_domain)) {
                found++;
            }
        }
    }
}
// console.log(search('zytho.beer'));
// search('zysma.win');
console.timeEnd('search');
console.log(found + '/' + searches);

function report_memory() {
    console.log( 'Memory: ' + Math.round(process.memoryUsage().rss / 1000000) + 'MB' );
}
