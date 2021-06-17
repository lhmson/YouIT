import mongoose from 'mongoose'

/**
 * @param {mongoose.Model<mongoose.Document<any, {}>>} model 
 * @param {(doc: mongoose.Document) => Promise<Boolean>} validator a function to determine if a document should be kept or not, when this function returns false for any document, it'd be deleted
 * @param {number} interval in ms
 */
export const setDatabaseCleaner = (model, validator, interval) => {
  if (model && validator && interval) {
    setInterval(() => {
      console.info("[DBClean] ", model.modelName);
      model?.find()?.then(docs => {
        docs?.forEach(doc => {
          validator(doc).then(isValid => {
            if (!isValid)
              doc.delete();
          })
        })
      })
    }, interval)
  }
}