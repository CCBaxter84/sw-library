"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var express_1 = require("express");
var author_1 = __importDefault(require("../models/author"));
// Initialize router and routes
var router = express_1.Router();
// @route GET /authors
// @desc  Get authors list from DB and render to view
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchOptions, name_1, authors, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                searchOptions = {};
                if (req.query.name !== null && req.query.name !== "") {
                    name_1 = "" + req.query.name;
                    searchOptions.name = new RegExp(name_1, "i");
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, author_1.default.find(searchOptions).lean()];
            case 2:
                authors = _b.sent();
                res.render("authors/index"), {
                    authors: authors, searchOptions: req.query
                };
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.redirect("/");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route GET /authors/new
// @desc  Render form for adding a new author to view
router.get("/new", function (req, res) {
    res.render("authors/new", { author: new author_1.default() });
});
// @route POST /authors
// @desc  Add a new author to the DB
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, newAuthor, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                author = new author_1.default({
                    name: req.body.name
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, author.save()];
            case 2:
                newAuthor = _a.sent();
                res.render("authors/new", {
                    author: author,
                    error: "Author added"
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                res.render("authors/new", {
                    author: author,
                    error: "Error creating new author"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route GET /authors/:id
// @desc  Get info on a specific author and render it to view
// @route PUT /authors/:id
// @desc  Update info on an existing author
// @route DELETE /authors/:id
// @desc  Remove an existing author from the DB
exports.default = router;
