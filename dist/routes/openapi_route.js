"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openapi_controller_1 = __importDefault(require("../controller/openapi_controller"));
const router = (0, express_1.Router)();
router.post("/generate-image", openapi_controller_1.default);
exports.default = router;
