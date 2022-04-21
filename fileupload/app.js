var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const upload = require('express-fileupload');



var index= require('./controllers/index');
var users = require('./controllers/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



app.use(upload());

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/')
})

app.post('/', (req,res)=>{
if (req.files){
  console.log(req.files)
  var file =req.files.file
  var filename=file.name
  console.log(filename)

  file.mv('./public/images/'+filename,function(err){
    if(err){
      res.send(err)
    }else{
      res.send("File Uploaded")
    }
  })
}

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
