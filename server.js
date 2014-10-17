//toolbelt
var express = require('express');
var session = require('express-session');
var request = require('request');
var bodyParser = require('body-parser');
var GitHubApi = require('github');
var passport = require('passport');
var PassGit = require('passport-github').Strategy;
var port = 8888;
var github = new GitHubApi({
	version: "3.0.0",
	protocol: "https"
});
var accessToken;
var freshToken;

var app = express();

//middleware
app.use(session({secret: 'anything-special'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var requireAuth = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

//sets tokens for github, from github acc
passport.use(new PassGit({
	clientID: '95ae07472becbb14626e',
	clientSecret: '45b669b05915f997f594398c99e505e9063ca736',
	callbackURL: 'http://localhost:8888/auth/github/callback'
}, function(token, refreshToken, profile, done) {
	accessToken = token;
	freshToken = refreshToken;
	return done(null, profile);
}));

//gives option to change what user looks like-which we do not
passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(obj, done){
	done(null,obj);
});

//testing for authentication 
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
	failureRedirect: '/',
	successRedirect: '/#/home'
}));
app.get('/api/github/following', requireAuth, function(req, res){
	//gonna grab data from github
	console.log(req.user.username);
	github.user.getFollowingFromUser({
		user: req.user.username
	}, function(err, response) {
		res.status(200).json(response);
		if(err) console.log(err);
		res.end();
	});
});

app.get('/api/github/:username/activity', requireAuth, function(req, res){
	console.log(req.param('username'));
	request.get({
		url: 'https://api.github.com/users/' + req.param('username') +'/events',
		headers: {'User-Agent': "CoderFriendApp"}},
		function(error, response){
			res.status(200).send(response.body);
			if(error) conosle.log(error);
		})
})



//shows the port we be on and chooses it
app.listen(port, function(){
	console.log('listening on port' + port);
});

//Dear Skyler, Good Job. Sincerely, Your Server






