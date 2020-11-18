/** @format */

import fs from 'fs';
import formidable from 'formidable-serverless';
import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: {
    bodyParser: false
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = './';
  form.keepExtensions = true;

  form.parse(req, async (error, fields, files) => {
    try {
      if (error) {
        throw error;
      }

      const response = await cloudinary.uploader.upload(files.file.path, {});

      res.json(response);
      fs.unlinkSync(files.file.path);
    } catch (error) {
      console.error(error);
      res.json({ message: 'failed' });
    }
  });
};
