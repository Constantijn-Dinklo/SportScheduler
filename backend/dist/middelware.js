"use strict";
// const jwt = require('jsonwebtoken') 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
//Middelware -> move to own file
function authenticateToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
