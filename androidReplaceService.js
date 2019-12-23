var fs = require('fs');
var path = require('path');
var Q = require('q');

module.exports = function(ctx) {
    // need to check that Android platform added 
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var deferral = new Q.defer();

	console.log(' Patching AndroidManifest.xml ');
    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    var manifest = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');

	var contents = fs.readFileSync(manifest,
		'utf-8'
	);

	var searchString = "com.adobe.phonegap.push.FCMService";
	var replaceString = "com.epam.dhl.cordova.push.DHLService"
	if (contents) {
		contents = contents.replace(searchString, replaceString);
	}
	console.log(' Writing changes ');

	fs.writeFileSync(manifest, contents);
	
	console.log(' ************* ');

	//reading parameters from fetch.json
	contents = fs.readFileSync(path.join(ctx.opts.projectRoot, 'plugins/fetch.json'));
	var pluginVars = JSON.parse(contents)["com-epam-dhl-cordova-push-delivery"];
	console.log(pluginVars);

    return deferral.promise;
};