import express from 'express';
import router from './router.mjs';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser()); //for session use
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
}));

router(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});