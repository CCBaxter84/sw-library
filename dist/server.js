"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var index_1 = __importDefault(require("./routes/index"));
var authors_1 = __importDefault(require("./routes/authors"));
var books_1 = __importDefault(require("./routes/books"));
var database_1 = require("./database");
// Set app and other variables
var app = express_1.default();
var PORT = 5000;
// Configure app
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use("/", index_1.default);
app.use("/authors", authors_1.default);
app.use("/books", books_1.default);
app.use(express_1.default.static(__dirname + "/../public"));
// Connect to Database
database_1.connectToDB();
// Set view
app.engine("hbs", express_handlebars_1.default({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/../views/layouts",
    partialsDir: __dirname + "/../views/partials"
}));
app.set("views", __dirname + "/../views");
app.set("view engine", "hbs");
// Set the server to listen
app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
});
