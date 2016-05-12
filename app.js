
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/checklogin', user.checklogin);
app.post('/cussignin',user.cussignin);
app.post('/empsignin',user.empsignin);
app.get('/customer', user.customer);
app.get('/employee', user.employee);
app.get('/searchorderdetails', user.searchorderdetails);
app.post('/moreorderdetails', user.moreorderdetails);
app.get('/getordercount', user.getordercount);
app.get('/getordercountemp', user.getordercountemp);
app.get('/products', user.products);
app.get('/employees', user.employees);
app.get('/orderdetails', user.orderdetails);
app.get('/logoutsession', user.logoutsession);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
