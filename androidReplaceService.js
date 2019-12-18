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

	console.log(' Patching AndroidManifest.xml ');
    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    var manifest = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');
    var manifest2 = path.join(platformRoot, 'app/src/main/AndroidManifest2.xml');
	console.log(manifest)
	
	var contents = fs.readFileSync(manifest,
		'utf-8'
	);

var contents2 = contents;
	if (contents) {
		contents = contents.substring(contents.indexOf('<'));
	}

	var etree = elementTree.parse(contents);
	var service = etree.findall("*/service[@android:name='com.adobe.phonegap.push.FCMService']");
	if (service.length == 1 ) {
		console.log(' Found FCMService replacing it with DHLService ');
		service[0].attrib["android:name"] = "com.epam.dhl.cordova.push.DHLService";
		console.log(' Writing changes ');
		etree.write(manifest);
	}

	console.log(' ');
	fs.writeFileSync(manifest2, "*****" + contents2);
	console.log(' ********************** ');
	console.log(' ');

    return deferral.promise;
};