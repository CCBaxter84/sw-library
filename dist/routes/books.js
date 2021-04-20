"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/", function (req, res) {
    res.render("books/index");
});
router.get("/new", function (req, res) {
    res.render("books/new");
});
exports.default = router;
