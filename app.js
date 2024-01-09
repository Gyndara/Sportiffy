var path          = require('path');
var createError   = require('http-errors');
var express       = require('express');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser')
var logger        = require('morgan');
var indexRouter   = require('./routes/index');
var venueRouter   = require('./routes/venueRoutes');
var fieldRouter   = require('./routes/fieldRoutes');
var bookingRouter = require('./routes/bookingRoutes');
var trackRouter   = require('./routes/trackingBookingRoutes');
var paidRouter    = require('./routes/pembayaranRoutes');
var userRouter    = require('./routes/userRoute');
var historyRouter = require('./routes/historyRoutes');
var cors          = require('cors');



var app = express();
var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('assets'))
app.use(express.urlencoded({extended:true}))

app.use('/', indexRouter);
app.use('/venue', venueRouter);
app.use('/field', fieldRouter);
app.use('/booking', bookingRouter);
app.use('/track', trackRouter);
app.use('/bayar', paidRouter);
app.use('/user', userRouter);
app.use('/history', historyRouter);


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  next();
});

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
