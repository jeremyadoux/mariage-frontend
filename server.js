/**
 * Created by jadoux on 06/01/2016.
 */
var connect = require('connect');
var serveStatic = require('serve-static');

// create a new instance of Connect
var app = connect();
// set server port
var port = 8888;

// custom middleware
/*app.use(function(req, res, next) {
 //req.headers.host = 'http://frontend.local' // to change the host header
 next()
 });*/

// serve static files using dedicated middleware
app.use(serveStatic('static/html'));
app.use(serveStatic(__dirname));

// start server
app.listen(port, function() {
    console.log('Server listening on port %d', port);
});
