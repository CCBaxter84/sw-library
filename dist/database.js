"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
// Import dependencies
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
// Define database vars
var db = process.env.MONGO_URI || "";
var dbParams = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// Connect to DB and export connection
var connectToDB = function () {
    mongoose_1.default
        .connect(db, dbParams)
        .then(function () { return console.log("Connected to DB"); })
        .catch(function () { return console.log("Error connecting to DB"); });
    mongoose_1.default.connection.on("disconnected", function () {
        console.log("Disconnected from DB");
    });
};
exports.connectToDB = connectToDB;
