var fs = require('fs');
var path = require('path');
var Q = require('q');

module.exports = function(ctx) {
    var deferral = new Q.defer();

    //reading parameters from fetch.json
    console.log(' Reading config ');
    var contents = fs.readFileSync(path.join(ctx.opts.projectRoot, 'plugins/fetch.json'));
    var pluginVars = JSON.parse(contents)[ctx.opts.plugin.id].variables;
    
    var main = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main');
    if (!fs.existsSync(main)) {
        main = path.join(ctx.opts.projectRoot, 'platforms/android');
        if (!fs.existsSync(main)) {
            console.log(' No platform root folder found ' + main);
            return;
        }
    }
    var filePath = path.join(main, 'AndroidManifest.xml');
    patchFile(filePath, "com.adobe.phonegap.push.FCMService", "com.epam.dhl.cordova.push.DHLService");

    var folderName;
    if (fs.existsSync(path.join(main, 'java'))) {
        folderName = 'java';
    } else if (fs.existsSync(path.join(main, 'src'))){
        folderName = 'src';
    } else {
        console.log(' No source root folder found: ' + main + ' \'java\' or \'src\'');
        return;
    }
    filePath = path.join(main, folderName + '/com/epam/dhl/cordova/push/RetrofitService.java');
    patchFile(filePath, "$DELIVERY_AUTH_TOKEN$", pluginVars.DELIVERY_AUTH_TOKEN);
    patchFile(filePath, "$DELIVERY_HOST_URL$", pluginVars.DELIVERY_HOST_URL);

    filePath = path.join(main, folderName + '/com/epam/dhl/cordova/push/api/DHLApi.java');
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