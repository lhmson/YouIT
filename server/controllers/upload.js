import { httpStatusCodes } from "../utils/httpStatusCode.js";

import cloudinary from "cloudinary";
import multiparty from "multiparty";

const cloudinaryv2 = cloudinary.v2;

// POST upload/img?type=test
export const uploadImage = async (req, res) => {
  try {
    const { type } = req.query;
    let folder = "";
    switch (type) {
      case "avatar":
        folder = "youitAvatar";
        break;
      case "group":
        folder = "youitGroup";
        break;
      case "userBackground":
        folder = "youitUserBg";
      default:
    }
    console.log("folder", folder);
    const form = new multiparty.Form();
    console.log("form", form);
    form.parse(req, async function (err, fields, files) {
      const { avatar } = files;
      const uploadResponse = await cloudinaryv2.uploader.upload(
        avatar[0].path,
        { folder, use_filename: true }
      );
      if (uploadResponse.url) {
        const postData = {
          avatar: uploadResponse.url,
        };
        res.json({
          data: {
            ...postData,
          },
        });
      } else {
        res.status(httpStatusCodes.badContent).json({
          message: "Upload image not successful",
        });
      }
    });
    console.log("form after", form);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
