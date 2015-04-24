var CLIENT_ID_WEB_APPLICATION = '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com';
var CLIENT_SECRET_WEB_APPLICATION = '-3DgMF99fphLBq0p6yhY8GfP';
var REDIRECT_URL = 'http://localhost:3000/oauth2callback';

var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

// First Get Access from a Google
exports.getGoogleAccess = function(req, res){
    var oauth2Client = new OAuth2(CLIENT_ID_WEB_APPLICATION, CLIENT_SECRET_WEB_APPLICATION, REDIRECT_URL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/calendar'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
        scope: scopes // If you only need one scope you can pass it as string
    });

    res.jsonp(url);
}

//
exports.doSomthing = function(code){
    oauth2Client.getToken(code, function(err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if(!err) {
            oauth2Client.setCredentials(tokens);

            var drive = google.drive({ version: 'v2', auth: oauth2Client });
            plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
                if (err) {
                    console.log('An error occured', err);
                    return;
                }else{
                    console.log('Success!');
                }
                console.log(profile.displayName, ':', profile.tagline);
            });
        }else{
            console.log(err);
        }
    });
}

