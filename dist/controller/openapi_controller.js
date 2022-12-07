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
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const generateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const configuration = new openai_1.Configuration({
        apiKey: process.env.OPEN_API_KEY,
    });
    const openai = new openai_1.OpenAIApi(configuration);
    const { prompt, size } = req.body;
    if (!prompt || !size) {
        return res.status(400).json({
            status: "fail",
            message: "Please specify both the Keywords and Size of the image you want to generate",
        });
    }
    const imageSize = size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
    try {
        const response = yield openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });
        const imageUrl = response.data.data[0].url;
        res.status(200).json({
            status: "success",
            data: imageUrl,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.response.data.error.message,
        });
    }
});
exports.default = generateImage;
