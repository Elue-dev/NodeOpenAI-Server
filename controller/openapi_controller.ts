import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";

const generateImage = async (req: Request, res: Response) => {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const { prompt, size } = req.body;

  if (!prompt || !size) {
    return res.status(400).json({
      status: "fail",
      message:
        "Please specify both the Keywords and Size of the image you want to generate",
    });
  }

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      status: "success",
      data: imageUrl,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.response.data.error.message,
    });
  }
};

export default generateImage;
