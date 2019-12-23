var fs = require('fs');
var path = require('path');
var Q = require('q');

module.exports = function(ctx) {
    // need to check that Android platform added 
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var deferral = new Q.defer();

	//reading parameters from fetch.json
	console.log(' Reading config ');
	var contents = fs.readFileSync(path.join(ctx.opts.projectRoot, 'plugins/fetch.json'));
	var pluginVars = JSON.parse(contents)["com-epam-dhl-cordova-push-delivery"].variables;
	
    var main = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main');
    var filePath = path.join(main, 'AndroidManifest.xml');
	patchFile(filePath, "com.adobe.phonegap.push.FCMService", "com.epam.dhl.cordova.push.DHLService");

    filePath = path.join(main, 'java/com/epam/dhl/cordova/push/RetrofitService.java');
	patchFile(filePath, "$DELIVERY_AUTH_TOKEN$", pluginVars.DELIVERY_AUTH_TOKEN);
	patchFile(filePath, "$DELIVERY_HOST_URL$", pluginVars.DELIVERY_AUTH_TOKEN);

    filePath = path.join(main, 'java/com/epam/dhl/cordova/push/api/DHLApi.java');
	patchFile(filePath, "$DELIVERY_PATH$", pluginVars.DELIVERY_PATH);

    return deferral.promise;
};

function patchFile(filePath, searchString, replaceString) {
	console.log(' Patching ' + filePath);

	var contents = fs.readFileSync(filePath,
		'utf-8'
	);

	if (contents) {
		contents = contents.split(searchString).join(replaceString);
	}
	console.log(' Writing changes ');

	fs.writeFileSync(filePath, contents);
}