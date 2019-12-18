var fs = require('fs');
var path = require('path');
var elementTree = require('elementtree');

module.exports = function(ctx) {
    // need to check that Android platform added 
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var fs = ctx.requireCordovaModule('fs'),
        path = ctx.requireCordovaModule('path'),
        deferral = ctx.requireCordovaModule('q').defer();

	console.log(' ');
	console.log(' ********************** ');
	console.log(' ');
    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    var manifest = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');
    var manifest2 = path.join(platformRoot, 'app/src/main/AndroidManifest2.xml');
	console.log(manifest)
	
	var contents = fs.readFileSync(manifest,
		'utf-8'
	);

	if (contents) {
		contents = contents.substring(contents.indexOf('<'));
	}

	var etree = elementTree.parse(contents);
	var service = etree.findall("/manifest/application/service[@android:name='com.adobe.phonegap.push.FCMService']");
	console.log(' Length: ' + service.length);
	if (service.length == 1 ) {
		service[0].attrib["android:name"] = "com.epam.dhl.cordova.push.DHLService";
	}

	etree.write(manifest2);

	console.log(' ');
	console.log(' ********************** ');
	console.log(' ');

    return deferral.promise;
};