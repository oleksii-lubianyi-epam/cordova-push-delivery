var fs = require('fs');
var path = require('path');

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
	console.log(manifest)
	
	var contents = fs.readFileSync(manifest,
		'utf-8'
	);

	var searchString = "com.adobe.phonegap.push.FCMService";
	var replaceString = "com.epam.dhl.cordova.push.DHLService"
	if (contents) {
		contents = contents.replace(searchString);
	}
	console.log(' Writing changes ');

	fs.writeFileSync(manifest, "*****" + contents);

    return deferral.promise;
};