// Import dependencies
import express, { Application } from "express";
import handlebars from "express-handlebars";
import methodOverride from "method-override";
import indexRouter from "./routes/index";
import authorsRouter from "./routes/authors";
import booksRouter from "./routes/books";
import { connectToDB } from "./database";

// Set app and other variables
const app: Application = express();
const PORT = 5000;

// Configure app
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use(express.static(__dirname + "/../public"));

// Connect to Database
connectToDB();

// Set view
app.engine("hbs", handlebars({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/../views/layouts",
  partialsDir: __dirname + "/../views/partials"
}));
app.set("views", __dirname + "/../views");
app.set("view engine", "hbs");

// Set the server to listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});