import Hashtag from "../models/hashtag.js"
import { httpStatusCodes } from "../utils/httpStatusCode.js";

//#region create
/**
 * 
 * @param {{ name: string }} hashtag
 * @returns {Promise<{successful: boolean, errorCode: number, hashtag: object?}>} if hash tag deleted successfully
 */
export const handleCreateHashtag = async (hashtag) => {
  try {
    const existedHashtag = await Hashtag.findOne({ name: hashtag?.name });

    if (existedHashtag) {
      existedHashtag.count++;
      await existedHashtag.save();

      return {
        successful: true,
        errorCode: httpStatusCodes.ok,
        hashtag: existedHashtag,
      }
    } else {
      const newHashtag = new Hashtag({
        ...hashtag,
        count: 1,
      });

      const saveHashtag = await newHashtag.save();

      return {
        successful: true,
        errorCode: httpStatusCodes.ok,
        hashtag: saveHashtag,
      }
    }
  } catch (error) {
    return {
      successful: false,
      errorCode: httpStatusCodes.internalServerError,
      hashtag: null,
    }
  }
}

/**
 * @param {[string]} hashtagId 
 */
export const handleCreateHashtags = async (hashtagIds) => {
  if (Array.isArray(hashtagIds)) {
    for (let i = 0; i < hashtagIds.length; i++) {
      await handleCreateHashtag(hashtagIds[i]);
    }
  }
}
//#endregion

//#region delete
/**
 * @returns {Promise<{successful: boolean, errorCode: number}>} if hash tag deleted successfully
 */
export const handleDeleteHashtag = async (hashtagId) => {
  const hashtag = await Hashtag.findById(hashtagId);

  if (!hashtag) {
    return {
      successful: false,
      errorCode: httpStatusCodes.notFound,
    }
  }

  if (hashtag.count > 1) {
    hashtag.count--;
    await hashtag.save();
  }
  else
    await hashtag.remove();

  return {
    successful: true,
    errorCode: httpStatusCodes.ok,
  }
}

/**
 * @param {[string]} hashtagId 
 */
export const handleDeleteHashtags = async (hashtagIds) => {
  if (Array.isArray(hashtagIds)) {
    for (let i = 0; i < hashtagIds.length; i++) {
      await handleDeleteHashtag(hashtagIds[i]);
    }
  }
}
//#endregion